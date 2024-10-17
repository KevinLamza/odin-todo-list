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
    #project;
    static #ID = 0;
    constructor(title, description, dueDate, priority, project) {
        this.#title = title;
        this.#description = description;
        this.#dueDate = dueDate;
        this.#priority = priority;
        this.#project = project;
        Todo.#ID++;
    }

    getTitle() {
        return this.#title;
    }

    editTitle(newTitle) {
        this.#title = newTitle;
    }

    getDescription() {
        return this.#description;
    }

    editDescription(newDescription) {
        this.#description = newDescription;
    }

    getDueDate() {
        return this.#dueDate;
    }

    editDueDate(newDueDate) {
        this.#dueDate = newDueDate;
    }

    getPriority() {
        return this.#priority;
    }

    editPriority(newPriority) {
        this.#priority = newPriority;
    }

    getProject() {
        return this.#project;
    }

    editProject(newProject) {
        this.#project = newProject
    }
}

const Project = class {
    #title;
    #myTodos;
    static #ID = 0;

    constructor(title) {
        this.#title = title;
        this.#myTodos = [];
        Project.#ID++;
    }

    getTitle() {
        return this.#title;
    }

    editTitle(newTitle) {
        this.#title = newTitle;
    }

    addTodo(title, description, dueDate, priority) {
        let todo = new Todo(title, description, dueDate, priority, this.#title)
        this.#myTodos.push(todo);
    }

}

const project1 = new Project("Project 1");
const project2 = new Project("Project 2");
const project3 = new Project("Project 3");

project3.addTodo("My Title", "My description", "My due date", "My Priority");


console.log(project1);
console.log(project2);
console.log(project3);