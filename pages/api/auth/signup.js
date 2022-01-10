import multer from 'multer';
import nextConnect from 'next-connect';
import { Trainers } from '../../../db/models/trainer';
import { code, makeResponse, message } from '../../../utils/common/response';
import { hashPassword } from '../../../utils/common/common';
import { singleTrainerMapper } from '../../../utils/common/mapper';

const upload = multer({
    storage: multer.diskStorage({
        destination: './public/uploads',
        filename: (req, file, cb) => cb(null, file.originalname),
    }),
});

const apiRoute = nextConnect({
    onError: (err, req, res, next) => {
        res.status(500).end("Something broke!");
    },
    onNoMatch: (req, res, next) => {
        res.status(404).end("Page is not found");
    },
})
.use(upload.single('picture_url'))
.post(async(req, res) => {
    try {
        let trainerRecord = await Trainers.findOne({
            where: {
                "email": req.body.email
            }
        });
        if (trainerRecord) return makeResponse(res, code.RECORD_ALREADY_EXISTS, false, message.TRAINER_ALRADY_EXIST);
        if (req.file) req.body.picture_url = req.file.path;
        if (req.body.password) req.body.password = await hashPassword(req.body.password);
        let newTrainer = await Trainers.create(req.body);
        let trainerMapper = await singleTrainerMapper(newTrainer);
        return makeResponse(res, code.RECORD_CREATED, true, message.TRAINER_ADDED, trainerMapper);
    } catch (error) {
        return makeResponse(res, code.BAD_REQUEST, false, error.message);
    }
});

export const config = {
    api: {
      bodyParser: false, // Disallow body parsing, consume as stream
    },
};

export default apiRoute;
