from django.shortcuts import render, redirect
from django.http.response import HttpResponse
from django.http.request import HttpRequest

# Create your views here.






def join_assignment(request:HttpRequest):

    if request.method == "POST":
        return redirect("submit_assignment")

    return render(request, "index.html")






def submit_assignment(request:HttpRequest):

    if request.method == "POST" and request.FILES['file']:
        file = request.FILES['file']

        ass = request.POST.get("ass")

        print(file)
        print()
        print(ass)

    return render(request, "submit_assignment.html")