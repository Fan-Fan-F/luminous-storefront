// 内置演示商品数据（原创虚构）
const PRODUCTS = [
  { id: 1,  name: "极简陶瓷马克杯", brand: "MUYU", category: "家居", price: 49,  originalPrice: 69,  rating: 4.8, reviews: 326, emoji: "☕", hue: 12,  badge: "热卖", createdAt: "2026-10-02" },
  { id: 2,  name: "北欧原木台灯", brand: "NORDIK", category: "家居", price: 199, originalPrice: 259, rating: 4.6, reviews: 158, emoji: "💡", hue: 45,  badge: null, createdAt: "2026-09-18" },
  { id: 3,  name: "轻量便携蓝牙音箱", brand: "SOUNDPOD", category: "数码", price: 169, originalPrice: null, rating: 4.7, reviews: 892, emoji: "🔊", hue: 210, badge: "新品", createdAt: "2026-11-05" },
  { id: 4,  name: "机械键盘 87 键", brand: "KEYFORGE", category: "数码", price: 329, originalPrice: 399, rating: 4.9, reviews: 1204, emoji: "⌨️", hue: 250, badge: "热卖", createdAt: "2026-08-22" },
  { id: 5,  name: "人体工学腰靠", brand: "ERGOLIFE", category: "办公", price: 129, originalPrice: null, rating: 4.5, reviews: 445, emoji: "🪑", hue: 160, badge: null, createdAt: "2026-10-11" },
  { id: 6,  name: "桌面收纳套装", brand: "MUYU", category: "办公", price: 79,  originalPrice: 99,  rating: 4.4, reviews: 233, emoji: "🗃️", hue: 30,  badge: null, createdAt: "2026-09-30" },
  { id: 7,  name: "冷萃咖啡壶 800ml", brand: "BREWLAB", category: "厨房", price: 139, originalPrice: 179, rating: 4.8, reviews: 567, emoji: "🫗", hue: 20,  badge: null, createdAt: "2026-10-25" },
  { id: 8,  name: "铸铁珐琅锅 24cm", brand: "COCOTTE", category: "厨房", price: 459, originalPrice: 599, rating: 4.9, reviews: 310, emoji: "🍲", hue: 350, badge: "精品", createdAt: "2026-09-05" },
  { id: 9,  name: "速干运动毛巾", brand: "SWIFT", category: "运动", price: 39,  originalPrice: null, rating: 4.3, reviews: 198, emoji: "🏃", hue: 190, badge: null, createdAt: "2026-11-01" },
  { id: 10, name: "瑜伽垫加厚 8mm", brand: "ZENFLOW", category: "运动", price: 99,  originalPrice: 139, rating: 4.6, reviews: 754, emoji: "🧘", hue: 280, badge: "热卖", createdAt: "2026-08-15" },
  { id: 11, name: "降噪头戴耳机", brand: "SOUNDPOD", category: "数码", price: 599, originalPrice: 799, rating: 4.7, reviews: 2031, emoji: "🎧", hue: 230, badge: "精品", createdAt: "2026-10-19" },
  { id: 12, name: "香薰蜡烛礼盒", brand: "NORDIK", category: "家居", price: 119, originalPrice: null, rating: 4.5, reviews: 287, emoji: "🕯️", hue: 40,  badge: null, createdAt: "2026-11-08" },
  { id: 13, name: "不锈钢保温杯 500ml", brand: "THERMOS+", category: "户外", price: 89,  originalPrice: 119, rating: 4.6, reviews: 1120, emoji: "🥤", hue: 200, badge: null, createdAt: "2026-09-27" },
  { id: 14, name: "折叠野餐垫", brand: "OUTDOORX", category: "户外", price: 69,  originalPrice: null, rating: 4.4, reviews: 156, emoji: "🏕️", hue: 120, badge: null, createdAt: "2026-10-30" },
  { id: 15, name: "无线充电台灯", brand: "LUMEN", category: "数码", price: 219, originalPrice: 269, rating: 4.5, reviews: 340, emoji: "🔦", hue: 55,  badge: "新品", createdAt: "2026-11-10" },
  { id: 16, name: "手冲咖啡套装", brand: "BREWLAB", category: "厨房", price: 259, originalPrice: 329, rating: 4.8, reviews: 429, emoji: "🫘", hue: 25,  badge: null, createdAt: "2026-09-12" },
];

const CATEGORIES = ["全部", ...new Set(PRODUCTS.map(p => p.category))];
