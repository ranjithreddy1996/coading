// var cars = [{ make: 'audi', model: 'r8', year: '2012' },
// { make: 'audi', model: 'rs5', year: '2013' },
// { make: 'ford', model: 'mustang', year: '2012' },
// { make: 'ford', model: 'fusion', year: '2015' },
// { make: 'kia', model: 'optima', year: '2012' }],
// 	result = cars.reduce(function (r, a) {
// 		r[a.make] = r[a.make] || [];
// 		r[a.make].push(a);
// 		return r;
// 	}, Object.create(null));

// console.log(result);


// // var arr = [
// //     {shape: 'square', color: 'red', used: 1, instances: 1},
// //     {shape: 'square', color: 'red', used: 2, instances: 1},
// //     {shape: 'circle', color: 'blue', used: 0, instances: 0},
// //     {shape: 'square', color: 'blue', used: 4, instances: 4},
// //     {shape: 'circle', color: 'red', used: 1, instances: 1},
// //     {shape: 'circle', color: 'red', used: 1, instances: 0},
// //     {shape: 'square', color: 'red', used: 4, instances: 4},
// //     {shape: 'square', color: 'red', used: 2, instances: 2}
// // ];
// var arr = [
//     {
//         "productType": "4t Oil"
//     },
//     {
//         "productType": "4t Oil"
//     },
//     {
//         "productType": "4t Oil"
//     },
//     {
//         "productType": "4t Oil"
//     },
//     {
//         "productType": "4t Oil"
//     },
//     {
//         "productType": "4t Oil"
//     },
//     {
//         "productType": "4t Oil"
//     },
//     {
//         "productType": "4t Oil"
//     },
//     {
//         "productType": "4t Oil"
//     },
//     {
//         "productType": "4t Oil"
//     },
//     {
//         "productType": "dairyType2"
//     },
//     {
//         "productType": "dairyType2"
//     },
//     {
//         "productType": "dairyType"
//     }
// ]
// result = [];

// arr.forEach(function (a) {
//     if ( !this[a.productType] ) {
//         this[a.productType] = { productType: a.productType};
//         result.push(this[a.productType]);
//     } 

// }, Object.create(null));

// console.log(result);


// // var arr = [{"shape":"square","color":"red","used":1,"instances":1},{"shape":"square","color":"red","used":2,"instances":1},{"shape":"circle","color":"blue","used":0,"instances":0},{"shape":"square","color":"blue","used":4,"instances":4},{"shape":"circle","color":"red","used":1,"instances":1},{"shape":"circle","color":"red","used":1,"instances":0},{"shape":"square","color":"blue","used":4,"instances":5},{"shape":"square","color":"red","used":2,"instances":1}];

// // var helper = {};
// // var result = arr.reduce(function(r, o) {
// //   var key = o.shape + '-' + o.color;

// //   if(!helper[key]) {
// //     helper[key] = Object.assign({}, o); // create a copy of o
// //     r.push(helper[key]);
// //   } else {
// //     helper[key].used += o.used;
// //     helper[key].instances += o.instances;
// //   }

// //   return r;
// // }, []);

// // console.log(result);


// var arr = [
//     {shape: 'square', color: 'red', used: 1, instances: 1},
//     {shape: 'square', color: 'red', used: 2, instances: 1},
//     {shape: 'circle', color: 'blue', used: 0, instances: 0},
//     {shape: 'square', color: 'blue',  instances: 4},
//     {shape: 'circle', color: 'red',  instances: 1},
//     {shape: 'circle', color: 'red',  instances: 0},
//     {shape: 'square', color: 'red', instances: 4},
//     {shape: 'square', color: 'red',  instances: 2}
// ];
// count =0;
// result = [];

// arr.forEach(function (a) {
//     if ( !this[a.color] && !this[a.shape] ) {
//         this[a.color] = { color: a.color, shape: a.shape, count: 0, instances: 0 };
//         result.push(this[a.color]);
//         a.count = +1;

//     } 
// }, Object.create(null));

// console.log(result);

// var b = {"data":"key=IAfpK, age=58, key=WNVdi, age=64, key=jp9zt, age=47"}
// ;

// var data = [];
// for(var issue of b){
//     var entryFound = false;
//     var tempObj = {
//         name: issue.productCategory,
//         count: 1
//     };

//     for(var item of data){
//         if(item.name === tempObj.name){
//         item.count++;
//         entryFound = true;
//         break;
//       }
//     }

//     if(!entryFound){
//         data.push(tempObj);
//     }
// }
// console.log(data);

// require('dotenv').config(env.development)
// const uri = process.env.PORT
// console.log("qui",uri);

// const object = {"data":"key=IAfpK, age=585, key=IAfpK, age=58, key=IAfpK, age=556"}

// var array = Object.values(object)
// console.log(array);

// for (const property in object) {
// let k = object[property]
// let weeklist = (k.split(","))

// console.log(weeklist);
// }
// let weeklist = (k.split(","))
// console.log(JSON.stringify(weeklist));
// // let j = weeklist.split("=")
// for(let i =0; i<weeklist.length;i++){
// console.log(weeklist[i]);
// c = weeklist[i]
// console.log(c);
// console.log(c.age);

// if(weeklist[i].age ){
//     console.log("ad");
//     c +=1
//     console.log(c);
// }
// }
// }

// var person={
//     first_name:"johnny",
//      last_name: "",
//    phone:"703-3424-1111"
// };
// for (var property in person) {
//     console.log(property,":",person[property]);
// }  

// {"name":{"first":"Robert","middle":"","last":"Smith"},"age":25,"DOB":"-","hobbies":["running","coding","-"],"education":{"highschool":"N\/A","college":"Yale"}}

// const json = '{"result":true, "count":42}';
// const obj = JSON.parse(json);

// console.log(obj.count);
// // expected output: 42

// console.log(obj.result);


// const QRCode = require("qrcode");
// const { createCanvas, loadImage } = require("canvas");
// async function create(dataForQRcode, center_image, width, cwidth) {
//   const canvas = createCanvas(width, width);
//   QRCode.toCanvas(
//     canvas,
//     dataForQRcode,
//     {
//       errorCorrectionLevel: "H",
//       margin: 1,
//       color: {
//         dark: "#000000",
//         light: "#ffffff",
//       },
//     }
//   );

//   const ctx = canvas.getContext("2d");
//   const img = await loadImage(center_image);
//   const center = (width - cwidth) / 2;
//   ctx.drawImage(img, center, center, cwidth, cwidth);
//   return canvas.toDataURL("image/png");
// }

// async function main() {
//   const qrCode = await create(
//     "http://shauryamuttreja.com/qr/",
//     "data:image/png;base64,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",
//     150,
//     50
//   );

//   console.log(qrCode);
// }

// main();


// const characterAmountRange = document.getElementById('characterAmountRange')
// const characterAmountNumber = document.getElementById('characterAmountNumber')
// const includeUppercaseElement = document.getElementById('includeUppercase')
// const includeNumbersElement = document.getElementById('includeNumbers')
// const includeSymbolsElement = document.getElementById('includeSymbols')
// const form = document.getElementById('passwordGeneratorForm')
// const passwordDisplay = document.getElementById('passwordDisplay')

// const UPPERCASE_CHAR_CODES = arrayFromLowToHigh(65, 90)
// const LOWERCASE_CHAR_CODES = arrayFromLowToHigh(97, 122)
// const NUMBER_CHAR_CODES = arrayFromLowToHigh(48, 57)
// const SYMBOL_CHAR_CODES = arrayFromLowToHigh(33, 47).concat(
//   arrayFromLowToHigh(58, 64)
// ).concat(
//   arrayFromLowToHigh(91, 96)
// ).concat(
//   arrayFromLowToHigh(123, 126)
// )

// characterAmountNumber.addEventListener('input', syncCharacterAmount)
// characterAmountRange.addEventListener('input', syncCharacterAmount)

// form.addEventListener('submit', e => {
//   e.preventDefault()
//   const characterAmount = characterAmountNumber.value
//   const includeUppercase = includeUppercaseElement.checked
//   const includeNumbers = includeNumbersElement.checked
//   const includeSymbols = includeSymbolsElement.checked
//   const password = generatePassword(characterAmount, includeUppercase, includeNumbers, includeSymbols)
//   passwordDisplay.innerText = password
// })

// function generatePassword(characterAmount, includeUppercase, includeNumbers, includeSymbols) {
//   let charCodes = LOWERCASE_CHAR_CODES
//   if (includeUppercase) charCodes = charCodes.concat(UPPERCASE_CHAR_CODES)
//   if (includeSymbols) charCodes = charCodes.concat(SYMBOL_CHAR_CODES)
//   if (includeNumbers) charCodes = charCodes.concat(NUMBER_CHAR_CODES)

//   const passwordCharacters = []
//   for (let i = 0; i < characterAmount; i++) {
//     const characterCode = charCodes[Math.floor(Math.random() * charCodes.length)]
//     passwordCharacters.push(String.fromCharCode(characterCode))
//   }
//   return passwordCharacters.join('')
// }

// function arrayFromLowToHigh(low, high) {
//   const array = []
//   for (let i = low; i <= high; i++) {
//     array.push(i)
//   }
//   return array
// }

// function syncCharacterAmount(e) {
//   const value = e.target.value
//   characterAmountNumber.value = value
//   characterAmountRange.value = value
// }
// var fs = require('fs')
// var filename = './text.txt'
// fs.readFile(filename,'utf8',function(err,data){
//   if(err)throw err;
//   console.log(filename);
//   console.log(data);
// })


// // return latest records based on created date
// const sortByLatestRecords = (data) => {
//   return data.sort((a, b) => new Date(b.created) - new Date(a.created));
// };



// setImmediate(function() {
//   console.log('setImmediate')
// })
// setTimeout(function() {
//   console.log('setTimeout')
// }, 0)


// var outpt = [1,34,54,5,456,4]

// for(let i =0; i<outpt.length;i++){

//   for(let j=i;j<){

//   }
// }

// let doc = await Character.findOneAndUpdate(filter, update, {
//   new: true
// });

// var express= require("express")
// var app = express();
// app.listen(5000,()=>console.log("started"))

// function bubbleSort(array) {
//   var done = false;
//   while (!done) {
//     done = true;
//     for (var i = 1; i < array.length; i += 1) {
//       if (array[i - 1] > array[i]) {
//         done = false;
//         var tmp = array[i - 1];
//         array[i - 1] = array[i];
//         array[i] = tmp;
//       }
//     }
//   }

//   return array;
// }

// var numbers = [12, 10, 15, 11, 14, 13, 16];
// let bignumber = 0;
// for (let i = 0; i < numbers.length; i++) {
// 	if (numbers[i] > bignumber) {
// 		bignumber = numbers[i]
// 	}
// }
// console.log(bignumber);
// let res = numbers.sort().reverse()[0]
// console.log(res);

// bubbleSort(numbers);
// console.log(numbers);
// let numbers = [23, 65, 88, 12, 45, 99, 2000]

// let sortednumbers = numbers.sort((a, b) => a - b);
// console.log(sortednumbers);

// var arr = [3, 6, 2, 56, 32, 5, 89, 321];
// var largest = arr[0];

// for (var i = 0; i < arr.length; i++) {
//   if (largest < arr[i]) {
//     largest = arr[i];
//   }
// }
// console.log(largest);
// function sortArray(arr) {
//   if (Array.isArray(arr)) {

//       return arr;
//   }
// }
// var arr =[2, 6, 0, 4, 3, 4, 3, 5, 9, 6, 12, 43, 6]
// var temp = [];

// for (let i = 0; i < arr.length; i++) {
//   for (let j = 0; j < arr.length; j++) {
//       if (arr[i] < arr[j]) {
//           temp = arr[j];
//           arr[j] = arr[i];
//           arr[i] = temp;
//       }
//   }
// }
// console.log(arr);
// console.log(sortArray([2, 6, 0, 4, 3, 4, 3, 5, 9, 6, 12, 43, 6]));

// router.get('/posts',authenticate, async (req,res) => {
//   try {
//       await req.user.populate('posts).execPopulate()'
//       res.send(req.user.posts)
//   } catch (error) {
//       res.status(500).send()
//   }
// })
// var data = [
//   {
//     "name": "HTML",
//     "description": "Hyper Text Markup Language"
//   },
//   {
//     "name": "CSS",
//     "description": "Cascading Style Sheet"
//   },
//   {
//     "name": "JS",
//     "description": "Javascript"
//   }
// ];
// var filteredArray = data.filter(item => (item.name === "HTML"));
// if(filteredArray.length != 0){
//   console.log(filteredArray);
// }else{
//   console.log("qew");
// }
// var arr1 = [1, 2, 3, 4],
//   arr2 = [2, 4, 5]
// // res = arr1.filter(item => !arr2.includes(item));
// for (let i = 0; i < arr1.length; i++) {
//   for (let j = 0; j < arr2.length; j++) {
//     if (arr2[j] == arr1[i]) {
//       console.log(arr2[j]);
//     }
//   }
// }

// console.log(res);

// const sweetArray = [2, 3, 4, 5, 35]
// const sweeterArray = sweetArray.map(sweetItem => {
//     return sweetItem * 12
// })

// console.log(sweeterArray)

// const name = "Sammy"
// const map = Array.prototype.map

// const newName = map.call(name, eachLetter => {
//     return `${eachLetter}`
// })

// console.log(newName)

// const myUsers = [
//   { name: 'shark', likes: 'ocean' },
//   { name: 'turtle', likes: 'pond' },
//   { name: 'otter', likes: 'fish biscuits' }
// ]

// const usersByLikes = myUsers.map(item => {
//   const container = {};

//   container[item.name] = item.likes;
//   container.age = item.name.length * 10;
//   container.extra = item.likes;


//   return container;
// })

// console.log(usersByLikes);

// var map4 = new Map([[["first name", "last name","qwe"],
// ["sumit", "ghosh","qwe"]],
// [["friend 1", "friend 2"],
// ["sourav", "gourav"]],[["friend 1", "friend 2"],
// ["sourav", "gourav"]]]);

// console.log(map4);
// JSON.stringify

// const foo = function() {
//   console.log("foobar");
// }
// console.log(foo);
// foo(); // Invoke it using the variable
// foo
// var arr = [
//     { name: 'shark', likes: 'ocean' },
//     { name: 'turtle', likes: 'pond' },
//     { name: 'otter', likes: 'fish biscuits' }
//   ]
// let l = arr.length;
// console.log(l);
// for (let i = 0; i < l; i++) {
// console.log("qwe" + i);
// }
// var str = "weerer"
// var newString = "";
// for (var i = str.length - 1; i >= 0; i--) {
//   newString += str[i];
// }
// console.log(newString);

// var arr = ["apple", "bannana", "orange", "apple", "orange"];


// arr = arr.filter( function( item, index, inputArray ) {
//            return inputArray.indexOf(item) == index;
//     });
// console.log(arr);
// const array = [5,2,3,2,5,5,1,7,2,1,5,8];

//   const result = [];
//   for (let i = 0; i < array.length; i++) {
//     let exists = false;
//     for (let j = 0; j < result.length; j++) {
//       if (array[i] === result[j]) {
//         exists = true;
//         break;
//       }
//     }
//     if (!exists) {
//       result.push(array[i]);
//     }
//   }
//   var temp =[]
//   for(let i=0;i<result.length;i++){
//     for(let j=0;j<result.length;j++){
//       if(result[i]<result[j]){
//         temp = result[j];
//         result[j]= result[i];
//         result[i]=temp;
//       }
//     }
//   }
// console.log(result);
// const arr = [1, 2];
// arr.push(3);
// console.log(arr);
// if(true){
//   let i=0;
//   let i=0;
// }
// setTimeout(()=>{
//   console.log("x");
//   console.log("y");
// },3000);
// (function(){
//   setTimeout(()=> console.log(1),2000);
//   console.log(2);
//   setTimeout(()=> console.log(3),0);
//   console.log(4);
// })();
// str = 'Hello World!';
// console.log(global.str)
// var events = require('events');
// var em = new events.EventEmitter();
// em.on('FirstEvent', function (data) {
//     console.log('First subscriber: ' , data);
// });
// em.emit('FirstEvent', 'This is my first Node.js event emitter example.');

// var name = 'John';

// function greeting() {
//     // const name = 'Hi';
//     console.log( name);
// }
// greeting();
// console.log(global.name);
// const { customAlphabet  } = require('nanoid');
// const nanoid = customAlphabet('1234567890', 10)

// function greeting(prefix) {
//   for(let i=0;i<100;i++){
//     let id = nanoid()
//     console.log(id)
//   }
//     // return id;
// }
// greeting("prefix");
// let k = 50;
// let m = Math.ceil(k/20)
// console.log(m)
// for(let i=0; i<m;i++){
//     let id = nanoid()
//     console.log(id)

// }

// let obj = {
//   "docType": "Manufacturer",
//   "basicDetails": {
//     "name": "TELANGANA",
//     "emailId": "mailto:balaji@msrcosmos.com",
//     "phoneNo": "9494545330",
//     "address": "Pillalamarri Walking Trail, Kristan Pally, Zainallipur, Telangana 509001, India",
//     "city": "Mahabubnagar",
//     "state": "Telangana",
//     "country": "India",
//     "zipCode": "509001",
//     "latitude": "16.7773144",
//     "longitude": "78.0125756"
//   }
// }
// const bodyData = { ...obj};

// if(bodyData.basicDetails.id == undefined){
//   bodyData.basicDetails.id = nanoid()
//   console.log(bodyData.basicDetails.id)
// }
// console.log(bodyData)

// let data = '["test1", "test2", "test3"]';
// let parts = data
//   .substr(1,data.length-2) // remove the brackets from string
//   .split(',') // plit the string using the seperator ','
//   .map(e=>e.trim()) // trim the results to remove spaces at start and end

// console.log(data);
// let arr = '["Art", "Photography", "Writing"]'.match(/\w+/g)
// console.log(arr)

// var str = '["Art", "Photography", "Writing"]';
// var JSONData = str.replace('[','').replace(']','').split(',').map(x => x.trim());
// console.log(JSONData);
// var array = str.replace(/^\[|\]$/g, "").split(", ");
// console.log(array);
// for (var i=0; i<3; i++) {   setTimeout(() => console.log(i),1000+i); }

// for (let i=0; i<3; i++) {   setTimeout(() => console.log(i),1000+i); }


// var arr = [1,2,6,9,3,6,3,3,5,5,2,25];

// function removeDuplicates(arr) {
// 	var unique = [];
// 	for(i=0; i < arr.length; i++){
// 		if(unique.indexOf(arr[i]) === -1) {
// 			unique.push(arr[i]);
// 		}
// 	}
// 	return unique;
// }
// console.log(removeDuplicates(arr));


// var age = 20;
// var obj = {
// 	name: "ranjith",
// 	getName: function () {
// 		console.log(this.name, age);
// 	}
// }
// var getName = obj.getName;

// var obj2 = { name: "aksh", age: 30, getName };
// obj2.getName();

// var y = 1;
// if (!(function f() { return false })) {
// 	y += typeof (f)
// }
// console.log(y);

// function createBase(baseNumber) {
// 	return function (N) {
// 		return baseNumber + N
// 	}
// }

// var addTen = createBase(10)
// var addFive = createBase(5)

// a = addTen(5)
// b = addFive(10)
// c = addTen(10)
// d = addFive(5)

// console.log(a, b, c, d);

// function abc(str1,str2){
// 	let a =str1.toLowerCase().split("").sort().join("")
// 	let b =str2.toLowerCase().split("").sort().join("")

// 	return (a==b)? true: false
// }
// console.log(abc("qwe","ewqw"));

// const arr = ['a', 'b', 'c'];
// const result = arr.reduce((acc,crr,index)=>{
//     acc[crr] = index;
//     return acc
// },{})

// console.log(result)
// let words = ["dog", "cat", "mouse", "sky", "eleven"]
// let temp = []
// for (let i = 0; i < words.length; i++) {
// 	let count = 0
// 	for (let j = 0; j < words[i].length; j++) {
// 		if (words[i][j] == "a" || words[i][j] == "e" || words[i][j] == "i" || words[i][j] == "o" || words[i][j] == "u") {
// 			count++;
// 		}
// 	}
// 	if (count >= 2)
// 		temp.push(words[i])
// }
// console.log(temp)

// let words = ["dog"]
// // const result = words.map((str)=>{
// // 	return str.replace(/([aeiou])/gi,'($1)')
// // })
// // console.log(result);
// let temp = []
// words.map((item) => {
// 	let xyz = item.toLowerCase();
// 	let abc = xyz.split('');
// 	let d = ''
// 	for (let i = 0; i < abc.length; i++) {
// 		if (abc[i] == 'a' || abc[i] == 'e' || abc[i] == 'i' || abc[i] == 'o' || abc[i] == 'u') {
// 			d += `(${abc[i]})`
// 		} else {
// 			d += item
// 		}
// 	}

// 	console.log(d);
// })





function fetchData(callback) {
	setTimeout(function() {
	  const data = 'This is the fetched data';
	  callback(data);
	}, 2000);
  }
  function processFetchedData(data) {
	console.log('Processing data:', data);
  }
  fetchData(processFetchedData);
  