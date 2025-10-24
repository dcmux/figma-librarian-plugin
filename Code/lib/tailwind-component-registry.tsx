import React from 'react';

export type TailwindComponentConfig = {
  name: string;
  description: string;
  category: 'buttons' | 'cards' | 'alerts' | 'forms' | 'navigation' | 'layout' | 'data' | 'feedback';
  variants?: { label: string; value: string }[];
  sizes?: { label: string; value: string }[];
  preview: (variant?: string, size?: string) => React.ReactNode;
};

export const tailwindComponentRegistry: TailwindComponentConfig[] = [
  // ===== BUTTONS (12 components) =====
  {
    name: 'Primary Button',
    description: 'Solid background button with hover effects',
    category: 'buttons',
    variants: [
      { label: 'Blue', value: 'blue' },
      { label: 'Green', value: 'green' },
      { label: 'Red', value: 'red' },
      { label: 'Purple', value: 'purple' },
    ],
    sizes: [
      { label: 'Small', value: 'sm' },
      { label: 'Medium', value: 'md' },
      { label: 'Large', value: 'lg' },
    ],
    preview: (variant = 'blue', size = 'md') => {
      const colors = {
        blue: 'bg-blue-600 hover:bg-blue-700',
        green: 'bg-green-600 hover:bg-green-700',
        red: 'bg-red-600 hover:bg-red-700',
        purple: 'bg-purple-600 hover:bg-purple-700',
      };
      const sizes = {
        sm: 'px-3 py-1.5 text-sm',
        md: 'px-4 py-2 text-base',
        lg: 'px-6 py-3 text-lg',
      };
      return (
        <button className={`${colors[variant as keyof typeof colors]} ${sizes[size as keyof typeof sizes]} text-white rounded-lg transition-colors duration-200`}>
          Button
        </button>
      );
    },
  },
  {
    name: 'Outline Button',
    description: 'Transparent button with border',
    category: 'buttons',
    variants: [
      { label: 'Blue', value: 'blue' },
      { label: 'Green', value: 'green' },
      { label: 'Red', value: 'red' },
      { label: 'Gray', value: 'gray' },
    ],
    sizes: [
      { label: 'Small', value: 'sm' },
      { label: 'Medium', value: 'md' },
      { label: 'Large', value: 'lg' },
    ],
    preview: (variant = 'blue', size = 'md') => {
      const colors = {
        blue: 'border-blue-600 text-blue-600 hover:bg-blue-50',
        green: 'border-green-600 text-green-600 hover:bg-green-50',
        red: 'border-red-600 text-red-600 hover:bg-red-50',
        gray: 'border-gray-600 text-gray-600 hover:bg-gray-50',
      };
      const sizes = {
        sm: 'px-3 py-1.5 text-sm',
        md: 'px-4 py-2 text-base',
        lg: 'px-6 py-3 text-lg',
      };
      return (
        <button className={`${colors[variant as keyof typeof colors]} ${sizes[size as keyof typeof sizes]} border-2 rounded-lg transition-colors duration-200`}>
          Button
        </button>
      );
    },
  },
  {
    name: 'Ghost Button',
    description: 'Minimal button with hover background',
    category: 'buttons',
    variants: [
      { label: 'Blue', value: 'blue' },
      { label: 'Gray', value: 'gray' },
      { label: 'Red', value: 'red' },
    ],
    sizes: [
      { label: 'Small', value: 'sm' },
      { label: 'Medium', value: 'md' },
      { label: 'Large', value: 'lg' },
    ],
    preview: (variant = 'blue', size = 'md') => {
      const colors = {
        blue: 'text-blue-600 hover:bg-blue-50',
        gray: 'text-gray-600 hover:bg-gray-100',
        red: 'text-red-600 hover:bg-red-50',
      };
      const sizes = {
        sm: 'px-3 py-1.5 text-sm',
        md: 'px-4 py-2 text-base',
        lg: 'px-6 py-3 text-lg',
      };
      return (
        <button className={`${colors[variant as keyof typeof colors]} ${sizes[size as keyof typeof sizes]} rounded-lg transition-colors duration-200`}>
          Button
        </button>
      );
    },
  },
  {
    name: 'Link Button',
    description: 'Text-only button styled as link',
    category: 'buttons',
    variants: [
      { label: 'Blue', value: 'blue' },
      { label: 'Gray', value: 'gray' },
    ],
    preview: (variant = 'blue') => {
      const colors = {
        blue: 'text-blue-600 hover:text-blue-800',
        gray: 'text-gray-600 hover:text-gray-800',
      };
      return (
        <button className={`${colors[variant as keyof typeof colors]} underline transition-colors`}>
          Link Button
        </button>
      );
    },
  },
  {
    name: 'Icon Button',
    description: 'Circular button with icon only',
    category: 'buttons',
    variants: [
      { label: 'Blue', value: 'blue' },
      { label: 'Gray', value: 'gray' },
      { label: 'Red', value: 'red' },
    ],
    sizes: [
      { label: 'Small', value: 'sm' },
      { label: 'Medium', value: 'md' },
      { label: 'Large', value: 'lg' },
    ],
    preview: (variant = 'blue', size = 'md') => {
      const colors = {
        blue: 'bg-blue-600 hover:bg-blue-700 text-white',
        gray: 'bg-gray-200 hover:bg-gray-300 text-gray-700',
        red: 'bg-red-600 hover:bg-red-700 text-white',
      };
      const sizes = {
        sm: 'size-8',
        md: 'size-10',
        lg: 'size-12',
      };
      return (
        <button className={`${colors[variant as keyof typeof colors]} ${sizes[size as keyof typeof sizes]} rounded-full transition-colors flex items-center justify-center`}>
          <svg className="size-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
          </svg>
        </button>
      );
    },
  },
  {
    name: 'Button with Icon',
    description: 'Button with leading or trailing icon',
    category: 'buttons',
    variants: [
      { label: 'Left Icon', value: 'left' },
      { label: 'Right Icon', value: 'right' },
    ],
    preview: (variant = 'left') => {
      if (variant === 'right') {
        return (
          <button className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg flex items-center gap-2 transition-colors">
            <span>Continue</span>
            <svg className="size-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </button>
        );
      }
      return (
        <button className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg flex items-center gap-2 transition-colors">
          <svg className="size-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
          </svg>
          <span>Add New</span>
        </button>
      );
    },
  },
  {
    name: 'Button Group',
    description: 'Connected group of buttons',
    category: 'buttons',
    variants: [
      { label: 'Horizontal', value: 'horizontal' },
      { label: 'Vertical', value: 'vertical' },
    ],
    preview: (variant = 'horizontal') => {
      if (variant === 'vertical') {
        return (
          <div className="inline-flex flex-col">
            <button className="px-4 py-2 bg-white border border-gray-300 hover:bg-gray-50 rounded-t-lg">First</button>
            <button className="px-4 py-2 bg-white border-x border-b border-gray-300 hover:bg-gray-50">Second</button>
            <button className="px-4 py-2 bg-white border-x border-b border-gray-300 hover:bg-gray-50 rounded-b-lg">Third</button>
          </div>
        );
      }
      return (
        <div className="inline-flex">
          <button className="px-4 py-2 bg-white border border-gray-300 hover:bg-gray-50 rounded-l-lg">Left</button>
          <button className="px-4 py-2 bg-white border-y border-r border-gray-300 hover:bg-gray-50">Center</button>
          <button className="px-4 py-2 bg-white border-y border-r border-gray-300 hover:bg-gray-50 rounded-r-lg">Right</button>
        </div>
      );
    },
  },
  {
    name: 'Loading Button',
    description: 'Button with loading spinner',
    category: 'buttons',
    variants: [
      { label: 'Blue', value: 'blue' },
      { label: 'Gray', value: 'gray' },
    ],
    preview: (variant = 'blue') => {
      const colors = {
        blue: 'bg-blue-600 text-white',
        gray: 'bg-gray-200 text-gray-600',
      };
      return (
        <button className={`${colors[variant as keyof typeof colors]} px-4 py-2 rounded-lg flex items-center gap-2`}>
          <svg className="animate-spin size-4" fill="none" viewBox="0 0 24 24">
            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
          </svg>
          <span>Loading...</span>
        </button>
      );
    },
  },
  {
    name: 'Gradient Button',
    description: 'Button with gradient background',
    category: 'buttons',
    variants: [
      { label: 'Blue-Purple', value: 'blue' },
      { label: 'Pink-Orange', value: 'pink' },
      { label: 'Green-Blue', value: 'green' },
    ],
    preview: (variant = 'blue') => {
      const gradients = {
        blue: 'bg-gradient-to-r from-blue-500 to-purple-600',
        pink: 'bg-gradient-to-r from-pink-500 to-orange-500',
        green: 'bg-gradient-to-r from-green-500 to-blue-500',
      };
      return (
        <button className={`${gradients[variant as keyof typeof gradients]} text-white px-6 py-2 rounded-lg hover:opacity-90 transition-opacity`}>
          Gradient Button
        </button>
      );
    },
  },
  {
    name: 'Pill Button',
    description: 'Button with fully rounded edges',
    category: 'buttons',
    variants: [
      { label: 'Blue', value: 'blue' },
      { label: 'Green', value: 'green' },
      { label: 'Gray', value: 'gray' },
    ],
    preview: (variant = 'blue') => {
      const colors = {
        blue: 'bg-blue-600 hover:bg-blue-700',
        green: 'bg-green-600 hover:bg-green-700',
        gray: 'bg-gray-600 hover:bg-gray-700',
      };
      return (
        <button className={`${colors[variant as keyof typeof colors]} text-white px-6 py-2 rounded-full transition-colors`}>
          Pill Button
        </button>
      );
    },
  },
  {
    name: 'Social Button',
    description: 'Social media login button',
    category: 'buttons',
    variants: [
      { label: 'Google', value: 'google' },
      { label: 'GitHub', value: 'github' },
      { label: 'Twitter', value: 'twitter' },
    ],
    preview: (variant = 'google') => {
      const styles = {
        google: { bg: 'bg-white hover:bg-gray-50', text: 'text-gray-700', border: 'border border-gray-300' },
        github: { bg: 'bg-gray-900 hover:bg-gray-800', text: 'text-white', border: '' },
        twitter: { bg: 'bg-blue-400 hover:bg-blue-500', text: 'text-white', border: '' },
      };
      const style = styles[variant as keyof typeof styles];
      const labels = { google: 'Continue with Google', github: 'Continue with GitHub', twitter: 'Continue with Twitter' };
      return (
        <button className={`${style.bg} ${style.text} ${style.border} px-4 py-2 rounded-lg transition-colors w-56 flex items-center justify-center gap-2`}>
          <svg className="size-5" fill="currentColor" viewBox="0 0 24 24">
            {variant === 'google' && <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />}
            {variant === 'github' && <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />}
            {variant === 'twitter' && <path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z" />}
          </svg>
          {labels[variant as keyof typeof labels]}
        </button>
      );
    },
  },
  {
    name: 'Toggle Button',
    description: 'Button with active/inactive state',
    category: 'buttons',
    variants: [
      { label: 'Active', value: 'active' },
      { label: 'Inactive', value: 'inactive' },
    ],
    preview: (variant = 'active') => {
      const isActive = variant === 'active';
      return (
        <button className={`px-4 py-2 rounded-lg border-2 transition-all ${
          isActive 
            ? 'bg-blue-600 border-blue-600 text-white' 
            : 'bg-white border-gray-300 text-gray-700 hover:bg-gray-50'
        }`}>
          Toggle Button
        </button>
      );
    },
  },

  // ===== CARDS (10 components) =====
  {
    name: 'Simple Card',
    description: 'Basic card with shadow and padding',
    category: 'cards',
    variants: [
      { label: 'White', value: 'white' },
      { label: 'Gray', value: 'gray' },
      { label: 'Gradient', value: 'gradient' },
    ],
    sizes: [
      { label: 'Small', value: 'sm' },
      { label: 'Medium', value: 'md' },
      { label: 'Large', value: 'lg' },
    ],
    preview: (variant = 'white', size = 'md') => {
      const colors = {
        white: 'bg-white',
        gray: 'bg-gray-50',
        gradient: 'bg-gradient-to-br from-blue-50 to-purple-50',
      };
      const sizes = {
        sm: 'p-4 w-48',
        md: 'p-6 w-64',
        lg: 'p-8 w-80',
      };
      return (
        <div className={`${colors[variant as keyof typeof colors]} ${sizes[size as keyof typeof sizes]} rounded-lg shadow-md border border-gray-200`}>
          <h3 className="font-semibold mb-2">Card Title</h3>
          <p className="text-gray-600 text-sm">Card content goes here with some description text.</p>
        </div>
      );
    },
  },
  {
    name: 'Feature Card',
    description: 'Card with icon, title, and description',
    category: 'cards',
    variants: [
      { label: 'Centered', value: 'center' },
      { label: 'Left Aligned', value: 'left' },
    ],
    preview: (variant = 'center') => {
      const align = variant === 'center' ? 'text-center items-center' : 'text-left items-start';
      return (
        <div className={`bg-white p-6 rounded-lg shadow-md border border-gray-200 w-64 flex flex-col ${align}`}>
          <div className="bg-blue-100 rounded-full p-3 mb-4 w-fit">
            <svg className="size-6 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
            </svg>
          </div>
          <h3 className="font-semibold mb-2">Feature Title</h3>
          <p className="text-gray-600 text-sm">Description of the feature or service offered.</p>
        </div>
      );
    },
  },
  {
    name: 'Pricing Card',
    description: 'Card for pricing plans',
    category: 'cards',
    variants: [
      { label: 'Basic', value: 'basic' },
      { label: 'Popular', value: 'popular' },
    ],
    preview: (variant = 'basic') => {
      const isPopular = variant === 'popular';
      return (
        <div className={`bg-white p-6 rounded-lg shadow-lg border-2 w-64 ${isPopular ? 'border-blue-600' : 'border-gray-200'}`}>
          {isPopular && <div className="bg-blue-600 text-white text-xs px-3 py-1 rounded-full w-fit mb-3">Popular</div>}
          <h3 className="font-semibold text-xl mb-2">Pro Plan</h3>
          <div className="mb-4">
            <span className="text-3xl font-bold">$29</span>
            <span className="text-gray-600">/month</span>
          </div>
          <ul className="space-y-2 mb-6 text-sm">
            <li className="flex items-center gap-2">
              <svg className="size-5 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
              Feature 1
            </li>
            <li className="flex items-center gap-2">
              <svg className="size-5 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
              Feature 2
            </li>
          </ul>
          <button className={`w-full py-2 rounded-lg ${isPopular ? 'bg-blue-600 text-white' : 'bg-gray-100 text-gray-800'}`}>
            Choose Plan
          </button>
        </div>
      );
    },
  },
  {
    name: 'Product Card',
    description: 'Card for displaying products',
    category: 'cards',
    preview: () => {
      return (
        <div className="bg-white rounded-lg shadow-md overflow-hidden w-64">
          <div className="bg-gray-200 h-40 flex items-center justify-center">
            <svg className="size-16 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
            </svg>
          </div>
          <div className="p-4">
            <h3 className="font-semibold mb-1">Product Name</h3>
            <p className="text-gray-600 text-sm mb-3">Short description</p>
            <div className="flex items-center justify-between">
              <span className="font-bold text-lg">$49.99</span>
              <button className="bg-blue-600 text-white px-4 py-1 rounded text-sm">Add to Cart</button>
            </div>
          </div>
        </div>
      );
    },
  },
  {
    name: 'Profile Card',
    description: 'User profile card with avatar',
    category: 'cards',
    variants: [
      { label: 'Horizontal', value: 'horizontal' },
      { label: 'Vertical', value: 'vertical' },
    ],
    preview: (variant = 'horizontal') => {
      if (variant === 'vertical') {
        return (
          <div className="bg-white p-6 rounded-lg shadow-md border border-gray-200 w-64 flex flex-col items-center text-center">
            <div className="size-20 rounded-full bg-gradient-to-br from-blue-400 to-purple-500 flex items-center justify-center text-white font-semibold text-xl mb-3">
              JD
            </div>
            <h3 className="font-semibold text-lg">John Doe</h3>
            <p className="text-gray-600 text-sm mb-3">Product Designer</p>
            <button className="bg-blue-600 text-white px-4 py-2 rounded-lg text-sm w-full">Connect</button>
          </div>
        );
      }
      return (
        <div className="bg-white p-4 rounded-lg shadow-md border border-gray-200 w-80 flex items-center gap-4">
          <div className="size-16 rounded-full bg-gradient-to-br from-blue-400 to-purple-500 flex items-center justify-center text-white font-semibold flex-shrink-0">
            JD
          </div>
          <div className="flex-1">
            <h3 className="font-semibold">John Doe</h3>
            <p className="text-gray-600 text-sm">Product Designer</p>
          </div>
          <button className="bg-blue-600 text-white px-4 py-2 rounded-lg text-sm">Follow</button>
        </div>
      );
    },
  },
  {
    name: 'Stats Card',
    description: 'Card showing statistics',
    category: 'cards',
    variants: [
      { label: 'Blue', value: 'blue' },
      { label: 'Green', value: 'green' },
      { label: 'Purple', value: 'purple' },
    ],
    preview: (variant = 'blue') => {
      const colors = {
        blue: 'bg-blue-600',
        green: 'bg-green-600',
        purple: 'bg-purple-600',
      };
      return (
        <div className="bg-white p-6 rounded-lg shadow-md border border-gray-200 w-64">
          <div className="flex items-center justify-between mb-2">
            <h3 className="text-gray-600 text-sm">Total Users</h3>
            <div className={`${colors[variant as keyof typeof colors]} p-2 rounded-lg`}>
              <svg className="size-5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
              </svg>
            </div>
          </div>
          <div className="text-3xl font-bold mb-1">24,532</div>
          <div className="flex items-center gap-1 text-sm">
            <svg className="size-4 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 10l7-7m0 0l7 7m-7-7v18" />
            </svg>
            <span className="text-green-600">12%</span>
            <span className="text-gray-600">vs last month</span>
          </div>
        </div>
      );
    },
  },
  {
    name: 'Testimonial Card',
    description: 'Customer testimonial card',
    category: 'cards',
    preview: () => {
      return (
        <div className="bg-white p-6 rounded-lg shadow-md border border-gray-200 w-80">
          <div className="flex gap-1 mb-3">
            {[1, 2, 3, 4, 5].map(i => (
              <svg key={i} className="size-5 text-yellow-400" fill="currentColor" viewBox="0 0 20 20">
                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
              </svg>
            ))}
          </div>
          <p className="text-gray-700 mb-4">"This product has completely transformed how we work. Highly recommended!"</p>
          <div className="flex items-center gap-3">
            <div className="size-10 rounded-full bg-gradient-to-br from-blue-400 to-purple-500 flex items-center justify-center text-white font-semibold text-sm">
              JD
            </div>
            <div>
              <div className="font-semibold text-sm">Jane Doe</div>
              <div className="text-gray-600 text-xs">CEO, Company</div>
            </div>
          </div>
        </div>
      );
    },
  },
  {
    name: 'Image Card',
    description: 'Card with full-width image',
    category: 'cards',
    variants: [
      { label: 'Overlay', value: 'overlay' },
      { label: 'Below', value: 'below' },
    ],
    preview: (variant = 'overlay') => {
      if (variant === 'overlay') {
        return (
          <div className="relative bg-gray-200 rounded-lg overflow-hidden w-80 h-48">
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
            <div className="absolute bottom-0 left-0 right-0 p-4 text-white">
              <h3 className="font-semibold text-lg">Card Title</h3>
              <p className="text-sm opacity-90">Card description text</p>
            </div>
          </div>
        );
      }
      return (
        <div className="bg-white rounded-lg shadow-md overflow-hidden w-80">
          <div className="bg-gray-200 h-40"></div>
          <div className="p-4">
            <h3 className="font-semibold mb-2">Card Title</h3>
            <p className="text-gray-600 text-sm">Card description text goes here.</p>
          </div>
        </div>
      );
    },
  },
  {
    name: 'Blog Card',
    description: 'Blog post preview card',
    category: 'cards',
    preview: () => {
      return (
        <div className="bg-white rounded-lg shadow-md overflow-hidden w-80">
          <div className="bg-gray-200 h-40"></div>
          <div className="p-4">
            <div className="flex items-center gap-2 mb-2">
              <span className="bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded">Technology</span>
              <span className="text-gray-500 text-xs">5 min read</span>
            </div>
            <h3 className="font-semibold mb-2">Blog Post Title</h3>
            <p className="text-gray-600 text-sm mb-3">A brief excerpt from the blog post content...</p>
            <div className="flex items-center gap-2 text-xs text-gray-500">
              <span>John Doe</span>
              <span>•</span>
              <span>Jan 15, 2025</span>
            </div>
          </div>
        </div>
      );
    },
  },
  {
    name: 'Hover Card',
    description: 'Card with hover lift effect',
    category: 'cards',
    preview: () => {
      return (
        <div className="bg-white p-6 rounded-lg shadow-md border border-gray-200 w-64 transition-all duration-300 hover:shadow-xl hover:-translate-y-1 cursor-pointer">
          <div className="bg-blue-100 rounded-full p-3 mb-4 w-fit">
            <svg className="size-6 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 21a4 4 0 01-4-4V5a2 2 0 012-2h4a2 2 0 012 2v12a4 4 0 01-4 4zm0 0h12a2 2 0 002-2v-4a2 2 0 00-2-2h-2.343M11 7.343l1.657-1.657a2 2 0 012.828 0l2.829 2.829a2 2 0 010 2.828l-8.486 8.485M7 17h.01" />
            </svg>
          </div>
          <h3 className="font-semibold mb-2">Hover Me</h3>
          <p className="text-gray-600 text-sm">This card lifts on hover for better interactivity.</p>
        </div>
      );
    },
  },

  // ===== ALERTS (6 components) =====
  {
    name: 'Alert',
    description: 'Notification alert with icon',
    category: 'alerts',
    variants: [
      { label: 'Success', value: 'success' },
      { label: 'Warning', value: 'warning' },
      { label: 'Error', value: 'error' },
      { label: 'Info', value: 'info' },
    ],
    preview: (variant = 'success') => {
      const styles = {
        success: { bg: 'bg-green-50', border: 'border-green-200', text: 'text-green-800', icon: 'text-green-600' },
        warning: { bg: 'bg-yellow-50', border: 'border-yellow-200', text: 'text-yellow-800', icon: 'text-yellow-600' },
        error: { bg: 'bg-red-50', border: 'border-red-200', text: 'text-red-800', icon: 'text-red-600' },
        info: { bg: 'bg-blue-50', border: 'border-blue-200', text: 'text-blue-800', icon: 'text-blue-600' },
      };
      const style = styles[variant as keyof typeof styles];
      return (
        <div className={`${style.bg} ${style.border} ${style.text} p-4 rounded-lg border flex items-start gap-3 w-80`}>
          <svg className={`size-5 ${style.icon} shrink-0 mt-0.5`} fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
          <div>
            <p className="font-semibold text-sm">Alert Title</p>
            <p className="text-sm mt-1 opacity-90">This is an alert message with important information.</p>
          </div>
        </div>
      );
    },
  },
  {
    name: 'Banner Alert',
    description: 'Full-width banner alert',
    category: 'alerts',
    variants: [
      { label: 'Info', value: 'info' },
      { label: 'Warning', value: 'warning' },
    ],
    preview: (variant = 'info') => {
      const styles = {
        info: { bg: 'bg-blue-600', text: 'text-white' },
        warning: { bg: 'bg-yellow-500', text: 'text-black' },
      };
      const style = styles[variant as keyof typeof styles];
      return (
        <div className={`${style.bg} ${style.text} px-4 py-3 rounded-lg flex items-center justify-between w-full`}>
          <span className="text-sm">This is an important announcement message</span>
          <button className="hover:opacity-80">
            <svg className="size-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>
      );
    },
  },
  {
    name: 'Toast Notification',
    description: 'Compact notification toast',
    category: 'alerts',
    variants: [
      { label: 'Success', value: 'success' },
      { label: 'Error', value: 'error' },
    ],
    preview: (variant = 'success') => {
      const isSuccess = variant === 'success';
      return (
        <div className="bg-white shadow-lg rounded-lg border border-gray-200 p-4 w-80 flex items-center gap-3">
          <div className={`rounded-full p-1 ${isSuccess ? 'bg-green-100' : 'bg-red-100'}`}>
            <svg className={`size-5 ${isSuccess ? 'text-green-600' : 'text-red-600'}`} fill="none" viewBox="0 0 24 24" stroke="currentColor">
              {isSuccess ? (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              ) : (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              )}
            </svg>
          </div>
          <p className="flex-1 text-sm font-medium">{isSuccess ? 'Successfully saved!' : 'Something went wrong'}</p>
          <button className="text-gray-400 hover:text-gray-600">
            <svg className="size-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>
      );
    },
  },
  {
    name: 'Alert with Action',
    description: 'Alert with action button',
    category: 'alerts',
    variants: [
      { label: 'Blue', value: 'blue' },
      { label: 'Red', value: 'red' },
    ],
    preview: (variant = 'blue') => {
      const styles = {
        blue: { bg: 'bg-blue-50', border: 'border-blue-200', text: 'text-blue-800', button: 'bg-blue-600 hover:bg-blue-700' },
        red: { bg: 'bg-red-50', border: 'border-red-200', text: 'text-red-800', button: 'bg-red-600 hover:bg-red-700' },
      };
      const style = styles[variant as keyof typeof styles];
      return (
        <div className={`${style.bg} ${style.border} ${style.text} p-4 rounded-lg border w-80`}>
          <p className="font-semibold text-sm mb-2">Alert Title</p>
          <p className="text-sm mb-3 opacity-90">This alert requires your attention and action.</p>
          <div className="flex gap-2">
            <button className={`${style.button} text-white px-3 py-1.5 rounded text-sm transition-colors`}>
              Take Action
            </button>
            <button className="text-sm hover:opacity-70">Dismiss</button>
          </div>
        </div>
      );
    },
  },
  {
    name: 'Inline Alert',
    description: 'Compact inline alert',
    category: 'alerts',
    variants: [
      { label: 'Success', value: 'success' },
      { label: 'Warning', value: 'warning' },
      { label: 'Error', value: 'error' },
    ],
    preview: (variant = 'success') => {
      const styles = {
        success: { border: 'border-green-300', text: 'text-green-700', icon: 'text-green-600' },
        warning: { border: 'border-yellow-300', text: 'text-yellow-700', icon: 'text-yellow-600' },
        error: { border: 'border-red-300', text: 'text-red-700', icon: 'text-red-600' },
      };
      const style = styles[variant as keyof typeof styles];
      return (
        <div className={`border-l-4 ${style.border} ${style.text} p-3 rounded-r flex items-center gap-2 w-80 bg-white shadow-sm`}>
          <svg className={`size-5 ${style.icon}`} fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
          <p className="text-sm">Inline alert message</p>
        </div>
      );
    },
  },
  {
    name: 'Progress Alert',
    description: 'Alert with progress indicator',
    category: 'alerts',
    preview: () => {
      return (
        <div className="bg-white p-4 rounded-lg shadow-md border border-gray-200 w-80">
          <div className="flex items-center gap-3 mb-3">
            <div className="animate-spin size-5 border-2 border-blue-600 border-t-transparent rounded-full"></div>
            <p className="text-sm font-medium">Processing...</p>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-2">
            <div className="bg-blue-600 h-2 rounded-full" style={{ width: '60%' }}></div>
          </div>
          <p className="text-xs text-gray-600 mt-2">60% complete</p>
        </div>
      );
    },
  },

  // ===== FORMS (12 components) =====
  {
    name: 'Input Field',
    description: 'Text input with label',
    category: 'forms',
    variants: [
      { label: 'Default', value: 'default' },
      { label: 'With Icon', value: 'icon' },
      { label: 'Error State', value: 'error' },
    ],
    preview: (variant = 'default') => {
      if (variant === 'icon') {
        return (
          <div className="w-64">
            <label className="block text-sm font-medium text-gray-700 mb-2">Email Address</label>
            <div className="relative">
              <input 
                type="text" 
                placeholder="Enter email" 
                className="w-full px-4 py-2 pl-10 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
              />
              <svg className="absolute left-3 top-2.5 size-5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 12a4 4 0 10-8 0 4 4 0 008 0zm0 0v1.5a2.5 2.5 0 005 0V12a9 9 0 10-9 9m4.5-1.206a8.959 8.959 0 01-4.5 1.207" />
              </svg>
            </div>
          </div>
        );
      }
      if (variant === 'error') {
        return (
          <div className="w-64">
            <label className="block text-sm font-medium text-gray-700 mb-2">Email Address</label>
            <input 
              type="text" 
              placeholder="Enter email" 
              className="w-full px-4 py-2 border-2 border-red-500 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent outline-none"
            />
            <p className="text-red-600 text-sm mt-1">This field is required</p>
          </div>
        );
      }
      return (
        <div className="w-64">
          <label className="block text-sm font-medium text-gray-700 mb-2">Email Address</label>
          <input 
            type="text" 
            placeholder="Enter email" 
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
          />
        </div>
      );
    },
  },
  {
    name: 'Select Dropdown',
    description: 'Dropdown select field',
    category: 'forms',
    variants: [
      { label: 'Default', value: 'default' },
      { label: 'With Label', value: 'label' },
    ],
    preview: (variant = 'default') => {
      if (variant === 'label') {
        return (
          <div className="w-64">
            <label className="block text-sm font-medium text-gray-700 mb-2">Select Option</label>
            <select className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none bg-white">
              <option>Option 1</option>
              <option>Option 2</option>
              <option>Option 3</option>
            </select>
          </div>
        );
      }
      return (
        <select className="w-64 px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none bg-white">
          <option>Select an option</option>
          <option>Option 1</option>
          <option>Option 2</option>
        </select>
      );
    },
  },
  {
    name: 'Textarea',
    description: 'Multi-line text input',
    category: 'forms',
    variants: [
      { label: 'Default', value: 'default' },
      { label: 'With Label', value: 'label' },
    ],
    preview: (variant = 'default') => {
      if (variant === 'label') {
        return (
          <div className="w-64">
            <label className="block text-sm font-medium text-gray-700 mb-2">Message</label>
            <textarea 
              placeholder="Enter your message" 
              rows={4}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none resize-none"
            />
          </div>
        );
      }
      return (
        <textarea 
          placeholder="Enter text" 
          rows={3}
          className="w-64 px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none resize-none"
        />
      );
    },
  },
  {
    name: 'Checkbox',
    description: 'Checkbox input with label',
    category: 'forms',
    variants: [
      { label: 'Single', value: 'single' },
      { label: 'Group', value: 'group' },
    ],
    preview: (variant = 'single') => {
      if (variant === 'group') {
        return (
          <div className="space-y-2">
            <label className="flex items-center gap-2 cursor-pointer">
              <input type="checkbox" className="size-4 text-blue-600 rounded" />
              <span className="text-sm">Option 1</span>
            </label>
            <label className="flex items-center gap-2 cursor-pointer">
              <input type="checkbox" className="size-4 text-blue-600 rounded" defaultChecked />
              <span className="text-sm">Option 2</span>
            </label>
            <label className="flex items-center gap-2 cursor-pointer">
              <input type="checkbox" className="size-4 text-blue-600 rounded" />
              <span className="text-sm">Option 3</span>
            </label>
          </div>
        );
      }
      return (
        <label className="flex items-center gap-2 cursor-pointer">
          <input type="checkbox" className="size-4 text-blue-600 rounded" />
          <span className="text-sm">I agree to the terms and conditions</span>
        </label>
      );
    },
  },
  {
    name: 'Radio Button',
    description: 'Radio button group',
    category: 'forms',
    preview: () => {
      return (
        <div className="space-y-2">
          <label className="flex items-center gap-2 cursor-pointer">
            <input type="radio" name="radio" className="size-4 text-blue-600" defaultChecked />
            <span className="text-sm">Option 1</span>
          </label>
          <label className="flex items-center gap-2 cursor-pointer">
            <input type="radio" name="radio" className="size-4 text-blue-600" />
            <span className="text-sm">Option 2</span>
          </label>
          <label className="flex items-center gap-2 cursor-pointer">
            <input type="radio" name="radio" className="size-4 text-blue-600" />
            <span className="text-sm">Option 3</span>
          </label>
        </div>
      );
    },
  },
  {
    name: 'Toggle Switch',
    description: 'Toggle switch component',
    category: 'forms',
    variants: [
      { label: 'On', value: 'on' },
      { label: 'Off', value: 'off' },
    ],
    sizes: [
      { label: 'Small', value: 'sm' },
      { label: 'Medium', value: 'md' },
      { label: 'Large', value: 'lg' },
    ],
    preview: (variant = 'on', size = 'md') => {
      const isOn = variant === 'on';
      const sizes = {
        sm: { container: 'w-8 h-4', circle: 'size-3' },
        md: { container: 'w-11 h-6', circle: 'size-5' },
        lg: { container: 'w-14 h-7', circle: 'size-6' },
      };
      const s = sizes[size as keyof typeof sizes];
      return (
        <label className="flex items-center gap-3 cursor-pointer">
          <div className={`${s.container} ${isOn ? 'bg-blue-600' : 'bg-gray-300'} rounded-full p-0.5 transition-colors relative`}>
            <div className={`${s.circle} bg-white rounded-full transition-transform ${isOn ? 'translate-x-full' : 'translate-x-0'}`}></div>
          </div>
          <span className="text-sm">Toggle {isOn ? 'On' : 'Off'}</span>
        </label>
      );
    },
  },
  {
    name: 'Search Input',
    description: 'Search input with icon',
    category: 'forms',
    variants: [
      { label: 'Left Icon', value: 'left' },
      { label: 'Right Icon', value: 'right' },
    ],
    preview: (variant = 'left') => {
      if (variant === 'right') {
        return (
          <div className="relative w-64">
            <input 
              type="text" 
              placeholder="Search..." 
              className="w-full px-4 py-2 pr-10 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
            />
            <svg className="absolute right-3 top-2.5 size-5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
          </div>
        );
      }
      return (
        <div className="relative w-64">
          <input 
            type="text" 
            placeholder="Search..." 
            className="w-full px-4 py-2 pl-10 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
          />
          <svg className="absolute left-3 top-2.5 size-5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
          </svg>
        </div>
      );
    },
  },
  {
    name: 'File Upload',
    description: 'File upload dropzone',
    category: 'forms',
    variants: [
      { label: 'Default', value: 'default' },
      { label: 'Drag Active', value: 'active' },
    ],
    preview: (variant = 'default') => {
      const isActive = variant === 'active';
      return (
        <div className={`w-80 h-40 border-2 border-dashed rounded-lg flex flex-col items-center justify-center gap-2 cursor-pointer transition-colors ${
          isActive ? 'border-blue-500 bg-blue-50' : 'border-gray-300 bg-white hover:bg-gray-50'
        }`}>
          <svg className={`size-10 ${isActive ? 'text-blue-600' : 'text-gray-400'}`} fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
          </svg>
          <p className={`text-sm ${isActive ? 'text-blue-600 font-medium' : 'text-gray-600'}`}>
            {isActive ? 'Drop files here' : 'Click to upload or drag and drop'}
          </p>
          <p className="text-xs text-gray-500">PNG, JPG up to 10MB</p>
        </div>
      );
    },
  },
  {
    name: 'Range Slider',
    description: 'Range slider input',
    category: 'forms',
    variants: [
      { label: 'With Label', value: 'label' },
      { label: 'With Value', value: 'value' },
    ],
    preview: (variant = 'label') => {
      if (variant === 'value') {
        return (
          <div className="w-64">
            <div className="flex items-center justify-between mb-2">
              <label className="text-sm font-medium text-gray-700">Volume</label>
              <span className="text-sm text-gray-600">75%</span>
            </div>
            <input 
              type="range" 
              defaultValue={75} 
              className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-blue-600"
            />
          </div>
        );
      }
      return (
        <div className="w-64">
          <label className="block text-sm font-medium text-gray-700 mb-2">Adjust Setting</label>
          <input 
            type="range" 
            className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-blue-600"
          />
        </div>
      );
    },
  },
  {
    name: 'Color Picker',
    description: 'Color input picker',
    category: 'forms',
    variants: [
      { label: 'With Label', value: 'label' },
      { label: 'Inline', value: 'inline' },
    ],
    preview: (variant = 'label') => {
      if (variant === 'inline') {
        return (
          <div className="flex items-center gap-3">
            <input 
              type="color" 
              defaultValue="#3B82F6" 
              className="size-10 rounded border border-gray-300 cursor-pointer"
            />
            <span className="text-sm text-gray-700">#3B82F6</span>
          </div>
        );
      }
      return (
        <div className="w-64">
          <label className="block text-sm font-medium text-gray-700 mb-2">Choose Color</label>
          <input 
            type="color" 
            defaultValue="#3B82F6" 
            className="w-full h-10 rounded border border-gray-300 cursor-pointer"
          />
        </div>
      );
    },
  },
  {
    name: 'Date Picker',
    description: 'Date input field',
    category: 'forms',
    variants: [
      { label: 'Single', value: 'single' },
      { label: 'Range', value: 'range' },
    ],
    preview: (variant = 'single') => {
      if (variant === 'range') {
        return (
          <div className="w-80">
            <label className="block text-sm font-medium text-gray-700 mb-2">Date Range</label>
            <div className="flex items-center gap-2">
              <input 
                type="date" 
                className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none text-sm"
              />
              <span className="text-gray-500">to</span>
              <input 
                type="date" 
                className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none text-sm"
              />
            </div>
          </div>
        );
      }
      return (
        <div className="w-64">
          <label className="block text-sm font-medium text-gray-700 mb-2">Select Date</label>
          <input 
            type="date" 
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none text-sm"
          />
        </div>
      );
    },
  },
  {
    name: 'Password Input',
    description: 'Password field with toggle',
    category: 'forms',
    variants: [
      { label: 'Hidden', value: 'hidden' },
      { label: 'Visible', value: 'visible' },
    ],
    preview: (variant = 'hidden') => {
      return (
        <div className="w-64">
          <label className="block text-sm font-medium text-gray-700 mb-2">Password</label>
          <div className="relative">
            <input 
              type={variant === 'visible' ? 'text' : 'password'}
              placeholder="Enter password" 
              defaultValue="password123"
              className="w-full px-4 py-2 pr-10 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
            />
            <button className="absolute right-3 top-2.5 text-gray-400 hover:text-gray-600">
              {variant === 'visible' ? (
                <svg className="size-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l3.59 3.59m0 0A9.953 9.953 0 0112 5c4.478 0 8.268 2.943 9.543 7a10.025 10.025 0 01-4.132 5.411m0 0L21 21" />
                </svg>
              ) : (
                <svg className="size-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                </svg>
              )}
            </button>
          </div>
        </div>
      );
    },
  },

  // ===== NAVIGATION (8 components) =====
  {
    name: 'Nav Pills',
    description: 'Pill-style navigation',
    category: 'navigation',
    variants: [
      { label: 'Horizontal', value: 'horizontal' },
      { label: 'Vertical', value: 'vertical' },
    ],
    preview: (variant = 'horizontal') => {
      const flex = variant === 'horizontal' ? 'flex-row' : 'flex-col';
      return (
        <div className={`flex ${flex} gap-2 bg-gray-100 p-2 rounded-lg w-fit`}>
          <button className="bg-blue-600 text-white px-4 py-2 rounded-md text-sm font-medium">Active</button>
          <button className="text-gray-600 hover:bg-gray-200 px-4 py-2 rounded-md text-sm font-medium transition-colors">Link</button>
          <button className="text-gray-600 hover:bg-gray-200 px-4 py-2 rounded-md text-sm font-medium transition-colors">Link</button>
        </div>
      );
    },
  },
  {
    name: 'Breadcrumbs',
    description: 'Navigation breadcrumb trail',
    category: 'navigation',
    preview: () => {
      return (
        <nav className="flex items-center gap-2 text-sm">
          <a href="#" className="text-blue-600 hover:text-blue-800">Home</a>
          <span className="text-gray-400">/</span>
          <a href="#" className="text-blue-600 hover:text-blue-800">Category</a>
          <span className="text-gray-400">/</span>
          <span className="text-gray-600">Current Page</span>
        </nav>
      );
    },
  },
  {
    name: 'Tab Navigation',
    description: 'Horizontal tab navigation',
    category: 'navigation',
    variants: [
      { label: 'Underline', value: 'underline' },
      { label: 'Pills', value: 'pills' },
    ],
    preview: (variant = 'underline') => {
      if (variant === 'pills') {
        return (
          <div className="flex gap-1 bg-gray-100 p-1 rounded-lg w-fit">
            <button className="bg-white text-gray-900 px-4 py-2 rounded-md text-sm font-medium shadow-sm">Tab 1</button>
            <button className="text-gray-600 hover:text-gray-900 px-4 py-2 rounded-md text-sm font-medium">Tab 2</button>
            <button className="text-gray-600 hover:text-gray-900 px-4 py-2 rounded-md text-sm font-medium">Tab 3</button>
          </div>
        );
      }
      return (
        <div className="flex gap-6 border-b border-gray-200">
          <button className="border-b-2 border-blue-600 text-blue-600 px-1 py-3 text-sm font-medium">Tab 1</button>
          <button className="border-b-2 border-transparent text-gray-600 hover:text-gray-900 hover:border-gray-300 px-1 py-3 text-sm font-medium">Tab 2</button>
          <button className="border-b-2 border-transparent text-gray-600 hover:text-gray-900 hover:border-gray-300 px-1 py-3 text-sm font-medium">Tab 3</button>
        </div>
      );
    },
  },
  {
    name: 'Pagination',
    description: 'Page navigation component',
    category: 'navigation',
    preview: () => {
      return (
        <div className="flex items-center gap-2">
          <button className="px-3 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed" disabled>
            <svg className="size-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
          </button>
          <button className="px-4 py-2 bg-blue-600 text-white rounded-lg">1</button>
          <button className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50">2</button>
          <button className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50">3</button>
          <span className="px-2 text-gray-500">...</span>
          <button className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50">10</button>
          <button className="px-3 py-2 border border-gray-300 rounded-lg hover:bg-gray-50">
            <svg className="size-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </button>
        </div>
      );
    },
  },
  {
    name: 'Sidebar Nav',
    description: 'Vertical sidebar navigation',
    category: 'navigation',
    preview: () => {
      return (
        <nav className="bg-white border border-gray-200 rounded-lg p-2 w-48 space-y-1">
          <a href="#" className="flex items-center gap-3 px-3 py-2 text-sm rounded-lg bg-blue-50 text-blue-600">
            <svg className="size-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
            </svg>
            Dashboard
          </a>
          <a href="#" className="flex items-center gap-3 px-3 py-2 text-sm rounded-lg text-gray-700 hover:bg-gray-100">
            <svg className="size-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
            </svg>
            Users
          </a>
          <a href="#" className="flex items-center gap-3 px-3 py-2 text-sm rounded-lg text-gray-700 hover:bg-gray-100">
            <svg className="size-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
            </svg>
            Settings
          </a>
        </nav>
      );
    },
  },
  {
    name: 'Top Navigation',
    description: 'Horizontal top navbar',
    category: 'navigation',
    preview: () => {
      return (
        <nav className="bg-white border-b border-gray-200 px-4 py-3 flex items-center justify-between w-full">
          <div className="flex items-center gap-8">
            <div className="font-semibold text-lg">Logo</div>
            <div className="flex gap-6">
              <a href="#" className="text-sm text-blue-600 font-medium">Home</a>
              <a href="#" className="text-sm text-gray-600 hover:text-gray-900">Products</a>
              <a href="#" className="text-sm text-gray-600 hover:text-gray-900">About</a>
            </div>
          </div>
          <button className="bg-blue-600 text-white px-4 py-2 rounded-lg text-sm">Sign In</button>
        </nav>
      );
    },
  },
  {
    name: 'Dropdown Menu',
    description: 'Dropdown navigation menu',
    category: 'navigation',
    variants: [
      { label: 'Open', value: 'open' },
      { label: 'Closed', value: 'closed' },
    ],
    preview: (variant = 'open') => {
      const isOpen = variant === 'open';
      return (
        <div className="relative inline-block">
          <button className="bg-white border border-gray-300 px-4 py-2 rounded-lg flex items-center gap-2 hover:bg-gray-50">
            <span className="text-sm">Menu</span>
            <svg className="size-4 text-gray-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
            </svg>
          </button>
          {isOpen && (
            <div className="absolute top-full left-0 mt-2 bg-white border border-gray-200 rounded-lg shadow-lg py-2 w-48 z-10">
              <a href="#" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">Profile</a>
              <a href="#" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">Settings</a>
              <div className="border-t border-gray-200 my-1"></div>
              <a href="#" className="block px-4 py-2 text-sm text-red-600 hover:bg-gray-100">Sign Out</a>
            </div>
          )}
        </div>
      );
    },
  },
  {
    name: 'Footer',
    description: 'Footer navigation section',
    category: 'navigation',
    preview: () => {
      return (
        <footer className="bg-gray-900 text-white px-8 py-8 w-full">
          <div className="grid grid-cols-3 gap-8 mb-6">
            <div>
              <h3 className="font-semibold mb-3">Product</h3>
              <ul className="space-y-2 text-sm text-gray-400">
                <li><a href="#" className="hover:text-white">Features</a></li>
                <li><a href="#" className="hover:text-white">Pricing</a></li>
                <li><a href="#" className="hover:text-white">FAQ</a></li>
              </ul>
            </div>
            <div>
              <h3 className="font-semibold mb-3">Company</h3>
              <ul className="space-y-2 text-sm text-gray-400">
                <li><a href="#" className="hover:text-white">About</a></li>
                <li><a href="#" className="hover:text-white">Blog</a></li>
                <li><a href="#" className="hover:text-white">Careers</a></li>
              </ul>
            </div>
            <div>
              <h3 className="font-semibold mb-3">Legal</h3>
              <ul className="space-y-2 text-sm text-gray-400">
                <li><a href="#" className="hover:text-white">Privacy</a></li>
                <li><a href="#" className="hover:text-white">Terms</a></li>
              </ul>
            </div>
          </div>
          <div className="border-t border-gray-800 pt-6 text-sm text-gray-400 text-center">
            © 2025 Company Name. All rights reserved.
          </div>
        </footer>
      );
    },
  },

  // ===== LAYOUT (8 components) =====
  {
    name: 'Container',
    description: 'Centered content container',
    category: 'layout',
    sizes: [
      { label: 'Small', value: 'sm' },
      { label: 'Medium', value: 'md' },
      { label: 'Large', value: 'lg' },
      { label: 'Full', value: 'full' },
    ],
    preview: (variant, size = 'md') => {
      const sizes = {
        sm: 'max-w-2xl',
        md: 'max-w-4xl',
        lg: 'max-w-6xl',
        full: 'max-w-full',
      };
      return (
        <div className={`${sizes[size as keyof typeof sizes]} mx-auto bg-gray-100 border-2 border-dashed border-gray-300 rounded-lg p-4`}>
          <p className="text-gray-600 text-sm text-center">Container - {size}</p>
        </div>
      );
    },
  },
  {
    name: 'Grid Layout',
    description: 'Responsive grid system',
    category: 'layout',
    variants: [
      { label: '2 Columns', value: '2col' },
      { label: '3 Columns', value: '3col' },
      { label: '4 Columns', value: '4col' },
    ],
    preview: (variant = '3col') => {
      const cols = {
        '2col': 'grid-cols-2',
        '3col': 'grid-cols-3',
        '4col': 'grid-cols-4',
      };
      const count = {
        '2col': 2,
        '3col': 3,
        '4col': 4,
      };
      return (
        <div className={`grid ${cols[variant as keyof typeof cols]} gap-4 w-full`}>
          {Array.from({ length: count[variant as keyof typeof count] }).map((_, i) => (
            <div key={i} className="bg-gray-200 border-2 border-dashed border-gray-400 rounded-lg p-4 h-24 flex items-center justify-center">
              <span className="text-gray-600 text-sm">Col {i + 1}</span>
            </div>
          ))}
        </div>
      );
    },
  },
  {
    name: 'Badge',
    description: 'Small status indicator',
    category: 'layout',
    variants: [
      { label: 'Blue', value: 'blue' },
      { label: 'Green', value: 'green' },
      { label: 'Red', value: 'red' },
      { label: 'Gray', value: 'gray' },
    ],
    sizes: [
      { label: 'Small', value: 'sm' },
      { label: 'Medium', value: 'md' },
      { label: 'Large', value: 'lg' },
    ],
    preview: (variant = 'blue', size = 'md') => {
      const colors = {
        blue: 'bg-blue-100 text-blue-800 border-blue-200',
        green: 'bg-green-100 text-green-800 border-green-200',
        red: 'bg-red-100 text-red-800 border-red-200',
        gray: 'bg-gray-100 text-gray-800 border-gray-200',
      };
      const sizes = {
        sm: 'px-2 py-0.5 text-xs',
        md: 'px-3 py-1 text-sm',
        lg: 'px-4 py-1.5 text-base',
      };
      return (
        <span className={`${colors[variant as keyof typeof colors]} ${sizes[size as keyof typeof sizes]} rounded-full border font-medium inline-block`}>
          Badge
        </span>
      );
    },
  },
  {
    name: 'Avatar',
    description: 'User profile image placeholder',
    category: 'layout',
    sizes: [
      { label: 'Small', value: 'sm' },
      { label: 'Medium', value: 'md' },
      { label: 'Large', value: 'lg' },
    ],
    preview: (variant, size = 'md') => {
      const sizes = {
        sm: 'size-8 text-xs',
        md: 'size-12 text-sm',
        lg: 'size-16 text-base',
      };
      return (
        <div className={`${sizes[size as keyof typeof sizes]} rounded-full bg-gradient-to-br from-blue-400 to-purple-500 flex items-center justify-center text-white font-semibold`}>
          JD
        </div>
      );
    },
  },
  {
    name: 'Divider',
    description: 'Section separator',
    category: 'layout',
    variants: [
      { label: 'Horizontal', value: 'horizontal' },
      { label: 'With Text', value: 'text' },
    ],
    preview: (variant = 'horizontal') => {
      if (variant === 'text') {
        return (
          <div className="flex items-center gap-4 w-64">
            <div className="flex-1 border-t border-gray-300"></div>
            <span className="text-gray-500 text-sm">OR</span>
            <div className="flex-1 border-t border-gray-300"></div>
          </div>
        );
      }
      return <div className="w-64 border-t border-gray-300"></div>;
    },
  },
  {
    name: 'Flex Layout',
    description: 'Flexbox layout examples',
    category: 'layout',
    variants: [
      { label: 'Space Between', value: 'between' },
      { label: 'Center', value: 'center' },
      { label: 'Start', value: 'start' },
    ],
    preview: (variant = 'between') => {
      const justifyMap = {
        between: 'justify-between',
        center: 'justify-center',
        start: 'justify-start',
      };
      return (
        <div className={`flex ${justifyMap[variant as keyof typeof justifyMap]} items-center gap-4 p-4 bg-gray-100 border-2 border-dashed border-gray-300 rounded-lg w-full`}>
          <div className="bg-blue-500 size-12 rounded"></div>
          <div className="bg-green-500 size-12 rounded"></div>
          <div className="bg-purple-500 size-12 rounded"></div>
        </div>
      );
    },
  },
  {
    name: 'Stack Layout',
    description: 'Vertical stack of elements',
    category: 'layout',
    variants: [
      { label: 'Tight', value: 'tight' },
      { label: 'Normal', value: 'normal' },
      { label: 'Loose', value: 'loose' },
    ],
    preview: (variant = 'normal') => {
      const spacing = {
        tight: 'gap-1',
        normal: 'gap-3',
        loose: 'gap-6',
      };
      return (
        <div className={`flex flex-col ${spacing[variant as keyof typeof spacing]} p-4 bg-gray-100 border-2 border-dashed border-gray-300 rounded-lg w-64`}>
          <div className="bg-blue-500 h-8 rounded"></div>
          <div className="bg-green-500 h-8 rounded"></div>
          <div className="bg-purple-500 h-8 rounded"></div>
        </div>
      );
    },
  },
  {
    name: 'Section',
    description: 'Content section with padding',
    category: 'layout',
    variants: [
      { label: 'Light', value: 'light' },
      { label: 'Dark', value: 'dark' },
      { label: 'Gradient', value: 'gradient' },
    ],
    preview: (variant = 'light') => {
      const styles = {
        light: 'bg-gray-50',
        dark: 'bg-gray-900 text-white',
        gradient: 'bg-gradient-to-r from-blue-500 to-purple-600 text-white',
      };
      return (
        <div className={`${styles[variant as keyof typeof styles]} p-8 rounded-lg w-full`}>
          <h2 className="font-semibold text-xl mb-2">Section Title</h2>
          <p className="opacity-90">This is a content section with consistent spacing and styling.</p>
        </div>
      );
    },
  },

  // ===== DATA (4 components) =====
  {
    name: 'Table',
    description: 'Data table component',
    category: 'data',
    variants: [
      { label: 'Striped', value: 'striped' },
      { label: 'Bordered', value: 'bordered' },
    ],
    preview: (variant = 'striped') => {
      const isStriped = variant === 'striped';
      return (
        <div className="w-full overflow-x-auto">
          <table className={`w-full text-sm ${!isStriped ? 'border border-gray-300' : ''}`}>
            <thead className="bg-gray-100">
              <tr>
                <th className="px-4 py-2 text-left font-semibold">Name</th>
                <th className="px-4 py-2 text-left font-semibold">Email</th>
                <th className="px-4 py-2 text-left font-semibold">Status</th>
              </tr>
            </thead>
            <tbody>
              {[1, 2, 3].map((i) => (
                <tr key={i} className={isStriped && i % 2 === 0 ? 'bg-gray-50' : ''}>
                  <td className={`px-4 py-2 ${!isStriped ? 'border-t border-gray-300' : ''}`}>User {i}</td>
                  <td className={`px-4 py-2 ${!isStriped ? 'border-t border-gray-300' : ''}`}>user{i}@email.com</td>
                  <td className={`px-4 py-2 ${!isStriped ? 'border-t border-gray-300' : ''}`}>
                    <span className="bg-green-100 text-green-800 px-2 py-1 rounded-full text-xs">Active</span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      );
    },
  },
  {
    name: 'List',
    description: 'Vertical list of items',
    category: 'data',
    variants: [
      { label: 'Simple', value: 'simple' },
      { label: 'With Icons', value: 'icons' },
    ],
    preview: (variant = 'simple') => {
      if (variant === 'icons') {
        return (
          <ul className="bg-white border border-gray-200 rounded-lg divide-y divide-gray-200 w-64">
            {[1, 2, 3].map((i) => (
              <li key={i} className="px-4 py-3 hover:bg-gray-50 cursor-pointer flex items-center gap-3">
                <div className="bg-blue-100 p-2 rounded">
                  <svg className="size-4 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                  </svg>
                </div>
                <span className="text-sm">List Item {i}</span>
              </li>
            ))}
          </ul>
        );
      }
      return (
        <ul className="bg-white border border-gray-200 rounded-lg divide-y divide-gray-200 w-64">
          {[1, 2, 3, 4].map((i) => (
            <li key={i} className="px-4 py-3 hover:bg-gray-50 cursor-pointer text-sm">
              List Item {i}
            </li>
          ))}
        </ul>
      );
    },
  },
  {
    name: 'Timeline',
    description: 'Vertical timeline component',
    category: 'data',
    preview: () => {
      return (
        <div className="space-y-4 w-80">
          {[1, 2, 3].map((i) => (
            <div key={i} className="flex gap-4">
              <div className="flex flex-col items-center">
                <div className="size-8 rounded-full bg-blue-600 flex items-center justify-center text-white text-xs font-semibold">
                  {i}
                </div>
                {i < 3 && <div className="w-0.5 bg-gray-300 flex-1 mt-2"></div>}
              </div>
              <div className="flex-1 pb-8">
                <h4 className="font-semibold text-sm mb-1">Event Title {i}</h4>
                <p className="text-gray-600 text-xs mb-1">Description of the event or milestone.</p>
                <span className="text-xs text-gray-500">2 hours ago</span>
              </div>
            </div>
          ))}
        </div>
      );
    },
  },
  {
    name: 'Key-Value Pair',
    description: 'Display key-value data',
    category: 'data',
    variants: [
      { label: 'Horizontal', value: 'horizontal' },
      { label: 'Vertical', value: 'vertical' },
    ],
    preview: (variant = 'horizontal') => {
      if (variant === 'vertical') {
        return (
          <div className="bg-white border border-gray-200 rounded-lg p-4 w-64 space-y-3">
            {['Name', 'Email', 'Role'].map((key) => (
              <div key={key}>
                <div className="text-xs text-gray-500 mb-1">{key}</div>
                <div className="text-sm font-medium">Value Here</div>
              </div>
            ))}
          </div>
        );
      }
      return (
        <div className="bg-white border border-gray-200 rounded-lg divide-y divide-gray-200 w-80">
          {['Name', 'Email', 'Role'].map((key) => (
            <div key={key} className="px-4 py-3 flex justify-between items-center">
              <span className="text-sm text-gray-600">{key}</span>
              <span className="text-sm font-medium">Value Here</span>
            </div>
          ))}
        </div>
      );
    },
  },

  // ===== FEEDBACK (4 components) =====
  {
    name: 'Progress Bar',
    description: 'Progress indicator',
    category: 'feedback',
    variants: [
      { label: 'Blue', value: 'blue' },
      { label: 'Green', value: 'green' },
      { label: 'Gradient', value: 'gradient' },
    ],
    preview: (variant = 'blue') => {
      const colors = {
        blue: 'bg-blue-600',
        green: 'bg-green-600',
        gradient: 'bg-gradient-to-r from-blue-500 to-purple-600',
      };
      return (
        <div className="w-80">
          <div className="flex justify-between text-sm mb-2">
            <span className="text-gray-700">Progress</span>
            <span className="text-gray-600">65%</span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-2.5">
            <div className={`${colors[variant as keyof typeof colors]} h-2.5 rounded-full`} style={{ width: '65%' }}></div>
          </div>
        </div>
      );
    },
  },
  {
    name: 'Loading Spinner',
    description: 'Loading animation',
    category: 'feedback',
    variants: [
      { label: 'Circle', value: 'circle' },
      { label: 'Dots', value: 'dots' },
    ],
    sizes: [
      { label: 'Small', value: 'sm' },
      { label: 'Medium', value: 'md' },
      { label: 'Large', value: 'lg' },
    ],
    preview: (variant = 'circle', size = 'md') => {
      const sizes = {
        sm: 'size-4',
        md: 'size-8',
        lg: 'size-12',
      };
      if (variant === 'dots') {
        return (
          <div className="flex gap-2">
            <div className="size-3 bg-blue-600 rounded-full animate-bounce"></div>
            <div className="size-3 bg-blue-600 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
            <div className="size-3 bg-blue-600 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
          </div>
        );
      }
      return (
        <div className={`${sizes[size as keyof typeof sizes]} border-4 border-gray-200 border-t-blue-600 rounded-full animate-spin`}></div>
      );
    },
  },
  {
    name: 'Skeleton Loader',
    description: 'Content placeholder while loading',
    category: 'feedback',
    variants: [
      { label: 'Text', value: 'text' },
      { label: 'Card', value: 'card' },
    ],
    preview: (variant = 'text') => {
      if (variant === 'card') {
        return (
          <div className="bg-white border border-gray-200 rounded-lg p-4 w-64 animate-pulse">
            <div className="bg-gray-200 h-32 rounded mb-4"></div>
            <div className="bg-gray-200 h-4 rounded mb-2"></div>
            <div className="bg-gray-200 h-4 rounded w-2/3"></div>
          </div>
        );
      }
      return (
        <div className="w-64 animate-pulse space-y-3">
          <div className="bg-gray-200 h-4 rounded w-full"></div>
          <div className="bg-gray-200 h-4 rounded w-5/6"></div>
          <div className="bg-gray-200 h-4 rounded w-4/6"></div>
        </div>
      );
    },
  },
  {
    name: 'Empty State',
    description: 'No data placeholder',
    category: 'feedback',
    preview: () => {
      return (
        <div className="flex flex-col items-center justify-center p-12 text-center w-80">
          <div className="bg-gray-100 rounded-full p-4 mb-4">
            <svg className="size-12 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2.586a1 1 0 00-.707.293l-2.414 2.414a1 1 0 01-.707.293h-3.172a1 1 0 01-.707-.293l-2.414-2.414A1 1 0 006.586 13H4" />
            </svg>
          </div>
          <h3 className="font-semibold mb-2">No items found</h3>
          <p className="text-gray-600 text-sm mb-4">Get started by creating your first item.</p>
          <button className="bg-blue-600 text-white px-4 py-2 rounded-lg text-sm">Create Item</button>
        </div>
      );
    },
  },
];

export function renderTailwindPreview(
  componentName: string,
  variant?: string,
  size?: string
): React.ReactNode {
  const component = tailwindComponentRegistry.find(c => c.name === componentName);
  if (!component) return null;
  
  return component.preview(variant, size);
}
