import type { H3Event } from 'h3';

export function sendRedirectToNextPage(event: H3Event) {
  const nextLocationCookie = getCookie(event, 'oauth_next_url');
  const nextLocation = nextLocationCookie ? nextLocationCookie : '/';

  deleteCookie(event, 'oauth_next_url');

  return sendRedirect(event, nextLocation);
}

export function sendRedirectToLoginPage(event: H3Event) {
  return sendRedirect(event, '/login');
}
