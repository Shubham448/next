export const message = {
    'TRAINER_ALRADY_EXIST': 'Trainer already regisetered',
    'TRAINER_ADDED': 'Trainer added successfully',
    'FETCH': 'Fetch successfully',
    'SUCCESS': 'Success',
    'UPDATE': 'Updated successfully',
    'ROUTE_NOT_FOUND': 'Not found',
    'TRAINER_NOT_FOUND': 'Trainer not found',
    'INCORRECT_PASSWORD': 'Incorrect password',
    'UNAUTHORIZED': 'Unauthorized',
    'LOGIN_SUCCESS': 'Login successful',
    'ROOM_CREATED': 'Room created',
    'ASSIGN_ROOM_CREATED': 'Rooms assign successful',
    'TRAINER_ALREADY_EXIST': 'Trainer already exist in room',
    'NOT_IN_ROOM': 'You are not in room'
}

export const code = {
    'SUCCESS': 200,
    'RECORD_CREATED': 201,
    'BAD_REQUEST': 400,
    'AUTH_ERROR': 401,
    'FORBIDDEN': 403,
    'NOT_FOUND': 404,
    'INVALID_REQUEST': 405,
    'RECORD_ALREADY_EXISTS': 409,
    'SERVER_ERROR': 500
};


export const makeResponse = async (res, statusCode, success, message, payload = null, meta = {}) =>
    new Promise(resolve => {
        res.status(statusCode)
            .json({
                success,
                httpCode: statusCode,
                message,
                data: payload,
                meta
            });
        resolve(statusCode);
    });
