let breadcrumbs = document.querySelector("#page-navbar>*>.breadcrumb").children;

const breadcrumbLinks = [];
let pressedKeys = [];

let numberOfUpArrows = 0;

for (let count = breadcrumbs.length - 1; count >= 0; count--) {
  if (breadcrumbs[count].querySelector("a") != null && breadcrumbs[count].querySelector("a").href != undefined)
    breadcrumbLinks.push(breadcrumbs[count].querySelector("a").href);
}

document.addEventListener("keydown", (event) => {
  if (event.repeat)
    return;
  pressedKeys.push(event.key);
  if (event.key == "ArrowUp")
    numberOfUpArrows++;

  if (pressedKeys.includes("Meta") && pressedKeys.includes("ArrowUp")) {
    // TODO: select the first link in breadcrumbs that doesn't have the same href as the current page
    if (numberOfUpArrows > breadcrumbLinks.length - 1)
      numberOfUpArrows = breadcrumbLinks.length - 1;

    window.location.replace(breadcrumbLinks[numberOfUpArrows]);
  }
});

document.addEventListener("keyup", (event) => {
  if (event.repeat)
    return;
  for (let key of pressedKeys)
    if (event.key == key)
      pressedKeys.splice(pressedKeys.indexOf(key), 1);

  if (event.key == "ArrowUp")
    numberOfUpArrows--;
});