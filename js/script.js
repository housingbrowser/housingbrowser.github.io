import { setMinecraftColors } from './color.js';

async function getMinecraftUsername(uuid) {
  uuid = uuid.replace(/-/g, "");

  try {
      const response = await fetch(
          `https://mc-api.io/name/${uuid}`
      );

      if (!response.ok) return "??";

      const data = await response.json();
      return data.name;
  } catch {
      return "Unknown Player";
  }
}


let page = 0;
const button = document.getElementById("loadmore");

function fetchHomePage() {
  // Define Variables
  const seed = Math.floor(Math.random() * 1000000000);
  button.style.backgroundImage = "url('https://housingbrowser.github.io/assets/buttons/load/bdown.png')";

  // Actual Function
  fetch(`https://host1.creepernet.qzz.io/c8ee103f/api/homepage?seed=${seed}&page=${page}&limit=10`)
    .then(response => response.json())
    // Process the Data
    .then(data => {
      const grid = document.getElementById("grid");

      for (const h of data.houses) {
        const box = document.createElement("div");
          box.className = "house";
        // House Name
        const housename = document.createElement("div");
        housename.className = "housename";
        setMinecraftColors(housename, h.name)

        // Owner
        const owner = document.createElement("div");
        owner.className = "owner";
        owner.textContent = "Fetching Data";

        getMinecraftUsername(h.owner_uuid).then(username => {
          owner.textContent = "/visit " + username;
        });

        box.append(housename, owner);
        grid.appendChild(box);
      }
    grid.appendChild(document.getElementById("loadmore"));
    button.style.backgroundImage = "url('https://housingbrowser.github.io/assets/buttons/load/bup.png')";
    page++;
  });
}


// Add this to make it callable
window.fetchHomePage = fetchHomePage;
