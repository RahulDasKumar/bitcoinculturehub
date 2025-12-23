import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import About from "./pages/About";
// import Manifesto from "./pages/Manifesto";
import NotFound from "./pages/NotFound";
import BitcoinCultureHub from "./Badge";
import Quiz from "./pages/Quiz";
import HomePage from "./HomePage";
import Register from "./pages/Register";
import Login from "./pages/Login";
import Waitlist from "./pages/WaitList-Components/Waitlist";
import BookmarkToggle from "@/components/BookmarkToggle";
import ExplorePage from "./pages/explore/Explore"; 
import Profile from "./pages/Profile";
import SubmitContent from "./pages/explore/SubmitContent";
import AdminPage from "./pages/explore/Admin";
import OpportunityEngine from "./components/Opportunity-Engine/OpportunityEngine";
import SubmitOpportunity from "./components/Opportunity-Engine/SubmitOpportunity";
import PressReleasePage from "./components/PressRelease"
import EventPage from "./components/Events/EventPage";
import Forum from "./components/Forum/Forum";
import Opportunity from "./components/Opportunity/Opportunity";
import OrganizationDashboard from "./components/Organization/OrganizationDashboard";
import ProfilePage from "./components/Profile/ProfilePage";
import { SignUpModal } from "./components/Organization/Authentication/SignUpModal";
import { AdminDashboard } from "./components/Admin/Dashboard";
import OpportunityEngineBeta from "./components/Opportunity-Engine-v2/OpportunityEngine";
import EventPage2 from "./components/Events-Page-Beta/Events";
import AboutUs from "./components/About-Us-Beta/Manifesto";
import AwardPage from "./components/AwardShow/AwardPage";
import ProfileBeta from "./Profile-Beta/ProfileBeta";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/intro" element={<BitcoinCultureHub/>}/>
          <Route path="/quiz" element={<Quiz/>}/>
          <Route path="/about" element={<AboutUs />}/>
          <Route path="/join" element={<Waitlist/>}/>
          <Route path="/login" element={<Login/>}></Route>
          <Route path="/register" element={<Register />}></Route>
          <Route path="/profile" element={<ProfileBeta />}></Route>
          <Route path="/explore" element={<ExplorePage />} /> 
          <Route path="/submit-content" element={<SubmitContent />} />
          <Route path="/opportunity" element={<OpportunityEngineBeta />}></Route>
          <Route path="/submit-opportunity" element={<SubmitOpportunity />} />
          <Route path="/awards" element={<AwardPage/>}/>
          <Route path="/admin" element={<AdminPage/>}/>
          <Route path="/events" element={<EventPage2/>}></Route>
          <Route path="/forum" element={<Forum/>}></Route>
          <Route path="/organization-dashboard/:orgId" element={<OrganizationDashboard />} />
          <Route path="/press-release" element={<PressReleasePage />} />
          <Route path="/organization-auth" element={<SignUpModal />} />
          <Route path="/awards" element={<AwardPage />} />
          <Route path="/test-dash" element={<AdminDashboard/>}></Route>
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
