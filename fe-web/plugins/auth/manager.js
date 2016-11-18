var oauthServer = require('oauth2-server');
var Request = oauthServer.Request;
var Response = oauthServer.Response;

const Connection = require("../../../dati-jobs/db/db-connection").Connection;
const Tables = require("../../../dati-jobs/db/tables");
const R = require("ramda");
//
exports.initAuth = function (app) {
    var oauth = new oauthServer({
        debug: true,
        model: require('./model')
    });

    app.all('/oauth/token', function (req, res, next) {
        var request = new Request(req);
        var response = new Response(res);

        oauth
            .token(request, response)
            .then(function (token) {
                // Todo: remove unnecessary values in response
                return res.json(token)
            }).catch(function (err) {
            return res.status(500).json(err)
        })
    });

    app.post('/authorise', function (req, res) {
        var request = new Request(req);
        var response = new Response(res);

        return oauth.authorize(request, response).then(function (success) {
            //  if (req.body.allow !== 'true') return callback(null, false);
            //  return callback(null, true, req.user);
            res.json(success)
        }).catch(function (err) {
            res.status(err.code || 500).json(err)
        })
    });

    app.get('/authorise', function (req, res) {

        var connection = new Connection();
        return connection.connect()
            .then(connection.collection.bind(connection, Tables.OAuthClients))
            .then(coll=> {
                return coll.findOne({clientId: req.query.client_id, redirectUri: req.query.redirect_uri})
            })
            .then(R.tap(connection.db.close()))
            .catch(R.tap(connection.db.close()))
            .then(function (model) {
                if (!model) return res.status(404).json({error: 'Invalid Client'});
                return res.json(model);
            }).catch(function (err) {
                return res.status(err.code || 500).json(err)
            });
    });
    passport.use(new OAuth2Strategy({
            authorizationURL: 'http://localhost:5000/authorise',
            tokenURL: 'http://localhost:5000/oauth/token',
            client_id: 'EXAMPLE_CLIENT_ID',
            clientSecret: 'EXAMPLE_CLIENT_SECRET',
            redirect_uri: "http://localhost:5000/auth/example/callback"
        },
        function(accessToken, refreshToken, profile, cb) {
            User.findOrCreate({ exampleId: profile.id }, function (err, user) {
                return cb(err, user);
            });
        }
    ));
    // app.use(oauth.authenticate());
};