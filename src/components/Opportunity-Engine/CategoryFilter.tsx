import { useState } from "react";
import { Button } from "@/components/ui/button";

const categories = ["All", "Jobs", "Internships", "Volunteer"];

export const CategoryFilter = () => {
  const [selected, setSelected] = useState("All");
  
  return (
    <div className="flex gap-2 flex-wrap">
      {categories.map((category) => (
        <Button
          key={category}
          variant={selected === category ? "default" : "outline"}
          onClick={() => setSelected(category)}
          className={selected === category ? "bg-primary text-primary-foreground" : ""}
        >
          {category}
        </Button>
      ))}
    </div>
  );
};
