	/*
	 * faz as chamadas ajax
	 */

	// CALL
var callCount	= 0,
	sinopse		= null,
	novel		= null;

var CallHtml = function(data,container,op) {
		$.ajax({
			type: "GET",
		    url: data,
	        dataType: "html",
            cache: false,
		    success: function(res){
		    	callCount = 0;
		    	
		    	var data = $('<html />').html(res);
		    	
		    	document.title = data.find('title').text();

				data.find('meta, title').remove(); // remove headers tag
		    	
		    	$('.loading').hide();
		    	$(container).html(data.html()); 
		    	
		    	if(op) {
		    		new injetContent(op);
		    	}
		    	
		    	$("img").hisrc({ minwidth: 800 }); // responsividade nas image
		    },
		    error : function() {
				callCount++;
				
		    	if(callCount > 2) {
		    		callCount = 0;
		    	} else {
		    		CallHtml(data,container);
		    	}
			}
		});	
	},
	
	// TITULOS MENU
	CallXmlTitulos = function(data) {
		// TITULOS OBRA
		$.ajax({
			type: "GET",
			url: data,
			dataType: "xml",
			cache: false,
			success: function(res) {
				// criando menu de titulos
				new MenuFactory().makeTitulos(res);
			},
			error : function() {
				callCount++;
				
		    	if(callCount > 2) {
		    		callCount = 0;
		    	} else {
		    		CallXmlTitulos(data);
		    	}
			}
		});
	},
	
	// CONTEUDO OBRA MENU
	CallXmlObra = function(data,that) {
		var er		= new RegExp('\\s','g');
			data	= data.replace(er,'_'); // inserindo underline no path
					
			// TITULOS OBRA
			$.ajax({
				type: "GET",
				url: data,
				dataType: "xml",
				cache: false,
				success: function(res) {
					sinopse = res;
					
					$('img.loading-novel').css({"display":"none"}); // load menu
					
					// criando menu de titulos
					new MenuFactory().makeObra(res,that);
					
					new CallHtml("light-novel/light-novel.html","section.app section","sinopse");
				},
				error : function() {
					callCount++;
					
			    	if(callCount > 2) {
			    		callCount = 0;
			    	} else {
				    	CallXmlObra(data,that);
			    	}
				}
			});
	},
	
	// CONTEUDO VOLUME MENU
	CallXmlVol = function(data,that) {
		var er	= new RegExp('\\s','g');
		data = data.replace(er,'_'); // inserindo underline no path
				
		// TITULOS OBRA
		$.ajax({
			type: "GET",
			url: data,
			dataType: "xml",
			cache: false,
			success: function(res) {
				novel = res;
				
				$('img.loading-novel').css({"display":"none"}); // load menu
				
				// criando menu de titulos
				new MenuFactory().makeVol(res,that);
				
				new injetContent("prologo");
			},
			error : function() {
				callCount++;
				
		    	if(callCount > 2) {
		    		callCount = 0;
		    	} else {
		    		CallXmlVol(data,that);
		    	}
			}
		});
	},
	
	injetContent = function(op,that) {
		// RESETA TODOS ESTADOS
		//$("ul.titulos").find("a[rel='link']").css({"color":"rgba(255,255,255,1)"});
		
		// APLICA ESTADO NO OBJ CLICADO
		//$(this).css({"color":"rgba(242,107,29,1)"});
		
		//var obraId	= $(this).parents("li.titulo").find("a.titulo").attr("id");
		//var obra	= $(novel).find("obra:eq(" + obraId + ")").find("titulo:first").text();
		
		//var op		= $(this).attr("class"),
		var titulo	= null,
			texto	= null;
		
		switch(op) {
			case "sinopse":
				titulo	= "Sinopse";
				texto	= $(sinopse).find("sinopse").text();
			break;
			
			case "prologo": 
				titulo	= $(novel).find("titulo:first").text();;
				texto	= $(novel).find("prologo").text();
			break;
			
			case "capitulo": 
				var capituloId	= that.attr("id");
					titulo		= $(novel).find("capitulo:eq(" + capituloId + ")").find("titulo:first").text();
					texto		= $(novel).find("capitulo:eq(" + capituloId + ")").find("texto:first").text();
			break;
			
			case "item": 
				var itemId		= that.attr("alt");
					titulo		= $(novel).find("item:eq(" + itemId + ")").find("titulo:first").text();
					texto		= $(novel).find("item:eq(" + itemId + ")").find("texto:first").text();
			break;
		}
		
		$("article.novel").find("h1.titulo:first").html(titulo);
		$("article.novel").find("div.conteudo:first").html(texto);
		

			$("img").hisrc({
		minwidth : 800
	}); // responsividade nas image
};