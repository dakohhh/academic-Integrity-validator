import nltk
import os
from docx import Document

stopwords_filepath = str(nltk.data.find('corpora/stopwords.zip'))

if not os.path.exists(stopwords_filepath):
    nltk.download('stopwords')
import gensim
from gensim.models import Word2Vec
from sklearn.metrics.pairwise import cosine_similarity
import numpy as np
from nltk.corpus import stopwords




def extract_words_from_docx(file_path):
    doc = Document(file_path)
    words = []
    for paragraph in doc.paragraphs:
        text = paragraph.text.strip()
        if text:
            words.extend(text.split())
    return words

# Example usage
word_document_path = "ESM 302 ASSIGNMENT.docx"
word_list = extract_words_from_docx(word_document_path)


another_assignment = word_list



ass1 = ["I", "like", "apples"]
ass2 = ["I", "like", "bananas"]
ass3 = ["I", "enjoy", "eating", "fruits"]


approved_assigments = [ass1, ass2, ass3]

approved_assigments.append(another_assignment)


model = Word2Vec(approved_assigments, min_count=1)


# Get stopwords
stop_words = set(stopwords.words('english'))

def preprocess(sentence):
    tokens = [word.lower() for word in sentence if word.lower() not in stop_words]
    return tokens


preprocess_another_ass = preprocess(another_assignment)

preprocess_another_ass_vector = np.mean([model.wv[word] for word in preprocess_another_ass if word in model.wv], axis=0)


for i in range(len(approved_assigments)- 1):

    print(approved_assigments[i])
    print()

    approved_ass = preprocess(approved_assigments[i])


    # Convert sentences to vectors
    approved_ass_vector = np.mean([model.wv[word] for word in approved_ass if word in model.wv], axis=0)

    # Calculate cosine similarity
    similarity_score = cosine_similarity(approved_ass_vector.reshape(1, -1), preprocess_another_ass_vector.reshape(1, -1))[0][0]

    print(f"Similarity score: {similarity_score * 100}")

