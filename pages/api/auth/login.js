import bodyParser from 'body-parser';
import Joi from "joi";
import validate from "../../../middleware/validations";
import { Trainers } from '../../../db/models/trainer';
import { code, makeResponse, message } from '../../../utils/common/response';
import { generateAuthToken, generateRefreshToken, matchPassword } from '../../../utils/common/common';
import { singleTrainerMapper } from '../../../utils/common/mapper';

const handler = async (req, res) => {
  const { method, body } = req;
  switch (method) {
    case 'POST':
      try {
        let trainerRecord = await Trainers.findOne({
          where: {
            "email": body.email
          }
        });
        if (!trainerRecord) return makeResponse(res, code.NOT_FOUND, false, message.TRAINER_NOT_FOUND, null);
        let verifyPassword = await matchPassword(body.password, trainerRecord.password);
        if (!verifyPassword) return makeResponse(res, code.BAD_REQUEST, false, message.INCORRECT_PASSWORD, null);
        const accessToken = generateAuthToken(trainerRecord.id);
        const refreshToken = generateRefreshToken(trainerRecord.id);
        let userMapper = await singleTrainerMapper(trainerRecord);
        return makeResponse(res, code.SUCCESS, true, message.LOGIN_SUCCESS, userMapper, { accessToken, refreshToken });
      } catch (error) {
        return makeResponse(res, code.BAD_REQUEST, false, error.message);
      }
    default: res.setHeader('Allow', ['POST']);
      res.status(405).end(`Method ${method} Not Allowed`);
  }
};

const schema = Joi.object({
  email: Joi.string().email().required(),
  password: Joi.string().required(),
});

export default validate({ body: schema }, handler);

export const config = {
  api: {
    bodyParser
  },
};
