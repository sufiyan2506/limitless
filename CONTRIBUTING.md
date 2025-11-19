# Contributing to Limitless Digital Agency Platform

Thank you for your interest in contributing to our platform! This guide will help you get started with our development process and coding standards.

## 📋 Table of Contents

- [Getting Started](#getting-started)
- [Development Workflow](#development-workflow)
- [Code Standards](#code-standards)
- [Component Guidelines](#component-guidelines)
- [Testing](#testing)
- [Pull Request Process](#pull-request-process)
- [Release Process](#release-process)

## 🚀 Getting Started

### Prerequisites
- Node.js 18+ and npm
- Git for version control
- Code editor with TypeScript support (VS Code recommended)

### Initial Setup
```bash
# Fork and clone the repository
git clone [your-fork-url]
cd limitless-digital-agency

# Install dependencies
npm install

# Start development server
npm run dev
```

### Development Environment
- Development server runs on `http://localhost:8080`
- Hot reload is enabled for instant feedback
- ESLint runs automatically to catch issues early

## 🔄 Development Workflow

### Branching Strategy
We use a feature branch workflow:

```bash
# Create and switch to a new feature branch
git checkout -b feature/your-feature-name

# Work on your changes...

# Push to your fork
git push origin feature/your-feature-name
```

### Branch Naming Convention
- `feature/` - New features (e.g., `feature/contact-form`)
- `fix/` - Bug fixes (e.g., `fix/navigation-mobile`)
- `refactor/` - Code improvements (e.g., `refactor/admin-components`)
- `docs/` - Documentation updates (e.g., `docs/api-reference`)

### Commit Message Format
Use clear, descriptive commit messages:

```
feat: add contact form validation
fix: resolve mobile navigation bug
refactor: improve admin sidebar structure
docs: update API documentation
style: format code with prettier
```

## 📝 Code Standards

### TypeScript Guidelines
- Use strict TypeScript configuration
- Define interfaces for all data structures
- Use proper typing for props and function parameters
- Avoid `any` type - use proper types or `unknown`

```typescript
// ✅ Good
interface UserProps {
  id: string;
  name: string;
  email: string;
}

const UserCard: React.FC<UserProps> = ({ id, name, email }) => {
  // component implementation
};

// ❌ Avoid
const UserCard = (props: any) => {
  // implementation
};
```

### Component Structure
Follow this consistent pattern for all components:

```typescript
import { ComponentProps } from 'react';
import { cn } from '@/shared/lib/utils';

interface ComponentNameProps extends ComponentProps<'div'> {
  // specific props
  customProp: string;
}

/**
 * Component description
 * @param props - Component properties
 * @returns JSX element
 */
export const ComponentName = ({ 
  customProp, 
  className, 
  ...props 
}: ComponentNameProps) => {
  return (
    <div 
      className={cn('base-classes', className)} 
      {...props}
    >
      {/* component content */}
    </div>
  );
};
```

### Styling Guidelines
- Use Tailwind CSS utility classes
- Prefer semantic design tokens over direct colors
- Use the `cn` utility for conditional classes
- Keep responsive design in mind

```typescript
// ✅ Good - Use semantic tokens
<div className="bg-background text-foreground border-border">

// ❌ Avoid - Direct colors
<div className="bg-white text-black border-gray-200">

// ✅ Good - Responsive design
<div className="flex flex-col md:flex-row gap-4 md:gap-8">
```

### File Organization
- Group related files by feature, not by type
- Use barrel exports (index.ts) for clean imports
- Keep component files focused and single-purpose
- Place shared utilities in `src/shared/`

```
src/features/contact/
├── components/
│   ├── ContactForm.tsx
│   ├── ContactInfo.tsx
│   └── index.ts              # Barrel export
├── hooks/
│   └── useContactSubmission.ts
├── types.ts
└── index.ts
```

### Import Organization
Organize imports in this order:
1. External libraries
2. Internal absolute imports (@/)
3. Relative imports

```typescript
// External libraries
import React from 'react';
import { useForm } from 'react-hook-form';

// Internal absolute imports
import { Button } from '@/shared/components/ui/button';
import { useToast } from '@/shared/hooks/use-toast';

// Relative imports
import { ContactFormData } from './types';
```

## 🎨 Component Guidelines

### shadcn/ui Integration
- Extend shadcn/ui components rather than creating from scratch
- Use component variants for different styles
- Maintain accessibility standards

```typescript
// Extend existing components
const buttonVariants = cva(
  "base-button-styles",
  {
    variants: {
      variant: {
        default: "bg-primary text-primary-foreground",
        outline: "border border-input bg-background",
        // Add custom variants here
      },
    },
  }
);
```

### Accessibility Requirements
- Use semantic HTML elements
- Include proper ARIA labels
- Ensure keyboard navigation works
- Test with screen readers

```typescript
<button
  type="button"
  aria-label="Close dialog"
  aria-expanded={isOpen}
  onClick={handleClose}
>
  <X className="h-4 w-4" />
  <span className="sr-only">Close</span>
</button>
```

### Performance Considerations
- Use React.memo for expensive components
- Implement proper key props for lists
- Lazy load heavy components
- Optimize image assets

```typescript
// Memoize expensive components
const ExpensiveComponent = React.memo(({ data }: Props) => {
  // component logic
});

// Lazy load routes
const AdminPanel = React.lazy(() => import('./AdminPanel'));
```

## 🧪 Testing

### Manual Testing Checklist
Before submitting a pull request:

- [ ] Test on desktop and mobile devices
- [ ] Verify dark/light mode compatibility  
- [ ] Check keyboard navigation
- [ ] Test form validation and error states
- [ ] Verify responsive design breakpoints
- [ ] Test admin and public routes separately

### Browser Testing
Test in these browsers:
- Chrome (latest)
- Firefox (latest)  
- Safari (latest)
- Edge (latest)

## 📥 Pull Request Process

### Before Submitting
1. Ensure your code follows our style guidelines
2. Test your changes thoroughly
3. Update documentation if needed
4. Run linting: `npm run lint`
5. Verify the build works: `npm run build`

### PR Description Template
```markdown
## Description
Brief description of changes

## Type of Change
- [ ] Bug fix
- [ ] New feature  
- [ ] Breaking change
- [ ] Documentation update

## Testing
- [ ] Desktop browsers tested
- [ ] Mobile responsiveness verified
- [ ] Accessibility checked
- [ ] Admin panel functionality tested

## Screenshots (if applicable)
Include before/after screenshots for UI changes

## Additional Notes
Any additional context or considerations
```

### Review Process
1. Code review by team members
2. Automated checks (linting, build)
3. Manual testing verification
4. Approval and merge

## 🚀 Release Process

### Version Management
- Follow semantic versioning (semver)
- Update CHANGELOG.md for each release
- Tag releases in Git

### Deployment
- Automatic deployment from main branch
- Staging environment for pre-release testing
- Production deployment with rollback capability

## 🛠 Development Tools

### Recommended VS Code Extensions
- TypeScript Hero
- Tailwind CSS IntelliSense  
- ES7+ React/Redux/React-Native snippets
- Prettier - Code formatter
- Auto Rename Tag

### Useful Commands
```bash
# Development
npm run dev              # Start dev server
npm run build           # Production build
npm run preview         # Preview build locally

# Code Quality  
npm run lint            # Run ESLint
npm run lint:fix        # Fix auto-fixable issues

# Type Checking
npx tsc --noEmit        # Check TypeScript types
```

## ❓ Getting Help

### Resources
- [Project Documentation](./docs/)
- [Architecture Guide](./ARCHITECTURE.md)
- [Component Library](./docs/components/)

### Communication
- GitHub Issues for bug reports and feature requests
- Pull Request discussions for code review
- Development team contact for urgent issues

### Common Issues
Check our [troubleshooting guide](./docs/troubleshooting/) for solutions to common development issues.

---

Thank you for contributing to make our platform better! 🚀