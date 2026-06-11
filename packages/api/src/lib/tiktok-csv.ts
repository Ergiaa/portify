export type TikTokDailyRow = {
  date: string // ISO "YYYY-MM-DD"
  videoViews: number
  profileViews: number
  netFollowers: number
  likes: number
  comments: number
  shares: number
}

export type CsvParseResult = {
  rows: TikTokDailyRow[]
  detectedMetrics: Array<keyof Omit<TikTokDailyRow, "date">>
  unknownColumns: string[]
  errors: string[]
  yearInferred: boolean
  /** The year assigned to the first date row (only set when yearInferred=true). */
  detectedStartYear: number | null
}

const COLUMN_MAP: Record<string, keyof TikTokDailyRow> = {
  "date": "date",
  "day": "date",
  "video views": "videoViews",
  "video view": "videoViews",
  "views": "videoViews",
  "total play": "videoViews",
  "play count": "videoViews",
  "profile views": "profileViews",
  "profile view": "profileViews",
  "profile visits": "profileViews",
  "net followers": "netFollowers",
  "new followers": "netFollowers",
  "followers gained": "netFollowers",
  "follower change": "netFollowers",
  "followers": "netFollowers",
  "likes": "likes",
  "total likes": "likes",
  "like count": "likes",
  "comments": "comments",
  "total comments": "comments",
  "comment count": "comments",
  "shares": "shares",
  "total shares": "shares",
  "share count": "shares",
}

function parseLine(line: string): string[] {
  const result: string[] = []
  let current = ""
  let inQuotes = false
  for (let i = 0; i < line.length; i++) {
    const ch = line[i]!
    if (ch === '"') {
      if (inQuotes && line[i + 1] === '"') { current += '"'; i++ }
      else inQuotes = !inQuotes
    } else if (ch === ',' && !inQuotes) {
      result.push(current.trim())
      current = ""
    } else {
      current += ch
    }
  }
  result.push(current.trim())
  return result
}

const MONTH_MAP: Record<string, number> = {
  january: 1, jan: 1,
  february: 2, feb: 2,
  march: 3, mar: 3,
  april: 4, apr: 4,
  may: 5,
  june: 6, jun: 6,
  july: 7, jul: 7,
  august: 8, aug: 8,
  september: 9, sep: 9, sept: 9,
  october: 10, oct: 10,
  november: 11, nov: 11,
  december: 12, dec: 12,
}

// Parses "June 4", "Jun 4", "June 4," etc. — returns null if not this format.
function parseMonthDayOnly(raw: string): { month: number; day: number } | null {
  const s = raw.trim().toLowerCase().replace(/[,.]/g, "")
  const parts = s.split(/\s+/)
  if (parts.length >= 2) {
    const month = MONTH_MAP[parts[0]!]
    const day = parseInt(parts[1]!, 10)
    if (month && !isNaN(day) && day >= 1 && day <= 31) return { month, day }
  }
  return null
}

function parseDate(raw: string): string | null {
  const s = raw.trim()
  if (/^\d{4}-\d{2}-\d{2}$/.test(s)) return s
  const mdy = s.match(/^(\d{1,2})\/(\d{1,2})\/(\d{4})$/)
  if (mdy) return `${mdy[3]}-${mdy[1]!.padStart(2, "0")}-${mdy[2]!.padStart(2, "0")}`
  // Only fall back to native parsing when the string contains an explicit 4-digit year.
  // Strings like "June 4" must not match here — browsers parse them inconsistently
  // and produce wrong years or UTC-shifted dates.
  if (!/\d{4}/.test(s)) return null
  const d = new Date(s)
  if (isNaN(d.getTime())) return null
  // Use UTC parts to avoid timezone-shift bugs
  return `${d.getUTCFullYear()}-${String(d.getUTCMonth() + 1).padStart(2, "0")}-${String(d.getUTCDate()).padStart(2, "0")}`
}

// Data is in ascending date order (oldest first). Walks the sequence and
// increments year whenever the month wraps backward (Dec → Jan).
function inferYearsForMonthDaySequence(
  monthDays: { month: number; day: number }[],
  startYear: number,
): number[] {
  let year = startYear
  const years: number[] = [year]

  for (let i = 1; i < monthDays.length; i++) {
    const prev = monthDays[i - 1]!
    const curr = monthDays[i]!
    if (curr.month < prev.month) year++ // ascending data: Dec→Jan means next calendar year
    years.push(year)
  }

  return years
}

// Counts how many Dec→Jan rollovers exist in a month-day sequence.
function countRollovers(monthDays: { month: number; day: number }[]): number {
  let n = 0
  for (let i = 1; i < monthDays.length; i++) {
    if (monthDays[i]!.month < monthDays[i - 1]!.month) n++
  }
  return n
}

// Auto-detects the best starting year so the last date in the sequence
// is the most recent plausible date that is not in the future.
function autoDetectStartYear(
  monthDays: { month: number; day: number }[],
  today: Date,
): number {
  const rollovers = countRollovers(monthDays)
  // With N rollovers, the last date lands (today.year - startYear + rollovers) years after start.
  // We want the last date ≤ today, so start = today.year - rollovers.
  let startYear = today.getFullYear() - rollovers

  // Verify: compute the actual last date and shift back if still in the future.
  const years = inferYearsForMonthDaySequence(monthDays, startYear)
  const last = monthDays[monthDays.length - 1]!
  const lastYear = years[years.length - 1]!
  const lastDate = new Date(lastYear, last.month - 1, last.day)
  if (lastDate > today) startYear--

  return startYear
}

// Returns a map from raw date string → ISO date string, plus metadata.
function buildDateMap(
  rawDates: string[],
  startYear: number,
): { map: Map<string, string>; yearInferred: boolean; detectedStartYear: number | null } {
  const map = new Map<string, string>()

  // Try standard parsing first (dates that already contain a year)
  const standard = rawDates.map(d => parseDate(d))
  if (standard.every(d => d !== null)) {
    rawDates.forEach((raw, i) => map.set(raw, standard[i]!))
    return { map, yearInferred: false, detectedStartYear: null }
  }

  // Fall back to month-day-only parsing with year inference
  const monthDays = rawDates.map(d => parseMonthDayOnly(d))
  const allParsed = monthDays.every((d): d is { month: number; day: number } => d !== null)
  if (allParsed) {
    const validMonthDays = monthDays as { month: number; day: number }[]
    const years = inferYearsForMonthDaySequence(validMonthDays, startYear)
    rawDates.forEach((raw, i) => {
      const md = validMonthDays[i]!
      const y = years[i]!
      map.set(raw, `${y}-${String(md.month).padStart(2, "0")}-${String(md.day).padStart(2, "0")}`)
    })
    return { map, yearInferred: true, detectedStartYear: startYear }
  }

  return { map, yearInferred: false, detectedStartYear: null }
}

export type CsvParseOptions = {
  /** Override the year assigned to the first date row when dates have no year (e.g. "June 4").
   *  When omitted the parser auto-detects the best year so the last date is not in the future. */
  startYear?: number
}

export function parseTikTokCsv(text: string, { startYear }: CsvParseOptions = {}): CsvParseResult {
  const lines = text.replace(/\r\n/g, "\n").replace(/\r/g, "\n").split("\n").filter(l => l.trim())

  if (lines.length < 2) return { rows: [], detectedMetrics: [], unknownColumns: [], errors: ["File has no data rows"], yearInferred: false, detectedStartYear: null }

  // TikTok sometimes prepends 1-2 metadata lines before the actual header — find the real header
  let headerIdx = 0
  for (let i = 0; i < Math.min(5, lines.length); i++) {
    const lower = lines[i]!.toLowerCase()
    if (lower.includes("date") || lower.includes("views") || lower.includes("followers")) {
      headerIdx = i
      break
    }
  }

  const headers = parseLine(lines[headerIdx]!).map(h =>
    h.toLowerCase().replace(/[^a-z ]/g, "").trim()
  )

  const fieldMap: Record<number, keyof TikTokDailyRow> = {}
  const unknownColumns: string[] = []

  for (let i = 0; i < headers.length; i++) {
    const h = headers[i]!
    const mapped = COLUMN_MAP[h]
    if (mapped) fieldMap[i] = mapped
    else if (h) unknownColumns.push(h)
  }

  const dateColIdx = Object.entries(fieldMap).find(([, v]) => v === "date")?.[0]

  // First pass: collect raw date strings in sequence order for year inference
  const dataLines: number[] = []
  for (let i = headerIdx + 1; i < lines.length; i++) {
    const cells = parseLine(lines[i]!)
    if (cells.every(c => !c)) continue
    dataLines.push(i)
  }

  const rawDatesInOrder: string[] = dataLines.map(i => {
    const cells = parseLine(lines[i]!)
    return dateColIdx !== undefined ? (cells[Number(dateColIdx)] ?? "") : ""
  })

  // If no startYear was explicitly provided, auto-detect from the sequence.
  const today = new Date()
  let effectiveStartYear: number
  if (startYear !== undefined) {
    effectiveStartYear = startYear
  } else {
    const monthDays = rawDatesInOrder.map(d => parseMonthDayOnly(d))
    const allMonthDay = monthDays.every((d): d is { month: number; day: number } => d !== null)
    effectiveStartYear = allMonthDay
      ? autoDetectStartYear(monthDays as { month: number; day: number }[], today)
      : today.getFullYear()
  }

  const { map: dateMap, yearInferred, detectedStartYear } = buildDateMap(rawDatesInOrder, effectiveStartYear)

  const rows: TikTokDailyRow[] = []
  const errors: string[] = []

  dataLines.forEach((lineIdx, seqIdx) => {
    const cells = parseLine(lines[lineIdx]!)
    const rawDate = rawDatesInOrder[seqIdx] ?? ""
    const resolvedDate = dateMap.get(rawDate)

    if (!resolvedDate) {
      errors.push(`Row ${lineIdx + 1}: unrecognised date "${rawDate}"`)
      return
    }

    const partial: Partial<TikTokDailyRow> = { date: resolvedDate }

    for (const [idxStr, field] of Object.entries(fieldMap)) {
      if (field === "date") continue
      const raw = cells[Number(idxStr)] ?? ""
      partial[field] = Number(raw.replace(/,/g, "")) || 0
    }

    rows.push({
      date: partial.date!,
      videoViews: partial.videoViews ?? 0,
      profileViews: partial.profileViews ?? 0,
      netFollowers: partial.netFollowers ?? 0,
      likes: partial.likes ?? 0,
      comments: partial.comments ?? 0,
      shares: partial.shares ?? 0,
    })
  })

  const detectedMetrics = [
    ...new Set(
      Object.values(fieldMap).filter((f): f is keyof Omit<TikTokDailyRow, "date"> => f !== "date")
    ),
  ]

  return { rows, detectedMetrics, unknownColumns, errors, yearInferred, detectedStartYear }
}
