// limitless-frontend-main/src/pages/admin/Analytics.tsx
import { useMemo } from "react";
import { motion } from "framer-motion";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  BarChart3,
  TrendingUp,
  Eye,
  Users,
  Clock,
  Globe,
  Smartphone,
  Monitor,
  Calendar,
} from "lucide-react";
import CountUp from "@/components/CountUp";
import { cn } from "@/lib/utils";

/**
 * Analytics - upgraded dashboard page
 * - glass cards with subtle glow
 * - smooth framer-motion entrance
 * - better layout and responsive behavior
 * - simple inline SVG mini charts (no external chart lib)
 */

const analyticsData = {
  overview: {
    totalViews: 45720,
    uniqueVisitors: 12340,
    avgSessionDuration: "3:42",
    bounceRate: 34.2,
    conversionRate: 4.8,
  },
  traffic: {
    organic: 45.2,
    direct: 28.7,
    social: 15.6,
    referral: 8.1,
    email: 2.4,
  },
  devices: {
    desktop: 52.3,
    mobile: 38.9,
    tablet: 8.8,
  },
  topPages: [
    { page: "/", views: 15420, bounceRate: 32.1 },
    { page: "/services", views: 8750, bounceRate: 28.5 },
    { page: "/about", views: 6230, bounceRate: 41.2 },
    { page: "/contact", views: 4890, bounceRate: 15.8 },
    { page: "/work", views: 4680, bounceRate: 38.7 },
  ],
  goals: [
    { name: "Contact Form Submissions", completions: 234, rate: 4.2 },
    { name: "Newsletter Signups", completions: 567, rate: 8.1 },
    { name: "Project Inquiries", completions: 89, rate: 1.6 },
    { name: "Service Page Views", completions: 1245, rate: 22.3 },
  ],
  recentActivity: [
    { event: "Contact form submission", location: "New York, USA", time: "2 minutes ago" },
    { event: "Newsletter signup", location: "London, UK", time: "5 minutes ago" },
    { event: "Portfolio project viewed", location: "Toronto, Canada", time: "8 minutes ago" },
    { event: "Blog post shared", location: "Sydney, Australia", time: "12 minutes ago" },
    { event: "Service inquiry", location: "Berlin, Germany", time: "15 minutes ago" },
  ],
};

const getTrafficSourceColor = (source: string) => {
  switch (source) {
    case "organic":
      return "bg-green-400";
    case "direct":
      return "bg-blue-400";
    case "social":
      return "bg-purple-400";
    case "referral":
      return "bg-orange-400";
    case "email":
      return "bg-pink-400";
    default:
      return "bg-gray-400";
  }
};

const getDeviceIcon = (device: string) => {
  switch (device) {
    case "desktop":
      return Monitor;
    case "mobile":
      return Smartphone;
    case "tablet":
      return Smartphone;
    default:
      return Monitor;
  }
};

const cardMotion = {
  hidden: { opacity: 0, y: 10 },
  show: { opacity: 1, y: 0 },
};

const Analytics = () => {
  const topPages = analyticsData.topPages;
  const devices = analyticsData.devices;
  const traffic = analyticsData.traffic;

  const sparklinePoints = useMemo(
    () =>
      // generate tiny sparkline data from totalViews (mock variation)
      Array.from({ length: 12 }).map((_, i) =>
        Math.round(analyticsData.overview.totalViews * (0.6 + Math.sin(i + 1) * 0.08 + i * 0.02))
      ),
    []
  );

  return (
    <motion.div
      initial={{ opacity: 0, y: 6 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -6 }}
      transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
      className="space-y-6"
    >
      {/* Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Analytics & Reporting</h1>
          <p className="text-muted-foreground mt-1">Monitor traffic, conversions and real-time activity.</p>
        </div>

        <div className="flex items-center gap-3 w-full sm:w-auto">
          <Select defaultValue="30d">
            <SelectTrigger className="w-40 glass border-white/10">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="7d">Last 7 days</SelectItem>
              <SelectItem value="30d">Last 30 days</SelectItem>
              <SelectItem value="90d">Last 90 days</SelectItem>
              <SelectItem value="12m">Last 12 months</SelectItem>
            </SelectContent>
          </Select>

          <div className="hidden sm:flex items-center gap-3 ml-2">
            <button className="glass rounded-full px-4 py-2 text-sm text-foreground/80 hover:glass-strong transition">Export</button>
            <button className="bg-primary px-4 py-2 rounded-full text-black font-medium hover:bg-primary/90 transition">
              New Report
            </button>
          </div>
        </div>
      </div>

      {/* Overview cards */}
      <motion.div
        className="grid gap-6 md:grid-cols-2 lg:grid-cols-5"
        initial="hidden"
        animate="show"
        variants={{ show: { transition: { staggerChildren: 0.06 } } }}
      >
        {[
          {
            title: "Total Views",
            value: analyticsData.overview.totalViews,
            change: "+12.3%",
            trend: "up",
            icon: Eye,
            sparkline: sparklinePoints,
          },
          {
            title: "Unique Visitors",
            value: analyticsData.overview.uniqueVisitors,
            change: "+8.7%",
            trend: "up",
            icon: Users,
            sparkline: sparklinePoints.map((v) => Math.round(v * 0.3)),
          },
          {
            title: "Avg. Session",
            value: analyticsData.overview.avgSessionDuration,
            change: "+15.2%",
            trend: "up",
            icon: Clock,
          },
          {
            title: "Bounce Rate",
            value: `${analyticsData.overview.bounceRate}%`,
            change: "-5.1%",
            trend: "down",
            icon: TrendingUp,
          },
          {
            title: "Conversion Rate",
            value: `${analyticsData.overview.conversionRate}%`,
            change: "+2.4%",
            trend: "up",
            icon: BarChart3,
          },
        ].map((stat) => {
          const Icon = stat.icon;
          return (
            <motion.div key={stat.title} variants={cardMotion} className="min-w-0">
              <Card className="glass border-white/10 hover:shadow-xl transition-shadow">
                <CardHeader className="flex items-start justify-between gap-4 pb-2">
                  <div>
                    <CardTitle className="text-sm font-medium text-muted-foreground">{stat.title}</CardTitle>
                    <div className="mt-2 flex items-end gap-3">
                      <div className="text-2xl font-bold text-foreground">
                        {typeof stat.value === "number" ? (
                          <CountUp end={stat.value} />
                        ) : (
                          stat.value
                        )}
                      </div>
                      <Badge
                        variant={stat.trend === "up" ? "default" : "secondary"}
                        className={cn("text-xs", stat.trend === "up" ? "bg-green-500/10 text-green-400" : "bg-red-500/10 text-red-400")}
                      >
                        {stat.change}
                      </Badge>
                    </div>
                  </div>

                  <div className="flex flex-col items-end">
                    <Icon className="w-5 h-5 text-primary" />
                    {stat.sparkline && (
                      <svg className="w-20 h-6 mt-2" viewBox="0 0 100 20" preserveAspectRatio="none">
                        <polyline
                          fill="none"
                          stroke="#7c3aed"
                          strokeWidth={1.6}
                          points={stat.sparkline
                            .map((v: number, i: number) => {
                              const x = (i / (stat.sparkline.length - 1)) * 100;
                              const max = Math.max(...stat.sparkline);
                              const y = 20 - (v / max) * 18;
                              return `${x},${y}`;
                            })
                            .join(" ")}
                        />
                      </svg>
                    )}
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="text-xs text-muted-foreground">vs last period</p>
                </CardContent>
              </Card>
            </motion.div>
          );
        })}
      </motion.div>

      {/* Traffic & Devices */}
      <div className="grid gap-6 lg:grid-cols-2">
        <motion.div variants={cardMotion} initial="hidden" animate="show">
          <Card className="glass border-white/10">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Globe className="w-5 h-5" />
                Traffic Sources
              </CardTitle>
              <CardDescription>Where your visitors are coming from</CardDescription>
            </CardHeader>

            <CardContent>
              <div className="space-y-3">
                {Object.entries(traffic).map(([source, percentage]) => (
                  <div key={source} className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className={`w-3 h-3 rounded-full ${getTrafficSourceColor(source)}`} />
                      <div className="capitalize font-medium">{source}</div>
                    </div>

                    <div className="flex items-center gap-3">
                      <div className="w-48 bg-muted rounded-full h-2 overflow-hidden">
                        <div
                          className={`h-2 rounded-full ${getTrafficSourceColor(source)} transition-[width]`}
                          style={{ width: `${percentage}%` }}
                        />
                      </div>
                      <div className="w-12 text-right font-medium">{percentage}%</div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </motion.div>

        <motion.div variants={cardMotion} initial="hidden" animate="show">
          <Card className="glass border-white/10">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Monitor className="w-5 h-5" />
                Device Breakdown
              </CardTitle>
              <CardDescription>Visitor device preferences</CardDescription>
            </CardHeader>

            <CardContent>
              <div className="space-y-3">
                {Object.entries(devices).map(([device, percentage]) => {
                  const Icon = getDeviceIcon(device);
                  return (
                    <div key={device} className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 rounded-md glass flex items-center justify-center text-xs font-bold">
                          <Icon className="w-4 h-4 text-primary" />
                        </div>
                        <div className="capitalize font-medium">{device}</div>
                      </div>

                      <div className="flex items-center gap-3">
                        <div className="w-32 bg-muted rounded-full h-2">
                          <div className="h-2 rounded-full bg-primary" style={{ width: `${percentage}%` }} />
                        </div>
                        <div className="w-12 text-right font-medium">{percentage}%</div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>

      {/* Top Pages & Goals */}
      <div className="grid gap-6 lg:grid-cols-2">
        <motion.div variants={cardMotion} initial="hidden" animate="show">
          <Card className="glass border-white/10">
            <CardHeader>
              <CardTitle>Top Pages</CardTitle>
              <CardDescription>Most visited pages</CardDescription>
            </CardHeader>

            <CardContent>
              <div className="space-y-3">
                {topPages.map((page, idx) => (
                  <div key={page.page} className="flex items-center justify-between p-3 rounded-lg glass-strong">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-full glass flex items-center justify-center text-xs font-bold">
                        {idx + 1}
                      </div>
                      <div>
                        <div className="font-medium">{page.page === "/" ? "Homepage" : page.page}</div>
                        <div className="text-xs text-muted-foreground">{page.views.toLocaleString()} views</div>
                      </div>
                    </div>

                    <div className="flex items-center gap-3">
                      <Badge
                        variant="outline"
                        className={page.bounceRate < 30 ? "text-green-400" : page.bounceRate > 40 ? "text-red-400" : "text-yellow-400"}
                      >
                        {page.bounceRate}% bounce
                      </Badge>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </motion.div>

        <motion.div variants={cardMotion} initial="hidden" animate="show">
          <Card className="glass border-white/10">
            <CardHeader>
              <CardTitle>Goals & Conversions</CardTitle>
              <CardDescription>Track business objectives</CardDescription>
            </CardHeader>

            <CardContent>
              <div className="space-y-3">
                {analyticsData.goals.map((goal) => (
                  <div key={goal.name} className="flex items-center justify-between p-3 rounded-lg glass-strong">
                    <div className="flex-1">
                      <div className="font-medium">{goal.name}</div>
                      <div className="flex items-center gap-3 mt-1">
                        <div className="text-2xl font-bold text-primary">{goal.completions}</div>
                        <div className="text-sm text-muted-foreground">completions</div>
                      </div>
                    </div>

                    <Badge variant={goal.rate > 5 ? "default" : "secondary"}>{goal.rate}%</Badge>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>

      {/* Recent Activity */}
      <motion.div variants={cardMotion} initial="hidden" animate="show">
        <Card className="glass border-white/10">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <BarChart3 className="w-5 h-5" />
              Real-time Activity
            </CardTitle>
            <CardDescription>Live visitor events</CardDescription>
          </CardHeader>

          <CardContent>
            <div className="space-y-3">
              {analyticsData.recentActivity.map((activity, i) => (
                <div key={i} className="flex items-center justify-between p-3 rounded-lg glass-strong">
                  <div className="flex items-center gap-3">
                    <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
                    <div>
                      <div className="font-medium">{activity.event}</div>
                      <div className="text-xs text-muted-foreground flex items-center gap-2">
                        <Globe className="w-3 h-3" />
                        {activity.location}
                      </div>
                    </div>
                  </div>

                  <div className="text-sm text-muted-foreground flex items-center gap-2">
                    <Calendar className="w-3 h-3" />
                    {activity.time}
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </motion.div>
    </motion.div>
  );
};

export default Analytics;
