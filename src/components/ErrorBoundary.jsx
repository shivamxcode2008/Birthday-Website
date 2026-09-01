import React from 'react';
import { PandaMascot } from './ui/PandaMascot';

export class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true, error };
  }

  componentDidCatch(error, errorInfo) {
    console.error("React Error Boundary Caught:", error, errorInfo);
  }

  handleReset = () => {
    this.setState({ hasError: false, error: null });
    window.location.reload();
  };

  render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-screen w-full bg-[#FFF8F3] flex flex-col items-center justify-center p-6 text-center font-sans relative overflow-hidden">
          <div className="absolute inset-0 pointer-events-none opacity-[0.03] mix-blend-multiply" style={{ backgroundImage: 'url("data:image/svg+xml,%3Csvg viewBox=%220 0 200 200%22 xmlns=%22http://www.w3.org/2000/svg%22%3E%3Cfilter id=%22noiseFilter%22%3E%3CfeTurbulence type=%22fractalNoise%22 baseFrequency=%220.8%22 numOctaves=%223%22 stitchTiles=%22stitch%22/%3E%3C/filter%3E%3Crect width=%22100%25%22 height=%22100%25%22 filter=%22url(%23noiseFilter)%22/%3E%3C/svg%3E")' }} />
          
          <div className="relative z-10 max-w-sm w-full bg-white p-8 rounded-2xl shadow-[0_20px_40px_-15px_rgba(0,0,0,0.05)] border border-[#fcebe9] flex flex-col items-center">
            <div className="w-24 h-24 mb-6 relative">
              <PandaMascot pose="confused" className="scale-125" />
            </div>
            
            <h2 className="text-2xl font-bold text-[#4A3735] mb-2 tracking-tight">Oops...</h2>
            <p className="text-[#8c7674] mb-8 font-medium">Something got a little tangled. 🐼</p>
            
            <button 
              onClick={this.handleReset}
              className="px-8 py-3 bg-[#F7A8B8] hover:bg-[#f594a7] text-white rounded-full font-bold shadow-md hover:shadow-lg transition-all active:scale-95"
            >
              Try again
            </button>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}
