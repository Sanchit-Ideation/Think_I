import { useState } from 'react';
import { Link } from 'react-router-dom';
import {
  FunnelChart,
  Funnel,
  LabelList,
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  PieChart,
  Pie,
  Cell
} from 'recharts';
import {
  Users,
  TrendingUp,
  Clock,
  Shield,
  Eye,
  Filter,
  Search,
  Calendar,
  Award,
  AlertTriangle,
  CheckCircle,
  XCircle
} from 'lucide-react';

const jobRoles = [
  {
    id: 1,
    title: 'Senior Software Engineer',
    department: 'Engineering',
    active_sessions: 23,
    total_candidates: 847,
    completion_rate: 87,
    avg_score: 78,
    integrity_score: 94,
    funnel: [
      { name: 'Applied', value: 847, fill: '#8b5cf6' },
      { name: 'Screened', value: 734, fill: '#7c3aed' },
      { name: 'Technical', value: 456, fill: '#6d28d9' },
      { name: 'Final', value: 267, fill: '#5b21b6' },
      { name: 'Selected', value: 89, fill: '#4c1d95' }
    ],
    recent_flags: 2,
    avg_duration: 62
  },
  {
    id: 2,
    title: 'Product Manager',
    department: 'Product',
    active_sessions: 18,
    total_candidates: 423,
    completion_rate: 92,
    avg_score: 82,
    integrity_score: 96,
    funnel: [
      { name: 'Applied', value: 423, fill: '#06b6d4' },
      { name: 'Screened', value: 389, fill: '#0891b2' },
      { name: 'Assessment', value: 234, fill: '#0e7490' },
      { name: 'Final', value: 156, fill: '#155e75' },
      { name: 'Selected', value: 67, fill: '#164e63' }
    ],
    recent_flags: 1,
    avg_duration: 48
  },
  {
    id: 3,
    title: 'Data Scientist',
    department: 'Engineering',
    active_sessions: 15,
    total_candidates: 356,
    completion_rate: 79,
    avg_score: 76,
    integrity_score: 91,
    funnel: [
      { name: 'Applied', value: 356, fill: '#10b981' },
      { name: 'Screened', value: 298, fill: '#059669' },
      { name: 'Technical', value: 187, fill: '#047857' },
      { name: 'Final', value: 124, fill: '#065f46' },
      { name: 'Selected', value: 52, fill: '#064e3b' }
    ],
    recent_flags: 4,
    avg_duration: 73
  },
  {
    id: 4,
    title: 'UX Designer',
    department: 'Design',
    active_sessions: 12,
    total_candidates: 298,
    completion_rate: 88,
    avg_score: 84,
    integrity_score: 97,
    funnel: [
      { name: 'Applied', value: 298, fill: '#f59e0b' },
      { name: 'Portfolio', value: 267, fill: '#d97706' },
      { name: 'Interview', value: 189, fill: '#b45309' },
      { name: 'Final', value: 123, fill: '#92400e' },
      { name: 'Selected', value: 78, fill: '#78350f' }
    ],
    recent_flags: 0,
    avg_duration: 55
  }
];

const sessionMetrics = [
  { name: 'Active', value: 68, color: '#22c55e' },
  { name: 'Completed', value: 1247, color: '#06b6d4' },
  { name: 'Pending', value: 34, color: '#f59e0b' },
  { name: 'Cancelled', value: 12, color: '#ef4444' }
];

const integrityTrends = [
  { week: 'W1', authentic: 89, suspicious: 8, flagged: 3 },
  { week: 'W2', authentic: 92, suspicious: 6, flagged: 2 },
  { week: 'W3', authentic: 87, suspicious: 10, flagged: 3 },
  { week: 'W4', authentic: 94, suspicious: 4, flagged: 2 }
];

export default function Sessions() {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedDepartment, setSelectedDepartment] = useState('all');
  const [selectedMetric, setSelectedMetric] = useState('active_sessions');

  const departments = ['all', 'Engineering', 'Product', 'Design', 'Marketing'];

  const filteredRoles = jobRoles.filter(role => {
    const matchesSearch = role.title.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesDepartment = selectedDepartment === 'all' || role.department === selectedDepartment;
    return matchesSearch && matchesDepartment;
  });

  const totalActiveSessions = jobRoles.reduce((sum, role) => sum + role.active_sessions, 0);
  const totalCandidates = jobRoles.reduce((sum, role) => sum + role.total_candidates, 0);
  const avgCompletionRate = Math.round(jobRoles.reduce((sum, role) => sum + role.completion_rate, 0) / jobRoles.length);
  const totalFlags = jobRoles.reduce((sum, role) => sum + role.recent_flags, 0);

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Active Sessions</h1>
          <p className="text-muted-foreground">Monitor ongoing interviews and job role analytics</p>
        </div>
        <div className="flex items-center space-x-2">
          <select
            value={selectedMetric}
            onChange={(e) => setSelectedMetric(e.target.value)}
            className="bg-card border border-border rounded-lg px-3 py-2 text-sm"
          >
            <option value="active_sessions">Active Sessions</option>
            <option value="total_candidates">Total Candidates</option>
            <option value="completion_rate">Completion Rate</option>
            <option value="avg_score">Average Score</option>
          </select>
        </div>
      </div>

      {/* Overview Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="bg-card border border-border rounded-xl p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-muted-foreground">Active Sessions</p>
              <p className="text-3xl font-bold text-foreground">{totalActiveSessions}</p>
              <p className="text-xs text-green-500 mt-1">+8 from yesterday</p>
            </div>
            <div className="p-3 bg-green-500/10 rounded-lg">
              <Users className="w-6 h-6 text-green-500" />
            </div>
          </div>
        </div>

        <div className="bg-card border border-border rounded-xl p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-muted-foreground">Total Candidates</p>
              <p className="text-3xl font-bold text-foreground">{totalCandidates.toLocaleString()}</p>
              <p className="text-xs text-blue-500 mt-1">Across all roles</p>
            </div>
            <div className="p-3 bg-blue-500/10 rounded-lg">
              <TrendingUp className="w-6 h-6 text-blue-500" />
            </div>
          </div>
        </div>

        <div className="bg-card border border-border rounded-xl p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-muted-foreground">Avg Completion Rate</p>
              <p className="text-3xl font-bold text-foreground">{avgCompletionRate}%</p>
              <p className="text-xs text-green-500 mt-1">+3% this week</p>
            </div>
            <div className="p-3 bg-purple-500/10 rounded-lg">
              <Clock className="w-6 h-6 text-purple-500" />
            </div>
          </div>
        </div>

        <div className="bg-card border border-border rounded-xl p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-muted-foreground">Integrity Flags</p>
              <p className="text-3xl font-bold text-foreground">{totalFlags}</p>
              <p className="text-xs text-orange-500 mt-1">Requires review</p>
            </div>
            <div className="p-3 bg-orange-500/10 rounded-lg">
              <Shield className="w-6 h-6 text-orange-500" />
            </div>
          </div>
        </div>
      </div>

      {/* Filters */}
      <div className="flex items-center space-x-4">
        <div className="relative flex-1 max-w-md">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
          <input
            type="text"
            placeholder="Search job roles..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10 pr-4 py-2 w-full bg-card border border-border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-primary"
          />
        </div>
        <select
          value={selectedDepartment}
          onChange={(e) => setSelectedDepartment(e.target.value)}
          className="bg-card border border-border rounded-lg px-3 py-2 text-sm"
        >
          {departments.map(dept => (
            <option key={dept} value={dept}>
              {dept === 'all' ? 'All Departments' : dept}
            </option>
          ))}
        </select>
        <button className="flex items-center space-x-2 px-3 py-2 bg-card border border-border rounded-lg hover:bg-muted transition-colors">
          <Filter className="w-4 h-4" />
          <span>More Filters</span>
        </button>
      </div>

      {/* Job Role Cards */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {filteredRoles.map((role) => (
          <div key={role.id} className="bg-card border border-border rounded-xl p-6 hover:shadow-lg transition-all">
            <div className="flex items-start justify-between mb-4">
              <div>
                <h3 className="text-xl font-semibold text-foreground">{role.title}</h3>
                <p className="text-sm text-muted-foreground">{role.department}</p>
              </div>
              <Link
                to={`/sessions/${role.id}`}
                className="flex items-center space-x-1 px-3 py-1 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition-colors"
              >
                <Eye className="w-4 h-4" />
                <span>View Details</span>
              </Link>
            </div>

            {/* Key Metrics */}
            <div className="grid grid-cols-4 gap-4 mb-6">
              <div className="text-center p-3 bg-muted rounded-lg">
                <div className="text-lg font-bold text-foreground">{role.active_sessions}</div>
                <div className="text-xs text-muted-foreground">Active</div>
              </div>
              <div className="text-center p-3 bg-muted rounded-lg">
                <div className="text-lg font-bold text-foreground">{role.completion_rate}%</div>
                <div className="text-xs text-muted-foreground">Complete</div>
              </div>
              <div className="text-center p-3 bg-muted rounded-lg">
                <div className="text-lg font-bold text-foreground">{role.avg_score}</div>
                <div className="text-xs text-muted-foreground">Avg Score</div>
              </div>
              <div className="text-center p-3 bg-muted rounded-lg">
                <div className="text-lg font-bold text-foreground">{role.integrity_score}%</div>
                <div className="text-xs text-muted-foreground">Integrity</div>
              </div>
            </div>

            {/* Hiring Funnel */}
            <div className="mb-4">
              <h4 className="text-sm font-medium text-foreground mb-3">Hiring Funnel</h4>
              <div className="h-32">
                <ResponsiveContainer width="100%" height="100%">
                  <FunnelChart>
                    <Tooltip />
                    <Funnel
                      dataKey="value"
                      data={role.funnel}
                      isAnimationActive
                    >
                      <LabelList position="center" fill="#fff" stroke="none" fontSize={10} />
                    </Funnel>
                  </FunnelChart>
                </ResponsiveContainer>
              </div>
            </div>

            {/* Integrity & Alerts */}
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-4">
                <div className="flex items-center space-x-1 text-sm">
                  <Shield className="w-4 h-4 text-green-500" />
                  <span className="text-muted-foreground">Integrity: {role.integrity_score}%</span>
                </div>
                <div className="flex items-center space-x-1 text-sm">
                  <Clock className="w-4 h-4 text-blue-500" />
                  <span className="text-muted-foreground">Avg: {role.avg_duration}m</span>
                </div>
              </div>
              
              {role.recent_flags > 0 ? (
                <div className="flex items-center space-x-1 px-2 py-1 bg-orange-500/10 text-orange-500 rounded-full text-xs">
                  <AlertTriangle className="w-3 h-3" />
                  <span>{role.recent_flags} flag{role.recent_flags > 1 ? 's' : ''}</span>
                </div>
              ) : (
                <div className="flex items-center space-x-1 px-2 py-1 bg-green-500/10 text-green-500 rounded-full text-xs">
                  <CheckCircle className="w-3 h-3" />
                  <span>All clear</span>
                </div>
              )}
            </div>
          </div>
        ))}
      </div>

      {/* Analytics Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Session Status Distribution */}
        <div className="bg-card border border-border rounded-xl p-6">
          <h3 className="text-lg font-semibold text-foreground mb-4">Session Status Distribution</h3>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={sessionMetrics}
                  cx="50%"
                  cy="50%"
                  outerRadius={80}
                  dataKey="value"
                  label={({ name, value }) => `${name}: ${value}`}
                >
                  {sessionMetrics.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Integrity Trends */}
        <div className="bg-card border border-border rounded-xl p-6">
          <h3 className="text-lg font-semibold text-foreground mb-4">Weekly Integrity Trends</h3>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={integrityTrends}>
                <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                <XAxis dataKey="week" stroke="hsl(var(--muted-foreground))" fontSize={12} />
                <YAxis stroke="hsl(var(--muted-foreground))" fontSize={12} />
                <Tooltip
                  contentStyle={{
                    backgroundColor: 'hsl(var(--card))',
                    border: '1px solid hsl(var(--border))',
                    borderRadius: '8px'
                  }}
                />
                <Bar dataKey="authentic" fill="#22c55e" name="Authentic" />
                <Bar dataKey="suspicious" fill="#f59e0b" name="Suspicious" />
                <Bar dataKey="flagged" fill="#ef4444" name="Flagged" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="bg-card border border-border rounded-xl p-6">
        <h3 className="text-lg font-semibold text-foreground mb-4">Quick Actions</h3>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <Link
            to="/template"
            className="flex items-center space-x-3 p-4 bg-muted hover:bg-muted/80 rounded-lg transition-colors"
          >
            <div className="p-2 bg-primary/10 rounded-lg">
              <Award className="w-5 h-5 text-primary" />
            </div>
            <div>
              <p className="font-medium text-foreground">Create Template</p>
              <p className="text-sm text-muted-foreground">New job role setup</p>
            </div>
          </Link>

          <Link
            to="/schedule"
            className="flex items-center space-x-3 p-4 bg-muted hover:bg-muted/80 rounded-lg transition-colors"
          >
            <div className="p-2 bg-green-500/10 rounded-lg">
              <Calendar className="w-5 h-5 text-green-500" />
            </div>
            <div>
              <p className="font-medium text-foreground">Schedule Interviews</p>
              <p className="text-sm text-muted-foreground">Bulk scheduling</p>
            </div>
          </Link>

          <button className="flex items-center space-x-3 p-4 bg-muted hover:bg-muted/80 rounded-lg transition-colors">
            <div className="p-2 bg-orange-500/10 rounded-lg">
              <Shield className="w-5 h-5 text-orange-500" />
            </div>
            <div className="text-left">
              <p className="font-medium text-foreground">Review Flags</p>
              <p className="text-sm text-muted-foreground">{totalFlags} pending</p>
            </div>
          </button>

          <Link
            to="/report"
            className="flex items-center space-x-3 p-4 bg-muted hover:bg-muted/80 rounded-lg transition-colors"
          >
            <div className="p-2 bg-blue-500/10 rounded-lg">
              <TrendingUp className="w-5 h-5 text-blue-500" />
            </div>
            <div>
              <p className="font-medium text-foreground">Export Reports</p>
              <p className="text-sm text-muted-foreground">Detailed analytics</p>
            </div>
          </Link>
        </div>
      </div>
    </div>
  );
}
