from flask import Flask, request, jsonify
from flask_cors import CORS
import pickle, re

app = Flask(__name__)
CORS(app)

# -------- LOAD PKL FILES --------
def load_pkl(name):
    with open(f"models/{name}", "rb") as f:
        return pickle.load(f)

ncert = load_pkl("ncert_df.pkl")
prelims = load_pkl("prelims_df.pkl")
mains = load_pkl("mains_df.pkl")

ncert_bm25 = load_pkl("ncert_bm25.pkl")
prelims_bm25 = load_pkl("prelims_bm25.pkl")
mains_bm25 = load_pkl("mains_bm25.pkl")

# -------- UTILS --------
def normalize_text(text):
    return re.sub(r"[^a-z]", "", str(text).lower())

def char_ngrams(text, n=3):
    return [text[i:i+n] for i in range(len(text)-n+1)]

IMPORTANT_COLUMNS = [
    "keywords","prelims_keywords","mains_keywords",
    "upsc_subject","mains_subject","topic","sub_topic"
]

def relevance_percentage(row, query):
    q = set(char_ngrams(query))
    matched = set()
    for col in IMPORTANT_COLUMNS:
        if col in row:
            t = normalize_text(row[col])
            matched |= (q & set(char_ngrams(t)))
    return round((len(matched)/len(q))*100,2) if q else 0

def search_dataset(df, bm25, query):
    scores = bm25.get_scores(char_ngrams(query))
    records = df.to_dict("records")

    # ✅ FIX: sort only by score
    ranked = sorted(
        zip(scores, records),
        key=lambda x: x[0],
        reverse=True
    )

    results = []
    for score, row in ranked[:15]:
        rel = relevance_percentage(row, query)
        if rel >= 40:
            row["relevance"] = rel
            row["score"] = round(float(score), 3)
            results.append(row)

        if len(results) == 3:
            break

    return results


# -------- API --------
@app.route("/search", methods=["POST"])
def search():
    query = normalize_text(request.json.get("query",""))

    return jsonify({
        "ncert": search_dataset(ncert, ncert_bm25, query),
        "prelims": search_dataset(prelims, prelims_bm25, query),
        "mains": search_dataset(mains, mains_bm25, query)
    })

if __name__ == "__main__":
    app.run(port=5000)
