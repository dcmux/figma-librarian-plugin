import * as React from 'react';
import { useState, useEffect } from 'react';
import { ChevronDown, Search, Plus, Info, RefreshCw, Settings, X, Eye, EyeOff, Lock } from 'lucide-react';
import * as LucideIcons from 'lucide-react';
import { getIconLibrary } from './lib/cdn-icon-loader';
import { componentRegistry } from './lib/component-registry';
import { tailwindComponentRegistry } from './lib/tailwind-component-registry';
import { blocksRegistry } from './lib/blocks-registry';
import { toast, Toaster } from 'sonner';

export default function App() {
  console.log('🎯 Sophisticated App component rendering...');
  
  const [activeTab, setActiveTab] = useState<'components' | 'blocks' | 'icons'>('components');
  const [showAbout, setShowAbout] = useState(false);
  const [showSettings, setShowSettings] = useState(false);
  const [repoUrl, setRepoUrl] = useState('https://cdn.jsdelivr.net/npm/@shadcn/ui/');
  const [selectedLucideIcon, setSelectedLucideIcon] = useState<string | null>(null);
  const [iconSearchTerm, setIconSearchTerm] = useState('');
  const [iconSize, setIconSize] = useState('16');
  const [iconColor, setIconColor] = useState('#000000');
  const [lucideIconsList, setLucideIconsList] = useState<string[]>([]);
  const [isLoadingIcons, setIsLoadingIcons] = useState(false);
  
  // Registry states
  const [registryStats, setRegistryStats] = useState({
    componentsCount: 0,
    tailwindCount: 0, 
    blocksCount: 0,
    isLoading: true
  });

  // Custom repo management
  const [customComponentRepos, setCustomComponentRepos] = useState<Array<{name: string, url: string}>>([]);
  const [customBlockRepos, setCustomBlockRepos] = useState<Array<{name: string, url: string}>>([]);
  const [customIconRepos, setCustomIconRepos] = useState<Array<{name: string, url: string}>>([]);
  
  // Repository visibility states
  const [hideShadcnComponents, setHideShadcnComponents] = useState(false);
  const [hideTailwindComponents, setHideTailwindComponents] = useState(false);
  const [hideSerpBlocks, setHideSerpBlocks] = useState(false);
  const [hideShadcnBlocks, setHideShadcnBlocks] = useState(false);
  const [hideLucideIcons, setHideLucideIcons] = useState(false);

  // Load registry statistics on mount
  useEffect(() => {
    console.log('📊 Loading registry statistics...');
    try {
      const stats = {
        componentsCount: componentRegistry.length,
        tailwindCount: tailwindComponentRegistry.length,
        blocksCount: blocksRegistry.length,
        isLoading: false
      };
      setRegistryStats(stats);
      console.log('📊 Registry stats loaded:', stats);
    } catch (error) {
      console.error('❌ Error loading registry stats:', error);
      setRegistryStats(prev => ({ ...prev, isLoading: false }));
    }
  }, []);

  // Load icons when Icons tab is active
  useEffect(() => {
    if (activeTab === 'icons' && lucideIconsList.length === 0 && !isLoadingIcons) {
      console.log('🔄 Loading Lucide icons...');
      setIsLoadingIcons(true);
      
      getIconLibrary()
        .then((iconLibrary) => {
          console.log('📦 Icon library loaded:', iconLibrary);
          setLucideIconsList(iconLibrary);
          toast.success(`${iconLibrary.length} icons loaded successfully!`);
        })
        .catch((error) => {
          console.error('❌ Error loading icons:', error);
          toast.error('Failed to load icons');
        })
        .finally(() => {
          setIsLoadingIcons(false);
        });
    }
  }, [activeTab, lucideIconsList.length, isLoadingIcons]);

  const handleTabChange = (tab: 'components' | 'blocks' | 'icons') => {
    setActiveTab(tab);
    if (tab === 'icons') {
      setRepoUrl('https://cdn.jsdelivr.net/npm/lucide-react');
    } else {
      setRepoUrl('https://cdn.jsdelivr.net/npm/@shadcn/ui/');
    }
  };

  console.log('🎨 Rendering sophisticated Figma Librarian UI...');

  return (
    <div style={{ 
      backgroundColor: 'white', 
      height: '100vh',
      display: 'flex', 
      flexDirection: 'column',
      fontFamily: 'Inter, -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif',
      fontSize: '14px',
      overflow: 'hidden'
    }}>
      {/* Header */}
      <div style={{ 
        padding: '20px', 
        borderBottom: '1px solid #e5e7eb',
        backgroundColor: 'white'
      }}>
        <div style={{ 
          display: 'flex', 
          alignItems: 'center', 
          justifyContent: 'space-between',
          marginBottom: '20px'
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <div style={{
              width: '32px',
              height: '32px',
              backgroundColor: '#165dff',
              borderRadius: '8px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center'
            }}>
              <span style={{ color: 'white', fontWeight: 'bold', fontSize: '16px' }}>L</span>
            </div>
            <h1 style={{ 
              margin: 0, 
              fontWeight: '600', 
              fontSize: '16px', 
              color: 'black'
            }}>
              Librarian
            </h1>
          </div>
          
          <div style={{ display: 'flex', gap: '8px' }}>
            <button 
              onClick={() => setShowAbout(!showAbout)}
              style={{
                padding: '8px',
                border: 'none',
                backgroundColor: 'transparent',
                borderRadius: '4px',
                cursor: 'pointer',
                color: '#646464'
              }}
            >
              <Info size={16} />
            </button>
            <button 
              onClick={() => setShowSettings(!showSettings)}
              style={{
                padding: '8px',
                border: 'none',
                backgroundColor: 'transparent',
                borderRadius: '4px',
                cursor: 'pointer',
                color: '#646464'
              }}
            >
              <Settings size={16} />
            </button>
          </div>
        </div>

        {/* Tabs */}
        <div style={{ display: 'flex', gap: '32px', borderBottom: '1px solid #e5e7eb' }}>
          {['components', 'blocks', 'icons'].map((tab) => (
            <button
              key={tab}
              onClick={() => handleTabChange(tab as any)}
              style={{
                padding: '8px 0',
                border: 'none',
                backgroundColor: 'transparent',
                fontSize: '12px',
                fontWeight: '500',
                textTransform: 'capitalize',
                cursor: 'pointer',
                borderBottom: activeTab === tab ? '2px solid #165dff' : '2px solid transparent',
                color: activeTab === tab ? '#165dff' : '#646464'
              }}
            >
              {tab}
            </button>
          ))}
        </div>
      </div>

      {/* About Panel */}
      {showAbout && (
        <div style={{ 
          margin: '20px', 
          padding: '20px', 
          backgroundColor: '#f8f9fa', 
          borderRadius: '8px',
          border: '1px solid #e5e7eb'
        }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '16px' }}>
            <h3 style={{ margin: 0, fontSize: '14px', fontWeight: '600' }}>About Librarian</h3>
            <button 
              onClick={() => setShowAbout(false)}
              style={{ border: 'none', backgroundColor: 'transparent', cursor: 'pointer', color: '#646464' }}
            >
              <X size={16} />
            </button>
          </div>
          <p style={{ margin: 0, lineHeight: '1.5', color: '#374151' }}>
            Librarian is a Figma plugin that syncs live GitHub component libraries, like Shadcn UI, 
            into Figma for instantly inserting and managing real, code-based design components.
          </p>
        </div>
      )}

      {/* Settings Panel */}
      {showSettings && (
        <div style={{ 
          margin: '20px', 
          padding: '20px', 
          backgroundColor: '#f8f9fa', 
          borderRadius: '8px',
          border: '1px solid #e5e7eb',
          display: 'flex',
          flexDirection: 'column',
          gap: '24px',
          flex: 1,
          overflowY: 'auto'
        }}>
          <div style={{ 
            display: 'flex', 
            alignItems: 'center', 
            justifyContent: 'space-between',
            marginBottom: '0'
          }}>
            <h3 style={{ 
              margin: 0, 
              fontSize: '20px', 
              fontWeight: '500',
              fontFamily: 'Inter, sans-serif',
              color: 'black'
            }}>
              Settings
            </h3>
            <button 
              onClick={() => setShowSettings(false)}
              style={{ 
                border: 'none', 
                backgroundColor: 'transparent', 
                cursor: 'pointer', 
                color: '#646464',
                padding: '4px'
              }}
            >
              <X size={16} />
            </button>
          </div>
          
          {/* Summary */}
          <div style={{ 
            width: '100%', 
            backgroundColor: '#f5f5f5', 
            padding: '16px', 
            borderRadius: '4px'
          }}>
            <p style={{ 
              fontFamily: 'Inter, sans-serif',
              fontSize: '12px',
              lineHeight: '18px',
              color: '#646464',
              margin: 0
            }}>
              Add custom CDN or GitHub repository URLs to extend Librarian with your own component libraries, design system blocks, or icon sets. URLs must point to valid, publicly accessible repositories.
            </p>
          </div>
          
          {/* Components Section */}
          <div style={{ width: '100%' }}>
            <div style={{ 
              display: 'flex', 
              alignItems: 'center', 
              justifyContent: 'space-between', 
              marginBottom: '8px', 
              paddingRight: '14px' 
            }}>
              <p style={{ 
                fontFamily: 'Inter, sans-serif',
                fontWeight: '600',
                fontSize: '14px',
                color: 'black',
                margin: 0
              }}>
                Components
              </p>
              <button
                onClick={() => setCustomComponentRepos([...customComponentRepos, {name: '', url: ''}])}
                style={{ 
                  border: 'none',
                  backgroundColor: 'transparent',
                  cursor: 'pointer',
                  padding: '4px',
                  color: '#999999'
                }}
                title="Add custom repository"
              >
                <Plus size={16} />
              </button>
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
              {/* Custom repos */}
              {customComponentRepos.map((repo, index) => (
                <div key={`custom-comp-${index}`} style={{ 
                  backgroundColor: 'white', 
                  height: '48px', 
                  borderRadius: '4px', 
                  border: '1px solid #d9dbe3',
                  display: 'flex',
                  alignItems: 'center',
                  padding: '0 14px',
                  gap: '8px'
                }}>
                  <input
                    type="text"
                    value={repo.name}
                    onChange={(e) => {
                      const newRepos = [...customComponentRepos];
                      newRepos[index] = {...newRepos[index], name: e.target.value};
                      setCustomComponentRepos(newRepos);
                    }}
                    placeholder="Type a name..."
                    style={{
                      width: '110px',
                      fontFamily: 'Inter, sans-serif',
                      fontWeight: '500',
                      fontSize: '12px',
                      color: 'black',
                      backgroundColor: 'transparent',
                      border: 'none',
                      outline: 'none'
                    }}
                  />
                  <div style={{ width: '1px', height: '24px', backgroundColor: '#d9dbe3' }} />
                  <input
                    type="text"
                    value={repo.url}
                    onChange={(e) => {
                      const newRepos = [...customComponentRepos];
                      newRepos[index] = {...newRepos[index], url: e.target.value};
                      setCustomComponentRepos(newRepos);
                    }}
                    placeholder="Paste a URL..."
                    style={{
                      flex: 1,
                      fontFamily: 'Inter, sans-serif',
                      fontWeight: '500',
                      fontSize: '12px',
                      color: 'black',
                      backgroundColor: 'transparent',
                      border: 'none',
                      outline: 'none'
                    }}
                  />
                  <button
                    onClick={() => {
                      const newRepos = customComponentRepos.filter((_, i) => i !== index);
                      setCustomComponentRepos(newRepos);
                    }}
                    style={{ 
                      border: 'none',
                      backgroundColor: 'transparent',
                      cursor: 'pointer',
                      padding: '2px',
                      color: '#999999'
                    }}
                  >
                    <X size={16} />
                  </button>
                </div>
              ))}
              
              {/* Default repos */}
              <div style={{ 
                backgroundColor: 'white', 
                height: '48px', 
                borderRadius: '4px', 
                border: '1px solid #d9dbe3',
                opacity: hideShadcnComponents ? 0.5 : 1,
                display: 'flex',
                alignItems: 'center',
                padding: '0 14px',
                gap: '8px'
              }}>
                <input
                  type="text"
                  value="Shadcn/UI"
                  readOnly
                  style={{
                    width: '110px',
                    fontFamily: 'Inter, sans-serif',
                    fontWeight: '500',
                    fontSize: '12px',
                    color: hideShadcnComponents ? '#999999' : 'black',
                    backgroundColor: 'transparent',
                    border: 'none',
                    outline: 'none'
                  }}
                />
                <div style={{ width: '1px', height: '24px', backgroundColor: '#d9dbe3' }} />
                <input
                  type="text"
                  value="https://cdn.jsdelivr.net/npm/@shadcn/ui/"
                  readOnly
                  style={{
                    flex: 1,
                    fontFamily: 'Inter, sans-serif',
                    fontWeight: '500',
                    fontSize: '12px',
                    color: hideShadcnComponents ? '#999999' : '#646464',
                    backgroundColor: 'transparent',
                    border: 'none',
                    outline: 'none'
                  }}
                />
                <button
                  onClick={() => setHideShadcnComponents(!hideShadcnComponents)}
                  style={{ 
                    border: 'none',
                    backgroundColor: 'transparent',
                    cursor: 'pointer',
                    padding: '2px',
                    color: '#999999'
                  }}
                  title={hideShadcnComponents ? "Show library" : "Hide library"}
                >
                  {hideShadcnComponents ? <EyeOff size={16} /> : <Eye size={16} />}
                </button>
                <div style={{ color: '#999999' }}>
                  <Lock size={16} />
                </div>
              </div>
              
              <div style={{ 
                backgroundColor: 'white', 
                height: '48px', 
                borderRadius: '4px', 
                border: '1px solid #d9dbe3',
                opacity: hideTailwindComponents ? 0.5 : 1,
                display: 'flex',
                alignItems: 'center',
                padding: '0 14px',
                gap: '8px'
              }}>
                <input
                  type="text"
                  value="Tailwind CSS"
                  readOnly
                  style={{
                    width: '110px',
                    fontFamily: 'Inter, sans-serif',
                    fontWeight: '500',
                    fontSize: '12px',
                    color: hideTailwindComponents ? '#999999' : 'black',
                    backgroundColor: 'transparent',
                    border: 'none',
                    outline: 'none'
                  }}
                />
                <div style={{ width: '1px', height: '24px', backgroundColor: '#d9dbe3' }} />
                <input
                  type="text"
                  value="https://cdn.jsdelivr.net/npm/@tailwindcss/browser@4"
                  readOnly
                  style={{
                    flex: 1,
                    fontFamily: 'Inter, sans-serif',
                    fontWeight: '500',
                    fontSize: '12px',
                    color: hideTailwindComponents ? '#999999' : '#646464',
                    backgroundColor: 'transparent',
                    border: 'none',
                    outline: 'none'
                  }}
                />
                <button
                  onClick={() => setHideTailwindComponents(!hideTailwindComponents)}
                  style={{ 
                    border: 'none',
                    backgroundColor: 'transparent',
                    cursor: 'pointer',
                    padding: '2px',
                    color: '#999999'
                  }}
                  title={hideTailwindComponents ? "Show library" : "Hide library"}
                >
                  {hideTailwindComponents ? <EyeOff size={16} /> : <Eye size={16} />}
                </button>
                <div style={{ color: '#999999' }}>
                  <Lock size={16} />
                </div>
              </div>
            </div>
          </div>

          {/* Blocks Section */}
          <div style={{ width: '100%' }}>
            <div style={{ 
              display: 'flex', 
              alignItems: 'center', 
              justifyContent: 'space-between', 
              marginBottom: '8px', 
              paddingRight: '14px' 
            }}>
              <p style={{ 
                fontFamily: 'Inter, sans-serif',
                fontWeight: '600',
                fontSize: '14px',
                color: 'black',
                margin: 0
              }}>
                Blocks
              </p>
              <button
                onClick={() => setCustomBlockRepos([...customBlockRepos, {name: '', url: ''}])}
                style={{ 
                  border: 'none',
                  backgroundColor: 'transparent',
                  cursor: 'pointer',
                  padding: '4px',
                  color: '#999999'
                }}
                title="Add custom repository"
              >
                <Plus size={16} />
              </button>
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
              {/* Custom repos */}
              {customBlockRepos.map((repo, index) => (
                <div key={`custom-block-${index}`} style={{ 
                  backgroundColor: 'white', 
                  height: '48px', 
                  borderRadius: '4px', 
                  border: '1px solid #d9dbe3',
                  display: 'flex',
                  alignItems: 'center',
                  padding: '0 14px',
                  gap: '8px'
                }}>
                  <input
                    type="text"
                    value={repo.name}
                    onChange={(e) => {
                      const newRepos = [...customBlockRepos];
                      newRepos[index] = {...newRepos[index], name: e.target.value};
                      setCustomBlockRepos(newRepos);
                    }}
                    placeholder="Type a name..."
                    style={{
                      width: '110px',
                      fontFamily: 'Inter, sans-serif',
                      fontWeight: '500',
                      fontSize: '12px',
                      color: 'black',
                      backgroundColor: 'transparent',
                      border: 'none',
                      outline: 'none'
                    }}
                  />
                  <div style={{ width: '1px', height: '24px', backgroundColor: '#d9dbe3' }} />
                  <input
                    type="text"
                    value={repo.url}
                    onChange={(e) => {
                      const newRepos = [...customBlockRepos];
                      newRepos[index] = {...newRepos[index], url: e.target.value};
                      setCustomBlockRepos(newRepos);
                    }}
                    placeholder="Paste a URL..."
                    style={{
                      flex: 1,
                      fontFamily: 'Inter, sans-serif',
                      fontWeight: '500',
                      fontSize: '12px',
                      color: 'black',
                      backgroundColor: 'transparent',
                      border: 'none',
                      outline: 'none'
                    }}
                  />
                  <button
                    onClick={() => {
                      const newRepos = customBlockRepos.filter((_, i) => i !== index);
                      setCustomBlockRepos(newRepos);
                    }}
                    style={{ 
                      border: 'none',
                      backgroundColor: 'transparent',
                      cursor: 'pointer',
                      padding: '2px',
                      color: '#999999'
                    }}
                  >
                    <X size={16} />
                  </button>
                </div>
              ))}
              
              {/* Default block repos */}
              <div style={{ 
                backgroundColor: 'white', 
                height: '48px', 
                borderRadius: '4px', 
                border: '1px solid #d9dbe3',
                opacity: hideSerpBlocks ? 0.5 : 1,
                display: 'flex',
                alignItems: 'center',
                padding: '0 14px',
                gap: '8px'
              }}>
                <input
                  type="text"
                  value="Serp.co Blocks"
                  readOnly
                  style={{
                    width: '110px',
                    fontFamily: 'Inter, sans-serif',
                    fontWeight: '500',
                    fontSize: '12px',
                    color: hideSerpBlocks ? '#999999' : 'black',
                    backgroundColor: 'transparent',
                    border: 'none',
                    outline: 'none'
                  }}
                />
                <div style={{ width: '1px', height: '24px', backgroundColor: '#d9dbe3' }} />
                <input
                  type="text"
                  value="https://blocks.serp.co/blocks/free"
                  readOnly
                  style={{
                    flex: 1,
                    fontFamily: 'Inter, sans-serif',
                    fontWeight: '500',
                    fontSize: '12px',
                    color: hideSerpBlocks ? '#999999' : '#646464',
                    backgroundColor: 'transparent',
                    border: 'none',
                    outline: 'none'
                  }}
                />
                <button
                  onClick={() => setHideSerpBlocks(!hideSerpBlocks)}
                  style={{ 
                    border: 'none',
                    backgroundColor: 'transparent',
                    cursor: 'pointer',
                    padding: '2px',
                    color: '#999999'
                  }}
                  title={hideSerpBlocks ? "Show library" : "Hide library"}
                >
                  {hideSerpBlocks ? <EyeOff size={16} /> : <Eye size={16} />}
                </button>
                <div style={{ color: '#999999' }}>
                  <Lock size={16} />
                </div>
              </div>
              
              <div style={{ 
                backgroundColor: 'white', 
                height: '48px', 
                borderRadius: '4px', 
                border: '1px solid #d9dbe3',
                opacity: hideShadcnBlocks ? 0.5 : 1,
                display: 'flex',
                alignItems: 'center',
                padding: '0 14px',
                gap: '8px'
              }}>
                <input
                  type="text"
                  value="Shadcn Studio"
                  readOnly
                  style={{
                    width: '110px',
                    fontFamily: 'Inter, sans-serif',
                    fontWeight: '500',
                    fontSize: '12px',
                    color: hideShadcnBlocks ? '#999999' : 'black',
                    backgroundColor: 'transparent',
                    border: 'none',
                    outline: 'none'
                  }}
                />
                <div style={{ width: '1px', height: '24px', backgroundColor: '#d9dbe3' }} />
                <input
                  type="text"
                  value="https://cdn.shadcnstudio.com/"
                  readOnly
                  style={{
                    flex: 1,
                    fontFamily: 'Inter, sans-serif',
                    fontWeight: '500',
                    fontSize: '12px',
                    color: hideShadcnBlocks ? '#999999' : '#646464',
                    backgroundColor: 'transparent',
                    border: 'none',
                    outline: 'none'
                  }}
                />
                <button
                  onClick={() => setHideShadcnBlocks(!hideShadcnBlocks)}
                  style={{ 
                    border: 'none',
                    backgroundColor: 'transparent',
                    cursor: 'pointer',
                    padding: '2px',
                    color: '#999999'
                  }}
                  title={hideShadcnBlocks ? "Show library" : "Hide library"}
                >
                  {hideShadcnBlocks ? <EyeOff size={16} /> : <Eye size={16} />}
                </button>
                <div style={{ color: '#999999' }}>
                  <Lock size={16} />
                </div>
              </div>
            </div>
          </div>

          {/* Icons Section */}
          <div style={{ width: '100%' }}>
            <div style={{ 
              display: 'flex', 
              alignItems: 'center', 
              justifyContent: 'space-between', 
              marginBottom: '8px', 
              paddingRight: '14px' 
            }}>
              <p style={{ 
                fontFamily: 'Inter, sans-serif',
                fontWeight: '600',
                fontSize: '14px',
                color: 'black',
                margin: 0
              }}>
                Icons
              </p>
              <button
                onClick={() => setCustomIconRepos([...customIconRepos, {name: '', url: ''}])}
                style={{ 
                  border: 'none',
                  backgroundColor: 'transparent',
                  cursor: 'pointer',
                  padding: '4px',
                  color: '#999999'
                }}
                title="Add custom repository"
              >
                <Plus size={16} />
              </button>
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
              {/* Custom repos */}
              {customIconRepos.map((repo, index) => (
                <div key={`custom-icon-${index}`} style={{ 
                  backgroundColor: 'white', 
                  height: '48px', 
                  borderRadius: '4px', 
                  border: '1px solid #d9dbe3',
                  display: 'flex',
                  alignItems: 'center',
                  padding: '0 14px',
                  gap: '8px'
                }}>
                  <input
                    type="text"
                    value={repo.name}
                    onChange={(e) => {
                      const newRepos = [...customIconRepos];
                      newRepos[index] = {...newRepos[index], name: e.target.value};
                      setCustomIconRepos(newRepos);
                    }}
                    placeholder="Type a name..."
                    style={{
                      width: '110px',
                      fontFamily: 'Inter, sans-serif',
                      fontWeight: '500',
                      fontSize: '12px',
                      color: 'black',
                      backgroundColor: 'transparent',
                      border: 'none',
                      outline: 'none'
                    }}
                  />
                  <div style={{ width: '1px', height: '24px', backgroundColor: '#d9dbe3' }} />
                  <input
                    type="text"
                    value={repo.url}
                    onChange={(e) => {
                      const newRepos = [...customIconRepos];
                      newRepos[index] = {...newRepos[index], url: e.target.value};
                      setCustomIconRepos(newRepos);
                    }}
                    placeholder="Paste a URL..."
                    style={{
                      flex: 1,
                      fontFamily: 'Inter, sans-serif',
                      fontWeight: '500',
                      fontSize: '12px',
                      color: 'black',
                      backgroundColor: 'transparent',
                      border: 'none',
                      outline: 'none'
                    }}
                  />
                  <button
                    onClick={() => {
                      const newRepos = customIconRepos.filter((_, i) => i !== index);
                      setCustomIconRepos(newRepos);
                    }}
                    style={{ 
                      border: 'none',
                      backgroundColor: 'transparent',
                      cursor: 'pointer',
                      padding: '2px',
                      color: '#999999'
                    }}
                  >
                    <X size={16} />
                  </button>
                </div>
              ))}
              
              {/* Default icon repo */}
              <div style={{ 
                backgroundColor: 'white', 
                height: '48px', 
                borderRadius: '4px', 
                border: '1px solid #d9dbe3',
                opacity: hideLucideIcons ? 0.5 : 1,
                display: 'flex',
                alignItems: 'center',
                padding: '0 14px',
                gap: '8px'
              }}>
                <input
                  type="text"
                  value="Lucide Icons"
                  readOnly
                  style={{
                    width: '110px',
                    fontFamily: 'Inter, sans-serif',
                    fontWeight: '500',
                    fontSize: '12px',
                    color: hideLucideIcons ? '#999999' : 'black',
                    backgroundColor: 'transparent',
                    border: 'none',
                    outline: 'none'
                  }}
                />
                <div style={{ width: '1px', height: '24px', backgroundColor: '#d9dbe3' }} />
                <input
                  type="text"
                  value="https://cdn.jsdelivr.net/npm/lucide-react"
                  readOnly
                  style={{
                    flex: 1,
                    fontFamily: 'Inter, sans-serif',
                    fontWeight: '500',
                    fontSize: '12px',
                    color: hideLucideIcons ? '#999999' : '#646464',
                    backgroundColor: 'transparent',
                    border: 'none',
                    outline: 'none'
                  }}
                />
                <button
                  onClick={() => setHideLucideIcons(!hideLucideIcons)}
                  style={{ 
                    border: 'none',
                    backgroundColor: 'transparent',
                    cursor: 'pointer',
                    padding: '2px',
                    color: '#999999'
                  }}
                  title={hideLucideIcons ? "Show library" : "Hide library"}
                >
                  {hideLucideIcons ? <EyeOff size={16} /> : <Eye size={16} />}
                </button>
                <div style={{ color: '#999999' }}>
                  <Lock size={16} />
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Main Content - Show when not in settings or about mode */}
      {!showSettings && !showAbout && (
        <div style={{ flex: 1, overflow: 'hidden' }}>
        {/* Components Tab */}
        {activeTab === 'components' && (
          <div style={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
            <div style={{ 
              padding: '20px', 
              borderBottom: '1px solid #e5e7eb',
              backgroundColor: '#f8f9fa'
            }}>
              <p style={{ 
                margin: '0 0 12px 0', 
                fontSize: '12px', 
                color: '#646464' 
              }}>
                Add custom CDN or GitHub repository URLs
              </p>
              <div style={{
                display: 'flex',
                alignItems: 'center',
                backgroundColor: 'white',
                border: '1px solid #d1d5db',
                borderRadius: '4px',
                padding: '0 12px',
                height: '40px'
              }}>
                <Search size={16} style={{ color: '#9ca3af', marginRight: '8px' }} />
                <input
                  type="text"
                  value={repoUrl}
                  onChange={(e) => setRepoUrl(e.target.value)}
                  placeholder="Enter CDN or GitHub URL..."
                  style={{
                    flex: 1,
                    border: 'none',
                    outline: 'none',
                    fontSize: '14px',
                    backgroundColor: 'transparent'
                  }}
                />
              </div>
            </div>
            <div style={{ 
              flex: 1, 
              display: 'flex', 
              alignItems: 'center', 
              justifyContent: 'center',
              color: '#9ca3af'
            }}>
              <p>Component library coming soon</p>
            </div>
          </div>
        )}

        {/* Blocks Tab */}
        {activeTab === 'blocks' && (
          <div style={{ 
            height: '100%', 
            display: 'flex', 
            alignItems: 'center', 
            justifyContent: 'center',
            color: '#9ca3af'
          }}>
            <p>Blocks feature coming soon</p>
          </div>
        )}

        {/* Icons Tab */}
        {activeTab === 'icons' && (
          <div style={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
            {/* Search */}
            <div style={{ 
              padding: '20px', 
              borderBottom: '1px solid #e5e7eb',
              backgroundColor: '#f8f9fa'
            }}>
              <p style={{ 
                margin: '0 0 12px 0', 
                fontSize: '12px', 
                color: '#646464' 
              }}>
                Search and insert Lucide icons
              </p>
              <div style={{
                display: 'flex',
                alignItems: 'center',
                backgroundColor: 'white',
                border: '1px solid #d1d5db',
                borderRadius: '4px',
                padding: '0 12px',
                height: '40px'
              }}>
                <Search size={16} style={{ color: '#9ca3af', marginRight: '8px' }} />
                <input
                  type="text"
                  value={iconSearchTerm}
                  onChange={(e) => setIconSearchTerm(e.target.value)}
                  placeholder="Search icons..."
                  style={{
                    flex: 1,
                    border: 'none',
                    outline: 'none',
                    fontSize: '14px',
                    backgroundColor: 'transparent'
                  }}
                />
              </div>
            </div>

            {/* Icon Grid */}
            <div style={{ 
              flex: 1, 
              padding: '20px', 
              overflow: 'auto'
            }}>
              {isLoadingIcons ? (
                <div style={{ 
                  display: 'flex', 
                  alignItems: 'center', 
                  justifyContent: 'center', 
                  height: '200px',
                  flexDirection: 'column',
                  gap: '12px'
                }}>
                  <RefreshCw size={24} style={{ color: '#646464', animation: 'spin 1s linear infinite' }} />
                  <p style={{ margin: 0, color: '#646464' }}>Loading icons...</p>
                </div>
              ) : (
                <div style={{ 
                  display: 'grid', 
                  gridTemplateColumns: 'repeat(auto-fill, minmax(60px, 1fr))', 
                  gap: '8px'
                }}>
                  {lucideIconsList
                    .filter(iconName => 
                      iconName.toLowerCase().includes(iconSearchTerm.toLowerCase())
                    )
                    .slice(0, 100)
                    .map((iconName) => {
                      const IconComponent = (LucideIcons as any)[iconName];
                      return (
                        <button
                          key={iconName}
                          onClick={() => setSelectedLucideIcon(iconName)}
                          style={{
                            aspectRatio: '1',
                            padding: '12px',
                            border: selectedLucideIcon === iconName ? '2px solid #165dff' : '1px solid #e5e7eb',
                            borderRadius: '4px',
                            backgroundColor: selectedLucideIcon === iconName ? '#f0f7ff' : 'white',
                            cursor: 'pointer',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            transition: 'all 0.2s'
                          }}
                          title={iconName}
                        >
                          {IconComponent && <IconComponent size={24} style={{ color: 'black' }} />}
                        </button>
                      );
                    })}
                </div>
              )}
            </div>

            {/* Icon Controls */}
            {selectedLucideIcon && (
              <div style={{ 
                padding: '20px', 
                borderTop: '1px solid #e5e7eb',
                backgroundColor: '#f8f9fa',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between'
              }}>
                <div style={{ display: 'flex', gap: '16px', alignItems: 'center' }}>
                  <div>
                    <label style={{ 
                      display: 'block', 
                      fontSize: '12px', 
                      color: '#646464', 
                      marginBottom: '4px' 
                    }}>
                      Size
                    </label>
                    <input
                      type="number"
                      value={iconSize}
                      onChange={(e) => setIconSize(e.target.value)}
                      min="8"
                      max="128"
                      style={{
                        width: '80px',
                        height: '32px',
                        padding: '0 8px',
                        border: '1px solid #d1d5db',
                        borderRadius: '4px',
                        fontSize: '13px'
                      }}
                    />
                  </div>
                  
                  <div>
                    <label style={{ 
                      display: 'block', 
                      fontSize: '12px', 
                      color: '#646464', 
                      marginBottom: '4px' 
                    }}>
                      Color
                    </label>
                    <div style={{ 
                      display: 'flex', 
                      alignItems: 'center', 
                      backgroundColor: 'white',
                      border: '1px solid #d1d5db',
                      borderRadius: '4px',
                      padding: '8px',
                      gap: '8px',
                      width: '200px'
                    }}>
                      <input
                        type="color"
                        value={iconColor}
                        onChange={(e) => setIconColor(e.target.value.toUpperCase())}
                        style={{
                          width: '24px',
                          height: '24px',
                          border: '1px solid #d1d5db',
                          borderRadius: '2px',
                          cursor: 'pointer'
                        }}
                      />
                      <input
                        type="text"
                        value={iconColor.toUpperCase()}
                        onChange={(e) => setIconColor(e.target.value.toUpperCase())}
                        style={{
                          flex: 1,
                          border: 'none',
                          outline: 'none',
                          fontSize: '14px',
                          fontWeight: '500',
                          backgroundColor: 'transparent'
                        }}
                      />
                    </div>
                  </div>
                </div>

                <button 
                  onClick={() => {
                    if (!selectedLucideIcon) {
                      toast.error('Please select an icon first');
                      return;
                    }
                    parent.postMessage({
                      pluginMessage: {
                        type: 'place-icon',
                        data: {
                          iconName: selectedLucideIcon,
                          size: iconSize,
                          color: iconColor,
                        }
                      }
                    }, '*');
                    toast.success(`Icon added to canvas!`, {
                      description: selectedLucideIcon
                    });
                  }}
                  style={{
                    width: '60px',
                    height: '60px',
                    borderRadius: '50%',
                    backgroundColor: '#165dff',
                    border: 'none',
                    color: 'white',
                    cursor: 'pointer',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    boxShadow: '0 4px 12px rgba(22, 93, 255, 0.3)'
                  }}
                >
                  <Plus size={24} strokeWidth={3} />
                </button>
              </div>
            )}
          </div>
        )}
        </div>
      )}
      
      <Toaster />
    </div>
  );
}