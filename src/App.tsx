import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import About from "./pages/About";
import Manifesto from "./pages/Manifesto";
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

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/manifesto" element={<Manifesto />} />
          <Route path="/intro" element={<BitcoinCultureHub/>}/>
          <Route path="/quiz" element={<Quiz/>}/>
          <Route path="/about" element={<About/>}/>
          <Route path="/join" element={<Waitlist/>}/>
          <Route path="/login" element={<Login/>}></Route>
          <Route path="/register" element={<Register />}></Route>
          <Route path="/profile" element={<Profile />}></Route>
          <Route path="/explore" element={<ExplorePage />} /> 
          <Route path="/submit-content" element={<SubmitContent />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
