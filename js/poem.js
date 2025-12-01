document.addEventListener('DOMContentLoaded', function() {
    // Получаем ID стихотворения из URL
    const urlParams = new URLSearchParams(window.location.search);
    const poemId = parseInt(urlParams.get('id')) || 1;
    
    // Находим стихотворение по ID
    const poem = poems.find(p => p.id === poemId);
    const author = authors.find(a => a.id === poem.authorId);
    
    if (!poem || !author) {
        document.getElementById('poemContainer').innerHTML = '<p>Стихотворение не найдено.</p>';
        return;
    }
    
    // Устанавливаем заголовок страницы
    document.title = `${poem.title} - ${author.name} | Сборник стихов`;
    
    // Генерируем HTML для страницы
    const poemHTML = `
        <header class="poem-header">
            <div class="poem-info">
                <span class="poem-era">${poem.era}</span>
                <span class="poem-length">${poem.length}</span>
            </div>
            <h1 class="poem-title">${poem.title}</h1>
            <a href="author.html?id=${author.id}" class="author-link">
                <div class="author-info">
                    <img src="${author.avatar}" alt="${author.name}" class="author-avatar" 
     onerror="this.src='data:image/svg+xml,%3Csvg xmlns=%22http://www.w3.org/2000/svg%22 width=%22150%22 height=%22150%22 viewBox=%220 0 150 150%22%3E%3Ccircle cx=%2275%22 cy=%2275%22 r=%2275%22 fill=%22%23e0e0e0%22/%3E%3Ctext x=%2275%22 y=%2295%22 text-anchor=%22middle%22 font-family=%22Arial%22 font-size=%2224%22 fill=%22%23999%22%3E${author.name.split(' ').map(n => n[0]).join('.')}%3C/text%3E%3C/svg%3E'">
                    <div>
                        <p class="author-name">${author.name}</p>
                        <p class="author-dates">${author.dates}</p>
                    </div>
                </div>
            </a>
        </header>

        <div class="poem-content">
            <div class="poem-text collapsed" id="poemText">${formatPoemContent(poem.content)}</div>
            <button class="expand-btn" id="expandBtn">Показать полностью</button>
        </div>

        <footer class="poem-footer">
            <div class="poem-actions">
                <button class="action-btn like-btn">❤️ <span id="likeCount">0</span></button>
                <button class="action-btn share-btn">📤 Поделиться</button>
                <button class="action-btn bookmark-btn">🔖 Сохранить</button>
            </div>
        </footer>
    `;
    
    document.getElementById('poemContainer').innerHTML = poemHTML;
    
    // Инициализируем функциональность для раскрытия/сворачивания
    initPoemFunctionality();
    
    function formatPoemContent(content) {
        return content.split('\n').map(line => {
            if (line.trim() === '') {
                return '<br>';
            }
            return `<p>${line}</p>`;
        }).join('');
    }
    
    function initPoemFunctionality() {
        const poemText = document.getElementById('poemText');
        const expandBtn = document.getElementById('expandBtn');
        
        // Проверяем, нужно ли показывать кнопку раскрытия
        if (poemText.scrollHeight > 300) {
            expandBtn.style.display = 'block';
        } else {
            expandBtn.style.display = 'none';
        }
        
        expandBtn.addEventListener('click', function() {
            if (poemText.classList.contains('collapsed')) {
                // Раскрыть
                poemText.classList.remove('collapsed');
                expandBtn.textContent = 'Свернуть';
            } else {
                // Свернуть
                poemText.classList.add('collapsed');
                expandBtn.textContent = 'Показать полностью';
            }
        });
        
        // Действия для кнопок
        const likeBtn = document.querySelector('.like-btn');
        const shareBtn = document.querySelector('.share-btn');
        const bookmarkBtn = document.querySelector('.bookmark-btn');
        clicked = false;
        likeBtn.addEventListener('click', function() {
            const likeCount = document.getElementById('likeCount');
            const currentLikes = parseInt(likeCount.textContent);
            if (clicked==false){
            likeCount.textContent = currentLikes + 1;
            clicked=true;
            }
            else{
                likeCount.textContent = currentLikes -1;
                clicked=false;
            }
            likeBtn.style.transform = 'scale(1.1)';
            setTimeout(() => {
                likeBtn.style.transform = 'scale(1)';
            }, 200);
        });
        
        shareBtn.addEventListener('click', function() {
            if (navigator.share) {
                navigator.share({
                    title: poem.title,
                    text: poem.content.substring(0, 100) + '...',
                    url: window.location.href
                });
            } else {
                navigator.clipboard.writeText(window.location.href).then(() => {
                    const originalText = shareBtn.textContent;
                    shareBtn.textContent = '✓ Скопировано!';
                    setTimeout(() => {
                        shareBtn.textContent = originalText;
                    }, 2000);
                });
            }
        });
        
        bookmarkBtn.addEventListener('click', function() {
            bookmarkBtn.textContent = bookmarkBtn.textContent === '🔖 Сохранить' 
                ? '✓ Сохранено' 
                : '🔖 Сохранить';
        });
    }
});