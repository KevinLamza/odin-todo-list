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


const Todo = class {
    #title;
    #description;
    #dueDate;
    #priority;
    #subtaskOf
    constructor(title, description, dueDate, priority, subtaskOf) {
        this.#title = title;
        this.#description = description;
        this.#dueDate = dueDate;
        this.#priority = priority;
        this.#subtaskOf = subtaskOf;
    }

    getTodo() {
        return this;
    }

    editTodo(newTitle, newDescription, newDueDate, newPriority, newSubtaskOf) {
        this.#title = newTitle;
        this.#description = newDescription;
        this.#dueDate = newDueDate;
        this.#priority = newPriority;
        this.#subtaskOf = newSubtaskOf;
    }

    addTodoToList() {
        todoList.push(this);
    }
}

const ProjectList = class {
    #projectList;

    constructor(myList) {
        this.title = myList;
        this.#projectList = [];
    }

    getProject(i) {
        return this.#projectList[i];
    }

    editProject(oldTitle, newTitle) {
        let index = this.#projectList.indexOf(oldTitle);
        this.#projectList[index] = newTitle;
    }

    addProjectToList(title) {
        this.#projectList.push(title);
    }

    deleteProjectFromList(title) {
        this.#projectList = this.#projectList.filter(function(item) {
            return item !== title
        })
    }

    getAllProjects() {
        return this.#projectList
    }

}

// addTodo("My title", "My description", "05-08-2024", "1");
// addTodo("My title 2", "My description 2", "05-10-2024", "2");
// addTodo("My title 3", "My description 3", "05-12-2024", "3");

const myList = new ProjectList("myList");

const todo1 = new Todo("Title 1", "Description 1", "DueDate 1", "Priority 1", "Project 1");
const todo2 = new Todo("Title 2", "Description 2", "DueDate 2", "Priority 2", "Project 2");
const todo3 = new Todo("Title 3", "Description 3", "DueDate 3", "Priority 3", "Project 3");

// console.log(todo1.getTodo());
// console.log(todo2.getTodo());
// console.log(todo3.getTodo());

// todo1.editTodo("New Title1", "Description 1", "DueDate 1", "Priority 1", "Project 1");

// console.log(todo1.getTodo());

// todo1.addTodo();

// console.log(todoList);

myList.addProjectToList("Project 1");
myList.addProjectToList("Project 2");

myList.editProject("Project 2", "Project 3");
myList.deleteProjectFromList("Project 1");

console.log(myList.getAllProjects());


