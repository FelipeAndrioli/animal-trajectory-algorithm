#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""
Created on Wed Jul 10 20:25:17 2019

@author: felipe

Sript feito para converter arquios .kml para arquivos
.csv para que pudessem ser usados no banco de dados 
PostGIS
"""

from bs4 import BeautifulSoup
import csv

inputFile = 'KML/MS040_Alexander_696828A_2.kml'
with open(inputFile, 'r') as file:
    soup = BeautifulSoup(file)

    coordData = []
    remove = '<coordinates>'
    remove2 = '</coordinates>'
    
    for node in soup.select('coordinates'):
        print(node)
        coordData.append(node)
        
    print(coordData)