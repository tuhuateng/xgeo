# 部署指南：React (Node.js) + FastAPI (Python)

本指南介绍如何将您的混合应用部署到生产服务器（例如阿里云 ECS、腾讯云 CVM 或私有服务器）。

## 架构概览
- **前端**：React App (Vite)。在生产环境中，它会被编译为静态 HTML/JS/CSS 文件。
- **后端**：FastAPI (Python)。作为持久服务运行（使用 Uvicorn/Gunicorn）。
- **Web 服务器**：Nginx。作为反向代理，提供前端文件服务并将 API 请求转发给后端。

## 前置条件
- 一台 Linux 服务器（推荐 Ubuntu 20.04/22.04 或 CentOS 7+）。
- 已安装 Node.js (v18+) & npm。
- 已安装 Python 3.10+ & pip。
- 已安装 PostgreSQL（或使用阿里云 RDS 等外部数据库服务）。
- 已安装 Nginx。

## 第一步：后端部署 (Python)

1.  **克隆代码**：将项目上传到服务器。
2.  **设置虚拟环境**：
    ```bash
    cd /path/to/project
    python3 -m venv venv
    source venv/bin/activate
    # 如果在国内服务器，建议使用清华源加速下载
    pip install -r backend/requirements.txt -i https://pypi.tuna.tsinghua.edu.cn/simple
    ```
3.  **配置环境变量**：
    在项目根目录下创建 `.env` 文件，填入生产环境配置：
    ```env
    # 数据库连接 (示例: PostgreSQL)
    DATABASE_URL="postgresql://user:pass@localhost:5432/dbname"
    
    # AI API Keys
    DEEPSEEK_API_KEY="sk-..."
    
    # 阿里云登录配置 (可选)
    ALIYUN_CLIENT_ID="your_id"
    ALIYUN_CLIENT_SECRET="your_secret"
    ALIYUN_OIDC_ISSUER="https://oauth.aliyun.com/.well-known/openid-configuration"
    
    # 安全密钥 (务必修改)
    SECRET_KEY="prod_secret_key_change_this"
    ```
4.  **运行后端服务**：
    建议使用 `gunicorn` 或 `pm2` 来保持后端运行。
    *使用 Gunicorn (推荐):*
    ```bash
    pip install gunicorn
    # -w 4 表示开启4个工作进程，--daemon 表示后台运行
    gunicorn -w 4 -k uvicorn.workers.UvicornWorker backend.main:app --bind 0.0.0.0:8000 --daemon
    ```

## 第二步：前端部署 (Node.js/静态文件)

1.  **构建前端**：
    在本地或服务器上执行构建命令：
    ```bash
    # 安装依赖 (推荐使用淘宝镜像)
    npm install --registry=https://registry.npmmirror.com
    
    # 构建生产版本
    npm run build
    ```
    构建完成后，会生成一个 `dist/` 目录，里面包含了优化后的静态文件。

2.  **部署静态文件**：
    将 `dist/` 目录的内容移动到 Web 目录，例如 `/var/www/xgeo/dist`。
    ```bash
    mkdir -p /var/www/xgeo/dist
    cp -r dist/* /var/www/xgeo/dist/
    ```

## 第三步：Nginx 配置 (关键步骤)

配置 Nginx 以提供静态前端服务，并将 API 请求代理到 Python 后端。

创建配置文件 `/etc/nginx/sites-available/xgeo`：

```nginx
server {
    listen 80;
    server_name your-domain.com;  # 替换为您的域名或服务器IP

    # 前端静态文件路径
    root /var/www/xgeo/dist;
    index index.html;

    # 处理前端路由 (SPA支持)
    # 任何找不到的文件都重定向到 index.html，交给 React 处理
    location / {
        try_files $uri $uri/ /index.html;
    }

    # 代理 API 请求到 FastAPI
    location /api {
        proxy_pass http://127.0.0.1:8000;
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
    }
}
```

启用站点并重启 Nginx：
```bash
ln -s /etc/nginx/sites-available/xgeo /etc/nginx/sites-enabled/
# 检查配置是否正确
nginx -t
# 重启服务
systemctl restart nginx
```

## 总结
- 用户访问 `your-domain.com` -> Nginx 返回 `index.html` (React)。
- React 应用发起 `/api/...` 请求 -> Nginx 转发给 `localhost:8000` (FastAPI)。
- FastAPI 处理业务逻辑，连接数据库和 AI 接口。

## MacOS 本地部署/开发指南

如果您是在 Mac 上进行本地开发或测试，请参考以下步骤：

### 1. 安装基础工具 (Homebrew)
如果您还没有安装 Homebrew，请打开终端运行：
```bash
/bin/bash -c "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/HEAD/install.sh)"
```

### 2. 安装环境依赖
```bash
# 安装 Python 3.10+
brew install python@3.11

# 安装 Node.js
brew install node

# (可选) 安装 PostgreSQL
# 如果您想使用 Postgres 而不是默认的 SQLite
brew install postgresql@14
brew services start postgresql@14
```

### 3. 启动后端 (Python)
打开一个新的终端窗口：
```bash
cd backend
python3 -m venv venv
source venv/bin/activate
pip install -r requirements.txt

# 启动后端服务 (默认端口 8000)
python main.py
```

### 4. 启动前端 (React)
打开另一个终端窗口：
```bash
# 回到项目根目录
cd .. 

# 安装依赖
npm install

# 启动开发服务器 (默认端口 8080，已配置代理转发到后端)
npm run dev
```

### 5. 访问应用
打开浏览器访问 `http://localhost:8080` 即可。
