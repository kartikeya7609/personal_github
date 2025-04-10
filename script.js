async function fetchGitHubRepos(username) {
    try {
        const response = await fetch(`https://api.github.com/users/${username}/repos?sort=updated&direction=desc`);
        if (!response.ok) {
            throw new Error('Failed to fetch repositories');
        }
        const repos = await response.json();
        return repos.map(repo => ({
            name: repo.name,
            description: repo.description || 'No description available',
            language: repo.language || 'Not specified',
            stars: repo.stargazers_count,
            forks: repo.forks_count,
            url: repo.html_url,
            has_pages: repo.has_pages,
            updated_at: repo.updated_at
        }));
    } catch (error) {
        console.error('Error fetching repositories:', error);
        throw error;
    }
}

function createRepoCard(repo) {
    const card = document.createElement('div');
    card.className = 'card';
    
    const title = document.createElement('h3');
    title.textContent = repo.name;
    
    const description = document.createElement('p');
    description.textContent = repo.description;
    
    const stats = document.createElement('div');
    stats.className = 'repo-stats';
    
    const language = document.createElement('span');
    language.innerHTML = `<i class="fas fa-code"></i> ${repo.language}`;
    
    const stars = document.createElement('span');
    stars.innerHTML = `<i class="fas fa-star"></i> ${repo.stars}`;
    
    const forks = document.createElement('span');
    forks.innerHTML = `<i class="fas fa-code-branch"></i> ${repo.forks}`;
    
    const updated = document.createElement('span');
    const updatedDate = new Date(repo.updated_at).toLocaleDateString();
    updated.innerHTML = `<i class="fas fa-clock"></i> Updated: ${updatedDate}`;
    
    stats.appendChild(language);
    stats.appendChild(stars);
    stats.appendChild(forks);
    stats.appendChild(updated);
    
    const links = document.createElement('div');
    links.className = 'repo-links';
    
    const repoLink = document.createElement('a');
    repoLink.href = repo.url;
    repoLink.target = '_blank';
    repoLink.className = 'repo-link';
    repoLink.innerHTML = '<i class="fab fa-github"></i> Repository';
    
    links.appendChild(repoLink);
    
    if (repo.has_pages) {
        const demoLink = document.createElement('a');
        demoLink.href = `https://${username}.github.io/${repo.name}`;
        demoLink.target = '_blank';
        demoLink.className = 'repo-link';
        demoLink.innerHTML = '<i class="fas fa-external-link-alt"></i> Live Demo';
        links.appendChild(demoLink);
    }
    
    card.appendChild(title);
    card.appendChild(description);
    card.appendChild(stats);
    card.appendChild(links);
    
    return card;
}

async function loadRepositories() {
    const container = document.getElementById('repos-container');
    try {
        const repos = await fetchGitHubRepos(username);
        container.innerHTML = '';
        repos.forEach(repo => {
            const card = createRepoCard(repo);
            container.appendChild(card);
        });
    } catch (error) {
        container.innerHTML = `
            <div class="error-message">
                <i class="fas fa-exclamation-circle"></i>
                <p>Failed to load repositories. Please try again later.</p>
            </div>
        `;
    }
}

const username = 'kartikeya7609';
document.addEventListener('DOMContentLoaded', loadRepositories);

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
