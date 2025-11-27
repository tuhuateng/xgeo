import { useState } from "react";
import { Upload, FileText, Sparkles, ArrowRight, CheckCircle2, TrendingUp, Copy, Download } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Textarea } from "@/components/ui/textarea";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

const Optimize = () => {
  const [inputMethod, setInputMethod] = useState<"paste" | "upload">("paste");
  const [textInput, setTextInput] = useState("");
  const [uploadedFile, setUploadedFile] = useState<File | null>(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [showResults, setShowResults] = useState(false);

  // 优化建议数据
  const optimizationSuggestions = [
    {
      type: "critical",
      title: "标题优化",
      original: "露营桌选购指南",
      optimized: "如何选择露营桌？看这3个关键指标就够了",
      reason: "疑问句式提升LLM识别度78%，增加关键指标说明提高点击率",
      impact: "+85% LLM提及率"
    },
    {
      type: "important",
      title: "结构优化",
      original: "产品特点：轻便、耐用...",
      optimized: "Q: 为什么选择铝合金材质？\nA: 铝合金材质具有三大优势：1.重量轻便（仅2.3kg）2.承重力强（可承重50kg）3.防腐蚀性好",
      reason: "Q&A格式更易被LLM提取和引用",
      impact: "+62% 结构化得分"
    },
    {
      type: "recommended",
      title: "关键词布局",
      original: "我们的产品很好用",
      optimized: "XGEO便携折叠露营桌，采用航空铝合金材质，3秒快速展开，适合户外露营、野餐使用",
      reason: "增加品牌名、产品属性、使用场景等关键信息",
      impact: "+45% 关键词密度"
    }
  ];

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setUploadedFile(file);
    }
  };

  const handleAnalyze = () => {
    setIsAnalyzing(true);
    // 模拟分析过程
    setTimeout(() => {
      setIsAnalyzing(false);
      setShowResults(true);
    }, 2000);
  };

  const canAnalyze = inputMethod === "paste" ? textInput.trim().length > 0 : uploadedFile !== null;

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold">内容优化</h1>
        <p className="text-muted-foreground mt-1">AI驱动的内容智能优化，提升LLM收录率</p>
      </div>

      {!showResults ? (
        <>
          {/* 输入方式选择 */}
          <Tabs value={inputMethod} onValueChange={(v) => setInputMethod(v as "paste" | "upload")}>
            <TabsList className="grid w-full max-w-md grid-cols-2">
              <TabsTrigger value="paste">粘贴文本</TabsTrigger>
              <TabsTrigger value="upload">上传文件</TabsTrigger>
            </TabsList>

            <TabsContent value="paste" className="space-y-4">
              <Card>
                <CardHeader>
                  <CardTitle>粘贴内容文本</CardTitle>
                  <CardDescription>直接粘贴需要优化的文本内容</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <Textarea
                    placeholder="粘贴您的内容文本，支持标题、正文、描述等任何形式的文本内容..."
                    className="min-h-[300px] font-mono text-sm"
                    value={textInput}
                    onChange={(e) => setTextInput(e.target.value)}
                  />
                  <div className="flex items-center gap-2 text-xs text-muted-foreground">
                    <FileText className="w-4 h-4" />
                    <span>已输入 {textInput.length} 字符</span>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="upload" className="space-y-4">
              <Card>
                <CardHeader>
                  <CardTitle>上传文件</CardTitle>
                  <CardDescription>支持 PDF、Word、TXT、Markdown 等多种格式</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="border-2 border-dashed rounded-lg p-8 text-center hover:border-primary/50 transition-colors">
                    <input
                      type="file"
                      id="file-upload"
                      className="hidden"
                      accept=".pdf,.doc,.docx,.txt,.md"
                      onChange={handleFileUpload}
                    />
                    <label htmlFor="file-upload" className="cursor-pointer">
                      <Upload className="w-12 h-12 mx-auto mb-4 text-muted-foreground" />
                      <p className="text-sm font-medium mb-1">点击上传或拖拽文件到此处</p>
                      <p className="text-xs text-muted-foreground">
                        支持格式：PDF, Word (.doc/.docx), TXT, Markdown (.md)
                      </p>
                      <p className="text-xs text-muted-foreground mt-1">
                        最大文件大小：10MB
                      </p>
                    </label>
                  </div>
                  
                  {uploadedFile && (
                    <div className="flex items-center gap-3 p-3 bg-muted rounded-lg">
                      <FileText className="w-5 h-5 text-primary" />
                      <div className="flex-1">
                        <p className="text-sm font-medium">{uploadedFile.name}</p>
                        <p className="text-xs text-muted-foreground">
                          {(uploadedFile.size / 1024).toFixed(2)} KB
                        </p>
                      </div>
                      <Button
                        size="sm"
                        variant="ghost"
                        onClick={() => setUploadedFile(null)}
                      >
                        移除
                      </Button>
                    </div>
                  )}
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>

          {/* 分析按钮 */}
          <div className="flex justify-center">
            <Button
              size="lg"
              className="bg-gradient-primary min-w-[200px]"
              disabled={!canAnalyze || isAnalyzing}
              onClick={handleAnalyze}
            >
              {isAnalyzing ? (
                <>
                  <Sparkles className="w-5 h-5 mr-2 animate-spin" />
                  AI分析中...
                </>
              ) : (
                <>
                  <Sparkles className="w-5 h-5 mr-2" />
                  开始AI优化分析
                </>
              )}
            </Button>
          </div>
        </>
      ) : (
        <>
          {/* 优化结果 */}
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle className="flex items-center gap-2">
                    <CheckCircle2 className="w-6 h-6 text-success" />
                    优化分析完成
                  </CardTitle>
                  <CardDescription className="mt-1">
                    AI已识别出3个关键优化点，预计提升LLM提及率85%
                  </CardDescription>
                </div>
                <Button variant="outline" onClick={() => setShowResults(false)}>
                  重新分析
                </Button>
              </div>
            </CardHeader>
            <CardContent className="space-y-6">
              {/* 整体评分 */}
              <div className="grid grid-cols-3 gap-4">
                <Card className="bg-gradient-to-br from-primary/10 to-primary/5">
                  <CardContent className="p-4 text-center">
                    <p className="text-sm text-muted-foreground mb-1">当前得分</p>
                    <p className="text-3xl font-bold text-primary">62</p>
                  </CardContent>
                </Card>
                <Card className="bg-gradient-to-br from-success/10 to-success/5">
                  <CardContent className="p-4 text-center">
                    <p className="text-sm text-muted-foreground mb-1">优化后预期</p>
                    <p className="text-3xl font-bold text-success">88</p>
                  </CardContent>
                </Card>
                <Card className="bg-gradient-to-br from-info/10 to-info/5">
                  <CardContent className="p-4 text-center">
                    <p className="text-sm text-muted-foreground mb-1">提升幅度</p>
                    <p className="text-3xl font-bold text-info flex items-center justify-center gap-1">
                      <TrendingUp className="w-6 h-6" />
                      +26
                    </p>
                  </CardContent>
                </Card>
              </div>

              {/* 优化建议列表 */}
              <div className="space-y-4">
                {optimizationSuggestions.map((suggestion, idx) => (
                  <Card key={idx} className={`border-l-4 ${
                    suggestion.type === "critical" ? "border-l-destructive" :
                    suggestion.type === "important" ? "border-l-warning" :
                    "border-l-info"
                  }`}>
                    <CardContent className="p-5 space-y-3">
                      <div className="flex items-start justify-between gap-4">
                        <div className="flex-1">
                          <div className="flex items-center gap-2 mb-2">
                            <h4 className="font-semibold">{suggestion.title}</h4>
                            <Badge variant={
                              suggestion.type === "critical" ? "destructive" :
                              suggestion.type === "important" ? "default" :
                              "secondary"
                            }>
                              {suggestion.impact}
                            </Badge>
                          </div>
                          
                          <div className="space-y-2">
                            <div className="p-3 bg-muted/50 rounded">
                              <p className="text-xs font-medium text-muted-foreground mb-1">原内容：</p>
                              <p className="text-sm">{suggestion.original}</p>
                            </div>
                            
                            <div className="p-3 bg-success/5 border border-success/20 rounded">
                              <p className="text-xs font-medium text-success mb-1">优化后：</p>
                              <p className="text-sm whitespace-pre-line">{suggestion.optimized}</p>
                            </div>
                            
                            <div className="flex items-start gap-2 text-xs text-muted-foreground">
                              <Sparkles className="w-4 h-4 mt-0.5 text-primary shrink-0" />
                              <p>{suggestion.reason}</p>
                            </div>
                          </div>
                        </div>
                        <div className="flex flex-col gap-2 shrink-0">
                          <Button size="sm" variant="outline">
                            <Copy className="w-3 h-3 mr-1" />
                            复制
                          </Button>
                          <Button size="sm" variant="outline">
                            应用
                          </Button>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>

              {/* 操作按钮 */}
              <div className="flex gap-3 pt-4 border-t">
                <Button className="flex-1">
                  <CheckCircle2 className="w-4 h-4 mr-2" />
                  全部应用优化
                </Button>
                <Button variant="outline" className="flex-1">
                  <Download className="w-4 h-4 mr-2" />
                  导出优化报告
                </Button>
              </div>
            </CardContent>
          </Card>
        </>
      )}
    </div>
  );
};

export default Optimize;