import React, { useEffect, useState } from 'react';
import SectionHeader from './ui/SectionHeader';
import { BookOpen, ArrowRight, User } from 'lucide-react';
import { BitcoinHomebaseAPI } from './api';
import { Article } from './types';
import Loader from './ui/Loader';
import ComingSoonOverlay from './CommingSoonOverlay';

const ExploreSection: React.FC = () => {
  const [articles, setArticles] = useState<Article[]>([]);
  const [following, setFollowing] = useState<any[]>([]);
  const [topics, setTopics] = useState<string[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [articlesData, followingData, topicsData] = await Promise.all([
          BitcoinHomebaseAPI.getArticles(),
          BitcoinHomebaseAPI.getFollowing(),
          BitcoinHomebaseAPI.getTopics()
        ]);
        setArticles(articlesData);
        setFollowing(followingData);
        setTopics(topicsData);
      } catch (error) {
        console.error("Failed to fetch explore data", error);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  if (loading) return <section className="mb-12"><Loader /></section>;

  return <>
    <ComingSoonOverlay active={true} bannerRotation="rotate-[-2deg]">
    <section className="mb-12">
      <SectionHeader 
        icon={BookOpen} 
        title="My Explore"
        rightElement={
          <button className="flex items-center gap-2 border border-black px-4 py-1.5 text-xs font-bold uppercase hover:bg-black hover:text-white transition-colors">
            Browse Explore <ArrowRight className="w-3 h-3" />
          </button>
        }
      />

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left Col: Reading List */}
        <div className="lg:col-span-2 border border-black p-6 bg-white">
          <div className="flex items-center gap-2 mb-6">
             <span className="text-bitcoin"><BookOpen className="w-4 h-4" /></span>
             <h3 className="font-header font-bold uppercase text-sm">Continue Reading</h3>
          </div>
          
          <div className="space-y-6">
            {articles.map(article => (
              <div key={article.id} className="group cursor-pointer">
                <div className="flex justify-between items-start mb-2">
                  <div>
                    <h4 className="font-bold text-sm group-hover:text-bitcoin transition-colors">{article.title}</h4>
                    <div className="text-xs text-gray-500 mt-1 flex gap-2">
                      <span>{article.source}</span>
                      <span>•</span>
                      <span>{article.readTime}</span>
                    </div>
                  </div>
                  <ArrowRight className="w-4 h-4 text-gray-300 group-hover:text-black opacity-0 group-hover:opacity-100 transition-all" />
                </div>
                {/* Progress bar */}
                <div className="w-full bg-gray-100 h-1 mt-2">
                  <div 
                    className="bg-bitcoin h-full transition-all duration-500" 
                    style={{ width: `${article.progress}%` }}
                  ></div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Right Col: Following & Topics */}
        <div className="space-y-6">
          {/* Following */}
          <div className="border border-black p-6 bg-bitcoin-light/30">
            <div className="flex items-center gap-2 mb-4">
              <span className="text-bitcoin"><User className="w-4 h-4" /></span>
              <h3 className="font-header font-bold uppercase text-sm">Following</h3>
            </div>
            <div className="space-y-3">
              {following.map((person, idx) => (
                <div key={idx} className="flex items-center gap-3">
                  <img src={person.img} alt={person.name} className="w-8 h-8 rounded-sm bg-gray-300 object-cover border border-black" />
                  <div>
                    <p className="font-bold text-xs leading-none">{person.name}</p>
                    <p className="text-[10px] text-gray-500 leading-none mt-1">{person.handle}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Topics */}
          <div className="border border-black p-6 bg-gray-50">
            <div className="flex items-center gap-2 mb-4">
              <span className="text-bitcoin font-bold">#</span>
              <h3 className="font-header font-bold uppercase text-sm">Topics</h3>
            </div>
            <div className="flex flex-wrap gap-2">
              {topics.map(topic => (
                <span key={topic} className="text-[10px] font-bold uppercase border border-black px-2 py-1 bg-white hover:bg-black hover:text-white cursor-pointer transition-colors rounded-full">
                  {topic}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  </ComingSoonOverlay>
  </>;
};

export default ExploreSection;