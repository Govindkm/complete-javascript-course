'use strict';

let btns = document.querySelectorAll(".show-modal");

let modal = document.querySelector(".modal");
let overlay = document.querySelector(".overlay");
let isHidden = false;

btns.forEach(element => {
    element.addEventListener('click', ()=>{
        if(!isHidden)
            addOverlay();
    })
});

overlay.addEventListener('click', ()=>{
    if(isHidden){
        removeOverlay();
    }
})

document.querySelector(".close-modal").addEventListener('click', ()=>{
    if(isHidden){
        removeOverlay();
    }
})

function addOverlay(){
    modal.classList.remove('hidden');
    overlay.classList.remove("hidden");
    isHidden = true;
}

function removeOverlay(){
    modal.classList.add('hidden');
    overlay.classList.add("hidden");
    isHidden = false;
}

document.addEventListener('keydown', (event)=>{
    if(event.key==='Escape' && isHidden){
        removeOverlay();
    }
})