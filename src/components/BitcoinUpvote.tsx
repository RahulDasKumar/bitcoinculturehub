import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowBigUp } from "lucide-react";

const BitcoinUpvote = () => {
  const [clicked, setClicked] = useState(false);

  const handleClick = (e: React.MouseEvent) => {
    e.stopPropagation(); // avoid triggering parent click (like opening modal)
    setClicked(true);
    setTimeout(() => setClicked(false), 1200);
  };

  return (
    <div className="relative flex flex-col items-center justify-center">
      {/* 🪙 Bitcoin Burst Animation */}
      <AnimatePresence>
        {clicked && (
          <>
            {[...Array(6)].map((_, i) => (
              <motion.span
                key={i}
                initial={{ opacity: 1, y: 0, scale: 1 }}
                animate={{
                  y: -40 - Math.random() * 50,
                  x: (Math.random() - 0.5) * 50,
                  opacity: 0,
                  scale: 0.8 + Math.random() * 0.4,
                  rotate: Math.random() * 360,
                }}
                transition={{ duration: 1, ease: "easeOut" }}
                className="absolute text-yellow-400 text-lg font-bold select-none"
              >
                ₿
              </motion.span>
            ))}
          </>
        )}
      </AnimatePresence>

      {/* 🟧 Main Upvote Button */}
      <motion.button
        whileTap={{ scale: 0.85 }}
        onClick={handleClick}
        className="flex items-center justify-center p-2 rounded-full bg-black/50 hover:bg-yellow-500/20 text-yellow-400 transition shadow-sm"
      >
        <motion.div
          animate={clicked ? { scale: [1, 1.3, 1], rotate: [0, 10, -10, 0] } : {}}
          transition={{ duration: 0.5 }}
        >
          <ArrowBigUp size={26} />
        </motion.div>
      </motion.button>
    </div>
  );
};

export default BitcoinUpvote;