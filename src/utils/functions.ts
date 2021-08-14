export function getInitials(s: string) {
  const chunks = s.split(/\s+/).map(chunk => chunk[0])
  return chunks.slice(0, Math.min(2, chunks.length)).join('').toUpperCase()
}
