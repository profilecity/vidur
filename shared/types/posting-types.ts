import type { salaryUnits } from '../consts/posting';

export type PostalAddress = {
  streetAddress?: string;
  addressLocality?: string;
  addressRegion?: string;
  postalCode?: string;
  addressCountry: string;
};

export type PostalAddressList = PostalAddress[];

export type Salary = {
  unitText: (typeof salaryUnits)[number];
  currency: string;
  minValue: number;
  maxValue: number;
};
