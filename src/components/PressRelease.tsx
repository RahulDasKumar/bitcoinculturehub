import { Button } from "@/components/ui/button"
import { useNavigate } from "react-router-dom";



export default function PressRelease() {
    const navigate = useNavigate();
  return (
    <section className="bg-white py-20">
      <div className="container mx-auto px-6 flex flex-col lg:flex-row items-center gap-12 border rounded-2xl shadow-sm p-8 lg:p-12">
        
        {/* Left: Text Content */}
        <div className="flex-1 space-y-5">
          <div className="flex items-center gap-3">
            <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth={2}
            strokeLinecap="round"
            strokeLinejoin="round"
            className="w-7 h-7 text-purple-600"
            >
            <path d="M3 19V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
            <path d="M7 8h10M7 12h10M7 16h6" />
            </svg>

            <h2 className="text-2xl font-bold text-gray-900">Press Release</h2>
          </div>

          <p className="text-gray-700 leading-relaxed">
            The Bitcoin Students Network Summit brings together students, educators, 
            and Bitcoin experts from around the world to explore the intersection of 
            academia and Bitcoin technology.
          </p>

          <p className="text-gray-700 leading-relaxed">
            This groundbreaking virtual event will feature keynote speakers, panel 
            discussions, and networking opportunities designed to empower the next 
            generation of Bitcoin innovators and thought leaders.
          </p>

          <Button
            className="bg-purple-600 hover:bg-purple-700 text-white font-medium px-6 py-2 rounded-lg mt-4 transition-all duration-300 hover:scale-105"
            onClick={() => navigate("/press-release")}
            >
            Read Full Press Release →
          </Button>
        </div>

        {/* Right: Image */}
        <div className="flex-1 flex justify-center">
          <img
            src="/images/Bitcoin-students.png"
            alt="Bitcoin Students Network Summit"
            className="rounded-xl shadow-md border w-full max-w-lg object-cover"
          />
        </div>
      </div>
    </section>
  )
}
