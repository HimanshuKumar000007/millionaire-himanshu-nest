from datetime import datetime, date

today = date.today()
exam_date = date(2027, 6, 6)
diff = (exam_date - today).days
print(f"Today: {today}")
print(f"Exam Date: {exam_date}")
print(f"Days to Exam: {diff} Days")
