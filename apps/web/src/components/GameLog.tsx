import React, { useEffect, useRef } from 'react';

interface LogItem {
  time: string;
  text: string;
}

interface GameLogProps {
  logs: LogItem[];
}

export const GameLog: React.FC<GameLogProps> = ({ logs }) => {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Tự động cuộn xuống dưới cùng khi có log mới
    if (containerRef.current) {
      containerRef.current.scrollTop = containerRef.current.scrollHeight;
    }
  }, [logs]);

  return (
    <div className="flex flex-col gap-1 w-full bg-[#0f172a] border border-[#3a506b] rounded-lg p-2 shadow-inner">
      <span className="text-[10px] text-gold-400 font-bold uppercase tracking-wider mb-1">Nhật Ký Trận Đấu</span>
      <div
        ref={containerRef}
        className="flex flex-col gap-1 overflow-y-auto h-[100px] text-[10px] pr-1 scrollbar-thin text-slate-300 font-medium"
      >
        {logs.map((log, idx) => (
          <div key={idx} className="flex gap-1.5 items-start border-b border-[#3a506b]/20 pb-0.5">
            <span className="text-slate-500 select-none">
              {new Date(log.time).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' })}
            </span>
            <span className="flex-1 text-slate-200">{log.text}</span>
          </div>
        ))}
        {logs.length === 0 && (
          <span className="text-slate-500 text-center py-4">Chưa có nhật ký hoạt động nào.</span>
        )}
      </div>
    </div>
  );
};
