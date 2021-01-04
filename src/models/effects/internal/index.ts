import { BloodMagicSkill } from './blood-magic';
import { DoctorSkill } from './doctor';
import { GambleKingSkill } from './gamble-king';
import { LanguageEffectSkill } from './language-effect';
import { ShadowKnifeSkill } from './shadow-knife';
import { ThunderMagicSkill } from './thunder-magic';
import { WitchSkill } from './witch';

export const internalSkills = [
  BloodMagicSkill,
  DoctorSkill,
  GambleKingSkill,
  LanguageEffectSkill,
  ShadowKnifeSkill,
  ThunderMagicSkill,
  WitchSkill,
];

export function getSkill(skillProperty: number, playerId: string) {
  const skillId = skillProperty % internalSkills.length;
  return new internalSkills[skillId](playerId);
}
