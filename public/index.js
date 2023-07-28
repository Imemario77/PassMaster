function openPanel() {
   const openPanel = document.getElementsByClassName("action-selector-holder");
   const passwordPanel = document.querySelector(".Create_Entry_Form_Holder");

   passwordPanel.style.display = "block";
}
function closePanel() {
   document.querySelector(".Create_Entry_Form_Holder").style.display = "none";
   document.querySelector(".openGeneratePass").style.display = "none";
   document.querySelector(".copyGenPass").style.display = "none";
}

const clickSubmitPassId = document.querySelectorAll(".main_passwd_holder");
for (let i = 0; i < clickSubmitPassId.length; i++) {
   clickSubmitPassId[i].addEventListener("click", () => {
      const submitPassId = document.querySelectorAll(".submit-form-data");
      submitPassId[i].submit();
   });
}
function openGeneratePass() {
   document.querySelector(".openGeneratePass").style.display = "flex";
}

function generatePass() {
   var passData = document.querySelectorAll(".generatePass");
   if (passData[0].value > 40) {
      passData[0].value = 40;
   }
   const data = {
      passLength: passData[0].value,
      hasSpecialChars: passData[1].checked,
      hasUppercaseChars: passData[2].checked,
      hasLowercaseChars: passData[3].checked,
      hasNumberChars: passData[4].checked,
   };

   fetch("/generate/password", {
      method: "POST",
      headers: {
         "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
   })
      .then((response) => response.json())
      .then((responseData) => {
         document.querySelector(".openGeneratePass").style.display = "none";
         document.querySelector(".copyGenPass").style.display = "flex";
         const displayGenPass = document.querySelector(".copyGenPassSpan");
         displayGenPass.innerHTML = responseData.password;
         console.log(responseData.password);
      })
      .catch((error) => {
         document.querySelector(".openGeneratePass").style.display = "none";
         console.error(error);
      });
}

function searchRoute() {
   const searchRoute = document.querySelector(".searchRoute");
   fetch(`/search/${searchRoute.value}/${searchRoute.name}`, {
      method: "POST",
      headers: {
         "Content-Type": "application/json",
      },
   })
      .then((response) => response.json())
      .then((responseData) => alert(responseData.name));
}
