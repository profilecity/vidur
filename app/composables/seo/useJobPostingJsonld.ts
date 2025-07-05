import type { JobPosting } from '~~/server/db/schema';
import type { CareerSiteConfig } from '~~/shared/schemas/setting';

export function useJobPostingJsonld(posting: Ref<JobPosting | null>, careerSiteConfig: Ref<CareerSiteConfig>) {
  return useJsonld(() => {
    if (!posting.value || !careerSiteConfig.value) return null;

    const job = posting.value;
    const company = careerSiteConfig.value;
    const locations = Array.isArray(job.jobLocations) ? job.jobLocations : [];
    const baseSalary = job.baseSalary;

    // Only include jobLocation if there are locations or remote
    let jobLocation;
    if (locations.length > 0) {
      jobLocation = locations.map((loc) => ({
        '@type': 'Place' as const,
        address: {
          '@type': 'PostalAddress' as const,
          ...(loc.streetAddress && { streetAddress: loc.streetAddress }),
          ...(loc.addressLocality && { addressLocality: loc.addressLocality }),
          ...(loc.addressRegion && { addressRegion: loc.addressRegion }),
          ...(loc.postalCode && { postalCode: loc.postalCode }),
          addressCountry: loc.addressCountry,
        },
      }));
    } else if (job.isRemote) {
      jobLocation = [
        {
          '@type': 'Place' as const,
          address: {
            '@type': 'PostalAddress' as const,
            addressCountry: 'Remote',
          },
        },
      ];
    }

    return {
      '@context': 'https://schema.org',
      '@type': 'JobPosting',
      title: job.title,
      description: job.contents ?? '',
      identifier: {
        '@type': 'PropertyValue',
        name: company.name,
        value: job.id,
      },
      datePosted: job.createdAt ? new Date(job.createdAt).toISOString() : undefined,
      validThrough: job.validTill ? new Date(job.validTill).toISOString() : undefined,
      employmentType: job.employmentType,
      hiringOrganization: {
        '@type': 'Organization',
        name: company.name,
        logo: company.logo,
        description: company.bio || company.description || undefined,
        sameAs: company.links?.length ? company.links[0]?.href : undefined,
      },
      ...(jobLocation ? { jobLocation } : {}),
      ...(baseSalary
        ? {
            baseSalary: {
              '@type': 'MonetaryAmount',
              currency: baseSalary.currency,
              value: {
                '@type': 'QuantitativeValue',
                minValue: baseSalary.minValue,
                maxValue: baseSalary.maxValue,
                unitText: baseSalary.unitText,
              },
            },
          }
        : {}),
      applicantLocationRequirements: job.isRemote ? 'Remote' : undefined,
    };
  });
}
