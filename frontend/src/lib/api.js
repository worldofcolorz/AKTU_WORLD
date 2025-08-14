const API_BASE = import.meta.env.VITE_API_URL || ''

export async function apiGet(path) {
	const url = `${API_BASE}${path}`
	const res = await fetch(url, { credentials: 'omit' })
	if (!res.ok) {
		throw new Error(`GET ${url} failed with ${res.status}`)
	}
	return res.json()
}

export async function apiPost(path, body) {
	const url = `${API_BASE}${path}`
	const res = await fetch(url, {
		method: 'POST',
		headers: { 'Content-Type': 'application/json' },
		body: body ? JSON.stringify(body) : undefined,
		credentials: 'omit'
	})
	if (!res.ok) {
		throw new Error(`POST ${url} failed with ${res.status}`)
	}
	return res.json()
}


