import { useState, useEffect } from "react";
import { api } from "@/services/api";
import {
  TrendingUp,
  TrendingDown,
  AlertTriangle,
  Target,
  Zap,
  ArrowRight,
  Sparkles,
  Eye,
  Brain,
  Award,
  Rocket,
  Globe
} from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, Radar, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from "recharts";
import { useNavigate } from "react-router-dom";

const Dashboard = () => {
  const navigate = useNavigate();
  const [brandInput, setBrandInput] = useState("");
  const [selectedRegion, setSelectedRegion] = useState("all");
  const [loading, setLoading] = useState(true);

  // State for data
  const [geoScore, setGeoScore] = useState({
    total: 82.4,
    visibility: 86,
    comprehension: 79,
    representation: 83,
    optimization: 77
  });

  const [modelComparison, setModelComparison] = useState<{
    china: { name: string; score: number }[];
    global: { name: string; score: number }[];
  }>({
    china: [],
    global: []
  });

  const [recommendations, setRecommendations] = useState<any[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [overview, models, recs] = await Promise.all([
          api.getDashboardOverview(),
          api.getDashboardModels(),
          api.getDashboardRecommendations()
        ]);

        if (overview) setGeoScore(overview);

        if (models) {
          const china = models.filter((m: any) => m.region === 'china').map((m: any) => ({ name: m.model_name, score: m.score }));
          const global = models.filter((m: any) => m.region === 'global').map((m: any) => ({ name: m.model_name, score: m.score }));
          setModelComparison({ china, global });
        }

        if (recs) setRecommendations(recs);
      } catch (error) {
        console.error("Failed to fetch dashboard data", error);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  // Derived data
  const dimensionMetrics = [
    {
      id: "visibility",
      label: "可见度 Visibility",
      score: geoScore.visibility,
      icon: Eye,
      color: "text-blue-500",
      bgColor: "bg-blue-50 dark:bg-blue-950/20",
      borderColor: "border-blue-200 dark:border-blue-900",
      description: "品牌在LLM中的提及率与排名表现",
      weight: "30%",
      subMetrics: [
        { name: "提及率", value: "85%", desc: "mention_count / total_answers" },
        { name: "平均排名", value: "#2.8", desc: "mean(rank)" },
        { name: "查询覆盖率", value: "78%", desc: "covered_queries / total_queries" },
        { name: "来源多样性", value: "68个", desc: "unique_sources" }
      ]
    },
    {
      id: "comprehension",
      label: "理解度 Comprehension",
      score: geoScore.comprehension,
      icon: Brain,
      color: "text-purple-500",
      bgColor: "bg-purple-50 dark:bg-purple-950/20",
      borderColor: "border-purple-200 dark:border-purple-900",
      description: "LLM对品牌意图和功能的准确理解",
      weight: "25%",
      subMetrics: [
        { name: "品牌意图匹配", value: "82分", desc: "LLM-as-judge评分" },
        { name: "功能准确率", value: "85%", desc: "matched_features" },
        { name: "错误描述率", value: "8%", desc: "error_items（越低越好）" },
        { name: "语义契合度", value: "88分", desc: "semantic alignment" }
      ]
    },
    {
      id: "representation",
      label: "表现质量 Representation",
      score: geoScore.representation,
      icon: Award,
      color: "text-green-500",
      bgColor: "bg-green-50 dark:bg-green-950/20",
      borderColor: "border-green-200 dark:border-green-900",
      description: "LLM输出内容的质量与情感倾向",
      weight: "25%",
      subMetrics: [
        { name: "情感倾向", value: "+0.72", desc: "sentiment polarity" },
        { name: "细节丰富度", value: "185 tokens", desc: "avg_token_count" },
        { name: "权威信度", value: "91%", desc: "confidence score" },
        { name: "事实正确率", value: "4.2/5", desc: "GPT-judge score" }
      ]
    },
    {
      id: "optimization",
      label: "优化可执行性 Optimization",
      score: geoScore.optimization,
      icon: Rocket,
      color: "text-orange-500",
      bgColor: "bg-orange-50 dark:bg-orange-950/20",
      borderColor: "border-orange-200 dark:border-orange-900",
      description: "网站结构与内容的优化潜力",
      weight: "20%",
      subMetrics: [
        { name: "结构化可读性", value: "72%", desc: "schema.org检测" },
        { name: "语义适配度", value: "0.85", desc: "cosine similarity" },
        { name: "模型引用权重", value: "68%", desc: "citations/outputs" },
        { name: "优化差距指数", value: "23%", desc: "与行业均值差距" }
      ]
    }
  ];

  const radarData = [
    { dimension: "可见度", 我方: geoScore.visibility, 行业均值: 72, 领先竞品: 88 },
    { dimension: "理解度", 我方: geoScore.comprehension, 行业均值: 68, 领先竞品: 85 },
    { dimension: "表现质量", 我方: geoScore.representation, 行业均值: 75, 领先竞品: 82 },
    { dimension: "优化潜力", 我方: geoScore.optimization, 行业均值: 70, 领先竞品: 90 }
  ];

  const chinaAvg = modelComparison.china.length > 0
    ? modelComparison.china.reduce((sum, m) => sum + m.score, 0) / modelComparison.china.length
    : 0;
  const globalAvg = modelComparison.global.length > 0
    ? modelComparison.global.reduce((sum, m) => sum + m.score, 0) / modelComparison.global.length
    : 0;


  return (
    <div className="space-y-6 p-6">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold">GEO智能分析系统</h1>
        <p className="text-muted-foreground mt-1">
          生成式引擎优化 - 全球语义曝光分析与品牌表现监测
        </p>
      </div>

      {/* 品牌输入区 */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Sparkles className="w-5 h-5 text-primary" />
            品牌/关键词分析
          </CardTitle>
          <CardDescription>
            输入关键词或网页URL，分析品牌在各大语言模型中的表现
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <Textarea
            placeholder="例如：输入品牌名称、产品关键词或网页URL&#10;如：Apple iPhone 或 https://example.com/product"
            value={brandInput}
            onChange={(e) => setBrandInput(e.target.value)}
            className="min-h-[100px]"
          />
          <div className="flex gap-3">
            <Select value={selectedRegion} onValueChange={setSelectedRegion}>
              <SelectTrigger className="w-[200px]">
                <SelectValue placeholder="目标区域" />
              </SelectTrigger>
              <SelectContent className="bg-popover z-50">
                <SelectItem value="all">全球市场</SelectItem>
                <SelectItem value="CN">中国</SelectItem>
                <SelectItem value="US">美国</SelectItem>
                <SelectItem value="EU">欧洲</SelectItem>
                <SelectItem value="JP">日本</SelectItem>
                <SelectItem value="IN">印度</SelectItem>
              </SelectContent>
            </Select>
            <Button className="bg-gradient-primary">
              <Zap className="w-4 h-4 mr-2" />
              开始分析
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* GEO总分展示 */}
      <Card className="bg-gradient-primary text-primary-foreground">
        <CardContent className="p-8">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm opacity-90 mb-2">GEO 综合得分</p>
              <div className="text-6xl font-bold">{geoScore.total}</div>
              <p className="text-sm mt-3 opacity-80">
                高于行业均值 <span className="font-semibold">15.8%</span>
              </p>
            </div>
            <div className="space-y-2">
              <div className="flex items-center gap-3">
                <span className="text-sm opacity-90 min-w-[120px]">可见度 (30%)</span>
                <Progress value={geoScore.visibility} className="h-2 w-32 bg-white/20" />
                <span className="font-semibold">{geoScore.visibility}</span>
              </div>
              <div className="flex items-center gap-3">
                <span className="text-sm opacity-90 min-w-[120px]">理解度 (25%)</span>
                <Progress value={geoScore.comprehension} className="h-2 w-32 bg-white/20" />
                <span className="font-semibold">{geoScore.comprehension}</span>
              </div>
              <div className="flex items-center gap-3">
                <span className="text-sm opacity-90 min-w-[120px]">表现质量 (25%)</span>
                <Progress value={geoScore.representation} className="h-2 w-32 bg-white/20" />
                <span className="font-semibold">{geoScore.representation}</span>
              </div>
              <div className="flex items-center gap-3">
                <span className="text-sm opacity-90 min-w-[120px]">优化潜力 (20%)</span>
                <Progress value={geoScore.optimization} className="h-2 w-32 bg-white/20" />
                <span className="font-semibold">{geoScore.optimization}</span>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* 四大维度卡片 */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {dimensionMetrics.map((dimension) => {
          const Icon = dimension.icon;
          return (
            <Card key={dimension.id} className={`border-2 ${dimension.borderColor}`}>
              <CardContent className="p-6">
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div className={`p-3 rounded-lg ${dimension.bgColor}`}>
                      <Icon className={`w-6 h-6 ${dimension.color}`} />
                    </div>
                    <Badge variant="outline" className="text-lg font-bold">
                      {dimension.score}
                    </Badge>
                  </div>
                  <div>
                    <h3 className="font-semibold text-sm mb-1">{dimension.label}</h3>
                    <p className="text-xs text-muted-foreground">{dimension.description}</p>
                    <p className="text-xs text-muted-foreground mt-1">权重：{dimension.weight}</p>
                  </div>
                  <div className="space-y-2 pt-3 border-t">
                    {dimension.subMetrics.map((sub, idx) => (
                      <div key={idx} className="flex items-center justify-between text-xs">
                        <span className="text-muted-foreground">{sub.name}</span>
                        <span className="font-medium">{sub.value}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* 雷达图 - 竞品对比 */}
        <Card>
          <CardHeader>
            <CardTitle>四维度竞品对比</CardTitle>
            <CardDescription>与行业均值和领先竞品的对比分析</CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={350}>
              <RadarChart data={radarData}>
                <PolarGrid stroke="hsl(var(--border))" />
                <PolarAngleAxis
                  dataKey="dimension"
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
                  name="我方"
                  dataKey="我方"
                  stroke="hsl(var(--primary))"
                  fill="hsl(var(--primary))"
                  fillOpacity={0.3}
                  strokeWidth={2}
                />
                <Radar
                  name="行业均值"
                  dataKey="行业均值"
                  stroke="hsl(var(--muted-foreground))"
                  fill="hsl(var(--muted-foreground))"
                  fillOpacity={0.1}
                  strokeWidth={1}
                  strokeDasharray="5 5"
                />
                <Radar
                  name="领先竞品"
                  dataKey="领先竞品"
                  stroke="hsl(var(--destructive))"
                  fill="hsl(var(--destructive))"
                  fillOpacity={0.2}
                  strokeWidth={2}
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

        {/* 模型对比柱状图 */}
        <Card>
          <CardHeader>
            <CardTitle>模型表现对比</CardTitle>
            <CardDescription>
              中国模型平均: <span className="font-bold text-primary">{chinaAvg.toFixed(1)}</span> |
              全球模型平均: <span className="font-bold text-accent">{globalAvg.toFixed(1)}</span>
            </CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={350}>
              <BarChart
                data={[
                  ...modelComparison.china.map(m => ({ ...m, region: 'CN' })),
                  ...modelComparison.global.map(m => ({ ...m, region: 'Global' }))
                ]}
              >
                <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                <XAxis
                  dataKey="name"
                  stroke="hsl(var(--muted-foreground))"
                  fontSize={11}
                  angle={-45}
                  textAnchor="end"
                  height={80}
                />
                <YAxis
                  stroke="hsl(var(--muted-foreground))"
                  fontSize={12}
                  domain={[0, 100]}
                />
                <Tooltip
                  contentStyle={{
                    backgroundColor: "hsl(var(--card))",
                    border: "1px solid hsl(var(--border))",
                    borderRadius: "8px",
                  }}
                />
                <Bar
                  dataKey="score"
                  fill="hsl(var(--primary))"
                  radius={[4, 4, 0, 0]}
                />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>

      {/* AI优化建议 */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Sparkles className="w-5 h-5 text-primary" />
            AI自动优化建议
          </CardTitle>
          <CardDescription>基于GEO分析结果生成的优化方案</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          {recommendations.map((rec, idx) => (
            <div
              key={idx}
              className={`p-4 rounded-lg border-l-4 ${rec.priority === "high"
                ? "bg-destructive/5 border-destructive"
                : "bg-warning/5 border-warning"
                }`}
            >
              <div className="flex items-start justify-between gap-4">
                <div className="flex-1 space-y-2">
                  <div className="flex items-center gap-2">
                    <h4 className="font-semibold">{rec.title}</h4>
                    <Badge
                      variant={rec.priority === "high" ? "destructive" : "outline"}
                      className="text-xs"
                    >
                      {rec.priority === "high" ? "高优先级" : "中优先级"}
                    </Badge>
                    <Badge variant="secondary" className="text-xs">
                      {rec.type}
                    </Badge>
                  </div>
                  <p className="text-sm text-muted-foreground">{rec.suggestion}</p>
                  <p className="text-xs font-medium text-success">{rec.impact}</p>
                </div>
                <Button
                  size="sm"
                  variant={rec.priority === "high" ? "default" : "outline"}
                  onClick={() => {
                    if (rec.type === "content") navigate("/generate");
                    else if (rec.type === "schema") navigate("/optimize");
                    else navigate("/strategy");
                  }}
                >
                  {rec.action}
                  <ArrowRight className="w-3 h-3 ml-2" />
                </Button>
              </div>
            </div>
          ))}
        </CardContent>
      </Card>

      {/* 快速操作 */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card className="hover:shadow-md transition-shadow cursor-pointer" onClick={() => navigate("/analytics")}>
          <CardContent className="p-6">
            <div className="flex items-center gap-4">
              <div className="p-3 rounded-lg bg-blue-50 dark:bg-blue-950/20">
                <BarChart className="w-6 h-6 text-blue-500" />
              </div>
              <div>
                <h3 className="font-semibold">详细数据分析</h3>
                <p className="text-sm text-muted-foreground">查看完整指标报告</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="hover:shadow-md transition-shadow cursor-pointer" onClick={() => navigate("/strategy")}>
          <CardContent className="p-6">
            <div className="flex items-center gap-4">
              <div className="p-3 rounded-lg bg-purple-50 dark:bg-purple-950/20">
                <Target className="w-6 h-6 text-purple-500" />
              </div>
              <div>
                <h3 className="font-semibold">GEO内容策略</h3>
                <p className="text-sm text-muted-foreground">优化内容与信源</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="hover:shadow-md transition-shadow cursor-pointer" onClick={() => navigate("/generate")}>
          <CardContent className="p-6">
            <div className="flex items-center gap-4">
              <div className="p-3 rounded-lg bg-green-50 dark:bg-green-950/20">
                <Sparkles className="w-6 h-6 text-green-500" />
              </div>
              <div>
                <h3 className="font-semibold">AI内容生成</h3>
                <p className="text-sm text-muted-foreground">自动生成优化内容</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Dashboard;
