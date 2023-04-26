export function resetCookie() {
  document.cookie = "token=;expires=Thu, 01 Jan 1970 00:00:01 GMT;";
  resetStudentCookie();
}
export function resetStudentCookie() {
  document.cookie = "student-token=;expires=Thu, 01 Jan 1970 00:00:01 GMT;";
}
