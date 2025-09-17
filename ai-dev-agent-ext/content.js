// content.js - Injected into all pages

console.log("Fix with AI content script loaded");

// Wait for the document to be fully loaded
window.addEventListener('load', function() {
  console.log("Window loaded, initializing content script");
  
  // Check if chrome API is available
  if (typeof chrome !== 'undefined') {
    console.log("Chrome API is available");
    
    try {
      // Store a default position immediately
      if (chrome.storage && chrome.storage.local) {
        chrome.storage.local.set({ 
          lastRightClickPosition: { x: window.innerWidth / 2, y: window.innerHeight / 2 }
        }, function() {
          console.log("Default position stored");
        });
      } else {
        console.error("Chrome storage API not available");
      }
      
      // Store the last right-click position
      document.addEventListener('contextmenu', function(event) {
        console.log("Right-click detected at:", event.clientX, event.clientY);
        
        try {
          const rightClickPosition = { 
            x: event.clientX, 
            y: event.clientY 
          };
          
          if (chrome.storage && chrome.storage.local) {
            chrome.storage.local.set({ 
              lastRightClickPosition: rightClickPosition
            }, function() {
              console.log("Right-click position stored:", rightClickPosition);
            });
          } else {
            console.error("Chrome storage API not available in contextmenu handler");
          }
        } catch (error) {
          console.error("Error in contextmenu handler:", error);
        }
      });
      
      // Listen for messages from the background script
      if (chrome.runtime && chrome.runtime.onMessage) {
        chrome.runtime.onMessage.addListener(function(message, sender, sendResponse) {
          console.log("Content script received message:", message);
          
          if (sendResponse) {
            sendResponse({ status: "Message received by content script" });
          }
          return true; // Keep the message channel open for async responses
        });
      } else {
        console.error("Chrome runtime API not available");
      }
    } catch (error) {
      console.error("Error initializing content script:", error);
    }
  } else {
    console.error("Chrome API not available in content script");
  }
});
