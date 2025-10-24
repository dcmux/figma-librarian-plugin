// This file runs in the Figma plugin sandbox and has access to the Figma API
// It communicates with the UI (React app) via postMessage

// Show the plugin UI
figma.showUI(__html__, {
  width: 680,
  height: 970,
  themeColors: true,
});

// Load and send saved repositories to UI on startup
(async () => {
  const customComponentRepos = await figma.clientStorage.getAsync('customComponentRepos') || [];
  const customBlockRepos = await figma.clientStorage.getAsync('customBlockRepos') || [];
  const customIconRepos = await figma.clientStorage.getAsync('customIconRepos') || [];
  
  figma.ui.postMessage({
    type: 'load-saved-repos',
    data: {
      customComponentRepos,
      customBlockRepos,
      customIconRepos
    }
  });
})();

// Helper function to convert hex color to RGB
function hexToRgb(hex: string): RGB {
  const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
  return result ? {
    r: parseInt(result[1], 16) / 255,
    g: parseInt(result[2], 16) / 255,
    b: parseInt(result[3], 16) / 255
  } : { r: 0, g: 0, b: 0 };
}

// Helper to load common fonts
async function loadFonts() {
  await figma.loadFontAsync({ family: "Inter", style: "Medium" });
  await figma.loadFontAsync({ family: "Inter", style: "Regular" });
  await figma.loadFontAsync({ family: "Inter", style: "Semi Bold" });
  await figma.loadFontAsync({ family: "Inter", style: "Bold" });
}

// ========================================
// SHADCN COMPONENT BUILDERS
// ========================================

async function createButton(config: any) {
  const { variant, size, icon, iconPosition, text } = config;
  
  await loadFonts();
  
  const button = figma.createFrame();
  button.name = `Button/${variant}/${size}`;
  button.layoutMode = "HORIZONTAL";
  button.counterAxisSizingMode = "AUTO";
  button.primaryAxisSizingMode = "AUTO";
  button.itemSpacing = 8;
  button.primaryAxisAlignItems = "CENTER";
  button.counterAxisAlignItems = "CENTER";
  
  // Size configurations
  const sizeConfig = {
    sm: { paddingX: 12, paddingY: 6, fontSize: 12, iconSize: 14, radius: 6 },
    default: { paddingX: 16, paddingY: 8, fontSize: 14, iconSize: 16, radius: 6 },
    lg: { paddingX: 20, paddingY: 12, fontSize: 16, iconSize: 20, radius: 8 },
    icon: { paddingX: 8, paddingY: 8, fontSize: 14, iconSize: 16, radius: 6 },
  };
  
  const cfg = sizeConfig[size] || sizeConfig.default;
  
  button.paddingLeft = cfg.paddingX;
  button.paddingRight = cfg.paddingX;
  button.paddingTop = cfg.paddingY;
  button.paddingBottom = cfg.paddingY;
  button.cornerRadius = cfg.radius;
  
  // Variant color configurations
  const variants = {
    default: { bg: '#000000', text: '#FFFFFF', border: null },
    destructive: { bg: '#EF4444', text: '#FFFFFF', border: null },
    outline: { bg: '#FFFFFF', text: '#000000', border: '#E5E7EB' },
    secondary: { bg: '#F3F4F6', text: '#000000', border: null },
    ghost: { bg: 'transparent', text: '#000000', border: null },
    link: { bg: 'transparent', text: '#000000', border: null, underline: true },
  };
  
  const variantConfig = variants[variant] || variants.default;
  
  // Set fills and strokes
  if (variantConfig.bg === 'transparent') {
    button.fills = [];
  } else {
    button.fills = [{ type: 'SOLID', color: hexToRgb(variantConfig.bg) }];
  }
  
  if (variantConfig.border) {
    button.strokeWeight = 1;
    button.strokes = [{ type: 'SOLID', color: hexToRgb(variantConfig.border) }];
  }
  
  // Add text
  const textNode = figma.createText();
  textNode.fontName = { family: "Inter", style: "Medium" };
  textNode.characters = text || "Button";
  textNode.fontSize = cfg.fontSize;
  textNode.fills = [{ type: 'SOLID', color: hexToRgb(variantConfig.text) }];
  
  if (variant === 'link') {
    button.paddingLeft = 0;
    button.paddingRight = 0;
  }
  
  button.appendChild(textNode);
  
  return button;
}

async function createCard(config: any) {
  const { variant } = config;
  
  await loadFonts();
  
  const card = figma.createFrame();
  card.name = `Card/${variant}`;
  card.layoutMode = "VERTICAL";
  card.counterAxisSizingMode = "AUTO";
  card.primaryAxisSizingMode = "AUTO";
  card.itemSpacing = 16;
  card.paddingLeft = 24;
  card.paddingRight = 24;
  card.paddingTop = 24;
  card.paddingBottom = 24;
  card.cornerRadius = 8;
  card.fills = [{ type: 'SOLID', color: hexToRgb('#FFFFFF') }];
  card.strokeWeight = 1;
  card.strokes = [{ type: 'SOLID', color: hexToRgb('#E5E7EB') }];
  
  // Add shadow
  card.effects = [{
    type: 'DROP_SHADOW',
    color: { r: 0, g: 0, b: 0, a: 0.1 },
    offset: { x: 0, y: 2 },
    radius: 4,
    visible: true,
    blendMode: 'NORMAL'
  }];
  
  // Card Header
  const header = figma.createFrame();
  header.name = "Card Header";
  header.layoutMode = "VERTICAL";
  header.counterAxisSizingMode = "AUTO";
  header.primaryAxisSizingMode = "FIXED";
  header.resize(280, 60);
  header.itemSpacing = 8;
  header.fills = [];
  
  const title = figma.createText();
  title.fontName = { family: "Inter", style: "Semi Bold" };
  title.characters = "Card Title";
  title.fontSize = 20;
  title.fills = [{ type: 'SOLID', color: hexToRgb('#000000') }];
  header.appendChild(title);
  
  const description = figma.createText();
  description.fontName = { family: "Inter", style: "Regular" };
  description.characters = "Card description goes here";
  description.fontSize = 14;
  description.fills = [{ type: 'SOLID', color: hexToRgb('#6B7280') }];
  header.appendChild(description);
  
  card.appendChild(header);
  
  // Card Content
  const content = figma.createText();
  content.fontName = { family: "Inter", style: "Regular" };
  content.characters = "Card content area";
  content.fontSize = 14;
  content.fills = [{ type: 'SOLID', color: hexToRgb('#000000') }];
  card.appendChild(content);
  
  return card;
}

async function createInput(config: any) {
  const { variant } = config;
  
  await loadFonts();
  
  const container = figma.createFrame();
  container.name = `Input/${variant}`;
  container.layoutMode = "VERTICAL";
  container.counterAxisSizingMode = "AUTO";
  container.primaryAxisSizingMode = "AUTO";
  container.itemSpacing = 8;
  container.fills = [];
  
  // Label
  const label = figma.createText();
  label.fontName = { family: "Inter", style: "Medium" };
  label.characters = "Label";
  label.fontSize = 14;
  label.fills = [{ type: 'SOLID', color: hexToRgb('#000000') }];
  container.appendChild(label);
  
  // Input field
  const input = figma.createFrame();
  input.name = "Input Field";
  input.layoutMode = "HORIZONTAL";
  input.counterAxisSizingMode = "AUTO";
  input.primaryAxisSizingMode = "FIXED";
  input.resize(280, 40);
  input.paddingLeft = 12;
  input.paddingRight = 12;
  input.paddingTop = 8;
  input.paddingBottom = 8;
  input.cornerRadius = 6;
  input.fills = [{ type: 'SOLID', color: hexToRgb('#FFFFFF') }];
  input.strokeWeight = 1;
  input.strokes = [{ type: 'SOLID', color: hexToRgb('#E5E7EB') }];
  
  const placeholder = figma.createText();
  placeholder.fontName = { family: "Inter", style: "Regular" };
  placeholder.characters = "Enter text...";
  placeholder.fontSize = 14;
  placeholder.fills = [{ type: 'SOLID', color: hexToRgb('#9CA3AF') }];
  input.appendChild(placeholder);
  
  container.appendChild(input);
  
  return container;
}

async function createCheckbox(config: any) {
  await loadFonts();
  
  const container = figma.createFrame();
  container.name = "Checkbox";
  container.layoutMode = "HORIZONTAL";
  container.counterAxisSizingMode = "AUTO";
  container.primaryAxisSizingMode = "AUTO";
  container.itemSpacing = 8;
  container.primaryAxisAlignItems = "CENTER";
  container.fills = [];
  
  const checkbox = figma.createFrame();
  checkbox.name = "Checkbox Box";
  checkbox.resize(16, 16);
  checkbox.cornerRadius = 4;
  checkbox.fills = [{ type: 'SOLID', color: hexToRgb('#FFFFFF') }];
  checkbox.strokeWeight = 1;
  checkbox.strokes = [{ type: 'SOLID', color: hexToRgb('#D1D5DB') }];
  container.appendChild(checkbox);
  
  const textNode = figma.createText();
  textNode.fontName = { family: "Inter", style: "Regular" };
  textNode.characters = "Accept terms and conditions";
  textNode.fontSize = 14;
  textNode.fills = [{ type: 'SOLID', color: hexToRgb('#000000') }];
  container.appendChild(textNode);
  
  return container;
}

async function createBadge(config: any) {
  const { variant, text } = config;
  
  await loadFonts();
  
  const badge = figma.createFrame();
  badge.name = `Badge/${variant}`;
  badge.layoutMode = "HORIZONTAL";
  badge.counterAxisSizingMode = "AUTO";
  badge.primaryAxisSizingMode = "AUTO";
  badge.paddingLeft = 10;
  badge.paddingRight = 10;
  badge.paddingTop = 2;
  badge.paddingBottom = 2;
  badge.cornerRadius = 9999;
  badge.primaryAxisAlignItems = "CENTER";
  badge.counterAxisAlignItems = "CENTER";
  
  const variants = {
    default: { bg: '#000000', text: '#FFFFFF' },
    secondary: { bg: '#F3F4F6', text: '#000000' },
    destructive: { bg: '#EF4444', text: '#FFFFFF' },
    outline: { bg: '#FFFFFF', text: '#000000', border: '#E5E7EB' },
  };
  
  const cfg = variants[variant] || variants.default;
  
  badge.fills = [{ type: 'SOLID', color: hexToRgb(cfg.bg) }];
  
  if (cfg.border) {
    badge.strokeWeight = 1;
    badge.strokes = [{ type: 'SOLID', color: hexToRgb(cfg.border) }];
  }
  
  const textNode = figma.createText();
  textNode.fontName = { family: "Inter", style: "Medium" };
  textNode.characters = text || "Badge";
  textNode.fontSize = 12;
  textNode.fills = [{ type: 'SOLID', color: hexToRgb(cfg.text) }];
  badge.appendChild(textNode);
  
  return badge;
}

async function createSwitch(config: any) {
  const switchFrame = figma.createFrame();
  switchFrame.name = "Switch";
  switchFrame.resize(44, 24);
  switchFrame.cornerRadius = 12;
  switchFrame.fills = [{ type: 'SOLID', color: hexToRgb('#E5E7EB') }];
  
  const thumb = figma.createEllipse();
  thumb.name = "Thumb";
  thumb.resize(20, 20);
  thumb.fills = [{ type: 'SOLID', color: hexToRgb('#FFFFFF') }];
  thumb.x = 2;
  thumb.y = 2;
  switchFrame.appendChild(thumb);
  
  return switchFrame;
}

async function createAlert(config: any) {
  const { variant } = config;
  
  await loadFonts();
  
  const alert = figma.createFrame();
  alert.name = `Alert/${variant}`;
  alert.layoutMode = "VERTICAL";
  alert.counterAxisSizingMode = "AUTO";
  alert.primaryAxisSizingMode = "FIXED";
  alert.resize(320, 80);
  alert.itemSpacing = 8;
  alert.paddingLeft = 16;
  alert.paddingRight = 16;
  alert.paddingTop = 16;
  alert.paddingBottom = 16;
  alert.cornerRadius = 8;
  
  const variants = {
    default: { bg: '#F3F4F6', border: '#E5E7EB', text: '#000000' },
    destructive: { bg: '#FEE2E2', border: '#FCA5A5', text: '#991B1B' },
  };
  
  const cfg = variants[variant] || variants.default;
  
  alert.fills = [{ type: 'SOLID', color: hexToRgb(cfg.bg) }];
  alert.strokeWeight = 1;
  alert.strokes = [{ type: 'SOLID', color: hexToRgb(cfg.border) }];
  
  const title = figma.createText();
  title.fontName = { family: "Inter", style: "Semi Bold" };
  title.characters = "Alert Title";
  title.fontSize = 14;
  title.fills = [{ type: 'SOLID', color: hexToRgb(cfg.text) }];
  alert.appendChild(title);
  
  const description = figma.createText();
  description.fontName = { family: "Inter", style: "Regular" };
  description.characters = "This is an alert message.";
  description.fontSize = 14;
  description.fills = [{ type: 'SOLID', color: hexToRgb(cfg.text) }];
  alert.appendChild(description);
  
  return alert;
}

// ========================================
// BLOCK BUILDERS
// ========================================

async function createHeroBlock(config: any) {
  const { id } = config;
  
  await loadFonts();
  
  const hero = figma.createFrame();
  hero.name = `Block/Hero/${id}`;
  hero.layoutMode = "VERTICAL";
  hero.counterAxisSizingMode = "AUTO";
  hero.primaryAxisSizingMode = "FIXED";
  hero.resize(1200, 500);
  hero.itemSpacing = 32;
  hero.paddingLeft = 80;
  hero.paddingRight = 80;
  hero.paddingTop = 120;
  hero.paddingBottom = 120;
  hero.primaryAxisAlignItems = "CENTER";
  hero.counterAxisAlignItems = "CENTER";
  hero.cornerRadius = 8;
  
  // Gradient background
  hero.fills = [{
    type: 'GRADIENT_LINEAR',
    gradientStops: [
      { position: 0, color: hexToRgb('#3B82F6') },
      { position: 1, color: hexToRgb('#8B5CF6') }
    ],
    gradientTransform: [
      [1, 0, 0],
      [0, 1, 0]
    ]
  }];
  
  // Title
  const title = figma.createText();
  title.fontName = { family: "Inter", style: "Bold" };
  title.characters = "Build Something Amazing";
  title.fontSize = 48;
  title.textAlignHorizontal = "CENTER";
  title.fills = [{ type: 'SOLID', color: hexToRgb('#FFFFFF') }];
  hero.appendChild(title);
  
  // Subtitle
  const subtitle = figma.createText();
  subtitle.fontName = { family: "Inter", style: "Regular" };
  subtitle.characters = "Create beautiful products faster than ever before";
  subtitle.fontSize = 20;
  subtitle.textAlignHorizontal = "CENTER";
  subtitle.fills = [{ type: 'SOLID', color: { r: 1, g: 1, b: 1, a: 0.9 } }];
  hero.appendChild(subtitle);
  
  // CTA Buttons
  const ctaContainer = figma.createFrame();
  ctaContainer.name = "CTA Buttons";
  ctaContainer.layoutMode = "HORIZONTAL";
  ctaContainer.counterAxisSizingMode = "AUTO";
  ctaContainer.primaryAxisSizingMode = "AUTO";
  ctaContainer.itemSpacing = 16;
  ctaContainer.fills = [];
  
  // Primary button
  const primaryBtn = figma.createFrame();
  primaryBtn.name = "Get Started";
  primaryBtn.layoutMode = "HORIZONTAL";
  primaryBtn.counterAxisSizingMode = "AUTO";
  primaryBtn.primaryAxisSizingMode = "AUTO";
  primaryBtn.paddingLeft = 32;
  primaryBtn.paddingRight = 32;
  primaryBtn.paddingTop = 16;
  primaryBtn.paddingBottom = 16;
  primaryBtn.cornerRadius = 8;
  primaryBtn.fills = [{ type: 'SOLID', color: hexToRgb('#FFFFFF') }];
  
  const primaryText = figma.createText();
  primaryText.fontName = { family: "Inter", style: "Semi Bold" };
  primaryText.characters = "Get Started";
  primaryText.fontSize = 16;
  primaryText.fills = [{ type: 'SOLID', color: hexToRgb('#3B82F6') }];
  primaryBtn.appendChild(primaryText);
  
  ctaContainer.appendChild(primaryBtn);
  
  // Secondary button
  const secondaryBtn = figma.createFrame();
  secondaryBtn.name = "Learn More";
  secondaryBtn.layoutMode = "HORIZONTAL";
  secondaryBtn.counterAxisSizingMode = "AUTO";
  secondaryBtn.primaryAxisSizingMode = "AUTO";
  secondaryBtn.paddingLeft = 32;
  secondaryBtn.paddingRight = 32;
  secondaryBtn.paddingTop = 16;
  secondaryBtn.paddingBottom = 16;
  secondaryBtn.cornerRadius = 8;
  secondaryBtn.fills = [];
  secondaryBtn.strokeWeight = 2;
  secondaryBtn.strokes = [{ type: 'SOLID', color: hexToRgb('#FFFFFF') }];
  
  const secondaryText = figma.createText();
  secondaryText.fontName = { family: "Inter", style: "Semi Bold" };
  secondaryText.characters = "Learn More";
  secondaryText.fontSize = 16;
  secondaryText.fills = [{ type: 'SOLID', color: hexToRgb('#FFFFFF') }];
  secondaryBtn.appendChild(secondaryText);
  
  ctaContainer.appendChild(secondaryBtn);
  hero.appendChild(ctaContainer);
  
  return hero;
}

async function createFeaturesBlock(config: any) {
  const { id } = config;
  
  await loadFonts();
  
  const features = figma.createFrame();
  features.name = `Block/Features/${id}`;
  features.layoutMode = "VERTICAL";
  features.counterAxisSizingMode = "AUTO";
  features.primaryAxisSizingMode = "FIXED";
  features.resize(1200, 500);
  features.itemSpacing = 48;
  features.paddingLeft = 80;
  features.paddingRight = 80;
  features.paddingTop = 80;
  features.paddingBottom = 80;
  features.fills = [{ type: 'SOLID', color: hexToRgb('#FFFFFF') }];
  
  // Header
  const header = figma.createFrame();
  header.name = "Header";
  header.layoutMode = "VERTICAL";
  header.counterAxisSizingMode = "AUTO";
  header.primaryAxisSizingMode = "FIXED";
  header.resize(1040, 100);
  header.itemSpacing = 16;
  header.primaryAxisAlignItems = "CENTER";
  header.fills = [];
  
  const headerTitle = figma.createText();
  headerTitle.fontName = { family: "Inter", style: "Bold" };
  headerTitle.characters = "Features";
  headerTitle.fontSize = 36;
  headerTitle.textAlignHorizontal = "CENTER";
  headerTitle.fills = [{ type: 'SOLID', color: hexToRgb('#000000') }];
  header.appendChild(headerTitle);
  
  const headerDesc = figma.createText();
  headerDesc.fontName = { family: "Inter", style: "Regular" };
  headerDesc.characters = "Everything you need to build amazing products";
  headerDesc.fontSize = 18;
  headerDesc.textAlignHorizontal = "CENTER";
  headerDesc.fills = [{ type: 'SOLID', color: hexToRgb('#6B7280') }];
  header.appendChild(headerDesc);
  
  features.appendChild(header);
  
  // Feature grid
  const grid = figma.createFrame();
  grid.name = "Feature Grid";
  grid.layoutMode = "HORIZONTAL";
  grid.counterAxisSizingMode = "AUTO";
  grid.primaryAxisSizingMode = "FIXED";
  grid.resize(1040, 280);
  grid.itemSpacing = 32;
  grid.fills = [];
  
  // Create 3 feature cards
  for (let i = 1; i <= 3; i++) {
    const card = figma.createFrame();
    card.name = `Feature ${i}`;
    card.layoutMode = "VERTICAL";
    card.counterAxisSizingMode = "AUTO";
    card.primaryAxisSizingMode = "FILL";
    card.itemSpacing = 16;
    card.paddingLeft = 24;
    card.paddingRight = 24;
    card.paddingTop = 32;
    card.paddingBottom = 32;
    card.cornerRadius = 12;
    card.fills = [{ type: 'SOLID', color: hexToRgb('#F9FAFB') }];
    
    // Icon
    const iconBg = figma.createFrame();
    iconBg.name = "Icon";
    iconBg.resize(48, 48);
    iconBg.cornerRadius = 24;
    iconBg.fills = [{ type: 'SOLID', color: hexToRgb('#DBEAFE') }];
    card.appendChild(iconBg);
    
    // Title
    const cardTitle = figma.createText();
    cardTitle.fontName = { family: "Inter", style: "Semi Bold" };
    cardTitle.characters = `Feature ${i}`;
    cardTitle.fontSize = 20;
    cardTitle.fills = [{ type: 'SOLID', color: hexToRgb('#000000') }];
    card.appendChild(cardTitle);
    
    // Description
    const cardDesc = figma.createText();
    cardDesc.fontName = { family: "Inter", style: "Regular" };
    cardDesc.characters = "Description of this amazing feature";
    cardDesc.fontSize = 14;
    cardDesc.fills = [{ type: 'SOLID', color: hexToRgb('#6B7280') }];
    card.appendChild(cardDesc);
    
    grid.appendChild(card);
  }
  
  features.appendChild(grid);
  
  return features;
}

async function createPricingBlock(config: any) {
  const { id } = config;
  
  await loadFonts();
  
  const pricing = figma.createFrame();
  pricing.name = `Block/Pricing/${id}`;
  pricing.layoutMode = "VERTICAL";
  pricing.counterAxisSizingMode = "AUTO";
  pricing.primaryAxisSizingMode = "FIXED";
  pricing.resize(1200, 600);
  pricing.itemSpacing = 48;
  pricing.paddingLeft = 80;
  pricing.paddingRight = 80;
  pricing.paddingTop = 80;
  pricing.paddingBottom = 80;
  pricing.fills = [{ type: 'SOLID', color: hexToRgb('#F9FAFB') }];
  
  // Header
  const header = figma.createText();
  header.fontName = { family: "Inter", style: "Bold" };
  header.characters = "Pricing";
  header.fontSize = 36;
  header.textAlignHorizontal = "CENTER";
  header.fills = [{ type: 'SOLID', color: hexToRgb('#000000') }];
  pricing.appendChild(header);
  
  // Pricing cards
  const grid = figma.createFrame();
  grid.name = "Pricing Grid";
  grid.layoutMode = "HORIZONTAL";
  grid.counterAxisSizingMode = "AUTO";
  grid.primaryAxisSizingMode = "FIXED";
  grid.resize(1040, 400);
  grid.itemSpacing = 32;
  grid.fills = [];
  
  const plans = ['Basic', 'Pro', 'Enterprise'];
  const prices = ['$29', '$79', '$199'];
  
  for (let i = 0; i < 3; i++) {
    const card = figma.createFrame();
    card.name = plans[i];
    card.layoutMode = "VERTICAL";
    card.counterAxisSizingMode = "AUTO";
    card.primaryAxisSizingMode = "FILL";
    card.itemSpacing = 24;
    card.paddingLeft = 32;
    card.paddingRight = 32;
    card.paddingTop = 40;
    card.paddingBottom = 40;
    card.cornerRadius = 12;
    card.fills = [{ type: 'SOLID', color: hexToRgb('#FFFFFF') }];
    card.strokeWeight = i === 1 ? 2 : 1;
    card.strokes = [{ type: 'SOLID', color: hexToRgb(i === 1 ? '#3B82F6' : '#E5E7EB') }];
    
    // Plan name
    const planName = figma.createText();
    planName.fontName = { family: "Inter", style: "Semi Bold" };
    planName.characters = plans[i];
    planName.fontSize = 20;
    planName.fills = [{ type: 'SOLID', color: hexToRgb('#000000') }];
    card.appendChild(planName);
    
    // Price
    const price = figma.createText();
    price.fontName = { family: "Inter", style: "Bold" };
    price.characters = `${prices[i]}/mo`;
    price.fontSize = 32;
    price.fills = [{ type: 'SOLID', color: hexToRgb('#000000') }];
    card.appendChild(price);
    
    // CTA Button
    const btn = figma.createFrame();
    btn.name = "CTA";
    btn.layoutMode = "HORIZONTAL";
    btn.counterAxisSizingMode = "AUTO";
    btn.primaryAxisSizingMode = "FILL";
    btn.paddingTop = 12;
    btn.paddingBottom = 12;
    btn.cornerRadius = 6;
    btn.primaryAxisAlignItems = "CENTER";
    btn.counterAxisAlignItems = "CENTER";
    btn.fills = [{ type: 'SOLID', color: hexToRgb(i === 1 ? '#3B82F6' : '#F3F4F6') }];
    
    const btnText = figma.createText();
    btnText.fontName = { family: "Inter", style: "Medium" };
    btnText.characters = "Choose Plan";
    btnText.fontSize = 14;
    btnText.fills = [{ type: 'SOLID', color: hexToRgb(i === 1 ? '#FFFFFF' : '#000000') }];
    btn.appendChild(btnText);
    
    card.appendChild(btn);
    grid.appendChild(card);
  }
  
  pricing.appendChild(grid);
  
  return pricing;
}

async function createContactBlock(config: any) {
  const { id } = config;
  
  await loadFonts();
  
  const contact = figma.createFrame();
  contact.name = `Block/Contact/${id}`;
  contact.layoutMode = "VERTICAL";
  contact.counterAxisSizingMode = "AUTO";
  contact.primaryAxisSizingMode = "FIXED";
  contact.resize(600, 500);
  contact.itemSpacing = 32;
  contact.paddingLeft = 48;
  contact.paddingRight = 48;
  contact.paddingTop = 48;
  contact.paddingBottom = 48;
  contact.cornerRadius = 12;
  contact.fills = [{ type: 'SOLID', color: hexToRgb('#FFFFFF') }];
  contact.strokeWeight = 1;
  contact.strokes = [{ type: 'SOLID', color: hexToRgb('#E5E7EB') }];
  
  // Title
  const title = figma.createText();
  title.fontName = { family: "Inter", style: "Bold" };
  title.characters = "Contact Us";
  title.fontSize = 28;
  title.fills = [{ type: 'SOLID', color: hexToRgb('#000000') }];
  contact.appendChild(title);
  
  // Form fields
  const fields = ['Name', 'Email', 'Message'];
  
  for (const fieldName of fields) {
    const field = figma.createFrame();
    field.name = fieldName;
    field.layoutMode = "VERTICAL";
    field.counterAxisSizingMode = "AUTO";
    field.primaryAxisSizingMode = "FILL";
    field.itemSpacing = 8;
    field.fills = [];
    
    const label = figma.createText();
    label.fontName = { family: "Inter", style: "Medium" };
    label.characters = fieldName;
    label.fontSize = 14;
    label.fills = [{ type: 'SOLID', color: hexToRgb('#000000') }];
    field.appendChild(label);
    
    const input = figma.createFrame();
    input.name = "Input";
    input.resize(504, fieldName === 'Message' ? 120 : 40);
    input.paddingLeft = 12;
    input.paddingRight = 12;
    input.paddingTop = 8;
    input.paddingBottom = 8;
    input.cornerRadius = 6;
    input.fills = [{ type: 'SOLID', color: hexToRgb('#FFFFFF') }];
    input.strokeWeight = 1;
    input.strokes = [{ type: 'SOLID', color: hexToRgb('#D1D5DB') }];
    
    field.appendChild(input);
    contact.appendChild(field);
  }
  
  // Submit button
  const btn = figma.createFrame();
  btn.name = "Submit";
  btn.layoutMode = "HORIZONTAL";
  btn.counterAxisSizingMode = "AUTO";
  btn.primaryAxisSizingMode = "FILL";
  btn.paddingTop = 12;
  btn.paddingBottom = 12;
  btn.cornerRadius = 6;
  btn.primaryAxisAlignItems = "CENTER";
  btn.counterAxisAlignItems = "CENTER";
  btn.fills = [{ type: 'SOLID', color: hexToRgb('#3B82F6') }];
  
  const btnText = figma.createText();
  btnText.fontName = { family: "Inter", style: "Medium" };
  btnText.characters = "Send Message";
  btnText.fontSize = 14;
  btnText.fills = [{ type: 'SOLID', color: hexToRgb('#FFFFFF') }];
  btn.appendChild(btnText);
  
  contact.appendChild(btn);
  
  return contact;
}

// ========================================
// MAIN COMPONENT ROUTER
// ========================================

async function createComponent(componentData: any) {
  const { componentName, variant, size, icon, iconPosition, text } = componentData;
  
  let node;
  
  switch (componentName) {
    case 'Button':
      node = await createButton({ variant, size, icon, iconPosition, text });
      break;
    case 'Card':
      node = await createCard({ variant });
      break;
    case 'Input':
      node = await createInput({ variant });
      break;
    case 'Checkbox':
      node = await createCheckbox({});
      break;
    case 'Badge':
      node = await createBadge({ variant, text });
      break;
    case 'Switch':
      node = await createSwitch({});
      break;
    case 'Alert':
    case 'Alert Dialog':
      node = await createAlert({ variant });
      break;
    default:
      // Fallback for components not yet implemented
      await loadFonts();
      const fallback = figma.createFrame();
      fallback.name = componentName;
      fallback.resize(200, 60);
      fallback.fills = [{ type: 'SOLID', color: hexToRgb('#F3F4F6') }];
      fallback.cornerRadius = 8;
      fallback.layoutMode = "HORIZONTAL";
      fallback.counterAxisSizingMode = "AUTO";
      fallback.primaryAxisAlignItems = "CENTER";
      fallback.counterAxisAlignItems = "CENTER";
      fallback.paddingLeft = 16;
      fallback.paddingRight = 16;
      fallback.strokeWeight = 1;
      fallback.strokes = [{ type: 'SOLID', color: hexToRgb('#D1D5DB') }];
      fallback.strokeDashes = [4, 4];
      
      const textNode = figma.createText();
      textNode.fontName = { family: "Inter", style: "Medium" };
      textNode.characters = componentName;
      textNode.fontSize = 14;
      textNode.fills = [{ type: 'SOLID', color: hexToRgb('#6B7280') }];
      fallback.appendChild(textNode);
      
      node = fallback;
  }
  
  // Store metadata on the node
  node.setPluginData('librarian-component', componentName);
  node.setPluginData('librarian-variant', variant || 'default');
  node.setPluginData('librarian-size', size || 'default');
  if (icon) node.setPluginData('librarian-icon', icon);
  if (iconPosition) node.setPluginData('librarian-icon-position', iconPosition);
  if (text) node.setPluginData('librarian-text', text);
  
  return node;
}

async function createBlock(blockData: any) {
  const { blockId } = blockData;
  
  let node;
  
  // Route to correct block creator based on category
  if (blockId.startsWith('hero-')) {
    node = await createHeroBlock({ id: blockId });
  } else if (blockId.startsWith('features-')) {
    node = await createFeaturesBlock({ id: blockId });
  } else if (blockId.startsWith('pricing-')) {
    node = await createPricingBlock({ id: blockId });
  } else if (blockId.startsWith('contact-')) {
    node = await createContactBlock({ id: blockId });
  } else {
    // Fallback for blocks not yet implemented
    await loadFonts();
    const fallback = figma.createFrame();
    fallback.name = `Block: ${blockId}`;
    fallback.resize(800, 400);
    fallback.fills = [{ type: 'SOLID', color: hexToRgb('#F9FAFB') }];
    fallback.cornerRadius = 12;
    fallback.layoutMode = "VERTICAL";
    fallback.primaryAxisAlignItems = "CENTER";
    fallback.counterAxisAlignItems = "CENTER";
    fallback.strokeWeight = 2;
    fallback.strokes = [{ type: 'SOLID', color: hexToRgb('#D1D5DB') }];
    fallback.strokeDashes = [8, 8];
    
    const textNode = figma.createText();
    textNode.fontName = { family: "Inter", style: "Medium" };
    textNode.characters = `Block: ${blockId}`;
    textNode.fontSize = 18;
    textNode.fills = [{ type: 'SOLID', color: hexToRgb('#6B7280') }];
    fallback.appendChild(textNode);
    
    node = fallback;
  }
  
  // Store metadata
  node.setPluginData('librarian-type', 'block');
  node.setPluginData('librarian-block-id', blockId);
  
  return node;
}

async function createAllVariants(componentData: any) {
  const { componentName, variants, sizes } = componentData;
  
  await loadFonts();
  
  // Create container for all variants
  const container = figma.createFrame();
  container.name = `${componentName} - All Variants`;
  container.layoutMode = "VERTICAL";
  container.counterAxisSizingMode = "AUTO";
  container.primaryAxisSizingMode = "AUTO";
  container.itemSpacing = 24;
  container.paddingLeft = 24;
  container.paddingRight = 24;
  container.paddingTop = 24;
  container.paddingBottom = 24;
  container.fills = [{ type: 'SOLID', color: hexToRgb('#FFFFFF') }];
  container.strokeWeight = 1;
  container.strokes = [{ type: 'SOLID', color: hexToRgb('#E5E7EB') }];
  container.cornerRadius = 8;
  
  // Add title
  const title = figma.createText();
  title.fontName = { family: "Inter", style: "Semi Bold" };
  title.characters = `${componentName} Variants`;
  title.fontSize = 16;
  title.fills = [{ type: 'SOLID', color: hexToRgb('#000000') }];
  container.appendChild(title);
  
  // Create variants
  if (variants && variants.length > 0) {
    for (const variant of variants) {
      const variantRow = figma.createFrame();
      variantRow.name = variant.label;
      variantRow.layoutMode = "HORIZONTAL";
      variantRow.counterAxisSizingMode = "AUTO";
      variantRow.primaryAxisSizingMode = "AUTO";
      variantRow.itemSpacing = 16;
      variantRow.fills = [];
      
      const component = await createComponent({
        componentName,
        variant: variant.value,
        size: 'default',
        text: variant.label,
      });
      
      variantRow.appendChild(component);
      container.appendChild(variantRow);
    }
  }
  
  return container;
}

// ========================================
// MESSAGE HANDLERS
// ========================================

figma.ui.onmessage = async (msg) => {
  if (msg.type === 'place-component') {
    try {
      let node;
      
      if (msg.data.createAllVariants && msg.data.variants) {
        node = await createAllVariants(msg.data);
      } else {
        node = await createComponent(msg.data);
      }
      
      // Position the node at the center of the viewport
      node.x = figma.viewport.center.x - (node.width / 2);
      node.y = figma.viewport.center.y - (node.height / 2);
      
      // Add to the current page
      figma.currentPage.appendChild(node);
      
      // Select the newly created node
      figma.currentPage.selection = [node];
      figma.viewport.scrollAndZoomIntoView([node]);
      
      // Send success message back to UI
      figma.ui.postMessage({
        type: 'component-placed',
        success: true,
        componentName: msg.data.componentName,
      });
    } catch (error) {
      console.error('Error creating component:', error);
      figma.ui.postMessage({
        type: 'component-placed',
        success: false,
        error: error.message,
      });
    }
  }
  
  if (msg.type === 'place-block') {
    try {
      const node = await createBlock(msg.data);
      
      // Position the block at the center of the viewport
      node.x = figma.viewport.center.x - (node.width / 2);
      node.y = figma.viewport.center.y - (node.height / 2);
      
      // Add to the current page
      figma.currentPage.appendChild(node);
      
      // Select the newly created block
      figma.currentPage.selection = [node];
      figma.viewport.scrollAndZoomIntoView([node]);
      
      // Send success message back to UI
      figma.ui.postMessage({
        type: 'block-placed',
        success: true,
        blockId: msg.data.blockId,
      });
    } catch (error) {
      console.error('Error creating block:', error);
      figma.ui.postMessage({
        type: 'block-placed',
        success: false,
        error: error.message,
      });
    }
  }

  if (msg.type === 'place-icon') {
    try {
      const { iconName, size, color } = msg.data;
      
      const iconSize = parseInt(size) || 24;
      
      await loadFonts();
      
      // Create a container for the icon
      const iconContainer = figma.createFrame();
      iconContainer.name = `Icon: ${iconName}`;
      iconContainer.layoutMode = "VERTICAL";
      iconContainer.counterAxisSizingMode = "AUTO";
      iconContainer.primaryAxisSizingMode = "AUTO";
      iconContainer.itemSpacing = 4;
      iconContainer.fills = [];
      
      // Create icon placeholder
      const iconFrame = figma.createFrame();
      iconFrame.name = iconName;
      iconFrame.resize(iconSize, iconSize);
      iconFrame.fills = [];
      iconFrame.strokeWeight = 1.5;
      iconFrame.strokes = [{ type: 'SOLID', color: hexToRgb(color || '#000000') }];
      iconFrame.cornerRadius = 2;
      
      iconContainer.appendChild(iconFrame);
      
      // Add label
      const labelText = figma.createText();
      labelText.fontName = { family: "Inter", style: "Regular" };
      labelText.characters = iconName;
      labelText.fontSize = 10;
      labelText.fills = [{ type: 'SOLID', color: hexToRgb('#6B7280') }];
      iconContainer.appendChild(labelText);
      
      // Store metadata
      iconContainer.setPluginData('librarian-icon', iconName);
      iconContainer.setPluginData('librarian-type', 'lucide-icon');
      iconContainer.setPluginData('librarian-size', size);
      iconContainer.setPluginData('librarian-color', color || '#000000');
      
      // Position the icon at the center of the viewport
      iconContainer.x = figma.viewport.center.x - (iconContainer.width / 2);
      iconContainer.y = figma.viewport.center.y - (iconContainer.height / 2);
      
      // Add to the current page
      figma.currentPage.appendChild(iconContainer);
      
      // Select the newly created icon
      figma.currentPage.selection = [iconContainer];
      figma.viewport.scrollAndZoomIntoView([iconContainer]);
      
      // Send success message back to UI
      figma.ui.postMessage({
        type: 'icon-placed',
        success: true,
        iconName: iconName,
      });
    } catch (error) {
      console.error('Error placing icon:', error);
      figma.ui.postMessage({
        type: 'icon-placed',
        success: false,
        error: error.message,
      });
    }
  }
  
  if (msg.type === 'close-plugin') {
    figma.closePlugin();
  }
  
  if (msg.type === 'resize-ui') {
    const { width, height } = msg.data;
    figma.ui.resize(width, height);
  }
  
  // Save custom repositories to persistent storage
  if (msg.type === 'save-repos') {
    try {
      const { customComponentRepos, customBlockRepos, customIconRepos } = msg.data;
      
      await figma.clientStorage.setAsync('customComponentRepos', customComponentRepos);
      await figma.clientStorage.setAsync('customBlockRepos', customBlockRepos);
      await figma.clientStorage.setAsync('customIconRepos', customIconRepos);
      
      console.log('Custom repositories saved successfully');
    } catch (error) {
      console.error('Error saving repositories:', error);
    }
  }
};