import numpy as np 
import pandas as pd
import matplotlib.pyplot as plt
from sklearn.linear_model import LinearRegression 
from sklearn.preprocessing import PolynomialFeatures
from sklearn.metrics import mean_squared_error, r2_score
from sklearn.model_selection import train_test_split

np.random.seed(42)
hours_studied = np.arange(1, 21)
exam_score = 40 + 5* hours_studied + np.random.normal(0, 5, 20)
df = pd.DataFrame({ 'Hours_studied': hours_studied, 'Exam_score': exam_score})
print(df.head())

df.to_csv('data.csv', index= False)
print(" Dataset saved as 'data.csv'")
print(exam_score)


plt.figure(figsize = (10, 6))
plt.scatter(df['Hours_studied'], df['Exam_score'], color = 'blue', alpha = 0.6, s = 100)
plt.xlabel('Hours_studied', fontsize = 12)
plt.ylabel('Exam_score', fontsize = 12)
plt.title('Exam_score vs Hours_studied', fontsize = 14)
plt.grid(True, alpha = 0.3)
plt.show()
