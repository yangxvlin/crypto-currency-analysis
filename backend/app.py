from flask import Flask
app = Flask(__name__)

from flaskext.mysql import MySQL

mysql = MySQL()
mysql.init_app(app)

from flask import jsonify

@app.route('/test', methods=['GET', 'POST'])
def index():
    cur = mysql.connect().cursor()

    query = """select TODAY.Currency as 'Coin', 
                TODAY.close as 'Price', 
                (TODAY.close - Today.open) / Today.open as '24h',
                (LAST_WEEK.close - Today.close) / Today.close as '7d',
                (LAST_MONTH.close - Today.close) / Today.close as '1m',
                TODAY.Volume - YESTERDAY.Volume as '24h_volume', 
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
            on LAST_MONTH.Currency = TODAY.Currency;""".format("2019-11-01", "2019-11-01", "2019-11-01", "2019-11-01")
    cur.execute(query)
    result = cur.fetchall()

    rresult = {}

    for row in result:
        for i, item in enumerate(row):
            if i == 0:
                rresult[item] = {}
            elif

    print(result)
    cur.close()
    return jsonify(result)

if __name__ == '__main__':
    app.run()