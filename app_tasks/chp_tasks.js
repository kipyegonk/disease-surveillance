const { getField } = require('../nools-extras');
let chpTasks = [
  {
    name: 'follow-up-household-member',
    title: 'Follow Up Household Member',
    icon: 'icon-healthcare-assessment',
    appliesTo: 'reports',
    appliesToType: ['household_member_assessment'],
    appliesIf: function (contact, report) {
      try {
        var hasDangerSigns = getField(report, 'household_member_assessment.initial_symptoms') === 'yes';
        var isChp = user && user.contact_type === 'community_health_volunteer';
        return !!(hasDangerSigns && isChp);
      } catch(e) { return false; }
    },
    actions: [{ form: 'cholera_suspicion_follow_up', label: 'Follow Up' }],
    events: [{ start: 3, end: 3, dueDate: function(event, contact, report) { return new Date(report.reported_date + event.start * 24 * 60 * 60 * 1000); }}],
    priority: { level: 'high', label: 'High Priority' },
  },
  {
    name: 'chp-verify-cholera-case',
    title: 'Verify Cholera Case',
    icon: 'cholera-verification',
    appliesTo: 'reports',
    appliesToType: ['cha_verify_case'],
    appliesIf: function (contact, report) {
      try {
        var confirmed = report.fields && report.fields.danger_signs && report.fields.danger_signs.confirm_case === 'yes';
        var isChp = user && user.contact_type === 'community_health_volunteer';
        return !!(confirmed && isChp);
      } catch(e) { return false; }
    },
    actions: [{ form: 'cholera_verification', label: 'Verify Case' }],
    events: [{ start: 3, end: 3, dueDate: function(event, contact, report) { return new Date(report.reported_date + event.start * 24 * 60 * 60 * 1000); }}],
    priority: { level: 'high', label: 'High Priority' },
  },
  {
    name: 'chp-undo-death-report',
    title: 'Undo Death Report',
    icon: 'undo-death',
    appliesTo: 'reports',
    appliesToType: ['cha_verify_death'],
    appliesIf: function (contact, report) {
      try {
        var confirmDeath = report.fields && report.fields.death_report && report.fields.death_report.confirm_death;
        var isChp = user && user.contact_type === 'community_health_volunteer';
        return !!(confirmDeath === 'no' && isChp);
      } catch(e) { return false; }
    },
    actions: [{ form: 'undo_death_report', label: 'Undo Death Report' }],
    events: [{ start: 3, end: 3, dueDate: function(event, contact, report) { return new Date(report.reported_date + event.start * 24 * 60 * 60 * 1000); }}],
    priority: { level: 'high', label: 'High Priority' },
  },
];
module.exports = { chpTasks };
