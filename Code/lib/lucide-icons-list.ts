import * as LucideIcons from 'lucide-react';
import { staticLucideIconsList } from './lucide-icons-static';

// List of known non-icon exports to exclude
const excludeList = [
  'createLucideIcon',
  'Icon',
  'default',
  'icons',
  'dynamicIconImports',
];

// Function to get icon list (called at runtime, not module load time)
export function getLucideIconsList(): string[] {
  const allKeys = Object.keys(LucideIcons);
  console.log('🔍 DEBUG: Total LucideIcons exports:', allKeys.length);
  
  // If dynamic extraction fails, use static list
  if (allKeys.length === 0) {
    console.log('⚠️ Dynamic extraction failed, using static list');
    return staticLucideIconsList;
  }
  
  console.log('🔍 DEBUG: First 20 exports:', allKeys.slice(0, 20));
  
  const iconsList = allKeys
    .filter((key) => {
      // Exclude known non-icon exports
      if (excludeList.includes(key)) return false;
      
      // Exclude items ending with "Icon" (these are aliases like "ActivityIcon")
      // We only want the base names like "Activity"
      if (key.endsWith('Icon')) return false;
      
      // Only exclude exports with "Lucide" prefix (e.g., LucideRuler)
      if (key.startsWith('Lucide')) return false;
      
      // Exclude TypeScript type exports
      if (key.includes('Props') || key.includes('Node')) return false;
      
      const value = (LucideIcons as any)[key];
      
      // Must be defined and be either a function OR an object (React forwardRef components are objects)
      if (!value) return false;
      const valueType = typeof value;
      if (valueType !== 'function' && valueType !== 'object') return false;
      
      return true;
    })
    .sort(); // Sort alphabetically
  
  // If filtering resulted in no icons, use static list
  if (iconsList.length === 0) {
    console.log('⚠️ Filtering resulted in 0 icons, using static list');
    return staticLucideIconsList;
  }
  
  console.log(`✅ Lucide Icons found: ${iconsList.length}`);
  console.log('🔍 DEBUG: First 20 icons:', iconsList.slice(0, 20));
  return iconsList;
}

// Export for backward compatibility - but call the function
export const lucideIconsList = getLucideIconsList();