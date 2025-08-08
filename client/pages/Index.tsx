import { useState, useEffect } from 'react';
import { Check } from 'lucide-react';
import { Link } from 'react-router-dom';

const steps = [
  { id: 1, text: 'Initializing', delay: 500 },
  { id: 2, text: 'Creating application', delay: 1000 },
  { id: 3, text: 'Connecting to network', delay: 1500 },
  { id: 4, text: 'Creating machine', delay: 2000 },
  { id: 5, text: 'Starting server', delay: 2500 }
];

export default function Index() {
  const [completedSteps, setCompletedSteps] = useState<number[]>([]);
  const [isSetupComplete, setIsSetupComplete] = useState(false);

  useEffect(() => {
    steps.forEach((step) => {
      setTimeout(() => {
        setCompletedSteps(prev => [...prev, step.id]);
      }, step.delay);
    });

    setTimeout(() => {
      setIsSetupComplete(true);
    }, 3500);
  }, []);

  if (isSetupComplete) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center p-4">
        <div className="w-full max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <div className="flex items-center justify-center mb-6">
              <div className="w-16 h-16 bg-gradient-to-br from-purple-500 to-violet-600 rounded-xl flex items-center justify-center shadow-lg">
                <span className="text-2xl font-bold text-white">Σ</span>
              </div>
            </div>
            <h1 className="text-4xl font-bold text-foreground mb-4">T_interview_2</h1>
            <p className="text-muted-foreground text-lg">Interview Analysis & Reporting Platform</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
            <Link 
              to="/report" 
              className="group bg-card border border-border rounded-xl p-6 hover:bg-accent transition-colors"
            >
              <div className="flex items-center justify-between mb-4">
                <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center">
                  <svg className="w-6 h-6 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                  </svg>
                </div>
                <div className="text-2xl">→</div>
              </div>
              <h3 className="text-lg font-semibold text-foreground mb-2">Interview Report</h3>
              <p className="text-muted-foreground text-sm">View detailed analysis and performance metrics</p>
            </Link>

            <div className="bg-card border border-border rounded-xl p-6 opacity-60">
              <div className="flex items-center justify-between mb-4">
                <div className="w-12 h-12 bg-muted rounded-lg flex items-center justify-center">
                  <svg className="w-6 h-6 text-muted-foreground" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                  </svg>
                </div>
                <div className="text-2xl text-muted-foreground">→</div>
              </div>
              <h3 className="text-lg font-semibold text-foreground mb-2">Candidate Profile</h3>
              <p className="text-muted-foreground text-sm">Coming soon</p>
            </div>

            <div className="bg-card border border-border rounded-xl p-6 opacity-60">
              <div className="flex items-center justify-between mb-4">
                <div className="w-12 h-12 bg-muted rounded-lg flex items-center justify-center">
                  <svg className="w-6 h-6 text-muted-foreground" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                </div>
                <div className="text-2xl text-muted-foreground">→</div>
              </div>
              <h3 className="text-lg font-semibold text-foreground mb-2">Settings</h3>
              <p className="text-muted-foreground text-sm">Coming soon</p>
            </div>
          </div>

          <div className="text-center">
            <p className="text-muted-foreground text-sm">
              Platform ready • All systems operational
            </p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        <div className="bg-card border border-border rounded-2xl p-8 shadow-lg">
          <div className="text-center mb-8">
            <div className="flex items-center justify-center mb-6">
              <div className="w-16 h-16 bg-gradient-to-br from-purple-500 to-violet-600 rounded-xl flex items-center justify-center shadow-lg">
                <span className="text-2xl font-bold text-white">Σ</span>
              </div>
            </div>
            <h2 className="text-2xl font-semibold text-foreground mb-2">Setting up dev environment</h2>
            <p className="text-muted-foreground">This can take up to a few minutes</p>
          </div>

          <div className="space-y-4">
            {steps.map((step) => (
              <div key={step.id} className="flex items-center space-x-3">
                <div className={`w-5 h-5 rounded-full flex items-center justify-center transition-colors ${
                  completedSteps.includes(step.id)
                    ? 'bg-green-500'
                    : 'bg-muted'
                }`}>
                  {completedSteps.includes(step.id) && (
                    <Check className="w-3 h-3 text-white" />
                  )}
                </div>
                <span className={`text-sm transition-colors ${
                  completedSteps.includes(step.id)
                    ? 'text-foreground'
                    : 'text-muted-foreground'
                }`}>
                  {step.text}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
