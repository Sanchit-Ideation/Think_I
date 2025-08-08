import { useState } from 'react';
import { 
  User, 
  Bell, 
  Shield, 
  Palette, 
  Database, 
  Mail, 
  Key,
  Save
} from 'lucide-react';

export default function Settings() {
  const [activeTab, setActiveTab] = useState('profile');

  const tabs = [
    { id: 'profile', name: 'Profile', icon: User },
    { id: 'notifications', name: 'Notifications', icon: Bell },
    { id: 'security', name: 'Security', icon: Shield },
    { id: 'appearance', name: 'Appearance', icon: Palette },
    { id: 'integrations', name: 'Integrations', icon: Database },
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-foreground">Settings</h1>
        <p className="text-muted-foreground">Manage your account and application preferences</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
        {/* Sidebar */}
        <div className="lg:col-span-1">
          <nav className="space-y-1">
            {tabs.map((tab) => {
              const IconComponent = tab.icon;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`w-full flex items-center space-x-3 px-3 py-2 text-left rounded-lg transition-colors ${
                    activeTab === tab.id
                      ? 'bg-primary text-primary-foreground'
                      : 'text-muted-foreground hover:text-foreground hover:bg-muted'
                  }`}
                >
                  <IconComponent className="w-4 h-4" />
                  <span>{tab.name}</span>
                </button>
              );
            })}
          </nav>
        </div>

        {/* Content */}
        <div className="lg:col-span-3">
          <div className="bg-card border border-border rounded-xl p-6">
            {activeTab === 'profile' && (
              <div className="space-y-6">
                <h3 className="text-lg font-semibold text-foreground">Profile Information</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-foreground mb-2">Full Name</label>
                    <input
                      type="text"
                      defaultValue="Admin User"
                      className="w-full px-3 py-2 bg-background border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-foreground mb-2">Email</label>
                    <input
                      type="email"
                      defaultValue="admin@company.com"
                      className="w-full px-3 py-2 bg-background border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-foreground mb-2">Role</label>
                    <select className="w-full px-3 py-2 bg-background border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary">
                      <option>Administrator</option>
                      <option>HR Manager</option>
                      <option>Interviewer</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-foreground mb-2">Department</label>
                    <select className="w-full px-3 py-2 bg-background border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary">
                      <option>Human Resources</option>
                      <option>Engineering</option>
                      <option>Product</option>
                      <option>Design</option>
                    </select>
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'notifications' && (
              <div className="space-y-6">
                <h3 className="text-lg font-semibold text-foreground">Notification Preferences</h3>
                <div className="space-y-4">
                  <div className="flex items-center justify-between p-4 bg-muted rounded-lg">
                    <div>
                      <div className="font-medium text-foreground">Email Notifications</div>
                      <div className="text-sm text-muted-foreground">Receive email updates about interviews</div>
                    </div>
                    <input type="checkbox" defaultChecked className="rounded" />
                  </div>
                  <div className="flex items-center justify-between p-4 bg-muted rounded-lg">
                    <div>
                      <div className="font-medium text-foreground">Browser Notifications</div>
                      <div className="text-sm text-muted-foreground">Show desktop notifications</div>
                    </div>
                    <input type="checkbox" defaultChecked className="rounded" />
                  </div>
                  <div className="flex items-center justify-between p-4 bg-muted rounded-lg">
                    <div>
                      <div className="font-medium text-foreground">Weekly Reports</div>
                      <div className="text-sm text-muted-foreground">Automated weekly analytics reports</div>
                    </div>
                    <input type="checkbox" className="rounded" />
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'security' && (
              <div className="space-y-6">
                <h3 className="text-lg font-semibold text-foreground">Security Settings</h3>
                <div className="space-y-4">
                  <div className="p-4 bg-muted rounded-lg">
                    <div className="flex items-center space-x-3 mb-3">
                      <Key className="w-5 h-5 text-primary" />
                      <div className="font-medium text-foreground">Change Password</div>
                    </div>
                    <div className="space-y-3">
                      <input
                        type="password"
                        placeholder="Current password"
                        className="w-full px-3 py-2 bg-background border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                      />
                      <input
                        type="password"
                        placeholder="New password"
                        className="w-full px-3 py-2 bg-background border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                      />
                      <input
                        type="password"
                        placeholder="Confirm new password"
                        className="w-full px-3 py-2 bg-background border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                      />
                    </div>
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'appearance' && (
              <div className="space-y-6">
                <h3 className="text-lg font-semibold text-foreground">Appearance Settings</h3>
                <div className="space-y-4">
                  <div className="p-4 bg-muted rounded-lg">
                    <div className="font-medium text-foreground mb-3">Theme</div>
                    <div className="space-y-2">
                      <label className="flex items-center space-x-2">
                        <input type="radio" name="theme" defaultChecked />
                        <span className="text-foreground">Light</span>
                      </label>
                      <label className="flex items-center space-x-2">
                        <input type="radio" name="theme" />
                        <span className="text-foreground">Dark</span>
                      </label>
                      <label className="flex items-center space-x-2">
                        <input type="radio" name="theme" />
                        <span className="text-foreground">Auto</span>
                      </label>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'integrations' && (
              <div className="space-y-6">
                <h3 className="text-lg font-semibold text-foreground">Integrations</h3>
                <div className="space-y-4">
                  <div className="flex items-center justify-between p-4 bg-muted rounded-lg">
                    <div className="flex items-center space-x-3">
                      <Mail className="w-8 h-8 text-blue-500" />
                      <div>
                        <div className="font-medium text-foreground">Email Integration</div>
                        <div className="text-sm text-muted-foreground">Send interview invites via email</div>
                      </div>
                    </div>
                    <button className="px-3 py-1 bg-primary text-primary-foreground rounded text-sm">
                      Configure
                    </button>
                  </div>
                  <div className="flex items-center justify-between p-4 bg-muted rounded-lg">
                    <div className="flex items-center space-x-3">
                      <Database className="w-8 h-8 text-green-500" />
                      <div>
                        <div className="font-medium text-foreground">Database Backup</div>
                        <div className="text-sm text-muted-foreground">Automated data backup settings</div>
                      </div>
                    </div>
                    <button className="px-3 py-1 bg-secondary text-secondary-foreground rounded text-sm">
                      Setup
                    </button>
                  </div>
                </div>
              </div>
            )}

            <div className="flex justify-end mt-6 pt-6 border-t border-border">
              <button className="flex items-center space-x-2 px-4 py-2 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition-colors">
                <Save className="w-4 h-4" />
                <span>Save Changes</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
