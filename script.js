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
    if (phoneMenuButton.contains(e.target)){
        if(phoneMenuDiv.style.display === "none"){
            phoneMenuDiv.style.display = "flex";
        } else{
            phoneMenuDiv.style.display = "none";
        }
        
    };
});

//Scroll detection. När man scrollat ner med telefonen ner till "information", så blir navbaren inte längre osynlig
const navDiv = document.querySelector("#navDiv");
const summaryHeaderDiv = document.querySelector("#summaryHeaderDiv");

document.addEventListener("scroll", ()=>{
    const sectionTop = summaryHeaderDiv.offsetTop;
    if(window.scrollY >= sectionTop){
        navDiv.classList.add("scrolled");
    } else{
        navDiv.classList.remove("scrolled");
    }
})
