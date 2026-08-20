// Link/text patterns used both to discover surfaces and to run the Band A
// documentary checks. Kept in one file so the rubric and the scanner can never
// drift apart.

export const SURFACE_PATTERNS = {
  // The five investor-facing surfaces the SEBI circulars actually touch.
  investor_charter: /investor[-\s_]?charter/i,
  grievance:        /grievance|complaint|scores|odr|escalation[-\s]?matrix/i,
  account_opening:  /open[-\s_]?(a[-\s_]?)?(demat|trading|free)?[-\s_]?account|signup|sign[-\s_]?up|register/i,
  pricing:          /pricing|brokerage[-\s_]?charges|charges|tariff/i,
  accessibility:    /accessibilit|a11y|divyang|differently[-\s]?abled|persons?[-\s]with[-\s]disabilit/i,
};

// An accessibility-shaped link is not automatically an accessibility statement.
// Two common false positives have to be split out, because crediting them as
// compliance is exactly the error this project exists to avoid:
//   - a skip link ("Skip to main content" -> #main) is a genuine WCAG 2.4.1
//     feature, but it is not a statement and says nothing about conformance;
//   - an overlay/toolbar widget (href="javascript:void(0)") is a third-party
//     plugin, not a conformance claim, and the void href is itself an
//     anti-pattern under WCAG 2.1.1 / 4.1.2.
export function classifyAccessibilityLink(link) {
  const href = String(link.href || '');
  if (/^javascript:/i.test(href)) return 'widget';
  if (/#/.test(href) && /skip\s+to/i.test(link.text || '')) return 'skip_link';
  if (/^#/.test(href.replace(/^https?:\/\/[^/]+\//, ''))) return 'fragment';
  return 'statement_candidate';
}

// Band A documentary checks run against rendered page text.
export const TEXT_PROBES = {
  // The Dec 8 2025 clarification says this right goes into Investor Charters.
  charter_digital_right: /digital\s+accessibility/i,
  // Pre-existing generic clause XVII of the SEBI model charter. Present in the
  // template since long before the accessibility circulars, so finding it proves
  // nothing about compliance -- we track it to avoid crediting it as if it did.
  charter_legacy_clause: /suitable manner even if differently abled/i,
  // 2025/111 Annexure I, s.1.1-1.2: a Nodal Officer for digital accessibility.
  nodal_officer:         /nodal\s+officer/i,
  nodal_officer_digital: /nodal\s+officer[^.]{0,120}(accessibilit|disabilit)|(accessibilit|disabilit)[^.]{0,120}nodal\s+officer/i,
  // 2025/111 Annexure I, s.1.3: accessibility-specific grievance channel.
  a11y_grievance:        /(accessibilit|disabilit)[^.]{0,160}(grievance|complaint|helpline)/i,
  wcag_claim:            /WCAG\s*2\.[0-2]/i,
  conformance_level:     /level\s*(A{1,3})\b|\bAA\b\s*conformance/i,
  iaap:                  /IAAP|CPACC|WAS\s+certifi/i,
  is17802:               /IS\s*17802/i,
  gigw:                  /GIGW/i,
  isl_video:             /indian\s+sign\s+language|\bISL\b/i,
};
