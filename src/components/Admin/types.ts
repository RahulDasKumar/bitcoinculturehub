
export enum UserRole {
  OWNER = 'owner',
  VP = 'VP',
  ADMIN = 'admin',
  MEMBER = 'member',
  CONTRIBUTOR = 'contributor'
}

export interface User {
  id: string;
  username: string;
  email: string;
  avatar: string;
  joinedDate: string;
  status: 'active' | 'pending' | 'inactive';
}

export interface OrgMember extends User {
  role: UserRole;
  orgJoinedDate: string;
}

export interface Organization {
  id: string;
  name: string;
  members: OrgMember[];
}

export interface Stats {
  totalMembers: number;
  activeOpportunities: number;
  pendingInvites: number;
  newGrowth: string;
}
