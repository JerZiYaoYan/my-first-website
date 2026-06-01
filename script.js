const showreelButton = document.querySelector(".showreel-button");
const showreelModal = document.querySelector(".showreel-modal");
const showreelClose = document.querySelector(".showreel-close");
const showreelFrame = document.querySelector(".showreel-frame");

const youtubeUrl = "https://www.youtube.com/embed/ukjgSUlNkuw?autoplay=1";

function openShowreel() {
  showreelModal.classList.add("is-open");
  showreelFrame.src = youtubeUrl;
  document.body.style.overflow = "hidden";
}

function closeShowreel() {
  showreelModal.classList.remove("is-open");
  showreelFrame.src = "";
  document.body.style.overflow = "";
}

showreelButton.addEventListener("click", function (event) {
  event.preventDefault();
  openShowreel();
});

showreelClose.addEventListener("click", closeShowreel);

showreelModal.addEventListener("click", function (event) {
  if (event.target === showreelModal) {
    closeShowreel();
  }
});

document.addEventListener("keydown", function (event) {
  if (event.key === "Escape") {
    closeShowreel();
  }
});