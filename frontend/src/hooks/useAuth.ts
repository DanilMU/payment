import { getAccessToken } from "@/lib/cookies";
import { useEffect, useState } from "react";

export function useAuth() {
    const [isAuthorized, setIsAuthorized] = useState(false)

    useEffect(() => {
        const token = getAccessToken()

        setIsAuthorized(Boolean(token && typeof token !== 'undefined'))
    }, [])

    return { isAuthorized }
}