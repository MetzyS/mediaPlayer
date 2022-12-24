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
let boutonPlaylist = document.querySelector('.jsnone');
let playlistModal = document.querySelector('.playlist-container');
let playlistList = document.querySelector('.playlist-list');


// Automatisation de la création de chaque élement de la playlist HTML //
/////// Création Elements Playlist ///////
// (le "i" utilisé dans les fonctions suivante est défini par la boucle FOR qui réunira toutes les fonctions) //

// creation <li> ('list-item')
function createLi() {
    let playlistLiCreate = document.createElement('li');
    playlistLiCreate.classList.add('list-item');
    playlistLiCreate.id = 'item' + i;
    playlistList.appendChild(playlistLiCreate);
}

// creation de la <div> ('list-item-container)
function createDiv(li) {
    let playlistDivCreate = document.createElement('div');
    playlistDivCreate.classList.add('list-item-container');
    playlistDivCreate.classList.add('list-item-container' + i);
    li = playlistLi = document.querySelector('#item' + i);
    li.appendChild(playlistDivCreate);
}

// creation des <span> titre et durée
function createSpans(div) {
    let playlistCreateTitleSpan = document.createElement('span');
    playlistCreateTitleSpan.textContent = trackList[i].name;
    playlistCreateTitleSpan.classList.add('list-title' + i, 'list-text-bold');
    let playlistCreateDurationSpan = document.createElement('span');
    playlistCreateDurationSpan.textContent = trackList[i].duration;
    playlistCreateDurationSpan.classList.add('list-duration' + i)
    div = document.querySelector('.list-item-container' + i);

    div.appendChild(playlistCreateTitleSpan); //crée le span dans la DIV précedemment crée
    div.appendChild(playlistCreateDurationSpan); //même chose ici
}

/**
 * Regroupe les fonctions de création de la playlist
 */
function createPlaylistElement() {
    for (i = 0; i < trackList.length; i++) {
        createLi();
        createDiv();
        createSpans();

        // creation du SPAN 'list-artiste'
        let playListArtistSpan = document.createElement('span');
        playListArtistSpan.textContent = trackList[i].artist;
        playListArtistSpan.classList.add('list-artiste' + i);
        playlistLi.appendChild(playListArtistSpan); //crée le span dans le LI playlistList
    }
}
createPlaylistElement();

// Attache un eventListener pour chaque <li> crée précedemment
for (let i = 0; i < trackList.length; i++) {
    let listItemList = document.querySelector('#item' + i);
    listItemList.addEventListener('click', e => {
        loadTrack(i);
        playPauseMusic();
    })
}

// Fin de l'automatisation //



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


// Progression Range //
progressionRange.addEventListener('change', e => {
    player.currentTime = (progressionRange.value * player.duration) / 100;
});


// Barre espace (play/pause), Flèches (prev/next)
if (player) {
    window.addEventListener('keydown', function (event) {
        var key = event.which || event.keyCode
        if (key === 32) { // touche clavier: Barre espace
            playPauseIcon();
            playPauseCassette();
            playPauseMusic();
        } else if (key == 37) { // touche clavier: flèche gauche
            prevMusic();
        } else if (key == 39) { // touche clavier: flèche droite
            nextMusic();
        }
        else if (key == 83) { // touche clavier: lettre s
            stopMusic();
            stopCassette();
            playIcon();
        }
    });
};


document.addEventListener('click', e => {
    if (!e.target.classList.contains('jsnone'))
        playlistModal.classList.add('none');
})
