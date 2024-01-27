from django.http import JsonResponse

def movie_recommend(request):
    if request.method == 'POST':
        # Handle POST request
        return JsonResponse({"details":"hiiiii"})
    else:
        # Handle other HTTP methods (e.g., GET)
        return JsonResponse({"error": "Method not allowed"}, status=405)
