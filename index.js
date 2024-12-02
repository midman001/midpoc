
import { request } from "sats-connect";

document.addEventListener("DOMContentLoaded", () => {
  let walletConnected = false;
  let points = 0;
  let boost = 0;
  let position = -1;
  let userAddresses = {};

  const connectButton = document.getElementById("connectButton");
  const pointsDisplay = document.getElementById("pointsDisplay");
  const buidlButton = document.getElementById("buidlButton");
  const popup = document.getElementById("popup");
  const onboardingButtons = [
    document.getElementById("acceptRules"),
    document.getElementById("joinCommunity"),
    document.getElementById("followX"),
    document.getElementById("joinDiscord"),
  ];
  const questButtons = [
    document.getElementById("quest1"),
    document.getElementById("quest2"),
    document.getElementById("quest3"),
  ];
  const board = document.getElementById("board");

  // Create the game board
  function createBoard() {
    if (!board) {
      console.error("Board element not found!");
      return;
    }
    for (let i = 0; i < 30; i++) {
      const square = document.createElement("div");
      square.classList.add("square");
      board.appendChild(square);
    }
  }

  createBoard();

  // Update points and BOOST display
  function updatePointsDisplay() {
    pointsDisplay.innerText = `Points: ${points} | BOOST: ${(boost * 100).toFixed(1)}%`;
  }

  // Show popup with auto-dismiss
  function showPopup(message) {
    popup.innerText = message;
    popup.classList.add("active");
    setTimeout(() => {
      popup.classList.remove("active");
    }, 3000);
  }

  // Enable buttons
  function enableButtons(buttons) {
    buttons.forEach((button) => {
      button.classList.add("enabled");
      button.classList.remove("disabled");
      button.disabled = false;
    });
  }

  // Connect to Xverse Wallet using wallet_connect
  async function connectToXverse() {
    console.log("Initiating wallet connection via wallet_connect...");

    try {
      const response = await request('wallet_connect', {
        addresses: ['ordinals', 'payment', 'stacks'],
        message: "Connect your Xverse Wallet to MIDL Board Game",
      });

      if (response.status === 'success') {
        console.log("Connection successful:", response.result.addresses);

        const paymentAddress = response.result.addresses.find(address => address.purpose === 'payment');
        const ordinalsAddress = response.result.addresses.find(address => address.purpose === 'ordinals');
        const stacksAddress = response.result.addresses.find(address => address.purpose === 'stacks');

        console.log("Payment Address:", paymentAddress);
        console.log("Ordinals Address:", ordinalsAddress);
        console.log("Stacks Address:", stacksAddress);

        walletConnected = true;

        // Update UI with connected status
        connectButton.disabled = true;
        connectButton.classList.add("disabled");
        buidlButton.disabled = false;
        buidlButton.classList.remove("disabled");
        boost += 0.2;
        enableButtons([...onboardingButtons, ...questButtons]);
        updatePointsDisplay();

        showPopup(`Connected: ${paymentAddress.address.substring(0, 6)}...`);
      } else {
        if (response.error.code === RpcErrorCode.USER_REJECTION) {
          console.warn("User rejected the connection.");
          showPopup("Connection rejected by the user.");
        } else {
          console.error("Connection error:", response.error);
          showPopup("An error occurred while connecting to the wallet.");
        }
      }
    } catch (error) {
      console.error("Error during wallet connection:", error);
      showPopup("Failed to connect to the wallet.");
    }
  }

  // Attach the connect function to the button's click event
  connectButton.addEventListener("click", connectToXverse);
});
