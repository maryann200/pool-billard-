// Game state variables
let gameState = {
    virtualMoney: 1000,
    currentBet: 50,
    gamesPlayed: 0,
    gameInProgress: false,
    earningsHistory: []
};

// Pool table and game variables
let canvas, ctx;
let balls = [];
let cueBall = { x: 200, y: 200, radius: 10, color: 'white' };
let targetBalls = [];

// Initialize the game when page loads
window.onload = function() {
    initializeGame();
    loadGameState();
    updateDisplay();
};

function initializeGame() {
    canvas = document.getElementById('poolTable');
    ctx = canvas.getContext('2d');
    
    // Initialize pool table with balls
    initializeBalls();
    drawTable();
    
    console.log('Pool Billiard Virtual Casino Game Initialized');
}

function initializeBalls() {
    // Clear existing balls
    targetBalls = [];
    
    // Create target balls in triangle formation
    const ballRadius = 12;
    const startX = 600;
    const startY = 180;
    const colors = ['red', 'yellow', 'blue', 'purple', 'orange', 'green', 'maroon', 'black'];
    
    let ballCount = 0;
    for (let row = 0; row < 3; row++) {
        for (let col = 0; col <= row; col++) {
            if (ballCount < 8) {
                targetBalls.push({
                    x: startX + row * (ballRadius * 2),
                    y: startY + (col - row/2) * (ballRadius * 2),
                    radius: ballRadius,
                    color: colors[ballCount],
                    number: ballCount + 1,
                    potted: false
                });
                ballCount++;
            }
        }
    }
    
    // Reset cue ball position
    cueBall.x = 200;
    cueBall.y = 200;
}

function drawTable() {
    // Clear canvas
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    
    // Draw table felt
    ctx.fillStyle = '#228B22';
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    
    // Draw table borders
    ctx.strokeStyle = '#8B4513';
    ctx.lineWidth = 8;
    ctx.strokeRect(0, 0, canvas.width, canvas.height);
    
    // Draw pockets
    const pocketRadius = 25;
    const pockets = [
        {x: 0, y: 0}, {x: canvas.width/2, y: 0}, {x: canvas.width, y: 0},
        {x: 0, y: canvas.height}, {x: canvas.width/2, y: canvas.height}, {x: canvas.width, y: canvas.height}
    ];
    
    ctx.fillStyle = '#000';
    pockets.forEach(pocket => {
        ctx.beginPath();
        ctx.arc(pocket.x, pocket.y, pocketRadius, 0, Math.PI * 2);
        ctx.fill();
    });
    
    // Draw cue ball
    if (!cueBall.potted) {
        ctx.beginPath();
        ctx.arc(cueBall.x, cueBall.y, cueBall.radius, 0, Math.PI * 2);
        ctx.fillStyle = cueBall.color;
        ctx.fill();
        ctx.strokeStyle = '#000';
        ctx.lineWidth = 2;
        ctx.stroke();
    }
    
    // Draw target balls
    targetBalls.forEach(ball => {
        if (!ball.potted) {
            ctx.beginPath();
            ctx.arc(ball.x, ball.y, ball.radius, 0, Math.PI * 2);
            ctx.fillStyle = ball.color;
            ctx.fill();
            ctx.strokeStyle = '#000';
            ctx.lineWidth = 2;
            ctx.stroke();
            
            // Draw ball number
            ctx.fillStyle = 'white';
            ctx.font = '10px Arial';
            ctx.textAlign = 'center';
            ctx.fillText(ball.number, ball.x, ball.y + 3);
        }
    });
}

function setBet(amount) {
    if (gameState.gameInProgress) {
        showMessage("Finish current game before changing bet!");
        return;
    }
    
    if (amount > gameState.virtualMoney) {
        showMessage("Not enough virtual coins for this bet!");
        return;
    }
    
    gameState.currentBet = amount;
    updateDisplay();
    showMessage(`Bet set to ${amount} virtual coins!`);
}

function shootBall() {
    if (gameState.gameInProgress) {
        showMessage("Game already in progress!");
        return;
    }
    
    if (gameState.currentBet > gameState.virtualMoney) {
        showMessage("Not enough virtual coins for this bet!");
        return;
    }
    
    // Start game
    gameState.gameInProgress = true;
    gameState.virtualMoney -= gameState.currentBet;
    
    // Simulate ball movement and game outcome
    simulateShot();
}

function simulateShot() {
    showMessage("Shooting cue ball...");
    
    // Animate cue ball movement
    const targetX = 400 + Math.random() * 200;
    const targetY = 150 + Math.random() * 100;
    
    animateBall(cueBall, targetX, targetY, () => {
        // Calculate game outcome
        const outcome = calculateGameOutcome();
        processGameResult(outcome);
    });
}

function animateBall(ball, targetX, targetY, callback) {
    const startX = ball.x;
    const startY = ball.y;
    const distance = Math.sqrt((targetX - startX) ** 2 + (targetY - startY) ** 2);
    const steps = 30;
    const stepX = (targetX - startX) / steps;
    const stepY = (targetY - startY) / steps;
    
    let currentStep = 0;
    
    const animate = () => {
        if (currentStep < steps) {
            ball.x = startX + stepX * currentStep;
            ball.y = startY + stepY * currentStep;
            drawTable();
            currentStep++;
            setTimeout(animate, 50);
        } else {
            ball.x = targetX;
            ball.y = targetY;
            drawTable();
            if (callback) callback();
        }
    };
    
    animate();
}

function calculateGameOutcome() {
    // Simulate different game outcomes with probabilities
    const random = Math.random();
    
    if (random < 0.15) {
        // Jackpot - pot multiple balls
        const ballsPotted = 2 + Math.floor(Math.random() * 3);
        return {
            type: 'jackpot',
            ballsPotted: ballsPotted,
            multiplier: ballsPotted * 2,
            message: `🎉 JACKPOT! Potted ${ballsPotted} balls!`
        };
    } else if (random < 0.35) {
        // Good shot - pot 1 ball
        return {
            type: 'win',
            ballsPotted: 1,
            multiplier: 2,
            message: `🎯 Great shot! Potted 1 ball!`
        };
    } else if (random < 0.55) {
        // Break even - close shot
        return {
            type: 'draw',
            ballsPotted: 0,
            multiplier: 1,
            message: `😐 Close shot! Bet returned.`
        };
    } else {
        // Miss - lose bet
        return {
            type: 'loss',
            ballsPotted: 0,
            multiplier: 0,
            message: `😞 Missed! Better luck next time.`
        };
    }
}

function processGameResult(outcome) {
    // Calculate winnings
    const winnings = gameState.currentBet * outcome.multiplier;
    const profit = winnings - gameState.currentBet;
    
    // Update game state
    gameState.virtualMoney += winnings;
    gameState.gamesPlayed++;
    gameState.gameInProgress = false;
    
    // Update visual balls based on outcome
    if (outcome.ballsPotted > 0) {
        for (let i = 0; i < outcome.ballsPotted && i < targetBalls.length; i++) {
            if (!targetBalls[i].potted) {
                targetBalls[i].potted = true;
            }
        }
    }
    
    // Add to earnings history
    const historyEntry = {
        bet: gameState.currentBet,
        outcome: outcome.type,
        profit: profit,
        message: outcome.message,
        timestamp: new Date().toLocaleTimeString()
    };
    
    gameState.earningsHistory.unshift(historyEntry);
    if (gameState.earningsHistory.length > 10) {
        gameState.earningsHistory.pop();
    }
    
    // Update display
    updateDisplay();
    drawTable();
    showMessage(outcome.message + ` Winnings: ${winnings} coins (Profit: ${profit >= 0 ? '+' : ''}${profit})`);
    
    // Save game state
    saveGameState();
    
    // Check if player is out of money
    if (gameState.virtualMoney < Math.min(25, gameState.currentBet)) {
        setTimeout(() => {
            showMessage("Running low on virtual coins! Click 'Add Virtual Coins' to continue playing.");
        }, 2000);
    }
}

function startNewGame() {
    if (gameState.gameInProgress) {
        showMessage("Finish current game first!");
        return;
    }
    
    // Reset the table
    initializeBalls();
    drawTable();
    showMessage("New game started! Place your bet and shoot!");
}

function addVirtualCoins() {
    gameState.virtualMoney += 500;
    updateDisplay();
    showMessage("Added 500 virtual coins! 💰");
    saveGameState();
}

function updateDisplay() {
    document.getElementById('virtualMoney').textContent = gameState.virtualMoney;
    document.getElementById('currentBet').textContent = gameState.currentBet;
    document.getElementById('gamesPlayed').textContent = gameState.gamesPlayed;
    
    // Update earnings history
    const historyList = document.getElementById('earningsHistory');
    historyList.innerHTML = '';
    
    gameState.earningsHistory.forEach(entry => {
        const li = document.createElement('li');
        li.className = entry.profit >= 0 ? 'win' : 'loss';
        li.innerHTML = `
            <strong>${entry.timestamp}</strong> - ${entry.message}<br>
            Bet: ${entry.bet} | Profit: ${entry.profit >= 0 ? '+' : ''}${entry.profit} coins
        `;
        historyList.appendChild(li);
    });
}

function showMessage(message) {
    document.getElementById('gameMessage').textContent = message;
}

function saveGameState() {
    localStorage.setItem('poolBilliardGameState', JSON.stringify(gameState));
}

function loadGameState() {
    const saved = localStorage.getItem('poolBilliardGameState');
    if (saved) {
        const loadedState = JSON.parse(saved);
        gameState = { ...gameState, ...loadedState };
    }
}

// Add some educational information
function showGameInfo() {
    alert(`
🎱 Pool Billiard Virtual Casino - How to Play:

1. Set your virtual bet using the betting buttons
2. Click "Shoot Ball" to take your shot
3. Earn virtual coins based on how many balls you pot:
   - Jackpot (2+ balls): 4x-10x multiplier
   - Good shot (1 ball): 2x multiplier  
   - Close shot: 1x multiplier (bet returned)
   - Miss: 0x multiplier (lose bet)

4. Manage your virtual bankroll and try to grow your coins!

Remember: This is for educational purposes only - no real money involved!
    `);
}

// Initialize game info on first load
setTimeout(() => {
    if (gameState.gamesPlayed === 0) {
        showMessage("Welcome! This is a virtual casino game for educational purposes. Click any bet amount to start!");
    }
}, 1000);