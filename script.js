// Esto es para el carousel
document.addEventListener('DOMContentLoaded', function() {
    var carousel = document.querySelector('#carouselExampleAutoplaying');
    var prevButton = carousel.querySelector('.carousel-control-prev');
    var nextButton = carousel.querySelector('.carousel-control-next');
  
    prevButton.addEventListener('click', function() {
      carousel.classList.remove('manual-transition');
      setTimeout(function() {
        carousel.classList.add('manual-transition');
      }, 50); // Agrega un pequeño retraso para permitir que se aplique la clase antes de la transición
    });
  
    nextButton.addEventListener('click', function() {
      carousel.classList.remove('manual-transition');
      setTimeout(function() {
        carousel.classList.add('manual-transition');
      }, 50); // Agrega un pequeño retraso para permitir que se aplique la clase antes de la transición
    });
});

// Esto es para el mapa
document.getElementById("location-btn").addEventListener("click", function() {
    var mapContainer = document.getElementById("map-container");
    var mapIframe = document.getElementById("map-iframe");
  
    // Si el mapa ya está visible, lo oculta
    if (mapContainer.style.display === "block") {
        mapContainer.style.display = "none";
    } else {
        // Si el mapa no está visible, muestra el mapa
        // Reemplaza la URL del iframe con la URL de Google Maps que proporciona la ubicación exacta
        mapIframe.src = "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d291.931031014439!2d-84.29977203391974!3d10.120345706202865!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x8fa058cd3aa97a0b%3A0xe9101af95f237827!2s4PC2%2B545%2C%20Provincia%20de%20Alajuela%2C%20Caj%C3%B3n!5e0!3m2!1ses!2scr!4v1711485368124!5m2!1ses!2scr";
      
        // Muestra el contenedor del mapa
        mapContainer.style.display = "block";
    }
});

// Función que se ejecuta cuando el mouse entra o sale de la línea separadora
$(document).ready(function() {
    $('.linea-separadora').mouseenter(function() {
        // Cuando el mouse entra en la línea, cambia su ancho a 2px con una animación de 0.3 segundos
        $(this).animate({ borderTopWidth: '2px' }, 300);
    }).mouseleave(function() {
        // Cuando el mouse sale de la línea, restaura su ancho original con una animación de 0.3 segundos
        $(this).animate({ borderTopWidth: '1px' }, 300);
    });
});

// Cuando el mouse pasa por un enlace de .footer-social
$(document).ready(function() {
    $('.footer-social a').hover(function() {
        // Realiza una animación cuando el mouse entra en el enlace
        $(this).find('img').animate({ width: '40px', opacity: 0.5 }, 'fast');
    }).mouseleave(function() {
        // Restaura el estado original cuando el mouse sale del enlace
        $(this).find('img').animate({ width: '30px', opacity: 1 }, 'fast');
    });
});

//Animaciones para el header
$(document).ready(function() {
    $('header h1').hover(function() {
        // Verificar si el título ya está en negrita
        if ($(this).hasClass('negrita')) {
            // Si está en negrita, quitar la clase y volver al estado original
            $(this).removeClass('negrita');
        } else {
            // Si no está en negrita, agregar la clase para hacerlo negrita
            $(this).addClass('negrita');
        }
    });
    
    $(document).ready(function() {
        $('#animated-heading').animate({'width': '100%'}, 2000);
    });
});

// Esto es para cuando presiono una categoria, aparezcan los cards segun su respectiva
document.addEventListener('DOMContentLoaded', function() {
    const categories = document.querySelectorAll('.categories li');
    const products = document.querySelectorAll('.card');
  
    categories.forEach(category => {
      category.addEventListener('click', function() {
        const selectedCategory = this.dataset.category;
        filterProducts(selectedCategory);
      });
    });
  
    function filterProducts(category) {
      products.forEach(product => {
        if (product.classList.contains(category)) {
          product.style.display = 'block'; // Cambiar la visualización para mostrar elementos como flex
        } else {
          product.style.display = 'none';
        }
      });
    }
});

// Funcion para los botones de los incrementa y decrementa la cantidad de los cards
document.addEventListener('DOMContentLoaded', function() {
    const cantidadInputs = document.querySelectorAll('.cantidad');

    cantidadInputs.forEach(input => {
        input.addEventListener('click', function() {
            this.select(); // Selecciona todo el texto en el input al hacer clic en él
        });

        // Verificar si ya se han agregado los botones
        if (!input.parentNode.querySelector('button')) {
            // Agregar botones para aumentar y disminuir la cantidad
            const incrementButton = document.createElement('button');
            incrementButton.textContent = '+';
            incrementButton.style.fontWeight = 'bold';
            incrementButton.addEventListener('click', function() {
                increment(input);
            });

            const decrementButton = document.createElement('button');
            decrementButton.textContent = '-';
            decrementButton.style.fontWeight = 'bold';
            decrementButton.addEventListener('click', function() {
                decrement(input);
            });

            input.parentNode.appendChild(incrementButton);
            input.parentNode.appendChild(decrementButton);
        }
});

    function increment(input) {
        const currentValue = parseInt(input.value);
        input.value = currentValue + 1;
    }

    function decrement(input) {
        const currentValue = parseInt(input.value);
        if (currentValue > 1) {
            input.value = currentValue - 1;
        }
    }
});

// Funcion para la table del agregar al carrito
document.addEventListener('DOMContentLoaded', function() {
    // Función para incrementar y decrementar la cantidad
    function increment(input) {
        const currentValue = parseInt(input.value);
        input.value = currentValue + 1;
    }

    function decrement(input) {
        const currentValue = parseInt(input.value);
        if (currentValue > 1) {
            input.value = currentValue - 1;
        }
    }

    // Botones para incrementar y decrementar la cantidad
    function createQuantityButtons(input) {
        const incrementButton = document.createElement('button');
        incrementButton.textContent = '+';
        incrementButton.style.fontWeight = 'bold';
        incrementButton.addEventListener('click', function() {
            increment(input);
        });

        const decrementButton = document.createElement('button');
        decrementButton.textContent = '-';
        decrementButton.style.fontWeight = 'bold';
        decrementButton.addEventListener('click', function() {
            decrement(input);
        });

        input.parentNode.appendChild(incrementButton);
        input.parentNode.appendChild(decrementButton);
    }

    // Agrega los botones de cantidad a cada input
    const cantidadInputs = document.querySelectorAll('.cantidad');
    cantidadInputs.forEach(input => {
        input.addEventListener('click', function() {
            this.select(); // Selecciona todo el texto en el input al hacer clic en él
        });

        // Verificar si ya se han agregado los botones
        if (!input.parentNode.querySelector('button')) {
            createQuantityButtons(input);
        }
    });

    // Agrega un evento click a cada botón "Agregar al carrito"
    const addToCartButtons = document.querySelectorAll('.agregar-al-carrito');
    addToCartButtons.forEach(button => {
        button.addEventListener('click', () => {
            const codigo = button.getAttribute('data-codigo');
            const nombre = button.getAttribute('data-nombre');
            const precio = parseFloat(button.getAttribute('data-precio'));
            const cantidadInput = button.parentElement.querySelector('.cantidad input');
            const cantidad = parseInt(cantidadInput.value);
            const total = precio * cantidad;
    
            // Buscar si ya existe una fila con el mismo código
            const existingRow = document.querySelector(`.styled-table tbody tr[data-codigo="${codigo}"]`);
    
            if (existingRow) {
                // Si existe, actualizar la cantidad y el total
                const cantidadCell = existingRow.querySelector('.cantidad input');
                const nuevaCantidad = parseInt(cantidadCell.value) + cantidad;
                cantidadCell.value = nuevaCantidad;
                existingRow.querySelector('.total').textContent = precio * nuevaCantidad;
            } else {
                // Si no existe, agregar una nueva fila
                const newRow = document.createElement('tr');
                newRow.dataset.codigo = codigo;
                newRow.innerHTML = `
                    <td>${codigo}</td>
                    <td>${nombre}</td>
                    <td>${precio}</td>
                    <td class="cantidad"><input type="text" value="${cantidad}" readonly></td>
                    <td class="total">${total}</td>
                `;
    
                const tableBody = document.querySelector('.styled-table tbody');
                tableBody.appendChild(newRow);
            }
    
            // Calcular el total general
            calcularTotalGeneral();

            // Restablecer la cantidad a 1
            cantidadInput.value = 1;
        });
    });

    // Función para calcular el total general
    function calcularTotalGeneral() {
        const rows = document.querySelectorAll('.styled-table tbody tr');
        let totalGeneral = 0;
        rows.forEach(row => {
            const totalRow = parseFloat(row.cells[4].textContent);
            totalGeneral += totalRow;
        });

        // Redondear hacia abajo el total general y mostrarlo como número entero
        totalGeneral = Math.floor(totalGeneral);

        // Actualizar el total general en el pie de la tabla
        const totalGeneralElement = document.querySelector('.styled-table tfoot td:last-child');
        totalGeneralElement.textContent = '₡' + totalGeneral;
    }

    // Guardar los elementos de la tabla en el almacenamiento local antes de cerrar la pestaña
    window.addEventListener('beforeunload', function() {
        const tableRows = document.querySelectorAll('.styled-table tbody tr');
        const savedData = [];

        tableRows.forEach(row => {
            const codigo = row.dataset.codigo;
            const nombre = row.cells[1].textContent;
            const precio = parseFloat(row.cells[2].textContent);
            const cantidad = parseInt(row.querySelector('.cantidad input').value);
            const total = parseFloat(row.cells[4].textContent);

            savedData.push({
                codigo: codigo,
                nombre: nombre,
                precio: precio,
                cantidad: cantidad,
                total: total
            });
        });

        localStorage.setItem('cartData', JSON.stringify(savedData));
    });

    // Cargar los elementos de la tabla desde el almacenamiento local al abrir la página
    window.addEventListener('load', function() {
        const savedData = localStorage.getItem('cartData');

        if (savedData) {
            const parsedData = JSON.parse(savedData);

            parsedData.forEach(item => {
                const newRow = document.createElement('tr');
                newRow.dataset.codigo = item.codigo;
                newRow.innerHTML = `
                    <td>${item.codigo}</td>
                    <td>${item.nombre}</td>
                    <td>${item.precio}</td>
                    <td class="cantidad"><input type="text" value="${item.cantidad}" readonly></td>
                    <td class="total">${item.total}</td>
                `;

                const tableBody = document.querySelector('.styled-table tbody');
                tableBody.appendChild(newRow);
            });

            // Calcular el total general
            calcularTotalGeneral();
        }
    });
});

// Esto es para que cuando se envie el correo aparezca un mensaje 
document.querySelector('form').addEventListener('submit', function(event) {
    event.preventDefault(); // Evitar que el formulario se envíe automáticamente
    
    // Envía el formulario de forma asincrónica utilizando Fetch API o XMLHttpRequest
    fetch('https://formsubmit.co/2a1680794fd69a882a28c2cdff5f6000', {
        method: 'POST',
        body: new FormData(this)
    })
    .then(response => {
        if (response.ok) {
            alert("El correo ha sido enviado satisfactoriamente al correo suministrado.");
            // Redirigir a la página de destino después de enviar el formulario
            window.location.href = 'https://mel19matamoros.github.io/MelanyCosmetics.github.io/contacto.html';
        } else {
            alert("Hubo un error al enviar el correo.");
        }
    })
    .catch(error => {
        alert("Hubo un error al enviar el correo.");
        console.error('Error:', error);
    });
});

// Función para guardar los valores de las cajas de texto en localStorage
function guardarDatos() {
    var email = document.getElementById('Email').value;
    var nombre = document.getElementById('Nombre').value;
    var nacimiento = document.getElementById('Nacimiento').value;
    var genero = document.getElementById('Genero').value;
    var tipoPiel = document.getElementById('Tipo-Piel').value;

    localStorage.setItem('email', email);
    localStorage.setItem('nombre', nombre);
    localStorage.setItem('nacimiento', nacimiento);
    localStorage.setItem('genero', genero);
    localStorage.setItem('tipoPiel', tipoPiel);
}

// Función para cargar los valores guardados en localStorage y colocarlos en las cajas de texto
function cargarDatos() {
    document.getElementById('Email').value = localStorage.getItem('email') || '';
    document.getElementById('Nombre').value = localStorage.getItem('nombre') || '';
    document.getElementById('Nacimiento').value = localStorage.getItem('nacimiento') || '';
    document.getElementById('Genero').value = localStorage.getItem('genero') || '';
    document.getElementById('Tipo-Piel').value = localStorage.getItem('tipoPiel') || '';
}

// Cargar los datos almacenados cuando la página se carga
window.onload = cargarDatos;

// Guardar los datos cuando el formulario se envía
document.querySelector('form').addEventListener('submit', function(event) {
    guardarDatos();
});
