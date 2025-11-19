import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { Badge } from '@/components/ui/badge';
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from '@/components/ui/table';
import { 
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { 
  Settings as SettingsIcon,
  Users,
  Key,
  Bell,
  Globe,
  Database,
  Shield,
  Plus,
  Trash2,
  Edit3,
  Calendar,
  Download,
  Upload,
} from 'lucide-react';
import { toast } from '@/hooks/use-toast';

interface User {
  id: string;
  name: string;
  email: string;
  role: 'admin' | 'editor' | 'viewer';
  status: 'active' | 'inactive';
  lastLogin?: string;
  createdAt: string;
}

interface ActivityLog {
  id: string;
  userId: string;
  userName: string;
  action: string;
  details: string;
  timestamp: string;
  ip: string;
}

const Settings = () => {
  const [activeTab, setActiveTab] = useState<'general' | 'users' | 'security' | 'integrations' | 'backup'>('general');
  const [isUserDialogOpen, setIsUserDialogOpen] = useState(false);

  // Mock data - replace with your API integration
  const mockUsers: User[] = [
    {
      id: '1',
      name: 'John Doe',
      email: 'john@limitless.com',
      role: 'admin',
      status: 'active',
      lastLogin: '2024-01-16T14:30:00Z',
      createdAt: '2023-01-15T10:00:00Z',
    },
    {
      id: '2',
      name: 'Jane Smith',
      email: 'jane@limitless.com',
      role: 'editor',
      status: 'active',
      lastLogin: '2024-01-15T09:15:00Z',
      createdAt: '2023-03-10T12:00:00Z',
    },
    {
      id: '3',
      name: 'Mike Wilson',
      email: 'mike@limitless.com',
      role: 'viewer',
      status: 'inactive',
      createdAt: '2023-06-20T16:30:00Z',
    },
  ];

  const mockActivityLogs: ActivityLog[] = [
    {
      id: '1',
      userId: '1',
      userName: 'John Doe',
      action: 'User Created',
      details: 'Created new user account for jane@example.com',
      timestamp: '2024-01-16T14:30:00Z',
      ip: '192.168.1.100',
    },
    {
      id: '2',
      userId: '2',
      userName: 'Jane Smith',
      action: 'Blog Post Published',
      details: 'Published "AI Trends 2024" blog post',
      timestamp: '2024-01-16T13:45:00Z',
      ip: '192.168.1.101',
    },
    {
      id: '3',
      userId: '1',
      userName: 'John Doe',
      action: 'Settings Updated',
      details: 'Updated site configuration settings',
      timestamp: '2024-01-16T12:20:00Z',
      ip: '192.168.1.100',
    },
  ];

  const [users] = useState<User[]>(mockUsers);
  const [activityLogs] = useState<ActivityLog[]>(mockActivityLogs);
  const [newUser, setNewUser] = useState({
    name: '',
    email: '',
    role: 'viewer',
  });

  // Settings state
  const [settings, setSettings] = useState({
    siteName: 'Limitless AI',
    siteDescription: 'Premium AI Development & Consultation Services',
    adminEmail: 'admin@limitless.com',
    timezone: 'UTC',
    language: 'en',
    enableNotifications: true,
    enableAnalytics: true,
    enableNewsletter: true,
    maintenanceMode: false,
  });

  const getRoleColor = (role: string) => {
    switch (role) {
      case 'admin': return 'bg-red-500/10 text-red-500';
      case 'editor': return 'bg-blue-500/10 text-blue-500';
      case 'viewer': return 'bg-green-500/10 text-green-500';
      default: return 'bg-gray-500/10 text-gray-500';
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active': return 'bg-green-500/10 text-green-500';
      case 'inactive': return 'bg-gray-500/10 text-gray-500';
      default: return 'bg-gray-500/10 text-gray-500';
    }
  };

  const handleCreateUser = () => {
    // Mock create user functionality
    toast({
      title: "User Created",
      description: `New user ${newUser.name} has been created successfully.`,
    });
    setIsUserDialogOpen(false);
    setNewUser({ name: '', email: '', role: 'viewer' });
  };

  const handleDeleteUser = (userId: string) => {
    // Mock delete user functionality
    toast({
      title: "User Deleted",
      description: "User account has been permanently deleted.",
    });
  };

  const handleSaveSettings = () => {
    // Mock save settings functionality
    toast({
      title: "Settings Saved",
      description: "Your configuration has been updated successfully.",
    });
  };

  const handleBackup = () => {
    // Mock backup functionality
    toast({
      title: "Backup Started",
      description: "Database backup is being created...",
    });
  };

  const tabs = [
    { id: 'general', label: 'General', icon: SettingsIcon },
    { id: 'users', label: 'Users', icon: Users },
    { id: 'security', label: 'Security', icon: Shield },
    { id: 'integrations', label: 'Integrations', icon: Globe },
    { id: 'backup', label: 'Backup', icon: Database },
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-foreground">Settings & Configuration</h1>
        <p className="text-muted-foreground">
          Manage your system settings and user access
        </p>
      </div>

      {/* Tabs */}
      <div className="flex gap-2 overflow-x-auto">
        {tabs.map((tab) => {
          const Icon = tab.icon;
          return (
            <Button
              key={tab.id}
              variant={activeTab === tab.id ? 'default' : 'outline'}
              onClick={() => setActiveTab(tab.id as any)}
              className={activeTab === tab.id ? 'glass-strong' : 'glass border-white/20'}
            >
              <Icon className="w-4 h-4 mr-2" />
              {tab.label}
            </Button>
          );
        })}
      </div>

      {/* General Settings */}
      {activeTab === 'general' && (
        <div className="grid gap-6 lg:grid-cols-2">
          <Card className="glass border-white/20">
            <CardHeader>
              <CardTitle>Site Configuration</CardTitle>
              <CardDescription>
                Basic site information and settings
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <Label htmlFor="siteName">Site Name</Label>
                <Input
                  id="siteName"
                  value={settings.siteName}
                  onChange={(e) => setSettings({...settings, siteName: e.target.value})}
                  className="glass border-white/20"
                />
              </div>
              
              <div>
                <Label htmlFor="siteDescription">Site Description</Label>
                <Textarea
                  id="siteDescription"
                  value={settings.siteDescription}
                  onChange={(e) => setSettings({...settings, siteDescription: e.target.value})}
                  className="glass border-white/20"
                />
              </div>
              
              <div>
                <Label htmlFor="adminEmail">Admin Email</Label>
                <Input
                  id="adminEmail"
                  type="email"
                  value={settings.adminEmail}
                  onChange={(e) => setSettings({...settings, adminEmail: e.target.value})}
                  className="glass border-white/20"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="timezone">Timezone</Label>
                  <Select value={settings.timezone} onValueChange={(value) => setSettings({...settings, timezone: value})}>
                    <SelectTrigger className="glass border-white/20">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="UTC">UTC</SelectItem>
                      <SelectItem value="EST">Eastern Time</SelectItem>
                      <SelectItem value="PST">Pacific Time</SelectItem>
                      <SelectItem value="CET">Central European Time</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                
                <div>
                  <Label htmlFor="language">Language</Label>
                  <Select value={settings.language} onValueChange={(value) => setSettings({...settings, language: value})}>
                    <SelectTrigger className="glass border-white/20">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="en">English</SelectItem>
                      <SelectItem value="es">Spanish</SelectItem>
                      <SelectItem value="fr">French</SelectItem>
                      <SelectItem value="de">German</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="glass border-white/20">
            <CardHeader>
              <CardTitle>Feature Settings</CardTitle>
              <CardDescription>
                Enable or disable site features
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="flex items-center justify-between">
                <div>
                  <Label htmlFor="notifications">Email Notifications</Label>
                  <p className="text-sm text-muted-foreground">Send email alerts for important events</p>
                </div>
                <Switch
                  id="notifications"
                  checked={settings.enableNotifications}
                  onCheckedChange={(checked) => setSettings({...settings, enableNotifications: checked})}
                />
              </div>

              <div className="flex items-center justify-between">
                <div>
                  <Label htmlFor="analytics">Analytics Tracking</Label>
                  <p className="text-sm text-muted-foreground">Collect anonymous usage data</p>
                </div>
                <Switch
                  id="analytics"
                  checked={settings.enableAnalytics}
                  onCheckedChange={(checked) => setSettings({...settings, enableAnalytics: checked})}
                />
              </div>

              <div className="flex items-center justify-between">
                <div>
                  <Label htmlFor="newsletter">Newsletter Signup</Label>
                  <p className="text-sm text-muted-foreground">Show newsletter subscription forms</p>
                </div>
                <Switch
                  id="newsletter"
                  checked={settings.enableNewsletter}
                  onCheckedChange={(checked) => setSettings({...settings, enableNewsletter: checked})}
                />
              </div>

              <div className="flex items-center justify-between">
                <div>
                  <Label htmlFor="maintenance">Maintenance Mode</Label>
                  <p className="text-sm text-muted-foreground">Put site in maintenance mode</p>
                </div>
                <Switch
                  id="maintenance"
                  checked={settings.maintenanceMode}
                  onCheckedChange={(checked) => setSettings({...settings, maintenanceMode: checked})}
                />
              </div>

              <Button onClick={handleSaveSettings} className="w-full glass-strong">
                Save Settings
              </Button>
            </CardContent>
          </Card>
        </div>
      )}

      {/* User Management */}
      {activeTab === 'users' && (
        <>
          <div className="flex justify-between items-center">
            <h2 className="text-xl font-semibold">User Management</h2>
            <Dialog open={isUserDialogOpen} onOpenChange={setIsUserDialogOpen}>
              <DialogTrigger asChild>
                <Button className="glass-strong">
                  <Plus className="w-4 h-4 mr-2" />
                  Add User
                </Button>
              </DialogTrigger>
              <DialogContent className="glass border-white/20">
                <DialogHeader>
                  <DialogTitle>Create New User</DialogTitle>
                  <DialogDescription>
                    Add a new user to your admin panel
                  </DialogDescription>
                </DialogHeader>
                <div className="space-y-4">
                  <div>
                    <Label htmlFor="userName">Full Name</Label>
                    <Input
                      id="userName"
                      value={newUser.name}
                      onChange={(e) => setNewUser({...newUser, name: e.target.value})}
                      className="glass border-white/20"
                    />
                  </div>
                  
                  <div>
                    <Label htmlFor="userEmail">Email</Label>
                    <Input
                      id="userEmail"
                      type="email"
                      value={newUser.email}
                      onChange={(e) => setNewUser({...newUser, email: e.target.value})}
                      className="glass border-white/20"
                    />
                  </div>
                  
                  <div>
                    <Label htmlFor="userRole">Role</Label>
                    <Select value={newUser.role} onValueChange={(value) => setNewUser({...newUser, role: value})}>
                      <SelectTrigger className="glass border-white/20">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="admin">Admin</SelectItem>
                        <SelectItem value="editor">Editor</SelectItem>
                        <SelectItem value="viewer">Viewer</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="flex gap-2 pt-4">
                    <Button onClick={handleCreateUser} className="flex-1 glass-strong">
                      Create User
                    </Button>
                    <Button variant="outline" onClick={() => setIsUserDialogOpen(false)} className="glass border-white/20">
                      Cancel
                    </Button>
                  </div>
                </div>
              </DialogContent>
            </Dialog>
          </div>

          <Card className="glass border-white/20">
            <CardHeader>
              <CardTitle>System Users</CardTitle>
              <CardDescription>
                Manage user accounts and permissions
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="rounded-md border border-white/20 overflow-hidden">
                <Table>
                  <TableHeader>
                    <TableRow className="hover:bg-transparent border-white/20">
                      <TableHead>User</TableHead>
                      <TableHead>Role</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead>Last Login</TableHead>
                      <TableHead>Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {users.map((user) => (
                      <TableRow key={user.id} className="border-white/20">
                        <TableCell>
                          <div>
                            <p className="font-medium">{user.name}</p>
                            <p className="text-sm text-muted-foreground">{user.email}</p>
                          </div>
                        </TableCell>
                        <TableCell>
                          <Badge className={getRoleColor(user.role)}>
                            {user.role.charAt(0).toUpperCase() + user.role.slice(1)}
                          </Badge>
                        </TableCell>
                        <TableCell>
                          <Badge className={getStatusColor(user.status)}>
                            {user.status.charAt(0).toUpperCase() + user.status.slice(1)}
                          </Badge>
                        </TableCell>
                        <TableCell>
                          {user.lastLogin ? (
                            <div className="flex items-center gap-1 text-sm">
                              <Calendar className="w-3 h-3" />
                              {new Date(user.lastLogin).toLocaleDateString()}
                            </div>
                          ) : (
                            <span className="text-muted-foreground">Never</span>
                          )}
                        </TableCell>
                        <TableCell>
                          <div className="flex items-center gap-2">
                            <Button variant="ghost" size="sm">
                              <Edit3 className="w-4 h-4" />
                            </Button>
                            <Button
                              variant="ghost"
                              size="sm"
                              className="text-destructive hover:text-destructive"
                              onClick={() => handleDeleteUser(user.id)}
                            >
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

          {/* Activity Logs */}
          <Card className="glass border-white/20">
            <CardHeader>
              <CardTitle>Activity Logs</CardTitle>
              <CardDescription>
                Recent user activities and system events
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {activityLogs.map((log) => (
                  <div key={log.id} className="flex items-center justify-between p-3 rounded-lg glass-strong">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-full glass flex items-center justify-center">
                        <Users className="w-5 h-5 text-primary" />
                      </div>
                      <div>
                        <p className="font-medium">{log.action}</p>
                        <p className="text-sm text-muted-foreground">{log.details}</p>
                        <p className="text-xs text-muted-foreground">by {log.userName} from {log.ip}</p>
                      </div>
                    </div>
                    <div className="text-sm text-muted-foreground">
                      {new Date(log.timestamp).toLocaleString()}
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </>
      )}

      {/* Security Settings */}
      {activeTab === 'security' && (
        <div className="grid gap-6">
          <Card className="glass border-white/20">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Shield className="w-5 h-5" />
                Security Settings
              </CardTitle>
              <CardDescription>
                Configure security and authentication settings
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid gap-4">
                <div>
                  <Label>Two-Factor Authentication</Label>
                  <p className="text-sm text-muted-foreground mb-2">
                    Add an extra layer of security to your account
                  </p>
                  <Button variant="outline" className="glass border-white/20">
                    <Key className="w-4 h-4 mr-2" />
                    Enable 2FA
                  </Button>
                </div>

                <div>
                  <Label>Session Management</Label>
                  <p className="text-sm text-muted-foreground mb-2">
                    Manage active login sessions
                  </p>
                  <Button variant="outline" className="glass border-white/20">
                    View Active Sessions
                  </Button>
                </div>

                <div>
                  <Label>API Keys</Label>
                  <p className="text-sm text-muted-foreground mb-2">
                    Manage API access keys for integrations
                  </p>
                  <Button variant="outline" className="glass border-white/20">
                    <Key className="w-4 h-4 mr-2" />
                    Manage API Keys
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      )}

      {/* Integrations */}
      {activeTab === 'integrations' && (
        <div className="grid gap-6">
          <Card className="glass border-white/20">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Globe className="w-5 h-5" />
                Third-party Integrations
              </CardTitle>
              <CardDescription>
                Connect external services and APIs
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid gap-4 md:grid-cols-2">
                {[
                  { name: 'Google Analytics', status: 'connected', description: 'Website analytics and tracking' },
                  { name: 'Email Service', status: 'disconnected', description: 'Email notifications and newsletters' },
                  { name: 'Payment Gateway', status: 'connected', description: 'Process payments and subscriptions' },
                  { name: 'Social Media', status: 'disconnected', description: 'Automatic social media posting' },
                ].map((integration) => (
                  <div key={integration.name} className="p-4 rounded-lg glass-strong">
                    <div className="flex items-center justify-between mb-2">
                      <h3 className="font-medium">{integration.name}</h3>
                      <Badge className={integration.status === 'connected' ? 'bg-green-500/10 text-green-500' : 'bg-gray-500/10 text-gray-500'}>
                        {integration.status}
                      </Badge>
                    </div>
                    <p className="text-sm text-muted-foreground mb-3">{integration.description}</p>
                    <Button
                      variant="outline"
                      size="sm"
                      className="glass border-white/20"
                    >
                      {integration.status === 'connected' ? 'Configure' : 'Connect'}
                    </Button>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      )}

      {/* Backup & Restore */}
      {activeTab === 'backup' && (
        <div className="grid gap-6">
          <Card className="glass border-white/20">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Database className="w-5 h-5" />
                Backup & Restore
              </CardTitle>
              <CardDescription>
                Manage your data backups and restoration
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid gap-4 md:grid-cols-2">
                <div className="p-4 rounded-lg glass-strong">
                  <h3 className="font-medium mb-2">Create Backup</h3>
                  <p className="text-sm text-muted-foreground mb-3">
                    Generate a complete backup of your data
                  </p>
                  <Button onClick={handleBackup} className="w-full glass-strong">
                    <Download className="w-4 h-4 mr-2" />
                    Create Backup
                  </Button>
                </div>

                <div className="p-4 rounded-lg glass-strong">
                  <h3 className="font-medium mb-2">Restore Data</h3>
                  <p className="text-sm text-muted-foreground mb-3">
                    Restore from a previous backup file
                  </p>
                  <Button variant="outline" className="w-full glass border-white/20">
                    <Upload className="w-4 h-4 mr-2" />
                    Upload Backup
                  </Button>
                </div>
              </div>

              <Card className="glass-strong">
                <CardHeader>
                  <CardTitle className="text-lg">Recent Backups</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    {[
                      { date: '2024-01-16', size: '15.2 MB', type: 'Automatic' },
                      { date: '2024-01-15', size: '14.8 MB', type: 'Manual' },
                      { date: '2024-01-14', size: '14.5 MB', type: 'Automatic' },
                    ].map((backup, index) => (
                      <div key={index} className="flex items-center justify-between p-3 rounded-lg glass">
                        <div>
                          <p className="font-medium">Backup - {backup.date}</p>
                          <p className="text-sm text-muted-foreground">
                            {backup.size} • {backup.type}
                          </p>
                        </div>
                        <div className="flex gap-2">
                          <Button variant="outline" size="sm" className="glass border-white/20">
                            <Download className="w-4 h-4" />
                          </Button>
                          <Button variant="outline" size="sm" className="glass border-white/20">
                            Restore
                          </Button>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </CardContent>
          </Card>
        </div>
      )}
    </div>
  );
};

export default Settings;