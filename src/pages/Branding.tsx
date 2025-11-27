import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Upload, Plus, X, Building2, Users } from "lucide-react";
import { useState } from "react";

const Branding = () => {
  const [keywords, setKeywords] = useState(["露营", "户外装备", "便携", "折叠桌"]);
  const [newKeyword, setNewKeyword] = useState("");
  const [activeTab, setActiveTab] = useState<"brand" | "accounts">("brand");

  // 多品牌/多账户数据
  const [brands] = useState([
    { id: 1, name: "XGEO", status: "当前品牌", accounts: 5 },
    { id: 2, name: "户外先锋", status: "子品牌", accounts: 3 },
    { id: 3, name: "露营专家", status: "关联品牌", accounts: 2 },
  ]);

  const handleAddKeyword = () => {
    if (newKeyword.trim() && !keywords.includes(newKeyword.trim())) {
      setKeywords([...keywords, newKeyword.trim()]);
      setNewKeyword("");
    }
  };

  const handleRemoveKeyword = (keyword: string) => {
    setKeywords(keywords.filter(k => k !== keyword));
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold">品牌设置</h1>
        <p className="text-muted-foreground mt-1">多品牌管理与配置</p>
      </div>

      {/* Tabs */}
      <Tabs value={activeTab} onValueChange={(v) => setActiveTab(v as "brand" | "accounts")}>
        <TabsList>
          <TabsTrigger value="brand">
            <Building2 className="w-4 h-4 mr-2" />
            品牌信息
          </TabsTrigger>
          <TabsTrigger value="accounts">
            <Users className="w-4 h-4 mr-2" />
            多账户管理
          </TabsTrigger>
        </TabsList>

        {/* 品牌信息 Tab */}
        <TabsContent value="brand" className="space-y-6 mt-6">

      {/* 品牌基础信息 */}
      <Card>
        <CardHeader>
          <CardTitle>品牌基础信息</CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="grid gap-2">
            <Label>品牌名称</Label>
            <Input placeholder="输入品牌名称" defaultValue="XGEO" />
            <p className="text-xs text-muted-foreground">
              AI将在生成内容时使用此名称
            </p>
          </div>

          <div className="grid gap-2">
            <Label>品牌Logo</Label>
            <div className="flex items-center gap-4">
              <div className="w-20 h-20 rounded-lg bg-muted flex items-center justify-center overflow-hidden">
                <img src="/xgeo-logo.png" alt="Logo" className="w-full h-full object-cover" />
              </div>
              <Button variant="outline">
                <Upload className="w-4 h-4 mr-2" />
                上传Logo
              </Button>
            </div>
            <p className="text-xs text-muted-foreground">
              推荐尺寸: 512x512px
            </p>
          </div>

          <div className="grid gap-2">
            <Label>品牌简介</Label>
            <Textarea
              placeholder="描述您的品牌定位、核心业务、目标受众等..."
              className="min-h-[100px]"
              defaultValue="专注户外装备的创新品牌，为露营爱好者提供便携、耐用的户外产品"
            />
            <p className="text-xs text-muted-foreground">
              详细的品牌描述有助于AI生成更符合品牌调性的内容
            </p>
          </div>

          <div className="grid gap-2">
            <Label>官方网站</Label>
            <Input placeholder="https://example.com" defaultValue="https://xgeo.com" />
          </div>
        </CardContent>
      </Card>

      {/* 品牌语气设置 */}
      <Card>
        <CardHeader>
          <CardTitle>品牌语气与风格</CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="grid gap-2">
            <Label>语气风格</Label>
            <Select defaultValue="professional-friendly">
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="professional">专业严谨</SelectItem>
                <SelectItem value="professional-friendly">专业亲和</SelectItem>
                <SelectItem value="casual-young">轻松年轻</SelectItem>
                <SelectItem value="passionate">激情活力</SelectItem>
                <SelectItem value="warm">温暖贴心</SelectItem>
              </SelectContent>
            </Select>
            <p className="text-xs text-muted-foreground">
              AI将使用此语气生成内容
            </p>
          </div>

          <div className="grid gap-2">
            <Label>目标受众</Label>
            <Textarea
              placeholder="描述您的目标客户群体，如年龄、职业、兴趣等..."
              className="min-h-[80px]"
              defaultValue="25-40岁，喜欢周末露营的年轻家庭和户外运动爱好者"
            />
          </div>

          <div className="grid gap-2">
            <Label>核心卖点</Label>
            <Textarea
              placeholder="列出产品或服务的核心优势..."
              className="min-h-[80px]"
              defaultValue="轻量便携、承重力强、快速折叠、耐用防水"
            />
          </div>

          <div className="grid gap-2">
            <Label>品牌价值观</Label>
            <Textarea
              placeholder="描述品牌的核心价值观和主张..."
              className="min-h-[80px]"
              defaultValue="倡导自然生活方式，追求品质与实用的平衡"
            />
          </div>
        </CardContent>
      </Card>

      {/* 监控关键词 */}
      <Card>
        <CardHeader>
          <CardTitle>品牌关键词</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid gap-2">
            <Label>添加关键词</Label>
            <div className="flex gap-2">
              <Input
                placeholder="输入关键词..."
                value={newKeyword}
                onChange={(e) => setNewKeyword(e.target.value)}
                onKeyPress={(e) => e.key === "Enter" && handleAddKeyword()}
              />
              <Button onClick={handleAddKeyword}>
                <Plus className="w-4 h-4 mr-2" />
                添加
              </Button>
            </div>
            <p className="text-xs text-muted-foreground">
              这些关键词将用于内容生成、监控和优化建议
            </p>
          </div>

          <div className="flex flex-wrap gap-2">
            {keywords.map((keyword) => (
              <Badge key={keyword} variant="secondary" className="text-sm py-1.5 px-3">
                {keyword}
                <button
                  onClick={() => handleRemoveKeyword(keyword)}
                  className="ml-2 hover:text-destructive"
                >
                  <X className="w-3 h-3" />
                </button>
              </Badge>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* 信源平台管理 */}
      <Card>
        <CardHeader>
          <CardTitle>信源平台管理（LLM收录）</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <p className="text-sm text-muted-foreground">
            管理品牌在各高收录平台的账号，这些平台更容易被LLM抓取和引用
          </p>
          <div className="space-y-3">
            {[
              { platform: "知乎专栏", account: "@XGEO户外", llmRate: "89%", status: "已关联" },
              { platform: "CSDN", account: "@XGEO_Tech", llmRate: "82%", status: "已关联" },
              { platform: "掘金", account: "@XGEO", llmRate: "85%", status: "已关联" },
              { platform: "官方博客", account: "blog.xgeo.com", llmRate: "92%", status: "已关联" },
              { platform: "GitHub", account: "", llmRate: "88%", status: "未关联" },
              { platform: "Medium", account: "", llmRate: "78%", status: "未关联" },
            ].map((item, index) => (
              <div
                key={index}
                className="flex items-center justify-between p-4 rounded-lg border"
              >
                <div className="flex items-center gap-4 flex-1">
                  <div className="min-w-[120px]">
                    <span className="font-medium">{item.platform}</span>
                    <div className="text-xs text-muted-foreground mt-0.5">
                      LLM收录率: {item.llmRate}
                    </div>
                  </div>
                  {item.account && (
                    <span className="text-sm text-muted-foreground">{item.account}</span>
                  )}
                </div>
                <div className="flex items-center gap-2">
                  <Badge variant={item.status === "已关联" ? "default" : "secondary"}>
                    {item.status}
                  </Badge>
                  <Button size="sm" variant="outline">
                    {item.status === "已关联" ? "管理" : "关联"}
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* 保存按钮 */}
      <div className="flex gap-3">
        <Button size="lg">保存品牌设置</Button>
        <Button size="lg" variant="outline">重置</Button>
      </div>
        </TabsContent>

        {/* 多账户管理 Tab */}
        <TabsContent value="accounts" className="space-y-6 mt-6">
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle>多品牌/多账户管理</CardTitle>
                <Button>
                  <Plus className="w-4 h-4 mr-2" />
                  添加品牌账户
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {brands.map((brand) => (
                  <div
                    key={brand.id}
                    className="p-4 rounded-lg border hover:shadow-sm transition-shadow"
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-4">
                        <div className="w-12 h-12 rounded-lg bg-muted flex items-center justify-center">
                          <Building2 className="w-6 h-6" />
                        </div>
                        <div>
                          <div className="flex items-center gap-2 mb-1">
                            <h4 className="font-medium text-lg">{brand.name}</h4>
                            <Badge variant={brand.status === "当前品牌" ? "default" : "secondary"}>
                              {brand.status}
                            </Badge>
                          </div>
                          <p className="text-sm text-muted-foreground">
                            已关联 {brand.accounts} 个发布账户
                          </p>
                        </div>
                      </div>
                      <div className="flex gap-2">
                        <Button variant="outline" size="sm">管理账户</Button>
                        <Button variant="outline" size="sm">切换</Button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>分账户管理说明</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3 text-sm text-muted-foreground">
              <p>• <strong>多品牌管理：</strong>支持在同一工作空间管理多个品牌，每个品牌独立配置和数据</p>
              <p>• <strong>多账户关联：</strong>每个品牌可关联多个发布平台账户（知乎、CSDN、掘金等）</p>
              <p>• <strong>独立监控：</strong>各品牌数据独立统计，便于对比分析不同品牌表现</p>
              <p>• <strong>统一管理：</strong>在监控面板可快速切换查看不同品牌的优化效果</p>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default Branding;
