
<!DOCTYPE html>
<html >
  <head>
    <meta charset="UTF-8">
    <title>Workflow Rubra</title>



<script src='http://cdnjs.cloudflare.com/ajax/libs/jquery/2.1.3/jquery.min.js'></script>
<script src="js/jquery.ui.shake.js"></script>
        <link rel="stylesheet" href="login/css/style.css">




  </head>
	<script>
	var entro;
			$(document).ready(function() {

				$('#login').click(function()
				{
					console.log("ENTRa",0)

				var username=$("#username").val();
				var password=$("#password").val();
				var dataString = 'username='+username+'&password='+password;

				if($.trim(username).length>0 && $.trim(password).length>0)
				{
					console.log("ENTRa")
					$.ajax({
					type: "POST",
					url: "php/loginStep.php",
					data: dataString,
					cache: false,
					beforeSend: function(){ $("#login").val('Conectado...');},
					success: function(data){
					if(data)
					{
					$('form').fadeOut(500);
						 $('.wrapper').addClass('form-success');
						//$("body").load("index.html").hide().fadeIn(1500).delay(6000);
						entro="si"
							window.location = "index.php";
					}
					else
					{
					 	$('#box').shake();
					 	$("#login").val('Login')
					 	$("#error").html("<span style='color:#cc0000'>Error:</span> Datos Incorrectos. ");
					}
					}
					});
				}
				return false;
				});


			});
		</script>
  <body>

    <div class="wrapper">
	<div class="container">
		<h1>Bienvenido a Workflow Rubra</h1>
<div id="box">
		<form class="form" method="post">
			<input type="text" placeholder="Usuario" id="username">
			<input type="password" placeholder="Clave" id="password">
			<button type="submit" id="login">Login</button>
			<span class='msg'></span>

			<div id="error">

			</div>
		</form>
	</div>

	<ul class="bg-bubbles">
		<li></li>
		<li></li>
		<li></li>
		<li></li>
		<li></li>
		<li></li>
		<li></li>
		<li></li>
		<li></li>
		<li></li>
	</ul>
</div>
</div>





  </body>
</html>
