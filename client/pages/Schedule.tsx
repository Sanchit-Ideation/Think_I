import { useState } from 'react';
import { 
  Calendar, 
  Clock, 
  Plus, 
  Send, 
  Users, 
  MapPin, 
  Video, 
  Mail,
  Search,
  Filter,
  Edit,
  Copy,
  Trash2,
  CheckCircle,
  AlertCircle,
  User
} from 'lucide-react';

const upcomingInterviews = [
  {
    id: 1,
    candidate: 'Sarah Johnson',
    position: 'Senior Software Engineer',
    interviewer: 'John Smith',
    date: '2024-12-16',
    time: '14:00',
    duration: 60,
    type: 'video',
    status: 'confirmed',
    location: 'Zoom Meeting',
    template: 'Senior Software Engineer',
    reminderSent: true
  },
  {
    id: 2,
    candidate: 'Michael Chen',
    position: 'Product Manager',
    interviewer: 'Emily Davis',
    date: '2024-12-16',
    time: '10:30',
    duration: 45,
    type: 'in-person',
    status: 'pending',
    location: 'Conference Room A',
    template: 'Product Manager',
    reminderSent: false
  },
  {
    id: 3,
    candidate: 'Anna Rodriguez',
    position: 'UX Designer',
    interviewer: 'Alex Wilson',
    date: '2024-12-17',
    time: '09:00',
    duration: 50,
    type: 'video',
    status: 'confirmed',
    location: 'Google Meet',
    template: 'UX Designer',
    reminderSent: true
  },
  {
    id: 4,
    candidate: 'David Kim',
    position: 'Data Scientist',
    interviewer: 'Lisa Brown',
    date: '2024-12-17',
    time: '15:30',
    duration: 75,
    type: 'video',
    status: 'rescheduled',
    location: 'Teams Meeting',
    template: 'Data Scientist',
    reminderSent: false
  }
];

const interviewers = [
  { id: 1, name: 'John Smith', department: 'Engineering', expertise: ['JavaScript', 'System Design'] },
  { id: 2, name: 'Emily Davis', department: 'Product', expertise: ['Strategy', 'Analytics'] },
  { id: 3, name: 'Alex Wilson', department: 'Design', expertise: ['UX Research', 'Prototyping'] },
  { id: 4, name: 'Lisa Brown', department: 'Engineering', expertise: ['Python', 'Machine Learning'] },
];

const timeSlots = [
  '09:00', '09:30', '10:00', '10:30', '11:00', '11:30', 
  '14:00', '14:30', '15:00', '15:30', '16:00', '16:30'
];

export default function Schedule() {
  const [showScheduleModal, setShowScheduleModal] = useState(false);
  const [selectedDate, setSelectedDate] = useState('2024-12-16');
  const [filterStatus, setFilterStatus] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');

  const filteredInterviews = upcomingInterviews.filter(interview => {
    const matchesSearch = interview.candidate.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         interview.position.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         interview.interviewer.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = filterStatus === 'all' || interview.status === filterStatus;
    return matchesSearch && matchesStatus;
  });

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'confirmed': return 'bg-green-500/10 text-green-500';
      case 'pending': return 'bg-yellow-500/10 text-yellow-500';
      case 'rescheduled': return 'bg-blue-500/10 text-blue-500';
      case 'cancelled': return 'bg-red-500/10 text-red-500';
      default: return 'bg-gray-500/10 text-gray-500';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'confirmed': return <CheckCircle className="w-4 h-4" />;
      case 'pending': return <Clock className="w-4 h-4" />;
      case 'rescheduled': return <AlertCircle className="w-4 h-4" />;
      default: return <Clock className="w-4 h-4" />;
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Schedule Interviews</h1>
          <p className="text-muted-foreground">Manage candidate invites and interviewer assignments</p>
        </div>
        <button
          onClick={() => setShowScheduleModal(true)}
          className="flex items-center space-x-2 px-4 py-2 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition-colors"
        >
          <Plus className="w-4 h-4" />
          <span>Schedule Interview</span>
        </button>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="bg-card border border-border rounded-xl p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-muted-foreground">Today's Interviews</p>
              <p className="text-2xl font-bold text-foreground">8</p>
            </div>
            <Calendar className="w-8 h-8 text-blue-500" />
          </div>
        </div>
        <div className="bg-card border border-border rounded-xl p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-muted-foreground">This Week</p>
              <p className="text-2xl font-bold text-foreground">34</p>
            </div>
            <Clock className="w-8 h-8 text-green-500" />
          </div>
        </div>
        <div className="bg-card border border-border rounded-xl p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-muted-foreground">Pending Confirmations</p>
              <p className="text-2xl font-bold text-foreground">12</p>
            </div>
            <AlertCircle className="w-8 h-8 text-yellow-500" />
          </div>
        </div>
        <div className="bg-card border border-border rounded-xl p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-muted-foreground">Available Interviewers</p>
              <p className="text-2xl font-bold text-foreground">15</p>
            </div>
            <Users className="w-8 h-8 text-purple-500" />
          </div>
        </div>
      </div>

      {/* Filters */}
      <div className="flex items-center space-x-4">
        <div className="relative flex-1 max-w-md">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
          <input
            type="text"
            placeholder="Search interviews..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10 pr-4 py-2 w-full bg-card border border-border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-primary"
          />
        </div>
        <select
          value={filterStatus}
          onChange={(e) => setFilterStatus(e.target.value)}
          className="bg-card border border-border rounded-lg px-3 py-2 text-sm"
        >
          <option value="all">All Status</option>
          <option value="confirmed">Confirmed</option>
          <option value="pending">Pending</option>
          <option value="rescheduled">Rescheduled</option>
          <option value="cancelled">Cancelled</option>
        </select>
        <input
          type="date"
          value={selectedDate}
          onChange={(e) => setSelectedDate(e.target.value)}
          className="bg-card border border-border rounded-lg px-3 py-2 text-sm"
        />
      </div>

      {/* Interviews List */}
      <div className="bg-card border border-border rounded-xl">
        <div className="p-6 border-b border-border">
          <h3 className="text-lg font-semibold text-foreground">Upcoming Interviews</h3>
        </div>
        <div className="divide-y divide-border">
          {filteredInterviews.map((interview) => (
            <div key={interview.id} className="p-6 hover:bg-muted/50 transition-colors">
              <div className="flex items-center justify-between">
                <div className="flex-1">
                  <div className="flex items-center space-x-4">
                    <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-cyan-500 rounded-lg flex items-center justify-center">
                      <span className="text-white font-semibold">
                        {interview.candidate.split(' ').map(n => n[0]).join('')}
                      </span>
                    </div>
                    <div>
                      <h4 className="font-semibold text-foreground">{interview.candidate}</h4>
                      <p className="text-sm text-muted-foreground">{interview.position}</p>
                    </div>
                  </div>
                </div>

                <div className="flex items-center space-x-8">
                  <div className="text-center">
                    <div className="flex items-center space-x-1 text-sm text-muted-foreground mb-1">
                      <Calendar className="w-4 h-4" />
                      <span>{new Date(interview.date).toLocaleDateString()}</span>
                    </div>
                    <div className="flex items-center space-x-1 text-sm text-muted-foreground">
                      <Clock className="w-4 h-4" />
                      <span>{interview.time} ({interview.duration}m)</span>
                    </div>
                  </div>

                  <div className="text-center">
                    <div className="flex items-center space-x-1 text-sm text-muted-foreground mb-1">
                      <User className="w-4 h-4" />
                      <span>{interview.interviewer}</span>
                    </div>
                    <div className="flex items-center space-x-1 text-sm text-muted-foreground">
                      {interview.type === 'video' ? (
                        <Video className="w-4 h-4" />
                      ) : (
                        <MapPin className="w-4 h-4" />
                      )}
                      <span>{interview.location}</span>
                    </div>
                  </div>

                  <div className="text-center">
                    <div className={`inline-flex items-center space-x-1 px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(interview.status)}`}>
                      {getStatusIcon(interview.status)}
                      <span className="capitalize">{interview.status}</span>
                    </div>
                    {interview.reminderSent && (
                      <div className="text-xs text-green-500 mt-1">✓ Reminder sent</div>
                    )}
                  </div>

                  <div className="flex items-center space-x-1">
                    <button className="p-2 hover:bg-muted rounded-lg transition-colors">
                      <Edit className="w-4 h-4 text-muted-foreground" />
                    </button>
                    <button className="p-2 hover:bg-muted rounded-lg transition-colors">
                      <Copy className="w-4 h-4 text-muted-foreground" />
                    </button>
                    <button className="p-2 hover:bg-muted rounded-lg transition-colors">
                      <Mail className="w-4 h-4 text-muted-foreground" />
                    </button>
                    <button className="p-2 hover:bg-muted rounded-lg transition-colors">
                      <Trash2 className="w-4 h-4 text-muted-foreground" />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Schedule Modal */}
      {showScheduleModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-card border border-border rounded-xl w-full max-w-2xl max-h-[90vh] overflow-y-auto">
            <div className="p-6 border-b border-border">
              <h2 className="text-xl font-semibold text-foreground">Schedule New Interview</h2>
            </div>

            <div className="p-6 space-y-6">
              {/* Candidate Info */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-foreground mb-2">Candidate Name</label>
                  <input
                    type="text"
                    placeholder="Enter candidate name"
                    className="w-full px-3 py-2 bg-background border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-foreground mb-2">Position</label>
                  <select className="w-full px-3 py-2 bg-background border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary">
                    <option value="">Select Position</option>
                    <option value="senior-software-engineer">Senior Software Engineer</option>
                    <option value="product-manager">Product Manager</option>
                    <option value="ux-designer">UX Designer</option>
                    <option value="data-scientist">Data Scientist</option>
                  </select>
                </div>
              </div>

              {/* Interview Details */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                  <label className="block text-sm font-medium text-foreground mb-2">Date</label>
                  <input
                    type="date"
                    className="w-full px-3 py-2 bg-background border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-foreground mb-2">Time</label>
                  <select className="w-full px-3 py-2 bg-background border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary">
                    {timeSlots.map(time => (
                      <option key={time} value={time}>{time}</option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-foreground mb-2">Duration (minutes)</label>
                  <select className="w-full px-3 py-2 bg-background border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary">
                    <option value="30">30 minutes</option>
                    <option value="45">45 minutes</option>
                    <option value="60">60 minutes</option>
                    <option value="75">75 minutes</option>
                    <option value="90">90 minutes</option>
                  </select>
                </div>
              </div>

              {/* Interviewer Selection */}
              <div>
                <label className="block text-sm font-medium text-foreground mb-2">Interviewer</label>
                <div className="space-y-2">
                  {interviewers.map(interviewer => (
                    <label key={interviewer.id} className="flex items-center space-x-3 p-3 bg-muted rounded-lg cursor-pointer hover:bg-muted/80">
                      <input type="radio" name="interviewer" value={interviewer.id} />
                      <div className="w-8 h-8 bg-gradient-to-br from-purple-500 to-pink-500 rounded-lg flex items-center justify-center">
                        <span className="text-white text-sm font-semibold">
                          {interviewer.name.split(' ').map(n => n[0]).join('')}
                        </span>
                      </div>
                      <div className="flex-1">
                        <div className="font-medium text-foreground">{interviewer.name}</div>
                        <div className="text-sm text-muted-foreground">
                          {interviewer.department} • {interviewer.expertise.join(', ')}
                        </div>
                      </div>
                    </label>
                  ))}
                </div>
              </div>

              {/* Interview Type */}
              <div>
                <label className="block text-sm font-medium text-foreground mb-2">Interview Type</label>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  <label className="flex items-center space-x-3 p-3 bg-muted rounded-lg cursor-pointer">
                    <input type="radio" name="type" value="video" defaultChecked />
                    <Video className="w-5 h-5 text-muted-foreground" />
                    <div>
                      <div className="font-medium text-foreground">Video Call</div>
                      <div className="text-sm text-muted-foreground">Online interview via video platform</div>
                    </div>
                  </label>
                  <label className="flex items-center space-x-3 p-3 bg-muted rounded-lg cursor-pointer">
                    <input type="radio" name="type" value="in-person" />
                    <MapPin className="w-5 h-5 text-muted-foreground" />
                    <div>
                      <div className="font-medium text-foreground">In-Person</div>
                      <div className="text-sm text-muted-foreground">Face-to-face interview at office</div>
                    </div>
                  </label>
                </div>
              </div>

              {/* Location/Platform */}
              <div>
                <label className="block text-sm font-medium text-foreground mb-2">Location/Platform</label>
                <input
                  type="text"
                  placeholder="e.g., Zoom Meeting Room, Conference Room A"
                  className="w-full px-3 py-2 bg-background border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                />
              </div>

              {/* Additional Options */}
              <div className="space-y-3">
                <label className="flex items-center space-x-2">
                  <input type="checkbox" className="rounded" />
                  <span className="text-sm text-foreground">Send calendar invite automatically</span>
                </label>
                <label className="flex items-center space-x-2">
                  <input type="checkbox" className="rounded" defaultChecked />
                  <span className="text-sm text-foreground">Send reminder 24 hours before</span>
                </label>
                <label className="flex items-center space-x-2">
                  <input type="checkbox" className="rounded" />
                  <span className="text-sm text-foreground">Record interview session</span>
                </label>
              </div>
            </div>

            <div className="p-6 border-t border-border flex items-center justify-end space-x-3">
              <button
                onClick={() => setShowScheduleModal(false)}
                className="px-4 py-2 text-muted-foreground hover:text-foreground transition-colors"
              >
                Cancel
              </button>
              <button className="flex items-center space-x-2 px-4 py-2 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition-colors">
                <Send className="w-4 h-4" />
                <span>Schedule & Send Invite</span>
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
