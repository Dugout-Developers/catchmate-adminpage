export function formatDate(dateString) {
  const date = new Date(dateString); // 문자열을 Date 객체로 변환
  return date.toISOString().split('T')[0].replace(/-/g, '.');
}
