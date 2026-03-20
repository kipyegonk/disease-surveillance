const { chpTargets, chaTargets, dsoTargets } = require('./app_targets');
const {
  malariaTargets,
  tbTargets,
  measlesTargets,
  awdTargets,
  supervisorTargets,
} = require('./app_targets/disease_targets');

module.exports = [
  // Existing cholera targets
  ...chpTargets,
  ...chaTargets,
  ...dsoTargets,
  // New disease targets (visible to all roles)
  ...malariaTargets,
  ...tbTargets,
  ...measlesTargets,
  ...awdTargets,
  // Richer supervisor KPIs (CHA / DSO)
  ...supervisorTargets,
];
