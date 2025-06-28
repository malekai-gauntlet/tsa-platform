#!/bin/bash

# Helper script to apply our refactoring changes to the worktree

REFACTOR_DIR="/Users/tsaplatformdeveloper/Desktop/tsa-platform-refactor"

# Function to copy files from main repo to refactor worktree
copy_to_worktree() {
  echo "Copying $1 to refactor worktree..."
  cp -f "$1" "${REFACTOR_DIR}/$1"
}

# Create or copy the ExtendedBadge component
mkdir -p "${REFACTOR_DIR}/components/ui"
cp -f components/ui/badge-extended.tsx "${REFACTOR_DIR}/components/ui/"

# Apply Button component migration to settings page
cp -f app/coach/settings/page.tsx "${REFACTOR_DIR}/app/coach/settings/"

# Apply Badge component migration to bootcamp-step
cp -f components/dashboard-steps/bootcamp-step.tsx "${REFACTOR_DIR}/components/dashboard-steps/"

echo "Changes copied to refactor worktree"

# Run build in refactor directory
echo "Running build in refactor worktree..."
cd "${REFACTOR_DIR}" && npm run build

echo "Done"