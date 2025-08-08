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
  { id: 'candidates', name: 'Candidate/Session Insights', icon: Users },
  { id: 'interviewer', name: 'Interviewer Report', icon: Award },
  { id: 'template', name: 'Template Report', icon: FileText }
];

const candidateReportTabs = [
  { id: 'summary', name: 'Summary & Stages', icon: FileText },
  { id: 'recording', name: 'Recording & Transcript', icon: Eye },
  { id: 'competency', name: 'Competency Analysis', icon: Target },
  { id: 'behavioral', name: 'Behavioral Traits', icon: Brain },
  { id: 'integrity', name: 'Session Integrity', icon: Shield },
  { id: 'authentication', name: 'Authentication', icon: User },
  { id: 'chat', name: 'Chat & Notes', icon: FileText }
];

// Session/Candidate data
const candidateOverview = [
  {
    candidate_id: '1234',
    candidate_name: 'Ajit Sharma',
    email: 'ajit1234@gmail.com',
    current_role: 'PM',
    company: 'TCS',
    experience: '3',
    applied_role: 'Sr. PM',
    interviewer_id: '99',
    interviewer: 'Ajay Srivastva',
    interview_date: '01/08/2025 11:00:00',
    duration: '1',
    connect_disconnect: '3',
    ufm_count: '1',
    ufm_list: ['Suspicious browser activity'],
    integrity_score: 90,
    overall_score: 95,
    suggestion: 'Consider'
  },
  {
    candidate_id: '2345',
    candidate_name: 'Ram Gupta',
    email: 'ram2345@gmail.com',
    current_role: 'Junior Developer',
    company: 'CISCO',
    experience: '1',
    applied_role: 'Developer',
    interviewer_id: '47',
    interviewer: 'Payal Jha',
    interview_date: '29/07/2025 14:00:22',
    duration: '1.5',
    connect_disconnect: '0',
    ufm_count: '3',
    ufm_list: ['Code copied from external source', 'Tab switching detected', 'Unauthorized help'],
    integrity_score: 75,
    overall_score: 89,
    suggestion: 'Recommended'
  }
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
  const [activeTab, setActiveTab] = useState('candidates');
  const [timeRange, setTimeRange] = useState('30d');
  const [selectedCandidate, setSelectedCandidate] = useState<any>(null);
  const [candidateReportTab, setCandidateReportTab] = useState('summary');
  const [showCandidateDetail, setShowCandidateDetail] = useState(false);

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

      {/* Candidate/Session Insights Tab */}
      {activeTab === 'candidates' && !showCandidateDetail && (
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
              <h3 className="text-lg font-semibold text-foreground">Candidate/Session Insights</h3>
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
                    <th className="text-left py-3 px-2 font-medium text-foreground text-xs">ID</th>
                    <th className="text-left py-3 px-2 font-medium text-foreground text-xs">Candidate</th>
                    <th className="text-left py-3 px-2 font-medium text-foreground text-xs">Email</th>
                    <th className="text-left py-3 px-2 font-medium text-foreground text-xs">Current Role</th>
                    <th className="text-left py-3 px-2 font-medium text-foreground text-xs">Company</th>
                    <th className="text-left py-3 px-2 font-medium text-foreground text-xs">Experience</th>
                    <th className="text-left py-3 px-2 font-medium text-foreground text-xs">Applied Role</th>
                    <th className="text-left py-3 px-2 font-medium text-foreground text-xs">Interviewer</th>
                    <th className="text-left py-3 px-2 font-medium text-foreground text-xs">Date & Time</th>
                    <th className="text-left py-3 px-2 font-medium text-foreground text-xs">Duration</th>
                    <th className="text-left py-3 px-2 font-medium text-foreground text-xs">Connect/Disconnect</th>
                    <th className="text-left py-3 px-2 font-medium text-foreground text-xs">UFM Count</th>
                    <th className="text-left py-3 px-2 font-medium text-foreground text-xs">Integrity Score</th>
                    <th className="text-left py-3 px-2 font-medium text-foreground text-xs">Overall Score</th>
                    <th className="text-left py-3 px-2 font-medium text-foreground text-xs">Suggestion</th>
                  </tr>
                </thead>
                <tbody>
                  {candidateOverview.map((candidate, index) => (
                    <tr 
                      key={index} 
                      className="border-b border-border hover:bg-muted/50 cursor-pointer"
                      onClick={() => {
                        setSelectedCandidate(candidate);
                        setShowCandidateDetail(true);
                        setCandidateReportTab('summary');
                      }}
                    >
                      <td className="py-2 px-2 text-xs text-foreground">{candidate.candidate_id}</td>
                      <td className="py-2 px-2">
                        <div className="flex items-center space-x-2">
                          <div className="w-6 h-6 bg-gradient-to-br from-blue-500 to-cyan-500 rounded-lg flex items-center justify-center">
                            <span className="text-white text-xs font-semibold">
                              {candidate.candidate_name.split(' ').map(n => n[0]).join('')}
                            </span>
                          </div>
                          <span className="font-medium text-foreground text-xs">{candidate.candidate_name}</span>
                        </div>
                      </td>
                      <td className="py-2 px-2 text-xs text-foreground">{candidate.email}</td>
                      <td className="py-2 px-2 text-xs text-foreground">{candidate.current_role}</td>
                      <td className="py-2 px-2 text-xs text-foreground">{candidate.company}</td>
                      <td className="py-2 px-2 text-xs text-foreground">{candidate.experience} yrs</td>
                      <td className="py-2 px-2 text-xs text-foreground">{candidate.applied_role}</td>
                      <td className="py-2 px-2 text-xs text-foreground">{candidate.interviewer}</td>
                      <td className="py-2 px-2 text-xs text-foreground">{candidate.interview_date}</td>
                      <td className="py-2 px-2 text-xs text-foreground">{candidate.duration} hrs</td>
                      <td className="py-2 px-2 text-xs text-center">
                        <span className={`px-1 py-0.5 rounded text-xs ${
                          parseInt(candidate.connect_disconnect) > 2 ? 'bg-red-500/10 text-red-600' : 'bg-green-500/10 text-green-600'
                        }`}>
                          {candidate.connect_disconnect}
                        </span>
                      </td>
                      <td className="py-2 px-2 text-xs text-center">
                        <span
                          className={`px-1 py-0.5 rounded text-xs cursor-help ${
                            parseInt(candidate.ufm_count) > 0 ? 'bg-red-500/10 text-red-600' : 'bg-green-500/10 text-green-600'
                          }`}
                          title={candidate.ufm_list.join(', ')}
                        >
                          {candidate.ufm_count}
                        </span>
                      </td>
                      <td className="py-2 px-2 text-xs text-center">
                        <div className="flex items-center space-x-1">
                          <div className="w-8 bg-muted rounded-full h-1.5">
                            <div
                              className={`h-1.5 rounded-full ${
                                candidate.integrity_score >= 85 ? 'bg-green-500' :
                                candidate.integrity_score >= 70 ? 'bg-yellow-500' : 'bg-red-500'
                              }`}
                              style={{ width: `${candidate.integrity_score}%` }}
                            />
                          </div>
                          <span className="text-foreground text-xs">{candidate.integrity_score}</span>
                        </div>
                      </td>
                      <td className="py-2 px-2 text-xs text-center">
                        <div className="flex items-center space-x-1">
                          <div className="w-8 bg-muted rounded-full h-1.5">
                            <div
                              className={`h-1.5 rounded-full ${
                                candidate.overall_score >= 90 ? 'bg-green-500' :
                                candidate.overall_score >= 80 ? 'bg-blue-500' :
                                candidate.overall_score >= 70 ? 'bg-yellow-500' : 'bg-red-500'
                              }`}
                              style={{ width: `${candidate.overall_score}%` }}
                            />
                          </div>
                          <span className="text-foreground text-xs">{candidate.overall_score}</span>
                        </div>
                      </td>
                      <td className="py-2 px-2">
                        <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                          candidate.suggestion === 'Recommended' ? 'bg-green-500/10 text-green-600' :
                          candidate.suggestion === 'Consider' ? 'bg-yellow-500/10 text-yellow-600' :
                          'bg-red-500/10 text-red-600'
                        }`}>
                          {candidate.suggestion}
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

      {/* Detailed Candidate Report */}
      {activeTab === 'candidates' && showCandidateDetail && selectedCandidate && (
        <div className="space-y-6">
          {/* Header Summary */}
          <div className="bg-card border border-border rounded-xl p-6">
            <div className="flex items-center justify-between mb-6">
              <button 
                onClick={() => setShowCandidateDetail(false)}
                className="text-primary hover:text-primary/80 transition-colors flex items-center space-x-2"
              >
                <span>←</span>
                <span>Back to Candidate List</span>
              </button>
              <span className={`px-3 py-1 rounded-full text-sm font-medium ${
                selectedCandidate.suggestion === 'Recommended' ? 'bg-green-500/10 text-green-600' :
                selectedCandidate.suggestion === 'Consider' ? 'bg-yellow-500/10 text-yellow-600' :
                'bg-red-500/10 text-red-600'
              }`}>
                {selectedCandidate.suggestion === 'Recommended' ? 'Highly Recommended' : selectedCandidate.suggestion}
              </span>
            </div>
            
            {/* Basic Info */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
              <div>
                <p className="text-sm text-muted-foreground mb-1">Candidate Details</p>
                <p className="font-semibold text-foreground">{selectedCandidate.candidate_name}</p>
                <p className="text-sm text-muted-foreground">{selectedCandidate.email}</p>
                <p className="text-sm text-muted-foreground">ID: {selectedCandidate.candidate_id}</p>
              </div>
              <div>
                <p className="text-sm text-muted-foreground mb-1">Interview Details</p>
                <p className="font-semibold text-foreground">{selectedCandidate.interview_date}</p>
                <p className="text-sm text-muted-foreground">Role: {selectedCandidate.applied_role}</p>
                <p className="text-sm text-muted-foreground">Interviewer: {selectedCandidate.interviewer}</p>
              </div>
              <div>
                <p className="text-sm text-muted-foreground mb-1">Status</p>
                <p className="font-semibold text-green-600">Evaluated</p>
                <p className="text-sm text-muted-foreground">Duration: {selectedCandidate.duration} hrs</p>
              </div>
            </div>
            
            {/* Key Scores */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <div className="bg-purple-500/10 border border-purple-500/20 rounded-lg p-4 text-center">
                <Brain className="w-6 h-6 text-purple-500 mx-auto mb-2" />
                <p className="text-sm text-muted-foreground">AI Score</p>
                <p className="text-2xl font-bold text-foreground">{selectedCandidate.overall_score}</p>
              </div>
              <div className="bg-blue-500/10 border border-blue-500/20 rounded-lg p-4 text-center">
                <User className="w-6 h-6 text-blue-500 mx-auto mb-2" />
                <p className="text-sm text-muted-foreground">Interviewer Score</p>
                <p className="text-2xl font-bold text-foreground">{selectedCandidate.overall_score - 3}</p>
              </div>
              <div className="bg-orange-500/10 border border-orange-500/20 rounded-lg p-4 text-center">
                <Brain className="w-6 h-6 text-orange-500 mx-auto mb-2" />
                <p className="text-sm text-muted-foreground">Behavioral Score</p>
                <p className="text-2xl font-bold text-foreground">{selectedCandidate.overall_score - 5}</p>
              </div>
              <div className="bg-green-500/10 border border-green-500/20 rounded-lg p-4 text-center">
                <Shield className="w-6 h-6 text-green-500 mx-auto mb-2" />
                <p className="text-sm text-muted-foreground">Integrity Score</p>
                <p className="text-2xl font-bold text-foreground">{selectedCandidate.integrity_score}</p>
              </div>
            </div>
          </div>
          
          {/* Candidate Report Tabs */}
          <div className="flex space-x-1 bg-muted p-1 rounded-lg">
            {candidateReportTabs.map((tab) => {
              const IconComponent = tab.icon;
              return (
                <button
                  key={tab.id}
                  onClick={() => setCandidateReportTab(tab.id)}
                  className={`flex-1 flex items-center justify-center space-x-2 py-2 px-3 text-xs font-medium rounded-md transition-colors ${
                    candidateReportTab === tab.id
                      ? 'bg-background text-foreground shadow-sm'
                      : 'text-muted-foreground hover:text-foreground'
                  }`}
                >
                  <IconComponent className="w-3 h-3" />
                  <span className="hidden md:inline">{tab.name}</span>
                </button>
              );
            })}
          </div>
          
          {/* Tab Content */}
          <div className="bg-card border border-border rounded-xl p-6">
            {candidateReportTab === 'summary' && (
              <div className="space-y-6">
                <h3 className="text-lg font-semibold text-foreground">Summary & Stages</h3>
                
                {/* Interview Stages */}
                <div className="space-y-4">
                  <h4 className="font-medium text-foreground">Interview Stages</h4>
                  <div className="space-y-2">
                    <div className="flex items-center justify-between p-3 bg-muted rounded-lg">
                      <span className="font-medium">Introduction</span>
                      <span className="text-sm text-muted-foreground">00:00 - 05:30</span>
                    </div>
                    <div className="flex items-center justify-between p-3 bg-muted rounded-lg">
                      <span className="font-medium">Technical Assessment</span>
                      <span className="text-sm text-muted-foreground">05:30 - 35:00</span>
                    </div>
                    <div className="flex items-center justify-between p-3 bg-muted rounded-lg">
                      <span className="font-medium">Problem Solving</span>
                      <span className="text-sm text-muted-foreground">35:00 - 55:00</span>
                    </div>
                    <div className="flex items-center justify-between p-3 bg-muted rounded-lg">
                      <span className="font-medium">Q&A Session</span>
                      <span className="text-sm text-muted-foreground">55:00 - 60:00</span>
                    </div>
                  </div>
                </div>
                
                {/* Performance Summary */}
                <div className="space-y-4">
                  <h4 className="font-medium text-foreground">Performance Summary</h4>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="p-4 bg-green-500/10 border border-green-500/20 rounded-lg">
                      <h5 className="font-medium text-green-700 mb-2">Strengths</h5>
                      <ul className="text-sm text-green-600 space-y-1">
                        <li>• Strong technical knowledge and problem-solving approach</li>
                        <li>• Clear communication and logical thinking</li>
                        <li>• Good understanding of system design principles</li>
                      </ul>
                    </div>
                    <div className="p-4 bg-yellow-500/10 border border-yellow-500/20 rounded-lg">
                      <h5 className="font-medium text-yellow-700 mb-2">Areas for Improvement</h5>
                      <ul className="text-sm text-yellow-600 space-y-1">
                        <li>• Could improve time management during coding</li>
                        <li>• Some uncertainty in advanced algorithm concepts</li>
                      </ul>
                    </div>
                  </div>
                </div>
                
                {/* Verdict Logic */}
                <div className="p-4 bg-blue-500/10 border border-blue-500/20 rounded-lg">
                  <h4 className="font-medium text-blue-700 mb-2">Verdict Logic</h4>
                  <p className="text-sm text-blue-600">
                    Strong technical performance and clear communication skills. Minor concerns about time management but overall solid candidate for the role.
                  </p>
                </div>
              </div>
            )}
            
            {candidateReportTab === 'recording' && (
              <div className="space-y-6">
                <h3 className="text-lg font-semibold text-foreground">Recording & Transcript</h3>
                
                {/* Video Player Placeholder */}
                <div className="bg-muted rounded-lg p-8 text-center">
                  <Eye className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
                  <p className="text-muted-foreground">Video recording would be embedded here</p>
                  <button className="mt-4 px-4 py-2 bg-primary text-primary-foreground rounded-lg">Play Recording</button>
                </div>
                
                {/* Speaking Time Analysis */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <h4 className="font-medium text-foreground mb-4">Speaking Time Analysis</h4>
                    <div className="space-y-3">
                      <div className="flex items-center justify-between">
                        <span className="text-sm">Candidate</span>
                        <div className="flex items-center space-x-2">
                          <div className="w-32 bg-muted rounded-full h-2">
                            <div className="bg-blue-500 h-2 rounded-full" style={{width: '65%'}} />
                          </div>
                          <span className="text-sm text-muted-foreground">65%</span>
                        </div>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-sm">Interviewer</span>
                        <div className="flex items-center space-x-2">
                          <div className="w-32 bg-muted rounded-full h-2">
                            <div className="bg-green-500 h-2 rounded-full" style={{width: '35%'}} />
                          </div>
                          <span className="text-sm text-muted-foreground">35%</span>
                        </div>
                      </div>
                    </div>
                  </div>
                  
                  <div>
                    <h4 className="font-medium text-foreground mb-4">Conversation Flow</h4>
                    <div className="text-sm text-muted-foreground space-y-1">
                      <p>• 2 interruptions detected</p>
                      <p>• Average response time: 3.2 seconds</p>
                      <p>• Longest monologue: 4 minutes (candidate)</p>
                    </div>
                  </div>
                </div>
                
                {/* Transcript */}
                <div>
                  <h4 className="font-medium text-foreground mb-4">Transcript</h4>
                  <div className="bg-muted rounded-lg p-4 max-h-64 overflow-y-auto space-y-3">
                    <div className="text-sm">
                      <span className="font-medium text-blue-600">Interviewer:</span>
                      <span className="ml-2">Hello {selectedCandidate.candidate_name}, thank you for joining us today. Can you start by telling me about yourself?</span>
                    </div>
                    <div className="text-sm">
                      <span className="font-medium text-green-600">Candidate:</span>
                      <span className="ml-2">Hi, thank you for having me. I'm a software engineer with {selectedCandidate.experience} years of experience in web development...</span>
                    </div>
                    <div className="text-sm">
                      <span className="font-medium text-blue-600">Interviewer:</span>
                      <span className="ml-2">That's great. Now let's move to a technical question. Can you explain how you would design a scalable web application?</span>
                    </div>
                  </div>
                </div>
              </div>
            )}
            
            {candidateReportTab === 'competency' && (
              <div className="space-y-6">
                <h3 className="text-lg font-semibold text-foreground">Competency Analysis</h3>
                
                {/* Competency Scores */}
                <div className="space-y-4">
                  {[
                    {name: 'Technical Skills', ai: 88, interviewer: 85, note: 'Strong programming fundamentals, good problem-solving approach'},
                    {name: 'Communication', ai: 92, interviewer: 90, note: 'Clear explanations, good listening skills'},
                    {name: 'Problem Solving', ai: 85, interviewer: 88, note: 'Systematic approach, creative solutions'},
                    {name: 'Team Collaboration', ai: 78, interviewer: 82, note: 'Good interpersonal skills, open to feedback'},
                    {name: 'Analytical Thinking', ai: 90, interviewer: 87, note: 'Strong logical approach, detail-oriented'}
                  ].map((competency, index) => (
                    <div key={index} className="p-4 bg-muted rounded-lg">
                      <div className="flex items-center justify-between mb-2">
                        <h4 className="font-medium text-foreground">{competency.name}</h4>
                        <div className="flex items-center space-x-4 text-sm">
                          <span className="text-purple-600">AI: {competency.ai}</span>
                          <span className="text-blue-600">Interviewer: {competency.interviewer}</span>
                        </div>
                      </div>
                      <div className="grid grid-cols-2 gap-2 mb-2">
                        <div className="bg-background rounded h-2">
                          <div className="bg-purple-500 h-2 rounded" style={{width: `${competency.ai}%`}} />
                        </div>
                        <div className="bg-background rounded h-2">
                          <div className="bg-blue-500 h-2 rounded" style={{width: `${competency.interviewer}%`}} />
                        </div>
                      </div>
                      <p className="text-sm text-muted-foreground">{competency.note}</p>
                    </div>
                  ))}
                </div>
              </div>
            )}
            
            {candidateReportTab === 'behavioral' && (
              <div className="space-y-6">
                <h3 className="text-lg font-semibold text-foreground">Behavioral Traits</h3>
                
                {/* Behavioral Analysis */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {[
                    {trait: 'Decision-Making Ability', score: 85, rationale: 'Shows confidence in making choices, considers multiple options'},
                    {trait: 'Emotional Awareness', score: 78, rationale: 'Good self-awareness, handles stress reasonably well'},
                    {trait: 'Communication Clarity', score: 92, rationale: 'Excellent verbal communication, clear explanations'},
                    {trait: 'Integrity & Authenticity', score: selectedCandidate.integrity_score, rationale: 'Honest responses, transparent about limitations'}
                  ].map((trait, index) => (
                    <div key={index} className="p-4 bg-muted rounded-lg">
                      <div className="flex items-center justify-between mb-3">
                        <h4 className="font-medium text-foreground">{trait.trait}</h4>
                        <span className="text-lg font-bold text-primary">{trait.score}</span>
                      </div>
                      <div className="bg-background rounded-full h-2 mb-3">
                        <div 
                          className="bg-primary h-2 rounded-full" 
                          style={{width: `${trait.score}%`}} 
                        />
                      </div>
                      <p className="text-sm text-muted-foreground">{trait.rationale}</p>
                    </div>
                  ))}
                </div>
              </div>
            )}
            
            {candidateReportTab === 'integrity' && (
              <div className="space-y-6">
                <h3 className="text-lg font-semibold text-foreground">Session Integrity</h3>
                
                {/* Integrity Score */}
                <div className="bg-muted rounded-lg p-6 text-center">
                  <Shield className="w-12 h-12 text-green-500 mx-auto mb-4" />
                  <h4 className="text-2xl font-bold text-foreground mb-2">{selectedCandidate.integrity_score}/100</h4>
                  <p className="text-muted-foreground">Overall Integrity Score</p>
                </div>
                
                {/* UFM Events Timeline */}
                {parseInt(selectedCandidate.ufm_count) > 0 ? (
                  <div>
                    <h4 className="font-medium text-foreground mb-4">Unfair Means Events</h4>
                    <div className="space-y-3">
                      {selectedCandidate.ufm_list.map((ufm: string, index: number) => (
                        <div key={index} className="flex items-center space-x-3 p-3 bg-red-500/10 border border-red-500/20 rounded-lg">
                          <div className="w-2 h-2 bg-red-500 rounded-full" />
                          <div className="flex-1">
                            <span className="text-red-700 text-sm font-medium">{ufm}</span>
                            <p className="text-xs text-red-600">Detected at 15:30 - Duration: 2 mins</p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                ) : (
                  <div className="p-6 bg-green-500/10 border border-green-500/20 rounded-lg text-center">
                    <h4 className="font-medium text-green-700 mb-2">Clean Session</h4>
                    <p className="text-sm text-green-600">No integrity violations detected during this interview</p>
                  </div>
                )}
              </div>
            )}
            
            {candidateReportTab === 'authentication' && (
              <div className="space-y-6">
                <h3 className="text-lg font-semibold text-foreground">Authentication</h3>
                
                {/* Photo Verification */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div className="bg-muted rounded-lg p-4 text-center">
                    <div className="w-24 h-24 bg-gradient-to-br from-blue-500 to-cyan-500 rounded-full mx-auto mb-3 flex items-center justify-center">
                      <span className="text-white text-2xl font-bold">
                        {selectedCandidate.candidate_name.split(' ').map((n: string) => n[0]).join('')}
                      </span>
                    </div>
                    <p className="text-sm text-muted-foreground">Profile Photo</p>
                  </div>
                  
                  <div className="bg-muted rounded-lg p-4 text-center">
                    <div className="w-24 h-24 bg-gradient-to-br from-green-500 to-blue-500 rounded-full mx-auto mb-3 flex items-center justify-center">
                      <User className="w-12 h-12 text-white" />
                    </div>
                    <p className="text-sm text-muted-foreground">Live Capture</p>
                  </div>
                  
                  <div className="space-y-3">
                    <div className="p-3 bg-green-500/10 border border-green-500/20 rounded-lg">
                      <p className="text-sm font-medium text-green-700">Face Match: 96%</p>
                    </div>
                    <div className="p-3 bg-green-500/10 border border-green-500/20 rounded-lg">
                      <p className="text-sm font-medium text-green-700">ID Verified</p>
                    </div>
                    <div className="p-3 bg-green-500/10 border border-green-500/20 rounded-lg">
                      <p className="text-sm font-medium text-green-700">No Fraud Detected</p>
                    </div>
                  </div>
                </div>
              </div>
            )}
            
            {candidateReportTab === 'chat' && (
              <div className="space-y-6">
                <h3 className="text-lg font-semibold text-foreground">Chat & Notes</h3>
                
                {/* Chat Logs */}
                <div>
                  <h4 className="font-medium text-foreground mb-4">Chat History</h4>
                  <div className="bg-muted rounded-lg p-4 max-h-64 overflow-y-auto space-y-3">
                    <div className="text-sm">
                      <span className="text-xs text-muted-foreground">10:55 AM</span>
                      <div className="mt-1 p-2 bg-blue-500/10 rounded">
                        <span className="font-medium text-blue-600">Interviewer:</span>
                        <span className="ml-2">Welcome! We'll start in 2 minutes.</span>
                      </div>
                    </div>
                    <div className="text-sm">
                      <span className="text-xs text-muted-foreground">11:20 AM</span>
                      <div className="mt-1 p-2 bg-green-500/10 rounded">
                        <span className="font-medium text-green-600">Candidate:</span>
                        <span className="ml-2">Thank you for the opportunity!</span>
                      </div>
                    </div>
                  </div>
                </div>
                
                {/* Interviewer Notes */}
                <div>
                  <h4 className="font-medium text-foreground mb-4">Interviewer Notes</h4>
                  <div className="bg-muted rounded-lg p-4">
                    <p className="text-sm text-muted-foreground">
                      Candidate showed strong technical skills and good communication. 
                      Recommended for next round. Note: Follow up on system design experience.
                    </p>
                  </div>
                </div>
                
                {/* Shared Links */}
                <div>
                  <h4 className="font-medium text-foreground mb-4">Shared Resources</h4>
                  <div className="space-y-2">
                    <div className="flex items-center space-x-3 p-3 bg-muted rounded-lg">
                      <FileText className="w-4 h-4 text-primary" />
                      <span className="text-sm">Code Repository - GitHub Link</span>
                      <span className="text-xs text-muted-foreground ml-auto">11:15 AM</span>
                    </div>
                    <div className="flex items-center space-x-3 p-3 bg-muted rounded-lg">
                      <FileText className="w-4 h-4 text-primary" />
                      <span className="text-sm">Portfolio Website</span>
                      <span className="text-xs text-muted-foreground ml-auto">11:30 AM</span>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      )}

      {/* Template Report Tab */}
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

      {/* Interviewer Report Tab */}
      {activeTab === 'interviewer' && (
        <div className="space-y-8">
          {/* Interviewer Performance Overview */}
          <div className="bg-card border border-border rounded-xl p-6">
            <h3 className="text-lg font-semibold text-foreground mb-4">Interviewer Report - Performance & Evaluation</h3>
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
