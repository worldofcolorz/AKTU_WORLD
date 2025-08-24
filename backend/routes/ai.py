from flask import jsonify, request
import os
import requests
from . import api_blueprint

# Google AI Studio API configuration
GOOGLE_AI_API_KEY = os.environ.get('GOOGLE_AI_API_KEY')
GOOGLE_AI_API_URL = 'https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent'

@api_blueprint.post("/ai/chat")
def ai_chat():
    """Handle AI chat requests using Google AI Studio (Gemini)"""
    try:
        if not GOOGLE_AI_API_KEY:
            return jsonify({
                "error": "Google AI API key not configured. Please set GOOGLE_AI_API_KEY environment variable."
            }), 500

        data = request.get_json(silent=True) or {}
        user_message = data.get('message') or 'Say Hello World'

        # Add system prompt for concise responses
        prompt = f"You are EduLorz AI, an educational assistant. Respond in exactly 30-40 words using bullet points. Be concise and accurate.\n\nQuestion: {user_message}\n\nAnswer:"

        # Minimal payload matching the working snippet
        headers = {
            'Content-Type': 'application/json',
        }

        payload = {
            "contents": [
                {"parts": [{"text": prompt}]}
            ]
        }

        # Make request to Google AI Studio
        response = requests.post(
            f"{GOOGLE_AI_API_URL}?key={GOOGLE_AI_API_KEY}",
            headers=headers,
            json=payload,
            timeout=30
        )

        if response.status_code != 200:
            # Log full provider response for local debugging
            print(f"Google AI API error: {response.status_code} - {response.text}")
            # Return helpful details to the client (frontend logs it)
            return jsonify({
                "error": "Failed to get response from AI service",
                "details": f"API returned status {response.status_code}",
                "provider_status": response.status_code,
                "provider_response": response.text
            }), 500

        result = response.json()
        
        # Extract the AI response
        if 'candidates' in result and len(result['candidates']) > 0:
            candidate = result['candidates'][0]
            if 'content' in candidate and 'parts' in candidate['content']:
                ai_response = candidate['content']['parts'][0].get('text', '')
                
                return jsonify({
                    "response": ai_response,
                    "success": True
                })
        
        # Fallback if response structure is unexpected
        return jsonify({
            "error": "Unexpected response format from AI service",
            "details": "Could not extract response text"
        }), 500

    except requests.exceptions.Timeout:
        return jsonify({
            "error": "AI service request timed out. Please try again."
        }), 504
    except requests.exceptions.RequestException as e:
        print(f"Request error: {e}")
        return jsonify({
            "error": "Failed to connect to AI service",
            "details": str(e)
        }), 503
    except Exception as e:
        print(f"Unexpected error in AI chat: {e}")
        return jsonify({
            "error": "An unexpected error occurred",
            "details": str(e)
        }), 500


@api_blueprint.get("/ai/status")
def ai_status():
    """Check AI service status and configuration"""
    return jsonify({
        "configured": bool(GOOGLE_AI_API_KEY),
        "api_key_set": "Yes" if GOOGLE_AI_API_KEY else "No",
        "service": "Google AI Studio (Gemini)",
        "status": "Ready" if GOOGLE_AI_API_KEY else "Not configured"
    })
