import React from 'react';
import type { Tile as TileType, Player } from '../types';
import { PlayerToken } from './PlayerToken';

interface TileProps {
  tile: TileType;
  playersOnTile: Player[];
  onClick?: () => void;
  isSelectable?: boolean;
}

const colorMap: Record<string, string> = {
  brown: 'bg-[#78350f]',
  sky: 'bg-[#0ea5e9]',
  pink: 'bg-[#ec4899]',
  orange: 'bg-[#f97316]',
  red: 'bg-[#ef4444]',
  yellow: 'bg-[#eab308]',
  green: 'bg-[#22c55e]',
  navy: 'bg-[#1e3a8a]',
};

export const Tile: React.FC<TileProps> = ({ tile, playersOnTile, onClick, isSelectable }) => {
  const isCorner = tile.type === 'go' || tile.type === 'jail' || tile.type === 'freeparking' || tile.type === 'gotojail';
  
  const renderHouses = () => {
    if (tile.type !== 'property' || tile.houses === 0) return null;
    if (tile.houses === 5) {
      return (
        <div className="absolute top-1 left-1/2 -translate-x-1/2 w-4 h-2 bg-red-600 rounded-sm border border-red-800" title="Khách Sạn" />
      );
    }
    return (
      <div className="absolute top-1 left-1/2 -translate-x-1/2 flex gap-0.5 justify-center">
        {Array.from({ length: tile.houses }).map((_, i) => (
          <div key={i} className="w-1.5 h-1.5 bg-green-500 rounded-sm border border-green-700" title="Nhà" />
        ))}
      </div>
    );
  };

  return (
    <div
      onClick={onClick}
      className={`relative border border-[#3a506b] flex flex-col justify-between p-1 bg-[#1c2541] select-none text-center cursor-pointer transition-all duration-200
        ${isCorner ? 'aspect-square justify-center' : 'aspect-[3/4]'}
        ${isSelectable ? 'ring-2 ring-gold-400 hover:bg-[#25325c]' : 'hover:bg-[#202b52]'}
        ${tile.mortgaged ? 'opacity-70' : ''}
      `}
    >
      {tile.colorGroup && !isCorner && (
        <div className={`w-full h-3 ${colorMap[tile.colorGroup]} rounded-sm mb-1 relative`}>
          {renderHouses()}
        </div>
      )}

      <div className="flex-1 flex items-center justify-center">
        <span className={`font-bold leading-none ${isCorner ? 'text-[11px] text-gold-300' : 'text-[9px] text-slate-100'}`}>
          {tile.name}
        </span>
      </div>

      {!isCorner && (
        <div className="mt-1 text-[8px] text-slate-400 font-semibold flex flex-col items-center">
          {tile.ownerId ? (
            <span
              className="px-1 py-0.2 rounded-[3px] text-[7px] text-white"
              style={{ backgroundColor: tile.mortgaged ? '#94a3b8' : '#dcb625' }}
            >
              {tile.mortgaged ? 'Thế chấp' : 'Đã mua'}
            </span>
          ) : (
            tile.price > 0 && <span>${tile.price}</span>
          )}
        </div>
      )}

      <div className="absolute bottom-1.5 left-1/2 -translate-x-1/2 flex flex-wrap gap-1 justify-center w-full px-0.5">
        {playersOnTile.map((p, idx) => (
          <PlayerToken key={p.userId} name={p.name} color={p.avatarColor} index={idx} />
        ))}
      </div>
    </div>
  );
};
