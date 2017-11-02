function main() {
    var btnVolumeslider =document.getElementById("volumeslider");
    var btnPlay = document.getElementById("play-pause");
    var btnRew = document.getElementById("rew");
    var btnFastFwd = document.getElementById("fastFwd");
    var btnRestart = document.getElementById("restart");
    var video = document.getElementById("our-video");
    var btnMute = document.getElementById("mute");
    var btnAjoutFlux = document.getElementById("btnAjoutFlux");
    var cln;

    btnVolumeslider.addEventListener("mousemove", setVolume);
    btnPlay.addEventListener("click", playVideo);
    btnRew.addEventListener("click", rew);
    btnFastFwd.addEventListener("click", fastFwd);
    btnRestart.addEventListener("click", restart);
    btnMute.addEventListener("click", mute);
    video.addEventListener("ended", finVideo);
    btnAjoutFlux.addEventListener("click", makeCorsRequest);

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
        cln = itm.cloneNode(true);
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
    }

    function finVideo() {
        var lien = cln.parentNode.firstChild.getElementsByClassName("lienPlaylist")[0].value;
        video.setAttribute("src", lien);
        cln.parentNode.removeChild(cln.parentNode.firstChild);
    }

    function creerRequeteCORS(url) {
        var enTete = 'https://cors-anywhere.herokuapp.com/'
        var xhr = new XMLHttpRequest();
        if("withCredentials" in xhr) {
            xhr.open('GET', enTete+url, false);
        } else { //CORS not supported
            xhr = null;
        }
        return xhr;
    }

    function getTitre(texte) {
        return texte.match('<title>(.*)?</title>')[1];
    }

    function getAudio(xml) {
        var x = xml.documentElement;
        var tagnom = x.getElementsByTagName("enclosure")
        for (var i = 0; i < tagnom.length; i++) {
            var element = x.childNodes[i];
            var nom = element.node
            if (nom === "url") {

            }
        }
    }

    function makeCorsRequest() {
        var url = 'http://radiofrance-podcast.net/podcast09/rss_13248.xml';
        var xhr = creerRequeteCORS(url);
        if (!xhr) {
            alert('CORS not supported');
            console.log('Erreur CORS');
            return;
        }

        xhr.onload = function() {
            var texte = xhr.responseText;
            var xml = xhr.responseXML;
            var titre = getTitre(texte);
            getAudio(xml);
            console.log(titre);
        };

        xhr.onerror = function() {
            alert('Erreur lors de la requête.');
        };

        xhr.send();
    }
}

window.addEventListener("load", main);
