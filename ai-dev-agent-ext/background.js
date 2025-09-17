// background.js - Service Worker for Fix with AI extension

console.log("Background script loaded");

// Function to capture element data at a specific position (executed in content script context)
function captureElementAtPosition(x, y) {
  try {
    console.log("Capturing element at position:", x, y);
    
    // Try to get the element at the specified position
    const element = document.elementFromPoint(x, y);
    
    if (!element) {
      console.error("No element found at position:", x, y);
      return null;
    }
    
    console.log("Element found:", element.tagName);
    
    // Create element data object
    return {
      tagName: element.tagName,
      classList: Array.from(element.classList || []),
      id: element.id || "",
      textContent: (element.textContent || "").trim()
    };
  } catch (error) {
    console.error("Error capturing element:", error);
    return null;
  }
}

// Function to open the popup
function openPopup() {
  try {
    chrome.action.openPopup();
    console.log("Popup opened");
  } catch (error) {
    console.error("Error opening popup:", error);
    
    // Try again after a short delay
    setTimeout(function() {
      try {
        chrome.action.openPopup();
        console.log("Popup opened after delay");
      } catch (retryError) {
        console.error("Error opening popup after delay:", retryError);
      }
    }, 500);
  }
}

// Initialize the extension
chrome.runtime.onInstalled.addListener(function() {
  console.log("Extension installed, creating context menu");
  
  // Remove any existing menu items first
  chrome.contextMenus.removeAll(function() {
    // Create the context menu
    chrome.contextMenus.create({
      id: "fixWithAI",
      title: "Fix with AI",
      contexts: ["all"]
    }, function() {
      if (chrome.runtime.lastError) {
        console.error("Error creating context menu:", chrome.runtime.lastError);
      } else {
        console.log("Context menu created successfully");
      }
    });
  });
  
  // Store a default position in case the content script hasn't run yet
  chrome.storage.local.set({ 
    lastRightClickPosition: { x: 500, y: 500 }
  }, function() {
    console.log("Default position stored by background script");
  });
});

// Handle context menu clicks
chrome.contextMenus.onClicked.addListener(function(info, tab) {
  console.log("Context menu clicked:", info.menuItemId);
  
  if (info.menuItemId === "fixWithAI" && tab && tab.id) {
    console.log("Fix with AI menu item clicked, tab id:", tab.id);
    
    // Get the right-click position from storage
    chrome.storage.local.get("lastRightClickPosition", function(result) {
      console.log("Storage get result:", result);
      
      const position = result.lastRightClickPosition;
      
      if (!position) {
        console.error("No right-click position found in storage");
        
        // Use a default position as fallback
        const defaultPosition = { x: 500, y: 500 };
        console.log("Using default position:", defaultPosition);
        
        // Execute script with default position
        executeScriptAndOpenPopup(tab.id, defaultPosition.x, defaultPosition.y);
      } else {
        console.log("Retrieved position from storage:", position);
        
        // Execute script with stored position
        executeScriptAndOpenPopup(tab.id, position.x, position.y);
      }
    });
  }
});

// Helper function to execute script and open popup
function executeScriptAndOpenPopup(tabId, x, y) {
  // Execute a script to get the element at the specified position
  chrome.scripting.executeScript({
    target: { tabId: tabId },
    func: captureElementAtPosition,
    args: [x, y]
  }).then(function(results) {
    console.log("Script execution results:", results);
    
    if (results && results[0] && results[0].result) {
      const elementData = results[0].result;
      console.log("Element data captured:", elementData);
      
      // Store the element data in chrome.storage.local
      chrome.storage.local.set({ 
        lastElementData: elementData,
        elementCaptureTimestamp: Date.now()
      }, function() {
        console.log("Element data saved to storage");
        
        // Open the popup immediately after storing the data
        openPopup();
      });
    } else {
      console.error("No element data returned from script execution");
    }
  }).catch(function(error) {
    console.error("Error executing script:", error);
  });
}

// Also listen for changes to chrome.storage.local as a backup
chrome.storage.onChanged.addListener(function(changes, namespace) {
  if (namespace === 'local' && changes.elementCaptureTimestamp) {
    console.log("Element data updated in storage, opening popup");
    
    // Open the popup when element data is updated
    setTimeout(function() {
      openPopup();
    }, 100); // Small delay to ensure storage is fully updated
  }
});
