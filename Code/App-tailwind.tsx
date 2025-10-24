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
  console.log('🎯 Sophisticated App component rendering...');
  
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

  // Default repo visibility states
  const [defaultRepoVisibility, setDefaultRepoVisibility] = useState<Record<string, boolean>>({
    'shadcn': false,
    'tailwindui': false,
    'aceternity': false,
    'magicui': false,
    'nextui': false,
    'lucide': false,
  });

  // Get filtered items based on search
  const filteredComponents = componentRegistry.filter(comp =>
    comp.name.toLowerCase().includes(componentSearchTerm.toLowerCase())
  );

  const filteredTailwindComponents = tailwindComponentRegistry.filter(comp =>
    comp.name.toLowerCase().includes(tailwindSearchTerm.toLowerCase())
  );

  const filteredBlocks = blocksRegistry.filter(block =>
    block.name.toLowerCase().includes(blockSearchTerm.toLowerCase())
  );

  // Custom repo utilities
  const getReposForCurrentTab = () => {
    switch (activeTab) {
      case 'components': return customComponentRepos;
      case 'blocks': return customBlockRepos;
      case 'icons': return customIconRepos;
      default: return [];
    }
  };

  const getDefaultRepos = () => {
    const defaultRepos = [
      { name: 'Shadcn/UI', url: 'https://cdn.jsdelivr.net/npm/@shadcn/ui/' },
      { name: 'Tailwind UI', url: 'https://tailwindui.com/components' },
      { name: 'Aceternity UI', url: 'https://ui.aceternity.com' },
      { name: 'Magic UI', url: 'https://magicui.design' },
      { name: 'NextUI', url: 'https://nextui.org' },
    ];

    if (activeTab === 'icons') {
      return [
        { name: 'Lucide Icons', url: 'https://cdn.jsdelivr.net/npm/lucide-react' },
        { name: 'Heroicons', url: 'https://heroicons.com' },
        { name: 'Feather Icons', url: 'https://feathericons.com' },
      ];
    }

    if (activeTab === 'blocks') {
      return [
        ...defaultRepos,
        { name: 'Blocks Hub', url: 'https://blocks.pro' },
      ];
    }

    if (activeTab === 'components') {
      return repos.map(repo => {
        if (typeof repo === 'string') {
          return repo;
        } else {
          return { name, url: repo };
        }
      });
      return { name: 'Custom Repository', url: '' };
    }

    return defaultRepos;
  };

  // Tab change handler with repo URL update
  const handleTabChange = (tab: 'components' | 'blocks' | 'icons') => {
    setActiveTab(tab);
    if (tab === 'icons') {
      setRepoUrl('https://cdn.jsdelivr.net/npm/lucide-react');
    } else {
      setRepoUrl('https://cdn.jsdelivr.net/npm/@shadcn/ui/');
    }
  };

  // Load Lucide icons when Icons tab is active
  useEffect(() => {
    if (activeTab === 'icons' && lucideIconsList.length === 0 && !isLoadingIcons) {
      console.log('🔄 Loading Lucide icons...');
      setIsLoadingIcons(true);
      
      try {
        const iconLibrary = getIconLibrary();
        console.log('📦 Icon library loaded:', iconLibrary);
        setLucideIconsList(iconLibrary);
        toast.success(`${iconLibrary.length} icons loaded successfully!`);
      } catch (error) {
        console.error('❌ Error loading icons:', error);
        toast.error('Failed to load icons', {
          description: 'Check console for details'
        });
      } finally {
        setIsLoadingIcons(false);
      }
    }
  }, [activeTab, lucideIconsList.length, isLoadingIcons]);

  // Handle messages from Figma
  useEffect(() => {
    const handleMessage = (event: MessageEvent) => {
      if (event.data.pluginMessage) {
        const { type, data } = event.data.pluginMessage;
        
        if (type === 'icon-placed') {
          toast.success('Icon placed successfully!');
        }
      }
    };

    window.addEventListener('message', handleMessage);
    return () => window.removeEventListener('message', handleMessage);
  }, []);

  // Close dropdowns when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (!(event.target as Element)?.closest('.dropdown-container')) {
        setComponentDropdownOpen(false);
        setTailwindDropdownOpen(false);
        setBlockDropdownOpen(false);
        setBlockVariantDropdownOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handlePlaceComponent = () => {
    if (!selectedComponent) return;

    // Send message to plugin backend
    parent.postMessage({
      pluginMessage: {
        type: 'place-component',
        data: {
          componentId: selectedComponent.id,
          componentName: selectedComponent.name,
          variant: selectedVariant,
          size: selectedSize,
          icon: selectedIcon,
          iconPosition: iconPosition,
          text: componentText,
          createAllVariants: createAllVariants,
        }
      }
    }, '*');

    toast.success('Component added to canvas!', {
      description: selectedComponent.name,
    });
  };

  const handlePlaceTailwindComponent = () => {
    if (!selectedTailwindComponent) return;

    // Send message to plugin backend
    parent.postMessage({
      pluginMessage: {
        type: 'place-tailwind-component',
        data: {
          componentId: selectedTailwindComponent.id,
          componentName: selectedTailwindComponent.name,
          variant: selectedVariant,
          size: selectedSize,
          icon: selectedIcon,
          iconPosition: iconPosition,
          text: componentText,
          createAllVariants: createAllVariants,
        }
      }
    }, '*');

    toast.success('Tailwind component added to canvas!', {
      description: selectedTailwindComponent.name,
    });
  };

  const handleRepoVisibilityToggle = (lib: string) => {
    setDefaultRepoVisibility(prev => {
      if (prev[lib]) {
        return { ...prev, [lib]: false };
      }
      
      return {
        ...Object.fromEntries(Object.keys(prev).map(key => [key, false])),
        [lib]: true,
      };
    });
  };

  const handlePlaceBlock = () => {
    if (!selectedBlock) {
      toast.error('Please select a block first');
      return;
    }

    // Send message to plugin backend to place block
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

  console.log('🎨 Rendering sophisticated Figma Librarian UI...');

  return (
    <div style={{ 
      backgroundColor: 'white', 
      height: '100vh', 
      overflow: 'hidden', 
      display: 'flex', 
      flexDirection: 'column',
      fontFamily: 'Inter, sans-serif'
    }}>
      {/* Header Section */}
      <div style={{ 
        display: 'flex', 
        flexDirection: 'column', 
        gap: '24px', 
        padding: '20px 20px 16px 20px', 
        backgroundColor: 'white', 
        borderBottom: '1px solid #e5e7eb'
      }}>
        {/* About Section - shown when showAbout is true */}
        {showAbout && (
          <div style={{ 
            display: 'flex', 
            flexDirection: 'column', 
            gap: '16px', 
            padding: '20px', 
            backgroundColor: '#f8f9fa', 
            borderRadius: '8px', 
            border: '1px solid #e5e7eb'
          }}>
            <div style={{ display: 'flex', gap: '16px', alignItems: 'flex-start' }}>
              <LibraryIcon />
              <p style={{ 
                fontFamily: 'Inter, sans-serif', 
                fontWeight: '600', 
                fontSize: '14px', 
                lineHeight: '24px', 
                color: 'black'
              }}>
                <span>Librarian </span>
                <span style={{ fontWeight: '400' }}>
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
                    className={`font-['Inter:Medium',_sans-serif] font-medium text-[12px] leading-[normal] pb-[8px] border-b-[2px] transition-colors ${
                      activeTab === 'components' 
                        ? 'text-[#165DFF] border-[#165DFF]' 
                        : 'text-[#646464] border-transparent hover:text-[#333] hover:border-[#ccc]'
                    }`}
                  >
                    Components
                  </button>
                </div>
                <div className="content-stretch flex flex-col gap-[8px] items-start">
                  <button 
                    onClick={() => handleTabChange('blocks')}
                    className={`font-['Inter:Medium',_sans-serif] font-medium text-[12px] leading-[normal] pb-[8px] border-b-[2px] transition-colors ${
                      activeTab === 'blocks' 
                        ? 'text-[#165DFF] border-[#165DFF]' 
                        : 'text-[#646464] border-transparent hover:text-[#333] hover:border-[#ccc]'
                    }`}
                  >
                    Blocks
                  </button>
                </div>
                <div className="content-stretch flex flex-col gap-[8px] items-start">
                  <button 
                    onClick={() => handleTabChange('icons')}
                    className={`font-['Inter:Medium',_sans-serif] font-medium text-[12px] leading-[normal] pb-[8px] border-b-[2px] transition-colors ${
                      activeTab === 'icons' 
                        ? 'text-[#165DFF] border-[#165DFF]' 
                        : 'text-[#646464] border-transparent hover:text-[#333] hover:border-[#ccc]'
                    }`}
                  >
                    Icons
                  </button>
                </div>
              </div>
              
              <div className="flex items-center gap-[8px]">
                <button 
                  onClick={() => setShowSettings(!showSettings)}
                  className="p-[8px] rounded-[4px] hover:bg-[#f3f4f6] transition-colors"
                >
                  <Settings className="size-[16px] text-[#646464]" />
                </button>
                <button 
                  onClick={() => setShowAbout(false)}
                  className="p-[4px] rounded-[4px] hover:bg-[#f3f4f6] transition-colors"
                >
                  <X className="size-[14px] text-[#646464]" />
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Top Bar */}
        <div className="content-stretch flex items-center justify-between">
          <div className="content-stretch flex gap-[8px] items-center">
            <LibraryIcon />
            <p className="font-['Inter:Semi_Bold',_sans-serif] font-semibold leading-[20px] not-italic text-[16px] text-black">
              Librarian
            </p>
          </div>
          
          <div className="flex items-center gap-[8px]">
            <button 
              onClick={() => setShowAbout(!showAbout)}
              className="p-[8px] rounded-[4px] hover:bg-[#f3f4f6] transition-colors"
            >
              <Info className="size-[16px] text-[#646464]" />
            </button>
            <button 
              onClick={() => setShowSettings(!showSettings)}
              className="p-[8px] rounded-[4px] hover:bg-[#f3f4f6] transition-colors"
            >
              <Settings className="size-[16px] text-[#646464]" />
            </button>
          </div>
        </div>

        {/* Settings Panel */}
        {showSettings && (
          <div className="content-stretch flex flex-col gap-[16px] p-[20px] bg-[#f8f9fa] rounded-[8px] border border-[#e5e7eb]">
            <div className="flex items-center justify-between">
              <h3 className="font-['Inter:Semi_Bold',_sans-serif] font-semibold text-[14px] text-black">
                Settings
              </h3>
              <button 
                onClick={() => setShowSettings(false)}
                className="p-[4px] rounded-[4px] hover:bg-[#e5e7eb] transition-colors"
              >
                <X className="size-[14px] text-[#646464]" />
              </button>
            </div>
            
            <div className="content-stretch flex flex-col gap-[12px]">
              <div className="flex items-center justify-between">
                <span className="font-['Inter:Regular',_sans-serif] text-[13px] text-[#646464]">
                  Cache Status
                </span>
                <button 
                  onClick={() => {
                    try {
                      refreshIconLibrary();
                      toast.success('Cache refreshed');
                    } catch (error) {
                      toast.error('Failed to refresh cache');
                    }
                  }}
                  className="p-[6px] rounded-[4px] hover:bg-[#e5e7eb] transition-colors"
                >
                  <RefreshCw className="size-[12px] text-[#646464]" />
                </button>
              </div>
              
              <div className="flex items-center justify-between">
                <span className="font-['Inter:Regular',_sans-serif] text-[13px] text-[#646464]">
                  Icons Loaded
                </span>
                <span className="font-['Inter:Medium',_sans-serif] text-[13px] text-[#10b981]">
                  {lucideIconsList.length}
                </span>
              </div>
            </div>
          </div>
        )}

        {/* Main Tabs */}
        {!showAbout && (
          <div className="content-stretch flex items-start justify-between">
            <div className="content-stretch flex gap-[37px] items-start">
              <div className="content-stretch flex flex-col gap-[8px] items-start">
                <button 
                  onClick={() => handleTabChange('components')}
                  className={`font-['Inter:Medium',_sans-serif] font-medium text-[12px] leading-[normal] pb-[8px] border-b-[2px] transition-colors ${
                    activeTab === 'components' 
                      ? 'text-[#165DFF] border-[#165DFF]' 
                      : 'text-[#646464] border-transparent hover:text-[#333] hover:border-[#ccc]'
                  }`}
                >
                  Components
                </button>
              </div>
              <div className="content-stretch flex flex-col gap-[8px] items-start">
                <button 
                  onClick={() => handleTabChange('blocks')}
                  className={`font-['Inter:Medium',_sans-serif] font-medium text-[12px] leading-[normal] pb-[8px] border-b-[2px] transition-colors ${
                    activeTab === 'blocks' 
                      ? 'text-[#165DFF] border-[#165DFF]' 
                      : 'text-[#646464] border-transparent hover:text-[#333] hover:border-[#ccc]'
                  }`}
                >
                  Blocks
                </button>
              </div>
              <div className="content-stretch flex flex-col gap-[8px] items-start">
                <button 
                  onClick={() => handleTabChange('icons')}
                  className={`font-['Inter:Medium',_sans-serif] font-medium text-[12px] leading-[normal] pb-[8px] border-b-[2px] transition-colors ${
                    activeTab === 'icons' 
                      ? 'text-[#165DFF] border-[#165DFF]' 
                      : 'text-[#646464] border-transparent hover:text-[#333] hover:border-[#ccc]'
                  }`}
                >
                  Icons
                </button>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Content Section */}
      <div className="flex-1 overflow-hidden">
        {/* Components Tab Content */}
        {activeTab === 'components' && (
          <div className="h-full flex flex-col">
            {/* Repository Management */}
            <div className="px-[20px] py-[16px] bg-[#f8f9fa] border-b border-[#e5e7eb]">
              <div className="content-stretch flex flex-col gap-[12px]">
                <p className="font-['Inter:Medium',_sans-serif] font-medium leading-[normal] text-[12px] text-[#646464]">
                  Add custom CDN or GitHub repository URLs to extend Librarian with your own component libraries.
                </p>
                
                <div className="content-stretch flex flex-col gap-[8px]">
                  <div className="bg-white w-full h-[44px] rounded-[4px] border border-[#d9dbe3] flex items-center px-[14px] gap-[8px]">
                    <SearchIcon />
                    <input
                      type="text"
                      placeholder="Enter CDN or GitHub URL..."
                      value={repoUrl}
                      onChange={(e) => setRepoUrl(e.target.value)}
                      className="flex-1 font-['Inter:Regular',_sans-serif] text-[14px] text-black bg-transparent outline-none placeholder:text-[#646464]"
                    />
                  </div>
                </div>
              </div>
            </div>

            {/* Component Selection */}
            <div className="flex-1 px-[20px] py-[16px] overflow-y-auto">
              <div className="content-stretch flex flex-col gap-[16px]">
                {/* Component Dropdown */}
                <div className="dropdown-container content-stretch flex flex-col gap-[4px] relative">
                  <p className="font-['Inter:Medium',_sans-serif] font-medium leading-[normal] text-[12px] text-[#646464]">
                    Component
                  </p>
                  <button
                    onClick={() => setComponentDropdownOpen(!componentDropdownOpen)}
                    className="bg-white w-full h-[44px] rounded-[4px] border border-[#d9dbe3] flex items-center justify-between px-[14px] hover:border-[#165DFF] transition-colors"
                  >
                    <span className="font-['Inter:Regular',_sans-serif] text-[14px] text-black">
                      {selectedComponent ? selectedComponent.name : 'Select component...'}
                    </span>
                    <ChevronDown className={`size-[16px] text-[#646464] transition-transform ${componentDropdownOpen ? 'rotate-180' : ''}`} />
                  </button>
                  
                  {componentDropdownOpen && (
                    <div className="absolute top-full left-0 right-0 z-10 mt-[4px] bg-white border border-[#d9dbe3] rounded-[4px] shadow-lg max-h-[200px] overflow-y-auto">
                      <div className="p-[8px] border-b border-[#e5e7eb]">
                        <input
                          type="text"
                          placeholder="Search components..."
                          value={componentSearchTerm}
                          onChange={(e) => setComponentSearchTerm(e.target.value)}
                          className="w-full px-[8px] py-[6px] text-[12px] border border-[#d9dbe3] rounded-[4px] outline-none focus:border-[#165DFF]"
                        />
                      </div>
                      {filteredComponents.map((component) => (
                        <button
                          key={component.id}
                          onClick={() => {
                            setSelectedComponent(component);
                            setComponentDropdownOpen(false);
                            setComponentSearchTerm('');
                          }}
                          className="w-full px-[12px] py-[8px] text-left text-[13px] hover:bg-[#f3f4f6] transition-colors"
                        >
                          {component.name}
                        </button>
                      ))}
                    </div>
                  )}
                </div>

                {/* Component Preview */}
                {selectedComponent && (
                  <div className="content-stretch flex flex-col gap-[12px] p-[16px] bg-[#f8f9fa] rounded-[4px] border border-[#e5e7eb]">
                    <p className="font-['Inter:Medium',_sans-serif] font-medium text-[12px] text-[#646464]">
                      Preview
                    </p>
                    <div className="bg-white p-[16px] rounded-[4px] border border-[#d9dbe3]">
                      {renderComponentPreview(selectedComponent, {
                        variant: selectedVariant,
                        size: selectedSize,
                        icon: selectedIcon,
                        iconPosition: iconPosition,
                        text: componentText,
                      })}
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* Add Component Button */}
            {selectedComponent && (
              <div className="px-[20px] py-[16px] bg-[#f8f9fa] border-t border-[#e5e7eb]">
                <div className="content-stretch flex items-center justify-end">
                  <button 
                    onClick={handlePlaceComponent}
                    className="relative shrink-0 size-[76px] rounded-full bg-[#165DFF] hover:bg-[#0052E6] transition-colors flex items-center justify-center shadow-lg"
                  >
                    <Plus className="size-[32px] text-white" strokeWidth={3} />
                  </button>
                </div>
              </div>
            )}
          </div>
        )}

        {/* Icons Tab Content */}
        {activeTab === 'icons' && (
          <div className="h-full flex flex-col">
            {/* Icon Search */}
            <div className="px-[20px] py-[16px] bg-[#f8f9fa] border-b border-[#e5e7eb]">
              <div className="content-stretch flex flex-col gap-[12px]">
                <p className="font-['Inter:Medium',_sans-serif] font-medium leading-[normal] text-[12px] text-[#646464]">
                  Search and insert Lucide icons
                </p>
                
                <div className="bg-white w-full h-[44px] rounded-[4px] border border-[#d9dbe3] flex items-center px-[14px] gap-[8px]">
                  <SearchIcon />
                  <input
                    type="text"
                    placeholder="Search icons..."
                    value={iconSearchTerm}
                    onChange={(e) => setIconSearchTerm(e.target.value)}
                    className="flex-1 font-['Inter:Regular',_sans-serif] text-[14px] text-black bg-transparent outline-none placeholder:text-[#646464]"
                  />
                </div>
              </div>
            </div>

            {/* Icon Grid */}
            <div className="flex-1 px-[20px] py-[16px] overflow-y-auto">
              {isLoadingIcons ? (
                <div className="flex items-center justify-center h-[200px]">
                  <div className="flex flex-col items-center gap-[12px]">
                    <RefreshCw className="size-[24px] text-[#646464] animate-spin" />
                    <p className="font-['Inter:Medium',_sans-serif] text-[13px] text-[#646464]">
                      Loading icons...
                    </p>
                  </div>
                </div>
              ) : (
                <div className="grid grid-cols-4 gap-[8px]">
                  {lucideIconsList
                    .filter(iconName => 
                      iconName.toLowerCase().includes(iconSearchTerm.toLowerCase())
                    )
                    .slice(0, 100) // Limit to first 100 for performance
                    .map((iconName) => {
                      const IconComponent = (LucideIcons as any)[iconName];
                      return (
                        <button
                          key={iconName}
                          onClick={() => setSelectedLucideIcon(iconName)}
                          className={`aspect-square p-[12px] rounded-[4px] border transition-all hover:border-[#165DFF] hover:bg-[#f8f9ff] ${
                            selectedLucideIcon === iconName 
                              ? 'border-[#165DFF] bg-[#f8f9ff]' 
                              : 'border-[#e5e7eb] bg-white'
                          }`}
                          title={iconName}
                        >
                          {IconComponent ? <IconComponent className="size-[32px] text-black" /> : null}
                        </button>
                      );
                    })}
                </div>
              )}
            </div>

            {/* Icon Controls */}
            {selectedLucideIcon && (
              <div className="px-[20px] py-[16px] bg-[#f8f9fa] border-t border-[#e5e7eb]">
                <div className="content-stretch flex items-center justify-between">
                  <div className="flex items-center gap-[16px]">
                    <div className="content-stretch flex flex-col gap-[4px]">
                      <p className="font-['Inter:Medium',_sans-serif] font-medium leading-[normal] text-[12px] text-[#646464]">
                        Size
                      </p>
                      <input
                        type="number"
                        value={iconSize}
                        onChange={(e) => setIconSize(e.target.value)}
                        min="8"
                        max="128"
                        className="w-[80px] h-[36px] px-[8px] text-[13px] border border-[#d9dbe3] rounded-[4px] outline-none focus:border-[#165DFF]"
                      />
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
                            setIconColor(value);
                          }}
                          onBlur={(e) => {
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
              </div>
            )}
          </div>
        )}

        {/* Blocks Tab Content */}
        {activeTab === 'blocks' && (
          <div className="h-full flex flex-col">
            <div className="px-[20px] py-[16px] bg-[#f8f9fa] border-b border-[#e5e7eb]">
              <p className="font-['Inter:Medium',_sans-serif] font-medium leading-[normal] text-[12px] text-[#646464]">
                Coming soon - Design blocks and templates
              </p>
            </div>
            <div className="flex-1 flex items-center justify-center">
              <p className="text-[#646464] text-[14px]">Blocks feature coming soon</p>
            </div>
          </div>
        )}
      </div>
      
      <Toaster />
    </div>
  );
}