'use strict';
/*
let birthYear = 1997;
function calAge(birthYear){
    const age = new Date().getFullYear() - birthYear;
    console.log(birthYear);
    return age;
}

console.log(calAge(1998));
*/

const obj1 = {
    name:"Govind",
    age:23,
    friends:["hari", "nived", "javed"]
}

//reference 
const obj2 = obj1;

//shallow copy
const obj3 = {...obj1};

//deep copy
const  obj4 = JSON.parse(JSON.stringify(obj1));

console.log("original obj1 : ", obj1);
console.log("original obj2 : ", obj2);
console.log("original obj3 : ", obj3);
console.log("original obj4 : ", obj4);
//Making Changes

obj3.name = "Govind Kumar Mishra"
obj2.age = 25;
obj2.friends = ["akram", "tikram", "jakram"];
obj4.friends = ["ravi", "kavi", "chavi"];
console.log("Changed obj1 : ", obj1);
console.log("Changed obj2 : ", obj2);
console.log("Changed obj3 : ", obj3);
console.log("Changed obj4 : ", obj4);
