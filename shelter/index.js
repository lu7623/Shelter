//burger-menu

const burger = document.querySelector(".burger");
const burgerNav = document.querySelector(".burger__nav");
const navigation = document.querySelector(".navigation");
const navLinks = document.querySelectorAll(".link");
const burgerOverlay = document.querySelector(".burger__overlay");
const body = document.querySelector("body");

burger.addEventListener("click", function () {
  if (!burger.classList.contains("burger-open")) {
    burger.classList.add("burger-open");
    burgerNav.classList.add("burger__nav-open");
    navigation.classList.add("navigation-open");
    body.classList.add("no-scroll");
    burgerOverlay.classList.add("burger__overlay-open");
  } else {
    burger.classList.remove("burger-open");
    burgerNav.classList.remove("burger__nav-open");
    navigation.classList.remove("navigation-open");
    body.classList.remove("no-scroll");
    burgerOverlay.classList.remove("burger__overlay-open");
  }
});
for (let link of navLinks) {
  link.addEventListener("click", function () {
    burger.classList.remove("burger-open");
    burgerNav.classList.remove("burger__nav-open");
    navigation.classList.remove("navigation-open");
    body.classList.remove("no-scroll");
    burgerOverlay.classList.remove("burger__overlay-open");
  });
}

document.addEventListener("mouseup", function (e) {
  if (e.target.classList.contains("burger__overlay-open")) {
    burger.classList.remove("burger-open");
    burgerNav.classList.remove("burger__nav-open");
    navigation.classList.remove("navigation-open");
    body.classList.remove("no-scroll");
    burgerOverlay.classList.remove("burger__overlay-open");
  }
});
//modal windows

const modal = document.querySelector(".modal");
const modalWindow = document.querySelector(".modal__window");
const modalImg = document.querySelector(".modal__img");
const modalTitle = document.querySelector(".modal__title");
const petType = document.querySelector(".pet-type");
const petBreed = document.querySelector(".pet-breed");
const modalText = document.querySelector(".modal__text");
const petAge = document.querySelector(".pet-age");
const petInoculations = document.querySelector(".pet-inoculations");
const petParasites = document.querySelector(".pet-parasites");
const petDiseases = document.querySelector(".pet-diseases");
const modalBtn = document.querySelector(".modal__btn");
const modalItems = modalWindow.childNodes;

async function getModalWindow(x) {
  const pets = "pets.json";
  const res = await fetch(pets);
  const data = await res.json();
  modalTitle.textContent = data[x].name;
  petType.textContent = data[x].type;
  petBreed.textContent = data[x].breed;
  modalImg.style.backgroundImage = `url(${data[x].img})`;
  petAge.textContent = data[x].age;
  modalText.textContent = data[x].description;
  petInoculations.textContent = data[x].inoculations;
  petParasites.textContent = data[x].parasites;
  petDiseases.textContent = data[x].diseases;
  modal.classList.add("modal_open");
  body.classList.add("no-scroll");
}

modalBtn.addEventListener("click", function () {
  modal.classList.remove("modal_open");
  body.classList.remove("no-scroll");
});

document.addEventListener("mouseup", function (e) {
  if (e.target.classList.contains("modal_open")) {
    modal.classList.remove("modal_open");
    body.classList.remove("no-scroll");
  }
});

// slider

function getRandomArr(length) {
  const randArr = [];
  while (randArr.length < length) {
    let k = Math.floor(Math.random() * 8);
    if (!randArr.includes(k)) {
      randArr.push(k);
    }
  }
  return randArr;
}

async function getCard(parent, x) {
  const pets = "pets.json";
  const res = await fetch(pets);
  const data = await res.json();
  const card = document.createElement("div");
  card.classList.add("card");
  card.classList.add(x);
  const cardImg = document.createElement("div");
  cardImg.classList.add("card__img");
  cardImg.style.backgroundImage = `url(${data[x].img})`;
  const cardTitle = document.createElement("h4");
  cardTitle.classList.add("card__heading");
  cardTitle.textContent = data[x].name;
  const cardBtn = document.createElement("button");
  cardBtn.classList.add("button");
  cardBtn.classList.add("button_secondary");
  cardBtn.textContent = "Learn more";
  card.append(cardImg);
  card.append(cardTitle);
  card.append(cardBtn);
  card.addEventListener("click", function () {
    getModalWindow(x);
  });
  parent.append(card);
}

const sliderItemLeft = document.querySelector(".item-left");
const sliderItemCenter = document.querySelector(".item-center");
const sliderItemRight = document.querySelector(".item-right");
const carousel = document.querySelector(".carousel");
let currArr = getRandomArr(3);

function getDifferentArr(arr) {
  let diffArr = getRandomArr(3);
  for (let j = 0; j < 3; j++) {
    if (arr.includes(diffArr[j])) return getDifferentArr(arr);
  }
  return diffArr;
}

let nextArr = getDifferentArr(currArr);
let prevArr = getDifferentArr(currArr);

currArr.forEach((n) => {
  getCard(sliderItemCenter, n);
});
prevArr.forEach((n) => {
  getCard(sliderItemLeft, n);
});
nextArr.forEach((n) => {
  getCard(sliderItemRight, n);
});
console.log(prevArr, currArr, nextArr);

const leftBtn = document.querySelector(".button-arrow-left");
const rightBtn = document.querySelector(".button-arrow-right");

const moveLeft = () => {
  carousel.classList.add("transition-left");
  leftBtn.removeEventListener("click", moveLeft);
  rightBtn.removeEventListener("click", moveRight);
  console.log(sliderItemLeft.childNodes[1].classList[1]);
};

const moveRight = () => {
  carousel.classList.add("transition-right");
  leftBtn.removeEventListener("click", moveLeft);
  rightBtn.removeEventListener("click", moveRight);
};

leftBtn.addEventListener("click", moveLeft);
rightBtn.addEventListener("click", moveRight);

carousel.addEventListener("animationend", (animationEvent) => {
  let changedItem;
  let changedArr;
  if (animationEvent.animationName === "move-left") {
    carousel.classList.remove("transition-left");
    changedItem = sliderItemLeft;
    changedArr = getDifferentArr(prevArr);
    document.querySelector("#item-active").innerHTML = sliderItemLeft.innerHTML;
    nextArr.splice(0, 3);
    for (let i = 0; i < 3; i++) {
      nextArr.push(currArr[i]);
    }

    currArr.splice(0, 3);
    for (let i = 0; i < 3; i++) {
      currArr.push(prevArr[i]);
      prevArr[i] = changedArr[i];

      sliderItemCenter.childNodes[i].addEventListener("click", function () {
        getModalWindow(sliderItemCenter.childNodes[i].classList[1]);
      });
    }
    console.log(prevArr, currArr, nextArr);
  } else {
    carousel.classList.remove("transition-right");
    changedItem = sliderItemRight;
    changedArr = getDifferentArr(nextArr);
    sliderItemCenter.innerHTML = sliderItemRight.innerHTML;
    prevArr.splice(0, 3);
    for (let i = 0; i < 3; i++) {
      prevArr.push(currArr[i]);
    }

    currArr.splice(0, 3);
    for (let i = 0; i < 3; i++) {
      currArr.push(nextArr[i]);
      nextArr[i] = changedArr[i];

      sliderItemCenter.childNodes[i].addEventListener("click", function () {
        getModalWindow(sliderItemCenter.childNodes[i].classList[1]);
      });
    }
    console.log(prevArr, currArr, nextArr);
  }
  changedItem.replaceChildren();
  for (let i = 0; i < 3; i++) {
    getCard(changedItem, changedArr[i]);
  }

  leftBtn.addEventListener("click", moveLeft);
  rightBtn.addEventListener("click", moveRight);
});
