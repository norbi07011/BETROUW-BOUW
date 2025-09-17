import type { Profession } from '../types';

// This data structure maps a profession key (which is also a translation key)
// to a list of tool keys. Each tool key corresponds to a translation string
// in the translations.ts file.
export const toolData: Record<Profession, string[]> = {
  window_fitter: [
    'tool_drill',
    'tool_level',
    'tool_crowbar',
    'tool_caulking_gun',
    'tool_screwdrivers',
    'tool_foam_gun',
    'tool_glass_sucker',
  ],
  carpenter: [
    'tool_hammer',
    'tool_saw_hand',
    'tool_saw_circular',
    'tool_drill',
    'tool_measure_tape',
    'tool_level',
    'tool_chisel_set',
  ],
  mason: [
    'tool_trowel',
    'tool_level',
    'tool_hammer_masonry',
    'tool_chisel',
    'tool_mortar_mixer',
    'tool_bucket',
    'tool_jointer',
  ],
  facade_fitter: [
    'tool_drill',
    'tool_rivet_gun',
    'tool_level',
    'tool_grinder',
    'tool_laser_level',
    'tool_scissors_metal',
  ],
  concrete_specialist: [
    'tool_trowel_concrete',
    'tool_concrete_mixer',
    'tool_level',
    'tool_grinder_diamond',
    'tool_wheelbarrow',
  ],
  joint_sealer: [
    'tool_caulking_gun_pro',
    'tool_utility_knife',
    'tool_spatula_set_sealing',
    'tool_tape_masking',
    'tool_cleaner_solvent',
  ],
  other: [],
};
