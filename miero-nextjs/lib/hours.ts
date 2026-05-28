export interface OpenStatus {
  isOpen: boolean
  closesAt: string
  opensAt: string
}

export function getOpenStatus(now: Date): OpenStatus {
  const formatter = new Intl.DateTimeFormat('en-US', {
    timeZone: 'America/Los_Angeles',
    weekday: 'short',
    hour: 'numeric',
    minute: 'numeric',
    hour12: false,
  })
  const parts = formatter.formatToParts(now)
  const map = Object.fromEntries(parts.map(p => [p.type, p.value]))
  const dayMap: Record<string, number> = { Sun: 0, Mon: 1, Tue: 2, Wed: 3, Thu: 4, Fri: 5, Sat: 6 }
  const day = dayMap[map.weekday]
  const hour = parseInt(map.hour, 10)
  const minute = parseInt(map.minute, 10)
  const mins = hour * 60 + minute

  const lateNight = day === 5 || day === 6
  const openMin = 7 * 60
  const closeMin = lateNight ? 23 * 60 : 22 * 60
  const closeHour = lateNight ? 11 : 10

  return {
    isOpen: mins >= openMin && mins < closeMin,
    closesAt: closeHour + 'pm',
    opensAt: '7am',
  }
}

export function getTodayAbbrev(now: Date): string {
  return new Intl.DateTimeFormat('en-US', {
    timeZone: 'America/Los_Angeles',
    weekday: 'short',
  }).format(now)
}
