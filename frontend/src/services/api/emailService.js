/* eslint-disable import/no-anonymous-default-export */
import { API_URL } from "../../constants/config";
import LocalStorageService from "../storage";
import { createService } from "./axios";

const apiService = createService(API_URL);

const verifyEmail = async(data) => {
    try {
        const emailVerificationToken = LocalStorageService.get(LocalStorageService.EMAIL_VERIFICATION_TOKEN);

        if (!emailVerificationToken) {
            throw new Error("Email verification token is missing.");
        }

        const response = await apiService.post('/auth/email/verify', data, {
            headers: {
                'X-Email-Verification-Token': emailVerificationToken
            },
        });

        return response.data;
    } catch (error) {
        console.log(error);
        throw new Error(error.response?.data?.message || 'Failed to verify email');
    }
}

export default { verifyEmail }