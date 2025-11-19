import { useEffect, useMemo, useState } from "react";
import { motion } from "framer-motion";
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
import { Switch } from "@/components/ui/switch";
import {
  Search,
  Plus,
  Edit3,
  Trash2,
  Eye,
  ExternalLink,
  Calendar,
  Image as ImageIcon,
  Globe,
  Code,
} from "lucide-react";
import { toast } from "@/hooks/use-toast";
import { useIsMobile } from "@/hooks/use-mobile";

type PortfolioProject = {
  id: string;
  title: string;
  slug: string;
  description: string;
  category: string;
  tags: string[];
  client?: string;
  status: "published" | "draft" | "archived";
  isPublished: boolean;
  liveUrl?: string;
  githubUrl?: string;
  thumbnailUrl?: string;
  images: string[];
  completedAt?: string;
  createdAt: string;
  updatedAt: string;
  technologies: string[];
  testimonial?: {
    content: string;
    author: string;
    position?: string;
  } | null;
};

const LOCAL_STORAGE_KEY = "limitless_portfolio_projects_v1";

const DEFAULT_PROJECTS: PortfolioProject[] = [
  {
    id: "1",
    title: "E-commerce AI Platform",
    slug: "ecommerce-ai-platform",
    description:
      "Advanced AI-powered e-commerce platform with personalized recommendations and automated support.",
    category: "Web Application",
    tags: ["AI", "E-commerce", "React", "Node.js"],
    client: "Tech Innovations Inc.",
    status: "published",
    isPublished: true,
    liveUrl: "https://demo-ecommerce.com",
    githubUrl: "https://github.com/limitless/ecommerce-ai",
    thumbnailUrl: "/portfolio/ecommerce-thumb.jpg",
    images: ["/portfolio/ecommerce-1.jpg", "/portfolio/ecommerce-2.jpg"],
    completedAt: "2024-01-10T00:00:00Z",
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
    technologies: ["React", "Node.js", "MongoDB", "OpenAI API", "Stripe"],
    testimonial: {
      content: "Outstanding work! The AI features increased our conversion rate by 40%.",
      author: "Sarah Johnson",
      position: "CEO",
    },
  },
  {
    id: "2",
    title: "Mobile Fitness App",
    slug: "mobile-fitness-app",
    description: "Cross-platform fitness app with personalized workout AI.",
    category: "Mobile App",
    tags: ["React Native", "AI", "Fitness"],
    client: "FitTech Startup",
    status: "draft",
    isPublished: false,
    images: [],
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
    technologies: ["React Native", "Firebase", "TensorFlow"],
  },
];

const categories = [
  "Web Application",
  "Mobile App",
  "Desktop Application",
  "API/Backend",
  "UI/UX Design",
];

const PortfolioManagement = () => {
  const isMobile = useIsMobile();

  // load from localStorage or fallback
  const [projects, setProjects] = useState<PortfolioProject[]>(() => {
    try {
      const raw = localStorage.getItem(LOCAL_STORAGE_KEY);
      if (raw) return JSON.parse(raw) as PortfolioProject[];
    } catch (e) {
      console.warn("Failed to parse saved projects", e);
    }
    return DEFAULT_PROJECTS;
  });

  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState<string>("all");
  const [categoryFilter, setCategoryFilter] = useState<string>("all");
  const [isCreateOpen, setIsCreateOpen] = useState(false);
  const [selectedProject, setSelectedProject] = useState<PortfolioProject | null>(null);
  const [isDetailOpen, setIsDetailOpen] = useState(false);
  const [newProject, setNewProject] = useState<Partial<PortfolioProject>>({
    title: "",
    description: "",
    category: "",
    tags: [],
    client: "",
    status: "draft",
    isPublished: false,
    technologies: [],
    images: [],
  });

  // persist projects to localStorage
  useEffect(() => {
    try {
      localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(projects));
    } catch (e) {
      console.warn("Failed to persist projects", e);
    }
  }, [projects]);

  const stats = useMemo(() => {
    return {
      total: projects.length,
      published: projects.filter((p) => p.isPublished).length,
      drafts: projects.filter((p) => p.status === "draft").length,
      categories: new Set(projects.map((p) => p.category)).size,
    };
  }, [projects]);

  const filteredProjects = projects.filter((project) => {
    const q = searchQuery.trim().toLowerCase();
    const matchesSearch =
      !q ||
      project.title.toLowerCase().includes(q) ||
      project.description.toLowerCase().includes(q) ||
      project.client?.toLowerCase().includes(q);
    const matchesStatus = statusFilter === "all" || project.status === statusFilter;
    const matchesCategory = categoryFilter === "all" || project.category === categoryFilter;
    return matchesSearch && matchesStatus && matchesCategory;
  });

  // helpers
  const formatDate = (iso?: string) =>
    iso ? new Date(iso).toLocaleDateString() : "—";

  const genId = () => Date.now().toString(36) + Math.random().toString(36).slice(2, 7);

  const slugify = (text = "") =>
    text
      .toLowerCase()
      .trim()
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/^-+|-+$/g, "");

  // create
  const handleCreateProject = () => {
    if (!newProject.title || !newProject.description) {
      toast({ title: "Missing fields", description: "Please provide at least title and description." });
      return;
    }

    const data: PortfolioProject = {
      id: genId(),
      title: newProject.title!.trim(),
      slug: slugify(newProject.title),
      description: newProject.description || "",
      category: newProject.category || "Uncategorized",
      tags: (newProject.tags as string[]) || [],
      client: newProject.client || "",
      status: (newProject.status as PortfolioProject["status"]) || "draft",
      isPublished: !!newProject.isPublished,
      liveUrl: newProject.liveUrl,
      githubUrl: newProject.githubUrl,
      thumbnailUrl: newProject.thumbnailUrl,
      images: newProject.images || [],
      completedAt: newProject.completedAt || new Date().toISOString(),
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      technologies: newProject.technologies || [],
      testimonial: newProject.testimonial || null,
    };

    setProjects((p) => [data, ...p]);
    toast({ title: "Project created", description: "Saved as draft — you can publish it anytime." });
    setIsCreateOpen(false);
    setNewProject({
      title: "",
      description: "",
      category: "",
      tags: [],
      client: "",
      status: "draft",
      isPublished: false,
      technologies: [],
      images: [],
    });
  };

  // edit open
  const openEdit = (project: PortfolioProject) => {
    setSelectedProject(project);
    setNewProject({ ...project });
    setIsCreateOpen(true);
  };

  // update
  const handleUpdateProject = () => {
    if (!selectedProject) return;
    setProjects((prev) =>
      prev.map((p) =>
        p.id === selectedProject.id
          ? {
              ...p,
              ...newProject,
              title: newProject.title || p.title,
              slug: slugify(newProject.title || p.title),
              updatedAt: new Date().toISOString(),
            }
          : p
      )
    );
    toast({ title: "Project updated", description: "Changes saved." });
    setIsCreateOpen(false);
    setSelectedProject(null);
  };

  // delete
  const handleDeleteProject = (projectId: string) => {
    if (!confirm("Delete this project permanently?")) return;
    setProjects((prev) => prev.filter((p) => p.id !== projectId));
    toast({ title: "Project deleted", description: "Removed from portfolio." });
  };

  // toggle published
  const togglePublished = (projectId: string, publish: boolean) => {
    setProjects((prev) =>
      prev.map((p) => (p.id === projectId ? { ...p, isPublished: publish, updatedAt: new Date().toISOString() } : p))
    );
    toast({ title: publish ? "Published" : "Unpublished", description: publish ? "Project is live." : "Project hidden." });
  };

  // quick fill example (AI/Autofill faux)
  const autofillExample = () => {
    setNewProject((s) => ({
      ...s,
      title: "New AI-Powered Dashboard",
      description: "Analytics dashboard that surfaces business insights using ML.",
      category: "Web Application",
      tags: ["AI", "Dashboard"],
      technologies: ["React", "D3", "Python"],
      isPublished: false,
    }));
    toast({ title: "Autofill applied", description: "Example content added to form." });
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Portfolio Management</h1>
          <p className="text-muted-foreground">
            Manage your projects, publish updates, and showcase your best work.
          </p>
        </div>

        <div className="flex gap-2 items-center w-full sm:w-auto">
          <div className="hidden sm:flex gap-3">
            <Card className="glass border-white/10">
              <CardContent className="px-4 py-2">
                <div className="flex items-center gap-4">
                  <div>
                    <div className="text-xl font-bold">{stats.total}</div>
                    <div className="text-xs text-muted-foreground">Projects</div>
                  </div>
                  <div>
                    <div className="text-xl font-bold">{stats.published}</div>
                    <div className="text-xs text-muted-foreground">Published</div>
                  </div>
                  <div>
                    <div className="text-xl font-bold">{stats.drafts}</div>
                    <div className="text-xs text-muted-foreground">Drafts</div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          <div className="flex items-center gap-2">
            <Dialog open={isCreateOpen} onOpenChange={(v) => { setIsCreateOpen(v); if (!v) { setSelectedProject(null); setNewProject({ title: "", description: "", category: "", tags: [], client: "", status: "draft", isPublished: false, technologies: [], images: [] }); } }}>
              <DialogTrigger asChild>
                <Button className="glass-strong flex items-center">
                  <Plus className="w-4 h-4 mr-2" />
                  Add Project
                </Button>
              </DialogTrigger>

              <DialogContent className="max-w-3xl glass border-white/10">
                <DialogHeader>
                  <DialogTitle>{selectedProject ? "Edit Project" : "Create New Project"}</DialogTitle>
                </DialogHeader>

                <div className="space-y-4 py-2">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div>
                      <label className="text-sm font-medium">Title</label>
                      <Input
                        value={newProject.title || ""}
                        onChange={(e) => setNewProject({ ...newProject, title: e.target.value })}
                        placeholder="Project title"
                        className="glass border-white/10"
                      />
                    </div>
                    <div>
                      <label className="text-sm font-medium">Category</label>
                      <Select value={newProject.category || ""} onValueChange={(v) => setNewProject({ ...newProject, category: v })}>
                        <SelectTrigger className="glass border-white/10">
                          <SelectValue placeholder="Select category" />
                        </SelectTrigger>
                        <SelectContent>
                          {categories.map((c) => (
                            <SelectItem value={c} key={c}>
                              {c}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                  </div>

                  <div>
                    <label className="text-sm font-medium">Short description</label>
                    <Textarea
                      value={newProject.description || ""}
                      onChange={(e) => setNewProject({ ...newProject, description: e.target.value })}
                      placeholder="Short project summary..."
                      className="glass border-white/10"
                    />
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div>
                      <label className="text-sm font-medium">Client</label>
                      <Input value={newProject.client || ""} onChange={(e) => setNewProject({ ...newProject, client: e.target.value })} className="glass border-white/10" />
                    </div>
                    <div>
                      <label className="text-sm font-medium">Technologies (comma separated)</label>
                      <Input
                        value={(newProject.technologies || []).join(", ")}
                        onChange={(e) => setNewProject({ ...newProject, technologies: e.target.value.split(",").map((s) => s.trim()).filter(Boolean) })}
                        placeholder="React, Node.js, AWS"
                        className="glass border-white/10"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div>
                      <label className="text-sm font-medium">Live URL</label>
                      <Input
                        value={newProject.liveUrl || ""}
                        onChange={(e) => setNewProject({ ...newProject, liveUrl: e.target.value })}
                        className="glass border-white/10"
                      />
                    </div>
                    <div>
                      <label className="text-sm font-medium">GitHub URL</label>
                      <Input
                        value={newProject.githubUrl || ""}
                        onChange={(e) => setNewProject({ ...newProject, githubUrl: e.target.value })}
                        className="glass border-white/10"
                      />
                    </div>
                  </div>

                  <div className="flex items-center justify-between gap-3">
                    <div className="flex items-center gap-3">
                      <Switch
                        id="publish"
                        checked={!!newProject.isPublished}
                        onCheckedChange={(checked) => setNewProject({ ...newProject, isPublished: checked })}
                      />
                      <label htmlFor="publish" className="text-sm font-medium">Publish (make live)</label>
                    </div>

                    <div className="flex gap-2">
                      <Button onClick={autofillExample} variant="outline" className="glass border-white/10">Autofill Example</Button>
                      {selectedProject ? (
                        <Button onClick={handleUpdateProject} className="glass-strong">Save Changes</Button>
                      ) : (
                        <Button onClick={handleCreateProject} className="glass-strong">Create Project</Button>
                      )}
                    </div>
                  </div>
                </div>
              </DialogContent>
            </Dialog>

            <Button variant="ghost" className="glass border-white/10" onClick={() => { navigator.clipboard?.writeText(JSON.stringify(projects.slice(0, 20))); toast({ title: "Copied", description: "First 20 projects exported to clipboard (demo)." }); }}>
              Export (demo)
            </Button>
          </div>
        </div>
      </div>

      {/* Filters */}
      <Card className="glass border-white/10">
        <CardContent>
          <div className="flex flex-col md:flex-row gap-3 items-center">
            <div className="flex-1">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground w-4 h-4" />
                <Input value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} placeholder="Search projects..." className="pl-10 glass border-white/10" />
              </div>
            </div>

            <div className="flex gap-2 w-full md:w-auto">
              <Select value={statusFilter} onValueChange={setStatusFilter}>
                <SelectTrigger className="glass border-white/10">
                  <SelectValue placeholder="Status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All</SelectItem>
                  <SelectItem value="published">Published</SelectItem>
                  <SelectItem value="draft">Draft</SelectItem>
                  <SelectItem value="archived">Archived</SelectItem>
                </SelectContent>
              </Select>

              <Select value={categoryFilter} onValueChange={setCategoryFilter}>
                <SelectTrigger className="glass border-white/10">
                  <SelectValue placeholder="Category" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Categories</SelectItem>
                  {categories.map((c) => (
                    <SelectItem key={c} value={c}>
                      {c}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Projects Grid */}
      <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
        {filteredProjects.map((project) => (
          <motion.div
            key={project.id}
            whileHover={{ scale: 1.02 }}
            className="relative"
          >
            <Card className="glass border-white/10 overflow-hidden hover:shadow-xl transition-shadow">
              <div className="aspect-video bg-gradient-to-br from-primary/6 to-accent/6 flex items-center justify-center overflow-hidden">
                {project.thumbnailUrl ? (
                  <img
                    src={project.thumbnailUrl}
                    alt={project.title}
                    className="object-cover w-full h-full"
                    onError={(e) => {
                      // hide broken thumbnail
                      (e.target as HTMLImageElement).style.display = "none";
                    }}
                  />
                ) : (
                  <div className="flex flex-col items-center justify-center text-center p-6">
                    <ImageIcon className="w-16 h-16 text-primary" />
                    <div className="text-sm text-muted-foreground mt-2">No thumbnail</div>
                  </div>
                )}
              </div>

              <CardHeader>
                <div className="flex items-start justify-between gap-3 w-full">
                  <div className="flex-1 min-w-0">
                    <CardTitle className="text-lg line-clamp-1">{project.title}</CardTitle>
                    <CardDescription className="text-sm text-muted-foreground line-clamp-2">
                      {project.client || project.category}
                    </CardDescription>
                    <div className="flex gap-2 mt-2 flex-wrap">
                      {project.tags.slice(0, 4).map((t) => (
                        <Badge key={t} variant="secondary" className="text-xs">
                          {t}
                        </Badge>
                      ))}
                      {project.tags.length > 4 && <Badge variant="outline" className="text-xs">+{project.tags.length - 4}</Badge>}
                    </div>
                  </div>

                  <div className="flex flex-col items-end gap-2">
                    <Badge className={project.status === "published" ? "bg-green-600/10 text-green-400" : project.status === "draft" ? "bg-yellow-500/10 text-yellow-400" : "bg-zinc-500/10 text-zinc-400"}>
                      {project.status}
                    </Badge>

                    <div className="flex gap-1">
                      <Button variant="ghost" size="sm" onClick={() => { setSelectedProject(project); setIsDetailOpen(true); }}>
                        <Eye className="w-4 h-4" />
                      </Button>

                      <Button variant="ghost" size="sm" onClick={() => openEdit(project)}>
                        <Edit3 className="w-4 h-4" />
                      </Button>

                      <Button variant="ghost" size="sm" onClick={() => handleDeleteProject(project.id)}>
                        <Trash2 className="w-4 h-4 text-destructive" />
                      </Button>
                    </div>
                  </div>
                </div>
              </CardHeader>

              <CardContent>
                <p className="text-sm text-muted-foreground line-clamp-3">{project.description}</p>

                <div className="flex items-center justify-between mt-4">
                  <div className="flex items-center gap-2">
                    <Globe className="w-4 h-4 text-muted-foreground" />
                    {project.liveUrl ? (
                      <a href={project.liveUrl} target="_blank" rel="noreferrer" className="text-sm font-medium text-primary hover:underline">
                        Live
                      </a>
                    ) : (
                      <span className="text-sm text-muted-foreground">No live URL</span>
                    )}
                  </div>

                  <div className="flex items-center gap-2">
                    <Button variant="ghost" size="sm" onClick={() => togglePublished(project.id, !project.isPublished)}>
                      {project.isPublished ? "Unpublish" : "Publish"}
                    </Button>
                    <a href={project.githubUrl || "#"} target="_blank" rel="noreferrer">
                      <ExternalLink className="w-4 h-4 text-muted-foreground" />
                    </a>
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </div>

      {/* Detail Drawer / Dialog */}
      <Dialog open={isDetailOpen} onOpenChange={(v) => setIsDetailOpen(v)}>
        <DialogContent className="max-w-3xl glass border-white/10 overflow-y-auto">
          <DialogHeader>
            <DialogTitle>{selectedProject?.title}</DialogTitle>
          </DialogHeader>

          {selectedProject && (
            <div className="space-y-4 py-2">
              {selectedProject.images.length ? (
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                  {selectedProject.images.map((img, idx) => (
                    <div key={idx} className="aspect-video bg-muted rounded overflow-hidden">
                      <img src={img} alt={`${selectedProject.title} ${idx + 1}`} className="w-full h-full object-cover" />
                    </div>
                  ))}
                </div>
              ) : (
                <div className="aspect-video bg-muted rounded flex items-center justify-center">
                  <ImageIcon className="w-16 h-16 text-primary" />
                </div>
              )}

              <div>
                <h4 className="text-sm font-medium text-muted-foreground">Description</h4>
                <p className="mt-2 text-sm text-foreground">{selectedProject.description}</p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <h4 className="text-sm font-medium text-muted-foreground">Technologies</h4>
                  <div className="flex gap-2 flex-wrap mt-2">
                    {selectedProject.technologies.map((t) => (
                      <Badge key={t} variant="secondary" className="text-xs">{t}</Badge>
                    ))}
                  </div>
                </div>

                <div>
                  <h4 className="text-sm font-medium text-muted-foreground">Client & Dates</h4>
                  <div className="mt-2 text-sm text-foreground">
                    <div>{selectedProject.client || "—"}</div>
                    <div className="text-xs text-muted-foreground mt-1">Completed: {formatDate(selectedProject.completedAt)}</div>
                    <div className="text-xs text-muted-foreground">Updated: {formatDate(selectedProject.updatedAt)}</div>
                  </div>
                </div>
              </div>

              {selectedProject.testimonial && (
                <div>
                  <h4 className="text-sm font-medium text-muted-foreground">Testimonial</h4>
                  <blockquote className="mt-2 p-4 bg-white/3 rounded">
                    <p className="text-sm text-foreground">"{selectedProject.testimonial.content}"</p>
                    <div className="text-xs text-muted-foreground mt-2">— {selectedProject.testimonial.author}, {selectedProject.testimonial.position}</div>
                  </blockquote>
                </div>
              )}
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default PortfolioManagement;
