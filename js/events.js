$("img").hisrc({
	minwidth : 800
}); // responsividade nas imagens

window.onload = function() {
	// iniciando controle de dimensao da tela
	display = new Display(document.body.offsetWidth, document.body.offsetHeight);

	// logo
	// $('.logotipo').css({'background-position': new
	// logo(),'visibility':'visible'});
}

$(window).resize(function() {
	// atualiza dimensoes da tela
	display.update(this.innerWidth, this.innerHeight);

	// recebe a altura do elemento principal para corrigir no auxiliar
	new footerFix($("footer.principal").height());
});

// SELECT
$("ul.select li.selected ul li").die('click');
$("ul.select li.selected ul li").live('click', function() {
	var select = $(this).html();

	$("ul.select li.selected span").html(select);
	$("ul.select li.selected ul").animate({
		height : 'toggle'
	}, 300);
});

$("ul.select li.btn").die('click');
$("ul.select li.btn").live('click', function() {
	$("ul.select li.selected ul").animate({
		height : 'toggle'
	}, 300);
});
// ///////

// MENU PRINCIPAL
$('nav.principal li a').click(function() {
	var href = $(this).attr('class'); // recebe as coord da pagina

	$(this).attr('href', 'javascript:void'); // evita o refresh

	$('nav.principal li a').each(function() {
		$(this).removeAttr('id').parents('li').css({
			'border-bottom-color' : 'transparent'
		}); // desativa todos os itens menu
	});

	$(this).attr('id', 'active').parents('li').css({
		'border-bottom-color' : 'rgba(242,107,29,1)'
	}); // ativa o item corrente do menu

	$('.loading').css({
		'margin-top' : display.getHeight() / 2 - 20
	}).show(); // GIF LOADING

	// chama a pagina
	new CallHtml(href, 'section.principal');

	return null;
});

// SUBMENU
$('nav.apps ul li a').die('click');
$('nav.apps ul li a').live('click', function() {
	var href = $(this).attr('class');

	$(this).attr('href', 'javascript:void');

	$('nav.apps ul li a').each(function() {
		$(this).removeAttr('id');
	});

	$(this).attr('id', 'active');

	$('.loading').css({
		'margin-top' : display.getHeight() / 2 - 20
	}).show(); // GIF LOADING
	$('section.principal section.app').html('');

	// chama a pagina
	new CallHtml(href, 'section.principal section.app');

	return null;
});

// ENVIAR CONTATO
$('#form-contato input[type="button"]').click(
		function() {
			var nome = $('input[name="nome"]').val(), email = $(
					'input[name="email"]').val(), mensagem = $(
					'textarea[name="mensagem"]').val();

			var valida = new Validator();

			var form = {};
			form[nome] = valida.nome(nome); // nome
			form[email] = valida.email(email); // email
			form[mensagem] = valida.mensagem(mensagem); // mensagem

			if (form[nome] && form[email] && form[mensagem]) {
				$('#form-contato input[type="button"]').val('Enviando');

				resetaForm('.alerta-contato', '#form-contato');

				$.ajax({
					type : "POST",
					url : "contato/contato.php",
					data : {
						nome : nome,
						email : email,
						mensagem : mensagem
					},
					dataType : "text",
					cache : false,
					success : function(data) {
						$('#form-contato input[type="button"]').val('Enviar');

						if (data === "SIM") {
							$('.alerta-contato').fadeIn(300).css({
								'color' : 'green'
							}).html('Sucesso.');
						} else {
							$('.alerta-contato').fadeIn(300).css({
								'color' : 'red'
							}).html('Falha.');
						}
					},
					error : function() {
						$('.alerta-contato').fadeIn(300).css({
							'color' : 'red'
						}).html('Falha.');
					}
				});

			} else {
				if (!form[nome]) {
					$('input[name="nome"]').css({
						'color' : 'red'
					}).val('Nome inv\xE1lido');
				}

				if (!form[email]) {
					$('input[name="email"]').css({
						'color' : 'red'
					}).val('E-mail inv\xE1lido');
				}

				if (!form[mensagem]) {
					$('textarea[name="mensagem"]').css({
						'color' : 'red'
					}).val('Mensagem inv\xE1lida');
				}
			}
		});

// RESETAR CAMPOS INVALIDOS
$('input, textarea').focus(
		function() {
			if ($(this).css('color') === 'red'
					|| $(this).css('color') === 'rgb(255, 0, 0)') {
				$(this).val('').css({
					'color' : '#212121'
				});
			}
		});

// REDES SOCIAIS
$('section.redes-sociais ul li').click(function() {
	var link = $(this).attr('href');

	window.open(link);
});

// DESFOCO MENU
$('nav.principal li a').not('#active').mouseover(
		function() {
			$(this).parents('li').siblings().addClass("fade").find('a#active')
					.parents('li').css({
						'border-bottom-color' : 'rgba(242,107,29,0.4)'
					});
		}).mouseout(function() {
	$(this).parents('li').siblings().removeClass("fade");
	$('nav.principal li a#active').parents('li').css({
		'border-bottom-color' : 'rgba(242,107,29,1)'
	});
});

// BACK TOP
$(window).scroll(
		function() {
			if ($(document).scrollTop() > display.getHeight()) {
				$('.back-top').fadeIn();
				var footer = parseInt($('footer.principal').height());
				var resultado = parseInt($('.geral').height())
						- display.getHeight() - footer;

				if ($(document).scrollTop() >= resultado) {
					$('.back-top').css({
						'position' : 'absolute',
						'bottom' : footer + 10
					});
				} else {
					$('.back-top').css({
						'position' : 'fixed',
						'bottom' : '10px'
					});
				}
			} else {
				$('.back-top').fadeOut();
			}
		});
// ////////

// efeitos
$('.back-top').mouseover(function() {
	$('.back-top').css({
		'background-position' : '-131px -28px'
	});
})

.mouseout(function() {
	if ($('.back-top').css('background-position') !== '-47px -28px') {
		$('.back-top').css({
			'background-position' : '-4px -28px'
		});
	}
})

.mousedown(function() {
	$('.back-top').css({
		'background-position' : '-89px -28px'
	});
})
// ////////

// retorna ao topo da pagina
.click(function() {
	$('.back-top').css({
		'background-position' : '-47px -28px'
	});

	$('html, body').animate({
		scrollTop : 0
	}, 500, function() {
		$('.back-top').css({
			'background-position' : '-4px -28px'
		});
	});
});
// //////////////////////////
