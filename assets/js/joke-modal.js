const jokeModal = document.querySelector(".modal-joke");
const jokeModalOverlay = document.querySelector(".joke-overlay");
const btnCloseModalJoke = document.querySelector(".close-joke-modal");
const btnOpenModalJoke = document.querySelector(".open-joke-btn");

const openModalJoke = function (event) {
  event.preventDefault();
  jokeModal.classList.remove("hidden");
  jokeModalOverlay.classList.remove("hidden");
  document.body.style.overflow = "hidden";
};

const closeModalJoke = function (e) {
  if (!e.target.classList.contains("joke")) {
    jokeModal.classList.add("hidden");
    jokeModalOverlay.classList.add("hidden");
    document.body.style.overflow = "";
  }
};

btnOpenModalJoke.addEventListener("click", openModalJoke);

btnCloseModal.addEventListener("click", closeModalJoke);

jokeModalOverlay.addEventListener("click", closeModalJoke);

document.addEventListener("keydown", function (e) {
  if (e.key === "Escape" && !jokeModal.classList.contains("hidden")) {
    closeModalJoke();
  }
});
