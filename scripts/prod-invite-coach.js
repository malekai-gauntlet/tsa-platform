#!/usr/bin/env node

/**
 * Production Coach Invitation Script
 * 
 * This script sends invitations to coaches using the production environment.
 * It requires a valid amplify_outputs.json file from the production server.
 * 
 * Usage:
 *   node prod-invite-coach.js --name="Coach Name" --email="coach@example.com" --phone="+1234567890" --location="Austin, TX" --d1=5 --bio="Coach biography"
 *   
 *   OR (interactive mode)
 *   
 *   node prod-invite-coach.js --interactive
 */

const { Amplify } = require('aws-amplify');
const { generateClient } = require('aws-amplify/data');
const fs = require('fs');
const path = require('path');
const readline = require('readline');

// Colors for terminal output
const colors = {
  reset: '\x1b[0m',
  red: '\x1b[31m',
  green: '\x1b[32m',
  yellow: '\x1b[33m',
  blue: '\x1b[34m',
  cyan: '\x1b[36m',
  magenta: '\x1b[35m',
  bold: '\x1b[1m'
};

// GraphQL mutation for coach invite
const coachInviteMutation = /* GraphQL */ `
  mutation CoachInvite(
    $bio: String!
    $cell: String!
    $d1_athletics_count: Int!
    $email: String!
    $location: String!
    $name: String!
  ) {
    coachInvite(
      bio: $bio
      cell: $cell
      d1_athletics_count: $d1_athletics_count
      email: $email
      location: $location
      name: $name
    )
  }
`;

/**
 * Parse command line arguments
 * @returns {Object} Parsed arguments
 */
function parseArgs() {
  const args = process.argv.slice(2);
  const result = { interactive: false };

  // Check for interactive mode
  if (args.includes('--interactive') || args.includes('-i')) {
    result.interactive = true;
    return result;
  }

  // Parse arguments
  args.forEach(arg => {
    if (arg.startsWith('--name=')) {
      result.name = arg.substring(7);
    } else if (arg.startsWith('--email=')) {
      result.email = arg.substring(8);
    } else if (arg.startsWith('--phone=')) {
      result.phone = arg.substring(8);
    } else if (arg.startsWith('--cell=')) {
      result.phone = arg.substring(7);
    } else if (arg.startsWith('--location=')) {
      result.location = arg.substring(11);
    } else if (arg.startsWith('--d1=')) {
      result.d1 = parseInt(arg.substring(5), 10);
    } else if (arg.startsWith('--bio=')) {
      result.bio = arg.substring(6);
    } else if (arg === '--help' || arg === '-h') {
      showHelp();
      process.exit(0);
    }
  });

  return result;
}

/**
 * Show help message
 */
function showHelp() {
  console.log(`${colors.bold}${colors.cyan}Production Coach Invitation Script${colors.reset}`);
  console.log(`${colors.cyan}====================================${colors.reset}\n`);
  console.log('This script sends invitations to coaches using the production environment.');
  console.log('It requires a valid amplify_outputs.json file from the production server.\n');
  
  console.log(`${colors.bold}Usage:${colors.reset}`);
  console.log('  node prod-invite-coach.js --name="Coach Name" --email="coach@example.com" --phone="+1234567890" --location="Austin, TX" --d1=5 --bio="Coach biography"');
  console.log('  node prod-invite-coach.js --interactive\n');
  
  console.log(`${colors.bold}Options:${colors.reset}`);
  console.log('  --name=VALUE       Coach\'s full name');
  console.log('  --email=VALUE      Coach\'s email address');
  console.log('  --phone=VALUE      Coach\'s phone number (with country code)');
  console.log('  --location=VALUE   Coach\'s location (City, State)');
  console.log('  --d1=VALUE         Number of D1 athletes coached (integer)');
  console.log('  --bio=VALUE        Coach\'s biography/description');
  console.log('  --interactive, -i  Run in interactive mode (prompt for values)');
  console.log('  --help, -h         Show this help message\n');
  
  console.log(`${colors.bold}Example:${colors.reset}`);
  console.log('  node prod-invite-coach.js --name="John Smith" --email="john.smith@example.com" --phone="+12345678901" --location="Austin, TX" --d1=5 --bio="Former NFL player with 10 years coaching experience."');
}

/**
 * Interactive prompt for getting coach data
 * @returns {Promise<Object>} Coach data
 */
async function promptForCoachData() {
  const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
  });

  const question = (query) => new Promise(resolve => rl.question(query, resolve));

  console.log(`${colors.bold}${colors.cyan}Enter Coach Information${colors.reset}`);
  console.log(`${colors.cyan}----------------------${colors.reset}`);
  
  const name = await question('Coach Name: ');
  const email = await question('Email: ');
  const phone = await question('Phone (with country code, e.g. +12345678901): ');
  const location = await question('Location (City, State): ');
  const d1Input = await question('Number of D1 athletes coached: ');
  const d1 = parseInt(d1Input, 10) || 0;
  const bio = await question('Bio/Description: ');

  rl.close();

  return {
    name,
    email,
    phone,
    location,
    d1,
    bio
  };
}

/**
 * Validate coach data
 * @param {Object} data Coach data
 * @returns {Array} Array of validation errors
 */
function validateCoachData(data) {
  const errors = [];

  if (!data.name || data.name.trim() === '') {
    errors.push('Name is required');
  }

  if (!data.email || !data.email.includes('@')) {
    errors.push('Valid email is required');
  }

  if (!data.phone || data.phone.trim() === '') {
    errors.push('Phone number is required');
  }

  if (!data.location || data.location.trim() === '') {
    errors.push('Location is required');
  }

  if (isNaN(data.d1) || data.d1 < 0) {
    errors.push('D1 athletes count must be a non-negative number');
  }

  if (!data.bio || data.bio.trim().length < 10) {
    errors.push('Bio must be at least 10 characters');
  }

  return errors;
}

/**
 * Send invitation to coach
 * @param {Object} data Coach data
 * @returns {Promise<Object>} Result of invitation
 */
async function inviteCoach(data) {
  try {
    // Configure Amplify with the production outputs
    const configPath = path.join(process.cwd(), 'amplify_outputs.json');
    if (!fs.existsSync(configPath)) {
      throw new Error('amplify_outputs.json not found. Please ensure you have the production configuration file.');
    }

    // Load and configure Amplify with production outputs
    const amplifyOutputs = require(configPath);
    Amplify.configure(amplifyOutputs);

    // Initialize GraphQL client
    const client = generateClient({
      authMode: 'apiKey'
    });

    console.log(`${colors.blue}Sending invitation to ${data.name} (${data.email})...${colors.reset}`);

    // Call the API
    const result = await client.graphql({
      query: coachInviteMutation,
      variables: {
        name: data.name,
        email: data.email,
        cell: data.phone,
        location: data.location,
        d1_athletics_count: data.d1,
        bio: data.bio
      }
    });

    return {
      success: true,
      result
    };
  } catch (error) {
    return {
      success: false,
      error: error.message
    };
  }
}

/**
 * Main function
 */
async function main() {
  console.log(`${colors.bold}${colors.cyan}===================================${colors.reset}`);
  console.log(`${colors.bold}${colors.cyan}    Production Coach Invitation    ${colors.reset}`);
  console.log(`${colors.bold}${colors.cyan}===================================${colors.reset}\n`);

  // Parse command line arguments or prompt for input
  const args = parseArgs();
  let coachData;

  if (args.interactive) {
    coachData = await promptForCoachData();
  } else {
    // Use provided arguments
    coachData = {
      name: args.name,
      email: args.email,
      phone: args.phone,
      location: args.location,
      d1: args.d1,
      bio: args.bio
    };

    // If any required fields are missing, switch to interactive mode
    const requiredFields = ['name', 'email', 'phone', 'location', 'bio'];
    const missingFields = requiredFields.filter(field => !coachData[field]);
    
    if (missingFields.length > 0) {
      console.log(`${colors.yellow}Missing required fields: ${missingFields.join(', ')}${colors.reset}`);
      console.log(`${colors.yellow}Switching to interactive mode...${colors.reset}\n`);
      coachData = await promptForCoachData();
    }
  }

  // Validate coach data
  const validationErrors = validateCoachData(coachData);
  if (validationErrors.length > 0) {
    console.log(`${colors.red}${colors.bold}Validation errors:${colors.reset}`);
    validationErrors.forEach(error => console.log(`${colors.red}- ${error}${colors.reset}`));
    process.exit(1);
  }

  // Display coach data
  console.log(`\n${colors.cyan}Coach Information:${colors.reset}`);
  console.log(`${colors.bold}Name:${colors.reset} ${coachData.name}`);
  console.log(`${colors.bold}Email:${colors.reset} ${coachData.email}`);
  console.log(`${colors.bold}Phone:${colors.reset} ${coachData.phone}`);
  console.log(`${colors.bold}Location:${colors.reset} ${coachData.location}`);
  console.log(`${colors.bold}D1 Athletes:${colors.reset} ${coachData.d1}`);
  console.log(`${colors.bold}Bio:${colors.reset} ${coachData.bio}`);

  // Confirm before sending
  const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
  });

  const confirmation = await new Promise(resolve => {
    rl.question(`\n${colors.yellow}${colors.bold}Send invitation to this coach? (y/n) ${colors.reset}`, resolve);
  });

  rl.close();

  if (confirmation.toLowerCase() !== 'y') {
    console.log(`${colors.yellow}Invitation canceled.${colors.reset}`);
    process.exit(0);
  }

  // Send invitation
  const inviteResult = await inviteCoach(coachData);

  if (inviteResult.success) {
    try {
      // Try to parse the response
      const responseData = JSON.parse(inviteResult.result.data.coachInvite);
      
      if (responseData.success) {
        console.log(`\n${colors.green}${colors.bold}✓ Invitation sent successfully!${colors.reset}`);
        console.log(`${colors.green}Message: ${responseData.message}${colors.reset}`);
        console.log(`\n${colors.cyan}Invitation Details:${colors.reset}`);
        console.log(`${colors.bold}Token:${colors.reset} ${responseData.invitationToken}`);
        
        if (responseData.invitationData && amplifyOutputs && amplifyOutputs.custom && amplifyOutputs.custom.frontend_url) {
          const onboardingUrl = `${amplifyOutputs.custom.frontend_url}/onboarding?invite=${responseData.invitationToken}`;
          console.log(`\n${colors.magenta}${colors.bold}Onboarding URL:${colors.reset}`);
          console.log(onboardingUrl);
        }
      } else {
        console.log(`\n${colors.yellow}${colors.bold}⚠ Invitation request processed but returned an error:${colors.reset}`);
        console.log(`${colors.yellow}Error: ${responseData.error || responseData.message}${colors.reset}`);
      }
    } catch (error) {
      console.log(`\n${colors.green}${colors.bold}✓ Request completed, but couldn't parse response:${colors.reset}`);
      console.log(inviteResult.result.data.coachInvite);
    }
  } else {
    console.log(`\n${colors.red}${colors.bold}✗ Failed to send invitation:${colors.reset}`);
    console.log(`${colors.red}${inviteResult.error}${colors.reset}`);
  }
}

// Run the script
main().catch(error => {
  console.error(`\n${colors.red}${colors.bold}Unexpected error:${colors.reset}`);
  console.error(`${colors.red}${error.message}${colors.reset}`);
  process.exit(1);
});