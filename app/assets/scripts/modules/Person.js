// hypothetical JavaScript file to test JavaScript; file not needed
/* a constructor function; a blueprint name should begin with a capital letter */
/* the "this" keyword is what allows our blueprint function to be flexible and recyclable */
/* the value of "this" changes depending on how, when, and where the function is called */
/*
function Person(fullName, favColor) {
    this.name = fullName;
    this.favoriteColor = favColor;
    //a method is a function that belongs to an object 
    
    this.greet = function() {
        console.log("Hello, my name is " + this.name + " and my favorite color is " + this.favoriteColor + ".");
    };
    
}
*/

/* ES6 flavored JavaScript syntax */
/*
class Person {
    constructor(fullName, favcolor) {
        this.name = fullName;
        this.favoriteColor = favcolor;
     
    }
    
    greet() {
        console.log("Hi there, my name is " + this.name + " and my favorite color is " + this.favoriteColor + ".");
    }
}
*/
/* spell out exactly what this file should export or return when another file tries to require it */
/* we want the exports object property to be the constructor function Person */
/* the exports object's parent is an object named module */
/* this is the node.js way */
//module.exports = Person;

/* use the ES6 / JavaScript native way */
//export default Person;