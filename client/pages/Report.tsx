import { useState } from "react";
import { Link } from "react-router-dom";
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
  AreaChart,
} from "recharts";
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
  Search,
  BarChart3,
} from "lucide-react";

const reportTabs = [
  { id: "candidates", name: "Candidate Overview", icon: Users },
  { id: "interviewer", name: "Interviewer Report", icon: Award },
  { id: "template", name: "Template Report", icon: FileText },
];

const candidateReportTabs = [
  { id: "summary", name: "Summary & Stages", icon: FileText },
  { id: "recording", name: "Recording & Transcript", icon: Eye },
  { id: "authentication", name: "Authentication", icon: User },
  { id: "chat", name: "Chat & Notes", icon: FileText },
];

// Session/Candidate data
const candidateOverview = [
  {
    candidate_id: "1234",
    candidate_name: "Ajit Sharma",
    email: "ajit1234@gmail.com",
    current_role: "PM",
    company: "TCS",
    experience: "3",
    applied_role: "Sr. PM",
    interviewer_id: "99",
    interviewer: "Ajay Srivastva",
    interview_date: "01/08/2025 11:00:00",
    duration: "1",
    connect_disconnect: "3",
    ufm_count: "1",
    ufm_list: ["Suspicious browser activity"],
    integrity_score: 90,
    overall_score: 95,
    suggestion: "Consider",
    recommendation:
      "Strong technical skills but minor integrity concerns need review",
  },
  {
    candidate_id: "2345",
    candidate_name: "Ram Gupta",
    email: "ram2345@gmail.com",
    current_role: "Junior Developer",
    company: "CISCO",
    experience: "1",
    applied_role: "Developer",
    interviewer_id: "47",
    interviewer: "Payal Jha",
    interview_date: "29/07/2025 14:00:22",
    duration: "1.5",
    connect_disconnect: "0",
    ufm_count: "3",
    ufm_list: [
      "Code copied from external source",
      "Tab switching detected",
      "Unauthorized help",
      "Multiple face detection",
      "Background noise interference",
    ],
    integrity_score: 75,
    overall_score: 89,
    suggestion: "Recommended",
    recommendation:
      "Excellent potential despite integrity violations - recommend with monitoring",
  },
  {
    candidate_id: "3456",
    candidate_name: "Priya Singh",
    email: "priya3456@yahoo.com",
    current_role: "UI/UX Designer",
    company: "Wipro",
    experience: "5",
    applied_role: "Sr. UI Designer",
    interviewer_id: "23",
    interviewer: "Vikram Mehta",
    interview_date: "28/07/2025 10:30:15",
    duration: "1.2",
    connect_disconnect: "1",
    ufm_count: "0",
    ufm_list: [],
    integrity_score: 98,
    overall_score: 92,
    suggestion: "Highly Recommended",
    recommendation:
      "Outstanding candidate with perfect integrity and strong design skills",
  },
  {
    candidate_id: "4567",
    candidate_name: "Rohit Kumar",
    email: "rohit4567@gmail.com",
    current_role: "Data Analyst",
    company: "Infosys",
    experience: "2",
    applied_role: "Sr. Data Analyst",
    interviewer_id: "15",
    interviewer: "Sneha Patel",
    interview_date: "27/07/2025 15:45:30",
    duration: "0.8",
    connect_disconnect: "5",
    ufm_count: "2",
    ufm_list: ["Audio issues detected", "Camera turned off for 3 minutes"],
    integrity_score: 82,
    overall_score: 78,
    suggestion: "Consider",
    recommendation:
      "Good analytical skills but technical setup issues affected performance",
  },
  {
    candidate_id: "5678",
    candidate_name: "Anita Reddy",
    email: "anita5678@outlook.com",
    current_role: "Marketing Manager",
    company: "HCL",
    experience: "4",
    applied_role: "Sr. Marketing Manager",
    interviewer_id: "88",
    interviewer: "Rajesh Khanna",
    interview_date: "26/07/2025 09:15:45",
    duration: "1.3",
    connect_disconnect: "2",
    ufm_count: "1",
    ufm_list: ["Phone notification interruption"],
    integrity_score: 88,
    overall_score: 85,
    suggestion: "Recommended",
    recommendation:
      "Strong marketing background with excellent communication skills",
  },
  {
    candidate_id: "6789",
    candidate_name: "Deepak Joshi",
    email: "deepak6789@hotmail.com",
    current_role: "QA Engineer",
    company: "Tech Mahindra",
    experience: "6",
    applied_role: "QA Lead",
    interviewer_id: "67",
    interviewer: "Meera Sharma",
    interview_date: "25/07/2025 16:20:10",
    duration: "1.1",
    connect_disconnect: "1",
    ufm_count: "4",
    ufm_list: [
      "Screen sharing issues",
      "Multiple browser tabs open",
      "External help suspected",
      "Copy-paste detected",
    ],
    integrity_score: 65,
    overall_score: 72,
    suggestion: "Not Recommended",
    recommendation:
      "Multiple integrity violations overshadow technical competency",
  },
  {
    candidate_id: "7890",
    candidate_name: "Kavya Nair",
    email: "kavya7890@gmail.com",
    current_role: "Business Analyst",
    company: "Accenture",
    experience: "7",
    applied_role: "Sr. Business Analyst",
    interviewer_id: "34",
    interviewer: "Arjun Gupta",
    interview_date: "24/07/2025 11:30:20",
    duration: "1.4",
    connect_disconnect: "0",
    ufm_count: "0",
    ufm_list: [],
    integrity_score: 100,
    overall_score: 96,
    suggestion: "Highly Recommended",
    recommendation:
      "Exceptional candidate with perfect integrity and outstanding analytical skills",
  },
];

const sessionTrends = [
  {
    week: "Week 1",
    total_sessions: 45,
    avg_ai_score: 78,
    avg_interviewer_score: 82,
    completion_rate: 87,
  },
  {
    week: "Week 2",
    total_sessions: 52,
    avg_ai_score: 81,
    avg_interviewer_score: 79,
    completion_rate: 91,
  },
  {
    week: "Week 3",
    total_sessions: 48,
    avg_ai_score: 84,
    avg_interviewer_score: 85,
    completion_rate: 89,
  },
  {
    week: "Week 4",
    total_sessions: 61,
    avg_ai_score: 86,
    avg_interviewer_score: 88,
    completion_rate: 93,
  },
];

// Template insights data
const templateComparison = [
  {
    template: "Software Engineer V1",
    candidates: 234,
    hired: 89,
    success_rate: 68,
    avg_score: 78,
    time_to_hire: 18,
  },
  {
    template: "Software Engineer V2",
    candidates: 189,
    hired: 142,
    success_rate: 85,
    avg_score: 84,
    time_to_hire: 14,
  },
  {
    template: "Product Manager V1",
    candidates: 156,
    hired: 89,
    success_rate: 72,
    avg_score: 82,
    time_to_hire: 22,
  },
  {
    template: "Product Manager V2",
    candidates: 123,
    hired: 98,
    success_rate: 79,
    avg_score: 86,
    time_to_hire: 19,
  },
];

const templateFeatureImpact = [
  { feature: "Technical Assessment", impact_score: 92, usage_rate: 98 },
  { feature: "Behavioral Questions", impact_score: 87, usage_rate: 95 },
  { feature: "System Design", impact_score: 89, usage_rate: 78 },
  { feature: "Code Review", impact_score: 94, usage_rate: 89 },
  { feature: "Cultural Fit", impact_score: 85, usage_rate: 92 },
  { feature: "Portfolio Review", impact_score: 91, usage_rate: 67 },
];

// Interviewer insights data
const interviewerMetrics = [
  {
    name: "John Smith",
    interviews: 234,
    avg_score: 82,
    consistency: 94,
    candidate_feedback: 4.7,
    improvement_areas: ["Time Management", "Technical Depth"],
  },
  {
    name: "Emily Davis",
    interviews: 189,
    avg_score: 85,
    consistency: 91,
    candidate_feedback: 4.8,
    improvement_areas: ["Question Variety"],
  },
  {
    name: "Alex Wilson",
    interviews: 156,
    avg_score: 79,
    consistency: 88,
    candidate_feedback: 4.5,
    improvement_areas: ["Communication Clarity", "Follow-up Questions"],
  },
  {
    name: "Lisa Brown",
    interviews: 198,
    avg_score: 87,
    consistency: 96,
    candidate_feedback: 4.9,
    improvement_areas: ["None - Excellent Performance"],
  },
  {
    name: "Mark Johnson",
    interviews: 167,
    avg_score: 81,
    consistency: 89,
    candidate_feedback: 4.6,
    improvement_areas: ["Bias Awareness", "Note Taking"],
  },
];

const interviewerSkillAnalysis = [
  {
    skill: "Question Quality",
    avg_score: 82,
    top_performer: "Lisa Brown",
    improvement_needed: 3,
  },
  {
    skill: "Candidate Engagement",
    avg_score: 85,
    top_performer: "Emily Davis",
    improvement_needed: 2,
  },
  {
    skill: "Technical Assessment",
    avg_score: 79,
    top_performer: "John Smith",
    improvement_needed: 4,
  },
  {
    skill: "Time Management",
    avg_score: 77,
    top_performer: "Lisa Brown",
    improvement_needed: 5,
  },
  {
    skill: "Bias Mitigation",
    avg_score: 74,
    top_performer: "Emily Davis",
    improvement_needed: 6,
  },
];

export default function Report() {
  const [activeTab, setActiveTab] = useState("candidates");
  const [timeRange, setTimeRange] = useState("30d");
  const [selectedCandidate, setSelectedCandidate] = useState<any>(null);
  const [candidateReportTab, setCandidateReportTab] = useState("summary");
  const [showCandidateDetail, setShowCandidateDetail] = useState(false);
  const [selectedInterviewer, setSelectedInterviewer] = useState<any>(null);
  const [showInterviewerDetail, setShowInterviewerDetail] = useState(false);
  const [topFilter, setTopFilter] = useState("all");
  const [sortBy, setSortBy] = useState("score");
  const [searchTerm, setSearchTerm] = useState("");
  const [candidateGraphFilter, setCandidateGraphFilter] = useState("30");
  const [viewMode, setViewMode] = useState<"card" | "sheet">("card");
  const [interviewerViewMode, setInterviewerViewMode] = useState<"card" | "list">("card");
  const [interviewerSearchTerm, setInterviewerSearchTerm] = useState("");
  const [interviewerSortBy, setInterviewerSortBy] = useState("name");

  // Filter and sort candidates
  const getFilteredCandidates = () => {
    let filtered = candidateOverview.filter(
      (candidate) =>
        candidate.candidate_name
          .toLowerCase()
          .includes(searchTerm.toLowerCase()) ||
        candidate.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
        candidate.applied_role.toLowerCase().includes(searchTerm.toLowerCase()),
    );

    // Sort candidates
    filtered.sort((a, b) => {
      switch (sortBy) {
        case "score":
          return b.overall_score - a.overall_score;
        case "date":
          return (
            new Date(b.interview_date).getTime() -
            new Date(a.interview_date).getTime()
          );
        case "integrity":
          return b.integrity_score - a.integrity_score;
        case "experience":
          return parseInt(b.experience) - parseInt(a.experience);
        default:
          return b.overall_score - a.overall_score;
      }
    });

    // Apply top filter
    if (topFilter !== "all") {
      const limit = parseInt(topFilter);
      filtered = filtered.slice(0, limit);
    }

    return filtered;
  };

  const getVerdictColor = (verdict: string) => {
    switch (verdict) {
      case "Highly Recommended":
        return "bg-green-500/10 text-green-500";
      case "Consider":
        return "bg-yellow-500/10 text-yellow-500";
      case "Not Recommended":
        return "bg-red-500/10 text-red-500";
      default:
        return "bg-gray-500/10 text-gray-500";
    }
  };

  const getIntegrityColor = (status: string) => {
    switch (status) {
      case "Clean":
        return "bg-green-500/10 text-green-500";
      case "Suspicious":
        return "bg-red-500/10 text-red-500";
      default:
        return "bg-gray-500/10 text-gray-500";
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-foreground">
            Analytics Reports
          </h1>
          <p className="text-muted-foreground">
            Comprehensive insights for data-driven hiring decisions
          </p>
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
                  ? "bg-background text-foreground shadow-sm"
                  : "text-muted-foreground hover:text-foreground"
              }`}
            >
              <IconComponent className="w-4 h-4" />
              <span>{tab.name}</span>
            </button>
          );
        })}
      </div>

      {/* Candidate Overview Tab */}
      {activeTab === "candidates" && !showCandidateDetail && (
        <div className="space-y-8">
          {/* Candidate Performance Table */}
          <div className="bg-card border border-border rounded-xl p-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold text-foreground">
                Candidate Overview
              </h3>
              <div className="flex flex-wrap items-center gap-3">
                <div className="relative flex-1 min-w-[250px]">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
                  <input
                    type="text"
                    placeholder="Search candidates..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="w-full pl-10 pr-4 py-2 bg-background border border-border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-primary"
                  />
                </div>
                <select
                  value={topFilter}
                  onChange={(e) => setTopFilter(e.target.value)}
                  className="px-3 py-2 bg-background border border-border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-primary"
                >
                  <option value="all">All Candidates</option>
                  <option value="3">Top 3</option>
                  <option value="5">Top 5</option>
                  <option value="10">Top 10</option>
                  <option value="50">Top 50</option>
                  <option value="100">Top 100</option>
                </select>
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                  className="px-3 py-2 bg-background border border-border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-primary"
                >
                  <option value="score">Sort by Score</option>
                  <option value="date">Sort by Date</option>
                  <option value="integrity">Sort by Integrity</option>
                  <option value="experience">Sort by Experience</option>
                </select>
                <button className="px-4 py-2 bg-secondary text-secondary-foreground rounded-lg text-sm hover:bg-secondary/80 transition-colors">
                  <Filter className="w-4 h-4 inline mr-2" />
                  Filters
                </button>

                {/* View Toggle */}
                <div className="flex items-center bg-muted rounded-lg p-1">
                  <button
                    onClick={() => setViewMode("card")}
                    className={`px-3 py-1 rounded-md text-sm font-medium transition-colors ${
                      viewMode === "card"
                        ? "bg-background text-foreground shadow-sm"
                        : "text-muted-foreground hover:text-foreground"
                    }`}
                  >
                    <BarChart3 className="w-4 h-4 inline mr-1" />
                    Cards
                  </button>
                  <button
                    onClick={() => setViewMode("sheet")}
                    className={`px-3 py-1 rounded-md text-sm font-medium transition-colors ${
                      viewMode === "sheet"
                        ? "bg-background text-foreground shadow-sm"
                        : "text-muted-foreground hover:text-foreground"
                    }`}
                  >
                    <FileText className="w-4 h-4 inline mr-1" />
                    Sheet
                  </button>
                </div>
              </div>
            </div>
            {/* Card View */}
            {viewMode === "card" && (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {getFilteredCandidates().map((candidate, index) => (
                  <div
                    key={index}
                    className="bg-card border border-border rounded-xl p-6 hover:shadow-lg hover:border-primary/30 transition-all cursor-pointer"
                    onClick={() => {
                      setSelectedCandidate(candidate);
                      setShowCandidateDetail(true);
                      setCandidateReportTab("summary");
                    }}
                  >
                    {/* Header with Avatar and Status */}
                    <div className="flex items-start justify-between mb-4">
                      <div className="flex items-center space-x-3">
                        <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-cyan-500 rounded-xl flex items-center justify-center shadow-sm">
                          <span className="text-white text-sm font-bold">
                            {candidate.candidate_name
                              .split(" ")
                              .map((n) => n[0])
                              .join("")}
                          </span>
                        </div>
                        <div>
                          <h3 className="font-semibold text-foreground">
                            {candidate.candidate_name}
                          </h3>
                          <p className="text-xs text-muted-foreground">
                            ID: {candidate.candidate_id}
                          </p>
                        </div>
                      </div>
                      <span
                        className={`px-3 py-1 rounded-full text-xs font-medium ${
                          candidate.suggestion === "Highly Recommended"
                            ? "bg-green-500/10 text-green-600"
                            : candidate.suggestion === "Recommended"
                              ? "bg-blue-500/10 text-blue-600"
                              : candidate.suggestion === "Consider"
                                ? "bg-yellow-500/10 text-yellow-600"
                                : "bg-red-500/10 text-red-600"
                        }`}
                      >
                        {candidate.suggestion}
                      </span>
                    </div>

                    {/* Contact & Basic Info */}
                    <div className="space-y-2 mb-4">
                      <div className="flex items-center space-x-2">
                        <span className="text-xs text-muted-foreground min-w-[60px]">
                          Email:
                        </span>
                        <span className="text-xs text-foreground truncate">
                          {candidate.email}
                        </span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <span className="text-xs text-muted-foreground min-w-[60px]">
                          Applied:
                        </span>
                        <span className="text-xs text-foreground font-medium">
                          {candidate.applied_role}
                        </span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <span className="text-xs text-muted-foreground min-w-[60px]">
                          Exp:
                        </span>
                        <span className="text-xs text-foreground">
                          {candidate.experience} years
                        </span>
                      </div>
                    </div>

                    {/* Interview Details */}
                    <div className="bg-muted rounded-lg p-3 mb-4">
                      <div className="grid grid-cols-2 gap-2 text-xs">
                        <div>
                          <span className="text-muted-foreground">
                            Interviewer:
                          </span>
                          <p className="font-medium text-foreground">
                            {candidate.interviewer}
                          </p>
                        </div>
                        <div>
                          <span className="text-muted-foreground">
                            Duration:
                          </span>
                          <p className="font-medium text-foreground">
                            {candidate.duration} hrs
                          </p>
                        </div>
                        <div className="col-span-2">
                          <span className="text-muted-foreground">Date:</span>
                          <p className="font-medium text-foreground">
                            {candidate.interview_date}
                          </p>
                        </div>
                      </div>
                    </div>

                    {/* Scores Section */}
                    <div className="space-y-3 mb-4">
                      {/* Overall Score */}
                      <div>
                        <div className="flex items-center justify-between mb-1">
                          <span className="text-xs font-medium text-foreground">
                            Overall Score
                          </span>
                          <span className="text-xs font-bold text-primary">
                            {candidate.overall_score}
                          </span>
                        </div>
                        <div className="w-full bg-muted rounded-full h-2">
                          <div
                            className={`h-2 rounded-full ${
                              candidate.overall_score >= 90
                                ? "bg-green-500"
                                : candidate.overall_score >= 80
                                  ? "bg-blue-500"
                                  : candidate.overall_score >= 70
                                    ? "bg-yellow-500"
                                    : "bg-red-500"
                            }`}
                            style={{ width: `${candidate.overall_score}%` }}
                          />
                        </div>
                      </div>

                      {/* Integrity Score */}
                      <div>
                        <div className="flex items-center justify-between mb-1">
                          <span className="text-xs font-medium text-foreground">
                            Integrity Score
                          </span>
                          <span className="text-xs font-bold text-green-600">
                            {candidate.integrity_score}
                          </span>
                        </div>
                        <div className="w-full bg-muted rounded-full h-2">
                          <div
                            className={`h-2 rounded-full ${
                              candidate.integrity_score >= 85
                                ? "bg-green-500"
                                : candidate.integrity_score >= 70
                                  ? "bg-yellow-500"
                                  : "bg-red-500"
                            }`}
                            style={{ width: `${candidate.integrity_score}%` }}
                          />
                        </div>
                      </div>
                    </div>

                    {/* Technical Metrics */}
                    <div className="flex items-center justify-between pt-3 border-t border-border">
                      <div className="flex items-center space-x-4">
                        {/* Connection Issues */}
                        <div className="text-center">
                          <div
                            className={`text-xs font-bold ${
                              parseInt(candidate.connect_disconnect) > 2
                                ? "text-red-600"
                                : "text-green-600"
                            }`}
                          >
                            {candidate.connect_disconnect}
                          </div>
                          <div className="text-[10px] text-muted-foreground">
                            Disconnects
                          </div>
                        </div>

                        {/* UFM Count */}
                        <div className="text-center">
                          <div
                            className={`text-xs font-bold cursor-help ${
                              parseInt(candidate.ufm_count) > 0
                                ? "text-red-600"
                                : "text-green-600"
                            }`}
                            title={candidate.ufm_list.join(", ")}
                          >
                            {candidate.ufm_count}
                          </div>
                          <div className="text-[10px] text-muted-foreground">
                            UFM
                          </div>
                        </div>
                      </div>

                      {/* View Details Button */}
                      <button className="px-3 py-1 bg-primary text-primary-foreground rounded-md text-xs font-medium hover:bg-primary/90 transition-colors">
                        View Details
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}

            {/* Sheet View */}
            {viewMode === "sheet" && (
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b border-border">
                      <th className="text-left py-3 px-2 font-medium text-foreground text-xs">
                        ID
                      </th>
                      <th className="text-left py-3 px-2 font-medium text-foreground text-xs">
                        Candidate
                      </th>
                      <th className="text-left py-3 px-2 font-medium text-foreground text-xs">
                        Email
                      </th>
                      <th className="text-left py-3 px-2 font-medium text-foreground text-xs">
                        Experience
                      </th>
                      <th className="text-left py-3 px-2 font-medium text-foreground text-xs">
                        Applied Role
                      </th>
                      <th className="text-left py-3 px-2 font-medium text-foreground text-xs">
                        Interviewer
                      </th>
                      <th className="text-left py-3 px-2 font-medium text-foreground text-xs">
                        Date & Time
                      </th>
                      <th className="text-left py-3 px-2 font-medium text-foreground text-xs">
                        Duration
                      </th>
                      <th className="text-left py-3 px-2 font-medium text-foreground text-xs">
                        Connect/Disconnect
                      </th>
                      <th className="text-left py-3 px-2 font-medium text-foreground text-xs">
                        UFM Count
                      </th>
                      <th className="text-left py-3 px-2 font-medium text-foreground text-xs">
                        Integrity Score
                      </th>
                      <th className="text-left py-3 px-2 font-medium text-foreground text-xs">
                        Overall Score
                      </th>
                      <th className="text-left py-3 px-2 font-medium text-foreground text-xs">
                        Suggestion
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {getFilteredCandidates().map((candidate, index) => (
                      <tr
                        key={index}
                        className="border-b border-border hover:bg-muted/50 cursor-pointer"
                        onClick={() => {
                          setSelectedCandidate(candidate);
                          setShowCandidateDetail(true);
                          setCandidateReportTab("summary");
                        }}
                      >
                        <td className="py-2 px-2 text-xs text-foreground">
                          {candidate.candidate_id}
                        </td>
                        <td className="py-2 px-2">
                          <div className="flex items-center space-x-2">
                            <div className="w-6 h-6 bg-gradient-to-br from-blue-500 to-cyan-500 rounded-lg flex items-center justify-center">
                              <span className="text-white text-xs font-semibold">
                                {candidate.candidate_name
                                  .split(" ")
                                  .map((n) => n[0])
                                  .join("")}
                              </span>
                            </div>
                            <span className="font-medium text-foreground text-xs">
                              {candidate.candidate_name}
                            </span>
                          </div>
                        </td>
                        <td className="py-2 px-2 text-xs text-foreground">
                          {candidate.email}
                        </td>
                        <td className="py-2 px-2 text-xs text-foreground">
                          {candidate.experience} yrs
                        </td>
                        <td className="py-2 px-2 text-xs text-foreground">
                          {candidate.applied_role}
                        </td>
                        <td className="py-2 px-2 text-xs text-foreground">
                          {candidate.interviewer}
                        </td>
                        <td className="py-2 px-2 text-xs text-foreground">
                          {candidate.interview_date}
                        </td>
                        <td className="py-2 px-2 text-xs text-foreground">
                          {candidate.duration} hrs
                        </td>
                        <td className="py-2 px-2 text-xs text-center">
                          <span
                            className={`px-1 py-0.5 rounded text-xs ${
                              parseInt(candidate.connect_disconnect) > 2
                                ? "bg-red-500/10 text-red-600"
                                : "bg-green-500/10 text-green-600"
                            }`}
                          >
                            {candidate.connect_disconnect}
                          </span>
                        </td>
                        <td className="py-2 px-2 text-xs text-center">
                          <span
                            className={`px-1 py-0.5 rounded text-xs cursor-help ${
                              parseInt(candidate.ufm_count) > 0
                                ? "bg-red-500/10 text-red-600"
                                : "bg-green-500/10 text-green-600"
                            }`}
                            title={candidate.ufm_list.join(", ")}
                          >
                            {candidate.ufm_count}
                          </span>
                        </td>
                        <td className="py-2 px-2 text-xs text-center">
                          <div className="flex items-center space-x-1">
                            <div className="w-8 bg-muted rounded-full h-1.5">
                              <div
                                className={`h-1.5 rounded-full ${
                                  candidate.integrity_score >= 85
                                    ? "bg-green-500"
                                    : candidate.integrity_score >= 70
                                      ? "bg-yellow-500"
                                      : "bg-red-500"
                                }`}
                                style={{
                                  width: `${candidate.integrity_score}%`,
                                }}
                              />
                            </div>
                            <span className="text-foreground text-xs">
                              {candidate.integrity_score}
                            </span>
                          </div>
                        </td>
                        <td className="py-2 px-2 text-xs text-center">
                          <div className="flex items-center space-x-1">
                            <div className="w-8 bg-muted rounded-full h-1.5">
                              <div
                                className={`h-1.5 rounded-full ${
                                  candidate.overall_score >= 90
                                    ? "bg-green-500"
                                    : candidate.overall_score >= 80
                                      ? "bg-blue-500"
                                      : candidate.overall_score >= 70
                                        ? "bg-yellow-500"
                                        : "bg-red-500"
                                }`}
                                style={{ width: `${candidate.overall_score}%` }}
                              />
                            </div>
                            <span className="text-foreground text-xs">
                              {candidate.overall_score}
                            </span>
                          </div>
                        </td>
                        <td className="py-2 px-2">
                          <span
                            className={`px-2 py-1 rounded-full text-xs font-medium ${
                              candidate.suggestion === "Recommended"
                                ? "bg-green-500/10 text-green-600"
                                : candidate.suggestion === "Consider"
                                  ? "bg-yellow-500/10 text-yellow-600"
                                  : "bg-red-500/10 text-red-600"
                            }`}
                          >
                            {candidate.suggestion}
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        </div>
      )}

      {/* Detailed Candidate Report */}
      {activeTab === "candidates" &&
        showCandidateDetail &&
        selectedCandidate && (
          <div className="space-y-6">
            {/* Report Header */}
            <div className="bg-card border border-border rounded-xl p-6">
              <div className="flex items-center space-x-4">
                <div className="w-12 h-12 bg-gradient-to-br from-purple-500 to-violet-600 rounded-xl flex items-center justify-center shadow-lg">
                  <span className="text-xl font-bold text-white">Σ</span>
                </div>
                <div>
                  <h1 className="text-2xl font-bold text-foreground">
                    Think_Int_2
                  </h1>
                  <p className="text-sm text-muted-foreground">
                    Individual Candidate Report
                  </p>
                </div>
              </div>
            </div>
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
                <span
                  className={`px-3 py-1 rounded-full text-sm font-medium ${
                    selectedCandidate.suggestion === "Recommended"
                      ? "bg-green-500/10 text-green-600"
                      : selectedCandidate.suggestion === "Consider"
                        ? "bg-yellow-500/10 text-yellow-600"
                        : "bg-red-500/10 text-red-600"
                  }`}
                >
                  {selectedCandidate.suggestion === "Recommended"
                    ? "Highly Recommended"
                    : selectedCandidate.suggestion}
                </span>
              </div>

              {/* Basic Info */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
                <div>
                  <p className="text-sm text-muted-foreground mb-1">
                    Candidate Details
                  </p>
                  <p className="font-semibold text-foreground">
                    {selectedCandidate.candidate_name}
                  </p>
                  <p className="text-sm text-muted-foreground">
                    {selectedCandidate.email}
                  </p>
                  <p className="text-sm text-muted-foreground">
                    ID: {selectedCandidate.candidate_id}
                  </p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground mb-1">
                    Interview Details
                  </p>
                  <p className="font-semibold text-foreground">
                    {selectedCandidate.interview_date}
                  </p>
                  <p className="text-sm text-muted-foreground">
                    Role: {selectedCandidate.applied_role}
                  </p>
                  <p className="text-sm text-muted-foreground">
                    Interviewer: {selectedCandidate.interviewer} (ID:{" "}
                    {selectedCandidate.interviewer_id})
                  </p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground mb-1">Status</p>
                  <p className="font-semibold text-green-600">Evaluated</p>
                  <p className="text-sm text-muted-foreground">
                    Duration: {selectedCandidate.duration} hrs
                  </p>
                </div>
              </div>

              {/* Key Scores */}
              <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
                <div className="bg-purple-500/10 border border-purple-500/20 rounded-lg p-4 text-center">
                  <Brain className="w-6 h-6 text-purple-500 mx-auto mb-2" />
                  <p className="text-sm text-muted-foreground">AI Score</p>
                  <p className="text-2xl font-bold text-foreground">
                    {selectedCandidate.overall_score}
                  </p>
                </div>
                <div className="bg-blue-500/10 border border-blue-500/20 rounded-lg p-4 text-center">
                  <User className="w-6 h-6 text-blue-500 mx-auto mb-2" />
                  <p className="text-sm text-muted-foreground">
                    Interviewer Score
                  </p>
                  <p className="text-2xl font-bold text-foreground">
                    {selectedCandidate.overall_score - 3}
                  </p>
                </div>
                <div className="bg-orange-500/10 border border-orange-500/20 rounded-lg p-4 text-center">
                  <Brain className="w-6 h-6 text-orange-500 mx-auto mb-2" />
                  <p className="text-sm text-muted-foreground">
                    Behavioral Score
                  </p>
                  <p className="text-2xl font-bold text-foreground">
                    {selectedCandidate.overall_score - 5}
                  </p>
                </div>
                <div className="bg-green-500/10 border border-green-500/20 rounded-lg p-4 text-center">
                  <Shield className="w-6 h-6 text-green-500 mx-auto mb-2" />
                  <p className="text-sm text-muted-foreground">
                    Integrity Score
                  </p>
                  <p className="text-2xl font-bold text-foreground">
                    {selectedCandidate.integrity_score}
                  </p>
                </div>
                {/* Final Status Card */}
                <div
                  className={`border-2 rounded-lg p-4 text-center ${
                    selectedCandidate.suggestion === "Highly Recommended"
                      ? "bg-green-500/10 border-green-500/30"
                      : selectedCandidate.suggestion === "Recommended"
                        ? "bg-blue-500/10 border-blue-500/30"
                        : selectedCandidate.suggestion === "Consider"
                          ? "bg-yellow-500/10 border-yellow-500/30"
                          : "bg-red-500/10 border-red-500/30"
                  }`}
                >
                  <Award
                    className={`w-6 h-6 mx-auto mb-2 ${
                      selectedCandidate.suggestion === "Highly Recommended"
                        ? "text-green-600"
                        : selectedCandidate.suggestion === "Recommended"
                          ? "text-blue-600"
                          : selectedCandidate.suggestion === "Consider"
                            ? "text-yellow-600"
                            : "text-red-600"
                    }`}
                  />
                  <p className="text-xs text-muted-foreground mb-1">
                    Final Status
                  </p>
                  <p
                    className={`text-sm font-bold mb-2 ${
                      selectedCandidate.suggestion === "Highly Recommended"
                        ? "text-green-700"
                        : selectedCandidate.suggestion === "Recommended"
                          ? "text-blue-700"
                          : selectedCandidate.suggestion === "Consider"
                            ? "text-yellow-700"
                            : "text-red-700"
                    }`}
                  >
                    {selectedCandidate.suggestion}
                  </p>
                  <p className="text-xs text-muted-foreground leading-tight">
                    {selectedCandidate.recommendation}
                  </p>
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
                        ? "bg-background text-foreground shadow-sm"
                        : "text-muted-foreground hover:text-foreground"
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
              {candidateReportTab === "summary" && (
                <div className="space-y-6">
                  <h3 className="text-lg font-semibold text-foreground">
                    Summary & Stages
                  </h3>

                  {/* Interview Stages */}
                  <div className="space-y-4">
                    <h4 className="font-medium text-foreground">
                      Interview Stages
                    </h4>
                    <div className="space-y-2">
                      <div className="flex items-center justify-between p-3 bg-muted rounded-lg">
                        <span className="font-medium">Introduction</span>
                        <span className="text-sm text-muted-foreground">
                          00:00 - 05:30
                        </span>
                      </div>
                      <div className="flex items-center justify-between p-3 bg-muted rounded-lg">
                        <span className="font-medium">
                          Technical Assessment
                        </span>
                        <span className="text-sm text-muted-foreground">
                          05:30 - 35:00
                        </span>
                      </div>
                      <div className="flex items-center justify-between p-3 bg-muted rounded-lg">
                        <span className="font-medium">Problem Solving</span>
                        <span className="text-sm text-muted-foreground">
                          35:00 - 55:00
                        </span>
                      </div>
                      <div className="flex items-center justify-between p-3 bg-muted rounded-lg">
                        <span className="font-medium">Q&A Session</span>
                        <span className="text-sm text-muted-foreground">
                          55:00 - 60:00
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Competency Analysis */}
                  <div className="space-y-4">
                    <h4 className="font-medium text-foreground">
                      Competency Analysis
                    </h4>
                    <div className="bg-muted rounded-lg p-6">
                      <h5 className="font-medium text-foreground mb-4 text-center">
                        Required vs Achieved
                      </h5>
                      <div className="h-80">
                        <ResponsiveContainer width="100%" height="100%">
                          <RadarChart
                            data={[
                              {
                                competency: "Python",
                                required: 8,
                                achieved: 7,
                                fullMark: 10,
                              },
                              {
                                competency: "SQL",
                                required: 9,
                                achieved: 8.5,
                                fullMark: 10,
                              },
                              {
                                competency: "Data Visualization",
                                required: 7,
                                achieved: 8,
                                fullMark: 10,
                              },
                              {
                                competency: "Problem Solving",
                                required: 8,
                                achieved: 7.5,
                                fullMark: 10,
                              },
                              {
                                competency: "Communication",
                                required: 6,
                                achieved: 7.5,
                                fullMark: 10,
                              },
                            ]}
                          >
                            <PolarGrid />
                            <PolarAngleAxis
                              dataKey="competency"
                              tick={{
                                fontSize: 12,
                                fill: "hsl(var(--foreground))",
                              }}
                            />
                            <PolarRadiusAxis
                              angle={90}
                              domain={[0, 10]}
                              tick={{
                                fontSize: 10,
                                fill: "hsl(var(--muted-foreground))",
                              }}
                              tickCount={6}
                            />
                            <Radar
                              name="Required"
                              dataKey="required"
                              stroke="#22c55e"
                              fill="#22c55e"
                              fillOpacity={0.1}
                              strokeWidth={3}
                              strokeDasharray="5 5"
                            />
                            <Radar
                              name="Candidate Avg"
                              dataKey="achieved"
                              stroke="#1f2937"
                              fill="#1f2937"
                              fillOpacity={0.3}
                              strokeWidth={3}
                            />
                            <Tooltip
                              contentStyle={{
                                backgroundColor: "hsl(var(--card))",
                                border: "1px solid hsl(var(--border))",
                                borderRadius: "8px",
                                fontSize: "12px",
                              }}
                            />
                          </RadarChart>
                        </ResponsiveContainer>
                      </div>
                      <div className="flex justify-center space-x-8 mt-4">
                        <div className="flex items-center space-x-2">
                          <div className="w-4 h-1 bg-green-500 border-2 border-green-500 border-dashed" />
                          <span className="text-sm text-muted-foreground">
                            Required
                          </span>
                        </div>
                        <div className="flex items-center space-x-2">
                          <div className="w-4 h-1 bg-gray-800" />
                          <span className="text-sm text-muted-foreground">
                            Candidate Avg
                          </span>
                        </div>
                      </div>
                    </div>

                    {/* Detailed Competency Breakdown with AI/Interviewer Comments */}
                    <div className="space-y-3 mt-6">
                      <h5 className="font-medium text-foreground">
                        Detailed Assessment
                      </h5>
                      {[
                        {
                          name: "Python",
                          aiScore: 7.0,
                          interviewerScore: 6.8,
                          aiComment:
                            "Strong fundamentals in Python programming, good use of libraries and data structures",
                          interviewerComment:
                            "Solid coding skills but could improve efficiency in complex algorithms, good problem-solving approach",
                        },
                        {
                          name: "SQL",
                          aiScore: 8.5,
                          interviewerScore: 8.2,
                          aiComment:
                            "Excellent database querying skills, understands complex joins and optimization",
                          interviewerComment:
                            "Very strong SQL knowledge, handled optimization questions well, great understanding of indexing",
                        },
                        {
                          name: "Data Visualization",
                          aiScore: 8.0,
                          interviewerScore: 8.3,
                          aiComment:
                            "Exceeds expectations in creating clear, insightful visualizations with proper chart selection",
                          interviewerComment:
                            "Great design sense and storytelling with data, understands audience needs well",
                        },
                        {
                          name: "Problem Solving",
                          aiScore: 7.5,
                          interviewerScore: 7.8,
                          aiComment:
                            "Systematic approach to breaking down complex problems, good logical thinking",
                          interviewerComment:
                            "Good analytical thinking, sometimes needs more creative approaches but solid methodology",
                        },
                        {
                          name: "Communication",
                          aiScore: 7.5,
                          interviewerScore: 7.2,
                          aiComment:
                            "Clear explanations and good technical communication skills, appropriate pace",
                          interviewerComment:
                            "Excellent at explaining complex concepts, could improve confidence in presentation",
                        },
                      ].map((competency, index) => (
                        <div
                          key={index}
                          className="p-4 bg-background rounded-lg border border-border"
                        >
                          <div className="flex items-center justify-between mb-3">
                            <h6 className="font-medium text-foreground">
                              {competency.name}
                            </h6>
                            <div className="flex items-center space-x-4 text-sm">
                              <span className="text-purple-600">
                                AI: {competency.aiScore}
                              </span>
                              <span className="text-blue-600">
                                Interviewer: {competency.interviewerScore}
                              </span>
                            </div>
                          </div>
                          <div className="space-y-2">
                            <div className="p-3 bg-purple-500/5 border border-purple-500/20 rounded">
                              <p className="text-xs text-purple-700">
                                <strong>
                                  AI Analysis ({competency.aiScore}):
                                </strong>{" "}
                                {competency.aiComment}
                              </p>
                            </div>
                            <div className="p-3 bg-blue-500/5 border border-blue-500/20 rounded">
                              <p className="text-xs text-blue-700">
                                <strong>
                                  Interviewer Assessment (
                                  {competency.interviewerScore}):
                                </strong>{" "}
                                {competency.interviewerComment}
                              </p>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Behavioral Traits */}
                  <div className="space-y-4">
                    <h4 className="font-medium text-foreground">
                      Behavioral Traits Analysis
                    </h4>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {[
                        {
                          trait: "Decision-Making Ability",
                          score: 85,
                          rationale:
                            "Shows confidence in making choices, considers multiple options",
                        },
                        {
                          trait: "Emotional Awareness",
                          score: 78,
                          rationale:
                            "Good self-awareness, handles stress reasonably well",
                        },
                        {
                          trait: "Communication Clarity",
                          score: 92,
                          rationale:
                            "Excellent verbal communication, clear explanations",
                        },
                        {
                          trait: "Integrity & Authenticity",
                          score: selectedCandidate.integrity_score,
                          rationale:
                            "Honest responses, transparent about limitations",
                        },
                      ].map((trait, index) => (
                        <div key={index} className="p-4 bg-muted rounded-lg">
                          <div className="flex items-center justify-between mb-3">
                            <h5 className="font-medium text-foreground text-sm">
                              {trait.trait}
                            </h5>
                            <span className="text-lg font-bold text-primary">
                              {trait.score}
                            </span>
                          </div>
                          <div className="bg-background rounded-full h-2 mb-3">
                            <div
                              className="bg-primary h-2 rounded-full"
                              style={{ width: `${trait.score}%` }}
                            />
                          </div>
                          <p className="text-xs text-muted-foreground">
                            {trait.rationale}
                          </p>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Session Integrity */}
                  <div className="space-y-4">
                    <h4 className="font-medium text-foreground">
                      Session Integrity Overview
                    </h4>
                    <div className="bg-muted rounded-lg p-4 text-center">
                      <Shield className="w-12 h-12 text-green-500 mx-auto mb-4" />
                      <h5 className="text-2xl font-bold text-foreground mb-2">
                        {selectedCandidate.integrity_score}/100
                      </h5>
                      <p className="text-muted-foreground mb-4">
                        Overall Integrity Score
                      </p>
                      {parseInt(selectedCandidate.ufm_count) > 0 ? (
                        <div className="text-left">
                          <h6 className="font-medium text-foreground mb-2 text-center">
                            Detected Issues
                          </h6>
                          <div className="space-y-2">
                            {selectedCandidate.ufm_list.map(
                              (ufm: string, index: number) => (
                                <div
                                  key={index}
                                  className="flex items-center space-x-3 p-2 bg-red-500/10 border border-red-500/20 rounded"
                                >
                                  <div className="w-2 h-2 bg-red-500 rounded-full" />
                                  <span className="text-red-700 text-sm">
                                    {ufm}
                                  </span>
                                </div>
                              ),
                            )}
                          </div>
                        </div>
                      ) : (
                        <div className="p-3 bg-green-500/10 border border-green-500/20 rounded-lg">
                          <p className="text-sm text-green-600">
                            No integrity violations detected
                          </p>
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Performance Summary */}
                  <div className="space-y-4">
                    <h4 className="font-medium text-foreground">
                      Performance Summary
                    </h4>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="p-4 bg-green-500/10 border border-green-500/20 rounded-lg">
                        <h5 className="font-medium text-green-700 mb-2">
                          Strengths
                        </h5>
                        <ul className="text-sm text-green-600 space-y-1">
                          <li>
                            • Strong technical knowledge and problem-solving
                            approach
                          </li>
                          <li>• Clear communication and logical thinking</li>
                          <li>
                            • Good understanding of system design principles
                          </li>
                        </ul>
                      </div>
                      <div className="p-4 bg-red-500/10 border border-red-500/20 rounded-lg">
                        <h5 className="font-medium text-red-700 mb-2">
                          Weaknesses / Lacking for Role
                        </h5>
                        <ul className="text-sm text-red-600 space-y-1">
                          <li>
                            • Time management during coding exercises needs
                            improvement
                          </li>
                          <li>
                            • Uncertainty in advanced algorithm concepts may
                            limit performance
                          </li>
                          <li>
                            • Could benefit from more experience in system
                            architecture
                          </li>
                        </ul>
                      </div>
                    </div>
                  </div>

                  {/* Interviewer Feedback */}
                  <div className="p-4 bg-blue-500/10 border border-blue-500/20 rounded-lg">
                    <h4 className="font-medium text-blue-700 mb-2">
                      Interviewer Feedback
                    </h4>
                    <p className="text-sm text-blue-600">
                      Strong technical performance and clear communication
                      skills. The candidate demonstrated good problem-solving
                      abilities and showed enthusiasm for the role. Minor
                      concerns about time management during coding exercises,
                      but overall a solid candidate with potential for growth.
                      Recommend proceeding to next round with focus on system
                      design discussion.
                    </p>
                  </div>
                </div>
              )}

              {candidateReportTab === "recording" && (
                <div className="space-y-6">
                  <h3 className="text-lg font-semibold text-foreground">
                    Recording & Transcript
                  </h3>

                  {/* Recording Player with Side Panel */}
                  <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
                    {/* Video Player */}
                    <div className="lg:col-span-3">
                      <div className="bg-muted rounded-lg p-8 text-center">
                        <Eye className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
                        <p className="text-muted-foreground">
                          Video recording would be embedded here
                        </p>
                        <button className="mt-4 px-4 py-2 bg-primary text-primary-foreground rounded-lg">
                          Play Recording
                        </button>
                      </div>
                    </div>

                    {/* Side Panel - Filters and Preview */}
                    <div className="lg:col-span-1">
                      <div className="bg-card border border-border rounded-lg p-4 space-y-4">
                        <h4 className="font-medium text-foreground">
                          Recording Controls
                        </h4>

                        {/* Filters */}
                        <div className="space-y-3">
                          <div>
                            <label className="text-xs text-muted-foreground mb-1 block">
                              View Type
                            </label>
                            <select className="w-full px-2 py-1 text-xs bg-background border border-border rounded">
                              <option>Primary Camera</option>
                              <option>Side Camera</option>
                              <option>Screen Share</option>
                              <option>Picture-in-Picture</option>
                            </select>
                          </div>

                          <div>
                            <label className="text-xs text-muted-foreground mb-1 block">
                              Integrity Events
                            </label>
                            <div className="space-y-1">
                              <label className="flex items-center space-x-2 text-xs">
                                <input
                                  type="checkbox"
                                  className="w-3 h-3"
                                  defaultChecked
                                />
                                <span>UFM Markers</span>
                              </label>
                              <label className="flex items-center space-x-2 text-xs">
                                <input
                                  type="checkbox"
                                  className="w-3 h-3"
                                  defaultChecked
                                />
                                <span>Face Detection</span>
                              </label>
                              <label className="flex items-center space-x-2 text-xs">
                                <input type="checkbox" className="w-3 h-3" />
                                <span>Audio Issues</span>
                              </label>
                            </div>
                          </div>

                          <div>
                            <label className="text-xs text-muted-foreground mb-1 block">
                              Behavioral Tags
                            </label>
                            <div className="space-y-1">
                              <label className="flex items-center space-x-2 text-xs">
                                <input
                                  type="checkbox"
                                  className="w-3 h-3"
                                  defaultChecked
                                />
                                <span>Confidence Peaks</span>
                              </label>
                              <label className="flex items-center space-x-2 text-xs">
                                <input type="checkbox" className="w-3 h-3" />
                                <span>Stress Moments</span>
                              </label>
                            </div>
                          </div>
                        </div>

                        {/* Preview Thumbnails */}
                        <div className="space-y-2">
                          <p className="text-xs text-muted-foreground">
                            Camera Views
                          </p>
                          <div className="grid grid-cols-2 gap-2">
                            <div className="bg-muted rounded p-2 text-center">
                              <div className="w-full h-16 bg-background rounded mb-1 flex items-center justify-center">
                                <Eye className="w-4 h-4 text-muted-foreground" />
                              </div>
                              <p className="text-xs">Primary</p>
                            </div>
                            <div className="bg-muted rounded p-2 text-center">
                              <div className="w-full h-16 bg-background rounded mb-1 flex items-center justify-center">
                                <Eye className="w-4 h-4 text-muted-foreground" />
                              </div>
                              <p className="text-xs">Side</p>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Behavioral Tags Section */}
                  <div className="space-y-4">
                    <h4 className="font-medium text-foreground">
                      Behavioral Analysis Timeline
                    </h4>
                    <div className="bg-card border border-border rounded-lg overflow-hidden">
                      <div className="overflow-x-auto">
                        <table className="w-full">
                          <thead className="bg-muted">
                            <tr>
                              <th className="text-left py-3 px-4 font-medium text-foreground text-sm">
                                Timestamp
                              </th>
                              <th className="text-left py-3 px-4 font-medium text-foreground text-sm">
                                Speaker
                              </th>
                              <th className="text-left py-3 px-4 font-medium text-foreground text-sm">
                                Conversation Snippet
                              </th>
                              <th className="text-left py-3 px-4 font-medium text-foreground text-sm">
                                Behavioral Tags
                              </th>
                            </tr>
                          </thead>
                          <tbody>
                            {[
                              {
                                timestamp: "00:02:15",
                                speaker: "Interviewer",
                                snippet:
                                  "Can you tell me about your experience with React?",
                                tags: ["Professional", "Clear Communication"],
                              },
                              {
                                timestamp: "00:02:32",
                                speaker: "Candidate",
                                snippet:
                                  "I have been working with React for about 3 years...",
                                tags: ["Confident", "Technical Knowledge"],
                              },
                              {
                                timestamp: "00:05:45",
                                speaker: "Interviewer",
                                snippet:
                                  "That's great. Now, can you walk me through a challenging project?",
                                tags: ["Encouraging", "Probing"],
                              },
                              {
                                timestamp: "00:06:12",
                                speaker: "Candidate",
                                snippet:
                                  "Well... um... there was this project where...",
                                tags: ["Hesitant", "Thinking", "Nervous"],
                              },
                              {
                                timestamp: "00:12:30",
                                speaker: "Candidate",
                                snippet:
                                  "I implemented a caching strategy that improved performance by 40%",
                                tags: [
                                  "Achievement-Oriented",
                                  "Confident",
                                  "Technical",
                                ],
                              },
                              {
                                timestamp: "00:18:22",
                                speaker: "Interviewer",
                                snippet:
                                  "How do you handle working under pressure?",
                                tags: ["Behavioral Question", "Assessing"],
                              },
                              {
                                timestamp: "00:18:45",
                                speaker: "Candidate",
                                snippet:
                                  "I actually perform better under pressure. In my last role...",
                                tags: [
                                  "Self-Aware",
                                  "Confident",
                                  "Stress Tolerance",
                                ],
                              },
                            ].map((entry, index) => (
                              <tr
                                key={index}
                                className="border-b border-border hover:bg-muted/50"
                              >
                                <td className="py-3 px-4 text-sm font-mono text-primary">
                                  {entry.timestamp}
                                </td>
                                <td className="py-3 px-4 text-sm">
                                  <span
                                    className={`font-medium ${
                                      entry.speaker === "Interviewer"
                                        ? "text-blue-600"
                                        : "text-green-600"
                                    }`}
                                  >
                                    {entry.speaker}
                                  </span>
                                </td>
                                <td className="py-3 px-4 text-sm text-muted-foreground max-w-xs">
                                  <p className="truncate" title={entry.snippet}>
                                    {entry.snippet}
                                  </p>
                                </td>
                                <td className="py-3 px-4">
                                  <div className="flex flex-wrap gap-1">
                                    {entry.tags.map((tag, tagIndex) => (
                                      <span
                                        key={tagIndex}
                                        className={`px-2 py-1 rounded-full text-xs font-medium ${
                                          tag.includes("Confident") ||
                                          tag.includes("Achievement")
                                            ? "bg-green-500/10 text-green-600"
                                            : tag.includes("Nervous") ||
                                                tag.includes("Hesitant")
                                              ? "bg-red-500/10 text-red-600"
                                              : tag.includes("Technical") ||
                                                  tag.includes("Professional")
                                                ? "bg-blue-500/10 text-blue-600"
                                                : "bg-gray-500/10 text-gray-600"
                                        }`}
                                      >
                                        {tag}
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
                  </div>

                  {/* Speaking Time Analysis */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <h4 className="font-medium text-foreground mb-4">
                        Speaking Time Analysis
                      </h4>
                      <div className="space-y-3">
                        <div className="flex items-center justify-between">
                          <span className="text-sm">Candidate</span>
                          <div className="flex items-center space-x-2">
                            <div className="w-32 bg-muted rounded-full h-2">
                              <div
                                className="bg-blue-500 h-2 rounded-full"
                                style={{ width: "65%" }}
                              />
                            </div>
                            <span className="text-sm text-muted-foreground">
                              65%
                            </span>
                          </div>
                        </div>
                        <div className="flex items-center justify-between">
                          <span className="text-sm">Interviewer</span>
                          <div className="flex items-center space-x-2">
                            <div className="w-32 bg-muted rounded-full h-2">
                              <div
                                className="bg-green-500 h-2 rounded-full"
                                style={{ width: "35%" }}
                              />
                            </div>
                            <span className="text-sm text-muted-foreground">
                              35%
                            </span>
                          </div>
                        </div>
                      </div>
                    </div>

                    <div>
                      <h4 className="font-medium text-foreground mb-4">
                        Conversation Flow
                      </h4>
                      <div className="text-sm text-muted-foreground space-y-1">
                        <p>• 2 interruptions detected</p>
                        <p>• Average response time: 3.2 seconds</p>
                        <p>• Longest monologue: 4 minutes (candidate)</p>
                      </div>
                    </div>
                  </div>

                  {/* Transcript with Download */}
                  <div>
                    <div className="flex items-center justify-between mb-4">
                      <h4 className="font-medium text-foreground">
                        Full Transcript
                      </h4>
                      <button className="flex items-center space-x-2 px-3 py-2 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition-colors text-sm">
                        <Download className="w-4 h-4" />
                        <span>Download Transcript</span>
                      </button>
                    </div>
                    <div className="bg-muted rounded-lg p-4 max-h-64 overflow-y-auto space-y-3">
                      <div className="text-sm">
                        <div className="flex items-start space-x-3">
                          <span className="text-xs text-muted-foreground font-mono min-w-[60px]">
                            00:01:15
                          </span>
                          <div>
                            <span className="font-medium text-blue-600">
                              Interviewer:
                            </span>
                            <span className="ml-2">
                              Hello {selectedCandidate.candidate_name}, thank
                              you for joining us today. Can you start by telling
                              me about yourself?
                            </span>
                          </div>
                        </div>
                      </div>
                      <div className="text-sm">
                        <div className="flex items-start space-x-3">
                          <span className="text-xs text-muted-foreground font-mono min-w-[60px]">
                            00:01:32
                          </span>
                          <div>
                            <span className="font-medium text-green-600">
                              Candidate:
                            </span>
                            <span className="ml-2">
                              Hi, thank you for having me. I'm a software
                              engineer with {selectedCandidate.experience} years
                              of experience in web development. I'm passionate
                              about creating scalable applications and have
                              worked extensively with React, Node.js, and cloud
                              technologies...
                            </span>
                          </div>
                        </div>
                      </div>
                      <div className="text-sm">
                        <div className="flex items-start space-x-3">
                          <span className="text-xs text-muted-foreground font-mono min-w-[60px]">
                            00:02:45
                          </span>
                          <div>
                            <span className="font-medium text-blue-600">
                              Interviewer:
                            </span>
                            <span className="ml-2">
                              That's great. Now let's move to a technical
                              question. Can you explain how you would design a
                              scalable web application architecture?
                            </span>
                          </div>
                        </div>
                      </div>
                      <div className="text-sm">
                        <div className="flex items-start space-x-3">
                          <span className="text-xs text-muted-foreground font-mono min-w-[60px]">
                            00:03:02
                          </span>
                          <div>
                            <span className="font-medium text-green-600">
                              Candidate:
                            </span>
                            <span className="ml-2">
                              Sure, I would start by considering the expected
                              traffic and data volume. For the frontend, I'd use
                              a component-based architecture with React,
                              implement state management with Redux for complex
                              applications...
                            </span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {candidateReportTab === "competency" && (
                <div className="space-y-6">
                  <h3 className="text-lg font-semibold text-foreground">
                    Competency Analysis
                  </h3>

                  {/* Spider Chart for Expected vs Achieved */}
                  <div className="bg-muted rounded-lg p-6">
                    <h4 className="font-medium text-foreground mb-4 text-center">
                      Required vs Achieved
                    </h4>
                    <div className="h-96">
                      <ResponsiveContainer width="100%" height="100%">
                        <RadarChart
                          data={[
                            {
                              competency: "Python",
                              required: 8,
                              achieved: 7,
                              fullMark: 10,
                            },
                            {
                              competency: "SQL",
                              required: 9,
                              achieved: 8.5,
                              fullMark: 10,
                            },
                            {
                              competency: "Data Visualization",
                              required: 7,
                              achieved: 8,
                              fullMark: 10,
                            },
                            {
                              competency: "Problem Solving",
                              required: 8,
                              achieved: 7.5,
                              fullMark: 10,
                            },
                            {
                              competency: "Communication",
                              required: 6,
                              achieved: 7.5,
                              fullMark: 10,
                            },
                          ]}
                        >
                          <PolarGrid />
                          <PolarAngleAxis
                            dataKey="competency"
                            tick={{
                              fontSize: 12,
                              fill: "hsl(var(--foreground))",
                            }}
                          />
                          <PolarRadiusAxis
                            angle={90}
                            domain={[0, 10]}
                            tick={{
                              fontSize: 10,
                              fill: "hsl(var(--muted-foreground))",
                            }}
                            tickCount={6}
                          />
                          <Radar
                            name="Required"
                            dataKey="required"
                            stroke="#22c55e"
                            fill="#22c55e"
                            fillOpacity={0.1}
                            strokeWidth={3}
                            strokeDasharray="5 5"
                          />
                          <Radar
                            name="Candidate Avg"
                            dataKey="achieved"
                            stroke="#1f2937"
                            fill="#1f2937"
                            fillOpacity={0.3}
                            strokeWidth={3}
                          />
                          <Tooltip
                            contentStyle={{
                              backgroundColor: "hsl(var(--card))",
                              border: "1px solid hsl(var(--border))",
                              borderRadius: "8px",
                              fontSize: "12px",
                            }}
                          />
                        </RadarChart>
                      </ResponsiveContainer>
                    </div>
                    <div className="flex justify-center space-x-8 mt-4">
                      <div className="flex items-center space-x-2">
                        <div className="w-4 h-1 bg-green-500 border-2 border-green-500 border-dashed" />
                        <span className="text-sm text-muted-foreground">
                          Required
                        </span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <div className="w-4 h-1 bg-gray-800" />
                        <span className="text-sm text-muted-foreground">
                          Candidate Avg
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Detailed Analysis */}
                  <div className="space-y-4">
                    <h4 className="font-medium text-foreground">
                      Detailed Competency Breakdown
                    </h4>
                    {[
                      {
                        name: "Python",
                        required: 8.0,
                        achieved: 7.0,
                        ai_comment:
                          "Strong fundamentals in Python programming, good use of libraries",
                        interviewer_comment:
                          "Solid coding skills but could improve efficiency in complex algorithms",
                      },
                      {
                        name: "SQL",
                        required: 9.0,
                        achieved: 8.5,
                        ai_comment:
                          "Excellent database querying skills, understands complex joins",
                        interviewer_comment:
                          "Very strong SQL knowledge, handled optimization questions well",
                      },
                      {
                        name: "Data Visualization",
                        required: 7.0,
                        achieved: 8.0,
                        ai_comment:
                          "Exceeds expectations in creating clear, insightful visualizations",
                        interviewer_comment:
                          "Great design sense and storytelling with data",
                      },
                      {
                        name: "Problem Solving",
                        required: 8.0,
                        achieved: 7.5,
                        ai_comment:
                          "Systematic approach to breaking down complex problems",
                        interviewer_comment:
                          "Good analytical thinking, sometimes needs more creative approaches",
                      },
                      {
                        name: "Communication",
                        required: 6.0,
                        achieved: 7.5,
                        ai_comment:
                          "Clear explanations and good technical communication skills",
                        interviewer_comment:
                          "Excellent at explaining complex concepts in simple terms",
                      },
                    ].map((competency, index) => (
                      <div key={index} className="p-4 bg-muted rounded-lg">
                        <div className="flex items-center justify-between mb-3">
                          <h4 className="font-medium text-foreground">
                            {competency.name}
                          </h4>
                          <div className="flex items-center space-x-4 text-sm">
                            <span className="text-green-600">
                              Required: {competency.required}
                            </span>
                            <span className="text-gray-700">
                              Achieved: {competency.achieved}
                            </span>
                            <span
                              className={`px-2 py-1 rounded-full text-xs font-medium ${
                                competency.achieved >= competency.required
                                  ? "bg-green-500/10 text-green-600"
                                  : competency.achieved >=
                                      competency.required - 0.5
                                    ? "bg-yellow-500/10 text-yellow-600"
                                    : "bg-red-500/10 text-red-600"
                              }`}
                            >
                              {competency.achieved >= competency.required
                                ? "Meets Requirement"
                                : competency.achieved >=
                                    competency.required - 0.5
                                  ? "Close to Target"
                                  : "Below Requirement"}
                            </span>
                          </div>
                        </div>
                        <div className="grid grid-cols-2 gap-2 mb-3">
                          <div className="bg-background rounded h-2">
                            <div
                              className="bg-green-500 h-2 rounded border-2 border-green-500 border-dashed"
                              style={{
                                width: `${(competency.required / 10) * 100}%`,
                              }}
                            />
                          </div>
                          <div className="bg-background rounded h-2">
                            <div
                              className="bg-gray-700 h-2 rounded"
                              style={{
                                width: `${(competency.achieved / 10) * 100}%`,
                              }}
                            />
                          </div>
                        </div>
                        <div className="space-y-2">
                          <div className="p-2 bg-blue-500/5 border border-blue-500/20 rounded">
                            <p className="text-xs text-blue-700">
                              <strong>AI Analysis:</strong>{" "}
                              {competency.ai_comment}
                            </p>
                          </div>
                          <div className="p-2 bg-purple-500/5 border border-purple-500/20 rounded">
                            <p className="text-xs text-purple-700">
                              <strong>Interviewer Feedback:</strong>{" "}
                              {competency.interviewer_comment}
                            </p>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {candidateReportTab === "authentication" && (
                <div className="space-y-6">
                  <h3 className="text-lg font-semibold text-foreground">
                    Authentication
                  </h3>

                  {/* Photo Verification */}
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <div className="bg-muted rounded-lg p-4 text-center">
                      <div className="w-24 h-24 bg-gradient-to-br from-blue-500 to-cyan-500 rounded-full mx-auto mb-3 flex items-center justify-center">
                        <span className="text-white text-2xl font-bold">
                          {selectedCandidate.candidate_name
                            .split(" ")
                            .map((n: string) => n[0])
                            .join("")}
                        </span>
                      </div>
                      <p className="text-sm text-muted-foreground">
                        Profile Photo
                      </p>
                    </div>

                    <div className="bg-muted rounded-lg p-4 text-center">
                      <div className="w-24 h-24 bg-gradient-to-br from-green-500 to-blue-500 rounded-full mx-auto mb-3 flex items-center justify-center">
                        <User className="w-12 h-12 text-white" />
                      </div>
                      <p className="text-sm text-muted-foreground">
                        Live Capture
                      </p>
                    </div>

                    <div className="space-y-3">
                      <div className="p-3 bg-green-500/10 border border-green-500/20 rounded-lg">
                        <p className="text-sm font-medium text-green-700">
                          Face Match: 96%
                        </p>
                      </div>
                      <div className="p-3 bg-green-500/10 border border-green-500/20 rounded-lg">
                        <p className="text-sm font-medium text-green-700">
                          ID Verified
                        </p>
                      </div>
                      <div className="p-3 bg-green-500/10 border border-green-500/20 rounded-lg">
                        <p className="text-sm font-medium text-green-700">
                          No Fraud Detected
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {candidateReportTab === "chat" && (
                <div className="space-y-6">
                  <h3 className="text-lg font-semibold text-foreground">
                    Chat & Notes
                  </h3>

                  {/* Chat Logs */}
                  <div>
                    <h4 className="font-medium text-foreground mb-4">
                      Chat History
                    </h4>
                    <div className="bg-muted rounded-lg p-4 max-h-64 overflow-y-auto space-y-3">
                      <div className="text-sm">
                        <span className="text-xs text-muted-foreground">
                          10:55 AM
                        </span>
                        <div className="mt-1 p-2 bg-blue-500/10 rounded">
                          <span className="font-medium text-blue-600">
                            Interviewer:
                          </span>
                          <span className="ml-2">
                            Welcome! We'll start in 2 minutes.
                          </span>
                        </div>
                      </div>
                      <div className="text-sm">
                        <span className="text-xs text-muted-foreground">
                          11:20 AM
                        </span>
                        <div className="mt-1 p-2 bg-green-500/10 rounded">
                          <span className="font-medium text-green-600">
                            Candidate:
                          </span>
                          <span className="ml-2">
                            Thank you for the opportunity!
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Interviewer Notes */}
                  <div>
                    <h4 className="font-medium text-foreground mb-4">
                      Interviewer Notes
                    </h4>
                    <div className="bg-muted rounded-lg p-4">
                      <p className="text-sm text-muted-foreground">
                        Candidate showed strong technical skills and good
                        communication. Recommended for next round. Note: Follow
                        up on system design experience.
                      </p>
                    </div>
                  </div>

                  {/* Shared Links */}
                  <div>
                    <h4 className="font-medium text-foreground mb-4">
                      Shared Resources
                    </h4>
                    <div className="space-y-2">
                      <div className="flex items-center space-x-3 p-3 bg-muted rounded-lg">
                        <FileText className="w-4 h-4 text-primary" />
                        <span className="text-sm">
                          Code Repository - GitHub Link
                        </span>
                        <span className="text-xs text-muted-foreground ml-auto">
                          11:15 AM
                        </span>
                      </div>
                      <div className="flex items-center space-x-3 p-3 bg-muted rounded-lg">
                        <FileText className="w-4 h-4 text-primary" />
                        <span className="text-sm">Portfolio Website</span>
                        <span className="text-xs text-muted-foreground ml-auto">
                          11:30 AM
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        )}

      {/* Template Report Tab */}
      {activeTab === "template" && (
        <div className="space-y-8">
          {/* Template Comparison */}
          <div className="bg-card border border-border rounded-xl p-6">
            <h3 className="text-lg font-semibold text-foreground mb-4">
              Template Performance Comparison
            </h3>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-border">
                    <th className="text-left py-3 px-4 font-medium text-foreground">
                      Template
                    </th>
                    <th className="text-left py-3 px-4 font-medium text-foreground">
                      Candidates
                    </th>
                    <th className="text-left py-3 px-4 font-medium text-foreground">
                      Hired
                    </th>
                    <th className="text-left py-3 px-4 font-medium text-foreground">
                      Success Rate
                    </th>
                    <th className="text-left py-3 px-4 font-medium text-foreground">
                      Avg Score
                    </th>
                    <th className="text-left py-3 px-4 font-medium text-foreground">
                      Time to Hire
                    </th>
                    <th className="text-left py-3 px-4 font-medium text-foreground">
                      Recommendation
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {templateComparison.map((template, index) => (
                    <tr
                      key={index}
                      className="border-b border-border hover:bg-muted/50"
                    >
                      <td className="py-3 px-4 font-medium text-foreground">
                        {template.template}
                      </td>
                      <td className="py-3 px-4 text-muted-foreground">
                        {template.candidates}
                      </td>
                      <td className="py-3 px-4 text-muted-foreground">
                        {template.hired}
                      </td>
                      <td className="py-3 px-4">
                        <div className="flex items-center space-x-2">
                          <div className="w-16 bg-muted rounded-full h-2">
                            <div
                              className="bg-primary h-2 rounded-full"
                              style={{ width: `${template.success_rate}%` }}
                            />
                          </div>
                          <span className="text-foreground text-sm">
                            {template.success_rate}%
                          </span>
                        </div>
                      </td>
                      <td className="py-3 px-4 text-muted-foreground">
                        {template.avg_score}
                      </td>
                      <td className="py-3 px-4 text-muted-foreground">
                        {template.time_to_hire} days
                      </td>
                      <td className="py-3 px-4">
                        <span
                          className={`px-2 py-1 rounded-full text-xs font-medium ${
                            template.success_rate >= 80
                              ? "bg-green-500/10 text-green-500"
                              : template.success_rate >= 70
                                ? "bg-yellow-500/10 text-yellow-500"
                                : "bg-red-500/10 text-red-500"
                          }`}
                        >
                          {template.success_rate >= 80
                            ? "Use This"
                            : template.success_rate >= 70
                              ? "Consider"
                              : "Needs Improvement"}
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
              <h3 className="text-lg font-semibold text-foreground mb-4">
                Feature Impact on Success
              </h3>
              <div className="h-64">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={templateFeatureImpact} layout="horizontal">
                    <CartesianGrid
                      strokeDasharray="3 3"
                      stroke="hsl(var(--border))"
                    />
                    <XAxis
                      type="number"
                      stroke="hsl(var(--muted-foreground))"
                      fontSize={12}
                    />
                    <YAxis
                      dataKey="feature"
                      type="category"
                      stroke="hsl(var(--muted-foreground))"
                      fontSize={10}
                      width={120}
                    />
                    <Tooltip
                      contentStyle={{
                        backgroundColor: "hsl(var(--card))",
                        border: "1px solid hsl(var(--border))",
                        borderRadius: "8px",
                      }}
                    />
                    <Bar
                      dataKey="impact_score"
                      fill="hsl(var(--primary))"
                      name="Impact Score"
                    />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </div>

            <div className="bg-card border border-border rounded-xl p-6">
              <h3 className="text-lg font-semibold text-foreground mb-4">
                Template Recommendations
              </h3>
              <div className="space-y-4">
                <div className="p-4 bg-green-500/10 border border-green-500/20 rounded-lg">
                  <div className="flex items-start space-x-3">
                    <div className="w-2 h-2 bg-green-500 rounded-full mt-2" />
                    <div>
                      <div className="font-medium text-green-700 mb-1">
                        High-Performing Features
                      </div>
                      <div className="text-sm text-green-600">
                        Code Review (94% impact) and Technical Assessment (92%
                        impact) show excellent results. Continue using these
                        components.
                      </div>
                    </div>
                  </div>
                </div>
                <div className="p-4 bg-yellow-500/10 border border-yellow-500/20 rounded-lg">
                  <div className="flex items-start space-x-3">
                    <div className="w-2 h-2 bg-yellow-500 rounded-full mt-2" />
                    <div>
                      <div className="font-medium text-yellow-700 mb-1">
                        Optimization Opportunity
                      </div>
                      <div className="text-sm text-yellow-600">
                        Portfolio Review has high impact (91%) but low usage
                        (67%). Consider making it mandatory for design roles.
                      </div>
                    </div>
                  </div>
                </div>
                <div className="p-4 bg-blue-500/10 border border-blue-500/20 rounded-lg">
                  <div className="flex items-start space-x-3">
                    <div className="w-2 h-2 bg-blue-500 rounded-full mt-2" />
                    <div>
                      <div className="font-medium text-blue-700 mb-1">
                        Template Versioning Insight
                      </div>
                      <div className="text-sm text-blue-600">
                        V2 templates consistently outperform V1 by 15-20% in
                        success rates. Migrate remaining roles to V2 format.
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Individual Interviewer Detail Report */}
      {activeTab === "interviewer" &&
        showInterviewerDetail &&
        selectedInterviewer && (
          <div className="space-y-6">
            {/* Report Header */}
            <div className="bg-card border border-border rounded-xl p-6">
              <div className="flex items-center space-x-4">
                <div className="w-12 h-12 bg-gradient-to-br from-purple-500 to-violet-600 rounded-xl flex items-center justify-center shadow-lg">
                  <span className="text-xl font-bold text-white">Σ</span>
                </div>
                <div>
                  <h1 className="text-2xl font-bold text-foreground">
                    Think_Int_2
                  </h1>
                  <p className="text-sm text-muted-foreground">
                    Individual Interviewer Report
                  </p>
                </div>
              </div>
            </div>
            {/* Header */}
            <div className="bg-card border border-border rounded-xl p-6">
              <div className="flex items-center justify-between mb-6">
                <button
                  onClick={() => setShowInterviewerDetail(false)}
                  className="text-primary hover:text-primary/80 transition-colors flex items-center space-x-2"
                >
                  <span>←</span>
                  <span>Back to Interviewer List</span>
                </button>
              </div>

              {/* Interviewer Info */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
                <div className="flex items-center space-x-4">
                  <div className="w-16 h-16 bg-gradient-to-br from-purple-500 to-pink-500 rounded-xl flex items-center justify-center">
                    <span className="text-white text-xl font-bold">
                      {selectedInterviewer.name
                        .split(" ")
                        .map((n: string) => n[0])
                        .join("")}
                    </span>
                  </div>
                  <div>
                    <h2 className="text-xl font-bold text-foreground">
                      {selectedInterviewer.name}
                    </h2>
                    <p className="text-sm text-muted-foreground">
                      Senior Technical Interviewer
                    </p>
                  </div>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground mb-1">
                    Performance Metrics
                  </p>
                  <p className="font-semibold text-foreground">
                    Avg Score: {selectedInterviewer.avg_score}
                  </p>
                  <p className="text-sm text-muted-foreground">
                    Consistency: {selectedInterviewer.consistency}%
                  </p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground mb-1">Activity</p>
                  <p className="font-semibold text-foreground">
                    {selectedInterviewer.interviews} Interviews
                  </p>
                  <p className="text-sm text-muted-foreground">
                    Rating: {selectedInterviewer.candidate_feedback}/5.0
                  </p>
                </div>
              </div>
            </div>

            {/* Comprehensive Analysis */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Interview Quality Metrics */}
              <div className="bg-card border border-border rounded-xl p-6">
                <h3 className="text-lg font-semibold text-foreground mb-4">
                  Interview Quality Assessment
                </h3>
                <div className="space-y-4">
                  {[
                    {
                      metric: "Question Depth",
                      score: 88,
                      feedback: "Asks insightful follow-up questions",
                    },
                    {
                      metric: "Time Management",
                      score: 75,
                      feedback: "Sometimes runs over allocated time",
                    },
                    {
                      metric: "Technical Assessment",
                      score: 85,
                      feedback: "Good at evaluating technical skills",
                    },
                    {
                      metric: "Bias Mitigation",
                      score: 78,
                      feedback: "Room for improvement in unconscious bias",
                    },
                  ].map((item, index) => (
                    <div key={index} className="p-3 bg-muted rounded-lg">
                      <div className="flex items-center justify-between mb-2">
                        <span className="font-medium text-foreground">
                          {item.metric}
                        </span>
                        <span className="text-sm font-bold text-primary">
                          {item.score}%
                        </span>
                      </div>
                      <div className="bg-background rounded-full h-2 mb-2">
                        <div
                          className="bg-primary h-2 rounded-full"
                          style={{ width: `${item.score}%` }}
                        />
                      </div>
                      <p className="text-xs text-muted-foreground">
                        {item.feedback}
                      </p>
                    </div>
                  ))}
                </div>
              </div>

              {/* Missed Competencies */}
              <div className="bg-card border border-border rounded-xl p-6">
                <h3 className="text-lg font-semibold text-foreground mb-4">
                  Missed Competencies (%)
                </h3>
                <div className="space-y-4">
                  <div className="p-4 bg-red-500/10 border border-red-500/20 rounded-lg">
                    <h4 className="font-medium text-red-700 mb-2">
                      Not Discussed (23%)
                    </h4>
                    <ul className="text-sm text-red-600 space-y-1">
                      <li>• Cultural fit assessment (completely missed)</li>
                      <li>• Leadership potential (briefly mentioned)</li>
                      <li>• Conflict resolution scenarios (not addressed)</li>
                    </ul>
                  </div>
                  <div className="p-4 bg-yellow-500/10 border border-yellow-500/20 rounded-lg">
                    <h4 className="font-medium text-yellow-700 mb-2">
                      Partially Evaluated (15%)
                    </h4>
                    <ul className="text-sm text-yellow-600 space-y-1">
                      <li>• Team collaboration (surface level)</li>
                      <li>��� Innovation thinking (insufficient depth)</li>
                    </ul>
                  </div>
                  <div className="p-4 bg-green-500/10 border border-green-500/20 rounded-lg">
                    <h4 className="font-medium text-green-700 mb-2">
                      Well Covered (62%)
                    </h4>
                    <p className="text-sm text-green-600">
                      Technical skills, communication, and problem-solving
                      thoroughly evaluated
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Enhanced Behavioral Analysis */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Behavioral Tag Trends */}
              <div className="bg-card border border-border rounded-xl p-6">
                <h3 className="text-lg font-semibold text-foreground mb-4">
                  Behavioral Tag Trends
                </h3>
                <p className="text-sm text-muted-foreground mb-4">
                  How interviewer responds to different candidate types
                </p>
                <div className="space-y-3">
                  {[
                    {
                      behavior: "With Confident Candidates",
                      trend: "More challenging questions (+25%)",
                      color: "blue",
                    },
                    {
                      behavior: "With Nervous Candidates",
                      trend: "Extra encouragement and breaks",
                      color: "green",
                    },
                    {
                      behavior: "Technical Discussions",
                      trend: "Deep dives, sometimes too long",
                      color: "purple",
                    },
                    {
                      behavior: "Cultural Fit Questions",
                      trend: "Often skipped (35% of time)",
                      color: "red",
                    },
                  ].map((item, index) => (
                    <div key={index} className="p-3 bg-muted rounded-lg">
                      <div className="flex items-center justify-between">
                        <span className="font-medium text-foreground text-sm">
                          {item.behavior}
                        </span>
                        <span
                          className={`text-xs px-2 py-1 rounded-full bg-${item.color}-500/10 text-${item.color}-600`}
                        >
                          {item.trend}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Session Integrity Handling */}
              <div className="bg-card border border-border rounded-xl p-6">
                <h3 className="text-lg font-semibold text-foreground mb-4">
                  Session Integrity Handling
                </h3>
                <div className="space-y-4">
                  <div className="grid grid-cols-2 gap-4 text-center">
                    <div className="p-3 bg-muted rounded-lg">
                      <p className="text-2xl font-bold text-red-600">12</p>
                      <p className="text-xs text-muted-foreground">
                        Sessions Flagged
                      </p>
                    </div>
                    <div className="p-3 bg-muted rounded-lg">
                      <p className="text-2xl font-bold text-green-600">8</p>
                      <p className="text-xs text-muted-foreground">
                        Properly Handled
                      </p>
                    </div>
                  </div>
                  <div className="space-y-2">
                    <div className="p-3 bg-green-500/10 border border-green-500/20 rounded">
                      <p className="text-sm font-medium text-green-700">
                        Good Responses:
                      </p>
                      <p className="text-xs text-green-600">
                        • Paused interview to address technical issues
                      </p>
                      <p className="text-xs text-green-600">
                        • Documented integrity concerns properly
                      </p>
                    </div>
                    <div className="p-3 bg-red-500/10 border border-red-500/20 rounded">
                      <p className="text-sm font-medium text-red-700">
                        Missed Issues:
                      </p>
                      <p className="text-xs text-red-600">
                        • 4 cases of obvious tab switching ignored
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Bias Detection and Follow-up Quality */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Bias Detection */}
              <div className="bg-card border border-border rounded-xl p-6">
                <h3 className="text-lg font-semibold text-foreground mb-4">
                  Bias Detection (AI vs Human Delta)
                </h3>
                <div className="space-y-4">
                  <div className="p-4 bg-yellow-500/10 border border-yellow-500/20 rounded-lg">
                    <h4 className="font-medium text-yellow-700 mb-2">
                      Significant Score Gaps
                    </h4>
                    <div className="space-y-2 text-sm">
                      <div className="flex justify-between">
                        <span>Female Candidates:</span>
                        <span className="text-red-600">-12 points vs AI</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Non-native Speakers:</span>
                        <span className="text-red-600">-8 points vs AI</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Junior Experience:</span>
                        <span className="text-green-600">+6 points vs AI</span>
                      </div>
                    </div>
                  </div>
                  <div className="p-3 bg-blue-500/10 border border-blue-500/20 rounded">
                    <p className="text-sm text-blue-700">
                      <strong>Pattern:</strong> Tends to be harder on
                      communication skills, more lenient on technical depth for
                      junior candidates
                    </p>
                  </div>
                </div>
              </div>

              {/* Follow-up Quality */}
              <div className="bg-card border border-border rounded-xl p-6">
                <h3 className="text-lg font-semibold text-foreground mb-4">
                  Follow-up Quality
                </h3>
                <div className="space-y-4">
                  <div className="grid grid-cols-2 gap-4 text-center">
                    <div className="p-3 bg-muted rounded-lg">
                      <p className="text-2xl font-bold text-primary">73%</p>
                      <p className="text-xs text-muted-foreground">
                        Questions with Follow-ups
                      </p>
                    </div>
                    <div className="p-3 bg-muted rounded-lg">
                      <p className="text-2xl font-bold text-green-600">4.2</p>
                      <p className="text-xs text-muted-foreground">
                        Avg Quality Score
                      </p>
                    </div>
                  </div>
                  <div className="space-y-2">
                    <div className="p-3 bg-green-500/10 border border-green-500/20 rounded">
                      <p className="text-sm font-medium text-green-700">
                        Strong Areas:
                      </p>
                      <p className="text-xs text-green-600">
                        • Technical depth probing (92%)
                      </p>
                      <p className="text-xs text-green-600">
                        • Problem-solving clarification (87%)
                      </p>
                    </div>
                    <div className="p-3 bg-yellow-500/10 border border-yellow-500/20 rounded">
                      <p className="text-sm font-medium text-yellow-700">
                        Improvement Needed:
                      </p>
                      <p className="text-xs text-yellow-600">
                        • Behavioral question follow-ups (45%)
                      </p>
                      <p className="text-xs text-yellow-600">
                        • Cultural fit exploration (38%)
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Recent Interviews */}
            <div className="bg-card border border-border rounded-xl p-6">
              <h3 className="text-lg font-semibold text-foreground mb-4">
                Recent Interview History
              </h3>
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b border-border">
                      <th className="text-left py-2 px-3 font-medium text-foreground text-sm">
                        Date
                      </th>
                      <th className="text-left py-2 px-3 font-medium text-foreground text-sm">
                        Candidate
                      </th>
                      <th className="text-left py-2 px-3 font-medium text-foreground text-sm">
                        Role
                      </th>
                      <th className="text-left py-2 px-3 font-medium text-foreground text-sm">
                        Duration
                      </th>
                      <th className="text-left py-2 px-3 font-medium text-foreground text-sm">
                        Score Given
                      </th>
                      <th className="text-left py-2 px-3 font-medium text-foreground text-sm">
                        AI Score
                      </th>
                      <th className="text-left py-2 px-3 font-medium text-foreground text-sm">
                        Bias Delta
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {[
                      {
                        date: "01/08/2025",
                        candidate: "Ajit Sharma",
                        role: "Sr. PM",
                        duration: "1h",
                        interviewer_score: 92,
                        ai_score: 95,
                        delta: -3,
                      },
                      {
                        date: "30/07/2025",
                        candidate: "Sarah Wilson",
                        role: "Developer",
                        duration: "45m",
                        interviewer_score: 88,
                        ai_score: 86,
                        delta: +2,
                      },
                      {
                        date: "29/07/2025",
                        candidate: "Mike Chen",
                        role: "Designer",
                        duration: "1h 15m",
                        interviewer_score: 91,
                        ai_score: 89,
                        delta: +2,
                      },
                    ].map((interview, index) => (
                      <tr
                        key={index}
                        className="border-b border-border hover:bg-muted/50"
                      >
                        <td className="py-2 px-3 text-sm text-muted-foreground">
                          {interview.date}
                        </td>
                        <td className="py-2 px-3 text-sm text-foreground">
                          {interview.candidate}
                        </td>
                        <td className="py-2 px-3 text-sm text-muted-foreground">
                          {interview.role}
                        </td>
                        <td className="py-2 px-3 text-sm text-muted-foreground">
                          {interview.duration}
                        </td>
                        <td className="py-2 px-3 text-sm font-medium text-blue-600">
                          {interview.interviewer_score}
                        </td>
                        <td className="py-2 px-3 text-sm font-medium text-purple-600">
                          {interview.ai_score}
                        </td>
                        <td
                          className="py-2 px-3 text-sm font-medium ${
                        interview.delta > 0 ? 'text-green-600' : interview.delta < 0 ? 'text-red-600' : 'text-gray-600'
                      }"
                        >
                          {interview.delta > 0 ? "+" : ""}
                          {interview.delta}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            {/* Actionable Recommendations */}
            <div className="bg-card border border-border rounded-xl p-6">
              <h3 className="text-lg font-semibold text-foreground mb-4">
                Actionable Insights & Recommendations
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-3">
                  <h4 className="font-medium text-foreground">
                    Strengths to Leverage
                  </h4>
                  <div className="p-3 bg-green-500/10 border border-green-500/20 rounded-lg">
                    <p className="text-sm text-green-700">
                      • Excellent at building rapport with candidates
                    </p>
                    <p className="text-sm text-green-700">
                      • Strong technical assessment capabilities
                    </p>
                    <p className="text-sm text-green-700">
                      • Consistent scoring patterns
                    </p>
                  </div>
                </div>
                <div className="space-y-3">
                  <h4 className="font-medium text-foreground">
                    Development Areas
                  </h4>
                  <div className="p-3 bg-yellow-500/10 border border-yellow-500/20 rounded-lg">
                    <p className="text-sm text-yellow-700">
                      • Time management during interviews
                    </p>
                    <p className="text-sm text-yellow-700">
                      • Cultural fit assessment techniques
                    </p>
                    <p className="text-sm text-yellow-700">
                      • Unconscious bias awareness
                    </p>
                  </div>
                </div>
              </div>
              <div className="mt-4 p-4 bg-blue-500/10 border border-blue-500/20 rounded-lg">
                <h4 className="font-medium text-blue-700 mb-2">
                  Recommended Training
                </h4>
                <p className="text-sm text-blue-600">
                  Consider enrolling in the "Advanced Interview Techniques"
                  workshop focusing on time management and structured behavioral
                  assessments.
                </p>
              </div>
            </div>
          </div>
        )}

      {/* Interviewer Report Tab - Main List */}
      {activeTab === "interviewer" && !showInterviewerDetail && (
        <div className="space-y-8">
          {/* Interviewer Performance Overview */}
          <div className="bg-card border border-border rounded-xl p-6">
            <h3 className="text-lg font-semibold text-foreground mb-4">
              Interviewer Report - Performance & Evaluation
            </h3>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-border">
                    <th className="text-left py-3 px-4 font-medium text-foreground">
                      Interviewer
                    </th>
                    <th className="text-left py-3 px-4 font-medium text-foreground">
                      Interviews
                    </th>
                    <th className="text-left py-3 px-4 font-medium text-foreground">
                      Avg Score
                    </th>
                    <th className="text-left py-3 px-4 font-medium text-foreground">
                      Consistency
                    </th>
                    <th className="text-left py-3 px-4 font-medium text-foreground">
                      Feedback
                    </th>
                    <th className="text-left py-3 px-4 font-medium text-foreground">
                      Improvement Areas
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {interviewerMetrics.map((interviewer, index) => (
                    <tr
                      key={index}
                      className="border-b border-border hover:bg-muted/50 cursor-pointer"
                      onClick={() => {
                        setSelectedInterviewer(interviewer);
                        setShowInterviewerDetail(true);
                      }}
                    >
                      <td className="py-3 px-4">
                        <div className="flex items-center space-x-3">
                          <div className="w-8 h-8 bg-gradient-to-br from-purple-500 to-pink-500 rounded-lg flex items-center justify-center">
                            <span className="text-white text-xs font-semibold">
                              {interviewer.name
                                .split(" ")
                                .map((n) => n[0])
                                .join("")}
                            </span>
                          </div>
                          <span className="font-medium text-foreground">
                            {interviewer.name}
                          </span>
                        </div>
                      </td>
                      <td className="py-3 px-4 text-muted-foreground">
                        {interviewer.interviews}
                      </td>
                      <td className="py-3 px-4">
                        <div className="flex items-center space-x-2">
                          <div className="w-12 bg-muted rounded-full h-2">
                            <div
                              className="bg-primary h-2 rounded-full"
                              style={{ width: `${interviewer.avg_score}%` }}
                            />
                          </div>
                          <span className="text-foreground text-sm">
                            {interviewer.avg_score}
                          </span>
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
                          <span className="text-foreground text-sm">
                            {interviewer.consistency}%
                          </span>
                        </div>
                      </td>
                      <td className="py-3 px-4">
                        <div className="flex items-center space-x-1">
                          <span className="text-foreground text-sm">
                            {interviewer.candidate_feedback}
                          </span>
                          <div className="flex">
                            {Array.from({ length: 5 }, (_, i) => (
                              <span
                                key={i}
                                className={`text-xs ${
                                  i < Math.floor(interviewer.candidate_feedback)
                                    ? "text-yellow-500"
                                    : "text-muted"
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
                          {interviewer.improvement_areas.map(
                            (area, areaIndex) => (
                              <span
                                key={areaIndex}
                                className="px-2 py-1 bg-yellow-500/10 text-yellow-700 text-xs rounded-full"
                              >
                                {area}
                              </span>
                            ),
                          )}
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
              <h3 className="text-lg font-semibold text-foreground mb-4">
                Interview Skills Analysis
              </h3>
              <div className="space-y-4">
                {interviewerSkillAnalysis.map((skill, index) => (
                  <div key={index} className="p-4 bg-muted rounded-lg">
                    <div className="flex items-center justify-between mb-2">
                      <span className="font-medium text-foreground">
                        {skill.skill}
                      </span>
                      <span className="text-sm text-muted-foreground">
                        Avg: {skill.avg_score}%
                      </span>
                    </div>
                    <div className="bg-background rounded-full h-2 mb-2">
                      <div
                        className="bg-primary h-2 rounded-full"
                        style={{ width: `${skill.avg_score}%` }}
                      />
                    </div>
                    <div className="flex items-center justify-between text-xs">
                      <span className="text-green-600">
                        Top: {skill.top_performer}
                      </span>
                      <span className="text-red-600">
                        {skill.improvement_needed} need training
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="bg-card border border-border rounded-xl p-6">
              <h3 className="text-lg font-semibold text-foreground mb-4">
                Training Recommendations
              </h3>
              <div className="space-y-4">
                <div className="p-4 bg-red-500/10 border border-red-500/20 rounded-lg">
                  <div className="flex items-start space-x-3">
                    <div className="w-2 h-2 bg-red-500 rounded-full mt-2" />
                    <div>
                      <div className="font-medium text-red-700 mb-1">
                        Priority Training Needed
                      </div>
                      <div className="text-sm text-red-600">
                        6 interviewers need bias mitigation training. Schedule
                        unconscious bias workshops.
                      </div>
                    </div>
                  </div>
                </div>
                <div className="p-4 bg-yellow-500/10 border border-yellow-500/20 rounded-lg">
                  <div className="flex items-start space-x-3">
                    <div className="w-2 h-2 bg-yellow-500 rounded-full mt-2" />
                    <div>
                      <div className="font-medium text-yellow-700 mb-1">
                        Time Management Issues
                      </div>
                      <div className="text-sm text-yellow-600">
                        5 interviewers struggle with time management. Provide
                        interview structure templates.
                      </div>
                    </div>
                  </div>
                </div>
                <div className="p-4 bg-green-500/10 border border-green-500/20 rounded-lg">
                  <div className="flex items-start space-x-3">
                    <div className="w-2 h-2 bg-green-500 rounded-full mt-2" />
                    <div>
                      <div className="font-medium text-green-700 mb-1">
                        High Performers
                      </div>
                      <div className="text-sm text-green-600">
                        Lisa Brown and Emily Davis show excellent performance.
                        Consider them as mentors for training programs.
                      </div>
                    </div>
                  </div>
                </div>
                <div className="p-4 bg-blue-500/10 border border-blue-500/20 rounded-lg">
                  <div className="flex items-start space-x-3">
                    <div className="w-2 h-2 bg-blue-500 rounded-full mt-2" />
                    <div>
                      <div className="font-medium text-blue-700 mb-1">
                        Technical Assessment
                      </div>
                      <div className="text-sm text-blue-600">
                        4 interviewers need technical assessment training.
                        Organize domain-specific workshops.
                      </div>
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
