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
    #myID;
    static #ID = 0;
    constructor(title, description, dueDate, priority, project) {
        this.#title = title;
        this.#description = description;
        this.#dueDate = dueDate;
        this.#priority = priority;
        this.#project = project;
        this.#myID = Todo.#ID++;
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

    getID() {
        return this.#myID;
    }
}

const Project = class {
    #title;
    #myTodos;
    #myID;
    static #ID = 0;

    constructor(title) {
        this.#title = title;
        this.#myTodos = [];
        this.#myID = Project.#ID++;
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

    deleteTodo(id) {
        // let index = this.#myTodos.indexOf(oldTitle);
        for(let i = 0; i < this.#myTodos.length; i++) {
            if (id === this.#myTodos[i].getID()) {
                this.#myTodos.splice(i, 1);
            }
        }
    }

}

const project1 = new Project("Project 1");
const project2 = new Project("Project 2");
const project3 = new Project("Project 3");

project3.addTodo("My Title", "My description", "My due date", "My Priority");
project3.addTodo("My Title", "My description", "My due date", "My Priority");
project3.addTodo("My Title", "My description", "My due date", "My Priority");
project3.deleteTodo(0);


console.log(project1);
console.log(project2);
console.log(project3);