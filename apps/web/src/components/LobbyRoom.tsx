import React from 'react';
import type { Room } from '../types';

interface LobbyRoomProps {
  room: Room;
  players: { userId: string; display_name: string; avatar_color: string; is_host: boolean }[];
  currentUserId: string;
  onStartGame: () => void;
  onLeaveRoom: () => void;
}

export const LobbyRoom: React.FC<LobbyRoomProps> = ({
  room,
  players,
  currentUserId,
  onStartGame,
  onLeaveRoom,
}) => {
  const isHost = room.host_id === currentUserId;
  const canStart = players.length >= 2;

  const handleCopyCode = () => {
    navigator.clipboard.writeText(room.room_code);
    alert('Đã sao chép mã phòng: ' + room.room_code);
  };

  return (
    <div className="bg-[#1c2541] border border-gold-500 rounded-lg p-6 max-w-md w-full shadow-2xl mx-auto flex flex-col gap-5 text-center">
      <div>
        <h2 className="text-xl font-bold text-gold-400">Phòng Chờ Game</h2>
        <p className="text-xs text-slate-400 mt-1">Đợi mọi người tham gia để bắt đầu trò chơi</p>
      </div>

      <div className="bg-[#0f172a] border border-[#3a506b] p-3 rounded-lg flex flex-col gap-1 items-center">
        <span className="text-[10px] text-slate-400 font-bold uppercase tracking-wider">Mã Phòng</span>
        <div className="flex items-center gap-2">
          <span className="text-2xl font-black text-white tracking-widest">{room.room_code}</span>
          <button
            onClick={handleCopyCode}
            className="px-2 py-1 bg-gold-500 hover:bg-gold-600 rounded text-white font-bold text-[10px] active:scale-95 transition-all"
          >
            Sao chép
          </button>
        </div>
      </div>

      <div className="flex flex-col gap-2 align-start text-left">
        <span className="text-[10px] text-slate-400 font-bold uppercase tracking-wider mb-1">
          Thành Viên ({players.length}/{room.settings.maxPlayers})
        </span>
        <div className="flex flex-col gap-1.5 max-h-[150px] overflow-y-auto pr-1">
          {players.map((p) => (
            <div
              key={p.userId}
              className="flex justify-between items-center bg-[#0f172a] px-3 py-2 rounded border border-[#3a506b]/50 text-xs"
            >
              <div className="flex items-center gap-2">
                <div
                  className="w-4 h-4 rounded-full border border-white flex items-center justify-center text-[8px] font-bold text-white"
                  style={{ backgroundColor: p.avatar_color }}
                >
                  {p.display_name.substring(0, 1).toUpperCase()}
                </div>
                <span className="font-bold text-slate-200">
                  {p.display_name} {p.userId === currentUserId && '(Tôi)'}
                </span>
              </div>
              {p.is_host && (
                <span className="text-[8px] bg-gold-600 text-white font-bold px-1.5 py-0.5 rounded uppercase">
                  Chủ phòng
                </span>
              )}
            </div>
          ))}
        </div>
      </div>

      <div className="flex gap-3 justify-center mt-2">
        <button
          onClick={onLeaveRoom}
          className="px-4 py-2 bg-slate-700 hover:bg-slate-600 rounded text-slate-100 font-bold text-xs active:scale-95 transition-all"
        >
          Rời Phòng
        </button>

        {isHost ? (
          <button
            onClick={onStartGame}
            disabled={!canStart}
            className={`px-5 py-2 rounded text-white font-bold text-xs active:scale-95 transition-all shadow-lg
              ${canStart
                ? 'bg-green-600 hover:bg-green-700'
                : 'bg-slate-600 opacity-50 cursor-not-allowed'
              }`}
          >
            Bắt Đầu Trò Chơi
          </button>
        ) : (
          <div className="flex items-center justify-center text-[10px] text-slate-400 font-bold animate-pulse">
            Đang đợi Chủ phòng bấm bắt đầu...
          </div>
        )}
      </div>

      {isHost && !canStart && (
        <span className="text-[10px] text-red-400">Trò chơi cần tối thiểu 2 người để bắt đầu.</span>
      )}
    </div>
  );
};
