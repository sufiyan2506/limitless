import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

import {
  Dialog,
  DialogContent,
  DialogDescription,
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
  User,
  Mail,
  Phone,
  Building,
  Calendar,
  Eye,
  MessageSquare,
} from "lucide-react";

interface Contact {
  id: string;
  name: string;
  email: string;
  phone?: string;
  company?: string;
  message: string;
  status: "new" | "contacted" | "qualified" | "converted" | "closed";
  source: "website" | "chatbot" | "referral" | "social";
  submittedAt: string;
  lastContact?: string;
}

interface MobileContactCardProps {
  contact: Contact;
  onStatusUpdate: (contactId: string, newStatus: string) => void;
  onViewDetails: (contact: Contact) => void;
}

const MobileContactCard = ({
  contact,
  onStatusUpdate,
  onViewDetails,
}: MobileContactCardProps) => {
  
  // Elegant status colors
  const getStatusColor = (status: string) => {
    const colors: Record<string, string> = {
      new: "bg-blue-600/10 text-blue-400 border-blue-500/20",
      contacted: "bg-yellow-500/10 text-yellow-400 border-yellow-500/20",
      qualified: "bg-green-500/10 text-green-400 border-green-500/20",
      converted: "bg-purple-500/10 text-purple-400 border-purple-500/20",
      closed: "bg-zinc-500/10 text-zinc-400 border-zinc-500/20",
    };
    return colors[status] || colors.closed;
  };

  const getSourceColor = (source: string) => {
    const colors: Record<string, string> = {
      website: "bg-blue-500/10 text-blue-400 border-blue-500/20",
      chatbot: "bg-pink-500/10 text-pink-400 border-pink-500/20",
      referral: "bg-green-500/10 text-green-400 border-green-500/20",
      social: "bg-yellow-500/10 text-yellow-400 border-yellow-500/20",
    };
    return colors[source] || "bg-zinc-500/10 text-zinc-400 border-zinc-500/20";
  };

  return (
    <Card className="border-white/10 bg-[#111]/80 backdrop-blur-xl rounded-2xl shadow-md transition-all hover:shadow-lg hover:border-white/20">
      <CardContent className="p-5">

        {/* Header */}
        <div className="flex items-start justify-between mb-4">
          <div className="flex items-center gap-3 min-w-0">
            <div className="w-11 h-11 rounded-full bg-white/5 backdrop-blur flex items-center justify-center">
              <User className="w-5 h-5 text-white/80" />
            </div>

            <div className="min-w-0">
              <h3 className="font-semibold text-white truncate">{contact.name}</h3>
              <p className="text-sm text-white/50 truncate">{contact.email}</p>
            </div>
          </div>

          <Badge className={`${getStatusColor(contact.status)} text-xs px-2 py-1 rounded-md`}>
            {contact.status.charAt(0).toUpperCase() + contact.status.slice(1)}
          </Badge>
        </div>

        {/* Contact Details */}
        <div className="space-y-2 mb-4">
          {contact.phone && (
            <div className="flex items-center gap-2 text-sm text-white/60">
              <Phone className="w-4 h-4" />
              <span className="truncate">{contact.phone}</span>
            </div>
          )}

          {contact.company && (
            <div className="flex items-center gap-2 text-sm text-white/60">
              <Building className="w-4 h-4" />
              <span className="truncate">{contact.company}</span>
            </div>
          )}

          <div className="flex items-center gap-2 text-sm text-white/60">
            <Calendar className="w-4 h-4" />
            <span>{new Date(contact.submittedAt).toLocaleDateString()}</span>
          </div>
        </div>

        {/* Message */}
        <div className="mb-5">
          <div className="flex items-center gap-2 mb-1.5">
            <MessageSquare className="w-4 h-4 text-white/50" />
            <span className="text-sm font-medium text-white/60">Message</span>
          </div>

          <p className="text-sm text-white/80 line-clamp-2 pl-6">
            {contact.message}
          </p>
        </div>

        {/* Footer */}
        <div className="flex items-center justify-between">
          <Badge className={`${getSourceColor(contact.source)} text-xs px-2 py-1 rounded-md`}>
            {contact.source.charAt(0).toUpperCase() + contact.source.slice(1)}
          </Badge>

          <div className="flex items-center gap-2">

            {/* View Details */}
            <Dialog>
              <DialogTrigger asChild>
                <Button
                  variant="ghost"
                  size="sm"
                  className="h-8 w-8 p-0 flex items-center justify-center hover:bg-white/10"
                  onClick={() => onViewDetails(contact)}
                >
                  <Eye className="w-4 h-4" />
                </Button>
              </DialogTrigger>

              <DialogContent className="max-w-[90vw] sm:max-w-2xl bg-[#111]/95 backdrop-blur-xl border-white/10 rounded-xl max-h-[85vh] overflow-y-auto">
                <DialogHeader>
                  <DialogTitle>Contact Details</DialogTitle>
                  <DialogDescription>
                    Full contact information and message
                  </DialogDescription>
                </DialogHeader>

                <div className="space-y-4 py-2">

                  {/* Grid Information */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {[
                      ["Name", contact.name],
                      ["Email", contact.email],
                      ["Phone", contact.phone || "Not provided"],
                      ["Company", contact.company || "Not provided"],
                    ].map(([label, value]) => (
                      <div key={label}>
                        <p className="text-sm font-medium text-white/80">{label}</p>
                        <p className="text-sm text-white/60 break-all">{value}</p>
                      </div>
                    ))}
                  </div>

                  {/* Full Message */}
                  <div>
                    <p className="text-sm font-medium text-white/80">Message</p>
                    <p className="text-sm text-white/70 mt-1 p-4 bg-white/5 rounded-xl whitespace-pre-wrap">
                      {contact.message}
                    </p>
                  </div>

                  {/* Update Status */}
                  <div className="flex flex-col sm:flex-row gap-2">
                    <Select
                      value={contact.status}
                      onValueChange={(v) => onStatusUpdate(contact.id, v)}
                    >
                      <SelectTrigger className="bg-white/5 border-white/10 rounded-xl">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        {["new", "contacted", "qualified", "converted", "closed"].map(
                          (stat) => (
                            <SelectItem key={stat} value={stat}>
                              {stat.charAt(0).toUpperCase() + stat.slice(1)}
                            </SelectItem>
                          )
                        )}
                      </SelectContent>
                    </Select>

                    <Button
                      variant="outline"
                      size="sm"
                      className="bg-white/5 border-white/10 rounded-xl"
                    >
                      <Mail className="w-4 h-4 mr-1.5" />
                      Send Email
                    </Button>
                  </div>
                </div>
              </DialogContent>
            </Dialog>

            {/* Quick Email */}
            <Button
              variant="ghost"
              size="sm"
              className="h-8 w-8 p-0 hover:bg-white/10"
              onClick={() => window.open(`mailto:${contact.email}`, "_blank")}
            >
              <Mail className="w-4 h-4" />
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default MobileContactCard;
