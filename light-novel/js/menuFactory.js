// CLASS MENU
var MenuFactory = function() {
	return {
		makeTitulos : function(data) {
			var schemaTitulo = $("div.container-titulo").html();

			$("ul.titulos").html();

			// PERCORRENDO OBRAS
			for ( var obraId = 0; obraId < $(data).find("titulo").length; obraId++) {
				var titulo_data = $(data).find("titulo:eq(" + obraId + ")")
						.text();

				// INSERINDO MODELO DE OBRA
				$("ul.titulos").append(schemaTitulo);

				var base = $("ul.titulos").find("li.titulo:eq(" + obraId + ")");

				// INJETANDO DADOS
				base.find("a.titulo").attr({
					'id' : obraId,
					'alt' : titulo_data
				}).append(titulo_data); // titulo
			}
		},

		makeObra : function(data, that) {
			var schemaVolume = $("div.container-volume").html();

			that.siblings("ul.indice").find("li.volume").remove();

			// PERCORRENDO VOLUMES
			for ( var volumeId = 0; volumeId < $(data).find("volume").length; volumeId++) {
				var id = $(data).find("volume:eq(" + volumeId + ")").attr("id");

				// INSERINDO MODELO DE VOLUME
				that.siblings("ul.indice").append(schemaVolume);

				// INJETANDO DADOS.attr({'id':obraId,'alt':titulo_data})
				that.siblings("ul.indice").find(
						"li.volume:eq(" + volumeId + ")").find("a.volume")
						.attr({
							"id" : volumeId,
							"alt" : id
						}).append("Volume " + id); // volume
			}

			$("ul.titulos").find("a[rel='link']").css({
				"color" : "rgba(255,255,255,1)"
			});
			that.siblings("ul.indice").find('a.sinopse').css({
				"color" : "rgba(242,107,29,1)",
				"display" : "table"
			});
		},

		makeVol : function(data, that) {
			var schemaCapitulo = $("div.container-capitulo").html(), schemaExtra = $(
					"div.container-extra").html(), schemaItem = $(
					"div.container-item").html();

			that.siblings("ul.capitulos").find("li.capitulo").remove();
			that.siblings("ul.capitulos").find("li.extra").remove();

			// PERCORRENDO CAPITULOS
			for ( var capituloId = 0; capituloId < $(data).find("capitulo").length; capituloId++) {
				var id = $(data).find("capitulo:eq(" + capituloId + ")").attr(
						"id");

				// INSERINDO MODELO DE CAPITULO
				that.siblings("ul.capitulos").append(schemaCapitulo);

				// INJETANDO DADOS
				that.siblings("ul.capitulos").find(
						"li.capitulo:eq(" + capituloId + ")")
						.find("a.capitulo").attr({
							"id" : capituloId,
							"alt" : id
						}).append("Capitulo " + id); // capitulo
			}

			// VERIFICANDO EXTRAS
			if ($(data).find("extra item").length) {

				// INSERINDO MODELO EXTRA
				that.siblings("ul.capitulos").append(schemaExtra);

				// PERCORRENDO ITENS EXTRA
				for ( var extraId = 0; extraId < $(data).find("extra item").length; extraId++) {
					var nome = $(data).find(
							"extra item:eq(" + extraId + ") titulo").text();

					// INSERINDO ITEM EXTRA
					that.siblings("ul.capitulos").find("li.extra ul").append(
							schemaItem);

					// INJETANDO DADOS
					that.siblings("ul.capitulos").find(
							"li.extra:eq(0) ul li:eq(" + extraId + ")").find(
							"a").attr("alt", extraId).append(nome); // item
																	// extra
				}
			}

			$("ul.titulos").find("a[rel='link']").css({
				"color" : "rgba(255,255,255,1)"
			});
			that.siblings("ul.capitulos").find('a.prologo').css({
				"color" : "rgba(242,107,29,1)",
				"display" : "table"
			});
		}
	}
}