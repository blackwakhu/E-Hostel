import{hideDivElements,hideUrlDivElements}from"./mymodules.js";let home_btn=document.querySelector(".home"),hostels_btn=document.querySelector(".hostels"),new_hostel_btn=document.querySelector(".new-hostel"),my_account_btn=document.querySelector(".my-account"),home_div=document.querySelector(".home-html"),hostels_div=document.querySelector(".hostels-html"),new_hostel_div=document.querySelector(".new-hostel-html"),my_account_div=document.querySelector(".my-account-html"),divElements=[home_div,hostels_div,new_hostel_div,my_account_div],buttonElements=[home_btn,hostels_btn,new_hostel_btn,my_account_btn],btnObj=new Array;for(let e=0;e<divElements.length;e++)btnObj.push({button:buttonElements[e],div:divElements[e]});document.addEventListener("DOMContentLoaded",(()=>{btnObj.forEach((e=>{null!==e&&e.button.addEventListener("click",(()=>{hideDivElements(e.button,buttonElements,e.div,divElements)}))})),hideUrlDivElements(home_div,divElements)}));