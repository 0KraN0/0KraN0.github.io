document.addEventListener('DOMContentLoaded', function() {
    const poemsContainer = document.getElementById('poemsContainer');
    
    if (!poemsContainer) return;
    
    // Генерируем HTML для всех стихотворений
    const poemsHTML = poems.map(poem => {
        const author = authors.find(a => a.id === poem.authorId);
        const preview = poem.content.split('\n').slice(0, 3).join(' ') + '...';
        
        return `
            <article class="poem-card">
                <div class="poem-meta">
                    <span class="poem-era">${poem.era}</span>
                    <span class="poem-length">${poem.length}</span>
                </div>
                <h2 class="poem-title">${poem.title}</h2>
                <p class="poem-author">${author.name}</p>
                <p class="poem-preview">${preview}</p>
                <a href="poem.html?id=${poem.id}" class="read-more">Читать полностью →</a>
            </article>
        `;
    }).join('');
    
    poemsContainer.innerHTML = poemsHTML;
});