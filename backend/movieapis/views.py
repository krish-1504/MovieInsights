from django.http import JsonResponse
import requests

def generate_image_url(movie_id):
    url = "https://api.themoviedb.org/3/movie/"+str(movie_id)+"/images"
    headers = {
        "accept": "application/json",
        "Authorization": "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIwZjE3ZDIzM2NmYjczYzJjNjE5ZmNlMTRlNDVlNmFjNyIsInN1YiI6IjY1YjIyYTZhMGYyZmJkMDE4NDY3MWJjZiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.6sajWj6B4p6qwRPcdo4Kn9EIshomz_V5f4BVoCNnI-Q"
    }

    response = requests.get(url, headers=headers)
    data = response.json()
    
    # Remove leading slash from file paths and prepend https
    file_paths = [f"https://image.tmdb.org/t/p/original{backdrop['file_path']}" for backdrop in data.get("backdrops", [])]

    return JsonResponse({"image_urls": file_paths[:5]})


def generate_video_url(movie_id):
    url = "https://api.themoviedb.org/3/movie/"+str(movie_id)+"/videos?language=en-US"
    headers = {
        "accept": "application/json",
        "Authorization": "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIwZjE3ZDIzM2NmYjczYzJjNjE5ZmNlMTRlNDVlNmFjNyIsInN1YiI6IjY1YjIyYTZhMGYyZmJkMDE4NDY3MWJjZiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.6sajWj6B4p6qwRPcdo4Kn9EIshomz_V5f4BVoCNnI-Q"
    }


    response = requests.get(url, headers=headers)
    data = response.json()
    youtube_video_keys = [video["key"] for video in data.get("results", []) if video["site"] == "YouTube"]
    youtube_urls = [f"https://www.youtube.com/watch?v={key}" for key in youtube_video_keys]


    return JsonResponse({"video_urls": youtube_urls[:5]})

def movie_img(request, movie_id):
    if request.method == "GET":
        return generate_image_url(movie_id)

def movie_vid(request, movie_id):
    if request.method == "GET":
        return generate_video_url(movie_id)
