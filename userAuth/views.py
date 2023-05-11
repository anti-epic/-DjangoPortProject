from django.views.decorators.csrf import csrf_exempt
from django.contrib.auth import authenticate, login as auth_login
from django.contrib.auth.models import User
from django.db import IntegrityError
from django.db.models import Q
from django.http import JsonResponse
import json
from django.contrib.auth import logout
from django.views.decorators.csrf import ensure_csrf_cookie

# Create your views here.
@ensure_csrf_cookie
def get_csrf_token(request):
    return JsonResponse({"detail": "CSRF cookie set"})


def login_view(request):
    if request.method == 'POST':

        data = json.loads(request.body)
        email_or_username = data.get('emailOrUsername')
        password = data.get('password')
        # check if user exists
        try:
            user = User.objects.get(Q(email=email_or_username) | Q(username=email_or_username))
        except User.DoesNotExist:
            data = {'errors': {'credential': 'User does not exist'}}
            return JsonResponse(data, status=400)

        # authenticate user
        if user.check_password(password):
            # user is authenticated, login and redirect to home page
            auth_login(request, user)
            return JsonResponse({'email': user.email, 'username': user.username})
        else:
            data = JsonResponse({'errors': ['Invalid combination']}, status=400)
            return data

    # handle GET request
    return JsonResponse({'error': 'Invalid method'}, status=400)




@csrf_exempt
def signup_view(request):
    if request.method == 'POST':
        data = json.loads(request.body)
        print(data)
        username = data.get('username')
        email = data.get('email')
        password = data.get('password')
        confirm_password = data.get('confirmPassword')

        # check if passwords match
        if password != confirm_password:
            return JsonResponse({'error': 'Passwords do not match.'}, status=400)

        # # check if user with email or username already exists
        # if User.objects.filter(email=email).exists() or User.objects.filter(username=username).exists():
        #     return JsonResponse({'error': 'User with this email or username already exists.'}, status=400)
        try:
            print('in here')
            user = User.objects.create_user(username=username, email=email, password=password)
            print(user)
            user.save()
            return JsonResponse({'username': user.username, 'email': user.email})
        except IntegrityError as e:
            return JsonResponse({'error': 'User with this email or username already exists.'}, status=400)
    # handle GET request
    return JsonResponse({'error': 'Invalid method'}, status=400)




def logout_view(request):
    logout(request)
    return JsonResponse({'success': True})
