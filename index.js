
document.addEventListener("DOMContentLoaded", () => {
    console.log("Game initialized!");

    let walletConnected = false;
    const connectButton = document.getElementById("connectButton");
    const pointsDisplay = document.getElementById("pointsDisplay");
    const buidlButton = document.getElementById("buidlButton");

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

    buidlButton.addEventListener("click", () => {
        console.log("BUIDL button clicked!");
        pointsDisplay.textContent = "Points: 100 | BOOST: 0.2%";
    });

    connectButton.addEventListener("click", connectFunctionality);
});
