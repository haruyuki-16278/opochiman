//items : オブジェクトの配列,w : お年玉の額
export const optimization = (items, w) => {
	const n = items.length;
	let v = []; //結果を代入するArray
	let best_result = [];
	let priority_result = 0;
	//組み合わせの全列挙をしてpriceに合うような組み合わせを列挙
	for (let i = 1; i < (1 << n); i++) {
		v = [];
		let priority_total = 0;
		let money_total = 0;
		for (let j = 0; j < n; j++) {
			if ((i & 1 << j) > 0 && money_total + Number(items[j].price) <= w) {
				v.push(j);
				priority_total += n - j;
				money_total += Number(items[j].price);
			}
		}
		if (priority_total >= priority_result) {
			best_result = v;
			priority_result = priority_total;
		}
	}
	return best_result;
}
