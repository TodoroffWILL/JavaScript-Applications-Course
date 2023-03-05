// import { multi,sum } from './test1.js'; NAMED IMPORT/EXPORT

import calculator, { multi, sum } from './export.js';

//DEFAULT EXPORT
// If the export is default we can name it AS WE WANT and it exports the one that we put 'default infront of it.
console.log(calculator.sum(10, 10));
console.log(calculator.multi(10, 20));

// NAMED EXPORTS !
// But the named modules with only 'export' infront of them MUST be by the same name !
console.log(multi(20, 20));
console.log(sum(10, 15));
