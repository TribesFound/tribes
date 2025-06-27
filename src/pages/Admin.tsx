
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { 
  Crown, 
  Shield, 
  Users, 
  Flag, 
  Ban, 
  UserX, 
  MessageSquare, 
  Settings,
  Search,
  Mail,
  AlertTriangle,
  Eye,
  Trash2
} from 'lucide-react';

interface AdminProps {
  userEmail: string;
  userRole: 'Chief' | 'Customer Support' | 'Developer' | 'Tech Support' | 'Tribes Council';
}

const Admin = ({ userEmail, userRole }: AdminProps) => {
  const [activeTab, setActiveTab] = useState('reports');
  const [searchTerm, setSearchTerm] = useState('');
  const [inviteEmail, setInviteEmail] = useState('');
  const [inviteRole, setInviteRole] = useState('');

  const mockReports = [
    {
      id: 1,
      reportedUser: 'John Doe',
      reportedBy: 'Jane Smith',
      reason: 'Inappropriate content',
      description: 'User posted inappropriate photos',
      status: 'pending',
      date: '2024-01-15',
      severity: 'high'
    },
    {
      id: 2,
      reportedUser: 'Mike Johnson',
      reportedBy: 'Sarah Wilson',
      reason: 'Harassment',
      description: 'Sending unwanted messages repeatedly',
      status: 'pending',
      date: '2024-01-14',
      severity: 'medium'
    }
  ];

  const mockUsers = [
    {
      id: 1,
      name: 'John Doe',
      email: 'john@example.com',
      status: 'active',
      joinDate: '2024-01-01',
      reportCount: 2
    },
    {
      id: 2,
      name: 'Jane Smith',
      email: 'jane@example.com',
      status: 'banned',
      joinDate: '2023-12-15',
      reportCount: 0
    }
  ];

  const handleBanUser = (userId: number) => {
    console.log(`Banning user ${userId}`);
  };

  const handleUnbanUser = (userId: number) => {
    console.log(`Unbanning user ${userId}`);
  };

  const handleResolveReport = (reportId: number, action: 'dismiss' | 'ban' | 'warn') => {
    console.log(`Resolving report ${reportId} with action: ${action}`);
  };

  const handleInviteAdmin = () => {
    if (userRole !== 'Chief') {
      alert('Only Chief can invite new admin members');
      return;
    }
    console.log(`Inviting ${inviteEmail} as ${inviteRole}`);
    setInviteEmail('');
    setInviteRole('');
  };

  const getRolePermissions = (role: string) => {
    switch (role) {
      case 'Chief':
        return ['reports', 'users', 'settings', 'invites', 'analytics'];
      case 'Customer Support':
        return ['reports', 'support'];
      case 'Developer':
        return ['analytics', 'settings'];
      case 'Tech Support':
        return ['analytics', 'users'];
      case 'Tribes Council':
        return ['reports', 'users', 'support'];
      default:
        return [];
    }
  };

  const hasPermission = (permission: string) => {
    return getRolePermissions(userRole).includes(permission);
  };

  return (
    <div className="min-h-screen cave-gradient p-4 pb-20">
      <div className="max-w-4xl mx-auto pt-8">
        <div className="text-center mb-8">
          <div className="flex justify-center items-center space-x-3 mb-4">
            <img 
              src="/lovable-uploads/0628da7e-200a-4f94-a6fb-4c83f2f45f4f.png" 
              alt="Tribes Hand Logo" 
              className="w-12 h-12"
            />
            <Crown className="w-8 h-8 text-yellow-500" />
          </div>
          <h1 className="text-3xl font-bold cave-font text-white mb-2">Tribes Administration</h1>
          <div className="flex items-center justify-center space-x-2">
            <Badge className={`cave-badge ${userRole === 'Chief' ? 'bg-yellow-600' : 'bg-orange-600'}`}>
              {userRole === 'Chief' && <Crown className="w-4 h-4 mr-1" />}
              {userRole}
            </Badge>
            <span className="text-amber-200 text-sm">{userEmail}</span>
          </div>
        </div>

        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid w-full grid-cols-5 cave-card">
            {hasPermission('reports') && (
              <TabsTrigger value="reports" className="cave-tab">
                <Flag className="w-4 h-4 mr-2" />
                Reports
              </TabsTrigger>
            )}
            {hasPermission('users') && (
              <TabsTrigger value="users" className="cave-tab">
                <Users className="w-4 h-4 mr-2" />
                Users
              </TabsTrigger>
            )}
            {hasPermission('support') && (
              <TabsTrigger value="support" className="cave-tab">
                <MessageSquare className="w-4 h-4 mr-2" />
                Support
              </TabsTrigger>
            )}
            {hasPermission('invites') && (
              <TabsTrigger value="invites" className="cave-tab">
                <Mail className="w-4 h-4 mr-2" />
                Invites
              </TabsTrigger>
            )}
            {hasPermission('settings') && (
              <TabsTrigger value="settings" className="cave-tab">
                <Settings className="w-4 h-4 mr-2" />
                Settings
              </TabsTrigger>
            )}
          </TabsList>

          {hasPermission('reports') && (
            <TabsContent value="reports">
              <Card className="cave-card">
                <CardHeader>
                  <CardTitle className="cave-font text-amber-900 flex items-center">
                    <Flag className="w-5 h-5 mr-2" />
                    User Reports
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {mockReports.map((report) => (
                      <Card key={report.id} className="border-2 border-orange-200">
                        <CardContent className="p-4">
                          <div className="flex justify-between items-start mb-3">
                            <div>
                              <h3 className="font-bold cave-font text-amber-900">
                                Report against {report.reportedUser}
                              </h3>
                              <p className="text-sm text-amber-700">
                                Reported by {report.reportedBy} on {report.date}
                              </p>
                            </div>
                            <Badge className={`${
                              report.severity === 'high' ? 'bg-red-100 text-red-800' :
                              report.severity === 'medium' ? 'bg-yellow-100 text-yellow-800' :
                              'bg-green-100 text-green-800'
                            }`}>
                              {report.severity}
                            </Badge>
                          </div>
                          <p className="text-amber-800 mb-3">{report.description}</p>
                          <div className="flex space-x-2">
                            <Button
                              onClick={() => handleResolveReport(report.id, 'dismiss')}
                              variant="outline"
                              size="sm"
                              className="cave-button-outline"
                            >
                              Dismiss
                            </Button>
                            <Button
                              onClick={() => handleResolveReport(report.id, 'warn')}
                              variant="outline"
                              size="sm"
                              className="bg-yellow-100 hover:bg-yellow-200 text-yellow-800"
                            >
                              Warn User
                            </Button>
                            <Button
                              onClick={() => handleResolveReport(report.id, 'ban')}
                              size="sm"
                              className="bg-red-600 hover:bg-red-700 text-white"
                            >
                              <Ban className="w-4 h-4 mr-1" />
                              Ban User
                            </Button>
                          </div>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          )}

          {hasPermission('users') && (
            <TabsContent value="users">
              <Card className="cave-card">
                <CardHeader>
                  <CardTitle className="cave-font text-amber-900 flex items-center">
                    <Users className="w-5 h-5 mr-2" />
                    User Management
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="mb-4">
                    <div className="relative">
                      <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-amber-600 w-4 h-4" />
                      <Input
                        placeholder="Search users..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="cave-input pl-10"
                      />
                    </div>
                  </div>
                  <div className="space-y-3">
                    {mockUsers.map((user) => (
                      <Card key={user.id} className="border-2 border-orange-200">
                        <CardContent className="p-4">
                          <div className="flex justify-between items-center">
                            <div className="flex items-center space-x-3">
                              <Avatar className="w-10 h-10">
                                <AvatarFallback className="bg-orange-200 text-amber-900">
                                  {user.name.split(' ').map(n => n[0]).join('')}
                                </AvatarFallback>
                              </Avatar>
                              <div>
                                <h3 className="font-bold cave-font text-amber-900">{user.name}</h3>
                                <p className="text-sm text-amber-700">{user.email}</p>
                                <div className="flex items-center space-x-2 mt-1">
                                  <Badge className={`${
                                    user.status === 'active' ? 'bg-green-100 text-green-800' :
                                    user.status === 'banned' ? 'bg-red-100 text-red-800' :
                                    'bg-yellow-100 text-yellow-800'
                                  }`}>
                                    {user.status}
                                  </Badge>
                                  {user.reportCount > 0 && (
                                    <Badge className="bg-orange-100 text-orange-800">
                                      {user.reportCount} reports
                                    </Badge>
                                  )}
                                </div>
                              </div>
                            </div>
                            <div className="flex space-x-2">
                              <Button
                                variant="outline"
                                size="sm"
                                className="cave-button-outline"
                              >
                                <Eye className="w-4 h-4 mr-1" />
                                View
                              </Button>
                              {user.status === 'active' ? (
                                <Button
                                  onClick={() => handleBanUser(user.id)}
                                  size="sm"
                                  className="bg-red-600 hover:bg-red-700 text-white"
                                >
                                  <Ban className="w-4 h-4 mr-1" />
                                  Ban
                                </Button>
                              ) : (
                                <Button
                                  onClick={() => handleUnbanUser(user.id)}
                                  size="sm"
                                  className="bg-green-600 hover:bg-green-700 text-white"
                                >
                                  <Shield className="w-4 h-4 mr-1" />
                                  Unban
                                </Button>
                              )}
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          )}

          {hasPermission('support') && (
            <TabsContent value="support">
              <Card className="cave-card">
                <CardHeader>
                  <CardTitle className="cave-font text-amber-900 flex items-center">
                    <MessageSquare className="w-5 h-5 mr-2" />
                    Customer Support
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-center py-12">
                    <MessageSquare className="w-16 h-16 mx-auto text-orange-300 mb-4" />
                    <h3 className="text-xl font-bold cave-font text-amber-900 mb-2">
                      Support Chat System
                    </h3>
                    <p className="text-amber-700">
                      Live chat support interface will be implemented here
                    </p>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          )}

          {hasPermission('invites') && userRole === 'Chief' && (
            <TabsContent value="invites">
              <Card className="cave-card">
                <CardHeader>
                  <CardTitle className="cave-font text-amber-900 flex items-center">
                    <Mail className="w-5 h-5 mr-2" />
                    Invite Team Members
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium cave-text mb-1">
                          Email Address
                        </label>
                        <Input
                          value={inviteEmail}
                          onChange={(e) => setInviteEmail(e.target.value)}
                          placeholder="Enter email address"
                          className="cave-input"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium cave-text mb-1">
                          Role
                        </label>
                        <select
                          value={inviteRole}
                          onChange={(e) => setInviteRole(e.target.value)}
                          className="cave-input w-full"
                        >
                          <option value="">Select role</option>
                          <option value="Customer Support">Customer Support</option>
                          <option value="Developer">Developer</option>
                          <option value="Tech Support">Tech Support</option>
                          <option value="Tribes Council">Tribes Council</option>
                        </select>
                      </div>
                    </div>
                    <Button
                      onClick={handleInviteAdmin}
                      disabled={!inviteEmail || !inviteRole}
                      className="cave-button"
                    >
                      Send Invitation
                    </Button>
                  </div>

                  <div className="mt-8">
                    <h3 className="text-lg font-bold cave-font text-amber-900 mb-4">Role Permissions</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <Card className="border-2 border-orange-200">
                        <CardContent className="p-4">
                          <h4 className="font-bold text-amber-900 mb-2">Customer Support</h4>
                          <ul className="text-sm text-amber-700 space-y-1">
                            <li>• View and manage reports</li>
                            <li>• Ban/unban users</li>
                            <li>• Live chat with users</li>
                            <li>• Help with account issues</li>
                          </ul>
                        </CardContent>
                      </Card>
                      <Card className="border-2 border-orange-200">
                        <CardContent className="p-4">
                          <h4 className="font-bold text-amber-900 mb-2">Developer</h4>
                          <ul className="text-sm text-amber-700 space-y-1">
                            <li>• Access to code and dev tools</li>
                            <li>• Make app upgrades</li>
                            <li>• Fix bugs and issues</li>
                            <li>• Analytics access</li>
                          </ul>
                        </CardContent>
                      </Card>
                      <Card className="border-2 border-orange-200">
                        <CardContent className="p-4">
                          <h4 className="font-bold text-amber-900 mb-2">Tech Support</h4>
                          <ul className="text-sm text-amber-700 space-y-1">
                            <li>• Technical troubleshooting</li>
                            <li>• Bug analysis and fixes</li>
                            <li>• System maintenance</li>
                            <li>• No direct user interaction</li>
                          </ul>
                        </CardContent>
                      </Card>
                      <Card className="border-2 border-orange-200">
                        <CardContent className="p-4">
                          <h4 className="font-bold text-amber-900 mb-2">Tribes Council</h4>
                          <ul className="text-sm text-amber-700 space-y-1">
                            <li>• Manage reports and bans</li>
                            <li>• Access support chats</li>
                            <li>• Community management</li>
                            <li>• User safety oversight</li>
                          </ul>
                        </CardContent>
                      </Card>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          )}

          {hasPermission('settings') && (
            <TabsContent value="settings">
              <Card className="cave-card">
                <CardHeader>
                  <CardTitle className="cave-font text-amber-900 flex items-center">
                    <Settings className="w-5 h-5 mr-2" />
                    System Settings
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-center py-12">
                    <Settings className="w-16 h-16 mx-auto text-orange-300 mb-4" />
                    <h3 className="text-xl font-bold cave-font text-amber-900 mb-2">
                      System Configuration
                    </h3>
                    <p className="text-amber-700">
                      Advanced system settings and configuration options
                    </p>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          )}
        </Tabs>
      </div>
    </div>
  );
};

export default Admin;
