// get localStorage item
let mainColors = localStorage.getItem("color_option");

// random background option
let backgroundOption = true;

// variable to control background Interval
let backgroundInterval;

// check if the localStorage isn't null
if (mainColors !== null) {
  // console.log("the local storage isn't null now you can set it on the root");
  // console.log(localStorage.getItem("color_option"));

  // set the main color in the local storage
  document.documentElement.style.setProperty("--main-color", mainColors);

  //  get list of all lis and loop on them
  document.querySelectorAll(".color-box .color-list li").forEach((Element) => {
    // remove active class from all color list item
    Element.classList.remove("active");

    // check if the main in the data set === the main color in the local storage
    if (Element.dataset.color === mainColors) {
      console.log(
        "the main color is equal the main color in the local storage"
      );

      // add active class to the element
      Element.classList.add("active");
    }
  });
}

// click on the icon gear
document.querySelector(".toggle-settings").onclick = function () {
  // toggle the class fa spin on the icon gear
  document
    .querySelector(".toggle-settings .fa-cog")
    .classList.toggle("fa-spin");
  // toggle the open on the box
  document.querySelector(".settings-box").classList.toggle("open");
};

// start switch colors  ===>
let colorLi = document.querySelectorAll(".color-list li");

// loop on all Lis
colorLi.forEach((li) => {
  // click on li
  li.addEventListener("click", (e) => {
    // set color on the root/
    document.documentElement.style.setProperty(
      "--main-color",
      e.target.dataset.color
    );
    // set color in the local storage
    localStorage.setItem("color_option", e.target.dataset.color);

    // remove class active from all children
    toggleActiveClass(e);
  });
});
// end switch colors  ===>

// start random background box

// toggle active class on the span element
let randomBackgroundElement = document.querySelectorAll(
  ".background-option span"
);
randomBackgroundElement.forEach((span) => {
  // click on span
  span.addEventListener("click", (e) => {
    toggleActiveClass(e);

    if (e.target.dataset.background === "yes") {
      backgroundOption = true;
      randomizeBackgroundImgs();

      // set the local storage
      localStorage.setItem("background_option", true);
    } else {
      backgroundOption = false;
      clearInterval(backgroundInterval);

      // set the local storage
      localStorage.setItem("background_option", false);
    }
  });
});
// end random background box

// start save the background option in the local storage

// get local storage od background option
let backgroundLocalStorage = localStorage.getItem("background_option");

// check if the background local storage not empty
if (backgroundLocalStorage !== null) {
  if (backgroundLocalStorage === "true") {
    backgroundOption = true;
  } else {
    backgroundOption = false;
  }

  //
  document.querySelectorAll(".background-option span").forEach((span) => {
    span.classList.remove("active");
  });
  if (backgroundLocalStorage === "true") {
    document.querySelector(".background-option .yes").classList.add("active");
  } else {
    document.querySelector(".background-option .no").classList.add("active");
  }
  console.log(backgroundLocalStorage);
}
// end save the background option in the local storage


// start pick what bg you want to be

// get the element
let bgImage = document.querySelectorAll(".images-option li img");

// get landing page
let landingBackground = document.querySelector(".landing-page");

// add click on the element

bgImage.forEach((img) => {
  img.addEventListener("click", (e) => {
    // change the bg of the landing page/
    landingBackground.style.backgroundImage =
      'url("/imgs/' + e.target.dataset.image + '")';
  });
});
// end pick what bg you want to be

// start random background for the landing page

// select  landing page element
let landing = document.querySelector(".landing-page");

// get array of images
let imgsArray = ["bg-01.jpg", "bg-02.jpg", "bg-03.jpg", "bg-04.jpg"];

// function to randomize background images
function randomizeBackgroundImgs() {
  if (backgroundOption === true) {
    backgroundInterval = setInterval(() => {
      // get random number
      let randomNumber = Math.floor(Math.random() * imgsArray.length);

      //change landing page background url
      landing.style.backgroundImage =
        'url("/imgs/' + imgsArray[randomNumber] + '")';
    }, 1000);
  }
}
randomizeBackgroundImgs();

// end random background for the landing page

// start animate skills boxes

// select skills section element
let skillSection = document.querySelector(".skills-section");

window.onscroll = function () {
  //   get skills offset top
  let skillOffsetTop = skillSection.offsetTop;

  // get skills outerHeight
  let skillsOurHeight = skillSection.offsetHeight;

  // get window innerHeight
  let windowHeight = this.innerHeight;

  // get window scrollTop
  let windowScrollTop = this.pageYOffset;

  if (windowScrollTop >= skillOffsetTop + skillsOurHeight - windowHeight) {
    let allSkills = document.querySelectorAll(
      ".skill-box .skills-progress span"
    );
    allSkills.forEach((span) => {
      span.style.width = span.dataset.progress;
    });
  }
};
// end animate skills boxes

// start add popup to the pictures
let gallery = document.querySelectorAll(".gallery-section img");
gallery.forEach((img) => {
  img.addEventListener("click", (e) => {
    // create overlay div
    let overlay = document.createElement("div");
    // give the overlay class popup-overlay
    overlay.className = "popup-overlay";
    // append overlay to the body
    document.body.appendChild(overlay);

    // create popup box
    let popupBox = document.createElement("div");
    // give the popup box a class named popup-box
    popupBox.className = "popup-box";

    if (img.src != null) {
      // creat heading for the image
      let imageHeading = document.createElement("h3");

      // give the heading class
      imageHeading.className = "heading-popup title";
      // creat text for the heading element
      textHeading = document.createTextNode(img.alt);

      // add text to the image heading
      imageHeading.appendChild(textHeading);

      // append the heading to the popupBox
      popupBox.appendChild(imageHeading);
    }
    // create an image element
    let image = document.createElement("img");
    // set source for the image
    image.src = img.src;
    // append the image to the popup box
    popupBox.appendChild(image);

    // append the popup box to the body
    document.body.appendChild(popupBox);

    // creat a close span element
    let closeBtn = document.createElement("span");

    // creat text for the span
    let closeIcon = document.createTextNode("X");

    // append the text to the btn
    closeBtn.appendChild(closeIcon);

    closeBtn.className = "popup-close-btn";

    popupBox.appendChild(closeBtn);
  });
});
// end add popup to the pictures

// start close the popup box
document.addEventListener("click", function (e) {
  if (e.target.className == "popup-close-btn") {
    e.target.parentNode.remove();
    document.querySelector(".popup-overlay").remove();
  }
});
// end close the popup box

// select all nav lists
const navLists = document.querySelectorAll(
  ".landing-page .header-area .list li a"
);
// select all nav bullets
const navBullets = document.querySelectorAll(".nav-bullets .bullet");
goToSection(navLists);
goToSection(navBullets);

// start bullet option
let bulletOptionButtons = document.querySelectorAll(".bullet-option span");
let bulletList = document.querySelector(".nav-bullets");
let bulletsLocalStorage = localStorage.getItem("bullets_option");
if (bulletsLocalStorage !== null) {
  bulletOptionButtons.forEach((button) => {
    button.classList.remove("active");
  });
  if (bulletsLocalStorage === "block") {
    bulletList.style.display = "block";
    document.querySelector(".bullet-option .yes").classList.add("active");
  } else {
    bulletList.style.display = "none";
    document.querySelector(".bullet-option .no").classList.add("active");
  }
}

bulletOptionButtons.forEach((button) => {
  button.addEventListener("click", (e) => {
    toggleActiveClass(e);

    if (button.dataset.display === "block") {
      bulletList.style.display = "block";
      localStorage.setItem("bullets_option", "block");
    } else {
      bulletList.style.display = "none";
      localStorage.setItem("bullets_option", "none");
    }
  });
});

// end bullet option

// start rest button
document.querySelector(".rest-options-button").onclick = function () {
  localStorage.removeItem("bullets_option");
  localStorage.removeItem("background_option");
  localStorage.removeItem("color_option");
  window.location.reload();
};

// Start functions don't repeat yourself
function goToSection(elements) {
  elements.forEach((element) => {
    element.addEventListener("click", (e) => {
      e.preventDefault();
      document.querySelector(e.target.dataset.section).scrollIntoView({
        behavior: "smooth",
      });
    });
  });
}

function toggleActiveClass(e) {
  e.target.parentElement.querySelectorAll(".active").forEach((Element) => {
    //remove active class on span element
    Element.classList.remove("active");
  });

  //add active class on span element
  e.target.classList.add("active");
}
// end functions don't repeat yourself

// start toggle nav list in the small screens
let navListButton = document.querySelector(".toggle-list");
let toggleLinksMenu = document.querySelector(".list");
navListButton.onclick = function (e) {
  e.stopPropagation();
  this.classList.toggle("menu-active");
  toggleLinksMenu.classList.toggle("open");
};
// end toggle nav list in the small screens

// click anywhere to toggle the nav list
document.addEventListener("click", (e) => {
  if (e.target !== navListButton && e.target !== toggleLinksMenu) {
    if (toggleLinksMenu.classList.contains("open"))
      navListButton.classList.remove("menu-active");
    toggleLinksMenu.classList.remove("open");
  }
});

// stop propagation from the links menu
toggleLinksMenu.onclick = function (e) {
  e.stopPropagation();
};
