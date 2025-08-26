// Types
type PlayerKey = 'p1' | 'p2';
type GameMode = 'userVsUser' | 'userVsComputer' | '';

interface ColorOption {
    name: string;
    value: string;
}

interface PlayerColors {
    p1: string;
    p2: string;
}

interface PlayerNames {
    p1: string;
    p2: string;
}

// Game state variables
let gameMode: GameMode = '';
let isComputerGame = false;
let playerColors: PlayerColors = { p1: '#e74c3c', p2: '#f39c12' };
let playerNames: PlayerNames = { p1: 'Player 1', p2: 'Player 2' };
let tog = 1;
let p1sum = 0;
let p2sum = 0;

// Audio elements
let rollingSound: HTMLAudioElement | null = null;
let winSound: HTMLAudioElement | null = null;

try {
    rollingSound = new Audio('rpg-dice-rolling-95182.mp3');
    winSound = new Audio('winharpsichord-39642.mp3');
} catch (e) {
    console.log('Audio files not found');
}

// Color options for players
const colorOptions: ColorOption[] = [
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
function showScreen(screenId: string): void {
    document.querySelectorAll('.screen').forEach(screen => {
        screen.classList.add('hidden');
    });
    document.getElementById(screenId)?.classList.remove('hidden');
}

// Initialize the game
document.addEventListener('DOMContentLoaded', () => {
    showScreen('startScreen');

    document.getElementById('playBtn')?.addEventListener('click', () => {
        showScreen('modeScreen');
    });

    document.getElementById('userVsUser')?.addEventListener('click', () => {
        gameMode = 'userVsUser';
        isComputerGame = false;
        setupColorSelection();
    });

    document.getElementById('userVsComputer')?.addEventListener('click', () => {
        gameMode = 'userVsComputer';
        isComputerGame = true;
        setupColorSelection();
    });

    document.getElementById('backToMenu')?.addEventListener('click', () => {
        resetGame();
        showScreen('startScreen');
    });
});

function setupColorSelection(): void {
    const colorContainer = document.getElementById('colorSelection') as HTMLElement;
    const colorTitle = document.getElementById('colorTitle') as HTMLElement;
    const startGameBtn = document.getElementById('startGameBtn') as HTMLButtonElement;

    colorContainer.innerHTML = '';

    const createColorOptions = (player: PlayerKey, label: string) => {
        const section = document.createElement('div');
        section.className = 'player-color-section';
        section.innerHTML = `<h3>${label}</h3>`;

        const colorDivs = document.createElement('div');
        colorDivs.className = 'color-options';

        colorOptions.forEach(color => {
            const div = document.createElement('div');
            div.className = 'color-option';
            div.style.backgroundColor = color.value;
            div.title = color.name;
            div.addEventListener('click', () => selectColor(player, color.value, div));
            colorDivs.appendChild(div);
        });

        section.appendChild(colorDivs);
        colorContainer.appendChild(section);
    };

    if (gameMode === 'userVsUser') {
        colorTitle.textContent = 'Choose Colors for Both Players';
        createColorOptions('p1', '👤 Player 1');
        createColorOptions('p2', '👤 Player 2');
    } else {
        colorTitle.textContent = 'Choose Your Color';
        playerNames.p2 = 'Computer';

        const section = document.createElement('div');
        section.className = 'player-color-section';
        section.innerHTML = '<h3>👤 Your Color</h3>';

        const colorDivs = document.createElement('div');
        colorDivs.className = 'color-options';

        colorOptions.forEach(color => {
            const div = document.createElement('div');
            div.className = 'color-option';
            div.style.backgroundColor = color.value;
            div.title = color.name;
            div.addEventListener('click', () => selectUserColor(color.value, div));
            colorDivs.appendChild(div);
        });

        section.appendChild(colorDivs);
        colorContainer.appendChild(section);
    }

    startGameBtn.addEventListener('click', startGame);
    showScreen('colorScreen');
}

function selectColor(player: PlayerKey, color: string, element: HTMLElement): void {
    playerColors[player] = color;
    element.parentElement?.querySelectorAll('.color-option').forEach(opt => opt.classList.remove('selected'));
    element.classList.add('selected');
    checkIfReadyToStart();
}

function selectUserColor(color: string, element: HTMLElement): void {
    playerColors.p1 = color;
    element.parentElement?.querySelectorAll('.color-option').forEach(opt => opt.classList.remove('selected'));
    element.classList.add('selected');

    const availableColors = colorOptions.filter(c => c.value !== color);
    const randomColor = availableColors[Math.floor(Math.random() * availableColors.length)];
    playerColors.p2 = randomColor.value;

    checkIfReadyToStart();
}

function checkIfReadyToStart(): void {
    const startGameBtn = document.getElementById('startGameBtn') as HTMLButtonElement;
    if (gameMode === 'userVsUser') {
        if (playerColors.p1 && playerColors.p2 && playerColors.p1 !== playerColors.p2) {
            startGameBtn.classList.remove('hidden');
        }
    } else {
        if (playerColors.p1) {
            startGameBtn.classList.remove('hidden');
        }
    }
}

function startGame(): void {
    (document.getElementById('p1') as HTMLElement).style.backgroundColor = playerColors.p1;
    (document.getElementById('p2') as HTMLElement).style.backgroundColor = playerColors.p2;

    updateTurnIndicator();
    showScreen('gameScreen');

    document.getElementById('diceBtn')?.addEventListener('click', rollDice);
}

function updateTurnIndicator(): void {
    const turnElement = document.getElementById('tog') as HTMLElement;
    if (tog % 2 !== 0) {
        turnElement.textContent = `${playerNames.p1}'s Turn`;
        turnElement.style.color = playerColors.p1;
    } else {
        turnElement.textContent = `${playerNames.p2}'s Turn`;
        turnElement.style.color = playerColors.p2;
    }
}

function rollDice(): void {
    rollingSound?.play();

    const diceElement = document.getElementById('dice') as HTMLElement;
    const diceNumbers = ['1', '2', '3', '4', '5', '6'];
    let rollCount = 0;

    const rollInterval = setInterval(() => {
        diceElement.textContent = diceNumbers[Math.floor(Math.random() * 6)];
        rollCount++;

        if (rollCount >= 10) {
            clearInterval(rollInterval);
            const finalNum = Math.floor(Math.random() * 6) + 1;
            diceElement.textContent = getDiceEmoji(finalNum);

            showMessage(`🎲 Rolled ${finalNum}!`, 1000);

            setTimeout(() => {
                if (tog % 2 !== 0) {
                    play('p1', 'p1sum', 0, finalNum);
                } else {
                    play('p2', 'p2sum', 55, finalNum);
                }

                tog++;
                updateTurnIndicator();

                if (isComputerGame && tog % 2 === 0) {
                    setTimeout(() => {
                        (document.getElementById('diceBtn') as HTMLButtonElement).click();
                    }, 2500);
                }
            }, 1200);
        }
    }, 100);
}

function getDiceEmoji(num: number): string {
    const diceEmojis = ['⚀', '⚁', '⚂', '⚃', '⚄', '⚅'];
    return diceEmojis[num - 1];
}

function play(player: PlayerKey, psum: 'p1sum' | 'p2sum', correction: number, num: number): void {
    let sum: number;

    if (psum === 'p1sum') {
        p1sum += num;
        if (p1sum > 100) p1sum -= num;
        p1sum = applySnakesAndLadders(p1sum);
        sum = p1sum;
    } else {
        p2sum += num;
        if (p2sum > 100) p2sum -= num;
        p2sum = applySnakesAndLadders(p2sum);
        sum = p2sum;
    }

    movePlayer(player, sum, correction);
}

function applySnakesAndLadders(position: number): number {
    const ladders: Record<number, number> = {
        1: 38, 4: 14, 8: 30, 21: 42, 28: 76, 50: 67, 71: 92, 80: 99
    };
    const snakes: Record<number, number> = {
        32: 10, 36: 6, 48: 26, 62: 18, 88: 24, 95: 56, 97: 78
    };

    if (ladders[position]) {
        setTimeout(() => showMessage(`🪜 Hooray! Ladder! Climb up! 🎉`, 1000), 1300);
        return ladders[position];
    }
    if (snakes[position]) {
        setTimeout(() => showMessage(`🐍 Oops! Snake bite! Slide down! 😱`, 1000), 1300);
        return snakes[position];
    }

    return position;
}

function movePlayer(player: PlayerKey, sum: number, correction: number): void {
    const element = document.getElementById(player) as HTMLElement;
    element.style.transition = 'all ease-in-out 1.2s';

    if (sum < 10) {
        element.style.left = `${(sum - 1) * 62}px`;
        element.style.top = `${0 * -62 - correction}px`;
    } else if (sum === 100) {
        winSound?.play();
        setTimeout(() => {
            const winner = player === 'p1' ? playerNames.p1 : playerNames.p2;
            showWinnerAnimation(winner);
        }, 1300);
    } else {
        const numStr = sum < 10 ? '0' + sum.toString() : sum.toString();
        const n1 = parseInt(numStr.charAt(0));
        const n2 = parseInt(numStr.charAt(1));

        const left = n1 % 2 !== 0
            ? (n2 === 0 ? 9 : 9 - (n2 - 1)) * 62
            : (n2 === 0 ? 0 : (n2 - 1)) * 62;
        const top = (-n1 + (n2 === 0 ? 1 : 0)) * 62 - correction;

        element.style.left = `${left}px`;
        element.style.top = `${top}px`;
    }
}

function showMessage(text: string, duration = 1500): void {
    const popup = document.createElement('div');
    popup.className = 'message-popup';
    popup.textContent = text;
    document.body.appendChild(popup);

    setTimeout(() => popup.remove(), duration);
}

function createConfetti(): void {
    const colors = ['#ff6b6b', '#4ecdc4', '#45b7d1', '#96ceb4', '#feca57', '#ff9ff3'];

    for (let i = 0; i < 50; i++) {
        const confetti = document.createElement('div');
        confetti.className = 'confetti';
        confetti.style.left = `${Math.random() * 100}vw`;
        confetti.style.background = colors[Math.floor(Math.random() * colors.length)];
        confetti.style.animationDelay = `${Math.random() * 3}s`;
        confetti.style.animationDuration = `${Math.random() * 3 + 2}s`;
        document.body.appendChild(confetti);

        setTimeout(() => confetti.remove(), 5000);
    }
}

function showWinnerAnimation(winner: string): void {
    createConfetti();

    const winnerPopup = document.createElement('div');
    winnerPopup.className = 'winner-popup';
    winnerPopup.innerHTML = `
        <h1>🎉 ${winner} Wins! 🎉</h1>
        <p>Congratulations on your victory!</p>
    `;
    document.body.appendChild(winnerPopup);

    setTimeout(() => {
        winnerPopup.remove();
        resetGame();
        showScreen('startScreen');
    }, 3000);
}

function resetGame(): void {
    tog = 1;
    p1sum = 0;
    p2sum = 0;
    gameMode = '';
    isComputerGame = false;
    playerColors = { p1: '#e74c3c', p2: '#f39c12' };
    playerNames = { p1: 'Player 1', p2: 'Player 2' };

    const p1 = document.getElementById('p1') as HTMLElement;
    const p2 = document.getElementById('p2') as HTMLElement;
    p1.style.left = '-62px';
    p1.style.top = '0px';
    p2.style.left = '-62px';
    p2.style.top = '-55px';

    const dice = document.getElementById('dice') as HTMLElement;
    dice.textContent = '🎲';

    const diceBtn = document.getElementById('diceBtn');
    if (diceBtn) {
        const newDiceBtn = diceBtn.cloneNode(true) as HTMLElement;
        diceBtn.parentNode?.replaceChild(newDiceBtn, diceBtn);
    }

    const startGameBtn = document.getElementById('startGameBtn') as HTMLButtonElement;
    const newStartGameBtn = startGameBtn.cloneNode(true) as HTMLButtonElement;
    startGameBtn.parentNode?.replaceChild(newStartGameBtn, startGameBtn);
    newStartGameBtn.classList.add('hidden');
}