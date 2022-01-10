import axios from 'axios';
import bodyParser from 'body-parser';
import { code, makeResponse, message } from '../../../utils/common/response';
import { appToken, managementToken } from './_100';
import authUser from '../../../middleware/auth';
import { Rooms } from '../../../db/models/rooms';

export default async function handler(req, res) {
    const { method } = req;
    switch (method) {
        case 'POST':
            try {
                await authUser(req, res);
                const body = {
                    name: `${req.body.user_id}`,
                    description: "Sporty Guru Training Session"
                };
                const token = await managementToken();
                const room = await axios.post('https://prod-in2.100ms.live/api/v2/rooms', body, {
                    headers: {
                        'Authorization': `Bearer ${token}`
                    }
                });
                const randomStr = Math.random().toString(36).replace(/[^a-z]+/g, '').substr(0, 5);
                const apptoken = appToken(room.data.id, `user_${randomStr}`, "host");
                let roomRecord = await Rooms.findOne({
                    where: {
                        "room_id": room.data.id
                    }
                });
                if (roomRecord) {
                    await Rooms.update({ app_token: apptoken }, {
                        where: {
                            "id": roomRecord.id
                        }
                    }
                    );
                    let updatedRoom = await Rooms.findOne({ where: { "id": roomRecord.id } });
                    return makeResponse(res, code.SUCCESS, true, message.ROOM_CREATED, updatedRoom);
                }
                else {
                    let roomprops = {
                        name: room.data.name,
                        description: room.data.description,
                        room_id: room.data.id,
                        management_token: token,
                        app_token: apptoken
                    };
                    let newRoom = await Rooms.create(roomprops);
                    return makeResponse(res, code.SUCCESS, true, message.ROOM_CREATED, newRoom);
                }
            } catch (error) {
                return makeResponse(res, code.BAD_REQUEST, false, error.message);
            }
        default: res.setHeader('Allow', ['POST']);
            res.status(405).end(`Method ${method} Not Allowed`);
    }
};

export const config = {
    api: {
        bodyParser
    },
};
