const menuButton = document.getElementById("menuButton");
const mainNav = document.getElementById("mainNav");

if (menuButton && mainNav) {
  menuButton.addEventListener("click", () => {
    const isOpen = mainNav.classList.toggle("open");

    menuButton.setAttribute(
      "aria-expanded",
      isOpen ? "true" : "false"
    );
  });

  mainNav.querySelectorAll("a").forEach((link) => {
    link.addEventListener("click", () => {
      mainNav.classList.remove("open");
      menuButton.setAttribute("aria-expanded", "false");
    });
  });
}


const copyButton = document.getElementById("copyContract");
const contractAddress = document.getElementById("contractAddress");

if (copyButton && contractAddress) {
  copyButton.addEventListener("click", async () => {
    const address = contractAddress.textContent.trim();

    try {
      await navigator.clipboard.writeText(address);

      const originalText = copyButton.textContent;

      copyButton.textContent = "Copied";

      setTimeout(() => {
        copyButton.textContent = originalText;
      }, 1500);

    } catch {
      copyButton.textContent = "Copy failed";

      setTimeout(() => {
        copyButton.textContent = "Copy";
      }, 1500);
    }
  });
}