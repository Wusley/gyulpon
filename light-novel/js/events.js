$(document).ready(function() {
	// chama a pagina
	new CallHtml("light-novel/sobre.html", "section.app section");

	// menu titulos
	new CallXmlTitulos("light-novel/xmls/menu.xml");

	// insere efeitos da tela
	scenario = new Scenario();
});

$(window).resize(function() {
});

// CLICK
$("ul.titulos a[rel='link']").die('click');
$("ul.titulos a[rel='link']").live('click', function() {
	// RESETA TODOS ESTADOS
	$("ul.titulos").find("a[rel='link']").css({
		"color" : "rgba(255,255,255,1)"
	});

	// APLICA ESTADO NO OBJ CLICADO
	$(this).css({
		"color" : "rgba(242,107,29,1)"
	});

	var op = $(this).attr("class"); // opcao escolhida

	new injetContent(op, $(this)); // injetando conteudo
});

// SELECIONA TITULO
$('a.titulo').die('click');
$('a.titulo').live('click',
		function(e) {
			var status = $(this).find("div").attr("class");

			if (status === "foundicon-plus") {
				// RESETA TODOS ESTADOS
				$(this).parents("ul.titulos").find("li.titulo")
						.find("a.titulo").css({
							"color" : "rgba(255,255,255,1)"
						}).find("div").attr("class", "foundicon-plus");

				$(this).parents("ul.titulos").find("ul").css({
					"display" : "none"
				}).find("a").css({
					"color" : "rgba(255,255,255,1)"
				}).find("div").attr("class", "foundicon-plus");

				// APLICA NOVO ESTADO NO OBJ CLICADO
				$(this).css({
					"color" : "rgba(242,107,29,1)"
				}).find("div").attr("class", "foundicon-minus");

				$(this).parents("li.titulo").find("ul.indice").css({
					"display" : "table"
				});

				$('.loading').css({
					'margin-top' : display.getHeight() / 2 - 20
				}).show(); // LOADING pagina
				$('img.loading-novel').css({
					"display" : "none"
				}); // reseta todos outros loads menu
				$(this).siblings('img.loading-novel').css({
					"display" : "inline"
				}); // load menu

				$("section.app section").html(''); // resetando local

				// cria menu conteudo obra
				new CallXmlObra("light-novel/xmls/obras/" + $(this).attr('alt')
						+ "/titulo.xml", $(this));
			} else {
				$(this).css({
					"color" : "rgba(255,255,255,1)"
				}).find("div").attr("class", "foundicon-plus");

				$(this).siblings('img.loading-novel').css({
					"display" : "none"
				}); // load menu

				$(this).parents("ul.titulos").find("ul, a.sinopse").css({
					"display" : "none"
				});
			}
		});
// ////////////////

// SELECIONA VOLUME
$('a.volume').die('click');
$('a.volume').live(
		'click',
		function() {
			var status = $(this).find("div").attr("class");
			if (status === "foundicon-plus") {
				// RESETA TODOS ESTADOS
				$(this).parents("ul.indice").find("li.volume").find("a.volume")
						.css({
							"color" : "rgba(255,255,255,1)"
						}).find("div").attr("class", "foundicon-plus");

				$(this).parents("ul.indice").find("ul").css({
					"display" : "none"
				}).find("a").css({
					"color" : "rgba(255,255,255,1)"
				}).find("div").attr("class", "foundicon-plus");

				// APLICA NOVO ESTADO NO OBJ CLICADO
				$(this).css({
					"color" : "rgba(242,107,29,1)"
				}).find("div").attr("class", "foundicon-minus");

				$(this).parents("li.volume").find("ul.capitulos").css({
					"display" : "block"
				});

				var obra = $(this).parents('li.titulo').find('a:eq(0)').attr(
						'alt'), volume = $(this).attr('alt');

				$('img.loading-novel').css({
					"display" : "none"
				}); // reseta todos outros loads menu
				$(this).siblings('img.loading-novel').css({
					"display" : "inline"
				}); // load menu

				// cria menu conteudo obra
				new CallXmlVol("light-novel/xmls/obras/" + obra + "/volume"
						+ volume + ".xml", $(this));
			} else {
				$(this).css({
					"color" : "rgba(255,255,255,1)"
				}).find("div").attr("class", "foundicon-plus");

				$(this).siblings('img.loading-novel').css({
					"display" : "none"
				}); // load menu

				$(this).parents("ul.indice").find("ul, a.prologo").css({
					"display" : "none"
				});
			}
		});
// ////////////////

// SELECIONA EXTRA
$('a.extra').die('click');
$('a.extra').live('click', function() {
	var status = $(this).find("div").attr("class");
	if (status === "foundicon-plus") {
		// RESETA TODOS ESTADOS
		$(this).parents("ul.capitulos").find("li.extra").find("a.extra").css({
			"color" : "rgba(255,255,255,1)"
		}).find("div").attr("class", "foundicon-plus");

		$(this).parents("ul.capitulos").find("ul").css({
			"display" : "none"
		}).find("a").css({
			"color" : "rgba(255,255,255,1)"
		}).find("div").attr("class", "foundicon-plus");

		// APLICA NOVO ESTADO NO OBJ CLICADO
		$(this).css({
			"color" : "rgba(242,107,29,1)"
		}).find("div").attr("class", "foundicon-minus");

		$(this).parents("li.volume").find("ul").css({
			"display" : "block"
		});
	} else {
		$(this).css({
			"color" : "rgba(255,255,255,1)"
		}).find("div").attr("class", "foundicon-plus");

		$(this).parents("ul.capitulos").find("ul").css({
			"display" : "none"
		});
	}
});
// ////////////////

// AUMENTAR E DIMINUIR FONT
$('.ampliar span:eq(0)').die('click');
$('.ampliar span:eq(0)').live('click', function() {
	new reduzirFont("article.novel h1.titulo"); // reduz titulo
	new reduzirFont("article.novel div.conteudo *"); // reduz conteudo
});

$('.ampliar span:eq(1)').die('click');
$('.ampliar span:eq(1)').live('click', function() {
	new ampliarFont("article.novel h1.titulo"); // amplia titulo
	new ampliarFont("article.novel div.conteudo *"); // amplia conteudo
});
// /////////////////////////

// MAXIMIZAR E MINIMIZAR
$('.tela-cheia').die('click');
$('.tela-cheia').live('click', function() {
	var efeito = scenario.getTela();

	// verifica estado atual
	if (efeito.tela === 'ampliado') {
		$('.geral').css({
			'display' : 'none'
		}); // esconde geral
		$('article.novel').css({
			'margin' : '5px'
		}); // acrescenta margem na novel
		$('section#tela-cheia').html($('section.container').html()).css({
			'z-index' : '999'
		}).fadeIn(200); // recebe conteudo da novel
		$('.tela-cheia').css({
			'background-position' : efeito.estado
		}); // altera icone
		$('section.container').html(''); // remove conteudo da novel
											// principal para evitar conflitos
	} else {
		// faz o inverso da decisao anterior
		$('.geral').fadeIn(200);
		$('article.novel').css({
			'margin' : '0px'
		});
		$('section.container').html($('section#tela-cheia').html());
		$('section#tela-cheia').html('').css({
			'z-index' : '-1'
		}).hide();
		$('.tela-cheia').css({
			'background-position' : efeito.estado
		});
	}
});
// //////////////////////

// APAGAR E ACENDER LUZ
$('.luz').die('click');
$('.luz')
		.live(
				'click',
				function() {
					var efeito = scenario.getLuz();

					/*
					 * Elementos modificados :- - Icone tela-cheia - Itens
					 * ampliar - Titulo - Texto - Background-color -
					 * Border-color
					 */

					// verifica estado atual
					if (efeito.luz === 'off') {
						$('.luz').css({
							'background-position' : efeito.posicaoLuz
						}); // altera icone
						$('.tela-cheia').css({
							'background-position' : efeito.posicaoTela
						}); // altera icone
						$('article.novel').css({
							'background-color' : '#212121',
							'border-color' : '#ffffff'
						});
						$(
								'article.novel section.ampliar span, article.novel h1.titulo, article.novel div.conteudo')
								.css({
									'color' : '#ffffff'
								});
					} else {
						// faz o inverso da decisao anterior
						$('.luz').css({
							'background-position' : efeito.posicaoLuz
						}); // altera icone
						$('.tela-cheia').css({
							'background-position' : efeito.posicaoTela
						}); // altera icone
						$('article.novel').css({
							'background-color' : '#ffffff',
							'border-color' : '#212121'
						});
						$(
								'article.novel section.ampliar span, article.novel h1.titulo, article.novel div.conteudo')
								.css({
									'color' : '#000000'
								});
					}
				});
// //////////////////////
