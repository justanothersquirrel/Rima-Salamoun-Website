// ---- Data ----
const artworks = [
  { title: "Untitled I", year: "2006", medium: "Acrylic & gold leaf on canvas", dimensions: "80 × 80 cm", image: "images/2006-01.jpg" },
  { title: "Untitled II", year: "2006", medium: "Acrylic & gold leaf on canvas", dimensions: "80 × 80 cm", image: "images/2006-02.jpg" },
  { title: "Untitled III", year: "2005", medium: "Oil on canvas", dimensions: "60 × 90 cm", image: "images/2005-01.jpg" },
];

// ---- Element references ----
const navLinks = document.querySelectorAll("nav a[data-view], .site-name a[data-view]");
const content = document.getElementById("content");
const dropdown = document.getElementById("year-dropdown");
const trigger = document.querySelector(".dropdown-trigger");

// ---- View router ----
const views = {
  "Selected Works": renderSelectedWorks,
  "Artworks": renderArtworks,
  "publications": renderPublications,
  "info": renderInfo,
};

// ---- Nav clicks ----
navLinks.forEach((link) => {
  link.addEventListener("click", (event) => {
    event.preventDefault();
    navLinks.forEach((l) => l.classList.remove("active"));
    link.classList.add("active");
    views[link.dataset.view]();
  });
});

// ---- Dropdown toggle ----
trigger.addEventListener("click", (event) => {
  event.preventDefault();
  event.stopPropagation();
  navLinks.forEach((l) => l.classList.remove("active"));
  dropdown.classList.toggle("open");
});

document.addEventListener("click", () => {
  dropdown.classList.remove("open");
});

// ---- Dropdown build ----
function buildYearDropdown() {
  const years = [...new Set(artworks.map((a) => a.year))].sort().reverse();

  dropdown.innerHTML = years
    .map((year) => `<li><a href="#" data-year="${year}">${year}</a></li>`)
    .join("");
}

// ---- Render functions ----
function renderSelectedWorks() {
  content.innerHTML = "<p>Selected works go here.</p>";
}

function renderArtworks() {
  content.innerHTML = `
    <div class="grid">
      ${artworks.map((art) => `
        <div class="grid-item">
          <img src="${art.image}" alt="${art.title}">
        </div>
      `).join("")}
    </div>
  `;
}

function renderArtworksByYear(year) {
  const filtered = artworks.filter((a) => a.year === year);
  content.innerHTML = `
    <div class="grid">
      ${filtered.map((art) => `
        <div class="grid-item">
          <img src="${art.image}" alt="${art.title}">
        </div>
      `).join("")}
    </div>
  `;
}

function renderPublications() {
  content.innerHTML = "<p>Publications go here.</p>";
}

function renderInfo() {
  content.innerHTML = "<p>Info goes here.</p>";
}

// ---- Init ----
buildYearDropdown();

const yearLinks = dropdown.querySelectorAll("a");

yearLinks.forEach((link) => {
  link.addEventListener("click", (event) => {
    event.preventDefault();
    yearLinks.forEach((l) => l.classList.remove("active"));
    link.classList.add("active");
    renderArtworksByYear(link.dataset.year);
  });
});

renderArtworks();