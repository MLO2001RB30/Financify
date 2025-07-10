# 🚀 Financify Installation Guide

Follow these steps to get Financify up and running on your local machine.

## Prerequisites

Make sure you have the following installed:
- **Python 3.8+** (Download from [python.org](https://python.org))
- **Node.js 16+** (Download from [nodejs.org](https://nodejs.org))
- **OpenAI API Key** (Get from [platform.openai.com](https://platform.openai.com))

## Step 1: Install Backend Dependencies

Open a terminal/command prompt and navigate to the project directory:

```bash
# Navigate to backend directory
cd backend

# Install Python dependencies
pip install -r requirements.txt
```

## Step 2: Configure Environment

Create a `.env` file in the `backend` folder:

```bash
# In backend folder, create .env file with:
OPENAI_API_KEY=sk-your-actual-openai-api-key-here
```

## Step 3: Install Frontend Dependencies

```bash
# Navigate to frontend directory
cd ../frontend

# Install Node.js dependencies
npm install
```

## Step 4: Start the Backend Server

In one terminal window:

```bash
cd backend
python -m uvicorn app.main:app --reload --host 0.0.0.0 --port 8000
```

You should see output like:
```
INFO:     Uvicorn running on http://0.0.0.0:8000
INFO:     Application startup complete.
```

## Step 5: Start the Frontend

In another terminal window:

```bash
cd frontend
npm start
```

The React application will start and automatically open in your browser at `http://localhost:3000`.

## Step 6: Configure Your Company

1. Click the "⚙️ Company Context" button in the top-right corner
2. Fill in your company information:
   - Company Name
   - Industry
   - Number of Employees
   - Monthly Burn Rate (DKK)
   - Cash Balance (DKK)
   - Founded Date

## Step 7: Start Using Financify!

Try asking questions like:
- "How long does our runway last?"
- "What happens if we hire 2 more developers?"
- "Generate a monthly investor update"

## Troubleshooting

### Backend Issues
- **OpenAI API Error**: Make sure your API key is correct in `backend/.env`
- **Port 8000 in use**: Change the port with `--port 8001`
- **Python not found**: Make sure Python is installed and in your PATH

### Frontend Issues
- **npm not found**: Install Node.js from nodejs.org
- **Port 3000 in use**: React will automatically suggest port 3001
- **API connection error**: Make sure the backend is running on port 8000

### Common Windows Issues
- Use PowerShell or Command Prompt as Administrator if you get permission errors
- If pip fails, try `python -m pip install -r requirements.txt` instead

## Success! 🎉

If everything is working, you should see:
- Backend API documentation at `http://localhost:8000/docs`
- Frontend application at `http://localhost:3000`
- AI responses in the chat interface

Need help? Check the main README.md for more details! 