import os
import nltk
import numpy as np
from typing import List
from gensim.models import Word2Vec
from sklearn.metrics.pairwise import cosine_similarity
stopwords_filepath = str(nltk.data.find('corpora/stopwords.zip'))

if not os.path.exists(stopwords_filepath):
    nltk.download('stopwords')

from nltk.corpus import stopwords




class AssigmeAnalyZer():

    def __init__(self, assignment:List[str], approved_assignments:List) -> None:

        self.assignment = assignment

        self.approved_assignments = approved_assignments

        self.approved_assignments.append(assignment)


        self.model = Word2Vec(self.approved_assignments, min_count=1)


        self.stop_words = set(stopwords.words('english'))

    def preprocess(self, assignment:List[str]) -> List[str]:

        tokens = [word.lower() for word in assignment if word.lower() not in self.stop_words]
        return tokens
        

    def create_vector(self, assignment):

        vector = np.mean([self.model.wv[word] for word in self.preprocess(assignment) if word in self.model.wv], axis=0)

        return vector
    

    def is_assignent_plagirised(self, threshold=70) -> bool:
        for i in range(len(self.approved_assignments)- 1):


            approved_ass_vector = self.create_vector(self.approved_assignments[i])

            similarity_score = cosine_similarity(approved_ass_vector.reshape(1, -1), self.create_vector(self.assignment).reshape(1, -1))[0][0]

            print(similarity_score * 100)

            if similarity_score * 100 > threshold:
                return True

        return False




