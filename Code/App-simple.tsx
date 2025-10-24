import * as React from 'react';
import { useState, useEffect } from 'react';
import { getIconLibrary } from './lib/cdn-icon-loader';

export default function App() {
  console.log('🎯 App component is rendering...');
  
  // Add progressive rendering with error boundaries
  try {
    console.log('📋 Starting state initialization...');
    const [lucideIconsList, setLucideIconsList] = useState<string[]>([]);
    const [isLoadingIcons, setIsLoadingIcons] = useState(true);

    // Load icons
    useEffect(() => {
      const loadIcons = async () => {
        setIsLoadingIcons(true);
        try {
          const icons = await getIconLibrary();
          setLucideIconsList(icons || []); // Ensure we always have an array
          console.log(`✅ Loaded ${icons ? icons.length : 0} icons successfully`);
        } catch (error) {
          console.error('Failed to load icons:', error);
          // Use basic fallback icons
          setLucideIconsList(['Search', 'Plus', 'Settings', 'Info', 'X']);
          console.log('Using fallback icons due to error');
        } finally {
          setIsLoadingIcons(false);
        }
      };
      
      loadIcons();
    }, []);

    console.log('🎨 About to render sophisticated UI...');
    
    console.log('🧪 Testing with basic HTML elements...');
    return (
      <div style={{ backgroundColor: '#f8f9fa', height: '100vh', padding: '20px' }}>
        <h1 style={{ fontSize: '24px', fontWeight: 'bold', marginBottom: '20px' }}>
          🚀 Figma Librarian Plugin
        </h1>
        
        <div style={{ marginBottom: '20px' }}>
          <button style={{ marginRight: '10px', padding: '8px 16px', backgroundColor: '#3b82f6', color: 'white', border: 'none', borderRadius: '4px' }}>
            Components
          </button>
          <button style={{ marginRight: '10px', padding: '8px 16px', backgroundColor: '#f3f4f6', color: '#374151', border: 'none', borderRadius: '4px' }}>
            Blocks
          </button>
          <button style={{ marginRight: '10px', padding: '8px 16px', backgroundColor: '#f3f4f6', color: '#374151', border: 'none', borderRadius: '4px' }}>
            Icons
          </button>
          <button style={{ padding: '8px 16px', backgroundColor: '#f3f4f6', color: '#374151', border: 'none', borderRadius: '4px' }}>
            Settings
          </button>
        </div>
        
        <div style={{ backgroundColor: 'white', padding: '20px', borderRadius: '8px', boxShadow: '0 1px 3px rgba(0,0,0,0.1)' }}>
          <h2 style={{ fontSize: '18px', marginBottom: '16px' }}>Components</h2>
          <p style={{ color: '#6b7280', marginBottom: '16px' }}>
            Add custom CDN or GitHub repository URLs to extend Librarian with your own component libraries,
            design system blocks, or icon sets.
          </p>
          
          <div style={{ marginBottom: '20px' }}>
            <h3 style={{ fontSize: '16px', fontWeight: '600', marginBottom: '12px' }}>Shadcn/UI</h3>
            <input 
              type="text" 
              value="https://cdn.jsdelivr.net/npm/@shadcn/ui/"
              style={{ 
                width: '100%', 
                padding: '10px', 
                border: '1px solid #d1d5db', 
                borderRadius: '4px',
                fontSize: '14px'
              }}
              readOnly
            />
          </div>
          
          <p style={{ fontSize: '14px', color: '#10b981' }}>
            Icons loaded: {lucideIconsList.length}
          </p>
        </div>
      </div>
    );
  } catch (error) {
    console.error('❌ Error in sophisticated App render:', error);
    return (
      <div style={{ padding: '20px', backgroundColor: '#ffebee', color: '#c62828', fontFamily: 'monospace' }}>
        <h2>App Render Error</h2>
        <p>Error in sophisticated App component:</p>
        <pre style={{ fontSize: '12px', overflow: 'auto', backgroundColor: '#fff', padding: '10px', borderRadius: '4px' }}>
          {error instanceof Error ? error.stack : String(error)}
        </pre>
        <button 
          onClick={() => window.location.reload()} 
          style={{ marginTop: '10px', padding: '8px 16px', backgroundColor: '#165dff', color: 'white', border: 'none', borderRadius: '4px' }}
        >
          Reload Plugin
        </button>
      </div>
    );
  }
}