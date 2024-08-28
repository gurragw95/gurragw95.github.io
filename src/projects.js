const { createTask, printTasks } = require("./tasks.js")

//Defines the container in which to print the project names.
const projectNameContainer = document.querySelector("#projectColumnContainer");

//Factory function to create a project.
function createProject(name){

    let projectTasks = [];
    let id;

    return{
        name: name,
        tasksInProject: projectTasks,
        id: id,
        addTask: function(taskToAdd, taskId){
            projectTasks.push(taskToAdd);            
        },
        removeTask: function(taskId){
            projectTasks.splice(taskId,1);
        },
        setProjectId: function(newProjectId){
            this.id = newProjectId;
        },
        printTasksInProject(proj){
            printTasks(proj.tasksInProject);
        }
    };

}

//Function to print projects to the document. Gives each div a paragraph with the name of the project.
function printProjects(arr, onClickCallback){
    for(let project of arr){
        let tempDiv = document.createElement("div");
        tempDiv.classList.add("projectNameDivs");
        tempP = document.createElement("p");
        tempP.textContent = project.name;
        projectNameContainer.appendChild(tempDiv);
        tempDiv.appendChild(tempP);

        tempDiv.addEventListener("click", () => {

            //Callback function to send the latest selected project to
            onClickCallback(project);

            //When the user clicks on the project div, the tasks are printed.
            printTasks(project.tasksInProject, project);   
            

                     
        })
    };
}

function clearProjects(){
    while (projectNameContainer.firstChild) {
        projectNameContainer.removeChild(projectNameContainer.firstChild);
    };
    
}



module.exports = { createProject, printProjects, clearProjects };


