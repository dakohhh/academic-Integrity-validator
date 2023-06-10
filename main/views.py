import os
import io
from docx import Document
from django.conf import settings
from django.shortcuts import render, redirect
from django.http.response import HttpResponse
from django.http.request import HttpRequest
from utils.extract_file import extract_words
from utils.response import CustomResponse
from utils.similatity_model import AssigmeAnalyZer

# Create your views here.






def join_assignment(request:HttpRequest):

    if request.method == "POST":
        return redirect("submit_assignment")

    return render(request, "index.html")






def submit_assignment(request:HttpRequest):

    if request.method == "POST" and request.FILES.get("file"):

        _file = request.FILES.get("file")

        file_content = _file.read()
        
        file_stream = io.BytesIO(file_content)
        
        assignment = extract_words(file_stream)
        
        assignment = [word.lower() for word in assignment]

        path_approved_ass_1 = os.path.join(settings.BASE_DIR, "documents", "ASSIGNMENT.docx")
        path_approved_ass_2 = os.path.join(settings.BASE_DIR, "documents", "ASSIGNMENT 2.docx")

        approved_ass_1 = Document(path_approved_ass_1)
        approved_ass_2 = Document(path_approved_ass_2)


        with open(path_approved_ass_1, 'rb') as file_1:
            approved_ass_1 = extract_words(file_1)

        with open(path_approved_ass_2, 'rb') as file_2:
            approved_ass_2 = extract_words(file_2)

        approved_assignments = [approved_ass_1, approved_ass_2]


        model = AssigmeAnalyZer(assignment, approved_assignments)

        context = {"is_plagiarized": model.is_assignent_plagirised()}

        return CustomResponse("Analyzed SuccessFull", data=context)



    return render(request, "submit_assignment.html")