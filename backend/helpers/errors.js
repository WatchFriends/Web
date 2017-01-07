module.exports = {
    badRequest: 400,
    unauthorized: 401,
    forbidden: 403,
    notFound: 404,
    internalServerError: 500,

    ServerError: function (message, status = 500) {
        this.message = message;
        this.status = status;
    }
}
