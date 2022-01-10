import { AssignRooms } from '../../../db/models/assign-rooms';
import { Rooms } from '../../../db/models/rooms';
import authUser from '../../../middleware/auth';
import { code, makeResponse, message } from '../../../utils/common/response';

export default async function handler(req, res) {
    const { method } = req;
    switch (method) {
        case 'GET':
            await authUser(req, res);
            try {
                let trainerRecords = await AssignRooms.findAll({
                    where: {
                        "trainer_id": req.trainerData.id
                    },
                    include: [
                        {
                            model: Rooms
                        }
                    ]
                });
                return makeResponse(res, code.SUCCESS, true, message.FETCH, trainerRecords);
            } catch (error) {
                return makeResponse(res, code.BAD_REQUEST, false, error.message);
            }
        default: res.setHeader('Allow', ['GET']);
            res.status(405).end(`Method ${method} Not Allowed`);
    }
};
