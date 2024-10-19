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

        // DEV
        this.logAllProjects();
        this.logAllTodos();
    }

    static createProject(title) {
        if(this.#isValidInput(title, "typeOfTitle")) {
            this.#allProjects[this.#projectCounter++] = title;
            this.saveToStorage();
        }
    }

    static editProjectTitle(projectID, newTitle) {
        if (this.#isValidInput(newTitle, "typeOfTitle")) {
            if (projectID in this.#allProjects) {
                this.#allProjects[projectID] = newTitle;
                this.saveToStorage();
            } else {
                console.log("There is no project with this ID");
            }
        };
    }

    static deleteProject(projectID, deleteOrphans) {
        if (projectID == 1) {
            console.log("Default Project can't be deleted");
            return
        } else {
            if (projectID in this.#allProjects) {
                delete this.#allProjects[projectID];
                if (deleteOrphans === true) {
                    for (const property in this.#allTodos) {
                        if (this.#allTodos[property]["myProjectID"] == projectID) {
                            delete this.#allTodos[property];
                        }
                    }                     
                } else if (deleteOrphans === false) {
                    for (const property in this.#allTodos) {
                        if (this.#allTodos[property]["myProjectID"] == projectID) {
                            this.#allTodos[property]["myProjectID"] = 0;
                        }
                    }  
                }
                this.saveToStorage();
            } else {
                console.log("There is no project with this ID");
            }
        }
    }

    static logAllProjects() {
        console.log(this.#allProjects);
    }

    static createTodo(title = "No title", description = "No description", dueDate = "31/12/2999", priority = 4, projectID = 0) {
        if((this.#isValidInput(title, "typeOfTitle"))
            && (this.#isValidInput(description, "typeOfDescription"))
            && (this.#isValidInput(dueDate, "typeOfDate"))
            && (this.#isValidInput(priority, "typeOfPriority"))){
                if (!(projectID in this.#allProjects)) {
                    projectID = 0;
                }
                let todo = new Todo (title, description, dueDate, priority, projectID);
                this.#allTodos[todo.myTodoID] = todo;
                this.saveToStorage();
        }
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

        // DEV
        this.logAllProjects();
        this.logAllTodos();
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
        this.createProject("Default");
        this.saveToStorage();
    }

    static #isValidInput(input, inputType) {
        if ((inputType === "typeOfTitle") || (inputType === "typeOfDescription") || (inputType === "checkAll")) {
            if (typeof input === "string") {
                return true
            } else {
                console.log("Invalid input - needs to be a string!")
                return false
            }
        }
        if ((inputType === "typeOfDate") || (inputType === "checkAll")) {
            let checkDate = new Date(input);
            if (checkDate.getTime() === checkDate.getTime()) {
                return true
            } else {
                console.log("Invalid date!")
                return false
            }
        }
        if ((inputType === "typeOfPriority") || (inputType === "checkAll")) {
            if ((input === 4) || (input === 3) || (input === 2) || (input === 1)) {
                return true
            } else {
                console.log("Invalid input - needs to be an integer from 1 to 4!")
                return false
            }
        }
        if ((inputType === "typeOfBoolean") || (inputType === "checkAll")) {
            if (typeof input === "boolean") {
                return true
            } else {
                console.log("Invalid input - needs to be either true or false")
                return false
            }
        }
        if ((inputType === "typeOfProjectID") || (inputType === "checkAll")) {
            if (input in this.#allProjects) {
                return true
            } else {
                console.log("Invalid projectID!")
                return false
            }
        }
    }

    static createSamples() {
        this.createProject("Project 1");
        this.createProject("Project 2");
        this.createProject("Project 3");
        this.createTodo("Title 1", "Description 1", "10/10/1010", 1, 0 );
        this.createTodo("Title 2", "Description 2", "10/10/1010", 2, 0 );
        this.createTodo("Title 3", "Description 3", "10/10/1010", 3, 1 );
        this.createTodo("Title 4", "Description 4", "10/10/1010", 4, 1 );
        this.createTodo("Title 5", "Description 5", "10/10/1010", 1, 2 );
        this.createTodo("Title 6", "Description 6", "10/10/1010", 2, 3 );
    }

    static filterTodos(projectFlag, completedFlag) {
        // projectFlag can be either projectID or "a" for all show projects e.q. no project filter
        // completedFlag can be "a" show all, "u" show uncompleted, "c" show completed
        let unfiltered = this.#allTodos;
        let firstFilter = {};
        let secondFilter = {};
        console.log(unfiltered);
        // if else all
        if (projectFlag === "all") {
            firstFilter = unfiltered;
        } else {
            for (const property in unfiltered) {
                console.log(`${property}: ${unfiltered[property]["myProjectID"]}`);
                if (unfiltered[property]["myProjectID"] === projectFlag) {
                    firstFilter[property] = unfiltered[property];
                }
            }
        }
        if (completedFlag === "a") {
            secondFilter = firstFilter;
            return secondFilter;
        } else if (completedFlag === "u") {
            for (const property in firstFilter) {
                if (firstFilter[property]["myCompleted"] === false) {
                    console.log(`${property}: ${firstFilter[property]["myCompleted"]}`);
                    secondFilter[property] = firstFilter[property];
                }
            } return secondFilter;
        } else if (completedFlag === "c") {
            for (const property in firstFilter) {
                if (firstFilter[property]["myCompleted"] === true) {
                    console.log(`${property}: ${firstFilter[property]["myCompleted"]}`);
                    secondFilter[property] = firstFilter[property];
                }
            } return secondFilter
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
        if (Todo.#isValidInput(newTitle, "typeOfTitle")) {
            this.myTitle = newTitle;
            Todo.saveToStorage();
        };
    }

    get description() {
        return this.myDescription;
    }
    
    set description(newDescription) {
        if (Todo.#isValidInput(newDescription, "typeOfDescription")) {
            this.myDescription = newDescription;
            Todo.saveToStorage();
        };
    }

    get dueDate() {
        return this.myDueDate;
    }

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
    
    set projectID(newProjectID) {
        if (Todo.#isValidInput(newProjectID, "typeOfProjectID")) {
            this.myProjectID = newProjectID;
            Todo.saveToStorage();
        };
    }

    logMe() {
        console.log(this);
    }
}

export { Todo };