// Because of webpack, CSS rules need to be imported here and not in the .html file
import "./styles.css";

// Just to have a template for the file importing
import { greeting } from "./greeting.js";
console.log(greeting);

// Another webpack check
if (process.env.NODE_ENV !== 'production') {
    console.log('Looks like we are in development mode!');
}

// ---------------------- START YOUR CODE BELOW HERE

import { Todo } from "./classTodo.js" ;

let myApp = Todo;

// myApp.reset();
myApp.init();
// myApp.createSamples();

let filtered = myApp.filterTodos(0,"a");
console.log(filtered);