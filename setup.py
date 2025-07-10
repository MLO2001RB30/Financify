#!/usr/bin/env python3
"""
Financify Setup Script
Helps initialize the Financify AI Finance Copilot project
"""

import os
import subprocess
import sys

def create_env_file():
    """Create .env file from template"""
    env_content = """# OpenAI Configuration
OPENAI_API_KEY=sk-your-openai-api-key-here

# Database (Future use)
DATABASE_URL=postgresql://user:password@localhost/financify

# Application Settings
DEBUG=True
API_HOST=localhost
API_PORT=8000
FRONTEND_URL=http://localhost:3000

# Security (Future use)
SECRET_KEY=your-secret-key-here
JWT_ALGORITHM=HS256
ACCESS_TOKEN_EXPIRE_MINUTES=30
"""
    
    with open('backend/.env', 'w') as f:
        f.write(env_content)
    
    print("✅ Created backend/.env file")
    print("⚠️  Remember to add your OpenAI API key!")

def install_backend():
    """Install backend dependencies"""
    print("📦 Installing backend dependencies...")
    try:
        subprocess.run([sys.executable, '-m', 'pip', 'install', '-r', 'backend/requirements.txt'], 
                      check=True, cwd='.')
        print("✅ Backend dependencies installed")
    except subprocess.CalledProcessError:
        print("❌ Failed to install backend dependencies")
        return False
    return True

def install_frontend():
    """Install frontend dependencies"""
    print("📦 Installing frontend dependencies...")
    try:
        subprocess.run(['npm', 'install'], check=True, cwd='frontend')
        print("✅ Frontend dependencies installed")
    except subprocess.CalledProcessError:
        print("❌ Failed to install frontend dependencies")
        print("Make sure Node.js and npm are installed")
        return False
    return True

def main():
    print("🚀 Setting up Financify - AI Finance Copilot")
    print("=" * 50)
    
    # Check if we're in the right directory
    if not os.path.exists('backend/requirements.txt'):
        print("❌ Run this script from the Financify project root directory")
        sys.exit(1)
    
    # Create .env file
    create_env_file()
    
    # Install dependencies
    backend_success = install_backend()
    frontend_success = install_frontend()
    
    print("\n" + "=" * 50)
    
    if backend_success and frontend_success:
        print("🎉 Setup completed successfully!")
        print("\nNext steps:")
        print("1. Add your OpenAI API key to backend/.env")
        print("2. Start backend: cd backend && python -m uvicorn app.main:app --reload")
        print("3. Start frontend: cd frontend && npm start")
        print("4. Open http://localhost:3000 in your browser")
    else:
        print("⚠️  Setup completed with errors")
        print("Please check the error messages above and try again")

if __name__ == "__main__":
    main() 