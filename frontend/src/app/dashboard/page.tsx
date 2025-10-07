'use client'

import { getMe } from "@/api/requests"
import { useQuery } from "@tanstack/react-query"

export default function DashboardPage() {
	const {data, isLoading} = useQuery({
		queryKey: ['get me'],
		queryFn: getMe
	})

	return <div>{isLoading ? 'Loading...' : JSON.stringify(data)}</div>
}
