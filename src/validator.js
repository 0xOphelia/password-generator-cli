function checkPasswordStrength(password) {
  let score = 0;
  let feedback = [];
  
  if (password.length >= 8) {
    score += 1;
  } else {
    feedback.push('Use at least 8 characters');
  }
  
  if (password.length >= 12) {
    score += 1;
  }
  
  if (/[a-z]/.test(password)) {
    score += 1;
  } else {
    feedback.push('Include lowercase letters');
  }
  
  if (/[A-Z]/.test(password)) {
    score += 1;
  } else {
    feedback.push('Include uppercase letters');
  }
  
  if (/[0-9]/.test(password)) {
    score += 1;
  } else {
    feedback.push('Include numbers');
  }
  
  if (/[^a-zA-Z0-9]/.test(password)) {
    score += 1;
  } else {
    feedback.push('Include special characters');
  }
  
  let strength;
  if (score >= 5) {
    strength = 'Strong';
  } else if (score >= 3) {
    strength = 'Medium';
  } else {
    strength = 'Weak';
  }
  
  return {
    strength,
    score,
    maxScore: 6,
    feedback
  };
}

module.exports = { checkPasswordStrength };