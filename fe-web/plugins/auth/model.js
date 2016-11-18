/*
 mongoose.model('OAuthTokens', new Schema({
 accessToken: { type: String },
 accessTokenExpiresOn: { type: Date },
 clientId: { type: String },
 refreshToken: { type: String },
 refreshTokenExpiresOn: { type: Date },
 userId: { type: String }
 }));

 mongoose.model('OAuthClients', new Schema({
 clientId: { type: String },
 clientSecret: { type: String },
 redirectUri: { type: String }
 }));

 mongoose.model('OAuthUsers', new Schema({
 email: { type: String, default: '' },
 firstname: { type: String },
 lastname: { type: String },
 password: { type: String },
 username: { type: String }
 }));
 */


const Connection = require("../../../dati-jobs/db/db-connection").Connection;
const Tables = require("../../../dati-jobs/db/tables");
const R = require("ramda");
//
/**
 * Get access token.
 *
 *
 */

module.exports.getAccessToken = function (bearerToken) {
    console.log('in getAccessToken (bearerToken: ' + bearerToken + ')');
    var connection = new Connection();
    return connection.connect()
        .then(connection.collection.bind(connection, Tables.OAuthTokens))
        .then(coll=> {
            return coll.findOne({accessToken: bearerToken});
        })
        .then(R.tap(connection.db.close()))
        .catch(R.tap(connection.db.close()));

};
/**
 * Get client.
 */

module.exports.getClient = function(clientId, clientSecret) {
    console.log('in getClient (clientId: ' + clientId + ', clientSecret: ' + clientSecret + ')');
    var connection = new Connection();
    return connection.connect()
        .then(connection.collection.bind(connection, Tables.OAuthClients))
        .then(coll=> {
            return coll.findOne({ clientId: clientId, clientSecret: clientSecret })
        })
        .then(R.tap(connection.db.close()))
        .catch(R.tap(connection.db.close()));

};
/**
 * Get refresh token.
 */

module.exports.getRefreshToken = function(refreshToken) {
    console.log('in getRefreshToken (refreshToken: ' + refreshToken + ')');
    var connection = new Connection();
    return connection.connect()
        .then(connection.collection.bind(connection, Tables.OAuthTokens))
        .then(coll=> {
            return coll.findOne({ refreshToken: refreshToken });
        })
        .then(R.tap(connection.db.close()))
        .catch(R.tap(connection.db.close()));

};
/*
 * Get user.
 */

module.exports.getUser = function(username, password) {
    console.log('in getUser (username: ' + username + ', password: ' + password + ')');
    var connection = new Connection();
    return connection.connect()
        .then(connection.collection.bind(connection, Tables.OAuthUsers))
        .then(coll=> {
            return coll.findOne({ username: username, password: password });
        })
        .then(R.tap(connection.db.close()))
        .catch(R.tap(connection.db.close()));

};
/**
 * Save token.
 */

module.exports.saveToken = function(token, client, user) {
    console.log('in saveToken (token: ' + token + ')');

    var accessToken ={
        accessToken: token.accessToken,
        accessTokenExpiresOn: token.accessTokenExpiresOn,
        clientId: client.id,
        refreshToken: token.refreshToken,
        refreshTokenExpiresOn: token.refreshTokenExpiresOn,
        userId: user.id
    };
    var connection = new Connection();
    return connection.connect()
        .then(connection.collection.bind(connection, Tables.OAuthUsers))
        .then(coll=> {
            return coll.insertOne(accessToken);
        })
        .then(R.tap(connection.db.close()))
        .catch(R.tap(connection.db.close()));

};
