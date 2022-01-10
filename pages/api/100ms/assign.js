import bodyParser from 'body-parser';
import Joi from "joi";
import { AssignRooms } from '../../../db/models/assign-rooms';
import validate from "../../../middleware/validations";
import { code, makeResponse, message } from '../../../utils/common/response';
import authUser from '../../../middleware/auth';
import Sequelize from "sequelize";
const { Op } = Sequelize;

const handler = async (req, res) => {
    const { method, body } = req;
    switch (method) {
        case 'POST':
            try {
                await authUser(req, res);
                let assignRoomRecord = await AssignRooms.findOne({
                    where : {
                        [Op.and]: [
                            { trainer_id: req.body.trainer_id },
                            { room_id: req.body.room_id }
                        ]
                    }
                });
                if (assignRoomRecord) return makeResponse(res, code.RECORD_ALREADY_EXISTS, false, message.TRAINER_ALREADY_EXIST);
                let newAssignRoom = await AssignRooms.create(body);
                return makeResponse(res, code.RECORD_CREATED, true, message.ASSIGN_ROOM_CREATED, newAssignRoom);
            } catch (error) {
                return makeResponse(res, code.BAD_REQUEST, false, error.message);
            }
        default: res.setHeader('Allow', ['POST']);
            res.status(405).end(`Method ${method} Not Allowed`);
    }
};

const schema = Joi.object({
    user_id: Joi.string().required(),
    trainer_id: Joi.string().required(),
    room_id: Joi.string().required()
});

export default validate({ body: schema }, handler);

export const config = {
    api: {
        bodyParser
    },
};
