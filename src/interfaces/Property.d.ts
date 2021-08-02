export interface Property {
  id: number,
  name: string,
}

export interface PropertiesState {
  items: Property[],
  status: 'idle' | 'loading' | 'succeeded' | 'failed',
  error: string | null,
  count: number,
  page: number,
  pages: number
}
