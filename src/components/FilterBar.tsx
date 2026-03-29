interface FilterBarProps {
  statusFilter: string
  platformFilter: string
  onStatusChange: (val: string) => void
  onPlatformChange: (val: string) => void
}

const STATUS_OPTIONS = [
  { value: 'all', label: 'All' },
  { value: 'active', label: 'Active' },
  { value: 'in-progress', label: 'In Progress' },
  { value: 'planning', label: 'Planning' },
  { value: 'setup-pending', label: 'Setup Pending' },
  { value: 'completed', label: 'Completed' },
]

const PLATFORM_OPTIONS = [
  { value: 'all', label: 'All' },
  { value: 'vercel', label: 'Vercel' },
  { value: 'netlify', label: 'Netlify' },
  { value: 'github-pages', label: 'GitHub Pages' },
  { value: 'local', label: 'Local' },
]

function Pill({
  label,
  active,
  onClick,
}: {
  label: string
  active: boolean
  onClick: () => void
}) {
  return (
    <button
      onClick={onClick}
      style={{
        display: 'inline-block',
        padding: '3px 12px',
        borderRadius: 10,
        fontSize: 12,
        fontWeight: 500,
        cursor: 'pointer',
        whiteSpace: 'nowrap',
        border: active ? '1.5px solid #7B8CDE' : '1.5px solid #e5e7eb',
        background: active ? '#E8EBFA' : '#f3f4f6',
        color: active ? '#5A6BC7' : '#b0b8c4',
        transition: 'all 0.12s',
        fontFamily: 'inherit',
      }}
    >
      {label}
    </button>
  )
}

export default function FilterBar({ statusFilter, platformFilter, onStatusChange, onPlatformChange }: FilterBarProps) {
  return (
    <div style={{
      background: 'white',
      padding: '8px 24px 10px',
      display: 'flex',
      flexDirection: 'column',
      gap: 8,
      borderBottom: '1px solid #d1d5db',
    }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: 8, flexWrap: 'wrap' }}>
        <span style={{ fontSize: 11, fontWeight: 600, color: '#9ca3af', textTransform: 'uppercase', letterSpacing: '0.05em', minWidth: 56 }}>Status</span>
        {STATUS_OPTIONS.map(opt => (
          <Pill
            key={opt.value}
            label={opt.label}
            active={statusFilter === opt.value}
            onClick={() => onStatusChange(statusFilter === opt.value && opt.value !== 'all' ? 'all' : opt.value)}
          />
        ))}
      </div>
      <div style={{ display: 'flex', alignItems: 'center', gap: 8, flexWrap: 'wrap' }}>
        <span style={{ fontSize: 11, fontWeight: 600, color: '#9ca3af', textTransform: 'uppercase', letterSpacing: '0.05em', minWidth: 56 }}>Platform</span>
        {PLATFORM_OPTIONS.map(opt => (
          <Pill
            key={opt.value}
            label={opt.label}
            active={platformFilter === opt.value}
            onClick={() => onPlatformChange(platformFilter === opt.value && opt.value !== 'all' ? 'all' : opt.value)}
          />
        ))}
      </div>
    </div>
  )
}
