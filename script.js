(() => {
  "use strict";

  const menuToggle = document.getElementById("menuToggle");
  const navLinks = document.getElementById("navLinks");
  const orderForm = document.getElementById("orderForm");
  const orderResult = document.getElementById("orderResult");
  const year = document.getElementById("year");

  year.textContent = new Date().getFullYear();

  menuToggle.addEventListener("click", () => {
    const isOpen = navLinks.classList.toggle("open");
    menuToggle.setAttribute("aria-expanded", String(isOpen));
    menuToggle.setAttribute("aria-label", isOpen ? "মেনু বন্ধ করুন" : "মেনু খুলুন");
  });

  navLinks.querySelectorAll("a").forEach((link) => {
    link.addEventListener("click", () => {
      navLinks.classList.remove("open");
      menuToggle.setAttribute("aria-expanded", "false");
    });
  });

  orderForm.addEventListener("submit", (event) => {
    event.preventDefault();

    if (!orderForm.reportValidity()) return;

    const formData = new FormData(orderForm);
    const name = String(formData.get("customerName") || "").trim();
    const contact = String(formData.get("contact") || "").trim();
    const packageName = String(formData.get("package") || "");
    const note = String(formData.get("note") || "").trim();

    // This is a local-only demo. No data is transmitted or saved.
    const demoOrderId = "FR-DEMO-" + Math.random().toString(36).slice(2, 8).toUpperCase();
    const lines = [
      "ডেমো অর্ডার তৈরি হয়েছে (শুধু এই ব্রাউজারে)",
      "ডেমো নম্বর: " + demoOrderId,
      "নাম: " + name,
      "প্যাকেজ: " + packageName,
      contact ? "যোগাযোগ: " + contact : "",
      note ? "নোট: " + note : "",
      "মূল্য: ৳0 (নমুনা)",
      "এটি বাস্তব অর্ডার নয়। কোনো তথ্য সার্ভারে পাঠানো হয়নি।"
    ].filter(Boolean);

    orderResult.replaceChildren();
    const heading = document.createElement("strong");
    heading.textContent = "✓ ডেমো অর্ডার সারাংশ";
    const body = document.createElement("p");
    body.textContent = lines.slice(1).join("\n");
    body.style.margin = "8px 0 0";
    orderResult.append(heading, body);
    orderResult.hidden = false;
    orderResult.scrollIntoView({ behavior: "smooth", block: "nearest" });
  });
})();
