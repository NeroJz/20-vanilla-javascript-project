const draggable_list = document.getElementById("draggable-list");
const check = document.getElementById("check");

const richestPeople = [
  "Jeff Bezos",
  "Bill Gates",
  "Warren Buffett",
  "Bernard Arnault",
  "Carlos Slim Helu",
  "Amancio Ortega",
  "Larry Ellison",
  "Mark Zuckerberg",
  "Michael Bloomberg",
  "Larry Page",
];

// Store listitems
const listItems = [];

let dragStartIndex;

createList();

// Insert list items into DOM
function createList() {
  [...richestPeople]
    .map((a) => ({ value: a, sort: Math.random() }))
    .sort((a, b) => a.sort - b.sort)
    .map((a) => a.value)
    .forEach((person, index) => {
      const listItem = document.createElement("li");

      listItem.setAttribute("data-index", index);

      listItem.innerHTML = `
            <span class="number">${index + 1}</span>
            <div class="draggable" draggable="true">
                <p class="person-name">${person}</p>
                <i class="fas fa-grip-lines"></i>
            </div>
        `;

      listItems.push(listItem);

      draggable_list.appendChild(listItem);
    });

  addEventListener();
}

function dragStart() {
  //   console.log("Event: ", "drag start");
  dragStartIndex = +this.closest("li").getAttribute("data-index");
}

function dragOver(e) {
  //   console.log("Event: ", "drag over");
  e.preventDefault();
}

function dragDrop() {
  //   console.log("Event: ", "drag drop");
  const dragEndIndex = this.getAttribute("data-index");
  swapItems(dragStartIndex, dragEndIndex);

  this.classList.remove("over");
}

function swapItems(from, to) {
  const itemOne = listItems[from].querySelector(".draggable");
  const itemTwo = listItems[to].querySelector(".draggable");

  listItems[from].appendChild(itemTwo);
  listItems[to].appendChild(itemOne);
}

function dragEnter() {
  //   console.log("Event: ", "drag enter");
  this.classList.add("over");
}

function dragLeave() {
  //   console.log("Event: ", "drag leave");
  this.classList.remove("over");
}

function addEventListener() {
  const draggables = document.querySelectorAll(".draggable");
  const dragListItem = document.querySelectorAll(".draggable-list li");

  draggables.forEach((draggable) => {
    draggable.addEventListener("dragstart", dragStart);
  });

  dragListItem.forEach((item) => {
    item.addEventListener("dragover", dragOver);
    item.addEventListener("drop", dragDrop);
    item.addEventListener("dragenter", dragEnter);
    item.addEventListener("dragleave", dragLeave);
  });
}
