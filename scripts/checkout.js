let input_check = document.getElementById("input_check");
let divInformation__container = document.getElementById(
  "information__container",
);

input_check.addEventListener("change", function () {
  if (input_check.checked) {
    divInformation__container.classList.add("actived");
  } else {
    divInformation__container.classList.remove("actived");
  }
});
