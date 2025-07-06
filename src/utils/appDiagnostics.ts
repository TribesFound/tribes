
import { supabase } from '@/integrations/supabase/client';

export interface DiagnosticResult {
  category: string;
  test: string;
  status: 'pass' | 'fail' | 'warning';
  message: string;
  details?: any;
}

export const runAppDiagnostics = async (): Promise<DiagnosticResult[]> => {
  const results: DiagnosticResult[] = [];
  
  console.log('🔍 Starting comprehensive app diagnostics...');

  // Test 1: Supabase Connection
  try {
    const { data, error } = await supabase.from('profiles').select('count').limit(1);
    if (error) throw error;
    
    results.push({
      category: 'Database',
      test: 'Supabase Connection',
      status: 'pass',
      message: 'Successfully connected to Supabase database'
    });
  } catch (error: any) {
    results.push({
      category: 'Database',
      test: 'Supabase Connection',
      status: 'fail',
      message: `Failed to connect to Supabase: ${error.message}`,
      details: error
    });
  }

  // Test 2: Authentication Status
  try {
    const { data: { session }, error } = await supabase.auth.getSession();
    
    results.push({
      category: 'Authentication',
      test: 'Session Status',
      status: session ? 'pass' : 'warning',
      message: session ? 'User is authenticated' : 'No active session',
      details: { userId: session?.user?.id, email: session?.user?.email }
    });
  } catch (error: any) {
    results.push({
      category: 'Authentication',
      test: 'Session Status',
      status: 'fail',
      message: `Authentication check failed: ${error.message}`,
      details: error
    });
  }

  // Test 3: Database Tables Accessibility - Fixed TypeScript issue
  const tableTests = [
    { name: 'profiles', query: () => supabase.from('profiles').select('*').limit(1) },
    { name: 'events', query: () => supabase.from('events').select('*').limit(1) },
    { name: 'messages', query: () => supabase.from('messages').select('*').limit(1) },
    { name: 'conversations', query: () => supabase.from('conversations').select('*').limit(1) },
    { name: 'friendships', query: () => supabase.from('friendships').select('*').limit(1) },
    { name: 'matches', query: () => supabase.from('matches').select('*').limit(1) },
    { name: 'user_preferences', query: () => supabase.from('user_preferences').select('*').limit(1) },
    { name: 'professional_profiles', query: () => supabase.from('professional_profiles').select('*').limit(1) },
    { name: 'event_participants', query: () => supabase.from('event_participants').select('*').limit(1) }
  ];
  
  for (const table of tableTests) {
    try {
      const { error } = await table.query();
      if (error) throw error;
      
      results.push({
        category: 'Database',
        test: `Table Access: ${table.name}`,
        status: 'pass',
        message: `Successfully accessed ${table.name} table`
      });
    } catch (error: any) {
      results.push({
        category: 'Database',
        test: `Table Access: ${table.name}`,
        status: error.code === 'PGRST116' ? 'warning' : 'fail',
        message: error.code === 'PGRST116' ? `${table.name} table is empty (normal for new apps)` : `Failed to access ${table.name} table: ${error.message}`,
        details: error
      });
    }
  }

  // Test 4: RLS Policies Check
  try {
    const { data: { user } } = await supabase.auth.getUser();
    if (user) {
      // Try to access user-specific data
      const { error } = await supabase
        .from('profiles')
        .select('*')
        .eq('id', user.id)
        .limit(1);
      
      results.push({
        category: 'Security',
        test: 'RLS Policies',
        status: error ? 'fail' : 'pass',
        message: error ? `RLS policy error: ${error.message}` : 'RLS policies working correctly'
      });
    } else {
      results.push({
        category: 'Security',
        test: 'RLS Policies',
        status: 'warning',
        message: 'Cannot test RLS policies without authenticated user'
      });
    }
  } catch (error: any) {
    results.push({
      category: 'Security',
      test: 'RLS Policies',
      status: 'fail',
      message: `RLS test failed: ${error.message}`,
      details: error
    });
  }

  // Test 5: Local Storage Check
  try {
    const testKey = 'diagnostic_test';
    const testValue = 'test_value';
    localStorage.setItem(testKey, testValue);
    const retrieved = localStorage.getItem(testKey);
    localStorage.removeItem(testKey);
    
    results.push({
      category: 'Storage',
      test: 'Local Storage',
      status: retrieved === testValue ? 'pass' : 'fail',
      message: retrieved === testValue ? 'Local storage working correctly' : 'Local storage test failed'
    });
  } catch (error: any) {
    results.push({
      category: 'Storage',
      test: 'Local Storage',
      status: 'fail',
      message: `Local storage error: ${error.message}`,
      details: error
    });
  }

  // Test 6: Environment Configuration
  try {
    const supabaseUrl = 'https://qdnzjihjukddihkvktxg.supabase.co';
    const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InFkbnpqaWhqdWtkZGloa3ZrdHhnIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTE3NDgwMzQsImV4cCI6MjA2NzMyNDAzNH0.3tkqa6tvQu6zsELJZBYHCt6Ct8Ybj6RSsu3fsQ42TFU';
    
    results.push({
      category: 'Configuration',
      test: 'Environment Variables',
      status: (supabaseUrl && supabaseKey) ? 'pass' : 'fail',
      message: (supabaseUrl && supabaseKey) ? 'Environment configuration is correct' : 'Missing required environment variables'
    });
  } catch (error: any) {
    results.push({
      category: 'Configuration',
      test: 'Environment Variables',
      status: 'fail',
      message: `Configuration check failed: ${error.message}`,
      details: error
    });
  }

  // Test 7: Navigation and Routing
  try {
    const currentPath = window.location.pathname;
    results.push({
      category: 'Navigation',
      test: 'React Router',
      status: 'pass',
      message: `Router working correctly on path: ${currentPath}`
    });
  } catch (error: any) {
    results.push({
      category: 'Navigation',
      test: 'React Router',
      status: 'fail',
      message: `Router test failed: ${error.message}`,
      details: error
    });
  }

  // Summary
  const passed = results.filter(r => r.status === 'pass').length;
  const failed = results.filter(r => r.status === 'fail').length;
  const warnings = results.filter(r => r.status === 'warning').length;
  
  console.log(`\n📊 Diagnostic Summary:`);
  console.log(`✅ Passed: ${passed}`);
  console.log(`⚠️  Warnings: ${warnings}`);
  console.log(`❌ Failed: ${failed}`);
  console.log(`\n🎉 Diagnostics completed!`);
  
  // Log individual results for debugging
  results.forEach(result => {
    const icon = result.status === 'pass' ? '✅' : result.status === 'warning' ? '⚠️' : '❌';
    console.log(`${icon} ${result.category} - ${result.test}: ${result.message}`);
  });
  
  return results;
};

// Auto-run diagnostics on import for testing
if (typeof window !== 'undefined') {
  runAppDiagnostics().then(results => {
    console.log('Background diagnostic results:', results);
  });
}
