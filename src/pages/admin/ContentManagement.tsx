// limitless-frontend-main\src\pages\admin\ContentManagement.tsx
import React, { useState, useRef, useEffect } from "react";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
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
  Plus,
  Edit3,
  Trash2,
  Eye,
  Calendar,
  Tag,
  FileText,
  Image as ImageIcon,
  Grid3X3,
  Table as TableIcon,
} from "lucide-react";
import { toast } from "@/hooks/use-toast";
import { useIsMobile } from "@/hooks/use-mobile";
import MobileContentCard from "@/components/admin/MobileContentCard";

type PostStatus = "draft" | "published" | "scheduled";

interface BlogPost {
  id: string;
  title: string;
  slug: string;
  excerpt: string;
  content: string;
  status: PostStatus;
  category: string;
  tags: string[];
  author: string;
  publishedAt?: string;
  scheduledFor?: string;
  createdAt: string;
  updatedAt: string;
  featuredImage?: string; // URL (or blob URL)
  seoTitle?: string;
  seoDescription?: string;
  views?: number;
}

const defaultCategories = [
  "Technology",
  "Development",
  "Design",
  "Business",
  "AI",
];

const makeSlug = (text: string) =>
  text
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");

const ContentManagement: React.FC = () => {
  const isMobile = useIsMobile();

  // Initial mock posts
  const [posts, setPosts] = useState<BlogPost[]>(() => {
    const now = new Date().toISOString();
    return [
      {
        id: "1",
        title: "The Future of AI in Web Development",
        slug: "future-ai-web-development",
        excerpt:
          "Exploring how artificial intelligence is revolutionizing the way we build websites and applications.",
        content:
          "# The Future of AI in Web Development\n\nArtificial intelligence is transforming every aspect of web development...",
        status: "published",
        category: "Technology",
        tags: ["AI", "Web", "Automation"],
        author: "Limitless Team",
        publishedAt: now,
        createdAt: now,
        updatedAt: now,
        featuredImage: "/blog/ai-web-dev.jpg",
        seoTitle: "The Future of AI in Web Development | Limitless",
        seoDescription:
          "Discover how AI is revolutionizing web development with practical examples and future predictions.",
        views: 1250,
      },
      {
        id: "2",
        title: "Building Scalable React Applications",
        slug: "building-scalable-react-applications",
        excerpt:
          "Best practices and patterns for creating React applications that can grow with your business.",
        content:
          "Scaling React applications requires careful planning around state management, bundling and architecture...",
        status: "draft",
        category: "Development",
        tags: ["React", "Scalability"],
        author: "Limitless Team",
        createdAt: now,
        updatedAt: now,
        views: 0,
      },
      {
        id: "3",
        title: "UI/UX Design Trends for 2024",
        slug: "ui-ux-design-trends-2024",
        excerpt: "The latest design trends that will shape user experiences in 2024.",
        content: "As we move into 2024, several design trends are emerging...",
        status: "scheduled",
        category: "Design",
        tags: ["UI/UX", "Trends"],
        author: "Limitless Team",
        scheduledFor: now,
        createdAt: now,
        updatedAt: now,
        views: 0,
      },
    ];
  });

  // Filters / UI state
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState<string>("all");
  const [categoryFilter, setCategoryFilter] = useState<string>("all");
  const [viewMode, setViewMode] = useState<"table" | "cards">("table");

  // Dialogs & form state
  const [isCreateOpen, setIsCreateOpen] = useState(false);
  const [isEditOpen, setIsEditOpen] = useState(false);
  const [selectedPost, setSelectedPost] = useState<BlogPost | null>(null);

  const emptyForm: Partial<BlogPost> = {
    title: "",
    excerpt: "",
    content: "",
    category: "",
    tags: [],
    status: "draft",
    featuredImage: undefined,
    seoTitle: "",
    seoDescription: "",
  };

  const [createForm, setCreateForm] = useState<Partial<BlogPost>>(emptyForm);
  const [editForm, setEditForm] = useState<Partial<BlogPost>>(emptyForm);

  // Image handling refs
  const imageInputRef = useRef<HTMLInputElement | null>(null);
  const editImageInputRef = useRef<HTMLInputElement | null>(null);

  // Helpers
  const getStatusColor = (status: string) => {
    switch (status) {
      case "published":
        return "bg-green-500/10 text-green-400";
      case "draft":
        return "bg-yellow-500/10 text-yellow-400";
      case "scheduled":
        return "bg-blue-500/10 text-blue-400";
      default:
        return "bg-gray-500/10 text-gray-400";
    }
  };

  // Filtering logic
  const filteredPosts = posts.filter((p) => {
    const matchesSearch =
      p.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.excerpt.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.tags.join(" ").toLowerCase().includes(searchQuery.toLowerCase());
    const matchesStatus =
      statusFilter === "all" || p.status === (statusFilter as PostStatus);
    const matchesCategory =
      categoryFilter === "all" || p.category === categoryFilter;
    return matchesSearch && matchesStatus && matchesCategory;
  });

  // Create post
  const handleCreate = () => {
    if (!createForm.title || (createForm.title || "").trim() === "") {
      toast({ title: "Validation", description: "Title is required", variant: "destructive" });
      return;
    }
    const now = new Date().toISOString();
    const newPost: BlogPost = {
      id: Date.now().toString(),
      title: createForm.title!.trim(),
      slug: makeSlug(createForm.title || "untitled"),
      excerpt: createForm.excerpt || "",
      content: createForm.content || "",
      status: (createForm.status as PostStatus) || "draft",
      category: createForm.category || "General",
      tags: createForm.tags || [],
      author: "Admin User",
      createdAt: now,
      updatedAt: now,
      featuredImage: createForm.featuredImage,
      seoTitle: createForm.seoTitle,
      seoDescription: createForm.seoDescription,
      views: 0,
      scheduledFor: createForm.scheduledFor,
      publishedAt: createForm.status === "published" ? now : undefined,
    };
    setPosts((s) => [newPost, ...s]);
    setCreateForm(emptyForm);
    setIsCreateOpen(false);
    toast({ title: "Post created", description: "Saved to drafts" });
  };

  // Open edit dialog
  const handleOpenEdit = (post: BlogPost) => {
    setSelectedPost(post);
    setEditForm({
      title: post.title,
      excerpt: post.excerpt,
      content: post.content,
      category: post.category,
      tags: [...post.tags],
      status: post.status,
      featuredImage: post.featuredImage,
      seoTitle: post.seoTitle,
      seoDescription: post.seoDescription,
      scheduledFor: post.scheduledFor,
    });
    setIsEditOpen(true);
  };

  // Update post
  const handleUpdate = () => {
    if (!selectedPost) return;
    setPosts((prev) =>
      prev.map((p) =>
        p.id === selectedPost.id
          ? {
              ...p,
              title: editForm.title || p.title,
              slug: makeSlug(editForm.title || p.title),
              excerpt: editForm.excerpt || p.excerpt,
              content: editForm.content || p.content,
              category: editForm.category || p.category,
              tags: editForm.tags || p.tags,
              status: (editForm.status as PostStatus) || p.status,
              featuredImage: editForm.featuredImage,
              seoTitle: editForm.seoTitle,
              seoDescription: editForm.seoDescription,
              scheduledFor: editForm.scheduledFor,
              updatedAt: new Date().toISOString(),
            }
          : p
      )
    );
    setIsEditOpen(false);
    setSelectedPost(null);
    setEditForm(emptyForm);
    toast({ title: "Post updated", description: "Changes saved" });
  };

  // Delete post
  const handleDelete = (postId: string) => {
    setPosts((prev) => prev.filter((p) => p.id !== postId));
    toast({ title: "Deleted", description: "Post removed permanently" });
  };

  // Upload handlers (create)
  const handleCreateImageFile = (file?: File) => {
    if (!file) return;
    const blobUrl = URL.createObjectURL(file);
    setCreateForm((f) => ({ ...f, featuredImage: blobUrl }));
  };

  const handleCreateImageFromUrl = (url: string) => {
    if (!url) return;
    setCreateForm((f) => ({ ...f, featuredImage: url }));
  };

  // Upload handlers (edit)
  const handleEditImageFile = (file?: File) => {
    if (!file) return;
    const blobUrl = URL.createObjectURL(file);
    setEditForm((f) => ({ ...f, featuredImage: blobUrl }));
  };

  const handleEditImageFromUrl = (url: string) => {
    if (!url) return;
    setEditForm((f) => ({ ...f, featuredImage: url }));
  };

  // Tag helpers
  const addTagToCreate = (tag: string) => {
    if (!tag.trim()) return;
    setCreateForm((f) => ({ ...f, tags: Array.from(new Set([...(f.tags || []), tag.trim()])) }));
  };

  const removeTagFromCreate = (tag: string) => {
    setCreateForm((f) => ({ ...f, tags: (f.tags || []).filter((t) => t !== tag) }));
  };

  const addTagToEdit = (tag: string) => {
    if (!tag.trim()) return;
    setEditForm((f) => ({ ...f, tags: Array.from(new Set([...(f.tags || []), tag.trim()])) }));
  };

  const removeTagFromEdit = (tag: string) => {
    setEditForm((f) => ({ ...f, tags: (f.tags || []).filter((t) => t !== tag) }));
  };

  // When mobile, force cards
  const currentViewMode = isMobile ? "cards" : viewMode;

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-bold text-foreground truncate">Content Management</h1>
          <p className="text-sm sm:text-base text-muted-foreground">Create, edit and manage blog posts</p>
        </div>

        <div className="flex items-center gap-2 w-full sm:w-auto">
          {!isMobile && (
            <div className="flex items-center gap-1 bg-background/50 rounded-lg p-1">
              <Button variant={viewMode === "table" ? "default" : "ghost"} size="sm" onClick={() => setViewMode("table")} className="h-8 px-3">
                <TableIcon className="w-4 h-4" />
              </Button>
              <Button variant={viewMode === "cards" ? "default" : "ghost"} size="sm" onClick={() => setViewMode("cards")} className="h-8 px-3">
                <Grid3X3 className="w-4 h-4" />
              </Button>
            </div>
          )}

          <Dialog open={isCreateOpen} onOpenChange={setIsCreateOpen}>
            <DialogTrigger asChild>
              <Button className="glass-strong flex-1 sm:flex-none">
                <Plus className="w-4 h-4 mr-2" />
                Create Post
              </Button>
            </DialogTrigger>
            <DialogContent className="max-w-[95vw] sm:max-w-3xl glass border-white/20 max-h-[90vh] overflow-y-auto">
              <DialogHeader>
                <DialogTitle>Create New Post</DialogTitle>
              </DialogHeader>

              <div className="space-y-4 py-2">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="text-sm font-medium text-white/90">Title</label>
                    <Input value={createForm.title || ""} onChange={(e) => setCreateForm((f) => ({ ...f, title: e.target.value }))} placeholder="Post title" className="glass border-white/20 h-11 mt-1" />
                  </div>

                  <div>
                    <label className="text-sm font-medium text-white/90">Category</label>
                    <Select value={createForm.category || ""} onValueChange={(value) => setCreateForm((f) => ({ ...f, category: value }))}>
                      <SelectTrigger className="glass border-white/20 h-11 mt-1">
                        <SelectValue placeholder="Select category" />
                      </SelectTrigger>
                      <SelectContent>
                        {defaultCategories.map((c) => (<SelectItem key={c} value={c}>{c}</SelectItem>))}
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <div>
                  <label className="text-sm font-medium text-white/90">Excerpt</label>
                  <Input value={createForm.excerpt || ""} onChange={(e) => setCreateForm((f) => ({ ...f, excerpt: e.target.value }))} placeholder="Short summary" className="glass border-white/20 h-11 mt-1" />
                </div>

                <div>
                  <label className="text-sm font-medium text-white/90">Content</label>
                  <Textarea value={createForm.content || ""} onChange={(e) => setCreateForm((f) => ({ ...f, content: e.target.value }))} placeholder="Markdown supported" className="glass border-white/20 min-h-[180px] mt-1" />
                </div>

                {/* Featured image */}
                <div>
                  <label className="text-sm font-medium text-white/90">Featured image</label>
                  <div className="flex items-start gap-3 mt-2">
                    <div className="w-28 h-20 rounded-lg bg-white/5 flex items-center justify-center overflow-hidden">
                      {createForm.featuredImage ? (
                        // eslint-disable-next-line @next/next/no-img-element
                        <img src={createForm.featuredImage} alt="preview" className="w-full h-full object-cover" />
                      ) : (
                        <div className="text-xs text-muted-foreground text-center px-2">
                          <ImageIcon className="mx-auto w-5 h-5 text-muted-foreground" />
                          <div>No image</div>
                        </div>
                      )}
                    </div>

                    <div className="flex-1">
                      <input type="file" ref={imageInputRef} accept="image/*" className="hidden" onChange={(e) => { const file = e.target.files?.[0]; if (file) handleCreateImageFile(file); }} />
                      <div className="flex gap-2">
                        <Button onClick={() => imageInputRef.current?.click()} variant="outline">Upload</Button>
                        <Button onClick={() => {
                          const url = prompt("Paste an image URL");
                          if (url) handleCreateImageFromUrl(url);
                        }} variant="outline">From URL</Button>
                        <Button onClick={() => setCreateForm((f) => ({ ...f, featuredImage: undefined }))} variant="ghost">Remove</Button>
                      </div>
                      <p className="text-xs text-muted-foreground mt-2">Recommended: 1200×800 px (JPG/PNG). Uploaded images use temporary blob URLs in this demo.</p>
                    </div>
                  </div>
                </div>

                {/* Tags & SEO */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="text-sm font-medium text-white/90">Tags</label>
                    <div className="flex gap-2 items-center mt-2">
                      <Input placeholder="Add tag and press Enter" className="glass border-white/20 h-10" onKeyDown={(e) => {
                        if (e.key === "Enter") {
                          e.preventDefault();
                          const v = (e.currentTarget as HTMLInputElement).value;
                          addTagToCreate(v);
                          (e.currentTarget as HTMLInputElement).value = "";
                        }
                      }} />
                    </div>
                    <div className="flex flex-wrap gap-2 mt-2">
                      {(createForm.tags || []).map((t) => (
                        <Badge key={t} variant="outline" className="flex items-center gap-2">
                          <span className="text-xs">{t}</span>
                          <button onClick={() => removeTagFromCreate(t)} className="text-white/40 hover:text-white ml-1">×</button>
                        </Badge>
                      ))}
                    </div>
                  </div>

                  <div>
                    <label className="text-sm font-medium text-white/90">SEO Title</label>
                    <Input value={createForm.seoTitle || ""} onChange={(e) => setCreateForm((f) => ({ ...f, seoTitle: e.target.value }))} className="glass border-white/20 h-11 mt-1" placeholder="Optional SEO title" />
                    <label className="text-sm font-medium text-white/90 mt-3 block">SEO Description</label>
                    <Textarea value={createForm.seoDescription || ""} onChange={(e) => setCreateForm((f) => ({ ...f, seoDescription: e.target.value }))} className="glass border-white/20 mt-1" placeholder="Optional meta description" />
                  </div>
                </div>

                <div className="flex items-center justify-end gap-2 pt-4">
                  <Button variant="outline" onClick={() => { setIsCreateOpen(false); setCreateForm(emptyForm); }}>Cancel</Button>
                  <Button onClick={handleCreate} className="glass-strong">Create Post</Button>
                </div>
              </div>
            </DialogContent>
          </Dialog>
        </div>
      </div>

      {/* Statistics */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4">
        {[
          { label: "Total Posts", value: posts.length, color: "text-blue-400" },
          { label: "Published", value: posts.filter((p) => p.status === "published").length, color: "text-green-400" },
          { label: "Drafts", value: posts.filter((p) => p.status === "draft").length, color: "text-yellow-400" },
          { label: "Total Views", value: posts.reduce((s, p) => s + (p.views || 0), 0), color: "text-purple-400" },
        ].map((s) => (
          <Card key={s.label} className="glass border-white/20">
            <CardContent className="p-3 sm:p-6">
              <div className="text-xl sm:text-2xl font-bold mb-1">{s.value}</div>
              <div className={`text-xs sm:text-sm ${s.color}`}>{s.label}</div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Filters */}
      <Card className="glass border-white/20">
        <CardHeader className="pb-4">
          <CardTitle>Filters & Search</CardTitle>
          <CardDescription>Quickly find posts by title, tag, status or category</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:gap-4">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
              <Input placeholder="Search posts..." value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} className="pl-10 glass border-white/20 h-11" />
            </div>

            <Select value={statusFilter} onValueChange={setStatusFilter}>
              <SelectTrigger className="glass border-white/20 h-11 w-40">
                <SelectValue placeholder="Status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All</SelectItem>
                <SelectItem value="published">Published</SelectItem>
                <SelectItem value="draft">Draft</SelectItem>
                <SelectItem value="scheduled">Scheduled</SelectItem>
              </SelectContent>
            </Select>

            <Select value={categoryFilter} onValueChange={setCategoryFilter}>
              <SelectTrigger className="glass border-white/20 h-11 w-48">
                <SelectValue placeholder="Category" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All</SelectItem>
                {defaultCategories.map((c) => (<SelectItem key={c} value={c}>{c}</SelectItem>))}
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>

      {/* Posts Display */}
      {currentViewMode === "cards" ? (
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-lg font-semibold">Posts ({filteredPosts.length})</h2>
          </div>
          <div className="grid gap-4">
            {filteredPosts.map((post) => (
              <MobileContentCard
                key={post.id}
                post={post}
                onStatusUpdate={(id, s) => {
                  setPosts((prev) => prev.map((p) => (p.id === id ? { ...p, status: s as PostStatus } : p)));
                  toast({ title: "Status updated" });
                }}
                onEdit={(p) => handleOpenEdit(p)}
                onDelete={(id) => handleDelete(id)}
              />
            ))}
          </div>
        </div>
      ) : (
        <Card className="glass border-white/20">
          <CardHeader>
            <CardTitle>Blog Posts ({filteredPosts.length})</CardTitle>
            <CardDescription>Manage blog posts and articles</CardDescription>
          </CardHeader>

          <CardContent className="p-0">
            <div className="overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow className="hover:bg-transparent border-white/20">
                    <TableHead className="min-w-[300px]">Post</TableHead>
                    <TableHead className="min-w-[120px]">Category</TableHead>
                    <TableHead className="min-w-[140px]">Status</TableHead>
                    <TableHead className="min-w-[90px]">Views</TableHead>
                    <TableHead className="min-w-[120px]">Date</TableHead>
                    <TableHead className="min-w-[130px]">Actions</TableHead>
                  </TableRow>
                </TableHeader>

                <TableBody>
                  {filteredPosts.map((post) => (
                    <TableRow key={post.id} className="border-white/20">
                      <TableCell>
                        <div className="flex items-start gap-3">
                          <div className="w-16 h-12 rounded-md overflow-hidden bg-white/5 flex items-center justify-center">
                            {post.featuredImage ? (
                              // eslint-disable-next-line @next/next/no-img-element
                              <img src={post.featuredImage} alt={post.title} className="w-full h-full object-cover" />
                            ) : (
                              <div className="flex items-center justify-center text-muted-foreground">
                                <FileText className="w-5 h-5" />
                              </div>
                            )}
                          </div>

                          <div className="min-w-0">
                            <p className="font-medium text-foreground line-clamp-1">{post.title}</p>
                            <p className="text-sm text-muted-foreground line-clamp-2 mt-1">{post.excerpt}</p>
                            <div className="flex gap-2 mt-2">
                              {post.tags.slice(0, 3).map((t) => (
                                <Badge key={t} variant="outline" className="text-xs"><Tag className="w-3 h-3 mr-1" />{t}</Badge>
                              ))}
                            </div>
                          </div>
                        </div>
                      </TableCell>

                      <TableCell>
                        <Badge variant="outline" className="text-sm">{post.category}</Badge>
                      </TableCell>

                      <TableCell>
                        <Select value={post.status} onValueChange={(value) => {
                          setPosts((prev) => prev.map((p) => (p.id === post.id ? { ...p, status: value as PostStatus } : p)));
                          toast({ title: "Status updated", description: `${post.title} -> ${value}` });
                        }}>
                          <SelectTrigger className={`w-36 text-xs border-0 ${getStatusColor(post.status)}`}>
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="draft">Draft</SelectItem>
                            <SelectItem value="published">Published</SelectItem>
                            <SelectItem value="scheduled">Scheduled</SelectItem>
                          </SelectContent>
                        </Select>
                      </TableCell>

                      <TableCell>
                        <div className="flex items-center gap-1 text-sm"><Eye className="w-3 h-3" />{post.views || 0}</div>
                      </TableCell>

                      <TableCell>
                        <div className="flex items-center gap-1 text-sm text-muted-foreground">
                          <Calendar className="w-3 h-3" />
                          {post.status === "published" && post.publishedAt ? new Date(post.publishedAt).toLocaleDateString() : new Date(post.updatedAt).toLocaleDateString()}
                        </div>
                      </TableCell>

                      <TableCell>
                        <div className="flex items-center gap-2">
                          <Button variant="ghost" size="sm" onClick={() => handleOpenEdit(post)} className="h-8 px-2">
                            <Edit3 className="w-4 h-4" />
                          </Button>

                          <Button variant="ghost" size="sm" onClick={() => handleDelete(post.id)} className="h-8 px-2 text-destructive hover:text-destructive">
                            <Trash2 className="w-4 h-4" />
                          </Button>
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

      {/* Edit Dialog */}
      <Dialog open={isEditOpen} onOpenChange={setIsEditOpen}>
        <DialogContent className="max-w-[95vw] sm:max-w-3xl glass border-white/20 max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>Edit Post</DialogTitle>
          </DialogHeader>

          {selectedPost && (
            <div className="space-y-4 py-2">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="text-sm font-medium text-white/90">Title</label>
                  <Input value={editForm.title || ""} onChange={(e) => setEditForm((f) => ({ ...f, title: e.target.value }))} className="glass border-white/20 h-11 mt-1" />
                </div>

                <div>
                  <label className="text-sm font-medium text-white/90">Category</label>
                  <Select value={editForm.category || ""} onValueChange={(value) => setEditForm((f) => ({ ...f, category: value }))}>
                    <SelectTrigger className="glass border-white/20 h-11 mt-1">
                      <SelectValue placeholder="Select category" />
                    </SelectTrigger>
                    <SelectContent>
                      {defaultCategories.map((c) => (<SelectItem key={c} value={c}>{c}</SelectItem>))}
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div>
                <label className="text-sm font-medium text-white/90">Excerpt</label>
                <Input value={editForm.excerpt || ""} onChange={(e) => setEditForm((f) => ({ ...f, excerpt: e.target.value }))} className="glass border-white/20 h-11 mt-1" />
              </div>

              <div>
                <label className="text-sm font-medium text-white/90">Content</label>
                <Textarea value={editForm.content || ""} onChange={(e) => setEditForm((f) => ({ ...f, content: e.target.value }))} className="glass border-white/20 min-h-[180px] mt-1" />
              </div>

              {/* Featured image (edit) */}
              <div>
                <label className="text-sm font-medium text-white/90">Featured image</label>
                <div className="flex items-start gap-3 mt-2">
                  <div className="w-28 h-20 rounded-lg bg-white/5 flex items-center justify-center overflow-hidden">
                    {editForm.featuredImage ? (
                      // eslint-disable-next-line @next/next/no-img-element
                      <img src={editForm.featuredImage} alt="preview" className="w-full h-full object-cover" />
                    ) : (
                      <div className="text-xs text-muted-foreground text-center px-2">
                        <ImageIcon className="mx-auto w-5 h-5 text-muted-foreground" />
                        <div>No image</div>
                      </div>
                    )}
                  </div>

                  <div className="flex-1">
                    <input type="file" ref={editImageInputRef} accept="image/*" className="hidden" onChange={(e) => { const file = e.target.files?.[0]; if (file) handleEditImageFile(file); }} />
                    <div className="flex gap-2">
                      <Button onClick={() => editImageInputRef.current?.click()} variant="outline">Upload</Button>
                      <Button onClick={() => {
                        const url = prompt("Paste an image URL");
                        if (url) handleEditImageFromUrl(url);
                      }} variant="outline">From URL</Button>
                      <Button onClick={() => setEditForm((f) => ({ ...f, featuredImage: undefined }))} variant="ghost">Remove</Button>
                    </div>
                    <p className="text-xs text-muted-foreground mt-2">Uploaded images become temporary blob URLs in this demo environment.</p>
                  </div>
                </div>
              </div>

              {/* Tags & SEO (edit) */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="text-sm font-medium text-white/90">Tags</label>
                  <div className="flex gap-2 items-center mt-2">
                    <Input placeholder="Add tag and press Enter" className="glass border-white/20 h-10" onKeyDown={(e) => {
                      if (e.key === "Enter") {
                        e.preventDefault();
                        const v = (e.currentTarget as HTMLInputElement).value;
                        addTagToEdit(v);
                        (e.currentTarget as HTMLInputElement).value = "";
                      }
                    }} />
                  </div>
                  <div className="flex flex-wrap gap-2 mt-2">
                    {(editForm.tags || []).map((t) => (
                      <Badge key={t} variant="outline" className="flex items-center gap-2">
                        <span className="text-xs">{t}</span>
                        <button onClick={() => removeTagFromEdit(t)} className="text-white/40 hover:text-white ml-1">×</button>
                      </Badge>
                    ))}
                  </div>
                </div>

                <div>
                  <label className="text-sm font-medium text-white/90">SEO Title</label>
                  <Input value={editForm.seoTitle || ""} onChange={(e) => setEditForm((f) => ({ ...f, seoTitle: e.target.value }))} className="glass border-white/20 h-11 mt-1" />
                  <label className="text-sm font-medium text-white/90 mt-3 block">SEO Description</label>
                  <Textarea value={editForm.seoDescription || ""} onChange={(e) => setEditForm((f) => ({ ...f, seoDescription: e.target.value }))} className="glass border-white/20 mt-1" />
                </div>
              </div>

              <div className="flex items-center justify-end gap-2 pt-4">
                <Button variant="outline" onClick={() => { setIsEditOpen(false); setSelectedPost(null); setEditForm(emptyForm); }}>Cancel</Button>
                <Button onClick={handleUpdate} className="glass-strong">Save Changes</Button>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default ContentManagement;
