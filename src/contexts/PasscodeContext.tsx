
import React, { createContext, useContext, useState, useEffect } from 'react';
import PasscodeEntry from '@/pages/PasscodeEntry';
import PasscodeReset from '@/components/PasscodeReset';

interface PasscodeContextType {
  isPasscodeEnabled: boolean;
  isAuthenticated: boolean;
  enablePasscode: (passcode: string) => void;
  disablePasscode: () => void;
  authenticate: () => void;
  logout: () => void;
}

const PasscodeContext = createContext<PasscodeContextType | undefined>(undefined);

export const PasscodeProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [isPasscodeEnabled, setIsPasscodeEnabled] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [showPasscodeEntry, setShowPasscodeEntry] = useState(false);
  const [showPasscodeReset, setShowPasscodeReset] = useState(false);

  useEffect(() => {
    const passcodeEnabled = localStorage.getItem('tribes_passcode_enabled') === 'true';
    const sessionActive = sessionStorage.getItem('tribes_session_active') === 'true';
    
    setIsPasscodeEnabled(passcodeEnabled);
    
    if (passcodeEnabled && !sessionActive) {
      setShowPasscodeEntry(true);
      setIsAuthenticated(false);
    } else {
      setIsAuthenticated(true);
    }
  }, []);

  const enablePasscode = (passcode: string) => {
    localStorage.setItem('tribes_passcode', passcode);
    localStorage.setItem('tribes_passcode_enabled', 'true');
    setIsPasscodeEnabled(true);
  };

  const disablePasscode = () => {
    localStorage.removeItem('tribes_passcode');
    localStorage.setItem('tribes_passcode_enabled', 'false');
    setIsPasscodeEnabled(false);
  };

  const authenticate = () => {
    setIsAuthenticated(true);
    setShowPasscodeEntry(false);
    sessionStorage.setItem('tribes_session_active', 'true');
  };

  const logout = () => {
    setIsAuthenticated(false);
    sessionStorage.removeItem('tribes_session_active');
    if (isPasscodeEnabled) {
      setShowPasscodeEntry(true);
    }
  };

  const handleForgotPasscode = () => {
    setShowPasscodeEntry(false);
    setShowPasscodeReset(true);
  };

  const handlePasscodeResetComplete = () => {
    setShowPasscodeReset(false);
    authenticate();
  };

  const handlePasscodeResetCancel = () => {
    setShowPasscodeReset(false);
    setShowPasscodeEntry(true);
  };

  if (showPasscodeEntry) {
    return (
      <PasscodeEntry
        onSuccess={authenticate}
        onForgotPasscode={handleForgotPasscode}
      />
    );
  }

  if (showPasscodeReset) {
    return (
      <PasscodeReset
        onComplete={handlePasscodeResetComplete}
        onCancel={handlePasscodeResetCancel}
      />
    );
  }

  const value = {
    isPasscodeEnabled,
    isAuthenticated,
    enablePasscode,
    disablePasscode,
    authenticate,
    logout
  };

  return (
    <PasscodeContext.Provider value={value}>
      {children}
    </PasscodeContext.Provider>
  );
};

export const usePasscode = () => {
  const context = useContext(PasscodeContext);
  if (context === undefined) {
    throw new Error('usePasscode must be used within a PasscodeProvider');
  }
  return context;
};
