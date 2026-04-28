import { readFile } from 'fs/promises'
import path from 'path'
import type { Guide } from '@/types'

export async function loadGuide(locale: string, classId: string, specId: string): Promise<Guide | null> {
  try {
    const filePath = path.join(process.cwd(), 'content', 'guides', locale, `${classId}-${specId}.json`)
    const raw = await readFile(filePath, 'utf-8')
    return JSON.parse(raw) as Guide
  } catch {
    return null
  }
}
