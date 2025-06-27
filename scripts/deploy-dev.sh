#!/bin/bash

# TSA Platform - Development Deployment Script
# This script follows Amplify best practices for development setup

set -e  # Exit on any error

echo "🚀 Starting TSA Platform Development Deployment..."

# Check prerequisites
echo "📋 Checking prerequisites..."

# Check Node.js version
if ! command -v node &> /dev/null; then
    echo "❌ Node.js is not installed. Please install Node.js 18+"
    exit 1
fi

NODE_VERSION=$(node -v | cut -d'v' -f2 | cut -d'.' -f1)
if [ "$NODE_VERSION" -lt 18 ]; then
    echo "❌ Node.js version must be 18 or higher. Current version: $(node -v)"
    exit 1
fi

# Check AWS CLI
if ! command -v aws &> /dev/null; then
    echo "❌ AWS CLI is not installed. Please install and configure AWS CLI"
    exit 1
fi

# Check if AWS is configured
if ! aws sts get-caller-identity &> /dev/null; then
    echo "❌ AWS CLI is not configured. Please run 'aws configure'"
    exit 1
fi

echo "✅ Prerequisites check passed"

# Install dependencies
echo "📦 Installing dependencies..."
npm install

# Check if .env.local exists, if not create from example
if [ ! -f .env.local ]; then
    if [ -f env.example ]; then
        echo "📝 Creating .env.local from env.example..."
        cp env.example .env.local
        echo "⚠️  Please edit .env.local with your configuration"
    fi
fi

# Start Amplify sandbox
echo "🏗️  Starting Amplify sandbox..."
echo "This will deploy backend resources and generate amplify_outputs.json"
echo "Press Ctrl+C to stop the sandbox when ready to start development server"

# Run sandbox in background and capture PID
npx ampx sandbox &
SANDBOX_PID=$!

# Function to cleanup sandbox on exit
cleanup() {
    echo "🧹 Cleaning up..."
    if [ ! -z "$SANDBOX_PID" ]; then
        kill $SANDBOX_PID 2>/dev/null || true
    fi
}

# Set trap to cleanup on script exit
trap cleanup EXIT

# Wait a bit for sandbox to start
echo "⏳ Waiting for sandbox to initialize..."
sleep 10

# Check if amplify_outputs.json was created
TIMEOUT=300  # 5 minutes timeout
ELAPSED=0
while [ ! -f amplify_outputs.json ] && [ $ELAPSED -lt $TIMEOUT ]; do
    echo "⏳ Waiting for amplify_outputs.json... ($ELAPSED/$TIMEOUT seconds)"
    sleep 10
    ELAPSED=$((ELAPSED + 10))
done

if [ -f amplify_outputs.json ]; then
    echo "✅ Backend deployed successfully! amplify_outputs.json created"
    echo ""
    echo "🎉 Development environment is ready!"
    echo ""
    echo "Next steps:"
    echo "1. Keep this terminal open (sandbox is running)"
    echo "2. In a new terminal, run: npm run dev"
    echo "3. Visit http://localhost:3000 for the dashboard"
    echo "4. Visit http://localhost:3000/map for the TSA Districts map"
    echo ""
    echo "Press Ctrl+C to stop the sandbox"
    
    # Keep script running to maintain sandbox
    wait $SANDBOX_PID
else
    echo "❌ Timeout waiting for amplify_outputs.json"
    echo "Please check the Amplify sandbox logs for errors"
    exit 1
fi 