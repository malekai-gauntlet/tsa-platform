#!/bin/bash

# Onboarding E2E Test Runner
# Runs the complete onboarding flow test with setup

echo "🚀 Starting Onboarding E2E Test Suite..."
echo "=================================="

# Check if Playwright is installed
if ! command -v npx playwright &> /dev/null; then
    echo "📦 Installing Playwright..."
    npm install -D @playwright/test
    npx playwright install
fi

# Start the development server in background if not running
if ! lsof -i :3000 > /dev/null; then
    echo "🚧 Starting development server..."
    npm run dev &
    DEV_SERVER_PID=$!
    sleep 5
    echo "✅ Development server started (PID: $DEV_SERVER_PID)"
else
    echo "✅ Development server already running"
    DEV_SERVER_PID=""
fi

# Run the E2E tests
echo "🧪 Running Onboarding E2E Tests..."
echo "=================================="

npx playwright test tests/e2e-onboarding.test.js --reporter=line

TEST_EXIT_CODE=$?

# Cleanup
if [ ! -z "$DEV_SERVER_PID" ]; then
    echo "🧹 Cleaning up development server..."
    kill $DEV_SERVER_PID 2>/dev/null || true
fi

# Report results
echo "=================================="
if [ $TEST_EXIT_CODE -eq 0 ]; then
    echo "✅ All onboarding tests PASSED!"
    echo "🎉 Onboarding flow is working correctly!"
else
    echo "❌ Some tests FAILED!"
    echo "📋 Check the test output above for details"
fi

echo "=================================="
echo "📊 Test artifacts saved to test-results/"
echo "🔍 Open playwright-report/index.html for detailed results"

exit $TEST_EXIT_CODE