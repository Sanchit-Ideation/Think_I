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
  Cell,
  ComposedChart
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
  Activity,
  Brain,
  Target,
  TrendingUp,
  Play,
  Pause,
  Volume2,
  Edit,
  Send
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
  ai_score: 87,
  interviewer_score: 85,
  behavioral_score: 92,
  integrity_status: 'Clean',
  final_verdict: 'Highly Recommended',
  interviewer: 'John Smith'
};

const interviewStages = [
  { stage: 'Introduction', ai_score: 88, interviewer_score: 85, duration: 3, status: 'completed' },
  { stage: 'Technical Assessment', ai_score: 85, interviewer_score: 87, duration: 25, status: 'completed' },
  { stage: 'System Design', ai_score: 82, interviewer_score: 83, duration: 20, status: 'completed' },
  { stage: 'Behavioral Questions', ai_score: 94, interviewer_score: 91, duration: 12, status: 'completed' },
  { stage: 'Q&A Session', ai_score: 86, interviewer_score: 84, duration: 2, status: 'completed' }
];

const technicalSkills = [
  { skill: 'SQL', candidate_score: 88, role_average: 82, explanation: 'Strong database querying and optimization skills' },
  { skill: 'Tableau', candidate_score: 76, role_average: 79, explanation: 'Good visualization skills, room for advanced features' },
  { skill: 'Data Analysis', candidate_score: 92, role_average: 85, explanation: 'Excellent analytical thinking and pattern recognition' },
  { skill: 'Python', candidate_score: 85, role_average: 80, explanation: 'Solid programming fundamentals and data manipulation' },
  { skill: 'AWS', candidate_score: 74, role_average: 77, explanation: 'Basic cloud knowledge, needs more hands-on experience' }
];

const competencyComparison = [
  { skill: 'Critical Reasoning', ai_score: 85, interviewer_score: 87, explanation: 'Strong logical thinking and problem decomposition abilities' },
  { skill: 'Domain Knowledge', ai_score: 89, interviewer_score: 91, explanation: 'Deep understanding of technical concepts and industry practices' },
  { skill: 'Analytical Thinking', ai_score: 82, interviewer_score: 85, explanation: 'Good analytical approach, methodical problem solving' },
  { skill: 'Conciseness', ai_score: 88, interviewer_score: 86, explanation: 'Clear and concise communication, well-structured responses' }
];

const behavioralScores = [
  { metric: 'Decision-Making Ability', score: 89, description: 'Makes well-reasoned decisions under pressure' },
  { metric: 'Emotional Awareness', score: 94, description: 'High emotional intelligence, empathetic responses' },
  { metric: 'Integrity & Authenticity', score: 96, description: 'Genuine responses, transparent about limitations' },
  { metric: 'Leadership Potential', score: 78, description: 'Shows promise but needs more leadership experience' },
  { metric: 'Team Collaboration', score: 92, description: 'Strong collaborative mindset and communication' }
];

const speakAnalysis = [
  { time: '0-10 min', candidate_percentage: 65, interviewer_percentage: 35, candidate_words: 450, interviewer_words: 240 },
  { time: '10-20 min', candidate_percentage: 78, interviewer_percentage: 22, candidate_words: 680, interviewer_words: 190 },
  { time: '20-30 min', candidate_percentage: 82, interviewer_percentage: 18, candidate_words: 720, interviewer_words: 160 },
  { time: '30-40 min', candidate_percentage: 58, interviewer_percentage: 42, candidate_words: 380, interviewer_words: 280 },
  { time: '40-50 min', candidate_percentage: 45, interviewer_percentage: 55, candidate_words: 290, interviewer_words: 360 },
  { time: '50-62 min', candidate_percentage: 62, interviewer_percentage: 38, candidate_words: 340, interviewer_words: 210 }
];

const transcript = [
  { timestamp: '00:02:15', speaker: 'Interviewer', text: 'Can you walk me through your approach to designing a scalable microservices architecture?', sentiment: 'neutral' },
  { timestamp: '00:02:18', speaker: 'Candidate', text: 'Absolutely. I\'d start by identifying the business domains and bounded contexts. For each service, I consider the single responsibility principle...', sentiment: 'confident' },
  { timestamp: '00:03:45', speaker: 'Interviewer', text: 'How would you handle data consistency across services?', sentiment: 'neutral' },
  { timestamp: '00:03:48', speaker: 'Candidate', text: 'Great question. I\'d implement the Saga pattern for distributed transactions, using either choreography or orchestration depending on the complexity...', sentiment: 'confident' },
  { timestamp: '00:05:12', speaker: 'Interviewer', text: 'Tell me about a time when you had to work with a difficult team member.', sentiment: 'neutral' },
  { timestamp: '00:05:15', speaker: 'Candidate', text: 'I once worked with a colleague who was very resistant to code reviews. Instead of confronting them directly, I...', sentiment: 'thoughtful' }
];

const chatNotes = [
  { id: 1, author: 'John Smith', time: '14:15', message: 'Candidate shows strong technical foundation', type: 'note' },
  { id: 2, author: 'AI Assistant', time: '14:22', message: 'Detected confident tone during system design discussion', type: 'ai_insight' },
  { id: 3, author: 'John Smith', time: '14:35', message: 'Need to explore leadership experience more', type: 'note' },
  { id: 4, author: 'AI Assistant', time: '14:45', message: 'Communication clarity score: 94/100', type: 'ai_insight' },
  { id: 5, author: 'John Smith', time: '15:10', message: 'Overall impression: very positive, strong candidate', type: 'note' }
];

export default function CandidateDetail() {
  const { id } = useParams();
  const [activeTab, setActiveTab] = useState('summary');
  const [newNote, setNewNote] = useState('');
  const [isPlaying, setIsPlaying] = useState(false);

  const getVerdictColor = (verdict: string) => {
    switch (verdict) {
      case 'Highly Recommended': return 'bg-green-500/10 text-green-500';
      case 'Consider': return 'bg-yellow-500/10 text-yellow-500';
      case 'Not Recommended': return 'bg-red-500/10 text-red-500';
      default: return 'bg-gray-500/10 text-gray-500';
    }
  };

  const getSentimentColor = (sentiment: string) => {
    switch (sentiment) {
      case 'confident': return 'text-green-600';
      case 'thoughtful': return 'text-blue-600';
      case 'nervous': return 'text-yellow-600';
      case 'neutral': return 'text-gray-600';
      default: return 'text-gray-600';
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <Link
            to="/report"
            className="flex items-center space-x-2 text-muted-foreground hover:text-foreground transition-colors"
          >
            <ArrowLeft className="w-5 h-5" />
            <span>Back to Reports</span>
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
                <div className="flex items-center space-x-2 text-sm">
                  <Shield className="w-4 h-4 text-muted-foreground" />
                  <span className="text-foreground">Integrity: {candidateData.integrity_status}</span>
                </div>
              </div>
            </div>
          </div>
          <div className="text-right">
            <div className="grid grid-cols-3 gap-4 mb-4">
              <div className="text-center">
                <div className="text-2xl font-bold text-blue-600">{candidateData.ai_score}</div>
                <div className="text-xs text-muted-foreground">AI Score</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-green-600">{candidateData.interviewer_score}</div>
                <div className="text-xs text-muted-foreground">Interviewer</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-purple-600">{candidateData.behavioral_score}</div>
                <div className="text-xs text-muted-foreground">Behavioral</div>
              </div>
            </div>
            <div className={`inline-flex items-center px-3 py-2 rounded-full text-sm font-medium ${getVerdictColor(candidateData.final_verdict)}`}>
              {candidateData.final_verdict}
            </div>
          </div>
        </div>
      </div>

      {/* Navigation Tabs */}
      <div className="flex space-x-1 bg-muted p-1 rounded-lg">
        {[
          { id: 'summary', label: 'Summary', icon: FileText },
          { id: 'recording', label: 'Recording & Transcript', icon: Mic },
          { id: 'competencies', label: 'Competencies Analysis', icon: Target },
          { id: 'behavioral', label: 'Behavioral Score', icon: Brain },
          { id: 'chat', label: 'Chat & Notes', icon: MessageSquare }
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
      {activeTab === 'summary' && (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Interview Summary */}
          <div className="bg-card border border-border rounded-xl p-6">
            <h3 className="text-lg font-semibold text-foreground mb-4">Interview Summary</h3>
            <div className="space-y-4">
              <div className="p-4 bg-muted rounded-lg">
                <div className="flex items-center space-x-2 mb-2">
                  <Award className="w-5 h-5 text-primary" />
                  <span className="font-medium text-foreground">Overall Performance</span>
                </div>
                <p className="text-sm text-muted-foreground">
                  Sarah demonstrated exceptional technical skills and strong communication abilities. 
                  Her system design approach was methodical and well-reasoned. Behavioral responses 
                  showed high emotional intelligence and cultural alignment.
                </p>
              </div>
              <div className="p-4 bg-muted rounded-lg">
                <div className="flex items-center space-x-2 mb-2">
                  <TrendingUp className="w-5 h-5 text-green-500" />
                  <span className="font-medium text-foreground">Key Strengths</span>
                </div>
                <ul className="text-sm text-muted-foreground space-y-1">
                  <li>• Strong technical fundamentals and coding practices</li>
                  <li>• Excellent communication and problem explanation</li>
                  <li>• High emotional intelligence and team collaboration</li>
                  <li>• Adaptable and open to feedback</li>
                </ul>
              </div>
              <div className="p-4 bg-muted rounded-lg">
                <div className="flex items-center space-x-2 mb-2">
                  <AlertTriangle className="w-5 h-5 text-yellow-500" />
                  <span className="font-medium text-foreground">Development Areas</span>
                </div>
                <ul className="text-sm text-muted-foreground space-y-1">
                  <li>• Limited experience in large-scale system architecture</li>
                  <li>• Could benefit from more leadership opportunities</li>
                  <li>• Advanced algorithm optimization knowledge</li>
                </ul>
              </div>
            </div>
          </div>

          {/* Interview Stages */}
          <div className="bg-card border border-border rounded-xl p-6">
            <h3 className="text-lg font-semibold text-foreground mb-4">Interview Stages Performance</h3>
            <div className="space-y-4">
              {interviewStages.map((stage, index) => (
                <div key={index} className="p-4 bg-muted rounded-lg">
                  <div className="flex items-center justify-between mb-3">
                    <div className="flex items-center space-x-2">
                      <CheckCircle className="w-4 h-4 text-green-500" />
                      <span className="font-medium text-foreground">{stage.stage}</span>
                    </div>
                    <span className="text-xs text-muted-foreground">{stage.duration} min</span>
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <div className="flex items-center justify-between mb-1">
                        <span className="text-xs text-muted-foreground">AI Score</span>
                        <span className="text-xs text-foreground">{stage.ai_score}%</span>
                      </div>
                      <div className="bg-background rounded-full h-2">
                        <div
                          className="bg-blue-500 h-2 rounded-full"
                          style={{ width: `${stage.ai_score}%` }}
                        />
                      </div>
                    </div>
                    <div>
                      <div className="flex items-center justify-between mb-1">
                        <span className="text-xs text-muted-foreground">Interviewer</span>
                        <span className="text-xs text-foreground">{stage.interviewer_score}%</span>
                      </div>
                      <div className="bg-background rounded-full h-2">
                        <div
                          className="bg-green-500 h-2 rounded-full"
                          style={{ width: `${stage.interviewer_score}%` }}
                        />
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {activeTab === 'recording' && (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Recording Controls */}
          <div className="bg-card border border-border rounded-xl p-6">
            <h3 className="text-lg font-semibold text-foreground mb-4">Recording Playback</h3>
            <div className="space-y-4">
              <div className="bg-muted rounded-lg p-4 text-center">
                <Camera className="w-12 h-12 text-muted-foreground mx-auto mb-2" />
                <p className="text-sm text-muted-foreground">Video Recording Available</p>
                <p className="text-xs text-muted-foreground">Duration: {candidateData.duration} minutes</p>
              </div>
              <div className="flex items-center justify-center space-x-4">
                <button
                  onClick={() => setIsPlaying(!isPlaying)}
                  className="flex items-center space-x-2 px-4 py-2 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition-colors"
                >
                  {isPlaying ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4" />}
                  <span>{isPlaying ? 'Pause' : 'Play'}</span>
                </button>
                <button className="p-2 bg-secondary text-secondary-foreground rounded-lg hover:bg-secondary/80 transition-colors">
                  <Volume2 className="w-4 h-4" />
                </button>
              </div>
              <div className="bg-background rounded-full h-2">
                <div className="bg-primary h-2 rounded-full" style={{ width: '35%' }} />
              </div>
              <p className="text-xs text-center text-muted-foreground">21:45 / 62:00</p>
            </div>
          </div>

          {/* Speaking Analysis */}
          <div className="bg-card border border-border rounded-xl p-6">
            <h3 className="text-lg font-semibold text-foreground mb-4">Speaking Time Analysis</h3>
            <div className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={speakAnalysis}>
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
                  <Bar dataKey="candidate_percentage" fill="hsl(var(--primary))" name="Candidate %" />
                  <Bar dataKey="interviewer_percentage" fill="#22c55e" name="Interviewer %" />
                </BarChart>
              </ResponsiveContainer>
            </div>
            <div className="mt-4 text-center">
              <div className="flex justify-center space-x-4 text-sm">
                <div className="flex items-center space-x-2">
                  <div className="w-3 h-3 bg-primary rounded" />
                  <span className="text-muted-foreground">Candidate: 2,860 words</span>
                </div>
                <div className="flex items-center space-x-2">
                  <div className="w-3 h-3 bg-green-500 rounded" />
                  <span className="text-muted-foreground">Interviewer: 1,440 words</span>
                </div>
              </div>
            </div>
          </div>

          {/* Transcript */}
          <div className="bg-card border border-border rounded-xl p-6">
            <h3 className="text-lg font-semibold text-foreground mb-4">Interview Transcript</h3>
            <div className="space-y-4 max-h-96 overflow-y-auto">
              {transcript.map((entry, index) => (
                <div key={index} className={`p-3 rounded-lg ${
                  entry.speaker === 'Interviewer' ? 'bg-muted ml-4' : 'bg-primary/10 mr-4'
                }`}>
                  <div className="flex items-center space-x-2 mb-2">
                    <span className={`text-sm font-medium ${
                      entry.speaker === 'Interviewer' ? 'text-muted-foreground' : 'text-primary'
                    }`}>
                      {entry.speaker}
                    </span>
                    <span className="text-xs text-muted-foreground">{entry.timestamp}</span>
                    <span className={`text-xs ${getSentimentColor(entry.sentiment)}`}>
                      {entry.sentiment}
                    </span>
                  </div>
                  <p className="text-foreground text-sm">{entry.text}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {activeTab === 'competencies' && (
        <div className="space-y-8">
          {/* AI vs Interviewer Comparison */}
          <div className="bg-card border border-border rounded-xl p-6">
            <h3 className="text-lg font-semibold text-foreground mb-4">AI vs Interviewer Score Comparison</h3>
            <div className="space-y-6">
              {competencyComparison.map((competency, index) => (
                <div key={index} className="p-4 bg-muted rounded-lg">
                  <div className="flex items-center justify-between mb-3">
                    <h4 className="font-medium text-foreground">{competency.skill}</h4>
                    <div className="flex items-center space-x-4 text-sm">
                      <span className="text-blue-600">AI: {competency.ai_score}%</span>
                      <span className="text-green-600">Human: {competency.interviewer_score}%</span>
                    </div>
                  </div>
                  <div className="grid grid-cols-2 gap-4 mb-3">
                    <div>
                      <div className="bg-background rounded-full h-3">
                        <div
                          className="bg-blue-500 h-3 rounded-full"
                          style={{ width: `${competency.ai_score}%` }}
                        />
                      </div>
                    </div>
                    <div>
                      <div className="bg-background rounded-full h-3">
                        <div
                          className="bg-green-500 h-3 rounded-full"
                          style={{ width: `${competency.interviewer_score}%` }}
                        />
                      </div>
                    </div>
                  </div>
                  <p className="text-sm text-muted-foreground">{competency.explanation}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Competency Radar */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <div className="bg-card border border-border rounded-xl p-6">
              <h3 className="text-lg font-semibold text-foreground mb-4">Competency Overview</h3>
              <div className="h-64">
                <ResponsiveContainer width="100%" height="100%">
                  <RadarChart data={competencyComparison}>
                    <PolarGrid stroke="hsl(var(--border))" />
                    <PolarAngleAxis dataKey="skill" tick={{ fontSize: 12, fill: 'hsl(var(--muted-foreground))' }} />
                    <PolarRadiusAxis angle={90} domain={[0, 100]} tick={{ fontSize: 10, fill: 'hsl(var(--muted-foreground))' }} />
                    <Radar
                      name="AI Score"
                      dataKey="ai_score"
                      stroke="hsl(var(--primary))"
                      fill="hsl(var(--primary) / 0.3)"
                      strokeWidth={2}
                    />
                    <Radar
                      name="Interviewer Score"
                      dataKey="interviewer_score"
                      stroke="#22c55e"
                      fill="rgba(34, 197, 94, 0.2)"
                      strokeWidth={2}
                    />
                  </RadarChart>
                </ResponsiveContainer>
              </div>
            </div>

            <div className="bg-card border border-border rounded-xl p-6">
              <h3 className="text-lg font-semibold text-foreground mb-4">Score Analysis</h3>
              <div className="space-y-4">
                <div className="p-4 bg-green-500/10 border border-green-500/20 rounded-lg">
                  <div className="flex items-start space-x-3">
                    <CheckCircle className="w-5 h-5 text-green-500 mt-0.5" />
                    <div>
                      <div className="font-medium text-green-700 mb-1">Strong Alignment</div>
                      <div className="text-sm text-green-600">AI and interviewer scores are closely aligned (±5%), indicating consistent evaluation and reliable assessment.</div>
                    </div>
                  </div>
                </div>
                <div className="p-4 bg-blue-500/10 border border-blue-500/20 rounded-lg">
                  <div className="flex items-start space-x-3">
                    <Brain className="w-5 h-5 text-blue-500 mt-0.5" />
                    <div>
                      <div className="font-medium text-blue-700 mb-1">AI Insights</div>
                      <div className="text-sm text-blue-600">AI analysis focused on technical accuracy and problem-solving methodology, providing objective assessment.</div>
                    </div>
                  </div>
                </div>
                <div className="p-4 bg-purple-500/10 border border-purple-500/20 rounded-lg">
                  <div className="flex items-start space-x-3">
                    <User className="w-5 h-5 text-purple-500 mt-0.5" />
                    <div>
                      <div className="font-medium text-purple-700 mb-1">Human Perspective</div>
                      <div className="text-sm text-purple-600">Interviewer evaluation included practical experience assessment and cultural fit considerations.</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {activeTab === 'behavioral' && (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Behavioral Scores */}
          <div className="bg-card border border-border rounded-xl p-6">
            <h3 className="text-lg font-semibold text-foreground mb-4">AI Behavioral Analysis</h3>
            <div className="space-y-4">
              {behavioralScores.map((metric, index) => (
                <div key={index} className="p-4 bg-muted rounded-lg">
                  <div className="flex items-center justify-between mb-2">
                    <span className="font-medium text-foreground">{metric.metric}</span>
                    <span className="text-sm text-muted-foreground">{metric.score}%</span>
                  </div>
                  <div className="bg-background rounded-full h-3 mb-2">
                    <div
                      className="bg-purple-500 h-3 rounded-full"
                      style={{ width: `${metric.score}%` }}
                    />
                  </div>
                  <p className="text-sm text-muted-foreground">{metric.description}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Behavioral Insights */}
          <div className="bg-card border border-border rounded-xl p-6">
            <h3 className="text-lg font-semibold text-foreground mb-4">Behavioral Insights</h3>
            <div className="space-y-4">
              <div className="p-4 bg-green-500/10 border border-green-500/20 rounded-lg">
                <div className="flex items-start space-x-3">
                  <Award className="w-5 h-5 text-green-500 mt-0.5" />
                  <div>
                    <div className="font-medium text-green-700 mb-1">Exceptional Emotional Intelligence</div>
                    <div className="text-sm text-green-600">Scored 94% in emotional awareness, demonstrating strong empathy and interpersonal skills essential for team collaboration.</div>
                  </div>
                </div>
              </div>
              <div className="p-4 bg-blue-500/10 border border-blue-500/20 rounded-lg">
                <div className="flex items-start space-x-3">
                  <Shield className="w-5 h-5 text-blue-500 mt-0.5" />
                  <div>
                    <div className="font-medium text-blue-700 mb-1">High Integrity Score</div>
                    <div className="text-sm text-blue-600">96% authenticity rating indicates genuine responses and transparent communication throughout the interview.</div>
                  </div>
                </div>
              </div>
              <div className="p-4 bg-yellow-500/10 border border-yellow-500/20 rounded-lg">
                <div className="flex items-start space-x-3">
                  <TrendingUp className="w-5 h-5 text-yellow-500 mt-0.5" />
                  <div>
                    <div className="font-medium text-yellow-700 mb-1">Leadership Development Opportunity</div>
                    <div className="text-sm text-yellow-600">78% leadership potential suggests room for growth. Consider mentorship or leadership training programs.</div>
                  </div>
                </div>
              </div>
              <div className="p-4 bg-purple-500/10 border border-purple-500/20 rounded-lg">
                <div className="flex items-start space-x-3">
                  <Brain className="w-5 h-5 text-purple-500 mt-0.5" />
                  <div>
                    <div className="font-medium text-purple-700 mb-1">Strong Decision-Making</div>
                    <div className="text-sm text-purple-600">89% score in decision-making ability shows capacity for independent judgment and problem resolution.</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {activeTab === 'chat' && (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Chat History */}
          <div className="bg-card border border-border rounded-xl p-6">
            <h3 className="text-lg font-semibold text-foreground mb-4">Interview Notes & Insights</h3>
            <div className="space-y-4 max-h-96 overflow-y-auto">
              {chatNotes.map((note) => (
                <div key={note.id} className={`p-3 rounded-lg ${
                  note.type === 'ai_insight' ? 'bg-blue-500/10 border border-blue-500/20' : 'bg-muted'
                }`}>
                  <div className="flex items-center space-x-2 mb-2">
                    {note.type === 'ai_insight' ? (
                      <Brain className="w-4 h-4 text-blue-500" />
                    ) : (
                      <User className="w-4 h-4 text-muted-foreground" />
                    )}
                    <span className="text-sm font-medium text-foreground">{note.author}</span>
                    <span className="text-xs text-muted-foreground">{note.time}</span>
                  </div>
                  <p className="text-sm text-foreground">{note.message}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Add New Note */}
          <div className="bg-card border border-border rounded-xl p-6">
            <h3 className="text-lg font-semibold text-foreground mb-4">Add Note</h3>
            <div className="space-y-4">
              <textarea
                value={newNote}
                onChange={(e) => setNewNote(e.target.value)}
                placeholder="Add your notes about this candidate..."
                className="w-full px-3 py-2 bg-background border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary resize-none h-32"
              />
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <Edit className="w-4 h-4 text-muted-foreground" />
                  <span className="text-sm text-muted-foreground">Add to interview record</span>
                </div>
                <button className="flex items-center space-x-2 px-4 py-2 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition-colors">
                  <Send className="w-4 h-4" />
                  <span>Add Note</span>
                </button>
              </div>
            </div>

            {/* Quick Actions */}
            <div className="mt-6 pt-6 border-t border-border">
              <h4 className="font-medium text-foreground mb-3">Quick Actions</h4>
              <div className="grid grid-cols-2 gap-3">
                <button className="flex items-center space-x-2 p-3 bg-green-500/10 text-green-700 rounded-lg hover:bg-green-500/20 transition-colors text-sm">
                  <CheckCircle className="w-4 h-4" />
                  <span>Recommend Hire</span>
                </button>
                <button className="flex items-center space-x-2 p-3 bg-yellow-500/10 text-yellow-700 rounded-lg hover:bg-yellow-500/20 transition-colors text-sm">
                  <Clock className="w-4 h-4" />
                  <span>Schedule Follow-up</span>
                </button>
                <button className="flex items-center space-x-2 p-3 bg-blue-500/10 text-blue-700 rounded-lg hover:bg-blue-500/20 transition-colors text-sm">
                  <Share2 className="w-4 h-4" />
                  <span>Share with Team</span>
                </button>
                <button className="flex items-center space-x-2 p-3 bg-purple-500/10 text-purple-700 rounded-lg hover:bg-purple-500/20 transition-colors text-sm">
                  <Download className="w-4 h-4" />
                  <span>Export Summary</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
