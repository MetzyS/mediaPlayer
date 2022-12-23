/* TrackList */
let trackList = [
    {
        name: "Poke Gym",
        path: "assets/music/pokegym.mp3",
        artist: "Closed on Sunday",
        img: "bcg-poke",
        duration: "3:00",
    },
    {
        name: "Legend of Zelda",
        path: "assets/music/zelda.mp3",
        artist: "Mikel & Dj Cutman",
        img: "bcg-zelda",
        duration: "3:02",
    },
    {
        name: "Mario Theme",
        path: "assets/music/mario.mp3",
        artist: "Rifti Beats",
        img: "bcg-mario",
        duration: "2:05",
    },
    {
        name: "Giorno's Theme",
        path: "assets/music/giorno.mp3",
        artist: "Shinra",
        img: "bcg-jojo",
        duration: "0:58",
    },
];
let indexTrack = 0;     // permet d'itérer dans trackList[]
let textTrack = 1;      // permet d'itérer uniquement pour le texte
let textTrack2 = 2;
let i = 0;

/* Queryselectors */
// Controls
let player = document.querySelector('#player');
let boutonPrev = document.querySelector('#bouton-prev');
let boutonPlay = document.querySelector('#bouton-play');
let boutonStop = document.querySelector('#bouton-stop');
let boutonNext = document.querySelector('#bouton-next');
let progressionRange = document.querySelector('#progression-range');
let volumeRange = document.querySelector('#volume-range');

// Cassette (animation)
let cassetteCercle1 = document.querySelector('.cassette-cercle1');
let cassetteCercle2 = document.querySelector('.cassette-cercle2');

// Texte et images player
let durationCurrent = document.querySelector('#duration-current');
let durationRestante = document.querySelector('#duration-restante');
let titreCurrent = document.querySelector('#current-titre');
let artisteCurrent = document.querySelector('#current-artiste');
let albumImg = document.querySelector('#album-img');
let albumImgVar = ["bcg-poke", "bcg-zelda", "bcg-mario", "bcg-jojo"];    // sert a la suppression des classes pour le changement d'images

// Texte musiques suivantes
let musiqueSuivante = document.querySelector('#musique_suivante-1');
let musiqueSuivante2 = document.querySelector('#musique_suivante-2');
let artisteSuivant = document.querySelector('#artiste1');
let artisteSuivant2 = document.querySelector('#artiste2');

// Playlist
let boutonPlaylist = document.querySelector('.test');
let playlistModal = document.querySelector('.playlist-container');
let playlistTitre1 = document.querySelector('.list-title1');
let playlistTitre2 = document.querySelector('.list-title2');
let playlistTitre3 = document.querySelector('.list-title3');
let playlistTitre4 = document.querySelector('.list-title4');
let playlistDuration1 = document.querySelector('.list-duration1');
let playlistDuration2 = document.querySelector('.list-duration2');
let playlistDuration3 = document.querySelector('.list-duration3');
let playlistDuration4 = document.querySelector('.list-duration4');
let playlistArtist1 = document.querySelector('.list-artist1');
let playlistArtist2 = document.querySelector('.list-artist2');
let playlistArtist3 = document.querySelector('.list-artist3');
let playlistArtist4 = document.querySelector('.list-artist4');
let playlistItem1 = document.querySelector('#item1');
let playlistItem2 = document.querySelector('#item2');
let playlistItem3 = document.querySelector('#item3');
let playlistItem4 = document.querySelector('#item4');


/* FONCTIONS */
/**
 * Modifie l'icone du bouton Play / Pause lorsque l'on clique dessus.
 */
function playPauseIcon() {
    if (boutonPlay.classList.contains('bouton-play')) {
        boutonPlay.classList.remove('bouton-play');
        boutonPlay.classList.add('bouton-pause');
    }
    else {
        boutonPlay.classList.remove('bouton-pause');
        boutonPlay.classList.add('bouton-play');
    }
}

function playIcon() {
    boutonPlay.classList.remove('bouton-pause');
    boutonPlay.classList.add('bouton-play');
}

function pauseIcon() {
    boutonPlay.classList.remove('bouton-play');
    boutonPlay.classList.add('bouton-pause');
}


/**
 * Fais tourner la cassette lorsque l'on clique sur Play et l'arrête lors du second clic
 */
function playPauseCassette() {
    if (boutonPlay.classList.contains('bouton-play')) {
        pauseCassette();
    }
    else {
        playCassette();
    }
}

// Pause l'animation de la cassette manuellement
function pauseCassette() {
    cassetteCercle1.style.animationPlayState = 'paused';
    cassetteCercle2.style.animationPlayState = 'paused';
}
// Active l'animation de la cassette manuellement
function playCassette() {
    cassetteCercle1.style.animationPlayState = 'running';
    cassetteCercle2.style.animationPlayState = 'running';
}

/**
 * Arrête l'animation de la cassette
 */
function stopCassette() {
    cassetteCercle1.style.animationPlayState = 'paused';
    cassetteCercle2.style.animationPlayState = 'paused';
}

// Charge la musique et affiche les infos sur le lecteur
function loadTrack(indexTrack) {
    player.src = trackList[indexTrack].path;
    titreCurrent.innerHTML = trackList[indexTrack].name;
    artisteCurrent.innerHTML = trackList[indexTrack].artist;
    for (i = 0; i < albumImgVar.length; i++) {
        albumImg.classList.remove(albumImgVar[i]);
    }
    albumImg.classList.add(trackList[indexTrack].img)
    player.load();
}

// Affiche les infos de la musique suivante
function loadNextTrack(textTrack) {
    musiqueSuivante.innerHTML = trackList[textTrack].name;
    artisteSuivant.innerHTML = trackList[textTrack].artist;
}

// Afiche les infos de la muisque qui suit la musique suivante
function loadNextNextTrack(textTrack2) {
    musiqueSuivante2.innerHTML = trackList[textTrack2].name;
    artisteSuivant2.innerHTML = trackList[textTrack2].artist;
}

// Afiche les infos de la playlist
function loadPlaylist() {
    playlistTitre1.innerHTML = trackList[0].name;
    playlistDuration1.innerHTML = trackList[0].duration;
    playlistArtist1.innerHTML = trackList[0].artist;
    playlistTitre2.innerHTML = trackList[1].name;
    playlistDuration2.innerHTML = trackList[1].duration;
    playlistArtist2.innerHTML = trackList[1].artist;
    playlistTitre3.innerHTML = trackList[2].name;
    playlistDuration3.innerHTML = trackList[2].duration;
    playlistArtist3.innerHTML = trackList[2].artist;
    playlistTitre4.innerHTML = trackList[3].name;
    playlistDuration4.innerHTML = trackList[3].duration;
    playlistArtist4.innerHTML = trackList[3].artist;
}

loadPlaylist();

loadTrack(indexTrack);
loadNextTrack(textTrack);
loadNextNextTrack(textTrack2);


// Switch Play Pause
function playPauseMusic() {
    if (player.paused) {
        player.play();
    } else {
        player.pause();
    }
}

// Stop la musique
function stopMusic() {
    player.pause();
    player.currentTime = 0;
    progressionRange.value = 0;
}

// Musique suivante + indexTrack++
function nextMusic() {
    if (indexTrack < trackList.length - 1) { // index 0 music arr
        indexTrack++;
        loadTrack(indexTrack);
        playPauseMusic()
    } else {
        indexTrack = 0;
        loadTrack(indexTrack);
        playPauseMusic()
    }
}

// Musique suivante + indexTrack--
function prevMusic() {
    if (indexTrack > 0) {
        indexTrack--;
        loadTrack(indexTrack);
        playPauseMusic()
    } else {
        indexTrack = trackList.length - 1;
        loadTrack(indexTrack);
        playPauseMusic()
    }
}

// Charge le texte musique suivante LIGNE 1
function nextText() {
    if (textTrack < trackList.length - 1) { // index 0 music arr
        textTrack++;
        loadNextTrack(textTrack);
    } else {
        textTrack = 0;
        loadNextTrack(textTrack);
    }
}

// Charge le texte musique precedente  LIGNE 1
function prevText() {
    if (textTrack > 0) {
        textTrack--;
        loadNextTrack(textTrack);
    } else {
        textTrack = indexTrack + 1;
        loadNextTrack(textTrack);
    }
}

// Charge le texte musique suivante LIGNE 2
function nextText2() {
    if (textTrack2 < trackList.length - 1) { // index 0 music arr
        textTrack2++;
        loadNextNextTrack(textTrack2);
    } else {
        textTrack2 = 0;
        loadNextNextTrack(textTrack2);
    }
}

// Charge le texte musique precedente  LIGNE 2
function prevText2() {
    if (textTrack2 > 0) {
        textTrack2--;
        loadNextNextTrack(textTrack2);
    } else {
        textTrack2 = textTrack + 1;
        loadNextNextTrack(textTrack2);
    }
}


// Fonctionns automatiques du player //

/** 
 * Formate le temps récupéré par .currentTime
 */
function timeFormat(ct) {
    minutes = Math.floor(ct / 60);
    seconds = Math.floor(ct % 60);

    if (seconds < 10) {
        seconds = "0" + seconds;
    }

    return minutes + ":" + seconds;
}


/**
 * Affiche et met a jour: duration actuelle, duration restante
 * Utilise ontimeupdate comme interval pour la progression de l'input range et pour les modifications du volume range
 */
player.ontimeupdate = function () {
    let ct = player.currentTime;
    durationCurrent.innerHTML = timeFormat(ct);
    let dt = timeFormat(Math.round(player.duration - ct));   // Math.round permet de synchroniser dt et ct (pb avec l'interval de .ontimeupdate)
    durationRestante.innerHTML = "-" + dt;
    progressionRange.value = Math.round((ct / player.duration) * 100);
    player.volume = (volumeRange.value * 0.01);
    if (timeFormat(player.duration - ct) == 0) {
        durationRestante.innerHTML = "0:00";
    }
    else if (Math.round(player.duration - ct) == 0) {
        boutonPlay.classList.remove('bouton-pause');
        boutonPlay.classList.add('bouton-play');
        playPauseCassette();
    }
    else if (isNaN(player.duration)) {
        durationRestante.innerHTML = "0:00";
        progressionRange.value = 0;
    }
}

player.onplay = function () {
    pauseIcon();
    playCassette();
}

player.onpause = function () {
    playIcon();
    pauseCassette();
}

// Ouvre et ferme la playlist
function openClosePlaylist() {
    if (playlistModal.classList.contains('none')) {
        playlistModal.classList.remove('none');
    } else {
        playlistModal.classList.add('none');
    }
}

/* EventListeners */

// Bouton Play //
boutonPlay.addEventListener('click', e => {
    playPauseMusic();
    e.target.blur();                                     // un-focus le bouton après avoir cliqué (pour ne pas interferer avec les commandes clavier)
});

// Bouton Stop //
boutonStop.addEventListener('click', e => {
    stopMusic();
    console.log("j'ai cliqué");
    e.target.blur();
});

// Bouton Next //
boutonNext.addEventListener('click', e => {
    nextMusic();
    pauseIcon();
    nextText();
    nextText2();
    e.target.blur();
});

// Bouton Prev //
boutonPrev.addEventListener('click', e => {
    prevMusic();
    prevText();
    prevText2();
    pauseIcon();
    e.target.blur();
});

// Bouton Playlist //
boutonPlaylist.addEventListener('click', e => {
    openClosePlaylist();
    e.target.blur();
});

// Playlist Items //
playlistItem1.addEventListener('click', e => {
    loadTrack(0);
    playPauseMusic();
})

playlistItem2.addEventListener('click', e => {
    loadTrack(1);
    playPauseMusic();
})

playlistItem3.addEventListener('click', e => {
    loadTrack(2);
    playPauseMusic();
})

playlistItem4.addEventListener('click', e => {
    loadTrack(3);
    playPauseMusic();
})

// Volume range //
// volumeRange.addEventListener('input', e => {
//     player.volume = (volumeRange.value * 0.01);
// })

// Progression Range //
progressionRange.addEventListener('change', e => {
    player.currentTime = (progressionRange.value * player.duration) / 100;
});


// Spacebar (play/pause), arrows (prev/next)
if (player) {
    window.addEventListener('keydown', function (event) {
        var key = event.which || event.keyCode
        if (key === 32) { // space
            playPauseIcon();
            playPauseCassette();
            playPauseMusic();
        } else if (key == 37) { // left arrow
            prevMusic();
        } else if (key == 39) { // right arrow
            nextMusic();
        }
        else if (key == 83) { // letter s
            stopMusic();
            stopCassette();
            playIcon();
        }
    });
};


document.addEventListener('click', e => {
    if (!e.target.classList.contains('test'))
        playlistModal.classList.add('none');
})