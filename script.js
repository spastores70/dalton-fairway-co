const menuButton = document.querySelector(".menu-button");
const navigation = document.querySelector(".nav");

menuButton?.addEventListener("click", () => {
  const isOpen = navigation.classList.toggle("open");
  menuButton.setAttribute("aria-expanded", String(isOpen));
});

navigation?.querySelectorAll("a").forEach((link) => {
  link.addEventListener("click", () => {
    navigation.classList.remove("open");
    menuButton?.setAttribute("aria-expanded", "false");
  });
});

const newsletterForm = document.querySelector("#newsletter-form");
const formMessage = document.querySelector(".form-message");

newsletterForm?.addEventListener("submit", (event) => {
  event.preventDefault();
  formMessage.textContent = "You’re on the list. See you before the weekend.";
  newsletterForm.reset();
});
