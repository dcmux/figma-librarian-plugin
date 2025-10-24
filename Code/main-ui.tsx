import * as React from 'react';
import { createRoot } from 'react-dom/client';
import App from './App';
import './globals.css';

// Add error boundary
class ErrorBoundary extends React.Component<{children: React.ReactNode}, {hasError: boolean, error?: Error}> {
  constructor(props: {children: React.ReactNode}) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error: Error) {
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, errorInfo: any) {
    console.error('React Error Boundary caught an error:', error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return React.createElement('div', {
        style: { padding: '20px', backgroundColor: '#ffebee', color: '#c62828', fontFamily: 'monospace' }
      }, [
        React.createElement('h2', { key: 'title' }, 'Something went wrong in the React app'),
        React.createElement('pre', { key: 'error', style: { fontSize: '12px', overflow: 'auto' } }, 
          this.state.error?.stack || 'Unknown error'
        )
      ]);
    }

    return this.props.children;
  }
}

console.log('🚀 main-ui.tsx executing...');

// Get the root element
const container = document.getElementById('root');
if (!container) {
  console.error('❌ Root element not found');
  throw new Error('Root element not found');
}

console.log('✅ Root element found, creating React root...');

// Create root and render the app
const root = createRoot(container);

console.log('📦 Rendering App component...');

root.render(
  React.createElement(ErrorBoundary, null,
    React.createElement(App)
  )
);

console.log('✅ React render called successfully');