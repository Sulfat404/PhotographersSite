
const player = document.querySelector('.video__content');
const video = player.querySelector('.video__record');
const startBtn = document.querySelector('.video-icon');
const pauseBtn = player.querySelector('.btn-video__pause');
const playBtn = player.querySelector('.btn-video__play');
const videoPanel = player.querySelector('.video__panel-control');
const btnVideoVolume = player.querySelector('.btn-video__volume');
const btnVideoVolumeMute = player.querySelector('.btn-video__volume-mute');
const progressbars = player.querySelectorAll('.pregressbar');
const progressBarVideo = player.querySelector('.progressbar__video');
const progressBarVolume = player.querySelector('.progressbar__volume');


startBtn.addEventListener('click', togglePlay);
pauseBtn.addEventListener('click', togglePlay);
playBtn.addEventListener('click', togglePlay);
video.addEventListener('timeupdate', handProgress);
video.addEventListener('click', togglePlay);
btnVideoVolume.addEventListener('click', volumeMute);
btnVideoVolumeMute.addEventListener('click', volumeDontMute);



// change progress bar on click
progressBarVideo.addEventListener('click', (e) => {
    const progressTime = (e.offsetX / progressBarVideo.offsetWidth) * video.duration;
    video.currentTime = progressTime;
});


// play and pause video buttons 
function togglePlay() {
    const method = video.paused ? 'play' : 'pause';
    video[method]();
    method === 'play' ? continuePlay() : stopPlay();
}

function continuePlay() {
    startBtn.style.display = 'none';
    pauseBtn.style.display = 'block';
    playBtn.style.display = 'none';
    videoPanel.style.display = 'flex';
}

function stopPlay() {
    startBtn.style.display = 'block';
    pauseBtn.style.display = 'none';
    playBtn.style.display = 'block';
}

// progress bar
function handProgress() {
    const percent = (video.currentTime / video.duration ) * 100;
    progressBarVideo.value = percent;
    progressBarVideo.style.background = `linear-gradient(to right, rgb(189, 174, 130) 0%, rgb(189, 174, 130) ${percent}%, rgb(200, 200, 200) ${percent}%, rgb(200, 200, 200) 100%)`;
}


// volume
progressBarVolume.addEventListener('change', (e) => {
    let percent = e.target.value * 100;
    video.volume = e.target.value;
    progressBarVolume.style.background = `linear-gradient(to right, rgb(189, 174, 130) 0%, rgb(189, 174, 130) ${percent}%, rgb(200, 200, 200) ${percent}%, rgb(200, 200, 200) 100%)`;
    if (video.volume === 0) {
        volumeMute();
    } else {
        btnVideoVolumeMute.style.display = 'none';
        btnVideoVolume.style.display = 'block';
    }
});

function volumeMute() {
    video.volume = 0;
    btnVideoVolumeMute.style.display = 'block';
    btnVideoVolume.style.display = 'none';
}

function volumeDontMute() {
    video.volume = 0.5;
    progressBarVolume.style.background = `linear-gradient(to right, rgb(189, 174, 130) 0%, rgb(189, 174, 130) ${50}%, rgb(200, 200, 200) ${50}%, rgb(200, 200, 200) 100%)`;
    btnVideoVolumeMute.style.display = 'none';
    btnVideoVolume.style.display = 'block';
}






