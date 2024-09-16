// Import the defineEventHandler function from the 'h3' package
// This is used to create server-side event handlers
import { defineEventHandler } from 'h3';
import { type ReviewTag } from '../../db/schema'; //import review tags from db schema

import authenticateAdminRequest from '../../utils/admin';

// Define and export the default event handler for this API endpoint
export default defineEventHandler(async (event) => {
  // Authenticate the request to ensure it's coming from an admin
  // This function should throw an error if authentication fails

  await authenticateAdminRequest(event);

  //RetreiveTags from general memory storage and
  //If no tags are found, default to an empty array
  const reviewTags = (await general_memoryStorage.getItem<ReviewTag[]>('reviewTags')) || [];

  //Return the review tags as the response
  return reviewTags;
});
