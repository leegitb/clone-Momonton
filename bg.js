const body = document.querySelector("body");

const IMG_NUMBER = 6;

// function handleImgLoad() {
//   console.log("fin");
// }

function paintImage(imgNumber) {
  const image = new Image();
  image.src = `bgImage/bg${imgNumber + 1}.jpg`;
  image.classList.add("bgImage");

  //   body.appendChild(image);
  body.prepend(image);

  //   image.addEventListener("loadend", handleImgLoad); // api에서 불러온다면 필요할 load event
}

function genRandom() {
  const number = Math.floor(Math.random() * IMG_NUMBER);
  return number;
}

function init() {
  const randomNumber = genRandom();
  paintImage(randomNumber);
}
init();
