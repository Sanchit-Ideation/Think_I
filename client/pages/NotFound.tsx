import { Link } from 'react-router-dom';
import { Home, ArrowLeft } from 'lucide-react';

export default function NotFound() {
  return (
    <div className="min-h-screen bg-background flex items-center justify-center p-4">
      <div className="text-center max-w-md mx-auto">
        <div className="flex items-center justify-center mb-8">
          <div className="w-16 h-16 bg-gradient-to-br from-purple-500 to-violet-600 rounded-xl flex items-center justify-center shadow-lg">
            <span className="text-2xl font-bold text-white">Σ</span>
          </div>
        </div>
        
        <h1 className="text-6xl font-bold text-foreground mb-4">404</h1>
        <h2 className="text-2xl font-semibold text-foreground mb-4">Page Not Found</h2>
        <p className="text-muted-foreground mb-8">
          The page you're looking for doesn't exist or has been moved.
        </p>
        
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link 
            to="/" 
            className="flex items-center justify-center space-x-2 px-6 py-3 bg-primary hover:bg-primary/90 text-primary-foreground rounded-lg transition-colors"
          >
            <Home className="w-4 h-4" />
            <span>Go Home</span>
          </Link>
          <button 
            onClick={() => window.history.back()}
            className="flex items-center justify-center space-x-2 px-6 py-3 bg-secondary hover:bg-secondary/80 text-secondary-foreground rounded-lg transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Go Back</span>
          </button>
        </div>
      </div>
    </div>
  );
}
