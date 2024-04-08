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
  const toggleCartButton = document.getElementById('toggleCartButton');
  const cartContainer = document.getElementById('cartContainer');
  const hideCartButton = document.getElementById('hideCartButton');

  // Ocultar el carrito al cargar la página
  cartContainer.classList.remove('active');

  toggleCartButton.addEventListener('click', function() {
    cartContainer.classList.toggle('active'); // Mostrar/ocultar el carrito al hacer clic en el botón principal
  });

  hideCartButton.addEventListener('click', function() {
    cartContainer.classList.remove('active'); // Ocultar el carrito al hacer clic en el botón "Ocultar Carrito"
  });

    let temporizadorIntervalo; // Variable para almacenar el intervalo del temporizador
    let segundosRestantes = 60; // Duración inicial del temporizador en segundos (1 minuto)

    // Función para cargar los datos del carrito desde el almacenamiento local
    function cargarCarritoDesdeLocalStorage() {
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
    }

    // Función para guardar los datos del carrito en el almacenamiento local
    function guardarCarritoEnLocalStorage() {
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
    }

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

    // Función para actualizar el temporizador en la página del carrito
    function actualizarTemporizador() {
        const temporizadorElemento = document.getElementById('temporizador');

        temporizadorIntervalo = setInterval(function() {
            segundosRestantes--;
            if (segundosRestantes <= 0) {
                clearInterval(temporizadorIntervalo); // Detener el temporizador cuando llegue a cero
                temporizadorElemento.textContent = 'El tiempo ha expirado';
                // Eliminar los datos del carrito del almacenamiento local
                localStorage.removeItem('cartData');
                // Actualizar la página después de eliminar el almacenamiento
                location.reload();
            } else {
                const minutos = Math.floor(segundosRestantes / 60);
                const segundos = segundosRestantes % 60;
                temporizadorElemento.textContent = `Tiempo restante: ${minutos}:${segundos < 10 ? '0' : ''}${segundos}`;
            }
        }, 1000); // Actualizar cada segundo
    }

    function actualizarCantidadCarrito() {
        const cartItemCountElement = document.getElementById('cartItemCount');
        const cartItemCount = parseInt(cartItemCountElement.textContent) || 0;
        cartItemCountElement.textContent = cartItemCount + 1;
    }

    // Llamar a la función para cargar los datos del carrito al cargar la página
    cargarCarritoDesdeLocalStorage();

    // Agregar un evento click a cada botón "Agregar al carrito"
    const addToCartButtons = document.querySelectorAll('.agregar-al-carrito');
    addToCartButtons.forEach(button => {
        button.addEventListener('click', () => {
            // Iniciar el temporizador solo si aún no ha sido iniciado
            if (!temporizadorIntervalo) {
                actualizarTemporizador();
            }

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
                    <td><button class="eliminar-fila">Eliminar</button></td>
                `;

                const tableBody = document.querySelector('.styled-table tbody');
                tableBody.appendChild(newRow);

                // Agregar evento al botón de eliminar después de crear la fila
                const deleteButton = newRow.querySelector('.eliminar-fila');
                deleteButton.addEventListener('click', () => {
                const tableRow = deleteButton.closest('tr'); // Obtener la fila que contiene el botón
                tableRow.remove(); // Eliminar la fila al hacer clic en Eliminar

                // Recalcular el total general y guardar el carrito en el almacenamiento local
                calcularTotalGeneral();
                guardarCarritoEnLocalStorage();
                // Actualizar la cantidad en el botón
                actualizarCantidadCarrito();
                });
                
                // Estilo para el botón de eliminar (cursor pointer)
                deleteButton.style.cursor = 'pointer';

                cantidadInput.value = 1; // Establecer el valor a 1
            }

            // Calcular el total general
            calcularTotalGeneral();

            // Guardar el carrito en el almacenamiento local
            guardarCarritoEnLocalStorage();

            // Actualizar la cantidad en el botón
            actualizarCantidadCarrito();
        });
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

