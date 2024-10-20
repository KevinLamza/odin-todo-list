// Because of webpack, CSS rules need to be imported here and not in the .html file
import "./styles.css";

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
// myApp.logAllTodos();
// myApp.createProject("Project 2");
// myApp.createProject("Project 3");
// myApp.deleteProject(1, true);
myApp.logAllProjects();
myApp.logAllTodos();

// let filtered = myApp.filterTodos(0,"a");
// console.log(filtered);