/*
 * @typedef WishItem
 * @property {string} name
 * @property {number} price
 * @param {WishItem} items
 */
const generate2DArray = (height, width) => {
	return [...Array(height)].map(() => Array(width).fill(0));
}

//n is sorted.
export const optimization = (items, w) => {
	const n = items.length;
	let dp = generate2DArray(n, w + 1);
	for (let i = items[0].price; i <= w; i++) {
		dp[0][i] = n;
	}
	for (let i = 1; i < n; i++) {
		for (let j = 0; j <= w; j++) {
			let priority = n - i;
			if (j+items[i].price <= w) {
				dp[i][j+items[i].price] = Math.max(dp[i-1][j+items[i].price],dp[i-1][j]+items[i].price);
			}else {
				dp[i][w-j] = Math.max(dp[i][w-j],dp[i-1][w-j]);
			}
		}
	}
	const price = dp[n-1][w];
	let v = [];
	for (let i = 1; i < 1 << n; i++) {
		v = [];
		let total = 0;
		for (let j = 0; j < n; j++) {
			if ((i & 1 << j) > 0) {
				v.push(j);
				total += items[j].price;
			}
		}
		if (total == price) {
			return v;
		}
	}
}
