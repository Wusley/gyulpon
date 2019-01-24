var blog = null, posts = null,

// PAGINACAO
pageSelectCallback = function(page_index, jq) {
	// Get number of elements per pagionation page from form
	var items_per_page = 5, numPosts;

	if (posts === null) {
		numPosts = $(blog).find("post").length;
	} else {
		numPosts = posts.length;
	}

	var max_elem = Math.min((page_index + 1) * items_per_page, numPosts);

	new contentFactory(page_index * items_per_page, max_elem);

	// Prevent click event propagation
	return false;
},

// MONTAGEM DA PAGINA BLOG
contentFactory = function(min, max) {
	var schema = $("div.container").html();

	$("section.post").html("");

	// PERCORRENDO OBRAS
	for ( var postId = min; postId < max; postId++) {
		var auxPostId = postId;

		if (posts !== null) {
			auxPostId = posts[postId];
		}

		$("section.post").append(schema);

		// COLETANDO DADOS
		var titulo = $(blog).find("post:eq(" + auxPostId + ")").find("titulo")
				.text();
		var data = {
			'dia' : $(blog).find("post:eq(" + auxPostId + ") data").find("dia")
					.text(),
			'mes' : $(blog).find("post:eq(" + auxPostId + ") data").find("mes")
					.text(),
			'ano' : $(blog).find("post:eq(" + auxPostId + ") data").find("ano")
					.text(),
			'semana' : $(blog).find("post:eq(" + auxPostId + ") data").find(
					"semana").text()
		}
		var texto = $(blog).find("post:eq(" + auxPostId + ")").find(
				"texto:first").text();

		// INJETANDO DADOS
		$("article.post:eq(" + (postId - min) + ")").find(".titulo").html(
				titulo);
		$("article.post:eq(" + (postId - min) + ")").find(
				"div.conteudo header.data span.semana").html(data.semana);
		$("article.post:eq(" + (postId - min) + ")").find(
				"div.conteudo header.data span.dia").html(data.dia);
		$("article.post:eq(" + (postId - min) + ")").find(
				"div.conteudo header.data span.mes").html(
				formatMes(parseInt(data.mes)));
		$("article.post:eq(" + (postId - min) + ")").find(
				"div.conteudo header.data span.ano").html(data.ano);
		$("article.post:eq(" + (postId - min) + ")").find(
				"div.conteudo article.texto").html(texto);

	}
},

// INICIAR A PRIMEIRA PAGINA BLOG E INSERIR A PAGINACAO NA FUN DO PLUGIN
// PAGINATION
callback = function() {
	// new pageSelectCallback(0, 5);

	return {
		callback : pageSelectCallback
	};
},

// CONVERTER NUMEROS EM NOMES DOS MESES
formatMes = function(data) {
	switch (data) {
	case 1:
		return "Janeiro";
	case 2:
		return "Fevereiro";
	case 3:
		return "Março";
	case 4:
		return "Abril";
	case 5:
		return "Maio";
	case 6:
		return "Junho";
	case 7:
		return "Julho";
	case 8:
		return "Agosto";
	case 9:
		return "Setembro";
	case 10:
		return "Outubro";
	case 11:
		return "Novembro";
	case 12:
		return "Dezembro";
	default:
		return null;
	}
};
