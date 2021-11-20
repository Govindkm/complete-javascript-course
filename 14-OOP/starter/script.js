'use strict';
//Object oriented programming using constructor function
 
const Person = function (firstName, birthYear) {
    console.log(this);
    this.firstName = firstName;
    this.birthYear = birthYear;
 
    // Never create a method in the construction method
    /* 
        This is because when we do so
        the method gets it own space in the stack memory for each object created which causes extra memory to be used.
        instead if we use prototype method then only one copy of the method is created and all the objects access the same copy thus saving memory utilization.
    */
    // Instead use prootype object of the object
    this.getName = function () { return firstName }
}

// Using object prototype for inheritance
Person.prototype.getAge = function () {
    let currentYear = new Date(Date.now());
    return currentYear.getFullYear() - this.birthYear;
}
 
Person.prototype.print = function () {
    // Why constructor method should not create methods in objects
    /* https://www.thecodeship.com/web-development/methods-within-constructor-vs-prototype-in-javascript/ */
    console.log(`Hello I am ${this.getName()} and I am ${this.getAge()} years old.`);
}
 
const govind = new Person('Govind', 1998);
const durgesh = new Person('Durgesh', 2001);
const aryan = new Person('Aryan Jha', 2000);

govind.print();
durgesh.print();
aryan.print();
 
//Steps behind the scene
/*
1. New empty object {} is created
2. function is called, this -> {}
3. {} linked to prototype
4. funtion automatically return {}
*/

console.log(govind.__proto__);
console.log(Person.prototype.isPrototypeOf(govind));
