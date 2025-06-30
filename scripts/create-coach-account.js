#!/usr/bin/env node

/**
 * Script to create a coach account in AWS Cognito
 * Usage: node scripts/create-coach-account.js --email coach.smith@texassportsacademy.com --name "Coach Smith"
 */

const { CognitoIdentityProviderClient, AdminCreateUserCommand, AdminAddUserToGroupCommand } = require('@aws-sdk/client-cognito-identity-provider');

// Parse command line arguments
function parseArgs() {
  const args = process.argv.slice(2);
  const email = args.find(arg => arg.startsWith('--email='))?.split('=')[1] || 
                args[args.indexOf('--email') + 1];
  const name = args.find(arg => arg.startsWith('--name='))?.split('=')[1] || 
               args[args.indexOf('--name') + 1];
  const password = args.find(arg => arg.startsWith('--password='))?.split('=')[1] || 
                   args[args.indexOf('--password') + 1];

  return { email, name, password };
}

async function createCoachAccount(email, name, temporaryPassword = null) {
  try {
    console.log('🚀 Creating coach account...');
    console.log(`📧 Email: ${email}`);
    console.log(`👤 Name: ${name}`);

    // Initialize Cognito client
    const client = new CognitoIdentityProviderClient({
      region: process.env.AWS_REGION || 'us-east-1'
    });

    // Get User Pool ID from environment or use default
    const userPoolId = process.env.AMPLIFY_AUTH_USERPOOL_ID;
    
    if (!userPoolId) {
      console.error('❌ AMPLIFY_AUTH_USERPOOL_ID not found in environment variables');
      console.log('ℹ️  You can get this from: npx ampx info or AWS Console');
      process.exit(1);
    }

    // Parse name
    const nameParts = name.split(' ');
    const firstName = nameParts[0] || 'Coach';
    const lastName = nameParts.slice(1).join(' ') || 'User';

    // Create user
    const createUserParams = {
      UserPoolId: userPoolId,
      Username: email,
      UserAttributes: [
        { Name: 'email', Value: email },
        { Name: 'email_verified', Value: 'true' },
        { Name: 'custom:firstName', Value: firstName },
        { Name: 'custom:lastName', Value: lastName },
      ],
      MessageAction: 'SUPPRESS', // Don't send welcome email
      TemporaryPassword: temporaryPassword || generateTemporaryPassword(),
    };

    console.log('👥 Creating user in Cognito...');
    const createUserResult = await client.send(new AdminCreateUserCommand(createUserParams));
    
    console.log('✅ User created successfully!');
    console.log(`📊 User ID: ${createUserResult.User.Username}`);

    // Add user to coach group
    const addToGroupParams = {
      UserPoolId: userPoolId,
      Username: email,
      GroupName: 'coach'
    };

    console.log('🏷️  Adding user to coach group...');
    await client.send(new AdminAddUserToGroupCommand(addToGroupParams));
    
    console.log('✅ User added to coach group!');

    // Display login information
    console.log('\n🎯 Account created successfully!');
    console.log('📋 Login Details:');
    console.log(`   📧 Email: ${email}`);
    console.log(`   🔑 Temporary Password: ${createUserParams.TemporaryPassword}`);
    console.log('   🔄 User will be prompted to set a new password on first login');
    
    console.log('\n🌐 Next Steps:');
    console.log('1. Go to your app login page');
    console.log('2. Login with the email and temporary password above');
    console.log('3. Set a new permanent password when prompted');
    console.log('4. You should see only applications submitted with this coach email');

    return {
      email,
      temporaryPassword: createUserParams.TemporaryPassword,
      userId: createUserResult.User.Username
    };

  } catch (error) {
    console.error('❌ Error creating coach account:', error);
    
    if (error.name === 'UsernameExistsException') {
      console.log('ℹ️  User already exists. You can reset their password if needed.');
    } else if (error.name === 'InvalidParameterException') {
      console.log('ℹ️  Check that the email format is valid and User Pool ID is correct.');
    } else {
      console.log('ℹ️  Make sure you have AWS credentials configured and proper permissions.');
    }
    
    process.exit(1);
  }
}

function generateTemporaryPassword() {
  // Generate a secure temporary password
  const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*';
  let password = '';
  
  // Ensure at least one of each required character type
  password += 'A'; // Uppercase
  password += 'a'; // Lowercase  
  password += '1'; // Number
  password += '!'; // Special character
  
  // Fill the rest randomly
  for (let i = 4; i < 12; i++) {
    password += chars.charAt(Math.floor(Math.random() * chars.length));
  }
  
  // Shuffle the password
  return password.split('').sort(() => Math.random() - 0.5).join('');
}

// Main execution
async function main() {
  const { email, name, password } = parseArgs();

  if (!email) {
    console.log('❌ Email is required');
    console.log('Usage: node scripts/create-coach-account.js --email coach.smith@texassportsacademy.com --name "Coach Smith"');
    process.exit(1);
  }

  if (!name) {
    console.log('❌ Name is required');
    console.log('Usage: node scripts/create-coach-account.js --email coach.smith@texassportsacademy.com --name "Coach Smith"');
    process.exit(1);
  }

  await createCoachAccount(email, name, password);
}

main().catch(error => {
  console.error('❌ Script failed:', error);
  process.exit(1);
}); 