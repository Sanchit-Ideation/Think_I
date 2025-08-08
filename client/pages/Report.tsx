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
  User,
  Search
} from 'lucide-react';

const reportTabs = [
  { id: 'session', name: 'Session (Candidate Insights)', icon: Users },
  { id: 'template', name: 'Template Insights', icon: FileText },
  { id: 'interviewer', name: 'Interviewer Insights', icon: User }
];

// Session/Candidate data
const candidatePerformance = [
  { name: 'Sarah Johnson', ai_score: 87, interviewer_score: 85, behavioral_score: 92, integrity: 'Clean', verdict: 'Highly Recommended' },
  { name: 'Michael Chen', ai_score: 78, interviewer_score: 82, behavioral_score: 85, integrity: 'Clean', verdict: 'Consider' },
  { name: 'Emily Rodriguez', ai_score: 92, interviewer_score: 89, behavioral_score: 88, integrity: 'Clean', verdict: 'Highly Recommended' },
  { name: 'David Kim', ai_score: 65, interviewer_score: 70, behavioral_score: 72, integrity: 'Suspicious', verdict: 'Not Recommended' },
  { name: 'Anna Thompson', ai_score: 89, interviewer_score: 91, behavioral_score: 94, integrity: 'Clean', verdict: 'Highly Recommended' }
];

const sessionTrends = [
  { week: 'Week 1', total_sessions: 45, avg_ai_score: 78, avg_interviewer_score: 82, completion_rate: 87 },
  { week: 'Week 2', total_sessions: 52, avg_ai_score: 81, avg_interviewer_score: 79, completion_rate: 91 },
  { week: 'Week 3', total_sessions: 48, avg_ai_score: 84, avg_interviewer_score: 85, completion_rate: 89 },
  { week: 'Week 4', total_sessions: 61, avg_ai_score: 86, avg_interviewer_score: 88, completion_rate: 93 }
];

// Template insights data
const templateComparison = [
  { template: 'Software Engineer V1', candidates: 234, hired: 89, success_rate: 68, avg_score: 78, time_to_hire: 18 },
  { template: 'Software Engineer V2', candidates: 189, hired: 142, success_rate: 85, avg_score: 84, time_to_hire: 14 },
  { template: 'Product Manager V1', candidates: 156, hired: 89, success_rate: 72, avg_score: 82, time_to_hire: 22 },
  { template: 'Product Manager V2', candidates: 123, hired: 98, success_rate: 79, avg_score: 86, time_to_hire: 19 }
];

const templateFeatureImpact = [
  { feature: 'Technical Assessment', impact_score: 92, usage_rate: 98 },
  { feature: 'Behavioral Questions', impact_score: 87, usage_rate: 95 },
  { feature: 'System Design', impact_score: 89, usage_rate: 78 },
  { feature: 'Code Review', impact_score: 94, usage_rate: 89 },
  { feature: 'Cultural Fit', impact_score: 85, usage_rate: 92 },
  { feature: 'Portfolio Review', impact_score: 91, usage_rate: 67 }
];

// Interviewer insights data
const interviewerMetrics = [
  { name: 'John Smith', interviews: 234, avg_score: 82, consistency: 94, candidate_feedback: 4.7, improvement_areas: ['Time Management', 'Technical Depth'] },
  { name: 'Emily Davis', interviews: 189, avg_score: 85, consistency: 91, candidate_feedback: 4.8, improvement_areas: ['Question Variety'] },
  { name: 'Alex Wilson', interviews: 156, avg_score: 79, consistency: 88, candidate_feedback: 4.5, improvement_areas: ['Communication Clarity', 'Follow-up Questions'] },
  { name: 'Lisa Brown', interviews: 198, avg_score: 87, consistency: 96, candidate_feedback: 4.9, improvement_areas: ['None - Excellent Performance'] },
  { name: 'Mark Johnson', interviews: 167, avg_score: 81, consistency: 89, candidate_feedback: 4.6, improvement_areas: ['Bias Awareness', 'Note Taking'] }
];

const interviewerSkillAnalysis = [
  { skill: 'Question Quality', avg_score: 82, top_performer: 'Lisa Brown', improvement_needed: 3 },
  { skill: 'Candidate Engagement', avg_score: 85, top_performer: 'Emily Davis', improvement_needed: 2 },
  { skill: 'Technical Assessment', avg_score: 79, top_performer: 'John Smith', improvement_needed: 4 },
  { skill: 'Time Management', avg_score: 77, top_performer: 'Lisa Brown', improvement_needed: 5 },
  { skill: 'Bias Mitigation', avg_score: 74, top_performer: 'Emily Davis', improvement_needed: 6 }
];

export default function Report() {
  const [activeTab, setActiveTab] = useState('session');
  const [timeRange, setTimeRange] = useState('30d');

  const getVerdictColor = (verdict: string) => {
    switch (verdict) {
      case 'Highly Recommended': return 'bg-green-500/10 text-green-500';
      case 'Consider': return 'bg-yellow-500/10 text-yellow-500';
      case 'Not Recommended': return 'bg-red-500/10 text-red-500';
      default: return 'bg-gray-500/10 text-gray-500';
    }
  };

  const getIntegrityColor = (status: string) => {
    switch (status) {
      case 'Clean': return 'bg-green-500/10 text-green-500';
      case 'Suspicious': return 'bg-red-500/10 text-red-500';
      default: return 'bg-gray-500/10 text-gray-500';
    }
  };

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
          <button className="flex items-center space-x-2 px-4 py-2 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition-colors">
            <Download className="w-4 h-4" />
            <span>Export Report</span>
          </button>
        </div>
      </div>

      {/* Tab Navigation */}
      <div className="flex space-x-1 bg-muted p-1 rounded-lg">
        {reportTabs.map((tab) => {
          const IconComponent = tab.icon;
          return (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex-1 flex items-center justify-center space-x-2 py-3 px-4 text-sm font-medium rounded-md transition-colors ${
                activeTab === tab.id
                  ? 'bg-background text-foreground shadow-sm'
                  : 'text-muted-foreground hover:text-foreground'
              }`}
            >
              <IconComponent className="w-4 h-4" />
              <span>{tab.name}</span>
            </button>
          );
        })}
      </div>

      {/* Session (Candidate Insights) Tab */}
      {activeTab === 'session' && (
        <div className="space-y-8">
          {/* Overview Cards */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            <div className="bg-card border border-border rounded-xl p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">Total Sessions</p>
                  <p className="text-2xl font-bold text-foreground">206</p>
                  <p className="text-xs text-green-500 mt-1">+12% from last period</p>
                </div>
                <Users className="w-8 h-8 text-blue-500" />
              </div>
            </div>
            <div className="bg-card border border-border rounded-xl p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">Avg AI Score</p>
                  <p className="text-2xl font-bold text-foreground">83</p>
                  <p className="text-xs text-green-500 mt-1">+5% improvement</p>
                </div>
                <Brain className="w-8 h-8 text-purple-500" />
              </div>
            </div>
            <div className="bg-card border border-border rounded-xl p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">Integrity Rate</p>
                  <p className="text-2xl font-bold text-foreground">94%</p>
                  <p className="text-xs text-green-500 mt-1">Clean sessions</p>
                </div>
                <Shield className="w-8 h-8 text-green-500" />
              </div>
            </div>
            <div className="bg-card border border-border rounded-xl p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">Highly Recommended</p>
                  <p className="text-2xl font-bold text-foreground">127</p>
                  <p className="text-xs text-blue-500 mt-1">62% of candidates</p>
                </div>
                <Award className="w-8 h-8 text-yellow-500" />
              </div>
            </div>
          </div>

          {/* Performance Trends */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <div className="bg-card border border-border rounded-xl p-6">
              <h3 className="text-lg font-semibold text-foreground mb-4">AI vs Interviewer Score Trends</h3>
              <div className="h-64">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={sessionTrends}>
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
                    <Line
                      type="monotone"
                      dataKey="avg_ai_score"
                      stroke="hsl(var(--primary))"
                      strokeWidth={2}
                      name="AI Score"
                    />
                    <Line
                      type="monotone"
                      dataKey="avg_interviewer_score"
                      stroke="#22c55e"
                      strokeWidth={2}
                      name="Interviewer Score"
                    />
                  </LineChart>
                </ResponsiveContainer>
              </div>
            </div>

            <div className="bg-card border border-border rounded-xl p-6">
              <h3 className="text-lg font-semibold text-foreground mb-4">Session Volume & Completion</h3>
              <div className="h-64">
                <ResponsiveContainer width="100%" height="100%">
                  <ComposedChart data={sessionTrends}>
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
                    <Bar dataKey="total_sessions" fill="hsl(var(--primary))" name="Sessions" />
                    <Line
                      type="monotone"
                      dataKey="completion_rate"
                      stroke="#f59e0b"
                      strokeWidth={2}
                      name="Completion Rate"
                    />
                  </ComposedChart>
                </ResponsiveContainer>
              </div>
            </div>
          </div>

          {/* Candidate Performance Table */}
          <div className="bg-card border border-border rounded-xl p-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold text-foreground">Recent Candidate Performance</h3>
              <div className="flex items-center space-x-2">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
                  <input
                    type="text"
                    placeholder="Search candidates..."
                    className="pl-10 pr-4 py-2 bg-background border border-border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-primary"
                  />
                </div>
                <button className="flex items-center space-x-2 px-3 py-2 text-sm bg-secondary hover:bg-secondary/80 rounded-lg transition-colors">
                  <Filter className="w-4 h-4" />
                  <span>Filter</span>
                </button>
              </div>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-border">
                    <th className="text-left py-3 px-4 font-medium text-foreground">Candidate</th>
                    <th className="text-left py-3 px-4 font-medium text-foreground">AI Score</th>
                    <th className="text-left py-3 px-4 font-medium text-foreground">Interviewer Score</th>
                    <th className="text-left py-3 px-4 font-medium text-foreground">Behavioral Score</th>
                    <th className="text-left py-3 px-4 font-medium text-foreground">Integrity</th>
                    <th className="text-left py-3 px-4 font-medium text-foreground">Final Verdict</th>
                    <th className="text-left py-3 px-4 font-medium text-foreground">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {candidatePerformance.map((candidate, index) => (
                    <tr key={index} className="border-b border-border hover:bg-muted/50">
                      <td className="py-3 px-4">
                        <div className="flex items-center space-x-3">
                          <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-cyan-500 rounded-lg flex items-center justify-center">
                            <span className="text-white text-xs font-semibold">
                              {candidate.name.split(' ').map(n => n[0]).join('')}
                            </span>
                          </div>
                          <span className="font-medium text-foreground">{candidate.name}</span>
                        </div>
                      </td>
                      <td className="py-3 px-4">
                        <div className="flex items-center space-x-2">
                          <div className="w-12 bg-muted rounded-full h-2">
                            <div
                              className="bg-primary h-2 rounded-full"
                              style={{ width: `${candidate.ai_score}%` }}
                            />
                          </div>
                          <span className="text-foreground text-sm">{candidate.ai_score}</span>
                        </div>
                      </td>
                      <td className="py-3 px-4">
                        <div className="flex items-center space-x-2">
                          <div className="w-12 bg-muted rounded-full h-2">
                            <div
                              className="bg-green-500 h-2 rounded-full"
                              style={{ width: `${candidate.interviewer_score}%` }}
                            />
                          </div>
                          <span className="text-foreground text-sm">{candidate.interviewer_score}</span>
                        </div>
                      </td>
                      <td className="py-3 px-4">
                        <div className="flex items-center space-x-2">
                          <div className="w-12 bg-muted rounded-full h-2">
                            <div
                              className="bg-purple-500 h-2 rounded-full"
                              style={{ width: `${candidate.behavioral_score}%` }}
                            />
                          </div>
                          <span className="text-foreground text-sm">{candidate.behavioral_score}</span>
                        </div>
                      </td>
                      <td className="py-3 px-4">
                        <span className={`px-2 py-1 rounded-full text-xs font-medium ${getIntegrityColor(candidate.integrity)}`}>
                          {candidate.integrity}
                        </span>
                      </td>
                      <td className="py-3 px-4">
                        <span className={`px-2 py-1 rounded-full text-xs font-medium ${getVerdictColor(candidate.verdict)}`}>
                          {candidate.verdict}
                        </span>
                      </td>
                      <td className="py-3 px-4">
                        <Link
                          to={`/candidate/${index + 1}`}
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

      {/* Template Insights Tab */}
      {activeTab === 'template' && (
        <div className="space-y-8">
          {/* Template Comparison */}
          <div className="bg-card border border-border rounded-xl p-6">
            <h3 className="text-lg font-semibold text-foreground mb-4">Template Performance Comparison</h3>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-border">
                    <th className="text-left py-3 px-4 font-medium text-foreground">Template</th>
                    <th className="text-left py-3 px-4 font-medium text-foreground">Candidates</th>
                    <th className="text-left py-3 px-4 font-medium text-foreground">Hired</th>
                    <th className="text-left py-3 px-4 font-medium text-foreground">Success Rate</th>
                    <th className="text-left py-3 px-4 font-medium text-foreground">Avg Score</th>
                    <th className="text-left py-3 px-4 font-medium text-foreground">Time to Hire</th>
                    <th className="text-left py-3 px-4 font-medium text-foreground">Recommendation</th>
                  </tr>
                </thead>
                <tbody>
                  {templateComparison.map((template, index) => (
                    <tr key={index} className="border-b border-border hover:bg-muted/50">
                      <td className="py-3 px-4 font-medium text-foreground">{template.template}</td>
                      <td className="py-3 px-4 text-muted-foreground">{template.candidates}</td>
                      <td className="py-3 px-4 text-muted-foreground">{template.hired}</td>
                      <td className="py-3 px-4">
                        <div className="flex items-center space-x-2">
                          <div className="w-16 bg-muted rounded-full h-2">
                            <div
                              className="bg-primary h-2 rounded-full"
                              style={{ width: `${template.success_rate}%` }}
                            />
                          </div>
                          <span className="text-foreground text-sm">{template.success_rate}%</span>
                        </div>
                      </td>
                      <td className="py-3 px-4 text-muted-foreground">{template.avg_score}</td>
                      <td className="py-3 px-4 text-muted-foreground">{template.time_to_hire} days</td>
                      <td className="py-3 px-4">
                        <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                          template.success_rate >= 80 ? 'bg-green-500/10 text-green-500' :
                          template.success_rate >= 70 ? 'bg-yellow-500/10 text-yellow-500' :
                          'bg-red-500/10 text-red-500'
                        }`}>
                          {template.success_rate >= 80 ? 'Use This' :
                           template.success_rate >= 70 ? 'Consider' :
                           'Needs Improvement'}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Feature Impact Analysis */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <div className="bg-card border border-border rounded-xl p-6">
              <h3 className="text-lg font-semibold text-foreground mb-4">Feature Impact on Success</h3>
              <div className="h-64">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={templateFeatureImpact} layout="horizontal">
                    <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                    <XAxis type="number" stroke="hsl(var(--muted-foreground))" fontSize={12} />
                    <YAxis dataKey="feature" type="category" stroke="hsl(var(--muted-foreground))" fontSize={10} width={120} />
                    <Tooltip
                      contentStyle={{
                        backgroundColor: 'hsl(var(--card))',
                        border: '1px solid hsl(var(--border))',
                        borderRadius: '8px'
                      }}
                    />
                    <Bar dataKey="impact_score" fill="hsl(var(--primary))" name="Impact Score" />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </div>

            <div className="bg-card border border-border rounded-xl p-6">
              <h3 className="text-lg font-semibold text-foreground mb-4">Template Recommendations</h3>
              <div className="space-y-4">
                <div className="p-4 bg-green-500/10 border border-green-500/20 rounded-lg">
                  <div className="flex items-start space-x-3">
                    <div className="w-2 h-2 bg-green-500 rounded-full mt-2" />
                    <div>
                      <div className="font-medium text-green-700 mb-1">High-Performing Features</div>
                      <div className="text-sm text-green-600">Code Review (94% impact) and Technical Assessment (92% impact) show excellent results. Continue using these components.</div>
                    </div>
                  </div>
                </div>
                <div className="p-4 bg-yellow-500/10 border border-yellow-500/20 rounded-lg">
                  <div className="flex items-start space-x-3">
                    <div className="w-2 h-2 bg-yellow-500 rounded-full mt-2" />
                    <div>
                      <div className="font-medium text-yellow-700 mb-1">Optimization Opportunity</div>
                      <div className="text-sm text-yellow-600">Portfolio Review has high impact (91%) but low usage (67%). Consider making it mandatory for design roles.</div>
                    </div>
                  </div>
                </div>
                <div className="p-4 bg-blue-500/10 border border-blue-500/20 rounded-lg">
                  <div className="flex items-start space-x-3">
                    <div className="w-2 h-2 bg-blue-500 rounded-full mt-2" />
                    <div>
                      <div className="font-medium text-blue-700 mb-1">Template Versioning Insight</div>
                      <div className="text-sm text-blue-600">V2 templates consistently outperform V1 by 15-20% in success rates. Migrate remaining roles to V2 format.</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Interviewer Insights Tab */}
      {activeTab === 'interviewer' && (
        <div className="space-y-8">
          {/* Interviewer Performance Overview */}
          <div className="bg-card border border-border rounded-xl p-6">
            <h3 className="text-lg font-semibold text-foreground mb-4">Interviewer Performance & Improvement Areas</h3>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-border">
                    <th className="text-left py-3 px-4 font-medium text-foreground">Interviewer</th>
                    <th className="text-left py-3 px-4 font-medium text-foreground">Interviews</th>
                    <th className="text-left py-3 px-4 font-medium text-foreground">Avg Score</th>
                    <th className="text-left py-3 px-4 font-medium text-foreground">Consistency</th>
                    <th className="text-left py-3 px-4 font-medium text-foreground">Feedback</th>
                    <th className="text-left py-3 px-4 font-medium text-foreground">Improvement Areas</th>
                  </tr>
                </thead>
                <tbody>
                  {interviewerMetrics.map((interviewer, index) => (
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
                      <td className="py-3 px-4">
                        <div className="flex items-center space-x-2">
                          <div className="w-12 bg-muted rounded-full h-2">
                            <div
                              className="bg-primary h-2 rounded-full"
                              style={{ width: `${interviewer.avg_score}%` }}
                            />
                          </div>
                          <span className="text-foreground text-sm">{interviewer.avg_score}</span>
                        </div>
                      </td>
                      <td className="py-3 px-4">
                        <div className="flex items-center space-x-2">
                          <div className="w-12 bg-muted rounded-full h-2">
                            <div
                              className="bg-green-500 h-2 rounded-full"
                              style={{ width: `${interviewer.consistency}%` }}
                            />
                          </div>
                          <span className="text-foreground text-sm">{interviewer.consistency}%</span>
                        </div>
                      </td>
                      <td className="py-3 px-4">
                        <div className="flex items-center space-x-1">
                          <span className="text-foreground text-sm">{interviewer.candidate_feedback}</span>
                          <div className="flex">
                            {Array.from({ length: 5 }, (_, i) => (
                              <span
                                key={i}
                                className={`text-xs ${
                                  i < Math.floor(interviewer.candidate_feedback) ? 'text-yellow-500' : 'text-muted'
                                }`}
                              >
                                ★
                              </span>
                            ))}
                          </div>
                        </div>
                      </td>
                      <td className="py-3 px-4">
                        <div className="flex flex-wrap gap-1">
                          {interviewer.improvement_areas.map((area, areaIndex) => (
                            <span key={areaIndex} className="px-2 py-1 bg-yellow-500/10 text-yellow-700 text-xs rounded-full">
                              {area}
                            </span>
                          ))}
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Skill Analysis */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <div className="bg-card border border-border rounded-xl p-6">
              <h3 className="text-lg font-semibold text-foreground mb-4">Interview Skills Analysis</h3>
              <div className="space-y-4">
                {interviewerSkillAnalysis.map((skill, index) => (
                  <div key={index} className="p-4 bg-muted rounded-lg">
                    <div className="flex items-center justify-between mb-2">
                      <span className="font-medium text-foreground">{skill.skill}</span>
                      <span className="text-sm text-muted-foreground">Avg: {skill.avg_score}%</span>
                    </div>
                    <div className="bg-background rounded-full h-2 mb-2">
                      <div
                        className="bg-primary h-2 rounded-full"
                        style={{ width: `${skill.avg_score}%` }}
                      />
                    </div>
                    <div className="flex items-center justify-between text-xs">
                      <span className="text-green-600">Top: {skill.top_performer}</span>
                      <span className="text-red-600">{skill.improvement_needed} need training</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="bg-card border border-border rounded-xl p-6">
              <h3 className="text-lg font-semibold text-foreground mb-4">Training Recommendations</h3>
              <div className="space-y-4">
                <div className="p-4 bg-red-500/10 border border-red-500/20 rounded-lg">
                  <div className="flex items-start space-x-3">
                    <div className="w-2 h-2 bg-red-500 rounded-full mt-2" />
                    <div>
                      <div className="font-medium text-red-700 mb-1">Priority Training Needed</div>
                      <div className="text-sm text-red-600">6 interviewers need bias mitigation training. Schedule unconscious bias workshops.</div>
                    </div>
                  </div>
                </div>
                <div className="p-4 bg-yellow-500/10 border border-yellow-500/20 rounded-lg">
                  <div className="flex items-start space-x-3">
                    <div className="w-2 h-2 bg-yellow-500 rounded-full mt-2" />
                    <div>
                      <div className="font-medium text-yellow-700 mb-1">Time Management Issues</div>
                      <div className="text-sm text-yellow-600">5 interviewers struggle with time management. Provide interview structure templates.</div>
                    </div>
                  </div>
                </div>
                <div className="p-4 bg-green-500/10 border border-green-500/20 rounded-lg">
                  <div className="flex items-start space-x-3">
                    <div className="w-2 h-2 bg-green-500 rounded-full mt-2" />
                    <div>
                      <div className="font-medium text-green-700 mb-1">High Performers</div>
                      <div className="text-sm text-green-600">Lisa Brown and Emily Davis show excellent performance. Consider them as mentors for training programs.</div>
                    </div>
                  </div>
                </div>
                <div className="p-4 bg-blue-500/10 border border-blue-500/20 rounded-lg">
                  <div className="flex items-start space-x-3">
                    <div className="w-2 h-2 bg-blue-500 rounded-full mt-2" />
                    <div>
                      <div className="font-medium text-blue-700 mb-1">Technical Assessment</div>
                      <div className="text-sm text-blue-600">4 interviewers need technical assessment training. Organize domain-specific workshops.</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
