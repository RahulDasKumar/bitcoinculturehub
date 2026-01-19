
import React from 'react';

interface AdminHeaderProps {
  totalMembers: number;
  pendingInvites: number;
  activeOpportunities: number;
  newGrowth: string;
}

const AdminHeader: React.FC<AdminHeaderProps> = ({ totalMembers, pendingInvites, activeOpportunities, newGrowth }) => {
  // We've moved stats to the TopNav or local section headers to keep the clean "Match" aesthetic.
  // This component is currently optional or can be used for global KPI display.
  return null;
};

export default AdminHeader;
