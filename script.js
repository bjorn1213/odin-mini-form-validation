const images = document.querySelectorAll(".slide-img");
const imgCount = images.length;
let imgIdx = 0;
const controlContainerID = "slide-controls";
const leftClass = "stored-left";
const rightClass = "stored-right";

function getNextIdx(count, idx) {
  let nextIdx = 0;
  if (idx === count - 1) {
    nextIdx = 0;
  } else {
    nextIdx = idx + 1;
  }
  return nextIdx;
}

function getPrevIdx(count, idx) {
  let prevIdx = 0;
  if (idx === 0) {
    prevIdx = count - 1;
  } else {
    prevIdx = idx - 1;
  }
  return prevIdx;
}

function addClass(classList, className) {
  if (!classList.contains(className)) {
    classList.add(className);
  }
}

function removeClass(classList, className) {
  if (classList.contains(className)) {
    classList.remove(className);
  }
}

function activateNode(activateIdx) {
  const prevNode = document.getElementById(`node-btn-${imgIdx}`);
  const newNode = document.getElementById(`node-btn-${activateIdx}`);

  removeClass(prevNode.classList, "active");
  addClass(newNode.classList, "active");
}

function activateImage(activateIdx) {
  if (activateIdx < imgIdx) {
    for (let i = imgIdx; i > activateIdx; i--) {
      const { classList } = images[i];
      addClass(classList, rightClass);
      removeClass(classList, leftClass);
    }
  } else {
    for (let i = imgIdx; i < activateIdx; i++) {
      const { classList } = images[i];
      addClass(classList, leftClass);
      removeClass(classList, rightClass);
    }
  }
  activateNode(activateIdx);

  const { classList } = images[activateIdx];
  removeClass(classList, leftClass);
  removeClass(classList, rightClass);

  imgIdx = activateIdx;
}

function activateNextImage() {
  const nextIdx = getNextIdx(imgCount, imgIdx);
  activateImage(nextIdx);
}

function activatePreviousImage() {
  const nextIdx = getPrevIdx(imgCount, imgIdx);
  activateImage(nextIdx);
}

function initialiseSlideControls() {
  const navButtonClass = "nav-button";
  const nodeButtonClass = "node-button";

  const controlContainer = document.getElementById(controlContainerID);

  // back button
  const backButton = document.createElement("button");
  backButton.textContent = "<";
  backButton.classList.add(navButtonClass);
  backButton.addEventListener("click", activatePreviousImage);
  controlContainer.appendChild(backButton);

  // node buttons
  for (let i = 0; i < imgCount; i++) {
    const nodeButton = document.createElement("button");
    nodeButton.textContent = " ";
    nodeButton.classList.add(nodeButtonClass);
    nodeButton.id = `node-btn-${i}`;
    nodeButton.addEventListener("click", () => activateImage(i));
    controlContainer.appendChild(nodeButton);
  }

  // next button
  const nextButton = document.createElement("button");
  nextButton.textContent = ">";
  nextButton.classList.add(navButtonClass);
  nextButton.addEventListener("click", activateNextImage);
  controlContainer.appendChild(nextButton);

  activateNode(imgIdx);
}

initialiseSlideControls();

setInterval(activateNextImage, 5000);
