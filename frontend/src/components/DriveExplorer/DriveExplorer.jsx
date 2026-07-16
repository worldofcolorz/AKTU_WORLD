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

function DriveExplorer({ section, title, description }) {
  const [tree, setTree] = useState(null)
  const [status, setStatus] = useState('loading') // loading | ready | empty | error
  const [errorMessage, setErrorMessage] = useState('')
  const [path, setPath] = useState([])

  useEffect(() => {
    let isMounted = true
    setStatus('loading')
    setPath([])
    fetchDriveTree(section)
      .then((data) => {
        if (!isMounted) return
        setTree(data)
        setStatus('ready')
      })
      .catch((err) => {
        if (!isMounted) return
        setErrorMessage(err?.message || 'Failed to load content')
        setStatus('error')
      })
    return () => { isMounted = false }
  }, [section])

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

  return (
    <div className="papers-page">
      <div className="floating-bubble"></div>
      <div className="floating-bubble"></div>
      <div className="floating-bubble"></div>

      <div className="papers-header">
        <h1>{title}</h1>
        {description && <p>{description}</p>}
      </div>

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

      <div className="papers-content">
        {status === 'loading' && (
          <div className="selection-container">
            <h2>Loading…</h2>
          </div>
        )}

        {status === 'error' && (
          <div className="selection-container">
            <h2>Couldn't load content</h2>
            <p style={{ color: 'white', textAlign: 'center' }}>{errorMessage}</p>
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
                <div key={folder.id} className="option-card" onClick={() => enterFolder(folder.id)}>
                  <div className="option-icon">{FOLDER_ICON}</div>
                  <h3>{folder.name}</h3>
                </div>
              ))}
            </div>
          </div>
        )}

        {status === 'ready' && files.length > 0 && (
          <div className="papers-container">
            <h2>{currentNode.name}</h2>
            <div className="papers-grid">
              {files.map((file) => (
                <div
                  key={file.id}
                  className="paper-card"
                  role="button"
                  tabIndex={0}
                  onClick={() => window.open(file.downloadUrl, '_blank', 'noopener,noreferrer')}
                  onKeyDown={(e) => { if (e.key === 'Enter') window.open(file.downloadUrl, '_blank', 'noopener,noreferrer') }}
                >
                  <div className="paper-icon">{FILE_ICON}</div>
                  <h3>{file.name}</h3>
                  <p>Click to open</p>
                  <div className="paper-link">
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
