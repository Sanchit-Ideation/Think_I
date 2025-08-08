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
  LabelList,
  RadarChart,
  Radar,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  ComposedChart,
  Area,
  AreaChart
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
  Eye,
  Brain,
  Shield,
  Target,
  Star,
  BarChart3
} from 'lucide-react';

// Key Metric Cards Data
const keyMetrics = [
  { label: 'Total Interviews Scheduled', value: '1,247', change: '+18%', trend: 'up', icon: Calendar, color: 'blue' },
  { label: 'Total Interviews Completed', value: '1,039', change: '+12%', trend: 'up', icon: UserCheck, color: 'green' },
  { label: 'Pending Evaluations', value: '89', change: '-5%', trend: 'down', icon: Clock, color: 'orange' },
  { label: 'Avg. Integrity Score', value: '91.2', change: '+2.1%', trend: 'up', icon: Shield, color: 'emerald' },
  { label: 'Avg. AI Score', value: '84.7', change: '+3.2%', trend: 'up', icon: Brain, color: 'purple' },
  { label: 'Avg. Interviewer Score', value: '82.3', change: '+1.8%', trend: 'up', icon: Users, color: 'indigo' }
];

// Recommendation Summary Data
const recommendationSummary = [
  { status: 'Highly Recommended', count: 387, percentage: 37.3, color: '#22c55e' },
  { status: 'Consider', count: 412, percentage: 39.7, color: '#f59e0b' },
  { status: 'Not Recommended', count: 240, percentage: 23.1, color: '#ef4444' }
];

// Interview Funnel Data
const interviewFunnel = [
  { name: 'Scheduled', value: 1247, fill: '#8b5cf6' },
  { name: 'Interviewed', value: 1039, fill: '#7c3aed' },
  { name: 'Evaluated', value: 950, fill: '#6d28d9' },
  { name: 'Final Status Given', value: 912, fill: '#5b21b6' }
];

// Interview Outcome Trends Data
const outcomeTrends = [
  { month: 'Jul', hire: 45, consider: 52, reject: 28 },
  { month: 'Aug', hire: 52, consider: 48, reject: 35 },
  { month: 'Sep', hire: 61, consider: 59, reject: 29 },
  { month: 'Oct', hire: 72, consider: 63, reject: 31 },
  { month: 'Nov', hire: 89, consider: 71, reject: 28 },
  { month: 'Dec', hire: 97, consider: 76, reject: 25 }
];

// Session Integrity Summary Data
const integrityViolations = [
  { name: 'Tab Switch', value: 45, color: '#ef4444' },
  { name: 'Multiple Face', value: 23, color: '#f97316' },
  { name: 'Mic Off', value: 67, color: '#eab308' },
  { name: 'Lipsync Detected', value: 12, color: '#dc2626' },
  { name: 'Background Voice', value: 34, color: '#ea580c' }
];

// Competency Performance Data
const competencyData = [
  { competency: 'Technical Skills', actual: 82, expected: 85, fullMark: 100 },
  { competency: 'Communication', actual: 88, expected: 80, fullMark: 100 },
  { competency: 'Problem Solving', actual: 75, expected: 82, fullMark: 100 },
  { competency: 'Leadership', actual: 69, expected: 75, fullMark: 100 },
  { competency: 'Team Collaboration', actual: 91, expected: 78, fullMark: 100 },
  { competency: 'Cultural Fit', actual: 84, expected: 88, fullMark: 100 }
];

// Top Interviewers Data
const topInterviewers = [
  { 
    name: 'Lisa Brown', 
    interviews: 89, 
    avg_eval_time: '32m', 
    ai_alignment: 94, 
    missed_elements: 2,
    rating: 4.9 
  },
  { 
    name: 'Emily Davis', 
    interviews: 76, 
    avg_eval_time: '28m', 
    ai_alignment: 91, 
    missed_elements: 3,
    rating: 4.8 
  },
  { 
    name: 'John Smith', 
    interviews: 82, 
    avg_eval_time: '35m', 
    ai_alignment: 89, 
    missed_elements: 5,
    rating: 4.6 
  },
  { 
    name: 'Alex Wilson', 
    interviews: 67, 
    avg_eval_time: '41m', 
    ai_alignment: 86, 
    missed_elements: 7,
    rating: 4.4 
  },
  { 
    name: 'Mark Johnson', 
    interviews: 54, 
    avg_eval_time: '38m', 
    ai_alignment: 88, 
    missed_elements: 4,
    rating: 4.5 
  }
];

// Behavioral Traits Distribution Data
const behavioralTraits = [
  { trait: 'Confident', engineering: 45, pm: 38, design: 52, marketing: 41 },
  { trait: 'Calm', engineering: 62, pm: 58, design: 48, marketing: 55 },
  { trait: 'Nervous', engineering: 23, pm: 28, design: 31, marketing: 26 },
  { trait: 'Hesitant', engineering: 18, pm: 22, design: 19, marketing: 21 },
  { trait: 'Aggressive', engineering: 12, pm: 15, design: 8, marketing: 17 }
];

// High Performing Templates Data
const templatePerformance = [
  { 
    template: 'Software Engineer V2', 
    interviews: 234, 
    recommended_pct: 68, 
    integrity_score: 89, 
    avg_score: 84,
    bubble_size: 234 
  },
  { 
    template: 'Product Manager V3', 
    interviews: 156, 
    recommended_pct: 72, 
    integrity_score: 92, 
    avg_score: 86,
    bubble_size: 156 
  },
  { 
    template: 'UX Designer V1', 
    interviews: 89, 
    recommended_pct: 78, 
    integrity_score: 94, 
    avg_score: 88,
    bubble_size: 89 
  },
  { 
    template: 'Data Scientist V2', 
    interviews: 123, 
    recommended_pct: 65, 
    integrity_score: 87, 
    avg_score: 82,
    bubble_size: 123 
  },
  { 
    template: 'DevOps Engineer V1', 
    interviews: 67, 
    recommended_pct: 81, 
    integrity_score: 91, 
    avg_score: 89,
    bubble_size: 67 
  }
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

      {/* Key Metric Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {keyMetrics.map((metric, index) => {
          const IconComponent = metric.icon;
          return (
            <div key={index} className="bg-card border border-border rounded-xl p-6">
              <div className="flex items-center justify-between">
                <div className="flex-1">
                  <p className="text-sm text-muted-foreground">{metric.label}</p>
                  <p className="text-3xl font-bold text-foreground">{metric.value}</p>
                  <div className="flex items-center space-x-1 mt-2">
                    {metric.trend === 'up' ? (
                      <TrendingUp className="w-4 h-4 text-green-500" />
                    ) : (
                      <TrendingDown className="w-4 h-4 text-red-500" />
                    )}
                    <span className={`text-sm ${metric.trend === 'up' ? 'text-green-500' : 'text-red-500'}`}>
                      {metric.change}
                    </span>
                  </div>
                </div>
                <div className={`p-3 rounded-lg bg-${metric.color}-500/10`}>
                  <IconComponent className={`w-6 h-6 text-${metric.color}-500`} />
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Recommendation Summary */}
      <div className="bg-card border border-border rounded-xl p-6">
        <h3 className="text-lg font-semibold text-foreground mb-4">Recommendation Summary</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {recommendationSummary.map((item, index) => (
            <div key={index} className="text-center p-4 bg-muted rounded-lg">
              <div 
                className="w-16 h-16 rounded-full mx-auto mb-3 flex items-center justify-center text-white font-bold text-lg"
                style={{ backgroundColor: item.color }}
              >
                {item.percentage}%
              </div>
              <h4 className="font-medium text-foreground">{item.status}</h4>
              <p className="text-sm text-muted-foreground">{item.count} candidates</p>
            </div>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Interview Funnel */}
        <div className="bg-card border border-border rounded-xl p-6">
          <h3 className="text-lg font-semibold text-foreground mb-4">Interview Funnel</h3>
          <div className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <FunnelChart>
                <Tooltip />
                <Funnel
                  dataKey="value"
                  data={interviewFunnel}
                  isAnimationActive
                >
                  <LabelList position="center" fill="#fff" stroke="none" />
                </Funnel>
              </FunnelChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Interview Outcome Trends */}
        <div className="bg-card border border-border rounded-xl p-6">
          <h3 className="text-lg font-semibold text-foreground mb-4">Interview Outcome Trends</h3>
          <div className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={outcomeTrends}>
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
                <Area
                  type="monotone"
                  dataKey="hire"
                  stackId="1"
                  stroke="#22c55e"
                  fill="#22c55e"
                  name="Hire"
                />
                <Area
                  type="monotone"
                  dataKey="consider"
                  stackId="1"
                  stroke="#f59e0b"
                  fill="#f59e0b"
                  name="Consider"
                />
                <Area
                  type="monotone"
                  dataKey="reject"
                  stackId="1"
                  stroke="#ef4444"
                  fill="#ef4444"
                  name="Reject"
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Session Integrity Summary */}
        <div className="bg-card border border-border rounded-xl p-6">
          <h3 className="text-lg font-semibold text-foreground mb-4">Session Integrity Violations</h3>
          <div className="h-64 mb-4">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={integrityViolations}
                  cx="50%"
                  cy="50%"
                  outerRadius={80}
                  dataKey="value"
                  label={({ name, value }) => `${name}: ${value}`}
                >
                  {integrityViolations.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </div>
          <div className="space-y-2">
            {integrityViolations.map((violation, index) => (
              <div key={index} className="flex items-center justify-between text-sm">
                <div className="flex items-center space-x-2">
                  <div className="w-3 h-3 rounded-full" style={{ backgroundColor: violation.color }} />
                  <span className="text-foreground">{violation.name}</span>
                </div>
                <span className="text-muted-foreground">{violation.value} cases</span>
              </div>
            ))}
          </div>
        </div>

        {/* Competency Performance Snapshot */}
        <div className="bg-card border border-border rounded-xl p-6">
          <h3 className="text-lg font-semibold text-foreground mb-4">Competency Performance vs Expected</h3>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <RadarChart data={competencyData}>
                <PolarGrid />
                <PolarAngleAxis dataKey="competency" tick={{ fontSize: 10 }} />
                <PolarRadiusAxis angle={30} domain={[0, 100]} tick={{ fontSize: 8 }} />
                <Radar
                  name="Actual"
                  dataKey="actual"
                  stroke="#8b5cf6"
                  fill="#8b5cf6"
                  fillOpacity={0.3}
                  strokeWidth={2}
                />
                <Radar
                  name="Expected"
                  dataKey="expected"
                  stroke="#22c55e"
                  fill="#22c55e"
                  fillOpacity={0.1}
                  strokeWidth={2}
                  strokeDasharray="5 5"
                />
                <Tooltip />
              </RadarChart>
            </ResponsiveContainer>
          </div>
          <div className="flex justify-center space-x-6 mt-4 text-sm">
            <div className="flex items-center space-x-2">
              <div className="w-3 h-3 bg-purple-500 rounded" />
              <span>Actual Performance</span>
            </div>
            <div className="flex items-center space-x-2">
              <div className="w-3 h-3 border-2 border-green-500 border-dashed rounded" />
              <span>Expected Level</span>
            </div>
          </div>
        </div>
      </div>

      {/* Top Interviewers */}
      <div className="bg-card border border-border rounded-xl p-6">
        <h3 className="text-lg font-semibold text-foreground mb-4">Top Interviewers Performance</h3>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-border">
                <th className="text-left py-3 px-4 font-medium text-foreground">Interviewer</th>
                <th className="text-left py-3 px-4 font-medium text-foreground">Interviews</th>
                <th className="text-left py-3 px-4 font-medium text-foreground">Avg. Eval Time</th>
                <th className="text-left py-3 px-4 font-medium text-foreground">AI Alignment</th>
                <th className="text-left py-3 px-4 font-medium text-foreground">Missed Elements</th>
                <th className="text-left py-3 px-4 font-medium text-foreground">Rating</th>
              </tr>
            </thead>
            <tbody>
              {topInterviewers.map((interviewer, index) => (
                <tr key={index} className="border-b border-border hover:bg-muted/50">
                  <td className="py-3 px-4">
                    <div className="flex items-center space-x-3">
                      <div className="w-8 h-8 bg-gradient-to-br from-purple-500 to-pink-500 rounded-lg flex items-center justify-center">
                        <span className="text-white text-xs font-semibold">
                          {interviewer.name.split(' ').map(n => n[0]).join('')}
                        </span>
                      </div>
                      <span className="font-medium text-foreground">{interviewer.name}</span>
                    </div>
                  </td>
                  <td className="py-3 px-4 text-muted-foreground">{interviewer.interviews}</td>
                  <td className="py-3 px-4 text-muted-foreground">{interviewer.avg_eval_time}</td>
                  <td className="py-3 px-4">
                    <div className="flex items-center space-x-2">
                      <div className="w-12 bg-muted rounded-full h-2">
                        <div
                          className="bg-primary h-2 rounded-full"
                          style={{ width: `${interviewer.ai_alignment}%` }}
                        />
                      </div>
                      <span className="text-foreground text-sm">{interviewer.ai_alignment}%</span>
                    </div>
                  </td>
                  <td className="py-3 px-4">
                    <span className={`px-2 py-1 rounded-full text-xs ${
                      interviewer.missed_elements <= 3 ? 'bg-green-500/10 text-green-600' :
                      interviewer.missed_elements <= 5 ? 'bg-yellow-500/10 text-yellow-600' :
                      'bg-red-500/10 text-red-600'
                    }`}>
                      {interviewer.missed_elements}
                    </span>
                  </td>
                  <td className="py-3 px-4">
                    <div className="flex items-center space-x-1">
                      <Star className="w-4 h-4 text-yellow-500 fill-current" />
                      <span className="text-foreground text-sm">{interviewer.rating}</span>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Behavioral Traits Distribution */}
      <div className="bg-card border border-border rounded-xl p-6">
        <h3 className="text-lg font-semibold text-foreground mb-4">Behavioral Traits Distribution by Role</h3>
        <div className="h-64">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={behavioralTraits}>
              <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
              <XAxis dataKey="trait" stroke="hsl(var(--muted-foreground))" fontSize={12} />
              <YAxis stroke="hsl(var(--muted-foreground))" fontSize={12} />
              <Tooltip
                contentStyle={{
                  backgroundColor: 'hsl(var(--card))',
                  border: '1px solid hsl(var(--border))',
                  borderRadius: '8px'
                }}
              />
              <Bar dataKey="engineering" stackId="a" fill="#8b5cf6" name="Engineering" />
              <Bar dataKey="pm" stackId="a" fill="#06b6d4" name="Product Manager" />
              <Bar dataKey="design" stackId="a" fill="#10b981" name="Design" />
              <Bar dataKey="marketing" stackId="a" fill="#f59e0b" name="Marketing" />
            </BarChart>
          </ResponsiveContainer>
        </div>
        <div className="flex justify-center space-x-6 mt-4 text-sm">
          <div className="flex items-center space-x-2">
            <div className="w-3 h-3 bg-purple-500 rounded" />
            <span>Engineering</span>
          </div>
          <div className="flex items-center space-x-2">
            <div className="w-3 h-3 bg-cyan-500 rounded" />
            <span>Product Manager</span>
          </div>
          <div className="flex items-center space-x-2">
            <div className="w-3 h-3 bg-emerald-500 rounded" />
            <span>Design</span>
          </div>
          <div className="flex items-center space-x-2">
            <div className="w-3 h-3 bg-amber-500 rounded" />
            <span>Marketing</span>
          </div>
        </div>
      </div>

      {/* High Performing Templates */}
      <div className="bg-card border border-border rounded-xl p-6">
        <h3 className="text-lg font-semibold text-foreground mb-4">High Performing Templates</h3>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-border">
                <th className="text-left py-3 px-4 font-medium text-foreground">Template</th>
                <th className="text-left py-3 px-4 font-medium text-foreground">Interviews</th>
                <th className="text-left py-3 px-4 font-medium text-foreground">Recommended %</th>
                <th className="text-left py-3 px-4 font-medium text-foreground">Integrity Score</th>
                <th className="text-left py-3 px-4 font-medium text-foreground">Average Score</th>
                <th className="text-left py-3 px-4 font-medium text-foreground">Performance</th>
              </tr>
            </thead>
            <tbody>
              {templatePerformance.map((template, index) => (
                <tr key={index} className="border-b border-border hover:bg-muted/50">
                  <td className="py-3 px-4 font-medium text-foreground">{template.template}</td>
                  <td className="py-3 px-4 text-muted-foreground">{template.interviews}</td>
                  <td className="py-3 px-4">
                    <div className="flex items-center space-x-2">
                      <div className="w-16 bg-muted rounded-full h-2">
                        <div
                          className="bg-green-500 h-2 rounded-full"
                          style={{ width: `${template.recommended_pct}%` }}
                        />
                      </div>
                      <span className="text-foreground text-sm">{template.recommended_pct}%</span>
                    </div>
                  </td>
                  <td className="py-3 px-4 text-muted-foreground">{template.integrity_score}</td>
                  <td className="py-3 px-4 text-muted-foreground">{template.avg_score}</td>
                  <td className="py-3 px-4">
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                      template.recommended_pct >= 75 ? 'bg-green-500/10 text-green-500' :
                      template.recommended_pct >= 65 ? 'bg-yellow-500/10 text-yellow-500' :
                      'bg-red-500/10 text-red-500'
                    }`}>
                      {template.recommended_pct >= 75 ? 'Excellent' :
                       template.recommended_pct >= 65 ? 'Good' :
                       'Needs Improvement'}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Recent Alerts */}
        <div className="lg:col-span-2 bg-card border border-border rounded-xl p-6">
          <h3 className="text-lg font-semibold text-foreground mb-4">Recent Alerts & Notifications</h3>
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

        {/* Quick Actions */}
        <div className="bg-card border border-border rounded-xl p-6">
          <h3 className="text-lg font-semibold text-foreground mb-4">Quick Actions</h3>
          <div className="space-y-3">
            <Link
              to="/template"
              className="flex items-center space-x-3 p-3 bg-muted hover:bg-muted/80 rounded-lg transition-colors"
            >
              <div className="p-2 bg-primary/10 rounded-lg">
                <FileText className="w-4 h-4 text-primary" />
              </div>
              <div>
                <p className="font-medium text-foreground text-sm">Create Template</p>
                <p className="text-xs text-muted-foreground">Set up new job role</p>
              </div>
            </Link>

            <Link
              to="/schedule"
              className="flex items-center space-x-3 p-3 bg-muted hover:bg-muted/80 rounded-lg transition-colors"
            >
              <div className="p-2 bg-green-500/10 rounded-lg">
                <Calendar className="w-4 h-4 text-green-500" />
              </div>
              <div>
                <p className="font-medium text-foreground text-sm">Schedule Interview</p>
                <p className="text-xs text-muted-foreground">Invite candidates</p>
              </div>
            </Link>

            <Link
              to="/report"
              className="flex items-center space-x-3 p-3 bg-muted hover:bg-muted/80 rounded-lg transition-colors"
            >
              <div className="p-2 bg-orange-500/10 rounded-lg">
                <BarChart3 className="w-4 h-4 text-orange-500" />
              </div>
              <div>
                <p className="font-medium text-foreground text-sm">Generate Report</p>
                <p className="text-xs text-muted-foreground">Detailed analytics</p>
              </div>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
