export function getCookie(cookieName: string) {
  const cookies = document.cookie.split(";");
  const cookieObj: { [property: string]: string } = {};

  cookies.forEach((cookie) => {
    const [name, value] = cookie.trim().split("=");
    cookieObj[name] = value;
  });

  return cookieObj[cookieName];
}
