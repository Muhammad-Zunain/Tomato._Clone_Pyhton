from django.shortcuts import render,redirect
from django.shortcuts import HttpResponseRedirect   
from .models import Product,food_item, user
from django.http import JsonResponse
from django.core import serializers
import json

# from django
# Create your views here.
def home(request):
    menu_item = Product.objects.all()
    food_items = food_item.objects.all()

    if redirect:
        print("acc")
    # customer = user.objects.all()
    
    # customer = user.objects.filter(user_account='login')
    # print(customer[0].user_account)
    # if customer != None :
    #     print(customer)
    #     return render(request,"index.html",{"menu_item": menu_item, "food_items": food_items})

    return render(request,"index.html",{"menu_item": menu_item, "food_items": food_items})
            


def menuItem(request):
    
    food_items = food_item.objects.all()
    if request.method == 'GET':
        name = request.GET.get('name')

        if name != None and name != "None":
            food_items = food_item.objects.filter(food_item_category=name)
            serialized_data = serializers.serialize('json', food_items)
            return JsonResponse({"food_items": serialized_data}, safe=False)
        else:
            return JsonResponse({"msg": "success"})

def about(request):
    return render(request,"about.html")

def contact(request):
    return render(request,"contact.html")

def login(request):    
    return render(request,"login.html")

def signup(request):

    if request.method == 'POST':
        username = request.POST.get('userName')
        password = request.POST.get('pswd')
        email = request.POST.get('email')
        check_box  = request.POST.get('check')
        print(username, password, email, check_box)
        if check_box != 'off'and username != '' and email != '' and password != '':
            # User = user(user_name=username,user_email=email,user_password=password,user_account='login')
            # print(User)
            # User.save()
            print(username, email, password)
            return redirect('home',{'user':username, 'account_type': 'login'})
        else:
            return redirect('signUp')


    return render(request,"signup.html")

def cart(request):


    return render(request,"cart.html")