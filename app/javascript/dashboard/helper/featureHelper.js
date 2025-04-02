const FEATURE_HELP_URLS = {
  agent_bots: 'https://www.altores.app/support-portal/documentation',
  agents: 'https://www.altores.app/support-portal/documentation',
  audit_logs: 'https://www.altores.app/support-portal/documentation',
  campaigns: 'https://www.altores.app/support-portal/documentation',
  canned_responses: 'https://www.altores.app/support-portal/documentation',
  channel_email: 'https://www.altores.app/support-portal/documentation',
  channel_facebook: 'https://www.altores.app/support-portal/documentation',
  custom_attributes: 'https://www.altores.app/support-portal/documentation',
  dashboard_apps: 'https://www.altores.app/support-portal/documentation',
  help_center: 'https://www.altores.app/support-portal/documentation',
  inboxes: 'https://www.altores.app/support-portal/documentation',
  integrations: 'https://www.altores.app/support-portal/documentation',
  labels: 'https://www.altores.app/support-portal/documentation',
  macros: 'https://www.altores.app/support-portal/documentation',
  message_reply_to: 'https://www.altores.app/support-portal/documentation',
  reports: 'https://www.altores.app/support-portal/documentation',
  sla: 'https://www.altores.app/support-portal/documentation',
  team_management: 'https://www.altores.app/support-portal/documentation',
  webhook: 'https://www.altores.app/support-portal/documentation',
  billing: 'https://altores.app/pricing',
};

export function getHelpUrlForFeature(featureName) {
  return FEATURE_HELP_URLS[featureName];
}
