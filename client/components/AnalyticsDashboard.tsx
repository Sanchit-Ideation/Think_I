import { useState } from 'react';
import { 
  TrendingUp, 
  TrendingDown, 
  Minus, 
  Users, 
  CheckCircle2, 
  Clock, 
  Shield, 
  Brain, 
  Award,
  AlertTriangle,
  Plus,
  Calendar,
  FileText,
  Bell,
  Download
} from 'lucide-react';
import { 
  AreaChart, 
  Area, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  Radar,
  FunnelChart,
  Funnel,
  LabelList
} from 'recharts';

// Mock data for the dashboard
const kpiData = [
  {
    title: 'Total Interviews Scheduled',
    value: '1,247',
    change: 12.5,
    icon: Calendar
  },
  {
    title: 'Cancelled Interviews',
    value: '78',
    change: -8.4,
    icon: AlertTriangle
  },
  {
    title: 'Total Interviews Completed',
    value: '1,089',
    change: 8.3,
    icon: CheckCircle2
  },
  {
    title: 'Pending Evaluations',
    value: '158',
    change: -5.2,
    icon: Clock
  }
];

const recommendationData = [
  { title: 'Highly Recommended', count: 342, percentage: 31.4, change: 8.2 },
  { title: 'Recommended', count: 287, percentage: 26.3, change: 3.5 },
  { title: 'Consider', count: 199, percentage: 18.3, change: -2.1 },
  { title: 'Not Recommended', count: 261, percentage: 24.0, change: -12.3 }
];

const funnelData = [
  { name: 'Scheduled', value: 1247, fill: '#8884d8' },
  { name: 'Cancelled', value: 78, fill: '#ff6b6b' },
  { name: 'Interviewed', value: 1089, fill: '#8dd1e1' },
  { name: 'Evaluated', value: 892, fill: '#82ca9d' },
  { name: 'Recommended', value: 342, fill: '#ffc658' }
];

const outcomeData = [
  { month: 'Jan', recommended: 45, consider: 38, rejected: 17 },
  { month: 'Feb', recommended: 52, consider: 35, rejected: 13 },
  { month: 'Mar', recommended: 48, consider: 42, rejected: 10 },
  { month: 'Apr', recommended: 61, consider: 29, rejected: 10 },
  { month: 'May', recommended: 58, consider: 33, rejected: 9 },
  { month: 'Jun', recommended: 65, consider: 28, rejected: 7 }
];

const violationData = [
  { name: 'Lip-sync Detected', value: 12, color: '#ff6b6b' },
  { name: 'Long Silence', value: 28, color: '#4ecdc4' },
  { name: 'Tab Switching', value: 45, color: '#45b7d1' },
  { name: 'Other Device Detected', value: 18, color: '#96ceb4' },
  { name: 'Looking Away Repeatedly', value: 22, color: '#f39c12' }
];

const competencyData = [
  { competency: 'Technical Skills', actual: 85, expected: 80 },
  { competency: 'Communication', actual: 78, expected: 85 },
  { competency: 'Problem Solving', actual: 82, expected: 78 },
  { competency: 'Leadership', actual: 75, expected: 82 },
  { competency: 'Adaptability', actual: 88, expected: 80 },
  { competency: 'Team Collaboration', actual: 80, expected: 85 }
];

const topInterviewers = [
  {
    name: 'Sarah Johnson',
    interviews: 89,
    interviewChange: 12.3,
    avgEvalTime: '45m',
    timeChange: -8.2,
    aiAlignment: 94.2,
    alignmentChange: 3.1,
    missedElements: 2,
    avgScore: 87.4
  },
  {
    name: 'Michael Chen',
    interviews: 76,
    interviewChange: 8.9,
    avgEvalTime: '52m',
    timeChange: 5.1,
    aiAlignment: 91.8,
    alignmentChange: 1.4,
    missedElements: 1,
    avgScore: 89.2
  },
  {
    name: 'Emily Rodriguez',
    interviews: 82,
    interviewChange: -2.1,
    avgEvalTime: '38m',
    timeChange: -12.4,
    aiAlignment: 89.5,
    alignmentChange: -1.8,
    missedElements: 3,
    avgScore: 84.7
  }
];

const topTemplates = [
  {
    name: 'Senior Software Engineer',
    interviews: 156,
    interviewChange: 18.2,
    effectiveness: 91.4,
    utilizationRate: 68.2,
    integrity: 91.2,
    performance: 'up'
  },
  {
    name: 'Product Manager',
    interviews: 132,
    interviewChange: 12.1,
    effectiveness: 94.8,
    utilizationRate: 72.1,
    integrity: 93.8,
    performance: 'up'
  },
  {
    name: 'Data Scientist',
    interviews: 94,
    interviewChange: -5.3,
    effectiveness: 87.3,
    utilizationRate: 64.9,
    integrity: 88.6,
    performance: 'down'
  }
];

const recentAlerts = [
  {
    type: 'warning',
    message: 'Template "Product Manager V1" has highest not recommended rate (45%)',
    time: '2 hours ago',
    icon: AlertTriangle
  },
  {
    type: 'success',
    message: 'Template "Frontend Developer" updated successfully',
    time: '6 hours ago',
    icon: CheckCircle2
  },
  {
    type: 'warning',
    message: 'Template "Data Scientist V2" showing increased rejection trend (38%)',
    time: '1 day ago',
    icon: AlertTriangle
  }
];

// Upcoming interviews data
const upcomingInterviews = [
  {
    candidate: 'Alex Thompson',
    role: 'Senior Frontend Developer',
    interviewer: 'Sarah Johnson',
    time: 'Today, 2:30 PM',
    status: 'confirmed'
  },
  {
    candidate: 'Maria Lopez',
    role: 'Product Manager',
    interviewer: 'Michael Chen',
    time: 'Today, 4:00 PM',
    status: 'confirmed'
  },
  {
    candidate: 'David Kim',
    role: 'Data Scientist',
    interviewer: 'Emily Rodriguez',
    time: 'Tomorrow, 10:00 AM',
    status: 'pending'
  },
  {
    candidate: 'Lisa Wang',
    role: 'UX Designer',
    interviewer: 'Sarah Johnson',
    time: 'Tomorrow, 3:00 PM',
    status: 'confirmed'
  }
];

const ChangeIndicator = ({ value }: { value: number }) => {
  if (value > 0) {
    return (
      <div className="flex items-center text-green-600">
        <TrendingUp className="w-3 h-3 mr-1" />
        <span className="text-xs font-medium">+{value}%</span>
      </div>
    );
  } else if (value < 0) {
    return (
      <div className="flex items-center text-red-600">
        <TrendingDown className="w-3 h-3 mr-1" />
        <span className="text-xs font-medium">{value}%</span>
      </div>
    );
  } else {
    return (
      <div className="flex items-center text-gray-500">
        <Minus className="w-3 h-3 mr-1" />
        <span className="text-xs font-medium">0%</span>
      </div>
    );
  }
};

export default function AnalyticsDashboard() {
  const [timePeriod, setTimePeriod] = useState('30d');

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Interview Analytics Dashboard</h1>
          <p className="text-muted-foreground">Real-time insights and performance metrics</p>
        </div>
        <div className="flex items-center space-x-3">
          <input
            type="date"
            className="bg-card border border-border rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary"
            title="Select specific date for insights"
          />
          <select
            value={timePeriod}
            onChange={(e) => setTimePeriod(e.target.value)}
            className="bg-card border border-border rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary"
          >
            <option value="7d">Last 7 days</option>
            <option value="30d">Last 30 days</option>
            <option value="90d">Last 90 days</option>
          </select>
        </div>
      </div>

      {/* KPI Row */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {kpiData.map((kpi, index) => {
          const Icon = kpi.icon;
          return (
            <div key={index} className="bg-card border border-border rounded-xl p-6">
              <div className="flex items-center justify-between mb-2">
                <Icon className="w-5 h-5 text-primary" />
                <ChangeIndicator value={kpi.change} />
              </div>
              <div className="space-y-1">
                <p className="text-2xl font-bold text-foreground">{kpi.value}</p>
                <p className="text-sm text-muted-foreground">{kpi.title}</p>
              </div>
            </div>
          );
        })}
      </div>

      {/* Upcoming Interviews and Recommendation Summary */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Upcoming Interviews */}
        <div className="bg-card border border-border rounded-xl p-6">
          <h3 className="text-lg font-semibold text-foreground mb-6">Upcoming Interviews</h3>
          <div className="space-y-4">
            {upcomingInterviews.map((interview, index) => (
              <div key={index} className="flex items-center justify-between p-4 bg-muted rounded-lg">
                <div className="flex-1">
                  <div className="font-medium text-foreground">{interview.candidate}</div>
                  <div className="text-sm text-muted-foreground">{interview.role}</div>
                  <div className="text-sm text-muted-foreground">with {interview.interviewer}</div>
                </div>
                <div className="text-right">
                  <div className="text-sm font-medium text-foreground">{interview.time}</div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Recommendation Summary */}
        <div className="bg-card border border-border rounded-xl p-6">
          <h3 className="text-lg font-semibold text-foreground mb-6">Recommendation Summary</h3>
          <div className="grid grid-cols-1 gap-4">
            {recommendationData.map((item, index) => (
              <div key={index} className="flex items-center justify-between p-4 bg-muted rounded-lg">
                <div className="flex items-center space-x-3">
                  <div className="text-2xl font-bold text-foreground">{item.count}</div>
                  <div>
                    <div className="font-medium text-foreground">{item.title}</div>
                    <div className="text-sm text-muted-foreground">{item.percentage}% of total</div>
                  </div>
                </div>
                <ChangeIndicator value={item.change} />
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Charts Row */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Interview Funnel */}
        <div className="bg-card border border-border rounded-xl p-6">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-lg font-semibold text-foreground">Interview Funnel</h3>
            <div className="text-sm text-muted-foreground">
              Conversion Rate: 11.0% <ChangeIndicator value={2.3} />
            </div>
          </div>
          <ResponsiveContainer width="100%" height={300}>
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

        {/* Session Integrity Violations */}
        <div className="bg-card border border-border rounded-xl p-6">
          <h3 className="text-lg font-semibold text-foreground mb-6">Session Integrity Violations</h3>
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={violationData}
                cx="50%"
                cy="50%"
                outerRadius={80}
                fill="#8884d8"
                dataKey="value"
                label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
              >
                {violationData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Charts Row 2 */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Interview Outcome Trends */}
        <div className="bg-card border border-border rounded-xl p-6">
          <h3 className="text-lg font-semibold text-foreground mb-6">Interview Outcome Trends</h3>
          <ResponsiveContainer width="100%" height={300}>
            <AreaChart data={outcomeData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="month" />
              <YAxis />
              <Tooltip />
              <Area type="monotone" dataKey="recommended" stackId="1" stroke="#82ca9d" fill="#82ca9d" />
              <Area type="monotone" dataKey="consider" stackId="1" stroke="#8dd1e1" fill="#8dd1e1" />
              <Area type="monotone" dataKey="rejected" stackId="1" stroke="#ff6b6b" fill="#ff6b6b" />
            </AreaChart>
          </ResponsiveContainer>
        </div>

        {/* Competency Performance */}
        <div className="bg-card border border-border rounded-xl p-6">
          <h3 className="text-lg font-semibold text-foreground mb-6">Competency Performance vs. Expected</h3>
          <ResponsiveContainer width="100%" height={300}>
            <RadarChart data={competencyData}>
              <PolarGrid />
              <PolarAngleAxis dataKey="competency" />
              <PolarRadiusAxis angle={90} domain={[0, 100]} />
              <Radar name="Actual" dataKey="actual" stroke="#8884d8" fill="#8884d8" fillOpacity={0.6} />
              <Radar name="Expected" dataKey="expected" stroke="#82ca9d" fill="#82ca9d" fillOpacity={0.2} />
              <Tooltip />
            </RadarChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Tables Row */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Top Interviewers Performance */}
        <div className="bg-card border border-border rounded-xl p-6">
          <h3 className="text-lg font-semibold text-foreground mb-6">Top Interviewers Performance</h3>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-border">
                  <th className="text-left py-3 px-2 font-medium text-foreground">Interviewer</th>
                  <th className="text-left py-3 px-2 font-medium text-foreground">Interviews</th>
                  <th className="text-left py-3 px-2 font-medium text-foreground">Avg. Time</th>
                  <th className="text-left py-3 px-2 font-medium text-foreground">AI Alignment</th>
                  <th className="text-left py-3 px-2 font-medium text-foreground">Avg Score</th>
                </tr>
              </thead>
              <tbody>
                {topInterviewers.map((interviewer, index) => (
                  <tr key={index} className="border-b border-border">
                    <td className="py-3 px-2">
                      <div className="font-medium text-foreground">{interviewer.name}</div>
                      <div className="text-xs text-muted-foreground">{interviewer.missedElements} missed elements</div>
                    </td>
                    <td className="py-3 px-2">
                      <div className="font-medium text-foreground">{interviewer.interviews}</div>
                      <ChangeIndicator value={interviewer.interviewChange} />
                    </td>
                    <td className="py-3 px-2">
                      <div className="font-medium text-foreground">{interviewer.avgEvalTime}</div>
                      <ChangeIndicator value={interviewer.timeChange} />
                    </td>
                    <td className="py-3 px-2">
                      <div className="font-medium text-foreground">{interviewer.aiAlignment}%</div>
                      <ChangeIndicator value={interviewer.alignmentChange} />
                    </td>
                    <td className="py-3 px-2">
                      <div className="font-medium text-foreground">{interviewer.avgScore}%</div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* High Performing Templates */}
        <div className="bg-card border border-border rounded-xl p-6">
          <h3 className="text-lg font-semibold text-foreground mb-6">High Performing Templates</h3>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-border">
                  <th className="text-left py-3 px-2 font-medium text-foreground">Template</th>
                  <th className="text-left py-3 px-2 font-medium text-foreground">Interviews</th>
                  <th className="text-left py-3 px-2 font-medium text-foreground">Effectiveness</th>
                <th className="text-left py-3 px-2 font-medium text-foreground">Utilization Rate</th>
                  <th className="text-left py-3 px-2 font-medium text-foreground">Performance</th>
                </tr>
              </thead>
              <tbody>
                {topTemplates.map((template, index) => (
                  <tr key={index} className="border-b border-border">
                    <td className="py-3 px-2">
                      <div className="font-medium text-foreground">{template.name}</div>
                      <div className="text-xs text-muted-foreground">Integrity: {template.integrity}%</div>
                    </td>
                    <td className="py-3 px-2">
                      <div className="font-medium text-foreground">{template.interviews}</div>
                      <ChangeIndicator value={template.interviewChange} />
                    </td>
                    <td className="py-3 px-2">
                      <div className="font-medium text-foreground">{template.effectiveness}%</div>
                    </td>
                    <td className="py-3 px-2">
                      <div className="font-medium text-foreground">{template.utilizationRate}%</div>
                    </td>
                    <td className="py-3 px-2">
                      {template.performance === 'up' ? (
                        <TrendingUp className="w-5 h-5 text-green-600" />
                      ) : (
                        <TrendingDown className="w-5 h-5 text-red-600" />
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* Footer Sections */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Recent Alerts & Notifications */}
        <div className="bg-card border border-border rounded-xl p-6">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-lg font-semibold text-foreground">Recent Alerts & Notifications</h3>
            <Bell className="w-5 h-5 text-muted-foreground" />
          </div>
          <div className="space-y-4">
            {recentAlerts.map((alert, index) => {
              const Icon = alert.icon;
              return (
                <div key={index} className="flex items-start space-x-3 p-3 bg-muted rounded-lg">
                  <Icon className={`w-5 h-5 mt-0.5 ${
                    alert.type === 'warning' ? 'text-yellow-500' :
                    alert.type === 'success' ? 'text-green-500' : 'text-blue-500'
                  }`} />
                  <div className="flex-1">
                    <p className="text-sm font-medium text-foreground">{alert.message}</p>
                    <p className="text-xs text-muted-foreground">{alert.time}</p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Quick Actions */}
        <div className="bg-card border border-border rounded-xl p-6">
          <h3 className="text-lg font-semibold text-foreground mb-6">Quick Actions</h3>
          <div className="grid grid-cols-1 gap-3">
            <button className="flex items-center space-x-3 p-4 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition-colors">
              <Plus className="w-5 h-5" />
              <span className="font-medium">Create Template</span>
            </button>
            <button className="flex items-center space-x-3 p-4 bg-secondary text-secondary-foreground rounded-lg hover:bg-secondary/80 transition-colors">
              <Calendar className="w-5 h-5" />
              <span className="font-medium">Schedule Interview</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
