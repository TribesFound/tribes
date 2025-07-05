
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "./contexts/AuthContext";
import { PasscodeProvider } from "./contexts/PasscodeContext";
import { SubscriptionProvider } from "./contexts/SubscriptionContext";
import BottomNavigation from "./components/BottomNavigation";
import TestRunner from "./components/TestRunner";

// Pages
import Index from "./pages/Index";
import SplashScreen from "./pages/SplashScreen";
import Welcome from "./pages/Welcome";
import SignUpMethod from "./pages/SignUpMethod";
import Auth from "./pages/Auth";
import PasscodeSetup from "./pages/PasscodeSetup";
import PasscodeEntry from "./pages/PasscodeEntry";
import Onboarding from "./pages/Onboarding";
import Profile from "./pages/Profile";
import EditProfile from "./pages/EditProfile";
import PasswordChange from "./pages/PasswordChange";
import Subscription from "./pages/Subscription";
import BusinessDashboard from "./pages/BusinessDashboard";
import PrivacySettings from "./pages/PrivacySettings";
import Discover from "./pages/Discover";
import Events from "./pages/Events";
import EventSetup from "./pages/EventSetup";
import Friends from "./pages/Friends";
import Matches from "./pages/Matches";
import Chat from "./pages/Chat";
import Settings from "./pages/Settings";
import Admin from "./pages/Admin";
import ROGPayments from "./pages/ROGPayments";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <AuthProvider>
        <PasscodeProvider>
          <SubscriptionProvider>
            <TestRunner />
            <Toaster />
            <Sonner />
            <BrowserRouter>
              <div className="min-h-screen">
                <Routes>
                  <Route path="/" element={<Index />} />
                  <Route path="/splash" element={<SplashScreen />} />
                  <Route path="/welcome" element={<Welcome />} />
                  <Route path="/signup-method" element={<SignUpMethod />} />
                  <Route path="/auth" element={<Auth />} />
                  <Route path="/passcode-setup" element={<PasscodeSetup />} />
                  <Route path="/passcode-entry" element={<PasscodeEntry onSuccess={() => {}} onForgotPasscode={() => {}} />} />
                  <Route path="/onboarding" element={<Onboarding />} />
                  <Route path="/profile" element={<Profile />} />
                  <Route path="/profile/:userId" element={<Profile />} />
                  <Route path="/edit-profile" element={<EditProfile />} />
                  <Route path="/password-change" element={<PasswordChange />} />
                  <Route path="/subscription" element={<Subscription />} />
                  <Route path="/business-dashboard" element={<BusinessDashboard />} />
                  <Route path="/privacy-settings" element={<PrivacySettings />} />
                  <Route path="/discover" element={<Discover />} />
                  <Route path="/events" element={<Events />} />
                  <Route path="/event-setup" element={<EventSetup />} />
                  <Route path="/friends" element={<Friends />} />
                  <Route path="/bonds" element={<Matches />} />
                  <Route path="/chat/:userId" element={<Chat />} />
                  <Route path="/settings" element={<Settings />} />
                  <Route path="/admin" element={<Admin userEmail="admin@tribes.app" userRole="Chief" />} />
                  <Route path="/rog-payments" element={<ROGPayments />} />
                  <Route path="*" element={<NotFound />} />
                </Routes>
                <BottomNavigation />
              </div>
            </BrowserRouter>
          </SubscriptionProvider>
        </PasscodeProvider>
      </AuthProvider>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
