import re
from DRF_Base.models import User, MyAccountManager


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
            manager = MyAccountManager()
            manager.create_user(email=self.email,
                                username=self.username,
                                password=self.password,
                                validated=True)
            self.validation_dict['validated'] = True
        return self.validation_dict

    def validate_models(self):
        self.validate_username()
        self.validate_email()
        self.validate_password()

        if self.validation_dict == {}:
            return True

        return False
        