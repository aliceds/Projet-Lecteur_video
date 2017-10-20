function main() {
    var btnVolumeslider =document.getElementById("volumeslider");
    var btnPlay = document.getElementById("play-pause");
    var btnRew = document.getElementById("rew");
    var btnFastFwd = document.getElementById("fastFwd");
    var btnRestart = document.getElementById("restart");
    var video = document.getElementById("our-video");
    var btnMute = document.getElementById("mute");

    btnVolumeslider.addEventListener("mousemove", setVolume);
    btnPlay.addEventListener("click", playVideo);
    btnRew.addEventListener("click", rew);
    btnFastFwd.addEventListener("click", fastFwd);
    btnRestart.addEventListener("click", restart);
    btnMute.addEventListener("click", mute);

    function playVideo() {
       if (video.paused) {
          video.play();
          btnPlay.textContent = "||";
       } else {
          video.pause();
          btnPlay.textContent = ">";
       }
    }

    function restart() {
        video.currentTime = 0;
    }

    function rew() {
        video.currentTime += -10;
    }

    function fastFwd() {
        video.currentTime += 10;
    }

    function setVolume() {
        video.volume = btnVolumeslider.value/100;
    }

    function mute() {
        if (video.muted) {
            video.muted = false;
        } else {
            video.muted = true;
        }
    }
}

window.addEventListener("load", main);
