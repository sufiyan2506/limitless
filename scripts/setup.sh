#!/bin/bash

# Limitless Digital Agency Platform - Setup Script
# This script sets up the development environment for new developers

set -e  # Exit on any error

echo "🚀 Setting up Limitless Digital Agency Platform..."

# Check Node.js version
echo "📋 Checking Node.js version..."
if ! command -v node &> /dev/null; then
    echo "❌ Node.js not found. Please install Node.js 18+ and try again."
    echo "💡 Visit: https://nodejs.org/ or use nvm: https://github.com/nvm-sh/nvm"
    exit 1
fi

NODE_VERSION=$(node --version | cut -d'.' -f1 | sed 's/v//')
if [ "$NODE_VERSION" -lt 18 ]; then
    echo "❌ Node.js version $NODE_VERSION detected. Please upgrade to Node.js 18+."
    exit 1
fi

echo "✅ Node.js $(node --version) detected"

# Check npm version
echo "📋 Checking npm version..."
if ! command -v npm &> /dev/null; then
    echo "❌ npm not found. Please install npm and try again."
    exit 1
fi

echo "✅ npm $(npm --version) detected"

# Install dependencies
echo "📦 Installing project dependencies..."
npm ci

# Verify installation
echo "🔍 Verifying installation..."
if [ ! -d "node_modules" ]; then
    echo "❌ Dependencies installation failed. Please check your internet connection and try again."
    exit 1
fi

echo "✅ Dependencies installed successfully"

# Create environment file if it doesn't exist
if [ ! -f ".env.local" ]; then
    echo "🔧 Creating environment file..."
    cat > .env.local << EOF
# Limitless Digital Agency Platform - Environment Variables
# Copy this file to .env.local and update with your values

# Application Configuration
VITE_APP_TITLE="Limitless Digital Agency"
VITE_APP_DESCRIPTION="Professional digital agency services"
VITE_APP_URL="http://localhost:8080"

# Feature Flags
VITE_FEATURE_ADMIN_PANEL=true
VITE_FEATURE_ANALYTICS=true
VITE_FEATURE_CHATBOT=true

# Development Settings
VITE_DEV_MODE=true
EOF
    echo "✅ Environment file created at .env.local"
    echo "💡 Update the values in .env.local as needed"
else
    echo "✅ Environment file already exists"
fi

# Run type checking
echo "🔍 Running TypeScript type check..."
if npm run build > /dev/null 2>&1; then
    echo "✅ TypeScript compilation successful"
else
    echo "⚠️  TypeScript errors detected. Run 'npm run build' to see details."
fi

# Run linting
echo "🔍 Running code quality checks..."
if npm run lint > /dev/null 2>&1; then
    echo "✅ Code quality checks passed"
else
    echo "⚠️  Code quality issues detected. Run 'npm run lint' to see details."
fi

# Success message
echo ""
echo "🎉 Setup completed successfully!"
echo ""
echo "📖 Next steps:"
echo "  1. Review .env.local and update any necessary values"
echo "  2. Run 'npm run dev' to start the development server"
echo "  3. Open http://localhost:8080 in your browser"
echo ""
echo "📚 Useful commands:"
echo "  npm run dev      - Start development server"
echo "  npm run build    - Create production build"
echo "  npm run preview  - Preview production build"
echo "  npm run lint     - Run code quality checks"
echo ""
echo "📖 Documentation:"
echo "  README.md           - Project overview and setup"
echo "  CONTRIBUTING.md     - Development guidelines"
echo "  ARCHITECTURE.md     - Technical architecture"
echo "  docs/               - Comprehensive documentation"
echo ""
echo "🆘 Need help?"
echo "  - Check the docs/ directory for detailed guides"
echo "  - Review CONTRIBUTING.md for development workflow"
echo "  - Contact the development team for support"
echo ""