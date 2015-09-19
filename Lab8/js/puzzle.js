// Puzzle constants
var PUZZLE = {
    url: 'http://playdoh.algonquincollege.com/lts/mike/puzzle.jpg',
    width: 300,
    height: 450,
    pieceSize: 150
};

var PIECES_PER_ROW = PUZZLE.width / PUZZLE.pieceSize;
var START_X = Math.round((600 - PUZZLE.width) / 2);
var START_Y = Math.round((500 - PUZZLE.height) / 2);

// Store our puzzle pieces
var puzzlePieces = [];

function puzzleInit() {
    // Build the puzzle
    var pieceCount = (PUZZLE.width / PUZZLE.pieceSize) * (PUZZLE.height / PUZZLE.pieceSize);

    for (var i = 0; i < pieceCount; ++i) {
        // Determine the x/y position based on the index of the current piece
        var x = i % PIECES_PER_ROW;
        var y = Math.floor(i / PIECES_PER_ROW);

        // Create draggable piece
        var $piece = $('<div>');

        $piece.addClass('puzzlePiece');
        $piece.css({
            width: PUZZLE.pieceSize,
            height: PUZZLE.pieceSize,
            left: START_X + x * PUZZLE.pieceSize,
            top: START_Y + y * PUZZLE.pieceSize,
            'background-image': 'url(' + PUZZLE.url + ')',
            'background-position-x': (-x * PUZZLE.pieceSize) + "px",
            'background-position-y': (-y * PUZZLE.pieceSize) + "px"
        });

        $piece.appendTo('#puzzle');
        $piece.data('index', i); // Store the pieces current index
        $piece.data('correctPosition', i); // Store the pieces correct index

        // Add the puzzle piece to our array
        puzzlePieces.push($piece);

        // Define the drag behaviour
        $piece.draggable({
            containment: 'parent',
            start: onDragStart,
            stop: onDragStop
        });

        // Create the drag targets
        var $target = $('<div>');

        $target.addClass('puzzleTarget');
        $target.css({
            width: PUZZLE.pieceSize - 2, // Reduced by 2 for 1px border
            height: PUZZLE.pieceSize - 2,
            left: START_X + x * PUZZLE.pieceSize,
            top: START_Y + y * PUZZLE.pieceSize
        });

        $target.appendTo('#puzzle');
        $target.data('index', i);
        $target.droppable({
            drop: onPieceDrop
        });
    }

    // Randomize pieces
    var availableIndices = [];

    for (var i = 0; i < puzzlePieces.length; ++i) {
        availableIndices.push(i);
    }

    for (var i = 0; i < puzzlePieces.length; ++i) {
        var randomIndex = Math.floor(Math.random() * availableIndices.length);
        movePiece(puzzlePieces[i], availableIndices[randomIndex], 500);
        availableIndices.splice(randomIndex, 1);
    }
}

function onDragStart(event, ui) {
    $(this).addClass('activePiece');
    $(this).data('dropped', false);
}

function onDragStop(event, ui) {
    $this = $(this);
    $this.removeClass('activePiece');

    // If the piece wasn't dropped onto a target, return to its starting position

    if ($this.data('dropped') == false)
        movePiece($this, $this.data('index'));
}

function onPieceDrop(event, ui) {
    // Get the index of the target
    var targetIndex = $(this).data('index');
    var pieceIndex = ui.draggable.data('index');

    ui.draggable.data('dropped', true);

    movePiece(findPiece(targetIndex), pieceIndex, 100);
    movePiece(ui.draggable, targetIndex, 100);
}

function movePiece($piece, targetIndex, time) {
    $piece.data('targetIndex', targetIndex);
    $piece.addClass('movingPiece');

    var x = targetIndex % PIECES_PER_ROW;
    var y = Math.floor(targetIndex / PIECES_PER_ROW);

    $piece.animate({
        top: START_Y + y * PUZZLE.pieceSize,
        left: START_X + x * PUZZLE.pieceSize
    }, time, function () {
        $(this).removeClass('movingPiece', 1000, 'easeOutBounce');
        $(this).data('index', $(this).data('targetIndex'));
        checkComplete();
    });
}

function findPiece(index) {
    for (var p in puzzlePieces) {
        if (puzzlePieces[p].data('index') == index) {
            return puzzlePieces[p];
        }
    }

    return null;
}

function checkComplete() {
    // Check end conditions
    for (var p in puzzlePieces) {
        if (puzzlePieces[p].data('index') != puzzlePieces[p].data('correctPosition'))
            return;
    }

    $('#txtMessage').val("You have mastered the universe");
    sendMessage();
}