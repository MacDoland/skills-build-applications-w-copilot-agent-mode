const codespaceName = import.meta.env.VITE_CODESPACE_NAME

function getApiBaseUrl() {
  if (codespaceName) {
    return `https://${import.meta.env.VITE_CODESPACE_NAME}-8000.app.github.dev/api`
  }

  const codespacesMatch = globalThis.location?.hostname.match(/^(.+)-5173\.app\.github\.dev$/)

  if (codespacesMatch) {
    return `https://${codespacesMatch[1]}-8000.app.github.dev/api`
  }

  return 'http://localhost:8000/api'
}

export const apiBaseUrl = getApiBaseUrl()

function getRequestUrl(resourceOrEndpoint) {
  if (resourceOrEndpoint.startsWith('http')) {
    return resourceOrEndpoint
  }

  const resource = resourceOrEndpoint
    .replace(/^\/?api\/?/, '')
    .replace(/^\/+|\/+$/g, '')

  return `${apiBaseUrl}/${resource}/`
}

export function normalizeCollection(payload) {
  if (Array.isArray(payload)) {
    return payload
  }

  for (const key of ['data', 'results', 'items', 'docs']) {
    if (Array.isArray(payload?.[key])) {
      return payload[key]
    }
  }

  return []
}

export async function fetchCollection(resourceOrEndpoint) {
  const response = await fetch(getRequestUrl(resourceOrEndpoint))

  if (!response.ok) {
    throw new Error(`Request failed with status ${response.status}`)
  }

  const payload = await response.json()
  return normalizeCollection(payload)
}