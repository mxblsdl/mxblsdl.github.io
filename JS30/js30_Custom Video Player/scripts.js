// get the elements
// parent element
const player = document.querySelector(".player");

const viewer = player.querySelector(".viewer");
const progress = player.querySelector(".progress");
const progressBar = player.querySelector(".progress__filled");
const toggle = player.querySelector(".toggle");
const skipButtons = player.querySelectorAll("[data-skip]");
const ranges = player.querySelectorAll(".player__slider");
const large = player.querySelector(".large-view");

// build the functions
// toggle play and pause
function togglePlay() {
    if(viewer.paused) {
        viewer.play()
        // toggle.innerHTML = '<b>&#9658</b>'
    } else {
        viewer.pause()
        // toggle.innerHTML = '<b>||</b>';
    }
}

function updateButton() {
    const icon = this.paused ? '<b>&#9658</b>' : '<b>||</b>';
    toggle.innerHTML = icon; 
};

function skipTime() {
    viewer.currentTime = viewer.currentTime + Number(this.dataset.skip);
};

function rangeFunction() {
    viewer[this.name] = this.value
};

function handleProgress() {
    const percent = (viewer.currentTime / viewer.duration) * 100
    progressBar.style.flexBasis = `${percent}%`;
};

let flag = false
function scrub(e) {
    const scrubTime = (e.offsetX / progress.offsetWidth) * viewer.duration;
    viewer.currentTime = scrubTime;
};

// hook up the functions to event listeners
viewer.addEventListener("click", togglePlay)
viewer.addEventListener("play", updateButton)
viewer.addEventListener("pause", updateButton)
viewer.addEventListener("timeupdate", handleProgress)

toggle.addEventListener("click", togglePlay) 

progress.addEventListener("click", scrub);
progress.addEventListener("mousemove",(e) => flag && scrub(e));
progress.addEventListener("mousedown",() => flag = true)
progress.addEventListener("mouseup",() => flag = false)

large.addEventListener("click", largeView)

skipButtons.forEach((skipButton) => {
    return skipButton.addEventListener("click", skipTime);
});

ranges.forEach(range => {
    range.addEventListener("change", rangeFunction)
});

