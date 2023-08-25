const formPopup = document.querySelector(".form-popup");
const formPopupOverlay = document.querySelector(".form-popup-overlay");
const btnCloseFormPopup = document.querySelector(".close-form-popup");
const btnSubmitFormPopup = document.querySelector(".form-popup-back-btn");

const openConfirmationPopup = function (event) {
  event?.preventDefault();
  formPopupOverlay.classList.remove("hidden");
  document.body.style.overflow = "hidden";
};

const closeConfirmationPopup = function (e) {
  if (!e.target.classList.contains("popup")) {
    formPopupOverlay.classList.add("hidden");
    document.body.style.overflow = "";
    removeAllPopupListeners();
    location.reload();
  }
};

const removeAllPopupListeners = () => {
  btnCloseFormPopup.removeEventListener("click", closeConfirmationPopup);
  btnSubmitFormPopup.removeEventListener("click", closeConfirmationPopup);
  formPopupOverlay.removeEventListener("click", closeConfirmationPopup);
};

btnCloseFormPopup.addEventListener("click", closeConfirmationPopup);
btnSubmitFormPopup.addEventListener("click", closeConfirmationPopup);
formPopupOverlay.addEventListener("click", closeConfirmationPopup);
