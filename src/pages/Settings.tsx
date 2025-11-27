import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { Switch } from "@/components/ui/switch";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { User, Bell, Zap, Shield, Link2 } from "lucide-react";

const Settings = () => {
  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold">系统设置</h1>
        <p className="text-muted-foreground mt-1">个人资料与系统偏好配置</p>
      </div>

      <Tabs defaultValue="profile">
        <TabsList>
          <TabsTrigger value="profile">
            <User className="w-4 h-4 mr-2" />
            个人资料
          </TabsTrigger>
          <TabsTrigger value="notifications">
            <Bell className="w-4 h-4 mr-2" />
            通知设置
          </TabsTrigger>
          <TabsTrigger value="integrations">
            <Link2 className="w-4 h-4 mr-2" />
            平台集成
          </TabsTrigger>
          <TabsTrigger value="ai">
            <Zap className="w-4 h-4 mr-2" />
            AI设置
          </TabsTrigger>
          <TabsTrigger value="security">
            <Shield className="w-4 h-4 mr-2" />
            安全
          </TabsTrigger>
        </TabsList>

        {/* 个人资料 */}
        <TabsContent value="profile" className="mt-6">
          <Card>
            <CardHeader>
              <CardTitle>个人资料</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6 max-w-xl">
              <div className="grid gap-2">
                <Label>昵称</Label>
                <Input defaultValue="张三" />
              </div>
              <div className="grid gap-2">
                <Label>邮箱</Label>
                <Input type="email" defaultValue="zhangsan@example.com" disabled />
                <p className="text-xs text-muted-foreground">邮箱已验证</p>
              </div>
              <div className="grid gap-2">
                <Label>语言</Label>
                <Select defaultValue="zh-CN">
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="zh-CN">简体中文</SelectItem>
                    <SelectItem value="en">English</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="grid gap-2">
                <Label>时区</Label>
                <Select defaultValue="asia/shanghai">
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="asia/shanghai">Asia/Shanghai (GMT+8)</SelectItem>
                    <SelectItem value="utc">UTC (GMT+0)</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <Button>保存更改</Button>
            </CardContent>
          </Card>
        </TabsContent>

        {/* 通知设置 */}
        <TabsContent value="notifications" className="mt-6">
          <Card>
            <CardHeader>
              <CardTitle>通知偏好</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="flex items-center justify-between">
                <div className="space-y-1">
                  <p className="font-medium">邮件通知</p>
                  <p className="text-sm text-muted-foreground">接收重要更新和数据报告</p>
                </div>
                <Switch defaultChecked />
              </div>
              <div className="flex items-center justify-between">
                <div className="space-y-1">
                  <p className="font-medium">站内消息</p>
                  <p className="text-sm text-muted-foreground">系统内实时消息提醒</p>
                </div>
                <Switch defaultChecked />
              </div>
              <div className="flex items-center justify-between">
                <div className="space-y-1">
                  <p className="font-medium">数据异常预警</p>
                  <p className="text-sm text-muted-foreground">当指标异常时发送提醒</p>
                </div>
                <Switch defaultChecked />
              </div>
              <div className="flex items-center justify-between">
                <div className="space-y-1">
                  <p className="font-medium">内容发布提醒</p>
                  <p className="text-sm text-muted-foreground">定时发布前的提醒通知</p>
                </div>
                <Switch defaultChecked />
              </div>
              <div className="flex items-center justify-between">
                <div className="space-y-1">
                  <p className="font-medium">周报月报推送</p>
                  <p className="text-sm text-muted-foreground">自动发送数据报告</p>
                </div>
                <Switch defaultChecked />
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* 平台集成 */}
        <TabsContent value="integrations" className="mt-6">
          <Card>
            <CardHeader>
              <CardTitle>已集成平台</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {[
                { name: "抖音", status: "已连接", lastSync: "2分钟前" },
                { name: "小红书", status: "已连接", lastSync: "5分钟前" },
                { name: "微信公众号", status: "已连接", lastSync: "10分钟前" },
                { name: "知乎", status: "未连接", lastSync: "-" },
                { name: "百家号", status: "已连接", lastSync: "1小时前" },
              ].map((platform, index) => (
                <div
                  key={index}
                  className="flex items-center justify-between p-4 border rounded-lg"
                >
                  <div className="flex-1">
                    <div className="flex items-center gap-3">
                      <span className="font-medium">{platform.name}</span>
                      <Badge variant={platform.status === "已连接" ? "default" : "secondary"}>
                        {platform.status}
                      </Badge>
                    </div>
                    {platform.status === "已连接" && (
                      <p className="text-xs text-muted-foreground mt-1">
                        最近同步: {platform.lastSync}
                      </p>
                    )}
                  </div>
                  <Button size="sm" variant="outline">
                    {platform.status === "已连接" ? "管理授权" : "立即连接"}
                  </Button>
                </div>
              ))}
            </CardContent>
          </Card>
        </TabsContent>

        {/* AI设置 */}
        <TabsContent value="ai" className="mt-6">
          <Card>
            <CardHeader>
              <CardTitle>AI模型配置</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6 max-w-xl">
              <div className="grid gap-2">
                <Label>默认AI模型</Label>
                <Select defaultValue="gpt4">
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="gpt4">GPT-4 (推荐)</SelectItem>
                    <SelectItem value="gpt35">GPT-3.5 (经济)</SelectItem>
                  </SelectContent>
                </Select>
                <p className="text-xs text-muted-foreground">
                  GPT-4生成质量更高，GPT-3.5速度更快
                </p>
              </div>
              <div className="grid gap-2">
                <Label>创作风格倾向</Label>
                <Select defaultValue="balanced">
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="creative">创意优先</SelectItem>
                    <SelectItem value="balanced">平衡</SelectItem>
                    <SelectItem value="factual">事实准确</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="flex items-center justify-between">
                <div className="space-y-1">
                  <p className="font-medium">自动优化建议</p>
                  <p className="text-sm text-muted-foreground">AI自动提供内容优化建议</p>
                </div>
                <Switch defaultChecked />
              </div>
              <Button>保存设置</Button>
            </CardContent>
          </Card>
        </TabsContent>

        {/* 安全设置 */}
        <TabsContent value="security" className="mt-6">
          <Card>
            <CardHeader>
              <CardTitle>账户安全</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="flex items-center justify-between">
                <div className="space-y-1">
                  <p className="font-medium">双因素认证</p>
                  <p className="text-sm text-muted-foreground">增强账户安全性</p>
                </div>
                <Switch />
              </div>
              <div className="space-y-2">
                <Label>修改密码</Label>
                <Button variant="outline">更改密码</Button>
              </div>
              <div className="space-y-2">
                <Label>登录历史</Label>
                <Button variant="outline">查看登录记录</Button>
              </div>
              <div className="space-y-2">
                <Label>数据管理</Label>
                <div className="flex gap-2">
                  <Button variant="outline">导出数据</Button>
                  <Button variant="outline" className="text-destructive">
                    删除账户
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default Settings;
