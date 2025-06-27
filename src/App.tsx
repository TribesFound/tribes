
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
import Matches from "./pages/Matches";
import Profile from "./pages/Profile";
import Settings from "./pages/Settings";
import Admin from "./pages/Admin";
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
                  <Route path="/passcode-entry" element={<PasscodeEntry />} />
                  <Route path="/profile-setup" element={<ProfileSetup onComplete={(data) => {
                    console.log('Profile setup complete:', data);
                    window.location.href = '/discover';
                  }} userVerificationData={{}} />} />
                  <Route path="/discover" element={<Discover />} />
                  <Route path="/friends" element={<Friends />} />
                  <Route path="/events" element={<Events />} />
                  <Route path="/matches" element={<Matches />} />
                  <Route path="/profile" element={<Profile />} />
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
