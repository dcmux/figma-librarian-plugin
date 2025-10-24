// Simple code file that loads our UI and provides basic plugin functionality
// This shows the UI we've built

console.log('🚀 Figma Librarian Plugin started!');

// Show the UI we've built
if (typeof figma !== 'undefined') {
  figma.showUI(__html__, { 
    width: 800, 
    height: 600,
    themeColors: true 
  });

  // Handle messages from the UI
  figma.ui.onmessage = (msg) => {
    console.log('Message from UI:', msg);
    
    if (msg.type === 'get-selection') {
      const selection = figma.currentPage.selection;
      figma.ui.postMessage({
        type: 'selection-data',
        data: selection.map(node => ({
          id: node.id,
          name: node.name,
          type: node.type
        }))
      });
    }
  };

  // Close the plugin
  figma.ui.onmessage = (msg) => {
    if (msg.type === 'close') {
      figma.closePlugin();
    }
  };
} else {
  console.log('⚠️ Running outside Figma environment - UI only mode');
}