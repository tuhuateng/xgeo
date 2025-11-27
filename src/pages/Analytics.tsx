import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { AreaChart, Area, BarChart, Bar, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, Radar, LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from "recharts";
import { TrendingUp, TrendingDown, ArrowUpRight, ArrowDownRight, Sparkles, Target, Search, Calendar, GitCompare, X } from "lucide-react";
import { useNavigate } from "react-router-dom";

const Analytics = () => {
  const navigate = useNavigate();
  const [timeRange, setTimeRange] = useState("7d");
  
  // 监控的关键字
  const [monitoredKeywords] = useState(["露营桌", "户外装备", "便携桌"]);

  // 核心指标数据（GEO维度）
  const coreMetrics = [
    {
      label: "LLM提及次数",
      value: "1,285",
      change: "+45.2%",
      trend: "up",
      vs: "竞品平均高 32%",
      action: "查看详情",
      route: "/reports",
    },
    {
      label: "平均排名",
      value: "#2.8",
      change: "+1.5位",
      trend: "up",
      vs: "排名上升",
      action: "继续优化",
      route: "/optimize",
    },
    {
      label: "信源覆盖",
      value: "68个",
      change: "+25.6%",
      trend: "up",
      vs: "新增18个高质量信源",
      action: "扩展信源",
      route: "/strategy",
    },
    {
      label: "转化率",
      value: "9.2%",
      change: "+2.8%",
      trend: "up",
      vs: "高于行业均值 18%",
      action: "查看策略",
      route: "/strategy",
    },
  ];

  // 趋势数据（GEO维度）
  const trendData = [
    { date: "10-14", llmMentions: 850, ranking: 4.2, sources: 52 },
    { date: "10-15", llmMentions: 920, ranking: 3.8, sources: 55 },
    { date: "10-16", llmMentions: 1050, ranking: 3.2, sources: 58 },
    { date: "10-17", llmMentions: 980, ranking: 3.5, sources: 60 },
    { date: "10-18", llmMentions: 1180, ranking: 2.9, sources: 63 },
    { date: "10-19", llmMentions: 1250, ranking: 2.6, sources: 66 },
    { date: "10-20", llmMentions: 1320, ranking: 2.4, sources: 68 },
  ];

  // LLM平台对比
  const llmComparisonData = [
    { platform: "提及率", ChatGPT: 85, Claude: 78, Gemini: 82, 文心一言: 90, 豆包: 75, 行业平均: 80 },
    { platform: "排名", ChatGPT: 3, Claude: 4, Gemini: 3, 文心一言: 2, 豆包: 5, 行业平均: 4 },
    { platform: "转化", ChatGPT: 9.2, Claude: 8.5, Gemini: 8.8, 文心一言: 9.5, 豆包: 7.8, 行业平均: 8.5 },
    { platform: "信源质量", ChatGPT: 88, Claude: 85, Gemini: 86, 文心一言: 90, 豆包: 82, 行业平均: 85 },
    { platform: "增长", ChatGPT: 45, Claude: 38, Gemini: 42, 文心一言: 52, 豆包: 35, 行业平均: 42 },
  ];

  // 内容表现（GEO维度）
  const contentPerformance = [
    { title: "如何选择露营桌？看材质、承重和收纳", llmMentions: 285, ranking: 2, conversion: 9.8, score: 95 },
    { title: "为什么铝合金露营桌比钢制的更受欢迎？", llmMentions: 218, ranking: 3, conversion: 8.9, score: 88 },
    { title: "户外装备保养的5个关键要点", llmMentions: 192, ranking: 4, conversion: 8.2, score: 82 },
    { title: "便携折叠桌承重测试对比分析", llmMentions: 156, ranking: 5, conversion: 7.5, score: 75 },
  ];

  // 智能诊断（GEO维度）
  const diagnosis = [
    {
      type: "opportunity",
      title: "问答角度缺口",
      desc: "「露营桌材质对比」问答内容缺失，竞品覆盖率35%",
      impact: "预计可提升LLM提及 +180次",
      action: "生成问答内容",
      route: "/generate",
    },
    {
      type: "threat",
      title: "信源权威性下降",
      desc: "近7天高权威平台（知乎、CSDN）发布减少",
      impact: "LLM收录率下降12%",
      action: "优化发布策略",
      route: "/strategy",
    },
    {
      type: "strength",
      title: "ChatGPT排名优势",
      desc: "在ChatGPT平台排名第2，高于竞品平均3.5位",
      impact: "保持领先",
      action: "查看详情",
      route: "/reports",
    },
  ];

  // 纵向对比数据
  const longitudinalData = [
    { date: "优化前7天", llmMentions: 45, ranking: 5, sources: 38 },
    { date: "优化节点", llmMentions: 52, ranking: 4, sources: 42 },
    { date: "优化后7天", llmMentions: 85, ranking: 2, sources: 68 },
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">数据分析</h1>
          <p className="text-muted-foreground mt-1">先进可视化数据洞察</p>
        </div>
        <Select value={timeRange} onValueChange={setTimeRange}>
          <SelectTrigger className="w-32">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="7d">近7天</SelectItem>
            <SelectItem value="30d">近30天</SelectItem>
            <SelectItem value="90d">近90天</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {/* 监控的关键字 */}
      <Card>
        <CardHeader>
          <CardTitle className="text-base">正在监控的关键字</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex flex-wrap gap-2">
            {monitoredKeywords.map((keyword) => (
              <Badge key={keyword} variant="secondary" className="text-sm py-1.5 px-3">
                <Search className="w-3 h-3 mr-1" />
                {keyword}
              </Badge>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* 核心指标卡片 */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {coreMetrics.map((metric, index) => (
          <Card key={index} className="relative overflow-hidden">
            <CardContent className="p-6">
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-sm text-muted-foreground">{metric.label}</span>
                  <Badge 
                    variant={metric.trend === "up" ? "default" : "destructive"}
                    className="flex items-center gap-1"
                  >
                    {metric.trend === "up" ? <TrendingUp className="w-3 h-3" /> : <TrendingDown className="w-3 h-3" />}
                    {metric.change}
                  </Badge>
                </div>
                <div className="text-3xl font-bold">{metric.value}</div>
                <div className="flex items-center justify-between pt-3 border-t">
                  <span className={`text-xs ${metric.trend === "up" ? "text-green-600" : "text-red-600"}`}>
                    {metric.vs}
                  </span>
                  <Button 
                    size="sm" 
                    variant="ghost" 
                    className="h-7 text-xs"
                    onClick={() => navigate(metric.route)}
                  >
                    {metric.action}
                    <ArrowUpRight className="w-3 h-3 ml-1" />
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* 趋势分析（渐变面积图） */}
      <Card>
        <CardHeader>
          <CardTitle>LLM提及趋势</CardTitle>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={350}>
            <AreaChart data={trendData}>
              <defs>
                <linearGradient id="colorExposure" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="hsl(var(--primary))" stopOpacity={0.3}/>
                  <stop offset="95%" stopColor="hsl(var(--primary))" stopOpacity={0}/>
                </linearGradient>
                <linearGradient id="colorLeads" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#10b981" stopOpacity={0.3}/>
                  <stop offset="95%" stopColor="#10b981" stopOpacity={0}/>
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" opacity={0.3} />
              <XAxis 
                dataKey="date" 
                stroke="hsl(var(--muted-foreground))"
                fontSize={12}
              />
              <YAxis 
                stroke="hsl(var(--muted-foreground))"
                fontSize={12}
              />
              <Tooltip 
                contentStyle={{
                  backgroundColor: "hsl(var(--card))",
                  border: "1px solid hsl(var(--border))",
                  borderRadius: "8px",
                }}
              />
              <Area 
                type="monotone" 
                dataKey="llmMentions" 
                stroke="hsl(var(--primary))" 
                fillOpacity={1}
                fill="url(#colorExposure)"
                strokeWidth={3}
                name="LLM提及"
              />
              <Area 
                type="monotone" 
                dataKey="sources" 
                stroke="#10b981" 
                fillOpacity={1}
                fill="url(#colorLeads)"
                strokeWidth={3}
                name="信源数量"
              />
            </AreaChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* LLM平台竞争力分析（雷达图） */}
        <Card>
          <CardHeader>
            <CardTitle>LLM平台表现对比</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={350}>
              <RadarChart data={llmComparisonData}>
                <PolarGrid stroke="hsl(var(--border))" />
                <PolarAngleAxis 
                  dataKey="platform" 
                  stroke="hsl(var(--muted-foreground))"
                  fontSize={12}
                />
                <PolarRadiusAxis 
                  angle={90} 
                  domain={[0, 100]}
                  stroke="hsl(var(--muted-foreground))"
                  fontSize={10}
                />
                <Radar 
                  name="ChatGPT" 
                  dataKey="ChatGPT" 
                  stroke="#8b5cf6" 
                  fill="#8b5cf6" 
                  fillOpacity={0.3}
                  strokeWidth={2}
                />
                <Radar 
                  name="文心一言" 
                  dataKey="文心一言" 
                  stroke="#ec4899" 
                  fill="#ec4899" 
                  fillOpacity={0.3}
                  strokeWidth={2}
                />
                <Radar 
                  name="行业平均" 
                  dataKey="行业平均" 
                  stroke="hsl(var(--muted-foreground))" 
                  fill="hsl(var(--muted-foreground))" 
                  fillOpacity={0.1}
                  strokeWidth={1}
                  strokeDasharray="5 5"
                />
                <Tooltip 
                  contentStyle={{
                    backgroundColor: "hsl(var(--card))",
                    border: "1px solid hsl(var(--border))",
                    borderRadius: "8px",
                  }}
                />
                <Legend />
              </RadarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* 内容GEO表现矩阵 */}
        <Card>
          <CardHeader>
            <CardTitle>内容GEO表现分析</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {contentPerformance.map((item, index) => (
                <div key={index} className="p-4 rounded-lg border hover:shadow-sm transition-shadow">
                  <div className="flex items-center justify-between mb-3">
                    <h4 className="font-medium text-sm">{item.title}</h4>
                    <Badge variant="outline" className="text-xs">
                      得分 {item.score}
                    </Badge>
                  </div>
                  <div className="grid grid-cols-3 gap-4 text-xs">
                    <div>
                      <span className="text-muted-foreground">LLM提及</span>
                      <div className="font-medium mt-1">{item.llmMentions}次</div>
                    </div>
                    <div>
                      <span className="text-muted-foreground">排名</span>
                      <div className="font-medium mt-1">#{item.ranking}</div>
                    </div>
                    <div>
                      <span className="text-muted-foreground">转化率</span>
                      <div className="font-medium mt-1">{item.conversion}%</div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* SWOT智能诊断 */}
      <Card>
        <CardHeader>
          <div className="flex items-center gap-2">
            <Sparkles className="w-5 h-5 text-primary" />
            <CardTitle>AI智能诊断</CardTitle>
          </div>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {diagnosis.map((item, index) => (
              <div
                key={index}
                className={`p-4 rounded-lg border-2 ${
                  item.type === "opportunity"
                    ? "bg-blue-50/50 dark:bg-blue-950/20 border-blue-200 dark:border-blue-900"
                    : item.type === "threat"
                    ? "bg-red-50/50 dark:bg-red-950/20 border-red-200 dark:border-red-900"
                    : "bg-green-50/50 dark:bg-green-950/20 border-green-200 dark:border-green-900"
                }`}
              >
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <Badge 
                      variant="outline"
                      className={
                        item.type === "opportunity"
                          ? "border-blue-600 text-blue-600"
                          : item.type === "threat"
                          ? "border-red-600 text-red-600"
                          : "border-green-600 text-green-600"
                      }
                    >
                      {item.type === "opportunity" ? "机会" : item.type === "threat" ? "威胁" : "优势"}
                    </Badge>
                    <Target className="w-4 h-4 text-muted-foreground" />
                  </div>
                  <div>
                    <h4 className="font-semibold mb-1">{item.title}</h4>
                    <p className="text-sm text-muted-foreground">{item.desc}</p>
                  </div>
                  <div className="pt-3 border-t flex items-center justify-between">
                    <span className="text-xs font-medium">{item.impact}</span>
                    <Button 
                      size="sm" 
                      variant="outline" 
                      className="h-7 text-xs"
                      onClick={() => navigate(item.route)}
                    >
                      {item.action}
                    </Button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* 纵向对比分析 Tab */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <GitCompare className="w-5 h-5 text-primary" />
              <CardTitle>纵向对比分析</CardTitle>
            </div>
            <Badge variant="secondary">优化前后数据对比</Badge>
          </div>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="text-sm text-muted-foreground">
            展示优化节点前后7天的数据变化趋势
          </div>
          
          <ResponsiveContainer width="100%" height={350}>
            <LineChart data={longitudinalData}>
              <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
              <XAxis 
                dataKey="date" 
                stroke="hsl(var(--muted-foreground))"
                fontSize={12}
              />
              <YAxis 
                stroke="hsl(var(--muted-foreground))"
                fontSize={12}
              />
              <Tooltip 
                contentStyle={{
                  backgroundColor: "hsl(var(--card))",
                  border: "1px solid hsl(var(--border))",
                  borderRadius: "8px",
                }}
              />
              <Legend />
              <Line 
                type="monotone" 
                dataKey="llmMentions" 
                stroke="#8b5cf6" 
                strokeWidth={3}
                name="LLM提及次数"
                dot={{ r: 6 }}
              />
              <Line 
                type="monotone" 
                dataKey="sources" 
                stroke="#10b981" 
                strokeWidth={3}
                name="信源数量"
                dot={{ r: 6 }}
              />
            </LineChart>
          </ResponsiveContainer>

          <div className="grid grid-cols-3 gap-4">
            <Card>
              <CardContent className="p-4">
                <div className="text-sm text-muted-foreground mb-1">优化前7天平均</div>
                <div className="text-2xl font-bold">45次</div>
                <div className="text-xs text-muted-foreground mt-1">LLM提及</div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-4">
                <div className="text-sm text-muted-foreground mb-1">优化后7天平均</div>
                <div className="text-2xl font-bold text-green-600">85次</div>
                <div className="text-xs text-muted-foreground mt-1">LLM提及</div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-4">
                <div className="text-sm text-muted-foreground mb-1">提升幅度</div>
                <div className="text-2xl font-bold text-primary">+88.9%</div>
                <div className="text-xs text-muted-foreground mt-1">增长率</div>
              </CardContent>
            </Card>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default Analytics;
