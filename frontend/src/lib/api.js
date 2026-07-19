const API_BASE = import.meta.env.VITE_API_URL || ''

async function parseJsonResponse(res, url) {
	if (!res.ok) {
		throw new Error(`Request to ${url} failed with ${res.status}`)
	}
	try {
		return await res.json()
	} catch {
		// A 200 with a non-JSON body (an HTML error page from a misconfigured
		// proxy/CDN, for example) would otherwise surface a cryptic
		// "Unexpected token '<'" parse error straight to the UI.
		throw new Error(`Request to ${url} returned an unexpected response`)
	}
}

export async function apiGet(path) {
	const url = `${API_BASE}${path}`
	const res = await fetch(url, { credentials: 'omit' })
	return parseJsonResponse(res, url)
}

export async function apiPost(path, body) {
	const url = `${API_BASE}${path}`
	const res = await fetch(url, {
		method: 'POST',
		headers: { 'Content-Type': 'application/json' },
		body: body ? JSON.stringify(body) : undefined,
		credentials: 'omit'
	})
	return parseJsonResponse(res, url)
}
