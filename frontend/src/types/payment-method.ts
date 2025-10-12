import type { InitPaymentRequestProvider } from "@/api/types";
import type { LucideIcon } from "lucide-react";

export interface PaymentMethod {
    id: InitPaymentRequestProvider
    name: string
    description: string
    icon: LucideIcon
    bg: string
    textColor: string
}