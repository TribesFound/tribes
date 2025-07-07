
import React, { useEffect, useState } from 'react';
import { runComprehensiveDiagnostics, DiagnosticResult } from '@/utils/appDiagnostics';

const TestRunner: React.FC = () => {
  const [diagnosticResults, setDiagnosticResults] = useState<DiagnosticResult[]>([]);
  const [isRunning, setIsRunning] = useState(false);

  useEffect(() => {
    const runDiagnostics = async () => {
      setIsRunning(true);
      try {
        const results = await runComprehensiveDiagnostics();
        setDiagnosticResults(results);
        console.log('🎉 App diagnostics completed successfully!');
        console.log(`✅ ${results.filter(r => r.status === 'pass').length} tests passed`);
        console.log(`⚠️ ${results.filter(r => r.status === 'warning').length} warnings`);
        console.log(`❌ ${results.filter(r => r.status === 'error').length} failed`);
      } catch (error) {
        console.error('Failed to run diagnostics:', error);
      } finally {
        setIsRunning(false);
      }
    };

    runDiagnostics();
  }, []);

  const passedTests = diagnosticResults.filter(r => r.status === 'pass').length;
  const errorTests = diagnosticResults.filter(r => r.status === 'error').length;
  const warningTests = diagnosticResults.filter(r => r.status === 'warning').length;

  return (
    <div className="hidden">
      {/* Hidden component that runs diagnostics in the background */}
      <div data-testid="diagnostic-summary">
        <span data-testid="passed-count">{passedTests}</span>
        <span data-testid="failed-count">{errorTests}</span>
        <span data-testid="warning-count">{warningTests}</span>
        <span data-testid="is-running">{isRunning}</span>
      </div>
    </div>
  );
};

export default TestRunner;
