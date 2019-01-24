var scenario = null,

// controla estado dos efeitos
Scenario = function() {
	var tela = 'reduzido', // MANTEM ESTADO DA TELA
	botao = 'ampliado', // MENTEM ESTADO DO BOTAO
	luz = 'off'; // MANTEM ESTADO DOS EFEITOS

	// console.log(tela);

	var models = {
		'off' : {
			'lampada' : '-1px 0px',
			estado : {
				'ampliado' : '0px -20px', // icone claro
				'reduzido' : '-20px -20px' // icone claro
			}
		},
		'on' : {
			'lampada' : '-20px 0px',
			estado : {
				'ampliado' : '-41px -20px', // icone escuro
				'reduzido' : '-60px -20px' // icone escuro
			}
		}
	};

	return {
		getLuz : function() {
			switch (luz) {
			case 'off':
				luz = 'on';
				// console.log("tamanho: " + tela + " modelo: " +
				// models[luz].estado[tela]);
				return {
					'luz' : luz,
					'posicaoLuz' : models[luz].lampada,
					'posicaoTela' : models[luz].estado[botao]
				}
				break;
			case 'on':
				luz = 'off';

				// console.log("tamanho: " + tela + " modelo: " +
				// models[luz].estado[tela]);
				return {
					'luz' : luz,
					'posicaoLuz' : models[luz].lampada,
					'posicaoTela' : models[luz].estado[botao]
				}
				break;
			}
		},
		getTela : function() {
			switch (luz) {
			case 'off':
				switch (tela) {
				case 'reduzido':
					botao = tela;
					tela = 'ampliado';
					console.log(models[luz].estado[botao]);
					return {
						'tela' : tela,
						'estado' : models[luz].estado[botao]
					};
					break;
				case 'ampliado':
					botao = tela;
					tela = 'reduzido';
					console.log(models[luz].estado[botao]);
					return {
						'tela' : tela,
						'estado' : models[luz].estado[botao]
					};
					break;
				default:
					botao = tela;
					tela = 'ampliado';
					console.log(models[luz].estado[botao]);
					return {
						'tela' : tela,
						'estado' : models[luz].estado[botao]
					};
				}
				break;
			case 'on':
				switch (tela) {
				case 'reduzido':
					botao = tela;
					tela = 'ampliado';
					return {
						'tela' : tela,
						'estado' : models[luz].estado[botao]
					};
					break;
				case 'ampliado':
					botao = tela;
					tela = 'reduzido';
					return {
						'tela' : tela,
						'estado' : models[luz].estado[botao]
					};
					break;
				default:
					botao = tela;
					tela = 'ampliado';
					return {
						'tela' : tela,
						'estado' : models[luz].estado[botao]
					};
				}
				break;
			}
		}
	}
};