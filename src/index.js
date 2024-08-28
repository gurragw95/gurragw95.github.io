import "./style.css";



document.addEventListener("DOMContentLoaded", () => {

    const { createTask, printTasks } = require("./tasks.js");
    const { createProject, printProjects, clearProjects } = require("./projects.js");
    const { createModal } = require("./modal.js");
    


//Variable to hold the latest selected project object.
let selectedProject;
//Variable to hold the save button
const modalSaveButton = document.querySelector("#saveButton");
//Variable to hold the "Add new task" divbutton
const newTaskDiv = document.querySelector("#newTaskDiv");
//Variable to hold the "Delete project" button.
const deleteProjectBtn = document.querySelector("#deleteProjectDiv");
//Variable for div to add new projects.
const addProjectsDiv = document.querySelector("#addProjectDiv");
//Array to hold all projects.
let projectsArr = [];
//Created a modal to pop up for when the tasks are selected.
const mod = createModal();

//Creates an array to hold all current projects.
try{
    if(JSON.parse(localStorage.getItem("projectsArr")) && JSON.parse(localStorage.getItem("projectsArr")).length > 0){
        projectsArr = JSON.parse(localStorage.getItem("projectsArr")) 
    }
    else{
        projectsArr = [];
    };
} catch {
    console.log("Couldn't parse local storage.");
    projectsArr = [];
}

//#################################### SAVE FUNCTIONS ############################################
//Function to save projects
function saveProjects(projectsArr){

    if(projectsArr.length > 0){
        localStorage.setItem("projectsArr", JSON.stringify(projectsArr));
    } else {
        console.log("Couldn't save project.");
    };    
}

//Function to retrieve locally stored objects.
function getProjects(){
    const storedProjects = JSON.parse(localStorage.getItem("projectsArr"));
    if (storedProjects) {
        projectsArr = storedProjects.map(projData => {
            const proj = createProject(projData.name);
            proj.tasksInProject = projData.tasksInProject; // Restore data
            proj.id = projData.id;
            return proj;
        });
    } else {
        projectsArr = [];
    }
}



//#################################### EVENT LISTENERS ############################################

//Add events listener to the "Add projects" div.
addProjectsDiv.addEventListener("click", (target) => {
    //Prompts user for new projects name.
    const projectName = window.prompt("Enter the name of the new project.", "Unnamed");
    //Creates project object.
    const proj = createProject(projectName);
    //Adds the new project to the projects array.
    projectsArr.push(proj);
    
    //Cleats all projects before printing them again.
    clearProjects();
    printProjects(projectsArr, returnLatestProjectSelection);
    
    //Saves the projects array after having added a new project.
    saveProjects(projectsArr);

    //Returns the newly saved projects to the projectsArray.
    getProjects();       
        
})

//Add event listener to the add new task div button
newTaskDiv.addEventListener("click", () => {

    //Checks if a project is selected.
    if (selectedProject === undefined) {
        alert("Please select a project first.");        
    }
    
    //Prompts the user for task name.
    const newTaskName = prompt("Enter the name of the task.", "Unnamed task");
    //Creates a new task object.
    const tempTask = createTask(newTaskName);
    //Pushes a new task to the project. the project.addTask method will not work after deserialization, and this is used instead.
    selectedProject.tasksInProject.push(tempTask);
    saveProjects(projectsArr);   
    clearProjects(); 
    printProjects(projectsArr, returnLatestProjectSelection);
    printTasks(selectedProject.tasksInProject, selectedProject);
})

//Adds event listener to the modal save button when a task is updated.
//Prints all tasks, so that we can see the updated task names if those were changed.
modalSaveButton.addEventListener("click", () => {
    clearProjects();
    //The below function also gets the latest selected project, so that its tasks can be printed.
    printProjects(projectsArr, returnLatestProjectSelection);
    //selectedProject.printTasksInProject(selectedProject);
    printTasks(selectedProject.tasksInProject);
    //Saves the project to make sure the new information is stored.
    saveProjects(projectsArr);
})

//In tasks.js, a custom event for when the need to save arises is defined. This block executes when that event is dispatched.
window.addEventListener("needToSave", () => {
    saveProjects(projectsArr);
    clearProjects();
    printProjects(projectsArr, returnLatestProjectSelection);
    printTasks(selectedProject.tasksInProject, selectedProject);
})

//Listens for the need to set selectedProject to default. Used in task.js after deleting tasks.
window.addEventListener("selectedProjectDefault", () => {
    //selectedProject = projectsArr[0];

    printProjects(projectsArr, returnLatestProjectSelection);

})

//Adds a function to delete the current selected project.
deleteProjectBtn.addEventListener("click", () => {

    let indexOfSelectedProject = projectsArr.indexOf(selectedProject);

    //If project exists, deletes it and sets the default project [0] as latest selected project.
    if(indexOfSelectedProject > 0){
        projectsArr.splice(indexOfSelectedProject,1);
        
        saveProjects(projectsArr);
        clearProjects();
        printProjects(projectsArr, returnLatestProjectSelection);
        selectedProject = projectsArr[0];        
        
    }
    else{("You have to select a project to delete.")};       
    
})


window.addEventListener("needToPrintProjects", () => {
    printProjects(projectsArr);
})

//Callback function to see the latest selected project.
//The function is used in the projects.js when onclick event listener is added to each of the printed project divs.
function returnLatestProjectSelection(proj){
    selectedProject = proj;
    
}


//If the projects exist in local storage, reprints them.
try{
    const storedProjects = localStorage.getItem("projectsArr");
    if(storedProjects && JSON.parse(storedProjects).length > 0){
    clearProjects();
    printProjects(projectsArr, returnLatestProjectSelection);
}} catch {
    
    alert("Couldn't parse JSON at line 119. projectArr is: " + projectsArr);
    //Creates some default tasks.
    const task1 = createTask("Städa sovrummet", "Städa under sängen och under mattan.",null,null,"These are the notes!");
    task1.setTaskId(1);



    //Creates a default project.
    const defaultProject = createProject("Default");
    defaultProject.addTask(task1);


    //Adds default tasks to default project.
    projectsArr.push(defaultProject)    

    //Prints the current project to the array. Inputs the callback function so that we can get the latest selected object back.
    clearProjects();
    selectedProject = printProjects(projectsArr, returnLatestProjectSelection);
    saveProjects(projectsArr);

    
    
}

//Makes sure the selected project is updated outside the catch scope above.
clearProjects();
selectedProject = printProjects(projectsArr, returnLatestProjectSelection);







})

//Creates the possibility to remove tasks.
function returnTask(task){
    indexTask = task;
    return indexTask;
}

//Function to remove projects.
function removeProject(projectToRemove){

    const index = projectsArr.indexOf(projectToRemove);
    projectsArr.splice(index,1);
    

}






















