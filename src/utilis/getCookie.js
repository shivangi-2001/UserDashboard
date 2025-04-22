export function getCookie(name) {
    const cookies = document.cookie.split("; ");
    const cookie = cookies.find(c => c.startsWith(name + "="));
    return cookie ? decodeURIComponent(cookie.split("=")[1]) : null;
}
