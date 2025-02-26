#!/usr/bin/env node

const { program } = require('commander');
const crypto = require('crypto');
const { checkPasswordStrength } = require('../src/validator');
const { loadConfig, saveConfig } = require('../src/config');
const { listTemplates, generateFromTemplate } = require('../src/templates');

const config = loadConfig();

program
  .name('passgen')
  .description('CLI password generator')
  .version('1.2.0');

program
  .option('-l, --length <number>', 'password length', config.length.toString())
  .option('-n, --numbers', 'include numbers', config.includeNumbers)
  .option('-s, --symbols', 'include symbols', config.includeSymbols)
  .option('-u, --uppercase', 'include uppercase letters', config.includeUppercase)
  .option('--no-lowercase', 'exclude lowercase letters')
  .option('-c, --check', 'show password strength', config.showStrength)
  .option('-b, --batch <number>', 'generate multiple passwords')
  .option('-t, --template <name>', 'use a password template')
  .action((options) => {
    const batchCount = options.batch ? parseInt(options.batch) : 1;
    
    function generatePassword() {
      if (options.template) {
        return generateFromTemplate(options.template);
      }
      
      const length = parseInt(options.length);
      let charset = '';
      
      if (options.lowercase !== false) charset += 'abcdefghijklmnopqrstuvwxyz';
      if (options.uppercase) charset += 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
      if (options.numbers) charset += '0123456789';
      if (options.symbols) charset += '!@#$%^&*()_+-=[]{}|;:,.<>?';
      
      if (!charset) charset = 'abcdefghijklmnopqrstuvwxyz';
      
      let password = '';
      for (let i = 0; i < length; i++) {
        const randomIndex = crypto.randomInt(0, charset.length);
        password += charset[randomIndex];
      }
      return password;
    }
    
    for (let i = 0; i < batchCount; i++) {
      try {
        const password = generatePassword();
        console.log(password);
        
        if (options.check) {
          const result = checkPasswordStrength(password);
          console.log(`  Strength: ${result.strength} (${result.score}/${result.maxScore})`);
          if (result.feedback.length > 0 && batchCount === 1) {
            console.log('  Suggestions:');
            result.feedback.forEach(suggestion => console.log(`    - ${suggestion}`));
          }
          if (i < batchCount - 1) console.log('');
        }
      } catch (error) {
        console.error(`Error: ${error.message}`);
        return;
      }
    }
  });

program
  .command('config')
  .description('manage configuration settings')
  .option('--set <key=value>', 'set a configuration value')
  .option('--show', 'show current configuration')
  .action((options) => {
    if (options.show) {
      console.log('Current configuration:');
      console.log(JSON.stringify(config, null, 2));
      return;
    }
    
    if (options.set) {
      const [key, value] = options.set.split('=');
      if (!key || value === undefined) {
        console.error('Invalid format. Use: --set key=value');
        return;
      }
      
      const newConfig = { ...config };
      if (key === 'length') {
        newConfig[key] = parseInt(value);
      } else if (['includeNumbers', 'includeSymbols', 'includeUppercase', 'includeLowercase', 'showStrength'].includes(key)) {
        newConfig[key] = value.toLowerCase() === 'true';
      } else {
        console.error(`Unknown config key: ${key}`);
        return;
      }
      
      saveConfig(newConfig);
    }
  });

program
  .command('templates')
  .description('list available password templates')
  .action(() => {
    console.log('Available templates:');
    const templates = listTemplates();
    templates.forEach(template => {
      console.log(`\n${template.name}:`);
      console.log(`  Length: ${template.length}`);
      console.log(`  Description: ${template.description}`);
      console.log(`  Features: ${[
        template.includeUppercase && 'uppercase',
        template.includeLowercase && 'lowercase', 
        template.includeNumbers && 'numbers',
        template.includeSymbols && 'symbols'
      ].filter(Boolean).join(', ')}`);
    });
    console.log('\nUsage: passgen -t <template-name>');
  });

program.parse();