let phoneMenuButton;
let phoneMenuDiv;
const navDiv = document.querySelector("#navDiv");


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
            navDiv.style.backgroundColor = "#f1f5f9";
        } else{
            phoneMenuDiv.style.display = "none";
            navDiv.style.backgroundColor = "transparent";
        }
        
    };
});

//Scroll detection. När man scrollat ner med telefonen ner till "information", så blir navbaren inte längre osynlig

const summaryHeaderDiv = document.querySelector("#summaryHeaderDiv");

document.addEventListener("scroll", ()=>{
    const sectionTop = summaryHeaderDiv.offsetTop;
    if(window.scrollY >= sectionTop){
        navDiv.classList.add("scrolled");
    } else{
        navDiv.classList.remove("scrolled");
    }
})
