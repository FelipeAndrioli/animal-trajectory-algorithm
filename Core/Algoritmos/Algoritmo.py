#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""
Created on Sun Jul 21 16:38:38 2019

@author: felipe
"""

import psycopg2

def getData(queryString):
    
    recoveredData = None
    
    try:
        connection = psycopg2.connect(user = "postgres",
                                      password = "postgres",
                                      host = "localhost",
                                      port = 5432,
                                      database = "BancoGeografico")
        
        if(connection):
            print("Connection with PostGIS enable!")
        
        print("Recovering Data...")
        cursor = connection.cursor()
        cursor.execute(queryString)
        recoveredData = cursor.fetchall()
        
    except (Exception, psycopg2.Error) as error:
        print("Error while fetching data from PostgreSQL", error)

    finally:
        if(connection):
            cursor.close()
            connection.close()
            print("Connection with PostGIS closed!")
            
    return recoveredData

a = "select geom from am_successful"
data = getData(a)
print(data)
