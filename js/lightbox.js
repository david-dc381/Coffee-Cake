/* creamos esta función para proteger nuestro código
al meterlo dentro este código evitamos que otro script
intervenga con este y así evitar conflictos. */
(function () {

//Vamos a hacer el efecto de sobresalir las img en la portada

/* Objeto con las Propiedades del efecto Lightbox */
var propiedadLightbox = {

	//obtenemos la clase lightbox dentro una propiedad
	imgContainer: document.getElementsByClassName('lightbox'),
	imagen: null, //para obtener la imágen
	imagenSrc: null, //para obtener la url de la img
	cuerpoDom: document.getElementsByTagName('body')[0], //es para selecionar el body 
	modal: null, //para crear el modal de la img
	cerrarModal: null, //para eliminar el modal de la img
	animacion: 'fade',
}


/* Objeto con los Métodos del efecto Lightbox */
var metodoLightbox = {

	//creamos una función dentro una propiedad
	inicio: function() {

		//recorremos todos los elementos html, con clase lightbox
		for (var i = 0; i < propiedadLightbox.imgContainer.length; i++) {
			
			//y a cada uno le damos un evento click y pasandole otra propiedad capturaImagen
			propiedadLightbox.imgContainer[i].addEventListener('click', metodoLightbox.capturaImagen);

		}
	}, 

	//función que permite capturar el elemento html, cuando se hace clik cobre la img
	capturaImagen: function() {
		propiedadLightbox.imagen = this; //seleccionamos ese elemento en el que se hace click en especifico
		metodoLightbox.lightbox(propiedadLightbox.imagen); //obtenemos la img
	},

	lightbox: function(imagen) {//pasamos como párametro la img
		//obtenemos la url de la img
		/* con window.getComputedStyle, obtenemos todos los estilos de la pagina, como 
		primer párametro pasamos el elemento del cual queremos obtener los estilos 
		y como 2do párametro es un pseudoelemento del elemento que obtenemos 
		pero como no queremos un pseudoelemento pasamos un null. 
		backgroundImage.- obtenemos la url de la img, y con slice cortamos la url
		ya que solo queremos el nombre de la url, quitando: 'url(" ") ', la parte del
		inicio y del final y con los párametros de 5 que es la cantidad que vamos a
		quitar del inicio y -2 es la cantidad de caracteres que vamos a quitar del final.
		*/
		propiedadLightbox.imagenSrc = window.getComputedStyle(imagen, null).backgroundImage.slice(5, -2);
		
		//creamos un nuevo elemento en el DOM
		propiedadLightbox.cuerpoDom.appendChild(document.createElement('DIV')).setAttribute('id', 'lightbox_container');
		propiedadLightbox.lightbox_container = document.getElementById('lightbox_container');

		//aplicamos estilos a este nuevo div
		propiedadLightbox.lightbox_container.style.width = '100%';
		propiedadLightbox.lightbox_container.style.height = '100%';
		propiedadLightbox.lightbox_container.style.position = 'fixed';
		propiedadLightbox.lightbox_container.style.zIndex = '1000';
		propiedadLightbox.lightbox_container.style.background = 'rgba(0,0,0,0.8)';
		propiedadLightbox.lightbox_container.style.top = '0';
		propiedadLightbox.lightbox_container.style.left = '0';

		//creamos un nuevo div dentro del anterior
		propiedadLightbox.lightbox_container.appendChild(document.createElement('DIV')).setAttribute('id', 'modal');
		propiedadLightbox.modal = document.getElementById('modal');

		//obtenemos la img por su url
		propiedadLightbox.modal.style.height = '100%';
		propiedadLightbox.modal.appendChild(document.createElement('IMG')).setAttribute('src', propiedadLightbox.imagenSrc);
		propiedadLightbox.modal.getElementsByTagName('img')[0].setAttribute('class', 'imagen-modal');

		//creamos el efecto de las imgs para aparecer de una manera más suave
		if (propiedadLightbox.animacion == 'fade') {
			document.getElementsByClassName('imagen-modal')[0].style.opacity = 0; //hacemos que no sea visible la img
			
			//le damos un pequeño retardo para poder aparecer la img, un tiempo de 50 milisegunddos
			setTimeout(function() {
				document.getElementsByClassName('imagen-modal')[0].style.opacity = 1;//hacemos que sea visible la img
			}, 50);
		}

		
		/*añadimos el '+=', para decirle que al elemento anterior que habia se le añada este icono
		porque si no lo declaramos así el icono ocupara el lugar de la img*/
		propiedadLightbox.modal.innerHTML += '<i id="cerrar_modal" class="fa fa-times" aria-hidden="true"></i>';

		//esto es para cerrar el modal de la img
		propiedadLightbox.cerrarModal = document.getElementById('cerrar_modal');
		propiedadLightbox.cerrarModal.addEventListener('click', metodoLightbox.cerrarModal);

	},
	//función para remomer el modal
	cerrarModal: function() {
		//eliminamos el div, que creamos al principio
		propiedadLightbox.cuerpoDom.removeChild(propiedadLightbox.lightbox_container);
	}

}

//llamamos a la función que esta en inicio dentro metodoLightBox
metodoLightbox.inicio();

}())