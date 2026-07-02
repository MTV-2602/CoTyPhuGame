import React from 'react';
import { motion } from 'framer-motion';

interface PlayerTokenProps {
  name: string;
  color: string;
  index: number;
}

export const PlayerToken: React.FC<PlayerTokenProps> = ({ name, color, index }) => {
  // Tính độ dời nhỏ để tránh các quân cờ đè khít lên nhau
  const offset = {
    x: (index % 2) * 12 - 6,
    y: Math.floor(index / 2) * 12 - 6,
  };

  return (
    <motion.div
      layout
      transition={{ type: 'spring', stiffness: 120, damping: 15 }}
      style={{
        backgroundColor: color,
        transform: `translate(${offset.x}px, ${offset.y}px)`,
      }}
      className="w-5 h-5 rounded-full border border-white flex items-center justify-center text-[9px] font-bold text-white shadow-md z-10"
      title={name}
    >
      {name.substring(0, 1).toUpperCase()}
    </motion.div>
  );
};
