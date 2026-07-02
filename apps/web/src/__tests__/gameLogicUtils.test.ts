import { describe, it, expect } from 'vitest';
import { calculateRent, canBuildHouse, checkBankruptcy, getWinner } from '../lib/gameLogicUtils';
import type { Tile, Player } from '../types';

describe('Cờ Tỷ Phú - Game Logic Utilities Tests', () => {
  const mockTile = (index: number, type: any, price: number, rent: number[], color: any = null): Tile => ({
    index,
    name: `Ô đất ${index}`,
    type,
    colorGroup: color,
    price,
    rent,
    housePrice: 50,
    houses: 0,
    ownerId: null,
    mortgaged: false,
  });

  describe('1. Tính toán tiền thuê đất (calculateRent)', () => {
    it('Trả về 0 nếu đất đang bị thế chấp', () => {
      const tile = mockTile(1, 'property', 60, [2, 10, 30, 90, 160, 250], 'brown');
      tile.mortgaged = true;
      const rent = calculateRent(tile, [], 7);
      expect(rent).toBe(0);
    });

    it('Tính tiền thuê đất trống bình thường nếu chưa xây nhà và không độc quyền', () => {
      const tile = mockTile(1, 'property', 60, [2, 10, 30, 90, 160, 250], 'brown');
      const ownerProperties = [tile];
      const rent = calculateRent(tile, ownerProperties, 7);
      expect(rent).toBe(2);
    });

    it('Nhân đôi tiền thuê đất trống nếu chủ đất sở hữu độc quyền (Monopoly) nhóm màu', () => {
      const tile1 = mockTile(1, 'property', 60, [2, 10, 30, 90, 160, 250], 'brown');
      const tile2 = mockTile(3, 'property', 60, [4, 20, 60, 180, 320, 450], 'brown');
      const ownerProperties = [tile1, tile2];
      const rent = calculateRent(tile1, ownerProperties, 7);
      expect(rent).toBe(4);
    });

    it('Tính tiền thuê ga tàu dựa trên số lượng ga sở hữu', () => {
      const rail = mockTile(5, 'railroad', 200, [25, 50, 100, 200]);
      expect(calculateRent(rail, [rail], 7)).toBe(25);
      const rail2 = mockTile(15, 'railroad', 200, [25, 50, 100, 200]);
      const rail3 = mockTile(25, 'railroad', 200, [25, 50, 100, 200]);
      expect(calculateRent(rail, [rail, rail2, rail3], 7)).toBe(100);
    });

    it('Tính tiền tiện ích dựa trên tổng điểm đổ xúc xắc', () => {
      const util = mockTile(12, 'utility', 150, [4, 10]);
      expect(calculateRent(util, [util], 7)).toBe(28);
      const util2 = mockTile(28, 'utility', 150, [4, 10]);
      expect(calculateRent(util, [util, util2], 7)).toBe(70);
    });
  });

  describe('2. Quy tắc xây nhà (canBuildHouse)', () => {
    it('Không cho phép xây nếu không phải ô đất thường', () => {
      const rail = mockTile(5, 'railroad', 200, [25]);
      const result = canBuildHouse(rail, [rail], 500);
      expect(result.canBuild).toBe(false);
      expect(result.reason).toBe('Chỉ có thể xây nhà trên Đất Đai');
    });

    it('Không cho phép xây nếu không đủ tiền', () => {
      const tile = mockTile(1, 'property', 60, [2, 10], 'brown');
      const result = canBuildHouse(tile, [tile], 20);
      expect(result.canBuild).toBe(false);
      expect(result.reason).toBe('Không đủ tiền xây dựng');
    });

    it('Không cho phép xây nếu chưa sở hữu đủ bộ màu độc quyền', () => {
      const tile1 = mockTile(1, 'property', 60, [2, 10], 'brown');
      const result = canBuildHouse(tile1, [tile1], 500);
      expect(result.canBuild).toBe(false);
      expect(result.reason).toContain('độc quyền');
    });

    it('Cho phép xây nếu đã đủ điều kiện độc quyền và đủ tiền', () => {
      const tile1 = mockTile(1, 'property', 60, [2, 10], 'brown');
      const tile2 = mockTile(3, 'property', 60, [4, 20], 'brown');
      const result = canBuildHouse(tile1, [tile1, tile2], 500);
      expect(result.canBuild).toBe(true);
    });

    it('Không cho phép xây nếu vi phạm quy tắc xây dựng đồng đều', () => {
      const tile1 = mockTile(1, 'property', 60, [2, 10], 'brown');
      tile1.houses = 2;
      const tile2 = mockTile(3, 'property', 60, [4, 20], 'brown');
      tile2.houses = 0;
      const result = canBuildHouse(tile1, [tile1, tile2], 500);
      expect(result.canBuild).toBe(false);
      expect(result.reason).toContain('Quy tắc xây đồng đều');
    });
  });

  describe('3. Kiểm tra phá sản & Người thắng cuộc', () => {
    it('Tuyên bố phá sản khi tiền mặt âm và không đủ tài sản trả nợ', () => {
      expect(checkBankruptcy(-500, 400)).toBe(true);
      expect(checkBankruptcy(-500, 600)).toBe(false);
    });

    it('Tìm ra người thắng cuộc duy nhất chưa phá sản', () => {
      const p1: Player = { userId: '1', name: 'A', avatarColor: 'blue', cash: 1000, position: 0, inJail: false, jailTurns: 0, isBankrupt: false, doubleRollCount: 0 };
      const p2: Player = { userId: '2', name: 'B', avatarColor: 'red', cash: 0, position: 0, inJail: false, jailTurns: 0, isBankrupt: true, doubleRollCount: 0 };
      const p3: Player = { userId: '3', name: 'C', avatarColor: 'green', cash: 0, position: 0, inJail: false, jailTurns: 0, isBankrupt: true, doubleRollCount: 0 };
      const winner = getWinner([p1, p2, p3]);
      expect(winner?.userId).toBe('1');
    });
  });
});
