/**
 * Validation functions for invitation data - CommonJS version
 */

// Validation function for invitation data
function validateInvitationData(data) {
  const errors = [];

  // Required field validation
  if (!data.name?.trim()) {
    errors.push({ field: 'name', message: 'Name is required' });
  }

  if (!data.email?.trim()) {
    errors.push({ field: 'email', message: 'Email is required' });
  } else if (!validateEmail(data.email)) {
    errors.push({ field: 'email', message: 'Please provide a valid email address' });
  }

  if (!data.cell?.trim()) {
    errors.push({ field: 'cell', message: 'Phone number is required' });
  } else if (!validatePhone(data.cell)) {
    errors.push({ field: 'cell', message: 'Please provide a valid phone number' });
  }

  if (!data.location?.trim()) {
    errors.push({ field: 'location', message: 'Location is required' });
  }

  if (data.d1_athletics_count < 0) {
    errors.push({ field: 'd1_athletics_count', message: 'D1 athletics count cannot be negative' });
  }

  if (!data.bio?.trim()) {
    errors.push({ field: 'bio', message: 'Bio is required' });
  } else if (data.bio.length < 10) {
    errors.push({ field: 'bio', message: 'Bio must be at least 10 characters' });
  }

  return {
    isValid: errors.length === 0,
    errors
  };
}

// Helper functions
function generateInvitationToken() {
  const timestamp = Date.now();
  const random = Math.floor(Math.random() * 1000000);
  return `coach_${timestamp}_${random}`;
}

function formatPhoneNumber(phone) {
  const cleaned = phone.replace(/\D/g, '');
  if (cleaned.length === 10) {
    return `+1${cleaned}`;
  } else if (cleaned.length === 11 && cleaned.startsWith('1')) {
    return `+${cleaned}`;
  }
  return phone;
}

function validateEmail(email) {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}

function validatePhone(phone) {
  const cleaned = phone.replace(/\D/g, '');
  return cleaned.length >= 10 && cleaned.length <= 15;
}

module.exports = {
  validateInvitationData,
  generateInvitationToken,
  formatPhoneNumber,
  validateEmail,
  validatePhone
};