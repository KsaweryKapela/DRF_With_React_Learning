from django.db import models
from django.contrib.auth.models import AbstractBaseUser, BaseUserManager


class MyAccountManager(BaseUserManager):

    def create_user(self, email, username, code=None, password=None, validated=False):

        if not validated:
            from DRF_Base.validators import UserRegistrationValidation

            validation = UserRegistrationValidation(email, username, password)
            if not validation.validate_models():
                return False

        user = User(
            email=self.normalize_email(email),
            username=username,
            email_validation_code=code)

        user.set_password(password)
        user.save(using=self._db)
        return user

    def create_superuser(self, email, username, password):
        user = self.create_user(
            email=self.normalize_email(email),
            password=password,
            username=username
        )

        user.is_admin = True
        user.is_staff = True
        user.is_superuser = True
        user.save(using=self._db)


class User(AbstractBaseUser):
    username = models.CharField(max_length=255, unique=True)
    email = models.EmailField(max_length=255, verbose_name='email', unique=True)
    date_joined = models.DateTimeField(verbose_name='date joined', auto_now_add=True)
    last_login = models.DateTimeField(verbose_name='last login', auto_now=True)
    is_admin = models.BooleanField(default=False)
    is_active = models.BooleanField(default=True)
    is_staff = models.BooleanField(default=False)
    is_superuser = models.BooleanField(default=False)
    is_validated = models.BooleanField(default=False)
    email_validation_code = models.CharField(max_length=200, default='None_yet')

    USERNAME_FIELD = 'email'
    REQUIRED_FIELDS = ['username']

    objects = MyAccountManager()

    def __str__(self):
        return self.username

    def has_perm(self, perm, obj=None):
        return self.is_admin

    def has_module_perms(self, app_label):
        return True


class TechStack(models.Model):
    # user = models.ForeignKey(User, related_name='tech', on_delete=models.CASCADE, default=1)
    name = models.CharField(max_length=200)
    img_src = models.CharField(max_length=500, default='')

    def __str__(self):
        return self.name


class Task(models.Model):
    language = models.ForeignKey(TechStack, related_name='tasks', on_delete=models.CASCADE)
    name = models.CharField(max_length=200)
    description = models.CharField(max_length=1000)
    done = models.BooleanField()

    def __str__(self):
        return self.name


