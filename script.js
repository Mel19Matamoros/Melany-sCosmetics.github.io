// Esto es para el carousel
document.addEventListener('DOMContentLoaded', function() {
  // Selecciona el elemento del carrusel
  var carrusel = document.querySelector('#carouselExampleAutoplaying');
  // Selecciona el botón de anterior del carrusel
  var botonAnterior = carrusel.querySelector('.carousel-control-prev');
  // Selecciona el botón de siguiente del carrusel
  var botonSiguiente = carrusel.querySelector('.carousel-control-next');

  // Agrega un evento al botón de anterior
  botonAnterior.addEventListener('click', function() {
    // Remueve la clase de transición manual para evitar una transición no deseada
    carrusel.classList.remove('transicion-manual');
    // Agrega la clase de transición manual con un pequeño retraso
    setTimeout(function() {
      carrusel.classList.add('transicion-manual');
    }, 50); // Agrega un pequeño retraso para permitir que se aplique la clase antes de la transición
  });

  // Agrega un evento al botón de siguiente
  botonSiguiente.addEventListener('click', function() {
    // Remueve la clase de transición manual para evitar una transición no deseada
    carrusel.classList.remove('transicion-manual');
    // Agrega la clase de transición manual con un pequeño retraso
    setTimeout(function() {
      carrusel.classList.add('transicion-manual');
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
        $('#animacion-header').animate({'width': '100%'}, 2000);
    });
});

// Esto es para cuando presiono una categoria, aparezcan los cards segun su respectiva
document.addEventListener('DOMContentLoaded', function() {
  // Selecciona todas las categorías y productos
  const categorias = document.querySelectorAll('.categorias li');
  const productos = document.querySelectorAll('.card');

  // Agrega un evento a cada categoría
  categorias.forEach(categoria => {
    categoria.addEventListener('click', function() {
      // Obtiene la categoría seleccionada
      const categoriaSeleccionada = this.dataset.category;
      // Filtra los productos según la categoría seleccionada
      filtrarProductos(categoriaSeleccionada);

      // Remueve la clase 'active' de todas las categorías y luego la agrega a la categoría seleccionada
      categorias.forEach(item => item.classList.remove('active'));
      this.classList.add('active');
    });
  });

  // Función para filtrar los productos según la categoría
  function filtrarProductos(categoria) {
    productos.forEach(producto => {
      // Si la categoría es 'todo' o el producto contiene la categoría, se muestra, de lo contrario se oculta
      if (categoria === 'todo' || producto.classList.contains(categoria)) {
        producto.style.display = 'block';
      } else {
        producto.style.display = 'none';
      }
    });
  }
});

// Funcion para los botones de los incrementa y decrementa la cantidad de los cards
document.addEventListener('DOMContentLoaded', function() {
  // Selecciona todos los inputs de cantidad
  const inputsCantidad = document.querySelectorAll('.cantidad');

  // Agrega eventos a cada input de cantidad
  inputsCantidad.forEach(input => {
      // Agrega evento para seleccionar todo el texto al hacer clic en el input
      input.addEventListener('click', function() {
          this.select();
      });

      // Verifica si ya se han agregado los botones de incremento y decremento
      if (!input.parentNode.querySelector('button')) {
          // Crea botones para incrementar y decrementar la cantidad
          const botonIncremento = document.createElement('button');
          botonIncremento.textContent = '+';
          botonIncremento.style.fontWeight = 'bold';
          botonIncremento.addEventListener('click', function() {
              incrementar(input);
          });

          const botonDecremento = document.createElement('button');
          botonDecremento.textContent = '-';
          botonDecremento.style.fontWeight = 'bold';
          botonDecremento.addEventListener('click', function() {
              decrementar(input);
          });

          // Agrega los botones al padre del input
          input.parentNode.appendChild(botonIncremento);
          input.parentNode.appendChild(botonDecremento);
      }
  });

  // Función para incrementar la cantidad
  function incrementar(input) {
      const valorActual = parseInt(input.value);
      input.value = valorActual + 1;
  }

  // Función para decrementar la cantidad
  function decrementar(input) {
      const valorActual = parseInt(input.value);
      if (valorActual > 1) {
          input.value = valorActual - 1;
      }
  }
});

// Funcion para la table del agregar al carrito
document.addEventListener('DOMContentLoaded', function() {
  // Seleccionar los elementos necesarios del DOM
  const botonMostrarCarrito = document.getElementById('botonMostrarCarrito');
  const contenedorCarrito = document.getElementById('contenedor-carrito');
  const botonOcultarCarrito = document.getElementById('botonOcultarCarrito');

  // Ocultar el carrito al cargar la página
  contenedorCarrito.classList.remove('active');

  // Agregar evento al botón para mostrar/ocultar el carrito
  botonMostrarCarrito.addEventListener('click', function() {
      contenedorCarrito.classList.toggle('active');
  });

  // Agregar evento al botón para ocultar el carrito
  botonOcultarCarrito.addEventListener('click', function() {
      contenedorCarrito.classList.remove('active');
  });

  // Variables para el temporizador
  let temporizadorIntervalo;
  let segundosRestantes = 60;

  // Función para cargar los datos del carrito desde el almacenamiento local
  function cargarCarritoDesdeLocalStorage() {
      // Obtener los datos del carrito guardados en el almacenamiento local
      const datosGuardados = localStorage.getItem('cartData');

      // Si hay datos guardados, cargarlos en el carrito
      if (datosGuardados) {
          const datosParseados = JSON.parse(datosGuardados);

          datosParseados.forEach(item => {
              const nuevaFila = document.createElement('tr');
              nuevaFila.dataset.codigo = item.codigo;
              nuevaFila.innerHTML = `
                  <td>${item.codigo}</td>
                  <td>${item.nombre}</td>
                  <td>${item.precio}</td>
                  <td class="cantidad"><input type="text" value="${item.cantidad}" readonly></td>
                  <td class="total">${item.total}</td>
              `;

              const cuerpoTabla = document.querySelector('.tabla-carrito tbody');
              cuerpoTabla.appendChild(nuevaFila);
          });

          // Calcular el total general
          calcularTotalGeneral();
      }
  }

  // Función para guardar los datos del carrito en el almacenamiento local
  function guardarCarritoEnLocalStorage() {
      // Obtener las filas de la tabla del carrito
      const filasTabla = document.querySelectorAll('.tabla-carrito tbody tr');
      const datosGuardados = [];

      // Iterar sobre cada fila y guardar los datos en un array
      filasTabla.forEach(fila => {
          const codigo = fila.dataset.codigo;
          const nombre = fila.cells[1].textContent;
          const precio = parseFloat(fila.cells[2].textContent);
          const cantidad = parseInt(fila.querySelector('.cantidad input').value);
          const total = parseFloat(fila.cells[4].textContent);

          datosGuardados.push({
              codigo: codigo,
              nombre: nombre,
              precio: precio,
              cantidad: cantidad,
              total: total
          });
      });

      // Guardar los datos en el almacenamiento local como cadena JSON
      localStorage.setItem('cartData', JSON.stringify(datosGuardados));
  }

  // Función para calcular el total general del carrito
  function calcularTotalGeneral() {
      // Obtener todas las filas del carrito
      const filas = document.querySelectorAll('.tabla-carrito tbody tr');
      let totalGeneral = 0;

      // Sumar los totales de todas las filas
      filas.forEach(fila => {
          const totalFila = parseFloat(fila.cells[4].textContent);
          totalGeneral += totalFila;
      });

      // Redondear hacia abajo el total general y mostrarlo en el pie de la tabla
      totalGeneral = Math.floor(totalGeneral);
      const totalGeneralElemento = document.querySelector('.tabla-carrito tfoot td:last-child');
      totalGeneralElemento.textContent = '₡' + totalGeneral;
  }

  // Función para actualizar el temporizador en la página del carrito
  function actualizarTemporizador() {
      const temporizadorElemento = document.getElementById('temporizador');

      temporizadorIntervalo = setInterval(function() {
          segundosRestantes--;
          if (segundosRestantes <= 0) {
              clearInterval(temporizadorIntervalo);
              temporizadorElemento.textContent = 'El tiempo ha expirado';
              localStorage.removeItem('cartData');
              location.reload();
          } else {
              const minutos = Math.floor(segundosRestantes / 60);
              const segundos = segundosRestantes % 60;
              temporizadorElemento.textContent = `Tiempo restante: ${minutos}:${segundos < 10 ? '0' : ''}${segundos}`;
          }
      }, 1000);
  }

  // Función para actualizar la cantidad de productos en el carrito
  function actualizarCantidadCarrito() {
      const cantidadMostrarCarritoElemento = document.getElementById('cantidadMostrarCarrito');
      const cantidadMostrarCarrito = parseInt(cantidadMostrarCarritoElemento.textContent) || 0;
      cantidadMostrarCarritoElemento.textContent = cantidadMostrarCarrito + 1;
  }

  // Llamar a la función para cargar los datos del carrito al cargar la página
  cargarCarritoDesdeLocalStorage();

  // Obtener los botones "Agregar al carrito" y agregar evento click a cada uno
  const botonesAgregarCarrito = document.querySelectorAll('.agregar-al-carrito');
  botonesAgregarCarrito.forEach(boton => {
      boton.addEventListener('click', () => {
          // Iniciar el temporizador si aún no ha sido iniciado
          if (!temporizadorIntervalo) {
              actualizarTemporizador();
          }

          // Obtener los datos del producto del botón
          const codigo = boton.getAttribute('data-codigo');
          const nombre = boton.getAttribute('data-nombre');
          const precio = parseFloat(boton.getAttribute('data-precio'));
          const cantidadInput = boton.parentElement.querySelector('.cantidad input');
          const cantidad = parseInt(cantidadInput.value);
          const total = precio * cantidad;

          // Buscar si ya existe una fila con el mismo código
          const filaExistente = document.querySelector(`.tabla-carrito tbody tr[data-codigo="${codigo}"]`);

          if (filaExistente) {
              // Si existe, actualizar la cantidad y el total
              const cantidadCelda = filaExistente.querySelector('.cantidad input');
              const nuevaCantidad = parseInt(cantidadCelda.value) + cantidad;
              cantidadCelda.value = nuevaCantidad;
              filaExistente.querySelector('.total').textContent = precio * nuevaCantidad;
          } else {
              // Si no existe, agregar una nueva fila al carrito
              const nuevaFila = document.createElement('tr');
              nuevaFila.dataset.codigo = codigo;
              nuevaFila.innerHTML = `
                  <td>${codigo}</td>
                  <td>${nombre}</td>
                  <td>${precio}</td>
                  <td class="cantidad"><input type="text" value="${cantidad}" readonly></td>
                  <td class="total">${total}</td>
              `;

              const cuerpoTabla = document.querySelector('.tabla-carrito tbody');
              cuerpoTabla.appendChild(nuevaFila);

              cantidadInput.value = 1; // Establecer el valor a 1
          }

          // Calcular el total general del carrito
          calcularTotalGeneral();

          // Guardar los datos del carrito en el almacenamiento local
          guardarCarritoEnLocalStorage();

          // Actualizar la cantidad de productos en el carrito
          actualizarCantidadCarrito();
      });
  });
});

// Esto es para que cuando se envie el correo aparezca un mensaje 
document.querySelector('formulario-contacto').addEventListener('submit', function(event) {
    event.preventDefault(); // Evitar que el formulario se envíe automáticamente
    
    // Envía el formulario de forma asincrónica utilizando Fetch API o XMLHttpRequest
    fetch('https://formsubmit.co/2a1680794fd69a882a28c2cdff5f6000', {
        method: 'POST',
        body: new FormData(this)
    })
    .then(response => {
        if (response.ok) {
            alert("Pronto nos pondremos en contacto contigo.");
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
document.querySelector('formulario-contacto').addEventListener('submit', function(event) {
    guardarDatos();
});

// Para cuando presiono el boton de comprar me aparezca otra hoja de html
document.addEventListener('DOMContentLoaded', function() {
  const listaProductos = document.getElementById('lista-productos');

  // Recuperar los datos del carrito del almacenamiento local
  const datosGuardados = localStorage.getItem('cartData');

  if (datosGuardados) {
      const datosParseados = JSON.parse(datosGuardados);

      // Iterar sobre los datos del carrito y mostrarlos en la lista de productos
      datosParseados.forEach(item => {
          const nombreProducto = item.nombre;
          const cantidadProducto = item.cantidad;

          // Crear un elemento de lista para cada producto
          const itemProducto = document.createElement('li');
          itemProducto.textContent = `${nombreProducto} - Cantidad: ${cantidadProducto}`;

          // Agregar el elemento de lista al contenedor de lista de productos
          listaProductos.appendChild(itemProducto);
      });
  }

  // Agregar evento para limpiar el carrito cuando se envía el formulario
  const formularioCompra = document.getElementById('formulario-compra');
  formularioCompra.addEventListener('submit', function(event) {
      // Evitar que el formulario se envíe por defecto
      event.preventDefault();

      // Limpiar la tabla del carrito (eliminar filas)
      const cuerpoTabla = document.querySelector('.tabla-carrito tbody');
      cuerpoTabla.innerHTML = '';

      // Limpiar el almacenamiento local
      localStorage.removeItem('cartData');

      window.location.href = 'productos.html';
  });
});

// se encarga de mostrar los productos del carrito en una lista, incluyendo sus nombres y cantidades, en el momento en que se hace clic en el botón "Comprar Azul"
document.addEventListener('DOMContentLoaded', function() {
  const botonCompraAzul = document.getElementById('botonComprarAzul');
  const listaProductosCarrito = document.getElementById('lista-productos');

  botonCompraAzul.addEventListener('click', function() {
      const filasProductos = document.querySelectorAll('.tabla-carrito tbody tr');
      
      // Limpiamos la lista de productos en el carrito antes de agregar nuevos
      listaProductosCarrito.innerHTML = '';

      filasProductos.forEach(function(fila) {
          const nombre = fila.querySelector('td:nth-child(2)').innerText;
          const cantidad = fila.querySelector('td:nth-child(4)').innerText;

          // Creamos un elemento de lista con los detalles del producto
          const productoItem = document.createElement('li');
          productoItem.textContent = `${nombre} - Cantidad: ${cantidad}`;

          // Agregamos el elemento de lista a la lista de productos en el carrito
          listaProductosCarrito.appendChild(productoItem);
      });
  });
});
