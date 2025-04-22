export default function getExpirationTime(token) {
  if (!token) {
    return null; 
  }

  try {
    const [, payloadBase64] = token.split(".");
    const payload = JSON.parse(atob(payloadBase64));
    const expirationTimeInSeconds = payload.exp;
    const expirationTimeInMilliseconds = expirationTimeInSeconds * 1000;
    return expirationTimeInMilliseconds;
  } catch (error) {
    return null;
  }
}
