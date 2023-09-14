// 1: Print numbers from 1 to 10
for (let i = 1; i <= 10; i++) {
    console.log(i)
}

// 2: Print the odd numbers less than 100
for (let i = 1; i <= 100; i += 2) {
    // console.log(i)
}
// 3: Print the multiplication table with 7
for (let i = 1; i <= 10; i++) {
    // console.log("7 * " + i + " = " + 7 * i);
}

//  Print all the multiplication tables with numbers from 1 to 10
for (let i = 1; i <= 10; i++) {
    for (let j = 0; j <= 10; j++) {
        // console.log(i + " * " + j + " = " + i * j);
    }
}

// : Calculate the sum of numbers in an array of numbers
let ar = [2, 3, -1, 5, 7, 9, 10, 15, 95];
let sum = 0;
// for (let i = 0; i < ar.length; i++) {
//     sum += ar[i];
// }
// ar.forEach((x)=> sum += x)
ar.map(x => sum += x)
console.log(sum / ar.length);
let sumreduce = ar.reduce((x, y) => x + y)
console.log(sumreduce);

// Create a function that receives an array of numbers and returns an array containing only the positive numbers
let ar2 = []
ar.forEach(element => {
    if (element > 0) {
        ar2.push(element)
    }
});
console.log(ar2);
let ar3 = ar.filter(x => x > 0)
console.log(ar3);

// Find the maximum number in an array of numbers
let maxnum = ar[0]
for (let i = 0; i < ar.length; i++) {
    if (ar[i] > maxnum)
        maxnum = ar[i]
}
console.log(maxnum);
let maxnum2 = ar.reduce((x, y) => {
    return y > x ? y : x;
}, ar[0])
console.log(maxnum2);

// : Print the first 10 Fibonacci numbers without recursion
let f0 = 0;
let f1 = 1;
for (let i = 2; i < 10; i++) {
    let fi = f1 + f0;
    console.log(fi);
    f0 = f1;
    f1 = fi;
}
 // with recursion
function findFibonacci(n) {
    if (n == 0)
        return 0;

    if (n == 1)
        return 1;

    return findFibonacci(n - 1) + findFibonacci(n - 2);
}

let n = findFibonacci(10);
console.log(n);