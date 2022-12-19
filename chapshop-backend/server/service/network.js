'use strict';
/***************************************************************************************************************************

 * Shared Network services use by diffent controllers to handle API response
 
 **************************************************************************************************************************/
module.exports = {
    /*handle validation error */
    _validationError: function (res, err, msg) {
        const response = {};
        response.status = 422;
        response.error = (err) ? err : "";
        response.message = (msg) ? msg : "Something bad happened";
        response.data = {};
        return res.status(422).send(response);
    },

    _unauthorized: function (res, err, msg) {
        const response = {};
        response.status = 401;
        response.error = (err) ? err : "";
        response.message = (msg) ? msg : "Something bad happened";
        response.data = {};
        return res.status(401).send(response);
    },

    /*handle error if content required in request but request is empty */
    _noContent: function (res, info) {
        const response = {};
        response.status = 404;
        response.message = (info) ? info : "No Data Found";
        response.error = "";
        response.data = {};
        return res.status(404).send(response);
    },
    /*handle error if content required in request but request is empty */
    _noData: function (res, info) {
        const response = {};
        response.status = 400;
        response.message = (info) ? info : "No data found";
        response.error = "";
        response.data = {};
        return res.status(404).send(response);
    },
    /*handle status 500*/
    _handleError: function (res, err, msg) {
        const response = {};
        response.status = 500;
        response.error = (err) ? err : "";
        response.message = (msg) ? msg : "Something bad happened";
        response.data = {};
        return res.status(500).send(response);
    },

    /*handle response*/
    _response: function (res, data, msg, totalPages = 1) {
        const response = {};
        response.status = 200;
        // response.error = "";
        response.message = (msg) ? msg : "Success";
        response.totalPages = totalPages
        response.data = (data) ? data : {};
        return res.status(200).send(response)
    }

};