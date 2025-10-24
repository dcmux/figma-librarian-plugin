import * as React from 'react';
import { Button } from '../components/ui/button';
import { Badge } from '../components/ui/badge';
import { Alert, AlertTitle, AlertDescription } from '../components/ui/alert';
import { Checkbox } from '../components/ui/checkbox';
import { Switch } from '../components/ui/switch';
import { Input } from '../components/ui/input';
import { Textarea } from '../components/ui/textarea';
import { Slider } from '../components/ui/slider';
import { Progress } from '../components/ui/progress';
import { Separator } from '../components/ui/separator';
import { Skeleton } from '../components/ui/skeleton';
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from '../components/ui/card';
import { Toggle } from '../components/ui/toggle';
import { Avatar, AvatarImage, AvatarFallback } from '../components/ui/avatar';
import { Label } from '../components/ui/label';
import { Accordion, AccordionItem, AccordionTrigger, AccordionContent } from '../components/ui/accordion';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '../components/ui/tabs';
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from '../components/ui/select';
import { RadioGroup, RadioGroupItem } from '../components/ui/radio-group';
import { ToggleGroup, ToggleGroupItem } from '../components/ui/toggle-group';
import { Table, TableHeader, TableRow, TableHead, TableBody, TableCell } from '../components/ui/table';
import { 
  Dialog, 
  DialogTrigger, 
  DialogContent, 
  DialogHeader, 
  DialogTitle, 
  DialogDescription 
} from '../components/ui/dialog';
import { 
  DropdownMenu, 
  DropdownMenuTrigger, 
  DropdownMenuContent, 
  DropdownMenuItem 
} from '../components/ui/dropdown-menu';
import { Popover, PopoverTrigger, PopoverContent } from '../components/ui/popover';
import { Tooltip, TooltipTrigger, TooltipContent, TooltipProvider } from '../components/ui/tooltip';
import { 
  Breadcrumb, 
  BreadcrumbList, 
  BreadcrumbItem, 
  BreadcrumbLink, 
  BreadcrumbSeparator 
} from '../components/ui/breadcrumb';
import { Collapsible, CollapsibleTrigger, CollapsibleContent } from '../components/ui/collapsible';
import { 
  Search, 
  Plus, 
  Settings, 
  Home, 
  User, 
  Heart, 
  Star, 
  Mail,
  Bell,
  Calendar,
  Check,
  X,
  ChevronRight,
  ChevronDown,
  Download,
  Upload,
  Trash,
  Edit,
  Eye,
  MoreHorizontal
} from 'lucide-react';

export interface ComponentOption {
  label: string;
  value: string;
}

export interface ComponentConfig {
  name: string;
  component: string;
  description: string;
  category?: 'form' | 'layout' | 'display' | 'navigation' | 'feedback' | 'overlay';
  variants?: ComponentOption[];
  sizes?: ComponentOption[];
  icons?: ComponentOption[];
  iconPosition?: ComponentOption[];
  hasIcon?: boolean;
  hasChildren?: boolean;
  isComplex?: boolean; // For components like Dialog, Dropdown that need special handling
}

// Icon mapping for previews
export const iconMap: Record<string, any> = {
  'search': Search,
  'plus': Plus,
  'settings': Settings,
  'home': Home,
  'user': User,
  'heart': Heart,
  'star': Star,
  'mail': Mail,
  'bell': Bell,
  'calendar': Calendar,
  'check': Check,
  'x': X,
  'chevron-right': ChevronRight,
  'chevron-down': ChevronDown,
  'download': Download,
  'upload': Upload,
  'trash': Trash,
  'edit': Edit,
  'eye': Eye,
  'more-horizontal': MoreHorizontal,
};

// Component Registry - All 43+ Shadcn/UI Components
export const componentRegistry: ComponentConfig[] = [
  // Layout Components
  {
    name: 'Accordion',
    component: 'accordion',
    description: 'A vertically stacked set of interactive headings that reveal content',
    category: 'layout',
    isComplex: true,
    hasChildren: true,
  },
  {
    name: 'Card',
    component: 'card',
    description: 'Displays a card with header, content, and footer',
    category: 'layout',
    hasChildren: true,
  },
  {
    name: 'Collapsible',
    component: 'collapsible',
    description: 'An interactive component which expands/collapses a panel',
    category: 'layout',
    isComplex: true,
    hasChildren: true,
  },
  {
    name: 'Resizable',
    component: 'resizable',
    description: 'Accessible resizable panel groups with keyboard support',
    category: 'layout',
    isComplex: true,
    hasChildren: true,
  },
  {
    name: 'Scroll Area',
    component: 'scroll-area',
    description: 'Augments native scroll functionality for custom styling',
    category: 'layout',
    hasChildren: true,
  },
  {
    name: 'Separator',
    component: 'separator',
    description: 'Visually or semantically separates content',
    category: 'layout',
    hasChildren: false,
  },
  {
    name: 'Tabs',
    component: 'tabs',
    description: 'A set of layered sections of content displayed one at a time',
    category: 'layout',
    isComplex: true,
    hasChildren: true,
  },
  
  // Form Components
  {
    name: 'Button',
    component: 'button',
    description: 'Displays a button or a component that looks like a button',
    category: 'form',
    variants: [
      { label: 'Default', value: 'default' },
      { label: 'Destructive', value: 'destructive' },
      { label: 'Outline', value: 'outline' },
      { label: 'Secondary', value: 'secondary' },
      { label: 'Ghost', value: 'ghost' },
      { label: 'Link', value: 'link' },
    ],
    sizes: [
      { label: 'Small', value: 'sm' },
      { label: 'Default', value: 'default' },
      { label: 'Large', value: 'lg' },
      { label: 'Icon', value: 'icon' },
    ],
    icons: [
      { label: 'None', value: 'none' },
      { label: 'Search', value: 'search' },
      { label: 'Plus', value: 'plus' },
      { label: 'Settings', value: 'settings' },
      { label: 'Home', value: 'home' },
      { label: 'User', value: 'user' },
      { label: 'Heart', value: 'heart' },
      { label: 'Download', value: 'download' },
      { label: 'Upload', value: 'upload' },
      { label: 'Trash', value: 'trash' },
      { label: 'Edit', value: 'edit' },
    ],
    iconPosition: [
      { label: 'Left', value: 'left' },
      { label: 'Right', value: 'right' },
    ],
    hasIcon: true,
    hasChildren: true,
  },
  {
    name: 'Checkbox',
    component: 'checkbox',
    description: 'A control that allows the user to toggle between checked and not checked',
    category: 'form',
    hasChildren: false,
  },
  {
    name: 'Input',
    component: 'input',
    description: 'Displays a form input field',
    category: 'form',
    hasChildren: false,
  },
  {
    name: 'Input OTP',
    component: 'input-otp',
    description: 'Accessible one-time password component with copy paste functionality',
    category: 'form',
    isComplex: true,
    hasChildren: false,
  },
  {
    name: 'Label',
    component: 'label',
    description: 'Renders an accessible label associated with controls',
    category: 'form',
    hasChildren: true,
  },
  {
    name: 'Radio Group',
    component: 'radio-group',
    description: 'A set of checkable buttons where only one can be checked at a time',
    category: 'form',
    isComplex: true,
    hasChildren: true,
  },
  {
    name: 'Select',
    component: 'select',
    description: 'Displays a list of options for the user to pick from',
    category: 'form',
    sizes: [
      { label: 'Small', value: 'sm' },
      { label: 'Default', value: 'default' },
    ],
    isComplex: true,
    hasChildren: true,
  },
  {
    name: 'Slider',
    component: 'slider',
    description: 'An input where the user selects a value from within a given range',
    category: 'form',
    hasChildren: false,
  },
  {
    name: 'Switch',
    component: 'switch',
    description: 'A control that allows the user to toggle between on and off',
    category: 'form',
    hasChildren: false,
  },
  {
    name: 'Textarea',
    component: 'textarea',
    description: 'Displays a multi-line text input',
    category: 'form',
    hasChildren: false,
  },
  {
    name: 'Toggle',
    component: 'toggle',
    description: 'A two-state button that can be either on or off',
    category: 'form',
    variants: [
      { label: 'Default', value: 'default' },
      { label: 'Outline', value: 'outline' },
    ],
    sizes: [
      { label: 'Small', value: 'sm' },
      { label: 'Default', value: 'default' },
      { label: 'Large', value: 'lg' },
    ],
    icons: [
      { label: 'None', value: 'none' },
      { label: 'Eye', value: 'eye' },
      { label: 'Edit', value: 'edit' },
      { label: 'Star', value: 'star' },
    ],
    hasIcon: true,
    hasChildren: true,
  },
  {
    name: 'Toggle Group',
    component: 'toggle-group',
    description: 'A set of two-state buttons that can be toggled on or off',
    category: 'form',
    isComplex: true,
    hasChildren: true,
  },

  // Display Components
  {
    name: 'Alert',
    component: 'alert',
    description: 'Displays a callout for user attention',
    category: 'feedback',
    variants: [
      { label: 'Default', value: 'default' },
      { label: 'Destructive', value: 'destructive' },
    ],
    hasChildren: true,
  },
  {
    name: 'Avatar',
    component: 'avatar',
    description: 'An image element with a fallback for representing the user',
    category: 'display',
    hasChildren: true,
  },
  {
    name: 'Badge',
    component: 'badge',
    description: 'Displays a badge or a component that looks like a badge',
    category: 'display',
    variants: [
      { label: 'Default', value: 'default' },
      { label: 'Secondary', value: 'secondary' },
      { label: 'Destructive', value: 'destructive' },
      { label: 'Outline', value: 'outline' },
    ],
    icons: [
      { label: 'None', value: 'none' },
      { label: 'Check', value: 'check' },
      { label: 'X', value: 'x' },
      { label: 'Star', value: 'star' },
    ],
    hasIcon: true,
    hasChildren: true,
  },
  {
    name: 'Calendar',
    component: 'calendar',
    description: 'A date field component that allows users to enter and edit date',
    category: 'form',
    isComplex: true,
    hasChildren: false,
  },
  {
    name: 'Carousel',
    component: 'carousel',
    description: 'A carousel with motion and swipe built using Embla',
    category: 'display',
    isComplex: true,
    hasChildren: true,
  },
  {
    name: 'Chart',
    component: 'chart',
    description: 'Beautiful charts built using Recharts',
    category: 'display',
    isComplex: true,
    hasChildren: true,
  },
  {
    name: 'Progress',
    component: 'progress',
    description: 'Displays an indicator showing the completion progress of a task',
    category: 'feedback',
    hasChildren: false,
  },
  {
    name: 'Skeleton',
    component: 'skeleton',
    description: 'Use to show a placeholder while content is loading',
    category: 'feedback',
    hasChildren: false,
  },
  {
    name: 'Table',
    component: 'table',
    description: 'A responsive table component',
    category: 'display',
    isComplex: true,
    hasChildren: true,
  },

  // Navigation Components
  {
    name: 'Breadcrumb',
    component: 'breadcrumb',
    description: 'Displays the path to the current resource using a hierarchy of links',
    category: 'navigation',
    isComplex: true,
    hasChildren: true,
  },
  {
    name: 'Command',
    component: 'command',
    description: 'Fast, composable, unstyled command menu for React',
    category: 'navigation',
    isComplex: true,
    hasChildren: true,
  },
  {
    name: 'Menubar',
    component: 'menubar',
    description: 'A visually persistent menu common in desktop applications',
    category: 'navigation',
    isComplex: true,
    hasChildren: true,
  },
  {
    name: 'Navigation Menu',
    component: 'navigation-menu',
    description: 'A collection of links for navigating websites',
    category: 'navigation',
    isComplex: true,
    hasChildren: true,
  },
  {
    name: 'Pagination',
    component: 'pagination',
    description: 'Pagination with page navigation, next and previous links',
    category: 'navigation',
    isComplex: true,
    hasChildren: true,
  },
  {
    name: 'Sidebar',
    component: 'sidebar',
    description: 'A composable, themeable and customizable sidebar component',
    category: 'navigation',
    isComplex: true,
    hasChildren: true,
  },

  // Overlay Components
  {
    name: 'Alert Dialog',
    component: 'alert-dialog',
    description: 'A modal dialog that interrupts the user with important content',
    category: 'overlay',
    isComplex: true,
    hasChildren: true,
  },
  {
    name: 'Aspect Ratio',
    component: 'aspect-ratio',
    description: 'Displays content within a desired ratio',
    category: 'layout',
    hasChildren: true,
  },
  {
    name: 'Context Menu',
    component: 'context-menu',
    description: 'Displays a menu triggered by right-click',
    category: 'overlay',
    isComplex: true,
    hasChildren: true,
  },
  {
    name: 'Dialog',
    component: 'dialog',
    description: 'A window overlaid on either the primary window or another dialog window',
    category: 'overlay',
    isComplex: true,
    hasChildren: true,
  },
  {
    name: 'Drawer',
    component: 'drawer',
    description: 'A panel that slides out from the edge of the screen',
    category: 'overlay',
    isComplex: true,
    hasChildren: true,
  },
  {
    name: 'Dropdown Menu',
    component: 'dropdown-menu',
    description: 'Displays a menu to the user triggered by a button',
    category: 'overlay',
    isComplex: true,
    hasChildren: true,
  },
  {
    name: 'Hover Card',
    component: 'hover-card',
    description: 'For sighted users to preview content available behind a link',
    category: 'overlay',
    isComplex: true,
    hasChildren: true,
  },
  {
    name: 'Popover',
    component: 'popover',
    description: 'Displays rich content in a portal, triggered by a button',
    category: 'overlay',
    isComplex: true,
    hasChildren: true,
  },
  {
    name: 'Sheet',
    component: 'sheet',
    description: 'Extends the Dialog component to display content that complements the main content',
    category: 'overlay',
    isComplex: true,
    hasChildren: true,
  },
  {
    name: 'Tooltip',
    component: 'tooltip',
    description: 'A popup that displays information related to an element',
    category: 'overlay',
    isComplex: true,
    hasChildren: true,
  },
];

// Component Preview Renderer
export function renderComponentPreview(
  componentName: string,
  variant?: string,
  size?: string,
  icon?: string,
  iconPosition?: string,
  text: string = 'Button'
) {
  const IconComponent = icon && icon !== 'none' ? iconMap[icon] : null;

  switch (componentName.toLowerCase()) {
    case 'button':
      return (
        <Button 
          variant={variant as any} 
          size={size === 'icon' && !IconComponent ? 'default' : size as any}
        >
          {iconPosition === 'left' && IconComponent && <IconComponent className="size-4" />}
          {size !== 'icon' && text}
          {iconPosition === 'right' && IconComponent && <IconComponent className="size-4" />}
        </Button>
      );
    
    case 'badge':
      return (
        <Badge variant={variant as any}>
          {IconComponent && <IconComponent className="size-3" />}
          {text}
        </Badge>
      );
    
    case 'alert':
      return (
        <Alert variant={variant as any} className="max-w-md">
          <Bell />
          <AlertTitle>Alert Title</AlertTitle>
          <AlertDescription>This is an alert message description</AlertDescription>
        </Alert>
      );
    
    case 'checkbox':
      return <Checkbox defaultChecked />;
    
    case 'switch':
      return <Switch defaultChecked />;
    
    case 'input':
      return <Input placeholder="Enter text..." className="max-w-xs" />;
    
    case 'textarea':
      return <Textarea placeholder="Enter text..." className="max-w-xs" rows={3} />;
    
    case 'slider':
      return <Slider defaultValue={[50]} max={100} step={1} className="w-60" />;
    
    case 'progress':
      return <Progress value={60} className="w-60" />;
    
    case 'separator':
      return <Separator className="w-60" />;
    
    case 'skeleton':
      return (
        <div className="flex flex-col gap-2">
          <Skeleton className="h-12 w-60" />
          <Skeleton className="h-4 w-48" />
        </div>
      );
    
    case 'card':
      return (
        <Card className="w-80">
          <CardHeader>
            <CardTitle>Card Title</CardTitle>
            <CardDescription>Card description goes here</CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-sm">This is the card content area.</p>
          </CardContent>
          <CardFooter>
            <Button size="sm">Action</Button>
          </CardFooter>
        </Card>
      );
    
    case 'toggle':
      return (
        <Toggle variant={variant as any} size={size as any}>
          {IconComponent && <IconComponent className="size-4" />}
          {text}
        </Toggle>
      );
    
    case 'avatar':
      return (
        <Avatar>
          <AvatarImage src="https://github.com/shadcn.png" alt="Avatar" />
          <AvatarFallback>CN</AvatarFallback>
        </Avatar>
      );
    
    case 'label':
      return <Label>{text || 'Label'}</Label>;
    
    // Complex components with functional previews
    case 'accordion':
      return (
        <Accordion type="single" collapsible className="w-80">
          <AccordionItem value="item-1">
            <AccordionTrigger>Is it accessible?</AccordionTrigger>
            <AccordionContent>
              Yes. It adheres to the WAI-ARIA design pattern.
            </AccordionContent>
          </AccordionItem>
          <AccordionItem value="item-2">
            <AccordionTrigger>Is it styled?</AccordionTrigger>
            <AccordionContent>
              Yes. It comes with default styles.
            </AccordionContent>
          </AccordionItem>
        </Accordion>
      );
    
    case 'tabs':
      return (
        <Tabs defaultValue="tab1" className="w-80">
          <TabsList>
            <TabsTrigger value="tab1">Account</TabsTrigger>
            <TabsTrigger value="tab2">Password</TabsTrigger>
          </TabsList>
          <TabsContent value="tab1" className="py-4">
            Account settings content
          </TabsContent>
          <TabsContent value="tab2" className="py-4">
            Password settings content
          </TabsContent>
        </Tabs>
      );
    
    case 'select':
      return (
        <Select>
          <SelectTrigger className="w-60" size={size as any}>
            <SelectValue placeholder="Select an option" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="option1">Option 1</SelectItem>
            <SelectItem value="option2">Option 2</SelectItem>
            <SelectItem value="option3">Option 3</SelectItem>
          </SelectContent>
        </Select>
      );
    
    case 'radio group':
      return (
        <RadioGroup defaultValue="option1" className="gap-3">
          <div className="flex items-center gap-2">
            <RadioGroupItem value="option1" id="r1" />
            <Label htmlFor="r1">Option 1</Label>
          </div>
          <div className="flex items-center gap-2">
            <RadioGroupItem value="option2" id="r2" />
            <Label htmlFor="r2">Option 2</Label>
          </div>
          <div className="flex items-center gap-2">
            <RadioGroupItem value="option3" id="r3" />
            <Label htmlFor="r3">Option 3</Label>
          </div>
        </RadioGroup>
      );
    
    case 'toggle group':
      return (
        <ToggleGroup type="single" defaultValue="left">
          <ToggleGroupItem value="left">Left</ToggleGroupItem>
          <ToggleGroupItem value="center">Center</ToggleGroupItem>
          <ToggleGroupItem value="right">Right</ToggleGroupItem>
        </ToggleGroup>
      );
    
    case 'table':
      return (
        <div className="w-full max-w-md">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Name</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Amount</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              <TableRow>
                <TableCell>John Doe</TableCell>
                <TableCell>Active</TableCell>
                <TableCell>$100</TableCell>
              </TableRow>
              <TableRow>
                <TableCell>Jane Smith</TableCell>
                <TableCell>Pending</TableCell>
                <TableCell>$250</TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </div>
      );
    
    case 'dialog':
      return (
        <Dialog>
          <DialogTrigger asChild>
            <Button variant="outline">Open Dialog</Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Dialog Title</DialogTitle>
              <DialogDescription>
                This is a dialog description explaining what the dialog is for.
              </DialogDescription>
            </DialogHeader>
          </DialogContent>
        </Dialog>
      );
    
    case 'dropdown menu':
      return (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline">
              Open Menu <MoreHorizontal className="ml-2 size-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent>
            <DropdownMenuItem>Profile</DropdownMenuItem>
            <DropdownMenuItem>Settings</DropdownMenuItem>
            <DropdownMenuItem>Logout</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      );
    
    case 'popover':
      return (
        <Popover>
          <PopoverTrigger asChild>
            <Button variant="outline">Open Popover</Button>
          </PopoverTrigger>
          <PopoverContent className="w-80">
            <div className="space-y-2">
              <h4 className="font-medium">Popover Title</h4>
              <p className="text-sm text-muted-foreground">
                This is popover content that appears when triggered.
              </p>
            </div>
          </PopoverContent>
        </Popover>
      );
    
    case 'tooltip':
      return (
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <Button variant="outline">Hover me</Button>
            </TooltipTrigger>
            <TooltipContent>
              <p>Tooltip content</p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
      );
    
    case 'breadcrumb':
      return (
        <Breadcrumb>
          <BreadcrumbList>
            <BreadcrumbItem>
              <BreadcrumbLink href="#">Home</BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <BreadcrumbLink href="#">Components</BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <BreadcrumbLink>Breadcrumb</BreadcrumbLink>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>
      );
    
    case 'collapsible':
      return (
        <Collapsible className="w-80">
          <CollapsibleTrigger asChild>
            <Button variant="outline" className="w-full justify-between">
              Can I use this? <ChevronDown className="size-4" />
            </Button>
          </CollapsibleTrigger>
          <CollapsibleContent className="mt-2 p-4 border rounded">
            Yes. It's collapsible and works great!
          </CollapsibleContent>
        </Collapsible>
      );
    
    // Components that truly need custom setup
    case 'alert dialog':
    case 'calendar':
    case 'carousel':
    case 'chart':
    case 'command':
    case 'context menu':
    case 'drawer':
    case 'hover card':
    case 'input otp':
    case 'menubar':
    case 'navigation menu':
    case 'pagination':
    case 'resizable':
    case 'scroll area':
    case 'sheet':
    case 'sidebar':
      return (
        <div className="flex flex-col items-center gap-2 p-4 border border-dashed rounded-md">
          <div className="text-sm font-medium">{componentName}</div>
          <div className="text-xs text-muted-foreground">Complex component - requires custom setup</div>
        </div>
      );
    
    case 'aspect ratio':
      return (
        <div className="w-60 rounded-md overflow-hidden border">
          <div className="aspect-video bg-muted flex items-center justify-center">
            <span className="text-sm text-muted-foreground">16:9 Aspect Ratio</span>
          </div>
        </div>
      );
    
    default:
      return <div className="text-sm text-muted-foreground">Preview not available</div>;
  }
}