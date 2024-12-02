
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

  // Wallet authentication logic with enhanced error handling
  async function authenticateWithXverse() {
    console.log("Connect button clicked - initiating Xverse Wallet authentication...");
    if (!detectXverseProvider()) {
      return;
    }

    try {
      const stacksProvider = window.XverseProviders?.StacksProvider;

      if (stacksProvider && typeof stacksProvider.authenticationRequest === "function") {
        console.log("Attempting authentication using 'authenticationRequest' method.");
        const response = await stacksProvider.authenticationRequest({
          redirectUri: "https://example.com/callback", // Replace with your app's callback URL
          appDetails: {
            name: "MIDL Board Game",
            icon: "https://example.com/icon.png", // Replace with your app's icon URL
          },
        });

        console.log("Raw response from authenticationRequest:", response); // Log raw response

        if (!response) {
          console.error("Empty or invalid response from authenticationRequest.");
          showPopup("Failed to authenticate. Empty response received.");
          return;
        }

        try {
          const parsedResponse = JSON.parse(response); // Parse response if needed
          console.log("Parsed response:", parsedResponse);

          if (parsedResponse && parsedResponse.address) {
            userAddresses = {
              stacksAddress: parsedResponse.address,
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
            console.error("Authentication failed - no address in response:", parsedResponse);
            showPopup("Authentication failed. No address found in the response.");
          }
        } catch (parseError) {
          console.error("Error parsing JSON response:", parseError);
          showPopup("Failed to parse authentication response.");
        }
      } else {
        console.error("StacksProvider 'authenticationRequest' method not available.");
        showPopup("Xverse Wallet does not support 'authenticationRequest'. Please check the wallet's integration documentation.");
      }
    } catch (err) {
      console.error("Error during Xverse Wallet authentication:", err); // Debug log
      showPopup("An error occurred during authentication with Xverse Wallet.");
    }
  }

  // Attach the authentication function to the button's click event
  connectButton.addEventListener("click", authenticateWithXverse);
});
