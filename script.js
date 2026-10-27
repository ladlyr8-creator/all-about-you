const pages = document.querySelectorAll(".page");
const surpriseBtn = document.getElementById("surpriseBtn");
const surpriseMessage = document.getElementById("surpriseMessage");

// Show the surprise on page 1
surpriseBtn.addEventListener("click", () => {
  surpriseMessage.hidden = false;
  surpriseBtn.hidden = true;

  surpriseMessage.scrollIntoView({
    behavior: "smooth",
    block: "center"
  });
});

// Navigate between the five pages
function showPage(pageNumber) {
  // Stop any playing videos or music on the current page
  document.querySelectorAll(".page video, .page audio").forEach((media) => {
    media.pause();
  });

  pages.forEach((page) => {
    page.classList.remove("active");
  });

  const targetPage = document.getElementById(`page${pageNumber}`);

  if (!targetPage) return;

  targetPage.classList.add("active");

  window.scrollTo({
    top: 0,
    behavior: "smooth"
  });
}

// All next and back buttons
document.querySelectorAll("[data-next]").forEach((button) => {
  button.addEventListener("click", () => {
    const nextPage = Number(button.dataset.next);
    showPage(nextPage);
  });
});

// Replay the website from the beginning
document.getElementById("replayBtn").addEventListener("click", () => {
  surpriseMessage.hidden = true;
  surpriseBtn.hidden = false;
  showPage(1);
});

// Pause videos and music when leaving their page
document.querySelectorAll(".page").forEach((page) => {
  page.addEventListener("transitionend", () => {
    if (!page.classList.contains("active")) {
      page.querySelectorAll("video, audio").forEach((media) => {
        media.pause();
      });
    }
  });
});