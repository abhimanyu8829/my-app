document.addEventListener('DOMContentLoaded', () => {
    fetchMovies();
});

async function fetchMovies() {
    try {
        const response = await fetch('/api/catalog');
        const data = await response.json();

        if (data.results) {
            renderRows(data.results);
        }
    } catch (error) {
        console.error('Error fetching movies:', error);
    }
}

function renderRows(movies) {
    const containers = document.getElementById('movie-containers');

    // Group movies by category
    const categories = [...new Set(movies.map(m => m.category || 'More for You'))];

    categories.forEach(category => {
        const categoryMovies = movies.filter(m => m.category === category);

        const row = document.createElement('section');
        row.className = 'row fade-in';

        row.innerHTML = `
            <h2 class="row-header">${category}</h2>
            <div class="row-posters">
                ${categoryMovies.map(movie => `
                    <div class="row-item">
                        <div class="movie-card" onclick="window.location.href='/watch/${movie.id}'">
                            <img src="${movie.image}" alt="${movie.title}">
                            <div class="movie-card-info" style="display:none;">
                                <h3>${movie.title}</h3>
                            </div>
                        </div>
                    </div>
                `).join('')}
            </div>
        `;

        containers.appendChild(row);
    });
}
