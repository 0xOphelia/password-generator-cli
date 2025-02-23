const crypto = require('crypto');

const TEMPLATES = {
  secure: {
    length: 16,
    includeUppercase: true,
    includeLowercase: true,
    includeNumbers: true,
    includeSymbols: true,
    description: 'Highly secure password with all character types'
  },
  pin: {
    length: 6,
    includeUppercase: false,
    includeLowercase: false,
    includeNumbers: true,
    includeSymbols: false,
    description: 'Numeric PIN'
  },
  memorable: {
    length: 12,
    includeUppercase: true,
    includeLowercase: true,
    includeNumbers: true,
    includeSymbols: false,
    description: 'Easy to remember alphanumeric password'
  },
  wifi: {
    length: 20,
    includeUppercase: true,
    includeLowercase: true,
    includeNumbers: true,
    includeSymbols: true,
    description: 'Strong WiFi password'
  }
};

function getTemplate(name) {
  return TEMPLATES[name];
}

function listTemplates() {
  return Object.keys(TEMPLATES).map(name => ({
    name,
    ...TEMPLATES[name]
  }));
}

function generateFromTemplate(templateName) {
  const template = getTemplate(templateName);
  if (!template) {
    throw new Error(`Template '${templateName}' not found`);
  }
  
  let charset = '';
  if (template.includeLowercase) charset += 'abcdefghijklmnopqrstuvwxyz';
  if (template.includeUppercase) charset += 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
  if (template.includeNumbers) charset += '0123456789';
  if (template.includeSymbols) charset += '!@#$%^&*()_+-=[]{}|;:,.<>?';
  
  let password = '';
  for (let i = 0; i < template.length; i++) {
    const randomIndex = crypto.randomInt(0, charset.length);
    password += charset[randomIndex];
  }
  
  return password;
}

module.exports = {
  getTemplate,
  listTemplates,
  generateFromTemplate,
  TEMPLATES
};