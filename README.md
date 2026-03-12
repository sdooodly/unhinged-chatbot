# Unhinged Gym Discord Bot

Discord bot with unhinged gym drill sergeant persona using Gemini AI.

## Setup

### 1. Create Discord Bot

1. Go to https://discord.com/developers/applications
2. Click "New Application"
3. Give it a name (e.g., "Gym Drill Sergeant")
4. Go to "Bot" tab
5. Click "Reset Token" and copy the token
6. Enable these under "Privileged Gateway Intents":
   - MESSAGE CONTENT INTENT ✅
7. Go to "OAuth2" → "URL Generator"
8. Select scopes: `bot`
9. Select permissions: `Send Messages`, `Read Messages/View Channels`
10. Copy the generated URL and open it to invite bot to your server

### 2. Install Dependencies

```bash
npm install
```

### 3. Configure

Edit `.env` and add your tokens:
```
DISCORD_TOKEN=your_discord_bot_token_here
GEMINI_API_KEY=your_gemini_api_key_here
```

### 4. Run

```bash
npm run dev
```

## Usage

1. Send a message in any channel where the bot has access
2. Or DM the bot directly
3. Get roasted by the unhinged gym drill sergeant!

**Example messages:**
- "I'm tired today"
- "I need a rest day"
- "I lifted 5kg"
- "What workout should I do?"
