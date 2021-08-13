export function getInitials(s: string) {
  const chunks = s.split(/\s+/)
  return chunks.slice(0, Math.min(2, chunks.length)).join('').toUpperCase()
}
