const ipForm = document.getElementById("ipForm");
const ipList = document.getElementById("ipList");
const searchInput = document.getElementById("patentSearchInput");
let ipPortfolio = [];

// Event listener to add IP to portfolio
ipForm.addEventListener("submit", function (e) {
  e.preventDefault();

  // Get input values
  const title = document.getElementById("ipTitle").value;
  const type = document.getElementById("ipType").value;
  const date = document.getElementById("ipDate").value;
  const description = document.getElementById("ipDescription").value;

  // Create IP object and add to portfolio array
  const newIP = { title, type, date, description };
  ipPortfolio.push(newIP);

  // Update the displayed IP list
  renderIPList();

  // Save to local storage
  saveToLocalStorage();

  // Clear form
  ipForm.reset();
});

// Function to render the IP list
function renderIPList(list = ipPortfolio) {
  ipList.innerHTML = ""; // Clear previous items

  list.forEach((ip, index) => {
    const ipItem = document.createElement("div");
    ipItem.classList.add(
      "p-4",
      "border",
      "border-gray-300",
      "rounded",
      "bg-gray-50",
      "space-y-2"
    );
    ipItem.innerHTML = `
      <h3 class="text-lg font-semibold">${ip.title}</h3>
      <p>Type: ${ip.type}</p>
      <p>Date: ${ip.date}</p>
      <p>Description: ${ip.description}</p>
      <button onclick="removeIP(${index})" class="bg-red-500 text-white p-2 rounded hover:bg-red-600">Remove</button>
    `;
    ipList.appendChild(ipItem);
  });
}

// Function to remove IP from list
function removeIP(index) {
  ipPortfolio.splice(index, 1);
  renderIPList();
  saveToLocalStorage();
}

// Save portfolio to local storage
function saveToLocalStorage() {
  localStorage.setItem("ipPortfolio", JSON.stringify(ipPortfolio));
}

// Load portfolio from local storage
function loadFromLocalStorage() {
  const savedData = localStorage.getItem("ipPortfolio");
  if (savedData) {
    ipPortfolio = JSON.parse(savedData);
    renderIPList();
  }
}

// Load stored data on page load
window.onload = loadFromLocalStorage;

// Function to search IP portfolio
function searchIP() {
  const query = searchInput.value.toLowerCase();

  if (query) {
    const filteredIP = ipPortfolio.filter(
      (ip) =>
        ip.title.toLowerCase().includes(query) ||
        ip.type.toLowerCase().includes(query) ||
        ip.date.toLowerCase().includes(query) ||
        ip.description.toLowerCase().includes(query)
    );

    renderIPList(filteredIP);
  } else {
    renderIPList(ipPortfolio);
  }
}

// Event listener for search input
searchInput.addEventListener("input", searchIP);
