import Wallet from './js/index.mjs';

document.addEventListener("DOMContentLoaded", () => {
    const wallet = new Wallet();

    const connectButton = document.getElementById("connectButton");

    const connectToXverse = async () => {
        try {
            const response = await wallet.request("wallet_connect", {
                addresses: ["ordinals", "payment", "stacks"],
                message: "Connect your Xverse Wallet to MIDL Board Game",
            });
            console.log("Wallet connection response:", response);
        } catch (err) {
            console.error("Error during wallet connection:", err);
        }
    };

    connectButton.addEventListener("click", connectToXverse);
});
