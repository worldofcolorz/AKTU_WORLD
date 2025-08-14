export function getApproxSiteOpens() {
  // If a global is provided (e.g., injected by analytics), prefer that
  if (typeof window !== 'undefined' && typeof window.EDULOR_VISITS === 'number') {
    return window.EDULOR_VISITS
  }

  // Fallback: approximate per-browser opens using localStorage
  try {
    const key = 'edulorz_total_opens'
    const sessionKey = 'edulorz_session_seen'
    const hasCountedThisSession = sessionStorage.getItem(sessionKey)
    let total = Number(localStorage.getItem(key) || '0')
    if (!hasCountedThisSession) {
      total += 1
      localStorage.setItem(key, String(total))
      sessionStorage.setItem(sessionKey, '1')
    }
    return total
  } catch {
    return 0
  }
}


