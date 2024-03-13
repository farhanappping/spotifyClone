let currentSong = new Audio()

let songs = ['surah-fatiha.mp3','surah-kaafiroon.mp3','surah-nasr.mp3','surah-masadd.mp3','surah-ikhlas.mp3','surah-falaq.mp3', 'surah-nas.mp3', ''];
let currIndex = 0;
currentSong.src = songs[currIndex]

// convert seconds to minutes for song time
function secondsToMinutes(seconds) {
    if (isNaN(seconds) || seconds < 0) {
        return "00:00";
    }
    // Ensure the input is a positive number
    // seconds = Math.abs(seconds);
  
    // Calculate minutes and remaining seconds
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = Math.floor(seconds % 60);
  
    // Add leading zero if necessary
    const formattedMinutes = String(minutes).padStart(2, '0');
    const formattedSeconds = String(remainingSeconds).padStart(2, '0');
  
    // Combine minutes and seconds in "mm:ss" format
    const formattedTime = `${formattedMinutes}:${formattedSeconds}`;
  
    return formattedTime;
  }
  
 
async function main(){

 // Toggle Song on Click of Card
document.querySelectorAll('.card').forEach(card => {
    card.addEventListener('click', () => {
        const songPath = card.getAttribute('data-song');
        togglePlayPause(songPath);
        console.log(songPath);
        let songInfo = document.querySelector('.songinfo')
        songInfo.textContent = songPath.replace('.mp3', '')
         // Update the current index when a card is clicked
         currIndex = songs.indexOf(songPath);
    });
});
// update song info in PLaybar for each song
function updateSongInfo() {
    let songInfo = document.querySelector('.songinfo');
    songInfo.textContent = songs[currIndex].replace('.mp3', '');
}

// Toggle Play Pause
function togglePlayPause(songPath) {
    
        playMusic(songPath);
    
}
function playMusic(songPath) {
    currentSong.src = `${songPath}`;
    currentSong.play();
    document.getElementById('play').src = 'img/pause.svg';
}
function togglePlaybar(){
    if (currentSong.paused) {
        // currentSong.src = songs[0];
        currentSong.play();
    document.getElementById('play').src = 'img/pause.svg';

    } else if(!currentSong.paused){
        pauseMusic();
}
else if(currentSong.paused && currentSong.src.split('/')[3] == songs[currIndex]){
   
    currentSong.play()
}
}



function pauseMusic() {
    currentSong.pause();
    document.getElementById('play').src = 'img/play.svg';
}

// Play Next Song

function nextSong() {
    
    currIndex = (currIndex + 1) % songs.length;

    
    while (songs[currIndex] === '') {
        currIndex = (currIndex + 1) % songs.length;
    }

    
    playMusic(`${songs[currIndex]}`);
    
    
    updateSongInfo();
}

// Play Previous Song
function previousSong() {
    
    currIndex = (currIndex - 1 + songs.length) % songs.length;

    
    while (songs[currIndex] === '') {
        currIndex = (currIndex - 1 + songs.length) % songs.length;
    }

   
    playMusic(`${songs[currIndex]}`);
    
   
    updateSongInfo();
}




// Event listeners
document.getElementById('play').addEventListener('click', togglePlaybar);

document.getElementById('next').addEventListener('click', nextSong);
document.getElementById('previous').addEventListener('click', previousSong);

    // update time and seekbar while song is playing
    currentSong.addEventListener('timeupdate', ()=>{
        document.querySelector('.songtime').innerHTML = 
        `${secondsToMinutes(currentSong.currentTime)}/${secondsToMinutes(currentSong.duration)}`
        document.querySelector('.circle').style.left = 
        (currentSong.currentTime / currentSong.duration) * 100 + '%'
        if (currentSong.currentTime >= currentSong.duration) {
            document.getElementById('play').src = 'img/play.svg';

        }

    })

    // on click of seekbar the song should play from there
    
    document.querySelector('.seekbar').addEventListener('click',(e)=>{
        let percent = (e.offsetX/e.target.getBoundingClientRect().width) * 100
        document.querySelector('.circle').style.left = percent+"%"
        currentSong.currentTime = ((currentSong.duration) * percent) / 100
    })

    // hamburger toggle

    let hamburger = document.querySelector('.hamburger')
    let closeHamburger = document.querySelector('.closeHamburger')
    hamburger.addEventListener('click', function(){
        document.querySelector('.left').style.left = 0
    })
    closeHamburger.addEventListener('click', function(){
        document.querySelector('.left').style.left = `-367px`
    })

    // Volume range and mute if volume is zero
    document.querySelector('.range').getElementsByTagName('input')[0].addEventListener('input', (e)=>{
        
        currentSong.volume = +(e.target.value)/100
        console.log(currentSong.volume)
        if(currentSong.volume == 0){
            volume.src = 'img/mute.svg';

        }else{
            volume.src = 'img/volumeHigh.svg';

        }
    })

    
// on click of volume it should mute
    volume.addEventListener('click', () => {
        if (currentSong.muted) {
            currentSong.muted = false; // Unmute
            volume.src = 'img/volumeHigh.svg';
            document.querySelector('.range').style.display = 'block'
        } else {
            currentSong.muted = true; // Mute
            volume.src = 'img/mute.svg';
            document.querySelector('.range').style.display = 'none'
        }
    });
    
    console.log('test');
}
main()