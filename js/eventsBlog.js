$(document).ready(function() {
	new CallXmlBlog("xmls/post.xml");
});

// AUMENTAR E DIMINUIR FONT
$('.ampliar span:eq(0)').die('click');
$('.ampliar span:eq(0)').live('click', function() {
	new reduzirFont("article.post h1.titulo");
	new reduzirFont("article.post div.conteudo header.data");
	new reduzirFont("article.post article.texto *");
});

$('.ampliar span:eq(1)').die('click');
$('.ampliar span:eq(1)').live('click', function() {
	new ampliarFont("article.post h1.titulo");
	new ampliarFont("article.post div.conteudo header.data");
	new ampliarFont("article.post article.texto *");
});
// /////////////////////////

// PESQUISAR
$("article.pesquisar button").die('click');
$("article.pesquisar button")
		.live(
				'click',
				function() {
					posts = [];
					var padrao = new RegExp('\\W', 'g');

					// filtrando pesquisa
					var str = $(this).siblings("input").val().replace(padrao,
							'');

					if (str !== '' && str !== null) {
						var search = new RegExp(str, "im");

						for ( var postId = 0; postId < $(blog).find("post").length; postId++) {
							// COLETANDO DADOS
							var post = $(blog).find("post:eq(" + postId + ")")
									.find("*").text();

							if (search.test(post)) {
								posts.push(postId);
							}
						}

						// gerando aviso
						new gerarAviso(posts.length);

						// Create callback
						var call = new callback();
						$("#paginacao").pagination(posts.length, call);
					}
				});
// //////////

// PESQUISANDO POR TAG
$("#nuvem div#tagList ul a").die('click');
$("#nuvem div#tagList ul a").live('click', function() {
	var that = this;
	posts = [];

	for ( var postId = 0; postId < $(blog).find("post").length; postId++) {
		var status = false;

		// coletando dados
		var tags = $(blog).find("post:eq(" + postId + ")").find("tags").text();

		tags.split(',').forEach(function(_el, _id) {
			if (_el === $(that).text()) {
				status = true;
			}
		});

		if (status) {
			posts.push(postId);
		}
	}

	// gerando aviso
	new gerarAviso(posts.length);

	// Create callback
	var call = new callback();
	$("#paginacao").pagination(posts.length, call);
});
// ////////////////////

// PESQUISANDO POR DATA
var filtroCalendario = function(data) {
	posts = [];

	for ( var postId = 0; postId < $(blog).find("post").length; postId++) {
		if (parseInt(data.selectedDay) === parseInt($(blog).find(
				"post:eq(" + postId + ") data").find("dia").text())
				&& parseInt(data.selectedMonth) + 1 === parseInt($(blog).find(
						"post:eq(" + postId + ") data").find("mes").text())
				&& parseInt(data.selectedYear) === parseInt($(blog).find(
						"post:eq(" + postId + ") data").find("ano").text())) {

			posts.push(postId);
		}
	}

	// gerando aviso
	new gerarAviso(posts.length);

	// Create callback
	var call = new callback();
	$("#paginacao").pagination(posts.length, call);
},
// /////////////////////

// GERANDO AVISO
gerarAviso = function(data) {
	$("section.aviso").fadeIn(300);

	// INJETANDO DADOS PARA AVISO
	$("span.qtd").text(posts.length);

	if (data > 1) {
		$("span.si-pl").text("Postagens");
	} else {
		$("span.si-pl").text("Postagem");
	}
	// ///////////////////////////
};
// //////////////
