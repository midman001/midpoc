
let walletConnected = false;
let points = 0;
let boost = 0;
let position = -1;

const connectButton = document.getElementById("connectButton");
const pointsDisplay = document.getElementById("pointsDisplay");
const buidlButton = document.getElementById("buidlButton");
const popup = document.getElementById("popup");
const onboardingQuests = [
    { button: document.getElementById("acceptRules"), message: "Rules accepted! +20% BOOST added.", boostIncrease: 0.2 },
    { button: document.getElementById("joinCommunity"), message: "Joined X Community! +20% BOOST added.", boostIncrease: 0.2 },
    { button: document.getElementById("followX"), message: "Followed on X! +20% BOOST added.", boostIncrease: 0.2 },
    { button: document.getElementById("joinDiscord"), message: "Joined Discord! +20% BOOST added.", boostIncrease: 0.2 },
];

const availableQuests = [
    { button: document.getElementById("quest1"), message: "Like/RT/Comment quest completed! BOOST increased by 10%." },
    { button: document.getElementById("quest2"), message: "BTC article quiz completed! BOOST increased by 10%." },
    { button: document.getElementById("quest3"), message: "MIDL Partner followed! BOOST increased by 10%." },
];

const dailyQuestSection = document.getElementById("dailyQuestSection");
const board = document.getElementById("board");

function updatePointsDisplay() {
    pointsDisplay.innerText = `Points: ${points} | BOOST: ${(boost * 100).toFixed(1)}%`;
}

function showPopup(message) {
    popup.innerText = message;
    popup.classList.add("active");
    setTimeout(() => {
        popup.classList.remove("active");
    }, 3000);
}

function enableButtons(quests) {
    quests.forEach((quest) => {
        quest.button.classList.add("enabled");
        quest.button.classList.remove("disabled");
        quest.button.disabled = false;
    });
}

function handleQuestClick(button, message, boostIncrease) {
    button.remove();
    if (boostIncrease) {
        boost += boostIncrease;
    } else {
        boost *= 1.1;
    }
    updatePointsDisplay();
    showPopup(message);
}

function createDailyQuest(blockNumber) {
    dailyQuestSection.innerHTML = '<div class="section-title">Daily BUIDL Quest</div>';
    const dailyQuest = document.createElement("button");
    dailyQuest.textContent = `Daily Quest: Block ${blockNumber}`;
    dailyQuest.classList.add("quest-button", "enabled");
    dailyQuest.addEventListener("click", () => handleQuestClick(dailyQuest, `Daily Quest for Block ${blockNumber} completed! BOOST increased by 10%.`));
    dailyQuestSection.appendChild(dailyQuest);
}

function createBoard() {
    for (let i = 0; i < 30; i++) {
        const square = document.createElement("div");
        square.classList.add("square");
        board.appendChild(square);
    }
}

function handleConnectButtonClick() {
    if (!walletConnected) {
        walletConnected = true;
        connectButton.disabled = true;
        connectButton.classList.add("disabled");
        enableButtons(onboardingQuests);
        enableButtons(availableQuests);
        buidlButton.disabled = false;
        buidlButton.classList.remove("disabled");

        onboardingQuests.forEach((quest) => {
            quest.button.addEventListener("click", () => handleQuestClick(quest.button, quest.message, quest.boostIncrease));
        });

        availableQuests.forEach((quest) => {
            quest.button.addEventListener("click", () => handleQuestClick(quest.button, quest.message, null));
        });

        boost += 0.2;
        updatePointsDisplay();
        showPopup("Wallet connected! +20% BOOST");
    }
}

function handleBuidlButtonClick() {
    if (!walletConnected) {
        showPopup("Connect your wallet first!");
        return;
    }
    position += 1;
    points += Math.round(100 * boost);
    const squares = document.querySelectorAll(".square");
    if (squares[position]) {
        squares[position].classList.add("completed");
    }
    createDailyQuest(position + 1);
    updatePointsDisplay();
    showPopup(`BUIDL Successful! Points earned: ${Math.round(100 * boost)}`);
}

connectButton.addEventListener("click", handleConnectButtonClick);
buidlButton.addEventListener("click", handleBuidlButtonClick);
createBoard();
