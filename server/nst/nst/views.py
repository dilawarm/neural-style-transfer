from django.http import HttpResponse

def homepage(request):
    return HttpResponse("<h1>Server :)</h1>")