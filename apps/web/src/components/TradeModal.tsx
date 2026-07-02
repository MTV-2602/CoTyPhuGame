import React, { useState } from 'react';
import type { GameState, Trade } from '../types';

interface TradeModalProps {
  gameState: GameState;
  currentUserId: string;
  activeTrades: Trade[];
  onPropose: (
    receiverId: string,
    proposerCash: number,
    proposerProps: number[],
    receiverCash: number,
    receiverProps: number[]
  ) => void;
  onAccept: (tradeId: string) => void;
  onReject: (tradeId: string) => void;
  onClose: () => void;
}

export const TradeModal: React.FC<TradeModalProps> = ({
  gameState,
  currentUserId,
  activeTrades,
  onPropose,
  onAccept,
  onReject,
  onClose,
}) => {
  const me = gameState.players.find((p) => p.userId === currentUserId);
  const otherPlayers = gameState.players.filter((p) => p.userId !== currentUserId && !p.isBankrupt);

  const [selectedPartnerId, setSelectedPartnerId] = useState<string>(otherPlayers[0]?.userId || '');
  const [proposerCash, setProposerCash] = useState<number>(0);
  const [receiverCash, setReceiverCash] = useState<number>(0);
  const [proposerProps, setProposerProps] = useState<number[]>([]);
  const [receiverProps, setReceiverProps] = useState<number[]>([]);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const incomingTrade = activeTrades.find((t) => t.receiver_id === currentUserId && t.status === 'PENDING');
  const proposerOfIncoming = incomingTrade
    ? gameState.players.find((p) => p.userId === incomingTrade.proposer_id)
    : null;

  const handleToggleProp = (tileIndex: number, isProposer: boolean) => {
    if (isProposer) {
      setProposerProps((prev) =>
        prev.includes(tileIndex) ? prev.filter((id) => id !== tileIndex) : [...prev, tileIndex]
      );
    } else {
      setReceiverProps((prev) =>
        prev.includes(tileIndex) ? prev.filter((id) => id !== tileIndex) : [...prev, tileIndex]
      );
    }
  };

  const handleSubmitProposal = () => {
    if (!selectedPartnerId) return;
    setIsSubmitting(true);
    onPropose(selectedPartnerId, proposerCash, proposerProps, receiverCash, receiverProps);
    setTimeout(() => {
      setIsSubmitting(false);
      onClose();
    }, 500);
  };

  if (incomingTrade && proposerOfIncoming) {
    const offerProps = gameState.board.filter((t) => incomingTrade.proposer_properties.includes(t.index));
    const requestProps = gameState.board.filter((t) => incomingTrade.receiver_properties.includes(t.index));

    return (
      <div className="fixed inset-0 bg-black/60 flex items-center justify-center p-4 z-50">
        <div className="bg-[#1c2541] border border-gold-400 rounded-lg p-4 max-w-md w-full shadow-2xl flex flex-col gap-3">
          <h3 className="text-sm font-bold text-gold-400 border-b border-[#3a506b] pb-1 text-center">
            Đề Nghị Giao Dịch Đến
          </h3>
          <p className="text-xs text-slate-300 text-center">
            Người chơi <span className="font-bold text-white">{proposerOfIncoming.name}</span> muốn trao đổi với bạn.
          </p>

          <div className="grid grid-cols-2 gap-3 text-xs my-1">
            <div className="bg-[#0f172a] border border-slate-700 p-2 rounded flex flex-col gap-1.5">
              <span className="font-bold text-green-400 border-b border-slate-800 pb-0.5">Họ cho bạn:</span>
              <div className="font-semibold text-slate-200">${incomingTrade.proposer_cash}</div>
              <div className="flex flex-col gap-1 max-h-[80px] overflow-y-auto">
                {offerProps.map((p) => (
                  <div key={p.index} className="text-[10px] bg-slate-800 px-1 py-0.5 rounded text-white truncate">
                    {p.name}
                  </div>
                ))}
                {offerProps.length === 0 && <span className="text-[10px] text-slate-500">Không có đất</span>}
              </div>
            </div>

            <div className="bg-[#0f172a] border border-slate-700 p-2 rounded flex flex-col gap-1.5">
              <span className="font-bold text-red-400 border-b border-slate-800 pb-0.5">Họ yêu cầu đổi:</span>
              <div className="font-semibold text-slate-200">${incomingTrade.receiver_cash}</div>
              <div className="flex flex-col gap-1 max-h-[80px] overflow-y-auto">
                {requestProps.map((p) => (
                  <div key={p.index} className="text-[10px] bg-slate-800 px-1 py-0.5 rounded text-white truncate">
                    {p.name}
                  </div>
                ))}
                {requestProps.length === 0 && <span className="text-[10px] text-slate-500">Không có đất</span>}
              </div>
            </div>
          </div>

          <div className="flex gap-2 justify-end mt-2">
            <button
              onClick={() => onReject(incomingTrade.id)}
              className="px-3 py-1.5 bg-red-700 hover:bg-red-800 rounded text-white font-bold text-xs transition-all active:scale-95"
            >
              Từ chối
            </button>
            <button
              onClick={() => onAccept(incomingTrade.id)}
              className="px-3 py-1.5 bg-green-600 hover:bg-green-700 rounded text-white font-bold text-xs transition-all active:scale-95 shadow-md"
            >
              Đồng ý
            </button>
          </div>
        </div>
      </div>
    );
  }

  const myProperties = gameState.board.filter((t) => t.ownerId === currentUserId && t.houses === 0);
  const partner = gameState.players.find((p) => p.userId === selectedPartnerId);
  const partnerProperties = partner
    ? gameState.board.filter((t) => t.ownerId === selectedPartnerId && t.houses === 0)
    : [];

  return (
    <div className="fixed inset-0 bg-black/60 flex items-center justify-center p-4 z-50">
      <div className="bg-[#1c2541] border border-gold-400 rounded-lg p-4 max-w-lg w-full shadow-2xl flex flex-col gap-3">
        <div className="flex justify-between items-center border-b border-[#3a506b] pb-1">
          <h3 className="text-sm font-bold text-gold-400">Đề xuất trao đổi</h3>
          <button onClick={onClose} className="text-slate-400 hover:text-white font-bold text-sm">
            ✕
          </button>
        </div>

        <div className="flex items-center gap-2 text-xs">
          <label className="text-slate-300 font-semibold">Chọn đối tác:</label>
          <select
            value={selectedPartnerId}
            onChange={(e) => {
              setSelectedPartnerId(e.target.value);
              setReceiverProps([]);
            }}
            className="bg-[#0f172a] text-white border border-[#3a506b] p-1 rounded"
          >
            {otherPlayers.map((p) => (
              <option key={p.userId} value={p.userId}>
                {p.name}
              </option>
            ))}
          </select>
        </div>

        <div className="grid grid-cols-2 gap-3 text-xs">
          <div className="bg-[#0f172a] border border-slate-700 p-2 rounded flex flex-col gap-1.5">
            <span className="font-bold text-green-400 border-b border-slate-800 pb-0.5">Tài sản bạn đề nghị:</span>
            
            <div className="flex flex-col gap-1">
              <label className="text-slate-400 text-[10px]">Tiền mặt ($):</label>
              <input
                type="number"
                min="0"
                max={me?.cash || 0}
                value={proposerCash}
                onChange={(e) => setProposerCash(Math.max(0, parseInt(e.target.value) || 0))}
                className="bg-[#1c2541] text-white border border-[#3a506b] p-1 rounded w-full text-[11px]"
              />
            </div>

            <div className="flex flex-col gap-1 mt-1">
              <span className="text-slate-400 text-[10px]">Chọn đất trống:</span>
              <div className="flex flex-col gap-1 max-h-[100px] overflow-y-auto pr-1">
                {myProperties.map((p) => (
                  <label key={p.index} className="flex items-center gap-1.5 cursor-pointer text-[10px]">
                    <input
                      type="checkbox"
                      checked={proposerProps.includes(p.index)}
                      onChange={() => handleToggleProp(p.index, true)}
                    />
                    <span className="truncate">{p.name}</span>
                  </label>
                ))}
                {myProperties.length === 0 && <span className="text-[10px] text-slate-500">Không có đất trống</span>}
              </div>
            </div>
          </div>

          <div className="bg-[#0f172a] border border-slate-700 p-2 rounded flex flex-col gap-1.5">
            <span className="font-bold text-red-400 border-b border-slate-800 pb-0.5">Tài sản bạn yêu cầu:</span>

            <div className="flex flex-col gap-1">
              <label className="text-slate-400 text-[10px]">Tiền mặt ($):</label>
              <input
                type="number"
                min="0"
                max={partner?.cash || 0}
                value={receiverCash}
                onChange={(e) => setReceiverCash(Math.max(0, parseInt(e.target.value) || 0))}
                className="bg-[#1c2541] text-white border border-[#3a506b] p-1 rounded w-full text-[11px]"
              />
            </div>

            <div className="flex flex-col gap-1 mt-1">
              <span className="text-slate-400 text-[10px]">Chọn đất trống của họ:</span>
              <div className="flex flex-col gap-1 max-h-[100px] overflow-y-auto pr-1">
                {partnerProperties.map((p) => (
                  <label key={p.index} className="flex items-center gap-1.5 cursor-pointer text-[10px]">
                    <input
                      type="checkbox"
                      checked={receiverProps.includes(p.index)}
                      onChange={() => handleToggleProp(p.index, false)}
                    />
                    <span className="truncate">{p.name}</span>
                  </label>
                ))}
                {partnerProperties.length === 0 && <span className="text-[10px] text-slate-500">Đối tác không có đất trống</span>}
              </div>
            </div>
          </div>
        </div>

        <div className="flex gap-2 justify-end mt-2 border-t border-[#3a506b] pt-2">
          <button
            onClick={onClose}
            className="px-3 py-1.5 bg-slate-700 hover:bg-slate-600 rounded text-slate-100 font-bold text-xs transition-all active:scale-95"
          >
            Hủy bỏ
          </button>
          <button
            onClick={handleSubmitProposal}
            disabled={isSubmitting || !selectedPartnerId}
            className="px-4 py-1.5 bg-gold-500 hover:bg-gold-600 rounded text-white font-bold text-xs transition-all active:scale-95 shadow-md"
          >
            Gửi Lời Đề Nghị
          </button>
        </div>
      </div>
    </div>
  );
};
