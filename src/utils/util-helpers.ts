export const UtilHelpers = {
	range(start: number, end: number): number[] {
		if (start === end) return [start];
		return [start, ...this.range(start + 1, end)];
	},
	normalize(val: number, min: number, max: number) {
		return (val - min) / (max - min);
	},
	randomNumber(min: number, max: number) {
		return Math.floor(Math.random() * (max - min + 1)) + min;
	},
	removeDuplicates(arr: any[]) {
		return [...new Set(arr)];
	},
	isArray(arr: any[]) {
		return Array.isArray(arr);
	},
	isObject(obj: any) {
		return typeof obj === 'object' && obj !== null;
	},
	isFunction(func: any) {
		return typeof func === 'function';
	},
	isEmpty(val: any) {
		return val === null || val == undefined || (typeof val === 'string' && val.trim() === '') || (this.isArray(val) && val.length === 0) || (typeof val === 'object' && Object.keys(val).length === 0);
	},
	deepClone(obj: any) {
		return JSON.parse(JSON.stringify(obj));
	},
	mergeObjects(target: any, source: any) {
		return Object.assign({}, target, source);
	},
	capitalize(str: string) {
		return str.charAt(0).toUpperCase() + str.slice(1);
	},
	titleCase(str: string) {
		return str.replace(/\w\S*/g, text => text.charAt(0).toUpperCase() + text.substring(1).toLowerCase());
	},
	reverseString(str: string) {
		return str.split('').reverse().join('');
	},
	camelCase(str: string) {
		let result = str.toLowerCase();
		return result.split(' ').reduce((s, c) => s + (c.charAt(0).toUpperCase() + c.slice(1)));
	},
	getFromIndex(array: any[], fieldCheck: string, value: any, returnField = null) {
		const index = array.findIndex((a) => a[fieldCheck] == value);
		if (returnField) return array[index][returnField];
		return array[index];
	},
	parsePlainTextList(punct: string, content: string) {
		const lines = content.trim().split('\n');
		const list = lines.filter(line => line.trim().startsWith(punct)).map(line => line.trim().substring(1).trim());
		return list;
	}
}