import sys
from sklearn.externals import joblib
from sklearn.tree import DecisionTreeClassifier, export_graphviz

import csv
import pandas as pd
import numpy as np


data = pd.read_csv("/home/anel/Desktop/final-project-team-4/Project/backend/python/symptoms3.csv")
sym = sys.argv[1:]
z = np.zeros(len(data["Symptom_rus"]))

for s in sym:
    z[data.loc[data["Symptom_rus"]==s].index] = 1

classifer = joblib.load("/home/anel/Desktop/final-project-team-4/Project/backend/python/model.pkl")

res = classifer.predict(z.reshape(1,404))

print('Hello from python', res)