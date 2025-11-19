// ⬇️ LIMITLESS Upgraded HiringManagement.tsx

import { useState } from "react";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import {
  Table,
  TableBody,
  TableCell,
  TableHeader,
  TableHead,
  TableRow,
} from "@/components/ui/table";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogTrigger,
} from "@/components/ui/dialog";

import {
  Select,
  SelectTrigger,
  SelectContent,
  SelectItem,
  SelectValue,
} from "@/components/ui/select";

import {
  Search,
  Download,
  Eye,
  FileText,
  Calendar,
  User,
  Briefcase,
  Star,
} from "lucide-react";

import { toast } from "@/hooks/use-toast";

// Types
interface Application {
  id: string;
  candidateName: string;
  email: string;
  phone?: string;
  position: string;
  experience: string;
  status:
    | "applied"
    | "screening"
    | "interview"
    | "offer"
    | "hired"
    | "rejected";
  resumeUrl?: string;
  portfolioUrl?: string;
  appliedAt: string;
  lastUpdate?: string;
  rating?: number;
  notes?: string;
}

const HiringManagement = () => {
  // Filters
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [positionFilter, setPositionFilter] = useState("all");

  // Mock Data (Replace with API)
  const mockApplications: Application[] = [
    {
      id: "1",
      candidateName: "Alex Thompson",
      email: "alex.thompson@email.com",
      phone: "+1 (555) 123-4567",
      position: "Senior Frontend Developer",
      experience: "5+ years",
      status: "interview",
      resumeUrl: "/resumes/alex-thompson.pdf",
      portfolioUrl: "https://alexthompson.dev",
      appliedAt: "2024-01-15T10:30:00Z",
      rating: 4,
      notes: "Strong React skills, great portfolio projects",
    },
    {
      id: "2",
      candidateName: "Maria Garcia",
      email: "maria.garcia@email.com",
      position: "UI/UX Designer",
      experience: "3+ years",
      status: "screening",
      portfolioUrl: "https://dribbble.com/mariagarcia",
      appliedAt: "2024-01-14T09:15:00Z",
      rating: 5,
      notes: "Excellent design skills, worked with major brands",
    },
    {
      id: "3",
      candidateName: "David Kim",
      email: "david.kim@email.com",
      phone: "+1 (555) 987-6543",
      position: "Backend Developer",
      experience: "7+ years",
      status: "offer",
      resumeUrl: "/resumes/david-kim.pdf",
      appliedAt: "2024-01-12T16:45:00Z",
      rating: 5,
      notes: "Excellent Node.js and Python skills, great culture fit",
    },
  ];

  const [applications] = useState<Application[]>(mockApplications);
  const [selectedApplication, setSelectedApplication] =
    useState<Application | null>(null);

  const positions = [
    "Senior Frontend Developer",
    "UI/UX Designer",
    "Backend Developer",
    "Full Stack Developer",
  ];

  // Status colors
  const getStatusColor = (status: string) =>
    ({
      applied: "bg-blue-500/10 text-blue-400",
      screening: "bg-yellow-500/10 text-yellow-400",
      interview: "bg-purple-500/10 text-purple-400",
      offer: "bg-green-500/10 text-green-400",
      hired: "bg-emerald-500/10 text-emerald-400",
      rejected: "bg-red-500/10 text-red-400",
    }[status] || "bg-gray-500/10 text-gray-400");

  // Search + Filters
  const filteredApplications = applications.filter((app) => {
    const s = searchQuery.toLowerCase();
    const matchSearch =
      app.candidateName.toLowerCase().includes(s) ||
      app.email.toLowerCase().includes(s) ||
      app.position.toLowerCase().includes(s);

    const matchStatus = statusFilter === "all" || app.status === statusFilter;
    const matchPosition =
      positionFilter === "all" || app.position === positionFilter;

    return matchSearch && matchStatus && matchPosition;
  });

  // Stars
  const renderStars = (rating?: number) =>
    rating ? (
      <div className="flex gap-1">
        {[1, 2, 3, 4, 5].map((n) => (
          <Star
            key={n}
            className={`w-3 h-3 ${
              n <= rating ? "text-yellow-400 fill-yellow-400" : "text-zinc-500"
            }`}
          />
        ))}
      </div>
    ) : null;

  // Mock actions
  const exportApplications = () =>
    toast({
      title: "Export Started",
      description: "Preparing application export...",
    });

  const updateStatus = (id: string, status: string) =>
    toast({
      title: "Status Updated",
      description: `Changed to ${status}`,
    });

  // ──────────────────────────────────────────────────────────────────────────────
  // UI START
  // ──────────────────────────────────────────────────────────────────────────────

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold">Hiring & Talent Pipeline</h1>
          <p className="text-muted-foreground">
            Track and manage candidates across all career funnels
          </p>
        </div>

        <Button onClick={exportApplications} className="glass-strong">
          <Download className="w-4 h-4 mr-2" />
          Export
        </Button>
      </div>

      {/* KPIs */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        {[
          {
            label: "Total Applications",
            value: applications.length,
            color: "text-blue-400",
          },
          {
            label: "Interviews",
            value: applications.filter((x) => x.status === "interview").length,
            color: "text-purple-400",
          },
          {
            label: "Offers",
            value: applications.filter((x) => x.status === "offer").length,
            color: "text-green-400",
          },
          {
            label: "Hired",
            value: applications.filter((x) => x.status === "hired").length,
            color: "text-emerald-400",
          },
        ].map((stat) => (
          <Card
            key={stat.label}
            className="glass border-white/10 backdrop-blur-xl rounded-xl"
          >
            <CardContent className="p-4">
              <div className="text-2xl font-semibold">{stat.value}</div>
              <div className={`${stat.color} text-sm`}>{stat.label}</div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Filters */}
      <Card className="glass border-white/10 backdrop-blur-xl">
        <CardHeader>
          <CardTitle>Filters & Search</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col sm:flex-row gap-4">
            {/* Search */}
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-white/50 w-4 h-4" />
              <Input
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search by name, email or position..."
                className="glass pl-10 border-white/10"
              />
            </div>

            {/* Status Filter */}
            <Select value={statusFilter} onValueChange={setStatusFilter}>
              <SelectTrigger className="glass border-white/10 w-full sm:w-40">
                <SelectValue placeholder="Status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Status</SelectItem>
                <SelectItem value="applied">Applied</SelectItem>
                <SelectItem value="screening">Screening</SelectItem>
                <SelectItem value="interview">Interview</SelectItem>
                <SelectItem value="offer">Offer</SelectItem>
                <SelectItem value="hired">Hired</SelectItem>
                <SelectItem value="rejected">Rejected</SelectItem>
              </SelectContent>
            </Select>

            {/* Position Filter */}
            <Select value={positionFilter} onValueChange={setPositionFilter}>
              <SelectTrigger className="glass border-white/10 w-full sm:w-56">
                <SelectValue placeholder="Position" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Positions</SelectItem>
                {positions.map((p) => (
                  <SelectItem key={p} value={p}>
                    {p}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>

      {/* TABLE */}
      <Card className="glass border-white/10 backdrop-blur-xl">
        <CardHeader>
          <CardTitle>Applications ({filteredApplications.length})</CardTitle>
          <CardDescription>
            Active applicants moving through the hiring pipeline
          </CardDescription>
        </CardHeader>

        <CardContent className="p-0">
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow className="border-white/10">
                  <TableHead>Candidate</TableHead>
                  <TableHead>Position</TableHead>
                  <TableHead>Experience</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Rating</TableHead>
                  <TableHead>Applied</TableHead>
                  <TableHead>Actions</TableHead>
                </TableRow>
              </TableHeader>

              <TableBody>
                {filteredApplications.map((app) => (
                  <TableRow key={app.id} className="border-white/10">
                    <TableCell>
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-full glass flex items-center justify-center">
                          <User className="w-5 h-5 text-primary" />
                        </div>
                        <div>
                          <p className="font-medium">{app.candidateName}</p>
                          <p className="text-sm text-white/50">{app.email}</p>
                        </div>
                      </div>
                    </TableCell>

                    <TableCell>
                      <div className="flex items-center gap-1">
                        <Briefcase className="w-4 h-4 text-white/50" />
                        {app.position}
                      </div>
                    </TableCell>

                    <TableCell>{app.experience}</TableCell>

                    <TableCell>
                      <Badge className={`${getStatusColor(app.status)} rounded-md`}>
                        {app.status.charAt(0).toUpperCase() +
                          app.status.slice(1)}
                      </Badge>
                    </TableCell>

                    <TableCell>{renderStars(app.rating)}</TableCell>

                    <TableCell>
                      <div className="flex items-center gap-1 text-sm text-muted-foreground">
                        <Calendar className="w-3 h-3" />
                        {new Date(app.appliedAt).toLocaleDateString()}
                      </div>
                    </TableCell>

                    {/* ACTIONS */}
                    <TableCell>
                      <div className="flex items-center gap-2">
                        {/* View Modal */}
                        <Dialog>
                          <DialogTrigger asChild>
                            <Button
                              variant="ghost"
                              size="sm"
                              className="hover:bg-white/10"
                              onClick={() => setSelectedApplication(app)}
                            >
                              <Eye className="w-4 h-4" />
                            </Button>
                          </DialogTrigger>

                          <DialogContent className="max-w-3xl glass border-white/10 backdrop-blur-xl p-6">
                            <DialogHeader>
                              <DialogTitle>Application Details</DialogTitle>
                              <DialogDescription>
                                Complete candidate profile & hiring actions
                              </DialogDescription>
                            </DialogHeader>

                            {selectedApplication && (
                              <div className="space-y-6">
                                {/* Info Grid */}
                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                  <div>
                                    <label className="text-sm font-medium">
                                      Name
                                    </label>
                                    <p className="text-sm text-muted-foreground">
                                      {selectedApplication.candidateName}
                                    </p>
                                  </div>

                                  <div>
                                    <label className="text-sm font-medium">
                                      Email
                                    </label>
                                    <p className="text-sm text-muted-foreground">
                                      {selectedApplication.email}
                                    </p>
                                  </div>

                                  <div>
                                    <label className="text-sm font-medium">
                                      Phone
                                    </label>
                                    <p className="text-sm text-muted-foreground">
                                      {selectedApplication.phone ||
                                        "Not provided"}
                                    </p>
                                  </div>

                                  <div>
                                    <label className="text-sm font-medium">
                                      Position
                                    </label>
                                    <p className="text-sm text-muted-foreground">
                                      {selectedApplication.position}
                                    </p>
                                  </div>

                                  <div>
                                    <label className="text-sm font-medium">
                                      Experience
                                    </label>
                                    <p className="text-sm text-muted-foreground">
                                      {selectedApplication.experience}
                                    </p>
                                  </div>

                                  <div>
                                    <label className="text-sm font-medium">
                                      Rating
                                    </label>
                                    <div className="mt-1">
                                      {renderStars(selectedApplication.rating)}
                                    </div>
                                  </div>
                                </div>

                                {/* Notes */}
                                {selectedApplication.notes && (
                                  <div>
                                    <label className="text-sm font-medium">
                                      Notes
                                    </label>
                                    <p className="text-sm text-muted-foreground mt-1 p-3 rounded-lg glass-strong">
                                      {selectedApplication.notes}
                                    </p>
                                  </div>
                                )}

                                {/* STATUS + FILES */}
                                <div className="flex flex-wrap gap-2">
                                  <Select
                                    value={selectedApplication.status}
                                    onValueChange={(v) =>
                                      updateStatus(
                                        selectedApplication.id,
                                        v
                                      )
                                    }
                                  >
                                    <SelectTrigger className="glass border-white/10 w-40">
                                      <SelectValue />
                                    </SelectTrigger>
                                    <SelectContent>
                                      <SelectItem value="applied">
                                        Applied
                                      </SelectItem>
                                      <SelectItem value="screening">
                                        Screening
                                      </SelectItem>
                                      <SelectItem value="interview">
                                        Interview
                                      </SelectItem>
                                      <SelectItem value="offer">
                                        Offer
                                      </SelectItem>
                                      <SelectItem value="hired">
                                        Hired
                                      </SelectItem>
                                      <SelectItem value="rejected">
                                        Rejected
                                      </SelectItem>
                                    </SelectContent>
                                  </Select>

                                  {selectedApplication.resumeUrl && (
                                    <Button
                                      variant="outline"
                                      size="sm"
                                      className="glass border-white/10"
                                    >
                                      <FileText className="w-4 h-4 mr-2" />
                                      Resume
                                    </Button>
                                  )}

                                  {selectedApplication.portfolioUrl && (
                                    <Button
                                      variant="outline"
                                      size="sm"
                                      className="glass border-white/10"
                                    >
                                      <Eye className="w-4 h-4 mr-2" />
                                      Portfolio
                                    </Button>
                                  )}
                                </div>
                              </div>
                            )}
                          </DialogContent>
                        </Dialog>

                        {/* Resume Quick Btn */}
                        {app.resumeUrl && (
                          <Button
                            variant="ghost"
                            size="sm"
                            className="hover:bg-white/10"
                          >
                            <FileText className="w-4 h-4" />
                          </Button>
                        )}
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default HiringManagement;
