/*
 * faz as chamadas ajax
 */

// CALL
var callCount = 0;

var CallHtml = function(data, container) {
	$.ajax({
		type : "POST",
		url : data,
		dataType : "html",
		cache : false,
		success : function(res) {
			callCount = 0;
			
			var data = $('<html />').html(res);

			document.title = data.find('title').text();

			data.find('meta, title').remove(); // remove headers tag

			$('.loading').hide();
			$(container).html(data.html());

			$("img").hisrc({
				minwidth : 800
			}); // responsividade nas image
		},
		error : function() {
			callCount++;

			if (callCount > 2) {
				callCount = 0;
			} else {
				CallHtml(data, container);
			}
		}
	});
},

CallXmlBlog = function(data) {
	// DADOS BLOG
	$
			.ajax({
				type : "GET",
				url : data,
				dataType : "xml",
				cache : false,
				success : function(res) {
					blog = res;

					// criando callback
					var call = new callback();
					$("#paginacao").pagination($(blog).find("post").length,
							call);

					// resetando lista de tags
					$("#nuvem div#tagList ul").html("");

					// MONTAR A NUVEM DE TAG
					var arrayNuvem = [];
					for ( var postId = 0; postId < $(blog).find("post").length; postId++) {
						// COLETANDO DADOS
						var tags = $(blog).find("post:eq(" + postId + ")")
								.find("tags").text();

						tags.split(',').forEach(
								function(_el, _id) {
									var status = false;

									arrayNuvem.forEach(function(el, id) {
										if (_el === el) {
											status = true;
										}
									});

									if (!status) {
										arrayNuvem.push(_el);

										// INJETANDO DADOS
										$("#nuvem div#tagList ul").append(
												"<li><a href='javascript:void(0)'>"
														+ _el + "</a></li>");
									}
								});
					}

					// CONFIGURACAO NUVEM TAG
					TagCanvas.outlineColour = '#212121';
					TagCanvas.outlineOffset = 2;
					TagCanvas.outlineThickness = 1;
					TagCanvas.wheelZoom = false;
					TagCanvas.reverse = true;
					TagCanvas.textHeight = 12;
					TagCanvas.minBrightness = 0.3;
					TagCanvas.textFont = 'verdana';
					TagCanvas.textColour = '#212121';

					TagCanvas.Start('nuvem');
					// ///////////////////////

					// INSTANCIANDO CALENDARIO BLOG
					$('#datepicker').datepicker({
						inline : true,
						onSelect : function(dateText, inst) {
							new filtroCalendario(inst);
						}
					});

					$("img").hisrc({
						minwidth : 800
					}); // responsividade nas image
				},
				error : function() {
					callCount++;

					if (callCount > 2) {
						callCount = 0;
					} else {
						CallXmlBlog(data);
					}
				}
			});
};