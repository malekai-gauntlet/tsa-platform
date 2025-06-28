#!/bin/bash

# Copy Onboarding Files from Previous TSA Repo
# This script copies the onboarding process from the old tsa-amplify repo

SOURCE_PATH="/Users/tsaplatformdeveloper/Desktop/tsa-amplify/src/app/(setup)/onboarding"
DEST_PATH="./app/onboarding"

echo "🚀 Starting onboarding files transfer..."
echo "📂 Source: $SOURCE_PATH"
echo "📂 Destination: $DEST_PATH"

# Check if source directory exists
if [ ! -d "$SOURCE_PATH" ]; then
    echo "❌ Source directory does not exist: $SOURCE_PATH"
    exit 1
fi

# Create destination directory if it doesn't exist
mkdir -p "$DEST_PATH"

# Copy all files and subdirectories
echo "📋 Copying files..."
cp -r "$SOURCE_PATH"/* "$DEST_PATH/"

# Check if copy was successful
if [ $? -eq 0 ]; then
    echo "✅ Files copied successfully!"
    
    # List what was copied
    echo ""
    echo "📁 Files transferred:"
    find "$DEST_PATH" -type f -name "*.tsx" -o -name "*.ts" -o -name "*.js" -o -name "*.json" | while read file; do
        echo "   📄 $file"
    done
    
    echo ""
    echo "🔧 Next steps:"
    echo "   1. Review copied files for any import path issues"
    echo "   2. Update any absolute imports to relative imports"
    echo "   3. Test the onboarding flow"
    echo "   4. Run: npm run build to check for any issues"
    
else
    echo "❌ Copy operation failed!"
    exit 1
fi

echo ""
echo "🎉 Onboarding transfer complete!" 