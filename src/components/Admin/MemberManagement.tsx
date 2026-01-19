import React, { useState, useMemo, useEffect } from 'react';
import { UserRole } from './types';
import { Organization } from '../types';
import { useOrganizationStore } from '@/hooks/use-organization';
import { useUserStore } from '@/hooks/use-users';
import { ProfileInformation } from '../types';

interface MemberManagementProps {
  org: Organization;
}

type SortKey = 'name' | 'role' | 'orgJoinedDate';

const MemberManagement: React.FC<MemberManagementProps> = ({ org }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedUser, setSelectedUser] = useState<ProfileInformation | null>(null);
  const [selectedRole, setSelectedRole] = useState<UserRole>(UserRole.MEMBER);
  const [sortConfig, setSortConfig] = useState<{ key: SortKey; direction: 'asc' | 'desc' }>({
    key: 'name',
    direction: 'asc',
  });

  // Zustand stores
  const { fetchOrganizationMembers, organizatonMembers, addOrganizationMember, removeOrganizationMember } =
    useOrganizationStore();
  const { globalUsers, fetchGlobalUsers } = useUserStore();

  // Fetch members and global users on mount
  useEffect(() => {
    fetchOrganizationMembers(org.id);
    fetchGlobalUsers();
  }, [org.id, fetchOrganizationMembers, fetchGlobalUsers]);

  // Search results from global user database
  const searchResults = useMemo(() => {
    const query = searchQuery.toLowerCase().trim();
    if (!query) return [];
    return globalUsers
      .filter(
        (user) =>
          user.username.toLowerCase().includes(query) ||
          user.email?.toLowerCase().includes(query) // safe optional chaining
      )
      .slice(0, 5);
  }, [searchQuery, globalUsers]);

  // Select a user from search results
  const handleSelectFromSearch = (user: ProfileInformation) => {
    setSelectedUser(user);
    setSearchQuery(user.username);
  };

  // Add member to organization
  const handleAddMember = () => {
    if (selectedUser) {
      console.log(org.id, selectedUser.id, selectedRole)
      addOrganizationMember(org.id, selectedUser.user_id, selectedRole);
      setSelectedUser(null);
      setSearchQuery('');
    }
  };

  // Remove member from organization
  const handleRemoveMember = (memberId: string) => {
    removeOrganizationMember(org.id, memberId);
  };

  // Sorting
  const handleSort = (key: SortKey) => {
    setSortConfig((prev) => ({
      key,
      direction: prev.key === key && prev.direction === 'asc' ? 'desc' : 'asc',
    }));
  };

  const sortedMembers = useMemo(() => {
    const sorted = [...organizatonMembers];
    sorted.sort((a, b) => {
      const valA = ((a[sortConfig.key as keyof typeof a] as string) || '').toLowerCase();
      const valB = ((b[sortConfig.key as keyof typeof b] as string) || '').toLowerCase();
      if (valA < valB) return sortConfig.direction === 'asc' ? -1 : 1;
      if (valA > valB) return sortConfig.direction === 'asc' ? 1 : -1;
      return 0;
    });
    return sorted;
  }, [organizatonMembers, sortConfig]);
  console.log(sortedMembers)
  const SortIcon = ({ field }: { field: SortKey }) => {
    if (sortConfig.key !== field) return <span className="ml-1 opacity-20">↕</span>;
    return <span className="ml-1">{sortConfig.direction === 'asc' ? '↑' : '↓'}</span>;
  };
  return (
    <div className="space-y-10">
      {/* SEARCH / ADD MEMBER */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 border-b-2 border-gray-100 pb-8">
        <div className="flex-1">
          <h3 className="text-lg font-black text-black uppercase tracking-tight">
            Onboard Talent to {org.name}
          </h3>
          <p className="text-[9px] text-gray-400 font-bold uppercase tracking-widest mt-0.5 mb-4">
            Add verified builders to this specific organization
          </p>

          <div className="flex flex-col sm:flex-row gap-3 relative">
            <div className="relative flex-1 group">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <svg
                  className="h-4 w-4 text-gray-400"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
              </div>
              <input
                type="text"
                placeholder="SEARCH USER DATABASE..."
                className={`block w-full bg-transparent border-2 border-black pl-10 pr-4 py-2 text-xs font-black focus:outline-none focus:bg-gray-50 uppercase tracking-wider transition-all ${selectedUser ? 'border-orange-500 bg-orange-50' : ''
                  }`}
                value={searchQuery}
                onChange={(e) => {
                  setSearchQuery(e.target.value);
                  if (selectedUser) setSelectedUser(null);
                }}
              />
              {searchQuery && !selectedUser && (
                <div className="absolute top-full left-0 right-0 mt-1 bg-white border-2 border-black z-50 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]">
                  {searchResults.length > 0 ? (
                    <div className="divide-y-2 divide-gray-100">
                      {searchResults.map((user) => (
                        <button
                          key={user.id}
                          onClick={() => handleSelectFromSearch(user)}
                          className="w-full p-3 flex items-center space-x-3 hover:bg-black hover:text-white transition-colors group"
                        >
                          <div className="w-8 h-8 bg-gray-100 border border-black flex items-center justify-center font-black text-xs text-black group-hover:bg-white">
                            {user.username.charAt(0)}
                          </div>
                          <div className="text-left">
                            <p className="text-[10px] font-black uppercase tracking-tight leading-none mb-0.5">
                              {user.username}
                            </p>
                            <p className="text-[8px] font-bold opacity-60 uppercase">{user.email ?? ''}</p>
                          </div>
                        </button>
                      ))}
                    </div>
                  ) : (
                    <div className="p-4 text-center text-[10px] font-black text-gray-400 uppercase tracking-widest">
                      No matching records
                    </div>
                  )}
                </div>
              )}
            </div>

            <div className="flex gap-3">
              <select
                className="bg-white text-black px-4 py-2 text-xs font-black appearance-none cursor-pointer uppercase tracking-widest border-2 border-black focus:outline-none min-w-[120px]"
                value={selectedRole}
                onChange={(e) => setSelectedRole(e.target.value as UserRole)}
              >
                {Object.values(UserRole).map((role) => (
                  <option key={role} value={role}>
                    {role}
                  </option>
                ))}
              </select>

              <button
                disabled={!selectedUser}
                onClick={handleAddMember}
                className={`px-8 py-2 text-xs font-black uppercase tracking-widest transition-all ${selectedUser
                    ? 'bg-black text-white hover:bg-[#F7931A] shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:translate-x-[-2px] hover:translate-y-[-2px] hover:shadow-[6px_6px_0px_0px_rgba(0,0,0,1)]'
                    : 'bg-gray-100 text-gray-400 border-2 border-gray-200 cursor-not-allowed'
                  }`}
              >
                ADD MEMBER
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* ORGANIZATION DIRECTORY */}
      <div>
        <div className="mb-6 flex items-center justify-between">
          <div>
            <h2 className="text-xl font-black text-black tracking-tight uppercase">ORGANIZATION DIRECTORY</h2>
            <p className="text-[10px] text-gray-400 font-bold uppercase tracking-widest mt-1">
              CURRENT VERIFIED MEMBERS
            </p>
          </div>
          <div className="text-[10px] font-black text-black border-2 border-black px-3 py-1 uppercase tracking-widest">
            {organizatonMembers.length} ACTIVE
          </div>
        </div>

        <div className="grid grid-cols-1 border-2 border-black overflow-hidden">
          {/* Header */}
          <div className="bg-black text-white p-5 grid grid-cols-[1.5fr_1fr_1.5fr_1fr_0.5fr] items-center gap-4 text-[10px] font-black uppercase tracking-widest">
            <button
              onClick={() => handleSort('name')}
              className="text-left flex items-center hover:text-orange-400 transition-colors"
            >
              Member Identity <SortIcon field="name" />
            </button>
            <div className="text-center">STATUS</div>
            <button
              onClick={() => handleSort('role')}
              className="text-center flex items-center justify-center hover:text-orange-400 transition-colors"
            >
              Protocol Role <SortIcon field="role" />
            </button>
            <button
              onClick={() => handleSort('orgJoinedDate')}
              className="text-center flex items-center justify-center hover:text-orange-400 transition-colors"
            >
              Joined <SortIcon field="orgJoinedDate" />
            </button>
            <div className="text-right pr-2">OP</div>
          </div>

          {/* Table Rows */}
          <div className="bg-white divide-y-2 divide-gray-100">
            {sortedMembers.map((member) => (
              <div
                key={member.id}
                className="p-6 grid grid-cols-[1.5fr_1fr_1.5fr_1fr_0.5fr] items-center gap-4 group hover:bg-gray-50 transition-colors"
              >
                <div className="flex items-center space-x-6">
                  <div className="w-14 h-14 bg-white border-2 border-black flex items-center justify-center font-black text-xl text-black">
                    {member.username?.charAt(0)}
                  </div>
                  <div>
                    <h4 className="font-black text-black text-md leading-none uppercase tracking-tight">
                      {member.username ?? ''}
                    </h4>
                    <p className="text-[9px] text-gray-400 font-bold mt-1 uppercase tracking-tighter">{member.email ?? ''}</p>
                  </div>
                </div>

                <div className="flex justify-center">
                  <div className="bg-white text-green-500 text-[9px] font-black px-3 py-1 uppercase tracking-tighter border-2 border-green-100">
                    VERIFIED
                  </div>
                </div>

                <div className="text-right">
                  <button
                    onClick={() => handleRemoveMember(member.id)}
                    className="text-gray-200 hover:text-red-500 transition-colors p-2"
                  >
                    <svg
                      className="w-5 h-5"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2.5"
                        d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                      />
                    </svg>
                  </button>
                </div>
              </div>
            ))}

            {organizatonMembers.length === 0 && (
              <div className="py-20 text-center text-gray-300 font-black text-[10px] uppercase tracking-[0.5em]">
                Registry Empty for this Protocol
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default MemberManagement;
