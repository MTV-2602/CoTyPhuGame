import { useEffect } from 'react';
import { supabase } from '../lib/supabase';
import { useGameStore } from '../store/useGameStore';

export const useRealtimeRoom = () => {
  const room = useGameStore((state) => state.room);
  const fetchRoomData = useGameStore((state) => state.fetchRoomData);

  useEffect(() => {
    if (!room?.id) return;

    // Thiết lập kênh lắng nghe thay đổi thời gian thực
    const channel = supabase
      .channel(`room-channel:${room.id}`)
      .on(
        'postgres_changes',
        { event: '*', schema: 'public', table: 'rooms', filter: `id=eq.${room.id}` },
        () => {
          fetchRoomData(room.id);
        }
      )
      .on(
        'postgres_changes',
        { event: '*', schema: 'public', table: 'room_players', filter: `room_id=eq.${room.id}` },
        () => {
          fetchRoomData(room.id);
        }
      )
      .on(
        'postgres_changes',
        { event: '*', schema: 'public', table: 'game_states', filter: `room_id=eq.${room.id}` },
        () => {
          fetchRoomData(room.id);
        }
      )
      .on(
        'postgres_changes',
        { event: '*', schema: 'public', table: 'game_trades', filter: `room_id=eq.${room.id}` },
        () => {
          fetchRoomData(room.id);
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, [room?.id, fetchRoomData]);
};
