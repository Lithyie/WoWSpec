export type Role = 'tank' | 'healer' | 'melee_dps' | 'ranged_dps'
export type Locale = 'en' | 'fr'
export type GuideStatus = 'complete' | 'partial' | 'missing'

export interface WowSpec {
  id: string
  name: string
  role: Role
  icon: string
  wowheadSlug: string
}

export interface WowClass {
  id: string
  name: string
  color: string
  icon: string
  specs: WowSpec[]
}

export interface RotationItem {
  spell: string
  icon?: string
  condition?: string
}

export interface GearItem {
  slot: string
  item: string
  source: string
  icon?: string
}

export interface Guide {
  specId: string
  classId: string
  locale: Locale
  fetchedAt: string
  patchVersion: string
  sourceUrl: string
  status: GuideStatus
  summary: string
  strengths: string[]
  weaknesses: string[]
  statPriority: string[]
  talentString?: string
  talentNotes?: string
  rotation: {
    opener: RotationItem[]
    priority: RotationItem[]
    cooldowns: RotationItem[]
  }
  gear: {
    tierSetBonus?: string
    bisList: GearItem[]
  }
  tips: string[]
}
