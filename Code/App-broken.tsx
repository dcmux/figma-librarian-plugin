import * as React from 'react';
import { useState, useEffect } from 'react';
import { ChevronDown, ChevronRight, Search, Plus, Info, RefreshCw, Settings, Lock, X, Eye, EyeOff } from 'lucide-react';
import * as LucideIcons from 'lucide-react';
import svgPaths from "./imports/svg-fe0bm9lpn3";
import { 
  componentRegistry, 
  renderComponentPreview, 
  type ComponentConfig 
} from './lib/component-registry';
import { 
  tailwindComponentRegistry, 
  renderTailwindPreview, 
  type TailwindComponentConfig 
} from './lib/tailwind-component-registry';
import {
  blocksRegistry,
  renderBlockPreview,
  getBlockCategories,
  getBlocksByCategory,
  type BlockConfig
} from './lib/blocks-registry';
import { getIconLibrary, refreshIconLibrary, getCacheInfo } from './lib/cdn-icon-loader';
import { toast, Toaster } from 'sonner';

// Reusable components
function LibraryIcon() {
  return (
    <div className="bg-[#165dff] overflow-clip relative rounded-[16px] shrink-0 size-[96px]">
      <div className="absolute inset-[29.69%_32.03%_29.27%_31.25%]">
        <div className="absolute inset-[-3.81%_-4.26%]">
          <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 39 43">
            <g>
              <path d={svgPaths.p2bb3fbb0} stroke="white" strokeWidth="3" />
              <path d={svgPaths.p1a8bf00} stroke="white" strokeLinecap="square" strokeWidth="3" />
            </g>
          </svg>
        </div>
      </div>
    </div>
  );
}

function SearchIcon({ className = "size-[20px]" }: { className?: string }) {
  return (
    <div className={`relative shrink-0 ${className}`}>
      <div className="absolute inset-[-5%]">
        <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 22 22">
          <g>
            <path d="M21 21.0001L16.1778 16.1779" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" />
            <path d={svgPaths.p1dcd4d80} stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" />
          </g>
        </svg>
      </div>
    </div>
  );
}

export default function App() {
  console.log('🎯 App component is rendering...');
  
  // Add progressive rendering with error boundaries
  try {
    console.log('📋 Starting state initialization...');
  const [activeTab, setActiveTab] = useState<'components' | 'blocks' | 'icons'>('components');
  const [showAbout, setShowAbout] = useState(false);
  const [showSettings, setShowSettings] = useState(false);
  const [repoUrl, setRepoUrl] = useState(
    activeTab === 'icons' 
      ? 'https://cdn.jsdelivr.net/npm/lucide-react' 
      : 'https://cdn.jsdelivr.net/npm/@shadcn/ui/'
  );
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedComponent, setSelectedComponent] = useState<ComponentConfig | null>(null);
  const [selectedTailwindComponent, setSelectedTailwindComponent] = useState<TailwindComponentConfig | null>(null);
  const [selectedBlock, setSelectedBlock] = useState<BlockConfig | null>(null);
  const [selectedBlockVariant, setSelectedBlockVariant] = useState('');
  const [selectedVariant, setSelectedVariant] = useState('default');
  const [selectedSize, setSelectedSize] = useState('default');
  const [selectedIcon, setSelectedIcon] = useState('none');
  const [iconPosition, setIconPosition] = useState('left');
  const [componentText, setComponentText] = useState('Button');
  const [createAllVariants, setCreateAllVariants] = useState(false);
  const [selectedLucideIcon, setSelectedLucideIcon] = useState<string | null>(null);
  const [iconSearchTerm, setIconSearchTerm] = useState('');
  const [iconSize, setIconSize] = useState('16');
  const [iconColor, setIconColor] = useState('#000000');
  const [lucideIconsList, setLucideIconsList] = useState<string[]>([]);
  const [isLoadingIcons, setIsLoadingIcons] = useState(false);
  
  // Custom repo management
  const [customComponentRepos, setCustomComponentRepos] = useState<Array<{name: string, url: string}>>([]);
  const [customBlockRepos, setCustomBlockRepos] = useState<Array<{name: string, url: string}>>([]);
  const [customIconRepos, setCustomIconRepos] = useState<Array<{name: string, url: string}>>([]);
  
  // Split dropdown states
  const [componentDropdownOpen, setComponentDropdownOpen] = useState(false);
  const [componentSearchTerm, setComponentSearchTerm] = useState('');
  const [tailwindDropdownOpen, setTailwindDropdownOpen] = useState(false);
  const [tailwindSearchTerm, setTailwindSearchTerm] = useState('');
  const [blockDropdownOpen, setBlockDropdownOpen] = useState(false);
  const [blockSearchTerm, setBlockSearchTerm] = useState('');
  const [blockVariantDropdownOpen, setBlockVariantDropdownOpen] = useState(false);
  
  // Default repo visibility
  const [hideShadcnComponents, setHideShadcnComponents] = useState(false);
  const [hideTailwindComponents, setHideTailwindComponents] = useState(false);
  const [hideSerpBlocks, setHideSerpBlocks] = useState(false);
  const [hideShadcnBlocks, setHideShadcnBlocks] = useState(false);
  const [hideLucideIcons, setHideLucideIcons] = useState(false);
  
  const [expandedLibraries, setExpandedLibraries] = useState({
    shadcn: true,
    tailwind: false,
    radix: false,
    lucide: true
  });

  // Load icons from CDN on mount
  useEffect(() => {
    const loadIcons = async () => {
      setIsLoadingIcons(true);
      try {
        const icons = await getIconLibrary();
        setLucideIconsList(icons || []); // Ensure we always have an array
        console.log(`✅ Loaded ${icons ? icons.length : 0} icons successfully`);
        
        // Log cache info for debugging
        const cacheInfo = getCacheInfo();
        if (cacheInfo) {
          console.log('Icon cache info:', cacheInfo);
        }
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

  // Listen for messages from the plugin (including saved repos)
  useEffect(() => {
    const handleMessage = (event: MessageEvent) => {
      const msg = event.data.pluginMessage;
      if (!msg) return;
      
      if (msg.type === 'load-saved-repos') {
        // Load saved repositories from storage with migration
        // Helper to migrate old string format to new object format
        const migrateRepos = (repos: any[]): Array<{name: string, url: string}> => {
          if (!repos || repos.length === 0) return [];
          return repos.map(repo => {
            // If already in new format (object with name and url)
            if (typeof repo === 'object' && repo.name !== undefined && repo.url !== undefined) {
              return repo;
            }
            // Migrate from old format (string URL)
            if (typeof repo === 'string') {
              // Extract a name from the URL
              const urlParts = repo.split('/');
              const lastPart = urlParts[urlParts.length - 1] || urlParts[urlParts.length - 2] || '';
              const name = lastPart.replace(/[@\d.]/g, '').replace(/-/g, ' ').trim() || 'Custom Repository';
              return { name, url: repo };
            }
            // Fallback for unknown format
            return { name: 'Custom Repository', url: '' };
          });
        };
        
        if (msg.data.customComponentRepos) {
          setCustomComponentRepos(migrateRepos(msg.data.customComponentRepos));
        }
        if (msg.data.customBlockRepos) {
          setCustomBlockRepos(migrateRepos(msg.data.customBlockRepos));
        }
        if (msg.data.customIconRepos) {
          setCustomIconRepos(migrateRepos(msg.data.customIconRepos));
        }
        // Load visibility state
        if (msg.data.hideShadcnComponents !== undefined) {
          setHideShadcnComponents(msg.data.hideShadcnComponents);
        }
        if (msg.data.hideTailwindComponents !== undefined) {
          setHideTailwindComponents(msg.data.hideTailwindComponents);
        }
        if (msg.data.hideSerpBlocks !== undefined) {
          setHideSerpBlocks(msg.data.hideSerpBlocks);
        }
        if (msg.data.hideShadcnBlocks !== undefined) {
          setHideShadcnBlocks(msg.data.hideShadcnBlocks);
        }
        if (msg.data.hideLucideIcons !== undefined) {
          setHideLucideIcons(msg.data.hideLucideIcons);
        }
        console.log('Loaded saved repositories:', msg.data);
      }
      
      if (msg.type === 'component-placed') {
        if (msg.success) {
          toast.success(`${msg.componentName} placed on canvas`);
        } else {
          toast.error(`Failed to place component: ${msg.error}`);
        }
      }
      
      if (msg.type === 'block-placed') {
        if (msg.success) {
          toast.success('Block placed on canvas');
        } else {
          toast.error(`Failed to place block: ${msg.error}`);
        }
      }
      
      if (msg.type === 'icon-placed') {
        if (msg.success) {
          toast.success(`${msg.iconName} icon placed on canvas`);
        } else {
          toast.error(`Failed to place icon: ${msg.error}`);
        }
      }
    };
    
    window.addEventListener('message', handleMessage);
    return () => window.removeEventListener('message', handleMessage);
  }, []);

  // Close dropdowns when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const target = event.target as HTMLElement;
      
      // Check if click is outside all dropdowns
      if (!target.closest('.component-dropdown-container')) {
        setComponentDropdownOpen(false);
      }
      if (!target.closest('.tailwind-dropdown-container')) {
        setTailwindDropdownOpen(false);
      }
      if (!target.closest('.block-dropdown-container')) {
        setBlockDropdownOpen(false);
      }
      if (!target.closest('.variant-dropdown-container')) {
        setBlockVariantDropdownOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Close variant dropdown when selected block changes
  useEffect(() => {
    setBlockVariantDropdownOpen(false);
  }, [selectedBlock]);
  
  // Save repositories and visibility state whenever they change
  useEffect(() => {
    parent.postMessage({
      pluginMessage: {
        type: 'save-repos',
        data: {
          customComponentRepos,
          customBlockRepos,
          customIconRepos,
          hideShadcnComponents,
          hideTailwindComponents,
          hideSerpBlocks,
          hideShadcnBlocks,
          hideLucideIcons
        }
      }
    }, '*');
  }, [customComponentRepos, customBlockRepos, customIconRepos, hideShadcnComponents, hideTailwindComponents, hideSerpBlocks, hideShadcnBlocks, hideLucideIcons]);

  // Update repo URL when tab changes
  const handleTabChange = (tab: 'components' | 'blocks' | 'icons') => {
    setActiveTab(tab);
    setShowAbout(false); // Hide About and Settings pages when switching tabs
    setShowSettings(false);
    
    // Update expanded libraries based on tab
    if (tab === 'icons') {
      setRepoUrl('https://cdn.jsdelivr.net/npm/lucide-react');
      setExpandedLibraries({
        shadcn: false,
        tailwind: false,
        radix: false,
        lucide: true
      });
    } else if (tab === 'blocks') {
      setRepoUrl('https://cdn.jsdelivr.net/npm/@shadcn/ui/');
      setExpandedLibraries({
        shadcn: true,
        tailwind: false,
        radix: false,
        lucide: false
      });
    } else {
      // components tab
      setRepoUrl('https://cdn.jsdelivr.net/npm/@shadcn/ui/');
      setExpandedLibraries({
        shadcn: true,
        tailwind: false,
        radix: false,
        lucide: false
      });
    }
  };

  // Auto-expand when only one repo is visible in current tab
  useEffect(() => {
    let visibleRepos: string[] = [];
    
    if (activeTab === 'components') {
      if (!hideShadcnComponents) visibleRepos.push('shadcn');
      if (!hideTailwindComponents) visibleRepos.push('tailwind');
      const customCount = customComponentRepos.filter(repo => repo.url.trim() !== '').length;
      for (let i = 0; i < customCount; i++) {
        visibleRepos.push(`custom-component-${i}`);
      }
    } else if (activeTab === 'blocks') {
      if (!hideShadcnBlocks) visibleRepos.push('shadcn');
      const customCount = customBlockRepos.filter(repo => repo.url.trim() !== '').length;
      for (let i = 0; i < customCount; i++) {
        visibleRepos.push(`custom-block-${i}`);
      }
    } else if (activeTab === 'icons') {
      if (!hideLucideIcons) visibleRepos.push('lucide');
      const customCount = customIconRepos.filter(repo => repo.url.trim() !== '').length;
      for (let i = 0; i < customCount; i++) {
        visibleRepos.push(`custom-icon-${i}`);
      }
    }
    
    // If only one repo is visible, auto-expand it
    if (visibleRepos.length === 1) {
      const repoToExpand = visibleRepos[0];
      if (repoToExpand === 'shadcn' || repoToExpand === 'tailwind' || repoToExpand === 'lucide') {
        setExpandedLibraries(prev => ({
          ...prev,
          [repoToExpand]: true
        }));
      }
    }
  }, [activeTab, hideShadcnComponents, hideTailwindComponents, hideShadcnBlocks, hideLucideIcons, customComponentRepos, customBlockRepos, customIconRepos]);

  const toggleLibrary = (lib: keyof typeof expandedLibraries) => {
    setExpandedLibraries(prev => {
      // If clicking the currently open library, close it
      if (prev[lib]) {
        return { ...prev, [lib]: false };
      }
      // Otherwise, close all others and open this one
      return {
        shadcn: false,
        tailwind: false,
        radix: false,
        lucide: false,
        [lib]: true
      };
    });
  };

  // Filter components based on search
  const filteredComponents = componentRegistry.filter(comp =>
    comp.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    comp.description.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Handle component selection
  const handleComponentSelect = (comp: ComponentConfig) => {
    setSelectedComponent(comp);
    setComponentText(comp.name);
    // Reset to defaults
    setSelectedVariant(comp.variants?.[0]?.value || 'default');
    setSelectedSize(comp.sizes?.[0]?.value || 'default');
    setSelectedIcon('none');
    setIconPosition('left');
  };

  // Handle component placement
  const handlePlaceComponent = () => {
    if (!selectedComponent) {
      toast.error('Please select a component first');
      return;
    }

    // Send message to plugin backend
    parent.postMessage({
      pluginMessage: {
        type: 'place-component',
        data: {
          componentName: selectedComponent.name,
          variant: selectedVariant,
          size: selectedSize,
          icon: selectedIcon,
          iconPosition: iconPosition,
          text: componentText,
          createAllVariants: createAllVariants,
          variants: createAllVariants ? selectedComponent.variants : undefined,
        }
      }
    }, '*');

    if (createAllVariants) {
      toast.success('All variants created on canvas!', {
        description: `${selectedComponent.name} - ${selectedComponent.variants?.length || 0} variants`,
      });
    } else {
      const details = [];
      if (selectedComponent.variants) details.push(`variant: ${selectedVariant}`);
      if (selectedComponent.sizes) details.push(`size: ${selectedSize}`);
      if (selectedComponent.hasIcon && selectedIcon !== 'none') {
        details.push(`icon: ${selectedIcon} (${iconPosition})`);
      }

      toast.success(`Component placed on canvas!`, {
        description: `${selectedComponent.name} ${details.length > 0 ? '- ' + details.join(', ') : ''}`,
      });
    }
  };

  // Handle block placement
  const handlePlaceBlock = () => {
    if (!selectedBlock) {
      toast.error('Please select a block first');
      return;
    }

    // Send message to plugin backend
    parent.postMessage({
      pluginMessage: {
        type: 'place-block',
        data: {
          blockId: selectedBlock.id,
          blockName: selectedBlock.name,
        }
      }
    }, '*');

    toast.success('Block added to canvas!', {
      description: selectedBlock.name,
    });
  };

  const variants = ['Default', 'Outline', 'Ghost', 'Link'];
  const sizes = ['Small', 'Default', 'Large'];
  const icons = ['None', 'Lucide-Search', 'Lucide-Plus', 'Lucide-Settings'];
  const positions = ['Left', 'Right', 'None'];

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
            <LibraryIcon />
            <p className="font-['Inter:Semi_Bold',_sans-serif] font-semibold leading-[24px] not-italic text-[14px] text-black">
              <span>Librarian </span>
              <span className="font-['Inter:Regular',_sans-serif] font-normal">
                is a Figma plugin that syncs live GitHub component libraries, like Shadcn UI, into Figma for instantly inserting and managing real, code-based design components.
              </span>
            </p>
          </div>

          {/* Tabs */}
          <div className="content-stretch flex items-start justify-between mb-[40px]">
            <div className="content-stretch flex gap-[37px] items-start">
              <div className="content-stretch flex flex-col gap-[8px] items-start">
                <button 
                  onClick={() => handleTabChange('components')}
                  className={`font-['Inter:Medium',_sans-serif] font-medium leading-[normal] text-[14px] ${
                    activeTab === 'components' && !showAbout && !showSettings ? 'text-black' : 'text-gray-400'
                  }`}
                >
                  Components
                </button>
                {activeTab === 'components' && !showAbout && !showSettings && (
                  <div className="bg-[#0088ff] h-[3px] w-full" />
                )}
              </div>
              
              <div className="content-stretch flex flex-col gap-[8px] items-start">
                <button 
                  onClick={() => handleTabChange('blocks')}
                  className={`font-['Inter:Medium',_sans-serif] font-medium leading-[normal] text-[14px] ${
                    activeTab === 'blocks' && !showAbout && !showSettings ? 'text-black' : 'text-gray-400'
                  }`}
                >
                  Blocks
                </button>
                {activeTab === 'blocks' && !showAbout && !showSettings && (
                  <div className="bg-[#0088ff] h-[3px] w-full" />
                )}
              </div>
              
              <div className="content-stretch flex flex-col gap-[8px] items-start">
                <button 
                  onClick={() => handleTabChange('icons')}
                  className={`font-['Inter:Medium',_sans-serif] font-medium leading-[normal] text-[14px] ${
                    activeTab === 'icons' && !showAbout && !showSettings ? 'text-black' : 'text-gray-400'
                  }`}
                >
                  Icons
                </button>
                {activeTab === 'icons' && !showAbout && !showSettings && (
                  <div className="bg-[#0088ff] h-[3px] w-full" />
                )}
              </div>
            </div>
            
            <div className="content-stretch flex gap-[12px] items-start">
              {/* Settings Icon */}
              <div className="content-stretch flex flex-col gap-[8px] items-start">
                <button 
                  onClick={() => {
                    setShowSettings(!showSettings);
                    setShowAbout(false);
                  }}
                  className="relative shrink-0 size-[24px] hover:opacity-70 transition-opacity"
                  title="Settings"
                >
                  <Settings className="size-full text-[#646464]" />
                </button>
                {showSettings && (
                  <div className="bg-[#0088ff] h-[3px] w-full" />
                )}
              </div>
              
              {/* About Icon */}
              <div className="content-stretch flex flex-col gap-[8px] items-start">
                <button 
                  onClick={() => {
                    setShowAbout(!showAbout);
                    setShowSettings(false);
                  }}
                  className="relative shrink-0 size-[24px] hover:opacity-70 transition-opacity"
                  title="About Librarian"
                >
                  <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 24 24">
                    <path d={svgPaths.p1d519b00} fill="#0088FF" />
                  </svg>
                </button>
                {showAbout && (
                  <div className="bg-[#0088ff] h-[3px] w-full" />
                )}
              </div>
            </div>
          </div>

          {/* Settings Tab Content */}
          {showSettings && (
            <div className="content-stretch flex flex-col gap-[24px] items-start mb-[40px]">
              <p className="font-['Inter:Medium',_sans-serif] font-medium leading-[normal] text-[20px] text-black w-full">
                Settings
              </p>
              
              {/* Summary */}
              <div className="w-full bg-gray-100 p-4 rounded-[4px]">
                <p className="font-['Inter:Regular',_sans-serif] text-[12px] leading-[18px] text-[#646464]">
                  Add custom CDN or GitHub repository URLs to extend Librarian with your own component libraries, design system blocks, or icon sets. URLs must point to valid, publicly accessible repositories.
                </p>
              </div>
              
              {/* Components Section */}
              <div className="w-full">
                <div className="flex items-center justify-between mb-[8px] pr-[14px]">
                  <p className="font-['Inter:Semi_Bold',_sans-serif] font-semibold leading-[normal] text-[14px] text-black">
                    Components
                  </p>
                  <button
                    onClick={() => setCustomComponentRepos([...customComponentRepos, {name: '', url: ''}])}
                    className="hover:opacity-70 transition-opacity"
                    title="Add custom repository"
                  >
                    <Plus className="size-[16px] text-[#999999]" />
                  </button>
                </div>
                <div className="flex flex-col gap-[8px]">
                  {/* Custom repos appear first */}
                  {customComponentRepos.map((repo, index) => (
                    <div key={`custom-comp-${index}`} className="bg-white h-[48px] rounded-[4px] border border-[#d9dbe3]">
                      <div className="box-border flex items-center h-full px-[14px] gap-[8px]">
                        <input
                          type="text"
                          value={repo.name}
                          onChange={(e) => {
                            const newRepos = [...customComponentRepos];
                            newRepos[index] = {...newRepos[index], name: e.target.value};
                            setCustomComponentRepos(newRepos);
                          }}
                          placeholder="Type a name..."
                          className="w-[110px] font-['Inter:Medium',_sans-serif] font-medium text-[12px] text-black bg-transparent outline-none"
                        />
                        <div className="w-[1px] h-[24px] bg-[#d9dbe3]" />
                        <input
                          type="text"
                          value={repo.url}
                          onChange={(e) => {
                            const newRepos = [...customComponentRepos];
                            newRepos[index] = {...newRepos[index], url: e.target.value};
                            setCustomComponentRepos(newRepos);
                          }}
                          placeholder="Paste a URL..."
                          className="flex-1 font-['Inter:Medium',_sans-serif] font-medium text-[12px] text-black bg-transparent outline-none"
                        />
                        <button
                          onClick={() => {
                            const newRepos = customComponentRepos.filter((_, i) => i !== index);
                            setCustomComponentRepos(newRepos);
                          }}
                          className="hover:opacity-70 transition-opacity"
                        >
                          <X className="size-[16px] text-[#999999] shrink-0" />
                        </button>
                      </div>
                    </div>
                  ))}
                  {/* Default repos with lock */}
                  <div className={`bg-white h-[48px] rounded-[4px] border border-[#d9dbe3] ${hideShadcnComponents ? 'opacity-50' : ''}`}>
                    <div className="box-border flex items-center h-full px-[14px] gap-[8px]">
                      <input
                        type="text"
                        value="Shadcn/UI"
                        readOnly
                        className={`w-[110px] font-['Inter:Medium',_sans-serif] font-medium text-[12px] bg-transparent outline-none ${hideShadcnComponents ? 'text-[#999999]' : 'text-black'}`}
                      />
                      <div className="w-[1px] h-[24px] bg-[#d9dbe3]" />
                      <input
                        type="text"
                        value="https://cdn.jsdelivr.net/npm/@shadcn/ui/"
                        readOnly
                        className={`flex-1 font-['Inter:Medium',_sans-serif] font-medium text-[12px] bg-transparent outline-none ${hideShadcnComponents ? 'text-[#999999]' : 'text-[#646464]'}`}
                      />
                      <button
                        onClick={() => setHideShadcnComponents(!hideShadcnComponents)}
                        className="hover:opacity-70 transition-opacity"
                        title={hideShadcnComponents ? "Show library" : "Hide library"}
                      >
                        {hideShadcnComponents ? (
                          <EyeOff className="size-[16px] text-[#999999] shrink-0" />
                        ) : (
                          <Eye className="size-[16px] text-[#999999] shrink-0" />
                        )}
                      </button>
                      <Lock className="size-[16px] text-[#999999] shrink-0" />
                    </div>
                  </div>
                  <div className={`bg-white h-[48px] rounded-[4px] border border-[#d9dbe3] ${hideTailwindComponents ? 'opacity-50' : ''}`}>
                    <div className="box-border flex items-center h-full px-[14px] gap-[8px]">
                      <input
                        type="text"
                        value="Tailwind CSS"
                        readOnly
                        className={`w-[110px] font-['Inter:Medium',_sans-serif] font-medium text-[12px] bg-transparent outline-none ${hideTailwindComponents ? 'text-[#999999]' : 'text-black'}`}
                      />
                      <div className="w-[1px] h-[24px] bg-[#d9dbe3]" />
                      <input
                        type="text"
                        value="https://cdn.jsdelivr.net/npm/@tailwindcss/browser@4"
                        readOnly
                        className={`flex-1 font-['Inter:Medium',_sans-serif] font-medium text-[12px] bg-transparent outline-none ${hideTailwindComponents ? 'text-[#999999]' : 'text-[#646464]'}`}
                      />
                      <button
                        onClick={() => setHideTailwindComponents(!hideTailwindComponents)}
                        className="hover:opacity-70 transition-opacity"
                        title={hideTailwindComponents ? "Show library" : "Hide library"}
                      >
                        {hideTailwindComponents ? (
                          <EyeOff className="size-[16px] text-[#999999] shrink-0" />
                        ) : (
                          <Eye className="size-[16px] text-[#999999] shrink-0" />
                        )}
                      </button>
                      <Lock className="size-[16px] text-[#999999] shrink-0" />
                    </div>
                  </div>
                </div>
              </div>

              {/* Blocks Section */}
              <div className="w-full">
                <div className="flex items-center justify-between mb-[8px] pr-[14px]">
                  <p className="font-['Inter:Semi_Bold',_sans-serif] font-semibold leading-[normal] text-[14px] text-black">
                    Blocks
                  </p>
                  <button
                    onClick={() => setCustomBlockRepos([...customBlockRepos, {name: '', url: ''}])}
                    className="hover:opacity-70 transition-opacity"
                    title="Add custom repository"
                  >
                    <Plus className="size-[16px] text-[#999999]" />
                  </button>
                </div>
                <div className="flex flex-col gap-[8px]">
                  {/* Custom repos appear first */}
                  {customBlockRepos.map((repo, index) => (
                    <div key={`custom-block-${index}`} className="bg-white h-[48px] rounded-[4px] border border-[#d9dbe3]">
                      <div className="box-border flex items-center h-full px-[14px] gap-[8px]">
                        <input
                          type="text"
                          value={repo.name}
                          onChange={(e) => {
                            const newRepos = [...customBlockRepos];
                            newRepos[index] = {...newRepos[index], name: e.target.value};
                            setCustomBlockRepos(newRepos);
                          }}
                          placeholder="Type a name..."
                          className="w-[110px] font-['Inter:Medium',_sans-serif] font-medium text-[12px] text-black bg-transparent outline-none"
                        />
                        <div className="w-[1px] h-[24px] bg-[#d9dbe3]" />
                        <input
                          type="text"
                          value={repo.url}
                          onChange={(e) => {
                            const newRepos = [...customBlockRepos];
                            newRepos[index] = {...newRepos[index], url: e.target.value};
                            setCustomBlockRepos(newRepos);
                          }}
                          placeholder="Paste a URL..."
                          className="flex-1 font-['Inter:Medium',_sans-serif] font-medium text-[12px] text-black bg-transparent outline-none"
                        />
                        <button
                          onClick={() => {
                            const newRepos = customBlockRepos.filter((_, i) => i !== index);
                            setCustomBlockRepos(newRepos);
                          }}
                          className="hover:opacity-70 transition-opacity"
                        >
                          <X className="size-[16px] text-[#999999] shrink-0" />
                        </button>
                      </div>
                    </div>
                  ))}
                  {/* Default repos with lock */}
                  <div className={`bg-white h-[48px] rounded-[4px] border border-[#d9dbe3] ${hideSerpBlocks ? 'opacity-50' : ''}`}>
                    <div className="box-border flex items-center h-full px-[14px] gap-[8px]">
                      <input
                        type="text"
                        value="Serp.co Blocks"
                        readOnly
                        className={`w-[110px] font-['Inter:Medium',_sans-serif] font-medium text-[12px] bg-transparent outline-none ${hideSerpBlocks ? 'text-[#999999]' : 'text-black'}`}
                      />
                      <div className="w-[1px] h-[24px] bg-[#d9dbe3]" />
                      <input
                        type="text"
                        value="https://blocks.serp.co/blocks/free"
                        readOnly
                        className={`flex-1 font-['Inter:Medium',_sans-serif] font-medium text-[12px] bg-transparent outline-none ${hideSerpBlocks ? 'text-[#999999]' : 'text-[#646464]'}`}
                      />
                      <button
                        onClick={() => setHideSerpBlocks(!hideSerpBlocks)}
                        className="hover:opacity-70 transition-opacity"
                        title={hideSerpBlocks ? "Show library" : "Hide library"}
                      >
                        {hideSerpBlocks ? (
                          <EyeOff className="size-[16px] text-[#999999] shrink-0" />
                        ) : (
                          <Eye className="size-[16px] text-[#999999] shrink-0" />
                        )}
                      </button>
                      <Lock className="size-[16px] text-[#999999] shrink-0" />
                    </div>
                  </div>
                  <div className={`bg-white h-[48px] rounded-[4px] border border-[#d9dbe3] ${hideShadcnBlocks ? 'opacity-50' : ''}`}>
                    <div className="box-border flex items-center h-full px-[14px] gap-[8px]">
                      <input
                        type="text"
                        value="Shadcn Studio"
                        readOnly
                        className={`w-[110px] font-['Inter:Medium',_sans-serif] font-medium text-[12px] bg-transparent outline-none ${hideShadcnBlocks ? 'text-[#999999]' : 'text-black'}`}
                      />
                      <div className="w-[1px] h-[24px] bg-[#d9dbe3]" />
                      <input
                        type="text"
                        value="https://cdn.shadcnstudio.com/"
                        readOnly
                        className={`flex-1 font-['Inter:Medium',_sans-serif] font-medium text-[12px] bg-transparent outline-none ${hideShadcnBlocks ? 'text-[#999999]' : 'text-[#646464]'}`}
                      />
                      <button
                        onClick={() => setHideShadcnBlocks(!hideShadcnBlocks)}
                        className="hover:opacity-70 transition-opacity"
                        title={hideShadcnBlocks ? "Show library" : "Hide library"}
                      >
                        {hideShadcnBlocks ? (
                          <EyeOff className="size-[16px] text-[#999999] shrink-0" />
                        ) : (
                          <Eye className="size-[16px] text-[#999999] shrink-0" />
                        )}
                      </button>
                      <Lock className="size-[16px] text-[#999999] shrink-0" />
                    </div>
                  </div>
                </div>
              </div>

              {/* Icons Section */}
              <div className="w-full">
                <div className="flex items-center justify-between mb-[8px] pr-[14px]">
                  <p className="font-['Inter:Semi_Bold',_sans-serif] font-semibold leading-[normal] text-[14px] text-black">
                    Icons
                  </p>
                  <button
                    onClick={() => setCustomIconRepos([...customIconRepos, {name: '', url: ''}])}
                    className="hover:opacity-70 transition-opacity"
                    title="Add custom repository"
                  >
                    <Plus className="size-[16px] text-[#999999]" />
                  </button>
                </div>
                <div className="flex flex-col gap-[8px]">
                  {/* Custom repos appear first */}
                  {customIconRepos.map((repo, index) => (
                    <div key={`custom-icon-${index}`} className="bg-white h-[48px] rounded-[4px] border border-[#d9dbe3]">
                      <div className="box-border flex items-center h-full px-[14px] gap-[8px]">
                        <input
                          type="text"
                          value={repo.name}
                          onChange={(e) => {
                            const newRepos = [...customIconRepos];
                            newRepos[index] = {...newRepos[index], name: e.target.value};
                            setCustomIconRepos(newRepos);
                          }}
                          placeholder="Type a name..."
                          className="w-[110px] font-['Inter:Medium',_sans-serif] font-medium text-[12px] text-black bg-transparent outline-none"
                        />
                        <div className="w-[1px] h-[24px] bg-[#d9dbe3]" />
                        <input
                          type="text"
                          value={repo.url}
                          onChange={(e) => {
                            const newRepos = [...customIconRepos];
                            newRepos[index] = {...newRepos[index], url: e.target.value};
                            setCustomIconRepos(newRepos);
                          }}
                          placeholder="Paste a URL..."
                          className="flex-1 font-['Inter:Medium',_sans-serif] font-medium text-[12px] text-black bg-transparent outline-none"
                        />
                        <button
                          onClick={() => {
                            const newRepos = customIconRepos.filter((_, i) => i !== index);
                            setCustomIconRepos(newRepos);
                          }}
                          className="hover:opacity-70 transition-opacity"
                        >
                          <X className="size-[16px] text-[#999999] shrink-0" />
                        </button>
                      </div>
                    </div>
                  ))}
                  {/* Default repo with lock */}
                  <div className={`bg-white h-[48px] rounded-[4px] border border-[#d9dbe3] ${hideLucideIcons ? 'opacity-50' : ''}`}>
                    <div className="box-border flex items-center h-full px-[14px] gap-[8px]">
                      <input
                        type="text"
                        value="Lucide Icons"
                        readOnly
                        className={`w-[110px] font-['Inter:Medium',_sans-serif] font-medium text-[12px] bg-transparent outline-none ${hideLucideIcons ? 'text-[#999999]' : 'text-black'}`}
                      />
                      <div className="w-[1px] h-[24px] bg-[#d9dbe3]" />
                      <input
                        type="text"
                        value="https://cdn.jsdelivr.net/npm/lucide-react"
                        readOnly
                        className={`flex-1 font-['Inter:Medium',_sans-serif] font-medium text-[12px] bg-transparent outline-none ${hideLucideIcons ? 'text-[#999999]' : 'text-[#646464]'}`}
                      />
                      <button
                        onClick={() => setHideLucideIcons(!hideLucideIcons)}
                        className="hover:opacity-70 transition-opacity"
                        title={hideLucideIcons ? "Show library" : "Hide library"}
                      >
                        {hideLucideIcons ? (
                          <EyeOff className="size-[16px] text-[#999999] shrink-0" />
                        ) : (
                          <Eye className="size-[16px] text-[#999999] shrink-0" />
                        )}
                      </button>
                      <Lock className="size-[16px] text-[#999999] shrink-0" />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Components Tab Content */}
          {activeTab === 'components' && !showAbout && !showSettings && (
            <>
              {/* Custom Component Repos */}
              {customComponentRepos.filter(repo => repo.url.trim() !== '').map((repo, index) => (
                <div key={`custom-comp-lib-${index}`} className="mb-[40px]">
                  <button 
                    className="content-stretch flex items-center justify-between w-full mb-[8px] cursor-default"
                  >
                    <div className="content-stretch flex gap-[8px] items-center">
                      <ChevronRight className="size-[16px] text-[#646464] opacity-30" />
                      <p className="font-['Inter:Semi_Bold',_sans-serif] font-semibold leading-[normal] text-[14px] text-black">
                        {repo.name || 'Custom Repository'}
                      </p>
                    </div>
                    <p className="font-['Inter:Medium',_sans-serif] font-medium leading-[normal] text-[14px] text-[#999999]">
                      Coming soon
                    </p>
                  </button>
                  <div className="bg-gray-50 rounded-[4px] border border-[#d9dbe3] p-4">
                    <p className="font-['Inter:Regular',_sans-serif] text-[12px] text-[#646464] text-center">
                      Custom repository integration coming soon. Components from this repo will appear here.
                    </p>
                  </div>
                </div>
              ))}
              
              {/* Shadcn/ui Library Section */}
              {!hideShadcnComponents && (
              <div className="mb-[40px]">
                <button 
                  onClick={() => toggleLibrary('shadcn')}
                  className="content-stretch flex items-center justify-between w-full mb-[8px] pr-[14px]"
                >
                  <div className="content-stretch flex gap-[8px] items-center">
                    {expandedLibraries.shadcn ? (
                      <ChevronDown className="size-[16px] text-[#646464]" />
                    ) : (
                      <ChevronRight className="size-[16px] text-[#646464]" />
                    )}
                    <p className="font-['Inter:Semi_Bold',_sans-serif] font-semibold leading-[normal] text-[14px] text-black">
                      Shadcn/ui
                    </p>
                  </div>
                  <p className="font-['Inter:Medium',_sans-serif] font-medium leading-[normal] text-[14px] text-black">
                    {componentRegistry.length} found
                  </p>
                </button>

                {expandedLibraries.shadcn && (
                  <div className="content-stretch flex flex-col gap-[16px]">
                    {/* Component Selector */}
                    <div className="component-dropdown-container relative bg-white rounded-[4px] border border-[#d9dbe3]">
                      <div className="box-border flex items-center h-[48px]">
                        <div className="flex items-center flex-1 px-[14px] gap-[10px]">
                          <Search className="size-[16px] text-[#646464]" />
                          <input
                            type="text"
                            value={componentSearchTerm || selectedComponent?.name || ''}
                            onChange={(e) => {
                              setComponentSearchTerm(e.target.value);
                              setComponentDropdownOpen(true);
                            }}
                            onFocus={() => setComponentDropdownOpen(true)}
                            placeholder="Select a component..."
                            className="flex-1 font-['Inter:Medium',_sans-serif] font-medium text-[14px] text-black bg-transparent outline-none placeholder:text-[#646464]"
                          />
                        </div>
                        <button
                          onClick={() => setComponentDropdownOpen(!componentDropdownOpen)}
                          className="h-full px-[14px] border-l border-[#d9dbe3] hover:bg-gray-50 transition-colors"
                        >
                          <ChevronDown className={`size-[16px] text-[#646464] transition-transform ${componentDropdownOpen ? 'rotate-180' : ''}`} />
                        </button>
                      </div>
                      
                      {/* Dropdown List */}
                      {componentDropdownOpen && (
                        <div className="absolute top-full left-0 right-0 mt-1 bg-white border border-[#d9dbe3] rounded-[4px] shadow-lg max-h-[300px] overflow-y-auto z-50">
                          {[...componentRegistry]
                            .sort((a, b) => a.name.localeCompare(b.name))
                            .filter(comp => comp.name.toLowerCase().includes(componentSearchTerm.toLowerCase()))
                            .map(comp => (
                              <button
                                key={comp.name}
                                onClick={() => {
                                  handleComponentSelect(comp);
                                  setComponentSearchTerm('');
                                  setComponentDropdownOpen(false);
                                }}
                                className="w-full text-left px-[14px] py-[10px] hover:bg-gray-100 font-['Inter:Medium',_sans-serif] font-medium text-[14px] text-[#646464] transition-colors"
                              >
                                {comp.name}
                              </button>
                            ))}
                        </div>
                      )}
                    </div>

                    {/* Preview Area */}
                    <div className="bg-white min-h-[194px] rounded-[4px] flex items-center justify-center p-4">
                      {selectedComponent ? (
                        renderComponentPreview(
                          selectedComponent.name,
                          selectedVariant,
                          selectedSize,
                          selectedIcon,
                          iconPosition,
                          componentText
                        )
                      ) : (
                        <p className="font-['Inter:Regular',_sans-serif] text-[14px] text-[#646464]">
                          Select a component to preview
                        </p>
                      )}
                    </div>

                    {/* Dynamic Controls - Only show if component is selected */}
                    {selectedComponent && (
                      <>
                        {/* Variant and Size Controls - Only show if component has these options */}
                        {(selectedComponent.variants || selectedComponent.sizes) && (
                          <div className="content-stretch flex gap-[8px] items-center w-full">
                            {/* Variant */}
                            {selectedComponent.variants && (
                              <div className="flex-1 content-stretch flex flex-col gap-[8px]">
                                <p className="font-['Inter:Medium',_sans-serif] font-medium leading-[normal] text-[16px] text-black">
                                  Variant
                                </p>
                                <div className="bg-white h-[48px] rounded-[4px] border border-[#d9dbe3]">
                                  <select
                                    value={selectedVariant}
                                    onChange={(e) => setSelectedVariant(e.target.value)}
                                    className="w-full h-full px-[14px] font-['Inter:Medium',_sans-serif] font-medium text-[14px] text-[#646464] bg-transparent outline-none cursor-pointer"
                                  >
                                    {selectedComponent.variants.map(v => (
                                      <option key={v.value} value={v.value}>{v.label}</option>
                                    ))}
                                  </select>
                                </div>
                              </div>
                            )}

                            {/* Size */}
                            {selectedComponent.sizes && (
                              <div className="flex-1 content-stretch flex flex-col gap-[8px]">
                                <p className="font-['Inter:Medium',_sans-serif] font-medium leading-[normal] text-[16px] text-black">
                                  Size
                                </p>
                                <div className="bg-white h-[48px] rounded-[4px] border border-[#d9dbe3]">
                                  <select
                                    value={selectedSize}
                                    onChange={(e) => setSelectedSize(e.target.value)}
                                    className="w-full h-full px-[14px] font-['Inter:Medium',_sans-serif] font-medium text-[14px] text-[#646464] bg-transparent outline-none cursor-pointer"
                                  >
                                    {selectedComponent.sizes.map(s => (
                                      <option key={s.value} value={s.value}>{s.label}</option>
                                    ))}
                                  </select>
                                </div>
                              </div>
                            )}
                          </div>
                        )}

                        {/* Icon Controls - Only show if component supports icons */}
                        {selectedComponent.hasIcon && selectedComponent.icons && (
                          <div className="content-stretch flex flex-col gap-[8px] w-full">
                            <p className="font-['Inter:Medium',_sans-serif] font-medium leading-[normal] text-[16px] text-black">
                              Icon
                            </p>
                            <div className="content-stretch flex gap-[8px]">
                              {/* Icon Selector */}
                              <div className="flex-1 bg-white h-[48px] rounded-[4px] border border-[#d9dbe3]">
                                <div className="flex items-center h-full px-[14px] gap-[8px]">
                                  <SearchIcon className="size-[20px] text-[#646464]" />
                                  <select
                                    value={selectedIcon}
                                    onChange={(e) => setSelectedIcon(e.target.value)}
                                    className="flex-1 font-['Inter:Medium',_sans-serif] font-medium text-[14px] text-[#646464] bg-transparent outline-none cursor-pointer"
                                  >
                                    {selectedComponent.icons.map(i => (
                                      <option key={i.value} value={i.value}>{i.label}</option>
                                    ))}
                                  </select>
                                </div>
                              </div>

                              {/* Position Selector - Only show if component has icon position */}
                              {selectedComponent.iconPosition && selectedIcon !== 'none' && (
                                <div className="flex-1 bg-white h-[48px] rounded-[4px] border border-[#d9dbe3]">
                                  <select
                                    value={iconPosition}
                                    onChange={(e) => setIconPosition(e.target.value)}
                                    className="w-full h-full px-[14px] font-['Inter:Medium',_sans-serif] font-medium text-[14px] text-[#646464] bg-transparent outline-none cursor-pointer"
                                  >
                                    {selectedComponent.iconPosition.map(p => (
                                      <option key={p.value} value={p.value}>{p.label}</option>
                                    ))}
                                  </select>
                                </div>
                              )}
                            </div>
                          </div>
                        )}
                      </>
                    )}
                  </div>
                )}
              </div>
              )}

              {/* Tailwind CSS Library */}
              {!hideTailwindComponents && (
              <div className="mb-[40px]">
              <button 
                onClick={() => toggleLibrary('tailwind')}
                className="content-stretch flex items-center justify-between w-full mb-[8px] pr-[14px]"
              >
                <div className="content-stretch flex gap-[8px] items-center">
                  {expandedLibraries.tailwind ? (
                    <ChevronDown className="size-[16px] text-[#646464]" />
                  ) : (
                    <ChevronRight className="size-[16px] text-[#646464]" />
                  )}
                  <p className="font-['Inter:Semi_Bold',_sans-serif] font-semibold leading-[normal] text-[14px] text-black">
                    Tailwind CSS
                  </p>
                </div>
                <p className="font-['Inter:Medium',_sans-serif] font-medium leading-[normal] text-[14px] text-black">
                  {tailwindComponentRegistry.length} found
                </p>
              </button>

              {expandedLibraries.tailwind && (
                <div className="content-stretch flex flex-col gap-[16px] mb-[40px]">
                  {/* Component Selector */}
                  <div className="tailwind-dropdown-container relative bg-white rounded-[4px] border border-[#d9dbe3]">
                    <div className="box-border flex items-center h-[48px]">
                      <div className="flex items-center flex-1 px-[14px] gap-[10px]">
                        <Search className="size-[16px] text-[#646464]" />
                        <input
                          type="text"
                          value={tailwindSearchTerm || selectedTailwindComponent?.name || ''}
                          onChange={(e) => {
                            setTailwindSearchTerm(e.target.value);
                            setTailwindDropdownOpen(true);
                          }}
                          onFocus={() => setTailwindDropdownOpen(true)}
                          placeholder="Select a component..."
                          className="flex-1 font-['Inter:Medium',_sans-serif] font-medium text-[14px] text-black bg-transparent outline-none placeholder:text-[#646464]"
                        />
                      </div>
                      <button
                        onClick={() => setTailwindDropdownOpen(!tailwindDropdownOpen)}
                        className="h-full px-[14px] border-l border-[#d9dbe3] hover:bg-gray-50 transition-colors"
                      >
                        <ChevronDown className={`size-[16px] text-[#646464] transition-transform ${tailwindDropdownOpen ? 'rotate-180' : ''}`} />
                      </button>
                    </div>
                    
                    {/* Dropdown List */}
                    {tailwindDropdownOpen && (
                      <div className="absolute top-full left-0 right-0 mt-1 bg-white border border-[#d9dbe3] rounded-[4px] shadow-lg max-h-[300px] overflow-y-auto z-50">
                        {[...tailwindComponentRegistry]
                          .sort((a, b) => a.name.localeCompare(b.name))
                          .filter(comp => comp.name.toLowerCase().includes(tailwindSearchTerm.toLowerCase()))
                          .map(comp => (
                            <button
                              key={comp.name}
                              onClick={() => {
                                setSelectedTailwindComponent(comp);
                                setSelectedVariant(comp.variants?.[0]?.value || 'default');
                                setSelectedSize(comp.sizes?.[0]?.value || 'default');
                                setTailwindSearchTerm('');
                                setTailwindDropdownOpen(false);
                              }}
                              className="w-full text-left px-[14px] py-[10px] hover:bg-gray-100 font-['Inter:Medium',_sans-serif] font-medium text-[14px] text-[#646464] transition-colors"
                            >
                              {comp.name}
                            </button>
                          ))}
                      </div>
                    )}
                  </div>

                  {/* Preview Area */}
                  <div className="bg-white min-h-[194px] rounded-[4px] flex items-center justify-center p-4">
                    {selectedTailwindComponent ? (
                      renderTailwindPreview(
                        selectedTailwindComponent.name,
                        selectedVariant,
                        selectedSize
                      )
                    ) : (
                      <p className="font-['Inter:Regular',_sans-serif] text-[14px] text-[#646464]">
                        Select a component to preview
                      </p>
                    )}
                  </div>

                  {/* Dynamic Controls - Only show if component is selected */}
                  {selectedTailwindComponent && (
                    <>
                      {/* Variant and Size Controls */}
                      {(selectedTailwindComponent.variants || selectedTailwindComponent.sizes) && (
                        <div className="content-stretch flex gap-[8px] items-center w-full">
                          {/* Variant */}
                          {selectedTailwindComponent.variants && (
                            <div className="flex-1 content-stretch flex flex-col gap-[8px]">
                              <p className="font-['Inter:Medium',_sans-serif] font-medium leading-[normal] text-[16px] text-black">
                                Variant
                              </p>
                              <div className="bg-white h-[48px] rounded-[4px] border border-[#d9dbe3]">
                                <select
                                  value={selectedVariant}
                                  onChange={(e) => setSelectedVariant(e.target.value)}
                                  className="w-full h-full px-[14px] font-['Inter:Medium',_sans-serif] font-medium text-[14px] text-[#646464] bg-transparent outline-none cursor-pointer"
                                >
                                  {selectedTailwindComponent.variants.map(v => (
                                    <option key={v.value} value={v.value}>{v.label}</option>
                                  ))}
                                </select>
                              </div>
                            </div>
                          )}

                          {/* Size */}
                          {selectedTailwindComponent.sizes && (
                            <div className="flex-1 content-stretch flex flex-col gap-[8px]">
                              <p className="font-['Inter:Medium',_sans-serif] font-medium leading-[normal] text-[16px] text-black">
                                Size
                              </p>
                              <div className="bg-white h-[48px] rounded-[4px] border border-[#d9dbe3]">
                                <select
                                  value={selectedSize}
                                  onChange={(e) => setSelectedSize(e.target.value)}
                                  className="w-full h-full px-[14px] font-['Inter:Medium',_sans-serif] font-medium text-[14px] text-[#646464] bg-transparent outline-none cursor-pointer"
                                >
                                  {selectedTailwindComponent.sizes.map(s => (
                                    <option key={s.value} value={s.value}>{s.label}</option>
                                  ))}
                                </select>
                              </div>
                            </div>
                          )}
                        </div>
                      )}
                    </>
                  )}
                </div>
              )}
              </div>
              )}

            </>
          )}

          {/* Icons Tab Content */}
          {activeTab === 'icons' && !showAbout && !showSettings && (
            <>
              {/* Custom Icon Repos */}
              {customIconRepos.filter(repo => repo.url.trim() !== '').map((repo, index) => (
                <div key={`custom-icon-lib-${index}`} className="mb-[40px]">
                  <button 
                    className="content-stretch flex items-center justify-between w-full mb-[8px] cursor-default"
                  >
                    <div className="content-stretch flex gap-[8px] items-center">
                      <ChevronRight className="size-[16px] text-[#646464] opacity-30" />
                      <p className="font-['Inter:Semi_Bold',_sans-serif] font-semibold leading-[normal] text-[14px] text-black">
                        {repo.name || 'Custom Repository'}
                      </p>
                    </div>
                    <p className="font-['Inter:Medium',_sans-serif] font-medium leading-[normal] text-[14px] text-[#999999]">
                      Coming soon
                    </p>
                  </button>
                  <div className="bg-gray-50 rounded-[4px] border border-[#d9dbe3] p-4">
                    <p className="font-['Inter:Regular',_sans-serif] text-[12px] text-[#646464] text-center">
                      Custom repository integration coming soon. Icons from this repo will appear here.
                    </p>
                  </div>
                </div>
              ))}
              
              {/* Lucide Icons Library */}
              {!hideLucideIcons && (
              <div className="mb-[40px]">
                <div 
                  className="content-stretch flex items-center justify-between w-full mb-[8px] pr-[14px]"
                >
                  <button
                    onClick={() => toggleLibrary('lucide')}
                    className="content-stretch flex gap-[8px] items-center"
                  >
                    {expandedLibraries.lucide ? (
                      <ChevronDown className="size-[16px] text-[#646464]" />
                    ) : (
                      <ChevronRight className="size-[16px] text-[#646464]" />
                    )}
                    <p className="font-['Inter:Semi_Bold',_sans-serif] font-semibold leading-[normal] text-[14px] text-black">
                      Lucide Icons
                    </p>
                  </button>
                  <div className="flex items-center gap-[8px]">
                    <button
                      onClick={async (e) => {
                        e.stopPropagation();
                        setIsLoadingIcons(true);
                        try {
                          const icons = await refreshIconLibrary();
                          setLucideIconsList(icons);
                          toast.success('Icons refreshed from CDN');
                        } catch (error) {
                          toast.error('Failed to refresh icons');
                        } finally {
                          setIsLoadingIcons(false);
                        }
                      }}
                      className="hover:bg-gray-100 p-1 rounded transition-colors"
                      title="Refresh from CDN"
                    >
                      <RefreshCw className={`size-[14px] text-[#646464] ${isLoadingIcons ? 'animate-spin' : ''}`} />
                    </button>
                    <p className="font-['Inter:Medium',_sans-serif] font-medium leading-[normal] text-[14px] text-black">
                      {lucideIconsList.length} found
                    </p>
                  </div>
                </div>
                
                {expandedLibraries.lucide && (
                  <div className="content-stretch flex flex-col gap-[16px]">
                    {/* Search Input */}
                    <div className="bg-white rounded-[4px] border border-[#d9dbe3]">
                      <div className="box-border flex items-center h-[48px] px-[14px] gap-[10px]">
                        <Search className="size-[16px] text-[#646464]" />
                        <input
                          type="text"
                          value={iconSearchTerm}
                          onChange={(e) => setIconSearchTerm(e.target.value)}
                          placeholder="Search icons..."
                          className="flex-1 font-['Inter:Medium',_sans-serif] font-medium text-[14px] text-[#646464] bg-transparent outline-none"
                        />
                      </div>
                    </div>

                    {/* Selected Icon Preview - Moved up under search */}
                    {selectedLucideIcon && (
                      <div className="bg-white rounded-[4px] border border-[#d9dbe3] p-4">
                        <div className="flex items-center gap-3">
                          {(() => {
                            const IconComponent = (LucideIcons as any)[selectedLucideIcon];
                            return IconComponent ? <IconComponent className="size-[32px] text-black" /> : null;
                          })()}
                          <p className="font-['Inter:Medium',_sans-serif] font-medium text-[14px] text-black">
                            {selectedLucideIcon}
                          </p>
                        </div>
                      </div>
                    )}

                    {/* Icons Grid */}
                    <div className="bg-white rounded-[4px] border border-[#d9dbe3] p-4 max-h-[600px] overflow-y-auto">
                      {isLoadingIcons ? (
                        <div className="flex items-center justify-center py-12">
                          <p className="font-['Inter:Regular',_sans-serif] text-[14px] text-[#646464]">
                            Loading icons from CDN...
                          </p>
                        </div>
                      ) : lucideIconsList.filter(name => name.toLowerCase().includes(iconSearchTerm.toLowerCase())).length === 0 ? (
                        <div className="flex items-center justify-center py-12">
                          <p className="font-['Inter:Regular',_sans-serif] text-[14px] text-[#646464]">
                            {lucideIconsList.length === 0 
                              ? 'No icons available. Check console for errors.'
                              : 'No icons found matching your search.'
                            }
                          </p>
                        </div>
                      ) : (
                        <div className="grid grid-cols-6 gap-2">
                          {lucideIconsList
                            .filter(name => name.toLowerCase().includes(iconSearchTerm.toLowerCase()))
                            .map((iconName) => {
                              const IconComponent = (LucideIcons as any)[iconName];

                              return (
                                <button
                                  key={iconName}
                                  onClick={() => {
                                    setSelectedLucideIcon(iconName);
                                  }}
                                  className={`relative aspect-square flex items-center justify-center rounded-[4px] border-2 transition-all hover:bg-gray-50 hover:border-[#0088ff] ${
                                    selectedLucideIcon === iconName 
                                      ? 'bg-[#0088ff]/10 border-[#0088ff]' 
                                      : 'border-transparent bg-white'
                                  }`}
                                  title={iconName}
                                >
                                  <IconComponent className="size-[24px] text-black" strokeWidth={2} />
                                </button>
                              );
                            })}
                        </div>
                      )}
                    </div>
                  </div>
                )}
              </div>
              )}
            </>
          )}

          {/* Blocks Tab Content */}
          {activeTab === 'blocks' && !showAbout && !showSettings && (
            <>
              {/* Custom Block Repos */}
              {customBlockRepos.filter(repo => repo.url.trim() !== '').map((repo, index) => (
                <div key={`custom-block-lib-${index}`} className="mb-[40px]">
                  <button 
                    className="content-stretch flex items-center justify-between w-full mb-[8px] cursor-default"
                  >
                    <div className="content-stretch flex gap-[8px] items-center">
                      <ChevronRight className="size-[16px] text-[#646464] opacity-30" />
                      <p className="font-['Inter:Semi_Bold',_sans-serif] font-semibold leading-[normal] text-[14px] text-black">
                        {repo.name || 'Custom Repository'}
                      </p>
                    </div>
                    <p className="font-['Inter:Medium',_sans-serif] font-medium leading-[normal] text-[14px] text-[#999999]">
                      Coming soon
                    </p>
                  </button>
                  <div className="bg-gray-50 rounded-[4px] border border-[#d9dbe3] p-4">
                    <p className="font-['Inter:Regular',_sans-serif] text-[12px] text-[#646464] text-center">
                      Custom repository integration coming soon. Blocks from this repo will appear here.
                    </p>
                  </div>
                </div>
              ))}
              
              {/* Shadcn Studio Blocks */}
              {!hideShadcnBlocks && (
              <div className="mb-[40px]">
                <button 
                  onClick={() => toggleLibrary('shadcn')}
                  className="content-stretch flex items-center justify-between w-full mb-[8px] pr-[14px]"
                >
                  <div className="content-stretch flex gap-[8px] items-center">
                    {expandedLibraries.shadcn ? (
                      <ChevronDown className="size-[16px] text-[#646464]" />
                    ) : (
                      <ChevronRight className="size-[16px] text-[#646464]" />
                    )}
                    <p className="font-['Inter:Semi_Bold',_sans-serif] font-semibold leading-[normal] text-[14px] text-black">
                      Shadcn Studio Blocks
                    </p>
                  </div>
                  <p className="font-['Inter:Medium',_sans-serif] font-medium leading-[normal] text-[14px] text-black">
                    {blocksRegistry.length} found
                  </p>
                </button>

                {expandedLibraries.shadcn && (
                  <div className="content-stretch flex flex-col gap-[16px]">
                    {/* Block Selector */}
                    <div className="block-dropdown-container relative bg-white rounded-[4px] border border-[#d9dbe3]">
                      <div className="box-border flex items-center h-[48px]">
                        <div className="flex items-center flex-1 px-[14px] gap-[10px]">
                          <Search className="size-[16px] text-[#646464]" />
                          <input
                            type="text"
                            value={blockSearchTerm || selectedBlock?.name || ''}
                            onChange={(e) => {
                              setBlockSearchTerm(e.target.value);
                              setBlockDropdownOpen(true);
                            }}
                            onFocus={() => setBlockDropdownOpen(true)}
                            placeholder="Select a block..."
                            className="flex-1 font-['Inter:Medium',_sans-serif] font-medium text-[14px] text-black bg-transparent outline-none placeholder:text-[#646464]"
                          />
                        </div>
                        <button
                          onClick={() => setBlockDropdownOpen(!blockDropdownOpen)}
                          className="h-full px-[14px] border-l border-[#d9dbe3] hover:bg-gray-50 transition-colors"
                        >
                          <ChevronDown className={`size-[16px] text-[#646464] transition-transform ${blockDropdownOpen ? 'rotate-180' : ''}`} />
                        </button>
                      </div>
                      
                      {/* Dropdown List */}
                      {blockDropdownOpen && (
                        <div className="absolute top-full left-0 right-0 mt-1 bg-white border border-[#d9dbe3] rounded-[4px] shadow-lg max-h-[300px] overflow-y-auto z-50">
                          {blocksRegistry
                            .filter(block => block.name.toLowerCase().includes(blockSearchTerm.toLowerCase()))
                            .map(block => (
                              <button
                                key={block.id}
                                onClick={() => {
                                  setSelectedBlock(block);
                                  setSelectedBlockVariant(block.variants?.[0]?.value || '');
                                  setBlockSearchTerm('');
                                  setBlockDropdownOpen(false);
                                }}
                                className="w-full text-left px-[14px] py-[10px] hover:bg-gray-100 font-['Inter:Medium',_sans-serif] font-medium text-[14px] text-[#646464] transition-colors border-b border-gray-100 last:border-b-0"
                              >
                                {block.name}
                              </button>
                            ))}
                        </div>
                      )}
                    </div>

                    {/* Variant Dropdown - Only show if block has variants */}
                    {selectedBlock && selectedBlock.variants && selectedBlock.variants.length > 0 && (
                      <div className="variant-dropdown-container relative bg-white rounded-[4px] border border-[#d9dbe3]">
                        <button
                          onClick={() => setBlockVariantDropdownOpen(!blockVariantDropdownOpen)}
                          className="w-full flex items-center justify-between h-[48px] px-[14px] hover:bg-gray-50 transition-colors"
                        >
                          <span className="font-['Inter:Medium',_sans-serif] font-medium text-[14px] text-[#646464]">
                            {selectedBlock.variants.find(v => v.value === selectedBlockVariant)?.name || selectedBlock.variants[0]?.name}
                            {selectedBlock.variants.find(v => v.value === selectedBlockVariant)?.description && 
                              ` - ${selectedBlock.variants.find(v => v.value === selectedBlockVariant)?.description}`}
                          </span>
                          <ChevronDown className={`size-[16px] text-[#646464] transition-transform ${blockVariantDropdownOpen ? 'rotate-180' : ''}`} />
                        </button>
                        
                        {/* Dropdown List */}
                        {blockVariantDropdownOpen && (
                          <div className="absolute top-full left-0 right-0 mt-1 bg-white border border-[#d9dbe3] rounded-[4px] shadow-lg max-h-[300px] overflow-y-auto z-50">
                            {selectedBlock.variants.map(v => (
                              <button
                                key={v.value}
                                onClick={() => {
                                  setSelectedBlockVariant(v.value);
                                  setBlockVariantDropdownOpen(false);
                                }}
                                className="w-full text-left px-[14px] py-[10px] hover:bg-gray-100 font-['Inter:Medium',_sans-serif] font-medium text-[14px] text-[#646464] transition-colors border-b border-gray-100 last:border-b-0"
                              >
                                {v.name} {v.description && `- ${v.description}`}
                              </button>
                            ))}
                          </div>
                        )}
                      </div>
                    )}

                    {/* Preview Area */}
                    <div className="bg-white min-h-[300px] rounded-[4px] flex items-center justify-center p-4 overflow-auto">
                      {selectedBlock ? (
                        <div className="w-full">
                          {renderBlockPreview(selectedBlock.id, selectedBlockVariant)}
                        </div>
                      ) : (
                        <p className="font-['Inter:Regular',_sans-serif] text-[14px] text-[#646464]">
                          Select a block to preview
                        </p>
                      )}
                    </div>

                    {/* Block Info */}
                    {selectedBlock && (
                      <div className="bg-gray-50 p-4 rounded-[4px] border border-gray-200">
                        <h3 className="font-['Inter:Semi_Bold',_sans-serif] font-semibold text-[14px] text-black mb-2">
                          {selectedBlock.name}
                        </h3>
                        <p className="font-['Inter:Regular',_sans-serif] text-[12px] text-gray-600 mb-3">
                          {selectedBlock.description}
                        </p>
                        {selectedBlock.dependencies && selectedBlock.dependencies.length > 0 && (
                          <div>
                            <p className="font-['Inter:Medium',_sans-serif] font-medium text-[12px] text-gray-700 mb-1">
                              Dependencies:
                            </p>
                            <div className="flex flex-wrap gap-2">
                              {selectedBlock.dependencies.map(dep => (
                                <span key={dep} className="bg-blue-100 text-blue-800 px-2 py-1 rounded text-xs">
                                  {dep}
                                </span>
                              ))}
                            </div>
                          </div>
                        )}
                      </div>
                    )}
                  </div>
                )}
              </div>
              )}

            </>
          )}

          {/* About Tab Content */}
          {showAbout && (
            <div className="content-stretch flex flex-col gap-[17px] items-start mb-[40px]">
              <p className="font-['Inter:Medium',_sans-serif] font-medium leading-[normal] text-[20px] text-black w-full">
                About
              </p>
              <div className="font-['Inter:Regular',_sans-serif] font-normal leading-[24px] text-[14px] text-black w-full space-y-4">
                <p>
                  <span className="font-['Inter:Semi_Bold',_sans-serif] font-semibold">Librarian</span>
                  <span>{` is a Figma plugin that connects live GitHub repositories—like Shadcn UI—directly to your design environment, transforming code-based component libraries into visual, draggable design assets.`}</span>
                </p>
                
                <p>
                  {`It fetches component metadata from repos, displays them in a searchable list, and lets you instantly insert labeled placeholders or frame previews onto the canvas for rapid wireframing and layout planning.`}
                </p>
                
                <p>
                  <span>{`Acting as a bridge between design systems and source code, `}</span>
                  <span className="font-['Inter:Bold',_sans-serif] font-bold">Librarian</span>
                  <span>{` ensures designers work with the same building blocks developers use—always up to date, version-synced, and ready for prototyping.`}</span>
                </p>
              </div>
              
              {/* Copyright */}
              <div className="w-full mt-[80px] flex items-center justify-between">
                <p className="font-['Inter:Regular',_sans-serif] font-normal leading-[24px] text-[14px] text-black">
                  <span className="font-['Inter:Semi_Bold',_sans-serif] font-semibold">Alpha Build</span> MVP v1.0
                </p>
                <p className="font-['Inter:Regular',_sans-serif] font-normal leading-[24px] text-[14px] text-black">
                  Copyright 2025 - david mcginn
                </p>
              </div>
            </div>
          )}
        </div>
      </div>
      
      {/* Fixed Footer */}
      {!showAbout && !showSettings && (
        <div className="bg-white border-t border-[#D9DBE3] p-[40px] shadow-lg">
          <div className="max-w-[600px] mx-auto">
            {activeTab === 'components' && (
              <div className="content-stretch flex items-center justify-between">
                <div className="content-stretch flex gap-[8px] items-center">
                  <div 
                    onClick={() => setCreateAllVariants(!createAllVariants)}
                    className={`relative shrink-0 size-[25px] rounded-[4px] cursor-pointer ${
                      createAllVariants ? 'bg-black border border-black' : 'bg-white border border-black'
                    }`}
                  >
                    {createAllVariants && (
                      <svg className="absolute inset-0 m-auto" width="16" height="16" viewBox="0 0 16 16" fill="none">
                        <path d="M13.5 4L6 11.5L2.5 8" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                      </svg>
                    )}
                  </div>
                  <p className="font-['Inter:Medium',_sans-serif] font-medium leading-[normal] text-[16px] text-black">
                    Create a component with all variants
                  </p>
                </div>

                <button 
                  onClick={handlePlaceComponent}
                  className="relative shrink-0 size-[76px] rounded-full bg-[#165DFF] hover:bg-[#0052E6] transition-colors flex items-center justify-center shadow-lg"
                >
                  <Plus className="size-[32px] text-white" strokeWidth={3} />
                </button>
              </div>
            )}
            
            {activeTab === 'icons' && (
              <div className="content-stretch flex items-center justify-between gap-[8px]">
                {/* Size and Color Controls - Hugged together and centered */}
                <div className="flex items-center gap-[8px]">
                  {/* Size Dropdown */}
                  <div className="content-stretch flex flex-col gap-[4px]">
                    <p className="font-['Inter:Medium',_sans-serif] font-medium leading-[normal] text-[12px] text-[#646464]">
                      Size
                    </p>
                    <div className="bg-white w-[120px] h-[48px] rounded-[4px] border border-[#d9dbe3]">
                      <select
                        value={iconSize}
                        onChange={(e) => setIconSize(e.target.value)}
                        className="w-full h-full px-[14px] font-['Inter:Medium',_sans-serif] font-medium text-[14px] text-[#646464] bg-transparent outline-none cursor-pointer"
                      >
                        <option value="16">16px</option>
                        <option value="20">20px</option>
                        <option value="24">24px</option>
                      </select>
                    </div>
                  </div>

                  {/* Color Picker */}
                  <div className="content-stretch flex flex-col gap-[4px]">
                    <p className="font-['Inter:Medium',_sans-serif] font-medium leading-[normal] text-[12px] text-[#646464]">
                      Color
                    </p>
                    <div className="bg-white w-[240px] h-[48px] rounded-[4px] border border-[#d9dbe3] flex items-center px-[14px] gap-[8px]">
                      <input
                        type="color"
                        value={iconColor}
                        onChange={(e) => setIconColor(e.target.value.toUpperCase())}
                        className="size-[28px] cursor-pointer rounded border border-[#d9dbe3]"
                      />
                      <input
                        type="text"
                        value={iconColor.toUpperCase()}
                        onChange={(e) => {
                          const value = e.target.value.toUpperCase();
                          // Allow typing and update immediately
                          setIconColor(value);
                        }}
                        onBlur={(e) => {
                          // Ensure valid hex on blur
                          const value = e.target.value;
                          if (!/^#[0-9A-F]{6}$/.test(value)) {
                            setIconColor('#000000');
                          }
                        }}
                        placeholder="#000000"
                        maxLength={7}
                        className="flex-1 font-['Inter:Medium',_sans-serif] font-medium text-[14px] text-black bg-transparent outline-none uppercase"
                      />
                    </div>
                  </div>
                </div>

                {/* Add Icon Button */}
                <button 
                  onClick={() => {
                    if (!selectedLucideIcon) {
                      toast.error('Please select an icon first');
                      return;
                    }
                    // Send message to plugin backend to place icon
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
                  className="relative shrink-0 size-[76px] rounded-full bg-[#165DFF] hover:bg-[#0052E6] transition-colors flex items-center justify-center shadow-lg"
                >
                  <Plus className="size-[32px] text-white" strokeWidth={3} />
                </button>
              </div>
            )}
            
            {activeTab === 'blocks' && (
              <div className="content-stretch flex items-center justify-end">
                <button 
                  onClick={handlePlaceBlock}
                  className="relative shrink-0 size-[76px] rounded-full bg-[#165DFF] hover:bg-[#0052E6] transition-colors flex items-center justify-center shadow-lg"
                >
                  <Plus className="size-[32px] text-white" strokeWidth={3} />
                </button>
              </div>
            )}
          </div>
        </div>
      )}
      
      <Toaster />
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