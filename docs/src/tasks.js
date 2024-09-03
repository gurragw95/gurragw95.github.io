//Import the date-fns module
const { compareAsc, format } = require("date-fns");
//Imports the modal function, so that we can refer to the modal html object when a task is clicked.
const { createModal } = require("./modal.js");
const mod = createModal();


//Defines an object for the task container.
const taskContainer = document.querySelector("#taskContainer");

//Defines a custom event for when the need to save arises, so that index.js saves all changes made by tasks.js.
const needToSaveEvent = new Event("needToSave", () => {
    console.log("Event from task.js");
});

//Defines a custom event for when the need to set selectedProject to default in index.js
const setSelectedProjectDefault = new Event("selectedProjectDefault", () => {
    console.log("Event from task.js");
});

//Factory to create a todo task.
function createTask(title, description, dueDate, priority, notes, checklist){
    
    let id;

    return{
        title: title,
        description: description,
        dueDate: dueDate,
        priority: priority,
        notes:notes,
        checklist: checklist,
        id,
        setTaskId: function(newTaskId){
            this.id = newTaskId;
        },
        setTaskTitle: function(newTaskTitle){
            this.title = newTaskTitle;
        },
        setTaskDescription: function(newTaskDescription){
            this.description = newTaskDescription;
        },
        setNotes: function(newNotes){
            this.notes = newNotes;
        }
    };

}

//Function that takes an array of tasks from the project object, and prints them to the task container.
function printTasks(taskObjectsArray, project){

    clearTasks();



    for (let i = 0; i < taskObjectsArray.length; i++) {
        let task = taskObjectsArray[i];
        
        const tempTaskDiv = document.createElement("div");
        const tempTaskP = document.createElement("p");
        const deleteBtn = document.createElement("div");
        const deleteP = document.createElement("p");

        tempTaskDiv.classList.add("tempTaskDiv");

        taskContainer.appendChild(tempTaskDiv);
        tempTaskDiv.appendChild(tempTaskP);
        tempTaskDiv.appendChild(deleteBtn);
        deleteBtn.appendChild(deleteP);
        deleteBtn.classList.add("delBtn");
        deleteP.textContent = "del";

        tempTaskP.textContent = task.title;

        tempTaskDiv.style.gridRow = "span 2";
        tempTaskDiv.style.backgroundColor = "white";
        tempTaskDiv.style.borderRadius = "12px";
        tempTaskDiv.style.padding = "10px";
        


        //Adds an event listener to the listed tasks.
        mod.setModalActivator(tempTaskDiv);

        tempTaskDiv.addEventListener("click", () => {

            //Sets the task title to the task name, etc.
            if (task.title !== null){
                mod.setTaskTitle(task.title);
            };
            if (task.description !== null){
                mod.setTaskDescription(task.description);
            };
            if (task.notes !== null){
                mod.setTaskNotes(task.notes);
            };

            mod.receiveSelectedTask(task);

        })

        //Adds event listener to the delete-button to delete the selected task.
        deleteBtn.addEventListener("click", (e) => {

            e.stopPropagation();
            

            if(project !== undefined){


                project.tasksInProject.splice(i, 1);

            } else {
                alert("Selected project is not defined in tasks.js");
            }           
                      
                 
            clearTasks();
            window.dispatchEvent(needToSaveEvent);
            //printTasks(selectedProject.tasksInProject);


            


        })


    };

}

function clearTasks(){
    while (taskContainer.firstChild) {
        taskContainer.removeChild(taskContainer.firstChild);
    };
    
}

const datum = format(new Date(2024, 3,2), "yyyy-MM-dd");

module.exports = { createTask, printTasks };
