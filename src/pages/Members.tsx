import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { UserPlus, MoreVertical, Shield } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

const Members = () => {
  const members = [
    {
      id: 1,
      name: "张三",
      email: "zhangsan@example.com",
      role: "Owner",
      status: "active",
      brands: ["XGEO官方", "Alpha家电"],
      monthlyConsumption: "¥1,280",
      joinedAt: "2025-01-15",
    },
    {
      id: 2,
      name: "李四",
      email: "lisi@example.com",
      role: "Operator",
      status: "active",
      brands: ["XGEO官方"],
      monthlyConsumption: "¥580",
      joinedAt: "2025-02-20",
    },
    {
      id: 3,
      name: "王五",
      email: "wangwu@example.com",
      role: "Collaborator",
      status: "active",
      brands: ["Alpha家电", "Nova护肤"],
      monthlyConsumption: "¥0",
      joinedAt: "2025-03-10",
    },
    {
      id: 4,
      name: "赵六",
      email: "zhaoliu@example.com",
      role: "Viewer",
      status: "active",
      brands: ["Nova护肤"],
      monthlyConsumption: "¥0",
      joinedAt: "2025-04-05",
    },
    {
      id: 5,
      name: "品牌方代表",
      email: "brand@partner.com",
      role: "Viewer",
      status: "active",
      brands: ["Alpha家电"],
      monthlyConsumption: "¥0",
      joinedAt: "2025-05-01",
    },
  ];

  const roleDescriptions = [
    {
      role: "Owner",
      description: "拥有者",
      permissions: ["全部权限", "计费充值", "成员管理", "品牌管理", "白牌设置", "所有数据访问"],
      detail: "拥有系统最高权限，包括计费充值、成员管理等敏感操作",
      color: "bg-gradient-to-br from-primary to-primary/70",
    },
    {
      role: "Operator",
      description: "操作者",
      permissions: ["调研分析", "内容优化", "AI消费", "查看费用", "数据分析", "内容发布"],
      detail: "执行日常运营工作，可使用AI功能并产生消费，可查看费用明细",
      color: "bg-gradient-to-br from-success to-success/70",
    },
    {
      role: "Collaborator",
      description: "协作者",
      permissions: ["查看监控数据", "查看优化表现", "查看消费效果", "只读访问"],
      detail: "只读权限，可查看数据监控和优化表现，不能操作内容，不产生消费",
      color: "bg-gradient-to-br from-info to-info/70",
    },
    {
      role: "Viewer",
      description: "外部查看者",
      permissions: ["查看统计结论", "查看表现数据"],
      detail: "外部人员（如品牌方）查看权限，仅可见统计结论和表现数据，不可见付费相关信息",
      color: "bg-gradient-to-br from-muted to-muted/70",
    },
  ];

  const getRoleBadgeVariant = (role: string) => {
    switch (role) {
      case "Owner":
        return "default";
      case "Operator":
        return "secondary";
      case "Collaborator":
        return "outline";
      case "Viewer":
        return "secondary";
      default:
        return "secondary";
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">成员与权限</h1>
          <p className="text-muted-foreground mt-2">管理团队成员与分级权限</p>
        </div>
        <Button>
          <UserPlus className="h-4 w-4 mr-2" />
          邀请成员
        </Button>
      </div>

      {/* 权限说明 */}
      <div className="grid grid-cols-4 gap-4">
        {roleDescriptions.map((item) => (
          <Card key={item.role} className="p-4">
            <div className={`w-12 h-12 rounded-lg ${item.color} flex items-center justify-center mb-3`}>
              <Shield className="h-6 w-6 text-white" />
            </div>
            <h3 className="font-semibold mb-1">{item.role}</h3>
            <p className="text-sm text-muted-foreground mb-2">{item.description}</p>
            <p className="text-xs text-muted-foreground/80 mb-3 leading-relaxed">{item.detail}</p>
            <div className="space-y-1">
              {item.permissions.map((permission, index) => (
                <div key={index} className="flex items-center gap-2 text-xs text-muted-foreground">
                  <div className="w-1 h-1 rounded-full bg-primary" />
                  {permission}
                </div>
              ))}
            </div>
          </Card>
        ))}
      </div>

      {/* 成员列表 */}
      <Card className="p-6">
        <h3 className="font-semibold mb-4">团队成员</h3>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>成员</TableHead>
              <TableHead>邮箱</TableHead>
              <TableHead>角色</TableHead>
              <TableHead>所属品牌</TableHead>
              <TableHead>月度消费</TableHead>
              <TableHead>状态</TableHead>
              <TableHead>加入时间</TableHead>
              <TableHead className="text-right">操作</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {members.map((member) => (
              <TableRow key={member.id}>
                <TableCell>
                  <div className="flex items-center gap-3">
                    <Avatar>
                      <AvatarFallback>{member.name.charAt(0)}</AvatarFallback>
                    </Avatar>
                    <span className="font-medium">{member.name}</span>
                  </div>
                </TableCell>
                <TableCell className="text-muted-foreground">{member.email}</TableCell>
                <TableCell>
                  <Badge variant={getRoleBadgeVariant(member.role)}>{member.role}</Badge>
                </TableCell>
                <TableCell>
                  <div className="flex flex-wrap gap-1">
                    {member.brands.map((brand, index) => (
                      <Badge key={index} variant="outline" className="text-xs">
                        {brand}
                      </Badge>
                    ))}
                  </div>
                </TableCell>
                <TableCell>
                  <span className={member.monthlyConsumption === "¥0" ? "text-muted-foreground" : "font-medium"}>
                    {member.monthlyConsumption}
                  </span>
                </TableCell>
                <TableCell>
                  {member.status === "active" ? (
                    <Badge className="bg-success">活跃</Badge>
                  ) : (
                    <Badge variant="secondary">已禁用</Badge>
                  )}
                </TableCell>
                <TableCell className="text-muted-foreground">{member.joinedAt}</TableCell>
                <TableCell className="text-right">
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" size="sm">
                        <MoreVertical className="h-4 w-4" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <DropdownMenuItem>编辑权限</DropdownMenuItem>
                      <DropdownMenuItem>分配品牌</DropdownMenuItem>
                      <DropdownMenuItem>
                        {member.status === "active" ? "禁用" : "启用"}
                      </DropdownMenuItem>
                      <DropdownMenuItem className="text-destructive">移除成员</DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </Card>

      {/* 审批人配置 */}
      <Card className="p-6">
        <h3 className="font-semibold mb-4">审批流程配置</h3>
        <div className="space-y-4">
          <div className="p-4 rounded-lg border bg-gradient-to-r from-background to-muted/20">
            <div className="flex items-center justify-between">
              <div>
                <h4 className="font-medium mb-1">XGEO官方 审批人</h4>
                <p className="text-sm text-muted-foreground">
                  当前审批人: 张三、李四
                </p>
              </div>
              <Button size="sm" variant="outline">
                配置
              </Button>
            </div>
          </div>
          <div className="p-4 rounded-lg border bg-gradient-to-r from-background to-muted/20">
            <div className="flex items-center justify-between">
              <div>
                <h4 className="font-medium mb-1">Alpha家电 审批人</h4>
                <p className="text-sm text-muted-foreground">
                  当前审批人: 张三
                </p>
              </div>
              <Button size="sm" variant="outline">
                配置
              </Button>
            </div>
          </div>
        </div>
      </Card>
    </div>
  );
};

export default Members;
