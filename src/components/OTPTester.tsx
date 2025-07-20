import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { useAuth } from '@/contexts/AuthContext';
import { CheckCircle, AlertTriangle, Mail, Phone } from 'lucide-react';

const OTPTester = () => {
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [testResults, setTestResults] = useState<string[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  
  const { sendVerificationCode } = useAuth();

  const addResult = (message: string, type: 'success' | 'error' | 'info' = 'info') => {
    const timestamp = new Date().toLocaleTimeString();
    const prefix = type === 'success' ? '✅' : type === 'error' ? '❌' : 'ℹ️';
    setTestResults(prev => [...prev, `${timestamp} ${prefix} ${message}`]);
  };

  const testEmailOTP = async () => {
    if (!email) {
      addResult('Please enter an email address', 'error');
      return;
    }

    setIsLoading(true);
    addResult(`Sending EMAIL OTP to: ${email}`, 'info');
    
    try {
      await sendVerificationCode(email, 'email');
      addResult('EMAIL OTP SENT - 6-digit code delivered', 'success');
      addResult('Check your email for a 6-digit OTP code', 'info');
    } catch (error: any) {
      addResult(`EMAIL OTP FAILED: ${error.message}`, 'error');
    } finally {
      setIsLoading(false);
    }
  };

  const testPhoneOTP = async () => {
    if (!phone) {
      addResult('Please enter a phone number', 'error');
      return;
    }

    setIsLoading(true);
    addResult(`Sending PHONE OTP to: ${phone}`, 'info');
    
    try {
      await sendVerificationCode(phone, 'phone');
      addResult('PHONE OTP SENT - 6-digit SMS code delivered', 'success');
      addResult('Check your phone for a 6-digit SMS code', 'info');
    } catch (error: any) {
      addResult(`PHONE OTP FAILED: ${error.message}`, 'error');
    } finally {
      setIsLoading(false);
    }
  };

  const clearResults = () => {
    setTestResults([]);
  };

  return (
    <Card className="w-full max-w-2xl mx-auto mt-8">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          🧪 OTP Authentication Tester
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="grid md:grid-cols-2 gap-4">
          <div className="space-y-3">
            <div className="flex items-center gap-2">
              <Mail className="w-4 h-4" />
              <span className="font-medium">Email OTP Test</span>
            </div>
            <Input
              type="email"
              placeholder="test@example.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full"
            />
            <Button 
              onClick={testEmailOTP}
              disabled={isLoading}
              className="w-full"
            >
              Test Email OTP (6-digits)
            </Button>
          </div>

          <div className="space-y-3">
            <div className="flex items-center gap-2">
              <Phone className="w-4 h-4" />
              <span className="font-medium">Phone OTP Test</span>
            </div>
            <Input
              type="tel"
              placeholder="+1 555 000 0000"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              className="w-full"
            />
            <Button 
              onClick={testPhoneOTP}
              disabled={isLoading}
              className="w-full"
            >
              Test Phone OTP (SMS)
            </Button>
          </div>
        </div>

        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <h3 className="font-medium">Test Results</h3>
            <Button onClick={clearResults} variant="outline" size="sm">
              Clear Results
            </Button>
          </div>
          
          <div className="bg-gray-50 rounded-lg p-4 h-64 overflow-y-auto">
            {testResults.length === 0 ? (
              <p className="text-gray-500 text-sm">No test results yet. Run a test above.</p>
            ) : (
              testResults.map((result, index) => (
                <div key={index} className="text-sm font-mono mb-1">
                  {result}
                </div>
              ))
            )}
          </div>
        </div>

        <div className="bg-blue-50 p-4 rounded-lg">
          <h4 className="font-medium text-blue-900 mb-2">Expected Results:</h4>
          <ul className="text-sm text-blue-800 space-y-1">
            <li>✅ Email: You should receive a 6-digit OTP code in your email</li>
            <li>✅ Phone: You should receive a 6-digit SMS code</li>
            <li>⚠️ Make sure email templates use {"{{ .Token }}"} instead of {"{{ .ConfirmationURL }}"}</li>
          </ul>
        </div>
      </CardContent>
    </Card>
  );
};

export default OTPTester;