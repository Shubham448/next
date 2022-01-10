import { AssignRooms } from "../../../../db/models/assign-rooms";
import authUser from "../../../../middleware/auth";
import { code, makeResponse, message } from "../../../../utils/common/response";
import Sequelize from "sequelize";
const { Op } = Sequelize;

export default async function handler(req, res) {
    const { method } = req;
    switch (method) {
        case 'GET':
            const { id } = req.query;
            await authUser(req, res);
            try {
                let checkRoom = await AssignRooms.findOne({
                    where: {
                        [Op.and]: [
                            { "trainer_id": req.trainerData.id },
                            { "room_id": id }
                        ]
                    }
                });
                if(!checkRoom) return makeResponse(res, code.BAD_REQUEST, false, message.NOT_IN_ROOM);
                return makeResponse(res, code.SUCCESS, true, message.SUCCESS);
            } catch (error) {
                return makeResponse(res, code.BAD_REQUEST, false, error.message);
            }
        default: res.setHeader('Allow', ['GET']);
            res.status(405).end(`Method ${method} Not Allowed`);
    }
};
