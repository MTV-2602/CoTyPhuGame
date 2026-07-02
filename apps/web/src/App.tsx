import React from 'react';
import { useGameStore } from './store/useGameStore';
import { Home } from './pages/Home';
import { GameRoom } from './pages/GameRoom';

const App: React.FC = () => {
  const room = useGameStore((state) => state.room);

  return (
    <div className="bg-[#0b1329] min-h-screen text-slate-100 selection:bg-gold-500/30 selection:text-gold-200">
      {room ? <GameRoom /> : <Home />}
    </div>
  );
};

export default App;
