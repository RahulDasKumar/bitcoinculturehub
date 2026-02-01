import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
// import Manifesto from "./pages/Manifesto";
import NotFound from "./pages/NotFound";
import BitcoinCultureHub from "./Badge";
import Quiz from "./pages/Quiz";
import HomePage from "./HomePage";
import Register from "./pages/Register";
import Login from "./pages/Login";
import Waitlist from "./pages/WaitList-Components/Waitlist";
import ExplorePage from "./pages/explore/Explore"; 
import SubmitContent from "./pages/explore/SubmitContent";
import PressReleasePage from "./components/PressRelease"
import EventPage from "./components/Events/EventPage";
import Forum from "./components/Forum/Forum";
import OrganizationDashboard from "./components/Organization/OrganizationDashboard";
import { SignUpModal } from "./components/Organization/Authentication/SignUpModal";
import OpportunityEngineBeta from "./components/Opportunity-Engine-v2/OpportunityEngine";
import EventPage2 from "./components/Events-Page-Beta/Events";
import AboutUs from "./components/About-Us-Beta/Manifesto";
import AwardPage from "./components/AwardShow/AwardPage";
import ProfileBeta from "./Profile-Beta/ProfileBeta";
import OrganizationPage from "./components/OrganizationPage/OrganizationPage";
import OwnerDashboard from "./components/OwnerDashboard/OwnerDashboard";
import PostOpportunity from "./components/PostOpportunity/App";
import Directory from "./components/AllOrganization/Directory";
import NetworkAdministration from "./components/Admin/NetworkAdministration";
import Homepage from "./components/HomePage/Homepage";
import AuthPage from "./components/Authentication/AuthenticationPage";
const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Homepage />} />
          <Route path="/intro" element={<BitcoinCultureHub/>}/>
          <Route path="/quiz" element={<Quiz/>}/>
          <Route path="/about" element={<AboutUs />}/>
          <Route path="/join" element={<Waitlist/>}/>
          <Route path="/auth" element={<AuthPage/>}/>
          <Route path="/profile" element={<ProfileBeta />}></Route>
          <Route path="/explore" element={<ExplorePage />} /> 
          <Route path="/submit-content" element={<SubmitContent />} />
          <Route path="/opportunity" element={<OpportunityEngineBeta />}>
            <Route path=":id" element={<OpportunityEngineBeta />} />
          </Route>
          <Route path="/post-opportunity/:orgId" element={<PostOpportunity />} />
          <Route path="/awards" element={<AwardPage/>}/>
          <Route path="/admin" element={<NetworkAdministration />}/>
          <Route path="/events" element={<EventPage2/>}></Route>
          <Route path="/forum" element={<Forum/>}></Route>
          <Route path="/organization-dashboard/:orgId" element={<OrganizationDashboard />} />
          <Route path="/org-page/:orgId" element={<OrganizationPage/>}/>
          <Route path="/press-release" element={<PressReleasePage />} />
          <Route path="/organization-auth" element={<SignUpModal />} />
          <Route path="/awards" element={<AwardPage />} />
          <Route path="/org-dash/:orgId" element={<OwnerDashboard/>}></Route>
          <Route path="/orgs" element={<Directory/>}></Route>
          <Route path="*" element={<NotFound />} />
          
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
