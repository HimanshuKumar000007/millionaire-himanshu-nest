import sys
import subprocess

try:
    import pytesseract
    print("pytesseract is installed")
except ImportError:
    print("pytesseract is NOT installed")

try:
    import easyocr
    print("easyocr is installed")
except ImportError:
    print("easyocr is NOT installed")

try:
    import pypdf
    print("pypdf is installed")
except ImportError:
    print("pypdf is NOT installed")
