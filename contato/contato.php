<?php	
	$remetente = "no-replay@gyulpon.com";
	$recebemail = "contato@gyulpon.com";

	$data = date('d-m-Y H:i:s',time());
	$nome = utf8_decode($_POST['nome']);
	$email = utf8_decode($_POST['email']);
	$mensagem = utf8_decode($_POST['mensagem']);
	$assunto = "Contato realizado via site ($data)";
	
	$conteudo = "
	<table width=\"616\" cellpadding=\"0\" cellspacing=\"0\" align=\"center\">
		<tr>
			<td colspan=\"2\" align=\"center\" height=\"30\" bgcolor=\"#212121\">
				<div style=\"font-family: verdana,Helvetica,sans-serif;font-size:14px;color:#FFF;font-weight:bold;margin-left:5px;\">
					$assunto
				</div>
			</td>
		</tr>
		<tr>
			<td width=\"50%\" height=\"20\" align=\"left\" height=\"10\" bgcolor=\"#f26b1d\" colspan=\"2\" style=\"padding-left:10px;\">
				<font style=\"font-family: verdana,Helvetica,sans-serif;font-size:12px;color:#fff;\">Dados do Contato</font>
			</td>
		</tr>
		<tr>
			<td colspan=\"2\" style=\"padding-left:10px;padding-right:10px;\">
				<font style=\"text-decoration: none; font-family: verdana,Helvetica,sans-serif;font-size:12px;color:#212121;\">
					<b>Nome:</b> $nome<br>
					<b>Email:</b> $email<br>
					<b>Mensagem:</b> $mensagem<br>
				</font>
			</td>
		</tr>
		<tr>
			<td width=\"50%\" height=\"20\" align=\"left\" bgcolor=\"#f26b1d\" style=\"padding-left:10px;\">
				<font style=\"text-decoration: none; font-family: verdana,Helvetica,sans-serif;font-size:12px;color:#fff;\">www.gyulpon.com</font>
			</td>
			<td width=\"50%\" height=\"20\" align=\"right\" bgcolor=\"#f26b1d\" style=\"padding-right:10px;\">
				<font style=\"text-decoration: none; font-family: verdana,Helvetica,sans-serif;font-size:12px;color:#fff;\">$email</font>
			</td>
		</tr>
	</table>";
	
	/* Verifica qual eh o sistema operacional do servidor para ajustar o cabecalho de forma correta. PHP5 +  */
	if(PATH_SEPARATOR == ";") {
		$quebra_linha = "\r\n";//Se for Windows
	} else { 
		$quebra_linha = "\n";//Se "nao for Windows"
	}
	
	/* Montando o cabecalho da mensagem */
	$headers = "MIME-Version: 1.1" .$quebra_linha;
	$headers .= "Content-type: text/html; charset=iso-8859-1" . $quebra_linha;//Para formatar html "text/html"...
	$headers .= "From: " . $email. $quebra_linha;
	$headers .= "Reply-To: " . $email . $quebra_linha;
	$headers .= "Return-Path: " . $remetente . $quebra_linha; 
	
	if(mail($recebemail, $assunto, $conteudo, $headers )) {
		echo "SIM";
	} else {
		echo "NAO";
	}
?>