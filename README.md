# Limitless Digital Agency Platform

🚀 A modern digital agency website with comprehensive admin management system, built with React, TypeScript, and Tailwind CSS.

## 📋 Overview

The Limitless Digital Agency Platform is a full-stack web application that serves as both a professional agency website and an internal management system. It showcases services, portfolio, and company information to potential clients while providing powerful admin tools for business operations.

### 🎯 Key Features

**Public Website:**
- Responsive agency showcase with modern design
- Service offerings and portfolio highlights  
- Client testimonials and case studies
- Contact forms and lead generation
- Blog/insights content management
- SEO optimized pages

**Admin Management System:**
- Comprehensive dashboard with analytics
- Contact and lead management (CRM)
- Content management system
- Portfolio and case study management
- Community and social media management
- Hiring and recruitment tools
- System settings and configuration

## 🛠 Technology Stack

- **Frontend**: React 18.3.1 with TypeScript
- **Build Tool**: Vite for fast development and optimized builds
- **Styling**: Tailwind CSS with custom design system
- **UI Components**: shadcn/ui for consistent, accessible components
- **Routing**: React Router DOM v6 with animated transitions
- **State Management**: TanStack Query for server state, React Hook Form for forms
- **Animation**: Framer Motion for smooth interactions
- **Icons**: Lucide React for consistent iconography
- **Validation**: Zod schemas for type-safe form validation

## 🚀 Quick Start

### Prerequisites
- Node.js (v18 or higher)
- npm or bun package manager

### Installation

```bash
# Clone the repository
git clone <YOUR_GIT_URL>
cd limitless-digital-agency

# Install dependencies
npm install

# Start development server
npm run dev
```

The application will be available at `http://localhost:8080`

### Available Scripts

```bash
npm run dev          # Start development server with hot reload
npm run build        # Build for production
npm run build:dev    # Build in development mode
npm run preview      # Preview production build locally
npm run lint         # Run ESLint code quality checks
```

## 🏗 Architecture Overview

### Project Structure
```
src/
├── app/                    # Application core & providers
├── features/               # Feature-based organization
│   ├── public-website/    # Public site components & pages
│   ├── admin-panel/       # Admin functionality
│   └── shared/           # Cross-feature components
├── shared/               # Shared utilities & components
│   ├── components/      # Reusable UI components
│   ├── hooks/          # Custom React hooks  
│   ├── lib/           # Utility functions
│   ├── types/         # TypeScript type definitions
│   └── config/        # Configuration files
├── assets/            # Static assets (images, fonts)
└── styles/           # Global styles and themes
```

### Key Design Principles
- **Feature-based organization**: Related components grouped by business functionality
- **Component colocation**: Keep related files close together
- **Separation of concerns**: Clear boundaries between public and admin features
- **Design system**: Consistent theming through CSS custom properties
- **Type safety**: Comprehensive TypeScript coverage
- **Performance**: Code splitting and lazy loading for optimal UX

## 🎨 Design System

The application uses a custom design system built on top of Tailwind CSS with semantic color tokens:

- **Colors**: HSL-based color palette with light/dark mode support
- **Typography**: Responsive text scales with gradient text effects
- **Spacing**: Consistent spacing system using Tailwind utilities
- **Components**: Customized shadcn/ui components with brand styling
- **Animations**: Smooth transitions and micro-interactions

### Design Tokens
All colors use CSS custom properties for easy theming:
```css
--primary: [hsl-value]
--secondary: [hsl-value]  
--accent: [hsl-value]
```

## 🔐 Environment Setup

### Environment Variables
Create a `.env.local` file with required variables:
```bash
# Add your environment variables here
# Note: This project uses Lovable Cloud for backend services
```

### Secrets Management
Sensitive configuration is managed through Lovable Cloud's secure secrets system. No API keys or tokens are stored in the codebase.

## 📱 Features & Pages

### Public Website
- **Home** (`/`) - Hero section, value proposition, service highlights
- **About** (`/about`) - Company story, team, mission/vision  
- **Services** (`/services`) - Detailed service offerings
- **Work** (`/work`) - Portfolio showcase and case studies
- **Insights** (`/insights`) - Blog articles and thought leadership
- **Contact** (`/contact`) - Contact forms and office information

### Admin Panel
- **Dashboard** (`/admin`) - Analytics overview and quick actions
- **Contacts** (`/admin/contacts`) - Lead and client management
- **Content** (`/admin/content`) - Website content management
- **Portfolio** (`/admin/portfolio`) - Project showcase management
- **Community** (`/admin/community`) - Social media management
- **Hiring** (`/admin/hiring`) - Recruitment and job postings
- **Analytics** (`/admin/analytics`) - Detailed performance metrics
- **Settings** (`/admin/settings`) - System configuration

## 🚀 Deployment

The application is deployed on the Lovable platform with automatic deployments from the main branch.

### Production Build
```bash
# Build optimized production version
npm run build

# Preview production build locally  
npm run preview
```

### Deployment Process
1. Push changes to main branch
2. Lovable automatically builds and deploys
3. Changes are live at your custom domain

## 📖 Documentation

- [Architecture Guide](./ARCHITECTURE.md) - Detailed system architecture
- [Contributing Guide](./CONTRIBUTING.md) - Development workflow and guidelines
- [Component Library](./docs/components/) - UI component documentation
- [API Documentation](./docs/api/) - Backend API reference
- [Deployment Guide](./DEPLOYMENT.md) - Hosting and deployment instructions

## 🤝 Contributing

We welcome contributions! Please read our [Contributing Guide](./CONTRIBUTING.md) for details on our development process, coding standards, and pull request workflow.

### Development Workflow
1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Make your changes following our coding standards
4. Test your changes thoroughly
5. Submit a pull request with a clear description

## 📄 License

This project is proprietary software developed for Limitless Digital Agency.

## 🆘 Support

For development questions or issues:
- Check the [troubleshooting guide](./docs/troubleshooting/)
- Review existing [GitHub issues](./issues)
- Contact the development team

---

**Built with ❤️ by the Limitless Digital Agency development team**
