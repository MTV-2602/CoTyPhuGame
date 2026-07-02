import React from 'react';
import type { GameState } from '../types';

interface ResultModalProps {
  gameState: GameState;
  onRestart: () => void;
}

export const ResultModal: React.FC<ResultModalProps> = ({ gameState, onRestart }) => {
  if (gameState.winner_id === null) return null;

  const winner = gameState.players.find((p) => p.userId === gameState.winner_id);

  return (
    <div className="fixed inset-0 bg-black/80 flex items-center justify-center p-4 z-50 animate-fade-in">
      <div className="bg-[#1c2541] border border-gold-400 rounded-lg p-6 max-w-sm w-full shadow-2xl text-center flex flex-col gap-4">
        <h2 className="text-2xl font-black text-gold-400 animate-bounce">🏆 CHIẾN THẮNG!</h2>
        
        <div className="my-2">
          <div
            className="w-16 h-16 rounded-full border-2 border-gold-400 mx-auto flex items-center justify-center text-2xl font-bold text-white shadow-lg mb-2"
            style={{ backgroundColor: winner?.avatarColor || '#dcb625' }}
          >
            {winner?.name.substring(0, 1).toUpperCase()}
          </div>
          <h3 className="text-lg font-bold text-white">{winner?.name}</h3>
          <p className="text-xs text-green-400 font-semibold mt-1">Đã thắng cuộc với số tiền mặt: ${winner?.cash}</p>
        </div>

        <div className="flex flex-col gap-2 align-start text-left text-xs bg-[#0f172a] border border-[#3a506b] p-3 rounded-lg">
          <span className="text-[10px] text-slate-400 font-bold uppercase tracking-wider mb-1">
            Bảng Tổng Kết Trận Đấu
          </span>
          {gameState.players.map((p, idx) => (
            <div key={p.userId} className="flex justify-between items-center py-1 border-b border-[#3a506b]/20">
              <span className="font-bold text-slate-200">
                {idx + 1}. {p.name}
              </span>
              {p.isBankrupt ? (
                <span className="text-[9px] text-red-400 font-bold uppercase">Đã Phá sản</span>
              ) : (
                <span className="text-green-400 font-bold">${p.cash}</span>
              )}
            </div>
          ))}
        </div>

        <div className="mt-2">
          <button
            onClick={onRestart}
            className="px-6 py-2.5 bg-gold-500 hover:bg-gold-600 rounded text-white font-bold text-sm active:scale-95 transition-all shadow-md"
          >
            Về Trang Chủ / Chơi Lại
          </button>
        </div>
      </div>
    </div>
  );
};
