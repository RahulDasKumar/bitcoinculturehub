import { TableOfContents } from "@/components/TableOfContents";
import { ContentSection } from "@/components/ContentSection";
import { FeatureCard } from "@/components/FeatureCard";
import { FAQ } from "@/components/FAQ";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Building2, Users, Shield, Zap, Crown, Sword, Castle } from "lucide-react";

const tocItems = [
  { id: "about-company", title: "About the Company", level: 1 },
  { id: "our-mission", title: "Our Mission", level: 2 },
  { id: "our-values", title: "Our Values", level: 2 },
  { id: "houses-explained", title: "Houses Explained", level: 1 },
  { id: "house-structure", title: "House Structure", level: 2 },
  { id: "house-benefits", title: "House Benefits", level: 2 },
  { id: "archetypes-explained", title: "Archetypes Explained", level: 1 },
  { id: "archetype-roles", title: "Archetype Roles", level: 2 },
  { id: "archetype-progression", title: "Archetype Progression", level: 2 },
  { id: "citadels-explained", title: "Citadels Explained", level: 1 },
  { id: "citadel-governance", title: "Citadel Governance", level: 2 },
  { id: "citadel-economy", title: "Citadel Economy", level: 2 },
  { id: "faq", title: "Frequently Asked Questions", level: 1 },
];

const faqItems = [
  {
    question: "How do I join a House?",
    answer: "You can join a House by connecting with existing members, demonstrating alignment with House values, and going through the initiation process. Each House has its own unique requirements and cultural practices."
  },
  {
    question: "What are the benefits of different Archetypes?",
    answer: "Each Archetype provides unique abilities, access to specialized tools and resources, and different pathways for advancement within the ecosystem. Your Archetype determines your role and influence within Houses and Citadels."
  },
  {
    question: "How are Citadels governed?",
    answer: "Citadels operate under a decentralized governance model where decisions are made collectively by House representatives and high-ranking Archetypes. The governance structure promotes transparency and community involvement."
  },
  {
    question: "Can I change my House or Archetype?",
    answer: "Yes, but transitions require careful consideration and often involve ceremonial processes. Changes are possible but should align with your long-term goals and the community's needs."
  },
  {
    question: "What is the economic model of Citadels?",
    answer: "Citadels operate on a value-based economy where contributions are recognized and rewarded. The system incentivizes meaningful participation and collaborative growth while maintaining sustainable economics."
  }
];

const About = () => {
  return (
    <div className="min-h-screen bg-gradient-subtle">
      <Header />
      
      {/* Hero Section */}
      <header className="bg-gradient-primary text-primary-foreground py-16">
        <div className="container mx-auto px-6">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-5xl md:text-6xl font-bold mb-6">
              About Our Community
            </h1>
            <p className="text-xl md:text-2xl opacity-90 leading-relaxed">
              Discover the foundation, structure, and vision that drives our decentralized community forward.
            </p>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <div className="container mx-auto px-6 py-16">
        <div className="flex flex-col lg:flex-row gap-16 max-w-7xl mx-auto">
          {/* Sidebar - Table of Contents */}
          <aside className="lg:w-1/4">
            <TableOfContents items={tocItems} />
          </aside>

          {/* Main Content */}
          <main className="lg:w-3/4 space-y-16">
            {/* About the Company */}
            <ContentSection id="about-company" title="About the Company">
              <p className="text-lg leading-relaxed mb-6">
                The Cultural OS makes Bitcoin culture durable, scalable, and actionable. We are a sovereignty-focused 
                community that anchors identity through Houses, provides meaning through Archetypes, ensures continuity 
                through rituals, and achieves scalability through shared culture across digital and physical worlds.
              </p>
              
              <div id="our-mission" className="scroll-mt-8 mb-12">
                <h3 className="text-2xl font-semibold mb-4 text-foreground">Our Mission</h3>
                <p className="text-muted-foreground leading-relaxed mb-6">
                  We aim to incubate technologies and products that push forward the idea of a decentralized world.
                </p>
                <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mt-8">
                  <FeatureCard
                    title="Belonging"
                    description="Houses anchor identity and collective pride"
                  />
                  <FeatureCard
                    title="Meaning"
                    description="Archetypes give personal roles and growth arcs"
                  />
                  <FeatureCard
                    title="Continuity"
                    description="Rituals tie culture to Bitcoin's key dates (Genesis, Halving, Pizza Day)"
                  />
                  <FeatureCard
                    title="Scalability"
                    description="Crests, lore, and rituals travel easily across digital + physical worlds"
                  />
                </div>
              </div>

              <div id="our-values" className="scroll-mt-8">
                <h3 className="text-2xl font-semibold mb-6 text-foreground">Our Values</h3>
                <div className="grid md:grid-cols-2 gap-6">
                  <FeatureCard
                    icon={<Shield className="w-6 h-6 text-primary-foreground" />}
                    title="Integrity"
                    description="We build trust through transparency, honesty, and consistent actions that align with our community values."
                  />
                  <FeatureCard
                    icon={<Users className="w-6 h-6 text-primary-foreground" />}
                    title="Collaboration"
                    description="Together we achieve more. Our strength lies in diverse perspectives working toward common goals."
                  />
                  <FeatureCard
                    icon={<Zap className="w-6 h-6 text-primary-foreground" />}
                    title="Innovation"
                    description="We embrace new technologies and ideas that push the boundaries of what's possible in decentralized communities."
                  />
                  <FeatureCard
                    icon={<Building2 className="w-6 h-6 text-primary-foreground" />}
                    title="Sustainability"
                    description="We design systems that grow stronger over time, creating lasting value for current and future generations."
                  />
                </div>
              </div>
            </ContentSection>

            {/* Houses Explained */}
            <ContentSection id="houses-explained" title="Houses Explained">
              <p className="text-lg leading-relaxed mb-8">
                Houses anchor identity and collective pride within our Bitcoin sovereignty ecosystem. Each House 
                represents a fortress of shared values, cultural practices, and specialized focus areas that 
                defend and advance the principles of financial sovereignty.
              </p>

              <div id="house-structure" className="scroll-mt-8 mb-12">
                <h3 className="text-2xl font-semibold mb-4 text-foreground">House Keyrath - "Defenders of Sovereignty"</h3>
                <p className="text-muted-foreground leading-relaxed mb-6">
                  Keyrath is the fortress of freedom. Members uphold autonomy through vigilance and responsibility. 
                  Rituals like Proof of Keys and Node Harvest make sovereignty visible and communal.
                </p>
                <div className="bg-accent/30 border border-primary/20 rounded-lg p-6 mb-6">
                  <h4 className="font-semibold mb-3 text-foreground">Role in Community</h4>
                  <p className="text-muted-foreground mb-4">Guardians of custody, defenders of the culture's perimeter.</p>
                  
                  <h4 className="font-semibold mb-3 text-foreground">Key Rituals</h4>
                  <ul className="space-y-2 text-muted-foreground mb-4">
                    <li>• <strong>Vigils:</strong> Standing watch over community security</li>
                    <li>• <strong>Key Ceremonies:</strong> Ceremonial key management practices</li>
                    <li>• <strong>Multisig Drills:</strong> Regular security protocol training</li>
                  </ul>
                  
                  <h4 className="font-semibold mb-3 text-foreground">Key Performance Indicators</h4>
                  <ul className="space-y-2 text-muted-foreground">
                    <li>• % wallets in self-custody</li>
                    <li>• # of backups verified</li>
                    <li>• # of guardians trained</li>
                  </ul>
                </div>
              </div>

              <div id="house-benefits" className="scroll-mt-8">
                <h3 className="text-2xl font-semibold mb-6 text-foreground">Additional Houses</h3>
                
                <div className="space-y-8">
                  {/* House Embrathor */}
                  <div className="bg-accent/30 border border-primary/20 rounded-lg p-6">
                    <h4 className="text-xl font-semibold mb-3 text-foreground">House Embrathor - "Through Fire, We Build"</h4>
                    <p className="text-muted-foreground mb-4">
                      Forge is the crucible of creation. Members embrace trial to turn sparks into culture, tools, and progress.
                    </p>
                    <div className="grid md:grid-cols-3 gap-4 text-sm">
                      <div>
                        <strong className="text-foreground">Role:</strong>
                        <p className="text-muted-foreground">Builders' guild; innovation engine</p>
                      </div>
                      <div>
                        <strong className="text-foreground">Rituals:</strong>
                        <p className="text-muted-foreground">Trial by Fire, Ember Runs, hackathons</p>
                      </div>
                      <div>
                        <strong className="text-foreground">KPIs:</strong>
                        <p className="text-muted-foreground"># projects shipped; % events with build output; retention of creators</p>
                      </div>
                    </div>
                  </div>

                  {/* House Luminor */}
                  <div className="bg-accent/30 border border-primary/20 rounded-lg p-6">
                    <h4 className="text-xl font-semibold mb-3 text-foreground">House Luminor - "Where No One is a Stranger"</h4>
                    <p className="text-muted-foreground mb-4">
                      Luminor is the hearth of kinship. Members make sure culture stays human, inclusive, and warm.
                    </p>
                    <div className="grid md:grid-cols-3 gap-4 text-sm">
                      <div>
                        <strong className="text-foreground">Role:</strong>
                        <p className="text-muted-foreground">Hospitality + mentorship layer</p>
                      </div>
                      <div>
                        <strong className="text-foreground">Rituals:</strong>
                        <p className="text-muted-foreground">Pizza Day feasts, Equinox Welcomings, Lantern Lighting</p>
                      </div>
                      <div>
                        <strong className="text-foreground">KPIs:</strong>
                        <p className="text-muted-foreground"># new joiners welcomed; % mentorship matches; event attendance</p>
                      </div>
                    </div>
                  </div>

                  {/* House Runeborn */}
                  <div className="bg-accent/30 border border-primary/20 rounded-lg p-6">
                    <h4 className="text-xl font-semibold mb-3 text-foreground">House Runeborn - "Carriers of Lore, Keepers of Signal"</h4>
                    <p className="text-muted-foreground mb-4">
                      Runeborn are lorekeepers and educators. They preserve Bitcoin's memory, protect against noise, and transmit signal.
                    </p>
                    <div className="grid md:grid-cols-3 gap-4 text-sm">
                      <div>
                        <strong className="text-foreground">Role:</strong>
                        <p className="text-muted-foreground">Educators, archivists, storytellers</p>
                      </div>
                      <div>
                        <strong className="text-foreground">Rituals:</strong>
                        <p className="text-muted-foreground">Whitepaper Day readings, lore contests, FUD burnings</p>
                      </div>
                      <div>
                        <strong className="text-foreground">KPIs:</strong>
                        <p className="text-muted-foreground"># lore events hosted; # educational artifacts; knowledge scores</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </ContentSection>

            {/* Archetypes Explained */}
            <ContentSection id="archetypes-explained" title="Archetypes Explained">
              <p className="text-lg leading-relaxed mb-8">
                Archetypes define your role and specialization within the community. Each Archetype comes with 
                unique abilities, responsibilities, and pathways for growth and contribution.
              </p>

              <div id="archetype-roles" className="scroll-mt-8 mb-12">
                <h3 className="text-2xl font-semibold mb-6 text-foreground">Sentinel Archetype - "Protectors of Continuity"</h3>
                <p className="text-muted-foreground leading-relaxed mb-6">
                  Sentinels embody vigilance at the personal level. They are the individuals who stand watch, 
                  guard trust, and ensure continuity.
                </p>
                <div className="bg-accent/30 border border-primary/20 rounded-lg p-6 mb-8">
                  <h4 className="font-semibold mb-3 text-foreground">Role in Community</h4>
                  <p className="text-muted-foreground mb-4">Security leads, moderators, incident responders.</p>
                  
                  <h4 className="font-semibold mb-3 text-foreground">Key Rituals</h4>
                  <ul className="space-y-2 text-muted-foreground mb-4">
                    <li>• <strong>Watch Rotations:</strong> Scheduled monitoring and security oversight</li>
                    <li>• <strong>Audit Drills:</strong> Regular security assessments and testing</li>
                    <li>• <strong>Guardian Pledges:</strong> Commitment ceremonies to community protection</li>
                  </ul>
                  
                  <h4 className="font-semibold mb-3 text-foreground">Key Performance Indicators</h4>
                  <ul className="space-y-2 text-muted-foreground">
                    <li>• # of audits completed</li>
                    <li>• Uptime of nodes</li>
                    <li>• # of incidents resolved</li>
                  </ul>
                </div>
                
                <h4 className="text-xl font-semibold mb-6 text-foreground">Additional Archetypes</h4>
                
                <div className="space-y-8 mb-8">
                  {/* Forger Archetype */}
                  <div className="bg-accent/30 border border-primary/20 rounded-lg p-6">
                    <h5 className="text-lg font-semibold mb-3 text-foreground">Forger - "Makers of Tomorrow"</h5>
                    <p className="text-muted-foreground mb-4">
                      Forgers are the individuals who transform pressure into creation. They ship first prototypes, iterate relentlessly, and inspire by making.
                    </p>
                    <div className="grid md:grid-cols-3 gap-4 text-sm">
                      <div>
                        <strong className="text-foreground">Role:</strong>
                        <p className="text-muted-foreground">Hackathon drivers, artists, toolsmiths</p>
                      </div>
                      <div>
                        <strong className="text-foreground">Rituals:</strong>
                        <p className="text-muted-foreground">First Masterpiece trials, rapid build sprints</p>
                      </div>
                      <div>
                        <strong className="text-foreground">KPIs:</strong>
                        <p className="text-muted-foreground"># first-time builders activated; % projects adopted</p>
                      </div>
                    </div>
                  </div>

                  {/* Luminary Archetype */}
                  <div className="bg-accent/30 border border-primary/20 rounded-lg p-6">
                    <h5 className="text-lg font-semibold mb-3 text-foreground">Luminary - "Carriers of Vision"</h5>
                    <p className="text-muted-foreground mb-4">
                      Luminaries guide others through clarity and inspiration. They provide cultural direction in moments of uncertainty.
                    </p>
                    <div className="grid md:grid-cols-3 gap-4 text-sm">
                      <div>
                        <strong className="text-foreground">Role:</strong>
                        <p className="text-muted-foreground">Speakers, thought-leaders, narrative guides</p>
                      </div>
                      <div>
                        <strong className="text-foreground">Rituals:</strong>
                        <p className="text-muted-foreground">Solstice addresses, Beacon Nights</p>
                      </div>
                      <div>
                        <strong className="text-foreground">KPIs:</strong>
                        <p className="text-muted-foreground"># talks delivered; reach of content; % reporting "clarity of mission"</p>
                      </div>
                    </div>
                  </div>

                  {/* Voyager Archetype */}
                  <div className="bg-accent/30 border border-primary/20 rounded-lg p-6">
                    <h5 className="text-lg font-semibold mb-3 text-foreground">Voyager - "Pathfinders of the Horizon"</h5>
                    <p className="text-muted-foreground mb-4">
                      Voyagers are explorers who seek out new paths and bring discoveries back to the culture.
                    </p>
                    <div className="grid md:grid-cols-3 gap-4 text-sm">
                      <div>
                        <strong className="text-foreground">Role:</strong>
                        <p className="text-muted-foreground">Ambassadors, connectors, scouts</p>
                      </div>
                      <div>
                        <strong className="text-foreground">Rituals:</strong>
                        <p className="text-muted-foreground">Pilgrimages, map quests, travel reports</p>
                      </div>
                      <div>
                        <strong className="text-foreground">KPIs:</strong>
                        <p className="text-muted-foreground"># new communities bridged; % growth from Voyager activations</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div id="archetype-progression" className="scroll-mt-8">
                <h3 className="text-2xl font-semibold mb-4 text-foreground">Archetype Progression</h3>
                <p className="text-muted-foreground leading-relaxed mb-6">
                  Your Archetype evolves as you contribute to the community. Progression is based on demonstrated 
                  expertise, community recognition, and alignment with Archetype principles.
                </p>
                <div className="bg-gradient-subtle border border-primary/20 rounded-lg p-6">
                  <div className="flex items-center justify-between mb-4">
                    <span className="text-sm font-medium text-muted-foreground">Apprentice</span>
                    <span className="text-sm font-medium text-muted-foreground">Adept</span>
                    <span className="text-sm font-medium text-muted-foreground">Master</span>
                    <span className="text-sm font-medium text-muted-foreground">Grandmaster</span>
                  </div>
                  <div className="h-2 bg-muted rounded-full overflow-hidden">
                    <div className="h-full bg-gradient-primary w-3/4 rounded-full"></div>
                  </div>
                  <p className="text-sm text-muted-foreground mt-2">
                    Progression unlocks new abilities, governance rights, and leadership opportunities.
                  </p>
                </div>
              </div>
            </ContentSection>

            {/* Citadels Explained */}
            <ContentSection id="citadels-explained" title="Citadels Explained">
              <p className="text-lg leading-relaxed mb-8">
                Citadels are the ultimate expression of our community's vision - self-governing territories where 
                multiple Houses collaborate on major initiatives and shape the future of our ecosystem.
              </p>

              <div id="citadel-governance" className="scroll-mt-8 mb-12">
                <h3 className="text-2xl font-semibold mb-4 text-foreground">Citadel Governance</h3>
                <p className="text-muted-foreground leading-relaxed mb-6">
                  Citadels operate under a sophisticated governance model that balances efficiency with 
                  democratic participation. Decisions are made through a combination of representative 
                  democracy and direct community input.
                </p>
                <FeatureCard
                  icon={<Castle className="w-6 h-6 text-primary-foreground" />}
                  title="Council of Houses"
                  description="Representatives from each House collaborate on strategic decisions, resource allocation, and conflict resolution within the Citadel."
                  className="mb-6"
                />
              </div>

              <div id="citadel-economy" className="scroll-mt-8">
                <h3 className="text-2xl font-semibold mb-6 text-foreground">Citadel Economy</h3>
                <div className="grid md:grid-cols-2 gap-6">
                  <FeatureCard
                    title="Contribution-Based Rewards"
                    description="Members are rewarded based on their contributions to Citadel projects and community development."
                  />
                  <FeatureCard
                    title="Resource Sharing"
                    description="Citadels pool resources from member Houses to fund major initiatives and infrastructure development."
                  />
                  <FeatureCard
                    title="Cross-House Commerce"
                    description="Facilitate trade and collaboration between Houses, creating value through specialization and exchange."
                  />
                  <FeatureCard
                    title="Sustainable Growth"
                    description="Economic models designed to ensure long-term viability and continuous expansion of opportunities."
                  />
                </div>
              </div>
            </ContentSection>

            {/* FAQ */}
            <ContentSection id="faq" title="Frequently Asked Questions">
              <FAQ items={faqItems} />
            </ContentSection>
          </main>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default About;