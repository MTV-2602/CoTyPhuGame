import React from 'react';
import { motion } from 'framer-motion';

interface PlayerTokenProps {
  name: string;
  color: string;
  index: number;
  is3D?: boolean;
  tilt?: number;
  rotation?: number;
}

export const PlayerToken: React.FC<PlayerTokenProps> = ({ 
  name, 
  color, 
  index,
  is3D = false,
  tilt = 45,
  rotation = -30
}) => {
  // Tính độ dời nhỏ để tránh các quân cờ đè khít lên nhau
  const offset = {
    x: (index % 2) * 10 - 5,
    y: Math.floor(index / 2) * 10 - 5,
  };

  const transformStyle = is3D ? {
    transform: `translate(${offset.x}px, ${offset.y}px) rotateX(${-tilt}deg) rotateZ(${-rotation}deg) translateZ(12px)`,
    boxShadow: '0 8px 12px rgba(0,0,0,0.4)',
  } : {
    transform: `translate(${offset.x}px, ${offset.y}px)`,
  };

  return (
    <motion.div
      layout
      transition={{ type: 'spring', stiffness: 120, damping: 15 }}
      style={{
        backgroundColor: color,
        ...transformStyle,
      }}
      className="w-4.5 h-4.5 rounded-full border border-white flex items-center justify-center text-[8px] font-black text-white shadow-md z-10 relative"
      title={name}
    >
      {name.substring(0, 1).toUpperCase()}
      
      {/* Hiệu ứng đế cờ 3D bóng đổ dưới chân */}
      {is3D && (
        <div className="absolute -bottom-1.5 left-1/2 -translate-x-1/2 w-4 h-1 bg-black/40 blur-[1px] rounded-full -z-10" />
      )}
    </motion.div>
  );
};
