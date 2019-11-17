const mongoService = require('./mongo.service');


exports.addUser = function (data, callback) {
    const { _id,token,confirmPassword, ...dataWithoutID } = data;
    mongoService.insertDocument(dataWithoutID, "userLogin", function(response) {
        callback(true);
    })
};

exports.getAllUsersWithPassword = function (callback) {
    mongoService.queryFindAll({}, "userLogin", function(response) {
        callback(response);
    })
};

exports.getAllUsers = function (callback) {
    mongoService.queryFindAllProjection({role:{$ne:"admin"}},{token:0, password:0}, "userLogin", function(response) {
        callback(response);
    })
};

exports.checkIfEmailExists = function (email,callback) {
    mongoService.queryFindAllProjection({email:email},{token:0, password:0}, "userLogin", function(response) {
        if(response.length > 0) {
            callback(true);
        } else {
            callback(false)
        }
    })
};

exports.updateUser = function (data, callback) {
    const { _id,token,confirmPassword, ...dataWithoutID } = data;
    var query = { email: data.email};
    var newValue = dataWithoutID;
    mongoService.updateOne(query,newValue, "userLogin", function(response) {
        callback(true);
    })
};

exports.removeUser = function (data, callback) {
    console.log(data);
    mongoService.removeDocument({email:data.email, role: "user"}, "userLogin", function(response) {
        callback(true);
    })
};