import bcrypt from 'bcrypt';
import jwt, { Secret } from 'jsonwebtoken';
import { Users } from 'src/models/entity/User';

export const validatePassword = async (
    password: string,
    passwordUserExists: string,
): Promise<boolean> => {
    const passwordIsValid = await bcrypt.compare(password, passwordUserExists);
    return passwordIsValid;
};

export const generateToken = (user: Users): string => {
    const token = jwt.sign({ user }, process.env.JWT_SECRET as Secret, {
        expiresIn: '24h',
    });
    return token;
};
