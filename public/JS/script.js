function toggleMenu() {
    let menu = document.querySelector(".nav__responsive-ul");
    menu.style.display = (menu.style.display === "block") ? "none" : "block";
}



// Espera a que el contenido del DOM se haya cargado completamente antes de ejecutar el código.
document.addEventListener('DOMContentLoaded', () => {
  // Define un objeto con sugerencias y sus URLs correspondientes.
  // La clave es el texto de la sugerencia y el valor es la URL a la que se redirige.
  const suggestions = {
      'Tendencias Clave en Programación para 2025': '/blog/tendencias-clave', // URL para la sugerencia 'Inyección con Sqlmap'
      'Ciberseguridad – Amenazas y Defensas': '/blog/amenazas-defensas', // URL para la sugerencia 'Análisis con Bettercap'
      'Avances en Inteligencia Artificial en 2025': '/blog/inteligencia-artifical', // URL para la sugerencia 'Análisis con dirsearch'
      'Ciencia de Datos – Innovaciones Emergentes en 2025': '/blog/ciencia-datos', // URL para la sugerencia 'Herramientas para escaneo de vulnerabilidades'
  };

  // Obtiene el elemento de la barra de búsqueda del DOM por su ID.
  const searchBar = document.getElementById('search-bar');
  
  // Obtiene el elemento de la lista de sugerencias del DOM por su ID.
  const suggestionsList = document.getElementById('suggestions');

  // Añade un listener de evento para detectar cambios en el campo de búsqueda.
  searchBar.addEventListener('input', function() {
      // Obtiene el valor actual del campo de búsqueda y lo convierte a minúsculas.
      const query = searchBar.value.toLowerCase();
      
      // Limpia la lista de sugerencias anterior para mostrar las nuevas sugerencias.
      suggestionsList.innerHTML = '';

      // Verifica si el campo de búsqueda no está vacío.
      if (query) {
          // Filtra las sugerencias basadas en si el texto de la sugerencia incluye la consulta.
          const filteredSuggestions = Object.keys(suggestions).filter(item => item.toLowerCase().includes(query));

          // Verifica si hay sugerencias filtradas.
          if (filteredSuggestions.length > 0) {
              // Muestra la lista de sugerencias.
              suggestionsList.style.display = 'block';

              // Recorre cada sugerencia filtrada y crea un elemento de lista para cada una.
              filteredSuggestions.forEach(suggestion => {
                  // Crea un nuevo elemento de lista.
                  const listItem = document.createElement('li');
                  
                  // Establece el texto del elemento de lista con la sugerencia.
                  listItem.textContent = suggestion;
                  
                  // Añade un listener de evento para manejar el clic en la sugerencia.
                  listItem.addEventListener('click', () => {
                      // Redirige al usuario a la URL correspondiente a la sugerencia seleccionada.
                      window.location.href = suggestions[suggestion];
                      
                      // Limpia la lista de sugerencias después del clic.
                      suggestionsList.innerHTML = '';
                      
                      // Limpia el campo de búsqueda.
                      searchBar.value = '';
                  });

                  // Añade el elemento de lista a la lista de sugerencias.
                  suggestionsList.appendChild(listItem);
              });
          } else {
              // Oculta la lista de sugerencias si no hay coincidencias.
              suggestionsList.style.display = 'none';
          }
      } else {
          // Oculta la lista de sugerencias si el campo de búsqueda está vacío.
          suggestionsList.style.display = 'none';
      }
  });

  // Añade un listener de evento para cerrar la lista de sugerencias al hacer clic fuera de ella.
  document.addEventListener('click', function(event) {
      // Verifica si el clic ocurrió fuera del campo de búsqueda y la lista de sugerencias.
      if (!searchBar.contains(event.target) && !suggestionsList.contains(event.target)) {
          // Oculta la lista de sugerencias si se hace clic fuera de ella.
          suggestionsList.style.display = 'none';
      }
  });
});


// Agregar este código a tu archivo script.js o crear uno nuevo

// Función para filtrar posts por tag
function filterByTag(tag) {
    const items = document.querySelectorAll('.item');
    const allTags = document.querySelectorAll('.tag');
    
    // Remover clase active de todos los tags
    allTags.forEach(t => t.classList.remove('active'));
    
    // Si hacemos click en el mismo tag, mostrar todos
    if (window.currentTag === tag) {
        items.forEach(item => {
            item.style.display = 'block';
        });
        window.currentTag = null;
        // Limpiar URL
        window.history.pushState({}, '', '/blog');
        return;
    }
    
    // Marcar el tag actual como activo
    const activeTag = document.querySelector(`.tag[data-tag="${tag}"]`);
    if (activeTag) {
        activeTag.classList.add('active');
    }
    window.currentTag = tag;
    
    // Filtrar items
    let visibleCount = 0;
    items.forEach(item => {
        // Obtener los tags del data attribute
        const itemTagsString = item.getAttribute('data-tags');
        
        // Si el item tiene tags, convertir a array y buscar coincidencia exacta
        if (itemTagsString) {
            // Separar los tags por coma y limpiar espacios
            const itemTagsArray = itemTagsString.split(',').map(t => t.trim().toLowerCase());
            const searchTag = tag.toLowerCase();
            
            // Verificar si existe una coincidencia exacta
            if (itemTagsArray.includes(searchTag)) {
                item.style.display = 'block';
                visibleCount++;
            } else {
                item.style.display = 'none';
            }
        } else {
            item.style.display = 'none';
        }
    });
    
    // Mostrar mensaje si no hay resultados
    if (visibleCount === 0) {
        showNoResultsMessage();
    } else {
        removeNoResultsMessage();
    }
}

// Función para mostrar mensaje de "no hay resultados"
function showNoResultsMessage() {
    removeNoResultsMessage(); // Remover mensaje anterior si existe
    
    const home = document.querySelector('.Home');
    if (!home) return;
    
    const message = document.createElement('div');
    message.className = 'no-results-message';
    message.innerHTML = `
        <i class="fa-solid fa-folder-open"></i>
        <p>No se encontraron artículos para este tag</p>
    `;
    home.appendChild(message);
}

// Función para remover mensaje de "no hay resultados"
function removeNoResultsMessage() {
    const message = document.querySelector('.no-results-message');
    if (message) {
        message.remove();
    }
}

// Inicializar event listeners cuando la página cargue
document.addEventListener('DOMContentLoaded', function() {
    const tags = document.querySelectorAll('.tag');
    
    // Para la página de blog (con posts)
    if (document.querySelector('.Home')) {
        tags.forEach(tag => {
            tag.addEventListener('click', function(e) {
                e.preventDefault();
                // Usar el atributo data-tag en lugar del texto visible
                const tagValue = this.getAttribute('data-tag');
                filterByTag(tagValue);
                
                // Actualizar URL sin recargar
                window.history.pushState({}, '', `/blog?tag=${tagValue}`);
            });
        });
        
        // Verificar si hay un tag en la URL al cargar
        const urlParams = new URLSearchParams(window.location.search);
        const tagFromUrl = urlParams.get('tag');
        if (tagFromUrl) {
            filterByTag(tagFromUrl);
        }
    }
    // Para páginas de artículos individuales, los links ya funcionan con href
});