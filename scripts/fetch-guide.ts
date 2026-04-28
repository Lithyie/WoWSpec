/**
 * Fetch and cache a single guide from Wowhead.
 * Usage: npx tsx scripts/fetch-guide.ts <class-id> <spec-id> [locale] [patch]
 * Example: npx tsx scripts/fetch-guide.ts paladin retribution en 11.1
 */
import { writeFile, mkdir } from 'fs/promises'
import path from 'path'
import { CLASSES } from '../lib/data/classes'
import { buildWowheadUrl, fetchGuideHtml } from '../lib/wowhead/scraper'
import { parseWowheadGuide } from '../lib/wowhead/parser'

const [, , classArg, specArg, localeArg = 'en', patchArg = '11.1'] = process.argv

if (!classArg || !specArg) {
  console.error('Usage: npx tsx scripts/fetch-guide.ts <class-id> <spec-id> [locale] [patch]')
  console.error('Example: npx tsx scripts/fetch-guide.ts paladin retribution en 11.1')
  process.exit(1)
}

async function run() {
  const cls = CLASSES.find(c => c.id === classArg)
  if (!cls) {
    console.error(`Unknown class: ${classArg}`)
    console.error(`Available: ${CLASSES.map(c => c.id).join(', ')}`)
    process.exit(1)
  }

  const spec = cls.specs.find(s => s.id === specArg)
  if (!spec) {
    console.error(`Unknown spec: ${specArg} for class ${classArg}`)
    console.error(`Available: ${cls.specs.map(s => s.id).join(', ')}`)
    process.exit(1)
  }

  const url = buildWowheadUrl(localeArg, classArg, spec.wowheadSlug)
  console.log(`Fetching: ${url}`)

  const html = await fetchGuideHtml(url)
  const guide = parseWowheadGuide(html, {
    specId: specArg,
    classId: classArg,
    locale: localeArg,
    patchVersion: patchArg,
    sourceUrl: url,
  })

  const outDir = path.join(process.cwd(), 'content', 'guides', localeArg)
  await mkdir(outDir, { recursive: true })

  const outPath = path.join(outDir, `${classArg}-${specArg}.json`)
  await writeFile(outPath, JSON.stringify(guide, null, 2), 'utf-8')

  console.log(`✓ Saved: ${outPath}`)
  console.log(`  Status: ${guide.status}`)
  console.log(`  Stats: ${guide.statPriority.length} items`)
  console.log(`  Rotation priority: ${guide.rotation.priority.length} items`)
  console.log(`  Rotation opener: ${guide.rotation.opener.length} items`)
  console.log(`  BIS items: ${guide.gear.bisList.length}`)
  console.log(`  Tips: ${guide.tips.length}`)
  console.log(`  Strengths: ${guide.strengths.length}`)
}

run().catch(err => {
  console.error('Error:', err.message)
  process.exit(1)
})
