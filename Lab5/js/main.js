window.onload = function ()
{
    // Get the required elements
    var video = document.getElementById("videoPlayer");
    var play = document.getElementById("btnPlay");
    var position = document.getElementById("playPosition");
    var volume = document.getElementById("volumePosition");
    
    function playVideo()
    {
        // Runs the HTML5 video play function and updates the button text
        video.play();
        play.innerHTML = "Pause";  
    }
    
    function pauseVideo()
    {
        // Runs the HTML5 video pause function and updates the button text
        video.pause();
        play.innerHTML = "Play";   
    }

    play.onclick = function()
    {
        // Makes calls to the play/pause funcions depending on the current state of the video
        video.paused ? playVideo() : pauseVideo();
    }
    
    position.onchange = function()
    {
        // Pauses the video and updates the seek bar with the appropriate position in the video
        pauseVideo();
        video.currentTime = video.duration * ( position.value / 100.0 );
    }
    
    volume.onchange = function()
    {
        // Sets the video of the volume to the value of the input
        video.volume = volume.value;
    }

    video.addEventListener("timeupdate", function () {
        // Using the timeupdate event listener, update the progress bar in real time with the location in the video
        position.value = (100 / video.duration) * video.currentTime;
    }, false);
    
    video.addEventListener("ended", function () {
        // When the video ends, reset the position and the button states
        position.value = 0;
        play.innerHTML = "Play";
    }, false);
}