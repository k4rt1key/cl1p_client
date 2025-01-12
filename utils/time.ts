export type TimeUnit = 'hours' | 'days' | 'months'

export const getTimeOptions = (unit: string) => {
  switch (unit) {
    case 'hours':
      return Array.from({ length: 24 }, (_, i) => ({
        value: i + 1,
        label: `${i + 1}`
      }))
    case 'days':
      return Array.from({ length: 31 }, (_, i) => ({
        value: i + 1,
        label: `${i + 1}`
      }))
    case 'months':
      return Array.from({ length: 12 }, (_, i) => ({
        value: i + 1,
        label: `${i + 1}`
      }))
  }
}

export const convertToHours = (value: number, unit: TimeUnit): number => {
  const multipliers = {
    hours: 1,
    days: 24,
    months: 24 * 30
  }
  return value * multipliers[unit]
}
