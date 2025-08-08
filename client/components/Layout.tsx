import { ReactNode } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { 
  BarChart3, 
  FileText, 
  Calendar, 
  TrendingUp, 
  Users, 
  Settings,
  Bell,
  Search
} from 'lucide-react';

interface LayoutProps {
  children: ReactNode;
}

const navigation = [
  { name: 'Dashboard', href: '/', icon: BarChart3 },
  { name: 'Template', href: '/template', icon: FileText },
  { name: 'Schedule', href: '/schedule', icon: Calendar },
  { name: 'Report', href: '/report', icon: TrendingUp },
  { name: 'Settings', href: '/settings', icon: Settings },
];

export default function Layout({ children }: LayoutProps) {
  const location = useLocation();

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="bg-card border-b border-border">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center space-x-8">
              {/* Brand */}
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 bg-gradient-to-br from-purple-500 to-violet-600 rounded-xl flex items-center justify-center shadow-lg">
                  <span className="text-lg font-bold text-white">Σ</span>
                </div>
                <div>
                  <h1 className="text-xl font-bold text-foreground">T_interview_2</h1>
                  <p className="text-xs text-muted-foreground">Interview Analytics Platform</p>
                </div>
              </div>

              {/* Navigation */}
              <nav className="hidden md:flex space-x-1">
                {navigation.map((item) => {
                  const IconComponent = item.icon;
                  const isActive = location.pathname === item.href;
                  return (
                    <Link
                      key={item.name}
                      to={item.href}
                      className={`flex items-center space-x-2 px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                        isActive
                          ? 'bg-primary text-primary-foreground'
                          : 'text-muted-foreground hover:text-foreground hover:bg-muted'
                      }`}
                    >
                      <IconComponent className="w-4 h-4" />
                      <span>{item.name}</span>
                    </Link>
                  );
                })}
              </nav>
            </div>

            {/* Right side */}
            <div className="flex items-center space-x-4">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
                <input
                  type="text"
                  placeholder="Search candidates, jobs..."
                  className="pl-10 pr-4 py-2 bg-muted border border-border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-primary w-64"
                />
              </div>
              <button className="p-2 text-muted-foreground hover:text-foreground transition-colors relative">
                <Bell className="w-5 h-5" />
                <span className="absolute -top-1 -right-1 w-3 h-3 bg-red-500 rounded-full text-[10px] text-white flex items-center justify-center">3</span>
              </button>
              <button className="p-2 text-muted-foreground hover:text-foreground transition-colors">
                <Settings className="w-5 h-5" />
              </button>
              <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-cyan-500 rounded-lg flex items-center justify-center">
                <span className="text-sm font-semibold text-white">AD</span>
              </div>
            </div>
          </div>
        </div>

        {/* Mobile Navigation */}
        <div className="md:hidden border-t border-border">
          <div className="px-4 py-2">
            <div className="flex space-x-1 overflow-x-auto">
              {navigation.map((item) => {
                const IconComponent = item.icon;
                const isActive = location.pathname === item.href;
                return (
                  <Link
                    key={item.name}
                    to={item.href}
                    className={`flex items-center space-x-2 px-3 py-2 rounded-lg text-sm font-medium whitespace-nowrap transition-colors ${
                      isActive
                        ? 'bg-primary text-primary-foreground'
                        : 'text-muted-foreground hover:text-foreground hover:bg-muted'
                    }`}
                  >
                    <IconComponent className="w-4 h-4" />
                    <span>{item.name}</span>
                  </Link>
                );
              })}
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {children}
      </main>
    </div>
  );
}
