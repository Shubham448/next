import { Trainers } from '../../../db/models/trainer';
import authUser from '../../../middleware/auth';
import { singleTrainerMapper } from '../../../utils/common/mapper';
import { code, makeResponse, message } from '../../../utils/common/response';

export default async function handler(req, res) {
    const { method } = req;
    switch (method) {
        case 'GET':
            await authUser(req, res);
            try {
                let trainerRecord = await Trainers.findOne({
                    where: {
                        "id": req.trainerData.id
                    }
                });
                if (!trainerRecord) return makeResponse(res, code.NOT_FOUND, false, message.TRAINER_NOT_FOUND, null);
                let trainerMapper = await singleTrainerMapper(trainerRecord);
                return makeResponse(res, code.SUCCESS, true, message.FETCH, trainerMapper);
            } catch (error) {
                return makeResponse(res, code.BAD_REQUEST, false, error.message);
            }
        default: res.setHeader('Allow', ['GET']);
            res.status(405).end(`Method ${method} Not Allowed`);
    }
};
