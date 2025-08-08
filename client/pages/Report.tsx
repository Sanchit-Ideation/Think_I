import { useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft, Download, Share2, Calendar, Clock, User, Award, TrendingUp, Brain, MessageSquare, Star } from 'lucide-react';
import { LineChart, Line, AreaChart, Area, BarChart, Bar, PieChart, Pie, Cell, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, Radar } from 'recharts';

const performanceData = [
  { step: 'Introduction', score: 85, time: 2.5, confidence: 90 },
  { step: 'Technical Q1', score: 78, time: 8.2, confidence: 75 },
  { step: 'Technical Q2', score: 92, time: 6.8, confidence: 95 },
  { step: 'Problem Solving', score: 88, time: 12.1, confidence: 85 },
  { step: 'System Design', score: 76, time: 15.3, confidence: 70 },
  { step: 'Behavioral Q1', score: 94, time: 4.2, confidence: 98 },
  { step: 'Behavioral Q2', score: 91, time: 5.8, confidence: 92 },
  { step: 'Closing', score: 89, time: 3.1, confidence: 88 }
];

const skillsData = [
  { skill: 'Technical Knowledge', score: 85 },
  { skill: 'Problem Solving', score: 88 },
  { skill: 'Communication', score: 92 },
  { skill: 'Leadership', score: 78 },
  { skill: 'Adaptability', score: 86 },
  { skill: 'Innovation', score: 82 }
];

const sentimentData = [
  { name: 'Positive', value: 65, color: '#22c55e' },
  { name: 'Neutral', value: 28, color: '#64748b' },
  { name: 'Negative', value: 7, color: '#ef4444' }
];

const timelineData = [
  { time: '0:00', engagement: 85 },
  { time: '5:00', engagement: 78 },
  { time: '10:00', engagement: 92 },
  { time: '15:00', engagement: 88 },
  { time: '20:00', engagement: 76 },
  { time: '25:00', engagement: 94 },
  { time: '30:00', engagement: 91 },
  { time: '35:00', engagement: 89 },
  { time: '40:00', engagement: 87 }
];

const keyInsights = [
  {
    title: "Strong Technical Foundation",
    description: "Candidate demonstrated excellent understanding of core concepts with 88% average technical score.",
    impact: "high",
    icon: Brain
  },
  {
    title: "Excellent Communication Skills",
    description: "Clear articulation of complex ideas with 92% communication rating.",
    impact: "high", 
    icon: MessageSquare
  },
  {
    title: "Leadership Potential",
    description: "Shows promising leadership qualities but could benefit from more experience.",
    impact: "medium",
    icon: Award
  },
  {
    title: "Positive Interview Sentiment",
    description: "65% positive sentiment throughout the interview process.",
    impact: "high",
    icon: Star
  }
];

export default function Report() {
  const [activeTab, setActiveTab] = useState('overview');

  const overallScore = Math.round(performanceData.reduce((acc, item) => acc + item.score, 0) / performanceData.length);
  const totalTime = performanceData.reduce((acc, item) => acc + item.time, 0);

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
            <div>
              <h2 className="text-2xl font-bold text-foreground mb-2">Senior Software Engineer Interview</h2>
              <div className="flex items-center space-x-6 text-muted-foreground">
                <div className="flex items-center space-x-2">
                  <User className="w-4 h-4" />
                  <span>Sarah Johnson</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Calendar className="w-4 h-4" />
                  <span>Dec 15, 2024</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Clock className="w-4 h-4" />
                  <span>{Math.round(totalTime)} minutes</span>
                </div>
              </div>
            </div>
            <div className="text-right">
              <div className="text-3xl font-bold text-foreground mb-1">{overallScore}%</div>
              <div className="text-sm text-muted-foreground">Overall Score</div>
              <div className={`mt-2 px-3 py-1 rounded-full text-xs font-medium ${
                overallScore >= 90 ? 'bg-green-500/10 text-green-500' :
                overallScore >= 80 ? 'bg-blue-500/10 text-blue-500' :
                overallScore >= 70 ? 'bg-yellow-500/10 text-yellow-500' :
                'bg-red-500/10 text-red-500'
              }`}>
                {overallScore >= 90 ? 'Excellent' :
                 overallScore >= 80 ? 'Good' :
                 overallScore >= 70 ? 'Fair' : 'Needs Improvement'}
              </div>
            </div>
          </div>
        </div>

        {/* Navigation Tabs */}
        <div className="flex space-x-1 bg-muted p-1 rounded-lg mb-8">
          {[
            { id: 'overview', label: 'Overview' },
            { id: 'performance', label: 'Performance' },
            { id: 'skills', label: 'Skills Analysis' },
            { id: 'insights', label: 'Key Insights' }
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex-1 py-2 px-4 text-sm font-medium rounded-md transition-colors ${
                activeTab === tab.id
                  ? 'bg-background text-foreground shadow-sm'
                  : 'text-muted-foreground hover:text-foreground'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* Tab Content */}
        {activeTab === 'overview' && (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Performance Timeline */}
            <div className="bg-card border border-border rounded-xl p-6">
              <h3 className="text-lg font-semibold text-foreground mb-4">Performance Timeline</h3>
              <div className="h-64">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={performanceData}>
                    <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                    <XAxis dataKey="step" stroke="hsl(var(--muted-foreground))" fontSize={12} />
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
                      dataKey="score" 
                      stroke="hsl(var(--primary))" 
                      strokeWidth={2} 
                      dot={{ fill: 'hsl(var(--primary))', strokeWidth: 2, r: 4 }}
                    />
                  </LineChart>
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
            </div>

            {/* Engagement Over Time */}
            <div className="bg-card border border-border rounded-xl p-6 lg:col-span-2">
              <h3 className="text-lg font-semibold text-foreground mb-4">Engagement Over Time</h3>
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
                      stroke="hsl(var(--primary))" 
                      fill="hsl(var(--primary) / 0.2)" 
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
            {/* Score by Section */}
            <div className="bg-card border border-border rounded-xl p-6">
              <h3 className="text-lg font-semibold text-foreground mb-4">Score by Section</h3>
              <div className="h-64">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={performanceData}>
                    <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                    <XAxis dataKey="step" stroke="hsl(var(--muted-foreground))" fontSize={12} />
                    <YAxis stroke="hsl(var(--muted-foreground))" fontSize={12} />
                    <Tooltip 
                      contentStyle={{ 
                        backgroundColor: 'hsl(var(--card))', 
                        border: '1px solid hsl(var(--border))',
                        borderRadius: '8px'
                      }} 
                    />
                    <Bar dataKey="score" fill="hsl(var(--primary))" radius={[4, 4, 0, 0]} />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </div>

            {/* Time Spent */}
            <div className="bg-card border border-border rounded-xl p-6">
              <h3 className="text-lg font-semibold text-foreground mb-4">Time Spent per Section</h3>
              <div className="h-64">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={performanceData} layout="horizontal">
                    <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                    <XAxis type="number" stroke="hsl(var(--muted-foreground))" fontSize={12} />
                    <YAxis dataKey="step" type="category" stroke="hsl(var(--muted-foreground))" fontSize={12} width={100} />
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

            {/* Confidence Levels */}
            <div className="bg-card border border-border rounded-xl p-6 lg:col-span-2">
              <h3 className="text-lg font-semibold text-foreground mb-4">Confidence Levels</h3>
              <div className="space-y-4">
                {performanceData.map((item, index) => (
                  <div key={index} className="flex items-center justify-between">
                    <span className="text-sm font-medium text-foreground w-32">{item.step}</span>
                    <div className="flex-1 mx-4">
                      <div className="bg-muted rounded-full h-2">
                        <div 
                          className="bg-primary h-2 rounded-full transition-all duration-500"
                          style={{ width: `${item.confidence}%` }}
                        />
                      </div>
                    </div>
                    <span className="text-sm text-muted-foreground w-12">{item.confidence}%</span>
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
              <h3 className="text-lg font-semibold text-foreground mb-4">Skills Radar</h3>
              <div className="h-64">
                <ResponsiveContainer width="100%" height="100%">
                  <RadarChart data={skillsData}>
                    <PolarGrid stroke="hsl(var(--border))" />
                    <PolarAngleAxis dataKey="skill" tick={{ fontSize: 12, fill: 'hsl(var(--muted-foreground))' }} />
                    <PolarRadiusAxis angle={90} domain={[0, 100]} tick={{ fontSize: 10, fill: 'hsl(var(--muted-foreground))' }} />
                    <Radar 
                      name="Skills" 
                      dataKey="score" 
                      stroke="hsl(var(--primary))" 
                      fill="hsl(var(--primary) / 0.3)" 
                      strokeWidth={2} 
                    />
                  </RadarChart>
                </ResponsiveContainer>
              </div>
            </div>

            {/* Skills Breakdown */}
            <div className="bg-card border border-border rounded-xl p-6">
              <h3 className="text-lg font-semibold text-foreground mb-4">Skills Breakdown</h3>
              <div className="space-y-4">
                {skillsData.map((skill, index) => (
                  <div key={index}>
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-sm font-medium text-foreground">{skill.skill}</span>
                      <span className="text-sm text-muted-foreground">{skill.score}%</span>
                    </div>
                    <div className="bg-muted rounded-full h-2">
                      <div 
                        className="bg-primary h-2 rounded-full transition-all duration-500"
                        style={{ width: `${skill.score}%` }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Performance Metrics */}
            <div className="bg-card border border-border rounded-xl p-6 lg:col-span-2">
              <h3 className="text-lg font-semibold text-foreground mb-4">Performance Metrics</h3>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <div className="text-center p-4 bg-muted rounded-lg">
                  <div className="text-2xl font-bold text-foreground">{overallScore}%</div>
                  <div className="text-sm text-muted-foreground">Overall Score</div>
                </div>
                <div className="text-center p-4 bg-muted rounded-lg">
                  <div className="text-2xl font-bold text-foreground">{Math.round(totalTime)}m</div>
                  <div className="text-sm text-muted-foreground">Total Time</div>
                </div>
                <div className="text-center p-4 bg-muted rounded-lg">
                  <div className="text-2xl font-bold text-foreground">8</div>
                  <div className="text-sm text-muted-foreground">Sections</div>
                </div>
                <div className="text-center p-4 bg-muted rounded-lg">
                  <div className="text-2xl font-bold text-foreground">4.2/5</div>
                  <div className="text-sm text-muted-foreground">Avg Rating</div>
                </div>
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
                      <h4 className="text-lg font-semibold text-foreground mb-2">{insight.title}</h4>
                      <p className="text-muted-foreground text-sm leading-relaxed">{insight.description}</p>
                      <div className={`mt-3 inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${
                        insight.impact === 'high' ? 'bg-green-500/10 text-green-500' :
                        insight.impact === 'medium' ? 'bg-yellow-500/10 text-yellow-500' :
                        'bg-blue-500/10 text-blue-500'
                      }`}>
                        {insight.impact === 'high' ? 'High Impact' :
                         insight.impact === 'medium' ? 'Medium Impact' :
                         'Low Impact'}
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
