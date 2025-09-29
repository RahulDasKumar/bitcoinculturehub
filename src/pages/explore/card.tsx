import UniversalCard  from "../../components/UniversalCard";
import { ExploreItem } from "./data";

interface ExploreCardProps {
  item: ExploreItem;
  onClick: () => void;
}

const ExploreCard = ({ item, onClick }: ExploreCardProps) => {
  return (
    <UniversalCard 
      item={item} 
      onClick={onClick} 
      variant="explore"
    />
  );
};

export default ExploreCard;