from django.contrib import admin
from django.urls import path, include
from posts.api.urls import router as post_router

urlpatterns = [
    path('admin/', admin.site.urls),
    path('api/', include(post_router.urls)),
   
]
