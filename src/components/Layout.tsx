import { ReactNode, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { 
  LayoutDashboard, 
  Wand2, 
  Settings, 
  Sparkles,
  BarChart3,
  Search,
  Users,
  CreditCard,
  Palette,
  Target,
  Bell,
  ChevronDown,
  Menu,
  X,
  Eye,
  TrendingUp,
  Zap
} from "lucide-react";
import xgeoLogo from "@/assets/xgeo-logo.png";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

interface LayoutProps {
  children: ReactNode;
}

// 菜单分组结构
const navGroups = [
  {
    label: "GEO分析",
    items: [
      { icon: LayoutDashboard, label: "监控面板", path: "/", desc: "GEO总分与四大维度" },
      { icon: BarChart3, label: "数据分析", path: "/analytics", desc: "详细指标与趋势" },
      { icon: Target, label: "GEO策略", path: "/strategy", desc: "内容策略与优化" },
    ]
  },
  {
    label: "内容管理",
    items: [
      { icon: Sparkles, label: "AI生成", path: "/generate", desc: "智能内容生成" },
      { icon: Zap, label: "内容优化", path: "/optimize", desc: "已优化内容历史" },
    ]
  },
  {
    label: "设置",
    items: [
      { icon: Palette, label: "品牌设置", path: "/branding", desc: "多品牌管理" },
      { icon: Users, label: "成员管理", path: "/members", desc: "团队权限管理" },
      { icon: CreditCard, label: "账单中心", path: "/billing", desc: "费用与套餐" },
      { icon: Settings, label: "系统设置", path: "/settings", desc: "全局配置" },
    ]
  }
];

export function Layout({ children }: LayoutProps) {
  const location = useLocation();
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [currentBrand, setCurrentBrand] = useState("XGEO 官方");

  const brands = ["XGEO 官方", "Alpha 家电", "Nova 护肤"];

  return (
    <div className="min-h-screen bg-gradient-subtle flex w-full">
      {/* Mobile sidebar backdrop */}
      {sidebarOpen && (
        <div 
          className="fixed inset-0 bg-background/80 backdrop-blur-sm z-40 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside className={cn(
        "fixed lg:sticky top-0 left-0 z-50 h-screen w-64 bg-card border-r border-border transition-transform duration-300 lg:translate-x-0",
        sidebarOpen ? "translate-x-0" : "-translate-x-full"
      )}>
        <div className="flex flex-col h-full">
          {/* Logo */}
          <div className="h-16 flex items-center justify-between px-6 border-b border-border">
            <div className="flex items-center gap-2">
              <img src={xgeoLogo} alt="XGEO" className="w-8 h-8 rounded-lg" />
              <span className="font-bold text-xl">XGEO</span>
            </div>
            <Button
              variant="ghost"
              size="icon"
              className="lg:hidden"
              onClick={() => setSidebarOpen(false)}
            >
              <X className="w-5 h-5" />
            </Button>
          </div>

          {/* Navigation */}
          <nav className="flex-1 overflow-y-auto px-3 py-4">
            <div className="space-y-6">
              {navGroups.map((group) => (
                <div key={group.label}>
                  <h3 className="px-3 mb-2 text-xs font-semibold text-muted-foreground uppercase tracking-wider">
                    {group.label}
                  </h3>
                  <div className="space-y-1">
                    {group.items.map((item) => {
                      const isActive = location.pathname === item.path;
                      return (
                        <Link
                          key={item.path}
                          to={item.path}
                          onClick={() => setSidebarOpen(false)}
                          className={cn(
                            "flex items-start gap-3 px-3 py-2.5 rounded-lg transition-colors group",
                            isActive
                              ? "bg-primary text-primary-foreground"
                              : "text-muted-foreground hover:bg-muted hover:text-foreground"
                          )}
                        >
                          <item.icon className="w-5 h-5 mt-0.5 flex-shrink-0" />
                          <div className="flex-1 min-w-0">
                            <div className="text-sm font-medium">{item.label}</div>
                            <div className={cn(
                              "text-xs mt-0.5",
                              isActive 
                                ? "text-primary-foreground/80" 
                                : "text-muted-foreground/70 group-hover:text-muted-foreground"
                            )}>
                              {item.desc}
                            </div>
                          </div>
                        </Link>
                      );
                    })}
                  </div>
                </div>
              ))}
            </div>
          </nav>

          {/* AI Assistant */}
          <div className="p-4 border-t border-border">
            <Button 
              className="w-full bg-gradient-primary hover:opacity-90"
              size="sm"
            >
              <Sparkles className="w-4 h-4 mr-2" />
              AI 助手
            </Button>
          </div>
        </div>
      </aside>

      {/* Main content */}
      <div className="flex-1 flex flex-col min-w-0">
        {/* Header */}
        <header className="sticky top-0 z-30 h-16 bg-card/95 backdrop-blur-sm border-b border-border">
          <div className="h-full px-4 lg:px-6 flex items-center justify-between gap-4">
            <div className="flex items-center gap-4">
              <Button
                variant="ghost"
                size="icon"
                className="lg:hidden"
                onClick={() => setSidebarOpen(true)}
              >
                <Menu className="w-5 h-5" />
              </Button>

              {/* Brand Selector */}
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="outline" className="gap-2">
                    {currentBrand}
                    <ChevronDown className="w-4 h-4" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="start" className="w-48 bg-popover">
                  <DropdownMenuLabel>切换品牌</DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  {brands.map((brand) => (
                    <DropdownMenuItem
                      key={brand}
                      onClick={() => setCurrentBrand(brand)}
                      className={cn(
                        currentBrand === brand && "bg-muted"
                      )}
                    >
                      {brand}
                    </DropdownMenuItem>
                  ))}
                </DropdownMenuContent>
              </DropdownMenu>

              {/* Search */}
              <div className="hidden md:flex items-center gap-2 px-3 py-2 bg-muted rounded-lg max-w-md w-full">
                <Search className="w-4 h-4 text-muted-foreground" />
                <input
                  type="text"
                  placeholder="搜索内容、关键词、成员..."
                  className="bg-transparent border-none outline-none text-sm flex-1"
                />
              </div>
            </div>

            <div className="flex items-center gap-2">
              <Button variant="ghost" size="icon" className="relative">
                <Bell className="w-5 h-5" />
                <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-destructive rounded-full" />
              </Button>
              
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" className="gap-2">
                    <Avatar className="w-8 h-8">
                      <AvatarFallback className="bg-primary text-primary-foreground text-xs">
                        管理
                      </AvatarFallback>
                    </Avatar>
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-48 bg-popover">
                  <DropdownMenuLabel>我的账户</DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem>个人资料</DropdownMenuItem>
                  <DropdownMenuItem>帮助中心</DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem className="text-destructive">退出登录</DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          </div>
        </header>

        {/* Page content */}
        <main className="flex-1 p-6">
          {children}
        </main>
      </div>
    </div>
  );
}
