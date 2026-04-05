from django.shortcuts import render
from.models import *
from .serialiser import *
from django.contrib.auth import authenticate
from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework import status

@api_view(['POST'])
def admin_login(request):
    username = request.data.get('username')
    password = request.data.get('password')
    
    # This checks the credentials against your superuser
    user = authenticate(username=username, password=password)
    
    if user is not None and user.is_staff:
        return Response({
            'success': True, 
            'message': 'Login successful!',
            'username': user.username
        })
    else:
        return Response({
            'success': False, 
            'message': 'Invalid credentials or not an admin account.'
        }, status=401)


@api_view(['POST'])
def add_category(request):
    name = request.data.get('name')
    category_status = request.data.get('status',"1")

    is_active  =  True if str(category_status) == "1" else False

    category = Category.objects.create(name=name, is_active=is_active)
    serializer = CategorySerializer(category)

    return Response({
    
        'success': True,           
        'message': 'category has been created.',
        'category': serializer.data
    },status = status.HTTP_201_CREATED
    ) 

@api_view(['GET'])
def list_categories(request):
    categories = Category.objects.all().order_by('-id')
    serializer = CategorySerializer(categories,many = True)

    return Response(serializer.data, status = status.HTTP_200_OK)

from django.shortcuts import get_object_or_404

@api_view(['PUT'])
def update_category(request, id):
    category = get_object_or_404(Category, id=id)
    name = request.data.get('name')
    category_status = request.data.get('status',"1")

    is_active  =  True if str(category_status) == "1" else False

    category.name = name
    category.is_active = is_active
    category.save()
    serializer = CategorySerializer(category)

    return Response({
    
        'success': True,           
        'message': 'category has been updated.',
        'category': serializer.data
    },status = status.HTTP_200_OK
    ) 

@api_view(['DELETE'])
def delete_category(request, id):
    category = get_object_or_404(Category, id=id)
    category.delete()

    return Response({
    
        'success': True,           
        'message': 'category has been deleted.'
    },status = status.HTTP_200_OK
    ) 

@api_view(['POST'])
def add_author(request):
    name = request.data.get('name')

    author = Author.objects.create(name=name)
    serializer = AuthorSerializer(author)

    return Response({
    
        'success': True,           
        'message': 'author has been created.',
        'author': serializer.data
    },status = status.HTTP_201_CREATED
    ) 

@api_view(['GET'])
def list_authors(request):
    authors = Author.objects.all().order_by('-id')
    serializer = AuthorSerializer(authors,many = True)

    return Response(serializer.data, status = status.HTTP_200_OK)

from django.shortcuts import get_object_or_404

@api_view(['PUT'])
def update_author(request, id):
    author = get_object_or_404(Author, id=id)
    name = request.data.get('name')
   
    author.name = name
    author.save()
    serializer = AuthorSerializer(author)

    return Response({
    
        'success': True,           
        'message': 'Author  has been updated.',
        'author': serializer.data
    },status = status.HTTP_200_OK
    )


@api_view(['DELETE'])
def delete_author(request, id):
    author = get_object_or_404(Author, id=id)
    author.delete()

    return Response({
    
        'success': True,           
        'message': 'Author has been deleted.'
    },status = status.HTTP_200_OK
    ) 

@api_view(['GET'])
def list_books(request):
    books = Book.objects.all().order_by('-id')
    serializer = BookSerializer(books,many = True)

    return Response(serializer.data, status = status.HTTP_200_OK)


from rest_framework.decorators import parser_classes
from rest_framework.parsers import MultiPartParser, FormParser


@api_view(['POST'])
@parser_classes([MultiPartParser, FormParser])
def add_book(request):
    title = request.data.get('title')
    author_id = request.data.get('author')
    category_id = request.data.get('category')
    isbn = request.data.get('isbn')
    price = request.data.get('price')
    quantity = request.data.get('quantity')
    cover_image = request.FILES.get('cover_image')

    author_obj = get_object_or_404(Author, id=author_id)
    category_obj = get_object_or_404(Category, id=category_id)

    if Book.objects.filter(isbn=isbn).exists():
        return Response({
            'success': False,
            'message': 'A book with this ISBN already exists.'
        }, status=status.HTTP_400_BAD_REQUEST)

    book = Book.objects.create(
        title=title,
        author=author_obj,
        category=category_obj,
        isbn=isbn,
        price=price,
        quantity=quantity,
        cover_image=cover_image
    )
    serializer = BookSerializer(book)

    return Response({
    
        'success': True,           
        'message': 'book has been created.',
        'book': serializer.data
    },status = status.HTTP_201_CREATED
    ) 

@api_view(['PUT'])
@parser_classes([MultiPartParser, FormParser])
def update_book(request, id):
    book = get_object_or_404(Book, id=id)
    title = request.data.get('title')
    author_id = request.data.get('author')
    category_id = request.data.get('category')
   
    price = request.data.get('price')
    quantity = request.data.get('quantity')
    cover_image = request.FILES.get('cover_image')

    author_obj = get_object_or_404(Author, id=author_id)
    category_obj = get_object_or_404(Category, id=category_id)

    book.title = title
    book.author = author_obj
    book.category = category_obj
    book.price = price
    book.quantity = quantity
    if cover_image:
        book.cover_image = cover_image
    book.save()
    
    serializer = BookSerializer(book)

    return Response({
    
        'success': True,           
        'message': 'book has been updated.',
        'book': serializer.data
    },status = status.HTTP_200_OK
    )

@api_view(['DELETE'])
def delete_book(request, id):
    book = get_object_or_404(Book, id=id)
    book.delete()

    return Response({
    
        'success': True,           
        'message': 'book has been deleted.'
    },status = status.HTTP_200_OK
    )

from django.contrib.auth.models import User

@api_view(['POST'])
def change_admin_password(request):
    username = request.data.get('username')
    current_password = request.data.get('current_password')
    new_password = request.data.get('new_password')
    confirm_password = request.data.get('confirm_password')

    if new_password != confirm_password:
        return Response({
            'success': False,
            'message': 'New password and confirm password do not match.'
        }, status=400)
    
    if len(new_password) < 6:
        return Response({
            'success': False,
            'message': 'New password must be at least 6 characters long.'
        }, status=400)

    try:
        user = User.objects.get(username=username, is_staff=True)
    except User.DoesNotExist:
        return Response({
            'success': False,
            'message': 'Admin user not found.'
        }, status=404)
    
    if not user.check_password(current_password):
        return Response({
            'success': False,
            'message': 'Current password is incorrect.'
        }, status=400)
    
    user.set_password(new_password)
    user.save() 
    return Response({
        'success': True,
        'message': 'Password has been changed successfully.'
    }, status=200)

from django.contrib.auth.hashers import make_password

@api_view(['POST'])
def user_signup(request):
    full_name = request.data.get('full_name')
    mobile= request.data.get('mobile')
    email = request.data.get('email')
    password = request.data.get('password')
    confirm_password = request.data.get('confirm_password')

    if password != confirm_password:
        return Response({
            'success': False,
            'message': 'Password and confirm password do not match.'
        }, status=400)
    
    if len(password) < 6:
        return Response({
            'success': False,
            'message': 'Password must be at least 6 characters long.'
        }, status=400)

    #1001, 1002, 1003
    last_student = Student.objects.all().order_by('-id').first()
    if last_student and last_student.student_id.isdigit():                     
        last_id = int(last_student.student_id)  # Extract numeric part
        new_id_int = str(last_id + 1).zfill(4)  # Increment and zero-pad to 4 digits
    else:
        new_id_int = "1001"

    student_id = str(new_id_int)
        
    if Student.objects.filter(email=email).exists():
            return Response({
                'success': False,
                'message': 'A student with this email already exists.'
            }, status=400)  
        
    hashed_password = make_password(password)
    student = Student.objects.create(
            student_id=student_id,
            full_name=full_name,
            mobile=mobile,
            email=email,
            password=hashed_password,
            is_active=True,
        )
    return Response({
            'success': True,
            'message': f'Student {full_name} has been registered successfully.',
            'student_id': student.student_id
        }, status=201)
    
from django.contrib.auth.hashers import check_password
from django.db.models import Q

@api_view(['POST'])
def user_login(request):
    login_id = request.data.get('login_id')
    password = request.data.get('password')

    print("Login ID:", login_id, password)

    try:
        
            # 🔥 CLEAN VERSION
        student = Student.objects.get(
    Q(email=login_id) | Q(student_id=login_id),
            is_active=True
        )

    except Student.DoesNotExist:
        return Response({
            'success': False,
            'message': 'Invalid login ID or account is inactive.'
        }, status=401)

    if not check_password(password, student.password):
        return Response({
            'success': False,
            'message': 'Invalid password.'
        }, status=401)
    
    if not student.is_active:
        return Response({
            'success': False,
            'message': 'Account is inactive. Please contact the administrator.'
        }, status=403)

    return Response({
        'success': True,
        'message': 'Login Successful !',
        'student_id': student.student_id,
        'full_name': student.full_name,
        'email': student.email
    }, status=200)

@api_view(['GET'])
def user_stats(request):    
    student_id = request.query_params.get('student_id')
    # student_id = request.GET.get('student_id')

    try:
        student = Student.objects.get(student_id=student_id)
    except Student.DoesNotExist:
        return Response({
            'success': False,
            'message': 'Student not found.'
        }, status=404)

    total_books = Book.objects.count()
    issued_books = IssuedBook.objects.filter(student=student, is_returned=False).count()
    returned_books = IssuedBook.objects.filter(student=student, is_returned=True).count()

    data = {
        'total_books': total_books,
        'issued_books': issued_books,
        'not_returned': issued_books,
        'not_returned': returned_books
    }

    return Response(data, status=200)

@api_view(['GET'])
def user_list_books(request):
    books = Book.objects.select_related('author', 'category').prefetch_related('issued_records').all().order_by('-id')
    serializer = BookListSerializer(books, many=True)
    return Response(serializer.data, status=status.HTTP_200_OK)

@api_view(["GET","PUT"])
def user_profile(request):
    student_id = request.query_params.get("student_id") or request.data.get("student_id")
    try:
        student = Student.objects.get(student_id=student_id)
    except Student.DoesNotExist:
        return Response(
            {
                "success" : False,
                "message": "Student not Found."
            },
            status = 404
        )
    if request.method == "GET":
        serializers = StudentSerializer(student)
        return Response(serializers.data, status=200)
    
    elif request.method == "PUT":
        serializers = StudentSerializer(student, data= request.data, partial= True)
        if  serializers.is_valid():
            serializers.save()
            return Response(serializers.data, status= 200)
        return Response(serializers.errors, status=400)

@api_view(["POST"])
def user_change_password(request):
    student_id=request.data.get("student_id")
    current_password = request.data.get("current_password")
    new_password = request.data.get("new_password")
    confirm_password = request.data.get("confirm_password")
    if new_password != confirm_password:
            return Response(
            {
                "success":False,
                "message":"New password and confirm password didn't match"
            },
                status=404
                )
            
    if len(new_password)<6:
        return Response(
            {
                "success": False,
                "message": "New password at least 6 characters long."
            },
            status=404

         )
    try:
        student = Student.objects.get(student_id=student_id)
    except Student.DoesNotExist:
        return Response(
            {
                "success": False,
                "message": "Studnet does not exist."
            },
            status=404
    )
    if not check_password(current_password, student.password):
        return Response(
            {
                "success":False,
                "message":"Current password is incorrect."
            },
            status=401
        )
    hashed_new_password = make_password(new_password)
    student.password = hashed_new_password
    student.save()

    return Response(
        {
            "success":True,
            "message":"Password updated successfully."
        },
        status=200
    )

@api_view(["GET"])
def list_registerd_students(request):
    students = Student.objects.all().order_by("-id")
    serializer = StudentSerializer(students,many = True)
    return Response(serializer.data,status=200)

@api_view(["POST"])
def block_student(request,id):
    student = get_object_or_404(Student,id=id)
    student.is_active = False
    student.save()

    return Response(
        {
            "success":False,
            "message": "Student has been blocked.",
            "student": StudentSerializer(student).data
        },
        status=200
    )

@api_view(["POST"])
def activate_student(request,id):
    student = get_object_or_404(Student,id=id)
    student.is_active = True
    student.save()

    return Response(
        {
            "success": True,
            "message": "Studnet has been activated.",
            "student": StudentSerializer(student).data
        },
        status=200
    )

@api_view(["GET"])
def get_student_by_student_id(request):
    student_id = request.query_params.get("student_id") or request.data.get("student_id")
    try:
        student = Student.objects.get(student_id=student_id)
        serializer = StudentSerializer(student)
        return Response({"success": True, "student": serializer.data}, status=200)
    except Student.DoesNotExist:
        return Response(
            {
                "success":False,
                "message": "Student Not Found."
            },
            status=404
        )
    
@api_view(["GET"])
def lookup_book_for_issue(request):
    query = request.query_params.get("query")
    try:
        book= Book.objects.get(isbn__iexact = query)
    except Book.DoesNotExist:
        book = Book.objects.filter(title__icontains= query).first()                   
        if not book:
            return Response(
                {
                    "success": False,
                    "message":"Books Not Found"
                },
                status=404
            )
    serializer = BookSerializer(book)
    return Response({"success": True ,"book":serializer.data}, status=200)

from django.db import transaction   # 🔥 NEW

@api_view(["POST"])
def issue_book(request):
    student_id = request.data.get("student_id")      # line 1
    book_id = request.data.get("book_id")            # line 2
    remarks = request.data.get("remarks", "")        # line 3

    # 🔥 NEW VALIDATION
    if not book_id:
        return Response({"success": False, "message": "Book ID is required"}, status=400)   # line 7

    try:
        student = Student.objects.get(student_id=student_id)   # line 10
    except Student.DoesNotExist:
        return Response({"success": False, "message": "Student Not Found."}, status=404)

    try:
        book = Book.objects.get(id=book_id)   # line 15
    except Book.DoesNotExist:
        return Response({"success": False, "message": "Book Not Found."}, status=404)

    if book.quantity <= 0:
        return Response({"success": False, "message": "Book is currently unavailable for issue."}, status=400)

    # 🔥 IMPORTANT FIX (TRANSACTION + SAFE UPDATE)
    with transaction.atomic():   # 🔥 NEW
        issued_book = IssuedBook.objects.create(
            student=student,
            book=book,
            remark=remarks,
            fine=0,
            is_returned=False
        )

        # 🔥 FIXED UPDATE
        book.quantity -= 1     
        book.save()            

    return Response({
        "success": True,
        "message": f"Book '{book.title}' has been issued to {student.full_name}.",
        "issued_book_id": issued_book.id
    }, status=201)

@api_view(["GET"])
def list_issued_books(request):
    issued_books = IssuedBook.objects.select_related('student', 'book').all().order_by('-id')
    serializer = IssuedBookSerializer(issued_books, many=True)
    return Response(serializer.data, status=200) 

@api_view(["GET"])
def get_issued_book_details(request,id):
    issued_book = get_object_or_404(IssuedBook,id=id)
    serializer = IssuedBookSerializer(issued_book)
    return Response(serializer.data, status=200)

from django.utils import timezone
@api_view(["POST"])
def return_book(request,id):
    issued_book = get_object_or_404(IssuedBook,id=id)
    if issued_book.is_returned:
        return Response({
            "success": False,
            "message": "This book has already been returned."
        }, status=400)
    
    fine = request.data.get("fine", 0) 
    try:
        fine = int(fine)
    except (ValueError, TypeError):
        return Response({
            "success": False,
            "message": "Invalid fine amount."
        }, status=400)
    
    issued_book.is_returned = True
    issued_book.fine = fine
    issued_book.returned_at = timezone.now()
    issued_book.save()

    book = issued_book.book
    book.quantity += 1
    book.is_issued = book.issued_records.filter(is_returned=False).exists()  # Update is_issued based on current issued records 
    book.save(update_fields=['quantity', 'is_issued'])

    return Response({
        "success": True,
        "message": f"Book '{book.title}' has been returned successfully."
    }, status=200)

@api_view(["GET"])
def student_issue_history(request, student_id):
    student = get_object_or_404(Student, student_id=student_id)
    issued_books = IssuedBook.objects.filter(student=student).select_related('student', 'book').order_by("-id")

    issues_serializer = IssuedBookSerializer(issued_books, many=True)
    student_serializer = StudentSerializer(student)
    return Response({
        "student": student_serializer.data,
        "issues": issues_serializer.data
    }, status=200)

@api_view(["GET"])
def admin_dashboard_stats(request):
    total_students = Student.objects.all().count()
    active_students = Student.objects.filter(is_active=True).count()
    blocked_students = Student.objects.filter(is_active=False).count()

    total_books = Book.objects.count()
    available_books = Book.objects.filter(quantity__gt=0).count()
    out_of_stock_books = Book.objects.filter(quantity__lte=0).count()    
    total_issued_books = IssuedBook.objects.filter(is_returned=False).count()

    total_categories = Category.objects.count()
    total_authors = Author.objects.count()

    total_issued = IssuedBook.objects.count()
    currently_issued = IssuedBook.objects.filter(is_returned=False).count()
    returned_counts = IssuedBook.objects.filter(is_returned=True).count()

    data = {
        "total_students": total_students,
        "total_books": total_books,
        "total_issued_books": total_issued_books,
        "active_students": active_students,
        "blocked_students": blocked_students,
        "available_books": available_books,
        "out_of_stock_books": out_of_stock_books,
        "total_categories": total_categories,
        "total_authors": total_authors,
        "total_issued": total_issued,
        "currently_issued": currently_issued,
        "returned_counts": returned_counts
    }

    return Response(data, status=200) 

@api_view(["GET"])
def user_issued_books(request):
    student_id = request.query_params.get("student_id")
    try:
        student = Student.objects.get(student_id=student_id)
    except Student.DoesNotExist:
        return Response({
            "success": False,
            "message": "Student Not Found."
        }, status=404)

    
    issued_books = IssuedBook.objects.filter(student=student).select_related("book", "student").order_by("-id")
    serializer = IssuedBookSerializer(issued_books, many=True)
    returned_books = IssuedBook.objects.filter(student=student, is_returned=True).count()

    return Response(serializer.data, status=200)
    