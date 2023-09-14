// let res =[ 0, 19,1, 22,1,22,25]
  
//  res.length=0

// // console.log(res[0]);

// function foo(){
//     let a=b=0
//     a++
//     return a
// }
// foo()
// console.log(typeof a);
// console.log(typeof b);

// table print
// for(let i=0;i<=10;i++){
//     for(let j=0;j<=10;j++){
//         console.log(i,"*",j,"=", i*j)
//     }
// }

// const salary = 145;
// let ar = [2, 3, -1, 5, 7, 9, 10, 15, 95];
// // let sum =0
// // for(let i=0;i<ar.length;i++){
// // sum += ar[i]
// // }
// // ar.forEach(x=> sum+= x)
// let sum =ar.reduce((x,y)=> x-y,salary)
// console.log(sum);


// let ageGroup = [18, 21, 1, 1, 51, 18, 21, 5, 18, 7, 10];
// // let uniqueAgeGroup = ageGroup.reduce( (accumulator, currentValue) =>{
// //   if (accumulator.indexOf(currentValue) === -1) {
// //     accumulator.push(currentValue);
// //   }
// //   return accumulator;
// // }, []);
// let uni = ageGroup.reduce((x,y)=>{
//     if(x.indexOf(y)=== -1){
//         x.push(y)
//     }
//     return x
// },[])
// console.log(uni);

// let c = { greeting: 'Hey!' };
// let d;
// d = c;
// c.greeting = 'Hello';
// console.log(d.greeting); //Hello

let c = 10;
let e;
e = c;
c= 11
console.log(e);  //10
var x = 21;
var girl = function () {
console.log(x); //undefined
var x = 20;
};
girl ();