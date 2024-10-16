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

(function() {
    const Todo = class {
        constructor(title, description, dueDate, priority) {
            this.title = title;
            this.description = description;
            this.dueDate = dueDate;
            this.priority = priority;
        }
    }

    // DIFFERENCE BETWEEN CREATE AND ADD


    const todoList = [];

    function addTodo(title, description, dueDate, priority) {
        let todo = new Todo(title, description, dueDate, priority);
        todoList.push(todo);
    }

    addTodo("My title", "My description", "05-08-2024", "1");
    addTodo("My title 2", "My description 2", "05-10-2024", "2");
    addTodo("My title 3", "My description 3", "05-12-2024", "3");

    console.log(todoList);
})();