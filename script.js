// ---- Data ----
const artworks = [
  {
    title: "title",
    year: "2006",
    medium: "Acrylic & gold leaf on canvas",
    dimensions: "80 × 80 cm",
    image: "2006/001.jpg",
  },
  {
    title: "title",
    year: "2006",
    medium: "Acrylic & gold leaf on canvas",
    dimensions: "80 × 80 cm",
    image: "2006/002.jpg",
  },
  {
    title: "title",
    year: "2006",
    medium: "Acrylic & gold leaf on canvas",
    dimensions: "80 × 80 cm",
    image: "2006/003.jpg",
  },
  {
    title: "title",
    year: "2006",
    medium: "Acrylic & gold leaf on canvas",
    dimensions: "80 × 80 cm",
    image: "2006/004.jpg",
  },
  {
    title: "title",
    year: "2006",
    medium: "Acrylic & gold leaf on canvas",
    dimensions: "80 × 80 cm",
    image: "2006/005.jpg",
  },
  {
    title: "title",
    year: "2006",
    medium: "Acrylic & gold leaf on canvas",
    dimensions: "80 × 80 cm",
    image: "2006/006.jpg",
  },
  {
    title: "title",
    year: "2006",
    medium: "Acrylic & gold leaf on canvas",
    dimensions: "80 × 80 cm",
    image: "2006/007.jpg",
  },
  {
    title: "title",
    year: "2006",
    medium: "Acrylic & gold leaf on canvas",
    dimensions: "80 × 80 cm",
    image: "2006/008.jpg",
  },
  {
    title: "title",
    year: "2006",
    medium: "Acrylic & gold leaf on canvas",
    dimensions: "120 × 100 cm",
    image: "2006/010.jpg",
  },
];

// ---- Element references ----
const navLinks = document.querySelectorAll(
  "nav a[data-view], .site-name a[data-view]",
);
const content = document.getElementById("content");
const dropdown = document.getElementById("year-dropdown");
const trigger = document.querySelector(".dropdown-trigger");
const lightbox = document.getElementById("lightbox");
const lightboxImg = document.getElementById("lightbox-img");
const lightboxCaption = document.getElementById("lightbox-caption");
const magnifier = document.getElementById("magnifier");
const zoom = 2.5;

// ---- View router ----
const views = {
  "Selected Works": renderSelectedWorks,
  Artworks: renderArtworks,
  publications: renderPublications,
  info: renderInfo,
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

// ---- Lightbox ----
function attachImageClicks(artworkList) {
  document.querySelectorAll(".image-box img").forEach((img, index) => {
    img.addEventListener("click", () => {
      const art = artworkList[index];
      lightboxImg.src = art.image;
      lightboxCaption.innerHTML = `
        <p class="gallery-caption-content">
          '${art.title}'<br>
          ${art.medium}, ${art.dimensions}, ${art.year}.
        </p>
      `;
      lightbox.classList.add("open");
    });
  });
}

lightbox.addEventListener("click", () => {
  lightbox.classList.remove("open");
});

// ---- Render functions ----
function renderSelectedWorks() {
  content.innerHTML = "<p>Selected works go here.</p>";
}

function renderArtworks() {
  content.innerHTML = `
    <div class="grid">
      ${artworks
        .map(
          (art) => `
        <div class="grid-item">
          <div class="image-box">
            <img src="${art.image}" alt="${art.title}">
          </div>
          <p class="grid-caption">'${art.title}'<br>${art.medium}, ${art.dimensions}, ${art.year}.</p>
        </div>
      `,
        )
        .join("")}
    </div>
  `;
  attachImageClicks(artworks);
}

function renderArtworksByYear(year) {
  const filtered = artworks.filter((a) => a.year === year);
  content.innerHTML = `
    <div class="grid">
      ${filtered
        .map(
          (art) => `
        <div class="grid-item">
          <div class="image-box">
            <img src="${art.image}" alt="${art.title}">
          </div>
          <p class="grid-caption">'${art.title}'<br>${art.medium}, ${art.dimensions}, ${art.year}.</p>
        </div>
      `,
        )
        .join("")}
    </div>
  `;
  attachImageClicks(filtered);
}

function renderPublications() {
  content.innerHTML = "<p>Publications go here.</p>";
}

function renderInfo() {
  content.innerHTML = "<p>Info goes here.</p>";
}

// ---- Magnifier ----
lightboxImg.addEventListener("mouseenter", () => {
  magnifier.style.backgroundImage = `url(${lightboxImg.src})`;
  magnifier.classList.add("active");
});

lightboxImg.addEventListener("mouseleave", () => {
  magnifier.classList.remove("active");
});

lightboxImg.addEventListener("mousemove", (event) => {
  const rect = lightboxImg.getBoundingClientRect();
  const x = event.clientX - rect.left;
  const y = event.clientY - rect.top;
  const size = magnifier.offsetWidth;

  magnifier.style.left = `${event.clientX - size / 2}px`;
  magnifier.style.top = `${event.clientY - size / 2}px`;
  magnifier.style.backgroundSize = `${rect.width * zoom}px ${rect.height * zoom}px`;
  magnifier.style.backgroundPosition = `${-(x * zoom - size / 2)}px ${-(y * zoom - size / 2)}px`;
});

// ---- Init ----
buildYearDropdown();

const yearLinks = dropdown.querySelectorAll("a");

yearLinks.forEach((link) => {
  link.addEventListener("click", (event) => {
    event.preventDefault();
    event.stopPropagation();
    yearLinks.forEach((l) => l.classList.remove("active"));
    link.classList.add("active");
    trigger.classList.add("active");
    renderArtworksByYear(link.dataset.year);
  });
});

renderArtworks();
