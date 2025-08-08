import { useState } from 'react';
import { Link } from 'react-router-dom';
import {
  BarChart,
  Bar,
  LineChart,
  Line,
  PieChart,
  Pie,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  FunnelChart,
  Funnel,
  LabelList
} from 'recharts';
import {
  Users,
  UserCheck,
  Clock,
  Award,
  TrendingUp,
  TrendingDown,
  Calendar,
  FileText,
  AlertCircle,
  CheckCircle,
  Eye
} from 'lucide-react';

const overviewStats = [
  { label: 'Total Candidates', value: '2,847', change: '+12%', trend: 'up', icon: Users },
  { label: 'Interviews Completed', value: '1,692', change: '+8%', trend: 'up', icon: UserCheck },
  { label: 'Avg. Interview Time', value: '47m', change: '-3m', trend: 'down', icon: Clock },
  { label: 'Overall Pass Rate', value: '73%', change: '+5%', trend: 'up', icon: Award },
];

const funnelData = [
  { name: 'Applied', value: 2847, fill: '#8b5cf6' },
  { name: 'Screened', value: 2341, fill: '#7c3aed' },
  { name: 'Interviewed', value: 1692, fill: '#6d28d9' },
  { name: 'Technical Round', value: 1234, fill: '#5b21b6' },
  { name: 'Final Round', value: 892, fill: '#4c1d95' },
  { name: 'Selected', value: 651, fill: '#3730a3' }
];

const skillsAnalysis = [
  { skill: 'Technical Skills', passed: 78, failed: 22 },
  { skill: 'Communication', passed: 85, failed: 15 },
  { skill: 'Problem Solving', passed: 71, failed: 29 },
  { skill: 'Leadership', passed: 66, failed: 34 },
  { skill: 'Cultural Fit', passed: 82, failed: 18 }
];

const integrityMetrics = [
  { name: 'Authentic', value: 87, color: '#22c55e' },
  { name: 'Suspicious', value: 10, color: '#f59e0b' },
  { name: 'Flagged', value: 3, color: '#ef4444' }
];

const monthlyTrends = [
  { month: 'Jul', interviews: 145, hires: 38, satisfaction: 4.2 },
  { month: 'Aug', interviews: 167, hires: 42, satisfaction: 4.3 },
  { month: 'Sep', interviews: 189, hires: 51, satisfaction: 4.1 },
  { month: 'Oct', interviews: 234, hires: 67, satisfaction: 4.4 },
  { month: 'Nov', interviews: 298, hires: 89, satisfaction: 4.5 },
  { month: 'Dec', interviews: 321, hires: 97, satisfaction: 4.6 }
];

const topPositions = [
  { role: 'Software Engineer', candidates: 847, pass_rate: 68, avg_score: 78 },
  { role: 'Product Manager', candidates: 423, pass_rate: 72, avg_score: 82 },
  { role: 'Data Scientist', candidates: 356, pass_rate: 65, avg_score: 76 },
  { role: 'UX Designer', candidates: 298, pass_rate: 78, avg_score: 84 },
  { role: 'DevOps Engineer', candidates: 167, pass_rate: 81, avg_score: 87 }
];

const recentAlerts = [
  { type: 'warning', message: 'Unusual activity detected in Software Engineer interviews', time: '2h ago' },
  { type: 'info', message: 'New competency model available for Product Manager role', time: '4h ago' },
  { type: 'success', message: 'Monthly hiring target achieved (97/95)', time: '1d ago' },
];

export default function Dashboard() {
  const [timeRange, setTimeRange] = useState('30d');

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Dashboard</h1>
          <p className="text-muted-foreground">Comprehensive analytics overview for hiring decisions</p>
        </div>
        <div className="flex items-center space-x-2">
          <select
            value={timeRange}
            onChange={(e) => setTimeRange(e.target.value)}
            className="bg-card border border-border rounded-lg px-3 py-2 text-sm"
          >
            <option value="7d">Last 7 days</option>
            <option value="30d">Last 30 days</option>
            <option value="90d">Last 90 days</option>
            <option value="1y">Last year</option>
          </select>
          <Link
            to="/report"
            className="flex items-center space-x-2 px-4 py-2 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition-colors"
          >
            <Eye className="w-4 h-4" />
            <span>Detailed Reports</span>
          </Link>
        </div>
      </div>

      {/* Overview Stats */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {overviewStats.map((stat, index) => {
          const IconComponent = stat.icon;
          return (
            <div key={index} className="bg-card border border-border rounded-xl p-6">
              <div className="flex items-center justify-between">
                <div className="flex-1">
                  <p className="text-sm text-muted-foreground">{stat.label}</p>
                  <p className="text-3xl font-bold text-foreground">{stat.value}</p>
                  <div className="flex items-center space-x-1 mt-2">
                    {stat.trend === 'up' ? (
                      <TrendingUp className="w-4 h-4 text-green-500" />
                    ) : (
                      <TrendingDown className="w-4 h-4 text-red-500" />
                    )}
                    <span className={`text-sm ${stat.trend === 'up' ? 'text-green-500' : 'text-red-500'}`}>
                      {stat.change}
                    </span>
                  </div>
                </div>
                <div className={`p-3 rounded-lg ${
                  stat.trend === 'up' ? 'bg-green-500/10' : 'bg-orange-500/10'
                }`}>
                  <IconComponent className={`w-6 h-6 ${
                    stat.trend === 'up' ? 'text-green-500' : 'text-orange-500'
                  }`} />
                </div>
              </div>
            </div>
          );
        })}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Hiring Funnel */}
        <div className="lg:col-span-2 bg-card border border-border rounded-xl p-6">
          <h3 className="text-lg font-semibold text-foreground mb-4">Hiring Funnel</h3>
          <div className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <FunnelChart>
                <Tooltip />
                <Funnel
                  dataKey="value"
                  data={funnelData}
                  isAnimationActive
                >
                  <LabelList position="center" fill="#fff" stroke="none" />
                </Funnel>
              </FunnelChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Integrity Metrics */}
        <div className="bg-card border border-border rounded-xl p-6">
          <h3 className="text-lg font-semibold text-foreground mb-4">Integrity Metrics</h3>
          <div className="h-64 mb-4">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={integrityMetrics}
                  cx="50%"
                  cy="50%"
                  outerRadius={80}
                  dataKey="value"
                  label={({ name, value }) => `${name}: ${value}%`}
                >
                  {integrityMetrics.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </div>
          <div className="space-y-2">
            {integrityMetrics.map((metric, index) => (
              <div key={index} className="flex items-center justify-between text-sm">
                <div className="flex items-center space-x-2">
                  <div className="w-3 h-3 rounded-full" style={{ backgroundColor: metric.color }} />
                  <span className="text-foreground">{metric.name}</span>
                </div>
                <span className="text-muted-foreground">{metric.value}%</span>
              </div>
            ))}
          </div>
        </div>

        {/* Monthly Trends */}
        <div className="lg:col-span-2 bg-card border border-border rounded-xl p-6">
          <h3 className="text-lg font-semibold text-foreground mb-4">Monthly Trends</h3>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={monthlyTrends}>
                <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                <XAxis dataKey="month" stroke="hsl(var(--muted-foreground))" fontSize={12} />
                <YAxis stroke="hsl(var(--muted-foreground))" fontSize={12} />
                <Tooltip
                  contentStyle={{
                    backgroundColor: 'hsl(var(--card))',
                    border: '1px solid hsl(var(--border))',
                    borderRadius: '8px'
                  }}
                />
                <Line
                  type="monotone"
                  dataKey="interviews"
                  stroke="hsl(var(--primary))"
                  strokeWidth={2}
                  dot={{ fill: 'hsl(var(--primary))', strokeWidth: 2, r: 4 }}
                />
                <Line
                  type="monotone"
                  dataKey="hires"
                  stroke="#22c55e"
                  strokeWidth={2}
                  dot={{ fill: '#22c55e', strokeWidth: 2, r: 4 }}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Skills Analysis */}
        <div className="bg-card border border-border rounded-xl p-6">
          <h3 className="text-lg font-semibold text-foreground mb-4">Skills Pass Rate</h3>
          <div className="space-y-4">
            {skillsAnalysis.map((skill, index) => (
              <div key={index}>
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm font-medium text-foreground">{skill.skill}</span>
                  <span className="text-sm text-muted-foreground">{skill.passed}%</span>
                </div>
                <div className="flex rounded-full h-2 bg-muted overflow-hidden">
                  <div
                    className="bg-green-500"
                    style={{ width: `${skill.passed}%` }}
                  />
                  <div
                    className="bg-red-500"
                    style={{ width: `${skill.failed}%` }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Top Positions */}
        <div className="lg:col-span-2 bg-card border border-border rounded-xl p-6">
          <h3 className="text-lg font-semibold text-foreground mb-4">Top Hiring Positions</h3>
          <div className="space-y-4">
            {topPositions.map((position, index) => (
              <div key={index} className="flex items-center justify-between p-4 bg-muted rounded-lg">
                <div className="flex-1">
                  <h4 className="font-medium text-foreground">{position.role}</h4>
                  <p className="text-sm text-muted-foreground">{position.candidates} candidates</p>
                </div>
                <div className="flex items-center space-x-6 text-sm">
                  <div className="text-center">
                    <div className="font-medium text-foreground">{position.pass_rate}%</div>
                    <div className="text-muted-foreground">Pass Rate</div>
                  </div>
                  <div className="text-center">
                    <div className="font-medium text-foreground">{position.avg_score}</div>
                    <div className="text-muted-foreground">Avg Score</div>
                  </div>
                  <Link
                    to={`/sessions?role=${encodeURIComponent(position.role)}`}
                    className="px-3 py-1 bg-primary text-primary-foreground rounded text-xs hover:bg-primary/90 transition-colors"
                  >
                    View Details
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Recent Alerts */}
        <div className="bg-card border border-border rounded-xl p-6">
          <h3 className="text-lg font-semibold text-foreground mb-4">Recent Alerts</h3>
          <div className="space-y-3">
            {recentAlerts.map((alert, index) => (
              <div key={index} className="flex items-start space-x-3 p-3 bg-muted rounded-lg">
                <div className={`p-1 rounded-full ${
                  alert.type === 'warning' ? 'bg-orange-500/10' :
                  alert.type === 'info' ? 'bg-blue-500/10' :
                  'bg-green-500/10'
                }`}>
                  {alert.type === 'warning' ? (
                    <AlertCircle className="w-4 h-4 text-orange-500" />
                  ) : alert.type === 'info' ? (
                    <Calendar className="w-4 h-4 text-blue-500" />
                  ) : (
                    <CheckCircle className="w-4 h-4 text-green-500" />
                  )}
                </div>
                <div className="flex-1">
                  <p className="text-sm text-foreground">{alert.message}</p>
                  <p className="text-xs text-muted-foreground mt-1">{alert.time}</p>
                </div>
              </div>
            ))}
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
              <FileText className="w-5 h-5 text-primary" />
            </div>
            <div>
              <p className="font-medium text-foreground">Create Template</p>
              <p className="text-sm text-muted-foreground">Set up new job role</p>
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
              <p className="font-medium text-foreground">Schedule Interview</p>
              <p className="text-sm text-muted-foreground">Invite candidates</p>
            </div>
          </Link>

          <Link
            to="/sessions"
            className="flex items-center space-x-3 p-4 bg-muted hover:bg-muted/80 rounded-lg transition-colors"
          >
            <div className="p-2 bg-blue-500/10 rounded-lg">
              <Users className="w-5 h-5 text-blue-500" />
            </div>
            <div>
              <p className="font-medium text-foreground">View Sessions</p>
              <p className="text-sm text-muted-foreground">Active interviews</p>
            </div>
          </Link>

          <Link
            to="/report"
            className="flex items-center space-x-3 p-4 bg-muted hover:bg-muted/80 rounded-lg transition-colors"
          >
            <div className="p-2 bg-orange-500/10 rounded-lg">
              <TrendingUp className="w-5 h-5 text-orange-500" />
            </div>
            <div>
              <p className="font-medium text-foreground">Generate Report</p>
              <p className="text-sm text-muted-foreground">Detailed analytics</p>
            </div>
          </Link>
        </div>
      </div>
    </div>
  );
}
