// Initialize Fuse index
let lessons = [];
let fuse;

// Fetch lesson data and initialize Fuse
fetch("/index.json")
  .then((response) => response.json())
  .then((data) => {
    lessons = data;
    fuse = new Fuse(data, {
      keys: ["title", "description", "tags", "skill", "difficulty"],
      includeScore: true,
      threshold: 0.4,
      minMatchCharLength: 2,
    });
  });

// Search and filter functionality
function performSearch() {
  const query = document.getElementById("search-input").value.toLowerCase();
  const skillFilter = document.getElementById("filter-skill").value;
  const difficultyFilter = document.getElementById("filter-difficulty").value;

  const cards = document.querySelectorAll(".lesson-card");
  cards.forEach((card) => {
    const title = card.dataset.title.toLowerCase();
    const description = card.dataset.description.toLowerCase();
    const tags = card.dataset.tags.toLowerCase();
    const skill = card.dataset.skill.toLowerCase();
    const difficulty = card.dataset.difficulty.toLowerCase();

    let matches = true;

    // Apply Fuse.js search if query is not empty
    if (query) {
      const results = fuse.search(query);
      const lessonIds = results.map((result) =>
        result.item.title.toLowerCase(),
      );
      if (!lessonIds.includes(title)) {
        matches = false;
      }
    }

    // Apply skill filter
    if (skillFilter && !skill.includes(skillFilter)) {
      matches = false;
    }

    // Apply difficulty filter
    if (difficultyFilter && !difficulty.includes(difficultyFilter)) {
      matches = false;
    }

    card.style.display = matches ? "block" : "none";
  });
}

// Add event listeners
document
  .getElementById("search-input")
  .addEventListener("input", performSearch);
document
  .getElementById("filter-skill")
  .addEventListener("change", performSearch);
document
  .getElementById("filter-difficulty")
  .addEventListener("change", performSearch);
