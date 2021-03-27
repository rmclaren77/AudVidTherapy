var mainSong, varSong;
var mainSongID, varSongID;
var songSelect, songSelectID, songList;
var currentVarSongIndex;
var paused, playing;
var varSongLength;
// based on extensive production testing, best bet is to default to webm and fallback to mp3
//going to have to include crossfade to get rid of popping sounds
function soundSetup(){
  updateState(false, false);
  varSong = [];
  varSongID = [];
  currentVarSongIndex = 0;
  varSongLength = 4;
  mainSong = new Howl({
    src: ['Songs/1_main.mp3'],
    loop:true
  });
  for(var x = 1; x<=varSongLength; x++){
  varSong[x-1] = new Howl({
  src: ['Songs/1_var'+x+'.mp3']
  });
}
resetIDs();

}

function songChanged(){
  unloadCurrentSong();
  resetIDs();

  mainSong = new Howl({
  src: ['Songs/'+songSelectID+'_main.mp3'],
  loop:true
  });
  for(var x = 1; x<=varSongLength; x++){
  varSong[x-1] = new Howl({
  src: ['Songs/'+songSelectID+'_var'+x+'.mp3']
  });
}
updateState(false, false);

}

function playSong(){

  frameRate(40);

  if(paused){
    mainSong.play(mainSongID);
    varSong[currentVarSongIndex].play(varSongID[currentVarSongIndex]);

  }
  else{
  currentVarSongIndex = 0;
    if(playing){
      stopSong();
    }

        mainSongID = mainSong.play();
        varSongID[currentVarSongIndex] = varSong[currentVarSongIndex].play();

        varSong[currentVarSongIndex].once('end', playNextVarSong(), varSongID[currentVarSongIndex]);



}

  updateState(true, false);
}
function pauseSong(){
    mainSong.pause(mainSongID);
    varSong[currentVarSongIndex].pause();
  frameRate(0);
  updateState(false, true);
}
function stopSong(){

  mainSong.stop();
  for(var x = 0; x<varSong.length; x++)
  {
    varSong[x].stop();
  }
  frameRate(0);
  resetIDs();
  updateState(false, false);
}

function playNextVarSong(){
    currentVarSongIndex++;
    currentVarSongIndex = currentVarSongIndex%varSongLength;
    if(currentVarSongIndex == 0){
      mainSong.stop();
      mainSongID = mainSong.play();
    }
    varSongID[currentVarSongIndex] = varSong[currentVarSongIndex].play();
    varSong[currentVarSongIndex].once('end', playNextVarSong);
}

function swapVarSong(index1, index2){
  stopSong();
  var temp = varSong[index1];
  varSong[index1] = varSong[index2];
  varSong[index2] = temp;

  var tempID = varSongID[index1];
  varSongID[index1] = varSongID[index2];
  varSongID[index2] = tempID;
}



function updateState(isPlaying, isPaused){
  playing = isPlaying;
  paused = isPaused;
  if(paused){
    //disable pause button
    //make sure play button says play
  }
  if(playing){
    //change playing to restart
  }
}

function resetIDs(){
  mainSongID = 0;
  for(var x = 0; x<varSong.length; x++){
    varSongID[x] = 0;
  }
}
function unloadCurrentSong(){
  mainSong.unload();
  for(var x = 0; x<varSong.length; x++){
    varSong[x].unload();
  }
}
