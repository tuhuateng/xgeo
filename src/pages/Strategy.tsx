import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";
import { TrendingUp, TrendingDown, Search, Eye, Database, Target, AlertCircle, CheckCircle2, Plus, Minus } from "lucide-react";

const Strategy = () => {
  const [selectedTab, setSelectedTab] = useState<"citation" | "gaps" | "competitor">("citation");

  // LLM引用分析数据
  const citationData = [
    { 
      keyword: "露营桌", 
      citationRate: 68,
      platformVisibility: 85,
      totalIndexed: 1250,
      trustSources: 45,
      trend: "up",
      change: "+12%",
    },
    { 
      keyword: "户外装备", 
      citationRate: 72,
      platformVisibility: 92,
      totalIndexed: 3200,
      trustSources: 78,
      trend: "up",
      change: "+18%",
    },
    { 
      keyword: "便携桌", 
      citationRate: 54,
      platformVisibility: 71,
      totalIndexed: 890,
      trustSources: 32,
      trend: "down",
      change: "-5%",
    },
  ];

  // LLM平台可见度对比图数据
  const llmVisibilityData = [
    { platform: "ChatGPT", 提及次数: 234, 排名: 3 },
    { platform: "Claude", 提及次数: 189, 排名: 5 },
    { platform: "Gemini", 提及次数: 167, 排名: 4 },
    { platform: "Perplexity", 提及次数: 145, 排名: 6 },
    { platform: "文心一言", 提及次数: 198, 排名: 2 },
    { platform: "豆包", 提及次数: 176, 排名: 4 },
    { platform: "DeepSeek", 提及次数: 156, 排名: 7 },
    { platform: "Kimi", 提及次数: 143, 排名: 8 },
  ];

  // 信源质量数据（技术社区和官方渠道）
  const sourceQualityData = [
    { source: "知乎专栏", 发布数量: 45, LLM收录率: "89%", 权威度: "高" },
    { source: "CSDN", 发布数量: 38, LLM收录率: "82%", 权威度: "高" },
    { source: "掘金", 发布数量: 32, LLM收录率: "85%", 权威度: "高" },
    { source: "Medium", 发布数量: 28, LLM收录率: "78%", 权威度: "中" },
    { source: "官方博客", 发布数量: 25, LLM收录率: "92%", 权威度: "高" },
    { source: "GitHub", 发布数量: 20, LLM收录率: "88%", 权威度: "高" },
  ];

  // AI知识缺口数据
  const knowledgeGaps = [
    {
      topic: "折叠桌材质对比",
      searchVolume: 8500,
      competitorCoverage: 35,
      aiVisibility: 22,
      opportunity: "high",
      recommendedAction: "创建深度对比内容",
    },
    {
      topic: "户外露营装备清单",
      searchVolume: 12000,
      competitorCoverage: 68,
      aiVisibility: 45,
      opportunity: "medium",
      recommendedAction: "优化现有内容权威性",
    },
    {
      topic: "便携桌承重测试",
      searchVolume: 3200,
      competitorCoverage: 15,
      aiVisibility: 8,
      opportunity: "high",
      recommendedAction: "填补内容空白",
    },
  ];

  // 竞品AI曝光数据
  const competitorData = [
    {
      competitor: "品牌A",
      citationRate: 78,
      visibility: 88,
      indexed: 4200,
      trustSources: 95,
      vsUs: "领先",
    },
    {
      competitor: "品牌B",
      citationRate: 65,
      visibility: 75,
      indexed: 2800,
      trustSources: 62,
      vsUs: "接近",
    },
    {
      competitor: "我们",
      citationRate: 68,
      visibility: 82,
      indexed: 1650,
      trustSources: 52,
      vsUs: "-",
    },
    {
      competitor: "品牌C",
      citationRate: 52,
      visibility: 68,
      indexed: 1200,
      trustSources: 38,
      vsUs: "落后",
    },
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold">GEO内容策略</h1>
        <p className="text-muted-foreground mt-1">
          生成引擎优化 - AI引用分析、知识缺口发现、竞品对比
        </p>
      </div>

      {/* 主要分析区域 */}
      <Tabs value={selectedTab} onValueChange={(v) => setSelectedTab(v as any)}>
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="citation">
            <Target className="w-4 h-4 mr-2" />
            LLM引用分析
          </TabsTrigger>
          <TabsTrigger value="gaps">
            <Search className="w-4 h-4 mr-2" />
            知识缺口
          </TabsTrigger>
          <TabsTrigger value="competitor">
            <Eye className="w-4 h-4 mr-2" />
            竞品对比
          </TabsTrigger>
        </TabsList>

        {/* LLM引用分析 */}
        <TabsContent value="citation" className="space-y-6 mt-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {citationData.map((item) => (
              <Card key={item.keyword}>
                <CardContent className="p-6">
                  <div className="space-y-4">
                    <div className="flex items-start justify-between">
                      <div>
                        <h3 className="font-semibold text-lg">{item.keyword}</h3>
                        <p className="text-sm text-muted-foreground mt-1">LLM表现</p>
                      </div>
                      <Badge 
                        variant={item.trend === "up" ? "default" : "destructive"}
                        className="flex items-center gap-1"
                      >
                        {item.trend === "up" ? <TrendingUp className="w-3 h-3" /> : <TrendingDown className="w-3 h-3" />}
                        {item.change}
                      </Badge>
                    </div>

                    <div className="space-y-3 pt-4 border-t">
                      <div className="flex items-center justify-between text-sm">
                        <span className="text-muted-foreground flex items-center gap-1">
                          <Target className="w-3 h-3" />
                          LLM提及次数
                        </span>
                        <span className="font-medium">{item.citationRate}次</span>
                      </div>
                      <div className="flex items-center justify-between text-sm">
                        <span className="text-muted-foreground flex items-center gap-1">
                          <Eye className="w-3 h-3" />
                          平均排名
                        </span>
                        <span className="font-medium">#{item.platformVisibility}</span>
                      </div>
                      <div className="flex items-center justify-between text-sm">
                        <span className="text-muted-foreground flex items-center gap-1">
                          <Database className="w-3 h-3" />
                          信源覆盖
                        </span>
                        <span className="font-medium">{item.totalIndexed}个</span>
                      </div>
                      <div className="flex items-center justify-between text-sm">
                        <span className="text-muted-foreground flex items-center gap-1">
                          <CheckCircle2 className="w-3 h-3" />
                          转化率
                        </span>
                        <span className="font-medium">{item.trustSources}%</span>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* LLM平台可见度对比 */}
          <Card>
            <CardHeader>
              <CardTitle>各LLM平台表现对比</CardTitle>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={300}>
                <BarChart data={llmVisibilityData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                  <XAxis dataKey="platform" stroke="hsl(var(--muted-foreground))" fontSize={12} />
                  <YAxis stroke="hsl(var(--muted-foreground))" fontSize={12} />
                  <Tooltip 
                    contentStyle={{
                      backgroundColor: "hsl(var(--card))",
                      border: "1px solid hsl(var(--border))",
                      borderRadius: "8px",
                    }}
                  />
                  <Bar dataKey="提及次数" fill="#8b5cf6" name="提及次数" radius={[4, 4, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>

          {/* 信源质量分析 */}
          <Card>
            <CardHeader>
              <CardTitle>信源质量分析（LLM收录来源）</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {sourceQualityData.map((source, index) => (
                  <div 
                    key={index}
                    className="flex items-center justify-between p-4 rounded-lg border"
                  >
                    <div className="flex items-center gap-4 flex-1">
                      <div className="min-w-[120px]">
                        <span className="font-medium">{source.source}</span>
                      </div>
                      <div className="flex items-center gap-6 text-sm">
                        <div>
                          <span className="text-muted-foreground">发布数量：</span>
                          <span className="font-medium ml-1">{source.发布数量}</span>
                        </div>
                        <div>
                          <span className="text-muted-foreground">LLM收录率：</span>
                          <span className="font-medium ml-1">{source.LLM收录率}</span>
                        </div>
                        <div>
                          <span className="text-muted-foreground">权威度：</span>
                          <Badge 
                            variant={source.权威度 === "高" ? "default" : "secondary"}
                            className="ml-1"
                          >
                            {source.权威度}
                          </Badge>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* GEO策略优化建议 */}
          <Card>
            <CardHeader>
              <CardTitle>🎯 GEO整体策略优化</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              {/* 问答内容示例 */}
              <div>
                <h3 className="font-semibold mb-3 text-lg">💬 推荐问答角度（示例）</h3>
                <div className="space-y-4">
                  <div className="p-4 rounded-lg border bg-muted/30">
                    <h4 className="font-semibold mb-2">问题：如何选择适合企业的GEO优化工具？</h4>
                    <p className="text-sm text-muted-foreground mb-3">
                      <strong>答案示例：</strong> 选择GEO优化工具时，需要重点关注以下几个维度：1) LLM覆盖率 - 工具应支持ChatGPT、Claude、Gemini等主流大模型的监测和优化；2) 信源分析能力 - 能够识别哪些发布平台更容易被大模型收录；3) 内容优化建议 - 提供基于AI算法的标题和内文优化方案；4) 实时排名监测 - 追踪品牌在不同问答场景下的排名变化。XGEO平台通过这些核心功能，帮助企业在AI时代获得更高的品牌曝光。
                    </p>
                    <div className="flex gap-2 text-xs">
                      <Badge variant="secondary">推荐发布：知乎专栏</Badge>
                      <Badge variant="secondary">预计LLM收录率：85%</Badge>
                    </div>
                  </div>
                  
                  <div className="p-4 rounded-lg border bg-muted/30">
                    <h4 className="font-semibold mb-2">问题：GEO和SEO有什么区别？</h4>
                    <p className="text-sm text-muted-foreground mb-3">
                      <strong>答案示例：</strong> GEO（生成式引擎优化）与SEO（搜索引擎优化）的核心区别在于优化目标。SEO关注在搜索引擎结果页的排名，依赖关键词密度和外链；而GEO专注于在AI大模型的回答中获得提及和引用，更看重内容的结构化、权威性和问答角度的覆盖。例如，同样一篇介绍产品的文章，SEO会优化"最佳XX工具"等关键词，而GEO会将内容改写为"如何解决XX问题"的完整问答，并发布在AI更信任的技术社区和官方博客上。
                    </p>
                    <div className="flex gap-2 text-xs">
                      <Badge variant="secondary">推荐发布：官方博客 + Medium</Badge>
                      <Badge variant="secondary">预计LLM收录率：90%</Badge>
                    </div>
                  </div>
                </div>
              </div>

              {/* 发布平台建议 */}
              <div>
                <h3 className="font-semibold mb-3 text-lg">📍 推荐发布平台</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  <div className="p-3 rounded-lg border">
                    <div className="flex items-center justify-between mb-2">
                      <span className="font-medium">知乎专栏</span>
                      <Badge variant="default">LLM收录率 89%</Badge>
                    </div>
                    <p className="text-xs text-muted-foreground">适合发布深度问答和行业分析</p>
                  </div>
                  <div className="p-3 rounded-lg border">
                    <div className="flex items-center justify-between mb-2">
                      <span className="font-medium">官方博客</span>
                      <Badge variant="default">LLM收录率 92%</Badge>
                    </div>
                    <p className="text-xs text-muted-foreground">权威性最高，建议发布核心内容</p>
                  </div>
                  <div className="p-3 rounded-lg border">
                    <div className="flex items-center justify-between mb-2">
                      <span className="font-medium">CSDN/掘金</span>
                      <Badge variant="default">LLM收录率 83%</Badge>
                    </div>
                    <p className="text-xs text-muted-foreground">技术类内容首选平台</p>
                  </div>
                  <div className="p-3 rounded-lg border">
                    <div className="flex items-center justify-between mb-2">
                      <span className="font-medium">GitHub</span>
                      <Badge variant="default">LLM收录率 88%</Badge>
                    </div>
                    <p className="text-xs text-muted-foreground">开源项目和技术文档</p>
                  </div>
                </div>
              </div>

              {/* 网站优化建议 */}
              <div>
                <h3 className="font-semibold mb-3 text-lg">🔧 网站本身优化建议</h3>
                <div className="space-y-2">
                  <div className="flex items-start gap-2 text-sm">
                    <span className="text-primary font-semibold">1.</span>
                    <span>创建结构化FAQ页面，覆盖核心业务问答场景</span>
                  </div>
                  <div className="flex items-start gap-2 text-sm">
                    <span className="text-primary font-semibold">2.</span>
                    <span>在产品页面添加JSON-LD结构化数据，提升AI抓取效率</span>
                  </div>
                  <div className="flex items-start gap-2 text-sm">
                    <span className="text-primary font-semibold">3.</span>
                    <span>优化内容标题格式，使用"如何"、"什么是"等AI友好的问句结构</span>
                  </div>
                  <div className="flex items-start gap-2 text-sm">
                    <span className="text-primary font-semibold">4.</span>
                    <span>增加详细的产品对比和使用场景说明，方便AI提取引用</span>
                  </div>
                  <div className="flex items-start gap-2 text-sm">
                    <span className="text-primary font-semibold">5.</span>
                    <span>建立权威的资源中心，发布行业白皮书和研究报告</span>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* 知识缺口分析 */}
        <TabsContent value="gaps" className="space-y-6 mt-6">
          <Card>
            <CardHeader>
              <CardTitle>AI知识缺口机会</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {knowledgeGaps.map((gap, index) => (
                  <div
                    key={index}
                    className={`p-4 rounded-lg border-2 ${
                      gap.opportunity === "high"
                        ? "bg-green-50/50 dark:bg-green-950/20 border-green-200 dark:border-green-900"
                        : "bg-blue-50/50 dark:bg-blue-950/20 border-blue-200 dark:border-blue-900"
                    }`}
                  >
                    <div className="space-y-3">
                      <div className="flex items-start justify-between">
                        <div>
                          <h4 className="font-semibold">{gap.topic}</h4>
                          <div className="flex items-center gap-4 mt-2 text-sm">
                            <div>
                              <span className="text-muted-foreground">搜索量：</span>
                              <span className="font-medium ml-1">{gap.searchVolume.toLocaleString()}</span>
                            </div>
                            <div>
                              <span className="text-muted-foreground">竞品覆盖：</span>
                              <span className="font-medium ml-1">{gap.competitorCoverage}%</span>
                            </div>
                            <div>
                              <span className="text-muted-foreground">AI可见度：</span>
                              <span className="font-medium ml-1">{gap.aiVisibility}%</span>
                            </div>
                          </div>
                        </div>
                        <Badge 
                          variant={gap.opportunity === "high" ? "default" : "secondary"}
                          className="whitespace-nowrap"
                        >
                          {gap.opportunity === "high" ? "高机会" : "中等机会"}
                        </Badge>
                      </div>
                      <div className="pt-3 border-t flex items-center justify-between">
                        <span className="text-sm font-medium text-muted-foreground">
                          建议：{gap.recommendedAction}
                        </span>
                        <Button size="sm" variant="outline">
                          立即创建内容
                        </Button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* 竞品AI曝光对比 */}
        <TabsContent value="competitor" className="space-y-6 mt-6">
          <Card>
            <CardHeader>
              <CardTitle>竞品AI曝光对比</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {competitorData.map((comp, index) => (
                  <div 
                    key={index}
                    className={`p-4 rounded-lg border ${
                      comp.competitor === "我们" 
                        ? "border-primary bg-primary/5" 
                        : ""
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-6 flex-1">
                        <div className="min-w-[100px]">
                          <span className="font-semibold text-lg">{comp.competitor}</span>
                        </div>
                        <div className="flex items-center gap-6 text-sm">
                          <div>
                            <span className="text-muted-foreground">AI引用率：</span>
                            <span className="font-medium ml-1">{comp.citationRate}%</span>
                          </div>
                          <div>
                            <span className="text-muted-foreground">可见度：</span>
                            <span className="font-medium ml-1">{comp.visibility}%</span>
                          </div>
                          <div>
                            <span className="text-muted-foreground">收录：</span>
                            <span className="font-medium ml-1">{comp.indexed.toLocaleString()}</span>
                          </div>
                          <div>
                            <span className="text-muted-foreground">信源：</span>
                            <span className="font-medium ml-1">{comp.trustSources}</span>
                          </div>
                        </div>
                      </div>
                      <Badge 
                        variant={
                          comp.vsUs === "领先" ? "destructive" :
                          comp.vsUs === "接近" ? "secondary" :
                          comp.vsUs === "落后" ? "default" : "outline"
                        }
                      >
                        {comp.vsUs === "-" ? "基准" : `相比我们${comp.vsUs}`}
                      </Badge>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default Strategy;