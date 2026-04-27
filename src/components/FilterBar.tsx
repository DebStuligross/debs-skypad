interface FilterBarProps {
  statusFilter: string
  platformFilter: string
  editorFilter: string
  onStatusChange: (val: string) => void
  onPlatformChange: (val: string) => void
  onEditorChange: (val: string) => void
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

const EDITOR_OPTIONS = [
  { value: 'all', label: 'All' },
  { value: 'Claude Code', label: 'Claude Code' },
  { value: 'Codex', label: 'Codex' },
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

function FilterGroup({
  label,
  options,
  value,
  onChange,
}: {
  label: string
  options: { value: string; label: string }[]
  value: string
  onChange: (val: string) => void
}) {
  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: 6, flexWrap: 'wrap' }}>
      <span style={{ fontSize: 11, fontWeight: 600, color: '#9ca3af', textTransform: 'uppercase', letterSpacing: '0.05em', whiteSpace: 'nowrap' }}>
        {label}
      </span>
      {options.map(opt => (
        <Pill
          key={opt.value}
          label={opt.label}
          active={value === opt.value}
          onClick={() => onChange(value === opt.value && opt.value !== 'all' ? 'all' : opt.value)}
        />
      ))}
    </div>
  )
}

export default function FilterBar({ statusFilter, platformFilter, editorFilter, onStatusChange, onPlatformChange, onEditorChange }: FilterBarProps) {
  return (
    <div style={{
      background: 'white',
      padding: '8px 24px 10px',
      display: 'flex',
      alignItems: 'center',
      gap: 0,
      flexWrap: 'wrap',
      borderBottom: '1px solid #d1d5db',
      rowGap: 8,
    }}>
      <FilterGroup label="Status" options={STATUS_OPTIONS} value={statusFilter} onChange={onStatusChange} />
      <div style={{ width: 1, height: 20, background: '#e5e7eb', margin: '0 12px', flexShrink: 0 }} />
      <FilterGroup label="Platform" options={PLATFORM_OPTIONS} value={platformFilter} onChange={onPlatformChange} />
      <div style={{ width: 1, height: 20, background: '#e5e7eb', margin: '0 12px', flexShrink: 0 }} />
      <FilterGroup label="Dev Tool" options={EDITOR_OPTIONS} value={editorFilter} onChange={onEditorChange} />
    </div>
  )
}
