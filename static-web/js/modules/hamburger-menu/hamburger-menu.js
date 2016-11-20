define(function (require, exports, module) {
    'use strict';
   return function(node){
       var leftsidebar=document.querySelector(".left-sidebar-CTR");
       node.addEventListener("click",function(){
           leftsidebar.classList.toggle("opened");
       })
   }
});