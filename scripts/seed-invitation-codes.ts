#!/usr/bin/env tsx

/**
 * TSA Test Invitation Codes Generator
 * 
 * This script creates realistic test invitations for the onboarding process by:
 * - Generating diverse coach profiles with realistic Texas sports data
 * - Creating invitation records via the existing coach-invite function
 * - Providing invitation tokens for testing the complete onboarding flow
 * - Seeding varied test scenarios (different sports, experience levels, locations)
 * 
 * Usage:
 *   npm run seed-invitations
 *   npm run seed-invitations -- --count 10
 *   npm run seed-invitations -- --dry-run
 *   npm run seed-invitations -- --test-email your@email.com
 * 
 * Features:
 * - Realistic Texas sports academy coach data
 * - Multiple sports specializations
 * - Varied experience levels and backgrounds  
 * - Geographic distribution across Texas
 * - Integration with existing invitation system
 * - Test-friendly email addresses
 */

import { generateClient } from 'aws-amplify/data';
import { Amplify } from 'aws-amplify';
import type { Schema } from '../amplify/data/resource';

// Import the GraphQL mutation
const coachInvite = /* GraphQL */ `
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

// Import amplify outputs for configuration
let amplifyOutputs: any;
try {
  amplifyOutputs = require('../amplify_outputs.json');
} catch (error) {
  console.error('❌ Could not load amplify_outputs.json. Make sure to run `npx ampx sandbox` first.');
  process.exit(1);
}

// Configure Amplify
Amplify.configure(amplifyOutputs);
const client = generateClient<Schema>({
  authMode: 'apiKey'
});

// =================================================================
// REALISTIC TEST DATA - TEXAS SPORTS ACADEMY FOCUSED
// =================================================================

const TEXAS_CITIES = [
  { name: 'Dallas', state: 'TX', zipCode: '75201', region: 'North Texas' },
  { name: 'Houston', state: 'TX', zipCode: '77001', region: 'Southeast Texas' },
  { name: 'Austin', state: 'TX', zipCode: '78701', region: 'Central Texas' },
  { name: 'San Antonio', state: 'TX', zipCode: '78201', region: 'South Texas' },
  { name: 'Fort Worth', state: 'TX', zipCode: '76101', region: 'North Texas' },
  { name: 'El Paso', state: 'TX', zipCode: '79901', region: 'West Texas' },
  { name: 'Arlington', state: 'TX', zipCode: '76001', region: 'North Texas' },
  { name: 'Corpus Christi', state: 'TX', zipCode: '78401', region: 'Coastal Texas' },
  { name: 'Plano', state: 'TX', zipCode: '75023', region: 'North Texas' },
  { name: 'Lubbock', state: 'TX', zipCode: '79401', region: 'West Texas' },
  { name: 'Amarillo', state: 'TX', zipCode: '79101', region: 'Panhandle' },
  { name: 'Beaumont', state: 'TX', zipCode: '77701', region: 'Southeast Texas' },
];

const SPORTS_SPECIALIZATIONS = [
  {
    sport: 'Basketball',
    positions: ['Point Guard', 'Shooting Guard', 'Power Forward', 'Center'],
    skills: ['Shooting', 'Ball Handling', 'Defense', 'Conditioning', 'Team Strategy']
  },
  {
    sport: 'Football',
    positions: ['Quarterback', 'Running Back', 'Wide Receiver', 'Linebacker', 'Defensive Back'],
    skills: ['Offensive Strategy', 'Defensive Schemes', 'Conditioning', 'Leadership', 'Game Film Analysis']
  },
  {
    sport: 'Soccer',
    positions: ['Forward', 'Midfielder', 'Defender', 'Goalkeeper'],
    skills: ['Ball Control', 'Passing', 'Tactical Awareness', 'Fitness', 'Set Pieces']
  },
  {
    sport: 'Baseball',
    positions: ['Pitcher', 'Catcher', 'Infielder', 'Outfielder'],
    skills: ['Pitching Mechanics', 'Hitting Technique', 'Fielding', 'Base Running', 'Mental Game']
  },
  {
    sport: 'Tennis',
    positions: ['Singles', 'Doubles'],
    skills: ['Stroke Technique', 'Strategy', 'Mental Toughness', 'Footwork', 'Match Play']
  },
  {
    sport: 'Track & Field',
    positions: ['Sprints', 'Distance', 'Field Events', 'Hurdles'],
    skills: ['Sprint Technique', 'Endurance Training', 'Field Event Form', 'Race Strategy', 'Strength Training']
  },
  {
    sport: 'Swimming',
    positions: ['Freestyle', 'Backstroke', 'Breaststroke', 'Butterfly', 'Individual Medley'],
    skills: ['Stroke Technique', 'Breathing', 'Racing Strategy', 'Conditioning', 'Mental Preparation']
  },
  {
    sport: 'Volleyball',
    positions: ['Setter', 'Outside Hitter', 'Middle Blocker', 'Libero'],
    skills: ['Serving', 'Attacking', 'Blocking', 'Defense', 'Team Communication']
  },
  {
    sport: 'Wrestling',
    positions: ['Lightweight', 'Middleweight', 'Heavyweight'],
    skills: ['Takedowns', 'Escapes', 'Conditioning', 'Mental Toughness', 'Technique']
  },
  {
    sport: 'Golf',
    positions: ['Individual Competition'],
    skills: ['Swing Mechanics', 'Course Management', 'Short Game', 'Mental Game', 'Physical Fitness']
  }
];

const COACH_FIRST_NAMES = [
  'Michael', 'Sarah', 'David', 'Jennifer', 'Robert', 'Jessica', 'William', 'Amanda',
  'James', 'Lisa', 'John', 'Michelle', 'Christopher', 'Ashley', 'Daniel', 'Emily',
  'Matthew', 'Karen', 'Anthony', 'Stephanie', 'Mark', 'Nicole', 'Donald', 'Rebecca',
  'Steven', 'Laura', 'Kenneth', 'Sharon', 'Joshua', 'Cynthia', 'Kevin', 'Kathleen',
  'Brian', 'Amy', 'George', 'Angela', 'Timothy', 'Brenda', 'Ronald', 'Emma'
];

const COACH_LAST_NAMES = [
  'Johnson', 'Williams', 'Brown', 'Jones', 'Garcia', 'Miller', 'Davis', 'Rodriguez',
  'Martinez', 'Hernandez', 'Lopez', 'Gonzalez', 'Wilson', 'Anderson', 'Thomas',
  'Taylor', 'Moore', 'Jackson', 'Martin', 'Lee', 'Perez', 'Thompson', 'White',
  'Harris', 'Sanchez', 'Clark', 'Ramirez', 'Lewis', 'Robinson', 'Walker', 'Young',
  'Allen', 'King', 'Wright', 'Scott', 'Torres', 'Nguyen', 'Hill', 'Flores', 'Green'
];

const COACHING_BACKGROUNDS = [
  'Former college athlete turned youth coach',
  'Professional sports background with coaching certification',
  'Physical education teacher with coaching experience', 
  'Former high school varsity coach',
  'Private training specialist with team coaching experience',
  'College assistant coach transitioning to youth sports',
  'Recreational league coach with competitive background',
  'Sports camp director with extensive youth experience',
  'Former semi-professional athlete and certified trainer',
  'Multi-sport coach with specialization focus'
];

const D1_UNIVERSITIES = [
  'University of Texas', 'Texas A&M University', 'Rice University', 'Baylor University',
  'Texas Tech University', 'TCU', 'University of Houston', 'SMU', 'Texas State University',
  'UT Arlington', 'UTEP', 'UTSA', 'Sam Houston State', 'Stephen F. Austin',
  'Lamar University', 'Prairie View A&M', 'Texas Southern University'
];

// =================================================================
// UTILITY FUNCTIONS
// =================================================================

function getRandomItem<T>(array: T[]): T {
  return array[Math.floor(Math.random() * array.length)];
}

function getRandomItems<T>(array: T[], count: number): T[] {
  const shuffled = [...array].sort(() => 0.5 - Math.random());
  return shuffled.slice(0, Math.min(count, array.length));
}

function formatPhoneNumber(): string {
  const areaCode = Math.floor(Math.random() * 900) + 100;
  const exchange = Math.floor(Math.random() * 900) + 100;
  const number = Math.floor(Math.random() * 9000) + 1000;
  return `+1${areaCode}${exchange}${number}`;
}

function generateTestEmail(firstName: string, lastName: string, suffix: string = ''): string {
  const cleanFirst = firstName.toLowerCase().replace(/[^a-z]/g, '');
  const cleanLast = lastName.toLowerCase().replace(/[^a-z]/g, '');
  const domain = getRandomItem(['gmail.com', 'yahoo.com', 'hotmail.com', 'texassports.edu']);
  const suffixPart = suffix ? `+${suffix}` : '';
  return `${cleanFirst}.${cleanLast}${suffixPart}@${domain}`;
}

// =================================================================
// COACH PROFILE GENERATORS
// =================================================================

interface TestCoachProfile {
  name: string;
  email: string;
  cell: string;
  city: string;
  state: string;
  d1Athletics: number;
  bio: string;
  sport: string;
  experience: number;
  background: string;
  specialization: any;
}

function generateRealisticCoachProfile(index: number, testEmail?: string): TestCoachProfile {
  const firstName = getRandomItem(COACH_FIRST_NAMES);
  const lastName = getRandomItem(COACH_LAST_NAMES);
  const city = getRandomItem(TEXAS_CITIES);
  const specialization = getRandomItem(SPORTS_SPECIALIZATIONS);
  const background = getRandomItem(COACHING_BACKGROUNDS);
  const experience = Math.floor(Math.random() * 15) + 2; // 2-16 years
  const d1Count = Math.floor(Math.random() * 12); // 0-11 D1 athletes coached
  
  // Generate realistic bio based on profile
  const university = getRandomItem(D1_UNIVERSITIES);
  const skills = getRandomItems(specialization.skills, Math.floor(Math.random() * 3) + 2).join(', ');
  const positions = getRandomItems(specialization.positions, Math.floor(Math.random() * 2) + 1).join(' and ');
  
  const bioTemplates = [
    `Experienced ${specialization.sport.toLowerCase()} coach with ${experience} years developing young athletes. Former ${university} player specializing in ${positions} development. Strong focus on ${skills} and character building. Successfully coached ${d1Count} athletes who went on to compete at Division I level.`,
    
    `Passionate ${specialization.sport.toLowerCase()} coach dedicated to student-athlete development in ${city.region}. ${experience} years of coaching experience with emphasis on ${skills}. ${background}. Proud to have mentored ${d1Count} athletes who earned Division I scholarships.`,
    
    `${specialization.sport} coaching specialist with proven track record in competitive youth sports. ${experience}+ years developing athletes in ${positions} positions. Expert in ${skills} and team dynamics. ${d1Count} former players now competing at D1 level including ${university} and other top programs.`,
    
    `Dynamic coach bringing ${experience} years of ${specialization.sport.toLowerCase()} expertise to Texas youth athletics. Specializes in ${positions} development with focus on ${skills}. ${background}. Successfully prepared ${d1Count} athletes for Division I recruitment and beyond.`
  ];
  
  return {
    name: `${firstName} ${lastName}`,
    email: testEmail || generateTestEmail(firstName, lastName, `test${index}`),
    cell: formatPhoneNumber(),
    city: city.name,
    state: city.state,
    d1Athletics: d1Count,
    bio: getRandomItem(bioTemplates),
    sport: specialization.sport,
    experience,
    background,
    specialization
  };
}

// =================================================================
// INVITATION GENERATION SERVICE
// =================================================================

class InvitationTestingService {
  async createTestInvitation(profile: TestCoachProfile, options: { dryRun?: boolean } = {}): Promise<{
    success: boolean;
    token?: string;
    invitationId?: string;
    error?: string;
    profile: TestCoachProfile;
  }> {
    if (options.dryRun) {
      // Generate a mock token for dry run
      const mockToken = `test-${Date.now()}-${Math.random().toString(36).substr(2, 8)}`;
      return {
        success: true,
        token: mockToken,
        invitationId: `mock-invitation-${Math.random().toString(36).substr(2, 8)}`,
        profile
      };
    }

    try {
      // Use the existing coach invite function handler logic
      console.log(`🏃‍♂️ Creating invitation for ${profile.name}...`);
      
      // Call the coach invite GraphQL mutation
      const result = await client.graphql({
        query: coachInvite,
        variables: {
          name: profile.name,
          email: profile.email,
          cell: profile.cell,
          location: `${profile.city}, ${profile.state}`,
          d1_athletics_count: profile.d1Athletics,
          bio: profile.bio
        }
      }) as any; // Type cast to handle GraphQL result

      if (result.data?.coachInvite) {
        // Parse the JSON response from the function
        const responseData = JSON.parse(result.data.coachInvite);
        
        if (responseData.success) {
          console.log(`   ✅ Success: ${responseData.message}`);
          return {
            success: true,
            token: responseData.invitationToken,
            invitationId: responseData.invitationData?.id,
            profile
          };
        } else {
          console.log(`   ❌ Failed: ${responseData.message || 'Unknown error'}`);
          return {
            success: false,
            error: responseData.message || 'Unknown error',
            profile
          };
        }
      } else {
        console.log(`   ❌ Failed: No data returned from mutation`);
        return {
          success: false,
          error: 'No data returned from mutation',
          profile
        };
      }
    } catch (error: any) {
      console.error(`   💥 Exception: ${error.message}`);
      return {
        success: false,
        error: error.message,
        profile
      };
    }
  }

  async generateTestInvitations(
    count: number = 10,
    options: { 
      dryRun?: boolean;
      testEmail?: string;
      diverseSports?: boolean;
    } = {}
  ): Promise<{
    successful: Array<{ token: string; invitationId?: string; profile: TestCoachProfile }>;
    failed: Array<{ error: string; profile: TestCoachProfile }>;
    summary: {
      total: number;
      successful: number;
      failed: number;
      sportBreakdown: Record<string, number>;
      locationBreakdown: Record<string, number>;
    };
  }> {
    console.log('\n🎯 GENERATING TEST INVITATION CODES');
    console.log('='.repeat(60));
    console.log(`📊 Count: ${count} invitations`);
    console.log(`🧪 Mode: ${options.dryRun ? 'DRY RUN' : 'LIVE'}` );
    if (options.testEmail) {
      console.log(`📧 Test Email: ${options.testEmail}`);
    }
    console.log('='.repeat(60));

    const successful: Array<{ token: string; invitationId?: string; profile: TestCoachProfile }> = [];
    const failed: Array<{ error: string; profile: TestCoachProfile }> = [];
    const sportBreakdown: Record<string, number> = {};
    const locationBreakdown: Record<string, number> = {};

    // Generate diverse profiles
    const profiles: TestCoachProfile[] = [];
    
    if (options.diverseSports) {
      // Ensure we have at least one coach for each major sport
      const majorSports = SPORTS_SPECIALIZATIONS.slice(0, Math.min(count, SPORTS_SPECIALIZATIONS.length));
      for (let i = 0; i < majorSports.length; i++) {
        const profile = generateRealisticCoachProfile(i, options.testEmail);
        // Override sport to ensure diversity
        profile.specialization = majorSports[i];
        profile.sport = majorSports[i].sport;
        profiles.push(profile);
      }
      
      // Fill remaining slots with random profiles
      for (let i = majorSports.length; i < count; i++) {
        profiles.push(generateRealisticCoachProfile(i, options.testEmail));
      }
    } else {
      // Generate all random profiles
      for (let i = 0; i < count; i++) {
        profiles.push(generateRealisticCoachProfile(i, options.testEmail));
      }
    }

    // Create invitations
    for (let i = 0; i < profiles.length; i++) {
      const profile = profiles[i];
      
      console.log(`\n📋 Profile ${i + 1}/${count}: ${profile.name}`);
      console.log(`   🏀 Sport: ${profile.sport}`);
      console.log(`   📍 Location: ${profile.city}, ${profile.state}`);
      console.log(`   🏆 D1 Athletes: ${profile.d1Athletics}`);
      console.log(`   📧 Email: ${profile.email}`);

      const result = await this.createTestInvitation(profile, { dryRun: options.dryRun });
      
      if (result.success) {
        successful.push({
          token: result.token!,
          invitationId: result.invitationId,
          profile: result.profile
        });
        
        // Track breakdown stats
        sportBreakdown[profile.sport] = (sportBreakdown[profile.sport] || 0) + 1;
        locationBreakdown[profile.city] = (locationBreakdown[profile.city] || 0) + 1;
      } else {
        failed.push({
          error: result.error!,
          profile: result.profile
        });
      }

      // Add delay to avoid overwhelming the system
      if (!options.dryRun && i < profiles.length - 1) {
        await new Promise(resolve => setTimeout(resolve, 1000));
      }
    }

    return {
      successful,
      failed,
      summary: {
        total: count,
        successful: successful.length,
        failed: failed.length,
        sportBreakdown,
        locationBreakdown
      }
    };
  }
}

// =================================================================
// MAIN EXECUTION
// =================================================================

async function main() {
  const args = process.argv.slice(2);
  
  // Parse arguments
  const getArg = (flag: string): string | undefined => {
    const index = args.indexOf(flag);
    return index !== -1 && index + 1 < args.length ? args[index + 1] : undefined;
  };
  
  const hasFlag = (flag: string): boolean => args.includes(flag);
  
  const count = parseInt(getArg('--count') || '10');
  const dryRun = hasFlag('--dry-run');
  const testEmail = getArg('--test-email');
  const diverseSports = hasFlag('--diverse-sports') || true; // Default to diverse

  console.log('\n🏀 TSA INVITATION CODES GENERATOR');
  console.log('=====================================');
  
  if (dryRun) {
    console.log('🧪 DRY RUN MODE - No actual invitations will be created');
  }

  try {
    const service = new InvitationTestingService();
    const results = await service.generateTestInvitations(count, {
      dryRun,
      testEmail,
      diverseSports
    });

    // Display results
    console.log('\n📊 INVITATION GENERATION RESULTS');
    console.log('='.repeat(60));
    console.log(`✅ Successful: ${results.summary.successful}/${results.summary.total}`);
    console.log(`❌ Failed: ${results.summary.failed}/${results.summary.total}`);

    if (results.successful.length > 0) {
      console.log('\n🎫 INVITATION TOKENS FOR TESTING:');
      console.log('-'.repeat(60));
      
      results.successful.forEach((invite, index) => {
        console.log(`${index + 1}. ${invite.profile.name} (${invite.profile.sport})`);
        console.log(`   🎫 Token: ${invite.token}`);
        console.log(`   📧 Email: ${invite.profile.email}`);
        console.log(`   🔗 Onboarding URL: ${amplifyOutputs.custom?.frontend_url || 'https://your-domain.com'}/onboarding?invite=${invite.token}`);
        console.log('');
      });

      console.log('\n📈 BREAKDOWN BY SPORT:');
      Object.entries(results.summary.sportBreakdown)
        .sort(([,a], [,b]) => b - a)
        .forEach(([sport, count]) => {
          console.log(`   🏀 ${sport}: ${count} coaches`);
        });

      console.log('\n🗺️  BREAKDOWN BY LOCATION:');
      Object.entries(results.summary.locationBreakdown)
        .sort(([,a], [,b]) => b - a)
        .forEach(([location, count]) => {
          console.log(`   📍 ${location}: ${count} coaches`);
        });
    }

    if (results.failed.length > 0) {
      console.log('\n❌ FAILED INVITATIONS:');
      console.log('-'.repeat(60));
      results.failed.forEach((failure, index) => {
        console.log(`${index + 1}. ${failure.profile.name} (${failure.profile.sport})`);
        console.log(`   ⚠️  Error: ${failure.error}`);
        console.log('');
      });
    }

    console.log('\n🎯 TESTING INSTRUCTIONS:');
    console.log('-'.repeat(60));
    console.log('1. Use the invitation tokens above to test the onboarding flow');
    console.log('2. Visit the onboarding URL with each token');
    console.log('3. Complete the onboarding process for different coach profiles');
    console.log('4. Test various scenarios: different sports, experience levels, locations');
    console.log('5. Verify that coach profiles are created correctly in the database');
    
    if (!dryRun && results.successful.length > 0) {
      console.log('\n💾 These invitations have been saved to your database');
      console.log('🔍 Check the Invitation model in your GraphQL schema for the records');
    }

    console.log('\n✅ Invitation generation completed!');
    
  } catch (error: any) {
    console.error('\n💥 Script failed:', error.message);
    console.error(error.stack);
    process.exit(1);
  }
}

// Handle uncaught errors
process.on('unhandledRejection', (error) => {
  console.error('\n💥 Unhandled rejection:', error);
  process.exit(1);
});

// Run the script
main().catch((error) => {
  console.error('\n💥 Main execution failed:', error);
  process.exit(1);
}); 