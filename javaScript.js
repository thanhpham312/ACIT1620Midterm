// Variable initializations:

// Controls:
var controls = document.getElementById("controls");

var menuButton = document.getElementById("menuButton");
var backgroundInput = document.getElementById("backgroundInput");
var titleInput = document.getElementById("titleInput");
var descriptionInput = document.getElementById("descriptionInput");
var colorInput = document.getElementById("colorInput");
var plusButton = document.getElementById("plusButton");

// Display:

var display = document.getElementById("display");

var background = document.getElementById("background");
var title = document.getElementById("title");
var description = document.getElementById("description");

// Others:

var selectedBackground = background;
var selectedTitle = title;
var selectedDescription = description;

var newStoryboardCount = 1;

// Functions:

function expandMenu() {
    var currentControlsBottom =  parseInt(getComputedStyle(controls).getPropertyValue("bottom"));
    if(currentControlsBottom != 0) {
        controls.style.bottom = "0px";
    }
    else {
        controls.style.bottom = "-135px";
    }
}

function changeColor() {
    selectedTitle.style.color = colorInput.value;
    selectedDescription.style.color = colorInput.value;
    title.style.color = colorInput.value;
    description.style.color = colorInput.value;
}

function changeDescription() {
    selectedDescription.innerHTML = descriptionInput.value;
    description.innerHTML = descriptionInput.value;
}

function changeTitle() {
    selectedTitle.innerHTML = titleInput.value;
    title.innerHTML = titleInput.value;
}

function changeBG() {
    if(backgroundInput.value == "horse") {
        selectedBackground.style.backgroundImage = "url(img/bg1.jpg)";
        background.style.backgroundImage = "url(img/bg1.jpg)";
    }
    else if(backgroundInput.value == "night") {
        selectedBackground.style.backgroundImage = "url(img/bg2.jpg)";
        background.style.backgroundImage = "url(img/bg2.jpg)";
    }
    else if(backgroundInput.value == "mountain") {
        selectedBackground.style.backgroundImage = "url(img/bg3.jpg)";
        background.style.backgroundImage = "url(img/bg3.jpg)";
    }
    else if(backgroundInput.value.indexOf("epic") != -1) {
        selectedBackground.style.backgroundImage = "url(img/bg4.jpg)";
        background.style.backgroundImage = "url(img/bg4.jpg)";
    }
    else {
        selectedBackground.style.backgroundImage = "url(" + backgroundInput.value + ")";
        background.style.backgroundImage = "url(" + backgroundInput.value + ")";
    }
}

function moveBG(keyCode) {
    console.log(keyCode);
    var currentBgPositionX =  parseInt(getComputedStyle(selectedBackground).getPropertyValue("background-position-x"));
    var currentBgPositionY =  parseInt(getComputedStyle(selectedBackground).getPropertyValue("background-position-y"));
    //var currentBgHeight =  parseInt((getComputedStyle(background).getPropertyValue("background-size")).split()[1]);
    if(keyCode == 37) {
        selectedBackground.style.backgroundPositionX = currentBgPositionX - 10 + "px";
        background.style.backgroundPositionX = currentBgPositionX - 10 + "px";
    }
    else if(keyCode == 38) {
        selectedBackground.style.backgroundPositionY = currentBgPositionY - 10 + "px";
        background.style.backgroundPositionY = currentBgPositionY - 10 + "px";
    }
    else if(keyCode == 39) {
        selectedBackground.style.backgroundPositionX = currentBgPositionX + 10 + "px";
        background.style.backgroundPositionX = currentBgPositionX + 10 + "px";
    }
    else if(keyCode == 40) {
        selectedBackground.style.backgroundPositionY = currentBgPositionY + 10 + "px";
        background.style.backgroundPositionY = currentBgPositionY + 10 + "px";
    }
    else if(keyCode == 187 || keyCode == 107) {
        background.style.height = background.offsetHeight + 10 + "px";
    }
    else if(keyCode == 189 || keyCode == 109) {
        background.style.height = background.offsetHeight - 10 + "px";
    }
}

function addStoryboard() {
    var newBackground = document.createElement("div");
    var newTitle = document.createElement("div");
    var newDescription = document.createElement("div");

    newBackground.className = "storyboard col-xs-12 col-sm-6 col-md-4 col-lg-3";
    newBackground.id = "background" + newStoryboardCount;
    newBackground.style.backgroundImage = selectedBackground.style.backgroundImage

    // Onclick:
    newBackground.onclick = function() {
        selectedBackground = document.getElementById(this.id);
        var storyboardNum = this.id[this.id.length - 1];
        selectedTitle = document.getElementById("title" + storyboardNum);
        selectedDescription = document.getElementById("description" + storyboardNum);
        background.style.backgroundImage = selectedBackground.style.backgroundImage;

        for(var i=0; i < storyboards.length; i++) {
            storyboards[i].style.boxShadow = "inset rgba(255, 255, 255, 0.8) 0px 0px 0px 5px";
        }
        selectedBackground.style.boxShadow = "inset rgba(2, 168, 243, 0.5) 0px 0px 0px 5px";

        titleInput.value = selectedTitle.innerHTML;
        descriptionInput.value = selectedDescription.innerHTML;
        colorInput.value = selectedTitle.style.color;
    }

    newTitle.className = "storyboardTitle";
    newTitle.id = "title" + newStoryboardCount;
    newTitle.innerHTML = selectedTitle.innerHTML;
    newTitle.style.color = selectedTitle.style.color;

    newDescription.className = "storyboardDescription";
    newDescription.id = "description" + newStoryboardCount;
    newDescription.innerHTML = selectedDescription.innerHTML;
    newDescription.style.color = selectedDescription.style.color;

    display.appendChild(newBackground);
    newBackground.appendChild(newTitle);
    newBackground.appendChild(newDescription);

    selectedBackground = newBackground;
    selectedTitle = newTitle;
    selectedDescription = newDescription;

    newStoryboardCount ++;
    storyboards = document.getElementsByClassName("storyboard");

    for(var i=0; i < storyboards.length; i++) {
        storyboards[i].style.boxShadow = "inset rgba(255, 255, 255, 0.8) 0px 0px 0px 5px";
    }

    selectedBackground.style.boxShadow = "inset rgba(2, 168, 243, 0.5) 0px 0px 0px 5px";
}

// Run scripts:

menuButton.addEventListener("click", function() {
    expandMenu();
});

backgroundInput.addEventListener("keyup", function(ev) {
    if(ev.keyCode == 13) {
        changeBG();
    }
});

titleInput.addEventListener("keyup", function() {
    changeTitle();
});

descriptionInput.addEventListener("keyup", function() {
    changeDescription();
});

colorInput.addEventListener("change", function() {
    changeColor();
});

document.body.addEventListener("keydown", function(ev) {
    moveBG(ev.keyCode)
})

plusButton.addEventListener("click", function() {
    addStoryboard();
})

background.addEventListener("click", function() {
    selectedBackground = background;
    selectedTitle = title;
    selectedDescription = description;

    for(var i=0; i < storyboards.length; i++) {
        storyboards[i].style.boxShadow = "inset rgba(255, 255, 255, 0.8) 0px 0px 0px 3px";
    }
    selectedBackground.style.boxShadow = "inset rgba(2, 168, 243, 0.5) 0px 0px 0px 3px";
})