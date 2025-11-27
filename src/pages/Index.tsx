import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { Search, Globe, TrendingUp, Target, Sparkles } from "lucide-react";

const Index = () => {
  const [inputValue, setInputValue] = useState("");
  const [analysisResult, setAnalysisResult] = useState<{
    type: "platform" | "global";
    detectedPlatform?: string;
    brandName?: string;
    onSiteAnalysis?: {
      needNewPages: boolean;
      deficiencies: string[];
      contentQuality: string;
      publishingQuality: string;
    };
    offSiteAnalysis?: {
      llmCoverage: string[];
      sourceQuality: string;
      recommendedPlatforms: string[];
    };
  } | null>(null);

  // 自动分析逻辑
  const handleAnalyze = () => {
    const input = inputValue.toLowerCase();
    
    // 检测是否为特定平台链接或内容
    const isPlatformSpecific = 
      input.includes("xiaohongshu.com") || input.includes("小红书") ||
      input.includes("douyin.com") || input.includes("抖音") ||
      input.includes("weixin") || input.includes("公众号") ||
      input.includes("zhihu.com") || input.includes("知乎");

    if (isPlatformSpecific) {
      const platform = input.includes("xiaohongshu") || input.includes("小红书") ? "小红书" :
                      input.includes("douyin") || input.includes("抖音") ? "抖音" :
                      input.includes("weixin") || input.includes("公众号") ? "微信公众号" : "知乎";
      
      setAnalysisResult({ 
        type: "platform", 
        detectedPlatform: platform,
        offSiteAnalysis: {
          llmCoverage: ["ChatGPT", "Claude", "Gemini"],
          sourceQuality: "该平台内容质量中等，LLM抓取概率较高",
          recommendedPlatforms: ["知乎", "官方博客", "技术社区"]
        }
      });
    } else {
      // 全局分析
      setAnalysisResult({ 
        type: "global", 
        brandName: inputValue,
        onSiteAnalysis: {
          needNewPages: true,
          deficiencies: [
            "缺少针对AI问答优化的FAQ页面",
            "产品页面结构化数据不完整",
            "关键问答内容覆盖不足"
          ],
          contentQuality: "当前内容AI友好度：60分，建议增加结构化问答内容",
          publishingQuality: "已发布渠道：3个，建议扩展至8-10个高质量信源"
        },
        offSiteAnalysis: {
          llmCoverage: ["ChatGPT", "Claude", "文心一言", "豆包"],
          sourceQuality: "当前信源权威性较低，建议增加技术社区和行业媒体发布",
          recommendedPlatforms: ["知乎专栏", "CSDN", "掘金", "Medium", "Dev.to", "官方博客"]
        }
      });
    }
  };

  const quickStats = [
    { label: "LLM提及次数", value: "1,234", change: "+12%", icon: Sparkles },
    { label: "平均排名", value: "#3", change: "+2位", icon: TrendingUp },
    { label: "信源覆盖", value: "45个", change: "+8", icon: Globe },
    { label: "转化率", value: "8.9%", change: "+1.2%", icon: Target },
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold">品牌GEO分析</h1>
        <p className="text-muted-foreground mt-1">输入品牌名或内容链接，自动分析在生成式AI中的表现</p>
      </div>

      {/* 分析输入 */}
      <Card>
        <CardHeader>
          <CardTitle>开始分析</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <Label>输入品牌名或内容链接</Label>
            <div className="flex gap-2 mt-2">
              <Input
                placeholder="例如：XGEO品牌 或 https://xiaohongshu.com/..."
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                className="flex-1"
              />
              <Button onClick={handleAnalyze} disabled={!inputValue.trim()}>
                <Search className="w-4 h-4 mr-2" />
                智能分析
              </Button>
            </div>
            <p className="text-xs text-muted-foreground mt-2">
              系统将自动识别：特定平台内容 → 平台分析 | 品牌名称 → 全网GEO分析
            </p>
          </div>

          {/* 分析结果 */}
          {analysisResult && (
            <div className="space-y-4">
              <div className="p-4 rounded-lg border bg-muted/50">
                <div className="flex items-center gap-2 mb-3">
                  {analysisResult.type === "platform" ? (
                    <>
                      <Badge variant="secondary">特定平台分析</Badge>
                      <span className="text-sm">检测到平台：{analysisResult.detectedPlatform}</span>
                    </>
                  ) : (
                    <>
                      <Badge variant="default">全网GEO分析</Badge>
                      <span className="text-sm">品牌：{analysisResult.brandName}</span>
                    </>
                  )}
                </div>
              </div>

              {/* 站内分析 */}
              {analysisResult.onSiteAnalysis && (
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      🏠 站内优化建议
                      {analysisResult.onSiteAnalysis.needNewPages && (
                        <Badge variant="destructive">需要优化</Badge>
                      )}
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div>
                      <h4 className="font-semibold mb-2">当前不足</h4>
                      <ul className="space-y-1">
                        {analysisResult.onSiteAnalysis.deficiencies.map((item, idx) => (
                          <li key={idx} className="text-sm text-muted-foreground flex items-start gap-2">
                            <span className="text-destructive">•</span>
                            {item}
                          </li>
                        ))}
                      </ul>
                    </div>
                    <div>
                      <h4 className="font-semibold mb-2">内容质量评价</h4>
                      <p className="text-sm text-muted-foreground">{analysisResult.onSiteAnalysis.contentQuality}</p>
                    </div>
                    <div>
                      <h4 className="font-semibold mb-2">发布渠道评价</h4>
                      <p className="text-sm text-muted-foreground">{analysisResult.onSiteAnalysis.publishingQuality}</p>
                    </div>
                  </CardContent>
                </Card>
              )}

              {/* 站外分析 */}
              {analysisResult.offSiteAnalysis && (
                <Card>
                  <CardHeader>
                    <CardTitle>🌐 站外信源分析</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div>
                      <h4 className="font-semibold mb-2">LLM覆盖情况</h4>
                      <div className="flex flex-wrap gap-2">
                        {analysisResult.offSiteAnalysis.llmCoverage.map((llm, idx) => (
                          <Badge key={idx} variant="secondary">{llm}</Badge>
                        ))}
                      </div>
                    </div>
                    <div>
                      <h4 className="font-semibold mb-2">信源质量评价</h4>
                      <p className="text-sm text-muted-foreground">{analysisResult.offSiteAnalysis.sourceQuality}</p>
                    </div>
                    <div>
                      <h4 className="font-semibold mb-2">推荐发布平台</h4>
                      <div className="flex flex-wrap gap-2">
                        {analysisResult.offSiteAnalysis.recommendedPlatforms.map((platform, idx) => (
                          <Badge key={idx} variant="outline">{platform}</Badge>
                        ))}
                      </div>
                    </div>
                  </CardContent>
                </Card>
              )}
            </div>
          )}
        </CardContent>
      </Card>

      {/* 快速统计 */}
      {analysisResult && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {quickStats.map((stat, index) => (
            <Card key={index}>
              <CardContent className="p-6">
                <div className="flex items-start justify-between">
                  <div className="space-y-2">
                    <p className="text-sm text-muted-foreground">{stat.label}</p>
                    <p className="text-2xl font-bold">{stat.value}</p>
                    <Badge variant="secondary" className="text-xs">
                      <TrendingUp className="w-3 h-3 mr-1" />
                      {stat.change}
                    </Badge>
                  </div>
                  <stat.icon className="w-8 h-8 text-muted-foreground opacity-50" />
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}

      {/* GEO分析维度说明 */}
      {analysisResult && analysisResult.type === "global" && (
        <Card>
          <CardHeader>
            <CardTitle>GEO分析维度</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="p-4 rounded-lg border">
                <h4 className="font-semibold mb-2">📍 信源质量分析</h4>
                <p className="text-sm text-muted-foreground">分析品牌内容在哪些网站被发布，这些信源的权威性和被LLM抓取的概率</p>
              </div>
              <div className="p-4 rounded-lg border">
                <h4 className="font-semibold mb-2">🤖 LLM提及分析</h4>
                <p className="text-sm text-muted-foreground">在ChatGPT、Claude、Gemini等大模型中被提及的次数和排名</p>
              </div>
              <div className="p-4 rounded-lg border">
                <h4 className="font-semibold mb-2">💬 问答角度优化</h4>
                <p className="text-sm text-muted-foreground">分析哪些问答角度最容易被大模型抓取和引用</p>
              </div>
              <div className="p-4 rounded-lg border">
                <h4 className="font-semibold mb-2">📊 转化效果追踪</h4>
                <p className="text-sm text-muted-foreground">监控通过LLM引用带来的实际转化和业务效果</p>
              </div>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default Index;
