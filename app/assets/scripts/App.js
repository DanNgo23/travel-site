// hypothetical example code to test JavaScript

/* this line will not work within a web browser */
/* the "require" syntax works in our gulp file because gulp runs within the context of node.js */
/* and node.js supports the require and import functionality */
/* but this file we are currently in is going to be running within the context of people's browsers */
/* and web browsers have no idea what "require" means */
/* require is not part of the JavaScript language; it's a part of node.js */
/* however, when our project supports ES6, we can import a module using native JavaScript */
//var Person = require('./modules/Person');
/* try the new ES6 way */
/* provide a path to the module file */
//import Person from './modules/Person';

/*var $ = require('jquery');*/


/* ES6 syntax */
/* one of the benefits of this class syntax is it makes inheritance easy */
/* the adult class extends the person class */
/* the adult class will inherit all the person class's properties and methods */
/*
class Adult extends Person {
    // what we include here will only be unique to adult objects 
    payTaxes() {
        console.log(this.name + " now owes $0 in taxes.");
    }
}
alert("ABC 123");
/*
/* the word "new" is an opperator that will create a new instance of our Person object type */
/* the "this" keyword refers to whatever object is being created, e.g. the john object */
/*
var john = new Person("John Doe", "blue");
john.greet();

var jane = new Adult("Jane Smith", "orange");
jane.greet();
jane.payTaxes();

$("h1").remove();
*/

/* this variable could be any name */
import MobileMenu from './modules/MobileMenu';

/* create a new object that uses the above class as a blueprint */
var mobileMenu = new MobileMenu();
