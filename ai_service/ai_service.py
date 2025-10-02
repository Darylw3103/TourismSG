from flask import Flask, request, jsonify
import spacy
from spacy.matcher import PhraseMatcher
import os

app = Flask(__name__)

# ----------------------------
# Load trained model
# ----------------------------
model_path = os.path.join("models", "intent_model")
if os.path.exists(model_path):
    nlp = spacy.load(model_path)
    print(f"✅ Loaded model from {model_path}")
else:
    raise RuntimeError("❌ Trained model not found. Run train_intents.py first.")

# ----------------------------
# Categories & Regions
# ----------------------------
CATEGORY_KEYWORDS = {
    "Museums & Art Galleries": ["museum", "art gallery", "exhibition", "contemporary art"],
    "Temples & Religious Sites": ["temple", "mosque", "church", "cathedral", "shrine", "synagogue"],
    "Landmarks & Iconic Sites": ["landmark", "monument", "tower", "statue", "heritage site"],
    "Parks & Nature": ["park", "nature", "botanical", "garden", "reserve"],
    "Shopping & Food Streets": ["shopping", "market", "mall", "hawker", "food street", "bazaar"],
    "Food & Culinary": ["food", "restaurant", "cafe", "dining", "eats"],
    "Entertainment & Theme Parks": ["theme park", "amusement", "entertainment", "rides", "resort", "fun"],
    "Nature & Wildlife Parks": ["zoo", "wildlife", "aquarium", "safari", "sanctuary"],
}

REGIONS = [
    "Sentosa", "Orchard", "Marina Bay", "Bugis", "Chinatown", "Little India",
    "Pulau Ubin", "East Coast", "Bukit Timah", "Bras Basah"
]

# ----------------------------
# Setup matchers
# ----------------------------
category_matcher = PhraseMatcher(nlp.vocab, attr="LOWER")
for cat, keywords in CATEGORY_KEYWORDS.items():
    category_matcher.add(cat, [nlp.make_doc(kw) for kw in keywords])

region_matcher = PhraseMatcher(nlp.vocab, attr="LOWER")
region_matcher.add("REGION", [nlp.make_doc(r) for r in REGIONS])


# ----------------------------
# API Endpoint
# ----------------------------
@app.route("/analyze", methods=["POST"])
def analyze_text():
    data = request.get_json()
    text = data.get("text", "").strip()
    lowered = text.lower()

    # 🟢 Handle small talk
    greetings = ["hi", "hello", "hey", "yo", "good morning", "good evening"]
    thanks = ["thanks", "thank you", "thx"]
    goodbyes = ["bye", "goodbye", "see you", "cya", "see ya"]

    if any(lowered.startswith(g) for g in greetings):
        return jsonify({
            "intent": "small_talk",
            "reply": "👋 Hi there! Ask me about attractions, food, or places in Singapore!",
            "entities": {},
            "category": None,
            "region": None
        })

    if any(lowered.startswith(t) for t in thanks):
        return jsonify({
            "intent": "small_talk",
            "reply": "😊 You’re welcome! Have fun exploring Singapore!",
            "entities": {},
            "category": None,
            "region": None
        })

    if any(lowered.startswith(b) for b in goodbyes):
        return jsonify({
            "intent": "small_talk",
            "reply": "👋 Goodbye! Hope you enjoy your trip in Singapore!",
            "entities": {},
            "category": None,
            "region": None
        })

    # 🟡 Process with spaCy model
    doc = nlp(text)

    # Detect category
    detected_category = None
    cat_matches = category_matcher(doc)
    if cat_matches:
        match_id, start, end = cat_matches[0]
        detected_category = nlp.vocab.strings[match_id]

    # Detect region
    detected_region = None
    region_matches = region_matcher(doc)
    if region_matches:
        match_id, start, end = region_matches[0]
        detected_region = doc[start:end].text

    # Predict intent
    intent_scores = doc.cats if doc.cats else {}
    predicted_intent = max(intent_scores, key=intent_scores.get) if intent_scores else "general_query"

    # 🟠 Fallback reply if nothing matches
    if not detected_category and not detected_region and predicted_intent == "general_query":
        return jsonify({
            "intent": "general_query",
            "reply": "🤔 I didn’t quite understand. Try asking me about attractions, food, or regions in Singapore!",
            "entities": {},
            "category": None,
            "region": None
        })

    # Normal response
    response = {
        "intent": predicted_intent,
        "entities": {
            "CATEGORY": detected_category,
            "REGION": detected_region,
        },
        "category": detected_category,
        "region": detected_region,
    }
    return jsonify(response)


# ----------------------------
# Run server
# ----------------------------
if __name__ == "__main__":
    app.run(port=5001, debug=True)
