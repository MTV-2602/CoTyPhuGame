import React from 'react';
import type { Tile as TileType, Player } from '../types';
import { Tile } from './Tile';

interface BoardProps {
  board: TileType[];
  players: Player[];
  onTileClick?: (index: number) => void;
  selectedTileIndex?: number | null;
  selectableTileIndices?: number[];
  children?: React.ReactNode;
}

export const getTileGridPosition = (index: number) => {
  if (index === 0) return { gridRow: 11, gridColumn: 11 };
  if (index > 0 && index < 10) return { gridRow: 11, gridColumn: 11 - index };
  if (index === 10) return { gridRow: 11, gridColumn: 1 };
  if (index > 10 && index < 20) return { gridRow: 11 - (index - 10), gridColumn: 1 };
  if (index === 20) return { gridRow: 1, gridColumn: 1 };
  if (index > 20 && index < 30) return { gridRow: 1, gridColumn: 1 + (index - 20) };
  if (index === 30) return { gridRow: 1, gridColumn: 11 };
  if (index > 30 && index < 40) return { gridRow: 1 + (index - 30), gridColumn: 11 };
  return { gridRow: 1, gridColumn: 1 };
};

export const Board: React.FC<BoardProps> = ({
  board,
  players,
  onTileClick,
  selectedTileIndex,
  selectableTileIndices = [],
  children,
}) => {
  return (
    <div className="relative w-full max-w-[650px] aspect-square bg-[#0b1329] border-2 border-gold-600 rounded-lg p-1 shadow-2xl select-none">
      <div className="grid grid-cols-11 grid-rows-11 gap-0.5 w-full h-full">
        {board.map((tile) => {
          const pos = getTileGridPosition(tile.index);
          const playersOnTile = players.filter((p) => p.position === tile.index && !p.isBankrupt);
          const isSelectable = selectableTileIndices.includes(tile.index);

          return (
            <div
              key={tile.index}
              style={{
                gridRow: pos.gridRow,
                gridColumn: pos.gridColumn,
              }}
            >
              <Tile
                tile={tile}
                playersOnTile={playersOnTile}
                isSelectable={isSelectable || selectedTileIndex === tile.index}
                onClick={() => onTileClick?.(tile.index)}
              />
            </div>
          );
        })}

        <div className="col-start-2 col-end-11 row-start-2 row-end-11 bg-[#0b1329] flex flex-col justify-between p-4 relative z-0">
          {children}
        </div>
      </div>
    </div>
  );
};
