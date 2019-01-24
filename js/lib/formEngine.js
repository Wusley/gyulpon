// CLASS VALIDATOR
var Validator = function() {
	var er = {
		'vazio' : /^([ \t]+$)/,
		'numero' : /\d/g,
		'email' : /^([\w-]+(\.[\w-]+)*)@(( [\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(\.[a-z]{2})?)$/i
	}

	return {
		email : function(data) {
			var status = false;

			if (er['email'].test(data)) { // email
				status = true;
			} else {
				status = false;
			}

			return status;
		},

		nome : function(data) {
			var status = false;

			if (!er['numero'].test(data) && // numero nome
			!er['vazio'].test(data) && // vazio nome
			data.length > 0) { // vazio nome
				status = true;
			} else {
				status = false;
			}

			return status;
		},

		mensagem : function(data) {
			var status = false;

			if (!er['vazio'].test(data) && // vazio mensagem
			data.length > 0) { // vazio mensagem
				status = true;
			} else {
				status = false;
			}

			return status;
		}
	}
},

// RESETA CAMPOS FORM
resetaForm = function(alerta, form) {
	window.setTimeout(resetar, 5000);

	function resetar() {
		$(alerta).fadeOut(300).html('');

		$(form).each(function() {
			this.reset();
		});
	}
};