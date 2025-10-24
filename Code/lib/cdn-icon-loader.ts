// CDN Icon Loader - Fetches icons from jsdelivr CDN and caches them locally
import { lucideIconsList } from './lucide-icons-list';

export interface IconData {
  name: string;
  svg: string;
  category?: string;
}

export interface IconLibrary {
  name: string;
  cdnUrl: string;
  icons: IconData[];
  lastFetched: number;
}

const CACHE_KEY = 'librarian_icon_cache';
const CACHE_DURATION = 24 * 60 * 60 * 1000; // 24 hours in milliseconds

/**
 * Gets icon list from the bundled lucide-react package
 * This is our reliable fallback that always works
 */
function getLocalIconList(): string[] {
  try {
    console.log(`Local icon library has ${lucideIconsList.length} icons`);
    return lucideIconsList;
  } catch (error) {
    console.error('Error loading local icons:', error);
    // Return basic fallback icons if even local loading fails
    return ['Search', 'Plus', 'Settings', 'Info', 'X'];
  }
}

/**
 * Fetches the list of Lucide icons from jsdelivr CDN
 * Uses the icons.json metadata file from lucide package
 */
export async function fetchLucideIconsFromCDN(): Promise<string[]> {
  try {
    // Try to fetch the icons.json metadata file
    const response = await fetch(
      'https://cdn.jsdelivr.net/npm/lucide-static@latest/icons.json',
      { 
        mode: 'cors',
        headers: {
          'Accept': 'application/json'
        }
      }
    );
    
    if (response.ok) {
      const data = await response.json();
      // The icons.json file contains icon metadata with kebab-case names
      // We need to convert them to PascalCase to match lucide-react exports
      const iconNames = Object.keys(data)
        .map(name => {
          // Convert kebab-case to PascalCase: arrow-right -> ArrowRight
          return name.split('-')
            .map(word => word.charAt(0).toUpperCase() + word.slice(1))
            .join('');
        })
        .sort();
      
      console.log(`✓ Fetched ${iconNames.length} icons from CDN`);
      return iconNames;
    }
    
    // Silently return empty array if CDN fails - we'll use local icons
    return [];
    
  } catch (error) {
    // Silently fail and use local icons - this is expected behavior
    return [];
  }
}

/**
 * Fetches a single icon SVG from the CDN
 */
export async function fetchIconSVG(iconName: string): Promise<string> {
  try {
    // Convert PascalCase to kebab-case: ArrowRight -> arrow-right
    const kebabName = iconName
      .replace(/([A-Z])/g, '-$1')
      .toLowerCase()
      .replace(/^-/, '');
    
    const response = await fetch(
      `https://cdn.jsdelivr.net/npm/lucide-static@latest/icons/${kebabName}.svg`
    );
    
    if (!response.ok) {
      throw new Error(`Failed to fetch icon ${iconName}: ${response.statusText}`);
    }
    
    return await response.text();
  } catch (error) {
    console.error(`Error fetching icon ${iconName}:`, error);
    return '';
  }
}

/**
 * Gets cached icon library or fetches from CDN if cache is stale
 * In Figma environment, always use local icons to avoid network restrictions
 */
export async function getIconLibrary(): Promise<string[]> {
  try {
    // Always use local icons in plugin environment - no network requests
    const localIcons = getLocalIconList();
    console.log(`✅ Using local icon library (${localIcons.length} icons) - no network access in plugin`);
    return localIcons;
  } catch (error) {
    console.error('Error in getIconLibrary:', error);
    // Return basic fallback icons if everything fails
    return ['Search', 'Plus', 'Settings', 'Info', 'X', 'ChevronDown', 'ChevronRight'];
  }
}

/**
 * Force refresh the icon library from CDN
 */
export async function refreshIconLibrary(): Promise<string[]> {
  try {
    if (typeof localStorage !== 'undefined') {
      localStorage.removeItem(CACHE_KEY);
    }
  } catch (error) {
    // Ignore localStorage errors in restricted environments
  }
  return await getIconLibrary();
}

/**
 * Clear the icon cache
 */
export function clearIconCache() {
  try {
    if (typeof localStorage !== 'undefined') {
      localStorage.removeItem(CACHE_KEY);
    }
  } catch (error) {
    // Ignore localStorage errors in restricted environments
  }
}

/**
 * Get cache info for debugging
 */
export function getCacheInfo() {
  try {
    if (typeof localStorage === 'undefined') {
      return null;
    }
    
    const cachedData = localStorage.getItem(CACHE_KEY);
    
    if (!cachedData) {
      return null;
    }
    
    const parsed = JSON.parse(cachedData);
    const now = Date.now();
    const age = now - parsed.lastFetched;
    const isStale = age >= CACHE_DURATION;
    
    return {
      iconCount: parsed.icons.length,
      lastFetched: new Date(parsed.lastFetched).toLocaleString(),
      ageInHours: Math.round(age / (60 * 60 * 1000)),
      isStale
    };
  } catch (error) {
    // Return null if localStorage is not available or throws an error
    return null;
  }
}