/***********************************
 *           FB Login              *
 ***********************************/
router.post('/login/facebook', function(req, res, next) {
    var fbUserEmail = req.body.fbUserEmail;
    var fbAccessToken = req.body.fbAccessToken;

    var findConditionfbUserEmail = {
        email: fbUserEmail
    }
    users.findOne(findConditionfbUserEmail)
        .exec(function (err, user) {
            if (err){
                res.json({
                    type: false,
                    data: "Error occured " + err
                });
            }
            else if (!user){
                console.log('user not found');
                fbSignup(fbUserEmail, fbAccessToken, function (err, savedUser) {
                    console.log(1);
                    if (err){
                        res.json({
                            type: false,
                            data: "Error occured " + err
                        });
                    } else {
                        res.json({
                            type: true,
                            data: savedUser,
                            token: savedUser.jsonWebToken
                        });
                    }
                });
            }
            else if (user) {
                console.log('user');
                console.log(user);
                user.fbToken = fbAccessToken;
                user.save(function (err, savedUser) {
                    res.json({
                        type: true,
                        data: user,
                        token: user.jsonWebToken
                    });
                });
            }
        });
});

function fbSignup(fbUserEmail, fbAccessToken, next) {
    var userModel = new users();
    userModel.email = fbUserEmail;
    userModel.fbToken = fbAccessToken;
    userModel.save(function (err, newUser) {
        newUser.jsonWebToken = jwt.sign(newUser, jwtSecret);
        newUser.save(function (err, savedUser) {
            next(err, savedUser);
        });
    });
}