// get the elements
// parent element
const player = document.querySelector(".player");

const viewer = player.querySelector(".viewer");
const progress = player.querySelector(".progress");
const progressBar = player.querySelector(".progress__filled");
const toggle = player.querySelector(".toggle");
const skipButtons = player.querySelectorAll("[data-skip]");
const ranges = player.querySelectorAll(".player__slider");

// build the functions
// toggle play and pause
function togglePlay() {
    if(viewer.paused) {
        viewer.play()
        toggle.innerHTML = '<b>&#9658</b>'
    } else {
        viewer.pause()
        toggle.innerHTML = '<b>||</b>';
    }
}

function skipTime() {
    viewer.currentTime = viewer.currentTime + Number(this.dataset.skip);
};

// hook up the functions to event listeners
viewer.addEventListener("click", togglePlay)
toggle.addEventListener("click", togglePlay)

skipButtons.forEach((skipButton) => {
    return skipButton.addEventListener("click", skipTime);
})
