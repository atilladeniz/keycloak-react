#!/bin/bash
set -e

echo "🚀 Starting Keycloak Authentication Setup..."

# Colors for output
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

# Check if Docker is running
if ! docker info > /dev/null 2>&1; then
    echo "❌ Docker is not running. Please start Docker first."
    exit 1
fi

# Start Docker containers
echo -e "${YELLOW}📦 Starting Docker containers...${NC}"
docker-compose up -d

# Wait for Keycloak to be ready
echo -e "${YELLOW}⏳ Waiting for Keycloak to be ready...${NC}"
MAX_ATTEMPTS=30
ATTEMPT=0

while [ $ATTEMPT -lt $MAX_ATTEMPTS ]; do
    if curl -s http://localhost:8081/health/ready > /dev/null 2>&1; then
        echo -e "${GREEN}✅ Keycloak is ready!${NC}"
        break
    fi
    echo -n "."
    sleep 2
    ATTEMPT=$((ATTEMPT + 1))
done

if [ $ATTEMPT -eq $MAX_ATTEMPTS ]; then
    echo "❌ Keycloak failed to start. Check Docker logs."
    exit 1
fi

# Run Terraform
echo -e "${YELLOW}🔧 Setting up Keycloak configuration...${NC}"
cd terraform
terraform init -upgrade > /dev/null 2>&1
terraform apply -auto-approve

# Get client secret and update .env.local
echo -e "${YELLOW}🔐 Updating client secret...${NC}"
CLIENT_SECRET=$(terraform output -raw client_secret)

# Update .env.local with the new client secret
cd ..
if [[ "$OSTYPE" == "darwin"* ]]; then
    # macOS
    sed -i '' "s/KEYCLOAK_CLIENT_SECRET=.*/KEYCLOAK_CLIENT_SECRET=${CLIENT_SECRET}/" .env.local
else
    # Linux
    sed -i "s/KEYCLOAK_CLIENT_SECRET=.*/KEYCLOAK_CLIENT_SECRET=${CLIENT_SECRET}/" .env.local
fi

# Run database migrations
echo -e "${YELLOW}🗄️  Setting up database...${NC}"
npm run db:push -- --force

# Create demo user
echo -e "${YELLOW}👤 Creating demo user...${NC}"
TOKEN=$(curl -s -X POST "http://localhost:8081/realms/master/protocol/openid-connect/token" \
  -H "Content-Type: application/x-www-form-urlencoded" \
  -d "username=admin" \
  -d "password=admin" \
  -d "grant_type=password" \
  -d "client_id=admin-cli" | jq -r '.access_token')

# Create demo user JSON
cat > /tmp/demo-user.json <<EOF
{
  "username": "demo",
  "email": "demo@example.com",
  "enabled": true,
  "firstName": "Demo",
  "lastName": "User",
  "credentials": [{
    "type": "password",
    "value": "Demo123!",
    "temporary": false
  }]
}
EOF

# Create the user
curl -s -X POST "http://localhost:8081/admin/realms/nextjs-app/users" \
  -H "Authorization: Bearer $TOKEN" \
  -H "Content-Type: application/json" \
  -d @/tmp/demo-user.json > /dev/null 2>&1 || echo "Demo user might already exist"

rm -f /tmp/demo-user.json

echo -e "${GREEN}✅ Authentication setup complete!${NC}"
echo ""
echo "📝 Test credentials:"
echo "   Username: testuser"
echo "   Password: Test1234!"
echo ""
echo "   Username: demo"
echo "   Password: Demo123!"
echo ""
echo "🚀 Run 'npm run dev' to start the application"