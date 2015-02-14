$.validator.addMethod("equal", function(value, element, param) {
    return value == param;
}, '您输入的值不正确。');

$.validator.addMethod("cellphone", function(value, element, param) {
    var mycp = /^[1][3,4,5,7,8][0-9]{9}$/;
    return mycp.test(value);
}, '请输入正确的手机号。');

$.validator.addMethod("checkcode", function(value, element, param) {
    return value == "123456";
}, '验证码错误。');

$.validator.setDefaults({
    errorElement: "span",
    errorClass:"has-error",
    validClass:"has-success",
    submitHandler: function() {
        alert("已提交！");
    }
});