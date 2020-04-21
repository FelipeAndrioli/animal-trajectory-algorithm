#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""
Created on Thu Jul  4 16:58:48 2019

@author: felipe

Script criado para os seguintes objetivos:
    
    1º - Ler arquivos .kml
        Razão: Os dados recebidos da Carmen para a Iniciação Científica
        serão mais confiáveis se forem estraidos diretos do arquivo .kml

"""

from fastkml import kml
#from pathlib import Path
import glob

def loadData():
    
    kmlData = []
    files = glob.glob('KML/*')
    remove = 'KML/'
    
    for myFiles in files:
        kmlData.append(myFiles)
    
    kmlData = [s.replace(remove, '') for s in kmlData]
    return kmlData

def testData():
    
    kmlData = []
    files = glob.glob('KML/*')
    remove = 'KML/'
    
    for myFiles in files:
        
        with open(myFiles, 'rt', encoding = 'utf-8') as kmlfile:
            doc = kmlfile.read()
            
        k = kml.KML()
        k.from_string(doc)
        features = list(k.features())
        len(features)
        print(doc)
        print(k)
        
        kmlData.append(myFiles)
        
    kmlData = [s.replace(remove, '') for s in kmlData]
    

testData()

kmlFiles = loadData()
print(kmlFiles)

for i in kmlFiles:
    with open(i, 'rt', encoding = 'utf-8') as myFile:
        doc = myFile.read()
        
    k = kml.KML()
    k.from_string(doc)
    features = list(k.features())
    len(features)
    
    print(doc)
    print(k)

'''
with open('MS040_Alexander_696828A_2.kml', 'rt', encoding = "utf-8") as myfile:
    doc = myfile.read()

k= kml.KML()
k.from_string(doc)
features = list(k.features())
len(features)

print(doc)
print(k)
'''