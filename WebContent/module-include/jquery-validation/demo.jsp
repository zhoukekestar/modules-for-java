<!DOCTYPE html>
<html lang="en">
<head>
	<base href="../../" >
	<meta charset="utf-8">
	<link href="http://libs.baidu.com/bootstrap/3.0.3/css/bootstrap.min.css" rel="stylesheet">
</head>
<body style="padding:20px;">
	<form id="form-test" role="form" class="form-horizontal">
	  <div class="form-group">
	  	<label for="number" class="col-sm-2 control-label">textarea</label>
	    <div class="col-sm-10">
	    	<input id="number" name="number" class="form-control" minlength="3" maxlength="15" required number="true">
	    </div>
	  </div>
	 
		<div class="form-group">
			<label for="math" class="col-sm-2 control-label">7 + 4 =</label>
			<div class="col-sm-10">
			<input id="math" name="math" class="form-control">
		</div> 
		</div>
		
		<input class="form-control"  type="password" id="passwd" name="passwd"  placeholder="6-20位字母、符号或数字" required>
		<input class="form-control"  type="password" id="passwdtwo" name="passwdtwo" placeholder="请再次输入密码" required>
		
		<input id="submit" type="submit" />
	</form>
	
	<script src="http://libs.baidu.com/jquery/2.0.0/jquery.min.js"></script>
	<%@include file="include.jsp" %>
	<script>
	$(function(){
		var validator = $("#form-test").validate({
			rules: {
				math: {
					equal: 11
				},
				passwd: {
					required: true,
					minlength: 6
				},
				passwdtwo: {
					required: true,
					minlength: 6,
					equalTo: "#passwd"
				}
			}
		});
		
		$("#submit").click(function(){
			$("#form-test").valid();
			if(validator.numberOfInvalids() != 0)
			{
				alert("error");
				return;
			}
			
		});
	});
	</script>
</body>
</html>
