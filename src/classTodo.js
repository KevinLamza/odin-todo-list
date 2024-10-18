class Todo {
    // STATIC PROPERTIES
    static #todoCounter = 0;
    static #projectCounter = 0;
    static #allTodos = {};
    static #allProjects = {};

    #myTitle;
    #myDescription;
    #myDueDate;
    #myPriority;
    #myCompleted;
    #myTodoID;
    #myProjectID;

    // STATIC METHODS
    static init() {
        this.createProject("Default");
    }

    static createProject(title) {
        this.#allProjects[this.#projectCounter++] = title;
    }

    static editProjectTitle(projectID, newTitle) {
        if (typeof newTitle === "string") {
            if (projectID in this.#allProjects) {
                this.#allProjects[projectID] = newTitle;
            } else {
                console.log("There is no project with this ID");
            }
        } else {
            console.log("Invalid input - New title needs to be a string!");
        }
    }

    static deleteProject(projectID) {
        if (projectID in this.#allProjects) {
            delete this.#allProjects[projectID];
        } else {
            console.log("There is no project with this ID");
        }
    }

    static logAllProjects() {
        console.log(this.#allProjects);
    }

    static createTodo(title = "No title", description = "No description", dueDate = "31/12/2999", priority = 4, projectID = 0) {
        if (!(projectID in this.#allProjects)) {
            projectID = 0;
        }
        let todo = new Todo (title, description, dueDate, priority, projectID);
        this.#allTodos[todo.#myTodoID] = todo;
    }

    static deleteTodo(todoID) {
        if (todoID in this.#allTodos) {
            delete this.#allTodos[projectID];
        } else {
            console.log("There is no todo with this ID");
        }
    }

    static logAllTodos() {
        console.log(this.#allTodos);
    }

    static isDateValid(date) {
        let checkDate = new Date(date);
        return checkDate.getTime() === checkDate.getTime();
    }

    constructor(title, description, dueDate, priority, projectID) {
        this.#myTitle = title;
        this.#myDescription = description;
        this.#myDueDate = dueDate;
        this.#myPriority = priority;
        this.#myCompleted = false;
        this.#myTodoID = Todo.#todoCounter++;
        this.#myProjectID = projectID; // <- muss noch angepasst werden; default project sollte 0 sein und auch existieren
    }

    getTitle() {
        return this.#myTitle;
    }

    setTitle(newTitle) {
        if (typeof newTitle === "string") {
            this.#myTitle = newTitle;
        } else {
            console.log("Invalid input - needs to be a string!")
        }
    }

    getDescription() {
        return this.#myDescription;
    }
    
    setDescription(newDescription) {
        if (typeof newDescription === "string") {
            this.#myDescription = newDescription;
        } else {
            console.log("Invalid input - needs to be a string!")
        }
    }

    getDueDate() {
        return this.#myDueDate;
    }
    
    setDueDate(newDueDate) {
        if (Todo.isDateValid(newDueDate === true)) {
            this.#myDueDate = new Date(newDueDate);
        } else {
            console.log("Invalid date!")
        }
    }

    getPriority() {
        return this.#myPriority;
    }
    
    setPriority(newPriority) {
        if ((newPriority === 4) || (newPriority === 3) || (newPriority === 2) || (newPriority === 1)) {
            this.#myPriority = newPriority;
        } else {
            console.log("Invalid input - needs to be an integer from 1 to 4!")
        }
    }

    getCompleted() {
        return this.#myCompleted;
    }
    
    setCompleted() {
        this.#myCompleted = !this.#myCompleted;
    }

    // getMyTodoID() {}
    
    getProjectID() {
        return this.#myProjectID;
    }
    
    setProjectID(newDescription) {
        // logic tbd
    }

    logMe() {
        console.log(this);
    }
}

export { Todo };