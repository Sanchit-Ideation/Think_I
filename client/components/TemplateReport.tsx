import { useState } from 'react';
import { Search, Filter, Calendar, Users, TrendingUp, Award, Target, Brain, BarChart3 } from 'lucide-react';

const templateData = [
  {
    id: 1,
    template: "Software Engineer V2",
    department: "Engineering",
    roleType: "Technical",
    version: "2.1",
    createdBy: "Alice Johnson",
    creationDate: "2024-01-15",
    candidates: 234,
    interviews: 198,
    hired: 67,
    adoptionRate: 85,
    avgCandidateScore: 84,
    avgIntegrityScore: 91,
    percentRecommended: 68,
    effectivenessScore: 87,
    success_rate: 75,
    avg_score: 84,
    time_to_hire: 12
  },
  {
    id: 2,
    template: "Product Manager V3",
    department: "Product",
    roleType: "Leadership",
    version: "3.0",
    createdBy: "Bob Smith",
    creationDate: "2024-02-20",
    candidates: 156,
    interviews: 134,
    hired: 45,
    adoptionRate: 92,
    avgCandidateScore: 86,
    avgIntegrityScore: 89,
    percentRecommended: 72,
    effectivenessScore: 89,
    success_rate: 78,
    avg_score: 86,
    time_to_hire: 15
  },
  {
    id: 3,
    template: "UX Designer V1",
    department: "Design",
    roleType: "Creative",
    version: "1.5",
    createdBy: "Carol White",
    creationDate: "2024-03-10",
    candidates: 89,
    interviews: 76,
    hired: 28,
    adoptionRate: 76,
    avgCandidateScore: 88,
    avgIntegrityScore: 94,
    percentRecommended: 78,
    effectivenessScore: 91,
    success_rate: 82,
    avg_score: 88,
    time_to_hire: 10
  },
  {
    id: 4,
    template: "Data Scientist V2",
    department: "Data",
    roleType: "Technical",
    version: "2.0",
    createdBy: "David Brown",
    creationDate: "2024-01-30",
    candidates: 123,
    interviews: 105,
    hired: 38,
    adoptionRate: 68,
    avgCandidateScore: 82,
    avgIntegrityScore: 87,
    percentRecommended: 65,
    effectivenessScore: 84,
    success_rate: 72,
    avg_score: 82,
    time_to_hire: 18
  }
];

interface TemplateReportProps {
  onTemplateSelect: (template: any) => void;
}

export default function TemplateReport({ onTemplateSelect }: TemplateReportProps) {
  const [searchTerm, setSearchTerm] = useState("");
  const [filterBy, setFilterBy] = useState("all");
  const [sortBy, setSortBy] = useState("name");
  const [viewMode, setViewMode] = useState<"card" | "list">("card");
  const [dateFilter, setDateFilter] = useState("all");
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 6;

  // Filter and sort templates
  const getFilteredTemplates = () => {
    let filtered = templateData.filter((template) => {
      const matchesSearch = template.template.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           template.department.toLowerCase().includes(searchTerm.toLowerCase());
      
      const matchesFilter = filterBy === "all" || template.department.toLowerCase() === filterBy.toLowerCase();
      
      const matchesDate = dateFilter === "all" || 
                         (dateFilter === "recent" && new Date(template.creationDate) > new Date('2024-02-01')) ||
                         (dateFilter === "older" && new Date(template.creationDate) <= new Date('2024-02-01'));
      
      return matchesSearch && matchesFilter && matchesDate;
    });

    filtered.sort((a, b) => {
      switch (sortBy) {
        case "effectiveness":
          return b.effectivenessScore - a.effectivenessScore;
        case "interviews":
          return b.interviews - a.interviews;
        case "date":
          return new Date(b.creationDate).getTime() - new Date(a.creationDate).getTime();
        case "alphabet":
          return a.template.localeCompare(b.template);
        default:
          return a.template.localeCompare(b.template);
      }
    });

    return filtered;
  };

  const filteredTemplates = getFilteredTemplates();
  const totalPages = Math.ceil(filteredTemplates.length / itemsPerPage);
  const paginatedTemplates = filteredTemplates.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  return (
    <div className="space-y-8">
      {/* Search and Controls */}
      <div className="bg-card border border-border rounded-xl p-6">
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4 mb-6">
          <div>
            <h3 className="text-lg font-semibold text-foreground">Template Report</h3>
            <p className="text-sm text-muted-foreground">Interview Template Performance & Analytics</p>
          </div>
          <div className="flex flex-col sm:flex-row gap-3">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
              <input
                type="text"
                placeholder="Search templates..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 pr-4 py-2 bg-background border border-border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-primary w-64"
              />
            </div>
            <select 
              value={filterBy}
              onChange={(e) => setFilterBy(e.target.value)}
              className="px-3 py-2 bg-background border border-border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-primary"
            >
              <option value="all">All Departments</option>
              <option value="engineering">Engineering</option>
              <option value="product">Product</option>
              <option value="design">Design</option>
              <option value="data">Data</option>
            </select>
            <select 
              value={dateFilter}
              onChange={(e) => setDateFilter(e.target.value)}
              className="px-3 py-2 bg-background border border-border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-primary"
            >
              <option value="all">All Dates</option>
              <option value="recent">Recent (2024+)</option>
              <option value="older">Older</option>
            </select>
            <select 
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="px-3 py-2 bg-background border border-border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-primary"
            >
              <option value="alphabet">Alphabetical Order</option>
              <option value="date">Sort by Creation Date</option>
              <option value="effectiveness">Sort by Effectiveness</option>
              <option value="interviews">Sort by Interviews</option>
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
      </div>

      {/* Template Performance Summary */}
      <div className="bg-card border border-border rounded-xl p-6">
        <h4 className="text-md font-semibold text-foreground mb-4">📊 Template Performance Summary</h4>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <div className="p-4 bg-muted rounded-lg text-center">
            <div className="text-2xl font-bold text-foreground">{filteredTemplates.length}</div>
            <div className="text-sm text-muted-foreground">Total Templates</div>
          </div>
          <div className="p-4 bg-muted rounded-lg text-center">
            <div className="text-2xl font-bold text-foreground">
              {Math.round(filteredTemplates.reduce((acc, t) => acc + t.effectivenessScore, 0) / filteredTemplates.length)}%
            </div>
            <div className="text-sm text-muted-foreground">Avg Effectiveness</div>
          </div>
          <div className="p-4 bg-muted rounded-lg text-center">
            <div className="text-2xl font-bold text-foreground">
              {filteredTemplates.reduce((acc, t) => acc + t.interviews, 0)}
            </div>
            <div className="text-sm text-muted-foreground">Total Interviews</div>
          </div>
          <div className="p-4 bg-muted rounded-lg text-center">
            <div className="text-2xl font-bold text-foreground">
              {Math.round(filteredTemplates.reduce((acc, t) => acc + t.adoptionRate, 0) / filteredTemplates.length)}%
            </div>
            <div className="text-sm text-muted-foreground">Avg Adoption Rate</div>
          </div>
        </div>
      </div>

      {/* Template List/Cards */}
      <div className="bg-card border border-border rounded-xl p-6">
        <h3 className="text-lg font-semibold text-foreground mb-4">All Templates</h3>
        
        {viewMode === 'card' ? (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {paginatedTemplates.map((template) => (
              <div key={template.id} className="bg-muted rounded-xl p-6 hover:shadow-lg transition-all cursor-pointer" onClick={() => onTemplateSelect(template)}>
                <div className="flex items-start justify-between mb-4">
                  <div>
                    <h4 className="font-semibold text-foreground">{template.template}</h4>
                    <p className="text-sm text-muted-foreground">{template.department} • {template.roleType}</p>
                    <p className="text-xs text-muted-foreground">v{template.version} by {template.createdBy}</p>
                  </div>
                  <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                    template.effectivenessScore >= 85 ? 'bg-green-500/10 text-green-600' :
                    template.effectivenessScore >= 75 ? 'bg-blue-500/10 text-blue-600' :
                    'bg-yellow-500/10 text-yellow-600'
                  }`}>
                    {template.effectivenessScore}% effective
                  </span>
                </div>

                <div className="grid grid-cols-3 gap-4 mb-4">
                  <div className="text-center">
                    <div className="text-lg font-bold text-foreground">{template.interviews}</div>
                    <div className="text-xs text-muted-foreground">Interviews</div>
                  </div>
                  <div className="text-center">
                    <div className="text-lg font-bold text-foreground">{template.hired}</div>
                    <div className="text-xs text-muted-foreground">Hired</div>
                  </div>
                  <div className="text-center">
                    <div className="text-lg font-bold text-foreground">{template.success_rate}%</div>
                    <div className="text-xs text-muted-foreground">Success Rate</div>
                  </div>
                </div>

                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Adoption Rate</span>
                    <span className="font-medium">{template.adoptionRate}%</span>
                  </div>
                  <div className="w-full bg-background rounded-full h-2">
                    <div className="bg-primary h-2 rounded-full" style={{ width: `${template.adoptionRate}%` }} />
                  </div>
                </div>

                <div className="mt-4 pt-4 border-t border-border">
                  <div className="flex justify-between text-xs text-muted-foreground">
                    <span>Created: {new Date(template.creationDate).toLocaleDateString()}</span>
                    <span>Avg Score: {template.avgCandidateScore}%</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-border">
                  <th className="text-left py-3 px-4 font-medium text-foreground">Template</th>
                  <th className="text-left py-3 px-4 font-medium text-foreground">Department</th>
                  <th className="text-left py-3 px-4 font-medium text-foreground">Interviews</th>
                  <th className="text-left py-3 px-4 font-medium text-foreground">Success Rate</th>
                  <th className="text-left py-3 px-4 font-medium text-foreground">Effectiveness</th>
                  <th className="text-left py-3 px-4 font-medium text-foreground">Created</th>
                </tr>
              </thead>
              <tbody>
                {filteredTemplates.map((template) => (
                  <tr key={template.id} className="border-b border-border hover:bg-muted/50 cursor-pointer" onClick={() => onTemplateSelect(template)}>
                    <td className="py-3 px-4">
                      <div>
                        <div className="font-medium text-foreground">{template.template}</div>
                        <div className="text-sm text-muted-foreground">v{template.version} by {template.createdBy}</div>
                      </div>
                    </td>
                    <td className="py-3 px-4">
                      <span className="px-2 py-1 bg-secondary rounded-full text-xs">{template.department}</span>
                    </td>
                    <td className="py-3 px-4 text-muted-foreground">{template.interviews}</td>
                    <td className="py-3 px-4">
                      <div className="flex items-center space-x-2">
                        <div className="w-16 bg-muted rounded-full h-2">
                          <div className="bg-primary h-2 rounded-full" style={{ width: `${template.success_rate}%` }} />
                        </div>
                        <span className="text-foreground text-sm">{template.success_rate}%</span>
                      </div>
                    </td>
                    <td className="py-3 px-4">
                      <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                        template.effectivenessScore >= 85 ? 'bg-green-500/10 text-green-500' :
                        template.effectivenessScore >= 75 ? 'bg-blue-500/10 text-blue-500' :
                        'bg-yellow-500/10 text-yellow-500'
                      }`}>
                        {template.effectivenessScore}%
                      </span>
                    </td>
                    <td className="py-3 px-4 text-muted-foreground text-sm">
                      {new Date(template.creationDate).toLocaleDateString()}
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
