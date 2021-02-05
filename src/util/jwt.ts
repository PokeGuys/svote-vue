export default function jwtDecode(token: string): any {
  const payload = token
    .split('.')[1]
    .replace('-', '+')
    .replace('_', '/');
  return JSON.parse(atob(payload));
}
