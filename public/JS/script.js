function toggleMenu() {
    let menu = document.querySelector(".nav__responsive-ul");
    menu.style.display = (menu.style.display === "block") ? "none" : "block";
}

// ============================================
// FUNCIONALIDAD DE PAGINACIÓN
// ============================================

function getPageFromURL() {
    const params = new URLSearchParams(window.location.search);
    const page = parseInt(params.get('page')) || 1;
    return window.blogData ? Math.max(1, Math.min(page, window.blogData.totalPages)) : 1;
}

function getFilteredPosts() {
    if (!window.blogData) return [];
    
    const { posts } = window.blogData;
    
    // Si hay un tag activo, filtrar posts
    if (window.currentTag) {
        return posts.filter(post => {
            const postTags = post.tags.map(t => t.toLowerCase());
            return postTags.includes(window.currentTag.toLowerCase());
        });
    }
    
    return posts;
}

function renderPosts(page) {
    const container = document.getElementById('posts-container');
    if (!container || !window.blogData) return;
    
    const { postsPerPage } = window.blogData;
    const filteredPosts = getFilteredPosts();
    
    // Recalcular páginas totales basadas en posts filtrados
    const totalFilteredPages = Math.ceil(filteredPosts.length / postsPerPage);
    
    // Validar que la página no exceda el total de páginas filtradas
    const validPage = Math.max(1, Math.min(page, totalFilteredPages));
    
    const startIndex = (validPage - 1) * postsPerPage;
    const endIndex = startIndex + postsPerPage;
    const currentPosts = filteredPosts.slice(startIndex, endIndex);

    console.log(`Renderizando página ${validPage}`);
    console.log(`Posts filtrados: ${filteredPosts.length}`);
    console.log(`Posts del ${startIndex} al ${endIndex}:`, currentPosts.map(p => p.title));

    // Limpiar contenedor
    container.innerHTML = '';

    // Si no hay posts, mostrar mensaje
    if (currentPosts.length === 0) {
        showNoResultsMessage();
        return;
    }

    // Renderizar posts
    currentPosts.forEach(post => {
        const postElement = document.createElement('div');
        postElement.className = 'item';
        postElement.setAttribute('data-tags', post.tags.join(','));
        postElement.setAttribute('data-category', post.category);
        
        postElement.innerHTML = `
            <img
                src="${post.image}"
                class="Logo"
                width="370"
                height="200"
                style="float:right;"
                alt="${post.title}"
            />
            <div class="item-texto">
                <a href="/blog/${post.slug}" class="link">
                    <h2>${post.title}</h2>
                </a>
                <i class="fa-solid fa-folder"></i> ${post.category}
                <p>${post.description}</p>
            </div>
        `;
        
        container.appendChild(postElement);
    });

    // Renderizar paginación
    renderPagination(validPage, totalFilteredPages);
}

function renderPagination(page, totalPages) {
    const container = document.getElementById('posts-container');
    if (!window.blogData) return;

    if (totalPages <= 1) return;

    const paginationDiv = document.createElement('div');
    paginationDiv.className = 'pagination';

    // Botón anterior
    if (page > 1) {
        const prevBtn = document.createElement('a');
        prevBtn.href = `#`;
        prevBtn.className = 'pagination-btn';
        prevBtn.setAttribute('aria-label', 'Página anterior');
        prevBtn.innerHTML = '<i class="fa-solid fa-chevron-left"></i>';
        prevBtn.addEventListener('click', (e) => {
            e.preventDefault();
            changePage(page - 1);
        });
        paginationDiv.appendChild(prevBtn);
    } else {
        const prevBtn = document.createElement('span');
        prevBtn.className = 'pagination-btn disabled';
        prevBtn.setAttribute('aria-label', 'Página anterior');
        prevBtn.innerHTML = '<i class="fa-solid fa-chevron-left"></i>';
        paginationDiv.appendChild(prevBtn);
    }

    // Número de página actual
    const currentSpan = document.createElement('span');
    currentSpan.className = 'pagination-current';
    currentSpan.textContent = `${page} / ${totalPages}`;
    paginationDiv.appendChild(currentSpan);

    // Botón siguiente
    if (page < totalPages) {
        const nextBtn = document.createElement('a');
        nextBtn.href = `#`;
        nextBtn.className = 'pagination-btn';
        nextBtn.setAttribute('aria-label', 'Página siguiente');
        nextBtn.innerHTML = '<i class="fa-solid fa-chevron-right"></i>';
        nextBtn.addEventListener('click', (e) => {
            e.preventDefault();
            changePage(page + 1);
        });
        paginationDiv.appendChild(nextBtn);
    } else {
        const nextBtn = document.createElement('span');
        nextBtn.className = 'pagination-btn disabled';
        nextBtn.setAttribute('aria-label', 'Página siguiente');
        nextBtn.innerHTML = '<i class="fa-solid fa-chevron-right"></i>';
        paginationDiv.appendChild(nextBtn);
    }

    container.appendChild(paginationDiv);
}

function changePage(newPage) {
    window.blogData.currentPage = newPage;
    
    // Actualizar URL
    let newUrl = `/blog?page=${newPage}`;
    if (window.currentTag) {
        newUrl += `&tag=${window.currentTag}`;
    }
    window.history.pushState({ page: newPage }, '', newUrl);
    
    // Renderizar nueva página
    renderPosts(newPage);
    
    // Scroll suave hacia arriba
    window.scrollTo({ top: 0, behavior: 'smooth' });
}

// Manejar botón atrás/adelante del navegador
window.addEventListener('popstate', function(event) {
    const params = new URLSearchParams(window.location.search);
    const currentPage = parseInt(params.get('page')) || 1;
    const tagFromUrl = params.get('tag');
    
    if (window.blogData) {
        window.blogData.currentPage = currentPage;
        
        // Actualizar tag activo
        if (tagFromUrl) {
            window.currentTag = tagFromUrl;
            updateActiveTag(tagFromUrl);
        } else {
            window.currentTag = null;
            clearActiveTags();
        }
        
        renderPosts(currentPage);
        window.scrollTo({ top: 0, behavior: 'smooth' });
    }
});

// ============================================
// FUNCIONALIDAD DE FILTRADO POR TAGS
// ============================================

function updateActiveTag(tag) {
    const allTags = document.querySelectorAll('.tag');
    allTags.forEach(t => t.classList.remove('active'));
    
    const activeTag = document.querySelector(`.tag[data-tag="${tag}"]`);
    if (activeTag) {
        activeTag.classList.add('active');
    }
}

function clearActiveTags() {
    const allTags = document.querySelectorAll('.tag');
    allTags.forEach(t => t.classList.remove('active'));
}

function filterByTag(tag) {
    const allTags = document.querySelectorAll('.tag');
    
    // Si hacemos click en el mismo tag, limpiar filtro
    if (window.currentTag === tag) {
        window.currentTag = null;
        clearActiveTags();
        window.history.pushState({}, '', '/blog');
        renderPosts(1);
        return;
    }
    
    // Establecer nuevo tag
    window.currentTag = tag;
    updateActiveTag(tag);
    
    // Actualizar URL
    window.history.pushState({}, '', `/blog?tag=${tag}`);
    
    // Renderizar desde la página 1
    renderPosts(1);
}

// Función para mostrar mensaje de "no hay resultados"
function showNoResultsMessage() {
    const container = document.getElementById('posts-container');
    if (!container) return;
    
    const message = document.createElement('div');
    message.className = 'no-results-message';
    message.innerHTML = `
        <i class="fa-solid fa-folder-open"></i>
        <p>No se encontraron artículos para este tag</p>
    `;
    container.appendChild(message);
}

// ============================================
// FUNCIONALIDAD DE BÚSQUEDA DINÁMICA
// ============================================

document.addEventListener('DOMContentLoaded', () => {
    // Inicializar paginación si estamos en la página de blog
    if (window.blogData && document.getElementById('posts-container')) {
        const urlParams = new URLSearchParams(window.location.search);
        const currentPage = parseInt(urlParams.get('page')) || 1;
        const tagFromUrl = urlParams.get('tag');
        
        // Si hay tag en URL, activarlo
        if (tagFromUrl) {
            window.currentTag = tagFromUrl;
            updateActiveTag(tagFromUrl);
        }
        
        window.blogData.currentPage = currentPage;
        renderPosts(currentPage);
    }

    // Obtiene el elemento de la barra de búsqueda del DOM por su ID.
    const searchBar = document.getElementById('search-bar');
    
    // Obtiene el elemento de la lista de sugerencias del DOM por su ID.
    const suggestionsList = document.getElementById('suggestions');

    if (searchBar && suggestionsList) {
        // Variable para debounce
        let searchTimeout;

        // Añade un listener de evento para detectar cambios en el campo de búsqueda.
        searchBar.addEventListener('input', function() {
            // Cancela el timeout anterior si existe
            clearTimeout(searchTimeout);

            // Obtiene el valor actual del campo de búsqueda y lo convierte a minúsculas.
            const query = searchBar.value.toLowerCase().trim();
            
            // Limpia la lista de sugerencias anterior
            suggestionsList.innerHTML = '';

            // Verifica si el campo de búsqueda no está vacío
            if (query.length >= 2) {
                // Muestra un indicador de carga
                suggestionsList.style.display = 'block';
                const loadingItem = document.createElement('li');
                loadingItem.classList.add('loading-results');
                loadingItem.textContent = 'Buscando...';
                suggestionsList.appendChild(loadingItem);

                // Espera 300ms antes de hacer la búsqueda (debounce)
                searchTimeout = setTimeout(() => {
                    // Limpia el indicador de carga
                    suggestionsList.innerHTML = '';
                    
                    // Verifica que tengamos los datos del blog
                    if (!window.blogData || !window.blogData.posts) {
                        const errorItem = document.createElement('li');
                        errorItem.classList.add('error-results');
                        errorItem.textContent = 'Error: No se encontraron posts';
                        suggestionsList.appendChild(errorItem);
                        return;
                    }

                    const posts = window.blogData.posts;
                    
                    // Filtra los posts basándose en título, descripción o tags
                    const filteredPosts = posts.filter(post => {
                        const titleMatch = post.title.toLowerCase().includes(query);
                        const descriptionMatch = post.description?.toLowerCase().includes(query);
                        const categoryMatch = post.category?.toLowerCase().includes(query);
                        const tagMatch = post.tags?.some(tag => tag.toLowerCase().includes(query));
                        
                        return titleMatch || descriptionMatch || categoryMatch || tagMatch;
                    });

                    // Verifica si hay posts filtrados
                    if (filteredPosts.length > 0) {
                        // Muestra la lista de sugerencias
                        suggestionsList.style.display = 'block';

                        // Mostrar TODOS los posts (sin límite)
                        filteredPosts.forEach(post => {
                            // Crea un nuevo elemento de lista
                            const listItem = document.createElement('li');
                            listItem.classList.add('suggestion-item');
                            
                            // Crea el contenido del item solo con el título
                            const titleDiv = document.createElement('div');
                            titleDiv.classList.add('suggestion-title');
                            titleDiv.textContent = post.title;
                            
                            listItem.appendChild(titleDiv);
                            
                            // Añade un listener de evento para manejar el clic en la sugerencia
                            listItem.addEventListener('click', () => {
                                // Redirige al usuario a la URL del post
                                window.location.href = `/blog/${post.slug}`;
                            });

                            // Añade el elemento de lista a la lista de sugerencias
                            suggestionsList.appendChild(listItem);
                        });
                    } else {
                        // Muestra mensaje de no encontrado
                        suggestionsList.style.display = 'block';
                        const noResults = document.createElement('li');
                        noResults.classList.add('no-results');
                        noResults.textContent = 'No se encontraron resultados';
                        suggestionsList.appendChild(noResults);
                    }
                }, 300);
            } else if (query.length > 0 && query.length < 2) {
                // Muestra mensaje para escribir más caracteres
                suggestionsList.style.display = 'block';
                const minCharsItem = document.createElement('li');
                minCharsItem.classList.add('min-chars');
                minCharsItem.textContent = 'Escribe al menos 2 caracteres';
                suggestionsList.appendChild(minCharsItem);
            } else {
                // Oculta la lista de sugerencias si el campo está vacío
                suggestionsList.style.display = 'none';
            }
        });

        // Añade un listener de evento para cerrar la lista al hacer clic fuera
        document.addEventListener('click', function(event) {
            // Verifica si el clic ocurrió fuera del campo de búsqueda y la lista
            if (!searchBar.contains(event.target) && !suggestionsList.contains(event.target)) {
                // Oculta la lista de sugerencias
                suggestionsList.style.display = 'none';
            }
        });

        // Listener para la tecla Escape
        searchBar.addEventListener('keydown', function(event) {
            if (event.key === 'Escape') {
                suggestionsList.style.display = 'none';
                searchBar.blur();
            }
        });
    }
    
    // Inicializar event listeners de tags
    const tags = document.querySelectorAll('.tag');
    
    // Para la página de blog (con posts)
    if (document.getElementById('posts-container')) {
        tags.forEach(tag => {
            tag.addEventListener('click', function(e) {
                e.preventDefault();
                // Usar el atributo data-tag en lugar del texto visible
                const tagValue = this.getAttribute('data-tag');
                filterByTag(tagValue);
            });
        });
    }
});