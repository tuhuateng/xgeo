import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Progress } from "@/components/ui/progress";
import { Coins, TrendingUp, Download, CreditCard, Zap } from "lucide-react";

const Billing = () => {
  const tokenBalance = 125000;
  const monthlyUsage = 45000;
  const estimatedDays = 18;

  const usageHistory = [
    {
      id: 1,
      date: "2025-10-19 14:30",
      action: "内容生成",
      consumed: 500,
      operator: "张三",
      content: "露营桌选购指南",
    },
    {
      id: 2,
      date: "2025-10-19 11:20",
      action: "内容优化",
      consumed: 300,
      operator: "李四",
      content: "热毛巾机产品介绍",
    },
    {
      id: 3,
      date: "2025-10-18 16:45",
      action: "关键词研究",
      consumed: 200,
      operator: "王五",
      content: "-",
    },
    {
      id: 4,
      date: "2025-10-18 09:15",
      action: "报告生成",
      consumed: 150,
      operator: "系统",
      content: "周报 2025-W42",
    },
  ];

  const plans = [
    {
      name: "基础版",
      price: "¥299/月",
      tokens: "50,000",
      features: ["5个品牌", "3个成员", "基础分析", "周报"],
      current: false,
    },
    {
      name: "专业版",
      price: "¥899/月",
      tokens: "200,000",
      features: ["20个品牌", "10个成员", "高级分析", "自定义报告", "API访问"],
      current: true,
    },
    {
      name: "企业版",
      price: "¥2,999/月",
      tokens: "1,000,000",
      features: ["无限品牌", "无限成员", "专属支持", "白牌定制", "优先服务"],
      current: false,
    },
  ];

  const invoices = [
    { id: 1, date: "2025-10-01", amount: "¥899", type: "订阅", status: "已支付" },
    { id: 2, date: "2025-09-15", amount: "¥200", type: "充值", status: "已支付" },
    { id: 3, date: "2025-09-01", amount: "¥899", type: "订阅", status: "已支付" },
  ];

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">计费与Token</h1>
        <p className="text-muted-foreground mt-2">管理Token余额、充值与订阅计划</p>
      </div>

      {/* Token 余额卡片 */}
      <div className="grid grid-cols-3 gap-6">
        <Card className="p-6 bg-gradient-to-br from-primary/10 to-accent/10 border-primary/20">
          <div className="flex items-start justify-between mb-4">
            <div className="p-3 rounded-lg bg-primary/10">
              <Coins className="h-6 w-6 text-primary" />
            </div>
            <Button size="sm">充值</Button>
          </div>
          <p className="text-sm text-muted-foreground mb-1">Token 余额</p>
          <p className="text-3xl font-bold mb-2">{tokenBalance.toLocaleString()}</p>
          <p className="text-xs text-muted-foreground">
            预计可用 {estimatedDays} 天
          </p>
        </Card>

        <Card className="p-6">
          <div className="flex items-start justify-between mb-4">
            <div className="p-3 rounded-lg bg-success/10">
              <TrendingUp className="h-6 w-6 text-success" />
            </div>
          </div>
          <p className="text-sm text-muted-foreground mb-1">本月使用</p>
          <p className="text-3xl font-bold mb-2">{monthlyUsage.toLocaleString()}</p>
          <Progress value={(monthlyUsage / 200000) * 100} className="h-2" />
        </Card>

        <Card className="p-6">
          <div className="flex items-start justify-between mb-4">
            <div className="p-3 rounded-lg bg-info/10">
              <Zap className="h-6 w-6 text-info" />
            </div>
          </div>
          <p className="text-sm text-muted-foreground mb-1">当前计划</p>
          <p className="text-3xl font-bold mb-2">专业版</p>
          <Button size="sm" variant="outline" className="w-full mt-2">
            升级计划
          </Button>
        </Card>
      </div>

      {/* 使用明细 */}
      <Card className="p-6">
        <div className="flex items-center justify-between mb-4">
          <h3 className="font-semibold">使用明细</h3>
          <Button size="sm" variant="outline">
            <Download className="h-3 w-3 mr-2" />
            导出明细
          </Button>
        </div>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>时间</TableHead>
              <TableHead>动作</TableHead>
              <TableHead>消耗Token</TableHead>
              <TableHead>操作者</TableHead>
              <TableHead>关联内容</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {usageHistory.map((item) => (
              <TableRow key={item.id}>
                <TableCell className="text-muted-foreground">{item.date}</TableCell>
                <TableCell>
                  <Badge variant="outline">{item.action}</Badge>
                </TableCell>
                <TableCell className="font-medium">-{item.consumed}</TableCell>
                <TableCell>{item.operator}</TableCell>
                <TableCell className="text-muted-foreground">{item.content}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </Card>

      {/* 订阅计划 */}
      <div>
        <h3 className="font-semibold mb-4">订阅计划</h3>
        <div className="grid grid-cols-3 gap-6">
          {plans.map((plan, index) => (
            <Card
              key={index}
              className={`p-6 ${plan.current ? "border-primary shadow-lg" : ""}`}
            >
              {plan.current && (
                <Badge className="mb-4 bg-primary">当前计划</Badge>
              )}
              <h3 className="text-xl font-bold mb-2">{plan.name}</h3>
              <p className="text-3xl font-bold text-primary mb-1">{plan.price}</p>
              <p className="text-sm text-muted-foreground mb-6">
                包含 {plan.tokens} Token/月
              </p>
              <div className="space-y-2 mb-6">
                {plan.features.map((feature, i) => (
                  <div key={i} className="flex items-center gap-2 text-sm">
                    <div className="w-1.5 h-1.5 rounded-full bg-primary" />
                    {feature}
                  </div>
                ))}
              </div>
              <Button
                className="w-full"
                variant={plan.current ? "outline" : "default"}
                disabled={plan.current}
              >
                {plan.current ? "已订阅" : "选择计划"}
              </Button>
            </Card>
          ))}
        </div>
      </div>

      {/* 充值选项 */}
      <Card className="p-6">
        <h3 className="font-semibold mb-4">Token 充值</h3>
        <div className="grid grid-cols-4 gap-4 mb-6">
          {[
            { amount: "200", tokens: "10,000", bonus: "" },
            { amount: "500", tokens: "30,000", bonus: "+2,000" },
            { amount: "1000", tokens: "70,000", bonus: "+5,000" },
            { amount: "2000", tokens: "150,000", bonus: "+15,000" },
          ].map((item, index) => (
            <div
              key={index}
              className="p-4 rounded-lg border hover:border-primary cursor-pointer transition-colors"
            >
              <p className="text-2xl font-bold mb-1">¥{item.amount}</p>
              <p className="text-sm text-muted-foreground">{item.tokens} Token</p>
              {item.bonus && (
                <Badge variant="secondary" className="mt-2 text-xs">
                  {item.bonus} 赠送
                </Badge>
              )}
            </div>
          ))}
        </div>
        <div className="flex items-center gap-3">
          <Button>
            <CreditCard className="h-4 w-4 mr-2" />
            支付宝
          </Button>
          <Button variant="outline">微信支付</Button>
          <Button variant="outline">企业转账</Button>
        </div>
      </Card>

      {/* 发票历史 */}
      <Card className="p-6">
        <h3 className="font-semibold mb-4">发票与订单</h3>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>日期</TableHead>
              <TableHead>金额</TableHead>
              <TableHead>类型</TableHead>
              <TableHead>状态</TableHead>
              <TableHead className="text-right">操作</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {invoices.map((invoice) => (
              <TableRow key={invoice.id}>
                <TableCell className="text-muted-foreground">{invoice.date}</TableCell>
                <TableCell className="font-medium">{invoice.amount}</TableCell>
                <TableCell>
                  <Badge variant="outline">{invoice.type}</Badge>
                </TableCell>
                <TableCell>
                  <Badge className="bg-success">{invoice.status}</Badge>
                </TableCell>
                <TableCell className="text-right">
                  <Button size="sm" variant="ghost">
                    <Download className="h-3 w-3" />
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </Card>
    </div>
  );
};

export default Billing;
