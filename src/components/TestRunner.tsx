
import React, { useEffect, useState } from 'react';
import { runComprehensiveTest } from '@/utils/appTesting';

const TestRunner: React.FC = () => {
  const [testResults, setTestResults] = useState<any>(null);

  useEffect(() => {
    const results = runComprehensiveTest();
    setTestResults(results);
  }, []);

  if (!testResults) return null;

  return (
    <div className="hidden">
      {/* Hidden component for testing purposes */}
    </div>
  );
};

export default TestRunner;
