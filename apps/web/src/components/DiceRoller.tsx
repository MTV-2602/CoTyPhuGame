import React, { useState } from 'react';
import { motion } from 'framer-motion';

interface DiceRollerProps {
  dice: [number, number];
  onRoll: () => void;
  isMyTurn: boolean;
  disabled: boolean;
}

const renderDots = (value: number) => {
  const dotPositions: Record<number, string[]> = {
    1: ['col-start-2 row-start-2'],
    2: ['col-start-1 row-start-1', 'col-start-3 row-start-3'],
    3: ['col-start-1 row-start-1', 'col-start-2 row-start-2', 'col-start-3 row-start-3'],
    4: [
      'col-start-1 row-start-1',
      'col-start-3 row-start-1',
      'col-start-1 row-start-3',
      'col-start-3 row-start-3',
    ],
    5: [
      'col-start-1 row-start-1',
      'col-start-3 row-start-1',
      'col-start-2 row-start-2',
      'col-start-1 row-start-3',
      'col-start-3 row-start-3',
    ],
    6: [
      'col-start-1 row-start-1',
      'col-start-3 row-start-1',
      'col-start-1 row-start-2',
      'col-start-3 row-start-2',
      'col-start-1 row-start-3',
      'col-start-3 row-start-3',
    ],
  };

  const positions = dotPositions[value] || [];

  return (
    <div className="grid grid-cols-3 grid-rows-3 gap-1 w-full h-full p-2 bg-white rounded-xl shadow-inner border border-slate-300">
      {positions.map((pos, idx) => (
        <span key={idx} className={`w-2.5 h-2.5 bg-red-600 rounded-full ${pos}`} />
      ))}
    </div>
  );
};

export const DiceRoller: React.FC<DiceRollerProps> = ({ dice, onRoll, isMyTurn, disabled }) => {
  const [rolling, setRolling] = useState(false);

  const handleRoll = () => {
    if (disabled || !isMyTurn) return;
    setRolling(true);
    setTimeout(() => {
      setRolling(false);
      onRoll();
    }, 800); // 800ms animation
  };

  return (
    <div className="flex flex-col items-center gap-3">
      <div className="flex gap-4">
        {/* Hạt xúc xắc 1 */}
        <motion.div
          animate={rolling ? { rotate: [0, 360, 720], x: [0, -10, 10, 0] } : {}}
          transition={{ duration: 0.8, ease: 'easeInOut' }}
          className="w-12 h-12 flex items-center justify-center cursor-pointer"
        >
          {renderDots(dice[0])}
        </motion.div>

        {/* Hạt xúc xắc 2 */}
        <motion.div
          animate={rolling ? { rotate: [0, -360, -720], x: [0, 10, -10, 0] } : {}}
          transition={{ duration: 0.8, ease: 'easeInOut' }}
          className="w-12 h-12 flex items-center justify-center cursor-pointer"
        >
          {renderDots(dice[1])}
        </motion.div>
      </div>

      {isMyTurn && (
        <button
          onClick={handleRoll}
          disabled={disabled || rolling}
          className={`px-5 py-2 rounded-md font-bold text-white shadow-lg transition-all duration-200 text-sm
            ${disabled || rolling
              ? 'bg-slate-600 cursor-not-allowed opacity-50'
              : 'bg-gold-500 hover:bg-gold-600 active:scale-95'
            }`}
        >
          {rolling ? 'Đang tung...' : 'Tung Xúc Xắc'}
        </button>
      )}
    </div>
  );
};
