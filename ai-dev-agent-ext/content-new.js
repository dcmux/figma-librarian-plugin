// content.js - Simple version
console.log("Fix with AI content script loaded");

// Store the right-click position
document.addEventListener('contextmenu', function(event) {
  const position = { 
    x: event.clientX, 
    y: event.clientY 
  };
  
  // Store the position in localStorage (which is always available)
  localStorage.setItem('fixWithAI_position', JSON.stringify(position));
  console.log("Right-click position stored in localStorage:", position);
});
