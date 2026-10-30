// Dark mode: remembers the choice, falls back to the system setting
const root = document.documentElement;
const themeBtn = document.getElementById("themeBtn");

function applyTheme(theme) {
  root.setAttribute("data-theme", theme);
  themeBtn.textContent = theme === "dark" ? "Light mode" : "Dark mode";
  themeBtn.setAttribute("aria-label", theme === "dark" ? "Switch to light mode" : "Switch to dark mode");
}

let saved = null;
try { saved = localStorage.getItem("theme"); } catch (e) {}
const systemDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
applyTheme(saved || (systemDark ? "dark" : "light"));

themeBtn.addEventListener("click", () => {
  const next = root.getAttribute("data-theme") === "dark" ? "light" : "dark";
  applyTheme(next);
  try { localStorage.setItem("theme", next); } catch (e) {}
});

// Mobile menu
const menuBtn = document.getElementById("menuBtn");
const navLinks = document.getElementById("navLinks");
menuBtn.addEventListener("click", () => {
  const open = navLinks.classList.toggle("open");
  menuBtn.setAttribute("aria-expanded", String(open));
});
navLinks.addEventListener("click", (e) => {
  if (e.target.tagName === "A") {
    navLinks.classList.remove("open");
    menuBtn.setAttribute("aria-expanded", "false");
  }
});

// Contact form: validate, then open the visitor's email app with the message filled in
const form = document.getElementById("contactForm");
const status = document.getElementById("formStatus");
const MY_EMAIL = "vanshagarwal2121@gmail.com";
// Optional: paste a Formspree URL here (https://formspree.io/f/xxxx) to receive messages without opening an email app
const FORM_ENDPOINT = "";

function setError(id, text) {
  document.getElementById(id).textContent = text;
}

form.addEventListener("submit", (e) => {
  e.preventDefault();
  const name = form.name.value.trim();
  const email = form.email.value.trim();
  const message = form.message.value.trim();
  let ok = true;

  setError("nameErr", ""); setError("emailErr", ""); setError("messageErr", ""); status.textContent = "";

  if (name.length < 2) { setError("nameErr", "Enter your name."); ok = false; }
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) { setError("emailErr", "Enter a valid email address, like name@example.com."); ok = false; }
  if (message.length < 10) { setError("messageErr", "Write a message of at least 10 characters."); ok = false; }
  if (!ok) return;

  if (FORM_ENDPOINT) {
    status.textContent = "Sending...";
    fetch(FORM_ENDPOINT, {
      method: "POST",
      headers: { "Content-Type": "application/json", "Accept": "application/json" },
      body: JSON.stringify({ name: name, email: email, message: message })
    })
      .then((res) => {
        if (!res.ok) throw new Error("failed");
        status.textContent = "Message sent. Thank you, I will reply soon.";
        form.reset();
      })
      .catch(() => {
        status.textContent = "The message could not be sent. Email me directly at " + MY_EMAIL + ".";
      });
    return;
  }

  const subject = encodeURIComponent("Portfolio message from " + name);
  const body = encodeURIComponent(message + "\n\nFrom: " + name + " (" + email + ")");
  window.location.href = "mailto:" + MY_EMAIL + "?subject=" + subject + "&body=" + body;
  status.textContent = "Opening your email app. Press send there to deliver the message.";
  form.reset();
});

// Highlight the nav link of the section being viewed
const sections = document.querySelectorAll("main section[id]");
if ("IntersectionObserver" in window) {
  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (!entry.isIntersecting) return;
      navLinks.querySelectorAll("a").forEach((a) => a.removeAttribute("aria-current"));
      const link = navLinks.querySelector('a[href="#' + entry.target.id + '"]');
      if (link) link.setAttribute("aria-current", "true");
    });
  }, { rootMargin: "-40% 0px -55% 0px" });
  sections.forEach((s) => observer.observe(s));
}

document.getElementById("year").textContent = new Date().getFullYear();