document.addEventListener("DOMContentLoaded", () => {
    console.log("Popup DOM loaded");
    const elementPreview = document.getElementById("elementPreview");
    const fixInput = document.getElementById("fixText");
    const status = document.getElementById("status");
    const sendFixButton = document.getElementById("sendFix");
  
    // Function to update the UI with element data
    function updateElementPreview(lastElementData) {
      console.log("Updating element preview with data:", lastElementData);
      
      if (lastElementData) {
        // Format the element details for better readability
        let elementDetails = `<${lastElementData.tagName?.toLowerCase() || 'unknown'}`;
        
        if (lastElementData.classList && lastElementData.classList.length > 0) {
          elementDetails += `\n  class="${lastElementData.classList.join(' ')}"`;
        }
        
        if (lastElementData.id) {
          elementDetails += `\n  id="${lastElementData.id}"`;
        }
        
        elementDetails += '>';
        
        // Add a preview of the text content if available
        if (lastElementData.textContent) {
          const truncatedText = lastElementData.textContent.length > 50 
            ? lastElementData.textContent.substring(0, 50) + '...' 
            : lastElementData.textContent;
          
          elementDetails += `\n\nContent: "${truncatedText}"`;
        }
        
        // Update the popup with the element's details
        elementPreview.innerText = elementDetails;
        sendFixButton.disabled = false;
        
        // Focus on the input field
        setTimeout(() => {
          fixInput.focus();
        }, 100);
      } else {
        elementPreview.innerText = "No element selected. Right-click on an element and select 'Fix with AI'.";
        sendFixButton.disabled = true;
      }
    }
    
    // Retrieve element data from chrome storage
    console.log("Retrieving element data from storage");
    chrome.storage.local.get("lastElementData", (result) => {
      console.log("Retrieved from storage:", result);
      updateElementPreview(result.lastElementData);
    });
    
    // Listen for storage changes to update the UI in real-time
    chrome.storage.onChanged.addListener((changes, namespace) => {
      if (namespace === 'local' && changes.lastElementData) {
        updateElementPreview(changes.lastElementData.newValue);
      }
    });
  
  // Create a modal for displaying the formatted prompt
  function createPromptModal() {
    const modal = document.createElement('div');
    modal.style.position = 'fixed';
    modal.style.top = '0';
    modal.style.left = '0';
    modal.style.width = '100%';
    modal.style.height = '100%';
    modal.style.backgroundColor = 'rgba(0, 0, 0, 0.7)';
    modal.style.display = 'flex';
    modal.style.justifyContent = 'center';
    modal.style.alignItems = 'center';
    modal.style.zIndex = '1000';
    
    const content = document.createElement('div');
    content.style.backgroundColor = 'white';
    content.style.padding = '20px';
    content.style.borderRadius = '8px';
    content.style.width = '80%';
    content.style.maxHeight = '80%';
    content.style.overflow = 'auto';
    content.style.position = 'relative';
    
    const closeButton = document.createElement('button');
    closeButton.innerText = '×';
    closeButton.style.position = 'absolute';
    closeButton.style.top = '10px';
    closeButton.style.right = '10px';
    closeButton.style.border = 'none';
    closeButton.style.background = 'none';
    closeButton.style.fontSize = '20px';
    closeButton.style.cursor = 'pointer';
    closeButton.onclick = () => document.body.removeChild(modal);
    
    const title = document.createElement('h3');
    title.innerText = 'Formatted Prompt for Cline';
    
    const promptText = document.createElement('pre');
    promptText.style.whiteSpace = 'pre-wrap';
    promptText.style.wordBreak = 'break-word';
    promptText.style.backgroundColor = '#f5f5f5';
    promptText.style.padding = '10px';
    promptText.style.borderRadius = '4px';
    promptText.style.maxHeight = '300px';
    promptText.style.overflow = 'auto';
    
    const copyButton = document.createElement('button');
    copyButton.innerText = 'Copy to Clipboard';
    copyButton.style.marginTop = '10px';
    copyButton.style.padding = '8px 12px';
    copyButton.style.border = 'none';
    copyButton.style.backgroundColor = '#4f46e5';
    copyButton.style.color = 'white';
    copyButton.style.borderRadius = '4px';
    copyButton.style.cursor = 'pointer';
    
    content.appendChild(closeButton);
    content.appendChild(title);
    content.appendChild(promptText);
    content.appendChild(copyButton);
    modal.appendChild(content);
    
    return { modal, promptText, copyButton };
  }

  // Send the fix when the button is clicked
  document.getElementById("sendFix").addEventListener("click", () => {
    const fix = fixInput.value;
    if (!fix) return;

    // Get the latest element data from storage
    chrome.storage.local.get("lastElementData", ({ lastElementData }) => {
      if (!lastElementData) {
        status.innerText = "❌ No element selected.";
        return;
      }

      status.innerText = "⏳ Sending fix...";
      
      fetch("http://localhost:5010/fix", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ element: lastElementData, fix })
      })
      .then(response => response.json())
      .then(data => {
        status.innerText = "✅ Fix sent!";
        
        // Create and show the modal with the formatted prompt
        const { modal, promptText, copyButton } = createPromptModal();
        promptText.innerText = data.formattedPrompt || "No formatted prompt received";
        
        // Add copy functionality
        copyButton.onclick = () => {
          navigator.clipboard.writeText(promptText.innerText)
            .then(() => {
              copyButton.innerText = "Copied!";
              setTimeout(() => {
                copyButton.innerText = "Copy to Clipboard";
              }, 2000);
            })
            .catch(err => {
              console.error('Failed to copy text: ', err);
              copyButton.innerText = "Copy failed";
            });
        };
        
        document.body.appendChild(modal);
      })
      .catch(error => {
        console.error("Error sending fix:", error);
        status.innerText = "❌ Failed to send fix.";
      });
    });
  });
});
