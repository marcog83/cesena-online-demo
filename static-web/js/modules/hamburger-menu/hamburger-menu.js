define(function (require, exports, module) {
    'use strict';
   return function(node){
       var leftsidebar=document.querySelector(".left-sidebar-CTR");
       var fadeLayer=document.querySelector(".fade-left-sidebar");
       node.addEventListener("click",function(){
           fadeLayer.classList.toggle("hidden");
           leftsidebar.classList.toggle("opened");
           document.body.classList.toggle("overflow-hidden");
       });
       fadeLayer.addEventListener("click",function(){
           fadeLayer.classList.add("hidden");
           leftsidebar.classList.remove("opened");
           document.body.classList.remove("overflow-hidden");
       })
   }
});