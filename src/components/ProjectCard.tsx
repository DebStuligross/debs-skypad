import type { Project } from '../types'

const STATUS_COLORS: Record<Project['status'], { color: string; bg: string }> = {
  'active':        { color: '#7B8CDE', bg: '#E8EBFA' },
  'in-progress':   { color: '#E8850C', bg: '#FEF3E2' },
  'planning':      { color: '#1565C0', bg: '#E3F0FF' },
  'setup-pending': { color: '#E91E8C', bg: '#FCE4F2' },
  'completed':     { color: '#8B95A5', bg: '#F0F1F4' },
  'local-only':    { color: '#8B95A5', bg: '#F0F1F4' },
}

const STATUS_LABELS: Record<Project['status'], string> = {
  'active':        'Active',
  'in-progress':   'In Progress',
  'planning':      'Planning',
  'setup-pending': 'Setup Pending',
  'completed':     'Completed',
  'local-only':    'Local Only',
}

const PLATFORM_LABELS: Record<string, string> = {
  'vercel':             'Vercel',
  'netlify':            'Netlify',
  'github-pages':       'GitHub Pages',
  'google-apps-script': 'Google Apps Script',
  'local':              'Local',
}

function Chip({ label }: { label: string }) {
  return (
    <span style={{
      background: '#F3F5FD',
      color: '#6b7280',
      fontSize: 11,
      padding: '2px 8px',
      borderRadius: 10,
      fontWeight: 500,
    }}>
      {label}
    </span>
  )
}

export default function ProjectCard({ project }: { project: Project }) {
  const statusStyle = STATUS_COLORS[project.status]

  return (
    <div style={{
      background: 'white',
      borderRadius: 8,
      boxShadow: '0 1px 3px rgba(0,0,0,0.08)',
      padding: '16px',
      display: 'flex',
      flexDirection: 'column',
      gap: 8,
      transition: 'box-shadow 0.15s',
      cursor: 'default',
    }}
      onMouseEnter={e => (e.currentTarget.style.boxShadow = '0 4px 12px rgba(0,0,0,0.12)')}
      onMouseLeave={e => (e.currentTarget.style.boxShadow = '0 1px 3px rgba(0,0,0,0.08)')}
    >
      {/* Top row: name + status badge */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', gap: 8 }}>
        {project.liveUrl ? (
          <a
            href={project.liveUrl}
            target="_blank"
            rel="noopener noreferrer"
            style={{
              fontSize: 16,
              fontWeight: 600,
              color: '#7B8CDE',
              textDecoration: 'none',
              lineHeight: 1.3,
            }}
            onMouseEnter={e => (e.currentTarget.style.textDecoration = 'underline')}
            onMouseLeave={e => (e.currentTarget.style.textDecoration = 'none')}
          >
            {project.displayName}
          </a>
        ) : (
          <span style={{ fontSize: 16, fontWeight: 600, color: '#1a1a2e', lineHeight: 1.3 }}>
            {project.displayName}
          </span>
        )}
        <span style={{
          fontSize: 11,
          fontWeight: 600,
          padding: '2px 9px',
          borderRadius: 10,
          color: statusStyle.color,
          background: statusStyle.bg,
          whiteSpace: 'nowrap',
          flexShrink: 0,
        }}>
          {STATUS_LABELS[project.status]}
        </span>
      </div>

      {/* Description */}
      <p style={{ fontSize: 13, color: '#6b7280', lineHeight: 1.4, margin: 0 }}>
        {project.description}
      </p>

      {/* Metadata chips */}
      <div style={{ display: 'flex', gap: 6, flexWrap: 'wrap', marginTop: 2 }}>
        <Chip label={project.editor} />
        <Chip label={PLATFORM_LABELS[project.deployedVia] ?? project.deployedVia} />
        {project.database && <Chip label={project.database} />}
      </div>
    </div>
  )
}
