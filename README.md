# crypto-currency-analysis

## demo
- [video](https://youtu.be/ycg9G2Yi_Jc)

## requirements
- ``` Ability to setup the data in Relational Database or Nosql Database ```
  - data is inserted from csv to mysql by [python](./clean_and_insert.py)
- ``` Ability to retrieve data from a database or by calling an API. ```
  - data is retrived from database to backend (flask) by ```flaskext.mysql```
  - i.e., substitute parameter in query template
- ``` Ability to process the data or build efficient computational logic using a library/framework best suited for the task OR just using the inherent language features. ```
  - react.js+flask+mysql
  - data communication is through ReSTful API
    - ```
      curl -X GET http://127.0.0.1:5000/test?today=2019-11-01
            [{"1m":null,"24h":0.00729933,"24h_volume":24324691031.0000,"7d":-0.06483031,"Coin":"bitcoin","Market_Cap":166928044164.0000,"Price":9261.1000},{"1m":null,"24h":-0.01880558,"24h_volume":2375427805.0000,"7d":-0.07154116,"Coin":"bitcoin-cash","Market_Cap":5049556631.0000,"Price":279.1400},{"1m":null,"24h":0.00150075,"24h_volume":198377285.0000,"7d":null,"Coin":"bnb","Market_Cap":3114078497.0000,"Price":20.0200},{"1m":null,"24h":0.01682692,"24h_volume":60880837.0000,"7d":-0.02600473,"Coin":"cardano","Market_Cap":1097888791.0000,"Price":0.0423},{"1m":null,"24h":0.02134146,"24h_volume":2155169872.0000,"7d":null,"Coin":"eos","Market_Cap":3147694261.0000,"Price":3.3500},{"1m":null,"24h":0.00092492,"24h_volume":9145611130.0000,"7d":-0.01331739,"Coin":"ethereum","Market_Cap":19940014311.0000,"Price":183.9700},{"1m":null,"24h":-0.00289362,"24h_volume":3425154368.0000,"7d":-0.02799590,"Coin":"litecoin","Market_Cap":3725245520.0000,"Price":58.5800},{"1m":null,"24h":0.06134969,"24h_volume":412594573.0000,"7d":-0.07803468,"Coin":"stellar","Market_Cap":1388418168.0000,"Price":0.0692},{"1m":null,"24h":-0.00990099,"24h_volume":27864589885.0000,"7d":0E-8,"Coin":"tether","Market_Cap":4124890871.0000,"Price":1.0000},{"1m":null,"24h":-0.01304103,"24h_volume":12684201.0000,"7d":-0.04909443,"Coin":"tezos","Market_Cap":579768933.0000,"Price":0.8779},{"1m":null,"24h":-0.01282051,"24h_volume":1572251058.0000,"7d":0.01913876,"Coin":"xrp","Market_Cap":12656190134.0000,"Price":0.2926}]
      ```
- ``` Ability to display the processed data in the required format using a suitable frontend library/framework. ```
  - react.js
- ``` Demonstrate TDD approach was taken during the development. ```