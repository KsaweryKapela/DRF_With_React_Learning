import re
from DRF_Base.models import User, MyAccountManager
from django.core.mail import EmailMessage
from django.conf import settings
import random
import string


def generate_code():
    characters = string.ascii_letters + string.digits
    code = ''.join(random.choice(characters) for i in range(80))
    return code


class SendEmail:

    def __init__(self, username, email, code):
        self.code = code
        self.username = username
        self.email = email
        self.link = f'http://127.0.0.1:8000/confirm-email/{self.code}'

    def save_code(self):
        user = User.objects.get(username=self.username)
        user.email_validation_code = self.code
        user.save()

    def send(self):
        send_mail = EmailMessage(
            f'Confirm your password, {self.username}',
            f'Click on the link to log in and confirm your account {self.link}',
            settings.EMAIL_HOST_USER,
            [self.email]
        )

        send_mail.send()


class UserRegistrationValidation:

    def __init__(self, username, email, password, password2=None):
        self.username = username
        self.email = email
        self.password = password
        self.password2 = password2
        self.validation_dict = {}

        self.username_pattern = re.compile(r"^(?=.{4,15}$)(?![_.])(?!.*[_.]{2})[a-zA-Z0-9._]+(?<![_.])$")
        self.password_pattern = re.compile(r"^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$")
        self.email_pattern = re.compile(r"^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$")

    def validate_username(self):
        if self.username == '':
            self.validation_dict['username'] = 'Username is required'

        elif len(User.objects.filter(username=self.username)) != 0:
            self.validation_dict['username'] = 'This username is already used.'

        elif not re.fullmatch(self.username_pattern, self.username):
            self.validation_dict['username'] = 'Invalid username'

    def validate_email(self):
        if self.email == '':
            self.validation_dict['email'] = 'Email is required'

        elif len(User.objects.filter(email=self.email)) != 0:
            self.validation_dict['email'] = 'This email is already used.'

        elif not re.fullmatch(self.email_pattern, self.email):
            self.validation_dict['email'] = 'Invalid email'

    def validate_password(self):
        if self.password == '':
            self.validation_dict['password'] = 'Password is required'

        elif not re.fullmatch(self.password_pattern, self.password):
            self.validation_dict['password'] = 'Invalid password. Must contain capital letter, a number and at least 8 ' \
                                        'characters '

    def validate_password2(self):
        if self.password2 == '':
            self.validation_dict['password2'] = 'Confirmation password is required'

        elif self.password != self.password2:
            self.validation_dict['password2'] = 'Passwords do not match'

    def validate_and_register(self):
        self.validate_username()
        self.validate_email()
        self.validate_password()
        self.validate_password2()

        if self.validation_dict == {}:
            code = generate_code()
            manager = MyAccountManager()
            manager.create_user(email=self.email,
                                username=self.username,
                                password=self.password,
                                code=code,
                                validated=True)
            self.validation_dict['validated'] = True
            mail = SendEmail(self.username, self.email, code)
            mail.send()

        return self.validation_dict

    def validate_models(self):
        self.validate_username()
        self.validate_email()
        self.validate_password()

        if self.validation_dict == {}:
            return True
