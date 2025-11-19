// limitless-frontend-main/src/pages/admin/ContactManagement.tsx
import { useState, useMemo } from "react";
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
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
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
  User,
  Eye,
  Filter,
  Grid3X3,
  Table as TableIcon,
} from "lucide-react";
import { toast } from "@/hooks/use-toast";
import { useIsMobile } from "@/hooks/use-mobile";
import MobileContactCard from "@/components/admin/MobileContactCard";
import { cn } from "@/lib/utils";

type ContactStatus = "new" | "contacted" | "qualified" | "converted" | "closed";
type ContactSource = "website" | "chatbot" | "referral" | "social";

interface Contact {
  id: string;
  name: string;
  email: string;
  phone?: string;
  company?: string;
  message: string;
  status: ContactStatus;
  source: ContactSource;
  submittedAt: string;
  lastContact?: string;
}

const initialMockContacts: Contact[] = [
  {
    id: "1",
    name: "Sarah Johnson",
    email: "sarah.j@example.com",
    phone: "+1 (555) 123-4567",
    company: "Tech Innovations Inc.",
    message:
      "Interested in AI consultation for our e-commerce platform. Looking for custom solutions.",
    status: "new",
    source: "website",
    submittedAt: "2024-01-15T10:30:00Z",
  },
  {
    id: "2",
    name: "Mike Chen",
    email: "mike@startup.co",
    company: "StartupCo",
    message: "Need help with MVP development. Timeline is 3 months.",
    status: "contacted",
    source: "chatbot",
    submittedAt: "2024-01-14T15:45:00Z",
    lastContact: "2024-01-15T09:00:00Z",
  },
  {
    id: "3",
    name: "Emily Rodriguez",
    email: "emily.r@corp.com",
    phone: "+1 (555) 987-6543",
    company: "Enterprise Corp",
    message: "Looking for enterprise AI solutions. Budget: $50k-100k.",
    status: "qualified",
    source: "referral",
    submittedAt: "2024-01-13T12:20:00Z",
    lastContact: "2024-01-14T14:30:00Z",
  },
];

const statusOrder: ContactStatus[] = [
  "new",
  "contacted",
  "qualified",
  "converted",
  "closed",
];

const ContactManagement = () => {
  const isMobile = useIsMobile();

  // state
  const [contacts, setContacts] = useState<Contact[]>(
    initialMockContacts.map((c) => ({ ...c }))
  );
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState<string>("all");
  const [sourceFilter, setSourceFilter] = useState<string>("all");
  const [viewMode, setViewMode] = useState<"table" | "cards">("table");
  const [selectedContact, setSelectedContact] = useState<Contact | null>(null);

  // force card view on mobile
  const currentViewMode = isMobile ? "cards" : viewMode;

  // derived
  const totals = useMemo(() => {
    return {
      total: contacts.length,
      newCount: contacts.filter((c) => c.status === "new").length,
      qualified: contacts.filter((c) => c.status === "qualified").length,
      converted: contacts.filter((c) => c.status === "converted").length,
    };
  }, [contacts]);

  const filteredContacts = useMemo(() => {
    return contacts
      .filter((c) => {
        const q = searchQuery.trim().toLowerCase();
        if (!q) return true;
        return (
          c.name.toLowerCase().includes(q) ||
          c.email.toLowerCase().includes(q) ||
          (c.company || "").toLowerCase().includes(q) ||
          c.message.toLowerCase().includes(q)
        );
      })
      .filter((c) => (statusFilter === "all" ? true : c.status === statusFilter))
      .filter((c) => (sourceFilter === "all" ? true : c.source === sourceFilter))
      .sort((a, b) => statusOrder.indexOf(a.status) - statusOrder.indexOf(b.status));
  }, [contacts, searchQuery, statusFilter, sourceFilter]);

  // helpers
  const exportContactsCSV = () => {
    if (!contacts.length) {
      toast({ title: "No contacts", description: "There are no contacts to export." });
      return;
    }

    const header = [
      "id",
      "name",
      "email",
      "phone",
      "company",
      "status",
      "source",
      "submittedAt",
      "lastContact",
      "message",
    ];
    const rows = contacts.map((c) =>
      [
        c.id,
        c.name,
        c.email,
        c.phone || "",
        c.company || "",
        c.status,
        c.source,
        new Date(c.submittedAt).toISOString(),
        c.lastContact ? new Date(c.lastContact).toISOString() : "",
        `"${(c.message || "").replace(/"/g, '""')}"`,
      ].join(",")
    );
    const csv = [header.join(","), ...rows].join("\n");
    const blob = new Blob([csv], { type: "text/csv;charset=utf-8;" });
    const url = URL.createObjectURL(blob);

    const a = document.createElement("a");
    a.href = url;
    a.download = `limitless-contacts-${new Date().toISOString().slice(0, 10)}.csv`;
    a.click();
    URL.revokeObjectURL(url);

    toast({ title: "Export started", description: "CSV download should begin shortly." });
  };

  const updateContactStatus = (contactId: string, newStatus: ContactStatus) => {
    setContacts((prev) =>
      prev.map((c) => (c.id === contactId ? { ...c, status: newStatus, lastContact: c.lastContact || new Date().toISOString() } : c))
    );
    toast({ title: "Status updated", description: `Contact marked ${newStatus}` });
  };

  const openMailClient = (email: string) => {
    window.open(`mailto:${email}`, "_blank");
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-bold text-foreground">Contact & Lead Management</h1>
          <p className="text-sm sm:text-base text-muted-foreground">
            Manage submissions, follow-ups and convert more leads.
          </p>
        </div>

        <div className="flex items-center gap-2 w-full sm:w-auto">
          {!isMobile && (
            <div className="flex items-center gap-1 bg-background/50 rounded-lg p-1">
              <Button
                variant={viewMode === "table" ? "default" : "ghost"}
                size="sm"
                onClick={() => setViewMode("table")}
                className="h-8 px-3"
                title="Table view"
              >
                <TableIcon className="w-4 h-4" />
              </Button>
              <Button
                variant={viewMode === "cards" ? "default" : "ghost"}
                size="sm"
                onClick={() => setViewMode("cards")}
                className="h-8 px-3"
                title="Card view"
              >
                <Grid3X3 className="w-4 h-4" />
              </Button>
            </div>
          )}

          <Button onClick={exportContactsCSV} className="glass-strong flex-1 sm:flex-none">
            <Download className="w-4 h-4 mr-2" /> Export
          </Button>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        <Card className="glass border-white/10">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <div className="text-2xl font-bold">{totals.total}</div>
                <div className="text-xs text-muted-foreground">Total Contacts</div>
              </div>
              <User className="w-6 h-6 text-primary" />
            </div>
          </CardContent>
        </Card>

        <Card className="glass border-white/10">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <div className="text-2xl font-bold">{totals.newCount}</div>
                <div className="text-xs text-muted-foreground">New</div>
              </div>
              <Badge className="bg-blue-600/10 text-blue-400">Live</Badge>
            </div>
          </CardContent>
        </Card>

        <Card className="glass border-white/10">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <div className="text-2xl font-bold">{totals.qualified}</div>
                <div className="text-xs text-muted-foreground">Qualified</div>
              </div>
              <Badge className="bg-green-500/10 text-green-400">Progress</Badge>
            </div>
          </CardContent>
        </Card>

        <Card className="glass border-white/10">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <div className="text-2xl font-bold">{totals.converted}</div>
                <div className="text-xs text-muted-foreground">Converted</div>
              </div>
              <Badge className="bg-purple-500/10 text-purple-400">Revenue</Badge>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Filters */}
      <Card className="glass border-white/10">
        <CardHeader className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 p-4">
          <div className="flex items-center gap-3 w-full sm:w-auto">
            <div className="relative flex-1 sm:flex-none">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground w-4 h-4" />
              <Input
                placeholder="Search name, email, company or message..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10 glass border-white/10"
              />
            </div>

            <div className="flex items-center gap-2">
              <Select value={statusFilter} onValueChange={setStatusFilter}>
                <SelectTrigger className="glass border-white/10 h-11 w-44">
                  <SelectValue placeholder="Status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Status</SelectItem>
                  <SelectItem value="new">New</SelectItem>
                  <SelectItem value="contacted">Contacted</SelectItem>
                  <SelectItem value="qualified">Qualified</SelectItem>
                  <SelectItem value="converted">Converted</SelectItem>
                  <SelectItem value="closed">Closed</SelectItem>
                </SelectContent>
              </Select>

              <Select value={sourceFilter} onValueChange={setSourceFilter}>
                <SelectTrigger className="glass border-white/10 h-11 w-44">
                  <SelectValue placeholder="Source" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Sources</SelectItem>
                  <SelectItem value="website">Website</SelectItem>
                  <SelectItem value="chatbot">Chatbot</SelectItem>
                  <SelectItem value="referral">Referral</SelectItem>
                  <SelectItem value="social">Social</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="hidden sm:flex items-center gap-3">
            <Button variant="ghost" size="sm" className="glass border-white/10">
              <Filter className="w-4 h-4 mr-2" /> Advanced
            </Button>
          </div>
        </CardHeader>
      </Card>

      {/* Main content: Table or Cards */}
      {currentViewMode === "cards" ? (
        <div className="space-y-4">
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {filteredContacts.map((contact) => (
              <MobileContactCard
                key={contact.id}
                contact={contact}
                onStatusUpdate={(id, s) => updateContactStatus(id, s as ContactStatus)}
                onViewDetails={(c) => setSelectedContact(c)}
              />
            ))}
          </div>
        </div>
      ) : (
        <Card className="glass border-white/10">
          <CardHeader className="p-4">
            <div className="flex items-center justify-between w-full">
              <div>
                <CardTitle>Contacts ({filteredContacts.length})</CardTitle>
                <CardDescription>Recent contact form submissions and inquiries</CardDescription>
              </div>
              <div className="flex items-center gap-2">
                <Button variant="ghost" size="sm" className="glass border-white/10" onClick={() => setViewMode("cards")}>
                  <Grid3X3 className="w-4 h-4" />
                </Button>
              </div>
            </div>
          </CardHeader>

          <CardContent className="p-0">
            <div className="overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow className="hover:bg-transparent border-white/10">
                    <TableHead className="min-w-[260px]">Contact</TableHead>
                    <TableHead className="min-w-[160px]">Company</TableHead>
                    <TableHead className="min-w-[120px]">Status</TableHead>
                    <TableHead className="min-w-[120px]">Source</TableHead>
                    <TableHead className="min-w-[140px]">Submitted</TableHead>
                    <TableHead className="min-w-[120px]">Actions</TableHead>
                  </TableRow>
                </TableHeader>

                <TableBody>
                  {filteredContacts.map((c) => (
                    <TableRow key={c.id} className={cn("border-white/10")}>
                      <TableCell>
                        <div className="flex items-center gap-3 min-w-0">
                          <div className="w-10 h-10 rounded-full glass flex items-center justify-center">
                            <User className="w-5 h-5 text-primary" />
                          </div>
                          <div className="min-w-0">
                            <p className="font-medium text-foreground truncate">{c.name}</p>
                            <p className="text-sm text-muted-foreground truncate">{c.email}</p>
                          </div>
                        </div>
                      </TableCell>

                      <TableCell>
                        <p className="font-medium truncate">{c.company || "-"}</p>
                      </TableCell>

                      <TableCell>
                        <Badge className={cn(
                          c.status === "new" && "bg-blue-600/10 text-blue-400",
                          c.status === "contacted" && "bg-yellow-500/10 text-yellow-400",
                          c.status === "qualified" && "bg-green-500/10 text-green-400",
                          c.status === "converted" && "bg-purple-500/10 text-purple-400",
                          c.status === "closed" && "bg-zinc-500/10 text-zinc-400",
                          "text-xs px-2 py-1 rounded-md"
                        )}>
                          {c.status.charAt(0).toUpperCase() + c.status.slice(1)}
                        </Badge>
                      </TableCell>

                      <TableCell>
                        <Badge className={cn(
                          c.source === "website" && "bg-blue-500/10 text-blue-400",
                          c.source === "chatbot" && "bg-pink-500/10 text-pink-400",
                          c.source === "referral" && "bg-green-500/10 text-green-400",
                          c.source === "social" && "bg-yellow-500/10 text-yellow-400",
                          "text-xs px-2 py-1 rounded-md"
                        )}>
                          {c.source.charAt(0).toUpperCase() + c.source.slice(1)}
                        </Badge>
                      </TableCell>

                      <TableCell>
                        <div className="flex items-center gap-2 text-sm text-muted-foreground">
                          <Calendar className="w-3 h-3" />
                          {new Date(c.submittedAt).toLocaleDateString()}
                        </div>
                      </TableCell>

                      <TableCell>
                        <div className="flex items-center gap-2">
                          <Dialog>
                            <DialogTrigger asChild>
                              <Button
                                variant="ghost"
                                size="sm"
                                onClick={() => setSelectedContact(c)}
                                className="h-8 px-2"
                              >
                                <Eye className="w-4 h-4" />
                              </Button>
                            </DialogTrigger>

                            {/* Dialog content is handled in MobileContactCard; we still open a Dialog here to keep consistent styling.
                                Alternatively we can show a dedicated modal - for now we reuse MobileContactCard's dialog via selectedContact rendering below */}
                          </Dialog>

                          <Button variant="ghost" size="sm" className="h-8 px-2" onClick={() => openMailClient(c.email)}>
                            <Mail className="w-4 h-4" />
                          </Button>

                          <Select value={c.status} onValueChange={(v) => updateContactStatus(c.id, v as ContactStatus)}>
                            <SelectTrigger className="glass border-white/10 h-8 w-32 text-sm">
                              <SelectValue />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="new">New</SelectItem>
                              <SelectItem value="contacted">Contacted</SelectItem>
                              <SelectItem value="qualified">Qualified</SelectItem>
                              <SelectItem value="converted">Converted</SelectItem>
                              <SelectItem value="closed">Closed</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Selected contact modal (re-uses MobileContactCard dialog structure) */}
      {selectedContact && (
        <Dialog open={!!selectedContact} onOpenChange={(open) => !open && setSelectedContact(null)}>
          <DialogTrigger asChild>
            <div /> {/* invisible trigger; we control open state programmatically */}
          </DialogTrigger>

          <DialogContent className="max-w-[90vw] sm:max-w-2xl bg-[#111]/95 backdrop-blur-xl border-white/10 rounded-xl max-h-[85vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle>Contact Details</DialogTitle>
            </DialogHeader>

            {/* Use the MobileContactCard UI inside the dialog for consistency */}
            <div className="p-4">
              <div className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <p className="text-sm font-medium text-white/80">Name</p>
                    <p className="text-sm text-muted-foreground">{selectedContact.name}</p>
                  </div>
                  <div>
                    <p className="text-sm font-medium text-white/80">Email</p>
                    <p className="text-sm text-muted-foreground break-all">{selectedContact.email}</p>
                  </div>
                  <div>
                    <p className="text-sm font-medium text-white/80">Phone</p>
                    <p className="text-sm text-muted-foreground">{selectedContact.phone || "Not provided"}</p>
                  </div>
                  <div>
                    <p className="text-sm font-medium text-white/80">Company</p>
                    <p className="text-sm text-muted-foreground">{selectedContact.company || "Not provided"}</p>
                  </div>
                </div>

                <div>
                  <p className="text-sm font-medium text-white/80">Message</p>
                  <p className="text-sm text-muted-foreground mt-2 p-4 bg-white/5 rounded-xl whitespace-pre-wrap">
                    {selectedContact.message}
                  </p>
                </div>

                <div className="flex flex-col sm:flex-row gap-2">
                  <Select
                    value={selectedContact.status}
                    onValueChange={(v) => {
                      updateContactStatus(selectedContact.id, v as ContactStatus);
                      setSelectedContact((prev) => (prev ? { ...prev, status: v as ContactStatus } : prev));
                    }}
                  >
                    <SelectTrigger className="bg-white/5 border-white/10 rounded-xl">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="new">New</SelectItem>
                      <SelectItem value="contacted">Contacted</SelectItem>
                      <SelectItem value="qualified">Qualified</SelectItem>
                      <SelectItem value="converted">Converted</SelectItem>
                      <SelectItem value="closed">Closed</SelectItem>
                    </SelectContent>
                  </Select>

                  <Button variant="outline" size="sm" className="bg-white/5 border-white/10" onClick={() => openMailClient(selectedContact.email)}>
                    <Mail className="w-4 h-4 mr-2" /> Send Email
                  </Button>
                </div>
              </div>
            </div>
          </DialogContent>
        </Dialog>
      )}
    </div>
  );
};

export default ContactManagement;
