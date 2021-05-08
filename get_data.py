# -*- coding: utf-8 -*-
"""
Created on Fri May  7 20:46:56 2021

@author: yjw98
"""
import requests
import json

#Params
gid=888
num=5

d={
    'gid':gid,
    'num':num
}

re=requests.get("https://www.bupt404.cn/location/get_data.php", params=d)
# re=requests.get("https://www.bupt404.cn/location/get_data.php") # 获取全部数据

data = json.loads(re.text) # json转换为python对象

print(data['status']) # 状态码

print(data['data'][4]) # 第四组数据

print(data['data'][0]['gid']) # 第一组数据gid键值

for i in data['data'][0]:
    print(i) # 第一组数据的key
    print(data['data'][0][i]) #第一组数据value
