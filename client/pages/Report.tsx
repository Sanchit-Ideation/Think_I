import { useState } from 'react';
import { Link } from 'react-router-dom';
import { 
  ArrowLeft, 
  Download, 
  Share2, 
  Calendar, 
  Clock, 
  User, 
  Award, 
  TrendingUp, 
  Brain, 
  MessageSquare, 
  Star,
  Target,
  Zap,
  Eye
} from 'lucide-react';
import { 
  LineChart, 
  Line, 
  AreaChart, 
  Area, 
  BarChart, 
  Bar, 
  PieChart, 
  Pie, 
  Cell, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer, 
  RadarChart, 
  PolarGrid, 
  PolarAngleAxis, 
  PolarRadiusAxis, 
  Radar,
  ComposedChart
} from 'recharts';

const performanceData = [
  { step: 'Introduction', score: 85, time: 2.5, confidence: 90, engagement: 88 },
  { step: 'Technical Q1', score: 78, time: 8.2, confidence: 75, engagement: 82 },
  { step: 'Technical Q2', score: 92, time: 6.8, confidence: 95, engagement: 94 },
  { step: 'Problem Solving', score: 88, time: 12.1, confidence: 85, engagement: 91 },
  { step: 'System Design', score: 76, time: 15.3, confidence: 70, engagement: 78 },
  { step: 'Behavioral Q1', score: 94, time: 4.2, confidence: 98, engagement: 96 },
  { step: 'Behavioral Q2', score: 91, time: 5.8, confidence: 92, engagement: 93 },
  { step: 'Closing', score: 89, time: 3.1, confidence: 88, engagement: 87 }
];

const skillsData = [
  { skill: 'Technical Knowledge', score: 85, industry: 82 },
  { skill: 'Problem Solving', score: 88, industry: 79 },
  { skill: 'Communication', score: 92, industry: 85 },
  { skill: 'Leadership', score: 78, industry: 73 },
  { skill: 'Adaptability', score: 86, industry: 81 },
  { skill: 'Innovation', score: 82, industry: 77 }
];

const sentimentData = [
  { name: 'Positive', value: 65, color: '#22c55e' },
  { name: 'Neutral', value: 28, color: '#64748b' },
  { name: 'Negative', value: 7, color: '#ef4444' }
];

const timelineData = [
  { time: '0:00', engagement: 85, stress: 20, clarity: 88 },
  { time: '5:00', engagement: 78, stress: 35, clarity: 82 },
  { time: '10:00', engagement: 92, stress: 15, clarity: 94 },
  { time: '15:00', engagement: 88, stress: 25, clarity: 89 },
  { time: '20:00', engagement: 76, stress: 45, clarity: 78 },
  { time: '25:00', engagement: 94, stress: 10, clarity: 96 },
  { time: '30:00', engagement: 91, stress: 18, clarity: 93 },
  { time: '35:00', engagement: 89, stress: 22, clarity: 87 },
  { time: '40:00', engagement: 87, stress: 25, clarity: 85 }
];

const competencyData = [
  { category: 'Technical Skills', current: 85, target: 90, benchmark: 82 },
  { category: 'Soft Skills', current: 92, target: 88, benchmark: 85 },
  { category: 'Experience', current: 78, target: 85, benchmark: 75 },
  { category: 'Cultural Fit', current: 94, target: 90, benchmark: 88 },
  { category: 'Growth Potential', current: 86, target: 85, benchmark: 80 }
];

const keyInsights = [
  {
    title: "Exceptional Communication Skills",
    description: "Candidate demonstrated outstanding verbal communication with 92% rating, significantly above industry average.",
    impact: "high",
    icon: MessageSquare,
    metric: "92%",
    trend: "+7% vs avg"
  },
  {
    title: "Strong Technical Foundation", 
    description: "Solid understanding of core technical concepts with room for advanced architecture knowledge.",
    impact: "high",
    icon: Brain,
    metric: "85%",
    trend: "+3% vs avg"
  },
  {
    title: "Leadership Development Opportunity",
    description: "Shows potential but would benefit from more leadership experience and training.",
    impact: "medium",
    icon: Award,
    metric: "78%",
    trend: "+5% vs avg"
  },
  {
    title: "Positive Interview Sentiment",
    description: "Maintained positive engagement throughout with minimal stress indicators.",
    impact: "high",
    icon: Star,
    metric: "65%",
    trend: "Positive"
  }
];

const recommendations = [
  {
    category: "Technical Development",
    items: [
      "Advanced system design patterns training",
      "Cloud architecture certification",
      "Microservices best practices workshop"
    ]
  },
  {
    category: "Leadership Growth",
    items: [
      "Cross-functional team leadership opportunities",
      "Mentoring junior developers",
      "Project management methodology training"
    ]
  },
  {
    category: "Cultural Integration", 
    items: [
      "Company values alignment sessions",
      "Team collaboration workshops",
      "Innovation lab participation"
    ]
  }
];

export default function Report() {
  const [activeTab, setActiveTab] = useState('overview');

  const overallScore = Math.round(performanceData.reduce((acc, item) => acc + item.score, 0) / performanceData.length);
  const totalTime = performanceData.reduce((acc, item) => acc + item.time, 0);
  const avgConfidence = Math.round(performanceData.reduce((acc, item) => acc + item.confidence, 0) / performanceData.length);
  const avgEngagement = Math.round(timelineData.reduce((acc, item) => acc + item.engagement, 0) / timelineData.length);

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="bg-card border-b border-border">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center space-x-4">
              <Link 
                to="/" 
                className="flex items-center space-x-2 text-muted-foreground hover:text-foreground transition-colors"
              >
                <ArrowLeft className="w-5 h-5" />
                <span>Back to Dashboard</span>
              </Link>
              <div className="h-6 w-px bg-border" />
              <div className="flex items-center space-x-2">
                <div className="w-8 h-8 bg-gradient-to-br from-purple-500 to-violet-600 rounded-lg flex items-center justify-center">
                  <span className="text-sm font-bold text-white">Σ</span>
                </div>
                <h1 className="text-xl font-semibold text-foreground">T_interview_2</h1>
              </div>
            </div>
            <div className="flex items-center space-x-2">
              <button className="flex items-center space-x-2 px-3 py-2 text-sm bg-secondary hover:bg-secondary/80 rounded-lg transition-colors">
                <Share2 className="w-4 h-4" />
                <span>Share</span>
              </button>
              <button className="flex items-center space-x-2 px-3 py-2 text-sm bg-primary hover:bg-primary/90 text-primary-foreground rounded-lg transition-colors">
                <Download className="w-4 h-4" />
                <span>Export</span>
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Interview Header */}
        <div className="bg-card border border-border rounded-xl p-6 mb-8">
          <div className="flex items-start justify-between">
            <div className="flex-1">
              <h2 className="text-2xl font-bold text-foreground mb-2">Senior Software Engineer Interview</h2>
              <div className="flex items-center space-x-6 text-muted-foreground mb-4">
                <div className="flex items-center space-x-2">
                  <User className="w-4 h-4" />
                  <span>Sarah Johnson</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Calendar className="w-4 h-4" />
                  <span>December 15, 2024</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Clock className="w-4 h-4" />
                  <span>{Math.round(totalTime)} minutes</span>
                </div>
              </div>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <div className="text-center p-3 bg-muted rounded-lg">
                  <div className="text-lg font-bold text-foreground">{overallScore}%</div>
                  <div className="text-xs text-muted-foreground">Overall Score</div>
                </div>
                <div className="text-center p-3 bg-muted rounded-lg">
                  <div className="text-lg font-bold text-foreground">{avgConfidence}%</div>
                  <div className="text-xs text-muted-foreground">Confidence</div>
                </div>
                <div className="text-center p-3 bg-muted rounded-lg">
                  <div className="text-lg font-bold text-foreground">{avgEngagement}%</div>
                  <div className="text-xs text-muted-foreground">Engagement</div>
                </div>
                <div className="text-center p-3 bg-muted rounded-lg">
                  <div className="text-lg font-bold text-foreground">A-</div>
                  <div className="text-xs text-muted-foreground">Grade</div>
                </div>
              </div>
            </div>
            <div className="text-right ml-6">
              <div className={`inline-flex items-center px-4 py-2 rounded-full text-sm font-medium ${
                overallScore >= 90 ? 'bg-green-500/10 text-green-500' :
                overallScore >= 80 ? 'bg-blue-500/10 text-blue-500' :
                overallScore >= 70 ? 'bg-yellow-500/10 text-yellow-500' :
                'bg-red-500/10 text-red-500'
              }`}>
                {overallScore >= 90 ? '✨ Excellent' :
                 overallScore >= 80 ? '✅ Strong Candidate' :
                 overallScore >= 70 ? '⚠️ Potential' : '❌ Needs Work'}
              </div>
              <p className="text-xs text-muted-foreground mt-2">Recommendation: Move to final round</p>
            </div>
          </div>
        </div>

        {/* Navigation Tabs */}
        <div className="flex space-x-1 bg-muted p-1 rounded-lg mb-8">
          {[
            { id: 'overview', label: 'Overview', icon: Eye },
            { id: 'performance', label: 'Performance', icon: TrendingUp },
            { id: 'skills', label: 'Skills Analysis', icon: Target },
            { id: 'insights', label: 'AI Insights', icon: Zap }
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
            {/* Performance Timeline */}
            <div className="bg-card border border-border rounded-xl p-6">
              <h3 className="text-lg font-semibold text-foreground mb-4">Performance by Section</h3>
              <div className="h-64">
                <ResponsiveContainer width="100%" height="100%">
                  <ComposedChart data={performanceData}>
                    <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                    <XAxis dataKey="step" stroke="hsl(var(--muted-foreground))" fontSize={11} angle={-45} textAnchor="end" height={80} />
                    <YAxis stroke="hsl(var(--muted-foreground))" fontSize={12} />
                    <Tooltip 
                      contentStyle={{ 
                        backgroundColor: 'hsl(var(--card))', 
                        border: '1px solid hsl(var(--border))',
                        borderRadius: '8px'
                      }} 
                    />
                    <Bar dataKey="score" fill="hsl(var(--primary))" radius={[4, 4, 0, 0]} />
                    <Line 
                      type="monotone" 
                      dataKey="confidence" 
                      stroke="#22c55e" 
                      strokeWidth={2} 
                      dot={{ fill: '#22c55e', strokeWidth: 2, r: 4 }}
                    />
                  </ComposedChart>
                </ResponsiveContainer>
              </div>
            </div>

            {/* Sentiment Analysis */}
            <div className="bg-card border border-border rounded-xl p-6">
              <h3 className="text-lg font-semibold text-foreground mb-4">Sentiment Analysis</h3>
              <div className="h-64">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={sentimentData}
                      cx="50%"
                      cy="50%"
                      outerRadius={80}
                      dataKey="value"
                      label={({ name, value }) => `${name}: ${value}%`}
                    >
                      {sentimentData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.color} />
                      ))}
                    </Pie>
                    <Tooltip />
                  </PieChart>
                </ResponsiveContainer>
              </div>
              <div className="mt-4 space-y-2">
                {sentimentData.map((item, index) => (
                  <div key={index} className="flex items-center justify-between text-sm">
                    <div className="flex items-center space-x-2">
                      <div className="w-3 h-3 rounded-full" style={{ backgroundColor: item.color }} />
                      <span className="text-foreground">{item.name}</span>
                    </div>
                    <span className="text-muted-foreground">{item.value}%</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Engagement Timeline */}
            <div className="bg-card border border-border rounded-xl p-6 lg:col-span-2">
              <h3 className="text-lg font-semibold text-foreground mb-4">Engagement & Stress Levels Over Time</h3>
              <div className="h-64">
                <ResponsiveContainer width="100%" height="100%">
                  <AreaChart data={timelineData}>
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
                    <Area 
                      type="monotone" 
                      dataKey="engagement" 
                      stackId="1"
                      stroke="hsl(var(--primary))" 
                      fill="hsl(var(--primary) / 0.3)" 
                      strokeWidth={2}
                    />
                    <Area 
                      type="monotone" 
                      dataKey="stress" 
                      stackId="2"
                      stroke="#ef4444" 
                      fill="rgba(239, 68, 68, 0.2)" 
                      strokeWidth={2}
                    />
                    <Line 
                      type="monotone" 
                      dataKey="clarity" 
                      stroke="#22c55e" 
                      strokeWidth={2}
                    />
                  </AreaChart>
                </ResponsiveContainer>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'performance' && (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Time Analysis */}
            <div className="bg-card border border-border rounded-xl p-6">
              <h3 className="text-lg font-semibold text-foreground mb-4">Time Distribution</h3>
              <div className="h-64">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={performanceData} layout="horizontal">
                    <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                    <XAxis type="number" stroke="hsl(var(--muted-foreground))" fontSize={12} />
                    <YAxis dataKey="step" type="category" stroke="hsl(var(--muted-foreground))" fontSize={10} width={100} />
                    <Tooltip 
                      contentStyle={{ 
                        backgroundColor: 'hsl(var(--card))', 
                        border: '1px solid hsl(var(--border))',
                        borderRadius: '8px'
                      }} 
                    />
                    <Bar dataKey="time" fill="hsl(var(--secondary))" radius={[0, 4, 4, 0]} />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </div>

            {/* Competency Comparison */}
            <div className="bg-card border border-border rounded-xl p-6">
              <h3 className="text-lg font-semibold text-foreground mb-4">Competency vs Benchmarks</h3>
              <div className="h-64">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={competencyData}>
                    <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                    <XAxis dataKey="category" stroke="hsl(var(--muted-foreground))" fontSize={10} angle={-45} textAnchor="end" height={80} />
                    <YAxis stroke="hsl(var(--muted-foreground))" fontSize={12} />
                    <Tooltip 
                      contentStyle={{ 
                        backgroundColor: 'hsl(var(--card))', 
                        border: '1px solid hsl(var(--border))',
                        borderRadius: '8px'
                      }} 
                    />
                    <Bar dataKey="current" fill="hsl(var(--primary))" name="Current" />
                    <Bar dataKey="target" fill="#22c55e" name="Target" />
                    <Bar dataKey="benchmark" fill="#64748b" name="Industry Avg" />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </div>

            {/* Detailed Scores */}
            <div className="bg-card border border-border rounded-xl p-6 lg:col-span-2">
              <h3 className="text-lg font-semibold text-foreground mb-4">Section-by-Section Analysis</h3>
              <div className="space-y-4">
                {performanceData.map((item, index) => (
                  <div key={index} className="flex items-center justify-between p-4 bg-muted rounded-lg">
                    <div className="flex-1">
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-sm font-medium text-foreground">{item.step}</span>
                        <div className="flex items-center space-x-4 text-sm">
                          <span className="text-muted-foreground">Score: {item.score}%</span>
                          <span className="text-muted-foreground">Time: {item.time}m</span>
                          <span className="text-muted-foreground">Confidence: {item.confidence}%</span>
                        </div>
                      </div>
                      <div className="flex space-x-2">
                        <div className="flex-1 bg-background rounded-full h-2">
                          <div 
                            className="bg-primary h-2 rounded-full transition-all duration-500"
                            style={{ width: `${item.score}%` }}
                          />
                        </div>
                        <div className="flex-1 bg-background rounded-full h-2">
                          <div 
                            className="bg-green-500 h-2 rounded-full transition-all duration-500"
                            style={{ width: `${item.confidence}%` }}
                          />
                        </div>
                        <div className="flex-1 bg-background rounded-full h-2">
                          <div 
                            className="bg-blue-500 h-2 rounded-full transition-all duration-500"
                            style={{ width: `${item.engagement}%` }}
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

        {activeTab === 'skills' && (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Skills Radar */}
            <div className="bg-card border border-border rounded-xl p-6">
              <h3 className="text-lg font-semibold text-foreground mb-4">Skills Assessment</h3>
              <div className="h-64">
                <ResponsiveContainer width="100%" height="100%">
                  <RadarChart data={skillsData}>
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
                      name="Industry Avg" 
                      dataKey="industry" 
                      stroke="#64748b" 
                      fill="rgba(100, 116, 139, 0.1)" 
                      strokeWidth={2} 
                    />
                  </RadarChart>
                </ResponsiveContainer>
              </div>
            </div>

            {/* Skills Breakdown */}
            <div className="bg-card border border-border rounded-xl p-6">
              <h3 className="text-lg font-semibold text-foreground mb-4">Detailed Skills Analysis</h3>
              <div className="space-y-4">
                {skillsData.map((skill, index) => (
                  <div key={index}>
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-sm font-medium text-foreground">{skill.skill}</span>
                      <div className="flex items-center space-x-2 text-xs">
                        <span className="text-primary">{skill.score}%</span>
                        <span className="text-muted-foreground">vs {skill.industry}% avg</span>
                      </div>
                    </div>
                    <div className="relative">
                      <div className="bg-muted rounded-full h-3">
                        <div 
                          className="bg-primary h-3 rounded-full transition-all duration-500"
                          style={{ width: `${skill.score}%` }}
                        />
                      </div>
                      <div 
                        className="absolute top-0 w-1 h-3 bg-muted-foreground"
                        style={{ left: `${skill.industry}%` }}
                      />
                    </div>
                    <div className="mt-1 text-xs text-muted-foreground">
                      {skill.score > skill.industry ? 
                        `+${skill.score - skill.industry} points above industry average` :
                        `${skill.industry - skill.score} points below industry average`
                      }
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Skill Recommendations */}
            <div className="bg-card border border-border rounded-xl p-6 lg:col-span-2">
              <h3 className="text-lg font-semibold text-foreground mb-4">Development Recommendations</h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {recommendations.map((category, index) => (
                  <div key={index} className="p-4 bg-muted rounded-lg">
                    <h4 className="font-medium text-foreground mb-3">{category.category}</h4>
                    <ul className="space-y-2">
                      {category.items.map((item, itemIndex) => (
                        <li key={itemIndex} className="text-sm text-muted-foreground flex items-start space-x-2">
                          <div className="w-1.5 h-1.5 bg-primary rounded-full mt-2 flex-shrink-0" />
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

        {activeTab === 'insights' && (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {keyInsights.map((insight, index) => {
              const IconComponent = insight.icon;
              return (
                <div key={index} className="bg-card border border-border rounded-xl p-6">
                  <div className="flex items-start space-x-4">
                    <div className={`p-3 rounded-lg ${
                      insight.impact === 'high' ? 'bg-green-500/10' :
                      insight.impact === 'medium' ? 'bg-yellow-500/10' :
                      'bg-blue-500/10'
                    }`}>
                      <IconComponent className={`w-6 h-6 ${
                        insight.impact === 'high' ? 'text-green-500' :
                        insight.impact === 'medium' ? 'text-yellow-500' :
                        'text-blue-500'
                      }`} />
                    </div>
                    <div className="flex-1">
                      <div className="flex items-start justify-between mb-2">
                        <h4 className="text-lg font-semibold text-foreground">{insight.title}</h4>
                        <div className="text-right">
                          <div className="text-lg font-bold text-foreground">{insight.metric}</div>
                          <div className="text-xs text-muted-foreground">{insight.trend}</div>
                        </div>
                      </div>
                      <p className="text-muted-foreground text-sm leading-relaxed mb-3">{insight.description}</p>
                      <div className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium ${
                        insight.impact === 'high' ? 'bg-green-500/10 text-green-500' :
                        insight.impact === 'medium' ? 'bg-yellow-500/10 text-yellow-500' :
                        'bg-blue-500/10 text-blue-500'
                      }`}>
                        {insight.impact === 'high' ? '🔥 High Impact' :
                         insight.impact === 'medium' ? '⚡ Medium Impact' :
                         '💡 Key Insight'}
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}
