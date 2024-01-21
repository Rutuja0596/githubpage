document.addEventListener('DOMContentLoaded', function () {
    const username = 'freeCodeCamp';
    const perPage = 10; // Number of repositories per page
    let currentPage = 1;

    function fetchRepositories(page) {
        const apiUrl = `https://api.github.com/users/${username}/repos?per_page=${perPage}&page=${page}`;

        fetch(apiUrl)
            .then(response => {
                const linkHeader = response.headers.get('Link');
                const hasNextPage = linkHeader && linkHeader.includes('rel="next"');

                // Enable or disable the Next Page button based on the presence of a next page
                console.log('hasNextPage:', hasNextPage);
                document.getElementById('nextBtn').disabled = !hasNextPage;
                document.getElementById('prevBtn').disabled = page === 1;

                return response.json();
            })
            .then(repositories => {
                const repoList = document.getElementById('repoList');
                repoList.innerHTML = ''; // Clear previous list

                repositories.forEach(repo => {
                    const listItem = document.createElement('a');
                    listItem.href = repo.html_url;
                    listItem.target = '_blank';
                    listItem.className = 'list-group-item list-group-item-action';
                    listItem.textContent = repo.name;

                    repoList.appendChild(listItem);
                });
            })
            .catch(error => console.error('Error fetching GitHub repositories:', error));

            

    }

    function nextPage() {
        currentPage++;
        fetchRepositories(currentPage);
    }

    function prevPage() {
        if (currentPage > 1) {
            currentPage--;
            fetchRepositories(currentPage);
        }
    }
     function searchRepositories() {
        const searchTerm = document.getElementById('searchInput').value.toLowerCase();
        const filteredItems = items.filter(item => item.toLowerCase().includes(searchTerm));
        currentPage = 1; // Reset to the first page after searching
        displayItems(currentPage, filteredItems);
    }

    // Initial fetch on page load
    fetchRepositories(currentPage);
});
 