document.addEventListener('DOMContentLoaded', function() {
    // Получаем ID автора из URL
    const urlParams = new URLSearchParams(window.location.search);
    const authorId = parseInt(urlParams.get('id')) || 1;
    
    // Находим автора по ID
    const author = authors.find(a => a.id === authorId);
    
    if (!author) {
        document.getElementById('authorContainer').innerHTML = '<p>Автор не найден.</p>';
        return;
    }
    
    // Устанавливаем заголовок страницы
    document.title = `${author.name} - Сборник стихов`;
    
    // Получаем стихи этого автора
    const authorPoems = poems.filter(poem => poem.authorId === author.id);
    
    // Генерируем HTML для страницы автора
    const authorHTML = `
        <div class="author-header">
            <div class="author-avatar-large">
                <img src="${author.avatar}" alt="${author.name}">
            </div>
            <div class="author-basic-info">
                <h1>${author.name}</h1>
                <p class="author-dates">${author.dates}</p>
                <p class="author-tagline">${author.tagline}</p>
            </div>
        </div>

        <div class="author-content">
            <div class="author-bio">
                <h2>Биография</h2>
                <p>${author.detailedBio}</p>
            </div>

            <div class="author-works">
                <h2>Известные произведения</h2>
                <div class="works-list">
                    ${author.works.map(work => `
                        <div class="work-item">
                            <h4>${work.title}</h4>
                            <p>${work.description}</p>
                        </div>
                    `).join('')}
                </div>
            </div>

            <div class="poems-by-author">
                <h2>Стихи автора в нашем сборнике</h2>
                <div class="poems-list">
                    ${authorPoems.map(poem => `
                        <div class="poem-item">
                            <a href="poem.html?id=${poem.id}">
                                <h4>${poem.title}</h4>
                                <p>${poem.era} • ${poem.length}</p>
                            </a>
                        </div>
                    `).join('')}
                </div>
            </div>

            <div class="author-facts">
                <h2>Интересные факты</h2>
                <ul>
                    ${author.facts.map(fact => `<li>${fact}</li>`).join('')}
                </ul>
            </div>
        </div>
    `;
    
    document.getElementById('authorContainer').innerHTML = authorHTML;
});