export interface Project {
  name: string
  displayName: string
  description: string
  liveUrl: string | null
  status: 'active' | 'in-progress' | 'planning' | 'setup-pending' | 'local-only' | 'archived'
  editor: string
  deployedVia: string
  database: string | null
  githubUrl: string | null
}
