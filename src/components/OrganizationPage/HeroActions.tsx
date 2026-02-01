import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import gsap from 'gsap';
import ScrollToPlugin from 'gsap/src/ScrollToPlugin';
import useAuthStore from '@/hooks/use-auth';
import { Organization } from '../types';
import { API_URL } from '@/config';

const devurl = 'http://127.0.0.1:8000';

interface HeroActionsProps {
  organization: Organization;
}

const HeroActions: React.FC<HeroActionsProps> = ({ organization }) => {
  gsap.registerPlugin(ScrollToPlugin);

  const { user, token } = useAuthStore();
  const nav = useNavigate();

  const [canEdit, setCanEdit] = useState(false);
  
  // Check with backend if user is owner
  const checkIsOrgOwner = async (orgId: string, token?: string): Promise<boolean> => {
    if (!token) return false; 

    try {
      const res = await fetch(`${API_URL}/org/${orgId}/is-owner`, {
        method: 'GET',
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      console.log(orgId)
      if (!res.ok) return false;
      const data = await res.json();
      return data.is_owner === true;
    } catch {
      return false;
    }
  };

  // Fetch ownership status when component mounts or when user/token changes
  useEffect(() => {
    const fetchOwnerStatus = async () => {
      if (token && organization?.id) {
        const isOwner = await checkIsOrgOwner(organization.id, token);
        console.log(organization, user.id)
        setCanEdit(isOwner);
      } else {
        setCanEdit(false); // Not logged in or no token
      }
    };
    fetchOwnerStatus();
  }, [token, organization]);

  const handleClick = () => {
    gsap.to(window, {
      duration: 1.4,
      scrollTo: '#programs',
      ease: 'power3.inOut',
    });
  };

  return (
    <div className="flex flex-wrap gap-4 mt-10">
      <button className="bg-[#f7931a] hover:bg-[#e88a18] text-white px-8 py-3.5 font-bold rounded-sm text-sm uppercase tracking-wide flex items-center transition-all shadow-sm">
        Join the Network
        <span className="ml-2">→</span>
      </button>

      <button
        className="bg-white border-2 border-black hover:bg-gray-50 text-black px-8 py-3.5 font-bold rounded-sm text-sm uppercase tracking-wide transition-all"
        onClick={handleClick}
      >
        View Opportunities
      </button>

      <button className="bg-white border-2 border-black hover:bg-gray-50 text-black px-8 py-3.5 font-bold rounded-sm text-sm uppercase tracking-wide transition-all">
        Explore Events
      </button>

      {canEdit && (
        <button
          className="bg-black hover:bg-gray-800 text-white px-8 py-3.5 font-bold rounded-sm text-sm uppercase tracking-wide transition-all w-full sm:w-auto mt-4 sm:mt-0"
          onClick={() => nav(`/org-dash/${organization.id}`)}
        >
          Manage Your Org
        </button>
      )}

    </div>
  );
};

export default HeroActions;
