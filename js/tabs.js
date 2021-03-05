(function(){

	//Objetos de Propiedades de tab
	var propiedadesTabs = {

		primerEncabezado: document.getElementById('encabezado_menu').firstElementChild,
		primerContenido: document.getElementById('contenido_menu').firstElementChild,
		/*Aquí podemos seleccionar varios elementos: selecionamos el id de ul y
		luego seleccionamos los elementos 'li' y 'a' que están dentro el 'ul' */
		enlacesEncabezados: document.querySelectorAll('#encabezado_menu li a'),
		//selecionamos solo los elementos li del menu
		li_encabezados: document.querySelectorAll('#encabezado_menu li'),
		//selecionamos los hijos directos(div), que son postres y cafes del contenido menu
		divs_contenido: document.querySelectorAll('#contenido_menu > div'),
		contenido_activo: null, //para poder alamenar el href del los enlaces 'a'
	}

	//Metodos de tab
	var metodosTabs = {

		inicio: function() {

			propiedadesTabs.primerEncabezado.className = 'active';
			propiedadesTabs.primerContenido.className = 'active';

			//recorremos todos los elementos que tiene el 'ul' de los enlaces
			for (var i = 0; i < propiedadesTabs.enlacesEncabezados.length; i++) {
				//le damos un eventos click
				propiedadesTabs.enlacesEncabezados[i].addEventListener('click', metodosTabs.evento);
			}
		},

		evento: function(e) { /* le pasamos el párametro 'e', para decirle que acceda al evento,
			que este caso es el de click */
			/* el 'e.preventDefault', previene un evento por ejemplo si tenemos un enlace y al id del enlace
			le ponemos este preventDefault, al hacer click, no nos mandará a su enlace ya que evita o previene
			el funcionamiento por defecto del elemento, no a todos los elementos les sirve esto. En este caso queremos
			que al hacer click en algún enlace del menu, no nos muestre el id '#postres' del elemento en la url, y así
			se quede esa parte vacía.
			 */
			e.preventDefault();
			//recorremos todos los elementos li del menu
			for (var i = 0; i < propiedadesTabs.li_encabezados.length; i++) {
				//cada vez que hacemos click le quitamos cualquier clase que tenga en este caso el de active
				propiedadesTabs.li_encabezados[i].className='';
			}

			//recorremos todos los elementos divs y le quitamos las clases
			for (var i = 0; i < propiedadesTabs.divs_contenido.length; i++) {
				propiedadesTabs.divs_contenido[i].className='';
			}

			/* Con esto queremos seleccionar el elemento padre del elemento al cual
			estoy haciendo click. Y al que estoy haciendo click en este caso es a
			elemento 'a' y queremos obtener su elemento padre el 'li' y ponerle
			la clase 'active', el cual nos permite mostrar el menu según el enlace
			al cual hacemos click.En si le asignamos el la calse 'active' al elemento padre
			que le hacemos click */
			this.parentElement.className = 'active';
			/* esto es para obtener el atributo de href(su valor) del elemento al que le de click,
			en este caso a los enlaces y ese valor el href lo almacenamos en 'contenido_activo' */
			propiedadesTabs.contenido_activo = this.getAttribute('href');

			/*
			Y entonces con el 'querySelector', le pasamos como párametro el valor que obtenga de 'contenido_activo'
			según al elemento que le demos click, obtenemos el nombre que tiene su 'href' y el 'querySelector' se
			encarga de buscar en todo el documento el primer elemento que tenga como párametro el nombre dentro el 'href'
			y cuando lo encuentre que le de la clase 'active' y de esa manera podemos navegar entre los dos menus
			*/
			document.querySelector(propiedadesTabs.contenido_activo).className = 'active';

			//le damos un opacity de 0 al primer elemento que encuentre con el nombre que tiene su 'href', para hacer un efecto de cambio enetre los menus
			document.querySelector(propiedadesTabs.contenido_activo).style.opacity = 0;

			//hacemos un intervalo de tiempo para poder pasar de un menu a otro cambiando su opacidad
			setTimeout(function(){
				document.querySelector(propiedadesTabs.contenido_activo).style.opacity = 1;
			}, 100);
		}
	}

	metodosTabs.inicio();

}())
