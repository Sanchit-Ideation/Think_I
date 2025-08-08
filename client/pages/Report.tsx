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
  ScatterChart,
  Scatter,
  ComposedChart,
  Area,
  AreaChart
} from 'recharts';
import {
  Download,
  Filter,
  Calendar,
  TrendingUp,
  Users,
  Award,
  Clock,
  Target,
  Brain,
  Shield,
  Eye,
  FileText,
  Search
} from 'lucide-react';

const reportTypes = [
  { id: 'session', name: 'Session Analytics', icon: Clock },
  { id: 'job', name: 'Job Role Analytics', icon: Target },
  { id: 'interviewer', name: 'Interviewer Performance', icon: Users },
  { id: 'candidate', name: 'Candidate Analytics', icon: Award }
];

const sessionAnalytics = [
  { date: '2024-12-01', sessions: 45, completion_rate: 87, avg_score: 78, duration: 52 },
  { date: '2024-12-02', sessions: 52, completion_rate: 91, avg_score: 82, duration: 48 },
  { date: '2024-12-03', sessions: 38, completion_rate: 85, avg_score: 79, duration: 55 },
  { date: '2024-12-04', sessions: 61, completion_rate: 89, avg_score: 84, duration: 51 },
  { date: '2024-12-05', sessions: 47, completion_rate: 93, avg_score: 86, duration: 49 },
  { date: '2024-12-06', sessions: 54, completion_rate: 88, avg_score: 81, duration: 53 },
  { date: '2024-12-07', sessions: 43, completion_rate: 92, avg_score: 83, duration: 50 }
];

const jobRoleAnalytics = [
  { role: 'Software Engineer', interviews: 847, hired: 89, pass_rate: 68, avg_score: 78, time_to_hire: 18 },
  { role: 'Product Manager', interviews: 423, hired: 67, pass_rate: 72, avg_score: 82, time_to_hire: 22 },
  { role: 'Data Scientist', interviews: 356, hired: 52, pass_rate: 65, avg_score: 76, time_to_hire: 25 },
  { role: 'UX Designer', interviews: 298, hired: 78, pass_rate: 78, avg_score: 84, time_to_hire: 20 },
  { role: 'DevOps Engineer', interviews: 167, hired: 34, pass_rate: 81, avg_score: 87, time_to_hire: 16 }
];

const interviewerPerformance = [
  { name: 'John Smith', interviews: 234, avg_score: 82, consistency: 94, feedback_rating: 4.7, department: 'Engineering' },
  { name: 'Emily Davis', interviews: 189, avg_score: 85, consistency: 91, feedback_rating: 4.8, department: 'Product' },
  { name: 'Alex Wilson', interviews: 156, avg_score: 79, consistency: 88, feedback_rating: 4.5, department: 'Design' },
  { name: 'Lisa Brown', interviews: 198, avg_score: 87, consistency: 96, feedback_rating: 4.9, department: 'Engineering' },
  { name: 'Mark Johnson', interviews: 167, avg_score: 81, consistency: 89, feedback_rating: 4.6, department: 'Product' }
];

const candidateInsights = [
  { score_range: '90-100', count: 89, hire_rate: 95, avg_experience: 8.2 },
  { score_range: '80-89', count: 234, hire_rate: 78, avg_experience: 6.8 },
  { score_range: '70-79', count: 456, hire_rate: 52, avg_experience: 5.4 },
  { score_range: '60-69', count: 298, hire_rate: 23, avg_experience: 4.1 },
  { score_range: '50-59', count: 167, hire_rate: 8, avg_experience: 3.2 }
];

const skillsAnalysis = [
  { skill: 'Technical Skills', avg_score: 78, difficulty: 'High', success_rate: 65 },
  { skill: 'Communication', avg_score: 85, difficulty: 'Medium', success_rate: 82 },
  { skill: 'Problem Solving', avg_score: 76, difficulty: 'High', success_rate: 68 },
  { skill: 'Leadership', avg_score: 71, difficulty: 'Medium', success_rate: 59 },
  { skill: 'Cultural Fit', avg_score: 88, difficulty: 'Low', success_rate: 91 },
  { skill: 'Innovation', avg_score: 74, difficulty: 'High', success_rate: 62 }
];

const integrityMetrics = [
  { month: 'Aug', authentic: 92, suspicious: 6, flagged: 2 },
  { month: 'Sep', authentic: 89, suspicious: 8, flagged: 3 },
  { month: 'Oct', authentic: 94, suspicious: 4, flagged: 2 },
  { month: 'Nov', authentic: 91, suspicious: 7, flagged: 2 },
  { month: 'Dec', authentic: 96, suspicious: 3, flagged: 1 }
];

export default function Report() {
  const [activeReport, setActiveReport] = useState('session');
  const [timeRange, setTimeRange] = useState('7d');
  const [selectedDepartment, setSelectedDepartment] = useState('all');

  const departments = ['all', 'Engineering', 'Product', 'Design', 'Marketing', 'Sales'];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Analytics Reports</h1>
          <p className="text-muted-foreground">Comprehensive insights for data-driven hiring decisions</p>
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
          <button className="flex items-center space-x-2 px-4 py-2 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition-colors">
            <Download className="w-4 h-4" />
            <span>Export Report</span>
          </button>
        </div>
      </div>

      {/* Report Type Selector */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        {reportTypes.map((type) => {
          const IconComponent = type.icon;
          return (
            <button
              key={type.id}
              onClick={() => setActiveReport(type.id)}
              className={`flex items-center space-x-3 p-4 rounded-xl border transition-all ${
                activeReport === type.id
                  ? 'bg-primary text-primary-foreground border-primary'
                  : 'bg-card border-border hover:bg-muted'
              }`}
            >
              <IconComponent className="w-5 h-5" />
              <span className="font-medium">{type.name}</span>
            </button>
          );
        })}
      </div>

      {/* Session Analytics */}
      {activeReport === 'session' && (
        <div className="space-y-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Session Trends */}
            <div className="bg-card border border-border rounded-xl p-6">
              <h3 className="text-lg font-semibold text-foreground mb-4">Session Trends</h3>
              <div className="h-64">
                <ResponsiveContainer width="100%" height="100%">
                  <ComposedChart data={sessionAnalytics}>
                    <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                    <XAxis dataKey="date" stroke="hsl(var(--muted-foreground))" fontSize={12} />
                    <YAxis stroke="hsl(var(--muted-foreground))" fontSize={12} />
                    <Tooltip
                      contentStyle={{
                        backgroundColor: 'hsl(var(--card))',
                        border: '1px solid hsl(var(--border))',
                        borderRadius: '8px'
                      }}
                    />
                    <Bar dataKey="sessions" fill="hsl(var(--primary))" name="Sessions" />
                    <Line
                      type="monotone"
                      dataKey="completion_rate"
                      stroke="#22c55e"
                      strokeWidth={2}
                      name="Completion Rate"
                    />
                  </ComposedChart>
                </ResponsiveContainer>
              </div>
            </div>

            {/* Score Distribution */}
            <div className="bg-card border border-border rounded-xl p-6">
              <h3 className="text-lg font-semibold text-foreground mb-4">Average Scores vs Duration</h3>
              <div className="h-64">
                <ResponsiveContainer width="100%" height="100%">
                  <ScatterChart data={sessionAnalytics}>
                    <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                    <XAxis dataKey="duration" stroke="hsl(var(--muted-foreground))" fontSize={12} name="Duration (min)" />
                    <YAxis dataKey="avg_score" stroke="hsl(var(--muted-foreground))" fontSize={12} name="Avg Score" />
                    <Tooltip cursor={{ strokeDasharray: '3 3' }} />
                    <Scatter dataKey="avg_score" fill="hsl(var(--primary))" />
                  </ScatterChart>
                </ResponsiveContainer>
              </div>
            </div>
          </div>

          {/* Skills Performance */}
          <div className="bg-card border border-border rounded-xl p-6">
            <h3 className="text-lg font-semibold text-foreground mb-4">Skills Performance Analysis</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {skillsAnalysis.map((skill, index) => (
                <div key={index} className="p-4 bg-muted rounded-lg">
                  <div className="flex items-center justify-between mb-2">
                    <h4 className="font-medium text-foreground">{skill.skill}</h4>
                    <span className={`px-2 py-1 rounded-full text-xs ${
                      skill.difficulty === 'High' ? 'bg-red-500/10 text-red-500' :
                      skill.difficulty === 'Medium' ? 'bg-yellow-500/10 text-yellow-500' :
                      'bg-green-500/10 text-green-500'
                    }`}>
                      {skill.difficulty}
                    </span>
                  </div>
                  <div className="space-y-2">
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-muted-foreground">Avg Score</span>
                      <span className="text-foreground">{skill.avg_score}%</span>
                    </div>
                    <div className="bg-background rounded-full h-2">
                      <div
                        className="bg-primary h-2 rounded-full"
                        style={{ width: `${skill.avg_score}%` }}
                      />
                    </div>
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-muted-foreground">Success Rate</span>
                      <span className="text-foreground">{skill.success_rate}%</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Job Role Analytics */}
      {activeReport === 'job' && (
        <div className="space-y-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Hiring Efficiency */}
            <div className="bg-card border border-border rounded-xl p-6">
              <h3 className="text-lg font-semibold text-foreground mb-4">Hiring Efficiency by Role</h3>
              <div className="h-64">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={jobRoleAnalytics} layout="horizontal">
                    <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                    <XAxis type="number" stroke="hsl(var(--muted-foreground))" fontSize={12} />
                    <YAxis dataKey="role" type="category" stroke="hsl(var(--muted-foreground))" fontSize={10} width={100} />
                    <Tooltip
                      contentStyle={{
                        backgroundColor: 'hsl(var(--card))',
                        border: '1px solid hsl(var(--border))',
                        borderRadius: '8px'
                      }}
                    />
                    <Bar dataKey="pass_rate" fill="hsl(var(--primary))" name="Pass Rate %" />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </div>

            {/* Time to Hire */}
            <div className="bg-card border border-border rounded-xl p-6">
              <h3 className="text-lg font-semibold text-foreground mb-4">Time to Hire Analysis</h3>
              <div className="h-64">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={jobRoleAnalytics}>
                    <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                    <XAxis dataKey="role" stroke="hsl(var(--muted-foreground))" fontSize={10} angle={-45} textAnchor="end" height={80} />
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
                      dataKey="time_to_hire"
                      stroke="#f59e0b"
                      strokeWidth={3}
                      dot={{ fill: '#f59e0b', strokeWidth: 2, r: 6 }}
                    />
                  </LineChart>
                </ResponsiveContainer>
              </div>
            </div>
          </div>

          {/* Job Role Performance Table */}
          <div className="bg-card border border-border rounded-xl p-6">
            <h3 className="text-lg font-semibold text-foreground mb-4">Detailed Job Role Performance</h3>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-border">
                    <th className="text-left py-3 px-4 font-medium text-foreground">Role</th>
                    <th className="text-left py-3 px-4 font-medium text-foreground">Interviews</th>
                    <th className="text-left py-3 px-4 font-medium text-foreground">Hired</th>
                    <th className="text-left py-3 px-4 font-medium text-foreground">Pass Rate</th>
                    <th className="text-left py-3 px-4 font-medium text-foreground">Avg Score</th>
                    <th className="text-left py-3 px-4 font-medium text-foreground">Time to Hire</th>
                    <th className="text-left py-3 px-4 font-medium text-foreground">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {jobRoleAnalytics.map((role, index) => (
                    <tr key={index} className="border-b border-border hover:bg-muted/50">
                      <td className="py-3 px-4 font-medium text-foreground">{role.role}</td>
                      <td className="py-3 px-4 text-muted-foreground">{role.interviews}</td>
                      <td className="py-3 px-4 text-muted-foreground">{role.hired}</td>
                      <td className="py-3 px-4">
                        <span className={`px-2 py-1 rounded-full text-xs ${
                          role.pass_rate >= 75 ? 'bg-green-500/10 text-green-500' :
                          role.pass_rate >= 60 ? 'bg-yellow-500/10 text-yellow-500' :
                          'bg-red-500/10 text-red-500'
                        }`}>
                          {role.pass_rate}%
                        </span>
                      </td>
                      <td className="py-3 px-4 text-muted-foreground">{role.avg_score}</td>
                      <td className="py-3 px-4 text-muted-foreground">{role.time_to_hire} days</td>
                      <td className="py-3 px-4">
                        <Link
                          to={`/sessions?role=${encodeURIComponent(role.role)}`}
                          className="text-primary hover:text-primary/80 text-sm"
                        >
                          View Details
                        </Link>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}

      {/* Interviewer Performance */}
      {activeReport === 'interviewer' && (
        <div className="space-y-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Interviewer Consistency */}
            <div className="bg-card border border-border rounded-xl p-6">
              <h3 className="text-lg font-semibold text-foreground mb-4">Interviewer Consistency</h3>
              <div className="h-64">
                <ResponsiveContainer width="100%" height="100%">
                  <ScatterChart data={interviewerPerformance}>
                    <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                    <XAxis dataKey="consistency" stroke="hsl(var(--muted-foreground))" fontSize={12} name="Consistency %" />
                    <YAxis dataKey="avg_score" stroke="hsl(var(--muted-foreground))" fontSize={12} name="Avg Score" />
                    <Tooltip cursor={{ strokeDasharray: '3 3' }} />
                    <Scatter dataKey="avg_score" fill="hsl(var(--primary))" />
                  </ScatterChart>
                </ResponsiveContainer>
              </div>
            </div>

            {/* Feedback Ratings */}
            <div className="bg-card border border-border rounded-xl p-6">
              <h3 className="text-lg font-semibold text-foreground mb-4">Interviewer Feedback Ratings</h3>
              <div className="space-y-4">
                {interviewerPerformance.map((interviewer, index) => (
                  <div key={index} className="flex items-center justify-between p-3 bg-muted rounded-lg">
                    <div>
                      <div className="font-medium text-foreground">{interviewer.name}</div>
                      <div className="text-sm text-muted-foreground">{interviewer.department}</div>
                    </div>
                    <div className="flex items-center space-x-4">
                      <div className="text-center">
                        <div className="text-sm font-medium text-foreground">{interviewer.interviews}</div>
                        <div className="text-xs text-muted-foreground">Interviews</div>
                      </div>
                      <div className="text-center">
                        <div className="text-sm font-medium text-foreground">{interviewer.feedback_rating}</div>
                        <div className="text-xs text-muted-foreground">Rating</div>
                      </div>
                      <div className="flex">
                        {Array.from({ length: 5 }, (_, i) => (
                          <span
                            key={i}
                            className={`text-sm ${
                              i < Math.floor(interviewer.feedback_rating) ? 'text-yellow-500' : 'text-muted'
                            }`}
                          >
                            ★
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Performance Metrics */}
          <div className="bg-card border border-border rounded-xl p-6">
            <h3 className="text-lg font-semibold text-foreground mb-4">Performance Comparison</h3>
            <div className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={interviewerPerformance}>
                  <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                  <XAxis dataKey="name" stroke="hsl(var(--muted-foreground))" fontSize={10} angle={-45} textAnchor="end" height={80} />
                  <YAxis stroke="hsl(var(--muted-foreground))" fontSize={12} />
                  <Tooltip
                    contentStyle={{
                      backgroundColor: 'hsl(var(--card))',
                      border: '1px solid hsl(var(--border))',
                      borderRadius: '8px'
                    }}
                  />
                  <Bar dataKey="avg_score" fill="hsl(var(--primary))" name="Avg Score" />
                  <Bar dataKey="consistency" fill="#22c55e" name="Consistency" />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>
      )}

      {/* Candidate Analytics */}
      {activeReport === 'candidate' && (
        <div className="space-y-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Score Distribution */}
            <div className="bg-card border border-border rounded-xl p-6">
              <h3 className="text-lg font-semibold text-foreground mb-4">Score Distribution & Hire Rate</h3>
              <div className="h-64">
                <ResponsiveContainer width="100%" height="100%">
                  <ComposedChart data={candidateInsights}>
                    <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                    <XAxis dataKey="score_range" stroke="hsl(var(--muted-foreground))" fontSize={12} />
                    <YAxis stroke="hsl(var(--muted-foreground))" fontSize={12} />
                    <Tooltip
                      contentStyle={{
                        backgroundColor: 'hsl(var(--card))',
                        border: '1px solid hsl(var(--border))',
                        borderRadius: '8px'
                      }}
                    />
                    <Bar dataKey="count" fill="hsl(var(--primary))" name="Candidates" />
                    <Line
                      type="monotone"
                      dataKey="hire_rate"
                      stroke="#22c55e"
                      strokeWidth={3}
                      name="Hire Rate %"
                    />
                  </ComposedChart>
                </ResponsiveContainer>
              </div>
            </div>

            {/* Integrity Trends */}
            <div className="bg-card border border-border rounded-xl p-6">
              <h3 className="text-lg font-semibold text-foreground mb-4">Integrity Trends</h3>
              <div className="h-64">
                <ResponsiveContainer width="100%" height="100%">
                  <AreaChart data={integrityMetrics}>
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
                      dataKey="authentic"
                      stackId="1"
                      stroke="#22c55e"
                      fill="#22c55e"
                      fillOpacity={0.6}
                    />
                    <Area
                      type="monotone"
                      dataKey="suspicious"
                      stackId="1"
                      stroke="#f59e0b"
                      fill="#f59e0b"
                      fillOpacity={0.6}
                    />
                    <Area
                      type="monotone"
                      dataKey="flagged"
                      stackId="1"
                      stroke="#ef4444"
                      fill="#ef4444"
                      fillOpacity={0.6}
                    />
                  </AreaChart>
                </ResponsiveContainer>
              </div>
            </div>
          </div>

          {/* Candidate Insights Table */}
          <div className="bg-card border border-border rounded-xl p-6">
            <h3 className="text-lg font-semibold text-foreground mb-4">Candidate Performance Insights</h3>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-border">
                    <th className="text-left py-3 px-4 font-medium text-foreground">Score Range</th>
                    <th className="text-left py-3 px-4 font-medium text-foreground">Candidates</th>
                    <th className="text-left py-3 px-4 font-medium text-foreground">Hire Rate</th>
                    <th className="text-left py-3 px-4 font-medium text-foreground">Avg Experience</th>
                    <th className="text-left py-3 px-4 font-medium text-foreground">Recommendation</th>
                  </tr>
                </thead>
                <tbody>
                  {candidateInsights.map((insight, index) => (
                    <tr key={index} className="border-b border-border hover:bg-muted/50">
                      <td className="py-3 px-4 font-medium text-foreground">{insight.score_range}</td>
                      <td className="py-3 px-4 text-muted-foreground">{insight.count}</td>
                      <td className="py-3 px-4">
                        <span className={`px-2 py-1 rounded-full text-xs ${
                          insight.hire_rate >= 80 ? 'bg-green-500/10 text-green-500' :
                          insight.hire_rate >= 50 ? 'bg-yellow-500/10 text-yellow-500' :
                          'bg-red-500/10 text-red-500'
                        }`}>
                          {insight.hire_rate}%
                        </span>
                      </td>
                      <td className="py-3 px-4 text-muted-foreground">{insight.avg_experience} years</td>
                      <td className="py-3 px-4">
                        <span className={`px-2 py-1 rounded-full text-xs ${
                          insight.hire_rate >= 80 ? 'bg-green-500/10 text-green-500' :
                          insight.hire_rate >= 50 ? 'bg-yellow-500/10 text-yellow-500' :
                          'bg-red-500/10 text-red-500'
                        }`}>
                          {insight.hire_rate >= 80 ? 'Strong Pool' :
                           insight.hire_rate >= 50 ? 'Mixed Results' :
                           'Needs Improvement'}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}

      {/* Export Options */}
      <div className="bg-card border border-border rounded-xl p-6">
        <h3 className="text-lg font-semibold text-foreground mb-4">Export & Share</h3>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <button className="flex items-center space-x-3 p-4 bg-muted hover:bg-muted/80 rounded-lg transition-colors">
            <FileText className="w-5 h-5 text-primary" />
            <div className="text-left">
              <div className="font-medium text-foreground">PDF Report</div>
              <div className="text-sm text-muted-foreground">Comprehensive analysis</div>
            </div>
          </button>
          <button className="flex items-center space-x-3 p-4 bg-muted hover:bg-muted/80 rounded-lg transition-colors">
            <FileText className="w-5 h-5 text-green-500" />
            <div className="text-left">
              <div className="font-medium text-foreground">Excel Export</div>
              <div className="text-sm text-muted-foreground">Raw data & charts</div>
            </div>
          </button>
          <button className="flex items-center space-x-3 p-4 bg-muted hover:bg-muted/80 rounded-lg transition-colors">
            <Eye className="w-5 h-5 text-blue-500" />
            <div className="text-left">
              <div className="font-medium text-foreground">Dashboard Link</div>
              <div className="text-sm text-muted-foreground">Shareable URL</div>
            </div>
          </button>
          <button className="flex items-center space-x-3 p-4 bg-muted hover:bg-muted/80 rounded-lg transition-colors">
            <Calendar className="w-5 h-5 text-orange-500" />
            <div className="text-left">
              <div className="font-medium text-foreground">Schedule Report</div>
              <div className="text-sm text-muted-foreground">Automated delivery</div>
            </div>
          </button>
        </div>
      </div>
    </div>
  );
}
