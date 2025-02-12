#!/usr/bin/env node

const { program } = require('commander');
const crypto = require('crypto');
const { checkPasswordStrength } = require('../src/validator');

program
  .name('passgen')
  .description('CLI password generator')
  .version('1.0.0');

program
  .option('-l, --length <number>', 'password length', '12')
  .option('-n, --numbers', 'include numbers')
  .option('-s, --symbols', 'include symbols')
  .option('-u, --uppercase', 'include uppercase letters')
  .option('--no-lowercase', 'exclude lowercase letters')
  .option('-c, --check', 'show password strength')
  .option('-b, --batch <number>', 'generate multiple passwords')
  .action((options) => {
    const length = parseInt(options.length);
    const batchCount = options.batch ? parseInt(options.batch) : 1;
    
    let charset = '';
    
    if (options.lowercase) charset += 'abcdefghijklmnopqrstuvwxyz';
    if (options.uppercase) charset += 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
    if (options.numbers) charset += '0123456789';
    if (options.symbols) charset += '!@#$%^&*()_+-=[]{}|;:,.<>?';
    
    if (!charset) charset = 'abcdefghijklmnopqrstuvwxyz';
    
    function generatePassword() {
      let password = '';
      for (let i = 0; i < length; i++) {
        const randomIndex = crypto.randomInt(0, charset.length);
        password += charset[randomIndex];
      }
      return password;
    }
    
    for (let i = 0; i < batchCount; i++) {
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
    }
  });

program.parse();