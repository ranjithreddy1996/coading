// var a1 = ['a', 'b'];
// var a2 = ['a', 'b', 'c', 'd'];
// var d;
// d = (JSON.stringify(a1) === JSON.stringify(a2));
// // a2.filter(d => a1.includes(d)) // gives ["a", "b"]
// console.log(d);
// {"name":{"first":"Robert","middle":"","last":"Smith"},"age":25,"DOB":"-","hobbies":["running","coding","-"],"education":{"highschool":"N\/A","college":"Yale"}}

// var test = {
//   "name": {
//     "first": "Robert",
//     "middle": "",
//     "last": "Smith"
//   },
//   "age": 25,
//   "DOB": "-",
//   "hobbies": [
//     "running",
//     "coding",
//     "-"
//   ],
//   "education": {
//     "highschool": "N/A",
//     "college": "Yale"
//   }
//   }

//   function clean(obj) {
//     for (var propName in obj) {
//       // console.log(Array.isArray(obj[propName]));
//       if(Array.isArray(obj[propName])){
//        var  array = []
//     for (var k in obj[propName]) {
//       if (obj[propName][k]=== null || obj[propName][k] === undefined ||  obj[propName][k]=== "-" ) {
//         delete obj[propName][k];
//       }else{
//         array.push(obj[propName][k])
//       }

//       }
//       obj[propName]=array

//     }
//       if(obj[propName]){
//     for (var l in obj[propName]) {
//       if (obj[propName][l] === null || obj[propName][l] === "N\/A" ||  obj[propName][l] === "" ) {
//         delete obj[propName][l]
//       }
//       }
//     }
//       if (obj[propName] === null || obj[propName] === undefined ||  obj[propName] === "-" ) {
//         delete obj[propName];
//       }
      
//     }
//     return obj
//   }
  
//   // console.log(test);
//   console.log(clean(test));
// if(typeof obj === 'object' && obj !== null){
      //   console.log("fdh");
      // }
      // if(obj.name instanceof Object){
      //   for (var k in obj.name) {
      //     if (k[propName] === null || k[propName] === undefined ||  k[propName] === "" ) {
      //       delete obj.name[propName];
      //     }
      //   console.log("adscsd",obj.name[propName]);
      //   }
      // }
//   // let myObject = {
//   //   "ircEvent": "PRIVMSG",
//   //   "method": "newURI",
//   //   "regex": "^http://.*"
//   // };
  
//   // const {regex, ...newObj} = myObject;
  
//   // console.log(newObj);   // has no 'regex' key
//   // console.log(myObject); // remains unchanged


// const object = {"data":"key=IAfpK, age=585, key=IAfpK, age=58, key=IAfpK, age=556"}


// var array = Object.values(object)
// // console.log(array);
// for (const property in object) {
//   let k = object[property]
//   let weeklist = (k.split(","))
// var array = Object.values(weeklist)
  
//   console.log(array);
//   }

// An array of objects
// var persons = [{name: "Harry"}, {name: "Alice"}, {name: "Peter"}];

// // Find if the array contains an object by comparing the property value
// if(persons.some(person => person.name === "Peter")){
//     console.log("Object found inside the array.");
// } else{
//     console.log("Object not found.");
// }

// const a = [{ value:"4a55eff3-1e0d-4a81-9105-3ddd7521d642", display:"Jamsheer"}, { value:"644838b3-604d-4899-8b78-09e4799f586f", display:"Muhammed"}, { value:"b6ee537a-375c-45bd-b9d4-4dd84a75041d", display:"Ravi"}, { value:"e97339e1-939d-47ab-974c-1b68c9cfb536", display:"Ajmal"}, { value:"a63a6f77-c637-454e-abf2-dfb9b543af6c", display:"Ryan"}];
// const b = [{ value:"4a55eff3-1e0d-4a81-9105-3ddd7521d642", display:"Jamsheer", $$hashKey:"008"}, { value:"644838b3-604d-4899-8b78-09e4799f586f", display:"Muhammed", $$hashKey:"009"}, { value:"b6ee537a-375c-45bd-b9d4-4dd84a75041d", display:"Ravi", $$hashKey:"00A"}, { value:"e97339e1-939d-47ab-974c-1b68c9cfb536", display:"Ajmal", $$hashKey:"00B"}];

// // A comparer used to determine if two entries are equal.
// const isSameUser = (a, b) => a.value == b.value && a.display == b.display;

// // Get items that only occur in the left array,
// // using the compareFunction to determine equality.
// const onlyInLeft = (left, right, compareFunction) => 
//   left.filter(leftValue =>
//     !right.some(rightValue => 
//       compareFunction(leftValue, rightValue)));

// const onlyInA = onlyInLeft(a, b, isSameUser);
// const onlyInB = onlyInLeft(b, a, isSameUser);

// const result = [...onlyInA, ...onlyInB];
// let difference = arr1
//                  .filter(x => !arr2.includes(x))
//                  .concat(arr2.filter(x => !arr1.includes(x)));
// console.log(result);
  
// var arr = [1, 2, 3];
// var last_element = arr.reverse()[6];
// console.log(last_element);


// var str="",x,y,a;
// for (a=1;a<=15;a++)
// {
//     x = a%3 ==0;
//     y = a%5 ==0;
//     if(x)
//     {
//         str+="fizz"
//     }
//     if (y)
//     {
//         str+="buzz"
//     }
//     if (!(x||y))
//     {
//         str+=a;
//     }
//     str+="\n"
// }
// console.log(str);

var tr = "qwerty"
