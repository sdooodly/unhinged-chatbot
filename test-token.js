require('dotenv').config();
const https = require('https');

// Disable SSL verification
process.env.NODE_TLS_REJECT_UNAUTHORIZED = '0';

const token = process.env.DISCORD_TOKEN;

console.log('Testing Discord token...');
console.log('Token:', token.substring(0, 20) + '...');

const options = {
  hostname: 'discord.com',
  path: '/api/v10/users/@me',
  method: 'GET',
  headers: {
    'Authorization': `Bot ${token}`,
    'Content-Type': 'application/json'
  }
};

const req = https.request(options, (res) => {
  console.log('Status:', res.statusCode);
  
  let data = '';
  res.on('data', (chunk) => {
    data += chunk;
  });
  
  res.on('end', () => {
    if (res.statusCode === 200) {
      const user = JSON.parse(data);
      console.log('✅ Token is valid!');
      console.log('Bot username:', user.username);
      console.log('Bot ID:', user.id);
    } else {
      console.log('❌ Token is invalid!');
      console.log('Response:', data);
      console.log('\nPlease reset your token:');
      console.log('1. Go to https://discord.com/developers/applications');
      console.log('2. Click your application');
      console.log('3. Go to Bot tab');
      console.log('4. Click "Reset Token"');
      console.log('5. Copy the new token');
      console.log('6. Update .env file');
    }
  });
});

req.on('error', (error) => {
  console.error('Error:', error.message);
});

req.end();
