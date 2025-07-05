
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { User, Building, ArrowRight } from 'lucide-react';

interface AccountTypeSelectionProps {
  onSelectPersonal: () => void;
  onSelectProfessional: () => void;
}

const AccountTypeSelection: React.FC<AccountTypeSelectionProps> = ({
  onSelectPersonal,
  onSelectProfessional
}) => {
  return (
    <div className="min-h-screen cave-gradient flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        <div className="text-center text-white mb-8">
          <img 
            src="/lovable-uploads/0628da7e-200a-4f94-a6fb-4f83f2f45f4f.png" 
            alt="Tribes Hand Logo" 
            className="w-16 h-16 mx-auto mb-4"
          />
          <h1 className="text-3xl font-bold cave-font mb-2">Choose Account Type</h1>
          <p className="text-lg opacity-90">How would you like to use Tribes?</p>
        </div>

        <div className="space-y-4">
          <Card className="cave-card hover:bg-orange-50/5 transition-all cursor-pointer" onClick={onSelectPersonal}>
            <CardHeader className="text-center pb-4">
              <div className="w-16 h-16 bg-gradient-to-br from-orange-400 to-amber-400 rounded-full flex items-center justify-center mx-auto mb-4">
                <User className="w-8 h-8 text-white" />
              </div>
              <CardTitle className="text-xl cave-font text-amber-900">
                Personal Account
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-center text-amber-700 mb-4">
                Connect with like-minded individuals, build meaningful relationships, and explore your interests.
              </p>
              <ul className="space-y-2 text-sm text-amber-700">
                <li className="flex items-center">
                  <ArrowRight className="w-4 h-4 mr-2 text-orange-500" />
                  Discover and match with people
                </li>
                <li className="flex items-center">
                  <ArrowRight className="w-4 h-4 mr-2 text-orange-500" />
                  Join community events
                </li>
                <li className="flex items-center">
                  <ArrowRight className="w-4 h-4 mr-2 text-orange-500" />
                  Build your tribe
                </li>
              </ul>
              <Button className="w-full cave-button mt-4">
                Continue as Personal
              </Button>
            </CardContent>
          </Card>

          <Card className="cave-card hover:bg-orange-50/5 transition-all cursor-pointer" onClick={onSelectProfessional}>
            <CardHeader className="text-center pb-4">
              <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-indigo-500 rounded-full flex items-center justify-center mx-auto mb-4">
                <Building className="w-8 h-8 text-white" />
              </div>
              <CardTitle className="text-xl cave-font text-amber-900">
                Professional Account
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-center text-amber-700 mb-4">
                Perfect for businesses, organizations, and professional networking.
              </p>
              <ul className="space-y-2 text-sm text-amber-700">
                <li className="flex items-center">
                  <ArrowRight className="w-4 h-4 mr-2 text-blue-500" />
                  Create and promote events
                </li>
                <li className="flex items-center">
                  <ArrowRight className="w-4 h-4 mr-2 text-blue-500" />
                  Business analytics dashboard
                </li>
                <li className="flex items-center">
                  <ArrowRight className="w-4 h-4 mr-2 text-blue-500" />
                  Professional networking tools
                </li>
              </ul>
              <Button className="w-full bg-blue-600 hover:bg-blue-700 text-white mt-4">
                Continue as Professional
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default AccountTypeSelection;
