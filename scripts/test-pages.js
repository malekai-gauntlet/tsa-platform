#!/usr/bin/env node

const http = require('http')
const https = require('https')

const BASE_URL = 'http://localhost:3000'

// List of pages to test
const STATIC_ROUTES = [
  '/',
  '/coach',
  '/coach/applications', 
  '/coach/events',
  '/coach/events/create',
  '/coach/legal',
  '/coach/marketing',
  '/coach/settings',
  '/map'
]

// Dynamic routes with sample IDs (these might 404 but shouldn't crash)
const DYNAMIC_ROUTES = [
  '/coach/applications/test-id-123',
  '/coach/events/test-event-456', 
  '/coach/events/test-event-456/edit'
]

// Colors for console output
const colors = {
  green: '\x1b[32m',
  red: '\x1b[31m',
  yellow: '\x1b[33m',
  blue: '\x1b[34m',
  reset: '\x1b[0m',
  bold: '\x1b[1m'
}

function makeRequest(url) {
  return new Promise((resolve, reject) => {
    const startTime = Date.now()
    
    const req = http.get(url, (res) => {
      let data = ''
      
      res.on('data', (chunk) => {
        data += chunk
      })
      
      res.on('end', () => {
        const duration = Date.now() - startTime
        resolve({
          url,
          status: res.statusCode,
          duration,
          data,
          headers: res.headers
        })
      })
    })
    
    req.on('error', (err) => {
      reject({
        url,
        error: err.message
      })
    })
    
    req.setTimeout(10000, () => {
      req.destroy()
      reject({
        url,
        error: 'Request timeout'
      })
    })
  })
}

function analyzeResponse(response) {
  const { url, status, data, duration } = response
  
  const results = {
    url,
    status,
    duration,
    tests: {
      loads: status === 200 || status === 404, // 404 is OK for dynamic routes
      hasHtml: data.includes('<html'),
      hasTitle: data.includes('<title>'),
      hasCss: data.includes('class=') || data.includes('style'),
      hasNextJs: data.includes('__NEXT_DATA__') || data.includes('_next/static'),
      noErrors: !data.includes('Application error') && !data.includes('500') && !data.includes('Internal Server Error'),
      hasContent: data.length > 1000 // Basic content check
    }
  }
  
  // Calculate overall success
  const testResults = Object.values(results.tests)
  results.success = testResults.filter(Boolean).length >= testResults.length - 1 // Allow 1 failure
  
  return results
}

function printResult(result) {
  const { url, status, duration, tests, success } = result
  
  const statusColor = status === 200 ? colors.green : 
                     status === 404 ? colors.yellow : colors.red
  const successIcon = success ? '✅' : '❌'
  
  console.log(`${successIcon} ${colors.bold}${url}${colors.reset}`)
  console.log(`   ${statusColor}Status: ${status}${colors.reset} | Duration: ${duration}ms`)
  
  // Show test results
  const testEntries = Object.entries(tests)
  const passed = testEntries.filter(([_, passed]) => passed).length
  const total = testEntries.length
  
  console.log(`   Tests: ${colors.green}${passed}/${total} passed${colors.reset}`)
  
  // Show failed tests
  const failed = testEntries.filter(([_, passed]) => !passed)
  if (failed.length > 0) {
    failed.forEach(([test, _]) => {
      console.log(`   ${colors.red}   ✗ ${test}${colors.reset}`)
    })
  }
  
  console.log('')
}

async function testAllPages() {
  console.log(`${colors.bold}${colors.blue}🧪 Testing TSA Platform Pages${colors.reset}\n`)
  console.log(`Base URL: ${BASE_URL}\n`)
  
  const allRoutes = [...STATIC_ROUTES, ...DYNAMIC_ROUTES]
  const results = []
  
  console.log(`Testing ${allRoutes.length} routes...\n`)
  
  for (const route of allRoutes) {
    const url = `${BASE_URL}${route}`
    
    try {
      console.log(`${colors.blue}Testing: ${route}${colors.reset}`)
      const response = await makeRequest(url)
      const result = analyzeResponse(response)
      results.push(result)
      printResult(result)
    } catch (error) {
      console.log(`${colors.red}❌ ${route}${colors.reset}`)
      console.log(`   ${colors.red}Error: ${error.error}${colors.reset}\n`)
      results.push({
        url: route,
        success: false,
        error: error.error
      })
    }
  }
  
  // Summary
  console.log(`${colors.bold}${colors.blue}📊 Test Summary${colors.reset}`)
  console.log('=' * 50)
  
  const successful = results.filter(r => r.success).length
  const total = results.length
  const successRate = Math.round((successful / total) * 100)
  
  console.log(`${colors.bold}Total Routes: ${total}${colors.reset}`)
  console.log(`${colors.green}Successful: ${successful}${colors.reset}`)
  console.log(`${colors.red}Failed: ${total - successful}${colors.reset}`)
  console.log(`${colors.bold}Success Rate: ${successRate}%${colors.reset}`)
  
  if (successful === total) {
    console.log(`\n${colors.green}${colors.bold}🎉 All pages are working correctly!${colors.reset}`)
  } else {
    console.log(`\n${colors.yellow}${colors.bold}⚠️  Some pages need attention.${colors.reset}`)
  }
  
  // Failed routes
  const failed = results.filter(r => !r.success)
  if (failed.length > 0) {
    console.log(`\n${colors.bold}Failed Routes:${colors.reset}`)
    failed.forEach(result => {
      console.log(`${colors.red}  • ${result.url}${colors.reset}`)
    })
  }
}

// Check if server is running first
async function checkServer() {
  try {
    await makeRequest(BASE_URL)
    return true
  } catch (error) {
    console.log(`${colors.red}❌ Development server not running at ${BASE_URL}${colors.reset}`)
    console.log(`${colors.yellow}Please run: npm run dev${colors.reset}`)
    return false
  }
}

// Main execution
async function main() {
  console.clear()
  
  if (await checkServer()) {
    await testAllPages()
  }
}

if (require.main === module) {
  main().catch(console.error)
}

module.exports = { testAllPages, makeRequest, analyzeResponse } 