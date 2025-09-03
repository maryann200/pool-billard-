// Basic tests for the pool billiard game functionality
// Run these tests in the browser console to verify game mechanics

function runTests() {
    console.log("🧪 Running Pool Billiard Game Tests...");
    
    // Test 1: Initial game state
    test("Initial game state", () => {
        const initialMoney = gameState.virtualMoney;
        const initialGames = gameState.gamesPlayed;
        return initialMoney > 0 && initialGames >= 0;
    });
    
    // Test 2: Bet setting
    test("Bet setting functionality", () => {
        const oldBet = gameState.currentBet;
        setBet(100);
        const newBet = gameState.currentBet;
        setBet(oldBet); // Reset
        return newBet === 100;
    });
    
    // Test 3: Virtual money management
    test("Virtual money management", () => {
        const initialMoney = gameState.virtualMoney;
        addVirtualCoins();
        const newMoney = gameState.virtualMoney;
        return newMoney > initialMoney;
    });
    
    // Test 4: Game outcome calculation
    test("Game outcome calculation", () => {
        const outcome = calculateGameOutcome();
        return outcome && 
               typeof outcome.type === 'string' && 
               typeof outcome.multiplier === 'number' &&
               outcome.multiplier >= 0;
    });
    
    // Test 5: Ball initialization
    test("Ball initialization", () => {
        initializeBalls();
        return targetBalls.length > 0 && 
               cueBall.x > 0 && 
               cueBall.y > 0;
    });
    
    // Test 6: Local storage functionality
    test("Local storage save/load", () => {
        const originalMoney = gameState.virtualMoney;
        saveGameState();
        gameState.virtualMoney = 999;
        loadGameState();
        return gameState.virtualMoney === originalMoney;
    });
    
    console.log("✅ All tests completed!");
}

function test(name, testFunc) {
    try {
        const result = testFunc();
        console.log(result ? `✅ ${name}: PASSED` : `❌ ${name}: FAILED`);
        return result;
    } catch (error) {
        console.log(`❌ ${name}: ERROR - ${error.message}`);
        return false;
    }
}

// Export for browser console use
if (typeof window !== 'undefined') {
    window.runTests = runTests;
    window.test = test;
}