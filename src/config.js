const fs = require('fs');
const path = require('path');
const os = require('os');

const CONFIG_FILE = path.join(os.homedir(), '.passgenrc');

const DEFAULT_CONFIG = {
  length: 12,
  includeNumbers: false,
  includeSymbols: false,
  includeUppercase: false,
  includeLowercase: true,
  showStrength: false
};

function loadConfig() {
  try {
    if (fs.existsSync(CONFIG_FILE)) {
      const configData = fs.readFileSync(CONFIG_FILE, 'utf8');
      return { ...DEFAULT_CONFIG, ...JSON.parse(configData) };
    }
  } catch (err) {
    console.error('Warning: Could not read config file, using defaults');
  }
  return DEFAULT_CONFIG;
}

function saveConfig(config) {
  try {
    fs.writeFileSync(CONFIG_FILE, JSON.stringify(config, null, 2));
    console.log(`Configuration saved to ${CONFIG_FILE}`);
  } catch (err) {
    console.error('Error saving config file:', err.message);
  }
}

module.exports = {
  loadConfig,
  saveConfig,
  DEFAULT_CONFIG,
  CONFIG_FILE
};