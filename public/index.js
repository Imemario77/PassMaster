function openPanel() {
   const openPanel = document.getElementsByClassName("action-selector-holder");
   const passwordPanel = document.querySelector(".Create_Entry_Form_Holder");

   passwordPanel.style.display = "block";
}
function closePanel() {
   document.querySelector(".Create_Entry_Form_Holder").style.display = "none";
}
