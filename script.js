let phoneMenuButton;
let phoneMenuDiv;


//######### TELEFONSPECIFIKT ##################

//Button to open the menu on the phone
phoneMenuButton = document.querySelector("#phoneMenuButtonDiv");
//Div that contains divs with links to the other pages.
phoneMenuDiv = document.querySelector("#phoneMenuDiv");
//Event listeners
document.addEventListener("click", (e)=>{
    //Menyn för telefoner. Om menyn är i visat läge, så stängs den, om tvärt om så öppnas den.
    if (e.target === phoneMenuButton){
        if(phoneMenuDiv.style.display === "none"){
            phoneMenuDiv.style.display = "flex";
        } else{
            phoneMenuDiv.style.display = "none";
        }
        
    };
});
