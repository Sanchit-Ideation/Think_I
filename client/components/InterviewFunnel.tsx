import { useState } from 'react';
import { 
  Users, 
  Calendar, 
  CheckCircle2, 
  Award, 
  Star,
  UserX,
  Clock,
  RotateCcw,
  AlertTriangle
} from 'lucide-react';
import { 
  FunnelChart, 
  Funnel, 
  LabelList, 
  ResponsiveContainer, 
  Tooltip,
  Cell
} from 'recharts';

// Interview funnel data with detailed breakdown
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
    }
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
  },
  {
    name: 'Highly Recommended',
    value: 187,
    fill: '#22c55e',
    percentage: 21.0,
    details: {
      total: 187,
      conversionRate: 21.0,
      avgScore: 8.5,
      topPerformers: 23
    }
  },
  {
    name: 'Recommended',
    value: 155,
    fill: '#8b5cf6',
    percentage: 17.4,
    details: {
      total: 155,
      conversionRate: 17.4,
      avgScore: 7.2,
      potentialHires: 98
    }
  }
];

interface FunnelStageProps {
  stage: typeof interviewFunnelData[0];
  index: number;
  onHover: (stage: typeof interviewFunnelData[0] | null) => void;
}

const FunnelStage = ({ stage, index, onHover }: FunnelStageProps) => {
  const getIcon = (stageName: string) => {
    switch (stageName) {
      case 'Scheduled':
        return <Calendar className="w-5 h-5" />;
      case 'Interviewed':
        return <Users className="w-5 h-5" />;
      case 'Evaluated':
        return <CheckCircle2 className="w-5 h-5" />;
      case 'Highly Recommended':
        return <Star className="w-5 h-5" />;
      case 'Recommended':
        return <Award className="w-5 h-5" />;
      default:
        return <Users className="w-5 h-5" />;
    }
  };

  const stageWidth = Math.max(20, (stage.percentage / 100) * 80);

  return (
    <div
      className="relative group cursor-pointer"
      onMouseEnter={() => onHover(stage)}
      onMouseLeave={() => onHover(null)}
    >
      <div
        className="relative mx-auto transition-all duration-300 group-hover:scale-105"
        style={{
          width: `${stageWidth}%`,
          height: '60px',
          background: `linear-gradient(135deg, ${stage.fill}, ${stage.fill}dd)`,
          clipPath: index === 0 
            ? 'polygon(0 0, 100% 0, 90% 100%, 0% 100%)'
            : index === interviewFunnelData.length - 1
            ? 'polygon(10% 0, 100% 0, 100% 100%, 0% 100%)'
            : 'polygon(10% 0, 100% 0, 90% 100%, 0% 100%)'
        }}
      >
        {/* Stage Content */}
        <div className="absolute inset-0 flex items-center justify-center text-white">
          <div className="text-center">
            <div className="flex items-center justify-center mb-1">
              {getIcon(stage.name)}
            </div>
            <div className="text-xs font-medium">{stage.name}</div>
            <div className="text-sm font-bold">{stage.value}</div>
          </div>
        </div>

        {/* Hover Border */}
        <div className="absolute inset-0 border-2 border-transparent group-hover:border-white/50 transition-colors duration-200"
             style={{
               clipPath: index === 0 
                 ? 'polygon(0 0, 100% 0, 90% 100%, 0% 100%)'
                 : index === interviewFunnelData.length - 1
                 ? 'polygon(10% 0, 100% 0, 100% 100%, 0% 100%)'
                 : 'polygon(10% 0, 100% 0, 90% 100%, 0% 100%)'
             }}
        />
      </div>

      {/* Percentage Label */}
      <div className="text-center mt-2">
        <span className="text-sm font-medium text-foreground">
          {stage.percentage.toFixed(1)}%
        </span>
      </div>
    </div>
  );
};

interface HoverDetailsProps {
  stage: typeof interviewFunnelData[0] | null;
}

const HoverDetails = ({ stage }: HoverDetailsProps) => {
  if (!stage) return null;

  const renderScheduledDetails = (details: any) => (
    <div className="space-y-3">
      <div className="grid grid-cols-2 gap-4">
        <div className="flex items-center space-x-2">
          <UserX className="w-4 h-4 text-red-500" />
          <div>
            <div className="text-sm font-medium text-red-500">No Show</div>
            <div className="text-xs text-muted-foreground">{details.substates.noShow} candidates</div>
          </div>
        </div>
        <div className="flex items-center space-x-2">
          <AlertTriangle className="w-4 h-4 text-orange-500" />
          <div>
            <div className="text-sm font-medium text-orange-500">Cancelled</div>
            <div className="text-xs text-muted-foreground">{details.substates.cancelled} interviews</div>
          </div>
        </div>
        <div className="flex items-center space-x-2">
          <RotateCcw className="w-4 h-4 text-blue-500" />
          <div>
            <div className="text-sm font-medium text-blue-500">Rescheduled</div>
            <div className="text-xs text-muted-foreground">{details.substates.rescheduled} interviews</div>
          </div>
        </div>
        <div className="flex items-center space-x-2">
          <Clock className="w-4 h-4 text-green-500" />
          <div>
            <div className="text-sm font-medium text-green-500">Upcoming</div>
            <div className="text-xs text-muted-foreground">{details.substates.upcoming} scheduled</div>
          </div>
        </div>
      </div>
      <div className="pt-2 border-t border-border">
        <div className="text-xs text-muted-foreground">
          Cancel Rate: {((details.substates.cancelled / details.total) * 100).toFixed(1)}% |
          No-show Rate: {((details.substates.noShow / details.total) * 100).toFixed(1)}%
        </div>
      </div>
    </div>
  );

  const renderGenericDetails = (stage: any) => {
    const details = stage.details;
    
    return (
      <div className="space-y-2">
        <div className="grid grid-cols-2 gap-4">
          <div>
            <div className="text-sm font-medium text-foreground">Total Count</div>
            <div className="text-lg font-bold text-primary">{details.total}</div>
          </div>
          <div>
            <div className="text-sm font-medium text-foreground">Conversion Rate</div>
            <div className="text-lg font-bold text-green-600">{stage.percentage.toFixed(1)}%</div>
          </div>
        </div>
        
        {details.completionRate && (
          <div className="text-xs text-muted-foreground">
            Completion Rate: {details.completionRate}% | Avg Duration: {details.avgDuration}
          </div>
        )}
        
        {details.pendingEvaluations && (
          <div className="text-xs text-muted-foreground">
            Pending: {details.pendingEvaluations} | Avg Time: {details.avgEvaluationTime}
          </div>
        )}
        
        {details.avgScore && (
          <div className="text-xs text-muted-foreground">
            Avg Score: {details.avgScore}/10
            {details.topPerformers && ` | Top Performers: ${details.topPerformers}`}
            {details.potentialHires && ` | Potential Hires: ${details.potentialHires}`}
          </div>
        )}
      </div>
    );
  };

  return (
    <div className="bg-card border border-border rounded-xl p-6 shadow-lg">
      <div className="flex items-center space-x-3 mb-4">
        <div 
          className="w-4 h-4 rounded-full"
          style={{ backgroundColor: stage.fill }}
        />
        <h4 className="text-lg font-semibold text-foreground">{stage.name}</h4>
      </div>
      
      {stage.name === 'Scheduled' 
        ? renderScheduledDetails(stage.details)
        : renderGenericDetails(stage)
      }
    </div>
  );
};

export default function InterviewFunnel() {
  const [hoveredStage, setHoveredStage] = useState<typeof interviewFunnelData[0] | null>(null);

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-semibold text-foreground">Interview Funnel Analysis</h3>
        <div className="text-sm text-muted-foreground">
          Hover over stages for detailed breakdown
        </div>
      </div>

      {/* Horizontal Bar Chart Funnel */}
      <div className="space-y-3">
        {interviewFunnelData.map((stage, index) => (
          <div
            key={stage.name}
            className="relative group cursor-pointer"
            onMouseEnter={() => setHoveredStage(stage)}
            onMouseLeave={() => setHoveredStage(null)}
          >
            <div className="flex items-center space-x-4">
              {/* Stage Icon and Label */}
              <div className="w-32 flex items-center space-x-2">
                {getIcon(stage.name)}
                <span className="text-sm font-medium text-foreground">{stage.name}</span>
              </div>

              {/* Progress Bar */}
              <div className="flex-1 relative">
                <div className="h-12 bg-muted rounded-lg overflow-hidden">
                  <div
                    className="h-full transition-all duration-700 ease-out group-hover:brightness-110 flex items-center justify-end pr-4"
                    style={{
                      width: `${stage.percentage}%`,
                      background: `linear-gradient(90deg, ${stage.fill}, ${stage.fill}dd)`
                    }}
                  >
                    <div className="text-white font-semibold text-sm">
                      {stage.value.toLocaleString()}
                    </div>
                  </div>
                </div>

                {/* Percentage Label */}
                <div className="absolute -right-16 top-1/2 transform -translate-y-1/2">
                  <span className="text-sm font-medium text-foreground">
                    {stage.percentage.toFixed(1)}%
                  </span>
                </div>
              </div>
            </div>

            {/* Connecting Line */}
            {index < interviewFunnelData.length - 1 && (
              <div className="ml-36 mt-2 mb-2">
                <div className="w-8 h-px bg-border"></div>
                <div className="w-0 h-0 border-l-[4px] border-l-transparent border-r-[4px] border-r-transparent border-t-[6px] border-t-border ml-6"></div>
              </div>
            )}
          </div>
        ))}
      </div>

      {/* Hover Details Panel */}
      <div className="min-h-[200px]">
        {hoveredStage ? (
          <HoverDetails stage={hoveredStage} />
        ) : (
          <div className="bg-muted/30 border border-dashed border-border rounded-xl p-8 text-center">
            <Users className="w-8 h-8 text-muted-foreground mx-auto mb-3" />
            <p className="text-muted-foreground">
              Hover over any stage above to see detailed breakdown
            </p>
          </div>
        )}
      </div>

      {/* Summary Statistics */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-4 border-t border-border">
        <div className="text-center">
          <div className="text-2xl font-bold text-primary">87.6%</div>
          <div className="text-sm text-muted-foreground">Interview Completion Rate</div>
        </div>
        <div className="text-center">
          <div className="text-2xl font-bold text-green-600">38.4%</div>
          <div className="text-sm text-muted-foreground">Overall Recommendation Rate</div>
        </div>
        <div className="text-center">
          <div className="text-2xl font-bold text-orange-600">6.3%</div>
          <div className="text-sm text-muted-foreground">Cancellation Rate</div>
        </div>
      </div>
    </div>
  );
}
