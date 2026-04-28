import axios from 'axios'

// Cloudflare-bypass headers — mimic a real Chrome 124 browser session
const HEADERS = {
  'User-Agent':
    'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/124.0.0.0 Safari/537.36',
  Accept:
    'text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/apng,*/*;q=0.8',
  'Accept-Language': 'en-US,en;q=0.9',
  'Accept-Encoding': 'gzip, deflate, br',
  'Cache-Control': 'no-cache',
  Pragma: 'no-cache',
  'Sec-Ch-Ua': '"Chromium";v="124", "Google Chrome";v="124", "Not-A.Brand";v="99"',
  'Sec-Ch-Ua-Mobile': '?0',
  'Sec-Ch-Ua-Platform': '"Windows"',
  'Sec-Fetch-Dest': 'document',
  'Sec-Fetch-Mode': 'navigate',
  'Sec-Fetch-Site': 'none',
  'Sec-Fetch-User': '?1',
  'Upgrade-Insecure-Requests': '1',
  Referer: 'https://www.wowhead.com/',
  Connection: 'keep-alive',
}

export function buildWowheadUrl(
  locale: string,
  classSlug: string,
  wowheadSpecSlug: string
): string {
  const base = locale === 'fr' ? 'https://fr.wowhead.com' : 'https://www.wowhead.com'
  return `${base}/guide/classes/${classSlug}/${wowheadSpecSlug}-overview`
}

async function sleep(ms: number) {
  return new Promise(r => setTimeout(r, ms))
}

export async function fetchGuideHtml(url: string, retries = 3): Promise<string> {
  for (let attempt = 1; attempt <= retries; attempt++) {
    try {
      const response = await axios.get<string>(url, {
        headers: HEADERS,
        responseType: 'text',
        timeout: 20000,
        maxRedirects: 5,
      })
      return response.data
    } catch (err) {
      const status = (err as { response?: { status: number } }).response?.status
      if (status === 403 || status === 429) {
        if (attempt < retries) {
          // Exponential backoff: 3s, 9s, 27s
          const delay = 3000 * Math.pow(3, attempt - 1)
          console.warn(`  ↳ Status ${status}, retrying in ${delay / 1000}s… (attempt ${attempt}/${retries})`)
          await sleep(delay)
          continue
        }
        throw new Error(
          `Wowhead returned ${status}. ` +
          `Cloudflare protection is active. ` +
          `Try fetching in a browser and saving the HTML manually, ` +
          `or install Playwright: npm i -D playwright @playwright/test && npx playwright install chromium`
        )
      }
      throw err
    }
  }
  throw new Error('Max retries exceeded')
}
