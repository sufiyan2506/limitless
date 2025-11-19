#!/bin/bash

# Limitless Digital Agency Platform - Build Script
# Optimized build process with quality checks and analysis

set -e  # Exit on any error

echo "🏗️  Building Limitless Digital Agency Platform..."

# Clean previous builds
echo "🧹 Cleaning previous builds..."
rm -rf dist/
rm -rf .vite/

# Run pre-build checks
echo "🔍 Running pre-build quality checks..."

# TypeScript type checking
echo "📝 Checking TypeScript types..."
npx tsc --noEmit
echo "✅ TypeScript type checking passed"

# ESLint code quality
echo "🔍 Running ESLint..."
npm run lint
echo "✅ Code quality checks passed"

# Build the project
echo "🏗️  Building project..."
NODE_ENV=production npm run build

# Verify build output
if [ ! -d "dist" ]; then
    echo "❌ Build failed - dist directory not created"
    exit 1
fi

if [ ! -f "dist/index.html" ]; then
    echo "❌ Build failed - index.html not found in dist"
    exit 1
fi

echo "✅ Build completed successfully"

# Analyze build output
echo "📊 Analyzing build output..."

# Check bundle sizes
echo "📦 Bundle size analysis:"
du -sh dist/
echo ""

# List main files with sizes
echo "📄 Main files:"
find dist -name "*.js" -o -name "*.css" | head -10 | xargs ls -lh
echo ""

# Check for large files that might need optimization
echo "🔍 Checking for large files (>500KB)..."
find dist -type f -size +500k -exec ls -lh {} + || echo "✅ No large files found"
echo ""

# Gzip simulation for size estimates
if command -v gzip &> /dev/null; then
    echo "🗜️  Estimated gzipped sizes:"
    for file in dist/assets/*.js; do
        if [ -f "$file" ]; then
            original_size=$(stat -f%z "$file" 2>/dev/null || stat -c%s "$file" 2>/dev/null)
            gzipped_size=$(gzip -c "$file" | wc -c)
            filename=$(basename "$file")
            echo "  $filename: ${original_size} bytes → ${gzipped_size} bytes (gzipped)"
        fi
    done
    echo ""
fi

# Performance recommendations
echo "💡 Performance recommendations:"

# Check for source maps
if find dist -name "*.map" -type f | head -1 | grep -q "."; then
    echo "  ✅ Source maps generated for debugging"
else
    echo "  ⚠️  No source maps found - consider enabling for production debugging"
fi

# Check for asset optimization
js_count=$(find dist -name "*.js" -type f | wc -l)
css_count=$(find dist -name "*.css" -type f | wc -l)

echo "  📊 Generated assets: ${js_count} JS files, ${css_count} CSS files"

if [ $js_count -gt 10 ]; then
    echo "  ⚠️  Many JS files detected - consider optimizing code splitting"
fi

# Check main bundle size
main_js=$(find dist/assets -name "index-*.js" | head -1)
if [ -f "$main_js" ]; then
    main_size=$(stat -f%z "$main_js" 2>/dev/null || stat -c%s "$main_js" 2>/dev/null)
    main_size_kb=$((main_size / 1024))
    
    if [ $main_size_kb -gt 200 ]; then
        echo "  ⚠️  Main bundle is ${main_size_kb}KB - consider code splitting"
    else
        echo "  ✅ Main bundle size is optimal (${main_size_kb}KB)"
    fi
fi

echo ""

# Production deployment checklist
echo "🚀 Production deployment checklist:"
echo "  📋 Build completed without errors"
echo "  📋 TypeScript types validated"
echo "  📋 Code quality checks passed"
echo "  📋 Assets generated and optimized"

if [ -f "dist/robots.txt" ]; then
    echo "  ✅ robots.txt found"
else
    echo "  ⚠️  robots.txt not found - consider adding for SEO"
fi

if [ -f "dist/sitemap.xml" ]; then
    echo "  ✅ sitemap.xml found"
else
    echo "  ⚠️  sitemap.xml not found - consider generating for SEO"
fi

echo ""
echo "🎉 Build process completed successfully!"
echo ""
echo "📖 Next steps:"
echo "  1. Test the build locally: npm run preview"
echo "  2. Deploy to staging environment for testing"
echo "  3. Run performance audits (Lighthouse, etc.)"
echo "  4. Deploy to production when ready"
echo ""