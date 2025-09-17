// background.js - Simple version
console.log("Fix with AI background script loaded");

// Function to capture element data at a specific position
function captureElementAtPosition(x, y) {
  try {
    // Try to get the element at the specified position
    const element = document.elementFromPoint(x, y);
    
    if (!element) {
      return null;
    }
    
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

// Function to get the position from localStorage
function getPositionFromLocalStorage() {
  try {
    const positionStr = localStorage.getItem('fixWithAI_position');
    if (positionStr) {
      return JSON.parse(positionStr);
    }
  } catch (error) {
    console.error("Error getting position from localStorage:", error);
  }
  return { x: 500, y: 500 }; // Default position
}

// Create context menu when extension is installed
chrome.runtime.onInstalled.addListener(function() {
  chrome.contextMenus.create({
    id: "fixWithAI",
    title: "Fix with AI",
    contexts: ["all"]
  });
});

// Handle context menu clicks
chrome.contextMenus.onClicked.addListener(function(info, tab) {
  if (info.menuItemId === "fixWithAI" && tab && tab.id) {
    // Execute a script to get the position from localStorage and capture the element
    chrome.scripting.executeScript({
      target: { tabId: tab.id },
      func: function() {
        const position = getPositionFromLocalStorage();
        return captureElementAtPosition(position.x, position.y);
      }
    }).then(function(results) {
      if (results && results[0] && results[0].result) {
        const elementData = results[0].result;
        
        // Store the element data in chrome.storage.local
        chrome.storage.local.set({ 
          lastElementData: elementData,
          elementCaptureTimestamp: Date.now()
        });
        
        // Set a badge to indicate that element data is available
        chrome.action.setBadgeText({ text: "!" });
        chrome.action.setBadgeBackgroundColor({ color: "#FF0000" });
      }
    }).catch(function(error) {
      console.error("Error executing script:", error);
    });
  }
});
