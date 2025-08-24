# EduLorz AI Setup Guide

## Google AI Studio API Configuration

EduLorz AI uses Google AI Studio's Gemini Pro model to provide intelligent educational assistance. Follow these steps to configure the API:

### 1. Get Your Google AI Studio API Key

1. Visit [Google AI Studio](https://makersuite.google.com/app/apikey)
2. Sign in with your Google account
3. Click "Create API Key"
4. Copy the generated API key

### 2. Set Environment Variable

#### For Local Development:
Create a `.env` file in the backend directory or set the environment variable:

```bash
export GOOGLE_AI_API_KEY="your_api_key_here"
```

#### For Render Deployment:
1. Go to your Render dashboard
2. Select your backend service
3. Navigate to "Environment" tab
4. Add a new environment variable:
   - **Key**: `GOOGLE_AI_API_KEY`
   - **Value**: Your Google AI Studio API key

### 3. API Key Location

**Where to put your API key:**
- Environment variable name: `GOOGLE_AI_API_KEY`
- The backend will automatically read this from the environment
- Never hardcode the API key in your source code

### 4. Testing the Setup

1. Start your backend server
2. Visit `/api/ai/status` to check if the API key is configured
3. Open the EduLorz AI chat from the sidebar
4. Send a test message to verify functionality

### 5. API Features

- **Model**: Gemini Pro (Google's latest language model)
- **Context**: Maintains conversation history for better responses
- **Safety**: Built-in content filtering and safety settings
- **Educational Focus**: Optimized prompts for academic assistance

### 6. Troubleshooting

**API Key Not Working:**
- Verify the key is correctly set in environment variables
- Check that the key has proper permissions in Google AI Studio
- Ensure no extra spaces or characters in the key

**Rate Limits:**
- Google AI Studio has usage limits for free tier
- Monitor your usage in the Google AI Studio dashboard
- Consider upgrading if you need higher limits

**Error Messages:**
- Check backend logs for detailed error information
- Use `/api/ai/status` endpoint to verify configuration
- Ensure `requests` library is installed in backend requirements

### 7. Security Notes

- Keep your API key secure and never commit it to version control
- Use environment variables for all deployments
- Regularly rotate your API keys for security
- Monitor usage to detect any unauthorized access

## Support

If you encounter issues:
1. Check the backend logs for error details
2. Verify your API key is active in Google AI Studio
3. Test the `/api/ai/status` endpoint
4. Ensure all backend dependencies are installed
