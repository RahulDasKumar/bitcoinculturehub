import React, { useEffect, useState } from 'react';
import SectionHeader from './ui/SectionHeader';
import { Bookmark, Award, Zap, Calendar, Flag } from 'lucide-react';
import { BitcoinHomebaseAPI } from './api';
import { TimelineItem } from './types';
import Loader from './ui/Loader';
import ComingSoonOverlay from './CommingSoonOverlay';

const ArchiveSection: React.FC = () => {
  const [archive, setArchive] = useState<TimelineItem[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await BitcoinHomebaseAPI.getArchive();
        setArchive(data);
      } catch (error) {
        console.error("Failed to fetch archive", error);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  if (loading) return <section className="mb-12"><Loader /></section>;

  return (
    <ComingSoonOverlay active={true} bannerRotation="rotate-[-2deg]">

    <section className="mb-12">
      <SectionHeader 
        icon={Bookmark} 
        title="Archive & Memory"
        subtitle="Your Bitcoin journey, preserved."
      />

      <div>
        <h3 className="font-header text-xl font-bold mb-4 border-b border-black inline-block">2024</h3>
        
        <div className="relative pl-4 border-l-2 border-black space-y-4">
          {archive.map((item) => (
            <div key={item.id} className="relative pl-6">
              {/* Timeline dot/marker */}
              <div className="absolute -left-[25px] top-4 w-4 h-4 bg-black flex items-center justify-center">
                 {/* Optional inner detail */}
                 <div className="w-1 h-1 bg-white"></div>
              </div>

              <div className="border border-black p-4 bg-white flex justify-between items-center hover:bg-gray-50 transition-colors group">
                <div className="flex items-center gap-4">
                  <div className={`w-10 h-10 flex items-center justify-center border border-gray-200 rounded-sm
                    ${item.type === 'event' ? 'bg-blue-50 text-blue-600' : 
                      item.type === 'proof' ? 'bg-purple-50 text-purple-600' :
                      item.type === 'achievement' ? 'bg-orange-50 text-orange-600' : 'bg-green-50 text-green-600'
                    }
                  `}>
                    {item.type === 'event' && <Calendar className="w-5 h-5" />}
                    {item.type === 'proof' && <Flag className="w-5 h-5" />}
                    {item.type === 'achievement' && <Award className="w-5 h-5" />}
                    {item.type === 'milestone' && <Zap className="w-5 h-5" />}
                  </div>
                  <div>
                    <h4 className="font-bold text-sm">{item.title}</h4>
                    {item.subtitle && <p className="text-xs text-gray-500 mt-0.5">{item.subtitle}</p>}
                  </div>
                </div>
                <span className="text-[10px] font-bold text-gray-500 uppercase">{item.date}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
    </ComingSoonOverlay>
  );
};

export default ArchiveSection;