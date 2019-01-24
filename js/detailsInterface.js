// METODOS PARA AMBLIAR E REDUZIR FONTS
var ampliarFont = function(obj) {
	$(obj).css({
		"font-size" : parseInt($(obj).css("font-size")) + 1
	});
},

reduzirFont = function(obj) {
	$(obj).css({
		"font-size" : parseInt($(obj).css("font-size")) - 1
	});
},
// /////////////////////////////////////

// Corrige alteracao no tamano do footer
footerFix = function(data) {
	// elemento invisivel para manter layout posicionado
	$(".auxiliar-footer").css({
		'height' : data
	});
},

logo = function() {
	var position = {
		// X Y
		0 : '-2px -4px',
		1 : '-70px -4px',
		2 : '-137px -4px',
		3 : '-205px -4px',
		4 : '-273px -4px',
		5 : '-343px -4px',
		6 : '-413px -4px',
		7 : '-480px -4px',
		8 : '-548px -4px',
		9 : '-617px -4px',
		10 : '-685px -4px',
		11 : '-754px -4px',
		12 : '-822px -4px',
		13 : '-890px -4px',
		14 : '-958px -4px',
		15 : '-1027px -4px',
		16 : '-1093px -4px'
	}

	return function() {
		return position[Math.floor(Math.random() * 17)];
	}
};

// recebe a altura do elemento principal para corrigir no auxiliar
new footerFix($("footer.principal").height());
