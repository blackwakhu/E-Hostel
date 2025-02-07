from pathlib import Path

# Build paths inside the project like this: BASE_DIR / 'subdir'.
BASE_DIR = Path(__file__).resolve().parent.parent

SECRET_KEY = 'vja#wnh1j_9&t+umldtk$rq9bx6p42&*@pfr$15ftc0o22o1)c'

# SECURITY WARNING: don't run with debug turned on in production!
DEBUG = True

ALLOWED_HOSTS = []

INSTALLED_APPS = [
    'django.contrib.admin',
    'django.contrib.auth',
    'django.contrib.contenttypes',
    'django.contrib.sessions',
    'django.contrib.messages',
    'django.contrib.staticfiles',
    'hostel',
]

MIDDLEWARE = [
    'django.middleware.security.SecurityMiddleware',
    'django.contrib.sessions.middleware.SessionMiddleware',
    'django.middleware.common.CommonMiddleware',
    'django.middleware.csrf.CsrfViewMiddleware',
    'django.contrib.auth.middleware.AuthenticationMiddleware',  # Ensures authentication works!
    'django.contrib.messages.middleware.MessageMiddleware',
]

ROOT_URLCONF = 'e_hostel.urls'

TEMPLATES = [
    {
        'BACKEND': 'django.template.backends.django.DjangoTemplates',
        'DIRS': [],
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

WSGI_APPLICATION = 'e_hostel.wsgi.application'


DATABASES = {
    # 'default': {
    #     'ENGINE': 'django.db.backends.sqlite3',
    #     'NAME': BASE_DIR / 'db.sqlite3',
    # }
    'default':{
        'ENGINE': 'django.db.backends.postgresql',
        'NAME': 'E_Hostel',
        'USER': 'shibero',
        'PASSWORD': 'wakhu',
        'HOST': 'localhost',
        'PORT': '5432'
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


LANGUAGE_CODE = 'en-us'

TIME_ZONE = 'UTC'

USE_I18N = True

USE_L10N = True

USE_TZ = True

STATIC_URL = '/static/'

AUTH_USER_MODEL = 'hostel.AdminUser'

AUTHENTICATION_BACKENDS = [
    'hostel.authentication.MultiUserAuthBackend',  # Custom multi-user backend
    'django.contrib.auth.backends.ModelBackend',  # Default Django backend
]

SESSION_ENGINE = 'django.contrib.sessions.backends.db'  # Ensure session is stored in DB
SESSION_COOKIE_AGE = 86400  # Set session expiration (optional)

