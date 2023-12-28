const generate2DArray = (height, width) => {
	return [...Array(height)].map(() => Array(width).fill(0));
}
//items : オブジェクトの配列,w : お年玉の額
export const optimization = (items, w) => {
	console.log(items);
	console.log(w);
	const n = items.length;
	//dp[i][j] := i番目までの商品を選んだ時にj円を超えないような最大の優先度がはいる
	let dp = generate2DArray(n, w + 1);
	for (let i = Number(items[0].price); i <= w; i++) {
		dp[0][i] = n;
	}
	for (let i = 1; i < n; i++) {
		for (let j = 0; j <= w; j++) {
			let priority = n - i; //優先度を評価します
			if (j + Number(items[i].price) <= w) {
				dp[i][j + Number(items[i].price)] = Math.max(dp[i - 1][j + Number(items[i].price)], dp[i - 1][j] + priority); //お年玉の額を超えないように比較する
			} else {
				dp[i][w - j] = Math.max(dp[i][w - j], dp[i - 1][w - j]); //ifで条件が合った時j番目より先の値が更新されている可能性が高いので比較する必要がある
			}
		}
	}
	const max_priority = dp[n - 1][w]; //最終的に使う額
	let v = []; //結果を代入するArray
	//組み合わせの全列挙をしてpriceに合うような組み合わせを列挙
	for (let i = 1; i < 1 << n; i++) {
		v = [];
		let total = 0;
		for (let j = 0; j < n; j++) {
			if ((i & 1 << j) > 0) {
				v.push(j);
				total += n - j;
			}
		}
		if (total == max_priority) {
			console.log(v);
			return v;
		}
	}
}
