/*jshint esversion: 6*/
'use strict';

const compareArrays = (a, b) => JSON.stringify(a) === JSON.stringify(b);

console.log(compareArrays([8, 9], [6])); // false, разные значения
console.log(compareArrays([9, 2], [9])); // false, разные значения
console.log(compareArrays([1, 2, 3], [2, 3, 1])); // false, разные индексы, хотя и одинаковые значения
console.log(compareArrays([8, 1, 2], [8, 1, 2])); // true

function memoize(fn, limit) {
	const results = []; // из задания непонятно, как должен называться массив, либо results, либо memory, остановился на results
	return function() {
		const argues = Array.from(arguments);
		const cache = results.find(x => compareArrays(x.args, argues));
		if (cache) {
			console.log(`Результат нашёлся в кэше`);
			return cache.result;
		}
		console.log(`В кэше результата нет, вычисляем результат`);
		const result = fn(...argues);
		results.push({
			args: argues,
			result: result
		});
		if (results.length > limit) {
			results.shift();
			console.log(`Пришлось удалить самый старый результат`);
		}
		console.log(results);
		return result;
	};
}

const sum = (a, b) => a + b;

const mSum = memoize(sum, 2); // 2 результата хранятся в памяти

mSum( 3, 4 ); // 7
mSum( 3, 4 ); // 7
mSum( 1, 3 ); // 4
mSum( 1, 3 ); // 4
mSum( 1, 3 ); // 4
mSum( 1, 5 );
mSum( 1, 5 );
mSum( 3, 4 ); // 7