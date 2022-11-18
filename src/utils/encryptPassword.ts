import bcrypt from 'bcrypt';

export const hashPassword = async (password: string): Promise<string> => {
    const salt = await bcrypt.genSalt(15);
    const newPassword = await bcrypt.hash(password, salt);
    return newPassword;
};
