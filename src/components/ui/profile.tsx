import * as React from "react";
import Header from "../Header";

const Profile: React.FC = () => {
  return (
    <div className="min-h-screen w-full bg-black text-white flex flex-col">
      {/* Header */}
      <Header variant="black" />

      <main className="flex-1 max-w-6xl mx-auto px-4 py-10 space-y-10">
        {/* User Info */}
        <section className="text-center space-y-4">
          <div className="w-24 h-24 mx-auto rounded-full bg-zinc-800 flex items-center justify-center text-3xl font-bold">
            U
          </div>
          <h1 className="text-4xl font-bold">
            Welcome back, <span className="text-orange-500">Bitcoiner</span>.
          </h1>
          <p className="text-zinc-400">You're the Keeper of Bitcoin's Legacy</p>
        </section>

        {/* Archetype */}
        <section className="bg-zinc-900 rounded-xl p-6 shadow ring-1 ring-zinc-800">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-bold">The Historian</h2>
            <div className="w-10 h-10 rounded-full bg-orange-600 flex items-center justify-center font-bold">
              P
            </div>
          </div>
          <p className="text-zinc-400 mb-4">
            You are drawn to Bitcoin's rich history and love preserving its cultural legacy.
            From Satoshi's original writings to the evolution of the community,
            you see Bitcoin as a living document of human innovation.
          </p>
          <div className="flex flex-wrap gap-2">
            <span className="bg-orange-600/20 text-orange-400 text-xs px-3 py-1 rounded-full">
              Preservation-focused
            </span>
            <span className="bg-orange-600/20 text-orange-400 text-xs px-3 py-1 rounded-full">
              Detail-oriented
            </span>
            <span className="bg-orange-600/20 text-orange-400 text-xs px-3 py-1 rounded-full">
              Knowledge seeker
            </span>
          </div>
        </section>

        {/* Contribute Section */}
        <section className="bg-zinc-900 rounded-xl p-6 shadow ring-1 ring-zinc-800">
          <h2 className="text-xl font-bold mb-6">Contribute to Bitcoin Culture</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {["Creator", "Artifact", "Meme", "Community", "Event"].map((item) => (
              <div key={item} className="bg-zinc-800 p-4 rounded-lg flex flex-col justify-between">
                <div>
                  <h3 className="text-lg font-semibold mb-2">{item}</h3>
                  <p className="text-sm text-zinc-400">
                    {item === "Creator" && "Showcase a Bitcoin artist or creator."}
                    {item === "Artifact" && "Submit a notable object or work."}
                    {item === "Meme" && "Add the memes shaping the culture."}
                    {item === "Community" && "Highlight a group, club, or collective."}
                    {item === "Event" && "Share an event past or future."}
                  </p>
                </div>
                <button className="mt-4 bg-orange-600 hover:bg-orange-700 px-4 py-2 rounded-md text-white font-medium">
                  Start
                </button>
              </div>
            ))}
          </div>
        </section>

        {/* Learning Journey */}
        <section className="bg-zinc-900 rounded-xl p-6 shadow ring-1 ring-zinc-800">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-bold">Your Learning Journey</h2>
            <span className="text-xs text-orange-400">1/5 Completed</span>
          </div>
          <div className="w-full bg-zinc-800 h-2 rounded-full mb-6">
            <div className="bg-orange-600 h-2 rounded-full w-1/5"></div>
          </div>
          <ul className="space-y-4">
            <li className="flex items-center justify-between">
              <span>✅ Created Your Account</span>
              <span className="text-xs text-zinc-500">Done</span>
            </li>
            <li className="flex items-center justify-between">
              <span>Identified Archetype</span>
              <span className="text-xs text-zinc-500">Coming Soon</span>
            </li>
            <li className="flex items-center justify-between">
              <span>Bookmarked First Artifact</span>
              <span className="text-xs text-zinc-500">Coming Soon</span>
            </li>
            <li className="flex items-center justify-between">
              <span>Accessed First Community</span>
              <span className="text-xs text-zinc-500">Coming Soon</span>
            </li>
            <li className="flex items-center justify-between">
              <span>Contributed to the Canon</span>
              <span className="text-xs text-zinc-500">Coming Soon</span>
            </li>
          </ul>
        </section>

        {/* Bookmarks (Scrollable) */}
        <section className="bg-zinc-900 rounded-xl p-6 shadow ring-1 ring-zinc-800">
          <h2 className="text-xl font-bold mb-4">Your Bookmarks</h2>
          <div className="max-h-60 overflow-y-auto space-y-3 pr-2">
            {Array.from({ length: 10 }).map((_, idx) => (
              <div
                key={idx}
                className="p-3 bg-zinc-800 rounded-md flex justify-between items-center"
              >
                <span className="text-zinc-300">Artifact {idx + 1}</span>
                <span className="text-xs text-zinc-500">Saved 9/4/2025</span>
              </div>
            ))}
          </div>
        </section>

        {/* Settings */}
        <section className="bg-zinc-900 rounded-xl p-6 shadow ring-1 ring-zinc-800">
          <h2 className="text-xl font-bold mb-4">Settings & Preferences</h2>
          <ul className="space-y-4">
            <li className="flex justify-between items-center">
              <span>Email: <span className="text-zinc-400">chanduswamy06@gmail.com</span></span>
              <span className="text-zinc-500">🔒</span>
            </li>
            <li className="flex justify-between items-center">
              <span>Lightning Address</span>
              <button className="text-orange-500">Add</button>
            </li>
            <li className="flex justify-between items-center">
              <span>Notifications</span>
              <span className="text-zinc-500">Coming Soon</span>
            </li>
            <li className="flex justify-between items-center text-red-500 font-medium">
              <button>Log Out</button>
            </li>
          </ul>
          <p className="mt-6 text-xs text-zinc-500">
            Coming Soon: Advanced preferences, content filters, and Lightning integration.
          </p>
        </section>
      </main>
    </div>
  );
};

export default Profile;
