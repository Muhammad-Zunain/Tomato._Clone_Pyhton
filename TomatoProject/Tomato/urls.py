from django.urls import path
from . import views

urlpatterns = [
    path('',views.home,name='home'),
    path('about',views.about,name='about'),
    path('contact',views.contact,name='contact'),
    path('login',views.login,name='logIn'),
    path('signup',views.signup,name='signUp'),
    path('menuItem',views.menuItem,name='menuItem'),   
    path('cart',views.cart,name='cart'),
]
