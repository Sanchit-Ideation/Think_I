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
  Download,
  Filter,
  Search,
  ChevronDown,
  X,
  Eye,
  EyeOff,
  Briefcase,
  Target,
  Activity,
  UserX
} from 'lucide-react';
import InterviewFunnel from './InterviewFunnel';
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
  LabelList,
  LineChart,
  Line,
  ComposedChart,
  Bar,
  BarChart
} from 'recharts';

// Mock data for the enhanced dashboard
const kpiData = [
  {
    title: 'Total Interviews',
    value: '1,247',
    change: 12.5,
    icon: Calendar,
    description: 'Scheduled interviews'
  },
  {
    title: 'Cancelled Interviews',
    value: '78',
    change: -8.4,
    icon: UserX,
    description: '6.3% cancellation rate',
    isNegative: true
  },
  {
    title: 'Completed Interviews',
    value: '1,089',
    change: 8.3,
    icon: CheckCircle2,
    description: '87.3% completion rate'
  },
  {
    title: 'Pending Evaluations',
    value: '158',
    change: -5.2,
    icon: Clock,
    description: '14.5% delayed (12% increase)',
    delay: 12
  },
  {
    title: 'Recommended',
    value: '342',
    change: 8.2,
    icon: Award,
    description: '31.4% of evaluated'
  }
];

// Interview funnel data with detailed breakdown
const funnelData = [
  { 
    name: 'Scheduled', 
    value: 1247, 
    fill: '#8884d8', 
    percentage: 100,
    cancelled: 78,
    cancelPercentage: 6.3
  },
  { 
    name: 'Interviewed', 
    value: 1089, 
    fill: '#8dd1e1', 
    percentage: 87.3 
  },
  { 
    name: 'Evaluated', 
    value: 892, 
    fill: '#82ca9d', 
    percentage: 81.9 
  },
  { 
    name: 'Highly Recommended', 
    value: 187, 
    fill: '#22c55e', 
    percentage: 21.0 
  },
  { 
    name: 'Recommended', 
    value: 155, 
    fill: '#3b82f6', 
    percentage: 17.4 
  }
];

// Timeline data for all recommendation stages
const recommendationTimeline = [
  { month: 'Jan', highlyRecommended: 45, recommended: 38, consider: 25, notRecommended: 17 },
  { month: 'Feb', highlyRecommended: 52, recommended: 42, consider: 28, notRecommended: 13 },
  { month: 'Mar', highlyRecommended: 48, recommended: 39, consider: 31, notRecommended: 18 },
  { month: 'Apr', highlyRecommended: 61, recommended: 45, consider: 29, notRecommended: 15 },
  { month: 'May', highlyRecommended: 58, recommended: 41, consider: 33, notRecommended: 12 },
  { month: 'Jun', highlyRecommended: 65, recommended: 47, consider: 28, notRecommended: 10 }
];

// UFM (Unfair Means) trends data
const ufmTrendsData = [
  { month: 'Jan', lipSync: 12, tabSwitching: 28, multiFace: 18, audioIssues: 8, copyPaste: 15 },
  { month: 'Feb', lipSync: 15, tabSwitching: 32, multiFace: 22, audioIssues: 12, copyPaste: 18 },
  { month: 'Mar', lipSync: 18, tabSwitching: 35, multiFace: 25, audioIssues: 15, copyPaste: 22 },
  { month: 'Apr', lipSync: 14, tabSwitching: 30, multiFace: 20, audioIssues: 10, copyPaste: 16 },
  { month: 'May', lipSync: 11, tabSwitching: 25, multiFace: 16, audioIssues: 7, copyPaste: 13 },
  { month: 'Jun', lipSync: 8, tabSwitching: 20, multiFace: 12, audioIssues: 5, copyPaste: 10 }
];

// Competency radar data with department/role filters
const competencyData = [
  { 
    competency: 'Critical Reasoning', 
    engineering: 85, 
    sales: 72, 
    marketing: 78, 
    design: 80 
  },
  { 
    competency: 'Domain Knowledge', 
    engineering: 88, 
    sales: 85, 
    marketing: 75, 
    design: 82 
  },
  { 
    competency: 'Analytical Thinking', 
    engineering: 90, 
    sales: 78, 
    marketing: 82, 
    design: 85 
  },
  { 
    competency: 'Conciseness', 
    engineering: 75, 
    sales: 88, 
    marketing: 90, 
    design: 85 
  },
  { 
    competency: 'Communication', 
    engineering: 78, 
    sales: 92, 
    marketing: 88, 
    design: 87 
  },
  { 
    competency: 'Problem Solving', 
    engineering: 92, 
    sales: 80, 
    marketing: 76, 
    design: 88 
  }
];

// Trending templates data with integrity rate
const trendingTemplates = [
  {
    name: 'Senior Software Engineer V3',
    totalInterviews: 156,
    averageAdeptness: 88.4,
    averageEffectiveness: 91.2,
    integrityRate: 94.2
  },
  {
    name: 'Product Manager Advanced',
    totalInterviews: 132,
    averageAdeptness: 85.8,
    averageEffectiveness: 94.8,
    integrityRate: 96.8
  },
  {
    name: 'Data Scientist Lead',
    totalInterviews: 94,
    averageAdeptness: 82.3,
    averageEffectiveness: 87.3,
    integrityRate: 91.5
  },
  {
    name: 'UX Designer Senior',
    totalInterviews: 78,
    averageAdeptness: 89.6,
    averageEffectiveness: 92.1,
    integrityRate: 97.4
  },
  {
    name: 'DevOps Engineer',
    totalInterviews: 65,
    averageAdeptness: 84.7,
    averageEffectiveness: 88.9,
    integrityRate: 93.1
  }
];

// Upcoming interviews by department and role
const upcomingInterviews = {
  totalInterviews: 45,
  departments: [
    {
      name: 'Engineering',
      total: 25,
      roles: [
        { role: 'Data Analyst', count: 10 },
        { role: 'Software Engineer', count: 8 },
        { role: 'DevOps Engineer', count: 4 },
        { role: 'Technical Lead', count: 3 }
      ]
    },
    {
      name: 'Sales',
      total: 12,
      roles: [
        { role: 'Business Development Associate', count: 5 },
        { role: 'Sales Manager', count: 4 },
        { role: 'Account Executive', count: 3 }
      ]
    },
    {
      name: 'Marketing',
      total: 8,
      roles: [
        { role: 'Digital Marketing Manager', count: 3 },
        { role: 'Content Writer', count: 2 },
        { role: 'Marketing Analyst', count: 2 },
        { role: 'Brand Manager', count: 1 }
      ]
    }
  ]
};

// Calendar heatmap data (simplified for demo)
const calendarHeatmapData = [
  { date: '2024-01-01', count: 3 },
  { date: '2024-01-02', count: 5 },
  { date: '2024-01-03', count: 2 },
  { date: '2024-01-04', count: 8 },
  { date: '2024-01-05', count: 6 },
  // ... more dates
];

// Recent alerts and notifications
const recentAlerts = [
  {
    type: 'update',
    message: 'Template "Senior Software Engineer V3" updated 5 hrs ago',
    time: '5 hours ago',
    icon: FileText
  },
  {
    type: 'warning',
    message: 'Evaluation pending for "Data Scientist Lead" interviews',
    time: '8 hours ago',
    icon: Clock
  },
  {
    type: 'success',
    message: 'Weekly report generated successfully',
    time: '1 day ago',
    icon: CheckCircle2
  },
  {
    type: 'alert',
    message: 'High UFM detected in recent interviews',
    time: '2 days ago',
    icon: AlertTriangle
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

export default function EnhancedDashboard() {
  const [timePeriod, setTimePeriod] = useState('30d');
  const [departmentFilter, setDepartmentFilter] = useState('all');
  const [roleFilter, setRoleFilter] = useState('all');
  const [competencyFilter, setCompetencyFilter] = useState('engineering');
  const [showCalendarHeatmap, setShowCalendarHeatmap] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');

  // Filter chips for quick time periods
  const filterChips = [
    { label: 'Last 7 days', value: '7d' },
    { label: 'Last 30 days', value: '30d' },
    { label: 'Last 90 days', value: '90d' },
    { label: 'Custom date range', value: 'custom' }
  ];

  return (
    <div className="space-y-8">
      {/* Header with Search and Filters */}
      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Dashboard</h1>
          <p className="text-muted-foreground">Comprehensive interview analytics and insights</p>
        </div>
        
        {/* Top Bar Controls */}
        <div className="flex flex-col lg:flex-row gap-4">
          {/* Search Bar */}
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
            <input
              type="text"
              placeholder="Search candidates, roles, departments..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10 pr-4 py-2 bg-card border border-border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-primary w-80"
            />
          </div>
          
          {/* Filters */}
          <div className="flex gap-2">
            <select
              value={roleFilter}
              onChange={(e) => setRoleFilter(e.target.value)}
              className="bg-card border border-border rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary"
            >
              <option value="all">All Roles</option>
              <option value="engineer">Engineer</option>
              <option value="manager">Manager</option>
              <option value="analyst">Analyst</option>
            </select>
            
            <select
              value={departmentFilter}
              onChange={(e) => setDepartmentFilter(e.target.value)}
              className="bg-card border border-border rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary"
            >
              <option value="all">All Departments</option>
              <option value="engineering">Engineering</option>
              <option value="sales">Sales</option>
              <option value="marketing">Marketing</option>
              <option value="design">Design</option>
            </select>
          </div>
        </div>
      </div>

      {/* Quick Filter Chips */}
      <div className="flex flex-wrap gap-2">
        {filterChips.map((chip) => (
          <button
            key={chip.value}
            onClick={() => setTimePeriod(chip.value)}
            className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
              timePeriod === chip.value
                ? 'bg-primary text-primary-foreground'
                : 'bg-muted text-muted-foreground hover:text-foreground hover:bg-muted/80'
            }`}
          >
            {chip.label}
          </button>
        ))}
      </div>

      {/* Top KPI Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6">
        {kpiData.map((kpi, index) => {
          const Icon = kpi.icon;
          return (
            <div key={index} className="bg-card border border-border rounded-xl p-6">
              <div className="flex items-center justify-between mb-2">
                <Icon className={`w-5 h-5 ${kpi.isNegative ? 'text-red-500' : 'text-primary'}`} />
                <ChangeIndicator value={kpi.change} />
              </div>
              <div className="space-y-1">
                <p className="text-2xl font-bold text-foreground">{kpi.value}</p>
                <p className="text-sm font-medium text-foreground">{kpi.title}</p>
                <p className="text-xs text-muted-foreground">{kpi.description}</p>
                {kpi.delay && (
                  <p className="text-xs text-orange-600">+{kpi.delay}% delay increase</p>
                )}
              </div>
            </div>
          );
        })}
      </div>

      {/* Main Insights Section - Row 1 */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Enhanced Interview Funnel */}
        <div className="bg-card border border-border rounded-xl p-6">
          <InterviewFunnel />
        </div>

        {/* Graph 2: Recommendation Timeline - All Stages */}
        <div className="bg-card border border-border rounded-xl p-6">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-lg font-semibold text-foreground">Recommendation Timeline</h3>
            <div className="text-sm text-muted-foreground">
              All recommendation stages over time
            </div>
          </div>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={recommendationTimeline}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="month" />
              <YAxis />
              <Tooltip />
              <Line
                type="monotone"
                dataKey="highlyRecommended"
                stroke="#22c55e"
                strokeWidth={3}
                name="Highly Recommended"
                dot={{ fill: '#22c55e', strokeWidth: 2, r: 4 }}
              />
              <Line
                type="monotone"
                dataKey="recommended"
                stroke="#3b82f6"
                strokeWidth={3}
                name="Recommended"
                dot={{ fill: '#3b82f6', strokeWidth: 2, r: 4 }}
              />
              <Line
                type="monotone"
                dataKey="consider"
                stroke="#f59e0b"
                strokeWidth={3}
                name="Consider"
                dot={{ fill: '#f59e0b', strokeWidth: 2, r: 4 }}
              />
              <Line
                type="monotone"
                dataKey="notRecommended"
                stroke="#ef4444"
                strokeWidth={3}
                name="Not Recommended"
                dot={{ fill: '#ef4444', strokeWidth: 2, r: 4 }}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Main Insights Section - Row 2 */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Graph 3: UFM Trends */}
        <div className="bg-card border border-border rounded-xl p-6">
          <h3 className="text-lg font-semibold text-foreground mb-6">
            UFM (Unfair Means) Trends
          </h3>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={ufmTrendsData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="month" />
              <YAxis />
              <Tooltip />
              <Line 
                type="monotone" 
                dataKey="lipSync" 
                stroke="#ef4444" 
                strokeWidth={2}
                name="Lip Sync"
              />
              <Line 
                type="monotone" 
                dataKey="tabSwitching" 
                stroke="#f59e0b" 
                strokeWidth={2}
                name="Tab Switching"
              />
              <Line 
                type="monotone" 
                dataKey="multiFace" 
                stroke="#8b5cf6" 
                strokeWidth={2}
                name="Multi Face"
              />
              <Line 
                type="monotone" 
                dataKey="audioIssues" 
                stroke="#06b6d4" 
                strokeWidth={2}
                name="Audio Issues"
              />
              <Line 
                type="monotone" 
                dataKey="copyPaste" 
                stroke="#84cc16" 
                strokeWidth={2}
                name="Copy Paste"
              />
            </LineChart>
          </ResponsiveContainer>
        </div>

        {/* Graph 4: Top & Least Competencies */}
        <div className="bg-card border border-border rounded-xl p-6">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-lg font-semibold text-foreground">Competency Analysis</h3>
            <select
              value={competencyFilter}
              onChange={(e) => setCompetencyFilter(e.target.value)}
              className="bg-muted border border-border rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary"
            >
              <option value="engineering">Engineering</option>
              <option value="sales">Sales</option>
              <option value="marketing">Marketing</option>
              <option value="design">Design</option>
            </select>
          </div>

          <div className="space-y-6">
            {/* Top 3 Competencies */}
            <div>
              <h4 className="text-sm font-semibold text-green-600 mb-3 flex items-center">
                <TrendingUp className="w-4 h-4 mr-2" />
                Top 3 Competencies
              </h4>
              <div className="space-y-2">
                {competencyData
                  .sort((a, b) => b[competencyFilter as keyof typeof a] - a[competencyFilter as keyof typeof a])
                  .slice(0, 3)
                  .map((item, index) => (
                    <div key={item.competency} className="flex items-center justify-between p-3 bg-green-50 dark:bg-green-900/20 rounded-lg">
                      <div className="flex items-center space-x-3">
                        <span className="text-lg font-bold text-green-600">#{index + 1}</span>
                        <span className="font-medium text-foreground">{item.competency}</span>
                      </div>
                      <span className="text-xl font-bold text-green-600">
                        {item[competencyFilter as keyof typeof item]}%
                      </span>
                    </div>
                  ))}
              </div>
            </div>

            {/* Least 3 Competencies */}
            <div>
              <h4 className="text-sm font-semibold text-red-600 mb-3 flex items-center">
                <TrendingDown className="w-4 h-4 mr-2" />
                Areas for Improvement
              </h4>
              <div className="space-y-2">
                {competencyData
                  .sort((a, b) => a[competencyFilter as keyof typeof a] - b[competencyFilter as keyof typeof a])
                  .slice(0, 3)
                  .map((item, index) => (
                    <div key={item.competency} className="flex items-center justify-between p-3 bg-red-50 dark:bg-red-900/20 rounded-lg">
                      <div className="flex items-center space-x-3">
                        <span className="text-lg font-bold text-red-600">#{index + 1}</span>
                        <span className="font-medium text-foreground">{item.competency}</span>
                      </div>
                      <span className="text-xl font-bold text-red-600">
                        {item[competencyFilter as keyof typeof item]}%
                      </span>
                    </div>
                  ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Section 5: Trending Templates - Compact */}
      <div className="bg-card border border-border rounded-xl p-4">
        <h3 className="text-md font-semibold text-foreground mb-4">Trending Templates</h3>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-border">
                <th className="text-left py-2 px-2 font-medium text-foreground">Template Name</th>
                <th className="text-left py-2 px-2 font-medium text-foreground">Interviews</th>
                <th className="text-left py-2 px-2 font-medium text-foreground">Adeptness</th>
                <th className="text-left py-2 px-2 font-medium text-foreground">Effectiveness</th>
                <th className="text-left py-2 px-2 font-medium text-foreground">Integrity Rate</th>
              </tr>
            </thead>
            <tbody>
              {trendingTemplates.slice(0, 4).map((template, index) => (
                <tr key={index} className="border-b border-border hover:bg-muted/50">
                  <td className="py-2 px-2">
                    <div className="font-medium text-foreground text-sm">{template.name}</div>
                  </td>
                  <td className="py-2 px-2">
                    <div className="font-medium text-foreground">{template.totalInterviews}</div>
                  </td>
                  <td className="py-2 px-2">
                    <div className="font-medium text-foreground">{template.averageAdeptness}%</div>
                  </td>
                  <td className="py-2 px-2">
                    <div className="font-medium text-foreground">{template.averageEffectiveness}%</div>
                  </td>
                  <td className="py-2 px-2">
                    <div className={`font-medium ${
                      template.integrityRate >= 95 ? 'text-green-600' :
                      template.integrityRate >= 90 ? 'text-yellow-600' : 'text-red-600'
                    }`}>
                      {template.integrityRate}%
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Section 6: Upcoming Interviews with Calendar Heatmap */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Upcoming Interviews */}
        <div className="bg-card border border-border rounded-xl p-6">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-lg font-semibold text-foreground">Upcoming Interviews</h3>
            <button
              onClick={() => setShowCalendarHeatmap(!showCalendarHeatmap)}
              className="flex items-center space-x-2 px-3 py-2 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition-colors"
            >
              {showCalendarHeatmap ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
              <span>{showCalendarHeatmap ? 'Hide' : 'Show'} Calendar</span>
            </button>
          </div>
          
          <div className="space-y-4">
            <div className="text-lg font-semibold text-foreground">
              Total Interviews: {upcomingInterviews.totalInterviews}
            </div>
            
            {upcomingInterviews.departments.map((dept, index) => (
              <div key={index} className="space-y-2">
                <div className="font-medium text-foreground text-lg">
                  {dept.name} ({dept.total} interviews)
                </div>
                <div className="grid grid-cols-1 gap-2 ml-4">
                  {dept.roles.map((role, roleIndex) => (
                    <div key={roleIndex} className="flex items-center justify-between p-3 bg-muted rounded-lg">
                      <span className="text-foreground">{role.role}</span>
                      <span className="font-semibold text-primary">{role.count}</span>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Calendar Heatmap View */}
        <div className="bg-card border border-border rounded-xl p-6">
          <h3 className="text-lg font-semibold text-foreground mb-6">
            Calendar Heatmap View
          </h3>
          {showCalendarHeatmap ? (
            <div className="space-y-4">
              <div className="text-sm text-muted-foreground mb-4">
                Click on any date to see detailed interview breakdown
              </div>
              {/* Simplified calendar heatmap representation */}
              <div className="grid grid-cols-7 gap-1">
                {Array.from({ length: 35 }, (_, i) => {
                  const intensity = Math.floor(Math.random() * 4);
                  return (
                    <div
                      key={i}
                      className={`w-8 h-8 rounded cursor-pointer flex items-center justify-center text-xs font-medium ${
                        intensity === 0 ? 'bg-muted text-muted-foreground' :
                        intensity === 1 ? 'bg-blue-100 text-blue-800' :
                        intensity === 2 ? 'bg-blue-300 text-blue-900' :
                        'bg-blue-500 text-white'
                      }`}
                      title={`${i + 1} interviews scheduled`}
                    >
                      {i + 1}
                    </div>
                  );
                })}
              </div>
              <div className="flex items-center justify-between text-xs text-muted-foreground">
                <span>Less</span>
                <div className="flex space-x-1">
                  <div className="w-3 h-3 bg-muted rounded-sm" />
                  <div className="w-3 h-3 bg-blue-100 rounded-sm" />
                  <div className="w-3 h-3 bg-blue-300 rounded-sm" />
                  <div className="w-3 h-3 bg-blue-500 rounded-sm" />
                </div>
                <span>More</span>
              </div>
            </div>
          ) : (
            <div className="flex items-center justify-center h-64 text-muted-foreground">
              <div className="text-center">
                <Calendar className="w-12 h-12 mx-auto mb-4" />
                <p>Click "Show Calendar" to view heatmap</p>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Section 7: Recent Alerts and Notifications */}
      <div className="bg-card border border-border rounded-xl p-6">
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-lg font-semibold text-foreground">Recent Alerts & Notifications</h3>
          <Bell className="w-5 h-5 text-muted-foreground" />
        </div>
        <div className="space-y-4">
          {recentAlerts.map((alert, index) => {
            const Icon = alert.icon;
            return (
              <div key={index} className="flex items-start space-x-3 p-4 bg-muted rounded-lg">
                <Icon className={`w-5 h-5 mt-0.5 ${
                  alert.type === 'warning' || alert.type === 'alert' ? 'text-yellow-500' :
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
    </div>
  );
}
