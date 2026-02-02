#!/bin/bash
# Setup script for DigitalOcean droplet
# Run this on your droplet as root or with sudo

set -e

echo "Setting up Chickpeas on DigitalOcean..."

# Update system
apt-get update && apt-get upgrade -y

# Install Node.js 20
curl -fsSL https://deb.nodesource.com/setup_20.x | bash -
apt-get install -y nodejs

# Install PM2 globally
npm install -g pm2

# Install nginx
apt-get install -y nginx

# Create app directory
mkdir -p /var/www/chickpeas
cd /var/www/chickpeas

# Clone your repo (replace with your repo URL)
# git clone git@github.com:alaw989/chickpeas.git .
# OR if you want to clone over HTTPS:
# git clone https://github.com/alaw989/chickpeas.git .

# For now, we'll assume you'll clone manually or the workflow will pull

# Install dependencies
npm install

# Build the app
npm run build

# Start with PM2
pm2 start ecosystem.config.cjs
pm2 save
pm2 startup

# Configure nginx
cat > /etc/nginx/sites-available/chickpeas << 'EOF'
server {
    listen 80;
    server_name chickpeas-mobile.com www.chickpeas-mobile.com;

    location / {
        proxy_pass http://localhost:3000;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
        proxy_cache_bypass $http_upgrade;
    }
}
EOF

# Enable site
ln -sf /etc/nginx/sites-available/chickpeas /etc/nginx/sites-enabled/
rm -f /etc/nginx/sites-enabled/default

# Test and restart nginx
nginx -t && systemctl restart nginx

echo "Setup complete! Don't forget to:"
echo "1. Add your GitHub Actions secrets (DROPLET_HOST, DROPLET_USER, DROPLET_SSH_KEY)"
echo "2. Set up SSL with certbot: apt-get install certbot python3-certbot-nginx && certbot --nginx -d chickpeas-mobile.com -d www.chickpeas-mobile.com"
