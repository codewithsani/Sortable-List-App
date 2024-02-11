const draggable_List = document.getElementById("draggable-list");
const check = document.getElementById("check");

const richestPeople = [
  "jeff Bezos",
  "Elon Musk",
  "Bernard Arnault",
  "Bill Gates",
  "Mark Zuckerberg",
  "Warren Buffett",
  "Larry Ellison",
  "Larry Paige",
  "Sergey Brin",
  "Pier Omidyar",
];

const listItems = [];

let dragStartIndex;
createList();

function createList() {
  [...richestPeople]
    .map((a) => ({ value: a, sort: Math.random() }))
    .sort((a, b) => a.sort - b.sort)
    .map((a) => a.value)
    .forEach((person, index) => {
      const listItem = document.createElement("li");

      listItem.setAttribute("data-index", index);
      listItem.innerHTML = `
    <span class="number">${
      index + 1
    }</span> <div class="draggable" draggable="true">
    <p class="person-name">${person}</p>
    <i class="fa-solid fa-grip-lines"></i>
  </div>`;

      listItems.push(listItem);
      draggable_List.appendChild(listItem);
    });

  addEventListener();
}

function dragStart() {
  //   console.log("Event:", "dragstart");
  dragStartIndex = +this.closest("li").getAttribute("data-index");
}

function dragEnter() {
  //   console.log("Event:", "dragenter");
  this.classList.add("over");
}
function dragLeave() {
  //   console.log("Event:", "dragleave");
  this.classList.remove("over");
}
function dragOver(e) {
  //   console.log("Event:", "dragover");
  e.preventDefault();
}

function dragDrop() {
  //   console.log("Event:", "drop");
  const dragEndIndex = +this.getAttribute("data-index");
  swapItems(dragStartIndex, dragEndIndex);
  this.classList.remove("over");
}

function swapItems(fromIndex, toIndex) {
  const itemOne = listItems[fromIndex].querySelector(".draggable");
  const itemTwo = listItems[toIndex].querySelector(".draggable");

  listItems[fromIndex].appendChild(itemTwo);
  listItems[toIndex].appendChild(itemOne);
}

function checkOrder() {
  listItems.forEach((listItem, index) => {
    const personName = listItem.querySelector(".draggable").innerText.trim();

    if (personName !== richestPeople[index]) {
      listItem.classList.add("wrong");
    } else {
      listItem.classList.remove("wrong");
      listItem.classList.add("right");
    }
  });
}

function addEventListener() {
  const draggables = document.querySelectorAll(".draggable");
  const dragListItems = document.querySelectorAll(".draggable-list li");

  draggables.forEach((draggable) => {
    draggable.addEventListener("dragstart", dragStart);
  });
  dragListItems.forEach((item) => {
    item.addEventListener("dragover", dragOver);
    item.addEventListener("drop", dragDrop);
    item.addEventListener("dragenter", dragEnter);
    item.addEventListener("dragleave", dragLeave);
  });
}

check.addEventListener("click", checkOrder);
