class Todo {
    // STATIC PROPERTIES
    static #todoCounter = 0;
    static #projectCounter = 0;
    static #allTodos = {};
    static #allProjects = {};

    // STATIC METHODS
    static init() {
        this.loadFromStorage();
        if (this.#todoCounter == null) {
            this.#todoCounter = 0;
            console.log("Couldn't load todoCounter -> reset to 0");
        }
        if (this.#projectCounter == null) {
            this.#projectCounter = 0;
            console.log("Couldn't load projectCounter -> reset to 0");
        }
        if (this.#allTodos == null) {
            this.#allTodos = {};
            console.log("Couldn't load todos!");
        }
        if (this.#allProjects == null) {
            this.#allProjects = {};
            console.log("Couldn't load projects!");
            this.createProject("Default");
        }
        // this.createProject("Default");
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
        this.#allTodos[todo.myTodoID] = todo;
        return todo;
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

    static #isDateValid(date) {
        let checkDate = new Date(date);
        return checkDate.getTime() === checkDate.getTime();
    }

    static saveToStorage() {
        let todoCounter = this.#todoCounter;
        todoCounter = JSON.stringify(todoCounter);
        localStorage.setItem("todoCounter", todoCounter);

        let projectCounter = this.#projectCounter;
        projectCounter = JSON.stringify(projectCounter);
        localStorage.setItem("projectCounter", projectCounter);

        let todoData = this.#allTodos;
        todoData = JSON.stringify(todoData);
        localStorage.setItem("todoData", todoData);

        let projectData = this.#allProjects;
        projectData = JSON.stringify(projectData);
        localStorage.setItem("projectData", projectData);
    }

    static loadFromStorage() {
        this.#todoCounter = JSON.parse(localStorage.getItem("todoCounter"));
        this.#projectCounter = JSON.parse(localStorage.getItem("projectCounter"));
        this.#allTodos = JSON.parse(localStorage.getItem("todoData"));
        this.#allProjects = JSON.parse(localStorage.getItem("projectData"));
    }

    static reset() {
        localStorage.clear();
        this.#todoCounter = 0;
        this.#projectCounter = 0;
        this.#allTodos = {};
        this.#allProjects = {};
    }

    constructor(title, description, dueDate, priority, projectID) {
        this.myTitle = title;
        this.myDescription = description;
        this.myDueDate = dueDate;
        this.myPriority = priority;
        this.myCompleted = false;
        this.myTodoID = Todo.#todoCounter++;
        this.myProjectID = projectID; // <- muss noch angepasst werden; default project sollte 0 sein und auch existieren
    }

    get title() {
        return this.myTitle;
    }

    set title(newTitle) {
        if (typeof newTitle === "string") {
            this.myTitle = newTitle;
        } else {
            console.log("Invalid input - needs to be a string!")
        }
    }

    get description() {
        return this.myDescription;
    }
    
    set description(newDescription) {
        if (typeof newDescription === "string") {
            this.myDescription = newDescription;
        } else {
            console.log("Invalid input - needs to be a string!")
        }
    }

    get dueDate() {
        return this.myDueDate;
    }
    
    set dueDate(newDueDate) {
        if (Todo.#isDateValid(newDueDate === true)) {
            this.myDueDate = new Date(newDueDate);
        } else {
            console.log("Invalid date!")
        }
    }

    get priority() {
        return this.myPriority;
    }
    
    set priority(newPriority) {
        if ((newPriority === 4) || (newPriority === 3) || (newPriority === 2) || (newPriority === 1)) {
            this.myPriority = newPriority;
        } else {
            console.log("Invalid input - needs to be an integer from 1 to 4!")
        }
    }

    get completed() {
        return this.myCompleted;
    }
    
    set completed(value) {
        if (typeof value === "boolean") {
        this.myCompleted = value;
        } else {
            console.log("Invalid input - either true or false requiered!")
        }
    }

    // getMyTodoID() {}
    
    get projectID() {
        return this.myProjectID;
    }
    
    set projectID(newDescription) {
        // logic tbd
    }

    logMe() {
        console.log(this);
    }
}

export { Todo };