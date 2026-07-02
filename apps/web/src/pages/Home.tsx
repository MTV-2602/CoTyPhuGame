import React, { useState } from 'react';
import { useGameStore } from '../store/useGameStore';

export const Home: React.FC = () => {
  const {
    userName,
    setUserName,
    userAvatarColor,
    setUserAvatarColor,
    createRoom,
    joinRoom,
    error,
    setError,
    loading,
  } = useGameStore();

  const [inputName, setInputName] = useState(userName);
  const [inputRoomCode, setInputRoomCode] = useState('');
  const [maxPlayers, setMaxPlayers] = useState(4);
  const [startMoney, setStartMoney] = useState(1500);
  const [avatarColor, setAvatarColor] = useState(userAvatarColor);

  const colors = [
    '#3b82f6', // Blue
    '#ef4444', // Red
    '#10b981', // Green
    '#f59e0b', // Orange/Yellow
    '#8b5cf6', // Purple
    '#ec4899', // Pink
  ];

  const handleCreate = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputName.trim()) {
      setError('Vui lòng nhập tên của bạn');
      return;
    }
    setUserName(inputName.trim());
    setUserAvatarColor(avatarColor);
    await createRoom(maxPlayers, startMoney);
  };

  const handleJoin = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputName.trim()) {
      setError('Vui lòng nhập tên của bạn');
      return;
    }
    if (!inputRoomCode.trim()) {
      setError('Vui lòng nhập mã phòng');
      return;
    }
    setUserName(inputName.trim());
    setUserAvatarColor(avatarColor);
    await joinRoom(inputRoomCode.trim());
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4 bg-[#0b1329] select-none text-white">
      <div className="bg-[#1c2541] border border-[#3a506b] rounded-lg p-6 max-w-md w-full shadow-2xl flex flex-col gap-5">
        <div className="text-center">
          <h1 className="text-3xl font-black text-gold-400 tracking-wider">CỜ TỶ PHÚ</h1>
          <span className="text-[10px] text-slate-400 font-bold uppercase tracking-widest block mt-0.5">
            MULTIPLAYER MONOPOLY
          </span>
        </div>

        {error && (
          <div className="bg-red-900/60 border border-red-500 text-red-100 p-2.5 rounded text-xs text-center font-semibold">
            {error}
          </div>
        )}

        <div className="flex flex-col gap-4 text-xs">
          {/* Nhập tên */}
          <div className="flex flex-col gap-1">
            <label className="text-slate-300 font-bold">Tên hiển thị:</label>
            <input
              type="text"
              maxLength={20}
              value={inputName}
              onChange={(e) => setInputName(e.target.value)}
              className="bg-[#0f172a] text-white border border-[#3a506b] p-2 rounded w-full font-bold focus:outline-none focus:ring-1 focus:ring-gold-500"
              placeholder="Nhập tên của bạn..."
            />
          </div>

          {/* Chọn màu đại diện */}
          <div className="flex flex-col gap-1">
            <label className="text-slate-300 font-bold">Chọn màu đại diện:</label>
            <div className="flex gap-2.5 mt-1 justify-center">
              {colors.map((c) => (
                <button
                  key={c}
                  type="button"
                  onClick={() => setAvatarColor(c)}
                  style={{ backgroundColor: c }}
                  className={`w-6 h-6 rounded-full border-2 transition-all duration-150 active:scale-90
                    ${avatarColor === c ? 'border-white ring-2 ring-gold-400 scale-110' : 'border-transparent'}`}
                />
              ))}
            </div>
          </div>
        </div>

        {/* Tách biệt hai lựa chọn */}
        <div className="grid grid-cols-2 gap-4 border-t border-[#3a506b] pt-4 mt-1">
          {/* Cột tạo phòng */}
          <form onSubmit={handleCreate} className="flex flex-col gap-2 border-r border-[#3a506b]/50 pr-4">
            <span className="text-[10px] text-gold-400 font-bold uppercase tracking-wider text-center block mb-1">
              TẠO PHÒNG MỚI
            </span>
            <div className="flex flex-col gap-1 text-[10px] text-slate-300">
              <label>Số người chơi tối đa:</label>
              <select
                value={maxPlayers}
                onChange={(e) => setMaxPlayers(parseInt(e.target.value))}
                className="bg-[#0f172a] text-white border border-[#3a506b] p-1.5 rounded focus:outline-none focus:ring-1 focus:ring-gold-500"
              >
                <option value={2}>2 Người</option>
                <option value={3}>3 Người</option>
                <option value={4}>4 Người</option>
              </select>
            </div>
            <div className="flex flex-col gap-1 text-[10px] text-slate-300">
              <label>Vốn xuất phát ($):</label>
              <input
                type="number"
                min={500}
                max={5000}
                value={startMoney}
                onChange={(e) => setStartMoney(parseInt(e.target.value) || 1500)}
                className="bg-[#0f172a] text-white border border-[#3a506b] p-1.5 rounded focus:outline-none focus:ring-1 focus:ring-gold-500"
              />
            </div>
            <button
              type="submit"
              disabled={loading}
              className="mt-2 w-full py-2 bg-gold-500 hover:bg-gold-600 rounded text-white font-bold text-xs active:scale-95 transition-all shadow-md"
            >
              {loading ? 'Đang tạo...' : 'Tạo phòng'}
            </button>
          </form>

          {/* Cột vào phòng */}
          <form onSubmit={handleJoin} className="flex flex-col gap-2 justify-between">
            <div>
              <span className="text-[10px] text-gold-400 font-bold uppercase tracking-wider text-center block mb-1">
                VÀO PHÒNG CÓ SẴN
              </span>
              <div className="flex flex-col gap-1 text-[10px] text-slate-300">
                <label>Nhập mã phòng (6 ký tự):</label>
                <input
                  type="text"
                  maxLength={6}
                  value={inputRoomCode}
                  onChange={(e) => setInputRoomCode(e.target.value.toUpperCase())}
                  className="bg-[#0f172a] text-white border border-[#3a506b] p-1.5 rounded text-center tracking-widest font-black uppercase placeholder-slate-600 text-xs focus:outline-none focus:ring-1 focus:ring-gold-500"
                  placeholder="ABCDEF"
                />
              </div>
            </div>
            <button
              type="submit"
              disabled={loading}
              className="mt-4 w-full py-2 bg-green-600 hover:bg-green-700 rounded text-white font-bold text-xs active:scale-95 transition-all shadow-md"
            >
              {loading ? 'Đang vào...' : 'Vào phòng'}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};
