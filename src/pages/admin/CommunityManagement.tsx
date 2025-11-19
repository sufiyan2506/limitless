import { useEffect, useMemo, useState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Search,
  Download,
  Mail,
  Calendar,
  Users,
  TrendingUp,
  UserPlus,
  MessageCircle,
  Globe,
  MoreHorizontal,
  Trash2,
  Check,
} from "lucide-react";
import { toast } from "@/hooks/use-toast";
import { cn } from "@/lib/utils";

/**
 * CommunityManagement (refreshed for Limitless aesthetic)
 *
 * - Glassmorphism cards
 * - Subtle micro-animations
 * - Clean, readable admin table
 * - Improved filters & actions
 * - Uses existing UI primitives in the project
 */

/* Types */
type CommunityMember = {
  id: string;
  email: string;
  name?: string;
  status: "active" | "unsubscribed" | "bounced";
  source: "website" | "social" | "referral" | "newsletter";
  tags: string[];
  joinedAt: string;
  lastActive?: string;
  engagement: "high" | "medium" | "low";
  location?: string;
  preferences: {
    newsletter: boolean;
    updates: boolean;
    marketing: boolean;
  };
};

type Newsletter = {
  id: string;
  subject: string;
  content: string;
  status: "draft" | "scheduled" | "sent";
  scheduledFor?: string;
  sentAt?: string;
  recipients: number;
  openRate?: number;
  clickRate?: number;
  createdAt: string;
};

const CommunityManagement = () => {
  // UI state
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState<string>("all");
  const [engagementFilter, setEngagementFilter] = useState<string>("all");
  const [activeTab, setActiveTab] = useState<"members" | "newsletters">(
    "members"
  );
  const [selectedMemberId, setSelectedMemberId] = useState<string | null>(null);
  const [selectedNewsletterId, setSelectedNewsletterId] = useState<string | null>(
    null
  );

  /* Mock data: keep this small and replace with API integration */
  const mockMembers: CommunityMember[] = [
    {
      id: "1",
      email: "sarah.johnson@email.com",
      name: "Sarah Johnson",
      status: "active",
      source: "website",
      tags: ["premium", "early-adopter"],
      joinedAt: "2024-01-10T10:30:00Z",
      lastActive: "2024-01-15T14:20:00Z",
      engagement: "high",
      location: "New York, USA",
      preferences: { newsletter: true, updates: true, marketing: true },
    },
    {
      id: "2",
      email: "mike.chen@startup.co",
      name: "Mike Chen",
      status: "active",
      source: "social",
      tags: ["developer", "startup"],
      joinedAt: "2024-01-08T09:15:00Z",
      lastActive: "2024-01-14T11:30:00Z",
      engagement: "medium",
      location: "San Francisco, USA",
      preferences: { newsletter: true, updates: true, marketing: false },
    },
    {
      id: "3",
      email: "emily.rodriguez@corp.com",
      status: "unsubscribed",
      source: "referral",
      tags: ["enterprise"],
      joinedAt: "2024-01-05T16:45:00Z",
      engagement: "low",
      location: "London, UK",
      preferences: { newsletter: false, updates: false, marketing: false },
    },
  ];

  const mockNewsletters: Newsletter[] = [
    {
      id: "1",
      subject: "AI Trends Weekly - January Edition",
      content: "This week in AI: Latest breakthroughs and industry insights...",
      status: "sent",
      sentAt: "2024-01-15T09:00:00Z",
      recipients: 1247,
      openRate: 68.5,
      clickRate: 12.3,
      createdAt: "2024-01-14T15:00:00Z",
    },
    {
      id: "2",
      subject: "New Features & Product Updates",
      content: "Exciting new features are now live in your dashboard...",
      status: "scheduled",
      scheduledFor: "2024-01-20T10:00:00Z",
      recipients: 1250,
      createdAt: "2024-01-16T11:30:00Z",
    },
    {
      id: "3",
      subject: "Community Spotlight: Success Stories",
      content: "Featuring amazing projects from our community members...",
      status: "draft",
      recipients: 0,
      createdAt: "2024-01-16T14:00:00Z",
    },
  ];

  // Simulated managed state (replace with real API state)
  const [members] = useState<CommunityMember[]>(mockMembers);
  const [newsletters] = useState<Newsletter[]>(mockNewsletters);

  /* Derived values */
  const totalMembers = members.length;
  const activeMembers = members.filter((m) => m.status === "active").length;
  const avgOpenRate =
    newsletters
      .filter((n) => n.openRate)
      .reduce((sum, n) => sum + (n.openRate || 0), 0) /
      (newsletters.filter((n) => n.openRate).length || 1);

  /* Helpers for colors / badges */
  const getStatusColor = (status: string) => {
    switch (status) {
      case "active":
        return "bg-green-500/10 text-green-500";
      case "unsubscribed":
        return "bg-red-500/10 text-red-500";
      case "bounced":
        return "bg-yellow-500/10 text-yellow-500";
      default:
        return "bg-gray-500/10 text-gray-500";
    }
  };

  const getEngagementColor = (engagement: string) => {
    switch (engagement) {
      case "high":
        return "bg-green-500/10 text-green-500";
      case "medium":
        return "bg-yellow-500/10 text-yellow-500";
      case "low":
        return "bg-red-500/10 text-red-500";
      default:
        return "bg-gray-500/10 text-gray-500";
    }
  };

  const getNewsletterStatusColor = (status: string) => {
    switch (status) {
      case "sent":
        return "bg-green-500/10 text-green-500";
      case "scheduled":
        return "bg-blue-500/10 text-blue-500";
      case "draft":
        return "bg-yellow-500/10 text-yellow-500";
      default:
        return "bg-gray-500/10 text-gray-500";
    }
  };

  /* Filtering logic (fast, memoized) */
  const filteredMembers = useMemo(() => {
    return members.filter((member) => {
      const q = searchQuery.trim().toLowerCase();
      const matchesSearch =
        !q ||
        member.email.toLowerCase().includes(q) ||
        (member.name && member.name.toLowerCase().includes(q)) ||
        member.tags.some((t) => t.toLowerCase().includes(q));
      const matchesStatus = statusFilter === "all" || member.status === statusFilter;
      const matchesEngagement = engagementFilter === "all" || member.engagement === engagementFilter;
      return matchesSearch && matchesStatus && matchesEngagement;
    });
  }, [members, searchQuery, statusFilter, engagementFilter]);

  /* Actions (stubbed toasts) */
  const exportMembers = () => {
    toast({ title: "Export Started", description: "Preparing CSV for download..." });
    // simulate
    setTimeout(() => {
      toast({ title: "Export Ready", description: "Download will start shortly." });
    }, 900);
  };

  const createNewsletter = () => {
    toast({ title: "Create Newsletter", description: "Opening newsletter composer..." });
  };

  const sendNewsletter = (id: string) => {
    toast({ title: "Scheduled", description: "Newsletter queued for sending." });
  };

  const removeMember = (id: string) => {
    // in real app: call API then update state
    toast({ title: "Member Removed", description: "Member has been removed." });
    setSelectedMemberId(null);
  };

  const bulkAction = (action: "delete" | "export", ids: string[]) => {
    if (!ids.length) {
      toast({ title: "No Selection", description: "Select at least one member." });
      return;
    }
    if (action === "delete") {
      toast({ title: "Deleted", description: `${ids.length} members removed.` });
    } else {
      toast({ title: "Export", description: `${ids.length} members exported.` });
    }
  };

  /* UI helpers for compact table rows */
  const formatDate = (iso?: string) => {
    if (!iso) return "-";
    try {
      return new Date(iso).toLocaleDateString();
    } catch {
      return iso;
    }
  };

  /* Small keyboard shortcut: "/" focuses search (optional) */
  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.key === "/") {
        const el = document.querySelector<HTMLInputElement>('input[placeholder="Search members..."]');
        el?.focus();
        e.preventDefault();
      }
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, []);

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Community</h1>
          <p className="text-muted-foreground">Manage subscribers, newsletters and engagement.</p>
        </div>

        <div className="flex items-center gap-3">
          <Button variant="outline" onClick={exportMembers} className="glass border-white/20">
            <Download className="w-4 h-4 mr-2" />
            Export
          </Button>

          <Button onClick={createNewsletter} className="glass-strong">
            <Mail className="w-4 h-4 mr-2" />
            Create Newsletter
          </Button>
        </div>
      </div>

      {/* Summary cards */}
      <div className="grid gap-6 md:grid-cols-4">
        {[
          { label: "Total Members", value: totalMembers, icon: Users, color: "text-blue-400" },
          { label: "Active Subscribers", value: activeMembers, icon: UserPlus, color: "text-green-400" },
          { label: "Avg. Open Rate", value: `${avgOpenRate.toFixed(1)}%`, icon: TrendingUp, color: "text-purple-400" },
          { label: "Newsletters Sent", value: newsletters.filter((n) => n.status === "sent").length, icon: MessageCircle, color: "text-orange-400" },
        ].map((stat) => {
          const Icon = stat.icon;
          return (
            <Card key={stat.label} className="glass border-white/10 hover:scale-[1.01] transition-transform">
              <CardContent className="p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <div className="text-2xl font-bold">{stat.value}</div>
                    <div className={cn("text-sm font-medium", stat.color)}>{stat.label}</div>
                    <div className="text-xs text-muted-foreground mt-1">Live overview</div>
                  </div>
                  <Icon className={`w-9 h-9 ${stat.color} opacity-90`} />
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>

      {/* Tabs */}
      <div className="flex gap-2">
        <Button
          variant={activeTab === "members" ? "default" : "outline"}
          onClick={() => setActiveTab("members")}
          className={activeTab === "members" ? "glass-strong" : "glass border-white/20"}
        >
          <Users className="w-4 h-4 mr-2" />
          Members ({filteredMembers.length})
        </Button>

        <Button
          variant={activeTab === "newsletters" ? "default" : "outline"}
          onClick={() => setActiveTab("newsletters")}
          className={activeTab === "newsletters" ? "glass-strong" : "glass border-white/20"}
        >
          <Mail className="w-4 h-4 mr-2" />
          Newsletters ({newsletters.length})
        </Button>
      </div>

      {/* Members Tab */}
      {activeTab === "members" && (
        <>
          {/* Filters */}
          <Card className="glass border-white/10">
            <CardHeader>
              <CardTitle>Filters & Search</CardTitle>
              <CardDescription>Quickly find and filter community members</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex flex-col sm:flex-row gap-3 items-start sm:items-center">
                <div className="flex-1 relative w-full">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground w-4 h-4" />
                  <Input
                    placeholder="Search members..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="pl-10 glass border-white/10"
                  />
                </div>

                <div className="flex gap-2 w-full sm:w-auto">
                  <Select value={statusFilter} onValueChange={setStatusFilter}>
                    <SelectTrigger className="w-40 glass border-white/10">
                      <SelectValue placeholder="Status" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All</SelectItem>
                      <SelectItem value="active">Active</SelectItem>
                      <SelectItem value="unsubscribed">Unsubscribed</SelectItem>
                      <SelectItem value="bounced">Bounced</SelectItem>
                    </SelectContent>
                  </Select>

                  <Select value={engagementFilter} onValueChange={setEngagementFilter}>
                    <SelectTrigger className="w-40 glass border-white/10">
                      <SelectValue placeholder="Engagement" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All</SelectItem>
                      <SelectItem value="high">High</SelectItem>
                      <SelectItem value="medium">Medium</SelectItem>
                      <SelectItem value="low">Low</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="ml-auto flex gap-2">
                  <Button variant="outline" onClick={() => bulkAction("export", members.map((m) => m.id))} className="glass border-white/10">
                    <Download className="w-4 h-4 mr-2" /> Export All
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Members table */}
          <Card className="glass border-white/10">
            <CardHeader>
              <CardTitle>Community Members</CardTitle>
              <CardDescription>{filteredMembers.length} results</CardDescription>
            </CardHeader>

            <CardContent>
              <div className="rounded-md overflow-hidden border border-white/6">
                <Table>
                  <TableHeader>
                    <TableRow className="bg-transparent">
                      <TableHead>Member</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead>Engagement</TableHead>
                      <TableHead>Source</TableHead>
                      <TableHead>Location</TableHead>
                      <TableHead>Joined</TableHead>
                      <TableHead className="text-right">Actions</TableHead>
                    </TableRow>
                  </TableHeader>

                  <TableBody>
                    {filteredMembers.map((member) => (
                      <TableRow key={member.id} className="hover:bg-white/2 transition-colors">
                        <TableCell>
                          <div className="flex items-center gap-3">
                            <div className="w-10 h-10 rounded-full glass flex items-center justify-center">
                              <Users className="w-4 h-4 text-primary" />
                            </div>
                            <div className="min-w-0">
                              <div className="flex items-center gap-2">
                                <p className="font-medium text-foreground truncate">{member.name || member.email.split("@")[0]}</p>
                                <span className="text-xs text-muted-foreground">{member.email}</span>
                              </div>
                              {member.tags.length > 0 && (
                                <div className="flex gap-1 mt-1">
                                  {member.tags.slice(0, 2).map((tag) => (
                                    <Badge key={tag} variant="outline" className="text-xs">
                                      {tag}
                                    </Badge>
                                  ))}
                                </div>
                              )}
                            </div>
                          </div>
                        </TableCell>

                        <TableCell>
                          <Badge className={getStatusColor(member.status)}>
                            {member.status.charAt(0).toUpperCase() + member.status.slice(1)}
                          </Badge>
                        </TableCell>

                        <TableCell>
                          <Badge variant="outline" className={getEngagementColor(member.engagement)}>
                            {member.engagement.charAt(0).toUpperCase() + member.engagement.slice(1)}
                          </Badge>
                        </TableCell>

                        <TableCell>
                          <Badge variant="outline" className="text-xs">
                            {member.source.charAt(0).toUpperCase() + member.source.slice(1)}
                          </Badge>
                        </TableCell>

                        <TableCell>
                          <div className="flex items-center gap-2 text-sm">
                            <Globe className="w-3 h-3" />
                            <span>{member.location || "—"}</span>
                          </div>
                        </TableCell>

                        <TableCell>
                          <div className="text-sm text-muted-foreground">
                            {formatDate(member.joinedAt)}
                          </div>
                        </TableCell>

                        <TableCell>
                          <div className="flex items-center justify-end gap-2">
                            <Button
                              variant="outline"
                              size="sm"
                              onClick={() => {
                                setSelectedMemberId(member.id === selectedMemberId ? null : member.id);
                                toast({ title: "Selected", description: `${member.email} selected.` });
                              }}
                              className={selectedMemberId === member.id ? "glass-strong" : "glass border-white/8"}
                            >
                              <MoreHorizontal className="w-4 h-4" />
                            </Button>

                            <Button
                              variant="destructive"
                              size="sm"
                              onClick={() => removeMember(member.id)}
                              className="glass"
                            >
                              <Trash2 className="w-4 h-4" />
                            </Button>
                          </div>
                        </TableCell>
                      </TableRow>
                    ))}

                    {filteredMembers.length === 0 && (
                      <TableRow>
                        <TableCell colSpan={7}>
                          <div className="py-8 text-center text-muted-foreground">
                            No members found. Try adjusting filters or search.
                          </div>
                        </TableCell>
                      </TableRow>
                    )}
                  </TableBody>
                </Table>
              </div>
            </CardContent>
          </Card>
        </>
      )}

      {/* Newsletters Tab */}
      {activeTab === "newsletters" && (
        <Card className="glass border-white/10">
          <CardHeader>
            <CardTitle>Newsletter Campaigns</CardTitle>
            <CardDescription>Manage drafts, scheduled and sent newsletters</CardDescription>
          </CardHeader>

          <CardContent>
            <div className="rounded-md overflow-hidden border border-white/6">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Subject</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Recipients</TableHead>
                    <TableHead>Open Rate</TableHead>
                    <TableHead>Click Rate</TableHead>
                    <TableHead>Date</TableHead>
                    <TableHead className="text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>

                <TableBody>
                  {newsletters.map((nl) => (
                    <TableRow key={nl.id} className="hover:bg-white/2">
                      <TableCell>
                        <div>
                          <p className="font-medium text-foreground line-clamp-1">{nl.subject}</p>
                          <p className="text-sm text-muted-foreground line-clamp-2">{nl.content}</p>
                        </div>
                      </TableCell>

                      <TableCell>
                        <Badge className={getNewsletterStatusColor(nl.status)}>
                          {nl.status.charAt(0).toUpperCase() + nl.status.slice(1)}
                        </Badge>
                      </TableCell>

                      <TableCell>
                        <div className="font-medium">{nl.recipients.toLocaleString()}</div>
                      </TableCell>

                      <TableCell>
                        {nl.openRate ? <div className="font-medium text-green-500">{nl.openRate}%</div> : <div className="text-muted-foreground">—</div>}
                      </TableCell>

                      <TableCell>
                        {nl.clickRate ? <div className="font-medium text-blue-500">{nl.clickRate}%</div> : <div className="text-muted-foreground">—</div>}
                      </TableCell>

                      <TableCell>
                        <div className="text-sm text-muted-foreground">
                          {nl.sentAt ? formatDate(nl.sentAt) : nl.scheduledFor ? formatDate(nl.scheduledFor) : formatDate(nl.createdAt)}
                        </div>
                      </TableCell>

                      <TableCell>
                        <div className="flex items-center justify-end gap-2">
                          {nl.status === "draft" && (
                            <Button variant="outline" size="sm" onClick={() => sendNewsletter(nl.id)} className="glass border-white/8">
                              <Check className="w-4 h-4 mr-1" /> Send
                            </Button>
                          )}

                          <Button variant="outline" size="sm" onClick={() => {
                            setSelectedNewsletterId(nl.id === selectedNewsletterId ? null : nl.id);
                            toast({ title: "Newsletter", description: `${nl.subject} selected.` });
                          }}>
                            <MoreHorizontal className="w-4 h-4" />
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}

                  {newsletters.length === 0 && (
                    <TableRow>
                      <TableCell colSpan={7}>
                        <div className="py-8 text-center text-muted-foreground">No newsletters yet.</div>
                      </TableCell>
                    </TableRow>
                  )}
                </TableBody>
              </Table>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default CommunityManagement;
