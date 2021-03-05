//protegemos nuestro código
(function(){

//Creamos el slider para las imgs

/*Propiedades Slider*/
var propiedadesSlider = {

	//obtenemos al padre de los slides
	slider: document.getElementById('slider'),
	primerSlide: null //es donde vamos almacenar el primer slide do todos
}


/*Métodos Slide*/
var metodosSlider = {

	inicio: function() {
		//tiempo cada cuanto cambia la img, cada 3 segundos, en un ciclo
		setInterval(metodosSlider.moverSlide, 3000);
	},

	moverSlide: function() {
		//creamos una transición
		propiedadesSlider.slider.style.transition = 'all 1s ease';
		/*Recorremos la primera img -100%, para mostrar la siguiente img*/
		propiedadesSlider.slider.style.marginLeft = '-100%';

		//con esto le decimos que solo una vez se repita cada img en cada ciclo que se ejecute
		setTimeout(function() {
			/*aquí asignamos a la propiedad de primerSlide el valor de
			el primer elemento de los sliders o sea la preimera img.*/
			propiedadesSlider.primerSlide = propiedadesSlider.slider.firstElementChild;

			/*ahora introducimos un nuevo nodo al nodo padre que es el mismo primer
			elemento que capturamos arriba, esto es para que el primer elemento o sea
			la primera img se mueva al último elemento y así el que era el 2do se vuelve
			1ro y el que era 3ro se vuelve 2do y el 1ro se vuelve 3ro y así sucesivamente
			van cambiando de lugar en el intervalo de 1 segundo*/
			propiedadesSlider.slider.appendChild(propiedadesSlider.primerSlide);

			//le quitamos la transición para que no nos muestre las img con el efecto de ir y volver
			propiedadesSlider.slider.style.transition = 'unset';
			//y cambiamos el margin a 0 pra que nos muestre la img
			propiedadesSlider.slider.style.marginLeft = 0;

		}, 1000);
	}
}

metodosSlider.inicio();

}())