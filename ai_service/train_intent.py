import spacy
from spacy.training.example import Example
import os

# ----------------------------
# Training Data
# ----------------------------
TRAIN_DATA = [
    ("What are some attractions in Singapore?", {"cats": {"general_attractions": 1.0, "general_query": 0.0, "category_search": 0.0}}),
    ("Show me temples in Chinatown", {"cats": {"category_search": 1.0, "general_query": 0.0, "general_attractions": 0.0}}),
    ("Tell me about Marina Bay Sands", {"cats": {"general_query": 1.0, "category_search": 0.0, "general_attractions": 0.0}}),
    ("Find me parks near Orchard", {"cats": {"category_search": 1.0, "general_query": 0.0, "general_attractions": 0.0}}),
    ("Any famous places to visit?", {"cats": {"general_attractions": 1.0, "general_query": 0.0, "category_search": 0.0}}),
    ("Where can I go shopping in Bugis?", {"cats": {"category_search": 1.0, "general_query": 0.0, "general_attractions": 0.0}}),
]

# ----------------------------
# Setup NLP pipeline
# ----------------------------
nlp = spacy.blank("en")  # start with a blank English pipeline

# Add text categorizer to pipeline
if "textcat" not in nlp.pipe_names:
    textcat = nlp.add_pipe("textcat", last=True)
    textcat.add_label("general_query")
    textcat.add_label("category_search")
    textcat.add_label("general_attractions")
else:
    textcat = nlp.get_pipe("textcat")

# ----------------------------
# Train the model
# ----------------------------
optimizer = nlp.begin_training()
for i in range(20):  # train for 20 iterations (increase for more data)
    losses = {}
    for text, annotations in TRAIN_DATA:
        doc = nlp.make_doc(text)
        example = Example.from_dict(doc, annotations)
        nlp.update([example], sgd=optimizer, drop=0.3, losses=losses)
    if i % 5 == 0:
        print(f"Iteration {i}, Losses: {losses}")

# ----------------------------
# Save the trained model
# ----------------------------
save_dir = os.path.join("models", "intent_model")
os.makedirs(save_dir, exist_ok=True)  # make sure folder exists

nlp.to_disk(save_dir)
print(f"✅ Training complete. Model saved to {save_dir}")
