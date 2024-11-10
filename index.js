const btnDropdown = document.getElementById("btn-dropdown");
const dropdownMenu = document.getElementById("dropdown");
const colorTemplate = document.getElementById("color-template");
const colorName = document.getElementById("color-name");
const dropdownItems = document.querySelectorAll("#dropdown a");
const dropdowBtns = document.querySelectorAll("#dropdown .btn");
const getSelected = () => {
  return document.getElementById("selected");
}
const selected = getSelected();

const baseUrl = "https://www.thecolorapi.com";
let colorSchemes = null;

// Get color schemes setter
const getNewColorSchemes = () => {
  const newColorPicker = document.getElementById("color-picker");
  const thisMode = getSelected();
  fetch(`${baseUrl}/scheme?hex=${newColorPicker.value.slice(1)}&mode=${thisMode.innerHTML.toLowerCase()}`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  })
    .then((res) => res.json())
    .then((data) => {
      let templateHTML = '';
      let nameHTML = '';
      colorSchemes = data.colors;
      console.log(colorSchemes)
      colorSchemes.forEach(el => {
        const {hex:{value}} = el;
        templateHTML += `<div class="colors" style="background-color:${value}";></div>`;
        nameHTML += `<div class="names">${value}</div>`;
      })
      colorTemplate.innerHTML = templateHTML;
      colorName.innerHTML = nameHTML;
    });
};
// Dropdown button text setter
const setSelected = (param1) => {
  btnDropdown.innerHTML = `<p>${param1.innerText}</p><i class="bx bx-chevron-down" id="arrow"></i>`;
};
btnDropdown.addEventListener("click", () => {
  dropdownMenu.style.zIndex = "1";
  dropdownItems.forEach((el) => {
    el.style.height = "20px";
  });
});

getNewColorSchemes();
setSelected(selected);

dropdowBtns.forEach(el => {
  el.addEventListener("click", () => {
    console.log(el.innerHTML);
    dropdowBtns.forEach(el => el.id = "");
    el.id = "selected";
    setSelected(el);
    closeDropdown();
  })
});

const closeDropdown = () => {
  dropdownMenu.style.zIndex = "-1";
  dropdownItems.forEach((el) => {
    el.style.height = "0px";
  });
}

document.getElementById("get-color-scheme").addEventListener("click",() => {
  getNewColorSchemes();
})