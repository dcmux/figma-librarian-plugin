export async function createAnnotation(msg: any, nodes: any[]) {
  // Functionality stripped. Placeholder only.
  return;
}

// Complete Figma plugin UI HTML with full design
const uiHtml = `<!DOCTYPE html>
<html>
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Bolt Figma - Callout</title>
  <style>
    * { margin: 0; padding: 0; box-sizing: border-box; }
    body { font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Helvetica, Arial, sans-serif; font-size: 14px; background: #f5f5f5; color: #1e1e1e; line-height: 1.4; }
    
    .header { display: flex; gap: 16px; padding: 20px; background: white; border-bottom: 1px solid #e9e9e9; }
    .header-icon { width: 72px; height: 72px; border-radius: 8px; background: #FFB800; display: flex; align-items: center; justify-content: center; flex-shrink: 0; font-size: 32px; }
    .header-text h2 { margin: 0 0 8px 0; font-size: 16px; font-weight: 600; }
    .header-text p { margin: 0; font-size: 13px; color: #646464; }
    
    .tabs { display: flex; gap: 32px; padding: 16px 20px; border-bottom: 1px solid #e9e9e9; background: white; }
    .tab { padding: 0 0 12px 0; border: none; background: transparent; font-size: 14px; cursor: pointer; color: #99a1af; font-weight: 400; margin-bottom: -1px; }
    .tab.active { color: #1e1e1e; font-weight: 500; border-bottom: 3px solid #0088ff; }
    
    .content { padding: 20px; overflow-y: auto; }
    
    .grid-2 { display: grid; grid-template-columns: 1fr 1fr; gap: 16px; margin-bottom: 16px; }
    .box { background: white; border-radius: 4px; padding: 16px; border: 1px solid #e9e9e9; }
    .box-title { margin: 0 0 8px 0; font-size: 14px; font-weight: 500; }
    
    .preview-container { display: flex; align-items: center; justify-content: center; min-height: 134px; }
    .preview { display: flex; flex-direction: column; align-items: center; gap: 8px; }
    .circle { width: 48px; height: 48px; border: 2px solid #dd1d19; border-radius: 50%; display: flex; align-items: center; justify-content: center; font-weight: bold; color: #dd1d19; font-size: 18px; }
    .connector { width: 2px; height: 20px; background: #dd1d19; }
    .dot { width: 8px; height: 8px; border-radius: 50%; background: #dd1d19; }
    
    .position-selector { display: grid; grid-template-columns: repeat(3, 1fr); gap: 8px; width: 92px; }
    .pos-btn { width: 24px; height: 24px; border-radius: 50%; border: 2px solid #d9d9d9; background: white; cursor: pointer; }
    .pos-btn.active { border-color: #0088ff; background: #0088ff; }
    .pos-center { background: #ebebeb !important; border: none; cursor: default; }
    
    .controls { background: white; border-radius: 4px; padding: 16px; border: 1px solid #e9e9e9; }
    .control-row { display: grid; grid-template-columns: 1fr 1fr; gap: 16px; margin-bottom: 16px; }
    .control-row:last-child { margin-bottom: 0; }
    .control-group { display: flex; flex-direction: column; gap: 8px; }
    .control-label { font-size: 14px; font-weight: 500; }
    
    select, input[type="text"], input[type="color"] { width: 100%; padding: 12px 15px; font-size: 14px; border: 1px solid #d9d9d9; border-radius: 4px; background: white; }
    
    .color-input-group { display: flex; gap: 8px; align-items: center; border: 1px solid #d9d9d9; border-radius: 4px; padding: 8px 12px; }
    input[type="color"] { width: 24px; height: 24px; border: none; border-radius: 2px; padding: 0; cursor: pointer; }
    .color-hex { font-size: 14px; font-weight: 500; }
    
    .footer { display: flex; justify-content: space-between; align-items: center; padding: 16px; border-top: 1px solid #e9e9e9; background: white; }
    .checkbox-label { display: flex; align-items: center; gap: 8px; font-size: 14px; cursor: pointer; }
    .checkbox-label input { width: 16px; height: 16px; cursor: pointer; }
    
    .action-button { width: 76px; height: 76px; border-radius: 50%; background: #165dff; color: white; border: none; font-size: 32px; cursor: pointer; box-shadow: 0px 10px 15px -3px rgba(0,0,0,0.1), 0px 4px 6px -4px rgba(0,0,0,0.1); display: flex; align-items: center; justify-content: center; }
    .action-button:disabled { background: #ccc; cursor: not-allowed; }
    
    .wrapper { display: flex; flex-direction: column; height: 100vh; }
    .content-scroll { flex: 1; overflow-y: auto; }
  </style>
</head>
<body>
  <div class="wrapper">
    <div class="header">
      <div class="header-icon">📌</div>
      <div class="header-text" style="flex: 1;">
        <h2><strong>Callout</strong> is a Figjam plugin</h2>
        <p>that helps automate the numbering of task-flows, annotation and the naming Shadcn components.</p>
      </div>
    </div>
    
    <div class="tabs">
      <button class="tab active">Callouts</button>
      <button class="tab">Taskflows</button>
      <button class="tab">Keyboard</button>
    </div>
    
    <div class="content-scroll">
      <div class="content">
        <!-- Preview and Position -->
        <div class="grid-2">
          <div class="box">
            <p class="box-title">Preview</p>
            <div class="preview-container">
              <div class="preview">
                <div class="circle">01</div>
                <div class="connector"><\/div>
                <div class="dot"><\/div>
              </div>
            </div>
          </div>
          
          <div class="box">
            <p class="box-title">Position</p>
            <div class="preview-container">
              <div class="position-selector">
                <button class="pos-btn" style="grid-column: 2;"><\/button>
                <button class="pos-btn active" style="grid-column: 1; grid-row: 2;"><\/button>
                <div class="pos-center" style="grid-column: 2; grid-row: 2;"><\/div>
                <button class="pos-btn" style="grid-column: 3; grid-row: 2;"><\/button>
                <button class="pos-btn" style="grid-column: 2; grid-row: 3;"><\/button>
              </div>
            </div>
          </div>
        </div>
        
        <!-- Controls -->
        <div class="controls">
          <div class="control-row">
            <div class="control-group">
              <label class="control-label">Type</label>
              <select>
                <option>Numbers</option>
                <option>Letters</option>
                <option>Roman</option>
              </select>
            </div>
            <div class="control-group">
              <label class="control-label">Format</label>
              <input type="text" value="01,02,03">
            </div>
          </div>
          
          <div class="control-row">
            <div class="control-group">
              <label class="control-label">Connector</label>
              <select>
                <option>Solid</option>
                <option>Dashed</option>
                <option>Dotted</option>
              </select>
            </div>
            <div class="control-group">
              <label class="control-label">Color</label>
              <div class="color-input-group">
                <input type="color" value="#dd1d19">
                <span class="color-hex">#DD1D19</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    
    <div class="footer">
      <label class="checkbox-label">
        <input type="checkbox" checked>
        <span>Add placeholder rectangle</span>
      </label>
      <button class="action-button">+</button>
    </div>
  </div>
  
  <script>
    window.parent.postMessage({pluginMessage:{type:"get-selection"}},"*");
  <\/script>
</body>
</html>`;

try {
  // @ts-ignore - Try to use __html__ if injected by build
  figma.showUI(__html__, { width: 420, height: 950 });
} catch (e) {
  // Fallback to our embedded HTML
  figma.showUI(uiHtml, { width: 420, height: 950 });
}

console.log("🚀 Plugin loaded successfully!");

// Function to check and notify UI about selection changes
const notifySelectionChange = () => {
  const hasSelection = figma.currentPage.selection.length > 0;
  figma.ui.postMessage({
    pluginMessage: {
      type: "selection-changed",
      hasSelection: hasSelection
    }
  });
};

// Handle messages from the UI
// figma.ui.on is incorrect for receiving messages from the plugin UI.
// Use figma.ui.onmessage which receives the posted `pluginMessage` payload directly.
figma.ui.onmessage = async (msg: any) => {
  try {
    console.log("📢 Message received:", msg);

    // The UI posts messages using `parent.postMessage({ pluginMessage: { ... } }, '*')`.
    // The `msg` here is the pluginMessage object itself, so inspect `msg.type`.
    if (msg.type === "get-selection") {
      notifySelectionChange();
      return;
    }

    if (msg.type === "add-annotation") {
      console.log("🎯 Creating annotation:", msg);

      const pluginMsg = msg;
      const nodes = figma.currentPage.selection;

      // Working logic: annotation above rectangle, connector, no grouping
      let targetNode: SceneNode | undefined;
      if (nodes.length === 0 && pluginMsg.createWireframe) {
        // Create rectangle shape
        const rect = figma.createRectangle();
        rect.resize(120, 80);
        rect.fills = [{ type: "SOLID", color: { r: 0.95, g: 0.95, b: 0.95 } }];
        rect.strokes = [{ type: "SOLID", color: { r: 0.7, g: 0.7, b: 0.7 } }];
        rect.strokeWeight = 2;
        rect.cornerRadius = 16;
        const viewport = figma.viewport.center;
        rect.x = viewport.x - 60;
        rect.y = viewport.y - 40;
        figma.currentPage.appendChild(rect);
        targetNode = rect;
      } else if (nodes.length > 0) {
        // Use selected node
        targetNode = nodes[0];
      }

      // Create annotation text
      await figma.loadFontAsync({ family: "Inter", style: "Regular" });
      const text = figma.createText();
      text.characters = pluginMsg.component || "button";
      text.fontSize = 32;
      text.fontName = { family: "Inter", style: "Regular" };
      text.fills = [{ type: "SOLID", color: { r: 0, g: 0, b: 0 } }];
      figma.currentPage.appendChild(text);

      // Position annotation above shape
      let posX = 100;
      let posY = 100;
      if (targetNode && targetNode.absoluteBoundingBox) {
        const bounds = targetNode.absoluteBoundingBox;
        posX = bounds.x + bounds.width / 2 - text.width / 2;
        posY = bounds.y - text.height - 24;
      }
      text.x = posX;
      text.y = posY;

      // Create connector if shape exists
      if (targetNode && typeof targetNode.id === "string" && targetNode.id.length > 0) {
        // Parse connector color from UI (hex to RGB)
        const hexColor = pluginMsg.connectorColor || "#F24822";
        const r = parseInt(hexColor.slice(1, 3), 16) / 255;
        const g = parseInt(hexColor.slice(3, 5), 16) / 255;
        const b = parseInt(hexColor.slice(5, 7), 16) / 255;

        const connector = figma.createConnector();
        connector.strokes = [{ type: "SOLID", color: { r, g, b } }];
        connector.strokeWeight = 6;
        connector.connectorStart = { endpointNodeId: targetNode.id, magnet: "TOP" };
        connector.connectorEnd = { endpointNodeId: text.id, magnet: "BOTTOM" };
        figma.currentPage.appendChild(connector);

        // Add circle at connector start (top-center of the target node)
        const circle = figma.createEllipse();
        circle.resize(32, 32);
        circle.fills = [{ type: "SOLID", color: { r, g, b } }];
        if (targetNode && targetNode.absoluteBoundingBox) {
          const tb = targetNode.absoluteBoundingBox;
          circle.x = tb.x + tb.width / 2 - 16;
          circle.y = tb.y - 16; // place circle centered on the top edge
        } else {
          // fallback to current text position if bounds unavailable
          circle.x = posX + text.width / 2 - 16;
          circle.y = posY + text.height / 2 - 16;
        }
        figma.currentPage.appendChild(circle);

        figma.currentPage.selection = [text, targetNode, connector, circle];
        figma.viewport.scrollAndZoomIntoView([text, targetNode, connector, circle]);
      } else {
        figma.currentPage.selection = [text];
        figma.viewport.scrollAndZoomIntoView([text]);
      }
    }
  } catch (error) {
    figma.notify("Error creating annotation: " + (error && error.message ? error.message : error));
    console.error(error);
  }
};

// Listen for selection changes
figma.on("selectionchange", notifySelectionChange);

// Initial notification
notifySelectionChange();
