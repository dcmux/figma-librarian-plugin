import express from "express";
import cors from "cors";

const app = express();
app.use(cors());
app.use(express.json());

app.post("/fix", (req, res) => {
  const { element, fix } = req.body;

  console.log("📦 Fix received:");
  console.log("🧱 Element:", element.tagName, element.classList);
  console.log("🛠️ Fix:", fix);

  // Format the element data and fix request into a prompt for Cline
  const elementDetails = formatElementDetails(element);
  const clinePrompt = formatClinePrompt(elementDetails, fix);
  
  // Log the formatted prompt that would be sent to Cline
  console.log("\n🤖 Formatted prompt for Cline:");
  console.log(clinePrompt);
  
  // In a real implementation, this would send the prompt to Cline
  // For now, we'll just return the formatted prompt to the client
  res.status(200).send({ 
    message: "Fix received!",
    formattedPrompt: clinePrompt
  });
});

// Function to format element details into a readable string
function formatElementDetails(element) {
  let details = `<${element.tagName.toLowerCase()}`;
  
  if (element.classList && element.classList.length > 0) {
    details += ` class="${element.classList.join(' ')}"`;
  }
  
  if (element.id) {
    details += ` id="${element.id}"`;
  }
  
  details += '>';
  
  if (element.textContent) {
    const truncatedText = element.textContent.length > 100 
      ? element.textContent.substring(0, 100) + '...' 
      : element.textContent;
    
    details += `\n  ${truncatedText}\n</${element.tagName.toLowerCase()}>`;
  } else {
    details += `</${element.tagName.toLowerCase()}>`;
  }
  
  return details;
}

// Function to format the prompt for Cline
function formatClinePrompt(elementDetails, fixRequest) {
  return `I need to fix this HTML element:

\`\`\`html
${elementDetails}
\`\`\`

Fix request: ${fixRequest}

Please provide the updated HTML with the requested changes and explain what you did.`;
}

const PORT = 5010;
app.listen(PORT, () => {
  console.log(`✅ AI Dev Agent is listening on http://localhost:${PORT}`);
});
