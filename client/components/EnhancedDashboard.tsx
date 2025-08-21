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

// Simplified funnel data with stacked bar chart data
const interviewFunnelData = [
  {
    name: 'Scheduled',
    value: 1247,
    fill: '#3b82f6',
    percentage: 100,
    details: {
      total: 1247,
      substates: {
        noShow: 45,
        cancelled: 78,
        rescheduled: 32,
        upcoming: 1092
      }
    },
    stackedData: [
      { name: 'No Show', value: 45, fill: '#ef4444', percentage: 3.6 },
      { name: 'Cancelled', value: 78, fill: '#f97316', percentage: 6.3 },
      { name: 'Rescheduled', value: 32, fill: '#eab308', percentage: 2.6 },
      { name: 'Upcoming', value: 1092, fill: '#22c55e', percentage: 87.6 }
    ]
  },
  {
    name: 'Interviewed',
    value: 1092,
    fill: '#06b6d4',
    percentage: 87.6,
    details: {
      total: 1092,
      completionRate: 87.6,
      avgDuration: '45 mins'
    }
  },
  {
    name: 'Evaluated',
    value: 892,
    fill: '#10b981',
    percentage: 81.7,
    details: {
      total: 892,
      evaluationRate: 81.7,
      pendingEvaluations: 200,
      avgEvaluationTime: '2.3 days'
    }
  }
];

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

// All competency data with department/role filters
const competencyData = [
  {
    competency: 'Communication Clarity',
    engineering: 78,
    sales: 92,
    marketing: 88,
    design: 87
  },
  {
    competency: 'Cognitive Thinking & Reasoning',
    engineering: 85,
    sales: 72,
    marketing: 78,
    design: 80
  },
  {
    competency: 'Technical / Domain Expertise',
    engineering: 88,
    sales: 85,
    marketing: 75,
    design: 82
  },
  {
    competency: 'Adaptability & Learning',
    engineering: 82,
    sales: 86,
    marketing: 84,
    design: 88
  },
  {
    competency: 'Agility Execution',
    engineering: 90,
    sales: 78,
    marketing: 82,
    design: 85
  },
  {
    competency: 'Ownership Team & Social Collaboration',
    engineering: 75,
    sales: 88,
    marketing: 90,
    design: 85
  },
  {
    competency: 'Strategic Thinking',
    engineering: 77,
    sales: 83,
    marketing: 89,
    design: 81
  },
  {
    competency: 'Operational Execution',
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

// Recent alerts and notifications with priority levels
const recentAlerts = [
  {
    type: 'update',
    priority: 'medium',
    message: 'Template "Senior Software Engineer V3" updated 5 hrs ago',
    time: '5 hours ago',
    icon: FileText
  },
  {
    type: 'warning',
    priority: 'high',
    message: 'Evaluation pending for "Data Scientist Lead" interviews',
    time: '8 hours ago',
    icon: Clock
  },
  {
    type: 'success',
    priority: 'low',
    message: 'Weekly report generated successfully',
    time: '1 day ago',
    icon: CheckCircle2
  },
  {
    type: 'alert',
    priority: 'high',
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
  const [timePeriod, setTimePeriod] = useState('7d');
  const [departmentFilter, setDepartmentFilter] = useState('all');
  const [roleFilter, setRoleFilter] = useState('all');
  const [competencyFilter, setCompetencyFilter] = useState('engineering');
  const [showCalendarHeatmap, setShowCalendarHeatmap] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');

  // Time period options for dropdown
  const timePeriodOptions = [
    { label: 'Last 7 days', value: '7d' },
    { label: 'Last 30 days', value: '30d' },
    { label: 'Last 90 days', value: '90d' },
    { label: 'Custom date range', value: 'custom' }
  ];

  // Function to get filtered data based on selected filters
  const getFilteredData = (baseData: any, filterType: string = 'default') => {
    let filteredData = [...baseData];

    // Apply time period filter - simulate different data for different periods
    const timeMultiplier = timePeriod === '7d' ? 0.3 : timePeriod === '30d' ? 1 : timePeriod === '90d' ? 2.5 : 1;

    // Apply role filter
    if (roleFilter !== 'all' && filterType === 'competency') {
      // For competency data, adjust based on role
      filteredData = filteredData.map(item => ({
        ...item,
        [competencyFilter]: Math.max(60, Math.min(95, item[competencyFilter] + (roleFilter === 'engineer' ? 5 : roleFilter === 'manager' ? -3 : 0)))
      }));
    }

    // Apply department filter
    if (departmentFilter !== 'all') {
      if (filterType === 'interviews') {
        // Reduce data if specific department selected
        filteredData = filteredData.map(item => ({
          ...item,
          value: Math.floor(item.value * (departmentFilter === 'engineering' ? 0.6 : departmentFilter === 'sales' ? 0.3 : 0.1))
        }));
      }
    }

    // Apply time period adjustments
    if (filterType === 'timeline' || filterType === 'interviews') {
      filteredData = filteredData.map(item => ({
        ...item,
        ...(item.value && { value: Math.floor(item.value * timeMultiplier) }),
        ...(item.highlyRecommended && {
          highlyRecommended: Math.floor(item.highlyRecommended * timeMultiplier),
          recommended: Math.floor(item.recommended * timeMultiplier),
          consider: Math.floor(item.consider * timeMultiplier),
          notRecommended: Math.floor(item.notRecommended * timeMultiplier)
        })
      }));
    }

    return filteredData;
  };

  // Get filtered datasets
  const filteredFunnelData = getFilteredData(interviewFunnelData, 'interviews');
  const filteredTimelineData = getFilteredData(recommendationTimeline, 'timeline');
  const filteredCompetencyData = getFilteredData(competencyData, 'competency');
  const filteredUFMData = getFilteredData(ufmTrendsData, 'timeline');
  const filteredTemplatesData = getFilteredData(trendingTemplates, 'templates');

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

        {/* Global Filters */}
        <div className="flex gap-2">
          {/* Time Period Filter */}
          <select
            value={timePeriod}
            onChange={(e) => setTimePeriod(e.target.value)}
            className="bg-card border border-border rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary min-w-[140px]"
          >
            {timePeriodOptions.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>

          {/* Role Filter */}
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

          {/* Department Filter */}
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

    {/* Filter Summary */}
    <div className="flex flex-wrap gap-2 items-center">
      <span className="text-sm text-muted-foreground">Active Filters:</span>
      <span className="px-3 py-1 bg-primary/10 text-primary text-sm rounded-full">
        {timePeriodOptions.find(option => option.value === timePeriod)?.label}
      </span>
      {roleFilter !== 'all' && (
        <span className="px-3 py-1 bg-blue-100 text-blue-800 text-sm rounded-full dark:bg-blue-900/30 dark:text-blue-300">
          Role: {roleFilter}
        </span>
      )}
      {departmentFilter !== 'all' && (
        <span className="px-3 py-1 bg-green-100 text-green-800 text-sm rounded-full dark:bg-green-900/30 dark:text-green-300">
          Department: {departmentFilter}
        </span>
      )}
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
          <InterviewFunnel data={filteredFunnelData} />
        </div>

        {/* Graph 2: Recommendation Timeline - All Stages */}
        <div className="bg-card border border-border rounded-xl p-6">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-lg font-semibold text-foreground">Recommendation Timeline</h3>
            <div className="text-sm text-muted-foreground">
              {timePeriodOptions.find(option => option.value === timePeriod)?.label} - All stages
            </div>
          </div>

          {/* Legend */}
          <div className="mb-4">
            <div className="flex flex-wrap gap-4 text-sm">
              <div className="flex items-center space-x-2">
                <div className="w-3 h-0.5 bg-green-500"></div>
                <span className="text-muted-foreground">Highly Recommended</span>
              </div>
              <div className="flex items-center space-x-2">
                <div className="w-3 h-0.5 bg-blue-500"></div>
                <span className="text-muted-foreground">Recommended</span>
              </div>
              <div className="flex items-center space-x-2">
                <div className="w-3 h-0.5 bg-yellow-500"></div>
                <span className="text-muted-foreground">Consider</span>
              </div>
              <div className="flex items-center space-x-2">
                <div className="w-3 h-0.5 bg-red-500"></div>
                <span className="text-muted-foreground">Not Recommended</span>
              </div>
            </div>
          </div>

          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={filteredTimelineData}>
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

      {/* Competency Analysis Section - Full Width */}
      <div className="grid grid-cols-1 gap-6">
        {/* Competency Analysis - Compact */}
        <div className="bg-card border border-border rounded-xl p-4">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-md font-semibold text-foreground">Competency Analysis</h3>
            <select
              value={competencyFilter}
              onChange={(e) => setCompetencyFilter(e.target.value)}
              className="bg-muted border border-border rounded px-2 py-1 text-xs focus:outline-none focus:ring-2 focus:ring-primary"
            >
              <option value="engineering">Engineering</option>
              <option value="sales">Sales</option>
              <option value="marketing">Marketing</option>
              <option value="design">Design</option>
            </select>
          </div>

          {/* Compact Legend */}
          <div className="mb-3 p-2 bg-muted/30 rounded">
            <div className="flex flex-wrap gap-3 text-xs">
              <div className="flex items-center space-x-1">
                <div className="w-2 h-2 rounded bg-green-500"></div>
                <span className="text-muted-foreground">≥85%</span>
              </div>
              <div className="flex items-center space-x-1">
                <div className="w-2 h-2 rounded bg-blue-500"></div>
                <span className="text-muted-foreground">75-84%</span>
              </div>
              <div className="flex items-center space-x-1">
                <div className="w-2 h-2 rounded bg-yellow-500"></div>
                <span className="text-muted-foreground">65-74%</span>
              </div>
              <div className="flex items-center space-x-1">
                <div className="w-2 h-2 rounded bg-red-500"></div>
                <span className="text-muted-foreground">&lt;65%</span>
              </div>
            </div>
          </div>

          {/* All Competencies - Compact */}
          <div className="space-y-1">
            {filteredCompetencyData
              .sort((a, b) => b[competencyFilter as keyof typeof a] - a[competencyFilter as keyof typeof a])
              .map((item) => {
                const score = item[competencyFilter as keyof typeof item];
                const getScoreColor = (score: number) => {
                  if (score >= 85) return 'bg-green-100 border-green-200 text-green-800 dark:bg-green-900/20';
                  if (score >= 75) return 'bg-blue-100 border-blue-200 text-blue-800 dark:bg-blue-900/20';
                  if (score >= 65) return 'bg-yellow-100 border-yellow-200 text-yellow-800 dark:bg-yellow-900/20';
                  return 'bg-red-100 border-red-200 text-red-800 dark:bg-red-900/20';
                };

                return (
                  <div key={item.competency} className={`flex items-center justify-between p-2 border rounded ${getScoreColor(score)}`}>
                    <span className="font-medium text-sm">{item.competency}</span>
                    <span className="text-lg font-bold">
                      {score}%
                    </span>
                  </div>
                );
              })}
          </div>
        </div>
      </div>

      {/* Section 5: Highly used templates - Compact */}
      <div className="bg-card border border-border rounded-xl p-4">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-md font-semibold text-foreground">Highly used templates</h3>
          <div className="text-xs text-muted-foreground">
            {timePeriodOptions.find(option => option.value === timePeriod)?.label}
          </div>
        </div>

        {/* Integrity Rate Legend */}
        <div className="mb-3 p-2 bg-muted/30 rounded-lg">
          <h4 className="text-xs font-medium text-foreground mb-1">Integrity Rate:</h4>
          <div className="flex gap-3 text-xs">
            <div className="flex items-center space-x-1">
              <div className="w-2 h-2 rounded bg-green-600"></div>
              <span className="text-green-600">≥95% (Excellent)</span>
            </div>
            <div className="flex items-center space-x-1">
              <div className="w-2 h-2 rounded bg-yellow-600"></div>
              <span className="text-yellow-600">≥90% (Good)</span>
            </div>
            <div className="flex items-center space-x-1">
              <div className="w-2 h-2 rounded bg-red-600"></div>
              <span className="text-red-600">&lt;90% (Needs Attention)</span>
            </div>
          </div>
        </div>
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
              {filteredTemplatesData.slice(0, 4).map((template, index) => (
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


      {/* Section 7: Static Sections (Unaffected by Global Filters) */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Recent Alerts and Notifications */}
        <div className="bg-card border border-border rounded-xl p-6">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-lg font-semibold text-foreground">Recent Alerts & Notifications</h3>
            <div className="flex items-center space-x-2">
              <Bell className="w-5 h-5 text-muted-foreground" />
              <span className="text-xs text-muted-foreground bg-muted px-2 py-1 rounded">Global filters not applied</span>
            </div>
          </div>
          <div className="space-y-4">
            {recentAlerts.map((alert, index) => {
              const Icon = alert.icon;
              const getPriorityStyle = (priority: string) => {
                switch (priority) {
                  case 'high':
                    return 'bg-red-100 text-red-800 border-red-200 dark:bg-red-900/30 dark:text-red-300 dark:border-red-800';
                  case 'medium':
                    return 'bg-yellow-100 text-yellow-800 border-yellow-200 dark:bg-yellow-900/30 dark:text-yellow-300 dark:border-yellow-800';
                  case 'low':
                    return 'bg-green-100 text-green-800 border-green-200 dark:bg-green-900/30 dark:text-green-300 dark:border-green-800';
                  default:
                    return 'bg-gray-100 text-gray-800 border-gray-200 dark:bg-gray-900/30 dark:text-gray-300 dark:border-gray-800';
                }
              };

              return (
                <div key={index} className="flex items-start space-x-3 p-4 bg-muted rounded-lg">
                  <Icon className={`w-5 h-5 mt-0.5 ${
                    alert.type === 'warning' || alert.type === 'alert' ? 'text-yellow-500' :
                    alert.type === 'success' ? 'text-green-500' : 'text-blue-500'
                  }`} />
                  <div className="flex-1">
                    <div className="flex items-center space-x-2 mb-1">
                      <p className="text-sm font-medium text-foreground">{alert.message}</p>
                      <span className={`px-2 py-1 text-xs font-medium rounded-full border ${getPriorityStyle(alert.priority)}`}>
                        {alert.priority.toUpperCase()}
                      </span>
                    </div>
                    <p className="text-xs text-muted-foreground">{alert.time}</p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Full Month Calendar View */}
        <div className="bg-card border border-border rounded-xl p-6">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-lg font-semibold text-foreground">January 2024 - Interview Calendar</h3>
            <div className="flex items-center space-x-2">
              <Calendar className="w-5 h-5 text-muted-foreground" />
              <span className="text-xs text-muted-foreground bg-muted px-2 py-1 rounded">Global filters not applied</span>
            </div>
          </div>

          {/* Legend */}
          <div className="mb-4 space-y-2">
            <h4 className="text-sm font-medium text-foreground">Interview Intensity:</h4>
            <div className="flex items-center justify-between text-xs text-muted-foreground">
              <span>Less</span>
              <div className="flex space-x-1">
                <div className="flex flex-col items-center">
                  <div className="w-3 h-3 bg-muted rounded-sm" />
                  <span className="text-xs mt-1">0</span>
                </div>
                <div className="flex flex-col items-center">
                  <div className="w-3 h-3 bg-blue-100 rounded-sm" />
                  <span className="text-xs mt-1">1-3</span>
                </div>
                <div className="flex flex-col items-center">
                  <div className="w-3 h-3 bg-blue-300 rounded-sm" />
                  <span className="text-xs mt-1">4-6</span>
                </div>
                <div className="flex flex-col items-center">
                  <div className="w-3 h-3 bg-blue-500 rounded-sm" />
                  <span className="text-xs mt-1">7+</span>
                </div>
              </div>
              <span>More</span>
            </div>
          </div>

          {/* Full Calendar Grid */}
          <div className="grid grid-cols-7 gap-2">
            {/* Day Headers */}
            {['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'].map(day => (
              <div key={day} className="text-center text-sm font-semibold text-foreground p-2 bg-muted/50 rounded">
                {day.slice(0, 3)}
              </div>
            ))}

            {/* Calendar Days */}
            {Array.from({ length: 31 }, (_, i) => {
              const dayNumber = i + 1;
              const interviews = Math.floor(Math.random() * 12);
              const intensity = interviews === 0 ? 0 : interviews <= 3 ? 1 : interviews <= 6 ? 2 : 3;

              // Generate department and role data
              const engineering = Math.floor(interviews * (0.4 + Math.random() * 0.3));
              const sales = Math.floor(interviews * (0.2 + Math.random() * 0.2));
              const marketing = Math.floor(interviews * (0.1 + Math.random() * 0.2));
              const design = interviews - engineering - sales - marketing;

              const roles = [
                { name: 'Software Engineer', count: Math.floor(engineering * 0.6) },
                { name: 'Data Analyst', count: Math.floor(engineering * 0.4) },
                { name: 'Sales Manager', count: Math.floor(sales * 0.7) },
                { name: 'Account Executive', count: Math.floor(sales * 0.3) },
                { name: 'Marketing Manager', count: Math.floor(marketing * 0.8) },
                { name: 'UX Designer', count: design }
              ].filter(role => role.count > 0);

              return (
                <div
                  key={dayNumber}
                  className={`relative group min-h-[60px] p-2 rounded cursor-pointer transition-all hover:scale-105 border-2 border-transparent hover:border-primary/50 ${
                    intensity === 0 ? 'bg-muted/30 text-muted-foreground' :
                    intensity === 1 ? 'bg-blue-50 border-blue-200 text-blue-900' :
                    intensity === 2 ? 'bg-blue-100 border-blue-300 text-blue-900' :
                    'bg-blue-200 border-blue-400 text-blue-900'
                  }`}
                >
                  <div className="text-sm font-medium">{dayNumber}</div>
                  {interviews > 0 && (
                    <div className="text-xs mt-1">
                      <div className="font-bold">{interviews} interviews</div>
                    </div>
                  )}

                  {/* Detailed Hover Tooltip */}
                  {interviews > 0 && (
                    <div className="absolute top-full left-0 mt-2 opacity-0 group-hover:opacity-100 transition-opacity z-20 pointer-events-none">
                      <div className="bg-card border border-border rounded-lg p-4 shadow-xl min-w-[280px]">
                        <div className="text-sm font-bold text-foreground mb-3">January {dayNumber}, 2024</div>

                        {/* Department Breakdown */}
                        <div className="space-y-2 mb-3">
                          <h4 className="text-xs font-semibold text-muted-foreground">By Department:</h4>
                          {engineering > 0 && (
                            <div className="flex justify-between text-xs">
                              <span className="text-blue-600">Engineering:</span>
                              <span className="font-medium">{engineering}</span>
                            </div>
                          )}
                          {sales > 0 && (
                            <div className="flex justify-between text-xs">
                              <span className="text-green-600">Sales:</span>
                              <span className="font-medium">{sales}</span>
                            </div>
                          )}
                          {marketing > 0 && (
                            <div className="flex justify-between text-xs">
                              <span className="text-purple-600">Marketing:</span>
                              <span className="font-medium">{marketing}</span>
                            </div>
                          )}
                          {design > 0 && (
                            <div className="flex justify-between text-xs">
                              <span className="text-orange-600">Design:</span>
                              <span className="font-medium">{design}</span>
                            </div>
                          )}
                        </div>

                        {/* Role Breakdown */}
                        <div className="space-y-1">
                          <h4 className="text-xs font-semibold text-muted-foreground">By Role:</h4>
                          {roles.map((role, idx) => (
                            <div key={idx} className="flex justify-between text-xs">
                              <span className="text-muted-foreground">{role.name}:</span>
                              <span className="font-medium">{role.count}</span>
                            </div>
                          ))}
                        </div>

                        <div className="border-t border-border pt-2 mt-2">
                          <div className="flex justify-between text-sm font-bold">
                            <span>Total Interviews:</span>
                            <span className="text-primary">{interviews}</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}
