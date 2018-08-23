// source https://gist.github.com/jonschlinkert/2c5e5cd8c3a561616e8572dd95ae15e3
export function zip(a, b) {
	const arr: any[] = [];
	for (const key in a) {
		if (a.hasOwnProperty(key)) {
			arr.push([a[key], b[key]]);
		}
	}
	return arr;
}