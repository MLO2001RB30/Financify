from fastapi import FastAPI, HTTPException, Depends
from fastapi.middleware.cors import CORSMiddleware
from fastapi.security import HTTPBearer
from pydantic import BaseModel
from typing import Optional, Dict, Any, List
import openai
import json
import os
from datetime import datetime
import uuid

app = FastAPI(title="Financify API", version="1.0.0")

# CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# OpenAI setup
openai.api_key = os.getenv("OPENAI_API_KEY")

# Security
security = HTTPBearer()

# In-memory storage (replace with PostgreSQL later)
user_contexts = {}
chat_sessions = {}

class CompanyContext(BaseModel):
    company_name: str
    industry: str
    currency: str = "DKK"
    founded_date: Optional[str] = None
    funding_rounds: List[Dict[str, Any]] = []
    employees: int = 0
    monthly_burn: Optional[float] = None
    cash_balance: Optional[float] = None
    runway_months: Optional[float] = None
    cap_table: List[Dict[str, Any]] = []
    bank_accounts: List[Dict[str, Any]] = []
    systems: Dict[str, Any] = {}

class ChatMessage(BaseModel):
    message: str
    user_id: str

class ChatResponse(BaseModel):
    response: str
    context_updated: bool = False
    charts: Optional[List[Dict[str, Any]]] = None

def get_system_prompt(context: CompanyContext) -> str:
    return f"""You are Financify, an AI finance copilot for {context.company_name}.

COMPANY CONTEXT:
- Company: {context.company_name} ({context.industry})
- Employees: {context.employees}
- Monthly burn: {context.monthly_burn} {context.currency}
- Cash balance: {context.cash_balance} {context.currency}
- Runway: {context.runway_months} months
- Founded: {context.founded_date}
- Cap table: {len(context.cap_table)} stakeholders
- Funding rounds: {len(context.funding_rounds)} completed

You understand this company's financial situation completely. Answer questions about:
- Burn rate, runway, cash flow
- Hiring scenarios and financial impact
- Cap table and dilution modeling
- Investor reporting
- Financial forecasting

Be precise, actionable, and remember all context. If you need more data, ask specifically what's missing."""

@app.post("/api/chat", response_model=ChatResponse)
async def chat(message: ChatMessage):
    user_id = message.user_id
    
    # Get or create user context
    if user_id not in user_contexts:
        user_contexts[user_id] = CompanyContext(
            company_name="Your Startup",
            industry="Technology"
        )
    
    context = user_contexts[user_id]
    system_prompt = get_system_prompt(context)
    
    # Get chat history
    if user_id not in chat_sessions:
        chat_sessions[user_id] = []
    
    chat_history = chat_sessions[user_id]
    
    # Prepare messages
    messages = [
        {"role": "system", "content": system_prompt}
    ]
    
    # Add recent chat history (last 10 messages)
    for msg in chat_history[-10:]:
        messages.append(msg)
    
    messages.append({"role": "user", "content": message.message})
    
    try:
        # Call OpenAI
        response = openai.chat.completions.create(
            model="gpt-4o",
            messages=messages,
            temperature=0.3,
            max_tokens=1000
        )
        
        ai_response = response.choices[0].message.content
        
        # Update chat history
        chat_sessions[user_id].append({"role": "user", "content": message.message})
        chat_sessions[user_id].append({"role": "assistant", "content": ai_response})
        
        return ChatResponse(response=ai_response)
        
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"AI Error: {str(e)}")

@app.post("/api/context/update")
async def update_context(user_id: str, context: CompanyContext):
    user_contexts[user_id] = context
    return {"status": "Context updated successfully"}

@app.get("/api/context/{user_id}")
async def get_context(user_id: str):
    if user_id not in user_contexts:
        return CompanyContext(company_name="Your Startup", industry="Technology")
    return user_contexts[user_id]

@app.post("/api/calculate/runway")
async def calculate_runway(user_id: str):
    if user_id not in user_contexts:
        raise HTTPException(status_code=404, detail="User context not found")
    
    context = user_contexts[user_id]
    
    if not context.cash_balance or not context.monthly_burn:
        raise HTTPException(status_code=400, detail="Missing cash balance or monthly burn data")
    
    runway = context.cash_balance / context.monthly_burn
    
    return {
        "runway_months": round(runway, 1),
        "runway_date": datetime.now().strftime("%Y-%m-%d"),
        "cash_balance": context.cash_balance,
        "monthly_burn": context.monthly_burn
    }

@app.get("/")
async def root():
    return {"message": "Financify API is running"}

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8000) 