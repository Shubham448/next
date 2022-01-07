import jwt from "jsonwebtoken";
import { Trainers } from "../../db/models/trainer.js";
import { singleTrainerMapper } from "../../utils/common/mapper.js";
import { code, makeResponse, message } from "../../utils/common/response.js";

export default async function authUser(req, res) {
    //get the token from the header if present
    const token = req.headers["authorization"] || req.headers["authorization"];
    console.log('dld', token)
    //if no token found, return response (without going to the next middelware)
    if (!token || token == '') return makeResponse(res, code.AUTH_ERROR, false, message.UNAUTHORIZED);
    try {
        const decoded = jwt.verify(token, process.env.JWT_HASH);
        console.log('ppppp>>>>')
        const trainerRecord = await Trainers.findOne({
            where: {
                id: decoded.id
            }
        });
        let trainerMapper = await singleTrainerMapper(trainerRecord);
        if (trainerMapper) {
            req.trainerData = trainerRecord;
            return;
        }
        else {
            return makeResponse(res, code.AUTH_ERROR, false, message.UNAUTHORIZED);
        }
    } catch (error) {
        //if invalid token
        return makeResponse(res, code.FORBIDDEN, false, error.message);
    }
};
