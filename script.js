
// Multiplayer logic using localStorage and a shared JSON file

const gameStateURL = "game_state.json";

let playerData = null;

// Initialize player data and store in localStorage
function initializePlayer(playerName) {
    const playerId = generatePlayerId();
    playerData = {
        playerId: playerId,
        name: playerName,
        score: 0,
        boost: 1.0,
        exceptionalBoost: 0,
        referralBoost: 0,
        leaderboardPosition: 0,
        weeklyLeaderboardPosition: 0,
        refereeCount: 0,
        position: 0
    };
    localStorage.setItem("playerData", JSON.stringify(playerData));
    updatePlayerNameDisplay();
    setConnectButtonState("connected");
    unlockButtons();
    createBoard();
    syncWithServer();
    updateReferralSection();
}

// Generate a unique player ID
function generatePlayerId() {
    return "player" + Math.random().toString(36).substr(2, 9);
}

// Update the player's name display in the UI
function updatePlayerNameDisplay() {
    const playerNameElement = document.getElementById("playerNameDisplay");
    if (playerNameElement && playerData) {
        playerNameElement.textContent = `Welcome, ${playerData.name}!`;
    }
}

// Update the referral section
function updateReferralSection() {
    const playerIdElement = document.getElementById("playerId");
    const refereeCountValue = document.getElementById("refereeCountValue");

    if (playerData) {
        playerIdElement.textContent = playerData.playerId;
        playerIdElement.style.cursor = "pointer";
        playerIdElement.addEventListener("click", () => {
            navigator.clipboard.writeText(playerData.playerId);
            alert("Referral code copied to clipboard!");
        });

        refereeCountValue.textContent = playerData.refereeCount;
    }
}

// Sync local player data with shared JSON and update referral count
async function syncWithServer() {
    try {
        const response = await fetch(gameStateURL);
        const gameState = await response.json();

        // Update the shared JSON file with the current player's data
        gameState.players[playerData.playerId] = playerData;

        // Update referral section dynamically
        updateReferralSection();

        await updateGameState(gameState);
    } catch (error) {
        console.error("Error syncing with server:", error);
    }
}

// Handle Connect Button click
function handleConnect() {
    const playerName = prompt("Enter your player name:");
    if (playerName) {
        initializePlayer(playerName);
    }
}

// Attach event listener to Connect button
document.getElementById("connectButton").addEventListener("click", handleConnect);

// Initial setup
syncWithServer();
