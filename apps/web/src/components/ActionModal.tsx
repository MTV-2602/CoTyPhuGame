import React from 'react';
import type { GameState } from '../types';

interface ActionModalProps {
  gameState: GameState;
  currentUserId: string;
  onBuy: (tileIndex: number) => void;
  onSkipBuy: () => void;
  onPayRent: () => void;
  onPayTax: () => void;
  onDrawCard: (deckType: 'chance' | 'communitychest') => void;
  onDeclareBankruptcy: () => void;
}

const colorGroupHex: Record<string, string> = {
  brown: 'bg-[#78350f]',
  sky: 'bg-[#0ea5e9]',
  pink: 'bg-[#ec4899]',
  orange: 'bg-[#f97316]',
  red: 'bg-[#ef4444]',
  yellow: 'bg-[#eab308]',
  green: 'bg-[#22c55e]',
  navy: 'bg-[#1e3a8a]',
};

export const ActionModal: React.FC<ActionModalProps> = ({
  gameState,
  currentUserId,
  onBuy,
  onSkipBuy,
  onPayRent,
  onPayTax,
  onDrawCard,
  onDeclareBankruptcy,
}) => {
  const activePlayer = gameState.players[gameState.current_turn_index];
  const isMyTurn = activePlayer?.userId === currentUserId;
  const tileIndex = activePlayer?.position;
  const tile = gameState.board[tileIndex];

  if (gameState.turn_phase !== 'resolve' || !tile) return null;

  // Nếu không phải lượt của tôi, hiển thị trạng thái chờ đợi
  if (!isMyTurn) {
    return (
      <div className="bg-[#1c2541]/90 border border-[#3a506b] rounded-lg p-4 text-center shadow-lg animate-pulse">
        <h4 className="text-gold-300 font-bold text-sm mb-1">Đang chờ xử lý</h4>
        <p className="text-xs text-slate-300">
          Người chơi <span className="font-bold text-white">{activePlayer.name}</span> đang giải quyết sự kiện tại ô{' '}
          <span className="font-bold text-gold-400">{tile.name}</span>.
        </p>
      </div>
    );
  }

  // 1. Nếu là ô Đất Đai / Ga Tàu / Tiện Ích không chủ
  if ((tile.type === 'property' || tile.type === 'railroad' || tile.type === 'utility') && !tile.ownerId) {
    return (
      <div className="bg-[#1c2541] border border-gold-400 rounded-lg p-3 shadow-xl max-w-sm mx-auto flex flex-col gap-2">
        <div className="text-center">
          <span className="text-[10px] text-gold-400 font-bold tracking-wider uppercase">Cơ Hội Đầu Tư</span>
          <h4 className="text-sm font-bold text-white mb-2">Mua Bất Động Sản?</h4>
        </div>

        {/* Thẻ đất đai */}
        <div className="border border-slate-600 rounded bg-[#0f172a] p-2 flex flex-col gap-1 text-xs">
          {tile.colorGroup ? (
            <div className={`h-4 w-full ${colorGroupHex[tile.colorGroup]} rounded-sm flex items-center justify-center`}>
              <span className="text-[10px] font-bold text-white">{tile.name}</span>
            </div>
          ) : (
            <div className="bg-slate-700 h-4 w-full rounded-sm flex items-center justify-center">
              <span className="text-[10px] font-bold text-white">{tile.name}</span>
            </div>
          )}
          <div className="flex justify-between border-b border-slate-700 py-1 text-[11px]">
            <span>Giá mua:</span>
            <span className="font-bold text-gold-400">${tile.price}</span>
          </div>
          <div className="text-[9px] text-slate-400 flex flex-col gap-0.5 mt-1">
            {tile.type === 'property' ? (
              <>
                <div className="flex justify-between">
                  <span>Tiền thuê đất trống:</span>
                  <span>${tile.rent[0]} (x2 nếu độc quyền)</span>
                </div>
                <div className="flex justify-between">
                  <span>Với 1 Nhà / 2 Nhà:</span>
                  <span>${tile.rent[1]} / ${tile.rent[2]}</span>
                </div>
                <div className="flex justify-between">
                  <span>Với 3 Nhà / 4 Nhà:</span>
                  <span>${tile.rent[3]} / ${tile.rent[4]}</span>
                </div>
                <div className="flex justify-between font-bold text-red-400">
                  <span>Với Khách Sạn:</span>
                  <span>${tile.rent[5]}</span>
                </div>
              </>
            ) : tile.type === 'railroad' ? (
              <span>Tiền thuê tăng gấp đôi ứng với mỗi ga sở hữu thêm (từ $25 đến $200).</span>
            ) : (
              <span>Tiền thuê bằng xúc xắc nhân hệ số (x4 nếu có 1 ô, x10 nếu sở hữu cả 2 tiện ích).</span>
            )}
          </div>
        </div>

        <div className="flex gap-2 justify-end mt-2">
          <button
            onClick={onSkipBuy}
            className="px-3 py-1.5 bg-slate-700 hover:bg-slate-600 rounded text-slate-100 font-bold text-xs transition-all active:scale-95"
          >
            Bỏ qua
          </button>
          <button
            onClick={() => onBuy(tile.index)}
            disabled={activePlayer.cash < tile.price}
            className={`px-3 py-1.5 rounded text-white font-bold text-xs transition-all active:scale-95
              ${activePlayer.cash >= tile.price
                ? 'bg-green-600 hover:bg-green-700 shadow-md'
                : 'bg-slate-600 opacity-50 cursor-not-allowed'
              }`}
          >
            Mua (${tile.price})
          </button>
        </div>
        {activePlayer.cash < tile.price && (
          <span className="text-[9px] text-red-400 text-center">Bạn không đủ tiền để mua bất động sản này.</span>
        )}
      </div>
    );
  }

  // 2. Nếu là ô đất của người khác và cần trả tiền thuê
  if ((tile.type === 'property' || tile.type === 'railroad' || tile.type === 'utility') && tile.ownerId) {
    const owner = gameState.players.find((p) => p.userId === tile.ownerId);
    
    return (
      <div className="bg-[#1c2541] border border-red-500 rounded-lg p-3 shadow-xl max-w-sm mx-auto flex flex-col gap-2">
        <div className="text-center">
          <span className="text-[10px] text-red-400 font-bold tracking-wider uppercase">Sự Cố Thuê Đất</span>
          <h4 className="text-sm font-bold text-white mb-1">Trả Tiền Thuê</h4>
          <p className="text-xs text-slate-300">
            Bạn đã đi vào tài sản của <span className="font-bold text-gold-300">{owner?.name}</span> tại{' '}
            <span className="font-bold text-white">{tile.name}</span>.
          </p>
        </div>

        <div className="flex flex-col gap-2 items-center my-1">
          <div className="flex gap-2 justify-center">
            {activePlayer.cash < 0 && (
              <button
                onClick={onDeclareBankruptcy}
                className="px-3 py-1.5 bg-red-800 hover:bg-red-900 rounded text-white font-bold text-xs transition-all active:scale-95 shadow"
              >
                Tuyên bố phá sản
              </button>
            )}
            <button
              onClick={onPayRent}
              className="px-5 py-2 bg-red-600 hover:bg-red-700 rounded text-white font-bold text-xs transition-all active:scale-95 shadow-md"
            >
              Thanh Toán Thuê Đất
            </button>
          </div>
          {activePlayer.cash < 0 && (
            <p className="text-[9px] text-red-400 text-center">
              Sau khi trả, tài sản của bạn sẽ bị âm. Bạn cần thế chấp tài sản, bán bớt nhà để bù tiền trước khi kết thúc lượt!
            </p>
          )}
        </div>
      </div>
    );
  }

  // 3. Nếu là ô Cơ Hội / Khí Vận
  if (tile.type === 'chance' || tile.type === 'communitychest') {
    const deckType = tile.type;
    const deckName = deckType === 'chance' ? 'Cơ Hội' : 'Khí Vận';

    return (
      <div className="bg-[#1c2541] border border-gold-500 rounded-lg p-4 shadow-xl max-w-sm mx-auto text-center flex flex-col gap-3">
        <div>
          <span className="text-[10px] text-gold-400 font-bold tracking-wider uppercase">Sự Kiện Ngẫu Nhiên</span>
          <h4 className="text-sm font-bold text-white">Rút Thẻ {deckName}</h4>
        </div>
        <p className="text-xs text-slate-300">
          Bạn đang đứng ở ô <span className="font-bold text-white">{tile.name}</span>. Rút thẻ để xem vận may của bạn!
        </p>
        <div>
          <button
            onClick={() => onDrawCard(deckType)}
            className="px-5 py-2 bg-gold-500 hover:bg-gold-600 rounded text-white font-bold text-xs transition-all active:scale-95 shadow-md"
          >
            Rút Thẻ Ngay
          </button>
        </div>
      </div>
    );
  }

  // 4. Nếu là ô Thuế
  if (tile.type === 'tax') {
    return (
      <div className="bg-[#1c2541] border border-orange-500 rounded-lg p-3 shadow-xl max-w-sm mx-auto text-center flex flex-col gap-2">
        <div>
          <span className="text-[10px] text-orange-400 font-bold tracking-wider uppercase">Thuế Quốc Gia</span>
          <h4 className="text-sm font-bold text-white">Nộp Thuế Nhà Nước</h4>
        </div>
        <p className="text-xs text-slate-300">
          Bạn phải nộp phạt thuế <span className="font-bold text-red-400">${tile.price}</span> tại ô{' '}
          <span className="font-bold text-white">{tile.name}</span>.
        </p>
        <div className="flex gap-2 justify-center mt-2">
          {activePlayer.cash < 0 && (
            <button
              onClick={onDeclareBankruptcy}
              className="px-3 py-1.5 bg-red-800 hover:bg-red-900 rounded text-white font-bold text-xs transition-all active:scale-95"
            >
              Tuyên bố phá sản
            </button>
          )}
          <button
            onClick={onPayTax}
            className="px-5 py-2 bg-orange-600 hover:bg-orange-700 rounded text-white font-bold text-xs transition-all active:scale-95 shadow-md"
          >
            Đóng Thuế (${tile.price})
          </button>
        </div>
      </div>
    );
  }

  return null;
};
