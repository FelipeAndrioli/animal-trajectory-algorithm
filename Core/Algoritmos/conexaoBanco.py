#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""
Created on Sat Jun  8 17:58:01 2019

@author: felipe
"""

#biblioteca para conexao com o banco de dados
#PostgreSQL
import psycopg2
from math import radians, sin, cos, acos

#bibliotecas para trabalhar com dados geográficos
import pandas as pd
import matplotlib.pyplot as plt
import descartes
from shapely.geometry import Point, Polygon

'''
Implementação do algoritmo Dijkstra(algoritmo do galo, nome dificil da pelga)

Passos:
    Criar variável com os centróides, eles serão os nós do grafo para calcular
    a trajetória dos animais
    
    Criar a variável com as amostras dos animais, pra cada amostra(pode ser limitada)
    rodar o algoritmo
    
    Para cada amostra, percorrer os centróides e selecionar o mais próximo, armazenando
    o mesmo em uma lista ou vetor
    
Necessidades:
    Tem como medir uma distância entre dois pontos? Por exemplo, a cada x metros o 
    algoritmo para, para isso ele precisa calcular a distância percorrida do ponto 
    inicial até o ponto atual

    Como plotar uma linha entre os pontos gerados, fica melhor para visualizar e 
    entender as informações
    
    Função de remoção de itens de um vetor em python, para remover o caminho que já 
    foi percorrido  

Necessidades do Algoritmo:
    O algoritmo Dijkstra precisará dos centróides, que são os pontos por onde os
    animais vão percorrer
    
    Das amostras, cada amostra será o ponto inicial de cada nova trajetória calculada
    
    Para evitar um loop, o valor que já foi percorrido deve ser removido da lista
    de possibilidades, senão o algoritmo ficaria indo e voltando do mesmo lugar, caso
    esse fosse o mais próximo 
    
    Como o Brasil fica em um ponto onde latitude e longitude são negativos, os valores
    talvez possam começar como 0, 0 e o ponto inicial, sendo assim o primeiro valor
    a ser comparado já pode entrar como sendo o primeiro pois certamente será menor
    do que 0
    
'''

def calcDist(pointA, pointB):
    xA = pointA[0]
    xB = pointB[0]
    
    yA = pointA[1]
    yB = pointB[1]
    
    distancia = 6371.01 * acos(sin(xA) * sin(xB) + cos(xA) * cos(xB) * cos(yA - yB))
    
    #essa fórmula de distância parece estar correta mas precisa ser validada
    
    '''
    print("xA: " + str(xA))
    print("yA: " + str(yA))
    print("xB: " + str(xB))
    print("yB: " + str(yB))
    
    print("A distância entre os pontos é de " + str(distancia) + " Km.")
    '''
    
    return distancia
    

def dijkstra(point, path):

    '''

    Função vai retornar um vetor de pontos geográficos que vai representar a 
    trajetória do animal...
    
    Para começar, a distância máxima a ser percorrida será de 10 quilometros
    
    '''
    
    pontoInicial = point
    pontoFinal = 0
    caminho = []
    distancia = 0
    menorDist = 0
    indice = len(caminho) - 1
    
    caminho.append(pontoInicial)
    
    for i in path:
        if(distancia < 10000):
            menorDist = i
            
    
    print("Amostras")
    print("\t")
    for i in point:
        print("Latitude: " + str(i[0]) + "\n" + "longitude: " + str(i[1])) 
        print("\t")
    
    print("Centroides")
    print("\t")
    for i in path:
        print("Latitude: " + str(i[0]) + "\n" + "Longitude: " + str(i[1]))
        print("\t")

    
    
try:
    connection = psycopg2.connect(user = "postgres",
                                  password = "postgres",
                                  host = "localhost",
                                  port = 5432,
                                  database = "BancoGeografico")

    cursor = connection.cursor()
    queryAmostras  = "select latitude, longitude from amostras"
    queryCentroides = "select st_x(geom), st_y(geom) from centroides"
    
    cursor.execute(queryAmostras)
    print("Selecionando linhas de amostras usando o cursor")
    amostras_records = cursor.fetchall()
    cursor.execute(queryCentroides)
    centroides_records = cursor.fetchall()
    
    #dijkstra(amostras_records, centroides_records)
    dist = calcDist((1, 1), (1, 1))
    print(dist)
    
    #print("Valores da variavel amostras")
    #print(amostras_records)    
    #print("Valores da variavel centroides")
    #print(centroides_records)
    
    
    
    #bloco para plotar os pontos recuperados do Banco de Dados
    
    '''
    for i in amostras_records:
        x = i[0]
        y = i[1]
        plt.scatter(x, y)
        
    plt.show()

    
    for i in centroides_records:
        x = i[0]
        y = i[1]
        plt.scatter(x, y)
        
    plt.show()
    '''
    

except (Exception, psycopg2.Error) as error:
    print("Error while fetching data from PostgreSQL", error)
    
finally:
    if(connection):
        cursor.close()
        connection.close()
        print("PostgreSQL connection is closed")


        