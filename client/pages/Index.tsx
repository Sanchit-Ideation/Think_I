import { Link } from 'react-router-dom';
import { 
  TrendingUp, 
  Users, 
  Clock, 
  Award, 
  FileText,
  Settings,
  Search,
  Calendar,
  Brain
} from 'lucide-react';

const recentInterviews = [
  { id: 1, candidate: 'Sarah Johnson', position: 'Senior Software Engineer', score: 87, date: '2024-12-15', status: 'completed' },
  { id: 2, candidate: 'Michael Chen', position: 'Product Manager', score: 92, date: '2024-12-14', status: 'completed' },
  { id: 3, candidate: 'Emily Rodriguez', position: 'UX Designer', score: 85, date: '2024-12-13', status: 'completed' },
  { id: 4, candidate: 'David Kim', position: 'Data Scientist', score: 78, date: '2024-12-12', status: 'in_progress' },
  { id: 5, candidate: 'Anna Thompson', position: 'DevOps Engineer', score: 94, date: '2024-12-11', status: 'completed' }
];

export default function Index() {
  const totalInterviews = recentInterviews.length;
  const avgScore = Math.round(recentInterviews.reduce((acc, interview) => acc + interview.score, 0) / totalInterviews);
  const completedInterviews = recentInterviews.filter(i => i.status === 'completed').length;
  const inProgressInterviews = recentInterviews.filter(i => i.status === 'in_progress').length;

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="bg-card border-b border-border">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 bg-gradient-to-br from-purple-500 to-violet-600 rounded-xl flex items-center justify-center shadow-lg">
                  <span className="text-lg font-bold text-white">Σ</span>
                </div>
                <div>
                  <h1 className="text-xl font-bold text-foreground">T_interview_2</h1>
                  <p className="text-xs text-muted-foreground">Interview Analysis Platform</p>
                </div>
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
                <input
                  type="text"
                  placeholder="Search interviews..."
                  className="pl-10 pr-4 py-2 bg-muted border border-border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-primary"
                />
              </div>
              <button className="p-2 text-muted-foreground hover:text-foreground transition-colors">
                <Settings className="w-5 h-5" />
              </button>
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Stats Overview */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <div className="bg-card border border-border rounded-xl p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Total Interviews</p>
                <p className="text-3xl font-bold text-foreground">{totalInterviews}</p>
                <p className="text-xs text-green-500 mt-1">+12% from last month</p>
              </div>
              <div className="p-3 bg-blue-500/10 rounded-lg">
                <Users className="w-6 h-6 text-blue-500" />
              </div>
            </div>
          </div>

          <div className="bg-card border border-border rounded-xl p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Average Score</p>
                <p className="text-3xl font-bold text-foreground">{avgScore}%</p>
                <p className="text-xs text-green-500 mt-1">+5% from last month</p>
              </div>
              <div className="p-3 bg-purple-500/10 rounded-lg">
                <Award className="w-6 h-6 text-purple-500" />
              </div>
            </div>
          </div>

          <div className="bg-card border border-border rounded-xl p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Completed</p>
                <p className="text-3xl font-bold text-foreground">{completedInterviews}</p>
                <p className="text-xs text-muted-foreground mt-1">{inProgressInterviews} in progress</p>
              </div>
              <div className="p-3 bg-green-500/10 rounded-lg">
                <FileText className="w-6 h-6 text-green-500" />
              </div>
            </div>
          </div>

          <div className="bg-card border border-border rounded-xl p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Avg Duration</p>
                <p className="text-3xl font-bold text-foreground">47m</p>
                <p className="text-xs text-yellow-500 mt-1">+3m from last month</p>
              </div>
              <div className="p-3 bg-orange-500/10 rounded-lg">
                <Clock className="w-6 h-6 text-orange-500" />
              </div>
            </div>
          </div>
        </div>

        {/* Recent Interviews */}
        <div className="bg-card border border-border rounded-xl p-6 mb-8">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-lg font-semibold text-foreground">Recent Interviews</h3>
            <Link 
              to="/report" 
              className="text-sm text-primary hover:text-primary/80 transition-colors"
            >
              View detailed report →
            </Link>
          </div>
          <div className="space-y-4">
            {recentInterviews.map((interview) => (
              <div key={interview.id} className="flex items-center justify-between p-4 bg-muted rounded-lg">
                <div className="flex-1">
                  <div className="flex items-center space-x-3">
                    <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-cyan-500 rounded-lg flex items-center justify-center">
                      <span className="text-sm font-semibold text-white">
                        {interview.candidate.split(' ').map(n => n[0]).join('')}
                      </span>
                    </div>
                    <div>
                      <p className="font-medium text-foreground">{interview.candidate}</p>
                      <p className="text-sm text-muted-foreground">{interview.position}</p>
                    </div>
                  </div>
                </div>
                <div className="text-right">
                  <div className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${
                    interview.score >= 90 ? 'bg-green-500/10 text-green-500' :
                    interview.score >= 80 ? 'bg-blue-500/10 text-blue-500' :
                    interview.score >= 70 ? 'bg-yellow-500/10 text-yellow-500' :
                    'bg-red-500/10 text-red-500'
                  }`}>
                    {interview.score}%
                  </div>
                  <p className="text-xs text-muted-foreground mt-1">{interview.date}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Quick Actions */}
        <div className="bg-card border border-border rounded-xl p-6">
          <h3 className="text-lg font-semibold text-foreground mb-6">Quick Actions</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Link 
              to="/report"
              className="flex items-center space-x-3 p-4 bg-primary/10 hover:bg-primary/20 rounded-lg transition-colors group"
            >
              <div className="p-2 bg-primary/20 rounded-lg group-hover:bg-primary/30 transition-colors">
                <TrendingUp className="w-5 h-5 text-primary" />
              </div>
              <div>
                <p className="font-medium text-foreground">View Detailed Report</p>
                <p className="text-sm text-muted-foreground">Comprehensive analysis & insights</p>
              </div>
            </Link>

            <button className="flex items-center space-x-3 p-4 bg-muted hover:bg-muted/80 rounded-lg transition-colors group">
              <div className="p-2 bg-background rounded-lg">
                <Calendar className="w-5 h-5 text-foreground" />
              </div>
              <div className="text-left">
                <p className="font-medium text-foreground">Schedule Interview</p>
                <p className="text-sm text-muted-foreground">Book a new session</p>
              </div>
            </button>

            <button className="flex items-center space-x-3 p-4 bg-muted hover:bg-muted/80 rounded-lg transition-colors group">
              <div className="p-2 bg-background rounded-lg">
                <Brain className="w-5 h-5 text-foreground" />
              </div>
              <div className="text-left">
                <p className="font-medium text-foreground">AI Insights</p>
                <p className="text-sm text-muted-foreground">Get recommendations</p>
              </div>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
