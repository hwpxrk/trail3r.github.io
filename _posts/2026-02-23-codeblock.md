---
title: 코드블럭 테스트
subtitle: tree-sitter 구문 강조기 도입 실험
categories: ["몰입의 즐거움"]
---


## 길이가 긴 코드블럭
```python
import numpy as np
import tensorflow as tf
from tensorflow import keras
from sklearn.model_selection import train_test_split
import matplotlib.pyplot as plt
import pandas as pd

(train_input, train_target), (test_input, test_target) = keras.datasets.cifar10.load_data()

print(train_input.shape)
print(train_target.shape)
target = train_target.reshape(50000)
print(target.shape)
print(pd.Series(target).value_counts())

train_scaled = train_input / 255.0  
test_scaled = test_input / 255.0 

fig, axs = plt.subplots(1, 10)
for i in range(10):
    axs[i].imshow(train_input[i])
    axs[i].axis('off')
plt.show()
print([train_target[i] for i in range(10)])

train_scaled, val_scaled, train_target, val_target = train_test_split(train_scaled, train_target, test_size=0.2)

model = keras.Sequential()
model.add(keras.layers.Conv2D(36, kernel_size=4, activation='relu', padding='same', input_shape=(32,32,3)))
model.add(keras.layers.MaxPooling2D(2))
model.add(keras.layers.Conv2D(72, kernel_size=(4,4), activation='relu', padding='same'))
model.add(keras.layers.MaxPooling2D(2))

# 위에 코드는 필터 개수만 바꾼 거임.

model.add(keras.layers.Flatten())
model.add(keras.layers.Dense(120, activation='relu'))
model.add(keras.layers.Dropout(0.3))
model.add(keras.layers.Dense(10, activation='softmax'))

model.compile(optimizer='adam', loss='sparse_categorical_crossentropy', metrics=['accuracy'])
history = model.fit(train_scaled, train_target, epochs=20, validation_data=(val_scaled, val_target))
model.summary()

plt.plot(history.history['loss'])
plt.plot(history.history['val_loss'])
plt.xlabel('epoch')
plt.ylabel('loss')
plt.legend(['train', 'val'])
plt.show()



model.save('cnn_model2.h5')
model = keras.models.load_model('cnn_model2.h5')
model.evaluate(test_scaled, test_target)
i = 3005
# i = np.arange(10)
new_data = test_scaled[i:i+1]
t = test_target[i]
p = model.predict(new_data)
y = np.argmax(p, axis=1)
print(p.round(2))
print(y)                              
print(t)              

fig, axs = plt.subplots(1, 1)
for i in range(1):
    axs.imshow(new_data[i])
    axs.axis('off')
plt.show()

from sklearn.metrics import confusion_matrix, accuracy_score, precision_score, recall_score, f1_score
test_pred = np.argmax(model.predict(test_scaled), axis=1)
cm = confusion_matrix(test_target, test_pred)
accuracy = accuracy_score(test_target, test_pred)
precision = precision_score(test_target, test_pred, average=None)
recall = recall_score(test_target, test_pred, average=None)  
f1 = f1_score(test_target, test_pred, average=None)

print("Confusion Matrix:\n", cm)
print(f"Accuracy: {accuracy}")
print(f"Precision: {precision.round(3)}")
print(f"Recall (Sensitivity): {recall.round(3)}")
print(f"F1 Score: {f1.round(3)}")
```



## 대한민국헌법
[시행 1988. 2. 25.] [헌법 제10호, 1987. 10. 29., 전부개정]

---

### 전문

  유구한 역사와 전통에 빛나는 우리 대한국민은 3ㆍ1운동으로 건립된 대한민국임시정부의 법통과 불의에 항거한 4ㆍ19민주이념을 계승하고, 조국의 민주개혁과 평화적 통일의 사명에 입각하여 정의ㆍ인도와 동포애로써 민족의 단결을 공고히 하고, 모든 사회적 폐습과 불의를 타파하며, 자율과 조화를 바탕으로 자유민주적 기본질서를 더욱 확고히 하여 정치ㆍ경제ㆍ사회ㆍ문화의 모든 영역에 있어서 각인의 기회를 균등히 하고, 능력을 최고도로 발휘하게 하며, 자유와 권리에 따르는 책임과 의무를 완수하게 하여, 안으로는 국민생활의 균등한 향상을 기하고 밖으로는 항구적인 세계평화와 인류공영에 이바지함으로써 우리들과 우리들의 자손의 안전과 자유와 행복을 영원히 확보할 것을 다짐하면서 1948년 7월 12일에 제정되고 8차에 걸쳐 개정된 헌법을 이제 국회의 의결을 거쳐 국민투표에 의하여 개정한다.

  1987년 10월 29일

  제1장 총강


### 제1조
①대한민국은 민주공화국이다.
②대한민국의 주권은 국민에게 있고, 모든 권력은 국민으로부터 나온다.

### 제2조
①대한민국의 국민이 되는 요건은 법률로 정한다.
②국가는 법률이 정하는 바에 의하여 재외국민을 보호할 의무를 진다.

### 제3조
대한민국의 영토는 한반도와 그 부속도서로 한다.

### 제4조
대한민국은 통일을 지향하며, 자유민주적 기본질서에 입각한 평화적 통일정책을 수립하고 이를 추진한다.

### 제5조
①대한민국은 국제평화의 유지에 노력하고 침략적 전쟁을 부인한다.
②국군은 국가의 안전보장과 국토방위의 신성한 의무를 수행함을 사명으로 하며, 그 정치적 중립성은 준수된다.

### 제6조
①헌법에 의하여 체결ㆍ공포된 조약과 일반적으로 승인된 국제법규는 국내법과 같은 효력을 가진다.
②외국인은 국제법과 조약이 정하는 바에 의하여 그 지위가 보장된다.

### 제7조
①공무원은 국민전체에 대한 봉사자이며, 국민에 대하여 책임을 진다.
②공무원의 신분과 정치적 중립성은 법률이 정하는 바에 의하여 보장된다.

### 제8조
①정당의 설립은 자유이며, 복수정당제는 보장된다.
②정당은 그 목적ㆍ조직과 활동이 민주적이어야 하며, 국민의 정치적 의사형성에 참여하는데 필요한 조직을 가져야 한다.
③정당은 법률이 정하는 바에 의하여 국가의 보호를 받으며, 국가는 법률이 정하는 바에 의하여 정당운영에 필요한 자금을 보조할 수 있다.
④정당의 목적이나 활동이 민주적 기본질서에 위배될 때에는 정부는 헌법재판소에 그 해산을 제소할 수 있고, 정당은 헌법재판소의 심판에 의하여 해산된다.

### 제9조
국가는 전통문화의 계승ㆍ발전과 민족문화의 창달에 노력하여야 한다.



## 길이가 짧은 코드블럭
```c
#include <stdio.h>

int main(void) {
    char name[256];

    printf("이름을 입력해 주세요: ");
    scanf(%s, &name);

    return 0;
}
```
