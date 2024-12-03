MIDL Board Game
A browser-based board game designed to engage players by completing quests while navigating a dynamic game board. The project includes wallet connection simulation, dynamic quest generation, and interactive gameplay elements.

Overview
The MIDL Board Game simulates blockchain interactions using simple game mechanics. Players progress through a board, completing quests and earning points as they go. The game includes dynamic elements, such as daily quests tied to the player’s current board position.

Detailed Functionality
1. Wallet Connection (Connect Button)
Description: Simulates connecting a wallet.
Behavior:
Initially enabled.
When clicked:
Changes text to Connected.
Disables itself to prevent re-clicking.
Unlocks other buttons (e.g., BUIDL button).
Updates the Points Display to reflect a default boost of 0.2%.
Code Behavior:
Sets a walletConnected flag to true.
Logs a success message to the console.
Dependencies:
Disables itself after being clicked.
2. Points Display
Description: Displays the player's current points and boost multiplier.
Initial State:
Points: 0 | BOOST: 0.0%.
Behavior:
Updates dynamically based on player actions (e.g., clicking BUIDL or completing quests).
3. BUIDL Button
Description: Central gameplay button for moving forward on the board and generating quests.
Behavior:
Initially disabled.
Enabled upon wallet connection.
When clicked:
Advances the player by one square on the board.
Triggers the creation of a new Daily BUIDL Quest based on the player's current square.
Updates Points Display with:
Points earned: 100 * Current Square Number.
Boost remains constant at 0.2%.
Daily Quest Logic:
Clears the previous daily quest.
Creates a new daily quest named: "Daily Quest: Block [Current Square Number]".
Adds functionality for the player to interact with the quest (see Daily BUIDL Quest).
Code Behavior:
Increments a currentSquare variable.
4. Available Quests Section
Description: Placeholder section for predefined quests.
Behavior:
Initially empty.
Designed for static or dynamically generated quests.
5. Daily BUIDL Quest Section
Description: Dynamically generated quest tied to the player’s progress on the board.
Behavior:
Displays the current block number as a quest name (Daily Quest: Block X).
Replaces the previous quest when a new one is created.
Includes a button for the player to interact.
Quest Button Behavior:
Logs the completion of the quest to the console.
Updates Points Display with the player's earned points (100 * Block Number).
Code Behavior:
Created dynamically within the JavaScript.
HTML Structure
html
Copy code
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>MIDL Board Game</title>
  <style>
    body {
      margin: 0;
      font-family: Arial, sans-serif;
      background-color: #1a1a1a;
      color: white;
    }
    .header {
      display: flex;
      justify-content: space-between;
      align-items: center;
      background-color: black;
      padding: 10px;
    }
    .header img {
      height: 40px;
    }
    .connect-button {
      padding: 5px 15px;
      background-color: orange;
      color: white;
      border: none;
      border-radius: 5px;
      cursor: pointer;
    }
    .main-container {
      display: flex;
      flex-direction: column;
      padding: 20px;
      gap: 20px;
    }
    .section {
      padding: 10px;
      background-color: #2a2a2a;
      border-radius: 8px;
    }
    .quest-button {
      padding: 10px 15px;
      background-color: orange;
      color: white;
      border: none;
      border-radius: 5px;
      cursor: pointer;
    }
  </style>
</head>
<body>
  <div class="header">
    <img src="images/logo.png" alt="MIDL Logo">
    <div class="right-section">
      <div id="pointsDisplay">Points: 0 | BOOST: 0.0%</div>
      <button id="connectButton" class="connect-button">Connect</button>
    </div>
  </div>
  <div class="main-container">
    <div id="availableQuestSection" class="section">
      <h3>Available Quests</h3>
    </div>
    <div id="dailyQuestSection" class="section">
      <h3>Daily BUIDL Quest</h3>
    </div>
    <button id="buidlButton" class="quest-button disabled">BUIDL</button>
  </div>
  <div id="popup" class="popup"></div>

  <script src="index.js"></script>
</body>
</html>
JavaScript Logic
javascript
Copy code
document.addEventListener("DOMContentLoaded", () => {
    console.log("Game initialized!");

    let walletConnected = false;
    let currentSquare = 0;
    const connectButton = document.getElementById("connectButton");
    const pointsDisplay = document.getElementById("pointsDisplay");
    const buidlButton = document.getElementById("buidlButton");
    const dailyQuestSection = document.getElementById("dailyQuestSection");

    const unlockButtons = () => {
        buidlButton.disabled = false;
        buidlButton.classList.remove("disabled");
        console.log("All buttons unlocked and ready!");
    };

    const connectFunctionality = () => {
        if (!walletConnected) {
            walletConnected = true;
            connectButton.textContent = "Connected";
            connectButton.disabled = true;
            pointsDisplay.textContent = "Points: 0 | BOOST: 0.2%";
            unlockButtons();
            console.log("Wallet connected successfully!");
        } else {
            console.log("Wallet already connected.");
        }
    };

    const createDailyQuest = (blockNumber) => {
        dailyQuestSection.innerHTML = "";
        const dailyQuest = document.createElement("button");
        dailyQuest.textContent = `Daily Quest: Block ${blockNumber}`;
        dailyQuest.classList.add("quest-button");
        dailyQuest.addEventListener("click", () => {
            console.log(`Daily Quest for Block ${blockNumber} completed!`);
            pointsDisplay.textContent = `Points: ${blockNumber * 100} | BOOST: 0.2%`;
        });
        dailyQuestSection.appendChild(dailyQuest);
    };

    buidlButton.addEventListener("click", () => {
        if (!walletConnected) {
            console.log("Connect your wallet first!");
            return;
        }
        currentSquare++;
        createDailyQuest(currentSquare);
    });

    connectButton.addEventListener("click", connectFunctionality);
});