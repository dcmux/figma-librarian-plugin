import * as React from 'react';
import * as ReactDOM from 'react-dom';
import './globals.css';

// Basic component that mimics some of the app structure but without external deps
function LibrarianApp() {
  const [searchTerm, setSearchTerm] = React.useState('');
  const [count, setCount] = React.useState(0);
  
  return React.createElement('div', {
    style: {
      padding: '20px',
      maxWidth: '600px',
      margin: '0 auto',
      fontFamily: '"Inter", -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
      backgroundColor: '#ffffff',
      color: '#000000'
    }
  }, [
    // Header
    React.createElement('div', {
      key: 'header',
      style: {
        backgroundColor: '#007ACC',
        color: 'white',
        padding: '16px',
        borderRadius: '8px',
        marginBottom: '20px'
      }
    }, [
      React.createElement('h1', { 
        key: 'title',
        style: { margin: '0', fontSize: '24px', fontWeight: '600' }
      }, '📚 Figma Librarian'),
      React.createElement('p', { 
        key: 'subtitle',
        style: { margin: '8px 0 0 0', opacity: '0.9' }
      }, 'Component Library Manager')
    ]),
    
    // Search Bar
    React.createElement('div', {
      key: 'search',
      style: {
        marginBottom: '20px',
        padding: '16px',
        border: '1px solid #e1e5e9',
        borderRadius: '8px'
      }
    }, [
      React.createElement('label', {
        key: 'label',
        style: { display: 'block', marginBottom: '8px', fontWeight: '500' }
      }, 'Search Components:'),
      React.createElement('input', {
        key: 'input',
        type: 'text',
        value: searchTerm,
        onChange: (e) => setSearchTerm(e.target.value),
        placeholder: 'Type to search components...',
        style: {
          width: '100%',
          padding: '8px 12px',
          border: '1px solid #d1d5db',
          borderRadius: '4px',
          fontSize: '14px'
        }
      })
    ]),
    
    // Content
    React.createElement('div', {
      key: 'content',
      style: {
        padding: '16px',
        border: '1px solid #e1e5e9',
        borderRadius: '8px',
        marginBottom: '20px'
      }
    }, [
      React.createElement('h3', { 
        key: 'content-title',
        style: { margin: '0 0 12px 0' }
      }, `${searchTerm ? `Results for "${searchTerm}"` : 'All Components'}`),
      
      React.createElement('div', {
        key: 'component-list',
        style: { display: 'grid', gap: '8px' }
      }, [
        ['Button', 'A clickable button component'],
        ['Input', 'Text input field'],
        ['Card', 'Container for content'],
        ['Badge', 'Small status indicator']
      ].filter(([name]) => 
        !searchTerm || name.toLowerCase().includes(searchTerm.toLowerCase())
      ).map(([name, description], index) =>
        React.createElement('div', {
          key: `component-${index}`,
          onClick: () => {
            console.log(`📦 Component clicked: ${name}`);
            alert(`🎯 You clicked on the ${name} component!\n\nDescription: ${description}\n\nIn a real plugin, this would:\n• Insert the component into your Figma design\n• Show component variants\n• Open component documentation`);
          },
          style: {
            padding: '12px',
            backgroundColor: '#f8fafc',
            borderRadius: '4px',
            border: '1px solid #e2e8f0',
            cursor: 'pointer',
            transition: 'all 0.2s ease',
            ':hover': {
              backgroundColor: '#e2e8f0',
              borderColor: '#cbd5e1',
              transform: 'translateY(-1px)'
            }
          },
          onMouseEnter: (e) => {
            e.target.style.backgroundColor = '#e2e8f0';
            e.target.style.borderColor = '#cbd5e1';
            e.target.style.transform = 'translateY(-1px)';
            e.target.style.boxShadow = '0 4px 6px -1px rgba(0, 0, 0, 0.1)';
          },
          onMouseLeave: (e) => {
            e.target.style.backgroundColor = '#f8fafc';
            e.target.style.borderColor = '#e2e8f0';
            e.target.style.transform = 'translateY(0)';
            e.target.style.boxShadow = 'none';
          }
        }, [
          React.createElement('div', {
            key: 'name',
            style: { fontWeight: '500', marginBottom: '4px', display: 'flex', alignItems: 'center' }
          }, [
            React.createElement('span', { key: 'icon', style: { marginRight: '8px' } }, '🧩'),
            name
          ]),
          React.createElement('div', {
            key: 'desc',
            style: { fontSize: '14px', color: '#64748b' }
          }, description),
          React.createElement('div', {
            key: 'hint',
            style: { 
              fontSize: '12px', 
              color: '#94a3b8',
              marginTop: '4px',
              fontStyle: 'italic'
            }
          }, 'Click to insert component')
        ])
      ))
    ]),
    
    // Test Counter
    React.createElement('div', {
      key: 'test',
      style: {
        padding: '16px',
        backgroundColor: '#f0f9ff',
        border: '1px solid #0ea5e9',
        borderRadius: '8px',
        textAlign: 'center'
      }
    }, [
      React.createElement('p', { 
        key: 'counter-text',
        style: { margin: '0 0 12px 0' }
      }, `React state test: ${count} clicks`),
      React.createElement('button', {
        key: 'counter-button',
        onClick: () => setCount(count + 1),
        style: {
          padding: '8px 16px',
          backgroundColor: '#0ea5e9',
          color: 'white',
          border: 'none',
          borderRadius: '4px',
          cursor: 'pointer',
          fontSize: '14px',
          fontWeight: '500'
        }
      }, 'Test React State'),
      React.createElement('button', {
        key: 'reset-button',
        onClick: () => {
          setCount(0);
          setSearchTerm('');
        },
        style: {
          padding: '8px 16px',
          backgroundColor: '#64748b',
          color: 'white',
          border: 'none',
          borderRadius: '4px',
          cursor: 'pointer',
          fontSize: '14px',
          fontWeight: '500',
          marginLeft: '8px'
        }
      }, 'Reset')
    ])
  ]);
}

// Render the component
const rootElement = document.getElementById('root');
if (rootElement) {
  ReactDOM.render(React.createElement(LibrarianApp), rootElement);
} else {
  console.error('Root element not found!');
}