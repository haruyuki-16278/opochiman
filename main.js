/**
 * @typedef WishItem
 * @property {string} name
 * @property {number} price
 */

/**
 * 配列を受け取ってツリーマップに描画する関数
 * @param {WishItem[]} array 
 */
function mapTree(array) {
  /* 現在のお年玉合計金額 */
  const money = Number(localStorage.getItem('money'));
  /* 欲しい物リスト */
  const wishlist = JSON.parse(localStorage.getItem('wishlist'));

  /**
   * @type {HTMLCanvasElement} canvas
   */
  const canvas = document.getElementById('treemapView');
  const ctx = canvas.getContext('2d');
  if (!ctx) return;
  ctx.canvas.height = canvas.clientHeight;
  ctx.canvas.width = canvas.clientWidth;

  const area = ctx.canvas.height * ctx.canvas.width;
  const fillFromHeight = ctx.canvas.height < ctx.canvas.width;

  const whitespace = {x: 0, y: 0};

  array.sort((a, b) => b.price - a.price);

  array.forEach((item, i) => {
    const rate = item.price / money;
    const size = (fillFromHeight + i) % 2 === 1
                 ? area * rate / (ctx.canvas.height - whitespace.y)
                 : area * rate / (ctx.canvas.width - whitespace.x);
    const nameText = String(item.name)
    const priceText = String(item.price) + '円'
    const nameTextMetrics = ctx.measureText(nameText)
    const priceTextMetrics = ctx.measureText(priceText)

    if((fillFromHeight + i) % 2 === 1) { // 縦にfullで埋める処理
      // 矩形描画
      ctx.fillStyle = '#CBC8C6';
      ctx.fillRect(whitespace.x, whitespace.y, size, ctx.canvas.height - whitespace.y);
      ctx.strokeStyle = '#D44936';
      ctx.lineWidth = 4;
      ctx.strokeRect(whitespace.x, whitespace.y, size, ctx.canvas.height - whitespace.y);

      // テキスト描画
      const center = { // 矩形の重心
        x: whitespace.x + size / 2,
        y: whitespace.y + (ctx.canvas.height - whitespace.y) / 2
      };
      ctx.font = '12pt Arial';
      ctx.fillStyle = '#000000';
      ctx.fillText(nameText, center.x - (nameTextMetrics.width / 2), center.y);
      ctx.fillText(priceText, center.x - (priceTextMetrics.width / 2), center.y + 20);

      whitespace.x += size;
    }
    else { // 横にfullで埋める処理
      // 矩形描画
      ctx.fillStyle = '#CBC8C6';
      ctx.fillRect(whitespace.x, whitespace.y, ctx.canvas.width - whitespace.x, size);
      ctx.strokeStyle = '#D44936';
      ctx.lineWidth = 4;
      ctx.strokeRect(whitespace.x, whitespace.y, ctx.canvas.width - whitespace.x, size);

      // テキスト描画
      const center = { // 矩形の重心
        x: whitespace.x + (ctx.canvas.width - whitespace.x) / 2,
        y: whitespace.y + size / 2
      };
      ctx.font = '12pt Arial';
      ctx.fillStyle = '#000000';
      ctx.fillText(nameText, center.x - (nameTextMetrics.width / 2), center.y);
      ctx.fillText(priceText, center.x - (priceTextMetrics.width / 2), center.y + 20);

      whitespace.y += size;
    }

  });
}

mapTree(JSON.parse(localStorage.getItem('wishlist')));