from django import forms
from .models import CustomUser
from django.contrib.auth.forms import UserCreationForm

class CustomUserCreationForm(UserCreationForm):
    username = forms.CharField(
        label="Логін", 
        widget= forms.TextInput(attrs={'class': 'form-control', 'required': True})
        )
    email = forms.EmailField(
        label="Електронна пошта",
        required=True,
        widget= forms.EmailInput(attrs={'class': 'form-control', 'required': True})
        )
    first_name = forms.CharField(
        label="Ім'я",
        required=True,
        widget= forms.TextInput(attrs={'class': 'form-control', 'required': True})
        )
    last_name = forms.CharField(
        label="Прізвище",
        required=True,
        widget= forms.TextInput(attrs={'class': 'form-control', 'required': True})
        )
    phone = forms.CharField(
        label="Номер телефону",
        required=True,
        widget= forms.TextInput(attrs={'class': 'form-control', 'required': True})
        )
    image = forms.ImageField(
        label="Зображення",
        required=True,
        widget= forms.FileInput(attrs={'class': 'form-control', 'required': True, 'accept': 'image/*'})
        )
    password1 = forms.CharField(
        label="Пароль",
        widget=forms.PasswordInput(attrs={'class': 'form-control', 'required': True})
        )
    password2 = forms.CharField(
        label="Повторіть пароль", 
        widget=forms.PasswordInput(attrs={'class': 'form-control', 'required': True})
        )

    class Meta:
        model = CustomUser
        fields = ('username', 'email', 'first_name', 'last_name', 'phone', 'image', 'password1', 'password2')

    def clean_email(self):
        email = self.cleaned_data.get('email')
        if CustomUser.objects.filter(email=email).exists():
            raise forms.ValidationError("Ця електронна пошта вже зареєстрована")
        return email