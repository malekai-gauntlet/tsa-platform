#!/bin/bash

# Copy Missing Onboarding Dependencies from Previous TSA Repo
# This script copies the missing components and hooks needed for onboarding

SOURCE_REPO="/Users/tsaplatformdeveloper/Desktop/tsa-amplify/src"
DEST_REPO="."

echo "🚀 Starting onboarding dependencies transfer..."

# List of missing dependencies to copy
MISSING_DEPS=(
    "components/progress-footer.tsx"
    "components/error-message.tsx" 
    "hooks/useOnboardingState.ts"
)

# Optional dependencies that might be needed
OPTIONAL_DEPS=(
    "components/progress-footer.jsx"
    "components/error-message.jsx"
    "hooks/useOnboardingState.js"
    "components/ui/progress-footer.tsx"
    "components/ui/error-message.tsx"
)

echo "📋 Checking for missing dependencies..."

for dep in "${MISSING_DEPS[@]}"; do
    SOURCE_FILE="$SOURCE_REPO/$dep"
    DEST_FILE="$DEST_REPO/$dep"
    
    if [ -f "$SOURCE_FILE" ]; then
        echo "✅ Found: $SOURCE_FILE"
        
        # Create destination directory if it doesn't exist
        mkdir -p "$(dirname "$DEST_FILE")"
        
        # Copy the file
        cp "$SOURCE_FILE" "$DEST_FILE"
        echo "   📄 Copied to: $DEST_FILE"
    else
        echo "❌ Missing: $SOURCE_FILE"
        
        # Check optional locations
        for opt_dep in "${OPTIONAL_DEPS[@]}"; do
            if [[ "$opt_dep" == *"$(basename "$dep" .tsx)"* ]] || [[ "$opt_dep" == *"$(basename "$dep" .ts)"* ]]; then
                OPT_SOURCE="$SOURCE_REPO/$opt_dep"
                if [ -f "$OPT_SOURCE" ]; then
                    echo "   🔍 Found alternative: $OPT_SOURCE"
                    mkdir -p "$(dirname "$DEST_FILE")"
                    cp "$OPT_SOURCE" "$DEST_FILE"
                    echo "   📄 Copied alternative to: $DEST_FILE"
                    break
                fi
            fi
        done
    fi
done

# Also check for any additional API routes that might be needed
echo ""
echo "🔍 Searching for additional onboarding files..."

# Look for API routes
if [ -d "$SOURCE_REPO/app/api/onboarding" ]; then
    echo "✅ Found API routes at: $SOURCE_REPO/app/api/onboarding"
    mkdir -p "./app/api"
    cp -r "$SOURCE_REPO/app/api/onboarding" "./app/api/"
    echo "   📁 Copied API routes to: ./app/api/onboarding"
fi

# Look for additional components in different locations
SEARCH_PATHS=(
    "$SOURCE_REPO/components"
    "$SOURCE_REPO/app/components"
    "$SOURCE_REPO/lib/components"
)

for search_path in "${SEARCH_PATHS[@]}"; do
    if [ -d "$search_path" ]; then
        echo "🔍 Searching in: $search_path"
        
        # Look for progress-footer
        find "$search_path" -name "*progress-footer*" -type f | while read file; do
            if [ ! -f "./components/$(basename "$file")" ]; then
                echo "   ✅ Found: $file"
                cp "$file" "./components/"
                echo "   📄 Copied: $(basename "$file")"
            fi
        done
        
        # Look for error-message
        find "$search_path" -name "*error-message*" -type f | while read file; do
            if [ ! -f "./components/$(basename "$file")" ]; then
                echo "   ✅ Found: $file"
                cp "$file" "./components/"
                echo "   📄 Copied: $(basename "$file")"
            fi
        done
    fi
done

echo ""
echo "🎉 Dependencies transfer complete!"
echo ""
echo "🔧 Next steps:"
echo "   1. Run: npm run build"
echo "   2. Fix any remaining import path issues"
echo "   3. Test the onboarding flow" 