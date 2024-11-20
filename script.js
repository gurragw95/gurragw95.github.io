let phoneMenuButton;
let phoneMenuDiv;
//Navbaren
const navDiv = document.querySelector("#navDiv");
//Menyraderna med länkar
const navLinks = document.querySelectorAll(".navLinks");


//######### TELEFONSPECIFIKT ##################

//Button to open the menu on the phone
phoneMenuButton = document.querySelector("#phoneMenuButtonDiv");
//Div that contains divs with links to the other pages.
phoneMenuDiv = document.querySelector("#phoneMenuDiv");
//Event listeners
document.addEventListener("click", (e)=>{
    //Menyn för telefoner. Om menyn är i visat läge, så stängs den, om tvärt om så öppnas den.
    //"Scrolled" är en CSS-klass där den grå färgen används som bakgrund
    if (phoneMenuButton.contains(e.target)){
        if(phoneMenuDiv.style.display === "none"){
            phoneMenuDiv.style.display = "flex";
            navDiv.classList.add("scrolled");
        } else{
            phoneMenuDiv.style.display = "none";
            navDiv.classList.remove("scrolled");
        }
        
    }
    
});

//Scroll detection. När man scrollat ner med telefonen ner till "information", så blir navbaren inte längre osynlig
const summaryHeaderDiv = document.querySelector("#summaryHeaderDiv");

document.addEventListener("scroll", ()=>{
    const sectionTop = summaryHeaderDiv.offsetTop;
    if(window.scrollY >= sectionTop){
        navDiv.classList.add("scrolled");
    }else if(window.scrollY < sectionTop && phoneMenuDiv.style.display === "flex"){
        navDiv.classList.remove("scrolled");
        phoneMenuDiv.style.display = "none";
    }
    else{
        phoneMenuDiv.style.display = "none";
        navDiv.classList.remove("scrolled");     
     
    }
});

//Gör att menyn försvinner efter man klickat på en länk. FUNKAR INTE!
for(let element of navLinks){
    element.addEventListener("click", ()=>{
        phoneMenuDiv.style.display = "none";
    });
};





