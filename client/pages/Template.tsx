import { useState } from 'react';
import { 
  Plus, 
  Search, 
  Filter, 
  Copy, 
  Edit, 
  Trash2, 
  Star, 
  Clock, 
  Users, 
  FileText,
  Settings,
  Save,
  X
} from 'lucide-react';

const jobTemplates = [
  {
    id: 1,
    title: 'Senior Software Engineer',
    department: 'Engineering',
    level: 'Senior',
    skills: ['JavaScript', 'React', 'Node.js', 'System Design'],
    competencies: ['Technical Skills', 'Problem Solving', 'Communication', 'Leadership'],
    duration: 60,
    sections: 4,
    candidates: 847,
    isActive: true,
    isFavorite: true,
    created: '2024-11-15',
    lastUsed: '2024-12-10'
  },
  {
    id: 2,
    title: 'Product Manager',
    department: 'Product',
    level: 'Mid',
    skills: ['Strategy', 'Analytics', 'User Research', 'Roadmapping'],
    competencies: ['Strategic Thinking', 'Communication', 'Leadership', 'Data Analysis'],
    duration: 45,
    sections: 3,
    candidates: 423,
    isActive: true,
    isFavorite: false,
    created: '2024-10-20',
    lastUsed: '2024-12-08'
  },
  {
    id: 3,
    title: 'Data Scientist',
    department: 'Engineering',
    level: 'Senior',
    skills: ['Python', 'Machine Learning', 'Statistics', 'SQL'],
    competencies: ['Technical Skills', 'Analytical Thinking', 'Communication', 'Innovation'],
    duration: 75,
    sections: 5,
    candidates: 356,
    isActive: true,
    isFavorite: true,
    created: '2024-09-30',
    lastUsed: '2024-12-05'
  },
  {
    id: 4,
    title: 'UX Designer',
    department: 'Design',
    level: 'Mid',
    skills: ['Figma', 'User Research', 'Prototyping', 'Design Systems'],
    competencies: ['Creativity', 'User Empathy', 'Communication', 'Collaboration'],
    duration: 50,
    sections: 3,
    candidates: 298,
    isActive: false,
    isFavorite: false,
    created: '2024-08-15',
    lastUsed: '2024-11-20'
  }
];

const skillsLibrary = [
  'JavaScript', 'Python', 'React', 'Node.js', 'SQL', 'Machine Learning',
  'System Design', 'AWS', 'Docker', 'Kubernetes', 'GraphQL', 'TypeScript',
  'Leadership', 'Communication', 'Problem Solving', 'Strategy', 'Analytics'
];

const competencyFramework = [
  { name: 'Technical Skills', description: 'Core technical competencies for the role' },
  { name: 'Problem Solving', description: 'Analytical and creative problem-solving abilities' },
  { name: 'Communication', description: 'Verbal and written communication effectiveness' },
  { name: 'Leadership', description: 'Leadership potential and team management skills' },
  { name: 'Cultural Fit', description: 'Alignment with company values and culture' },
  { name: 'Innovation', description: 'Creative thinking and innovation capabilities' },
  { name: 'Adaptability', description: 'Flexibility and adaptation to change' },
  { name: 'Strategic Thinking', description: 'Long-term planning and strategic perspective' }
];

export default function Template() {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedDepartment, setSelectedDepartment] = useState('all');
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [selectedTemplate, setSelectedTemplate] = useState(null);

  const departments = ['all', 'Engineering', 'Product', 'Design', 'Marketing', 'Sales'];

  const filteredTemplates = jobTemplates.filter(template => {
    const matchesSearch = template.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         template.skills.some(skill => skill.toLowerCase().includes(searchTerm.toLowerCase()));
    const matchesDepartment = selectedDepartment === 'all' || template.department === selectedDepartment;
    return matchesSearch && matchesDepartment;
  });

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Job Templates</h1>
          <p className="text-muted-foreground">Create and manage interview templates for different roles</p>
        </div>
        <button
          onClick={() => setShowCreateModal(true)}
          className="flex items-center space-x-2 px-4 py-2 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition-colors"
        >
          <Plus className="w-4 h-4" />
          <span>Create Template</span>
        </button>
      </div>

      {/* Filters */}
      <div className="flex items-center space-x-4">
        <div className="relative flex-1 max-w-md">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
          <input
            type="text"
            placeholder="Search templates, skills..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10 pr-4 py-2 w-full bg-card border border-border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-primary"
          />
        </div>
        <select
          value={selectedDepartment}
          onChange={(e) => setSelectedDepartment(e.target.value)}
          className="bg-card border border-border rounded-lg px-3 py-2 text-sm"
        >
          {departments.map(dept => (
            <option key={dept} value={dept}>
              {dept === 'all' ? 'All Departments' : dept}
            </option>
          ))}
        </select>
        <button className="flex items-center space-x-2 px-3 py-2 bg-card border border-border rounded-lg hover:bg-muted transition-colors">
          <Filter className="w-4 h-4" />
          <span>More Filters</span>
        </button>
      </div>

      {/* Templates Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredTemplates.map((template) => (
          <div key={template.id} className="bg-card border border-border rounded-xl p-6 hover:shadow-lg transition-all">
            <div className="flex items-start justify-between mb-4">
              <div className="flex-1">
                <div className="flex items-center space-x-2 mb-1">
                  <h3 className="text-lg font-semibold text-foreground">{template.title}</h3>
                  {template.isFavorite && (
                    <Star className="w-4 h-4 text-yellow-500 fill-current" />
                  )}
                </div>
                <p className="text-sm text-muted-foreground">{template.department} • {template.level}</p>
              </div>
              <div className="flex items-center space-x-1">
                <button className="p-1 hover:bg-muted rounded">
                  <Copy className="w-4 h-4 text-muted-foreground" />
                </button>
                <button
                  onClick={() => setSelectedTemplate(template)}
                  className="p-1 hover:bg-muted rounded"
                >
                  <Edit className="w-4 h-4 text-muted-foreground" />
                </button>
                <button className="p-1 hover:bg-muted rounded">
                  <Trash2 className="w-4 h-4 text-muted-foreground" />
                </button>
              </div>
            </div>

            {/* Skills */}
            <div className="mb-4">
              <h4 className="text-sm font-medium text-foreground mb-2">Key Skills</h4>
              <div className="flex flex-wrap gap-1">
                {template.skills.slice(0, 3).map((skill, index) => (
                  <span key={index} className="px-2 py-1 bg-primary/10 text-primary text-xs rounded-full">
                    {skill}
                  </span>
                ))}
                {template.skills.length > 3 && (
                  <span className="px-2 py-1 bg-muted text-muted-foreground text-xs rounded-full">
                    +{template.skills.length - 3} more
                  </span>
                )}
              </div>
            </div>

            {/* Competencies */}
            <div className="mb-4">
              <h4 className="text-sm font-medium text-foreground mb-2">Competencies</h4>
              <div className="text-xs text-muted-foreground">
                {template.competencies.join(', ')}
              </div>
            </div>

            {/* Stats */}
            <div className="flex items-center justify-between text-sm text-muted-foreground mb-4">
              <div className="flex items-center space-x-1">
                <Clock className="w-4 h-4" />
                <span>{template.duration}m</span>
              </div>
              <div className="flex items-center space-x-1">
                <FileText className="w-4 h-4" />
                <span>{template.sections} sections</span>
              </div>
              <div className="flex items-center space-x-1">
                <Users className="w-4 h-4" />
                <span>{template.candidates}</span>
              </div>
            </div>

            {/* Status */}
            <div className="flex items-center justify-between">
              <div className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${
                template.isActive 
                  ? 'bg-green-500/10 text-green-500' 
                  : 'bg-gray-500/10 text-gray-500'
              }`}>
                {template.isActive ? 'Active' : 'Inactive'}
              </div>
              <p className="text-xs text-muted-foreground">
                Last used: {new Date(template.lastUsed).toLocaleDateString()}
              </p>
            </div>
          </div>
        ))}
      </div>

      {/* Create/Edit Modal */}
      {(showCreateModal || selectedTemplate) && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-card border border-border rounded-xl w-full max-w-4xl max-h-[90vh] overflow-y-auto">
            <div className="p-6 border-b border-border">
              <div className="flex items-center justify-between">
                <h2 className="text-xl font-semibold text-foreground">
                  {selectedTemplate ? 'Edit Template' : 'Create New Template'}
                </h2>
                <button
                  onClick={() => {
                    setShowCreateModal(false);
                    setSelectedTemplate(null);
                  }}
                  className="p-2 hover:bg-muted rounded-lg"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
            </div>

            <div className="p-6 space-y-6">
              {/* Basic Info */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-foreground mb-2">Job Title</label>
                  <input
                    type="text"
                    placeholder="e.g., Senior Software Engineer"
                    className="w-full px-3 py-2 bg-background border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                    defaultValue={selectedTemplate?.title}
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-foreground mb-2">Department</label>
                  <select
                    className="w-full px-3 py-2 bg-background border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                    defaultValue={selectedTemplate?.department}
                  >
                    <option value="">Select Department</option>
                    <option value="Engineering">Engineering</option>
                    <option value="Product">Product</option>
                    <option value="Design">Design</option>
                    <option value="Marketing">Marketing</option>
                    <option value="Sales">Sales</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-foreground mb-2">Level</label>
                  <select
                    className="w-full px-3 py-2 bg-background border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                    defaultValue={selectedTemplate?.level}
                  >
                    <option value="">Select Level</option>
                    <option value="Junior">Junior</option>
                    <option value="Mid">Mid</option>
                    <option value="Senior">Senior</option>
                    <option value="Staff">Staff</option>
                    <option value="Principal">Principal</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-foreground mb-2">Duration (minutes)</label>
                  <input
                    type="number"
                    placeholder="60"
                    className="w-full px-3 py-2 bg-background border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                    defaultValue={selectedTemplate?.duration}
                  />
                </div>
              </div>

              {/* Skills */}
              <div>
                <label className="block text-sm font-medium text-foreground mb-2">Required Skills</label>
                <div className="mb-2">
                  <input
                    type="text"
                    placeholder="Type to add skills..."
                    className="w-full px-3 py-2 bg-background border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                  />
                </div>
                <div className="flex flex-wrap gap-2">
                  {skillsLibrary.slice(0, 12).map((skill, index) => (
                    <button
                      key={index}
                      className="px-3 py-1 text-sm bg-muted hover:bg-primary hover:text-primary-foreground rounded-full transition-colors"
                    >
                      {skill}
                    </button>
                  ))}
                </div>
              </div>

              {/* Competencies */}
              <div>
                <label className="block text-sm font-medium text-foreground mb-2">Competency Framework</label>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  {competencyFramework.map((competency, index) => (
                    <label key={index} className="flex items-start space-x-3 p-3 bg-muted rounded-lg cursor-pointer">
                      <input type="checkbox" className="mt-1" />
                      <div>
                        <div className="font-medium text-foreground">{competency.name}</div>
                        <div className="text-sm text-muted-foreground">{competency.description}</div>
                      </div>
                    </label>
                  ))}
                </div>
              </div>

              {/* Interview Sections */}
              <div>
                <label className="block text-sm font-medium text-foreground mb-2">Interview Sections</label>
                <div className="space-y-3">
                  <div className="flex items-center space-x-3 p-3 bg-muted rounded-lg">
                    <input type="checkbox" defaultChecked />
                    <div className="flex-1">
                      <div className="font-medium text-foreground">Technical Assessment</div>
                      <div className="text-sm text-muted-foreground">Code challenges and technical questions</div>
                    </div>
                    <div className="text-sm text-muted-foreground">20 min</div>
                  </div>
                  <div className="flex items-center space-x-3 p-3 bg-muted rounded-lg">
                    <input type="checkbox" defaultChecked />
                    <div className="flex-1">
                      <div className="font-medium text-foreground">Behavioral Interview</div>
                      <div className="text-sm text-muted-foreground">Cultural fit and soft skills assessment</div>
                    </div>
                    <div className="text-sm text-muted-foreground">15 min</div>
                  </div>
                  <div className="flex items-center space-x-3 p-3 bg-muted rounded-lg">
                    <input type="checkbox" defaultChecked />
                    <div className="flex-1">
                      <div className="font-medium text-foreground">System Design</div>
                      <div className="text-sm text-muted-foreground">Architecture and design thinking</div>
                    </div>
                    <div className="text-sm text-muted-foreground">25 min</div>
                  </div>
                </div>
              </div>
            </div>

            <div className="p-6 border-t border-border flex items-center justify-end space-x-3">
              <button
                onClick={() => {
                  setShowCreateModal(false);
                  setSelectedTemplate(null);
                }}
                className="px-4 py-2 text-muted-foreground hover:text-foreground transition-colors"
              >
                Cancel
              </button>
              <button className="flex items-center space-x-2 px-4 py-2 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition-colors">
                <Save className="w-4 h-4" />
                <span>{selectedTemplate ? 'Update' : 'Create'} Template</span>
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
