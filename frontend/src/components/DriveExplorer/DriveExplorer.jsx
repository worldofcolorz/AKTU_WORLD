import React, { useEffect, useMemo, useState } from 'react'
import './DriveExplorer.css'
import { fetchDriveTree } from '../../lib/drive'

const FOLDER_ICON = '📁'
const FILE_ICON = '📄'

function findNodeByPath(root, path) {
  let node = root
  for (const id of path) {
    node = (node?.children || []).find((child) => child.id === id)
    if (!node) return null
  }
  return node
}

const RETRY_DELAY_MS = 4000
const MAX_RETRIES = 30 // ~2 minutes - a section this stubborn needs a human to look, not an infinite poll

function DriveExplorer({ section, title, description }) {
  const [tree, setTree] = useState(null)
  const [status, setStatus] = useState('loading') // loading | warming | ready | error | stuck
  const [errorMessage, setErrorMessage] = useState('')
  const [path, setPath] = useState([])
  const [retryKey, setRetryKey] = useState(0)

  useEffect(() => {
    let isMounted = true
    let retryTimer = null
    let attempts = 0
    setStatus('loading')
    setPath([])

    const load = () => {
      fetchDriveTree(section)
        .then((data) => {
          if (!isMounted) return
          if (data?.retry) {
            attempts += 1
            if (attempts >= MAX_RETRIES) {
              setStatus('stuck')
              return
            }
            // First time this section has ever been requested - the backend is
            // building it in the background (can take a while for a large Drive
            // folder). Keep polling every few seconds until it's ready.
            setStatus('warming')
            retryTimer = setTimeout(load, RETRY_DELAY_MS)
            return
          }
          setTree(data)
          setStatus('ready')
        })
        .catch((err) => {
          if (!isMounted) return
          setErrorMessage(err?.message || 'Failed to load content')
          setStatus('error')
        })
    }
    load()

    return () => { isMounted = false; if (retryTimer) clearTimeout(retryTimer) }
  }, [section, retryKey])

  const currentNode = useMemo(() => (tree ? findNodeByPath(tree, path) || tree : null), [tree, path])
  const children = currentNode?.children || []
  const folders = children.filter((c) => c.type === 'folder')
  const files = children.filter((c) => c.type === 'file')

  const breadcrumbs = useMemo(() => {
    if (!tree) return []
    const crumbs = [{ id: null, name: tree.name }]
    let node = tree
    for (const id of path) {
      node = (node.children || []).find((c) => c.id === id)
      if (!node) break
      crumbs.push({ id, name: node.name })
    }
    return crumbs
  }, [tree, path])

  const enterFolder = (id) => setPath((p) => [...p, id])
  const goToBreadcrumb = (index) => setPath((p) => p.slice(0, index))
  const goBack = () => setPath((p) => p.slice(0, -1))

  const openFile = (file) => {
    // Fall back to the Drive webViewLink (or do nothing) rather than calling
    // window.open(undefined, ...) and silently opening a blank tab if the
    // backend ever returns a file node without a downloadUrl.
    const url = file.downloadUrl || file.webViewLink
    if (!url) return
    window.open(url, '_blank', 'noopener,noreferrer')
  }

  return (
    <div className="drive-page">
      <div className="floating-bubble"></div>
      <div className="floating-bubble"></div>
      <div className="floating-bubble"></div>

      <div className="drive-header">
        <h1>{title}</h1>
        {description && <p>{description}</p>}
      </div>

      {tree?.truncated && (
        <p className="drive-truncated-notice">
          This section has more content than can be shown at once - some items may be missing. Let us know if something looks incomplete.
        </p>
      )}

      {breadcrumbs.length > 1 && (
        <nav className="drive-breadcrumbs" aria-label="Breadcrumb">
          {breadcrumbs.map((crumb, index) => (
            <span key={crumb.id ?? 'root'}>
              {index > 0 && <span className="drive-breadcrumb-sep">/</span>}
              <button
                type="button"
                className="drive-breadcrumb-btn"
                disabled={index === breadcrumbs.length - 1}
                onClick={() => goToBreadcrumb(index)}
              >
                {crumb.name}
              </button>
            </span>
          ))}
        </nav>
      )}

      <div className="drive-content">
        {status === 'loading' && (
          <div className="selection-container">
            <h2>Loading…</h2>
          </div>
        )}

        {status === 'warming' && (
          <div className="selection-container">
            <h2>Getting things ready…</h2>
            <p style={{ color: 'white', textAlign: 'center' }}>Loading this section for the first time - this can take a little while for a large folder. It'll be instant after this.</p>
          </div>
        )}

        {status === 'error' && (
          <div className="selection-container">
            <h2>Couldn't load content</h2>
            <p style={{ color: 'white', textAlign: 'center' }}>{errorMessage}</p>
          </div>
        )}

        {status === 'stuck' && (
          <div className="selection-container">
            <h2>This is taking longer than expected</h2>
            <p style={{ color: 'white', textAlign: 'center' }}>Something may be wrong on our end.</p>
            <div className="navigation-buttons">
              <button className="back-btn" onClick={() => setRetryKey((k) => k + 1)}>Try again</button>
            </div>
          </div>
        )}

        {status === 'ready' && folders.length === 0 && files.length === 0 && (
          <div className="selection-container">
            <h2>Nothing here yet</h2>
            <p style={{ color: 'white', textAlign: 'center' }}>Content will appear automatically once it's added to the Drive folder.</p>
          </div>
        )}

        {status === 'ready' && folders.length > 0 && (
          <div className="selection-container">
            <h2>Select {breadcrumbs.length > 1 ? 'Subject' : title}</h2>
            <div className="options-grid">
              {folders.map((folder) => (
                <div
                  key={folder.id}
                  className="option-card"
                  role="button"
                  tabIndex={0}
                  onClick={() => enterFolder(folder.id)}
                  onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); enterFolder(folder.id) } }}
                >
                  <div className="option-icon">{FOLDER_ICON}</div>
                  <h3>{folder.name}</h3>
                </div>
              ))}
            </div>
          </div>
        )}

        {status === 'ready' && files.length > 0 && (
          <div className="drive-files-container">
            <h2>{currentNode.name}</h2>
            <div className="drive-files-grid">
              {files.map((file) => (
                <div
                  key={file.id}
                  className="file-card"
                  role="button"
                  tabIndex={0}
                  onClick={() => openFile(file)}
                  onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); openFile(file) } }}
                >
                  <div className="file-icon">{FILE_ICON}</div>
                  <h3>{file.name}</h3>
                  <p>Click to open</p>
                  <div className="file-link">
                    <span>Open in new tab</span>
                    <span className="arrow">→</span>
                  </div>
                  {file.webViewLink && (
                    <a
                      href={file.webViewLink}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="drive-fallback-link"
                      onClick={(e) => e.stopPropagation()}
                    >
                      Having trouble? Open in Drive directly
                    </a>
                  )}
                </div>
              ))}
            </div>
          </div>
        )}

        {path.length > 0 && (
          <div className="navigation-buttons">
            <button className="back-btn" onClick={goBack}>← Back</button>
            <button className="reset-btn" onClick={() => setPath([])}>Start Over</button>
          </div>
        )}
      </div>
    </div>
  )
}

export default DriveExplorer
