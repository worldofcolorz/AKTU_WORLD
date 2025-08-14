const API_BASE = import.meta.env.VITE_API_URL || ''

export async function apiGet(path) {
	const url = `${API_BASE}${path}`
	const res = await fetch(url, { credentials: 'omit' })
	if (!res.ok) {
		throw new Error(`GET ${url} failed with ${res.status}`)
	}
	return res.json()
}


