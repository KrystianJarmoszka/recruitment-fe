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
