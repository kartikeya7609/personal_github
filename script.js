// Function to fetch GitHub repositories
async function fetchGitHubRepos(username) {
    try {
        const response = await fetch(`https://api.github.com/users/${username}/repos`);
        if (!response.ok) {
            throw new Error('Failed to fetch repositories');
        }
        const repos = await response.json();
        return repos.map(repo => ({
            name: repo.name,
            description: repo.description || 'No description available',
            url: repo.html_url,
            language: repo.language || 'Not specified',
            stars: repo.stargazers_count,
            forks: repo.forks_count,
            has_pages: repo.has_pages
        }));
    } catch (error) {
        console.error('Error fetching repositories:', error);
        return [];
    }
}

// Function to create repository cards
function createRepoCard(repo) {
    return `
        <div class="card">
            <h3>${repo.name}</h3>
            <p>${repo.description}</p>
            <div class="repo-stats">
                <span><i class="fas fa-code"></i> ${repo.language}</span>
                <span><i class="fas fa-star"></i> ${repo.stars}</span>
                <span><i class="fas fa-code-branch"></i> ${repo.forks}</span>
            </div>
            <div class="repo-links">
                <a href="${repo.url}" target="_blank" rel="noopener noreferrer" class="repo-link">
                    <i class="fab fa-github"></i> Repository
                </a>
                ${repo.has_pages ? `
                    <a href="https://kartikeya7609.github.io/${repo.name}/" target="_blank" rel="noopener noreferrer" class="repo-link">
                        <i class="fas fa-globe"></i> Live Demo
                    </a>
                ` : ''}
            </div>
        </div>
    `;
}

// Function to load repositories
async function loadRepositories() {
    const reposContainer = document.getElementById('repos-container');
    if (reposContainer) {
        try {
            const username = 'kartikeya7609';
            const repos = await fetchGitHubRepos(username);
            if (repos.length === 0) {
                reposContainer.innerHTML = '<div class="error-message">No repositories found or error loading repositories.</div>';
                return;
            }
            reposContainer.innerHTML = repos.map(createRepoCard).join('');
        } catch (error) {
            console.error('Error loading repositories:', error);
            reposContainer.innerHTML = '<div class="error-message">Error loading repositories. Please try again later.</div>';
        }
    }
}

// Load content when the page loads
document.addEventListener('DOMContentLoaded', () => {
    loadRepositories();
});

// Smooth scrolling for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth'
            });
        }
    });
}); 