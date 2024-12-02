
document.addEventListener("DOMContentLoaded", () => {
    console.log("satsConnect:", window.satsConnect);

    if (!window.satsConnect || typeof window.satsConnect.request !== "function") {
        console.error("satsConnect is not properly loaded.");
        alert("Error: satsConnect library is not available.");
        return;
    }

    const connectToXverse = async () => {
        try {
            const response = await window.satsConnect.request('wallet_connect', {
                addresses: ['ordinals', 'payment', 'stacks'],
                message: "Connect your Xverse Wallet to MIDL Board Game",
            });
            console.log("Response:", response);
        } catch (err) {
            console.error("Error during wallet connection:", err);
        }
    };

    document.getElementById("connectButton").addEventListener("click", connectToXverse);
});
