# Luminous Storefront

零依赖的响应式电商商品橱窗，原生 HTML/CSS/JS 实现，打开 `index.html` 即可运行。

## 功能

- 商品网格展示（品牌 / 评分 / 原价划线 / 角标）
- 实时关键词搜索（名称 / 品牌 / 品类）
- 分类筛选 Chips + 5 种排序（推荐 / 价格 / 评分 / 最新）
- 购物车抽屉：增减数量、合计金额、`localStorage` 持久化
- 响应式布局，移动端适配
- 无任何第三方依赖，可离线运行

## 设计参考

参考了 vercel/commerce 与 medusa 官方 storefront 的信息架构（搜索 + 分类 + 排序 + 网格），
用零依赖方案重新实现，去掉了框架门槛，适合作为任何电商前端的起点模板。

## 运行

直接用浏览器打开 `index.html`，或：

```bash
npx serve .
```

## License

MIT
