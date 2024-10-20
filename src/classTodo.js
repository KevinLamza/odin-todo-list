class Todo {
    // STATIC PROPERTIES
    // each todo and project will have a unique ID they refer to
    static #todoCounter = 0;
    static #projectCounter = 0;

    // todoID/projectID:todo-/project-object as key:property
    static #allTodos = {};
    static #allProjects = {};

    static #DOM = {};

    static #lastProjectFilter = "all";
    static #lastShowCompletedFilter = "a";
    static #showTodosFilter = false;

    static #lastExpansion = {};

    // STATIC METHODS
    // init(): check first on start up if all properties can be loaded from local storage
    // if no (= null), then reset them to zero / empty object respectively
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
        this.#DOM = this.cacheDOM();
        this.buttonLogic();
        this.renderList(this.#allTodos, "todos");

        // only for debugging purposes, can be removed
        this.logAllProjects();
        this.logAllTodos();
    }

    static createProject(title) {
        if(this.#isValidInput(title, "typeOfTitle")) {
            this.#allProjects[this.#projectCounter++] = title;
            Todo.renderList(Todo.#allProjects, "project");
            Todo.renderFilter("remove");
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
        // Default project (ID == 0) should not be deleted
        if (projectID == 0) {
            console.log("Default Project can't be deleted");
            return
        } else {
            // for all other project IDs, loop through the allProjects object and delete them
            if (projectID in this.#allProjects) {
                delete this.#allProjects[projectID];
                // depending on the deleteOrphans flag, all todos that have the project ID of the deleted project will
                // either be deleted too or their project ID changed to the default project (id 0)
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
                Todo.renderList(Todo.#filterTodos(Todo.#lastProjectFilter, Todo.#lastShowCompletedFilter), "todos");
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
        this.renderList(this.#allTodos, "todos");
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
            if ((input == 4) || (input == 3) || (input == 2) || (input == 1)) {
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

    // just for debugging purposes to create some sample projects and todos - can be deleted
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

    static #filterTodos(projectFlag, completedFlag) {
        // projectFlag can be either be the projectID or "a" for all show projects e.q. no project filter
        // completedFlag can be "a" show all, "u" show uncompleted, "c" show completed
        let unfiltered = this.#allTodos;
        
        // first filter is the project filter
        let firstFilter = {};

        // second filter is the "completed" filter
        let secondFilter = {};
        // console.log(unfiltered);
        // console.log("hello");
        if (projectFlag === "all") {
            firstFilter = unfiltered;
            console.log("hello again");
        } else {
            for (const property in unfiltered) {
                // console.log(unfiltered[property]["myProjectID"]);
                // console.log(projectFlag);
                if (unfiltered[property]["myProjectID"] == projectFlag) {
                    firstFilter[property] = unfiltered[property];
                    // console.log(firstFilter);
                    // the resulting firstFilter will be used as input for the second filter
                }
            }
        }
        if (completedFlag === "a") {
            secondFilter = firstFilter;
            return secondFilter;
        } else if (completedFlag === "u") {
            for (const property in firstFilter) {
                if (firstFilter[property]["myCompleted"] === false) {
                    // console.log(`${property}: ${firstFilter[property]["myCompleted"]}`);
                    secondFilter[property] = firstFilter[property];
                }
            } return secondFilter;
        } else if (completedFlag === "c") {
            for (const property in firstFilter) {
                if (firstFilter[property]["myCompleted"] === true) {
                    // console.log(`${property}: ${firstFilter[property]["myCompleted"]}`);
                    secondFilter[property] = firstFilter[property];
                }
            } return secondFilter
        }
    }

    static cacheDOM() {
        const nodeFirstFilter = document.querySelector(".firstFilter");
        const nodeSecondFilter = document.querySelector(".secondFilter"); // filter by project buttons will be appended here
        const nodeListTitle = document.querySelector("#listTitle"); // textContent will be either Projects or Todos
        const nodeListContainer = document.querySelector("#listContainer"); //todos or projects will be appended as list items

        const nodeShowProjectsButton = document.querySelector("#showProjectsButton");
        const nodeShowTodosButton = document.querySelector("#showTodosButton");

        const nodeShowAllButton = document.querySelector("#showAllButton");
        const nodeShowCompletedButton = document.querySelector("#showCompletedButton");
        const nodeShowUncompletedButton = document.querySelector("#showUncompletedButton");

        const nodeCreateTodo = document.querySelector("#createTodo");
        const nodeCreateProject = document.querySelector("#createProject");
        const nodeCreateTodoDialog = document.querySelector("#dialogCreateTodo");
        const nodeCreateProjectDialog = document.querySelector("#dialogCreateProject");
        const nodeTodoFormSubmit = document.querySelector("#todoFormSubmit");
        const nodeTodoFormCancel = document.querySelector("#todoFormCancel");


        return {nodeFirstFilter,
                nodeSecondFilter, 
                nodeListTitle, 
                nodeListContainer,
                nodeShowProjectsButton,
                nodeShowTodosButton,
                nodeShowAllButton,
                nodeShowCompletedButton,
                nodeShowUncompletedButton,
                nodeCreateTodo,
                nodeCreateProject,
                nodeCreateTodoDialog,
                nodeCreateProjectDialog,
                nodeTodoFormSubmit,
                nodeTodoFormCancel}
    }

    static buttonLogic() {
        this.showButtonLogic();
    }

    static showButtonLogic() {
        document.addEventListener('click', function (event) {
            for (let i = 0; i < Todo.#todoCounter; i++) {
                if (event.target.matches(`#T${i}`)) {
                    console.log(i);
                    Todo.renderList(Todo.#filterTodos(Todo.#lastProjectFilter, Todo.#lastShowCompletedFilter), "subTodo", i);
                }
            }
            for (let i = 0; i < Todo.#projectCounter; i++) {
                if (event.target.matches(`#P${i}`)) {
                    console.log(i);
                }
            }
            if (event.target.matches('#showProjectsButton')) {
                Todo.renderList(Todo.#allProjects, "project");
                Todo.renderFilter("remove");
            }
            if (event.target.matches('#showTodosButton')) {
                Todo.renderList(Todo.#allTodos, "todos");
                Todo.renderFilter("add");
            }
            if (event.target.matches('#showAllButton')) {
                Todo.renderList(Todo.#filterTodos(Todo.#lastProjectFilter, "a"), "todos");
                Todo.#lastShowCompletedFilter = "a";
            }
            if (event.target.matches('#showCompletedButton')) {
                Todo.renderList(Todo.#filterTodos(Todo.#lastProjectFilter, "c"), "todos");
                Todo.#lastShowCompletedFilter = "c";
            }
            if (event.target.matches('#showUncompletedButton')) {
                Todo.renderList(Todo.#filterTodos(Todo.#lastProjectFilter, "u"), "todos");
                Todo.#lastShowCompletedFilter = "u";
            }
            if (event.target.matches('#createTodo')) {
                Todo.#DOM.nodeCreateTodoDialog.showModal();
                
            }
            if (event.target.matches('#todoFormCancel')) {
                Todo.#DOM.nodeCreateTodoDialog.close();
            }
            if (event.target.matches('#todoFormSubmit')) {
                event.preventDefault();
                let title = document.getElementById('todoFormTitle').value;
                let description = document.getElementById('todoFormDescription').value;
                let dueDate = document.getElementById('todoFormDueDate').value;
                let priority = document.querySelector('input[name="todoFormPriority"]:checked').value;
                console.log("");
                Todo.createTodo(title,description,dueDate,priority,0);
                Todo.#DOM.nodeCreateTodoDialog.close();
                document.querySelector(".formTodo").reset();
            }
            if (event.target.matches('#createProject')) {
                Todo.#DOM.nodeCreateProjectDialog.showModal();
                
            }
            if (event.target.matches('#projectFormCancel')) {
                Todo.#DOM.nodeCreateProjectDialog.close();
            }
            if (event.target.matches('#projectFormSubmit')) {
                event.preventDefault();
                let title = document.getElementById('projectFormTitle').value;
                console.log("");
                Todo.createProject(title);
                Todo.#DOM.nodeCreateProjectDialog.close();
                document.querySelector(".formProject").reset();
            }
        }, false);
    }

    static renderList(list, type, target="") {
        
        if (type === "project") {
            this.clearDOMList();
            let ulNode = document.createElement("ul");
            for (const property in list) {
                let liNode = document.createElement("li");
                let textNode = document.createTextNode(list[property]);
                liNode.appendChild(textNode);
                liNode.setAttribute("id", "P" + property);
                ulNode.appendChild(liNode);
                // console.log(ulNode);
                // console.log("hello");
            }
            this.#DOM.nodeListContainer.appendChild(ulNode);
        }
        if (type === "todos") {
            this.clearDOMList();
            let ulNode = document.createElement("ul");
            for (const property in list) {
                let liNode = document.createElement("li");
                let textNode = document.createTextNode(list[property]["myTitle"]);
                liNode.appendChild(textNode);
                liNode.setAttribute("id", "T" + list[property]["myTodoID"]);
                ulNode.appendChild(liNode);
                // console.log(ulNode);
                // console.log("hello");
            }
            this.#DOM.nodeListContainer.appendChild(ulNode);
        }
        if (type === "subTodo") {
            let todoNode = document.getElementById(`T${target}`);
            console.log(todoNode.childElementCount);
                if (todoNode.childElementCount == 0) {
                    let ulNode = document.createElement("ul");
                    let buttonNode;

                    let liNode = document.createElement("li");
                    let textNode = document.createTextNode(Todo.#allTodos[target]["myDescription"]);
                    liNode.appendChild(textNode);
                    liNode.setAttribute("class", "subBulletPoint");
                    ulNode.appendChild(liNode);

                    liNode = document.createElement("li");
                    textNode = document.createTextNode("Due until: " + Todo.#allTodos[target]["myDueDate"]);
                    liNode.appendChild(textNode);
                    liNode.setAttribute("class", "subBulletPoint");
                    ulNode.appendChild(liNode);

                    liNode = document.createElement("li");
                    textNode = document.createTextNode("Priority: " + Todo.#allTodos[target]["myPriority"]);
                    liNode.appendChild(textNode);
                    liNode.setAttribute("class", "subBulletPoint");
                    ulNode.appendChild(liNode);

                    liNode = document.createElement("li");
                    buttonNode = document.createElement("button");
                    buttonNode.setAttribute("class", "markComplete");
                    buttonNode.setAttribute("id", `todo${target}MarkComplete`);
                    textNode = document.createTextNode("Mark Complete");
                    buttonNode.appendChild(textNode);
                    liNode.appendChild(buttonNode);
                    liNode.setAttribute("class", "subBulletPoint");
                    ulNode.appendChild(liNode);

                    console.log(`T${target}`);
                    todoNode = document.getElementById(`T${target}`);
                    console.log(todoNode);
                    todoNode.appendChild(ulNode);
                }
                else if (todoNode.childElementCount > 0) {
                    const content = document.getElementById(`T${target}`);
                    for(let i=0;i<content.childNodes.length;i++)
                        {
                            if(content.childNodes[i].nodeType!=3)//not TEXT_NODE
                            content.removeChild(content.childNodes[i--]);
                        }
                    }
                }
                

                // console.log(ulNode);
                // console.log("hello");
            }        
    

    static renderFilter(flag) {
        if (flag === "add" && Todo.#showTodosFilter === false) {
            let buttonNode = document.createElement("button");
            let textNode = document.createTextNode("Show All");
            buttonNode.appendChild(textNode);
            buttonNode.setAttribute("id", "showAllButton");
            Todo.#DOM.nodeFirstFilter.appendChild(buttonNode);

            let buttonNode2 = document.createElement("button");
            let textNode2 = document.createTextNode("Show Completed");
            buttonNode2.appendChild(textNode2);
            buttonNode2.setAttribute("id", "showCompletedButton");
            Todo.#DOM.nodeFirstFilter.appendChild(buttonNode2);

            let buttonNode3 = document.createElement("button");
            let textNode3 = document.createTextNode("Show Uncompleted");
            buttonNode3.appendChild(textNode3);
            buttonNode3.setAttribute("id", "showUncompletedButton");
            Todo.#DOM.nodeFirstFilter.appendChild(buttonNode3);

            let buttonNodeFilterAllProjects = document.createElement("button");
            let textNodeFilterAllProjects = document.createTextNode("All Projects");
            buttonNodeFilterAllProjects.appendChild(textNodeFilterAllProjects);
            buttonNodeFilterAllProjects.setAttribute("id", "filterAllProjects");
            Todo.#DOM.nodeSecondFilter.appendChild(buttonNodeFilterAllProjects);
            document.addEventListener('click', function (event) {
                if (event.target.matches('#filterAllProjects')) {
                    Todo.renderList(Todo.#filterTodos("all", Todo.#lastShowCompletedFilter), "todos");
                    Todo.#lastProjectFilter = "all";
                }
            }, false);

            for (const property in Todo.#allProjects) {
                let buttonNode = document.createElement("button");
                let textNode = document.createTextNode(Todo.#allProjects[property]);
                // console.log(textNode);
                buttonNode.appendChild(textNode);
                buttonNode.setAttribute("id", `project${property}Button`);
                Todo.#DOM.nodeSecondFilter.appendChild(buttonNode);
                document.addEventListener('click', function (event) {
                    if (event.target.matches(`#project${property}Button`)) {
                        const obj = Todo.#filterTodos(property, Todo.#lastShowCompletedFilter);
                        // console.log(property);
                        // console.log(obj);
                        Todo.renderList(obj, "todos");
                        Todo.#lastProjectFilter = property;
                    }
                }, false);
            }
            Todo.#showTodosFilter = true;

        } else if (flag === "remove") {
            while (Todo.#DOM.nodeFirstFilter.firstChild) {
                Todo.#DOM.nodeFirstFilter.removeChild(Todo.#DOM.nodeFirstFilter.firstChild);
            }
            while (Todo.#DOM.nodeSecondFilter.firstChild) {
                Todo.#DOM.nodeSecondFilter.removeChild(Todo.#DOM.nodeSecondFilter.firstChild);
            }
            Todo.#showTodosFilter = false;
        }
    }

    static clearDOMList() {
        const content = document.querySelector("#listContainer");
        while (content.firstChild) {
            content.removeChild(content.firstChild);
        }
    }

    // static drawFilterProjects(DOM) {
        // let list = document.createElement("li");
        // let button = document.createElement("button");
        // let textNode = document.createTextNode("Test");
        // button.appendChild(textNode);
        // button.setAttribute("bla", "bla2");
        // list.appendChild(button);
        // list.appendChild(button);
        // list.appendChild(button);
        // DOM.divFilterProjectsButtons.appendChild(list);

        // loop through array for each button
    // }



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