import { ArrowLeft, Download, Calendar, User, Award, Target, TrendingUp, Users, Brain, BarChart3, Eye } from 'lucide-react';
import { ResponsiveContainer, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, PieChart, Pie, Cell, LineChart, Line, RadarChart, Radar, PolarGrid, PolarAngleAxis, PolarRadiusAxis, FunnelChart, Funnel, LabelList } from 'recharts';

interface TemplateDetailViewProps {
  template: any;
  onBack: () => void;
}


const trendData = [
  { month: "Jul", evaluated: 15 },
  { month: "Aug", evaluated: 22 },
  { month: "Sep", evaluated: 28 },
  { month: "Oct", evaluated: 35 },
  { month: "Nov", evaluated: 31 },
  { month: "Dec", evaluated: 38 }
];

const competencyTrends = [
  { competency: "Technical Skills", weight: 90, performance: 82, criticality: "High" },
  { competency: "Communication", weight: 75, performance: 88, criticality: "Medium" },
  { competency: "Problem Solving", weight: 85, performance: 79, criticality: "High" },
  { competency: "Leadership", weight: 60, performance: 72, criticality: "Low" },
  { competency: "Cultural Fit", weight: 70, performance: 85, criticality: "Medium" }
];

const funnelData = [
  { name: "Scheduled", value: 234, fill: "#8b5cf6" },
  { name: "Interviewed", value: 198, fill: "#7c3aed" },
  { name: "Cancelled", value: 36, fill: "#ef4444" },
  { name: "Evaluated", value: 178, fill: "#6d28d9" }
];

const topQuestions = [
  { question: "Describe your approach to system design", skillCovered: "System Architecture" },
  { question: "How do you handle technical debt?", skillCovered: "Code Quality Management" },
  { question: "Walk through a challenging bug you fixed", skillCovered: "Problem Solving" },
  { question: "Explain your testing strategy", skillCovered: "Quality Assurance" },
  { question: "How do you optimize database queries?", skillCovered: "Database Optimization" }
];

const behavioralTraits = [
  { trait: "Confident", percentage: 45, color: "#22c55e" },
  { trait: "Analytical", percentage: 32, color: "#3b82f6" },
  { trait: "Collaborative", percentage: 28, color: "#f59e0b" },
  { trait: "Innovative", percentage: 25, color: "#8b5cf6" }
];


export default function TemplateDetailView({ template, onBack }: TemplateDetailViewProps) {
  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <button
            onClick={onBack}
            className="flex items-center space-x-2 text-muted-foreground hover:text-foreground transition-colors"
          >
            <ArrowLeft className="w-5 h-5" />
            <span>Back to Templates</span>
          </button>
          <div className="h-6 w-px bg-border" />
          <div>
            <h1 className="text-3xl font-bold text-foreground">{template.template}</h1>
            <p className="text-muted-foreground">{template.department} • {template.role}</p>
          </div>
        </div>
        <div className="flex items-center space-x-2">
          <button className="flex items-center space-x-2 px-3 py-2 text-sm bg-primary hover:bg-primary/90 text-primary-foreground rounded-lg transition-colors">
            <Download className="w-4 h-4" />
            <span>Export Report</span>
          </button>
        </div>
      </div>

      {/* Template Info Header */}
      <div className="bg-card border border-border rounded-xl p-6">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <div>
            <p className="text-sm text-muted-foreground">Created By</p>
            <p className="font-medium text-foreground">{template.createdBy}</p>
          </div>
          <div>
            <p className="text-sm text-muted-foreground">Creation Date</p>
            <p className="font-medium text-foreground">{new Date(template.creationDate).toLocaleDateString()}</p>
          </div>
          <div>
            <p className="text-sm text-muted-foreground">Department</p>
            <p className="font-medium text-foreground">{template.department}</p>
          </div>
          <div>
            <p className="text-sm text-muted-foreground">Role</p>
            <p className="font-medium text-foreground">{template.role}</p>
          </div>
        </div>
      </div>

      {/* Key Metrics Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-6 gap-6">
        <div className="bg-card border border-border rounded-xl p-6">
          <div className="flex items-center space-x-3">
            <Users className="w-8 h-8 text-blue-500" />
            <div>
              <p className="text-2xl font-bold text-foreground">{template.interviews}</p>
              <p className="text-sm text-muted-foreground">Total Interviews</p>
            </div>
          </div>
        </div>
        <div className="bg-card border border-border rounded-xl p-6">
          <div className="flex items-center space-x-3">
            <TrendingUp className="w-8 h-8 text-green-500" />
            <div>
              <p className="text-2xl font-bold text-foreground">{template.adoptionRate}%</p>
              <p className="text-sm text-muted-foreground">Adoption Rate</p>
            </div>
          </div>
        </div>
        <div className="bg-card border border-border rounded-xl p-6">
          <div className="flex items-center space-x-3">
            <Award className="w-8 h-8 text-purple-500" />
            <div>
              <p className="text-2xl font-bold text-foreground">{template.avgCandidateScore}%</p>
              <p className="text-sm text-muted-foreground">Avg. Candidate Score</p>
            </div>
          </div>
        </div>
        <div className="bg-card border border-border rounded-xl p-6">
          <div className="flex items-center space-x-3">
            <Eye className="w-8 h-8 text-orange-500" />
            <div>
              <p className="text-2xl font-bold text-foreground">{template.avgIntegrityScore}%</p>
              <p className="text-sm text-muted-foreground">Avg. Integrity Score</p>
            </div>
          </div>
        </div>
        <div className="bg-card border border-border rounded-xl p-6">
          <div className="flex items-center space-x-3">
            <Brain className="w-8 h-8 text-indigo-500" />
            <div>
              <p className="text-2xl font-bold text-foreground">{template.effectivenessScore}%</p>
              <p className="text-sm text-muted-foreground">Effectiveness Score</p>
            </div>
          </div>
        </div>
      </div>

      {/* Analytics Overview */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Trend Over Time */}
        <div className="bg-card border border-border rounded-xl p-6">
          <h3 className="text-lg font-semibold text-foreground mb-4">Trend Over Time</h3>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={trendData}>
                <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                <XAxis dataKey="month" stroke="hsl(var(--muted-foreground))" fontSize={12} />
                <YAxis stroke="hsl(var(--muted-foreground))" fontSize={12} />
                <Tooltip />
                <Line type="monotone" dataKey="evaluated" stroke="#8b5cf6" strokeWidth={2} name="Evaluated" />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Competency Weight vs Performance */}
        <div className="bg-card border border-border rounded-xl p-6">
          <h3 className="text-lg font-semibold text-foreground mb-4">Competency Weight vs Performance</h3>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <RadarChart data={competencyTrends}>
                <PolarGrid />
                <PolarAngleAxis dataKey="competency" tick={{ fontSize: 10 }} />
                <PolarRadiusAxis angle={30} domain={[0, 100]} tick={{ fontSize: 8 }} />
                <Radar name="Weight" dataKey="weight" stroke="#8b5cf6" fill="#8b5cf6" fillOpacity={0.3} strokeWidth={2} />
                <Radar name="Performance" dataKey="performance" stroke="#22c55e" fill="#22c55e" fillOpacity={0.1} strokeWidth={2} strokeDasharray="5 5" />
                <Tooltip />
              </RadarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      {/* Performance Analysis */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Interview Funnel */}
        <div className="bg-card border border-border rounded-xl p-6">
          <h3 className="text-lg font-semibold text-foreground mb-4">Interview Funnel</h3>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <FunnelChart>
                <Tooltip />
                <Funnel dataKey="value" data={funnelData} isAnimationActive>
                  <LabelList position="center" fill="#fff" stroke="none" />
                </Funnel>
              </FunnelChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="bg-card border border-border rounded-xl p-6">
          <h3 className="text-lg font-semibold text-foreground mb-4">Competency Criticality Matrix</h3>
          <div className="space-y-3">
            {competencyTrends.map((comp, index) => (
              <div key={index} className="flex items-center justify-between p-3 bg-muted rounded-lg">
                <div>
                  <p className="font-medium text-foreground">{comp.competency}</p>
                  <p className="text-sm text-muted-foreground">Criticality: {comp.criticality}</p>
                </div>
                <div className="text-right">
                  <p className="font-medium text-foreground">{comp.performance}%</p>
                  <div className="w-16 bg-background rounded-full h-2">
                    <div className="bg-primary h-2 rounded-full" style={{ width: `${comp.performance}%` }} />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Detailed Analysis */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Top 5 Questions */}
        <div className="bg-card border border-border rounded-xl p-6">
          <h3 className="text-lg font-semibold text-foreground mb-4">Top 5 Questions</h3>
          <div className="space-y-3">
            {topQuestions.map((question, index) => (
              <div key={index} className="p-3 bg-muted rounded-lg">
                <p className="font-medium text-foreground text-sm mb-2">{question.question}</p>
                <span className="px-2 py-1 bg-primary/10 text-primary rounded-full text-xs">
                  {question.skillCovered}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Behavioral Traits & Performance */}
        <div className="bg-card border border-border rounded-xl p-6">
          <h3 className="text-lg font-semibold text-foreground mb-4">Performance Overview</h3>
          <div className="space-y-4 mb-6">
            <div className="p-4 bg-green-500/10 border border-green-500/20 rounded-lg">
              <div className="flex items-center justify-between">
                <span className="font-medium text-green-700">High Performance</span>
                <span className="text-green-600 font-bold">94%</span>
              </div>
              <p className="text-sm text-green-600 mt-1">Top candidate scores consistently above 90%</p>
            </div>
            <div className="p-4 bg-yellow-500/10 border border-yellow-500/20 rounded-lg">
              <div className="flex items-center justify-between">
                <span className="font-medium text-yellow-700">Skill Gaps</span>
                <span className="text-yellow-600 font-bold">2 areas</span>
              </div>
              <p className="text-sm text-yellow-600 mt-1">Technical depth and leadership need improvement</p>
            </div>
          </div>

          <h4 className="text-md font-semibold text-foreground mb-3">Behavioral Traits</h4>
          <div className="grid grid-cols-2 gap-2">
            {behavioralTraits.map((trait, index) => (
              <div key={index} className="p-2 bg-muted rounded text-center">
                <div className="text-sm font-bold" style={{ color: trait.color }}>{trait.percentage}%</div>
                <div className="text-xs text-muted-foreground">{trait.trait}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

    </div>
  );
}
