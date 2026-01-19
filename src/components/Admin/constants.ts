
import { User, UserRole, OrgMember, Organization } from './types';

export const GLOBAL_USERS_DATABASE: User[] = [
  { id: '1', username: 'Satoshi Nakamoto', email: 'satoshi@bitcoin.org', avatar: '', joinedDate: '2009-01-03', status: 'active' },
  { id: '2', username: 'Hal Finney', email: 'hal@finney.com', avatar: '', joinedDate: '2009-01-10', status: 'active' },
  { id: '3', username: 'Nick Szabo', email: 'nick@bitgold.com', avatar: '', joinedDate: '2010-05-22', status: 'active' },
  { id: '4', username: 'Andreas Antonopoulos', email: 'andreas@aantonop.com', avatar: '', joinedDate: '2012-08-15', status: 'active' },
  { id: '5', username: 'Jack Dorsey', email: 'jack@square.com', avatar: '', joinedDate: '2015-03-21', status: 'active' },
  { id: '6', username: 'Cathie Wood', email: 'cathie@ark-invest.com', avatar: '', joinedDate: '2018-11-05', status: 'active' },
  { id: '7', username: 'Michael Saylor', email: 'michael@microstrategy.com', avatar: '', joinedDate: '2020-08-11', status: 'active' },
  { id: '8', username: 'Adam Back', email: 'adam@blockstream.com', avatar: '', joinedDate: '2014-10-10', status: 'active' },
  { id: '9', username: 'Elizabeth Stark', email: 'elizabeth@lightning.com', avatar: '', joinedDate: '2016-01-14', status: 'active' },
  { id: '10', username: 'Alex Gladstein', email: 'alex@hrf.org', avatar: '', joinedDate: '2017-06-20', status: 'active' },
];

export const INITIAL_ORGS: Organization[] = [
  {
    id: 'org-1',
    name: 'TEST 2',
    members: [
       { id: '101', username: 'Admin User', email: 'admin@bitcoin.org', avatar: '', joinedDate: '2023-01-01', status: 'active', role: UserRole.OWNER, orgJoinedDate: '2023-01-01' }
    ]
  },
  {
    id: 'org-2',
    name: 'MIDWEST BITCOIN SUMMIT',
    members: []
  },
  {
    id: 'org-3',
    name: 'TEST',
    members: []
  },
  {
    id: 'org-4',
    name: 'BITCOIN CULTURE HUB',
    members: [
       { id: '101', username: 'Admin User', email: 'admin@bitcoinculturehub.com', avatar: '', joinedDate: '2023-01-01', status: 'active', role: UserRole.OWNER, orgJoinedDate: '2023-01-01' },
       { id: '102', username: 'Sarah Jenkins', email: 'sarah@bitcoinculturehub.com', avatar: '', joinedDate: '2023-02-15', status: 'active', role: UserRole.VP, orgJoinedDate: '2023-03-01' },
    ]
  },
  {
    id: 'org-5',
    name: 'BITCOIN EDUCATION INSTITUTE (BEI)',
    members: []
  }
];

export const COLORS = {
  bitcoin: '#F7931A',
  dark: '#000000',
  gray: '#6B7280',
  lightGray: '#F3F4F6',
};
