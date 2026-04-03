from django import views
from django.contrib import admin
from django.urls import path ,include
from django.conf import settings

from .views import *
from .views import user_change_password
urlpatterns = [
     path('admin/login/', admin_login),

    path('admin/category/add/', add_category),
    path('categories/', list_categories),
    path('update_category/<int:id>/', update_category),
    path('delete_category/<int:id>/', delete_category),

    path('admin/author/add/', add_author),
    path('authors/', list_authors),
    path('update_author/<int:id>/', update_author),
    path('delete_author/<int:id>/', delete_author),

    path('admin/books/add/', add_book),
    path('books/', list_books),
    path('update_book/<int:id>/', update_book),
    path('delete_book/<int:id>/', delete_book),
    path('change_admin_password/', change_admin_password),


    path ('user_signup/', user_signup),
    path('user_login/', user_login),
    path('user_stats/', user_stats),
    path('user/books/',user_list_books),
    path('user/profile/',user_profile),
    path('user/change_password/',user_change_password),
    
    path("admin/students/",list_registerd_students),
    path("admin/block_student/<int:id>/",block_student),
    path("admin/activate_student/<int:id>/",activate_student),

    path('students/by_id/',get_student_by_student_id),
    path('books/lookup/',lookup_book_for_issue),
    path('issue_book/',issue_book),
    path('admin/issued-books/',list_issued_books),
    path('admin/issued-books/<int:id>/',get_issued_book_details),
    path('admin/return_book/<int:id>/',return_book),
    path('admin/student-history/<str:student_id>/', student_issue_history),

    path('admin/dashboard-stats/', admin_dashboard_stats),
    path('user/issued-books/', user_issued_books),
    
    

    
]