import React from 'react';

export type BlockVariant = {
  name: string;
  value: string;
  description?: string;
};

export type BlockConfig = {
  id: string;
  name: string;
  description: string;
  category: string;
  variants?: BlockVariant[];
  previewUrl?: string;
  dependencies?: string[];
};

// Serp.co Free Blocks Registry
// Based on https://blocks.serp.co/blocks/free
export const blocksRegistry: BlockConfig[] = [
  // HERO
  {
    id: 'hero',
    name: 'Hero',
    description: 'Hero sections with various layouts and styles',
    category: 'Hero',
    variants: [
      { name: 'Simple', value: 'simple', description: 'Clean centered hero' },
      { name: 'With CTA', value: 'with-cta', description: 'Hero with call-to-action buttons' },
      { name: 'With Image', value: 'with-image', description: 'Side-by-side content and image' },
      { name: 'Centered', value: 'centered', description: 'Centered layout with gradient' },
      { name: 'Video Background', value: 'video', description: 'Hero with video background' },
      { name: 'Split', value: 'split', description: 'Two-column split layout' },
    ],
    dependencies: ['button'],
  },

  // FEATURES
  {
    id: 'features',
    name: 'Features',
    description: 'Feature sections showcasing product capabilities',
    category: 'Features',
    variants: [
      { name: 'Grid', value: 'grid', description: 'Grid layout of features' },
      { name: 'List with Icons', value: 'list-icons', description: 'Vertical list with icons' },
      { name: 'Detailed', value: 'detailed', description: 'Detailed feature descriptions' },
      { name: 'Alternating', value: 'alternating', description: 'Alternating image/content' },
      { name: 'Cards', value: 'cards', description: 'Feature cards layout' },
      { name: 'Tabs', value: 'tabs', description: 'Features organized in tabs' },
    ],
    dependencies: ['card'],
  },

  // PRICING
  {
    id: 'pricing',
    name: 'Pricing',
    description: 'Pricing tables and comparison layouts',
    category: 'Pricing',
    variants: [
      { name: 'Simple', value: 'simple', description: 'Basic pricing cards' },
      { name: 'Feature-rich', value: 'feature-rich', description: 'Detailed feature comparison' },
      { name: 'Table with Toggle', value: 'toggle', description: 'Monthly/yearly toggle' },
      { name: 'Three Tier', value: 'three-tier', description: 'Three pricing tiers' },
      { name: 'Comparison', value: 'comparison', description: 'Full comparison table' },
    ],
    dependencies: ['card', 'button', 'badge', 'switch'],
  },

  // PRODUCT LIST
  {
    id: 'product-list',
    name: 'Product List',
    description: 'Product listing and grid layouts',
    category: 'Product List',
    variants: [
      { name: 'Grid', value: 'grid', description: 'Product grid layout' },
      { name: 'List', value: 'list', description: 'List view with details' },
      { name: 'With Filters', value: 'filters', description: 'Filterable product grid' },
      { name: 'Minimal', value: 'minimal', description: 'Minimal product cards' },
    ],
    dependencies: ['card', 'button', 'badge'],
  },

  // FAQ
  {
    id: 'faq',
    name: 'FAQ',
    description: 'Frequently asked questions sections',
    category: 'FAQ',
    variants: [
      { name: 'Accordion', value: 'accordion', description: 'Expandable accordion FAQ' },
      { name: 'Grid', value: 'grid', description: 'Two-column grid layout' },
      { name: 'Tabbed', value: 'tabbed', description: 'FAQ organized by tabs' },
      { name: 'Simple', value: 'simple', description: 'Simple list format' },
    ],
    dependencies: ['accordion', 'card', 'tabs'],
  },

  // TESTIMONIALS
  {
    id: 'testimonials',
    name: 'Testimonials',
    description: 'Customer testimonials and reviews',
    category: 'Testimonials',
    variants: [
      { name: 'Grid', value: 'grid', description: 'Grid of testimonials' },
      { name: 'Carousel', value: 'carousel', description: 'Scrolling carousel' },
      { name: 'With Images', value: 'with-images', description: 'Testimonials with photos' },
      { name: 'Quotes Only', value: 'quotes', description: 'Simple quote cards' },
      { name: 'Wall', value: 'wall', description: 'Masonry testimonial wall' },
    ],
    dependencies: ['card', 'avatar', 'carousel'],
  },

  // CONTACT
  {
    id: 'contact',
    name: 'Contact',
    description: 'Contact forms and information sections',
    category: 'Contact',
    variants: [
      { name: 'Simple', value: 'simple', description: 'Basic contact form' },
      { name: 'Split', value: 'split', description: 'Form with info sidebar' },
      { name: 'With Map', value: 'with-map', description: 'Form with embedded map' },
      { name: 'Centered', value: 'centered', description: 'Centered form layout' },
    ],
    dependencies: ['form', 'input', 'textarea', 'button'],
  },

  // ABOUT
  {
    id: 'about',
    name: 'About',
    description: 'About us and company information sections',
    category: 'About',
    variants: [
      { name: 'Simple', value: 'simple', description: 'Basic about section' },
      { name: 'With Timeline', value: 'timeline', description: 'Company timeline' },
      { name: 'Mission & Vision', value: 'mission-vision', description: 'Mission and vision layout' },
      { name: 'Story', value: 'story', description: 'Company story format' },
    ],
    dependencies: ['card'],
  },

  // BLOG
  {
    id: 'blog',
    name: 'Blog',
    description: 'Blog post detail layouts',
    category: 'Blog',
    variants: [
      { name: 'Standard', value: 'standard', description: 'Standard blog post layout' },
      { name: 'Featured Image', value: 'featured', description: 'Large featured image' },
      { name: 'Sidebar', value: 'sidebar', description: 'Post with sidebar' },
      { name: 'Minimal', value: 'minimal', description: 'Minimal reading layout' },
    ],
    dependencies: ['card', 'avatar', 'badge'],
  },

  // BLOG LIST
  {
    id: 'blog-list',
    name: 'Blog List',
    description: 'Blog listing and archive layouts',
    category: 'Blog List',
    variants: [
      { name: 'Grid', value: 'grid', description: 'Grid of blog posts' },
      { name: 'List', value: 'list', description: 'List view with excerpts' },
      { name: 'Magazine', value: 'magazine', description: 'Magazine-style layout' },
      { name: 'Masonry', value: 'masonry', description: 'Masonry grid layout' },
    ],
    dependencies: ['card', 'badge', 'avatar'],
  },

  // CTA
  {
    id: 'cta',
    name: 'CTA',
    description: 'Call-to-action sections',
    category: 'CTA',
    variants: [
      { name: 'Simple', value: 'simple', description: 'Centered CTA section' },
      { name: 'Split', value: 'split', description: 'Two-column CTA' },
      { name: 'Banner', value: 'banner', description: 'Full-width banner' },
      { name: 'Newsletter', value: 'newsletter', description: 'Newsletter signup' },
      { name: 'App Download', value: 'app-download', description: 'App download CTA' },
    ],
    dependencies: ['button', 'input'],
  },

  // FOOTER
  {
    id: 'footer',
    name: 'Footer',
    description: 'Website footer layouts',
    category: 'Footer',
    variants: [
      { name: 'Simple', value: 'simple', description: 'Basic footer with links' },
      { name: 'Multi-column', value: 'multi-column', description: 'Multi-column layout' },
      { name: 'Centered', value: 'centered', description: 'Centered footer' },
      { name: 'With Newsletter', value: 'newsletter', description: 'Footer with signup' },
      { name: 'Minimal', value: 'minimal', description: 'Minimal footer' },
    ],
    dependencies: ['input', 'button'],
  },

  // NAVBAR
  {
    id: 'navbar',
    name: 'Navbar',
    description: 'Navigation header layouts',
    category: 'Navbar',
    variants: [
      { name: 'Transparent', value: 'transparent', description: 'Transparent background' },
      { name: 'Sticky', value: 'sticky', description: 'Sticky navigation' },
      { name: 'Mobile Responsive', value: 'mobile', description: 'Mobile-friendly nav' },
      { name: 'With Search', value: 'with-search', description: 'Nav with search bar' },
      { name: 'Mega Menu', value: 'mega-menu', description: 'Dropdown mega menu' },
    ],
    dependencies: ['button', 'navigation-menu', 'sheet'],
  },

  // GALLERY
  {
    id: 'gallery',
    name: 'Gallery',
    description: 'Image gallery layouts',
    category: 'Gallery',
    variants: [
      { name: 'Grid', value: 'grid', description: 'Responsive image grid' },
      { name: 'Masonry', value: 'masonry', description: 'Masonry-style layout' },
      { name: 'Lightbox', value: 'lightbox', description: 'Gallery with lightbox' },
      { name: 'Carousel', value: 'carousel', description: 'Image carousel' },
    ],
    dependencies: ['dialog', 'carousel'],
  },

  // TEAM
  {
    id: 'team',
    name: 'Team',
    description: 'Team member showcase sections',
    category: 'Team',
    variants: [
      { name: 'Grid', value: 'grid', description: 'Team member grid' },
      { name: 'Cards', value: 'cards', description: 'Detailed team cards' },
      { name: 'Minimal', value: 'minimal', description: 'Minimal team layout' },
      { name: 'With Bios', value: 'with-bios', description: 'Extended bio cards' },
    ],
    dependencies: ['card', 'avatar'],
  },

  // REVIEWS
  {
    id: 'reviews',
    name: 'Reviews',
    description: 'Product reviews and ratings',
    category: 'Reviews',
    variants: [
      { name: 'Grid', value: 'grid', description: 'Review card grid' },
      { name: 'List', value: 'list', description: 'List of reviews' },
      { name: 'With Ratings', value: 'ratings', description: 'Reviews with star ratings' },
      { name: 'Detailed', value: 'detailed', description: 'Detailed review cards' },
    ],
    dependencies: ['card', 'avatar', 'badge'],
  },

  // NEWSLETTER
  {
    id: 'newsletter',
    name: 'Newsletter',
    description: 'Newsletter signup sections',
    category: 'Newsletter',
    variants: [
      { name: 'Simple', value: 'simple', description: 'Simple email signup' },
      { name: 'Centered', value: 'centered', description: 'Centered signup form' },
      { name: 'Inline', value: 'inline', description: 'Inline form layout' },
      { name: 'With Benefits', value: 'benefits', description: 'Signup with benefits list' },
    ],
    dependencies: ['input', 'button'],
  },

  // LOGIN
  {
    id: 'login',
    name: 'Login',
    description: 'Login form layouts',
    category: 'Login',
    variants: [
      { name: 'Simple', value: 'simple', description: 'Basic login form' },
      { name: 'Split', value: 'split', description: 'Split screen login' },
      { name: 'Centered', value: 'centered', description: 'Centered card login' },
      { name: 'With Social', value: 'social', description: 'Social login options' },
    ],
    dependencies: ['form', 'input', 'button', 'card'],
  },

  // SIGN UP
  {
    id: 'signup',
    name: 'Sign Up',
    description: 'Registration form layouts',
    category: 'Sign Up',
    variants: [
      { name: 'Simple', value: 'simple', description: 'Basic signup form' },
      { name: 'Multi-step', value: 'multi-step', description: 'Step-by-step signup' },
      { name: 'Split', value: 'split', description: 'Split screen signup' },
      { name: 'With Benefits', value: 'benefits', description: 'Signup with benefits' },
    ],
    dependencies: ['form', 'input', 'button', 'card'],
  },

  // DASHBOARD
  {
    id: 'dashboard',
    name: 'Dashboard',
    description: 'Dashboard layouts and widgets',
    category: 'Dashboard',
    variants: [
      { name: 'Analytics', value: 'analytics', description: 'Analytics dashboard' },
      { name: 'Stats Overview', value: 'stats', description: 'Stats overview layout' },
      { name: 'Ecommerce', value: 'ecommerce', description: 'Ecommerce dashboard' },
      { name: 'Minimal', value: 'minimal', description: 'Minimal dashboard' },
    ],
    dependencies: ['card', 'chart', 'table'],
  },

  // MODAL
  {
    id: 'modal',
    name: 'Modal',
    description: 'Modal dialog layouts',
    category: 'Modal',
    variants: [
      { name: 'Simple', value: 'simple', description: 'Basic modal dialog' },
      { name: 'With Form', value: 'form', description: 'Modal with form' },
      { name: 'Confirmation', value: 'confirmation', description: 'Confirmation dialog' },
      { name: 'Full Screen', value: 'fullscreen', description: 'Full screen modal' },
    ],
    dependencies: ['dialog', 'alert-dialog'],
  },

  // CARDS
  {
    id: 'cards',
    name: 'Cards',
    description: 'Various card layouts and styles',
    category: 'Cards',
    variants: [
      { name: 'Product', value: 'product', description: 'Product card' },
      { name: 'Profile', value: 'profile', description: 'Profile card' },
      { name: 'Stats', value: 'stats', description: 'Statistics card' },
      { name: 'Article', value: 'article', description: 'Article preview card' },
      { name: 'Pricing', value: 'pricing', description: 'Pricing card' },
    ],
    dependencies: ['card', 'button', 'badge'],
  },

  // CUSTOMER SERVICE
  {
    id: 'customer-service',
    name: 'Customer Service',
    description: 'Customer support sections',
    category: 'Customer Service',
    variants: [
      { name: 'Help Center', value: 'help-center', description: 'Help center layout' },
      { name: 'Chat Widget', value: 'chat', description: 'Chat support widget' },
      { name: 'Ticket Form', value: 'ticket', description: 'Support ticket form' },
      { name: 'Knowledge Base', value: 'knowledge', description: 'Knowledge base grid' },
    ],
    dependencies: ['card', 'form', 'input', 'accordion'],
  },

  // PAYMENT FORM
  {
    id: 'payment-form',
    name: 'Payment Form',
    description: 'Payment and checkout forms',
    category: 'Payment Form',
    variants: [
      { name: 'Simple', value: 'simple', description: 'Basic payment form' },
      { name: 'Multi-step', value: 'multi-step', description: 'Step-by-step checkout' },
      { name: 'Split', value: 'split', description: 'Form with order summary' },
      { name: 'Subscription', value: 'subscription', description: 'Subscription payment' },
    ],
    dependencies: ['form', 'input', 'button', 'card'],
  },

  // ORDER CONFIRMATION
  {
    id: 'order-confirmation',
    name: 'Order Confirmation',
    description: 'Order confirmation and receipt layouts',
    category: 'Order Confirmation',
    variants: [
      { name: 'Simple', value: 'simple', description: 'Basic confirmation' },
      { name: 'Detailed', value: 'detailed', description: 'Detailed order summary' },
      { name: 'With Timeline', value: 'timeline', description: 'Order tracking timeline' },
      { name: 'Email Style', value: 'email', description: 'Email receipt style' },
    ],
    dependencies: ['card', 'table', 'badge'],
  },

  // SCHEDULE
  {
    id: 'schedule',
    name: 'Schedule',
    description: 'Calendar and scheduling layouts',
    category: 'Schedule',
    variants: [
      { name: 'Calendar', value: 'calendar', description: 'Calendar view' },
      { name: 'Appointment', value: 'appointment', description: 'Appointment booking' },
      { name: 'Timeline', value: 'timeline', description: 'Timeline schedule' },
      { name: 'Event List', value: 'event-list', description: 'List of events' },
    ],
    dependencies: ['calendar', 'card', 'button'],
  },

  // SHOPPING CART
  {
    id: 'shopping-cart',
    name: 'Shopping Cart',
    description: 'Shopping cart layouts',
    category: 'Shopping Cart',
    variants: [
      { name: 'Simple', value: 'simple', description: 'Basic cart layout' },
      { name: 'Detailed', value: 'detailed', description: 'Detailed cart items' },
      { name: 'Sidebar', value: 'sidebar', description: 'Slide-out cart sidebar' },
      { name: 'Full Page', value: 'full-page', description: 'Full page cart' },
    ],
    dependencies: ['card', 'button', 'input', 'sheet'],
  },

  // DIRECTORY LIST
  {
    id: 'directory-list',
    name: 'Directory List',
    description: 'Directory listing layouts',
    category: 'Directory List',
    variants: [
      { name: 'Grid', value: 'grid', description: 'Grid of listings' },
      { name: 'List', value: 'list', description: 'List view with filters' },
      { name: 'Map View', value: 'map', description: 'Map with listings' },
      { name: 'Cards', value: 'cards', description: 'Card-based directory' },
    ],
    dependencies: ['card', 'badge', 'button'],
  },

  // DIRECTORY SINGLE
  {
    id: 'directory-single',
    name: 'Directory Single',
    description: 'Single directory entry detail layouts',
    category: 'Directory Single',
    variants: [
      { name: 'Simple', value: 'simple', description: 'Basic detail page' },
      { name: 'With Gallery', value: 'gallery', description: 'Detail with image gallery' },
      { name: 'With Reviews', value: 'reviews', description: 'Detail with reviews' },
      { name: 'Full Featured', value: 'full', description: 'Complete detail layout' },
    ],
    dependencies: ['card', 'carousel', 'badge', 'avatar'],
  },
];

// Preview components for each block variant
export function renderBlockPreview(blockId: string, variant?: string): React.ReactNode {
  const block = blocksRegistry.find(b => b.id === blockId);
  if (!block) return null;

  const variantValue = variant || block.variants?.[0]?.value || 'default';

  // Create unique previews based on block ID and variant
  const previewKey = `${blockId}-${variantValue}`;

  const previews: Record<string, React.ReactNode> = {
    // HERO VARIANTS
    'hero-simple': (
      <div className="bg-white p-12 rounded-lg text-center">
        <h1 className="text-4xl font-bold mb-4">Welcome to Our Product</h1>
        <p className="text-lg text-gray-600 mb-6">Build amazing things with our platform</p>
      </div>
    ),
    'hero-with-cta': (
      <div className="bg-gradient-to-r from-blue-600 to-purple-600 p-12 rounded-lg text-white text-center">
        <h1 className="text-4xl font-bold mb-4">Start Building Today</h1>
        <p className="text-lg mb-6 opacity-90">Join thousands of developers worldwide</p>
        <div className="flex gap-3 justify-center">
          <button className="bg-white text-blue-600 px-6 py-3 rounded-lg font-medium">Get Started</button>
          <button className="border-2 border-white text-white px-6 py-3 rounded-lg font-medium">Learn More</button>
        </div>
      </div>
    ),
    'hero-with-image': (
      <div className="bg-white p-8 rounded-lg">
        <div className="grid grid-cols-2 gap-8 items-center">
          <div>
            <h1 className="text-3xl font-bold mb-4">Build Faster</h1>
            <p className="text-gray-600 mb-6">Ship products your customers love with our platform</p>
            <button className="bg-blue-600 text-white px-6 py-3 rounded-lg">Get Started</button>
          </div>
          <div className="bg-gradient-to-br from-blue-100 to-purple-100 aspect-video rounded-lg"></div>
        </div>
      </div>
    ),
    'hero-centered': (
      <div className="bg-gradient-to-b from-gray-50 to-white p-16 rounded-lg text-center">
        <div className="inline-block bg-blue-100 text-blue-600 px-4 py-1 rounded-full text-sm mb-4">New Release</div>
        <h1 className="text-5xl font-bold mb-4">Modern Web Platform</h1>
        <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">Everything you need to build amazing products</p>
        <button className="bg-blue-600 text-white px-8 py-4 rounded-lg text-lg">Start Free Trial</button>
      </div>
    ),
    'hero-video': (
      <div className="relative bg-gray-900 p-12 rounded-lg text-white text-center">
        <div className="absolute inset-0 bg-black/40 rounded-lg"></div>
        <div className="relative z-10">
          <h1 className="text-4xl font-bold mb-4">Experience Innovation</h1>
          <p className="text-lg mb-6">Watch how our platform transforms businesses</p>
          <button className="bg-white text-gray-900 px-6 py-3 rounded-lg font-medium">Play Video</button>
        </div>
      </div>
    ),
    'hero-split': (
      <div className="bg-white p-8 rounded-lg">
        <div className="grid grid-cols-2 gap-0">
          <div className="bg-blue-600 text-white p-12 rounded-l-lg flex items-center">
            <div>
              <h1 className="text-3xl font-bold mb-4">Premium Solution</h1>
              <p className="mb-6">Enterprise-grade platform</p>
              <button className="bg-white text-blue-600 px-6 py-3 rounded-lg">Learn More</button>
            </div>
          </div>
          <div className="bg-gradient-to-br from-purple-500 to-pink-500 p-12 rounded-r-lg"></div>
        </div>
      </div>
    ),

    // FEATURES VARIANTS
    'features-grid': (
      <div className="bg-white p-8 rounded-lg">
        <h2 className="text-2xl font-bold mb-6 text-center">Our Features</h2>
        <div className="grid grid-cols-3 gap-6">
          {[1, 2, 3].map(i => (
            <div key={i} className="text-center">
              <div className="bg-blue-100 rounded-full p-4 w-fit mx-auto mb-3">
                <svg className="size-8 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
              </div>
              <h3 className="font-semibold mb-2">Feature {i}</h3>
              <p className="text-sm text-gray-600">Amazing capabilities</p>
            </div>
          ))}
        </div>
      </div>
    ),
    'features-list-icons': (
      <div className="bg-white p-8 rounded-lg">
        <h2 className="text-2xl font-bold mb-6">Why Choose Us</h2>
        <div className="space-y-4">
          {[1, 2, 3, 4].map(i => (
            <div key={i} className="flex items-start gap-4">
              <div className="bg-green-100 rounded-lg p-2">
                <svg className="size-5 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
              </div>
              <div>
                <h3 className="font-semibold mb-1">Feature {i}</h3>
                <p className="text-sm text-gray-600">Detailed description of this feature</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    ),
    'features-detailed': (
      <div className="bg-white p-8 rounded-lg space-y-8">
        {[1, 2].map(i => (
          <div key={i} className="grid grid-cols-2 gap-8 items-center">
            <div className={i % 2 === 0 ? 'order-2' : ''}>
              <span className="text-blue-600 font-semibold text-sm">FEATURE 0{i}</span>
              <h3 className="text-2xl font-bold mt-2 mb-3">Amazing Capability</h3>
              <p className="text-gray-600 mb-4">Detailed explanation of how this feature helps your workflow and improves productivity.</p>
              <button className="text-blue-600 font-medium">Learn more →</button>
            </div>
            <div className={`bg-gradient-to-br from-blue-50 to-purple-50 aspect-video rounded-lg ${i % 2 === 0 ? 'order-1' : ''}`}></div>
          </div>
        ))}
      </div>
    ),
    'features-alternating': (
      <div className="bg-white p-8 rounded-lg space-y-12">
        {[1, 2, 3].map(i => (
          <div key={i} className={`flex gap-8 items-center ${i % 2 === 0 ? 'flex-row-reverse' : ''}`}>
            <div className="flex-1">
              <h3 className="text-xl font-bold mb-3">Feature {i}</h3>
              <p className="text-gray-600">Complete description with benefits</p>
            </div>
            <div className="flex-1 bg-gray-100 aspect-video rounded-lg"></div>
          </div>
        ))}
      </div>
    ),
    'features-cards': (
      <div className="bg-gray-50 p-8 rounded-lg">
        <h2 className="text-2xl font-bold mb-6 text-center">Core Features</h2>
        <div className="grid grid-cols-2 gap-6">
          {[1, 2, 3, 4].map(i => (
            <div key={i} className="bg-white border border-gray-200 rounded-lg p-6">
              <div className="bg-blue-600 text-white rounded-lg p-3 w-fit mb-4">
                <svg className="size-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
              </div>
              <h3 className="font-semibold text-lg mb-2">Feature {i}</h3>
              <p className="text-sm text-gray-600">Comprehensive feature details and benefits</p>
            </div>
          ))}
        </div>
      </div>
    ),
    'features-tabs': (
      <div className="bg-white p-8 rounded-lg">
        <h2 className="text-2xl font-bold mb-6 text-center">Explore Features</h2>
        <div className="flex gap-2 mb-6 justify-center">
          {['Design', 'Development', 'Deploy'].map(tab => (
            <button key={tab} className="px-4 py-2 rounded-lg bg-blue-100 text-blue-600 font-medium">{tab}</button>
          ))}
        </div>
        <div className="border border-gray-200 rounded-lg p-6">
          <h3 className="font-semibold text-lg mb-3">Design Features</h3>
          <p className="text-gray-600">Advanced design tools and capabilities</p>
        </div>
      </div>
    ),

    // PRICING VARIANTS
    'pricing-simple': (
      <div className="bg-white p-8 rounded-lg">
        <h2 className="text-2xl font-bold mb-6 text-center">Simple Pricing</h2>
        <div className="grid grid-cols-3 gap-6">
          {['Basic', 'Pro', 'Enterprise'].map((tier, i) => (
            <div key={tier} className="border border-gray-200 rounded-lg p-6">
              <h3 className="font-semibold text-lg mb-2">{tier}</h3>
              <div className="mb-4">
                <span className="text-3xl font-bold">${(i + 1) * 29}</span>
                <span className="text-gray-600">/mo</span>
              </div>
              <button className="w-full py-2 bg-gray-100 rounded-lg">Choose Plan</button>
            </div>
          ))}
        </div>
      </div>
    ),
    'pricing-feature-rich': (
      <div className="bg-white p-8 rounded-lg">
        <h2 className="text-2xl font-bold mb-6 text-center">Choose Your Plan</h2>
        <div className="grid grid-cols-3 gap-6">
          {['Starter', 'Professional', 'Business'].map((tier, i) => (
            <div key={tier} className={`border-2 rounded-lg p-6 ${i === 1 ? 'border-blue-600 shadow-lg scale-105' : 'border-gray-200'}`}>
              {i === 1 && <div className="bg-blue-600 text-white text-xs px-3 py-1 rounded-full w-fit mb-2">Popular</div>}
              <h3 className="font-semibold text-lg mb-2">{tier}</h3>
              <div className="mb-4">
                <span className="text-3xl font-bold">${(i + 1) * 49}</span>
                <span className="text-gray-600">/month</span>
              </div>
              <ul className="space-y-2 mb-6">
                {[1, 2, 3, 4].map(f => (
                  <li key={f} className="flex items-center gap-2 text-sm">
                    <svg className="size-4 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    Feature {f}
                  </li>
                ))}
              </ul>
              <button className={`w-full py-2 rounded-lg ${i === 1 ? 'bg-blue-600 text-white' : 'bg-gray-100'}`}>
                Get Started
              </button>
            </div>
          ))}
        </div>
      </div>
    ),
    'pricing-toggle': (
      <div className="bg-white p-8 rounded-lg">
        <h2 className="text-2xl font-bold mb-4 text-center">Flexible Pricing</h2>
        <div className="flex items-center justify-center gap-3 mb-8">
          <span className="text-sm">Monthly</span>
          <div className="bg-blue-600 rounded-full w-12 h-6 p-1">
            <div className="bg-white rounded-full size-4"></div>
          </div>
          <span className="text-sm font-medium">Yearly <span className="text-green-600">(Save 20%)</span></span>
        </div>
        <div className="grid grid-cols-3 gap-6">
          {[29, 59, 99].map((price, i) => (
            <div key={i} className="border border-gray-200 rounded-lg p-6">
              <h3 className="font-semibold text-lg mb-2">Plan {i + 1}</h3>
              <div className="mb-4">
                <span className="text-3xl font-bold">${price}</span>
                <span className="text-gray-600">/mo</span>
              </div>
              <button className="w-full py-2 bg-blue-600 text-white rounded-lg">Select</button>
            </div>
          ))}
        </div>
      </div>
    ),
    'pricing-three-tier': (
      <div className="bg-gradient-to-b from-gray-50 to-white p-8 rounded-lg">
        <h2 className="text-3xl font-bold mb-2 text-center">Plans & Pricing</h2>
        <p className="text-gray-600 text-center mb-8">Choose the perfect plan for your needs</p>
        <div className="grid grid-cols-3 gap-6">
          {['Hobby', 'Pro', 'Team'].map((tier, i) => (
            <div key={tier} className="bg-white border border-gray-200 rounded-xl p-8">
              <h3 className="font-bold text-xl mb-4">{tier}</h3>
              <div className="mb-6">
                <span className="text-4xl font-bold">${[0, 29, 99][i]}</span>
                {i > 0 && <span className="text-gray-600">/month</span>}
              </div>
              <button className={`w-full py-3 rounded-lg mb-6 ${i === 1 ? 'bg-blue-600 text-white' : 'border border-gray-300'}`}>
                {i === 0 ? 'Start Free' : 'Get Started'}
              </button>
              <ul className="space-y-3">
                {[1, 2, 3, 4, 5].slice(0, 3 + i).map(f => (
                  <li key={f} className="flex items-center gap-2 text-sm">
                    <svg className="size-4 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    Feature included
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    ),
    'pricing-comparison': (
      <div className="bg-white p-8 rounded-lg">
        <h2 className="text-2xl font-bold mb-6 text-center">Compare Plans</h2>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b">
                <th className="text-left py-4">Feature</th>
                <th className="text-center py-4">Basic</th>
                <th className="text-center py-4">Pro</th>
                <th className="text-center py-4">Enterprise</th>
              </tr>
            </thead>
            <tbody>
              {['Feature A', 'Feature B', 'Feature C'].map(feature => (
                <tr key={feature} className="border-b">
                  <td className="py-3 text-sm">{feature}</td>
                  <td className="text-center">
                    <svg className="size-5 text-green-600 mx-auto" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                  </td>
                  <td className="text-center">
                    <svg className="size-5 text-green-600 mx-auto" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                  </td>
                  <td className="text-center">
                    <svg className="size-5 text-green-600 mx-auto" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    ),

    // Default fallback for other variants
    'default': (
      <div className="bg-white p-8 rounded-lg border-2 border-dashed border-gray-300 text-center">
        <div className="text-4xl mb-3">📦</div>
        <p className="font-semibold text-gray-900">{block.name}</p>
        <p className="text-sm text-gray-500 mt-2">{block.description}</p>
        {variant && <p className="text-xs text-blue-600 mt-2">Variant: {variant}</p>}
      </div>
    ),
  };

  return previews[previewKey] || previews['default'];
}

// Get blocks by category
export function getBlocksByCategory(category: string): BlockConfig[] {
  return blocksRegistry.filter(block => block.category === category);
}

// Get all categories
export function getBlockCategories(): string[] {
  return Array.from(new Set(blocksRegistry.map(block => block.category)));
}
