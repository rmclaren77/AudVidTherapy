var song;
var toggleButton;
var amp;
var width, height, widthCenter, heightCenter;
var fft;
var playing;
var frameCount;


function setup() {
  count = 0;
  width = displayWidth;
  height = displayHeight*.6;
  widthCenter = width/2;
  heightCenter = height/2;
  fft = new p5.FFT();
  createCanvas(width, height);
  amp = new p5.Amplitude();
  playing = false;

  songSelectID = 1;
  soundSetup();
  //   // start the Audio Input.
  //   // By default, it does not .connect() (to the computer speakers)
  //   mic.start();
  songSelect = createSelect();
  songSelect.position(0,height+10);
  songSelect.option('Simple',1);
  songSelect.option('Test2',2);
  songSelect.option('Test3',3);
  songSelect.changed(songChanged);
  songSelect.center('horizontal');

let buttonDiv = createDiv('').size(10, 10);
  playButton = createButton('Play');
  playButton.mousePressed(playSong);
  playButton.id = 'pauseButton';
  pauseButton = createButton('Pause');
  pauseButton.id = 'pauseButton';
  pauseButton.mousePressed(pauseSong)
  fullScreenButton = createButton('Full Screen');
  fullScreenButton.mousePressed(toggleFullScreen);



}

function draw() {

  if(songSelectID==1){
    draw1();
  }
  else{frameRate(1);
    background(100*Math.random());
  }

}

function draw1() {

  background(1);
}




function touchStarted() {
  if (getAudioContext().state !== 'running') {
    getAudioContext().resume();
  }
}
function toggleFullScreen() {
  var doc = window.document;
  var docEl = doc.documentElement;

  var requestFullScreen = docEl.requestFullscreen || docEl.mozRequestFullScreen || docEl.webkitRequestFullScreen || docEl.msRequestFullscreen;
  var cancelFullScreen = doc.exitFullscreen || doc.mozCancelFullScreen || doc.webkitExitFullscreen || doc.msExitFullscreen;

  if(!doc.fullscreenElement && !doc.mozFullScreenElement && !doc.webkitFullscreenElement && !doc.msFullscreenElement) {
    requestFullScreen.call(docEl);
  }
  else {
    cancelFullScreen.call(doc);
  }
}
