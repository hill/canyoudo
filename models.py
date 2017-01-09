from peewee import *

db = SqliteDatabase('test.db')

class Meeting(Model):

    open_code = CharField()
    passcode = CharField()
    email = CharField(default="")
    selectedDates = TextField(default="")
    group_times = TextField(default="")

    class Meta:
        database = db

def init():
	db.connect()
	db.create_tables([Meeting], safe=True)
	db.close()
