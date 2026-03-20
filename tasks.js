const { chpTasks, chaTasks, dsoTasks }                          = require('./app_tasks');
const { chpMalariaTasks, chaMalariaTasks, dsoMalariaTasks }     = require('./app_tasks/malaria_tasks');
const { chpTbTasks, chaTbTasks, dsoTbTasks }                    = require('./app_tasks/tb_tasks');
const {
  chpMeaslesTasks, chaMeaslesTasks, dsoMeaslesTasks,
  chpAwdTasks, chaAwdTasks, dsoAwdTasks,
} = require('./app_tasks/measles_awd_tasks');

module.exports = [
  // Existing cholera tasks
  ...chpTasks,
  ...chaTasks,
  ...dsoTasks,
  // Malaria
  ...chpMalariaTasks,
  ...chaMalariaTasks,
  ...dsoMalariaTasks,
  // Tuberculosis
  ...chpTbTasks,
  ...chaTbTasks,
  ...dsoTbTasks,
  // Measles
  ...chpMeaslesTasks,
  ...chaMeaslesTasks,
  ...dsoMeaslesTasks,
  // AWD
  ...chpAwdTasks,
  ...chaAwdTasks,
  ...dsoAwdTasks,
];
