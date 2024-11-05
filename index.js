const btnDropdown = document.getElementById("btn-dropdown");
const dropdownMenu = document.getElementById("dropdown");
const dropdownItems = document.querySelectorAll("#dropdown a");
const baseUrl = "https://www.thecolorapi.com";
let colorSchemes = null;
// Get color schemes setter
const getNewColorSchemeS = () => {
  fetch(`${baseUrl}/scheme?hex=000000`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  })
    .then((res) => res.json())
    .then((data) => {
      colorSchemes = data.colors;
    });
};
// Dropdown button text setter
const setSelected = () => {
  const selected = document.getElementById("selected");
  btnDropdown.innerHTML = `<p>${selected.innerText}</p><i class="bx bx-chevron-down" id="arrow"></i>`;
};
btnDropdown.addEventListener("click", () => {
  dropdownMenu.style.height = "auto";
  dropdownItems.forEach((el) => {
    el.style.position = "relative";
  });
});
getNewColorSchemeS();
setSelected();