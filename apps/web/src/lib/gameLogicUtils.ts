import type { Tile, Player } from '../types';

/**
 * Tính tiền thuê đất dựa trên loại ô và trạng thái sở hữu
 */
export const calculateRent = (
  tile: Tile,
  ownerProperties: Tile[],
  diceSum: number
): number => {
  if (tile.mortgaged) return 0;

  if (tile.type === 'property') {
    if (tile.houses > 0) {
      return tile.rent[tile.houses] || 0;
    }
    // Nếu chưa xây nhà, kiểm tra xem chủ đất có độc quyền (Monopoly) nhóm màu không
    const color = tile.colorGroup;
    const sameColorTiles = ownerProperties.filter((t) => t.colorGroup === color);
    
    // Giả định tổng số ô của nhóm màu: brown & navy là 2, các nhóm khác là 3
    const requiredCount = (color === 'brown' || color === 'navy') ? 2 : 3;
    const isMonopoly = sameColorTiles.length === requiredCount && sameColorTiles.every(t => !t.mortgaged);
    
    return isMonopoly ? tile.rent[0] * 2 : tile.rent[0];
  }

  if (tile.type === 'railroad') {
    // Tính tiền ga tàu: 25 * 2^(số ga - 1)
    const railroadCount = ownerProperties.filter((t) => t.type === 'railroad').length;
    if (railroadCount <= 1) return 25;
    if (railroadCount === 2) return 50;
    if (railroadCount === 3) return 100;
    return 200; // Tối đa 4 ga là 200
  }

  if (tile.type === 'utility') {
    // Công ty Điện / Nước: xúc xắc x 4 hoặc x 10
    const utilityCount = ownerProperties.filter((t) => t.type === 'utility').length;
    return utilityCount === 2 ? diceSum * 10 : diceSum * 4;
  }

  return 0;
};

/**
 * Kiểm tra xem người chơi có thể xây nhà trên ô đất đó hay không
 */
export const canBuildHouse = (
  tile: Tile,
  ownerProperties: Tile[],
  playerCash: number
): { canBuild: boolean; reason?: string } => {
  if (tile.type !== 'property') {
    return { canBuild: false, reason: 'Chỉ có thể xây nhà trên Đất Đai' };
  }

  if (tile.mortgaged) {
    return { canBuild: false, reason: 'Đất đang bị thế chấp' };
  }

  if (tile.houses >= 5) {
    return { canBuild: false, reason: 'Đã đạt giới hạn tối đa (1 Khách Sạn)' };
  }

  if (playerCash < tile.housePrice) {
    return { canBuild: false, reason: 'Không đủ tiền xây dựng' };
  }

  const color = tile.colorGroup;
  const sameColorTiles = ownerProperties.filter((t) => t.colorGroup === color);
  const requiredCount = (color === 'brown' || color === 'navy') ? 2 : 3;

  if (sameColorTiles.length < requiredCount) {
    return { canBuild: false, reason: 'Bạn phải sở hữu độc quyền toàn bộ nhóm màu trước khi xây nhà' };
  }

  if (sameColorTiles.some((t) => t.mortgaged)) {
    return { canBuild: false, reason: 'Một trong các ô thuộc nhóm màu đang bị thế chấp' };
  }

  // Quy tắc xây đều (Even Building Rule)
  const minHousesInGroup = Math.min(...sameColorTiles.map((t) => t.houses));
  if (tile.houses > minHousesInGroup) {
    return { canBuild: false, reason: 'Quy tắc xây đồng đều: Cần nâng cấp các ô khác trong nhóm màu trước' };
  }

  return { canBuild: true };
};

/**
 * Kiểm tra phá sản
 */
export const checkBankruptcy = (
  cash: number,
  totalAssetsValue: number
): boolean => {
  // Phá sản khi tiền mặt âm và tổng giá trị tài sản có thể thế chấp/bán không đủ trả nợ
  return cash < 0 && (cash + totalAssetsValue) < 0;
};

/**
 * Kiểm tra điều kiện thắng cuộc
 */
export const getWinner = (players: Player[]): Player | null => {
  const activePlayers = players.filter((p) => !p.isBankrupt);
  return activePlayers.length === 1 ? activePlayers[0] : null;
};
