import * as Yup from 'yup';

export const JobSchema = Yup.object().shape({
  summary: Yup.string()
    .min(1, 'Too Short!')
    .max(150, 'Too Long!')
    .required('Required'),
  description: Yup.string()
    .min(3, 'Too Short!')
    .max(500, 'Too Long!'),
  status: Yup.string()
    .required('Required'),
  raised_by: Yup.string()
    .min(3, 'Too Short!')
    .max(50, 'Too Long!'),
  property: Yup.number()
    .required('Required'),
});
