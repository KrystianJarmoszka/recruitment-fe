export interface Job {
  id: number,
  summary: string,
  description?: string,
  status: 'open' | 'in_progress' | 'completed' | 'canceled',
  raised_by: string,
  property: {
    id: number,
    name: string,
  }
}

export interface JobParams {
  id: string
}

export interface JobsState {
  items: Job[],
  status: 'idle' | 'loading' | 'succeeded' | 'failed',
  error: string | null
}
