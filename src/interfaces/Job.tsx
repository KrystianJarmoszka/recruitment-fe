export interface Job {
  id: number,
  summary: string,
  description: string,
  status: 'open' | 'in_progress' | 'completed' | 'canceled',
  raised_by: string,
  property: {
    id: number,
    name: string,
  }
}

export interface NewJob {
  summary: string | '',
  description: string | '',
  status: 'open' | 'in_progress' | 'completed' | 'canceled',
  raised_by: string | '',
  property: { id: number, name: string, } | null
}

export interface JobsState {
  items: Job[],
  status: 'idle' | 'loading' | 'succeeded' | 'failed',
  error: string | null,
  count: number,
  page: number,
  pages: number,
  keyWord: string,
  order: string,
}

export interface JobFilterParams {
  page: number,
  summary?: string,
  order?: string
}
