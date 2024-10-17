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
    constructor(title, description, dueDate, priority, project) {
        this.#title = title;
        this.#description = description;
        this.#dueDate = dueDate;
        this.#priority = priority;
        this.#project = project;
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
        return this.#Project;
    }

    editProject(newProject) {
        this.#project = newProject
    }
}

const ProjectList = class {
    #projectList;

    constructor(myList) {
        this.title = myList;
        this.#projectList = [];
        this.#projectList[0] = "Default"
    }

    getProject(i) {
        return this.#projectList[i];
    }

    editProjectTitle(oldTitle, newTitle) {
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

const myList = new ProjectList("myList");

const todo1 = new Todo("Title 1", "Description 1", "DueDate 1", "Priority 1", "Project 1");
const todo2 = new Todo("Title 2", "Description 2", "DueDate 2", "Priority 2", "Project 2");
const todo3 = new Todo("Title 3", "Description 3", "DueDate 3", "Priority 3", "Project 3");

myList.addProjectToList("Project 1");
myList.addProjectToList("Project 2");

myList.editProjectTitle("Project 2", "Project 3");
myList.deleteProjectFromList("Project 1");

console.log(myList.getAllProjects());
