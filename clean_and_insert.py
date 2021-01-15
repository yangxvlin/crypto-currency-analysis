# clean the data and insert into db in a pipline model
import csv
import datetime
import mysql.connector


mycursor = mydb.cursor()

vals = []
with open('crypto_historical_data.csv') as csvfile:
    file = csv.reader(csvfile)
    for i, row in enumerate(file):
        if i > 0:
        # print(', '.join(row))
            vals.append([])
            for j in range(0, 8):
                if j == 0:
                    vals[-1].append(row[j])
                elif j == 1:
                    date_time_obj = datetime.datetime.strptime(row[j], '%b %d, %Y')
                    vals[-1].append(str(date_time_obj.date()))
                elif j < 6:
                    vals[-1].append(float(row[j].replace(',', '')))
                else:
                    vals[-1].append(int(row[j].replace(',', '')))
# print(vals)
sql = "INSERT INTO main (Currency,Date,Open,High,Low,Close,Volume,Market_Cap) VALUES (%s, %s, %s, %s, %s, %s, %s, %s)"
print(sql)

mycursor.executemany(sql, vals)

mydb.commit()

print(mycursor.rowcount, "was inserted.")