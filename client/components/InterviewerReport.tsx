import { useState } from 'react';
import { Search, Star, TrendingUp, Award, Users, Eye } from 'lucide-react';
import { Link } from 'react-router-dom';

const interviewerMetrics = [
  {
    name: "John Smith",
    interviews: 234,
    avg_score: 82,
    consistency: 94,
    candidate_feedback: 4.7,
    improvement_areas: ["Time Management", "Technical Depth"],
    recentInterviews: [
      { candidate: "Sarah Johnson", role: "Senior Engineer", score: 85, date: "2024-12-15" },
      { candidate: "Mike Chen", role: "Product Manager", score: 92, date: "2024-12-14" },
      { candidate: "Anna Rodriguez", role: "Designer", score: 78, date: "2024-12-13" }
    ]
  },
  {
    name: "Emily Davis",
    interviews: 187,
    avg_score: 89,
    consistency: 91,
    candidate_feedback: 4.8,
    improvement_areas: ["Cultural Assessment"],
    recentInterviews: [
      { candidate: "David Kim", role: "Data Scientist", score: 91, date: "2024-12-15" },
      { candidate: "Lisa Wang", role: "Frontend Dev", score: 87, date: "2024-12-14" }
    ]
  },
  {
    name: "Alex Wilson",
    interviews: 156,
    avg_score: 85,
    consistency: 88,
    candidate_feedback: 4.6,
    improvement_areas: ["Technical Questions", "Follow-up"],
    recentInterviews: [
      { candidate: "James Brown", role: "DevOps Engineer", score: 82, date: "2024-12-15" },
      { candidate: "Maria Garcia", role: "QA Engineer", score: 89, date: "2024-12-13" }
    ]
  },
  {
    name: "Lisa Brown",
    interviews: 203,
    avg_score: 91,
    consistency: 96,
    candidate_feedback: 4.9,
    improvement_areas: [],
    recentInterviews: [
      { candidate: "Tom Wilson", role: "Tech Lead", score: 94, date: "2024-12-15" },
      { candidate: "Nina Patel", role: "Mobile Dev", score: 88, date: "2024-12-14" }
    ]
  }
];

interface InterviewerReportProps {
  onInterviewerSelect: (interviewer: any) => void;
}

export default function InterviewerReport({ onInterviewerSelect }: InterviewerReportProps) {
  const [searchTerm, setSearchTerm] = useState("");
  const [sortBy, setSortBy] = useState("name");
  const [viewMode, setViewMode] = useState<"card" | "list">("card");
  const [topRecruiterRoleFilter, setTopRecruiterRoleFilter] = useState("all");
  const [roleFilter, setRoleFilter] = useState("all");
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 6;

  // Filter and sort interviewers
  const getFilteredInterviewers = () => {
    let filtered = interviewerMetrics.filter(
      (interviewer) =>
        interviewer.name
          .toLowerCase()
          .includes(searchTerm.toLowerCase()) &&
        (roleFilter === "all" || interviewer.name.toLowerCase().includes(roleFilter.toLowerCase()))
    );

    filtered.sort((a, b) => {
      switch (sortBy) {
        case "score":
          return b.avg_score - a.avg_score;
        case "interviews":
          return b.interviews - a.interviews;
        case "consistency":
          return b.consistency - a.consistency;
        default:
          return a.name.localeCompare(b.name);
      }
    });

    return filtered;
  };

  const filteredInterviewers = getFilteredInterviewers();
  const totalPages = Math.ceil(filteredInterviewers.length / itemsPerPage);
  const paginatedInterviewers = filteredInterviewers.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  return (
    <div className="space-y-8">
      {/* Search and Controls */}
      <div className="bg-card border border-border rounded-xl p-6">
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4 mb-6">
          <div>
            <h3 className="text-lg font-semibold text-foreground">Interviewer Report</h3>
            <p className="text-sm text-muted-foreground">Performance & Evaluation Analytics</p>
          </div>
          <div className="flex flex-col sm:flex-row gap-3">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
              <input
                type="text"
                placeholder="Search interviewers..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 pr-4 py-2 bg-background border border-border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-primary w-64"
              />
            </div>
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="px-3 py-2 bg-background border border-border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-primary"
            >
              <option value="name">Sort by Name</option>
              <option value="score">Sort by Avg Score</option>
              <option value="interviews">Sort by Interviews</option>
              <option value="consistency">Sort by Consistency</option>
            </select>
            <select
              value={roleFilter}
              onChange={(e) => setRoleFilter(e.target.value)}
              className="px-3 py-2 bg-background border border-border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-primary"
            >
              <option value="all">All Roles</option>
              <option value="data-analyst">Data Analyst</option>
              <option value="software-developer">Software Developer</option>
              <option value="senior-manager">Senior Manager</option>
              <option value="product-manager">Product Manager</option>
              <option value="designer">Designer</option>
              <option value="qa-engineer">QA Engineer</option>
            </select>
            <div className="flex border border-border rounded-lg">
              <button
                onClick={() => setViewMode('card')}
                className={`px-3 py-2 text-sm ${viewMode === 'card' ? 'bg-primary text-primary-foreground' : 'text-muted-foreground hover:text-foreground'}`}
              >
                Cards
              </button>
              <button
                onClick={() => setViewMode('list')}
                className={`px-3 py-2 text-sm border-l border-border ${viewMode === 'list' ? 'bg-primary text-primary-foreground' : 'text-muted-foreground hover:text-foreground'}`}
              >
                List
              </button>
            </div>
          </div>
        </div>

        {/* Top Recruiters - Hires by Role */}
        <div className="mb-6">
          <div className="flex items-center justify-between mb-3">
            <h4 className="text-md font-semibold text-foreground">🏆 Top Recruiters - Hires</h4>
            <select
              value={topRecruiterRoleFilter}
              onChange={(e) => setTopRecruiterRoleFilter(e.target.value)}
              className="px-3 py-2 bg-background border border-border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-primary"
            >
              <option value="all">All Roles</option>
              <option value="data-analyst">Data Analyst</option>
              <option value="software-developer">Software Developer</option>
              <option value="senior-manager">Senior Manager</option>
              <option value="product-manager">Product Manager</option>
              <option value="designer">Designer</option>
              <option value="qa-engineer">QA Engineer</option>
            </select>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {filteredInterviewers.slice(0, 3).map((interviewer, index) => (
              <div key={index} className="flex items-center space-x-3 p-3 bg-muted rounded-lg">
                <div className={`w-8 h-8 rounded-lg flex items-center justify-center text-white text-xs font-bold ${
                  index === 0 ? 'bg-yellow-500' : index === 1 ? 'bg-gray-400' : 'bg-orange-500'
                }`}>
                  {index + 1}
                </div>
                <div>
                  <p className="font-medium text-foreground">{interviewer.name}</p>
                  <p className="text-xs text-muted-foreground">
                    {topRecruiterRoleFilter === 'all' ? 'All Roles' : topRecruiterRoleFilter.replace('-', ' ')} - {interviewer.avg_score}% avg score
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Performance Trend Chart */}
      <div className="bg-card border border-border rounded-xl p-6">
        <h3 className="text-lg font-semibold text-foreground mb-4">Performance Trend Over Time</h3>
        <div className="h-64 bg-muted rounded-lg flex items-center justify-center">
          <div className="text-center">
            <TrendingUp className="w-12 h-12 text-muted-foreground mx-auto mb-2" />
            <p className="text-muted-foreground">Performance trend chart would display here</p>
          </div>
        </div>
      </div>

      {/* Interviewer List/Cards */}
      <div className="bg-card border border-border rounded-xl p-6">
        <h3 className="text-lg font-semibold text-foreground mb-4">All Interviewers</h3>
        
        {viewMode === 'card' ? (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {paginatedInterviewers.map((interviewer, index) => (
              <div key={index} className="bg-muted rounded-xl p-6 hover:shadow-lg transition-all cursor-pointer" onClick={() => onInterviewerSelect(interviewer)}>
                <div className="flex items-start justify-between mb-4">
                  <div className="flex items-center space-x-3">
                    <div className="w-12 h-12 bg-gradient-to-br from-purple-500 to-pink-500 rounded-lg flex items-center justify-center">
                      <span className="text-white text-sm font-bold">
                        {interviewer.name.split(" ").map((n) => n[0]).join("")}
                      </span>
                    </div>
                    <div>
                      <h4 className="font-semibold text-foreground">{interviewer.name}</h4>
                      <p className="text-sm text-muted-foreground">{interviewer.interviews} interviews</p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-1">
                    <Star className="w-4 h-4 text-yellow-500 fill-current" />
                    <span className="text-sm font-medium">{interviewer.candidate_feedback}</span>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4 mb-4">
                  <div>
                    <p className="text-xs text-muted-foreground">Avg Score</p>
                    <div className="flex items-center space-x-2">
                      <div className="w-16 bg-background rounded-full h-2">
                        <div className="bg-primary h-2 rounded-full" style={{ width: `${interviewer.avg_score}%` }} />
                      </div>
                      <span className="text-sm font-medium">{interviewer.avg_score}%</span>
                    </div>
                  </div>
                  <div>
                    <p className="text-xs text-muted-foreground">Consistency</p>
                    <div className="flex items-center space-x-2">
                      <div className="w-16 bg-background rounded-full h-2">
                        <div className="bg-green-500 h-2 rounded-full" style={{ width: `${interviewer.consistency}%` }} />
                      </div>
                      <span className="text-sm font-medium">{interviewer.consistency}%</span>
                    </div>
                  </div>
                </div>

                {/* Recent Interview History with Clickable Links */}
                <div className="mb-4">
                  <p className="text-sm font-medium text-foreground mb-2">Recent Interview History</p>
                  <div className="space-y-2">
                    {interviewer.recentInterviews.slice(0, 2).map((interview, idx) => (
                      <div key={idx} className="flex items-center justify-between p-2 bg-background rounded-lg">
                        <div>
                          <p className="text-xs font-medium text-foreground">{interview.candidate}</p>
                          <p className="text-xs text-muted-foreground">{interview.role}</p>
                        </div>
                        <div className="flex items-center space-x-2">
                          <span className={`text-xs px-2 py-1 rounded-full ${
                            interview.score >= 85 ? 'bg-green-500/10 text-green-600' :
                            interview.score >= 70 ? 'bg-blue-500/10 text-blue-600' : 'bg-red-500/10 text-red-600'
                          }`}>
                            {interview.score}%
                          </span>
                          <Link
                            to={`/candidate/${interview.candidate.toLowerCase().replace(' ', '-')}`}
                            className="px-2 py-1 bg-primary text-primary-foreground rounded text-xs hover:bg-primary/90 transition-colors"
                          >
                            View Report
                          </Link>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {interviewer.improvement_areas.length > 0 && (
                  <div>
                    <p className="text-xs text-muted-foreground mb-2">Improvement Areas</p>
                    <div className="flex flex-wrap gap-1">
                      {interviewer.improvement_areas.map((area, areaIndex) => (
                        <span key={areaIndex} className="px-2 py-1 bg-yellow-500/10 text-yellow-700 text-xs rounded-full">
                          {area}
                        </span>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-border">
                  <th className="text-left py-3 px-4 font-medium text-foreground">Interviewer</th>
                  <th className="text-left py-3 px-4 font-medium text-foreground">Interviews</th>
                  <th className="text-left py-3 px-4 font-medium text-foreground">Avg Score</th>
                  <th className="text-left py-3 px-4 font-medium text-foreground">Consistency</th>
                  <th className="text-left py-3 px-4 font-medium text-foreground">Rating</th>
                  <th className="text-left py-3 px-4 font-medium text-foreground">Recent Interviews</th>
                </tr>
              </thead>
              <tbody>
                {paginatedInterviewers.map((interviewer, index) => (
                  <tr key={index} className="border-b border-border hover:bg-muted/50 cursor-pointer" onClick={() => onInterviewerSelect(interviewer)}>
                    <td className="py-3 px-4">
                      <div className="flex items-center space-x-3">
                        <div className="w-8 h-8 bg-gradient-to-br from-purple-500 to-pink-500 rounded-lg flex items-center justify-center">
                          <span className="text-white text-xs font-semibold">
                            {interviewer.name.split(" ").map((n) => n[0]).join("")}
                          </span>
                        </div>
                        <span className="font-medium text-foreground">{interviewer.name}</span>
                      </div>
                    </td>
                    <td className="py-3 px-4 text-muted-foreground">{interviewer.interviews}</td>
                    <td className="py-3 px-4">
                      <div className="flex items-center space-x-2">
                        <div className="w-12 bg-muted rounded-full h-2">
                          <div className="bg-primary h-2 rounded-full" style={{ width: `${interviewer.avg_score}%` }} />
                        </div>
                        <span className="text-foreground text-sm">{interviewer.avg_score}%</span>
                      </div>
                    </td>
                    <td className="py-3 px-4">
                      <div className="flex items-center space-x-2">
                        <div className="w-12 bg-muted rounded-full h-2">
                          <div className="bg-green-500 h-2 rounded-full" style={{ width: `${interviewer.consistency}%` }} />
                        </div>
                        <span className="text-foreground text-sm">{interviewer.consistency}%</span>
                      </div>
                    </td>
                    <td className="py-3 px-4">
                      <div className="flex items-center space-x-1">
                        <Star className="w-4 h-4 text-yellow-500 fill-current" />
                        <span className="text-foreground text-sm">{interviewer.candidate_feedback}</span>
                      </div>
                    </td>
                    <td className="py-3 px-4">
                      <div className="space-y-1">
                        {interviewer.recentInterviews.slice(0, 2).map((interview, idx) => (
                          <Link
                            key={idx}
                            to={`/candidate/${interview.candidate.toLowerCase().replace(' ', '-')}`}
                            className="flex items-center justify-between text-xs hover:text-primary"
                            onClick={(e) => e.stopPropagation()}
                          >
                            <span>{interview.candidate}</span>
                            <span className={`px-1 py-0.5 rounded ${
                              interview.score >= 85 ? 'bg-green-500/10 text-green-600' : 
                              interview.score >= 70 ? 'bg-blue-500/10 text-blue-600' : 'bg-red-500/10 text-red-600'
                            }`}>
                              {interview.score}%
                            </span>
                          </Link>
                        ))}
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}
