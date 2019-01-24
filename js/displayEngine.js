var display,

// class Display
Display = function(w, h) {
	var width = w, height = h;

	return {
		// atualiza as dimensões
		update : function(w, h) {
			width = w;
			height = h;
		},
		// retorna largura
		getWidth : function() {
			return width;
		},
		// retorna altura
		getHeight : function() {
			return height;
		}
	}
};