import jwt, { JwtPayload } from 'jsonwebtoken';

export const decryptToken = (token: string): JwtPayload | null => {
    try {
        const payload = jwt.decode(token, {
            json: true,
        });

        return payload;
    } catch (error) {
        throw new Error((error as Error).message);
    }
};
