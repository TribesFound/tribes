import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { useAuth } from '@/contexts/AuthContext';
import { CheckCircle, AlertTriangle, Mail, Phone } from 'lucide-react';

const OTPTester = () => {
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [whatsapp, setWhatsapp] = useState('');
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

  const testWhatsAppOTP = async () => {
    if (!whatsapp) {
      addResult('Please enter a WhatsApp number', 'error');
      return;
    }

    setIsLoading(true);
    addResult(`Sending WHATSAPP OTP to: ${whatsapp}`, 'info');
    
    try {
      await sendVerificationCode(whatsapp, 'whatsapp');
      addResult('WHATSAPP OTP SENT - 6-digit code delivered', 'success');
      addResult('Check your WhatsApp for a 6-digit OTP code', 'info');
    } catch (error: any) {
      addResult(`WHATSAPP OTP FAILED: ${error.message}`, 'error');
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
        <div className="grid md:grid-cols-3 gap-4">
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

          <div className="space-y-3">
            <div className="flex items-center gap-2">
              <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor">
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893A11.821 11.821 0 0020.885 3.488"/>
              </svg>
              <span className="font-medium">WhatsApp OTP Test</span>
            </div>
            <Input
              type="tel"
              placeholder="+1 555 000 0000"
              value={whatsapp}
              onChange={(e) => setWhatsapp(e.target.value)}
              className="w-full"
            />
            <Button 
              onClick={testWhatsAppOTP}
              disabled={isLoading}
              className="w-full"
            >
              Test WhatsApp OTP
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
            <li>✅ WhatsApp: You should receive a 6-digit WhatsApp message</li>
            <li>⚠️ Make sure email templates use {"{{ .Token }}"} instead of {"{{ .ConfirmationURL }}"}</li>
          </ul>
        </div>
      </CardContent>
    </Card>
  );
};

export default OTPTester;