"""
Django settings for bck_django project.

Generated by 'django-admin startproject' using Django 5.0.3.

For more information on this file, see
https://docs.djangoproject.com/en/5.0/topics/settings/

For the full list of settings and their values, see
https://docs.djangoproject.com/en/5.0/ref/settings/
"""

from pathlib import Path

import os

# Build paths inside the project like this: BASE_DIR / 'subdir'.
BASE_DIR = Path(__file__).resolve().parent.parent

# Static files (CSS, JavaScript, Images)
# https://docs.djangoproject.com/en/5.0/howto/static-files/
STATIC_ROOT = os.path.join(BASE_DIR, 'staticfiles')
STATIC_URL = 'static/'

MEDIA_URL = ""
MEDIA_ROOT = os.path.join(BASE_DIR, "")

SECRET_KEY = os.environ.get("SECRET_KEY")

DEBUG = False

ALLOWED_HOSTS = os.environ.get("DJANGO_ALLOWED_HOSTS").split(" ")

ALLOWED_HOSTS_HTTPS = [f"https://" + os.environ.get("DJANGO_ALLOWED_HOSTS")]
ALLOWED_HOSTS_HTTP = [f"http://" + os.environ.get("DJANGO_ALLOWED_HOSTS")]

CSRF_TRUSTED_ORIGINS = ALLOWED_HOSTS_HTTPS + ALLOWED_HOSTS_HTTP
CSRF_ALLOWED_ORIGINS = ALLOWED_HOSTS_HTTPS + ALLOWED_HOSTS_HTTP

print("CSRF_TRUSTED_ORIGINS = ", CSRF_TRUSTED_ORIGINS)
print(" CSRF_ALLOWED_ORIGINS = ", CSRF_ALLOWED_ORIGINS)

SESSION_COOKIE_SECURE = True
CSRF_COOKIE_SECURE = True
CSRF_COOKIE_DOMAIN = None

CORS_ALLOW_ALL_ORIGINS = True

SITE_ID = 1

# Application definition

INSTALLED_APPS = [
	'daphne',
	'channels',
    'django.contrib.admin',
    'django.contrib.auth',
    'django.contrib.contenttypes',
    'django.contrib.sessions',
    'django.contrib.messages',
    'django.contrib.staticfiles',
    'corsheaders',
    'rest_framework',
    'players_manager',
    'allauth',
    'allauth.account',
    'pong_online',
    'games_manager',
	'tournament',
    'friends_manager',
	'pong_IA',

]

MIDDLEWARE = [
    'django.middleware.security.SecurityMiddleware',
    'corsheaders.middleware.CorsMiddleware',
    'django.contrib.sessions.middleware.SessionMiddleware',
    'django.middleware.common.CommonMiddleware',
    'django.middleware.csrf.CsrfViewMiddleware',
    'django.contrib.auth.middleware.AuthenticationMiddleware',
    'django.contrib.messages.middleware.MessageMiddleware',
    'django.middleware.clickjacking.XFrameOptionsMiddleware',
    'django.middleware.common.CommonMiddleware',
    'allauth.account.middleware.AccountMiddleware',
    'bck_django.middleware.LastActivityMiddleware',

]

ROOT_URLCONF = 'bck_django.urls'

TEMPLATES = [
    {
        'BACKEND': 'django.template.backends.django.DjangoTemplates',
        'DIRS': [os.path.join(BASE_DIR, 'templates')],
        'APP_DIRS': True,
        'OPTIONS': {
            'context_processors': [
                'django.template.context_processors.debug',
                'django.template.context_processors.request',
                'django.contrib.auth.context_processors.auth',
                'django.contrib.messages.context_processors.messages',
            ],
        },
    },
]

AUTHENTICATION_BACKENDS = [
    'allauth.account.auth_backends.AuthenticationBackend',
]

WSGI_APPLICATION = 'bck_django.wsgi.application'



DATABASES = {
    "default": {
        "ENGINE": os.environ.get("SQL_ENGINE", "django.db.backends.sqlite3"),
        "NAME": os.environ.get("SQL_DATABASE", BASE_DIR / "db.sqlite3"),
        "USER": os.environ.get("SQL_USER", "user"),
        "PASSWORD": os.environ.get("SQL_PASSWORD", "password"),
        "HOST": os.environ.get("SQL_HOST", "localhost"),
        "PORT": os.environ.get("SQL_PORT", "5432"),
    }
}


AUTH_PASSWORD_VALIDATORS = [
    {
        'NAME': 'django.contrib.auth.password_validation.UserAttributeSimilarityValidator',
    },
    {
        'NAME': 'django.contrib.auth.password_validation.MinimumLengthValidator',
    },
    {
        'NAME': 'django.contrib.auth.password_validation.CommonPasswordValidator',
    },
    {
        'NAME': 'django.contrib.auth.password_validation.NumericPasswordValidator',
    },
]


# Internationalization
LANGUAGE_CODE = 'en-us'
TIME_ZONE = 'UTC'
USE_I18N = True
USE_TZ = True



# print("\n\n", STATIC_ROOT, "\n\n")

# Default primary key field type
# https://docs.djangoproject.com/en/5.0/ref/settings/#default-auto-field
DEFAULT_AUTO_FIELD = 'django.db.models.BigAutoField'




# REST_FRAMEWORK = {
#     'DEFAULT_AUTHENTICATION_CLASSES': [
#         'rest_framework.authentication.TokenAuthentication',
#     ],
#    'DEFAULT_AUTHENTICATION_CLASSES': [
#        'rest_framework.authentication.SessionAuthentication',
#    ],
#    'DEFAULT_PERMISSION_CLASSES': [
#        'rest_framework.permissions.IsAuthenticated',
#    ],
# }

ASGI_APPLICATION = 'bck_django.asgi.application'

CHANNEL_LAYERS = {
    'default': {
        'BACKEND': 'channels.layers.InMemoryChannelLayer'
    }
}

SOCIALACCOUNT_PROVIDERS = {
    '42': {
        'SCOPE': ['profile'],
        'AUTH_PARAMS': {'access_type': 'online'},
        'METHOD': 'oauth2',
        'VERIFIED_EMAIL': False,
        'KEY': 'u-s4t2ud-491a5d4d14d35ef25080f2f05937152abcd6c6f65ab162196a8c5ea26e7e5f65',
        'SECRET': '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',
    }
}

LOGIN_REDIRECT_URL = 'https://localhost'
LOGOUT_REDIRECT_URL = 'https://localhost'

SESSION_EXPIRE_AT_BROWSER_CLOSE = True

TIME_ZONE = 'Europe/Zurich'