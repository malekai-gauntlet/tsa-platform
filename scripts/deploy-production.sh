#!/bin/bash
# Production Deployment Script for TSA Platform Coach Invite Feature
# This script performs pre-deployment validation and deploys to production

set -e  # Exit on any error

# Colors for terminal output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[0;33m'
BLUE='\033[0;34m'
BOLD='\033[1m'
NC='\033[0m' # No Color

echo -e "${BLUE}${BOLD}========================================${NC}"
echo -e "${BLUE}${BOLD}     TSA Platform Production Deploy     ${NC}"
echo -e "${BLUE}${BOLD}========================================${NC}"

# Check if running from project root
if [ ! -d "amplify" ] || [ ! -d "lib" ]; then
  echo -e "${RED}Error: Please run this script from the project root directory${NC}"
  exit 1
fi

# Check for Git changes
if [ -n "$(git status --porcelain)" ]; then
  echo -e "${YELLOW}Warning: You have uncommitted changes${NC}"
  echo -e "It's recommended to commit or stash changes before deploying"
  echo -e "Run ${BOLD}git status${NC} to see changes"
  
  # Ask for confirmation
  read -p "Continue anyway? (y/n) " -n 1 -r
  echo
  if [[ ! $REPLY =~ ^[Yy]$ ]]; then
    echo -e "${YELLOW}Deployment canceled${NC}"
    exit 0
  fi
fi

echo -e "\n${BLUE}${BOLD}Step 1: Checking TypeScript compilation${NC}"
echo -e "----------------------------------------"
npx tsc --skipLibCheck --noEmit ./amplify/functions/coach-invite/handler.ts ./lib/data-access/client.ts ./lib/data-access/invitation.ts ./lib/validation/invitation.ts ./lib/types/amplify-client.ts

if [ $? -ne 0 ]; then
  echo -e "${RED}TypeScript compilation failed. Please fix the errors before deploying.${NC}"
  exit 1
fi
echo -e "${GREEN}TypeScript compilation successful!${NC}"

echo -e "\n${BLUE}${BOLD}Step 2: Starting sandbox for testing${NC}"
echo -e "----------------------------------------"
echo -e "Starting Amplify sandbox in background..."

# Start sandbox in background and capture its PID
npx ampx sandbox &
SANDBOX_PID=$!

# Wait for sandbox to initialize (maximum 30 seconds)
MAX_WAIT=30
echo -e "Waiting for sandbox to initialize (max ${MAX_WAIT}s)..."
for i in $(seq 1 $MAX_WAIT); do
  if [ -f "amplify_outputs.json" ]; then
    echo -e "${GREEN}Sandbox started successfully!${NC}"
    break
  fi
  
  if [ $i -eq $MAX_WAIT ]; then
    echo -e "${RED}Sandbox startup timed out. Check for errors.${NC}"
    kill $SANDBOX_PID 2>/dev/null || true
    exit 1
  fi
  
  echo -n "."
  sleep 1
done

echo -e "\n${BLUE}${BOLD}Step 3: Running validation tests${NC}"
echo -e "----------------------------------------"
node scripts/test-invitation-modules.js

if [ $? -ne 0 ]; then
  echo -e "${RED}Validation tests failed. Please fix the issues before deploying.${NC}"
  kill $SANDBOX_PID 2>/dev/null || true
  exit 1
fi

echo -e "\n${BLUE}${BOLD}Step 4: Testing API integration${NC}"
echo -e "----------------------------------------"
node scripts/test-coach-invite-api.js

if [ $? -ne 0 ]; then
  echo -e "${RED}API tests failed. Please fix the issues before deploying.${NC}"
  kill $SANDBOX_PID 2>/dev/null || true
  exit 1
fi

# Stop sandbox after tests
echo -e "\nStopping sandbox..."
kill $SANDBOX_PID 2>/dev/null || true

echo -e "\n${BLUE}${BOLD}Step 5: Preparing function for deployment${NC}"
echo -e "----------------------------------------"
node scripts/prepare-lambda-deploy.js

if [ $? -ne 0 ]; then
  echo -e "${RED}Function preparation failed. Please fix the issues before deploying.${NC}"
  exit 1
fi

echo -e "\n${BLUE}${BOLD}Step 6: Deploying to production${NC}"
echo -e "----------------------------------------"
echo -e "${YELLOW}You are about to deploy to production.${NC}"
read -p "Proceed with deployment? (y/n) " -n 1 -r
echo
if [[ ! $REPLY =~ ^[Yy]$ ]]; then
  echo -e "${YELLOW}Deployment canceled${NC}"
  exit 0
fi

# Perform the deployment
echo -e "Deploying to production..."
npx ampx push --yes

if [ $? -ne 0 ]; then
  echo -e "${RED}Deployment failed. Check the logs for details.${NC}"
  exit 1
fi

echo -e "\n${GREEN}${BOLD}========================================${NC}"
echo -e "${GREEN}${BOLD}     Production Deployment Successful!    ${NC}"
echo -e "${GREEN}${BOLD}========================================${NC}"
echo -e "\nTo verify the deployment:"
echo -e "1. Check logs: ${BOLD}npx ampx logs coach-invite${NC}"
echo -e "2. Run API test: ${BOLD}node scripts/test-coach-invite-api.js${NC}"
echo -e "3. Monitor the CloudWatch logs for any errors"

exit 0