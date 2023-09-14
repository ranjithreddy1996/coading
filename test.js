// // let arr1 = [1, 2, 3, 4, 5, 5]
// // let arr2 = [2, 4, 6, 8, 10, 10]
// // // Find the numbers which are not common to two arrays

// // // Output 1,3,5,6,8,10
// // let result = arr1.filter((val) => !arr2.includes(val))
// // console.log(result,"qwe");
// // const obj = {}
// // arr1.forEach((x) => { obj[x] = (obj[x] || 0) + 1 })
// // console.log(obj)

// // const obj2 = {}
// // arr2.forEach((x) => { obj2[x] = (obj2[x] || 0) + 1 })
// // console.log(obj2)
// // const abc = (one, two) => {
// //     const res = []
// //     for (let i = 0; i < one.length; i++) {
// //         if (two.indexOf(one[i]) === -1) {
// //             res.push(one[i])
// //         }
// //     }
// //     for (let j = 0; j < two.length; j++) {
// //         if (one.indexOf(two[j]) === -1) {
// //             res.push(two[j])
// //         }
// //     }
// //     let uni = []
// //     for (let i = 0; i < res.length; i++) {
// //         if (uni.indexOf(res[i]) === -1) {
// //             uni.push(res[i])
// //         }
// //     }
// //     return uni;
// // }

// // console.log(abc(arr1, arr2))
// // // var a = 6
// // // var a = c = b = 5; 
// // // console.log(a);


// // // var Input = ['india', 'usa', 'brazil', 'usa', 'brazil', 'brazil']
// // // const counts = {};
// // // Input.forEach((x) => { counts[x] = (counts[x] || 0) + 1; });
// // // for (const key in counts) {
// // //     if (` ${counts[key]}` >= 2) {
// // //         console.log(`${key}: ${counts[key]}`);
// // //     }
// // // }


// // // let INPUT = "Ranjith kumar reddy";
// // // let object = {}
// // // for (let i = 0; i < INPUT.length; i++) {
// // //     let ch = INPUT[i]
// // //     object[ch] = object[ch] ? object[ch] + 1 : 1
// // // }
// // // Object.keys(object).forEach(key => {
// // //     if (object[key] > 1) {
// // //         console.log(key, object[key]);
// // //     }
// // // })

// // // var Input = ['india', 'usa', 'brazil', 'usa', 'brazil', 'brazil']

// // // const counts2 = Input.reduce((acc, value) => (
// // //     {
// // //         ...acc,
// // //         [value]: (acc[value] || 0) + 1
// // //     }), {});

// // // console.log(counts2);




// // // var a = [
// // //     { startDate: '1-Dec-2019', endDate: '31-Dec-2019', payment: 900 },
// // //     { startDate: '1-Jan-2020', endDate: '31-Jan-2020', payment: 901 },
// // //     { startDate: '1-Feb-2020', endDate: '29-Feb-2020', payment: 902 },
// // //     { startDate: '1-Mar-2020', endDate: '31-Mar-2020', payment: 903 },
// // //     { startDate: '1-Apr-2020', endDate: '30-Apr-2020', payment: 904 },
// // // ]
// // // var b = [
// // //     { startDate: '1-Nov-2019', endDate: '30-Nov-2019', dueAmount: 800 },
// // //     { startDate: '1-Dec-2019', endDate: '31-Dec-2019', dueAmount: 801 },
// // //     { startDate: '1-Jan-2020', endDate: '31-Jan-2020', dueAmount: 802 },
// // //     { startDate: '10-Feb-2020', endDate: '28-Feb-2020', dueAmount: 803 },
// // //     { startDate: '1-Mar-2020', endDate: '31-Mar-2020', dueAmount: 804 },
// // // ]


// // // var arr = []
// // // arr.push(2)
// // // arr[10] = 4
// // // arr.push(3)
// // // console.log(arr);

// // // function add(a, b, c) {
// // //   return a + b + c

// // // }
// // // console.log(add());
// // // console.log(add(1, 2, 3, 4));
// // // console.log(add(1, 2));

// // // var a;
// // // var b;
// // // (function () {
// // //   var a = 3;
// // //   b = 3;
// // // })()
// // // console.log(a);
// // // console.log(b);
// // // const arr = [1, 2, 3, 4]
// // // const arr1 = arr.slice();
// // // const arr2 = [...arr];
// // // const arr3 = arr.map((val) => val);
// // // const arr4 = arr;
// // // console.log(arr == arr1);
// // // console.log(arr == arr2);
// // // console.log(arr == arr3);
// // // console.log(arr == arr4);

// // // let a=100;
// // // let a=200;
// // // console.log(a);
// // let string = "ranjith reddy";
// // console.log(string.split(" "));

// // let str= string.split(" ").map((word=>word.split("").reverse().join("")));
// // console.log(str.join(" "));
// // // let newstr = "";
// // // for(let i=string.length-1;i>=0;i--){
// // // newstr += string[i]
// // // }
// // // let wer =newstr.split(" ").reverse().join(" ")
// // // console.log(wer);

// // var data = [1, 2, 3, 4, 5]
// //  data.splice(1,7,6)
// // console.log(data);
// // // let newdata = data;
// // // newdata[2]=6
// // // console.log(data);


// // // console.log(newdata);



// // const data = [
// //     { name: "John", score: 82 },
// //     { name: "Doe", score: 64 },
// //     { name: "Bob", score: 94 },
// //     { name: "Will", score: 77 },
// //     { name: "Smith", score: 86 },
// //     { name: "Jen", score: 54 }
// // ];

// // let result = data.filter((value) => {
// //     if (value.score > 80) {
// //         return value
// //     }
// // })
// // console.log(result);

// // let promise = new promise((resolve, reject) => {
// //     // some api call
// //     if (data) {
// //         resolve(data)
// //     } else {
// //         reject(eror)
// //     }
// // })

// // const express = require("express")
// // const app = express();


// // app.get("/",(req,res) =>{

// //     res.send(data)
// // })
// // app.post("/product",(req,res) =>{

// //     res.send(data)
// // })
// // app.post("/product",(req,res) =>{

// //     res.send(data)
// // })
// // app.listen(4000, () => {
// //     console.log("server started");
// // })

// const nestedArray = [1, [2, [3, 4], [5, [6, 7]]]];
// //Expected output: [1,2,3,4,5,6,7]
// const flattenArray = (arr) => {
//     //write your solution here
//     let result = [];

//     arr.forEach(element => {
//         if (Array.isArray(element)) {
//             result = result.concat(flattenArray(element))
//         } else {
//             result.push(element)
//         }

//     });
//     return result;
// };

// //don't change code below
// console.log(flattenArray(nestedArray));

// function abc(str1, str2){
//     if(str1>str2)return false
//     let word1= str1.split('').sort().join('');
//      let word2= str2.split('').sort().join('');
//     if(word1 == word2){
      
//     console.log( "they are anagaram")
      
//     }else{
//   	  console.log( "they are not anagaram")
//     }
    
//   }
//   abc("fired","fried")

  
// let string = "thank you for your attention";
// let res = string.split('')
// let final = ''

// for (let i = 0; i < res.length; i++) {
//     if (res[i] == 'a' || res[i] == 'e' || res[i] == 'i' || res[i] == 'o' || res[i] == 'u') {
//         final += (`${res[i]}g${res[i]}`);
//     } else {
//         final += res[i]
//     }
// }

// res.forEach((res) => {
//     if (res == 'a' || res == 'e' || res == 'i' || res == 'o' || res == 'u') {
//         final += (`${res}g${res}`);
//     } else {
//         final += res
//     }
// })
// console.log(final);
// let c ="asfvagasgasxcsdca"
// let a = c.split('')
// let b = [];
// for (let i = 0; i < a.length; i++) {
//     if (b.indexOf(a[i]) === -1) {
//         b.push(a[i])
//     }
// }
// console.log(b.join(''));

// let ex = "the red book"
// let res = ex.split(' ')
// let final = []
// for (let i=0;i<res.length;i++){
//     final.push((res[i]).split('').reverse().join(''));
// }
// console.log(final.join(' '));
// let string = "my name is ranjith kumar reddy i am from india"
// let res = {
//     ovel: 0,
//     nonovel: 0
// }
// let nonovel = 0
// for (let i = string.length - 1; i >= 0; i--) {
//     if (string[i] == "a" || string[i] == "e" || string[i] == "i" || string[i] == "o" || string[i] == "u") {
//         res.ovel += 1
//     } else if (string[i] != " ") {
//         res.nonovel += 1
//     }

// }
// console.log(res);

// const value = [true,false,0,1,undefined,null,-1,-0,NaN,"apple"];

// const map1 = value.map(a=>a);

// const filter1 = value.filter(a=>a);

// const find1 = value.find(a=>a);
// console.log(map1);
// console.log(filter1);
// console.log(find1); 

// function abc(string) {
//     for (let i = 0; i < string.length / 2; i++) {
//         if (string[i] !== string[string.length - 1 - i]) {
//             return false
//         }
//     }
//     return true
// }
// console.log(abc("zxcxz"));




// let string =  "januaryjanuarymondaywednesdayfebruarythursdaydecember"
// const regex = /(january|february|march|april|may|june|july|august|september|october|november|december)/gi;

// const monthNames = string.match(regex);
// console.log();
// let final = [];

// monthNames.forEach(element => {
//     if(final.indexOf(element) === -1){
//         final.push(element)
//     }
// });
// console.log(final.length);

// let str = "zxz"

// function abc(str) {
//     for (let i = 0; i < str.length / 2; i++) {
//         if (str[i] == str[str.length - 1 - i]) {
//             return true
//         }
//         return false
//     }
// }
// console.log(abc(str))




// let arr = [1, 2, 3, 4, 5]
// for (let i = 0; i < arr.length/2; i++) {
//   let temp = arr[i]
//   arr[i] = arr[arr.length - i -1]
//   arr[arr.length - i -1] = temp
// }
// console.log(arr);

// let arr1 = [0,1,1,1,0]
// for (let i = 0; i < arr1.length; i++) {
//   for (let j = 0; j < arr1.length - i - 1; j++) {
//     if (arr1[j] > arr1[j + 1]) {
//       var temp = arr1[j]
//       arr1[j] = arr1[j + 1]
//       arr1[j + 1] = temp
//     }
//   }
// }
// const length = arr.length;
//   let swapped;
//   do {
//     swapped = false;
//     for (let i = 0; i < length - 1; i++) {
//       if (arr[i] > arr[i + 1]) {
//         const temp = arr[i];
//         arr[i] = arr[i + 1];
//         arr[i + 1] = temp;
//         swapped = true;
//       }
//     }
//   } while (swapped);

// console.log(arr);

// for (var i = 0; i < 3; ++i) {
//   setTimeout(() => console.log(i), 1);
//   }
//   for (let i = 0; i < 3; i++) {
//   setTimeout(() => console.log(i), 1);
//   }

// import fs from 'fs-promise'
// async function printFiles() {
//   const files = await getFilePaths()
//   // Assume this works fine 
//   files.forEach(async (file) => {
//     const contents = await fs.readFile(file, 'utf8')
//     console.log(contents)
//   })
// }
// printFiles()

// for (let i = 0; i < 5; i++) {
//   setTimeout(() => { console.log(i); },
//     i)
// }
// let array = [0, 1, 2, 3, 4]
// array.forEach((element, i) => {
//   setTimeout(() => { console.log(element); }, i)
// });

