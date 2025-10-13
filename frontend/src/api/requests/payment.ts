import { api, instance } from "../instance";
import type { InitPaymentRequest, InitPaymentResponse, PaymentDetailsResponse, PaymentHistoryResponse } from "../types";

export const getPaymentHistory = async () =>
    await instance
        .get<PaymentHistoryResponse[]>('/payment')
        .then(res => res.data)

export const getPaymentById = async (id: string) =>
    await api
        .get<PaymentDetailsResponse>(`/payment/${id}`)
        .then(res => res.data)

export const initPayment = async (data: InitPaymentRequest) =>
    await instance
        .post<InitPaymentResponse>('/payment/init', data)
        .then(res => res.data)