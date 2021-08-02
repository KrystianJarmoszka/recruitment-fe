import { JobStatusForm } from "../interfaces/Job";

export const STATUS_OPEN = 'open';
export const STATUS_IN_PROGRESS = 'in_progress';
export const STATUS_COMPLETED = 'completed';
export const STATUS_CANCELED = 'canceled';

export const JOB_STATUSES: JobStatusForm[] = [
  {
    value: STATUS_OPEN,
    label: 'Open',
  },
  {
    value: STATUS_IN_PROGRESS,
    label: 'In progress',
  },
  {
    value: STATUS_COMPLETED,
    label: 'Completed',
  },
  {
    value: STATUS_CANCELED,
    label: 'Canceled',
  },
]
