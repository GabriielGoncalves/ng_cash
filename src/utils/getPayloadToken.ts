import { Request } from 'express';
import { decryptToken } from './decryptToken';

export const getPayloadToken = (req: Request) => {
    const token = req.headers.authorization!.split(' ')[1];
    const payload = decryptToken(token);

    return payload;
};
