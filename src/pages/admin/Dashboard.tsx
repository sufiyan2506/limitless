import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Users,
  MessageSquare,
  BriefcaseBusiness,
  FileText,
  TrendingUp,
  Activity,
  Eye,
  Calendar,
  Cpu,
  Server,
  Wifi,
} from "lucide-react";
import CountUp from "@/components/CountUp";

const Dashboard = () => {
  const stats = [
    {
      title: "Total Contacts",
      value: 1247,
      change: "+12%",
      trend: "up",
      icon: Users,
      description: "Active leads & inquiries",
    },
    {
      title: "Job Applications",
      value: 89,
      change: "+23%",
      trend: "up",
      icon: BriefcaseBusiness,
      description: "Pending applications",
    },
    {
      title: "Blog Posts",
      value: 34,
      change: "+5%",
      trend: "up",
      icon: FileText,
      description: "Published articles",
    },
    {
      title: "Monthly Views",
      value: 15420,
      change: "+18%",
      trend: "up",
      icon: Eye,
      description: "Page impressions",
    },
  ];

  const recentActivities = [
    {
      type: "contact",
      message: "New contact form submission from Sarah Johnson",
      time: "2 minutes ago",
      priority: "high",
    },
    {
      type: "application",
      message: "Job application received for Senior Developer role",
      time: "15 minutes ago",
      priority: "medium",
    },
    {
      type: "content",
      message: 'Blog post "AI Trends 2024" published successfully',
      time: "1 hour ago",
      priority: "low",
    },
    {
      type: "portfolio",
      message: 'Project "E-commerce Platform" updated',
      time: "3 hours ago",
      priority: "medium",
    },
  ];

  const quickActions = [
    { label: "Add Blog Post", path: "/admin/content", icon: FileText },
    { label: "View Contacts", path: "/admin/contacts", icon: Users },
    { label: "Check Applications", path: "/admin/hiring", icon: BriefcaseBusiness },
    { label: "Site Analytics", path: "/admin/analytics", icon: TrendingUp },
  ];

  return (
    <div className="space-y-10">
      {/* Welcome Section */}
      <div>
        <h1 className="text-3xl font-bold text-foreground">Welcome Back ✨</h1>
        <p className="text-muted-foreground mt-1">
          Here's an overview of your digital ecosystem.
        </p>
      </div>

      {/* Stats Grid */}
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
        {stats.map((stat) => {
          const Icon = stat.icon;
          return (
            <Card
              key={stat.title}
              className="glass border-white/10 hover:border-white/20 transition-all shadow-lg hover:shadow-xl backdrop-blur-xl"
            >
              <CardHeader className="flex flex-row items-center justify-between pb-2">
                <CardTitle className="text-sm text-muted-foreground">
                  {stat.title}
                </CardTitle>
                <div className="p-2 rounded-xl bg-primary/10">
                  <Icon className="w-4 h-4 text-primary" />
                </div>
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-semibold tracking-tight text-foreground">
                  <CountUp end={stat.value} />
                </div>
                <div className="flex items-center gap-2 mt-2">
                  <Badge
                    variant={stat.trend === "up" ? "default" : "destructive"}
                    className="text-xs"
                  >
                    {stat.change}
                  </Badge>
                  <span className="text-xs text-muted-foreground">
                    {stat.description}
                  </span>
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>

      <div className="grid gap-6 lg:grid-cols-3">
        {/* Recent Activity */}
        <Card className="lg:col-span-2 glass border-white/10 backdrop-blur-xl">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Activity className="w-5 h-5 text-primary" />
              Recent Activity
            </CardTitle>
            <CardDescription>
              Real-time updates from your platform modules
            </CardDescription>
          </CardHeader>

          <CardContent className="space-y-5">
            {recentActivities.map((activity, index) => (
              <div
                key={index}
                className="relative pl-5 border-l border-white/10 ml-2"
              >
                <div
                  className={`absolute -left-[6px] top-1 w-3 h-3 rounded-full ${
                    activity.priority === "high"
                      ? "bg-red-500"
                      : activity.priority === "medium"
                      ? "bg-yellow-500"
                      : "bg-green-500"
                  }`}
                ></div>

                <p className="text-sm text-foreground">{activity.message}</p>
                <p className="text-xs text-muted-foreground flex items-center gap-1 mt-1">
                  <Calendar className="w-3 h-3" />
                  {activity.time}
                </p>
              </div>
            ))}
          </CardContent>
        </Card>

        {/* Quick Actions */}
        <Card className="glass border-white/10 backdrop-blur-xl">
          <CardHeader>
            <CardTitle>Quick Actions</CardTitle>
            <CardDescription>
              Manage your platform in a single tap
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-3">
            {quickActions.map((action) => {
              const Icon = action.icon;
              return (
                <Button
                  key={action.label}
                  variant="ghost"
                  className="w-full justify-start glass-strong hover:bg-primary/15 transition-all"
                  onClick={() => (window.location.href = action.path)}
                >
                  <Icon className="w-4 h-4 mr-3 text-primary" />
                  {action.label}
                </Button>
              );
            })}
          </CardContent>
        </Card>
      </div>

      {/* System Overview */}
      <div className="grid gap-6 lg:grid-cols-3">
        {/* System Health */}
        <Card className="glass border-white/10 backdrop-blur-xl lg:col-span-1">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Cpu className="w-5 h-5 text-primary" />
              System Health
            </CardTitle>
            <CardDescription>Status of backend & infra</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex justify-between text-sm">
              <span className="text-muted-foreground">API Latency</span>
              <Badge className="bg-green-500/10 text-green-400">98ms</Badge>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-muted-foreground">Server Load</span>
              <Badge className="bg-blue-500/10 text-blue-400">36%</Badge>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-muted-foreground">Database Uptime</span>
              <Badge className="bg-purple-500/10 text-purple-400">99.4%</Badge>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-muted-foreground">Network</span>
              <Badge className="bg-yellow-500/10 text-yellow-400">Stable</Badge>
            </div>
          </CardContent>
        </Card>

        {/* Traffic Overview */}
        <Card className="glass border-white/10 backdrop-blur-xl lg:col-span-2">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <TrendingUp className="w-5 h-5 text-primary" />
              Traffic Overview
            </CardTitle>
            <CardDescription>Past 7 days summary</CardDescription>
          </CardHeader>

          <CardContent>
            <div className="w-full h-20 flex items-end gap-2">
              {[40, 60, 50, 80, 110, 95, 130].map((h, i) => (
                <div
                  key={i}
                  className="bg-primary/30 w-4 rounded-md animate-pulse"
                  style={{ height: `${h / 1.4}px` }}
                ></div>
              ))}
            </div>
            <p className="text-xs text-muted-foreground mt-3">
              +14% growth this week
            </p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Dashboard;
