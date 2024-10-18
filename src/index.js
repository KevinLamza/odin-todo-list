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

Todo.reset();
Todo.init();

Todo.createProject("Test");
Todo.createProject("Test");
Todo.createProject("Test");
Todo.createProject("Test");
Todo.createProject("Test");
Todo.logAllProjects();

// let test1 = new Todo("Title 1", "Beschreibung 1", "03/03/2923", 3);
// let test2 = new Todo("Title 2", "Beschreibung 2", "03/03/2923", 2);
// let test3 = new Todo("Title 3", "Beschreibung 3", "03/03/2923", 1);

// test1.setDescription("hey");
// test3.setCompleted();

// test1.logMe();
// test2.logMe();
// test3.logMe();

let test1 = Todo.createTodo("Title 1", "Beschreibung 1", "03/03/2923", 3, 0);
let test2 = Todo.createTodo("Title 2", "Beschreibung 2", "03/03/2923", 2, 7);
let test3 = Todo.createTodo("Title 3", "Beschreibung 3", "03/03/2923", 1, 1);

// console.log(test1);
test1.title = "New Title";

// Todo.logAllTodos();

Todo.saveToStorage();
Todo.loadFromStorage();
Todo.logAllTodos();