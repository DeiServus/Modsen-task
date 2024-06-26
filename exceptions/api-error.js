module.exports = class ApiError extends Error {
    status;
    errors;

    constructor(status, message, errors = []){
        super(message);
        this.status = status;
        this.errors = errors;
    }

    static UnauthorizedError(){
        return new ApiError(401, 'user is unauthorized');
    }

    static BadRequest(message, errors = []){
        return new ApiError(400, message, errors);
    }

    static NotOrganizerError(){
        return new ApiError(403, 'user is not organizer');
    }
}