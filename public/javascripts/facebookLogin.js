/**
 * Created by kyungjoon on 2/21/2017.
 */
//facebook login lib import
(function (d, s, id) {
    var js, fjs = d.getElementsByTagName(s)[0];
    if (d.getElementById(id)) return;
    js = d.createElement(s);
    js.id = id;
    js.src = "//connect.facebook.net/en_US/sdk.js";
    fjs.parentNode.insertBefore(js, fjs);
}(document, 'script', 'facebook-jssdk'));


/*
 페이스북 Async 초기화  설정 부분.
 */
window.fbAsyncInit = function () {
    FB.init({
        appId: '18980271336',
        cookie: true,  // enable cookies to allow the server to access
        xfbml: true,  // parse social plugins on this page
        version: 'v2.8' // use graph api version 2.8
    });


    FB.getLoginStatus(function(response) {
        if (response.status === 'connected') {
            var uid = response.authResponse.userID;
            var accessToken = response.authResponse.accessToken;
            var _imgTag= '<img style="width: 5%;height: 5%" src="http://res.cloudinary.com/demo/image/facebook/'+ uid+ '.jpg">';

            $("#fb_userid").val(uid);


            FB.api(
                uid,
                function (response) {
                    if (response && !response.error) {
                        /* handle the result */
                        $("#loginStatus").text(response.name)
                        //alert(""+ response.name);
                    }
                }
            );


            $("#fb_image").append(_imgTag);

            //alert('uid-->'+ uid);
            $("#loginStatus").text(response.status);

        } else if (response.status === 'not_authorized') {
            // the user is logged in to Facebook,
            $("#loginStatus").text("노인증");
        } else {
            // the user isn't logged in to Facebook.
            $("#loginStatus").text("노인증");
        }
    });

};


function fbLogoutUser() {
    FB.getLoginStatus(function(response) {
        if (response && response.status === 'connected') {
            FB.logout(function(response) {

                alert("로그아웃!");
                location.href='/login/loginForm';
                //document.location.reload();
            });
        }
    });
}
