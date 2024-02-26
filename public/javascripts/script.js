function donoOffKaro(){
 document.querySelectorAll("#files form")
    .forEach(function(frm){
      frm.style.display = "none";
 })
}

document.querySelector("#files").addEventListener("click",function(dets){
  console.log(dets)
  if(dets.target.id === "edit"){
    var val = dets.srcElement.parentElement.parentElement.textContent.trim();
    document.querySelector("#inp").value = val;
    document.querySelector("#popup").style.display ="flex";
    document.querySelector("#popupcard form").action =`/updatename/${val}`;
  }
})

document.querySelector("#fileicon")
  .addEventListener("click", function(){
    donoOffKaro();
    document.querySelector("#fileform").style.display = "block";
});

document.querySelector("#foldericon")
  .addEventListener("click", function(){
    donoOffKaro();
    document.querySelector("#folderform").style.display = "block";
});

var flag3=1;
document.querySelector("#file").addEventListener("click",function(){
  if(flag3==1)
  {       
    document.querySelector("#left").style.opacity=0;
    flag3=0
  }        
  else{
    document.querySelector("#left").style.opacity=1;
    flag3=1;
  }
})