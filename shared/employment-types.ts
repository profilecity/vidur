export const employmentTypes = [
  {
    id: 'FULL_TIME',
    title: 'Full Time',
    description: 'The job is a full-time position.',
  },
  {
    id: 'PART_TIME',
    title: 'Part Time',
    description: 'The job is a part-time position.',
  },
  {
    id: 'CONTRACTOR',
    title: 'Contractor',
    description: 'The job is a contractor position.',
  },
  {
    id: 'INTERN',
    title: 'Intern',
    description: 'The job is a intern position.',
  },
  {
    id: 'VOLUNTEER',
    title: 'Volunteer',
    description: 'The job is a volunteer position.',
  },
  {
    id: 'PER_DIEM',
    title: 'Per Diem',
    description: 'The job is a pay by the day.',
  },
  {
    id: 'OTHER',
    title: 'Other',
    description: "The job is a different type of position that's not listed",
  },
] as const;

export type EmploymentType = (typeof employmentTypes)[number];
export type AcceptableEmploymentType = (typeof employmentTypes)[number]['id'];

export const employmentTypeIds = employmentTypes.map((e) => e.id) as [string, ...string[]];
