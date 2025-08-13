export default defineNuxtPlugin((nuxtApp) => {
  const { locale } = nuxtApp.$i18n

  function getMonthName(date, loc = locale.value, length = 'short') {
    return new Intl.DateTimeFormat(loc, {
      month: length,
      ...(loc === 'ar' && { numberingSystem: 'latn' })
    }).format(date)
  }

  function getWeekdayName(date, loc = locale.value, length = 'long') {
    return new Intl.DateTimeFormat(loc, {
      weekday: length,
      ...(loc === 'ar' && { numberingSystem: 'latn' })
    }).format(date)
  }

  // Ordinal helper: 1 → “1st”, 2 → “2nd”, etc.
  function ordinal(n) {
    const s = ['th', 'st', 'nd', 'rd']
    const v = n % 100
    return n + (s[(v - 20) % 10] || s[v] || s[0])
  }

  function formatDate(dateInput, format = 'YYYY-MM-DD HH:mm:ss') {
    // 1) ensure Date
    const date =
      dateInput instanceof Date ? dateInput : new Date(String(dateInput).replace(/\.\d+Z$/, 'Z'))
    if (isNaN(date)) return ''

    // 2) pull all parts
    const year = date.getFullYear()
    const monthN = date.getMonth() + 1
    const day = date.getDate()
    const hour24 = date.getHours()
    const hour12 = hour24 % 12 || 12
    const minute = date.getMinutes()
    const second = date.getSeconds()
    const ms = date.getMilliseconds()

    // locale helpers
    const loc = typeof locale?.value === 'string' ? locale.value : 'en'
    const isAr = loc?.toLowerCase().startsWith('ar')

    const meridiem = (h, lower = false) => {
      if (isAr) return 'صم'.charAt(h < 12 ? 0 : 1) // "ص" / "م"
      return lower ? (h < 12 ? 'am' : 'pm') : h < 12 ? 'AM' : 'PM'
    }

    // base token regex (used to expand preset patterns)
    const BASE_TOKEN_RE = /Do|YYYY|YY|MMMM|MMM|MM|M|DD|D|dddd|ddd|dd|HH|H|hh|h|mm|m|ss|s|SSS|A|a/g

    // 3) build token map (base)
    const tokens = {
      YYYY: String(year),
      YY: String(year).slice(-2),

      MMMM: getMonthName(date, loc, 'long'),
      MMM: getMonthName(date, loc, 'short'),
      MM: String(monthN).padStart(2, '0'),
      M: String(monthN),

      DD: String(day).padStart(2, '0'),
      D: String(day),

      dddd: getWeekdayName(date, loc, 'long'),
      ddd: getWeekdayName(date, loc, 'short'),
      dd: getWeekdayName(date, loc, 'narrow'),

      HH: String(hour24).padStart(2, '0'),
      H: String(hour24),

      hh: String(hour12).padStart(2, '0'),
      h: String(hour12),

      mm: String(minute).padStart(2, '0'),
      m: String(minute),

      ss: String(second).padStart(2, '0'),
      s: String(second),

      SSS: String(ms).padStart(3, '0'),

      A: meridiem(hour24, false),
      a: meridiem(hour24, true),

      Do: ordinal(day)
    }

    // 3.1) Moment-like preset patterns per locale
    const presets = isAr
      ? {
          LT: 'h:mm a',
          LTS: 'h:mm:ss a',
          L: 'DD/MM/YYYY',
          l: 'D/M/YYYY',
          LL: 'D MMMM YYYY',
          ll: 'D MMM YYYY',
          LLL: 'D MMMM YYYY h:mm a',
          lll: 'D MMM YYYY h:mm a',
          LLLL: 'dddd، D MMMM YYYY h:mm a',
          llll: 'ddd، D MMM YYYY h:mm a'
        }
      : {
          LT: 'h:mm A',
          LTS: 'h:mm:ss A',
          L: 'MM/DD/YYYY',
          l: 'M/D/YYYY',
          LL: 'MMMM D, YYYY',
          ll: 'MMM D, YYYY',
          LLL: 'MMMM D, YYYY h:mm A',
          lll: 'MMM D, YYYY h:mm A',
          LLLL: 'dddd, MMMM D, YYYY h:mm A',
          llll: 'ddd, MMM D, YYYY h:mm A'
        }

    // 3.2) expand presets into final strings using base tokens
    for (const [k, pattern] of Object.entries(presets)) {
      tokens[k] = pattern.replace(BASE_TOKEN_RE, (m) => tokens[m] ?? m)
    }

    // 4) replace (build a regex with longest-first order to avoid partial matches)
    const ALL_TOKENS = [
      // presets first (longest → shortest)
      'LLLL',
      'llll',
      'LLL',
      'lll',
      'LL',
      'll',
      'LTS',
      'LT',
      'L',
      'l',
      // base tokens
      'Do',
      'YYYY',
      'YY',
      'MMMM',
      'MMM',
      'MM',
      'M',
      'DD',
      'D',
      'dddd',
      'ddd',
      'dd',
      'HH',
      'H',
      'hh',
      'h',
      'mm',
      'm',
      'ss',
      's',
      'SSS',
      'A',
      'a'
    ]
    const TOKEN_RE = new RegExp(ALL_TOKENS.join('|'), 'g')

    return format.replace(TOKEN_RE, (matched) => tokens[matched] ?? matched)
  }

  nuxtApp.vueApp.config.globalProperties.$fd = formatDate
  nuxtApp.provide('fd', formatDate)
})

/*
Example Usage of $fd (Date Formatting Helper)

Assuming:
  const sampleDate = '2025-04-24T15:07:05.123Z'

Year Tokens:
  $fd(sampleDate, 'YYYY')   // → "2025"
  $fd(sampleDate, 'YY')     // → "25"

Month Tokens:
  $fd(sampleDate, 'MMMM')   // → "April"   (en) / "أبريل" (ar)
  $fd(sampleDate, 'MMM')    // → "Apr"     (en) / "أبريل" (ar)
  $fd(sampleDate, 'MM')     // → "04"
  $fd(sampleDate, 'M')      // → "4"

Day Tokens:
  $fd(sampleDate, 'DD')     // → "24"
  $fd(sampleDate, 'D')      // → "24"
  $fd(sampleDate, 'Do')     // → "24th"    (en) / "24th" (ar; ordinal suffix remains in English)

Weekday Tokens:
  $fd(sampleDate, 'dddd')   // → "Thursday" (en) / "الخميس" (ar)
  $fd(sampleDate, 'ddd')    // → "Thu"      (en) / "الخ"   (ar)
  $fd(sampleDate, 'dd')     // → "Th"       (en) / "خ"     (ar)

Hour Tokens:
  $fd(sampleDate, 'HH')     // → "15"
  $fd(sampleDate, 'H')      // → "15"
  $fd(sampleDate, 'hh')     // → "03"
  $fd(sampleDate, 'h')      // → "3"

Minute and Second Tokens:
  $fd(sampleDate, 'mm')     // → "07"
  $fd(sampleDate, 'm')      // → "7"
  $fd(sampleDate, 'ss')     // → "05"
  $fd(sampleDate, 's')      // → "5"

Millisecond Token:
  $fd(sampleDate, 'SSS')    // → "123"

Meridiem Tokens:
  $fd(sampleDate, 'A')      // → "PM"
  $fd(sampleDate, 'a')      // → "pm"

Composite Formats:
  $fd(sampleDate, 'MM/DD/YYYY')             // → "04/24/2025"
  $fd(sampleDate, 'DD MMM YYYY')            // → "24 Apr 2025"
  $fd(sampleDate, 'dddd, Do MMMM YYYY')     // → "Thursday, 24th April 2025"
  $fd(sampleDate, 'YYYY-MM-DD HH:mm:ss')    // → "2025-04-24 15:07:05"


  $fd(new Date(), 'LT')       // → "4:43 PM"  (en)
  $fd(new Date(), 'h:mm A')   // → "4:43 PM"  (en)
  $fd(new Date(), 'LTS')      // → "4:43:07 PM"
  $fd(new Date(), 'LLL')      // → "August 13, 2025 4:43 PM"
  
Note:
- The function automatically uses the current locale from nuxt-i18n.
- For Arabic (`ar`) locale, month and weekday names are localized, but ordinal suffixes like 'th' remain in English by default.
- To fully localize ordinal suffixes, consider extending the `ordinal()` function with locale-specific logic.
*/
