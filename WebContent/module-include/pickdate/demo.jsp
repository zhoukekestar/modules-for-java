<!DOCTYPE html>
<html>
<head>
<base href="../../"/>
<meta charset="UTF-8">
</head>

<body>

    <input id="input_01" class="datepicker" name="date" type="date" >
	<input id="input_02" class="datapicker" name="date" type="date" value="2014-12-1 19:50">
	
    <div class="abc">123</div>

	<script src="http://libs.baidu.com/jquery/2.0.0/jquery.min.js"></script>
	<%@include file="include.jsp" %>
    <script type="text/javascript">
        $('#input_01').pickadate();
        $("#input_02").pickadate();
        $(".abc").click(function () {
            alert($("#input_01").val());
        })
        //var picker = $input.pickadate('picker')
        //picker.set('select', '14 October, 2014')
        //picker.open()

        // $('button').on('click', function() {
        //     picker.set('disable', true);
        // });

    </script>
</body>
</html>