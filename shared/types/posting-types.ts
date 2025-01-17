export type PostalAddress = {
  streetAddress?: string;
  addressLocality?: string;
  addressRegion?: string;
  postalCode?: string;
  addressCountry: string;
};

export type PostalAddressList = PostalAddress[];

export const salaryUnits = ['Hour', 'Day', 'Week', 'Month', 'Year'] as const;
export type Salary = {
  unitText: (typeof salaryUnits)[number];
  currency: string;
  minValue: number;
  maxValue: number;
};
