import { apiGet } from './api'

export async function fetchDriveTree(section) {
	return apiGet(`/api/drive/tree?section=${encodeURIComponent(section)}`)
}

export async function fetchDriveStats() {
	return apiGet('/api/drive/stats')
}
