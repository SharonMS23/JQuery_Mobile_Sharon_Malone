
var ListaHoteles = [];
var LatLngInicial = "";
var LatLngInicialDatos = "";
var opciones = {};
var opcionesDatos = {};
var mapa = "";
var mapaDatos = "";
var marcador = "";
var marcadorDatos = "";
var posLatDraggable = 0;
var posLonDraggable = 0;

//-------------------------------------------------------------------------
//-------------------------------------------------------------------------


function cambiarPagina(pagina){
	
	$.mobile.changePage("#"+pagina);

}

function limpiar(){

    $("#nombre").val("");
	$("#ciudad").val("");
	$("#telefono").val("");
	$("#estrellas").val("");

	marcador.setMap(null);

	marcador = new google.maps.Marker({
		position : new google.maps.LatLng(-12.0464, -77.0428),
		map : mapa,
		draggable : true,
		title : "Punto 1"
	});

	google.maps.event.addListener (marcador, 'dragend', function(event){
		posLatDraggable = event.latLng.lat();
		posLonDraggable = event.latLng.lng();
	});

}

function cambiar(num){

	$("#mostrarDatos").text("");

	var mostrarDatos = "<br> Nombre: " + ListaHoteles[num].nombre +
					   "<br> Ciudad: " + ListaHoteles[num].ciudad +
					   "<br> Telefono: " + ListaHoteles[num].telefono + 
					   "<br> Estrellas: " + ListaHoteles[num].estrellas +
					   "<br><br>" +
					   "Ubicacion:" +
					   "<div class='ui-field-contain' name='ubicacionDatos' id='ubicacionDatos'></div>";

	$("#mostrarDatos").append(mostrarDatos);
	
	LatLngInicialDatos = new google.maps.LatLng(ListaHoteles[num].posLatitud,ListaHoteles[num].posLongitud);

	opcionesDatos = {
		zoom : 5,
		center : LatLngInicialDatos,
		mapTypeId : google.maps.MapTypeId.ROADMAP
	};

	mapaDatos = new google.maps.Map(document.getElementById("ubicacionDatos"), opcionesDatos);

	marcadorDatos = new google.maps.Marker({
		position : LatLngInicialDatos,
		map : mapaDatos,
		title : "Ubicacion"
	});

	cambiarPagina("datosHotel");
}


//--------------------------------------------------------------------------
//--------------------------------------------------------------------------


$(document).ready(function (){

	LatLngInicial = new google.maps.LatLng(-12.0464, -77.0428);

	opciones = {
		zoom : 5,
		center : LatLngInicial,
		mapTypeId : google.maps.MapTypeId.ROADMAP
	};

	mapa = new google.maps.Map(document.getElementById("ubicacion"), opciones);

	marcador = new google.maps.Marker({
			position : LatLngInicial,
			map : mapa,
			draggable : true,
			title : "Punto 1"
	});

	google.maps.event.addListener (marcador, 'dragend', function(event){
		posLatDraggable = event.latLng.lat();
		posLonDraggable = event.latLng.lng();
	});


	//---------------------------------------------------------
	//---------------------------------------------------------


	$("#botonRegistrar").click(function(){

		var sNombre = $("#nombre").val();
		var sCiudad = $("#ciudad").val();
		
		if(posLatDraggable != 0){
			var ubiLatitud = posLatDraggable;
		}else {
			var ubiLatitud = -12.0464;
		}

		if(posLonDraggable != 0){
			var ubiLongitud = posLonDraggable;
		}else{
			var ubiLongitud = -77.0428;
		}

		var sTelefono = $("#telefono").val();
		var sEstrellas = $("#estrellas").val();

		hoteles = {
			nombre : sNombre,
			ciudad : sCiudad,
			posLatitud : ubiLatitud,
			posLongitud : ubiLongitud,
			telefono : sTelefono,
			estrellas : sEstrellas
		}

		ListaHoteles.push(hoteles);
		limpiar();

	});


	$("#listado").click(function(){

		$("#tbodylistado").text("");

		var listado ="";

		for (var i = 0; i < ListaHoteles.length; i++) {
			
			listado +="<tr>"+
							"<td><a onclick='cambiar("+ i +")' class='ui-btn'>"+ ListaHoteles[i].nombre +"</a></td>"+
					  "</tr>";
		}

		$("#tbodylistado").append(listado);
		cambiarPagina("listado");

	});

});