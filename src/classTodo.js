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
        this.saveToStorage();
    }

    static editProjectTitle(projectID, newTitle) {
        if (typeof newTitle === "string") {
            if (projectID in this.#allProjects) {
                this.#allProjects[projectID] = newTitle;
                this.saveToStorage();
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
            this.saveToStorage();
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
        this.saveToStorage();
        return todo;
    }

    static deleteTodo(todoID) {
        if (todoID in this.#allTodos) {
            delete this.#allTodos[projectID];
            this.saveToStorage();
        } else {
            console.log("There is no todo with this ID");
        }
    }

    static logAllTodos() {
        console.log(this.#allTodos);
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

    static #isValidInput(input, inputType) {
        if ((inputType === "typeOfString") || (inputType === "all")) {
            if (typeof input === "string") {
                return true
            } else {
                console.log("Invalid input - needs to be a string!")
                return false
            }
        }
        if ((inputType === "typeOfDate") || (inputType === "all")) {
            let checkDate = new Date(input);
            if (checkDate.getTime() === checkDate.getTime()) {
                return true
            } else {
                console.log("Invalid date!")
                return false
            }
        }
        if ((inputType === "typeOfPriority") || (inputType === "all")) {
            if ((input === 4) || (input === 3) || (input === 2) || (input === 1)) {
                return true
            } else {
                console.log("Invalid input - needs to be an integer from 1 to 4!")
                return false
            }
        }
        if ((inputType === "typeOfBoolean") || (inputType === "all")) {
            if (typeof input === "boolean") {
                return true
            } else {
                console.log("Invalid input - needs to be either true or false")
                return false
            }
        }
    }

    constructor(title, description, dueDate, priority, projectID) {
        this.myTitle = title;
        this.myDescription = description;
        this.myDueDate = dueDate;
        this.myPriority = priority;
        this.myCompleted = false;
        this.myTodoID = Todo.#todoCounter++;
        this.myProjectID = projectID;
    }

    get title() {
        return this.myTitle;
    }

    set title(newTitle) {
        if (Todo.#isValidInput(newTitle, "typeOfString")) {
            this.myTitle = newTitle;
            Todo.saveToStorage();
        };
    }

    get description() {
        return this.myDescription;
    }
    
    set description(newDescription) {
        if (Todo.#isValidInput(newDescription, "typeOfString")) {
            this.myDescription = newDescription;
            Todo.saveToStorage();
        };
    }

    get dueDate() {
        return this.myDueDate;
    }
    
    // set dueDate(newDueDate) {
    //     if (Todo.#isDateValid(newDueDate === true)) {
    //         this.myDueDate = new Date(newDueDate);
    //         Todo.saveToStorage();
    //     } else {
    //         console.log("Invalid date!")
    //     }
    // }

    set dueDate(newDueDate) {
        if (Todo.#isValidInput(newDueDate, "typeOfDate")) {
            this.myDueDate = new Date(newDueDate);
            Todo.saveToStorage();
        };
    }

    get priority() {
        return this.myPriority;
    }
    
    set priority(newPriority) {
        if (Todo.#isValidInput(newPriority, "typeOfPriority")) {
            this.myPriority = newPriority;
            Todo.saveToStorage();
        };
    }

    get completed() {
        return this.myCompleted;
    }
    
    set completed(value) {
        if (Todo.#isValidInput(value, "typeOfBoolean")) {
            this.myCompleted = value;
            Todo.saveToStorage();
        };
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