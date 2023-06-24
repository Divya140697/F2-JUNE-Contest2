const apiURL =
  "https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=10&page=1&sparkline=false";

// Fetch data using .then syntax
fetch(apiURL)
  .then(response => response.json())
  .then(data => renderTable(data))
  .catch(error => console.log(error));

// Fetch data using async/await syntax
async function fetchData() {
  try {
    const response = await fetch(apiURL);
    const data = await response.json();
    renderTable(data);
  } catch (error) {
    console.log(error);
  }
}
fetchData();

function renderTable(data) {
  const tableBody = document.getElementById("tableBody");

  data.forEach(coin => {
    const row = document.createElement("tr");
    row.innerHTML = `
      <td>${coin.name}</td>
      <td>${coin.symbol}</td>
      <td>$${coin.current_price}</td>
      <td>$${coin.total_volume}</td>
      <td>$${coin.market_cap}</td>
      <td><img src="${coin.image}" alt="${coin.name}" /></td>
    `;
    tableBody.appendChild(row);
  });
}

// Search functionality
const searchButton = document.getElementById("searchButton");
searchButton.addEventListener("click", searchTable);

function searchTable() {
  const searchInput = document.getElementById("searchInput");
  const filter = searchInput.value.toLowerCase();
  const rows = document.querySelectorAll("#tableBody tr");

  rows.forEach(row => {
    const name = row.querySelector("td:nth-child(1)").textContent.toLowerCase();
    const symbol = row.querySelector("td:nth-child(2)").textContent.toLowerCase();

    if (name.includes(filter) || symbol.includes(filter
