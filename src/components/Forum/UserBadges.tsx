import { Badge } from '@/components/ui/badge';
import { User } from '@/types/forum';
import { Shield, Zap, Wrench, Star, Crown, Award } from 'lucide-react';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/components/ui/tooltip';

interface UserBadgesProps {
  user: User;
  showRole?: boolean;
  size?: 'sm' | 'default';
}

const roleIcons = {
  admin: Crown,
  moderator: Shield,
  builder: Wrench,
  user: null,
};

const roleColors = {
  admin: 'bg-bitcoin-orange/10 text-bitcoin-orange border-bitcoin-orange/20',
  moderator: 'bg-primary/10 text-primary border-primary/20',
  builder: 'bg-accent/10 text-accent-foreground border-accent/20',
  user: '',
};

const badgeDescriptions: Record<string, string> = {
  'OG': 'Original Gangster - Been here since the early days',
  'Builder': 'Actively building on Bitcoin',
  'Legend': 'Legendary contributor to the ecosystem',
  'Lightning Dev': 'Lightning Network developer',
  'Early Adopter': 'Early Bitcoin adopter',
  'Hodler': 'Diamond hands holder',
  'Core Contributor': 'Bitcoin Core contributor',
  'BIP Author': 'Authored a Bitcoin Improvement Proposal',
  'Mining Expert': 'Expert in Bitcoin mining',
  'Educator': 'Teaching others about Bitcoin',
};

export const UserBadges = ({ user, showRole = false, size = 'sm' }: UserBadgesProps) => {
  const RoleIcon = roleIcons[user.role];
  const sizeClasses = size === 'sm' ? 'text-xs py-0 px-2 h-4' : 'text-sm py-1 px-3 h-6';

  return (
    <TooltipProvider>
      <div className="flex items-center gap-1 flex-wrap">
        {showRole && user.role !== 'user' && (
          <Tooltip>
            <TooltipTrigger asChild>
              <Badge 
                variant="secondary" 
                className={`${roleColors[user.role]} ${sizeClasses} flex items-center gap-1`}
              >
                {RoleIcon && <RoleIcon className="h-3 w-3" />}
                {user.role.charAt(0).toUpperCase() + user.role.slice(1)}
              </Badge>
            </TooltipTrigger>
            <TooltipContent>
              <p>Role: {user.role.charAt(0).toUpperCase() + user.role.slice(1)}</p>
            </TooltipContent>
          </Tooltip>
        )}
        
        {user.badges.map((badge) => (
          <Tooltip key={badge}>
            <TooltipTrigger asChild>
              <Badge 
                variant="secondary" 
                className={`${sizeClasses} bg-muted/50 hover:bg-muted transition-colors cursor-help`}
              >
                {badge === 'OG' && '👑'}
                {badge === 'Builder' && '🔨'}
                {badge === 'Legend' && '⭐'}
                {badge === 'Lightning Dev' && '⚡'}
                {badge === 'Early Adopter' && '🌅'}
                {badge === 'Hodler' && '💎'}
                {badge === 'Core Contributor' && '🏗️'}
                {badge === 'BIP Author' && '📜'}
                {badge === 'Mining Expert' && '⛏️'}
                {badge === 'Educator' && '📚'}
                {!['OG', 'Builder', 'Legend', 'Lightning Dev', 'Early Adopter', 'Hodler', 
                    'Core Contributor', 'BIP Author', 'Mining Expert', 'Educator'].includes(badge) && badge}
              </Badge>
            </TooltipTrigger>
            <TooltipContent>
              <p className="font-semibold">{badge}</p>
              {badgeDescriptions[badge] && (
                <p className="text-xs text-muted-foreground">{badgeDescriptions[badge]}</p>
              )}
            </TooltipContent>
          </Tooltip>
        ))}

        {user.streak && user.streak > 7 && (
          <Tooltip>
            <TooltipTrigger asChild>
              <Badge 
                variant="secondary" 
                className={`${sizeClasses} bg-bitcoin-orange/10 text-bitcoin-orange border-bitcoin-orange/20 flex items-center gap-1`}
              >
                🔥 {user.streak}
              </Badge>
            </TooltipTrigger>
            <TooltipContent>
              <p>{user.streak} day activity streak</p>
            </TooltipContent>
          </Tooltip>
        )}
      </div>
    </TooltipProvider>
  );
};
