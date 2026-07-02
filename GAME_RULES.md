# LUẬT CHƠI CỜ TỶ PHÚ ONLINE (MONOPOLY RULES)

Chào mừng bạn đến với trò chơi Cờ Tỷ Phú trực tuyến! Dưới đây là hướng dẫn luật chơi chi tiết được lập trình đồng nhất trong hệ thống game.

---

## 1. Thiết Lập Ban Đầu
- **Số người chơi**: Từ 2 đến 4 người.
- **Vốn khởi điểm**: Mỗi người chơi nhận được **$1.500** từ Ngân Hàng.
- **Vị trí bắt đầu**: Tất cả người chơi xuất phát tại ô **Khởi Hành (GO)** (Vị trí 0).

---

## 2. Vòng Lặp Lượt Chơi (Turn Loop)
Trong lượt đi của mình, bạn sẽ thực hiện các bước sau:
1. **Đổ xúc xắc**: Đổ hai hạt xúc xắc ngẫu nhiên (1-6 nút).
2. **Di chuyển**: Di chuyển quân cờ của bạn theo chiều kim đồng hồ tương ứng với tổng số nút đổ được.
3. **Đổ xúc xắc đôi (Doubles)**:
   - Nếu bạn đổ được 2 hạt giống nhau, bạn sẽ được quyền đi thêm một lượt phụ nữa sau khi giải quyết ô hiện tại.
   - **Chú ý**: Nếu bạn đổ được xúc xắc đôi 3 lần liên tiếp trong cùng một lượt, bạn sẽ bị bắt đi tù ngay lập tức và kết thúc lượt đi.
4. **Giải quyết ô đất dừng chân** (Xem chi tiết ở mục 3).
5. **Thực hiện hành động phụ**: Xây nhà, bán nhà, thế chấp đất đai hoặc thương lượng đàm phán trao đổi với người chơi khác.
6. **Kết thúc lượt**: Chuyển lượt đi cho người chơi tiếp theo theo chiều kim đồng hồ.

---

## 3. Quy Tắc Giải Quyết Khi Dừng Chân Tại Các Ô (Landing Rules)

### Bất Động Sản Chưa Có Chủ (Đất thường, Ga tàu, Tiện ích):
Bạn có quyền mua bất động sản này từ Ngân Hàng với giá được in trên ô đất. Nếu bạn không muốn mua hoặc không đủ tiền, bạn có thể bấm **Bỏ qua**.

### Bất Động Sản Đã Có Chủ (Thuộc người chơi khác):
Bạn phải trả tiền thuê cho chủ sở hữu của ô đất đó.
- **Đất đai thông thường**:
  - Tiền thuê phụ thuộc vào số lượng nhà/khách sạn đã xây trên ô đất đó.
  - Nếu ô đất chưa xây nhà nhưng chủ đất sở hữu **độc quyền** toàn bộ các ô đất cùng màu (độc quyền màu - Monopoly) và không có ô nào trong nhóm màu đó bị thế chấp, tiền thuê đất trống sẽ được **nhân đôi**.
- **Ga tàu (Railroad)**:
  - Tiền thuê tăng dần theo số lượng ga tàu chủ đất sở hữu: 1 ga ($25), 2 ga ($50), 3 ga ($100), 4 ga ($200).
- **Công ty Điện / Nước (Utility)**:
  - Nếu chủ đất sở hữu 1 công ty tiện ích, tiền thuê bằng **Tổng xúc xắc x 4**.
  - Nếu chủ đất sở hữu cả 2 công ty tiện ích, tiền thuê bằng **Tổng xúc xắc x 10**.
- **Lưu ý**: Đất đang thế chấp sẽ được miễn trả tiền thuê khi có người chơi khác đi vào. Nếu chủ đất đang ở trong tù nhưng đất của họ không thế chấp, họ vẫn được quyền nhận tiền thuê đất bình thường.

### Cổng Khởi Hành (GO):
Mỗi lần người chơi đi qua hoặc dừng chân tại ô GO, họ sẽ nhận được tiền lương **$200** từ Ngân hàng.

### Nhà Tù (Jail):
- Nếu bạn chỉ di chuyển và dừng chân tại ô Nhà Tù, bạn được tính là khách viếng thăm (Just Visiting) và không bị phạt gì.
- Bạn sẽ vào tù khi: Dừng chân tại ô **Vào Tù (Go to Jail)**, rút phải thẻ yêu cầu vào tù, hoặc đổ xúc xắc đôi 3 lần liên tiếp. Khi vào tù, bạn được đưa thẳng đến ô Nhà Tù và kết thúc lượt đi mà không nhận tiền lương GO.

### Cách Ra Tù (Escape Jail):
Ở đầu lượt chơi trong tù, bạn có 3 lựa chọn để thoát:
1. **Nộp phạt $50** để ra tù ngay lập tức và đổ xúc xắc di chuyển bình thường.
2. **Dùng thẻ "Thoát tù miễn phí"** (nếu có) để ra tù miễn phí.
3. **Đổ xúc xắc**: Nếu bạn đổ được xúc xắc đôi (Doubles), bạn được ra tù miễn phí và di chuyển bằng số nút đó (lượt này không được tính thêm lượt phụ do đổ đôi).
- **Chú ý**: Nếu sau 3 lượt trong tù vẫn không đổ được đôi, bạn **bắt buộc** phải nộp phạt $50 và di chuyển bằng số nút của lượt đổ thứ ba.

### Ô Thuế (Income Tax & Luxury Tax):
Bạn phải nộp phạt trực tiếp số tiền thuế tương ứng cho Ngân hàng ($200 đối với Thuế Thu Nhập, $100 đối với Thuế Xa Xỉ).

### Thẻ Cơ Hội (Chance) & Khí Vận (Community Chest):
Bạn rút thẻ trên cùng từ bộ bài tương ứng và thực hiện ngay hiệu ứng ghi trên thẻ (nhận tiền, đóng phạt, di chuyển ô, đi tù, nhận thẻ ra tù miễn phí...).

---

## 4. Xây Dựng, Thế Chấp và Giao Dịch Trao Đổi

### Xây Dựng Nhà và Khách Sạn:
- Bạn chỉ được phép xây nhà khi đã sở hữu độc quyền tất cả các ô đất cùng màu và không có ô nào trong nhóm màu đó đang bị thế chấp.
- Quy tắc xây dựng đồng đều: Số lượng nhà trên các ô đất cùng nhóm màu không được chênh lệch nhau quá 1 căn (Bạn không thể xây nhà thứ 2 trên 1 ô nếu các ô khác trong nhóm màu đó chưa có ít nhất 1 nhà).
- Khi một ô đất đã có 4 căn nhà thường, lượt nâng cấp tiếp theo bạn sẽ đổi 4 nhà lấy 1 Khách Sạn (mỗi ô tối đa 1 Khách Sạn).
- Bán nhà: Bạn có thể bán lại nhà cho Ngân hàng bất cứ lúc nào với giá nhận lại bằng **50% giá xây dựng ban đầu**.

### Thế Chấp Tài Sản (Mortgage):
- Khi thiếu tiền, bạn có thể thế chấp các bất động sản không có nhà cửa cho Ngân hàng để nhận lại **50% giá trị mua ban đầu**. Đất thế chấp không thu được tiền thuê.
- Giải chấp: Bạn trả lại số tiền đã vay cộng thêm **10% lãi suất** (tức là trả 55% giá gốc của bất động sản đó) để giải chấp tài sản và tiếp tục nhận tiền thuê.

### Thương Lượng Trao Đổi (Trade):
- Bạn có thể đề xuất đàm phán trao đổi tài sản (đất trống, tiền mặt) với những người chơi khác bất cứ lúc nào trong lượt tự do của mình. Giao dịch chỉ được thực thi khi cả hai bên cùng chấp thuận (Accept).

---

## 5. Khủng Hoảng Nợ & Phá Sản
- Nếu bạn rơi vào tình trạng âm tiền sau khi trả thuế hoặc thuê đất, bạn sẽ lâm vào khủng hoảng nợ. Bạn **không thể kết thúc lượt đi** của mình nếu số tiền mặt vẫn còn bị âm.
- Để trả nợ, bạn phải thực hiện bán bớt nhà cửa hoặc thế chấp đất đai trống để huy động tiền mặt.
- **Tuyên bố phá sản**: Nếu đã thực hiện bán hết nhà cửa và thế chấp toàn bộ tài sản nhưng vẫn không đủ tiền trả nợ, bạn bắt buộc phải bấm **Tuyên bố phá sản**.
  - Nếu bạn nợ Ngân hàng: Toàn bộ tài sản bị tịch thu và trở lại trạng thái vô chủ, xóa hết nhà cửa. Bạn bị loại khỏi trò chơi.
  - Nếu bạn nợ Người chơi khác: Toàn bộ tiền mặt còn lại và các bất động sản của bạn (kể cả đang thế chấp) sẽ được chuyển giao toàn bộ cho chủ nợ đó. Bạn bị loại khỏi trò chơi.
- **Kết thúc trò chơi**: Trò chơi kết thúc khi chỉ còn duy nhất 1 người chơi chưa bị phá sản. Người đó chính là người chiến thắng chung cuộc!
