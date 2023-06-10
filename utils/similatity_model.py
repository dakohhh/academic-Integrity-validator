import numpy as np
from typing import List
from gensim.models import Word2Vec
from sklearn.metrics.pairwise import cosine_similarity



stop_words = [
    'i', 'me', 'my', 'myself', 'we', 'our', 'ours', 'ourselves', 'you', 'your', 'yours', 'yourself', 'yourselves',
    'he', 'him', 'his', 'himself', 'she', 'her', 'hers', 'herself', 'it', 'its', 'itself', 'they', 'them', 'their',
    'theirs', 'themselves', 'what', 'which', 'who', 'whom', 'this', 'that', 'these', 'those', 'am', 'is', 'are', 'was',
    'were', 'be', 'been', 'being', 'have', 'has', 'had', 'having', 'do', 'does', 'did', 'doing', 'a', 'an', 'the',
    'and', 'but', 'if', 'or', 'because', 'as', 'until', 'while', 'of', 'at', 'by', 'for', 'with', 'about', 'against',
    'between', 'into', 'through', 'during', 'before', 'after', 'above', 'below', 'to', 'from', 'up', 'down', 'in', 'out',
    'on', 'off', 'over', 'under', 'again', 'further', 'then', 'once', 'here', 'there', 'when', 'where', 'why', 'how',
    'all', 'any', 'both', 'each', 'few', 'more', 'most', 'other', 'some', 'such', 'no', 'nor', 'not', 'only', 'own',
    'same', 'so', 'than', 'too', 'very', 's', 't', 'can', 'will', 'just', 'don', 'should', 'now'
]





class AssigmeAnalyZer():

    def __init__(self, assignment:List[str], approved_assignments:List) -> None:

        self.assignment = assignment

        self.approved_assignments = approved_assignments

        self.approved_assignments.append(assignment)


        self.model = Word2Vec(self.approved_assignments, min_count=1)


        self.stop_words = set(stop_words)

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




