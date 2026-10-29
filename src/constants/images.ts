/**
 * Every image used on the homepage. Components import from here and never
 * reference a file path or URL directly.
 */
import type { StaticImageData } from "next/image";

// 3D product avatars (src/Avatars)
import avatarAiReceptionist from "@/Avatars/01_ai_receptionist.png";
import avatarPbnVoice from "@/Avatars/02_pbn_voice.png";
import avatarOnlineScheduling from "@/Avatars/03_online_scheduling.png";
import avatarPayments from "@/Avatars/04_payments.png";
import avatarInsurance from "@/Avatars/05_insurance_verification.png";
import avatarSmartForms from "@/Avatars/06_smart_forms.png";
import avatarPatientTexting from "@/Avatars/07_patient_texting.png";
import avatarPracticeAnalytics from "@/Avatars/08_practice_analytics.png";
import avatarPbnAi from "@/Avatars/09_pbn_ai.png";

// brand
import aiOrb from "@/assets/images/brand/ai-orb.png";
import avondaleSmilesLogo from "@/assets/images/brand/avondale-smiles-logo.png";

// founder
import drAditi from "@/assets/images/founder/dr-aditi.jpg";

// AI receptionist
import callVideoThumb from "@/assets/images/receptionist/call-video-thumb.jpg";
import receptionistSketch from "@/assets/images/receptionist/receptionist-sketch.webp";
import receptionistColour from "@/assets/images/receptionist/receptionist-colour.webp";

// case studies
import caseAtlanta from "@/assets/images/case-studies/atlanta-dental-center.jpg";
import caseBaycove from "@/assets/images/case-studies/baycove.jpg";
import caseStoneridge from "@/assets/images/case-studies/stoneridge-dental.jpg";

// sample patients (hero product demo)
import patient1 from "@/assets/images/patients/patient-1.jpg";
import patient2 from "@/assets/images/patients/patient-2.jpg";
import patient3 from "@/assets/images/patients/patient-3.jpg";
import patient4 from "@/assets/images/patients/patient-4.jpg";
import patient5 from "@/assets/images/patients/patient-5.jpg";
import patient6 from "@/assets/images/patients/patient-6.jpg";
import patient7 from "@/assets/images/patients/patient-7.jpg";

// practice team members
import teamOfficeManager from "@/assets/images/team/office-manager.jpg";
import teamFrontDesk from "@/assets/images/team/front-desk.jpg";
import teamPracticeOwner from "@/assets/images/team/practice-owner.jpg";
import teamInsuranceCoordinator from "@/assets/images/team/insurance-coordinator.jpg";
import teamAssociateDentist from "@/assets/images/team/associate-dentist.jpg";
import teamCollaborator1 from "@/assets/images/team/collaborator-1.jpg";
import teamCollaborator2 from "@/assets/images/team/collaborator-2.jpg";

// callers shown in the innovation infographics
import callerMichaelThompson from "@/assets/images/callers/michael-thompson.jpg";
import callerFrontDeskAgent from "@/assets/images/callers/front-desk-agent.jpg";
import callerMikeThompsonAi from "@/assets/images/callers/mike-thompson-ai.jpg";

// customer testimonials
import tSamiraShafaee from "@/assets/images/testimonials/samira-shafaee.webp";
import tShainaHolman from "@/assets/images/testimonials/shaina-holman.webp";
import tMelissaScaggs from "@/assets/images/testimonials/melissa-scaggs.webp";
import tJaclynJohnson from "@/assets/images/testimonials/jaclyn-johnson.webp";
import tJulieKwon from "@/assets/images/testimonials/julie-kwon.webp";
import tWilliamMoorhead from "@/assets/images/testimonials/william-moorhead.webp";
import tEricBlock from "@/assets/images/testimonials/eric-block.webp";
import tAmmonBaus from "@/assets/images/testimonials/ammon-baus.webp";
import tBrittanyMaqueda from "@/assets/images/testimonials/brittany-maqueda.webp";
import tParulDuaMakkar from "@/assets/images/testimonials/parul-dua-makkar.webp";
import tRehanShahid from "@/assets/images/testimonials/rehan-shahid.webp";
import tPrajKamat from "@/assets/images/testimonials/praj-kamat.webp";
import tSophieWright from "@/assets/images/testimonials/sophie-wright.webp";
import tStanleyBrothers from "@/assets/images/testimonials/stanley-brothers.webp";

/** Keys for the nine PbN product avatars. */
export type AvatarKey = "rec" | "voice" | "sched" | "pay" | "ins" | "forms" | "text" | "iq" | "ai";

export const AVATARS: Record<AvatarKey, StaticImageData> = {
  rec: avatarAiReceptionist,
  voice: avatarPbnVoice,
  sched: avatarOnlineScheduling,
  pay: avatarPayments,
  ins: avatarInsurance,
  forms: avatarSmartForms,
  text: avatarPatientTexting,
  iq: avatarPracticeAnalytics,
  ai: avatarPbnAi,
};

export const BRAND_IMAGES = {
  aiOrb,
  avondaleSmilesLogo,
};

export const FOUNDER_IMAGES = {
  drAditi,
};

export const RECEPTIONIST_IMAGES = {
  callVideoThumb,
  sketch: receptionistSketch,
  colour: receptionistColour,
};

export const CASE_STUDY_IMAGES = {
  atlanta: caseAtlanta,
  baycove: caseBaycove,
  stoneridge: caseStoneridge,
};

/** Sample patient headshots, indexed 0..6. */
export const PATIENT_IMAGES: StaticImageData[] = [patient1, patient2, patient3, patient4, patient5, patient6, patient7];

export const TEAM_IMAGES = {
  officeManager: teamOfficeManager,
  frontDesk: teamFrontDesk,
  practiceOwner: teamPracticeOwner,
  insuranceCoordinator: teamInsuranceCoordinator,
  associateDentist: teamAssociateDentist,
  collaborator1: teamCollaborator1,
  collaborator2: teamCollaborator2,
};

export const CALLER_IMAGES = {
  michaelThompson: callerMichaelThompson,
  frontDeskAgent: callerFrontDeskAgent,
  mikeThompsonAi: callerMikeThompsonAi,
};

export const TESTIMONIAL_IMAGES = {
  samiraShafaee: tSamiraShafaee,
  shainaHolman: tShainaHolman,
  melissaScaggs: tMelissaScaggs,
  jaclynJohnson: tJaclynJohnson,
  julieKwon: tJulieKwon,
  williamMoorhead: tWilliamMoorhead,
  ericBlock: tEricBlock,
  ammonBaus: tAmmonBaus,
  brittanyMaqueda: tBrittanyMaqueda,
  parulDuaMakkar: tParulDuaMakkar,
  rehanShahid: tRehanShahid,
  prajKamat: tPrajKamat,
  sophieWright: tSophieWright,
  stanleyBrothers: tStanleyBrothers,
};
