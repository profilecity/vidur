
import crypto from 'uncrypto';
/*
 * Source: https://docs.cotter.app/sdk-reference/api-for-other-mobile-apps/api-for-mobile-apps
 */

function dec2hex(dec: any) {
  return ('0' + dec.toString(16)).substr(-2)
}

export function generateRandomString() {
  const array = new Uint32Array(56 / 2);
  crypto.getRandomValues(array);
  return Array.from(array, dec2hex).join('');
}

function sha256(plain: any) {
  const encoder = new TextEncoder();
  const data = encoder.encode(plain);
  return crypto.subtle.digest('SHA-256', data);
}

function base64urlencode(a: any) {
  let str = "";
  const bytes = new Uint8Array(a);
  const len = bytes.byteLength;
  for (let i = 0; i < len; i++) {
    str += String.fromCharCode(bytes[i]);
  }
  return btoa(str)
    .replace(/\+/g, "-")
    .replace(/\//g, "_")
    .replace(/=+$/, "");
}

export async function getChallengeFromVerifier(v: any) {
  return base64urlencode(await sha256(v));
}