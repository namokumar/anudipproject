#!/usr/bin/env node

/**
 * 🔴 RED TEAM ASSESSMENT - Advanced Application Security Testing
 * 
 * This script simulates sophisticated application-layer attacks that bypass
 * frontend protections by directly targeting the Supabase backend.
 * 
 * ATTACK VECTORS TESTED:
 * 1. IDOR (Insecure Direct Object Reference) - Can User A access User B's data?
 * 2. Authentication Bypass - Can we access protected resources without logging in?
 * 3. Mass Assignment - Can we inject admin privileges during signup?
 * 4. Race Conditions - Can we create duplicate tickets simultaneously?
 * 5. JWT Manipulation - Can we forge or tamper with session tokens?
 * 6. SQL Injection via API - Can we inject SQL through Supabase REST API?
 * 7. Timing Attacks - Can we enumerate valid emails via response times?
 * 
 * USAGE:
 *   node scripts/red_team_test.js
 * 
 * REQUIREMENTS:
 *   npm install @supabase/supabase-js chalk
 */

import { createClient } from '@supabase/supabase-js';
import chalk from 'chalk';

// Load credentials from .env
const SUPABASE_URL = process.env.VITE_SUPABASE_URL || 'https://ivuhrjpailjgnvloqzwj.supabase.co';
const SUPABASE_ANON_KEY = process.env.VITE_SUPABASE_ANON_KEY || 'sb_publishable_Ky6QfbXd7UDziktjw-hp1w_k_zJtyKt';

const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

// Test results tracker
const results = {
  passed: [],
  failed: [],
  warnings: []
};

function log(type, message) {
  const timestamp = new Date().toISOString();
  switch(type) {
    case 'pass':
      console.log(chalk.green(`✅ [${timestamp}] ${message}`));
      results.passed.push(message);
      break;
    case 'fail':
      console.log(chalk.red(`❌ [${timestamp}] ${message}`));
      results.failed.push(message);
      break;
    case 'warn':
      console.log(chalk.yellow(`⚠️  [${timestamp}] ${message}`));
      results.warnings.push(message);
      break;
    case 'info':
      console.log(chalk.blue(`ℹ️  [${timestamp}] ${message}`));
      break;
  }
}

// ============================================================
// ATTACK 1: IDOR (Insecure Direct Object Reference)
// ============================================================
async function testIDOR() {
  log('info', '🎯 ATTACK 1: Testing IDOR vulnerability...');
  
  try {
    // Create two test users
    const attacker = await supabase.auth.signUp({
      email: `attacker_${Date.now()}@redteam.test`,
      password: 'RedTeam123!@#'
    });
    
    const victim = await supabase.auth.signUp({
      email: `victim_${Date.now()}@redteam.test`,
      password: 'Victim123!@#'
    });

    if (attacker.error || victim.error) {
      log('warn', 'IDOR Test: Could not create test users (rate limited?)');
      return;
    }

    // Victim creates a ticket
    const victimClient = createClient(SUPABASE_URL, SUPABASE_ANON_KEY, {
      global: { headers: { Authorization: `Bearer ${victim.data.session.access_token}` }}
    });

    const { data: victimTicket } = await victimClient
      .from('tickets')
      .insert({
        user_id: victim.data.user.id,
        subject: 'CONFIDENTIAL: Victim\'s secret ticket',
        description: 'This should NOT be visible to attacker',
        status: 'Open',
        priority: 'High'
      })
      .select()
      .single();

    // Attacker tries to read victim's ticket by ID
    const attackerClient = createClient(SUPABASE_URL, SUPABASE_ANON_KEY, {
      global: { headers: { Authorization: `Bearer ${attacker.data.session.access_token}` }}
    });

    const { data: stolenTicket, error } = await attackerClient
      .from('tickets')
      .select('*')
      .eq('id', victimTicket.id)
      .single();

    if (stolenTicket) {
      log('fail', 'IDOR VULNERABILITY: Attacker can read victim\'s ticket!');
      log('fail', `Stolen data: ${JSON.stringify(stolenTicket)}`);
    } else {
      log('pass', 'IDOR Protection: RLS blocked unauthorized access');
    }

    // Cleanup
    await victimClient.from('tickets').delete().eq('id', victimTicket.id);
    
  } catch (err) {
    log('warn', `IDOR Test Error: ${err.message}`);
  }
}

// ============================================================
// ATTACK 2: Authentication Bypass
// ============================================================
async function testAuthBypass() {
  log('info', '🎯 ATTACK 2: Testing authentication bypass...');
  
  try {
    // Try to access tickets without authentication
    const anonClient = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);
    
    const { data, error } = await anonClient
      .from('tickets')
      .select('*')
      .limit(10);

    if (data && data.length > 0) {
      log('fail', 'AUTH BYPASS: Anonymous user can read tickets!');
    } else if (error && error.code === 'PGRST116') {
      log('pass', 'Auth Protection: RLS requires authentication');
    } else {
      log('pass', 'Auth Protection: No data returned to anonymous user');
    }
  } catch (err) {
    log('warn', `Auth Bypass Test Error: ${err.message}`);
  }
}

// ============================================================
// ATTACK 3: Mass Assignment (Privilege Escalation)
// ============================================================
async function testMassAssignment() {
  log('info', '🎯 ATTACK 3: Testing mass assignment vulnerability...');
  
  try {
    // Try to inject admin role during signup
    const { data, error } = await supabase.auth.signUp({
      email: `hacker_${Date.now()}@redteam.test`,
      password: 'Hacker123!@#',
      options: {
        data: {
          full_name: 'Hacker',
          company: 'Evil Corp',
          role: 'admin',  // Attempting privilege escalation
          is_admin: true,
          permissions: ['*']
        }
      }
    });

    if (data.user) {
      const metadata = data.user.user_metadata;
      if (metadata.role === 'admin' || metadata.is_admin) {
        log('fail', 'MASS ASSIGNMENT: Successfully injected admin privileges!');
      } else {
        log('pass', 'Mass Assignment Protection: Extra fields ignored');
      }
    }
  } catch (err) {
    log('warn', `Mass Assignment Test Error: ${err.message}`);
  }
}

// ============================================================
// ATTACK 4: SQL Injection via API
// ============================================================
async function testSQLInjection() {
  log('info', '🎯 ATTACK 4: Testing SQL injection...');
  
  try {
    const { data: user } = await supabase.auth.signUp({
      email: `sqli_${Date.now()}@redteam.test`,
      password: 'SQLi123!@#'
    });

    if (!user.user) {
      log('warn', 'SQLi Test: Could not create test user');
      return;
    }

    const client = createClient(SUPABASE_URL, SUPABASE_ANON_KEY, {
      global: { headers: { Authorization: `Bearer ${user.session.access_token}` }}
    });

    // Try SQL injection in subject field
    const injectionPayloads = [
      "'; DROP TABLE tickets; --",
      "' OR '1'='1",
      "1' UNION SELECT * FROM auth.users --",
      "'; UPDATE tickets SET user_id='attacker' WHERE '1'='1"
    ];

    let vulnerabilityFound = false;

    for (const payload of injectionPayloads) {
      const { data, error } = await client
        .from('tickets')
        .insert({
          user_id: user.user.id,
          subject: payload,
          description: 'SQL Injection Test',
          status: 'Open',
          priority: 'Low'
        })
        .select();

      if (data && data[0] && data[0].subject === payload) {
        // Payload was stored as-is (good - parameterized query)
        await client.from('tickets').delete().eq('id', data[0].id);
      } else if (error && error.message.includes('syntax error')) {
        vulnerabilityFound = true;
        log('fail', `SQL INJECTION POSSIBLE: ${payload}`);
      }
    }

    if (!vulnerabilityFound) {
      log('pass', 'SQL Injection Protection: Supabase uses parameterized queries');
    }
    
  } catch (err) {
    log('warn', `SQLi Test Error: ${err.message}`);
  }
}

// ============================================================
// ATTACK 5: Timing Attack (Email Enumeration)
// ============================================================
async function testTimingAttack() {
  log('info', '🎯 ATTACK 5: Testing timing attack for email enumeration...');
  
  try {
    // Measure response time for non-existent email
    const start1 = Date.now();
    await supabase.auth.signInWithPassword({
      email: 'nonexistent_user_12345@fake.test',
      password: 'WrongPassword123!'
    });
    const time1 = Date.now() - start1;

    // Measure response time for existing email (wrong password)
    const start2 = Date.now();
    await supabase.auth.signInWithPassword({
      email: 'test@example.com',  // Assuming this exists from earlier tests
      password: 'WrongPassword123!'
    });
    const time2 = Date.now() - start2;

    const timeDiff = Math.abs(time1 - time2);

    if (timeDiff > 200) {
      log('fail', `TIMING ATTACK POSSIBLE: ${timeDiff}ms difference reveals email existence`);
    } else {
      log('pass', `Timing Attack Protection: Consistent response times (${timeDiff}ms diff)`);
    }
  } catch (err) {
    log('warn', `Timing Attack Test Error: ${err.message}`);
  }
}

// ============================================================
// ATTACK 6: JWT Token Manipulation
// ============================================================
async function testJWTManipulation() {
  log('info', '🎯 ATTACK 6: Testing JWT manipulation...');
  
  try {
    const { data } = await supabase.auth.signUp({
      email: `jwt_test_${Date.now()}@redteam.test`,
      password: 'JWT123!@#'
    });

    if (!data.session) {
      log('warn', 'JWT Test: Could not create session');
      return;
    }

    const originalToken = data.session.access_token;
    
    // Try to modify the token (flip a bit)
    const tamperedToken = originalToken.slice(0, -5) + 'XXXXX';
    
    const maliciousClient = createClient(SUPABASE_URL, SUPABASE_ANON_KEY, {
      global: { headers: { Authorization: `Bearer ${tamperedToken}` }}
    });

    const { data: tickets, error } = await maliciousClient
      .from('tickets')
      .select('*');

    if (tickets) {
      log('fail', 'JWT VULNERABILITY: Tampered token accepted!');
    } else if (error) {
      log('pass', 'JWT Protection: Tampered token rejected');
    }
  } catch (err) {
    log('warn', `JWT Test Error: ${err.message}`);
  }
}

// ============================================================
// ATTACK 7: Race Condition (Concurrent Requests)
// ============================================================
async function testRaceCondition() {
  log('info', '🎯 ATTACK 7: Testing race condition vulnerabilities...');
  
  try {
    const { data } = await supabase.auth.signUp({
      email: `race_${Date.now()}@redteam.test`,
      password: 'Race123!@#'
    });

    if (!data.session) {
      log('warn', 'Race Condition Test: Could not create session');
      return;
    }

    const client = createClient(SUPABASE_URL, SUPABASE_ANON_KEY, {
      global: { headers: { Authorization: `Bearer ${data.session.access_token}` }}
    });

    // Send 10 identical requests simultaneously
    const promises = Array(10).fill(null).map(() => 
      client.from('tickets').insert({
        user_id: data.user.id,
        subject: 'Race Condition Test',
        description: 'Testing concurrent inserts',
        status: 'Open',
        priority: 'Low'
      }).select()
    );

    const results = await Promise.all(promises);
    const successCount = results.filter(r => r.data).length;

    log('info', `Race Condition: ${successCount}/10 concurrent inserts succeeded`);
    
    if (successCount === 10) {
      log('warn', 'Potential Race Condition: All concurrent requests succeeded');
    } else {
      log('pass', 'Race Condition Handling: Database handled concurrency correctly');
    }

    // Cleanup
    await client.from('tickets').delete().eq('subject', 'Race Condition Test');
    
  } catch (err) {
    log('warn', `Race Condition Test Error: ${err.message}`);
  }
}

// ============================================================
// MAIN EXECUTION
// ============================================================
async function runRedTeamAssessment() {
  console.log(chalk.bold.red('\n🔴 RED TEAM ASSESSMENT - ADVANCED SECURITY TESTING\n'));
  console.log(chalk.gray('Target: SupportSaaS Application'));
  console.log(chalk.gray(`Supabase URL: ${SUPABASE_URL}`));
  console.log(chalk.gray('Attack Surface: Application Layer\n'));
  console.log(chalk.yellow('⚠️  WARNING: This will create test data in your database\n'));

  await testAuthBypass();
  await testIDOR();
  await testMassAssignment();
  await testSQLInjection();
  await testJWTManipulation();
  await testTimingAttack();
  await testRaceCondition();

  // Print summary
  console.log(chalk.bold('\n📊 ASSESSMENT SUMMARY\n'));
  console.log(chalk.green(`✅ Passed: ${results.passed.length}`));
  console.log(chalk.red(`❌ Failed: ${results.failed.length}`));
  console.log(chalk.yellow(`⚠️  Warnings: ${results.warnings.length}\n`));

  if (results.failed.length > 0) {
    console.log(chalk.bold.red('🚨 CRITICAL VULNERABILITIES FOUND:\n'));
    results.failed.forEach(f => console.log(chalk.red(`  - ${f}`)));
  } else {
    console.log(chalk.bold.green('🎉 NO CRITICAL VULNERABILITIES FOUND!\n'));
  }

  if (results.warnings.length > 0) {
    console.log(chalk.bold.yellow('\n⚠️  WARNINGS:\n'));
    results.warnings.forEach(w => console.log(chalk.yellow(`  - ${w}`)));
  }

  console.log(chalk.gray('\n✨ Assessment complete\n'));
}

// Run the assessment
runRedTeamAssessment().catch(console.error);
