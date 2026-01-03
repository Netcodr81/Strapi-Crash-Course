const fs = require('fs');
const path = require('path');
const crypto = require('crypto');

const envExamplePath = path.join(__dirname, '.env.example');
const envPath = path.join(__dirname, '.env');

function generateSecret(length = 64) {
  return crypto.randomBytes(length).toString('hex');
}

let envVars = '';
if (fs.existsSync(envExamplePath)) {
  envVars = fs.readFileSync(envExamplePath, 'utf8');
}

// Ensure ADMIN_JWT_SECRET is present and set
if (!envVars.match(/^ADMIN_JWT_SECRET=/m)) {
  envVars += (envVars.endsWith('\n') ? '' : '\n') + `ADMIN_JWT_SECRET=${generateSecret()}\n`;
} else {
  // Replace existing value with a new secret
  envVars = envVars.replace(/^ADMIN_JWT_SECRET=.*$/m, `ADMIN_JWT_SECRET=${generateSecret()}`);
}

fs.writeFileSync(envPath, envVars);
console.log('.env file created/updated with ADMIN_JWT_SECRET.');
