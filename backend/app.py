from flask import Flask
app = Flask(__name__)
from flask_cors import CORS, cross_origin
cors = CORS(app)
app.config['CORS_HEADERS'] = 'Content-Type'

from flaskext.mysql import MySQL
app.config['MYSQL_DATABASE_HOST'] = 'localhost'
app.config['MYSQL_DATABASE_USER'] = 'root'

app.config['MYSQL_DATABASE_DB'] = 'crypto_currency'

mysql = MySQL()
mysql.init_app(app)

from flask import request, jsonify

@app.route('/test', methods=['GET', 'POST'])
def index():
    today_param = request.args.get('today')

    cur = mysql.connect().cursor()

    query = """select TODAY.Currency as 'Coin', 
                TODAY.close as 'Price', 
                (TODAY.close - Today.open) / Today.open as '24h',
                (LAST_WEEK.close - Today.close) / Today.close as '7d',
                (LAST_MONTH.close - Today.close) / Today.close as '1m',
                TODAY.Volume as '24h_volume', 
                TODAY.Market_Cap from
            (select today.Currency, today.Volume, today.Market_Cap, today.close, today.open from main today
                where Date = DATE(\"{}\") ) as TODAY
            INNER JOIN 
            (select yesterday.Currency, yesterday.Volume from main yesterday
                        where Date = DATE(\"{}\") - INTERVAL 1 DAY) as YESTERDAY
            on YESTERDAY.Currency = TODAY.Currency
            LEFT JOIN 
            (select last_week.Currency, last_week.close from main last_week
                        where Date = DATE(\"{}\") - INTERVAL 7 DAY) as LAST_WEEK
            on LAST_WEEK.Currency = TODAY.Currency
            LEFT JOIN 
            (select last_month.Currency, last_month.close from main last_month
                        where Date = DATE(\"{}\") - INTERVAL 30 DAY) as LAST_MONTH
            on LAST_MONTH.Currency = TODAY.Currency;""".format(today_param, today_param, today_param, today_param)
    cur.execute(query)
    result = cur.fetchall()
    cur.close()

    rresult = []

    for row in result:
        rresult.append({"Coin":       row[0],
                        "Price":      row[1],
                        "24h":        row[2],
                        "7d":         row[3],
                        "1m":         row[4],
                        "24h_volume": row[5], 
                        "Market_Cap": row[6],
        })

    return jsonify(rresult), 200

if __name__ == '__main__':
    app.run()