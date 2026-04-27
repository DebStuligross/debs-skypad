import { useState } from 'react'
import Header from './components/Header'
import FilterBar from './components/FilterBar'
import ProjectCard from './components/ProjectCard'
import type { Project } from './types'
import projectsData from './projects.json'

const projects = projectsData as Project[]

function normalizePlatform(deployedVia: string): string {
  if (deployedVia === 'vercel') return 'vercel'
  if (deployedVia === 'netlify') return 'netlify'
  if (deployedVia === 'github-pages') return 'github-pages'
  return 'local'
}

export default function App() {
  const [statusFilter, setStatusFilter] = useState('all')
  const [platformFilter, setPlatformFilter] = useState('all')
  const [editorFilter, setEditorFilter] = useState('all')

  const filtered = projects.filter(p => {
    const statusMatch = statusFilter === 'all' || p.status === statusFilter
    const platformMatch = platformFilter === 'all' || normalizePlatform(p.deployedVia) === platformFilter
    const editorMatch = editorFilter === 'all' || p.editor === editorFilter
    return statusMatch && platformMatch && editorMatch
  })

  return (
    <div style={{ minHeight: '100vh', background: 'var(--periwinkle-bg)' }}>
      <Header />
      <FilterBar
        statusFilter={statusFilter}
        platformFilter={platformFilter}
        editorFilter={editorFilter}
        onStatusChange={setStatusFilter}
        onPlatformChange={setPlatformFilter}
        onEditorChange={setEditorFilter}
      />
      <main style={{ maxWidth: 1600, margin: '0 auto', padding: '16px 20px' }}>
        {filtered.length > 0 ? (
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fill, minmax(240px, 1fr))',
            gap: 12,
          }}>
            {filtered.map(p => (
              <ProjectCard key={p.name} project={p} />
            ))}
          </div>
        ) : (
          <p style={{ color: 'var(--text-muted)', textAlign: 'center', padding: 48 }}>
            No projects match these filters.
          </p>
        )}
      </main>
    </div>
  )
}
