import Header from "@/components/Header"
import Footer from "@/components/Footer"
import { Button } from "@/components/ui/button"
import { useNavigate } from "react-router-dom"
import { useEffect } from "react"

export default function PressReleasePage() {
  const navigate = useNavigate()
  console.log("📰 Press Release Page loaded");

  useEffect(() => {
    window.scrollTo(0, 0)
  }, [])


  return (
    <div className="min-h-screen bg-white text-gray-800 flex flex-col">
      {/* Header */}
      <Header />

      {/* Main Content */}
      <main className="flex-grow container mx-auto px-6 py-20 animate-fadeIn">
        <div className="max-w-4xl mx-auto space-y-6">
          <h1 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-6">
            Bitcoin Students Network Summit
          </h1>

          <p className="text-gray-700 leading-relaxed">
            <strong>NEW YORK, NY – October 24, 2025 –</strong> The Bitcoin Students Network (BSN) today announced
            the first-ever Bitcoin Students Network Summit, powered by Bitcoin Culture Hub (BCH). The landmark
            virtual event is designed to connect the next generation of Bitcoin leaders with industry pioneers.
          </p>

          <p className="text-gray-700 leading-relaxed">
            The summit will take place on <strong>November 21, 2025, from 12:00 PM to 3:00 PM ET</strong> and is
            expected to attract over 500 students from universities across the globe.
          </p>

          <p className="text-gray-700 leading-relaxed">
            This fully virtual and free-to-attend summit aims to bridge the gap between academia and the rapidly
            evolving Bitcoin industry. The event will provide a unique platform for students to engage directly
            with leading operators, entrepreneurs, and thinkers in the Bitcoin ecosystem through a series of
            fireside chats and panel discussions. The summit will be structured to accommodate a global audience, with programming tailored for participants across the globe.
          </p>

          <p className="text-gray-700 leading-relaxed">
          The summit will feature programming on topics such as "Making Bitcoin Welcoming”, "From Dorm Room to Founder", and "Why Students Win in Bitcoin". This approach ensures that the content is relevant and engaging for the student audience, exploring the topics that matter most to them as they consider careers and involvement in the Bitcoin space.

          </p>

          <p className="text-gray-700 leading-relaxed">
          <strong> Bitcoin Culture Hub</strong> the organization powering the summit, will provide its expertise in content design and event production to create a dynamic and engaging virtual experience. This collaboration signifies a shared commitment to fostering Bitcoin education and creating accessible pathways for students to enter the industry.
          </p>

          <img
            src="/images/Bitcoin-students.png"
            alt="Bitcoin Students Network Summit"
            className="rounded-xl shadow-md border border-gray-200 w-full my-8 transition-transform duration-300 hover:scale-[1.02] hover:shadow-2xl"
          />

          <p className="text-gray-700 leading-relaxed">
            “Students are the heartbeat of every revolution,” said <strong>Kyle Knight</strong>, Founder of Bitcoin
            Culture Hub. “We’re curious, fearless, and collaborative: the force igniting a global renaissance. Our
            role is to give students a place to connect, learn, and lead together.”
          </p>

          <p className="text-gray-700 leading-relaxed">
            Registration for the Bitcoin Students Network Global Summit is now open. For more information and to
            register for free, please visit the official BSN Summit page.
          </p>

          {/* CTA Section */}
          <div className="flex justify-center gap-4 mt-12">
            {/* Primary button */}
            <Button
              className="bg-orange-600 hover:bg-orange-700 text-white px-6 py-3 rounded-full text-base font-semibold shadow-md transform transition-all duration-300 hover:scale-105 hover:shadow-xl"
              onClick={() =>
                window.open(
                  "https://bsnsummit.vercel.app/"
                )
              }
            >
              BSN Summit page →
            </Button>

            {/* Back button */}
            <Button
              variant="outline"
              className="border-gray-300 text-gray-700 hover:bg-gray-100 hover:shadow-md px-6 py-3 rounded-full text-base font-semibold transition-all duration-300 hover:scale-105"
              onClick={() => navigate("/")}
            >
              ← Back to Home
            </Button>
          </div>
        </div>
      </main>

      {/* Footer */}
      <Footer />
    </div>
  )
}
