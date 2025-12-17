import { Badge } from "@/components/ui/badge";
import { X } from "lucide-react";

interface ActiveFilterChipsProps {
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
  onRemoveType: (type: string) => void;
  onRemoveLocation: (location: string) => void;
  onRemoveTimeCommit: (time: string) => void;
  onRemoveCompensation: (comp: string) => void;
  onRemoveSkill: (skill: string) => void;
  onRemoveExperience: (exp: string) => void;
  onRemovePersona: (persona: string) => void;
  onRemoveOrgType: (org: string) => void;
  onToggleVerified: () => void;
  onToggleStarterPath: () => void;
  onClearAll: () => void;
}

const filterLabels: Record<string, string> = {
  // Types
  volunteer: "Volunteer",
  creator_collab: "Creator Collab",
  speaking: "Speaking",
  street_team: "Street Team",
  design: "Design",
  ops: "Ops",
  content: "Content",
  product: "Product",
  engineering: "Engineering",
  campus: "Campus",
  internship: "Internship",
  // Locations
  remote: "Remote",
  "in-person": "In-Person",
  hybrid: "Hybrid",
  // Time
  "1-3h": "1–3 hrs",
  "4-10h": "4–10 hrs",
  "one-off": "One-off",
  weekend: "Weekend",
  ongoing: "Ongoing",
  // Compensation
  paid: "Paid",
  expenses: "Expenses",
  perks: "Perks",
  // Skills
  video: "Video",
  growth: "Growth",
  community: "Community",
  technical: "Technical",
  mining: "Mining",
  education: "Education",
  partnerships: "Partnerships",
  // Experience
  beginner: "Beginner-friendly",
  intermediate: "Intermediate",
  advanced: "Advanced",
  // Persona
  students: "Students",
  creators: "Creators",
  developers: "Developers",
  organizers: "Organizers",
  professionals: "Professionals",
  // Org types
  conference: "Conference",
  media: "Media",
  nonprofit: "Nonprofit",
  company: "Company",
  meetup: "Meetup",
  creator: "Creator",
};

export const ActiveFilterChips = ({
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
  onRemoveType,
  onRemoveLocation,
  onRemoveTimeCommit,
  onRemoveCompensation,
  onRemoveSkill,
  onRemoveExperience,
  onRemovePersona,
  onRemoveOrgType,
  onToggleVerified,
  onToggleStarterPath,
  onClearAll,
}: ActiveFilterChipsProps) => {
  const totalFilters =
    selectedTypes.length +
    selectedLocations.length +
    selectedTimeCommit.length +
    selectedCompensation.length +
    selectedSkills.length +
    selectedExperience.length +
    selectedPersona.length +
    selectedOrgType.length +
    (verifiedOnly ? 1 : 0) +
    (starterPathRequired ? 1 : 0);

  if (totalFilters === 0) return null;

  return (
    <div className="flex items-center gap-2 flex-wrap py-2">
      <span className="text-sm text-muted-foreground">Active filters:</span>
      
      {selectedTypes.map(type => (
        <Badge key={type} variant="secondary" className="gap-1">
          {filterLabels[type] || type}
          <button onClick={() => onRemoveType(type)} className="ml-1 hover:text-destructive">
            <X className="w-3 h-3" />
          </button>
        </Badge>
      ))}

      {selectedLocations.map(loc => (
        <Badge key={loc} variant="secondary" className="gap-1">
          {filterLabels[loc] || loc}
          <button onClick={() => onRemoveLocation(loc)} className="ml-1 hover:text-destructive">
            <X className="w-3 h-3" />
          </button>
        </Badge>
      ))}

      {selectedTimeCommit.map(time => (
        <Badge key={time} variant="secondary" className="gap-1">
          {filterLabels[time] || time}
          <button onClick={() => onRemoveTimeCommit(time)} className="ml-1 hover:text-destructive">
            <X className="w-3 h-3" />
          </button>
        </Badge>
      ))}

      {selectedCompensation.map(comp => (
        <Badge key={comp} variant="secondary" className="gap-1">
          {filterLabels[comp] || comp}
          <button onClick={() => onRemoveCompensation(comp)} className="ml-1 hover:text-destructive">
            <X className="w-3 h-3" />
          </button>
        </Badge>
      ))}

      {selectedSkills.map(skill => (
        <Badge key={skill} variant="secondary" className="gap-1">
          {filterLabels[skill] || skill}
          <button onClick={() => onRemoveSkill(skill)} className="ml-1 hover:text-destructive">
            <X className="w-3 h-3" />
          </button>
        </Badge>
      ))}

      {selectedExperience.map(exp => (
        <Badge key={exp} variant="secondary" className="gap-1">
          {filterLabels[exp] || exp}
          <button onClick={() => onRemoveExperience(exp)} className="ml-1 hover:text-destructive">
            <X className="w-3 h-3" />
          </button>
        </Badge>
      ))}

      {selectedPersona.map(persona => (
        <Badge key={persona} variant="secondary" className="gap-1">
          {filterLabels[persona] || persona}
          <button onClick={() => onRemovePersona(persona)} className="ml-1 hover:text-destructive">
            <X className="w-3 h-3" />
          </button>
        </Badge>
      ))}

      {selectedOrgType.map(org => (
        <Badge key={org} variant="secondary" className="gap-1">
          {filterLabels[org] || org}
          <button onClick={() => onRemoveOrgType(org)} className="ml-1 hover:text-destructive">
            <X className="w-3 h-3" />
          </button>
        </Badge>
      ))}

      {verifiedOnly && (
        <Badge variant="secondary" className="gap-1">
          Verified only
          <button onClick={onToggleVerified} className="ml-1 hover:text-destructive">
            <X className="w-3 h-3" />
          </button>
        </Badge>
      )}

      {starterPathRequired && (
        <Badge variant="secondary" className="gap-1">
          Starter Path required
          <button onClick={onToggleStarterPath} className="ml-1 hover:text-destructive">
            <X className="w-3 h-3" />
          </button>
        </Badge>
      )}

      <button
        onClick={onClearAll}
        className="text-sm text-primary hover:underline ml-2"
      >
        Clear all
      </button>
    </div>
  );
};
