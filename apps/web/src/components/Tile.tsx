import React from 'react';
import type { Tile as TileType, Player } from '../types';
import { PlayerToken } from './PlayerToken';

interface TileProps {
  tile: TileType;
  playersOnTile: Player[];
  onClick?: () => void;
  isSelectable?: boolean;
  is3D?: boolean;
  tilt?: number;
  rotation?: number;
}

const colorMap: Record<string, string> = {
  brown: 'bg-[#8B5A2B]',      // Classic Brown
  sky: 'bg-[#87CEEB]',        // Classic Light Blue / Sky
  pink: 'bg-[#FF69B4]',       // Pink
  orange: 'bg-[#FF8C00]',     // Orange
  red: 'bg-[#FF0000]',        // Red
  yellow: 'bg-[#FFD700]',     // Yellow
  green: 'bg-[#008000]',      // Green
  navy: 'bg-[#000080]',       // Navy
};

export const Tile: React.FC<TileProps> = ({ 
  tile, 
  playersOnTile, 
  onClick, 
  isSelectable,
  is3D = false,
  tilt = 45,
  rotation = -30
}) => {
  const isCorner = tile.type === 'go' || tile.type === 'jail' || tile.type === 'freeparking' || tile.type === 'gotojail';
  
  const renderHouses = () => {
    if (tile.type !== 'property' || tile.houses === 0) return null;
    
    // Ở chế độ 3D, dựng đứng nhà lên bằng billboard transform
    const houseStyle: React.CSSProperties = is3D ? {
      transform: `rotateX(${-tilt}deg) rotateZ(${-rotation}deg) translateZ(8px)`,
      transformStyle: 'preserve-3d',
    } : {};

    if (tile.houses === 5) {
      return (
        <div 
          style={houseStyle}
          className="absolute top-0.5 left-1/2 -translate-x-1/2 text-[10px] drop-shadow-md z-10 transition-transform duration-300" 
          title="Khách Sạn"
        >
          🏨
        </div>
      );
    }
    return (
      <div 
        style={is3D ? { transformStyle: 'preserve-3d' } : {}}
        className="absolute top-0.5 left-1/2 -translate-x-1/2 flex gap-0.5 justify-center z-10"
      >
        {Array.from({ length: tile.houses }).map((_, i) => (
          <div 
            key={i} 
            style={houseStyle}
            className="text-[8px] drop-shadow-sm font-bold transition-transform duration-300" 
            title="Nhà"
          >
            🏠
          </div>
        ))}
      </div>
    );
  };

  // Special designs for corners
  const getCornerEmoji = () => {
    if (tile.type === 'go') return '🏁';
    if (tile.type === 'jail') return '🔒';
    if (tile.type === 'freeparking') return '🚗';
    if (tile.type === 'gotojail') return '🚓';
    return null;
  };

  const cornerEmoji = getCornerEmoji();

  return (
    <div
      onClick={onClick}
      className={`relative border border-slate-200 flex flex-col justify-between p-1 bg-white select-none text-center cursor-pointer transition-all duration-150 shadow-sm
        ${isCorner ? 'aspect-square justify-center bg-slate-50/90' : 'aspect-[3/4]'}
        ${isSelectable ? 'ring-2 ring-emerald-500 hover:bg-slate-50' : 'hover:bg-slate-50/55'}
        ${tile.mortgaged ? 'opacity-60 grayscale' : ''}
      `}
      style={is3D ? { transformStyle: 'preserve-3d' } : {}}
    >
      {/* Property color bar */}
      {tile.colorGroup && !isCorner && (
        <div className={`w-full h-3.5 ${colorMap[tile.colorGroup]} rounded-sm mb-0.5 relative shadow-sm border border-black/15`}>
          {renderHouses()}
        </div>
      )}

      {/* Tile Content */}
      <div 
        style={is3D ? { transform: 'translateZ(1px)' } : {}}
        className="flex-1 flex flex-col items-center justify-center gap-0.5"
      >
        {isCorner && cornerEmoji && (
          <span className="text-sm md:text-base leading-none">{cornerEmoji}</span>
        )}
        <span className={`font-black tracking-tight leading-tight uppercase
          ${isCorner 
            ? 'text-[8px] md:text-[9px] text-slate-800 mt-0.5' 
            : 'text-[7.5px] md:text-[8.5px] text-slate-700 font-bold'
          }`}>
          {tile.name}
        </span>
      </div>

      {/* Owner & Price Info */}
      {!isCorner && (
        <div 
          style={is3D ? { transform: 'translateZ(1.5px)' } : {}}
          className="mt-0.5 text-[8px] font-extrabold flex flex-col items-center"
        >
          {tile.ownerId ? (
            <span
              className="px-1 py-0.2 rounded text-[6.5px] text-white font-black uppercase tracking-wider shadow-sm"
              style={{ backgroundColor: tile.mortgaged ? '#64748b' : '#10b981' }}
            >
              {tile.mortgaged ? 'Thế chấp' : 'Đã mua'}
            </span>
          ) : (
            tile.price > 0 && <span className="text-emerald-700">${tile.price}</span>
          )}
        </div>
      )}

      {/* Players on Tile (dựng đứng cờ ở chế độ 3D) */}
      <div 
        style={is3D ? { transformStyle: 'preserve-3d' } : {}}
        className="absolute bottom-1.5 left-1/2 -translate-x-1/2 flex flex-wrap gap-1 justify-center w-full px-0.5 z-10"
      >
        {playersOnTile.map((p, idx) => (
          <PlayerToken 
            key={p.userId} 
            name={p.name} 
            color={p.avatarColor} 
            index={idx} 
            is3D={is3D}
            tilt={tilt}
            rotation={rotation}
          />
        ))}
      </div>
    </div>
  );
};
