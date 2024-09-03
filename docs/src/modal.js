const { createTask, printTasks } = require("./tasks.js");


function createModal(){

    // Get the modal
    const modal = document.getElementById("taskModal");

    //variable to hold the latest selected task div.
    let selectedTask;

    // Get the <span> element that closes the modal
    const span = document.getElementsByClassName("close")[0];

    // When the user clicks on <span> (x), close the modal
    span.onclick = function() {
    modal.style.display = "none";
    } 

    // When the user clicks anywhere outside of the modal, close it
    window.onclick = function(event) {
    if (event.target == modal) {
      modal.style.display = "none";
    }
    }    
    
    //Defines the html elements within the modal box.
    const modalTaskP = document.querySelector("#taskNameP");
    const taskDescriptionP = document.querySelector("#taskDescriptionP");  
    const saveButton = document.querySelector("#saveButton");
    const notesInputBox = document.querySelector("#notesInputBox");

    //Event listener to save the updated information on the task.
    saveButton.addEventListener("click", () => {
        if (!selectedTask) {
            return;
        }
        selectedTask.title = modalTaskP.value;
        selectedTask.description = taskDescriptionP.value;
        selectedTask.notes = notesInputBox.value;

    });




    return {
        modalObj: modal,
        spanObj: span,
        setTaskTitle: function(text){
            modalTaskP.value = text;
        },
        setTaskDescription: function(descText){
            taskDescriptionP.value = descText;
        },
        setTaskNotes: function(notesText){
            notesInputBox.value = notesText;
        },
        setModalActivator: function(activatorElement){
            activatorElement.addEventListener("click", () => {
                modal.style.display = "block";
            })
        },
        receiveSelectedTask: function(latestTask){
            console.log("Receiving task:", latestTask)
            selectedTask = latestTask;
            return selectedTask;
        }
    };
  }


    





module.exports = {createModal};
