# 💰 Financify - AI Finance Copilot

**Financify** är en AI-driven finansiell copilot för startups som använder Model Context Protocol (MCP) för att förstå, komma ihåg och handla på företagets finansiella data i realtid.

## 🎯 Funktioner

- **Persistent AI-hukommelse**: Kommer ihåg all företagskontext via MCP
- **Automatiska beräkningar**: Burn rate, runway, churn, CAC, LTV
- **Cap table-simulering**: Dilution modeling och funding-scenarier  
- **Investor-rapportering**: Automatisk generering av månadsrapporter
- **Intelligent chat**: Naturlig konversation om företagets ekonomi
- **Kontextuell rådgivning**: Förstår din specifika affärsmodell

## 🛠️ Tech Stack

### Backend
- **FastAPI** - Modern Python web framework
- **OpenAI GPT-4o** - AI-motor med MCP-support
- **Pydantic** - Data validation
- **PostgreSQL** - Database (framtida implementation)

### Frontend  
- **React 18** - Modern UI framework
- **CSS3** - Responsiv design
- **Fetch API** - HTTP-kommunikation

## 🚀 Snabbstart

### Prerequisites
- Python 3.8+
- Node.js 16+
- OpenAI API-nyckel

### 1. Klona och installera backend

```bash
# Navigera till backend
cd backend

# Installera Python-dependencies
pip install -r requirements.txt

# Sätt miljövariabel för OpenAI
export OPENAI_API_KEY="din-openai-api-nyckel"
```

### 2. Starta backend-servern

```bash
# Från backend-mappen
python -m uvicorn app.main:app --reload --host 0.0.0.0 --port 8000
```

Backend körs nu på: `http://localhost:8000`

### 3. Installera och starta frontend

```bash
# Navigera till frontend
cd frontend

# Installera Node.js dependencies
npm install

# Starta utvecklingsservern
npm start
```

Frontend körs nu på: `http://localhost:3000`

## 🔧 Konfiguration

### Environment Variables

Skapa en `.env`-fil i backend-mappen:

```env
OPENAI_API_KEY=sk-your-openai-api-key
DATABASE_URL=postgresql://user:password@localhost/financify
```

### Företagskontext

När du först använder Financify:

1. Klicka på "⚙️ Company Context" 
2. Fyll i företagsinformation:
   - Företagsnamn
   - Bransch  
   - Antal anställda
   - Månatlig burn rate
   - Nuvarande kassan
   - Grundat datum

## 💬 Exempel på användning

Efter att ha satt upp företagskontexten kan du ställa frågor som:

- "Hur länge räcker vår runway?"
- "Vad händer om vi anställer två utvecklare till?"
- "Skriv en månadsrapport för våra investerare"
- "Simulera en Series A på 50 miljoner DKK"
- "Vad är vår nuvarande burn rate trend?"

## 🔄 API Endpoints

### Chat
- `POST /api/chat` - Skicka meddelanden till AI
- `GET /api/context/{user_id}` - Hämta företagskontext
- `POST /api/context/update` - Uppdatera företagskontext

### Beräkningar
- `POST /api/calculate/runway` - Beräkna runway baserat på aktuell data

## 🎯 Roadmap

### Version 1.0 (MVP) ✅
- [x] Grundläggande chat-funktionalitet
- [x] Företagskontext management
- [x] Runway-beräkningar
- [x] React frontend

### Version 2.0 (Automation)
- [ ] OAuth-integration med e-conomic
- [ ] Stripe-integration för MRR/churn
- [ ] Automatisk datasynkronisering
- [ ] PDF-rapportgenerering
- [ ] Slack-integration

### Version 3.0 (MCP Native)
- [ ] Fullständig MCP-implementation
- [ ] Avancerad kontexthantering
- [ ] Real-time dataflöden
- [ ] Bank-API-integrationer

## 🧠 Så fungerar MCP

Model Context Protocol låter AI:n komma ihåg och förstå:
- Din företagsstruktur och mål
- Tidigare beslut och konversationer  
- Finansiella mönster och trender
- Specifika branschkontext

Detta gör att Financify agerar som en verklig finansiell rådgivare istället för bara en chatbot.

## 🛡️ Säkerhet

- All data lagras lokalt under utveckling
- OpenAI API-nycklar hanteras säkert via miljövariabler
- Inga finansiella data skickas till tredje part utan samtycke

## 🤝 Bidrag

Projektet välkomnar bidrag! Se [CONTRIBUTING.md](CONTRIBUTING.md) för riktlinjer.

## 📄 Licens

MIT License - se [LICENSE](LICENSE) för detaljer.

## 🔗 Länkar

- [OpenAI MCP Documentation](https://platform.openai.com/docs/guides/mcp)
- [FastAPI Documentation](https://fastapi.tiangolo.com/)
- [React Documentation](https://react.dev/)

---

**Byggd med ❤️ för startup-communityn** 