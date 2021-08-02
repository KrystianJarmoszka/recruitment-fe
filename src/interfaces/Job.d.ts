type Status = 'open' | 'in_progress' | 'completed' | 'canceled'

export interface Job {
  id: number,
  summary: string,
  description: string,
  status: Status,
  raised_by: string,
  property: {
    id: number,
    name: string,
  }
}

export interface JobForm {
  summary: string | '',
  description: string | '',
  status: Status,
  raisedBy: string | '',
  property: number | undefined
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
  order?: string,
}

export interface JobStatusForm {
  value: Status,
  label: 'Open' | 'In progress' | 'Completed' | 'Canceled',
}
