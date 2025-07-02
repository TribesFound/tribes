
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import SplashScreen from "./pages/SplashScreen";
import Welcome from "./pages/Welcome";
import SignUpMethod from "./pages/SignUpMethod";
import Auth from "./pages/Auth";
import Onboarding from "./pages/Onboarding";
import PasscodeSetup from "./pages/PasscodeSetup";
import PasscodeEntry from "./pages/PasscodeEntry";
import ProfileSetup from "./components/ProfileSetup";
import Discover from "./pages/Discover";
import Friends from "./pages/Friends";
import Events from "./pages/Events";
import EventSetup from "./pages/EventSetup";
import Matches from "./pages/Matches";
import Profile from "./pages/Profile";
import Settings from "./pages/Settings";
import Admin from "./pages/Admin";
import Chat from "./pages/Chat";
import BottomNavigation from "./components/BottomNavigation";
import NotFound from "./pages/NotFound";
import { AuthProvider } from "./contexts/AuthContext";
import { PasscodeProvider } from "./contexts/PasscodeContext";
import { SubscriptionProvider } from "./contexts/SubscriptionContext";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <AuthProvider>
      <SubscriptionProvider>
        <PasscodeProvider>
          <TooltipProvider>
            <Toaster />
            <Sonner />
            <BrowserRouter>
              <div className="min-h-screen">
                <Routes>
                  <Route path="/" element={<Navigate to="/splash" replace />} />
                  <Route path="/splash" element={<SplashScreen />} />
                  <Route path="/welcome" element={<Welcome />} />
                  <Route path="/signup-method" element={<SignUpMethod />} />
                  <Route path="/auth" element={<Auth />} />
                  <Route path="/onboarding" element={<Onboarding />} />
                  <Route path="/passcode-setup" element={<PasscodeSetup />} />
                  <Route path="/passcode-entry" element={<PasscodeEntry 
                    onSuccess={() => {
                      // Check if user has completed profile setup
                      const hasProfile = localStorage.getItem('tribes_profile_complete');
                      if (hasProfile) {
                        window.location.href = '/discover';
                      } else {
                        window.location.href = '/profile-setup';
                      }
                    }} 
                    onForgotPasscode={() => console.log('Forgot passcode clicked')} 
                  />} />
                  <Route path="/profile-setup" element={<ProfileSetup onComplete={(data) => {
                    console.log('Profile setup complete:', data);
                    localStorage.setItem('tribes_profile_complete', 'true');
                    window.location.href = '/discover';
                  }} userVerificationData={{}} />} />
                  <Route path="/discover" element={<Discover />} />
                  <Route path="/friends" element={<Friends />} />
                  <Route path="/events" element={<Events />} />
                  <Route path="/event-setup" element={<EventSetup />} />
                  <Route path="/bonds" element={<Matches />} />
                  <Route path="/chat/:userId" element={<Chat />} />
                  <Route path="/profile" element={<Profile />} />
                  <Route path="/profile/:userId" element={<Profile />} />
                  <Route path="/settings" element={<Settings />} />
                  <Route path="/admin" element={<Admin userEmail="tribes.found@gmail.com" userRole="Chief" />} />
                  <Route path="*" element={<NotFound />} />
                </Routes>
                <BottomNavigation />
              </div>
            </BrowserRouter>
          </TooltipProvider>
        </PasscodeProvider>
      </SubscriptionProvider>
    </AuthProvider>
  </QueryClientProvider>
);

export default App;
