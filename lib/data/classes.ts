import type { WowClass } from '@/types'

export const CLASSES: WowClass[] = [
  {
    id: 'death-knight',
    name: 'Death Knight',
    color: '#C41E3A',
    icon: 'classicon_deathknight',
    specs: [
      { id: 'blood', name: 'Blood', role: 'tank', icon: 'spell_deathknight_bloodpresence', wowheadSlug: 'blood-tank' },
      { id: 'frost', name: 'Frost', role: 'melee_dps', icon: 'spell_deathknight_frostpresence', wowheadSlug: 'frost-dps' },
      { id: 'unholy', name: 'Unholy', role: 'melee_dps', icon: 'spell_deathknight_unholypresence', wowheadSlug: 'unholy-dps' },
    ],
  },
  {
    id: 'demon-hunter',
    name: 'Demon Hunter',
    color: '#A330C9',
    icon: 'classicon_demonhunter',
    specs: [
      { id: 'havoc', name: 'Havoc', role: 'melee_dps', icon: 'ability_demonhunter_specdps', wowheadSlug: 'havoc-dps' },
      { id: 'vengeance', name: 'Vengeance', role: 'tank', icon: 'ability_demonhunter_spectank', wowheadSlug: 'vengeance-tank' },
    ],
  },
  {
    id: 'druid',
    name: 'Druid',
    color: '#FF7C0A',
    icon: 'classicon_druid',
    specs: [
      { id: 'balance', name: 'Balance', role: 'ranged_dps', icon: 'spell_nature_starfall', wowheadSlug: 'balance-dps' },
      { id: 'feral', name: 'Feral', role: 'melee_dps', icon: 'ability_druid_catform', wowheadSlug: 'feral-dps' },
      { id: 'guardian', name: 'Guardian', role: 'tank', icon: 'ability_racial_bearform', wowheadSlug: 'guardian-tank' },
      { id: 'restoration', name: 'Restoration', role: 'healer', icon: 'spell_nature_healingtouch', wowheadSlug: 'restoration-healer' },
    ],
  },
  {
    id: 'evoker',
    name: 'Evoker',
    color: '#33937F',
    icon: 'classicon_evoker',
    specs: [
      { id: 'augmentation', name: 'Augmentation', role: 'ranged_dps', icon: 'classicon_evoker_augmentation', wowheadSlug: 'augmentation-dps' },
      { id: 'devastation', name: 'Devastation', role: 'ranged_dps', icon: 'classicon_evoker_devastation', wowheadSlug: 'devastation-dps' },
      { id: 'preservation', name: 'Preservation', role: 'healer', icon: 'classicon_evoker_preservation', wowheadSlug: 'preservation-healer' },
    ],
  },
  {
    id: 'hunter',
    name: 'Hunter',
    color: '#AAD372',
    icon: 'classicon_hunter',
    specs: [
      { id: 'beast-mastery', name: 'Beast Mastery', role: 'ranged_dps', icon: 'ability_hunter_bestialdiscipline', wowheadSlug: 'beast-mastery-dps' },
      { id: 'marksmanship', name: 'Marksmanship', role: 'ranged_dps', icon: 'ability_hunter_focusedaim', wowheadSlug: 'marksmanship-dps' },
      { id: 'survival', name: 'Survival', role: 'melee_dps', icon: 'ability_hunter_camouflage', wowheadSlug: 'survival-dps' },
    ],
  },
  {
    id: 'mage',
    name: 'Mage',
    color: '#3FC7EB',
    icon: 'classicon_mage',
    specs: [
      { id: 'arcane', name: 'Arcane', role: 'ranged_dps', icon: 'spell_holy_magicalsentry', wowheadSlug: 'arcane-dps' },
      { id: 'fire', name: 'Fire', role: 'ranged_dps', icon: 'spell_fire_firebolt02', wowheadSlug: 'fire-dps' },
      { id: 'frost', name: 'Frost', role: 'ranged_dps', icon: 'spell_frost_frostbolt02', wowheadSlug: 'frost-dps' },
    ],
  },
  {
    id: 'monk',
    name: 'Monk',
    color: '#00FF98',
    icon: 'classicon_monk',
    specs: [
      { id: 'brewmaster', name: 'Brewmaster', role: 'tank', icon: 'spell_monk_brewmaster_spec', wowheadSlug: 'brewmaster-tank' },
      { id: 'mistweaver', name: 'Mistweaver', role: 'healer', icon: 'spell_monk_mistweaver_spec', wowheadSlug: 'mistweaver-healer' },
      { id: 'windwalker', name: 'Windwalker', role: 'melee_dps', icon: 'spell_monk_windwalker_spec', wowheadSlug: 'windwalker-dps' },
    ],
  },
  {
    id: 'paladin',
    name: 'Paladin',
    color: '#F48CBA',
    icon: 'classicon_paladin',
    specs: [
      { id: 'holy', name: 'Holy', role: 'healer', icon: 'spell_holy_holybolt', wowheadSlug: 'holy-healer' },
      { id: 'protection', name: 'Protection', role: 'tank', icon: 'ability_paladin_shieldofthetemplar', wowheadSlug: 'protection-tank' },
      { id: 'retribution', name: 'Retribution', role: 'melee_dps', icon: 'spell_holy_auraoflight', wowheadSlug: 'retribution-dps' },
    ],
  },
  {
    id: 'priest',
    name: 'Priest',
    color: '#FFFFFF',
    icon: 'classicon_priest',
    specs: [
      { id: 'discipline', name: 'Discipline', role: 'healer', icon: 'spell_holy_powerwordshield', wowheadSlug: 'discipline-healer' },
      { id: 'holy', name: 'Holy', role: 'healer', icon: 'spell_holy_guardianspirit', wowheadSlug: 'holy-healer' },
      { id: 'shadow', name: 'Shadow', role: 'ranged_dps', icon: 'spell_shadow_shadowwordpain', wowheadSlug: 'shadow-dps' },
    ],
  },
  {
    id: 'rogue',
    name: 'Rogue',
    color: '#FFF468',
    icon: 'classicon_rogue',
    specs: [
      { id: 'assassination', name: 'Assassination', role: 'melee_dps', icon: 'ability_rogue_eviscerate', wowheadSlug: 'assassination-dps' },
      { id: 'outlaw', name: 'Outlaw', role: 'melee_dps', icon: 'ability_rogue_waylay', wowheadSlug: 'outlaw-dps' },
      { id: 'subtlety', name: 'Subtlety', role: 'melee_dps', icon: 'ability_stealth', wowheadSlug: 'subtlety-dps' },
    ],
  },
  {
    id: 'shaman',
    name: 'Shaman',
    color: '#0070DD',
    icon: 'classicon_shaman',
    specs: [
      { id: 'elemental', name: 'Elemental', role: 'ranged_dps', icon: 'spell_nature_lightning', wowheadSlug: 'elemental-dps' },
      { id: 'enhancement', name: 'Enhancement', role: 'melee_dps', icon: 'spell_shaman_improvedstormstrike', wowheadSlug: 'enhancement-dps' },
      { id: 'restoration', name: 'Restoration', role: 'healer', icon: 'spell_nature_magicimmunity', wowheadSlug: 'restoration-healer' },
    ],
  },
  {
    id: 'warlock',
    name: 'Warlock',
    color: '#8788EE',
    icon: 'classicon_warlock',
    specs: [
      { id: 'affliction', name: 'Affliction', role: 'ranged_dps', icon: 'spell_shadow_deathcoil', wowheadSlug: 'affliction-dps' },
      { id: 'demonology', name: 'Demonology', role: 'ranged_dps', icon: 'spell_shadow_metamorphosis', wowheadSlug: 'demonology-dps' },
      { id: 'destruction', name: 'Destruction', role: 'ranged_dps', icon: 'spell_shadow_rainoffire', wowheadSlug: 'destruction-dps' },
    ],
  },
  {
    id: 'warrior',
    name: 'Warrior',
    color: '#C69B3A',
    icon: 'classicon_warrior',
    specs: [
      { id: 'arms', name: 'Arms', role: 'melee_dps', icon: 'ability_warrior_savageblow', wowheadSlug: 'arms-dps' },
      { id: 'fury', name: 'Fury', role: 'melee_dps', icon: 'ability_warrior_innerrage', wowheadSlug: 'fury-dps' },
      { id: 'protection', name: 'Protection', role: 'tank', icon: 'ability_warrior_defensivestance', wowheadSlug: 'protection-tank' },
    ],
  },
]

export function getClass(id: string) {
  return CLASSES.find(c => c.id === id)
}

export function getSpec(classId: string, specId: string) {
  return getClass(classId)?.specs.find(s => s.id === specId)
}

export const WOWHEAD_ICON_CDN = 'https://wow.zamimg.com/images/wow/icons/large'
