
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

  // Detect Xverse Wallet provider
  function detectXverseProvider() {
    if (typeof window.XverseProviders !== "undefined") {
      console.log("Xverse Wallet provider detected:", window.XverseProviders);
      return true;
    } else {
      console.warn("Xverse Wallet provider is not available in the browser.");
      showPopup("Xverse Wallet provider is not available. Please ensure Xverse Wallet is installed and active.");
      return false;
    }
  }

  // Dynamically log available methods in StacksProvider
  function logStacksProviderMethods() {
    const stacksProvider = window.XverseProviders?.StacksProvider;
    if (stacksProvider) {
      console.log("Available methods in StacksProvider:", Object.keys(stacksProvider).filter(key => typeof stacksProvider[key] === "function"));
    } else {
      console.warn("StacksProvider is not available.");
    }
  }

  // Simplified connection logic
  async function connectToXverse() {
    console.log("Connect button clicked - initiating Xverse Wallet connection...");
    if (!detectXverseProvider()) {
      return;
    }

    logStacksProviderMethods(); // Log available methods

    try {
      const stacksProvider = window.XverseProviders?.StacksProvider;

      if (stacksProvider && typeof stacksProvider.connect === "function") {
        console.log("Attempting connection using 'connect' method.");
        const response = await stacksProvider.connect({
          appDetails: {
            name: "MIDL Board Game",
            icon: "https://example.com/icon.png", // Replace with your app's icon URL
          },
        });

        console.log("Connection response:", response); // Debug log

        if (response && response.address) {
          userAddresses = {
            stacksAddress: response.address,
          };

          walletConnected = true;

          // Update UI
          connectButton.disabled = true;
          connectButton.classList.add("disabled");
          buidlButton.disabled = false;
          buidlButton.classList.remove("disabled");
          boost += 0.2;
          enableButtons([...onboardingButtons, ...questButtons]);
          updatePointsDisplay();

          showPopup(`Connected: ${userAddresses.stacksAddress.substring(0, 6)}...`);
        } else {
          console.error("Xverse Wallet connection failed:", response);
          showPopup("Failed to connect to Xverse Wallet. Please try again.");
        }
      } else {
        console.error("StacksProvider 'connect' method not available.");
        showPopup("Xverse Wallet does not support 'connect'. Please check the wallet's integration documentation.");
      }
    } catch (err) {
      console.error("Error connecting to Xverse Wallet:", err); // Debug log
      showPopup("An error occurred while connecting to Xverse Wallet.");
    }
  }

  // Attach the connect function to the button's click event
  connectButton.addEventListener("click", connectToXverse);
});
