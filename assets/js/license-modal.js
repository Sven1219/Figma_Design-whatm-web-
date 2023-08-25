const btnsOpenLicenceModal = document.querySelector(".licence_container__btn");
const licenceModal = document.querySelector(".licence-modal");
const licenceModalOverlay = document.querySelector(".licence-overlay");
const btnCloseModallicence = document.querySelector(".close-licence-modal");
const windowHeight = window.innerHeight;

window.onresize = function () {
  const currentWindowHeight = window.innerHeight;
  if (currentWindowHeight > windowHeight) {
    btnCloseModallicence.classList.add("close-licence-modal-position");
  } else {
    btnCloseModallicence.classList.remove("close-licence-modal-position");
  }
};

const openLicenseModal = function (event) {
  event.preventDefault();
  licenceModalOverlay.classList.remove("hidden");
  document.body.style.overflow = "hidden";
};

const closeLicenseModal = function (e) {
  if (!e.target.classList.contains("licence")) {
    licenceModalOverlay.classList.add("hidden");
    document.body.style.overflow = "";
  }
};

btnsOpenLicenceModal.addEventListener("click", openLicenseModal);

licenceModalOverlay.addEventListener("click", closeLicenseModal);

btnCloseModallicence.addEventListener("click", closeLicenseModal);

document.addEventListener("keydown", function (e) {
  if (e.key === "Escape" && !licenceModalOverlay.classList.contains("hidden")) {
    closeLicenseModal();
  }
});
