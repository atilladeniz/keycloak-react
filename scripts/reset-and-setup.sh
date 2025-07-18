#!/bin/bash
set -e

echo "🧹 Complete Reset and Setup Script"

# Colors for output
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
RED='\033[0;31m'
NC='\033[0m' # No Color

echo -e "${YELLOW}⚠️  This will completely reset your local environment!${NC}"
echo -n "Continue? (y/N) "
read -r response

if [[ ! "$response" =~ ^[Yy]$ ]]; then
    echo "Cancelled."
    exit 0
fi

# Clean everything
echo -e "${RED}🗑️  Cleaning up old environment...${NC}"

# Stop all services
echo "Stopping services..."
pkill -f "next dev" || true
docker-compose down -v || true

# Clean Terraform
echo "Cleaning Terraform..."
cd terraform
terraform destroy -auto-approve 2>/dev/null || true
rm -f terraform.tfstate* .terraform.lock.hcl
rm -rf .terraform/
cd ..

# Clean Next.js
echo "Cleaning Next.js cache..."
rm -rf .next node_modules/.cache

echo -e "${GREEN}✅ Cleanup complete!${NC}"
echo ""
echo -e "${YELLOW}🚀 Starting fresh setup...${NC}"
sleep 2

# Run setup
./scripts/setup-auth.sh