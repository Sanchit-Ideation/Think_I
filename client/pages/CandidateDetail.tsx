import { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import {
  RadarChart,
  Radar,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  ResponsiveContainer,
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  BarChart,
  Bar,
  PieChart,
  Pie,
  Cell
} from 'recharts';
import {
  ArrowLeft,
  Download,
  Share2,
  MessageSquare,
  Shield,
  Eye,
  Clock,
  Award,
  AlertTriangle,
  CheckCircle,
  User,
  Calendar,
  Phone,
  Mail,
  FileText,
  Camera,
  Mic,
  Monitor,
  Activity
} from 'lucide-react';

const candidateData = {
  id: 'candidate-001',
  name: 'Sarah Johnson',
  email: 'sarah.johnson@email.com',
  phone: '+1 (555) 123-4567',
  position: 'Senior Software Engineer',
  experience: '7 years',
  interview_date: '2024-12-15',
  duration: 62,
  status: 'completed',
  overall_score: 87,
  recommendation: 'strong_hire',
  interviewer: 'John Smith'
};

const competencyScores = [
  { skill: 'Technical Skills', score: 85, benchmark: 78 },
  { skill: 'Problem Solving', score: 92, benchmark: 82 },
  { skill: 'Communication', score: 89, benchmark: 85 },
  { skill: 'Leadership', score: 76, benchmark: 73 },
  { skill: 'Cultural Fit', score: 94, benchmark: 88 },
  { skill: 'Innovation', score: 82, benchmark: 80 }
];

const sectionScores = [
  { section: 'Introduction', score: 88, time: 3, confidence: 92 },
  { section: 'Technical Assessment', score: 85, time: 25, confidence: 87 },
  { section: 'System Design', score: 82, time: 20, confidence: 79 },
  { section: 'Behavioral Questions', score: 94, time: 12, confidence: 96 },
  { section: 'Q&A Session', score: 86, time: 2, confidence: 89 }
];

const engagementTimeline = [
  { time: '0:00', engagement: 85, stress: 15 },
  { time: '5:00', engagement: 89, stress: 12 },
  { time: '10:00', engagement: 82, stress: 18 },
  { time: '15:00', engagement: 78, stress: 25 },
  { time: '20:00', engagement: 93, stress: 8 },
  { time: '25:00', engagement: 91, stress: 10 },
  { time: '30:00', engagement: 87, stress: 14 },
  { time: '35:00', engagement: 94, stress: 7 },
  { time: '40:00', engagement: 89, stress: 11 }
];

const integrityMetrics = [
  { name: 'Authentic Responses', value: 94, color: '#22c55e' },
  { name: 'Consistent Behavior', value: 91, color: '#06b6d4' },
  { name: 'Natural Speech', value: 89, color: '#8b5cf6' },
  { name: 'Eye Contact', value: 87, color: '#f59e0b' }
];

const keyInsights = [
  {
    category: 'Strengths',
    items: [
      'Exceptional problem-solving skills demonstrated in system design',
      'Strong communication with clear articulation of complex concepts',
      'High cultural alignment with company values',
      'Proactive learning mindset and adaptability'
    ]
  },
  {
    category: 'Areas for Development',
    items: [
      'Leadership experience could be enhanced with more team management',
      'Advanced architecture patterns knowledge needs improvement',
      'Public speaking confidence in larger groups'
    ]
  },
  {
    category: 'Red Flags',
    items: [
      'None detected - all responses were authentic and consistent'
    ]
  }
];

const transcript = [
  { timestamp: '00:02:15', speaker: 'Interviewer', text: 'Can you walk me through your approach to designing a scalable microservices architecture?' },
  { timestamp: '00:02:18', speaker: 'Candidate', text: 'Absolutely. I\'d start by identifying the business domains and bounded contexts. For each service, I consider the single responsibility principle...' },
  { timestamp: '00:03:45', speaker: 'Interviewer', text: 'How would you handle data consistency across services?' },
  { timestamp: '00:03:48', speaker: 'Candidate', text: 'Great question. I\'d implement the Saga pattern for distributed transactions, using either choreography or orchestration depending on the complexity...' }
];

export default function CandidateDetail() {
  const { id } = useParams();
  const [activeTab, setActiveTab] = useState('overview');

  const getRecommendationColor = (recommendation: string) => {
    switch (recommendation) {
      case 'strong_hire': return 'bg-green-500/10 text-green-500';
      case 'hire': return 'bg-blue-500/10 text-blue-500';
      case 'no_hire': return 'bg-red-500/10 text-red-500';
      default: return 'bg-yellow-500/10 text-yellow-500';
    }
  };

  const getRecommendationText = (recommendation: string) => {
    switch (recommendation) {
      case 'strong_hire': return '🚀 Strong Hire';
      case 'hire': return '✅ Hire';
      case 'no_hire': return '❌ No Hire';
      default: return '⚠️ Mixed';
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <Link
            to="/sessions"
            className="flex items-center space-x-2 text-muted-foreground hover:text-foreground transition-colors"
          >
            <ArrowLeft className="w-5 h-5" />
            <span>Back to Sessions</span>
          </Link>
          <div className="h-6 w-px bg-border" />
          <div>
            <h1 className="text-3xl font-bold text-foreground">{candidateData.name}</h1>
            <p className="text-muted-foreground">{candidateData.position} • {candidateData.experience} experience</p>
          </div>
        </div>
        <div className="flex items-center space-x-2">
          <button className="flex items-center space-x-2 px-3 py-2 text-sm bg-secondary hover:bg-secondary/80 rounded-lg transition-colors">
            <Share2 className="w-4 h-4" />
            <span>Share</span>
          </button>
          <button className="flex items-center space-x-2 px-3 py-2 text-sm bg-primary hover:bg-primary/90 text-primary-foreground rounded-lg transition-colors">
            <Download className="w-4 h-4" />
            <span>Export Report</span>
          </button>
        </div>
      </div>

      {/* Candidate Summary */}
      <div className="bg-card border border-border rounded-xl p-6">
        <div className="flex items-start justify-between">
          <div className="flex items-start space-x-6">
            <div className="w-20 h-20 bg-gradient-to-br from-blue-500 to-cyan-500 rounded-xl flex items-center justify-center">
              <span className="text-2xl font-bold text-white">SJ</span>
            </div>
            <div className="space-y-3">
              <div className="grid grid-cols-2 gap-6">
                <div className="flex items-center space-x-2 text-sm">
                  <Mail className="w-4 h-4 text-muted-foreground" />
                  <span className="text-foreground">{candidateData.email}</span>
                </div>
                <div className="flex items-center space-x-2 text-sm">
                  <Phone className="w-4 h-4 text-muted-foreground" />
                  <span className="text-foreground">{candidateData.phone}</span>
                </div>
                <div className="flex items-center space-x-2 text-sm">
                  <Calendar className="w-4 h-4 text-muted-foreground" />
                  <span className="text-foreground">{new Date(candidateData.interview_date).toLocaleDateString()}</span>
                </div>
                <div className="flex items-center space-x-2 text-sm">
                  <Clock className="w-4 h-4 text-muted-foreground" />
                  <span className="text-foreground">{candidateData.duration} minutes</span>
                </div>
                <div className="flex items-center space-x-2 text-sm">
                  <User className="w-4 h-4 text-muted-foreground" />
                  <span className="text-foreground">Interviewed by {candidateData.interviewer}</span>
                </div>
              </div>
            </div>
          </div>
          <div className="text-right">
            <div className="text-4xl font-bold text-foreground mb-1">{candidateData.overall_score}%</div>
            <div className="text-sm text-muted-foreground mb-3">Overall Score</div>
            <div className={`inline-flex items-center px-3 py-2 rounded-full text-sm font-medium ${getRecommendationColor(candidateData.recommendation)}`}>
              {getRecommendationText(candidateData.recommendation)}
            </div>
          </div>
        </div>
      </div>

      {/* Navigation Tabs */}
      <div className="flex space-x-1 bg-muted p-1 rounded-lg">
        {[
          { id: 'overview', label: 'Overview', icon: Eye },
          { id: 'scoring', label: 'Detailed Scoring', icon: Award },
          { id: 'integrity', label: 'Integrity Analysis', icon: Shield },
          { id: 'transcript', label: 'Transcript', icon: MessageSquare },
          { id: 'authentication', label: 'Authentication', icon: Camera }
        ].map((tab) => {
          const IconComponent = tab.icon;
          return (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex-1 flex items-center justify-center space-x-2 py-2 px-4 text-sm font-medium rounded-md transition-colors ${
                activeTab === tab.id
                  ? 'bg-background text-foreground shadow-sm'
                  : 'text-muted-foreground hover:text-foreground'
              }`}
            >
              <IconComponent className="w-4 h-4" />
              <span>{tab.label}</span>
            </button>
          );
        })}
      </div>

      {/* Tab Content */}
      {activeTab === 'overview' && (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Competency Radar */}
          <div className="bg-card border border-border rounded-xl p-6">
            <h3 className="text-lg font-semibold text-foreground mb-4">Competency Assessment</h3>
            <div className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <RadarChart data={competencyScores}>
                  <PolarGrid stroke="hsl(var(--border))" />
                  <PolarAngleAxis dataKey="skill" tick={{ fontSize: 12, fill: 'hsl(var(--muted-foreground))' }} />
                  <PolarRadiusAxis angle={90} domain={[0, 100]} tick={{ fontSize: 10, fill: 'hsl(var(--muted-foreground))' }} />
                  <Radar
                    name="Candidate"
                    dataKey="score"
                    stroke="hsl(var(--primary))"
                    fill="hsl(var(--primary) / 0.3)"
                    strokeWidth={2}
                  />
                  <Radar
                    name="Benchmark"
                    dataKey="benchmark"
                    stroke="#64748b"
                    fill="rgba(100, 116, 139, 0.1)"
                    strokeWidth={2}
                  />
                </RadarChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* Engagement Timeline */}
          <div className="bg-card border border-border rounded-xl p-6">
            <h3 className="text-lg font-semibold text-foreground mb-4">Engagement & Stress Levels</h3>
            <div className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={engagementTimeline}>
                  <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                  <XAxis dataKey="time" stroke="hsl(var(--muted-foreground))" fontSize={12} />
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
                    dataKey="engagement"
                    stroke="hsl(var(--primary))"
                    strokeWidth={2}
                    dot={{ fill: 'hsl(var(--primary))', strokeWidth: 2, r: 4 }}
                  />
                  <Line
                    type="monotone"
                    dataKey="stress"
                    stroke="#ef4444"
                    strokeWidth={2}
                    dot={{ fill: '#ef4444', strokeWidth: 2, r: 4 }}
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* Key Insights */}
          <div className="bg-card border border-border rounded-xl p-6 lg:col-span-2">
            <h3 className="text-lg font-semibold text-foreground mb-4">Key Insights</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {keyInsights.map((insight, index) => (
                <div key={index} className="space-y-3">
                  <h4 className={`font-medium ${
                    insight.category === 'Strengths' ? 'text-green-500' :
                    insight.category === 'Areas for Development' ? 'text-yellow-500' :
                    'text-red-500'
                  }`}>
                    {insight.category}
                  </h4>
                  <ul className="space-y-2">
                    {insight.items.map((item, itemIndex) => (
                      <li key={itemIndex} className="text-sm text-muted-foreground flex items-start space-x-2">
                        <div className={`w-1.5 h-1.5 rounded-full mt-2 flex-shrink-0 ${
                          insight.category === 'Strengths' ? 'bg-green-500' :
                          insight.category === 'Areas for Development' ? 'bg-yellow-500' :
                          'bg-red-500'
                        }`} />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {activeTab === 'scoring' && (
        <div className="space-y-6">
          {/* Section Breakdown */}
          <div className="bg-card border border-border rounded-xl p-6">
            <h3 className="text-lg font-semibold text-foreground mb-4">Section-by-Section Analysis</h3>
            <div className="space-y-4">
              {sectionScores.map((section, index) => (
                <div key={index} className="p-4 bg-muted rounded-lg">
                  <div className="flex items-center justify-between mb-3">
                    <h4 className="font-medium text-foreground">{section.section}</h4>
                    <div className="flex items-center space-x-4 text-sm">
                      <span className="text-muted-foreground">Score: {section.score}%</span>
                      <span className="text-muted-foreground">Time: {section.time}m</span>
                      <span className="text-muted-foreground">Confidence: {section.confidence}%</span>
                    </div>
                  </div>
                  <div className="grid grid-cols-3 gap-2">
                    <div className="bg-background rounded-full h-2">
                      <div
                        className="bg-primary h-2 rounded-full transition-all duration-500"
                        style={{ width: `${section.score}%` }}
                      />
                    </div>
                    <div className="bg-background rounded-full h-2">
                      <div
                        className="bg-green-500 h-2 rounded-full transition-all duration-500"
                        style={{ width: `${section.confidence}%` }}
                      />
                    </div>
                    <div className="bg-background rounded-full h-2">
                      <div
                        className="bg-blue-500 h-2 rounded-full transition-all duration-500"
                        style={{ width: `${(section.time / 30) * 100}%` }}
                      />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Detailed Competency Scores */}
          <div className="bg-card border border-border rounded-xl p-6">
            <h3 className="text-lg font-semibold text-foreground mb-4">Competency Breakdown</h3>
            <div className="space-y-4">
              {competencyScores.map((competency, index) => (
                <div key={index}>
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm font-medium text-foreground">{competency.skill}</span>
                    <div className="flex items-center space-x-2 text-xs">
                      <span className="text-primary">{competency.score}%</span>
                      <span className="text-muted-foreground">vs {competency.benchmark}% benchmark</span>
                    </div>
                  </div>
                  <div className="relative">
                    <div className="bg-muted rounded-full h-3">
                      <div
                        className="bg-primary h-3 rounded-full transition-all duration-500"
                        style={{ width: `${competency.score}%` }}
                      />
                    </div>
                    <div
                      className="absolute top-0 w-1 h-3 bg-muted-foreground"
                      style={{ left: `${competency.benchmark}%` }}
                    />
                  </div>
                  <div className="mt-1 text-xs text-muted-foreground">
                    {competency.score > competency.benchmark ?
                      `+${competency.score - competency.benchmark} points above benchmark` :
                      `${competency.benchmark - competency.score} points below benchmark`
                    }
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {activeTab === 'integrity' && (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Integrity Metrics */}
          <div className="bg-card border border-border rounded-xl p-6">
            <h3 className="text-lg font-semibold text-foreground mb-4">Integrity Analysis</h3>
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

          {/* Unfair Means Detection */}
          <div className="bg-card border border-border rounded-xl p-6">
            <h3 className="text-lg font-semibold text-foreground mb-4">Unfair Means Detection</h3>
            <div className="space-y-4">
              <div className="flex items-center justify-between p-3 bg-green-500/10 rounded-lg">
                <div className="flex items-center space-x-3">
                  <CheckCircle className="w-5 h-5 text-green-500" />
                  <span className="font-medium text-foreground">Screen Sharing</span>
                </div>
                <span className="text-sm text-green-500">Clean</span>
              </div>
              <div className="flex items-center justify-between p-3 bg-green-500/10 rounded-lg">
                <div className="flex items-center space-x-3">
                  <CheckCircle className="w-5 h-5 text-green-500" />
                  <span className="font-medium text-foreground">Tab Switching</span>
                </div>
                <span className="text-sm text-green-500">No violations</span>
              </div>
              <div className="flex items-center justify-between p-3 bg-green-500/10 rounded-lg">
                <div className="flex items-center space-x-3">
                  <CheckCircle className="w-5 h-5 text-green-500" />
                  <span className="font-medium text-foreground">Copy/Paste Activity</span>
                </div>
                <span className="text-sm text-green-500">Normal usage</span>
              </div>
              <div className="flex items-center justify-between p-3 bg-green-500/10 rounded-lg">
                <div className="flex items-center space-x-3">
                  <CheckCircle className="w-5 h-5 text-green-500" />
                  <span className="font-medium text-foreground">Voice Analysis</span>
                </div>
                <span className="text-sm text-green-500">Authentic</span>
              </div>
            </div>
          </div>

          {/* Behavioral Analysis */}
          <div className="bg-card border border-border rounded-xl p-6 lg:col-span-2">
            <h3 className="text-lg font-semibold text-foreground mb-4">Behavioral Analysis</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="text-center p-4 bg-muted rounded-lg">
                <Eye className="w-8 h-8 text-blue-500 mx-auto mb-2" />
                <div className="text-lg font-bold text-foreground">87%</div>
                <div className="text-sm text-muted-foreground">Eye Contact</div>
              </div>
              <div className="text-center p-4 bg-muted rounded-lg">
                <Mic className="w-8 h-8 text-green-500 mx-auto mb-2" />
                <div className="text-lg font-bold text-foreground">91%</div>
                <div className="text-sm text-muted-foreground">Speech Clarity</div>
              </div>
              <div className="text-center p-4 bg-muted rounded-lg">
                <Activity className="w-8 h-8 text-purple-500 mx-auto mb-2" />
                <div className="text-lg font-bold text-foreground">89%</div>
                <div className="text-sm text-muted-foreground">Engagement Level</div>
              </div>
            </div>
          </div>
        </div>
      )}

      {activeTab === 'transcript' && (
        <div className="bg-card border border-border rounded-xl p-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold text-foreground">Interview Transcript</h3>
            <button className="flex items-center space-x-2 px-3 py-2 text-sm bg-muted hover:bg-muted/80 rounded-lg transition-colors">
              <Download className="w-4 h-4" />
              <span>Download Full Transcript</span>
            </button>
          </div>
          <div className="space-y-4 max-h-96 overflow-y-auto">
            {transcript.map((entry, index) => (
              <div key={index} className={`p-4 rounded-lg ${
                entry.speaker === 'Interviewer' ? 'bg-muted ml-8' : 'bg-primary/10 mr-8'
              }`}>
                <div className="flex items-center space-x-2 mb-2">
                  <span className={`text-sm font-medium ${
                    entry.speaker === 'Interviewer' ? 'text-muted-foreground' : 'text-primary'
                  }`}>
                    {entry.speaker}
                  </span>
                  <span className="text-xs text-muted-foreground">{entry.timestamp}</span>
                </div>
                <p className="text-foreground">{entry.text}</p>
              </div>
            ))}
          </div>
        </div>
      )}

      {activeTab === 'authentication' && (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Identity Verification */}
          <div className="bg-card border border-border rounded-xl p-6">
            <h3 className="text-lg font-semibold text-foreground mb-4">Identity Verification</h3>
            <div className="space-y-4">
              <div className="flex items-center justify-between p-3 bg-green-500/10 rounded-lg">
                <div className="flex items-center space-x-3">
                  <Camera className="w-5 h-5 text-green-500" />
                  <span className="font-medium text-foreground">Face Recognition</span>
                </div>
                <span className="text-sm text-green-500">✓ Verified</span>
              </div>
              <div className="flex items-center justify-between p-3 bg-green-500/10 rounded-lg">
                <div className="flex items-center space-x-3">
                  <FileText className="w-5 h-5 text-green-500" />
                  <span className="font-medium text-foreground">ID Document</span>
                </div>
                <span className="text-sm text-green-500">✓ Verified</span>
              </div>
              <div className="flex items-center justify-between p-3 bg-green-500/10 rounded-lg">
                <div className="flex items-center space-x-3">
                  <Mic className="w-5 h-5 text-green-500" />
                  <span className="font-medium text-foreground">Voice Print</span>
                </div>
                <span className="text-sm text-green-500">✓ Match</span>
              </div>
            </div>
          </div>

          {/* Technical Monitoring */}
          <div className="bg-card border border-border rounded-xl p-6">
            <h3 className="text-lg font-semibold text-foreground mb-4">Technical Monitoring</h3>
            <div className="space-y-4">
              <div className="flex items-center justify-between p-3 bg-muted rounded-lg">
                <div className="flex items-center space-x-3">
                  <Monitor className="w-5 h-5 text-muted-foreground" />
                  <span className="font-medium text-foreground">Screen Recording</span>
                </div>
                <span className="text-sm text-muted-foreground">Available</span>
              </div>
              <div className="flex items-center justify-between p-3 bg-muted rounded-lg">
                <div className="flex items-center space-x-3">
                  <Camera className="w-5 h-5 text-muted-foreground" />
                  <span className="font-medium text-foreground">Video Recording</span>
                </div>
                <span className="text-sm text-muted-foreground">62 minutes</span>
              </div>
              <div className="flex items-center justify-between p-3 bg-muted rounded-lg">
                <div className="flex items-center space-x-3">
                  <Mic className="w-5 h-5 text-muted-foreground" />
                  <span className="font-medium text-foreground">Audio Recording</span>
                </div>
                <span className="text-sm text-muted-foreground">High quality</span>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
