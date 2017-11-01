function main() {
    var value = 0;

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

    document.getElementById("elementListeLecture").setAttribute("style","display:none");
    document.getElementById("ajouterLien").addEventListener("click", cloner);

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

    function cloner() {
        var itm = document.getElementById("elementListeLecture");
        var cln = itm.cloneNode(true);
        value++;
        cln.setAttribute("value", value);
        cln.setAttribute("style","display: auto");
        var lien = document.getElementById("lien").value;
        document.getElementById("liste").appendChild(cln);
        cln.getElementsByClassName("lienPlaylist")[0].setAttribute("value", lien);
        cln.getElementsByClassName("supprimerLien")[0].addEventListener("click", function() {
            cln.parentNode.removeChild(cln);
        });

        cln.getElementsByClassName("monterLien")[0].addEventListener("click", function() {
            if (cln !== cln.parentNode.firstChild) {
                var elementParent = cln.parentNode;
                var tmp = cln;
                var precedent = cln.previousSibling;
                elementParent.removeChild(cln);
                elementParent.insertBefore(tmp, precedent);
            }
        });

        cln.getElementsByClassName("descendreLien")[0].addEventListener("click", function() {
            if (cln !== cln.parentNode.lastChild) {
                var elementParent = cln.parentNode;
                var tmp = cln;
                var suivant = cln.nextSibling;
                elementParent.removeChild(cln);
                elementParent.insertBefore(tmp, suivant.nextSibling);
            }
        });

        console.log(lien);
    }
}

window.addEventListener("load", main);
