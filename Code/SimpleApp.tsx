import * as React from 'react';
import { useState } from 'react';
import { ChevronDown, Search, Plus, Settings, Eye, EyeOff } from 'lucide-react';

// Simplified version of your Figma design without external dependencies
function LibraryIcon() {
  return (
    <div className="bg-[#165dff] overflow-clip relative rounded-[16px] shrink-0 size-[96px]">
      <div className="absolute inset-[29.69%_32.03%_29.27%_31.25%]">
        <div className="absolute inset-[-3.81%_-4.26%]">
          <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 39 43">
            <g>
              <path d="M10 10L25 25M25 10L10 25" stroke="white" strokeWidth="3" />
              <path d="M5 20H35" stroke="white" strokeLinecap="square" strokeWidth="3" />
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
      <Search className="w-full h-full text-current" />
    </div>
  );
}

export default function SimpleApp() {
  const [activeTab, setActiveTab] = useState('components');
  const [showAbout, setShowAbout] = useState(false);
  const [showSettings, setShowSettings] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedComponent, setSelectedComponent] = useState<any>(null);
  const [createAllVariants, setCreateAllVariants] = useState(false);

  const handleTabChange = (tab: string) => {
    setActiveTab(tab);
    setShowAbout(false);
    setShowSettings(false);
  };

  const handlePlaceComponent = () => {
    // Simulate component placement
    alert('🎯 Component would be placed in Figma!\n\nIn the real plugin, this would:\n• Create the component on the canvas\n• Apply the selected variant and size\n• Position it where the user clicked');
  };

  // Sample component data
  const components = [
    { name: 'Button', description: 'Interactive button component', variants: ['Default', 'Outline', 'Ghost'] },
    { name: 'Input', description: 'Text input field', variants: ['Default', 'Filled', 'Outlined'] },
    { name: 'Card', description: 'Container for content', variants: ['Default', 'Elevated', 'Outlined'] },
    { name: 'Badge', description: 'Status indicator', variants: ['Default', 'Secondary', 'Destructive'] },
    { name: 'Alert', description: 'Alert message component', variants: ['Default', 'Warning', 'Error'] },
  ];

  const filteredComponents = components.filter(comp => 
    comp.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="bg-gray-50 flex flex-col h-screen">
      <div className="flex-1 overflow-y-auto p-[40px] pb-[120px]">
        <div className="max-w-[600px] mx-auto">
          {/* Header */}
          <div className="content-stretch flex gap-[26px] items-center mb-[40px]">
            <LibraryIcon />
            <p className="font-['Inter:Semi_Bold',_sans-serif] font-semibold leading-[24px] not-italic text-[14px] text-black">
              <span>Librarian </span>
              <span className="font-['Inter:Regular',_sans-serif] font-normal">
                is a Figma plugin that syncs live GitHub component libraries, like Shadcn UI, into Figma for instantly inserting and managing real, code-based design components.
              </span>
            </p>
          </div>

          {/* Navigation */}
          <div className="content-stretch flex items-center justify-between mb-[40px]">
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

            <div className="flex gap-[16px] items-center">
              <button
                onClick={() => setShowSettings(!showSettings)}
                className="p-2 hover:bg-gray-200 rounded-md transition-colors"
              >
                <Settings className="size-[20px] text-gray-600" />
              </button>
              <button
                onClick={() => setShowAbout(!showAbout)}
                className="p-2 hover:bg-gray-200 rounded-md transition-colors"
              >
                <Eye className="size-[20px] text-gray-600" />
              </button>
            </div>
          </div>

          {/* Search */}
          {activeTab === 'components' && !showAbout && !showSettings && (
            <div className="relative mb-[32px]">
              <div className="content-stretch flex gap-[8px] items-center bg-white border border-[#D9DBE3] rounded-[8px] px-[16px] py-[12px]">
                <SearchIcon />
                <input
                  type="text"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  placeholder="Search components..."
                  className="flex-1 font-['Inter:Regular',_sans-serif] text-[14px] text-black bg-transparent outline-none"
                />
              </div>
            </div>
          )}

          {/* Content */}
          {!showAbout && !showSettings && (
            <div className="space-y-[16px]">
              {activeTab === 'components' && (
                <>
                  <h3 className="font-['Inter:Medium',_sans-serif] font-medium leading-[normal] text-[20px] text-black">
                    {searchTerm ? `Results for "${searchTerm}"` : 'Components'}
                  </h3>
                  <div className="space-y-[12px]">
                    {filteredComponents.map((component, index) => (
                      <div
                        key={index}
                        onClick={() => setSelectedComponent(component)}
                        className={`p-[16px] bg-white border rounded-[8px] cursor-pointer transition-all hover:shadow-md ${
                          selectedComponent?.name === component.name 
                            ? 'border-[#0088ff] shadow-md' 
                            : 'border-[#E1E5E9] hover:border-[#0088ff]'
                        }`}
                      >
                        <div className="flex items-start justify-between">
                          <div>
                            <h4 className="font-['Inter:Semi_Bold',_sans-serif] font-semibold text-[16px] text-black mb-[4px]">
                              {component.name}
                            </h4>
                            <p className="font-['Inter:Regular',_sans-serif] text-[14px] text-gray-600 mb-[8px]">
                              {component.description}
                            </p>
                            <div className="flex gap-[8px] flex-wrap">
                              {component.variants.map((variant, vIndex) => (
                                <span
                                  key={vIndex}
                                  className="px-[8px] py-[4px] bg-gray-100 text-[12px] text-gray-600 rounded-[4px]"
                                >
                                  {variant}
                                </span>
                              ))}
                            </div>
                          </div>
                          {selectedComponent?.name === component.name && (
                            <div className="w-[20px] h-[20px] bg-[#0088ff] rounded-full flex items-center justify-center">
                              <svg width="12" height="9" viewBox="0 0 12 9" fill="none">
                                <path d="M1 4.5L4 7.5L11 0.5" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                              </svg>
                            </div>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                </>
              )}

              {activeTab === 'blocks' && (
                <div className="text-center py-[40px]">
                  <h3 className="font-['Inter:Medium',_sans-serif] font-medium text-[20px] text-black mb-[8px]">
                    Blocks Coming Soon
                  </h3>
                  <p className="text-gray-600 text-[14px]">
                    Pre-built block components will be available here
                  </p>
                </div>
              )}

              {activeTab === 'icons' && (
                <div className="text-center py-[40px]">
                  <h3 className="font-['Inter:Medium',_sans-serif] font-medium text-[20px] text-black mb-[8px]">
                    Icons Coming Soon
                  </h3>
                  <p className="text-gray-600 text-[14px]">
                    Icon library will be available here
                  </p>
                </div>
              )}
            </div>
          )}

          {/* About Screen */}
          {showAbout && (
            <div className="space-y-[24px]">
              <h2 className="font-['Inter:Semi_Bold',_sans-serif] font-semibold text-[24px] text-black">
                About Librarian
              </h2>
              <div className="space-y-[16px] text-gray-700">
                <p>Librarian is a Figma plugin that bridges the gap between design and development by syncing live component libraries directly into Figma.</p>
                <p>Features:</p>
                <ul className="list-disc list-inside space-y-[8px] ml-[16px]">
                  <li>Live sync with GitHub repositories</li>
                  <li>Shadcn UI components</li>
                  <li>Real code-based components</li>
                  <li>Instant insertion and management</li>
                </ul>
                <div className="pt-[16px]">
                  <p className="font-['Inter:Semi_Bold',_sans-serif] font-semibold">Alpha Build</p>
                  <p>Copyright 2025 - david mcginn</p>
                </div>
              </div>
            </div>
          )}

          {/* Settings Screen */}
          {showSettings && (
            <div className="space-y-[24px]">
              <h2 className="font-['Inter:Semi_Bold',_sans-serif] font-semibold text-[24px] text-black">
                Settings
              </h2>
              <div className="space-y-[16px]">
                <div className="p-[16px] bg-white border border-[#E1E5E9] rounded-[8px]">
                  <h3 className="font-['Inter:Medium',_sans-serif] font-medium text-[16px] text-black mb-[8px]">
                    Repository Settings
                  </h3>
                  <p className="text-gray-600 text-[14px] mb-[12px]">
                    Configure your component library source
                  </p>
                  <input
                    type="text"
                    placeholder="GitHub repository URL"
                    className="w-full p-[8px] border border-gray-300 rounded-[4px] text-[14px]"
                  />
                </div>
                <div className="p-[16px] bg-white border border-[#E1E5E9] rounded-[8px]">
                  <h3 className="font-['Inter:Medium',_sans-serif] font-medium text-[16px] text-black mb-[8px]">
                    Sync Settings
                  </h3>
                  <label className="flex items-center gap-[8px]">
                    <input type="checkbox" className="rounded" />
                    <span className="text-[14px] text-gray-700">Auto-sync on file changes</span>
                  </label>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
      
      {/* Fixed Footer */}
      {!showAbout && !showSettings && (
        <div className="bg-white border-t border-[#D9DBE3] p-[40px] shadow-lg">
          <div className="max-w-[600px] mx-auto">
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
                disabled={!selectedComponent}
                className={`relative shrink-0 size-[76px] rounded-full transition-colors flex items-center justify-center shadow-lg ${
                  selectedComponent 
                    ? 'bg-[#165DFF] hover:bg-[#0052E6]' 
                    : 'bg-gray-300 cursor-not-allowed'
                }`}
              >
                <Plus className="size-[32px] text-white" strokeWidth={3} />
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}