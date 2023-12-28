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

  array.forEach((item) => {
    
  });
}

mapTree([]);