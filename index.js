
document.addEventListener("DOMContentLoaded", () => {
    console.log("Game initialized!");

    let walletConnected = false;
    const connectButton = document.getElementById("connectButton");
    const pointsDisplay = document.getElementById("pointsDisplay");

    const connectFunctionality = () => {
        if (!walletConnected) {
            walletConnected = true;
            connectButton.textContent = "Connected";
            connectButton.disabled = true;
            pointsDisplay.textContent = "Points: 0 | BOOST: 0.2%";
            console.log("Wallet connected successfully!");
        } else {
            console.log("Wallet already connected.");
        }
    };

    connectButton.addEventListener("click", connectFunctionality);
});
