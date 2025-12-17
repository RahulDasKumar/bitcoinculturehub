import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { OverviewTab } from "./tabs/OverviewTab";
import { FeedTab } from "./tabs/FeedTab";
import { WorkOffersTab } from "./tabs/WorkOffersTab";
import { EventsTab } from "./tabs/EventsTab";
import { CollectionsTab } from "./tabs/CollectionsTab";
import { ShopTab } from "./tabs/ShopTab";
import { ProofOfWorkTab } from "./tabs/ProofOfWorkTab";
import { ReviewsTab } from "./tabs/ReviewsTab";
import { Layout, MessageSquare, Briefcase, Calendar, Image, ShoppingBag, Award, FileText } from "lucide-react";

export const ProfileTabs = () => {
  return (
    <Tabs defaultValue="overview" className="w-full">
      <TabsList className="w-full justify-start bg-surface border border-border rounded-xl p-1 mb-6 overflow-x-auto">
        <TabsTrigger value="overview" className="gap-2 data-[state=active]:bg-surface-elevated">
          <Layout className="w-4 h-4" />
          <span className="hidden sm:inline">Overview</span>
        </TabsTrigger>
        <TabsTrigger value="feed" className="gap-2 data-[state=active]:bg-surface-elevated">
          <MessageSquare className="w-4 h-4" />
          <span className="hidden sm:inline">Feed</span>
        </TabsTrigger>
        <TabsTrigger value="work" className="gap-2 data-[state=active]:bg-surface-elevated">
          <Briefcase className="w-4 h-4" />
          <span className="hidden sm:inline">Work</span>
        </TabsTrigger>
        <TabsTrigger value="events" className="gap-2 data-[state=active]:bg-surface-elevated">
          <Calendar className="w-4 h-4" />
          <span className="hidden sm:inline">Events</span>
        </TabsTrigger>
        <TabsTrigger value="collections" className="gap-2 data-[state=active]:bg-surface-elevated">
          <Image className="w-4 h-4" />
          <span className="hidden sm:inline">Collections</span>
        </TabsTrigger>
        <TabsTrigger value="shop" className="gap-2 data-[state=active]:bg-surface-elevated">
          <ShoppingBag className="w-4 h-4" />
          <span className="hidden sm:inline">Shop</span>
        </TabsTrigger>
        <TabsTrigger value="about" className="gap-2 data-[state=active]:bg-surface-elevated">
          <FileText className="w-4 h-4" />
          <span className="hidden sm:inline">About</span>
        </TabsTrigger>
        <TabsTrigger value="reviews" className="gap-2 data-[state=active]:bg-surface-elevated">
          <Award className="w-4 h-4" />
          <span className="hidden sm:inline">Reviews</span>
        </TabsTrigger>
      </TabsList>

      <TabsContent value="overview" className="animate-fade-in">
        <OverviewTab />
      </TabsContent>
      <TabsContent value="feed" className="animate-fade-in">
        <FeedTab />
      </TabsContent>
      <TabsContent value="work" className="animate-fade-in">
        <WorkOffersTab />
      </TabsContent>
      <TabsContent value="events" className="animate-fade-in">
        <EventsTab />
      </TabsContent>
      <TabsContent value="collections" className="animate-fade-in">
        <CollectionsTab />
      </TabsContent>
      <TabsContent value="shop" className="animate-fade-in">
        <ShopTab />
      </TabsContent>
      <TabsContent value="about" className="animate-fade-in">
        <ProofOfWorkTab />
      </TabsContent>
      <TabsContent value="reviews" className="animate-fade-in">
        <ReviewsTab />
      </TabsContent>
    </Tabs>
  );
};
