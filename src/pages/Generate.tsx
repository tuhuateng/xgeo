import { useState } from "react";
import { Target, TrendingUp, Users, Megaphone, Sparkles, ChevronRight, FileText, Image as ImageIcon, Video, Mail, MessageSquare, Lightbulb, History, Calendar, Eye } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

const Generate = () => {
  const [activeTab, setActiveTab] = useState<"generate" | "archive">("generate");
  const [step, setStep] = useState<"objective" | "input" | "format">("objective");
  const [selectedObjective, setSelectedObjective] = useState<string>("");
  const [selectedFormats, setSelectedFormats] = useState<string[]>([]);
  const [userInput, setUserInput] = useState("");

  // 已优化内容历史数据
  const optimizedHistory = [
    {
      id: 1,
      title: "露营桌选购：材质、承重与收纳的三件事",
      objective: "提升转化",
      formats: ["文章", "帖文"],
      optimizedAt: "2025-10-20",
      llmMentions: 285,
      ranking: 2,
      status: "表现优秀"
    },
    {
      id: 2,
      title: "为什么铝合金露营桌比钢制的更受欢迎？",
      objective: "增加曝光",
      formats: ["文章"],
      optimizedAt: "2025-10-18",
      llmMentions: 218,
      ranking: 3,
      status: "表现良好"
    },
    {
      id: 3,
      title: "户外装备保养的5个关键要点",
      objective: "提升排名",
      formats: ["文章", "EDM"],
      optimizedAt: "2025-10-15",
      llmMentions: 192,
      ranking: 4,
      status: "表现一般"
    }
  ];

  // 营销目标选项
  const objectives = [
    {
      id: "conversion",
      title: "提升转化",
      description: "优化内容以提高转化率",
      icon: Sparkles,
      color: "text-blue-500",
    },
    {
      id: "exposure",
      title: "增加曝光",
      description: "提升品牌在LLM中的可见度",
      icon: TrendingUp,
      color: "text-purple-500",
    },
    {
      id: "leads",
      title: "增加线索",
      description: "生成吸引潜在客户的内容",
      icon: Target,
      color: "text-green-500",
    },
    {
      id: "ranking",
      title: "提升排名",
      description: "在AI回答中获得更高排名",
      icon: TrendingUp,
      color: "text-orange-500",
    },
  ];

  // 内容格式选项
  const contentFormats = [
    { id: "article", label: "文章", icon: FileText, description: "深度内容，适合SEO" },
    { id: "post", label: "帖文", icon: MessageSquare, description: "社交媒体短内容" },
    { id: "ad", label: "广告文案", icon: ImageIcon, description: "转化型营销文案" },
    { id: "video", label: "视频脚本", icon: Video, description: "短视频或长视频脚本" },
    { id: "email", label: "EDM", icon: Mail, description: "邮件营销内容" },
  ];

  // 智能推荐模板（基于品牌和关键词）
  const recommendedTemplates = [
    { id: 1, name: "户外产品评测", match: "95%", reason: "基于您的品牌：户外装备" },
    { id: 2, name: "露营场景营销", match: "88%", reason: "匹配关键词：露营、户外" },
    { id: 3, name: "产品使用指南", match: "82%", reason: "高转化模板" },
  ];

  const handleObjectiveSelect = (objectiveId: string) => {
    setSelectedObjective(objectiveId);
    setStep("input");
  };

  const handleFormatToggle = (formatId: string) => {
    setSelectedFormats(prev => 
      prev.includes(formatId) 
        ? prev.filter(id => id !== formatId)
        : [...prev, formatId]
    );
  };

  const handleGenerate = () => {
    // TODO: 调用AI生成内容
    console.log({
      objective: selectedObjective,
      formats: selectedFormats,
      input: userInput,
    });
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold">内容生成</h1>
        <p className="text-muted-foreground mt-1">AI 驱动的智能内容创作与历史管理</p>
      </div>

      {/* Tabs */}
      <Tabs value={activeTab} onValueChange={(v) => setActiveTab(v as "generate" | "archive")}>
        <TabsList>
          <TabsTrigger value="generate">
            <Sparkles className="w-4 h-4 mr-2" />
            AI内容生成
          </TabsTrigger>
          <TabsTrigger value="archive">
            <History className="w-4 h-4 mr-2" />
            已优化内容历史
          </TabsTrigger>
        </TabsList>

        {/* AI内容生成 Tab */}
        <TabsContent value="generate" className="space-y-6 mt-6">

      {/* Progress Steps */}
      <div className="flex items-center gap-2 text-sm">
        <div className={`flex items-center gap-2 ${step === "objective" ? "text-primary font-medium" : "text-muted-foreground"}`}>
          <div className={`w-6 h-6 rounded-full flex items-center justify-center ${step === "objective" ? "bg-primary text-primary-foreground" : "bg-muted"}`}>
            1
          </div>
          <span>选择营销目标</span>
        </div>
        <ChevronRight className="w-4 h-4 text-muted-foreground" />
        <div className={`flex items-center gap-2 ${step === "input" ? "text-primary font-medium" : "text-muted-foreground"}`}>
          <div className={`w-6 h-6 rounded-full flex items-center justify-center ${step === "input" ? "bg-primary text-primary-foreground" : "bg-muted"}`}>
            2
          </div>
          <span>输入创作需求</span>
        </div>
        <ChevronRight className="w-4 h-4 text-muted-foreground" />
        <div className={`flex items-center gap-2 ${step === "format" ? "text-primary font-medium" : "text-muted-foreground"}`}>
          <div className={`w-6 h-6 rounded-full flex items-center justify-center ${step === "format" ? "bg-primary text-primary-foreground" : "bg-muted"}`}>
            3
          </div>
          <span>选择内容格式</span>
        </div>
      </div>

      {/* Step 1: 选择营销目标 */}
      {step === "objective" && (
        <div className="space-y-4">
          <div>
            <h2 className="text-xl font-semibold mb-1">您的营销目标是什么？</h2>
            <p className="text-sm text-muted-foreground">选择一个目标，AI 将为您生成针对性的内容</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {objectives.map((obj) => (
              <Card
                key={obj.id}
                className="cursor-pointer hover:border-primary transition-all hover:shadow-lg"
                onClick={() => handleObjectiveSelect(obj.id)}
              >
                <CardContent className="p-6">
                  <div className="flex items-start gap-4">
                    <div className={`p-3 rounded-lg bg-muted ${obj.color}`}>
                      <obj.icon className="w-6 h-6" />
                    </div>
                    <div className="flex-1">
                      <h3 className="font-semibold mb-1">{obj.title}</h3>
                      <p className="text-sm text-muted-foreground">{obj.description}</p>
                    </div>
                    <ChevronRight className="w-5 h-5 text-muted-foreground" />
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      )}

      {/* Step 2: 用户输入 */}
      {step === "input" && (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2 space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>描述您的创作需求</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <Label>您想创作什么内容？</Label>
                  <Textarea
                    placeholder="例如：介绍我们的新款户外露营桌，强调它的便携性和耐用性，目标受群是喜欢周末露营的年轻家庭..."
                    className="mt-1.5 min-h-[150px]"
                    value={userInput}
                    onChange={(e) => setUserInput(e.target.value)}
                  />
                  <p className="text-xs text-muted-foreground mt-1.5">
                    <Lightbulb className="w-3 h-3 inline mr-1" />
                    提示：描述得越详细，AI 生成的内容越精准
                  </p>
                </div>

                <div className="flex gap-2">
                  <Button
                    variant="outline"
                    onClick={() => setStep("objective")}
                  >
                    上一步
                  </Button>
                  <Button
                    onClick={() => setStep("format")}
                    disabled={!userInput.trim()}
                    className="bg-gradient-primary"
                  >
                    下一步：选择格式
                    <ChevronRight className="w-4 h-4 ml-1" />
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>

          <div className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle className="text-base">智能推荐模板</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                {recommendedTemplates.map((template) => (
                  <div
                    key={template.id}
                    className="p-3 rounded-lg bg-muted hover:bg-muted/70 transition-colors cursor-pointer"
                  >
                    <div className="flex items-center justify-between mb-1">
                      <span className="text-sm font-medium">{template.name}</span>
                      <Badge variant="secondary" className="text-xs">
                        匹配 {template.match}
                      </Badge>
                    </div>
                    <p className="text-xs text-muted-foreground">{template.reason}</p>
                  </div>
                ))}
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="text-base">已选目标</CardTitle>
              </CardHeader>
              <CardContent>
                {selectedObjective && (
                  <div className="flex items-center gap-2">
                    {(() => {
                      const obj = objectives.find(o => o.id === selectedObjective);
                      return obj ? (
                        <>
                          <obj.icon className={`w-5 h-5 ${obj.color}`} />
                          <span className="text-sm font-medium">{obj.title}</span>
                        </>
                      ) : null;
                    })()}
                  </div>
                )}
              </CardContent>
            </Card>
          </div>
        </div>
      )}

      {/* Step 3: 选择内容格式 */}
      {step === "format" && (
        <div className="space-y-4">
          <div>
            <h2 className="text-xl font-semibold mb-1">选择内容格式</h2>
            <p className="text-sm text-muted-foreground">可多选，AI 将为每种格式生成对应版本</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {contentFormats.map((format) => (
              <Card
                key={format.id}
                className={`cursor-pointer transition-all ${
                  selectedFormats.includes(format.id)
                    ? "border-primary bg-primary/5"
                    : "hover:border-muted-foreground/50"
                }`}
                onClick={() => handleFormatToggle(format.id)}
              >
                <CardContent className="p-4">
                  <div className="flex items-start gap-3">
                    <Checkbox
                      checked={selectedFormats.includes(format.id)}
                      onCheckedChange={() => handleFormatToggle(format.id)}
                    />
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-1">
                        <format.icon className="w-4 h-4" />
                        <span className="font-medium">{format.label}</span>
                      </div>
                      <p className="text-xs text-muted-foreground">{format.description}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          <div className="flex gap-2">
            <Button
              variant="outline"
              onClick={() => setStep("input")}
            >
              上一步
            </Button>
            <Button
              onClick={handleGenerate}
              disabled={selectedFormats.length === 0}
              className="bg-gradient-primary"
            >
              <Sparkles className="w-4 h-4 mr-2" />
              开始生成内容
            </Button>
          </div>
        </div>
      )}
        </TabsContent>

        {/* 已优化内容历史 Tab */}
        <TabsContent value="archive" className="space-y-6 mt-6">
          <Card>
            <CardHeader>
              <CardTitle>已优化内容历史</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {optimizedHistory.map((item) => (
                  <div
                    key={item.id}
                    className="p-4 rounded-lg border hover:shadow-sm transition-shadow"
                  >
                    <div className="flex items-start justify-between gap-4">
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2 mb-2">
                          <h4 className="font-medium">{item.title}</h4>
                          <Badge variant="outline">{item.objective}</Badge>
                        </div>
                        <div className="flex items-center gap-2 mb-3">
                          {item.formats.map((format) => (
                            <Badge key={format} variant="secondary" className="text-xs">
                              {format}
                            </Badge>
                          ))}
                        </div>
                        <div className="grid grid-cols-3 gap-4 text-sm">
                          <div>
                            <span className="text-muted-foreground flex items-center gap-1">
                              <Eye className="w-3 h-3" />
                              LLM提及
                            </span>
                            <div className="font-medium mt-1">{item.llmMentions}次</div>
                          </div>
                          <div>
                            <span className="text-muted-foreground flex items-center gap-1">
                              <Target className="w-3 h-3" />
                              排名
                            </span>
                            <div className="font-medium mt-1">#{item.ranking}</div>
                          </div>
                          <div>
                            <span className="text-muted-foreground flex items-center gap-1">
                              <Calendar className="w-3 h-3" />
                              优化日期
                            </span>
                            <div className="font-medium mt-1">{item.optimizedAt}</div>
                          </div>
                        </div>
                      </div>
                      <div className="flex flex-col items-end gap-2">
                        <Badge 
                          variant={
                            item.status === "表现优秀" ? "default" : 
                            item.status === "表现良好" ? "secondary" : 
                            "outline"
                          }
                        >
                          {item.status}
                        </Badge>
                        <Button size="sm" variant="outline">查看详情</Button>
                      </div>
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

export default Generate;
