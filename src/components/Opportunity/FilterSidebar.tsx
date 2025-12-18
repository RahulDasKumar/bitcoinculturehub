import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Slider } from "@/components/ui/slider";
import { Badge } from "@/components/ui/badge";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";
import { ChevronDown, MapPin, Clock, DollarSign, Sparkles, Building2, Zap } from "lucide-react";
import { cn } from "@/lib/utils";

interface FilterSidebarProps {
  selectedTypes: string[];
  selectedLocations: string[];
  selectedTimeCommit: string[];
  selectedCompensation: string[];
  selectedSkills: string[];
  selectedExperience: string[];
  selectedPersona: string[];
  selectedOrgType: string[];
  verifiedOnly: boolean;
  starterPathRequired: boolean;
  onTypeChange: (types: string[]) => void;
  onLocationChange: (locations: string[]) => void;
  onTimeCommitChange: (times: string[]) => void;
  onCompensationChange: (comp: string[]) => void;
  onSkillsChange: (skills: string[]) => void;
  onExperienceChange: (exp: string[]) => void;
  onPersonaChange: (persona: string[]) => void;
  onOrgTypeChange: (org: string[]) => void;
  onVerifiedChange: (verified: boolean) => void;
  onStarterPathChange: (required: boolean) => void;
}

export const FilterSidebar = ({
  selectedTypes,
  selectedLocations,
  selectedTimeCommit,
  selectedCompensation,
  selectedSkills,
  selectedExperience,
  selectedPersona,
  selectedOrgType,
  verifiedOnly,
  starterPathRequired,
  onTypeChange,
  onLocationChange,
  onTimeCommitChange,
  onCompensationChange,
  onSkillsChange,
  onExperienceChange,
  onPersonaChange,
  onOrgTypeChange,
  onVerifiedChange,
  onStarterPathChange,
}: FilterSidebarProps) => {
  const [basicsOpen, setBasicsOpen] = useState(true);
  const [rewardsOpen, setRewardsOpen] = useState(false);
  const [skillsOpen, setSkillsOpen] = useState(false);
  const [organizerOpen, setOrganizerOpen] = useState(false);
  const [formatOpen, setFormatOpen] = useState(false);

  const toggleFilter = (selected: string[], setter: (val: string[]) => void, value: string) => {
    if (selected.includes(value)) {
      setter(selected.filter(v => v !== value));
    } else {
      setter([...selected, value]);
    }
  };

  const opportunityTypes = [
    { id: "volunteer", label: "Volunteer" },
    { id: "creator_collab", label: "Creator Collab" },
    { id: "speaking", label: "Speaking" },
    { id: "street_team", label: "Street Team" },
    { id: "design", label: "Design" },
    { id: "ops", label: "Ops / Event Ops" },
    { id: "content", label: "Content / Writing" },
    { id: "product", label: "Product / Research" },
    { id: "engineering", label: "Engineering / Technical" },
    { id: "campus", label: "Campus / Student Club" },
    { id: "internship", label: "Internship / Fellowship" },
  ];

  const locationTypes = [
    { id: "remote", label: "Remote" },
    { id: "in-person", label: "In-Person" },
    { id: "hybrid", label: "Hybrid" },
  ];

  const timeCommitments = [
    { id: "full-time", label: "Full Time" },
    { id: "part-time", label: "Part Time" },
    { id: "one-off", label: "One-off" },
    { id: "1-5h", label: "1-5hrs" },
    { id: "5-15h", label: "5-15hrs" },
    { id: "15h-plus", label: "15hrs+" },
  ];

  const compensationTypes = [
    { id: "paid", label: "Paid (sats / fiat)" },
    { id: "volunteer", label: "Volunteer" },
    { id: "expenses", label: "Expenses / Travel" },
    { id: "perks", label: "Perks only" },
  ];

  const skills = [
    { id: "design", label: "Design" },
    { id: "content", label: "Content / Social" },
    { id: "video", label: "Video / Editing" },
    { id: "growth", label: "Growth / Marketing" },
    { id: "community", label: "Community / Events" },
    { id: "technical", label: "Technical / Dev" },
    { id: "mining", label: "Mining / Infra" },
    { id: "education", label: "Education / Teaching" },
    { id: "ops", label: "Ops / Logistics" },
    { id: "partnerships", label: "Partnerships / BD" },
  ];

  const experienceLevels = [
    { id: "beginner", label: "Beginner-friendly" },
    { id: "intermediate", label: "Intermediate" },
    { id: "advanced", label: "Advanced / Expert" },
  ];

  const personas = [
    { id: "students", label: "Students" },
    { id: "creators", label: "Creators / Influencers" },
    { id: "developers", label: "Developers / Engineers" },
    { id: "organizers", label: "Organizers / Meetup Leads" },
    { id: "professionals", label: "Professionals" },
  ];

  const organizerTypes = [
    { id: "conference", label: "Conference / Event" },
    { id: "media", label: "Media / Podcast" },
    { id: "nonprofit", label: "Nonprofit / NGO" },
    { id: "company", label: "Company / Startup" },
    { id: "meetup", label: "Meetup / Local Club" },
    { id: "creator", label: "Individual Creator" },
  ];

  return (
    <div className="w-full max-w-[320px] space-y-4 top-20">
      {/* Basics Section */}
      <Card className="p-4">
        <Collapsible open={basicsOpen} onOpenChange={setBasicsOpen}>
          <CollapsibleTrigger className="flex items-center justify-between w-full group">
            <div className="flex items-center gap-2">
              <Zap className="w-4 h-4 text-primary" />
              <h3 className="font-bold text-sm uppercase tracking-wide">Basics</h3>
            </div>
            <ChevronDown className={cn("w-4 h-4 transition-transform", basicsOpen && "rotate-180")} />
          </CollapsibleTrigger>
          <CollapsibleContent className="pt-4 space-y-4">
            <div>
              <label className="text-xs font-semibold text-muted-foreground mb-2 block">Opportunity Type</label>
              <div className="flex flex-wrap gap-2">
                {opportunityTypes.map(type => (
                  <Badge
                    key={type.id}
                    variant={selectedTypes.includes(type.id) ? "default" : "outline"}
                    className="cursor-pointer"
                    onClick={() => toggleFilter(selectedTypes, onTypeChange, type.id)}
                  >
                    {type.label}
                  </Badge>
                ))}
              </div>
            </div>

            <div>
              <label className="text-xs font-semibold text-muted-foreground mb-2 flex items-center gap-1">
                <MapPin className="w-3 h-3" />
                Location
              </label>
              <div className="flex gap-2">
                {locationTypes.map(loc => (
                  <Button
                    key={loc.id}
                    variant={selectedLocations.includes(loc.id) ? "default" : "outline"}
                    size="sm"
                    onClick={() => toggleFilter(selectedLocations, onLocationChange, loc.id)}
                    className="flex-1"
                  >
                    {loc.label}
                  </Button>
                ))}
              </div>
            </div>

            <div>
              <label className="text-xs font-semibold text-muted-foreground mb-2 flex items-center gap-1">
                <Clock className="w-3 h-3" />
                Time Commitment
              </label>
              <div className="flex flex-wrap gap-2">
                {timeCommitments.map(time => (
                  <Badge
                    key={time.id}
                    variant={selectedTimeCommit.includes(time.id) ? "default" : "outline"}
                    className="cursor-pointer"
                    onClick={() => toggleFilter(selectedTimeCommit, onTimeCommitChange, time.id)}
                  >
                    {time.label}
                  </Badge>
                ))}
              </div>
            </div>

            <p className="text-xs text-muted-foreground italic">
              Filter by type, location, and time to find your next opportunity.
            </p>
          </CollapsibleContent>
        </Collapsible>
      </Card>

      {/* Rewards & Logistics */}
      <Card className="p-4">
        <Collapsible open={rewardsOpen} onOpenChange={setRewardsOpen}>
          <CollapsibleTrigger className="flex items-center justify-between w-full">
            <div className="flex items-center gap-2">
              <DollarSign className="w-4 h-4 text-primary" />
              <h3 className="font-bold text-sm uppercase tracking-wide">Rewards & Logistics</h3>
            </div>
            <ChevronDown className={cn("w-4 h-4 transition-transform", rewardsOpen && "rotate-180")} />
          </CollapsibleTrigger>
          <CollapsibleContent className="pt-4 space-y-4">
            <div>
              <label className="text-xs font-semibold text-muted-foreground mb-2 block">Compensation Type</label>
              <div className="flex flex-wrap gap-2">
                {compensationTypes.map(comp => (
                  <Badge
                    key={comp.id}
                    variant={selectedCompensation.includes(comp.id) ? "default" : "outline"}
                    className="cursor-pointer"
                    onClick={() => toggleFilter(selectedCompensation, onCompensationChange, comp.id)}
                  >
                    {comp.label}
                  </Badge>
                ))}
              </div>
            </div>
          </CollapsibleContent>
        </Collapsible>
      </Card>

      {/* Skills & Fit */}
      <Card className="p-4">
        <Collapsible open={skillsOpen} onOpenChange={setSkillsOpen}>
          <CollapsibleTrigger className="flex items-center justify-between w-full">
            <div className="flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-primary" />
              <h3 className="font-bold text-sm uppercase tracking-wide">Skills & Fit</h3>
            </div>
            <ChevronDown className={cn("w-4 h-4 transition-transform", skillsOpen && "rotate-180")} />
          </CollapsibleTrigger>
          <CollapsibleContent className="pt-4 space-y-4">
            <div>
              <label className="text-xs font-semibold text-muted-foreground mb-2 block">Skills / Category Tags</label>
              <div className="flex flex-wrap gap-2 max-h-32 overflow-y-auto">
                {skills.map(skill => (
                  <Badge
                    key={skill.id}
                    variant={selectedSkills.includes(skill.id) ? "default" : "outline"}
                    className="cursor-pointer"
                    onClick={() => toggleFilter(selectedSkills, onSkillsChange, skill.id)}
                  >
                    {skill.label}
                  </Badge>
                ))}
              </div>
            </div>

            <div>
              <label className="text-xs font-semibold text-muted-foreground mb-2 block">Experience Level</label>
              <div className="flex flex-wrap gap-2">
                {experienceLevels.map(exp => (
                  <Badge
                    key={exp.id}
                    variant={selectedExperience.includes(exp.id) ? "default" : "outline"}
                    className="cursor-pointer"
                    onClick={() => toggleFilter(selectedExperience, onExperienceChange, exp.id)}
                  >
                    {exp.label}
                  </Badge>
                ))}
              </div>
            </div>

            <div>
              <label className="text-xs font-semibold text-muted-foreground mb-2 block">Persona / Audience</label>
              <div className="flex flex-wrap gap-2">
                {personas.map(persona => (
                  <Badge
                    key={persona.id}
                    variant={selectedPersona.includes(persona.id) ? "default" : "outline"}
                    className="cursor-pointer"
                    onClick={() => toggleFilter(selectedPersona, onPersonaChange, persona.id)}
                  >
                    {persona.label}
                  </Badge>
                ))}
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-xs font-semibold text-muted-foreground block">Proof-of-Work Requirements</label>
              <div className="flex items-center gap-2">
                <Checkbox
                  id="starterPath"
                  checked={starterPathRequired}
                  onCheckedChange={onStarterPathChange}
                />
                <label htmlFor="starterPath" className="text-sm cursor-pointer">
                  Starter Path badge required
                </label>
              </div>
            </div>

            <p className="text-xs text-muted-foreground italic">
              Highlight what you're great at to get better matches.
            </p>
          </CollapsibleContent>
        </Collapsible>
      </Card>

      {/* Organizer & Quality */}
      <Card className="p-4">
        <Collapsible open={organizerOpen} onOpenChange={setOrganizerOpen}>
          <CollapsibleTrigger className="flex items-center justify-between w-full">
            <div className="flex items-center gap-2">
              <Building2 className="w-4 h-4 text-primary" />
              <h3 className="font-bold text-sm uppercase tracking-wide">Organizer & Quality</h3>
            </div>
            <ChevronDown className={cn("w-4 h-4 transition-transform", organizerOpen && "rotate-180")} />
          </CollapsibleTrigger>
          <CollapsibleContent className="pt-4 space-y-4">
            <div>
              <label className="text-xs font-semibold text-muted-foreground mb-2 block">Organizer Type</label>
              <div className="flex flex-wrap gap-2">
                {organizerTypes.map(org => (
                  <Badge
                    key={org.id}
                    variant={selectedOrgType.includes(org.id) ? "default" : "outline"}
                    className="cursor-pointer"
                    onClick={() => toggleFilter(selectedOrgType, onOrgTypeChange, org.id)}
                  >
                    {org.label}
                  </Badge>
                ))}
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-xs font-semibold text-muted-foreground block">Trust & Quality</label>
              <div className="flex items-center gap-2">
                <Checkbox
                  id="verified"
                  checked={verifiedOnly}
                  onCheckedChange={onVerifiedChange}
                />
                <label htmlFor="verified" className="text-sm cursor-pointer">
                  Verified organizer only
                </label>
              </div>
            </div>
          </CollapsibleContent>
        </Collapsible>
      </Card>

      <p className="text-xs text-center text-muted-foreground px-4">
        Filters update instantly
      </p>
    </div>
  );
};
