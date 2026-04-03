from django.db import models

# Create your models here.

class TimestampedModel(models.Model):
    created_at = models.DateTimeField( auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    class Meta:
        abstract = True


class Category(TimestampedModel):
    name = models.CharField(max_length=200)
    is_active = models.BooleanField(default=True)

    def __str__(self):
        return self.name
    
class Author(TimestampedModel):
    name = models.CharField(max_length=200)

    def __str__(self):
        return self.name
    
class Student(TimestampedModel):
    student_id = models.CharField(max_length=100, unique = True)
    full_name = models.CharField(max_length=100)
    email = models.EmailField(max_length=100, unique=True)
    mobile = models.CharField(max_length=15) 
    password = models.CharField(max_length=100)
    is_active = models.BooleanField(default=True)


    def __str__(self):
        return f"{self.student_id} - {self.full_name}"
    

class Book(TimestampedModel):
    title = models.CharField(max_length=100)
    category= models.ForeignKey(Category,on_delete=models.PROTECT)
    author = models.ForeignKey(Author,on_delete=models.PROTECT)
    isbn = models.CharField(max_length=25, unique=True, blank=True) 
    price = models.DecimalField(max_digits=10, decimal_places=2)
    cover_image = models.ImageField(upload_to = 'book_covers/', null=True, blank=True)
    is_issued = models.BooleanField(default=False)
    quantity= models.PositiveIntegerField(default=0)

    def __str__(self):
        return f"{self.title} - {self.author}"

class IssuedBook(TimestampedModel):
    book = models.ForeignKey(Book,on_delete=models.CASCADE, related_name='issued_records')
    student = models.ForeignKey(Student,on_delete=models.PROTECT)
    issued_at = models.DateTimeField(auto_now_add=True)
    returned_at = models.DateTimeField(null=True , blank=True) 
    is_returned = models.BooleanField(default=False)
    fine = models.PositiveIntegerField(default=0)
    remark = models.TextField(blank=True)
    

    def __str__(self):
        return f"{self.book.title} - {self.student.student_id}"