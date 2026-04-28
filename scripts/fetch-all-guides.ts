/**
 * Fetch all guides for all specs in all locales.
 * Respects a 2s delay between requests to avoid hammering Wowhead.
 * Usage: npx tsx scripts/fetch-all-guides.ts [patch]
 */
import { writeFile, mkdir } from 'fs/promises'
import path from 'path'
import { CLASSES } from '../lib/data/classes'
import { buildWowheadUrl, fetchGuideHtml } from '../lib/wowhead/scraper'
import { parseWowheadGuide } from '../lib/wowhead/parser'

const LOCALES = ['en', 'fr']
const DELAY_MS = 2500
const patchVersion = process.argv[2] ?? '11.1'

function sleep(ms: number) {
  return new Promise(resolve => setTimeout(resolve, ms))
}

async function fetchOne(locale: string, classId: string, specId: string, wowheadSlug: string) {
  const url = buildWowheadUrl(locale, classId, wowheadSlug)
  try {
    const html = await fetchGuideHtml(url)
    const guide = parseWowheadGuide(html, {
      specId,
      classId,
      locale,
      patchVersion,
      sourceUrl: url,
    })
    const outDir = path.join(process.cwd(), 'content', 'guides', locale)
    await mkdir(outDir, { recursive: true })
    const outPath = path.join(outDir, `${classId}-${specId}.json`)
    await writeFile(outPath, JSON.stringify(guide, null, 2), 'utf-8')
    return { ok: true, status: guide.status }
  } catch (err) {
    return { ok: false, error: (err as Error).message }
  }
}

async function run() {
  const jobs: Array<{ locale: string; classId: string; specId: string; wowheadSlug: string }> = []
  for (const locale of LOCALES) {
    for (const cls of CLASSES) {
      for (const spec of cls.specs) {
        jobs.push({ locale, classId: cls.id, specId: spec.id, wowheadSlug: spec.wowheadSlug })
      }
    }
  }

  console.log(`Fetching ${jobs.length} guides (${LOCALES.length} locales × ${jobs.length / LOCALES.length} specs)`)
  console.log(`Estimated time: ~${Math.ceil((jobs.length * DELAY_MS) / 60000)} minutes\n`)

  let ok = 0
  let partial = 0
  let failed = 0

  for (const [i, job] of jobs.entries()) {
    process.stdout.write(
      `[${i + 1}/${jobs.length}] ${job.locale} · ${job.classId}/${job.specId} ... `
    )
    const result = await fetchOne(job.locale, job.classId, job.specId, job.wowheadSlug)
    if (result.ok) {
      console.log(`✓ (${result.status})`)
      result.status === 'complete' ? ok++ : partial++
    } else {
      console.log(`✗ ${result.error}`)
      failed++
    }
    if (i < jobs.length - 1) await sleep(DELAY_MS)
  }

  console.log(`\nDone: ${ok} complete, ${partial} partial, ${failed} failed`)
}

run().catch(err => {
  console.error(err)
  process.exit(1)
})
