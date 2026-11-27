import { setMinecraftColors } from './color.js';

let page = 0;
const button = document.getElementById("loadmore");


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

function updateLoadMore() {
  const grid = document.getElementById("grid");
  const count = grid.querySelectorAll(":scope > :not(.error404)").length;
  document.getElementById("loadmore").style.display = count > 0 ? "flex" : "none";
}


function fetchTerm(term) {
  // Define Variables
  button.style.backgroundImage = "url('https://housingbrowser.github.io/assets/buttons/load/bdown.png')";

  // Actual Function
  fetch(`https://host1.creepernet.qzz.io/c8ee103f/api/search?&term=${term}&page=${page}&limit=10`)
    .then(response => response.json())
    // Process the Data
    .then(data => {
      const grid = document.getElementById("grid");

      // https://housingbrowser.github.io/assets/sprites/404Balloon.png
      if (!data.houses?.length) {
        grid.innerHTML +=  `
        <div class='error404'>
        <img src="https://housingbrowser.github.io/assets/sprites/404Balloon.png" style="height: 145px">
        </div>
        `;
        button.style.backgroundImage = "url('https://housingbrowser.github.io/assets/buttons/load/bup.png')";
        updateLoadMore();

        return;
      }

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

window.fetchTerm = fetchTerm;
