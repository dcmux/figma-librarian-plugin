import React, { useEffect, useState } from "react";

const CDN_URL = "https://cdn.jsdelivr.net/npm/@shadcn/ui@latest/package.json";

export function App() {
  console.log("🎨 UI Component loaded!");
  
  const [activeTab, setActiveTab] = useState("callouts");
  const [components, setComponents] = useState<string[]>([
    "accordion", "alert", "alert-dialog", "avatar", "badge", "breadcrumb", "button", 
    "calendar", "card", "carousel", "checkbox", "collapsible", "combobox", "command",
    "context-menu", "data-table", "date-picker", "dialog", "drawer", "dropdown-menu",
    "form", "hover-card", "input", "input-otp", "label", "menubar", "navigation-menu",
    "pagination", "popover", "progress", "radio-group", "resizable", "scroll-area",
    "select", "separator", "sheet", "skeleton", "slider", "sonner", "switch", "table",
    "tabs", "textarea", "toast", "toggle", "toggle-group", "tooltip"
  ]);
  const [selected, setSelected] = useState<string>("");
  const [calloutNumber, setCalloutNumber] = useState("1");
  const [numberFormat, setNumberFormat] = useState("01,02,03");
  const [connectorType, setConnectorType] = useState("solid");
  const [connectorColor, setConnectorColor] = useState("#DD1D19");
  const [position, setPosition] = useState("top");
  const [createWireframe, setCreateWireframe] = useState(true);
  const [hasSelection, setHasSelection] = useState(false);

  useEffect(() => {
    // Listen for selection changes from Figma
    const handleMessage = (event: MessageEvent) => {
      if (event.data.pluginMessage?.type === "selection-changed") {
        setHasSelection(event.data.pluginMessage.hasSelection);
      }
    };

    window.addEventListener("message", handleMessage);
    
    // Request initial selection state
    parent.postMessage(
      {
        pluginMessage: {
          type: "get-selection",
        },
      },
      "*"
    );

    return () => window.removeEventListener("message", handleMessage);
  }, []);

  const handleAdd = () => {
    console.log("Button clicked");
    parent.postMessage(
      {
        pluginMessage: {
          type: "add-annotation",
          component: selected,
          position,
          createWireframe,
          connectorColor,
        },
      },
      "*"
    );
  };

  // Position selector component
  const PositionSelector = () => (
    <div style={{
      display: "grid",
      gridTemplateColumns: "repeat(3, 1fr)",
      gap: "8px",
      width: "92px",
      height: "70px"
    }}>
      {/* Top */}
      <button
        onClick={() => setPosition("top")}
        style={{
          gridColumn: "2",
          width: "24px",
          height: "24px",
          borderRadius: "50%",
          border: position === "top" ? "2px solid #0088FF" : "2px solid #D9D9D9",
          backgroundColor: position === "top" ? "#0088FF" : "#FFFFFF",
          cursor: "pointer"
        }}
      />
      {/* Left */}
      <button
        onClick={() => setPosition("left")}
        style={{
          gridColumn: "1",
          gridRow: "2",
          width: "24px",
          height: "24px",
          borderRadius: "50%",
          border: position === "left" ? "2px solid #0088FF" : "2px solid #D9D9D9",
          backgroundColor: position === "left" ? "#0088FF" : "#FFFFFF",
          cursor: "pointer"
        }}
      />
      {/* Center (placeholder) */}
      <div style={{
        gridColumn: "2",
        gridRow: "2",
        width: "24px",
        height: "24px",
        borderRadius: "50%",
        backgroundColor: "#EBEBEB"
      }} />
      {/* Right */}
      <button
        onClick={() => setPosition("right")}
        style={{
          gridColumn: "3",
          gridRow: "2",
          width: "24px",
          height: "24px",
          borderRadius: "50%",
          border: position === "right" ? "2px solid #0088FF" : "2px solid #D9D9D9",
          backgroundColor: position === "right" ? "#0088FF" : "#FFFFFF",
          cursor: "pointer"
        }}
      />
      {/* Bottom */}
      <button
        onClick={() => setPosition("bottom")}
        style={{
          gridColumn: "2",
          gridRow: "3",
          width: "24px",
          height: "24px",
          borderRadius: "50%",
          border: position === "bottom" ? "2px solid #0088FF" : "2px solid #D9D9D9",
          backgroundColor: position === "bottom" ? "#0088FF" : "#FFFFFF",
          cursor: "pointer"
        }}
      />
    </div>
  );

  // Preview component
  const PreviewCallout = () => (
    <div style={{
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      justifyContent: "center",
      gap: "8px"
    }}>
      {/* Circle with number */}
      <div style={{
        width: "48px",
        height: "48px",
        borderRadius: "50%",
        border: `2px solid ${connectorColor}`,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        fontSize: "16px",
        fontWeight: "bold",
        color: connectorColor
      }}>
        {calloutNumber.padStart(2, "0")}
      </div>
      {/* Connector line */}
      <div style={{
        width: "2px",
        height: "20px",
        backgroundColor: connectorColor
      }} />
      {/* Dot */}
      <div style={{
        width: "8px",
        height: "8px",
        borderRadius: "50%",
        backgroundColor: connectorColor
      }} />
    </div>
  );

  return (
    <div style={{ 
      padding: "20px", 
      fontFamily: "Inter, sans-serif", 
      fontSize: "14px",
      width: "100%",
      boxSizing: "border-box",
      backgroundColor: "#F5F5F5",
      minHeight: "100vh"
    }}>
      {/* Header */}
      <div style={{
        marginBottom: "20px",
        display: "flex",
        gap: "16px",
        alignItems: "flex-start"
      }}>
        <div style={{
          width: "72px",
          height: "72px",
          borderRadius: "8px",
          backgroundColor: "#FFB800",
          display: "flex",
          alignItems: "center",
          justifyContent: "center"
        }}>
          <span style={{ fontSize: "32px" }}>📌</span>
        </div>
        <div style={{ flex: 1 }}>
          <h2 style={{ margin: "0 0 8px 0", fontSize: "16px", fontWeight: 600 }}>
            <strong>Callout</strong> is a Figjam plugin
          </h2>
          <p style={{ 
            margin: 0, 
            fontSize: "13px", 
            color: "#646464",
            lineHeight: "1.5"
          }}>
            that helps automate the numbering of task-flows, annotation and the naming Shadcn components.
          </p>
        </div>
      </div>

      {/* Tabs */}
      <div style={{
        display: "flex",
        gap: "32px",
        marginBottom: "20px",
        borderBottom: "1px solid #E9E9E9",
        paddingBottom: "0"
      }}>
        {["callouts", "taskflows", "keyboard"].map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            style={{
              padding: "0 0 12px 0",
              border: "none",
              backgroundColor: "transparent",
              fontSize: "14px",
              fontWeight: activeTab === tab ? 500 : 400,
              color: activeTab === tab ? "#1E1E1E" : "#99A1AF",
              cursor: "pointer",
              borderBottom: activeTab === tab ? "3px solid #0088FF" : "none",
              marginBottom: "-1px"
            }}
          >
            {tab.charAt(0).toUpperCase() + tab.slice(1)}
          </button>
        ))}
      </div>

      {/* Tab Content */}
      {activeTab === "callouts" && (
        <div style={{ display: "flex", flexDirection: "column", gap: "20px" }}>
          {/* Preview and Position */}
          <div style={{
            display: "grid",
            gridTemplateColumns: "1fr 1fr",
            gap: "16px"
          }}>
            {/* Preview */}
            <div style={{
              backgroundColor: "white",
              borderRadius: "4px",
              padding: "16px",
              border: "1px solid #E9E9E9",
              display: "flex",
              flexDirection: "column",
              gap: "8px"
            }}>
              <p style={{ margin: "0 0 8px 0", fontSize: "14px", fontWeight: 500 }}>
                Preview
              </p>
              <div style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                minHeight: "134px"
              }}>
                <PreviewCallout />
              </div>
            </div>

            {/* Position */}
            <div style={{
              backgroundColor: "white",
              borderRadius: "4px",
              padding: "16px",
              border: "1px solid #E9E9E9",
              display: "flex",
              flexDirection: "column",
              gap: "8px"
            }}>
              <p style={{ margin: "0 0 8px 0", fontSize: "14px", fontWeight: 500 }}>
                Position
              </p>
              <div style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                flex: 1
              }}>
                <PositionSelector />
              </div>
            </div>
          </div>

          {/* Controls */}
          <div style={{
            backgroundColor: "white",
            borderRadius: "4px",
            padding: "16px",
            border: "1px solid #E9E9E9",
            display: "flex",
            flexDirection: "column",
            gap: "16px"
          }}>
            {/* Type and Format */}
            <div style={{
              display: "grid",
              gridTemplateColumns: "1fr 1fr",
              gap: "16px"
            }}>
              <div style={{
                display: "flex",
                flexDirection: "column",
                gap: "8px"
              }}>
                <label style={{ fontSize: "14px", fontWeight: 500 }}>Type</label>
                <select 
                  value="numbers"
                  style={{
                    width: "100%",
                    padding: "12px 15px",
                    fontSize: "14px",
                    border: "1px solid #D9D9D9",
                    borderRadius: "4px",
                    backgroundColor: "white",
                    cursor: "pointer"
                  }}
                >
                  <option>Numbers</option>
                  <option>Letters</option>
                  <option>Roman</option>
                </select>
              </div>

              <div style={{
                display: "flex",
                flexDirection: "column",
                gap: "8px"
              }}>
                <label style={{ fontSize: "14px", fontWeight: 500 }}>Format</label>
                <input 
                  type="text"
                  value={numberFormat}
                  onChange={(e) => setNumberFormat(e.target.value)}
                  style={{
                    width: "100%",
                    padding: "12px 15px",
                    fontSize: "14px",
                    border: "1px solid #D9D9D9",
                    borderRadius: "4px",
                    boxSizing: "border-box"
                  }}
                />
              </div>
            </div>

            {/* Connector and Color */}
            <div style={{
              display: "grid",
              gridTemplateColumns: "1fr 1fr",
              gap: "16px"
            }}>
              <div style={{
                display: "flex",
                flexDirection: "column",
                gap: "8px"
              }}>
                <label style={{ fontSize: "14px", fontWeight: 500 }}>Connector</label>
                <select 
                  value={connectorType}
                  onChange={(e) => setConnectorType(e.target.value)}
                  style={{
                    width: "100%",
                    padding: "12px 15px",
                    fontSize: "14px",
                    border: "1px solid #D9D9D9",
                    borderRadius: "4px",
                    backgroundColor: "white",
                    cursor: "pointer"
                  }}
                >
                  <option value="solid">Solid</option>
                  <option value="dashed">Dashed</option>
                  <option value="dotted">Dotted</option>
                </select>
              </div>

              <div style={{
                display: "flex",
                flexDirection: "column",
                gap: "8px"
              }}>
                <label style={{ fontSize: "14px", fontWeight: 500 }}>Color</label>
                <div style={{
                  display: "flex",
                  gap: "8px",
                  alignItems: "center",
                  border: "1px solid #D9D9D9",
                  borderRadius: "4px",
                  padding: "8px 12px",
                  backgroundColor: "white"
                }}>
                  <input
                    type="color"
                    value={connectorColor}
                    onChange={(e) => setConnectorColor(e.target.value)}
                    style={{
                      width: "24px",
                      height: "24px",
                      border: "none",
                      borderRadius: "2px",
                      cursor: "pointer",
                      padding: "0"
                    }}
                  />
                  <span style={{ fontSize: "14px", fontWeight: 500 }}>
                    {connectorColor.toUpperCase()}
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Checkbox and Button */}
          <div style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center"
          }}>
            <label style={{
              display: "flex",
              alignItems: "center",
              gap: "8px",
              fontSize: "14px",
              cursor: "pointer"
            }}>
              <input
                type="checkbox"
                checked={createWireframe}
                onChange={(e) => setCreateWireframe(e.target.checked)}
                style={{
                  width: "16px",
                  height: "16px",
                  cursor: "pointer"
                }}
              />
              <span>Add placeholder rectangle</span>
            </label>

            <button 
              onClick={handleAdd}
              disabled={!selected && !hasSelection}
              style={{
                width: "76px",
                height: "76px",
                borderRadius: "50%",
                backgroundColor: (selected || hasSelection) ? "#165DFF" : "#CCC",
                color: "white",
                border: "none",
                fontSize: "32px",
                cursor: (selected || hasSelection) ? "pointer" : "not-allowed",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                boxShadow: "0px 10px 15px -3px rgba(0,0,0,0.1), 0px 4px 6px -4px rgba(0,0,0,0.1)"
              }}
            >
              +
            </button>
          </div>
        </div>
      )}

      {/* Taskflows Tab */}
      {activeTab === "taskflows" && (
        <div style={{ padding: "20px", textAlign: "center", color: "#99A1AF" }}>
          <p>Taskflows feature coming soon...</p>
        </div>
      )}

      {/* Keyboard Tab */}
      {activeTab === "keyboard" && (
        <div style={{ padding: "20px", textAlign: "center", color: "#99A1AF" }}>
          <p>Keyboard shortcuts feature coming soon...</p>
        </div>
      )}
    </div>
  );
}
