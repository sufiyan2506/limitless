import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import {
  FileText,
  Image as ImageIcon,
  Tag,
  Calendar,
  Eye,
  Edit3,
  Trash2,
} from "lucide-react";

interface BlogPost {
  id: string;
  title: string;
  slug: string;
  excerpt: string;
  content: string;
  status: "draft" | "published" | "scheduled";
  category: string;
  tags: string[];
  author: string;
  publishedAt?: string;
  scheduledFor?: string;
  createdAt: string;
  updatedAt: string;
  featuredImage?: string;
  seoTitle?: string;
  seoDescription?: string;
  views?: number;
}

interface MobileContentCardProps {
  post: BlogPost;
  onStatusUpdate: (postId: string, newStatus: string) => void;
  onEdit: (post: BlogPost) => void;
  onDelete: (postId: string) => void;
}

const MobileContentCard = ({
  post,
  onStatusUpdate,
  onEdit,
  onDelete,
}: MobileContentCardProps) => {
  
  const getStatusColor = (status: string) => {
    const colors: Record<string, string> = {
      published: "bg-green-500/10 text-green-400 border-green-500/20",
      draft: "bg-yellow-500/10 text-yellow-400 border-yellow-500/20",
      scheduled: "bg-blue-500/10 text-blue-400 border-blue-500/20",
    };
    return colors[status] || "bg-zinc-500/10 text-zinc-400 border-zinc-500/20";
  };

  const formatDate = (date: string) =>
    new Date(date).toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
    });

  return (
    <Card className="border-white/10 bg-[#111]/80 backdrop-blur-xl rounded-2xl shadow-md transition-all hover:shadow-lg hover:border-white/20">
      <CardContent className="p-5">

        {/* Header */}
        <div className="flex items-start gap-3 mb-4">
          <div className="w-12 h-12 rounded-xl bg-white/5 flex items-center justify-center shadow-inner">
            {post.featuredImage ? (
              <ImageIcon className="w-6 h-6 text-white/80" />
            ) : (
              <FileText className="w-6 h-6 text-white/80" />
            )}
          </div>

          <div className="min-w-0 flex-1">
            <h3 className="font-semibold text-white text-base line-clamp-2 mb-1">
              {post.title}
            </h3>

            <div className="flex items-center gap-2 flex-wrap">
              <Badge
                className={`${getStatusColor(post.status)} text-xs px-2 py-0.5 rounded-md`}
              >
                {post.status.charAt(0).toUpperCase() + post.status.slice(1)}
              </Badge>

              <Badge
                variant="outline"
                className="text-xs border-white/10 text-white/70"
              >
                {post.category}
              </Badge>
            </div>
          </div>
        </div>

        {/* Excerpt */}
        <p className="text-sm text-white/60 line-clamp-2 mb-4">
          {post.excerpt}
        </p>

        {/* Tags */}
        <div className="flex flex-wrap gap-2 mb-4">
          {post.tags.slice(0, 3).map((tag) => (
            <Badge
              key={tag}
              variant="outline"
              className="text-xs bg-white/5 border-white/10 text-white/70 px-2 py-0.5 rounded-md flex items-center"
            >
              <Tag className="w-3 h-3 mr-1 opacity-70" />
              {tag}
            </Badge>
          ))}

          {post.tags.length > 3 && (
            <Badge
              variant="outline"
              className="text-xs border-white/10 text-white/60 bg-white/5 rounded-md px-2 py-0.5"
            >
              +{post.tags.length - 3}
            </Badge>
          )}
        </div>

        {/* Meta */}
        <div className="space-y-1.5 mb-6">
          <div className="flex justify-between text-sm text-white/50">
            <div className="flex items-center gap-1">
              <Calendar className="w-3 h-3 opacity-70" />
              {formatDate(post.createdAt)}
            </div>

            {post.views !== undefined && (
              <div className="flex items-center gap-1">
                <Eye className="w-3 h-3 opacity-70" />
                {post.views}
              </div>
            )}
          </div>

          <p className="text-xs text-white/40">by {post.author}</p>
        </div>

        {/* Actions */}
        <div className="flex items-center justify-between">
          <Select
            value={post.status}
            onValueChange={(value) => onStatusUpdate(post.id, value)}
          >
            <SelectTrigger
              className={`w-24 sm:w-32 text-xs border-white/10 bg-white/5 rounded-xl ${getStatusColor(
                post.status
              )}`}
            >
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="draft">Draft</SelectItem>
              <SelectItem value="published">Published</SelectItem>
              <SelectItem value="scheduled">Scheduled</SelectItem>
            </SelectContent>
          </Select>

          <div className="flex items-center gap-2">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => onEdit(post)}
              className="h-8 w-8 p-0 hover:bg-white/10 rounded-lg"
            >
              <Edit3 className="w-4 h-4" />
            </Button>

            <Button
              variant="ghost"
              size="sm"
              onClick={() => onDelete(post.id)}
              className="h-8 w-8 p-0 text-red-400 hover:text-red-500 hover:bg-red-500/10 rounded-lg"
            >
              <Trash2 className="w-4 h-4" />
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default MobileContentCard;
