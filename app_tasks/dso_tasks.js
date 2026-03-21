let dsoTasks = [
  {
    name: 'test-patient-specimen',
    title: 'Conduct Lab Test',
    icon: 'lab-test',
    appliesTo: 'reports',
    appliesToType: ['cholera_verification'],
    appliesIf: function (contact, report) {
      try {
        var dangerSigns = report.fields && report.fields.danger_signs;
        var confirmedCase = dangerSigns && dangerSigns.confirm_case === 'yes';
        var isDso = user && user.contact_type === 'area_health_facility_nurse';
        return !!(confirmedCase && isDso);
      } catch(e) { return false; }
    },
    actions: [{ form: 'specimen_details', label: 'Investigate' }],
    events: [{ start: 3, end: 3, dueDate: function(event, contact, report) { return new Date(report.reported_date + event.start * 24 * 60 * 60 * 1000); }}],
    priority: { level: 'high', label: 'High Priority' },
  },
];
module.exports = { dsoTasks };
