import React from 'react';
import type { Player, Tile } from '../types';

interface PlayerPanelProps {
  players: Player[];
  activePlayerIndex: number;
  currentUserId: string;
  board: Tile[];
}

const colorGroupHex: Record<string, string> = {
  brown: '#78350f',
  sky: '#0ea5e9',
  pink: '#ec4899',
  orange: '#f97316',
  red: '#ef4444',
  yellow: '#eab308',
  green: '#22c55e',
  navy: '#1e3a8a',
};

export const PlayerPanel: React.FC<PlayerPanelProps> = ({
  players,
  activePlayerIndex,
  currentUserId,
  board,
}) => {
  return (
    <div className="flex flex-col gap-2 w-full max-w-[280px] bg-[#1c2541] border border-[#3a506b] rounded-lg p-3 shadow-xl">
      <h3 className="text-gold-400 font-bold border-b border-[#3a506b] pb-1 text-sm">Danh Sách Người Chơi</h3>
      <div className="flex flex-col gap-2 overflow-y-auto max-h-[350px] pr-1">
        {players.map((player, idx) => {
          const isActive = idx === activePlayerIndex;
          const isMe = player.userId === currentUserId;
          const ownedProperties = board.filter((tile) => tile.ownerId === player.userId);

          return (
            <div
              key={player.userId}
              className={`p-2 rounded border transition-all duration-200
                ${isActive
                  ? 'bg-[#25325c] border-gold-400 ring-1 ring-gold-400 shadow-md'
                  : 'bg-[#0f172a] border-[#3a506b]'
                }
                ${player.isBankrupt ? 'opacity-40' : ''}
              `}
            >
              <div className="flex justify-between items-center mb-1">
                <div className="flex items-center gap-1.5">
                  <div
                    className="w-3.5 h-3.5 rounded-full border border-white flex items-center justify-center text-[7px] font-bold text-white"
                    style={{ backgroundColor: player.avatarColor }}
                  >
                    {player.name.substring(0, 1).toUpperCase()}
                  </div>
                  <span className={`text-xs font-bold truncate max-w-[120px] ${isMe ? 'text-gold-300' : 'text-slate-100'}`}>
                    {player.name} {isMe && '(Tôi)'}
                  </span>
                </div>
                {player.isBankrupt ? (
                  <span className="text-[8px] bg-red-900 border border-red-500 text-red-100 px-1 py-0.2 rounded font-bold uppercase">
                    Phá sản
                  </span>
                ) : (
                  <span className="text-xs font-bold text-green-400">${player.cash}</span>
                )}
              </div>

              {!player.isBankrupt && (
                <div className="text-[10px] text-slate-400 flex flex-col gap-0.5">
                  <div className="flex justify-between">
                    <span>Vị trí: {player.position} ({board[player.position]?.name})</span>
                    {player.inJail && (
                      <span className="text-red-400 font-bold">Trong Tù ({player.jailTurns}/3)</span>
                    )}
                  </div>

                  {ownedProperties.length > 0 && (
                    <div className="mt-1 flex flex-wrap gap-1">
                      {ownedProperties.map((prop) => {
                        const bgCol = prop.colorGroup ? colorGroupHex[prop.colorGroup] : '#64748b';
                        return (
                          <div
                            key={prop.index}
                            style={{ backgroundColor: bgCol }}
                            className="px-1 py-0.2 rounded-[2px] text-[7px] font-bold text-white flex items-center gap-0.5 select-none shadow"
                            title={`${prop.name} ${prop.houses > 0 ? `(${prop.houses === 5 ? 'KS' : `${prop.houses} nhà`})` : ''}`}
                          >
                            <span>{prop.name.substring(0, 4)}</span>
                            {prop.houses > 0 && (
                              <span className="bg-black/30 px-0.5 rounded text-[6px]">
                                {prop.houses === 5 ? 'H' : prop.houses}
                              </span>
                            )}
                            {prop.mortgaged && (
                              <span className="text-[6px] bg-black/60 px-0.5 rounded text-slate-300">
                                M
                              </span>
                            )}
                          </div>
                        );
                      })}
                    </div>
                  )}
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};
