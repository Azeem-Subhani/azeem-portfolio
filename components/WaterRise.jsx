import React from "react";
import { motion } from "framer-motion";

const waterAnimation = {
  initial: {
    height: "0%",
    opacity: 0,
  },
  animate: {
    height: "100%",
    opacity: 1,
  },
  exit: {
    height: "0%",
    opacity: 0,
  },
};

const WaterRise = () => {
  return (
    <div className="fixed inset-0 pointer-events-none">
      <motion.div
        variants={waterAnimation}
        initial="initial"
        animate="animate"
        exit="exit"
        transition={{
          duration: 1,
          ease: "easeInOut",
        }}
        className="absolute bottom-0 left-0 right-0 bg-blue-400 bg-opacity-70"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 1440 320'%3E%3Cpath fill='%23ffffff' fill-opacity='0.2' d='M0,96L48,112C96,128,192,160,288,160C384,160,480,128,576,128C672,128,768,160,864,176C960,192,1056,192,1152,176C1248,160,1344,128,1392,112L1440,96L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z'%3E%3C/path%3E%3C/svg%3E")`,
          backgroundRepeat: "repeat-x",
          backgroundPosition: "bottom",
        }}
      >
        {/* Water ripple effect */}
        <motion.div
          animate={{
            y: [0, -10, 0],
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
            ease: "easeInOut",
          }}
          className="absolute inset-0"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 1440 320'%3E%3Cpath fill='%23ffffff' fill-opacity='0.3' d='M0,192L48,181.3C96,171,192,149,288,149.3C384,149,480,171,576,181.3C672,192,768,192,864,181.3C960,171,1056,149,1152,149.3C1248,149,1344,171,1392,181.3L1440,192L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z'%3E%3C/path%3E%3C/svg%3E")`,
            backgroundRepeat: "repeat-x",
            backgroundPosition: "bottom",
          }}
        />
      </motion.div>
    </div>
  );
};

export default WaterRise;
