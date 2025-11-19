# Components Directory

This directory contains reusable UI components organized by functionality and complexity level.

## 📁 Directory Structure

```
components/
├── ui/                     # Base UI components (shadcn/ui)
│   ├── button.tsx         # Button variants and states
│   ├── card.tsx           # Card layouts and containers
│   ├── input.tsx          # Form input components
│   └── ...                # Other primitive components
│
├── admin/                 # Admin-specific components
│   ├── AdminSidebar.tsx   # Admin navigation sidebar
│   ├── MobileContactCard.tsx
│   └── MobileContentCard.tsx
│
├── HeroSection.tsx        # Landing page hero component
├── Navigation.tsx         # Main site navigation
├── ValueProposition.tsx   # Value proposition section
├── ServicesSnapshot.tsx   # Services overview
├── PortfolioHighlights.tsx # Portfolio showcase
├── ClientTestimonials.tsx # Customer testimonials
├── CTAFooter.tsx         # Call-to-action footer
├── FAQChatbot.tsx        # FAQ chatbot widget
├── JoinLimitlessForm.tsx # Contact/signup form
├── ScrollToTop.tsx       # Auto-scroll utility
└── ShutterTransition.tsx # Page transition effects

```

## 🎨 Component Categories

### Base UI Components (`ui/`)
Foundation components built on top of shadcn/ui primitives:
- **Buttons**: Primary, secondary, ghost, outline variants
- **Forms**: Inputs, selects, textareas with validation
- **Layout**: Cards, containers, grids, separators
- **Feedback**: Toasts, alerts, loading states, progress bars
- **Navigation**: Menus, breadcrumbs, pagination
- **Overlays**: Modals, popovers, tooltips, dropdowns

### Business Components
Application-specific components that implement business logic:
- **HeroSection**: Landing page hero with dynamic content
- **Navigation**: Site-wide navigation with mobile responsiveness
- **ValueProposition**: Company value proposition showcase
- **ServicesSnapshot**: Service offerings overview
- **PortfolioHighlights**: Featured work and case studies
- **ClientTestimonials**: Customer feedback and reviews

### Admin Components (`admin/`)
Components specific to the admin management system:
- **AdminSidebar**: Navigation sidebar for admin panel
- **Mobile Components**: Mobile-optimized admin interfaces

### Utility Components
Helper components that provide functionality:
- **ScrollToTop**: Automatic page scrolling on route changes
- **ShutterTransition**: Smooth page transition animations
- **FAQChatbot**: Interactive FAQ assistance

## 🔧 Component Standards

### File Naming Convention
- **PascalCase** for component files (`HeroSection.tsx`)
- **Descriptive names** that indicate purpose (`ClientTestimonials.tsx`)
- **Avoid abbreviations** unless widely understood

### Component Structure
```typescript
import React from 'react';
import { cn } from '@/lib/utils';

interface ComponentNameProps {
  // Props interface with JSDoc comments
  /** Description of the prop */
  propName: string;
  /** Optional prop with default */
  optionalProp?: boolean;
  /** Child elements */
  children?: React.ReactNode;
  /** Additional CSS classes */
  className?: string;
}

/**
 * ComponentName - Brief description of what the component does
 * 
 * @param props - Component properties
 * @returns JSX element
 * 
 * @example
 * ```tsx
 * <ComponentName propName="value" optionalProp={true}>
 *   Content here
 * </ComponentName>
 * ```
 */
export const ComponentName: React.FC<ComponentNameProps> = ({
  propName,
  optionalProp = false,
  children,
  className,
  ...props
}) => {
  return (
    <div className={cn('base-classes', className)} {...props}>
      {children}
    </div>
  );
};
```

### TypeScript Guidelines
- **Strict typing** for all props and return values
- **Interface definitions** for complex prop objects
- **Generic types** where appropriate for reusability
- **JSDoc comments** for all public APIs

### Styling Guidelines
- **Tailwind utilities** for styling with design system tokens
- **Responsive design** using Tailwind breakpoint prefixes
- **Dark mode support** using CSS custom properties
- **Accessibility** with proper ARIA attributes and focus styles

## 🚀 Usage Guidelines

### Importing Components
```typescript
// Direct imports (preferred)
import { Button } from '@/components/ui/button';
import { HeroSection } from '@/components/HeroSection';

// Barrel imports (for ui components)
import { Button, Card, Input } from '@/components/ui';
```

### Component Composition
```typescript
// Example of proper component composition
export const ContactSection = () => {
  return (
    <Card className="max-w-2xl mx-auto">
      <Card.Header>
        <h2>Get in Touch</h2>
      </Card.Header>
      <Card.Content>
        <JoinLimitlessForm />
      </Card.Content>
    </Card>
  );
};
```

### Performance Considerations
- **React.memo** for expensive components that re-render frequently
- **useCallback** for event handlers passed as props
- **useMemo** for expensive computations
- **Code splitting** for large components using React.lazy

## 🧪 Testing Components

### Testing Strategy
- **Unit tests** for component logic and rendering
- **Integration tests** for component interactions
- **Accessibility tests** using testing-library
- **Visual regression tests** for UI consistency

### Example Test Structure
```typescript
import { render, screen, fireEvent } from '@testing-library/react';
import { ComponentName } from './ComponentName';

describe('ComponentName', () => {
  it('renders with required props', () => {
    render(<ComponentName propName="test" />);
    expect(screen.getByText('test')).toBeInTheDocument();
  });

  it('handles user interactions', () => {
    const handleClick = jest.fn();
    render(<ComponentName onClick={handleClick} />);
    fireEvent.click(screen.getByRole('button'));
    expect(handleClick).toHaveBeenCalled();
  });
});
```

## 📚 Component Documentation

### Storybook Integration
Components should include Storybook stories for:
- **Default state** showing standard usage
- **All variants** demonstrating different configurations
- **Interactive examples** showing user interactions
- **Accessibility examples** highlighting a11y features

### API Documentation
Each component should document:
- **Purpose and usage** in JSDoc comments
- **Props interface** with descriptions and examples
- **Accessibility features** and ARIA attributes
- **Performance characteristics** and optimization notes

## 🔄 Component Lifecycle

### Creating New Components
1. **Plan the API** - Define props interface and usage patterns
2. **Implement component** - Follow established patterns and standards
3. **Add documentation** - JSDoc comments and usage examples
4. **Write tests** - Unit tests and accessibility checks
5. **Create stories** - Storybook examples and variants
6. **Review and iterate** - Code review and refinement

### Updating Components
1. **Assess impact** - Identify breaking changes and affected usage
2. **Maintain compatibility** - Use deprecation warnings for breaking changes
3. **Update documentation** - Reflect changes in JSDoc and examples
4. **Update tests** - Ensure test coverage for new functionality
5. **Communicate changes** - Update CHANGELOG and notify team

## 🆘 Troubleshooting

### Common Issues
- **Import errors**: Check file paths and exports
- **TypeScript errors**: Verify prop interfaces and types
- **Styling issues**: Ensure design system tokens are used correctly
- **Performance problems**: Check for unnecessary re-renders

### Best Practices
- **Keep components focused** - Single responsibility principle
- **Use composition over inheritance** - Prefer component composition
- **Optimize for accessibility** - Always include proper ARIA attributes
- **Test thoroughly** - Unit tests, integration tests, and manual testing

---

This directory serves as the foundation for the application's user interface. All components should follow the established patterns and contribute to a cohesive, maintainable codebase.