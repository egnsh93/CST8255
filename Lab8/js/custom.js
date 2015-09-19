///Initialize the app
$(init);

function init() {
    // Check for messages every 5 seconds
    setInterval(getMessages, 5000);

    // Create the puzzle
    puzzleInit();
}