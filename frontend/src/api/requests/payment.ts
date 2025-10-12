import { instance } from "../instance";
import type { InitPaymentRequest } from "../types";

export const initPayment = async (data: InitPaymentRequest) =>
    await instance.post('/payment/init', data).then(res => res.data)