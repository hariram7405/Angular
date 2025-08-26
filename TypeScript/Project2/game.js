// Game state variables
var gameMode = '';
var isComputerGame = false;
var playerColors = { p1: '#e74c3c', p2: '#f39c12' };
var playerNames = { p1: 'Player 1', p2: 'Player 2' };
var tog = 1;
var p1sum = 0;
var p2sum = 0;
// Audio elements
var rollingSound = null;
var winSound = null;
try {
    rollingSound = new Audio('rpg-dice-rolling-95182.mp3');
    winSound = new Audio('winharpsichord-39642.mp3');
}
catch (e) {
    console.log('Audio files not found');
}
// Color options for players
var colorOptions = [
    { name: 'Red', value: '#e74c3c' },
    { name: 'Blue', value: '#3498db' },
    { name: 'Green', value: '#27ae60' },
    { name: 'Purple', value: '#9b59b6' },
    { name: 'Orange', value: '#f39c12' },
    { name: 'Pink', value: '#e91e63' },
    { name: 'Teal', value: '#1abc9c' },
    { name: 'Brown', value: '#8d4e85' }
];
// Screen management
function showScreen(screenId) {
    var _a;
    document.querySelectorAll('.screen').forEach(function (screen) {
        screen.classList.add('hidden');
    });
    (_a = document.getElementById(screenId)) === null || _a === void 0 ? void 0 : _a.classList.remove('hidden');
}
// Initialize the game
document.addEventListener('DOMContentLoaded', function () {
    var _a, _b, _c, _d;
    showScreen('startScreen');
    (_a = document.getElementById('playBtn')) === null || _a === void 0 ? void 0 : _a.addEventListener('click', function () {
        showScreen('modeScreen');
    });
    (_b = document.getElementById('userVsUser')) === null || _b === void 0 ? void 0 : _b.addEventListener('click', function () {
        gameMode = 'userVsUser';
        isComputerGame = false;
        setupColorSelection();
    });
    (_c = document.getElementById('userVsComputer')) === null || _c === void 0 ? void 0 : _c.addEventListener('click', function () {
        gameMode = 'userVsComputer';
        isComputerGame = true;
        setupColorSelection();
    });
    (_d = document.getElementById('backToMenu')) === null || _d === void 0 ? void 0 : _d.addEventListener('click', function () {
        resetGame();
        showScreen('startScreen');
    });
});
function setupColorSelection() {
    var colorContainer = document.getElementById('colorSelection');
    var colorTitle = document.getElementById('colorTitle');
    var startGameBtn = document.getElementById('startGameBtn');
    colorContainer.innerHTML = '';
    var createColorOptions = function (player, label) {
        var section = document.createElement('div');
        section.className = 'player-color-section';
        section.innerHTML = "<h3>".concat(label, "</h3>");
        var colorDivs = document.createElement('div');
        colorDivs.className = 'color-options';
        colorOptions.forEach(function (color) {
            var div = document.createElement('div');
            div.className = 'color-option';
            div.style.backgroundColor = color.value;
            div.title = color.name;
            div.addEventListener('click', function () { return selectColor(player, color.value, div); });
            colorDivs.appendChild(div);
        });
        section.appendChild(colorDivs);
        colorContainer.appendChild(section);
    };
    if (gameMode === 'userVsUser') {
        colorTitle.textContent = 'Choose Colors for Both Players';
        createColorOptions('p1', '👤 Player 1');
        createColorOptions('p2', '👤 Player 2');
    }
    else {
        colorTitle.textContent = 'Choose Your Color';
        playerNames.p2 = 'Computer';
        var section = document.createElement('div');
        section.className = 'player-color-section';
        section.innerHTML = '<h3>👤 Your Color</h3>';
        var colorDivs_1 = document.createElement('div');
        colorDivs_1.className = 'color-options';
        colorOptions.forEach(function (color) {
            var div = document.createElement('div');
            div.className = 'color-option';
            div.style.backgroundColor = color.value;
            div.title = color.name;
            div.addEventListener('click', function () { return selectUserColor(color.value, div); });
            colorDivs_1.appendChild(div);
        });
        section.appendChild(colorDivs_1);
        colorContainer.appendChild(section);
    }
    startGameBtn.addEventListener('click', startGame);
    showScreen('colorScreen');
}
function selectColor(player, color, element) {
    var _a;
    playerColors[player] = color;
    (_a = element.parentElement) === null || _a === void 0 ? void 0 : _a.querySelectorAll('.color-option').forEach(function (opt) { return opt.classList.remove('selected'); });
    element.classList.add('selected');
    checkIfReadyToStart();
}
function selectUserColor(color, element) {
    var _a;
    playerColors.p1 = color;
    (_a = element.parentElement) === null || _a === void 0 ? void 0 : _a.querySelectorAll('.color-option').forEach(function (opt) { return opt.classList.remove('selected'); });
    element.classList.add('selected');
    var availableColors = colorOptions.filter(function (c) { return c.value !== color; });
    var randomColor = availableColors[Math.floor(Math.random() * availableColors.length)];
    playerColors.p2 = randomColor.value;
    checkIfReadyToStart();
}
function checkIfReadyToStart() {
    var startGameBtn = document.getElementById('startGameBtn');
    if (gameMode === 'userVsUser') {
        if (playerColors.p1 && playerColors.p2 && playerColors.p1 !== playerColors.p2) {
            startGameBtn.classList.remove('hidden');
        }
    }
    else {
        if (playerColors.p1) {
            startGameBtn.classList.remove('hidden');
        }
    }
}
function startGame() {
    var _a;
    document.getElementById('p1').style.backgroundColor = playerColors.p1;
    document.getElementById('p2').style.backgroundColor = playerColors.p2;
    updateTurnIndicator();
    showScreen('gameScreen');
    (_a = document.getElementById('diceBtn')) === null || _a === void 0 ? void 0 : _a.addEventListener('click', rollDice);
}
function updateTurnIndicator() {
    var turnElement = document.getElementById('tog');
    if (tog % 2 !== 0) {
        turnElement.textContent = "".concat(playerNames.p1, "'s Turn");
        turnElement.style.color = playerColors.p1;
    }
    else {
        turnElement.textContent = "".concat(playerNames.p2, "'s Turn");
        turnElement.style.color = playerColors.p2;
    }
}
function rollDice() {
    rollingSound === null || rollingSound === void 0 ? void 0 : rollingSound.play();
    var diceElement = document.getElementById('dice');
    var diceNumbers = ['1', '2', '3', '4', '5', '6'];
    var rollCount = 0;
    var rollInterval = setInterval(function () {
        diceElement.textContent = diceNumbers[Math.floor(Math.random() * 6)];
        rollCount++;
        if (rollCount >= 10) {
            clearInterval(rollInterval);
            var finalNum_1 = Math.floor(Math.random() * 6) + 1;
            diceElement.textContent = getDiceEmoji(finalNum_1);
            showMessage("\uD83C\uDFB2 Rolled ".concat(finalNum_1, "!"), 1000);
            setTimeout(function () {
                if (tog % 2 !== 0) {
                    play('p1', 'p1sum', 0, finalNum_1);
                }
                else {
                    play('p2', 'p2sum', 55, finalNum_1);
                }
                tog++;
                updateTurnIndicator();
                if (isComputerGame && tog % 2 === 0) {
                    setTimeout(function () {
                        document.getElementById('diceBtn').click();
                    }, 2500);
                }
            }, 1200);
        }
    }, 100);
}
function getDiceEmoji(num) {
    var diceEmojis = ['⚀', '⚁', '⚂', '⚃', '⚄', '⚅'];
    return diceEmojis[num - 1];
}
function play(player, psum, correction, num) {
    var sum;
    if (psum === 'p1sum') {
        p1sum += num;
        if (p1sum > 100)
            p1sum -= num;
        p1sum = applySnakesAndLadders(p1sum);
        sum = p1sum;
    }
    else {
        p2sum += num;
        if (p2sum > 100)
            p2sum -= num;
        p2sum = applySnakesAndLadders(p2sum);
        sum = p2sum;
    }
    movePlayer(player, sum, correction);
}
function applySnakesAndLadders(position) {
    var ladders = {
        1: 38, 4: 14, 8: 30, 21: 42, 28: 76, 50: 67, 71: 92, 80: 99
    };
    var snakes = {
        32: 10, 36: 6, 48: 26, 62: 18, 88: 24, 95: 56, 97: 78
    };
    if (ladders[position]) {
        setTimeout(function () { return showMessage("\uD83E\uDE9C Hooray! Ladder! Climb up! \uD83C\uDF89", 1000); }, 1300);
        return ladders[position];
    }
    if (snakes[position]) {
        setTimeout(function () { return showMessage("\uD83D\uDC0D Oops! Snake bite! Slide down! \uD83D\uDE31", 1000); }, 1300);
        return snakes[position];
    }
    return position;
}
function movePlayer(player, sum, correction) {
    var element = document.getElementById(player);
    element.style.transition = 'all ease-in-out 1.2s';
    if (sum < 10) {
        element.style.left = "".concat((sum - 1) * 62, "px");
        element.style.top = "".concat(0 * -62 - correction, "px");
    }
    else if (sum === 100) {
        winSound === null || winSound === void 0 ? void 0 : winSound.play();
        setTimeout(function () {
            var winner = player === 'p1' ? playerNames.p1 : playerNames.p2;
            showWinnerAnimation(winner);
        }, 1300);
    }
    else {
        var numStr = sum < 10 ? '0' + sum.toString() : sum.toString();
        var n1 = parseInt(numStr.charAt(0));
        var n2 = parseInt(numStr.charAt(1));
        var left = n1 % 2 !== 0
            ? (n2 === 0 ? 9 : 9 - (n2 - 1)) * 62
            : (n2 === 0 ? 0 : (n2 - 1)) * 62;
        var top_1 = (-n1 + (n2 === 0 ? 1 : 0)) * 62 - correction;
        element.style.left = "".concat(left, "px");
        element.style.top = "".concat(top_1, "px");
    }
}
function showMessage(text, duration) {
    if (duration === void 0) { duration = 1500; }
    var popup = document.createElement('div');
    popup.className = 'message-popup';
    popup.textContent = text;
    document.body.appendChild(popup);
    setTimeout(function () { return popup.remove(); }, duration);
}
function createConfetti() {
    var colors = ['#ff6b6b', '#4ecdc4', '#45b7d1', '#96ceb4', '#feca57', '#ff9ff3'];
    var _loop_1 = function (i) {
        var confetti = document.createElement('div');
        confetti.className = 'confetti';
        confetti.style.left = "".concat(Math.random() * 100, "vw");
        confetti.style.background = colors[Math.floor(Math.random() * colors.length)];
        confetti.style.animationDelay = "".concat(Math.random() * 3, "s");
        confetti.style.animationDuration = "".concat(Math.random() * 3 + 2, "s");
        document.body.appendChild(confetti);
        setTimeout(function () { return confetti.remove(); }, 5000);
    };
    for (var i = 0; i < 50; i++) {
        _loop_1(i);
    }
}
function showWinnerAnimation(winner) {
    createConfetti();
    var winnerPopup = document.createElement('div');
    winnerPopup.className = 'winner-popup';
    winnerPopup.innerHTML = "\n        <h1>\uD83C\uDF89 ".concat(winner, " Wins! \uD83C\uDF89</h1>\n        <p>Congratulations on your victory!</p>\n    ");
    document.body.appendChild(winnerPopup);
    setTimeout(function () {
        winnerPopup.remove();
        resetGame();
        showScreen('startScreen');
    }, 3000);
}
function resetGame() {
    var _a, _b;
    tog = 1;
    p1sum = 0;
    p2sum = 0;
    gameMode = '';
    isComputerGame = false;
    playerColors = { p1: '#e74c3c', p2: '#f39c12' };
    playerNames = { p1: 'Player 1', p2: 'Player 2' };
    var p1 = document.getElementById('p1');
    var p2 = document.getElementById('p2');
    p1.style.left = '-62px';
    p1.style.top = '0px';
    p2.style.left = '-62px';
    p2.style.top = '-55px';
    var dice = document.getElementById('dice');
    dice.textContent = '🎲';
    var diceBtn = document.getElementById('diceBtn');
    if (diceBtn) {
        var newDiceBtn = diceBtn.cloneNode(true);
        (_a = diceBtn.parentNode) === null || _a === void 0 ? void 0 : _a.replaceChild(newDiceBtn, diceBtn);
    }
    var startGameBtn = document.getElementById('startGameBtn');
    var newStartGameBtn = startGameBtn.cloneNode(true);
    (_b = startGameBtn.parentNode) === null || _b === void 0 ? void 0 : _b.replaceChild(newStartGameBtn, startGameBtn);
    newStartGameBtn.classList.add('hidden');
}
