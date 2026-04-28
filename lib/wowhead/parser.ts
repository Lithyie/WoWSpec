// @ts-nocheck — cheerio v1 internal types are complex; typed at call boundaries
import * as cheerio from 'cheerio'
import type { Guide, RotationItem, GearItem } from '@/types'

type CheerioRoot = ReturnType<typeof cheerio.load>
type CheerioSel = ReturnType<CheerioRoot>

// ─── Section extraction helpers ─────────────────────────────────────────────

function findSectionContent($: CheerioRoot, ...ids: string[]): CheerioSel | null {
  for (const id of ids) {
    const heading = $(`#${id}, [id="${id}"]`).first()
    if (heading.length) return heading
  }
  return null
}

function getListItems($: CheerioRoot, heading: CheerioSel): string[] {
  const items: string[] = []
  let el = heading.next()
  while (el.length && !el.is('h1, h2, h3, h4')) {
    el.find('li').each((_, li) => {
      const text = $(li).text().trim()
      if (text) items.push(text)
    })
    if (el.is('p, div') && !el.find('li').length) {
      const text = el.text().trim()
      if (text && text.length < 300) items.push(text)
    }
    el = el.next()
  }
  return items
}

function getSectionText($: CheerioRoot, heading: CheerioSel): string {
  const parts: string[] = []
  let el = heading.next()
  while (el.length && !el.is('h1, h2, h3, h4')) {
    const text = el.text().trim()
    if (text) parts.push(text)
    el = el.next()
  }
  return parts.join(' ').slice(0, 800)
}

// ─── Specific section parsers ────────────────────────────────────────────────

function extractSummary($: CheerioRoot): string {
  const intro = findSectionContent($, 'introduction', 'overview', 'intro')
  if (intro) return getSectionText($, intro).slice(0, 400)
  return $('.guide-body p, .guide-content p, article p').first().text().trim().slice(0, 400)
}

function extractStrengths($: CheerioRoot): string[] {
  const heading = findSectionContent($, 'strengths-and-weaknesses', 'strengths-weaknesses')
  if (!heading) {
    const items: string[] = []
    $('.guide-checklist li, .checklist-positive li').each((_, el) => {
      const text = $(el).text().trim()
      if (text) items.push(text)
    })
    return items
  }
  const items: string[] = []
  let el = heading.next()
  while (el.length && !el.is('h1, h2, h3')) {
    if (el.is('ul')) {
      el.find('li').each((_, li) => items.push($(li).text().trim()))
      break
    }
    el = el.next()
  }
  return items.filter(Boolean)
}

function extractWeaknesses($: CheerioRoot): string[] {
  const heading = findSectionContent($, 'strengths-and-weaknesses', 'strengths-weaknesses')
  if (!heading) {
    const items: string[] = []
    $('.guide-checklist-negative li, .checklist-negative li').each((_, el) => {
      const text = $(el).text().trim()
      if (text) items.push(text)
    })
    return items
  }
  const items: string[] = []
  let el = heading.next()
  let ulCount = 0
  while (el.length && !el.is('h1, h2, h3')) {
    if (el.is('ul')) {
      ulCount++
      if (ulCount === 2) {
        el.find('li').each((_, li) => items.push($(li).text().trim()))
        break
      }
    }
    el = el.next()
  }
  return items.filter(Boolean)
}

function extractStatPriority($: CheerioRoot): string[] {
  const heading = findSectionContent($, 'stat-priority', 'stats', 'stat-priorities')
  if (!heading) return []
  const stats: string[] = []
  let el = heading.next()
  while (el.length && !el.is('h1, h2, h3')) {
    el.find('li').each((_, li) => {
      const raw = $(li).text().replace(/[\d>≥≤=]/g, '').trim()
      if (raw && raw.length > 1 && raw.length < 60) stats.push(raw)
    })
    el = el.next()
    if (stats.length >= 8) break
  }
  return stats.slice(0, 8)
}

function extractTalentString($: CheerioRoot): string | undefined {
  let found: string | undefined
  $('code, .talent-string, [class*="talent"]').each((_, el) => {
    if (found) return
    const text = $(el).text().trim()
    if (text.length > 40 && /^[A-Za-z0-9+/=]{40,}$/.test(text)) {
      found = text
    }
  })
  return found
}

function extractRotationItems($: CheerioRoot, heading: CheerioSel): RotationItem[] {
  const items: RotationItem[] = []
  let el = heading.next()
  while (el.length && !el.is('h1, h2, h3, h4')) {
    el.find('li').each((_, li) => {
      const text = $(li).text().trim()
      if (!text) return
      const conditionMatch = text.match(/\(([^)]{10,})\)$/) ?? text.match(/(?:if|when|while)\s+(.+)$/i)
      const spell = text.replace(/\(.*\)$/, '').replace(/(?:if|when|while)\s+.+$/i, '').trim()
      items.push({ spell: spell || text, condition: conditionMatch?.[1] })
    })
    el = el.next()
    if (items.length >= 15) break
  }
  return items
}

function extractRotation($: CheerioRoot) {
  const openerHeading = findSectionContent($, 'opener', 'opening-sequence', 'pull-rotation')
  const priorityHeading = findSectionContent($, 'priority-list', 'rotation', 'priority', 'dps-rotation')
  const cdHeading = findSectionContent($, 'cooldowns', 'major-cooldowns', 'offensive-cooldowns')
  return {
    opener: openerHeading ? extractRotationItems($, openerHeading) : [],
    priority: priorityHeading ? extractRotationItems($, priorityHeading) : [],
    cooldowns: cdHeading ? extractRotationItems($, cdHeading) : [],
  }
}

function extractBIS($: CheerioRoot): GearItem[] {
  const items: GearItem[] = []
  const bisHeading = findSectionContent($, 'best-in-slot', 'bis', 'gear', 'best-in-slot-list')
  if (!bisHeading) return items
  let el = bisHeading.next()
  while (el.length && !el.is('h1, h2, h3')) {
    if (el.is('table')) {
      el.find('tr').slice(1).each((_, row) => {
        const cells = $(row).find('td')
        if (cells.length >= 2) {
          items.push({
            slot: $(cells[0]).text().trim(),
            item: $(cells[1]).text().trim(),
            source: cells.length >= 3 ? $(cells[2]).text().trim() : '',
          })
        }
      })
      break
    }
    el = el.next()
  }
  return items.filter(i => i.slot && i.item)
}

function extractTips($: CheerioRoot): string[] {
  const heading = findSectionContent($, 'tips-and-tricks', 'tips', 'advanced-tips')
  if (!heading) return []
  return getListItems($, heading).slice(0, 12)
}

// ─── Main parser ─────────────────────────────────────────────────────────────

export function parseWowheadGuide(
  html: string,
  meta: { specId: string; classId: string; locale: string; patchVersion: string; sourceUrl: string }
): Guide {
  const $ = cheerio.load(html)
  $('nav, header, footer, .ad, .advertisement, script, style').remove()

  const rotation = extractRotation($)
  const strengths = extractStrengths($)
  const weaknesses = extractWeaknesses($)
  const statPriority = extractStatPriority($)
  const bisList = extractBIS($)
  const tips = extractTips($)
  const talentString = extractTalentString($)

  const hasContent =
    rotation.priority.length > 0 || statPriority.length > 0 || bisList.length > 0

  return {
    specId: meta.specId,
    classId: meta.classId,
    locale: meta.locale as 'en' | 'fr',
    fetchedAt: new Date().toISOString(),
    patchVersion: meta.patchVersion,
    sourceUrl: meta.sourceUrl,
    status: hasContent ? 'complete' : 'partial',
    summary: extractSummary($),
    strengths,
    weaknesses,
    statPriority,
    talentString,
    rotation,
    gear: { bisList },
    tips,
  }
}
