---
title: Pythonic Paradox
subtitle: 학생회가 만들어가는 응용AI융합학부 예비대학 프로젝트
date: 2025-03-06 09:00

layout: post
permalink: /campuslife/pythonicparadox

categories: ["캠퍼스 라이프"]
tags: ["성균관대학교"]

header:
    teaser: /assets/images/posts/campuslife/Pythonic_Paradox/20250306_Pythonic_Paradox_9.png
---

&emsp;안녕하세요. 개구리의 밀실 블로그 주인장 개구리입ㄴ... 아... 아니, 제2대 응용AI융합학부 학생회 부학생회장 박현욱입니다. 정말 오랜만에 뵙네요. 작년에 게시글을 올렸으니 아마 1년 만이죠...? <span style="color: #808080">(2달 만이지만 ㅋㅋ)</span> 작년 연말결산 게시글을 끝으로 블로그를 접었냐고 물어보시는 분들도 계셨는데, 당연히 아니에요. 그저 바쁜 척하느라 블로그에 신경 쓰지 못했던 것뿐이에요. 이제 1학기도 시작해서 더 바빠질 것 같지만, 더 자주 올릴 수 있게 노력해 볼게요.<br>

&emsp;그나저나 다들 겨울방학은 잘 지내셨나요? 저는 부학생회장이 되면서 바쁘다고 하면 정말 바쁜 겨울방학을 보냈어요. 일종의 예비대학 프로젝트로 우리 학부의 신입생들에게 Python을 가르쳐봤어요. 시작부터 끝까지 정말 힘들고 어려운 프로젝트였어요. 하지만, 완주하고 나니 힘든 건 기억나지 않고 남는 것은 오직 보람뿐이더라고요. 그래서 오늘은 저의 겨울방학을 가득히 장식해 준 응용AI융합학부 학생회장단 주관 예비대학 프로젝트, Python 입문 프로젝트 후기를 남겨보려고 해요.<br>

&emsp;프로젝트가 시작된 순간부터 매듭을 짓는 순간까지 그 과정과 비하인드, 그리고 저의 생생한 느낌까지 담아보려고 했어요. 이런 프로젝트도 했구나... 하고 재밌게 읽어주세요!<br>

&emsp;그럼 이제, 집중.<br>

<br><br>



## 목차
<p class="posts-subtitle">인덱스는 0부터 시작하니까 주의하세요!</p>

---

<table class="post-table">
    <colgroup>
        <col class="column-index"><col class="column-contents">
    </colgroup>
    <tbody class="post-table__body">
        <tr>
            <td class="index">1</td>
            <td class="contents">
                <a class="contents__link" href="#python-고수되기-프로젝트">
                    <p class="contents__title">Python 고수되기 프로젝트</p>
                    <p class="contents__subtitle">프로젝트 서사의 시작점</p>
                </a>
            </td>
        </tr>
        <tr>
            <td class="index">2</td>
            <td class="contents">
                <a class="contents__link" href="#python-입문-프로젝트">
                    <p class="contents__title">Python 입문 프로젝트</p>
                    <p class="contents__subtitle">프로젝트의 시작</p>
                </a>
            </td>
        </tr>
        <tr>
            <td class="index">3</td>
            <td class="contents">
                <a class="contents__link" href="#첫-오프라인-모임">
                    <p class="contents__title">첫 오프라인 모임</p>
                    <p class="contents__subtitle">너무 긴장해서 피자도 못 먹었습니다...</p>
                </a>
            </td>
        </tr>
        <tr>
            <td class="index">4</td>
            <td class="contents">
                <a class="contents__link" href="#악마는-디테일-속에-살아있다">
                    <p class="contents__title">악마는 디테일 속에 살아있다.</p>
                    <p class="contents__subtitle">2주 차 스터디 자료 제작 일지</p>
                </a>
            </td>
        </tr>
        <tr>
            <td class="index">5</td>
            <td class="contents">
                <a class="contents__link" href="#정신-나갈-것-같애-정신-나갈-것-같애">
                    <p class="contents__title">정신 나갈 것 같애 정신 나갈 것 같애</p>
                    <p class="contents__subtitle">3주 차 스터디 자료 제작 일지</p>
                </a>
            </td>
        </tr>
        <tr>
            <td class="index">6</td>
            <td class="contents">
                <a class="contents__link" href="#말-한마디에-폭주-시작">
                    <p class="contents__title">말-한마디에-폭주-시작</p>
                    <p class="contents__subtitle">4주 차 스터디 자료 제작 일지</p>
                </a>
            </td>
        </tr>
        <tr>
            <td class="index">7</td>
            <td class="contents">
                <a class="contents__link" href="#프로젝트-중-마지막-수업">
                    <p class="contents__title">프로젝트 중 마지막 수업</p>
                    <p class="contents__subtitle">5주 차 스터디 자료 제작 일지</p>
                </a>
            </td>
        </tr>
        <tr>
            <td class="index">8</td>
            <td class="contents">
                <a class="contents__link" href="#글쎄-내가-있어-보이게-말하니-믿더라니까">
                    <p class="contents__title">글쎄, 내가 있어 보이게 말하니 믿더라니까...?</p>
                    <p class="contents__subtitle">Python 입문 프로젝트를 마무리 짓는 구두점, 형성평가</p>
                </a>
            </td>
        </tr>
        <tr>
            <td class="index">9</td>
            <td class="contents">
                <a class="contents__link" href="#python-입문-프로젝트-후기">
                    <p class="contents__title">Python 입문 프로젝트 후기</p>
                    <p class="contents__subtitle">제2대 응용AI융합학부 학생회장단 드림.</p>
                </a>
            </td>
        </tr>
    </tbody>
</table><br>

<br><br>



## Python 고수되기 프로젝트
<p class="posts-subtitle">프로젝트 서사의 시작점</p>

---

&emsp;여러분들은 Python을 다룰 줄 아시나요? 아, 아니다. 프로그래밍에 대해서 들어본 적이 있으신가요? 많은 사람들이 프로그래밍에 입문한다고 말하면, 항상 가장 먼저 언급되는 프로그래밍 언어가 있어요. 바로 Python이죠! 다른 프로그래밍 언어에 비해서 직관적이고 이해하기 쉬운 문법, 뛰어난 범용성, 오픈 소스라는 특징에서 오는 강력한 성능과 편의까지 두루 갖추고 있어 프로그래밍을 처음 배우는 사람에게 정말 강력히 추천하고는 해요. 음... 하지만, 제가 Python을 가르치고자 한 이유는 배우기 쉬워서만 그런 것은 아니에요.<br>

&emsp;Pythonic Paradox. 앞서 언급했듯이, Python은 정말 배우기 쉬운 프로그래밍 언어로 널리 알려져 있어요. 하지만, 배우기 쉬운 Python이 되려 그 특성 때문에 오히려 더 어렵게 느껴지는 경우가 있어요. 그런 상황을 Pythonic Paradox. 그러니까, 파이썬의 역설이라고도 해요. Python 개발자들 사이에서는 'Pythonic 하다.'라고도 많이 하죠.<br>

&emsp;예상하셨으려나요? 이 프로젝트를 시작하게 된 계기는 그다지 거창하지 않아요. 우리 학부가 신설되고 처음으로 전공 수업을 진행했을 때, 생각보다 다들 Python을 어려워하더라고요. 아니 어쩌면, Python뿐만 아니라 프로그래밍 자체를 어려워하시는 분들이 많았어요. 그렇게 얼렁뚱땅 시간이 흘러 학기가 끝나고 1학년이 끝났는데, 문득 이런 생각이 들더라고요. 우리 학부는 모두가 재직자인데, 다른 과목도 공부하면서 Python에 더 많은 시간을 투자하기에는 너무 버겁다고 생각했어요. 그래서 조금이라도 배우고 갈 수 있다면 좋겠다고 생각했죠. 그러니까, 이 프로젝트의 시작 계기를 관통하는 의문은 오직 하나였어요.<br>

&emsp;**"Python을 입학 전에 미리 만나볼 수 있다면, 학기 중에 부담이 약간이라도 줄어들지 않을까?"**<br>

&emsp;그렇게 이 프로젝트를 발상하게 되었고, 무작정 시작하게 됐죠.<br>

<br><br>



## Python 입문 프로젝트
<p class="posts-subtitle">프로젝트의 시작</p>

---

&emsp;개인적인 프로젝트로 진행하고 싶었지만, 그럼에도 부학생회장이라는 직책이 있어서 개인 프로젝트로 진행하기에는 부담됐어요. 신입생들의 입장에서는 24학번 박현욱이 아니라 부학생회장의 프로젝트로 기억되고, 곧 그게 학생회의 이미지로 직결될 수 있었기 때문이죠. 그래서 학생회장님한테 먼저 물어봤어요. <span style="color: #808080">(말투 양해 좀 해주세요. 이때는... 어색하다가 막 친해지던 시절입니다.)</span><br>

<center><img src="/assets/images/posts/campuslife/Pythonic_Paradox/20250306_Pythonic_Paradox_1.jpeg"></center><br>
&emsp;엥? 생각보다 흔쾌히 알겠다고 해주시네요...? 같이 하자고요? 잠깐만... 그러면 학생회장단 다 같이...?<br>

<center><img src="/assets/images/posts/campuslife/Pythonic_Paradox/20250306_Pythonic_Paradox_2.jpeg"></center><br>
&emsp;오케이. 진행시켜.<br>

&emsp;근데 일단... 잠깐만요. 흥분하면 안 돼요. 침착하자고요. 수요 없는 공급은 그냥 헛다리 짚은 거예요. 일방적인 공급은... 되려 이미지만 나빠질 수 있기 때문이죠. 그래서 수요조사를 먼저 했어요. 제가 생각한 규모는 20-30명 정도로 적당히 소규모 팀을 이뤄서 종종 강의실 빌리거나, 버거우면 줌으로 온라인 수업을 하는 거였죠. 그래서 진짜 아무 생각 없이 물어봤어요. 투표도 아니고 그냥 진짜 냅다 물어봤어요. 참... 부학생회장이란 사람이 이렇게 가볍게 행동하면 안 되는데...<br>

<center><img src="/assets/images/posts/campuslife/Pythonic_Paradox/20250306_Pythonic_Paradox_3.jpeg"></center><br>
&emsp;네... 진짜 죄송합니다 신입생분들.... 정말로 기획도 전혀 안 하고 날 것 그 상태로 격식 없이 물어본 거였어요 ㅋㅋㅋ 솔직히 관심 없을 줄 알았거든요.... 입학도 안 했는데 무슨 공부예요.... 진짜 의미 없는 공급이 될 수도 있잖아요 ㅎㅎ.... ... ... ... 라기에는 너무나도 예상한 범위 안의 수요를 표시해 주셨네요....<br>

&emsp;ㅇㅋ. 진짜로 진행시켜.<br>

<figure class="image-grid" style="grid-template-columns: 1fr 1.5fr;">
    <img src="/assets/images/posts/campuslife/Pythonic_Paradox/20250306_Pythonic_Paradox_4.jpeg">
    <img src="/assets/images/posts/campuslife/Pythonic_Paradox/20250306_Pythonic_Paradox_5.jpeg">
</figure><br>
&emsp;수요조사는 기대한 만큼의 인원이 모두 표현을 해주셨기 때문에, 진짜 사업화하기 시작했어요. 음... 사실 10번째 좋아요가 찍힌 순간부터 빠르게 구체화시키기 시작했거든요. 이 프로젝트의 목표는 정말로 6주라는 짧은 시간 동안 Python의 기초에 대해 음속으로 훑어보는 거였어요. 더도 말고 덜도 말고 그냥 딱 한 번 듣고 입학할 수 있도록 수업하는 것이 목표였죠. 그래서 나름 빠른 템포로 수업하리라 생각했고, 그렇게 모든 기획을 마치고 나서 구글폼까지 만들어서 본격적인 신청을 받았어요.<br>

<center><img src="/assets/images/posts/campuslife/Pythonic_Paradox/20250306_Pythonic_Paradox_6.jpeg"></center><br>
&emsp;...?? 이거 뭐임? 왜 84명이에요? 수요조사는 30명이라면서요...? 도대체 저한테 왜 이러세요;; 저 이거 부담돼서 못 해요 ㅠㅠ...<br>

<center><img src="/assets/images/posts/campuslife/Pythonic_Paradox/20250306_Pythonic_Paradox_7.jpeg"></center><br>
&emsp;라고 할 뻔 ㅋ... 누구보다 열심히 했습니다. 처음 구상한 대로 첫 모임은 오프라인으로 진행했어요. 처음부터 온라인으로하면 제대로 시작한 느낌도 안 날 뿐더러, 합격 직후 드높은 열정을 현장에서 느끼고 응원해줄 수 있을 것 같아 오프라인으로 결정했죠. 거리가 멀어서 까다롭게 생각하신 분들도 많았을 것 같은데, 그럼에도 저는 정말 좋은 판단이었다고 생각해요.<br>

&emsp;신입생분들은 잘 모르실 비하인드를 말해보자면, 사실 첫 오프라인 모임을 추진하는 과정이 마냥 매끄럽지는 않았어요. 이때가 정규 예비대학 프로그램과 논술이 이루어지던 시기라서 대형 강의실 예약이 힘들기도 했고, 아직 입학하지 않은 입학 예정자들이 학생회 행사를 핑계로 학교 강의실에 들어와도 되는지까지 생각할 것이 예상보다 많았어요. 그냥 대충 툭! 예약하면 우르르 들어갈 수 있을 줄 알았는데 ㅎㅎ... 아, 그리고 무엇보다도 주차가 문제였어요... 학부생이 아니면 할인권을 구매조차 못 한다고 하더라고요...? 이건 해결할 수 없었어요. 제가 미리 구매해서 드리는 방법도 있겠지만, 주차 할인권 몇 개 사자고 서울까지 가는건 너무 부담이니까요 ㅋㅋㅋ 결국 해결 못해서 대중교통을 타 달라고 간절히 빌고 빌었답니다... 그나마 다행인건 학부 행정실에서 저희를 적극적으로 도와주셔서 첫 주 오프라인 모임을 학교 강의실에서 나름 수월하게 진행할 수 있었어요. 감사합니다 행정실 선생님들 ㅎㅎ<br>

&emsp;아무튼, 정말 열심히 준비했어요.<br>

<center><img src="/assets/images/posts/campuslife/Pythonic_Paradox/20250306_Pythonic_Paradox_8.png"></center><br>
&emsp;아 참! 눈치채신 분들도 계실 거 같은데, 프로젝트 이름이 바뀌었어요 ㅋㅋㅋㅋ Python 고수되기 프로젝트에서 Python 입문 프로젝트로 말이에요 ㅋㅋㅋ 신입생분들이 부담스러워하실까 봐 조용히 바꿨답니다 ㅎㅎ... 이 프로젝트 진행하면서 곳곳에 개그 요소를 숨겨두면서 하려고 이름에도 약간의 장난을 첨가했다고 생각했는데, 다시 바라보니 부담스러우실수 있겠다...라는 생각을 했어요. 아무튼 그렇습니다. 네, 그냥 그런 거예요. 그래도 프로젝트 진행하는 내내 나름의 위트를 넣기 위해 노력했어요.<br>

&emsp;그렇게 제2대 응용AI융합학부 학생회장단의 Python 입문 프로젝트는 시작되었어요.<br>

<br><br>



## 첫 오프라인 모임
<p class="posts-subtitle">너무 긴장해서 피자도 못 먹었습니다...</p>

---

&emsp;1월 11일 토요일. 드디어 그 날이 찾아왔어요. Python 입문 프로젝트가 본격적으로 시작되는 날이죠. 여러 이유로 아침 9시에 시작하기로 했는데요, 정말 감사하게도 약 80% 정도의 참가자가 와주셨어요. 정말 먼 곳에서 오신 분도 계시던데 입학 전부터 이런 열정을 보여주시다니... 솔직히 감탄했어요. 저도 더 열심히 살아야겠다는 생각이 들 정도였으니 말이죠... 사실 저는 전날 저녁에 서울에 와서 숙소 잡고 잤거든요. 도무지 제가 사는 청주에서 아침 일찍 출발해서 9시까지 갈 자신이 없었어요. 아니, 9시도 아니죠. 저는 운영하는 입장이니 사실상 아무리 늦어도 8시 30분에는 도착해야 했으니 말이죠...<br>

&emsp;저는 8시 30분에 딱 맞춰 강의실에 도착했는데요, 솔직히 놀랐어요. 8시 30분에 갔는데도 한 30명 정도 앉아있었던 것 같아요. 발표도 많이 해보고, 제가 추진한 프로젝트였지만 그렇게 넓은 강의실에 사람이 많이 앉아 있으니 너무 부담되고 긴장되더라고요. 교수님들은 어떻게 매일 50명, 60명씩 되는 인원 앞에서 그렇게 자연스럽게 수업을 하시는지 의문이에요.<br>

<figure class="image-slider">
    <img src="/assets/images/posts/campuslife/Pythonic_Paradox/20250306_Pythonic_Paradox_9.png">
    <img src="/assets/images/posts/campuslife/Pythonic_Paradox/20250306_Pythonic_Paradox_10.png">
    <img src="/assets/images/posts/campuslife/Pythonic_Paradox/20250306_Pythonic_Paradox_11.png">
    <img src="/assets/images/posts/campuslife/Pythonic_Paradox/20250306_Pythonic_Paradox_12.png">
    <img src="/assets/images/posts/campuslife/Pythonic_Paradox/20250306_Pythonic_Paradox_13.png">
    <img src="/assets/images/posts/campuslife/Pythonic_Paradox/20250306_Pythonic_Paradox_14.png">
    <img src="/assets/images/posts/campuslife/Pythonic_Paradox/20250306_Pythonic_Paradox_15.png">
</figure><br>
&emsp;첫 날에는 프로그래밍과 Python에 대해서 간략히 설명하고 설치까지 진행했어요. 정말 빠른 템포로 진행했어요. 다들 당황한 눈치였는데, 괜찮아요. 솔직히 다들 프로그래밍이 뭐고 자연어가 어떻고... 관심없을 것 같았어요. 그런 건 학교에 입학해서 교수님과 함께 수업하면서 알아가면 되니까요. 제게는 오직 6번의 기회뿐이라 시간이 너무 부족했어요.<br>

&emsp;네? 아... 목차에 왜 페이지가 써져있다 마냐구요...?<br>

&emsp;어이... 눈감아. 미공개가 아니라, 공개할 것이 없는 것이다. 더이상 질문은 하지 말아다오... 참고로 마지막 부분은 다 못 하고 끝났습니다...^^... 시간과 체력의 한계에 부딪혔어요 ㅎ... 봐주세요... 다음이 있다면 꼭 다 해낼게요.<br>

<figure class="image-slider">
    <img src="/assets/images/posts/campuslife/Pythonic_Paradox/20250306_Pythonic_Paradox_16.png">
    <img src="/assets/images/posts/campuslife/Pythonic_Paradox/20250306_Pythonic_Paradox_17.png">
    <img src="/assets/images/posts/campuslife/Pythonic_Paradox/20250306_Pythonic_Paradox_18.png">
    <img src="/assets/images/posts/campuslife/Pythonic_Paradox/20250306_Pythonic_Paradox_19.png">
    <img src="/assets/images/posts/campuslife/Pythonic_Paradox/20250306_Pythonic_Paradox_20.png">
    <img src="/assets/images/posts/campuslife/Pythonic_Paradox/20250306_Pythonic_Paradox_21.png">
    <img src="/assets/images/posts/campuslife/Pythonic_Paradox/20250306_Pythonic_Paradox_22.png">
</figure><br>
&emsp;그럼에도 나름 재미 요소나 위트를 넣기 위해 노력했어요. 설정 적용하고 광명 찾기라던지... 나 좀 믿어줘라던지... 간zㅣ챙기기 라던지... 말이죠. 음... 부끄럽네요. 재밌었을지는 모르겠습니다만, 괜찮습니다. 저한테는 재밌어요. <span style="color: #808080">(???)</span><br>

&emsp;VS Code를 설치한 건, 일단 간지가 나기 때문이었ㅅ... 장난이고요 ㅎㅎ... 저희 전공 수업에서는 Anaconda 기반으로 Spyder 편집기를 사용해요. 이걸 쓸까 고민하긴 했는데, 필수 교양에서는 VS Code를 사용하거든요. Spyder는 Anaconda 기반인지라 사용이 편하고 기본 설정이 입문자에게 편하게 너무 잘 되어있어서 잘 적응하겠지라는 마인드로 약간 더 깝깝한 VS Code로 결정한 거였어요. 근데 솔직히 간지도 한 몫하긴 했어요 ㅋㅋ<br>

&emsp;아무튼, 다같이 Python도 깔고 VS Code도 깔고 피자를 먹었답니다. 아니 근데 말이에요. 글쎄!! 학생회장단이 얼마나 기특했으면!! 무려 학부 행정실에서 피자 구매를 지원해줬다지 뭡니까!!! 응용AI융합학부 행정실 최고!!! 그리고 진짜 얼마나 기특했으면 학부 홈페이지에도 박제해주셨어요 ㅋㅋㅋㅋㅋㅋㅋㅋ 학부 홈페이지에 박제될 사업을 진행하다니 뿌듯하네요!<br>

<hr class="narrow">

<p class="contents center">
    [학생실적] [응용AI융합학부 학생회] 2025 신입생 대상 Python 스터디 모임
    [https://aicon.skku.edu/aicon/news.do?mode=view&articleNo=186181]
</p>
{% include customs/opengraph.html url="https://aicon.skku.edu/aicon/news.do?mode=view&articleNo=186181" %}

<hr class="narrow">

<center><img src="/assets/images/posts/campuslife/Pythonic_Paradox/20250306_Pythonic_Paradox_23.jpeg"></center><br>
&emsp;근데 말이에요... 제가 피자를 진짜 좋아하거든요..? 근데 이 날 긴장을 진짜 진짜 너무 많이 해서 피자를 못 먹겠더라구요...? 그래서 결국 한 조각 먹다 남기고 신입생분들 피자 먹는 것만 흐뭇하게 지켜봤어요. 아 맞다 ㅋㅋ 여기서 제가 당황한 점이 있어요. 분위기가 너무 좋았어요. 다들 처음보는 거 아닌가요? 학생회에서는 피자만 제공해드렸을 뿐인데 어떻게 순식간에 왁자지껄 수다 떠시는지... 분위기가 싸하면 어쩌지라고 걱정한 과거의 제가 멍청했네요.<br>

&emsp;Python 입문 프로젝트 첫 날 스터디를 진행하고 느낀 점은 생각 이상으로 뿌듯하고 재밌었어요. 제가 누군가를 이렇게 가르쳐 볼 수 있는 기회가 정말 흔치 않을텐데, 과감하게 도전하기를 정말 잘했다는 생각을 많이 했어요. 정말... 이 프로젝트에 참여해주신 모든 분들이 너무나도 감사해요 ㅎㅎ. 그리고 이 프로젝트를 믿고 같이 밀고 가서 실현시켜준 학생회장님과 이 날 도와주신 학생회 일원분들까지 정말 감사드려요!!<br>

&emsp;와중에 위쪽 모니터에 온몸 비틀면서 사진찍는 제 모습이 너무 웃기네요 ㅋㅋㅋ 아무쪼록 1주차 오프라인 모임은 이렇게 잘 마무리되었답니다 ㅎㅎ<br>

<br><br>



## 악마는 디테일 속에 살아있다.
<p class="posts-subtitle">2주 차 스터디 자료 제작 일지</p>

---

&emsp;많은 분들이 제 블로그를 보면 제게 반드시 묻는 질문이 있어요.<br>

**"글 하나 쓰면 보통 얼마나 걸려?"**<br>

네... 저는 디테일의 악마예요. 디테일을 굉장히 중요하게 생각하기 때문에, 글을 쓸 때나 발표 자료를 만들 때 탄력을 받기 전까지 작업 속도가 매우 더디다는 게 단점이죠. 어느 날은 말이에요, 학생회 회의가 끝나고 제가 PPT 만드는 걸 구경하고 싶다는 분들이 있어서 한 번 보여드렸어요.<br>

<center><img src="/assets/images/posts/campuslife/Pythonic_Paradox/20250306_Pythonic_Paradox_24.jpeg"></center><br>
&emsp;새벽 1시 50분까지 말이죠. 사진에는 3명이지만, 처음에는 9명이 보다가... 시간이 흘러 7명... 5명... 그렇게 3명이 남은 거예요. 모두가 한 입처럼 말하더라구요... 미친놈이라고 말이에요... 다 비켜! 이 구역의 미친놈은 나야! ......... 죄송합니다. 제 블로그를 읽는 신입생들께만 비밀을 알려드릴게요. 제가 PPT를 만들 때 사실...<br>

<center><img src="/assets/images/posts/campuslife/Pythonic_Paradox/20250306_Pythonic_Paradox_25.png"></center><br>
&emsp;정말 쓸데없는 디테일에 집착해요. 아무도 의식하지 못했을 변태같은 디테일을 몇 가지 소개해드리자면, 가장 먼저 PPT 내 요소들의 간격을 10mm나 5mm로, 그중 세부사항은 3mm로 다 맞췄어요... 왜 이렇게까지 하냐고요? 모르겠어요. 제 본능이 이렇게 하지 않으면 소리를 질러요. 소리 없는 아우성이랄까...<br>

&emsp;근데 하나 더 있습니다 ㅋㅋㅋ 배경색은 흰색이 아니고, 글자색은 검은색이 아니에요. 네? 뭔 개1소리냐고요? ㅋㅋㅋㅋㅋ 사실 완전 흰색과 완전 검은색이 아니라, 아주 약간 더 어두운 흰색과 아주 약간 더 밝은 검은색을 사용했어요. 궁금하시다면, 스포이트 찍어보세요. 아주 약간 다르답니다 ㅎㅎ. 대비를 아주 약간이라도 줄이려는 숨은 의도였달까요? 정말 아무도 모를 디테일이지만, 프로젝트 진행하는 내내 의식하고 만들었어요.<br>

<center><img src="/assets/images/posts/campuslife/Pythonic_Paradox/20250306_Pythonic_Paradox_26.png"></center><br>
&emsp;그리고 이 글자색... 손수 하나하나 바꿨어요. VS Code에 입력하면 나오는 색 그대로 말이에요. 음... 중간에 힘들어서 괄호는 몇 개 은근슬쩍 빼먹었지만 ㅎ... <br>

&emsp;진짜 왜 이렇게까지 하냐고요? ㅎㅎ... 변태라서... ㅎ... 아무도 모를 디테일이지만, 이 디테일에서 느껴지는 그 묘한 재미와 감동이 있어요. 이런 저를 보고 미친놈이라고 생각했다면, 삐빅-! 정상입니다!<br>

<center><img src="/assets/images/posts/campuslife/Pythonic_Paradox/20250306_Pythonic_Paradox_27.png"></center><br>
&emsp;그나저나 PPT 만들다가 매직마우스 충전을 했어요. 그리고 저장된 이름을 개구리 앞다리 절단기로 바꿨어요. 진짜 이 개@같은 마우스... 편하면서도 장시간 작업하면 손목 아래가 저려요. 이러다가 손목 터널 증후군이 아니라 내 손목으로 터널 뚫을 수 있을 거 같아요 진짜 ㅋㅋ 다들... 갬성에 미치지 말고 조용한 무선 마우스 사도록 해요. ㅇㅋ?<br>

<center><img src="/assets/images/posts/campuslife/Pythonic_Paradox/20250306_Pythonic_Paradox_28.png"></center><br>
&emsp;하지만 저는 갬성에 미쳤기 때문에<span style="color: #808080">(사실 다른 마우스가 없음 ㅋㅋ)</span>, 매직마우스를 가지고 모든 스터디 자료를 만들었어요. 예? 왜 마우스 안 사냐고요? 아 ㅋㅋㅋ 감성이 없자너 ㅋㅋ<br>

&emsp;아무튼, 매일 새벽 1시-2시까지 만들었어요. 그러다 보니 정신이 점점 나가기 시작했는데, 학생회장님이 자꾸 저보고 기특하대요. 그러더니 이제는 PPT 야무지게 잘 만드는 거 보고 기특해! 현욱이는 신이야! 이러시는데... 카리나는 신이에요를 자꾸 따라 해서 현욱이는 신이에요를 해주시더라고요. 드디어 정신이 나가버리신 거죠 뭐...<br>

&emsp;근데 저도 정신이 같이 나갔습니다. 그래서 저도 해탈하다 못해 즐기는 지경에 이르러 줌 회의실 이름도 카리나와 함께 공부해요! \| 스터디윗미로 하고 제 프로필 이름도 카리나 (박현욱 호소인)으로 바꿨어요. 너무 좋아하시더군요. 학생회장님 그리고 기획국장님... 카리나와 함께 일하는 기분... 어떠신가요? 영광인 줄 아세요.<br>

<center><img src="/assets/images/posts/campuslife/Pythonic_Paradox/20250306_Pythonic_Paradox_29.jpeg"></center><br>
&emsp;아 ㅋㅋ 새벽에 정신 나가기 직전 인스타에 올리려고 갬성 한 스푼 얹어 사진도 찍었어요. 근데... 그... 놀랍게도 지금까지 올린 사진은 모두 다른 날이에요. 자료를 만들면서 계속 뭔가를 추가하게 되더라고요. 여기서 약간 교수님들을 존경하게 된 거 같아요. 어떻게 연구도 하시면서 수업 분량을 기가 막히게 딱 맞춰서 오시는지 너무 궁금해요 진짜... 짬에서 나오는 바이브는 숨길 수 없는 것인가요? 교수님들 ㄹㅇ Respect!<br>

<center><img src="/assets/images/posts/campuslife/Pythonic_Paradox/20250306_Pythonic_Paradox_30.jpeg"></center><br>
&emsp;여러분들은 수업을 들을 때, 어떤 스타일의 수업을 좋아하시나요? 저는 적당히 부드러운 분위기와 가끔 섞여있는 유머를 정말 좋아해요. 근데 그런 수업이 많지는 않잖아요. 제가 직접 무언가를 가르쳐보니 왜 그런지 알겠더라고요. 일단 그런 유머를 생각하기도 어려울뿐더러, 분위기가 싸해지는 걸 걱정하게 되고... 그렇다 보니 만드는 속도가 느려져요. 그리고 무엇보다 모두가 유머를 유머로 안 받아들이는 것도... 있을 수 있잖아요. 아마도 그래서 그런 게 아닐까... 하는 뇌피셜.<br>

&emsp;아 ㅋㅋ 근데 그런 거 모르겠고 ㅋㅋ 저는 이런 개그 요소를 하나씩 숨겨두는 걸 좋아해서 종종 챙겨뒀어요. 이럴 때라도 이렇게 담대하게 철판 깔고 드립도 쳐보고 하는 거죠. 안 그런가요? 회사에서 장난칠 수는 없잖아요~ ㅎㅎ<br>

&emsp;저 사진은 clear() 함수를 가르치면서 수업을 마무리하는 슬라이드였어요. clear() 하면 모든 아이템이 삭제된다는 걸 가르치면서 자연스럽게 점점 이 사진이 나타나 수업을 끝내고 마치 처음 화면으로 돌아간 것처럼 연출해서 장난 좀 쳤어요. <span style="color: #808080">(뭔 소리인지 이해 안 되면 정상입니다.)</span> 뭐... 누군가 안 받아주면 분위기 싸해지는 장난이지만, 어쩔티비~ 내가 재밌으면 그만임ㅋ 이라는 마인드로 밀고 갔어요. 다행히 누군가 받아줘서 덜 민망했지만 ㅎㅎ... 교수님들이 개그치고 뻘쭘해 하시는 이유를 간접적으로나마 체험했어요. 존경합니다. 교수님.<br>

&emsp;여러분들은 수업을 들을 때, 어떤 스타ㅇ... 아... 이게 아니지. 순간 저 사진 보고 블로그 쓰고 있다는 사실을 까먹을 뻔했네요. 정신 차리고 2주 차를 마무리해볼게요.<br>

<br><br>



## 정신 나갈 것 같애 정신 나갈 것 같애
<p class="posts-subtitle">3주 차 스터디 자료 제작 일지</p>

---

&emsp;아... 이게... 어렵네요... 시작할 때까지만 해도. 아니, 2주 차까지만 해도 기획하면서 자료도 만들어 놓아서 프로젝트 기간 중에는 놀면서 해도 충분했거든요...? 근데 3주 차 자료부터는 아무것도 없어서 맨땅에 머리 박아가며 만들고 출퇴근도 해야 되니 진짜 미치겠더라고요. 심지어 요즘 갑자기 출퇴근 시간이 너무 사악해져서 힘들었어요. 진짜 이때쯤 학생회장님이랑 지금이라도 보증금 돌려주고 없던 일로 할까 1680번 정도 고민했어요.<br>

&emsp;정말로... 학생회장님과 저 둘 다 잦은 조기 출근과 야근으로 자료를 만들 정신이 없었어요. 그래서 목요일 오후 10시에 제작을 시작했어요. 일단, 수업을 해내는 것이 목표였기에 대충 내용만 채워서 만드는 것이 목표였죠.<br>

<figure class="image-slider">
    <img src="/assets/images/posts/campuslife/Pythonic_Paradox/20250306_Pythonic_Paradox_31.png">
    <img src="/assets/images/posts/campuslife/Pythonic_Paradox/20250306_Pythonic_Paradox_32.png">
    <img src="/assets/images/posts/campuslife/Pythonic_Paradox/20250306_Pythonic_Paradox_33.png">
    <img src="/assets/images/posts/campuslife/Pythonic_Paradox/20250306_Pythonic_Paradox_34.png">
    <img src="/assets/images/posts/campuslife/Pythonic_Paradox/20250306_Pythonic_Paradox_35.png">
    <img src="/assets/images/posts/campuslife/Pythonic_Paradox/20250306_Pythonic_Paradox_36.png">
    <img src="/assets/images/posts/campuslife/Pythonic_Paradox/20250306_Pythonic_Paradox_37.png">
    <img src="/assets/images/posts/campuslife/Pythonic_Paradox/20250306_Pythonic_Paradox_38.png">
    <img src="/assets/images/posts/campuslife/Pythonic_Paradox/20250306_Pythonic_Paradox_39.png">
</figure><br>
&emsp;라고 했지만, 피곤해도 나름 최선을 다해서 만들었어요. 중간중간 사소한 실수나 옥에 티는 꽤나 많이 첨가됐지만, 스터디를 진행하는 데에는 전혀 지장 없게 만들어냈어요. 정신 나갈 뻔했어요. 목요일 22시에 시작해서 금요일 새벽 2시 정도까지 만들고, 4시간 30분 자고 일어나서 출근했으니 말이죠...<br>

&emsp;마감 압박을 받아가며 금요일 퇴근 후 완성을 위해 달렸어요. 하지만, 그러다 결국 수업 당일 오전 4시 52분에 그만 정신이 나가버리고만 학생회장단의 모습. 이들은 어쩌다가 이런 길을 걷게 된 것일까요? 그것이 알고 싶다.​<br>

<center><img src="/assets/images/posts/campuslife/Pythonic_Paradox/20250306_Pythonic_Paradox_40.jpeg"></center><br>
&emsp;아... 진짜... 이날 수업 못 할 뻔했어요. 진짜로... 수업 자료도 5시에 배포하고 겨우 쪽잠 자고... 어떻게 일어나서 (진짜 어떻게 일어났지?) 아침에 수업했는데... 와... 아찔했어요. 진짜 수업 포기할까요, 학생회장님?<br>

<figure class="image-grid">
    <img src="/assets/images/posts/campuslife/Pythonic_Paradox/20250306_Pythonic_Paradox_41.jpeg">
    <img src="/assets/images/posts/campuslife/Pythonic_Paradox/20250306_Pythonic_Paradox_42.jpeg">
</figure>
&emsp;라고 할 뻔 ㅋ 말 한마디가 천 냥 빚 갚는다더니... 진짜 이 두 분 아니었으면 정신이 나가서 포기하겠다고 했을 것 같아요. 익명 단톡방에 남겨주셔서 누군지 모르겠는데... 가 아니라 사실 추정 중이에요. 진짜 지명수배합니다. 블로그에 찾아오셨다면, 댓글로 자신임을 밝혀주세요! 특별한 상품이 기다리고... 있진 않지만, 감사 인사는 드리고 싶어요. 이 두 분 덕분에 에너지 충전되고 끝까지 완주할 수 있었던 것 같네요. 아, 물론 제 어설픈 수업을 열심히 들어주시는 84명의 신입생분들이 있어 끝까지 포기하지 않을 수 있었지만, 특히 힘이 됐다는 뜻이었어요. 정말로 이 블로그를 보실지는 모르겠습니다만, 지친 학생회장단에게 너무나도 달콤한 당근이 되어주셨어요. 감사합니다. 아무튼, 진짜로 은밀하게 제게 찾아오시면 밥이라도 한 번 사드릴게요. <span styel="color: #808080">(진짜 오면 당황할 예정...ㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋ 장난이고 진짜 편히 찾아와주세요!)</span><br>

&emsp;스터디 끝나고 기분 좋은 카카오톡 메시지 보고 흐뭇해서 입꼬리 정수리에 걸었다가 그대로 잠들었는데, 12시에 잠들어서 저녁 먹을 시간쯤에 깼어요. 음... 순식간에 바이오리듬이 깨지니 머리가 정말 아프더군요. 그래도 힘이 되는 말을 들었으니 힘내서 달려보자고요!<br>

<br><br>



## 말 한 마디에 폭주 시작
<p class="posts-subtitle">4주 차 스터디 자료 제작 일지</p>

---

&emsp;4주 차에는 설날이 걸쳐 있었어요. 저는 설날 연휴 내내 비상대기 근무를 담당했는데요, 말이 비상대기 근무지 사실 자택에서 대기하다가 상황이 터지면 출근하는 근무예요. 뭐... 말은 이렇게 하지만, 본가에는 못 내려갔어요. 본가에 못 내려ㄱ... 간... 다면...? Python 스터디 자료 제작 ㄱㄱ<br>

<center><img src="/assets/images/posts/campuslife/Pythonic_Paradox/20250306_Pythonic_Paradox_43.jpeg"></center><br>
&emsp;근데 학생회장님도 광기가 장난 아니에요. 학생회장님은 설날에 본가를 가셨는데, 시도 때도 없이 줌을 켜가며 거의 매일 저와 함께해 주셨어요. 덕분에 외롭지 않게 스터디 자료를 만들고, 또 만들고, 또또 만들고, 다듬고 간단한 과제를 만들었어요. 진짜 매일 모니터 너머로 만났어요. 이렇게 자주 만난 이유는, 3주 차가 너무 빡셌거든요. 정신 차리고, 시간이 많은 만큼 미리미리 만들어서 설날 연휴에는 5주 차까지 다 완성하고 미리 배포하자는 것이 저희의 계획이었죠. 오케이. 달려보자고요.<br>

<center><img src="/assets/images/posts/campuslife/Pythonic_Paradox/20250306_Pythonic_Paradox_44.jpeg"></center><br>
&emsp;네. 개@같이 실패했습니다. 신입생분들 매번 늦게 자료 드려서 죄송해요. 하지만 너무 힘든걸요... 이해해 주세요... 저희도 직장인 인걸... ㅜㅜ... 설날에 늦잠 자고 다른 학생회 일도 하고, 이것저것 처리하다 보니 스터디 자료 만들기가 점점 후순위로 밀리더라고요. 학생회 로드맵 수립에 새터 준비에 설날 연휴 중 출근에... 정신이 너무 없었어요. 매번 이해해달라는 말도 지칠 정도로... 안타깝더라고요. 다음에 이런 기회가 있다면 정말 미리미리 준비해서 더 좋은 퀄리티로 승부할게요. 다음이 있을지는 모르겠지만...?<br>

<figure class="image-slider">
    <img src="/assets/images/posts/campuslife/Pythonic_Paradox/20250306_Pythonic_Paradox_45.png">
    <img src="/assets/images/posts/campuslife/Pythonic_Paradox/20250306_Pythonic_Paradox_46.png">
    <img src="/assets/images/posts/campuslife/Pythonic_Paradox/20250306_Pythonic_Paradox_47.png">
    <img src="/assets/images/posts/campuslife/Pythonic_Paradox/20250306_Pythonic_Paradox_48.png">
    <img src="/assets/images/posts/campuslife/Pythonic_Paradox/20250306_Pythonic_Paradox_49.png">
    <img src="/assets/images/posts/campuslife/Pythonic_Paradox/20250306_Pythonic_Paradox_50.png">
    <img src="/assets/images/posts/campuslife/Pythonic_Paradox/20250306_Pythonic_Paradox_51.png">
    <img src="/assets/images/posts/campuslife/Pythonic_Paradox/20250306_Pythonic_Paradox_52.png">
    <img src="/assets/images/posts/campuslife/Pythonic_Paradox/20250306_Pythonic_Paradox_53.png">
    <img src="/assets/images/posts/campuslife/Pythonic_Paradox/20250306_Pythonic_Paradox_54.png">
</figure><br>
&emsp;비록 5주 차 자료는 미리 만들어두지 못했지만, 시간이 많았던 만큼 4주 차 강의 자료는 정말 신경을 많이 써서 만들었어요. 신경을 많이 써서 양도 많긴 했지만, 필연적으로 알면 좋을 개념들을 많이 포함해서 스터디를 이끌어 갔어요. 특히 전공 수업 중에 네임스페이스를 다루어 주시지 않는 것이 개인적인 불만이었는데, 여기서나마 제가 언급을 했어요. 근데... 교수님들이 왜 굳이 언급 안 하고 가는지 알아버릴 것만 같아요. ㅋㅋ... 음... 코드를 쳐보는 경험도 많이 없는데 당장 네임스페이스를 가르치는 게... 너무 비효율적이더군요... 그래도 뚝심있게 설명하긴 했지만, 처음 접하시는 분들께는 너무 어렵게 수업을 하지 않았나 싶네요.<br>

<center><img src="/assets/images/posts/campuslife/Pythonic_Paradox/20250306_Pythonic_Paradox_55.png"></center><br>
&emsp;그나저나, 앞에서 과제 이야기가 나온 김에 한 번 보여드리자면, 매번 이런 간단한 과제도 출제해 드렸어요. 보통 60-70% 정도의 인원만 제출을 해주시더라고요. 블로그에서나마 털어놓자면, 많은 분들이 과제를 낼 때마다 오류가 있다고 말씀을 해주셨어요. 음... 정말 죄송하지만, 사실... 교안에 비하면 과제는 힘을 거의 실지 않았어요. 교안은 만드는데 10시간 정도 걸렸다면, 과제를 만드는 데는 10분 정도 걸렸어요. 물론! 진짜 10분 만에 뚝딱 만들어낸 것은 아니에요 ㅋㅋㅋㅋ 교안을 만들고 문제 대충 생각해 보고 아... 이렇게 짜면 내가 생각한 대로 동작하려나...? 하고 급하게 만들었거든요. 오류가 많았던 이유는, 여기서나마 털어놓자면, 테스트를 거의 행하지 않았어요. 숫자 한두 개 넣어보고 괜찮아보이면 그대로 문제로 탑재했어요. 여기서 테스트의 중요성이 나오네요. 특히 경곗값 테스트와 유닛 테스트는 매우 중요한 것 같아요. 당연한 사실이지만, 또 하나 확실히 짚고 가네요.<br>

&emsp;4주 차와 5주 차의 경계에서 경곗값 테스트의 중요성을 다시 한번 알아차렸어요. 혼란을 드린 점은 죄송스럽게 생각해요... 이런 생각에 5주 차는 각별히 주의를 기울이고자 하며 진행했어요.<br>

<br><br>



## 프로젝트 중 마지막 수업
<p class="posts-subtitle">5주 차 스터디 자료 제작 일지</p>

---

<figure class="image-slider">
    <img src="/assets/images/posts/campuslife/Pythonic_Paradox/20250306_Pythonic_Paradox_56.png">
    <img src="/assets/images/posts/campuslife/Pythonic_Paradox/20250306_Pythonic_Paradox_57.png">
    <img src="/assets/images/posts/campuslife/Pythonic_Paradox/20250306_Pythonic_Paradox_58.png">
    <img src="/assets/images/posts/campuslife/Pythonic_Paradox/20250306_Pythonic_Paradox_59.png">
    <img src="/assets/images/posts/campuslife/Pythonic_Paradox/20250306_Pythonic_Paradox_60.png">
    <img src="/assets/images/posts/campuslife/Pythonic_Paradox/20250306_Pythonic_Paradox_61.png">
    <img src="/assets/images/posts/campuslife/Pythonic_Paradox/20250306_Pythonic_Paradox_62.png">
    <img src="/assets/images/posts/campuslife/Pythonic_Paradox/20250306_Pythonic_Paradox_63.png">
    <img src="/assets/images/posts/campuslife/Pythonic_Paradox/20250306_Pythonic_Paradox_63.png">
    <img src="/assets/images/posts/campuslife/Pythonic_Paradox/20250306_Pythonic_Paradox_65.png">
</figure><br>
&emsp;얼렁뚱땅 스터디를 진행하다 보니 어느덧 5주 차에 접어들었어요. 이 자료에도 비하인드가 있어요. 사실... 이 자료... 금요일 밤 9시부터 토요일 오전 7시까지, 하룻밤 만에 만들어 낸 자료예요. 5주 차는 정신적 체력에 한계가 찾아왔어요. 업무 신경 쓰기에 바빴고, 퇴근하면 곯아떨어지느라 바빴어요. 스터디 자료를 만들어야 한다는 사실을 알았지만, 그럴 힘이 없었어요. 결국 금요일 밤이 찾아왔고, 초사이언 각성 모드를 발동시켜 자료를 만들어 내는데 성공했어요. 매주 학생회장님과 줌을 연결해서 실시간으로 자료를 검수 받았는데, 5주 차에는 그런 것도 없이 불도저처럼 자료 제작을 밀고 나갔어요. 학생회장님께 감사드리는 점은 그동안 믿고 건들지 않아주시고 과제를 만들어 주셨어요. 새벽에 혼자 만들고 검수 받기까지는 너무 시간이 촉박했지만, 어쩔 수 없었어요. 내용은 많은데 당장 아침에 수업해야 하니까요.<br>

&emsp;또 하나 아쉬웠던 것은 5주 차 수업 내용이 너무 어려운 부분이었어요. 프로그래밍 입문자들이 우후죽순 집단 폐사한다는, 네임스페이스와 관련된 내용부터 시작해 클래스까지 한 호흡에 달려가는 수업이었거든요. 역시나... 다들 어려워하셨어요. 하지만, 어쩌면 당연한 수순이죠. 처음 듣고, 심지어 이렇게 빠른 템포로 진행되는 수업을 듣고 단번에 이해하고 활용한다는 것은 있을 수 없는 일이에요. 심지어 처음 접하시니 말이죠! 그래도 나름 제가 했던 과제를 자랑스럽게 자랑해가면서까지 이해시켜드리려 노력했는데... 잘 된 것 같지는 않아요. 솔직히 아쉬워요. 하루라도 빨리 시작해서 쉽게 이해시킬 수 있는 방법을 고민해볼걸 하는 생각이 들었던 것 같아요. 아무튼, 정말 아쉽습니다.<br>

<center><img src="/assets/images/posts/campuslife/Pythonic_Paradox/20250306_Pythonic_Paradox_66.jpeg"></center><br>
&emsp;아쉬운 건 아쉬운 거고, 다음에 잘하면 되는 거예요. 일단, 수업이 너무 성공적으로 무사히 끝났기 때문에 기념사진 한 방 찍었어요. 음... 미리 말씀드렸다면 좋았겠지만, 저도 정신이 없었던지라... 수업 끝날 때 사진 찍자고 말씀드려서 몇몇 분들은 카메라를 황급히 가리셨어요. 아쉽다! 다 같이 찍었으면 그야말로 드라마의 완성인데 말이죠. 흠... 그래도 충분히 멋있고 가치 있었기에 제 눈에는 너무 아름답고 아련하게 비치네요. 눈물 난다 ㅠㅠ...<br>

<br><br>



## 글쎄, 내가 있어 보이게 말하니 믿더라니까...?
<p class="posts-subtitle">Python 입문 프로젝트를 마무리 짓는 구두점, 형성평가</p>

---

&emsp;드디어 수업이 모두 종료됐어요. 이제는 형성평가만이 남았죠.<br>

&emsp;네? 제가 뭔데 시험까지 내고 평가를 하냐고요? ㅎㅎ... 스터디 우수자를 선발해서 과잠을 구매해서 주려는 저의 꽤가 숨어있죠! 사실 지금까지 스터디를 진행하며, 출석, 카메라 활성화 여부, 태도 점수, 과제 등등... 정말 많은 점수를 기록하고 있었어요. 그리고 그 마무리로 가장 큰 비중을 차지하는 건 형성평가 점수이죠. 뭐... 말은 거창하지만, 사실 우수자를 선발하기 위한 수단이었을 뿐, 진짜 평가를 위한 시험은 아니었어요. 애초에 그럴 목적으로 시작된 프로젝트가 아니었으니 말이죠.<br>

<figure class="image-slider">
    <img src="/assets/images/posts/campuslife/Pythonic_Paradox/20250306_Pythonic_Paradox_67.png">
    <img src="/assets/images/posts/campuslife/Pythonic_Paradox/20250306_Pythonic_Paradox_68.png">
    <img src="/assets/images/posts/campuslife/Pythonic_Paradox/20250306_Pythonic_Paradox_69.png">
    <img src="/assets/images/posts/campuslife/Pythonic_Paradox/20250306_Pythonic_Paradox_70.png">
    <img src="/assets/images/posts/campuslife/Pythonic_Paradox/20250306_Pythonic_Paradox_71.png">
    <img src="/assets/images/posts/campuslife/Pythonic_Paradox/20250306_Pythonic_Paradox_72.png">
</figure><br>
&emsp;문제는 이런 식으로 <span style="color: #808080">(저한테는 ㅋㅋ)</span> 어렵지 않게 출제했어요. 와 근데 있잖아요. 문제를 만들어 내는 것이 생각보다 어렵더라고요. 무언가, 어딘가 애매한 말이 있으면 안 되고, 오답은 어떠한 경우에도 참이 될 수 없어야 하고, 혹시 다른 프로그래밍 언어에서는 에러가 출력되지 않을 수도 있으니 Python으로만 제한해야 하는 것 등등... 고려할 것이 많더라고요. 사실 Python이라는 범주 내에서는 어느 정도 명확한 것들이 많아서 엄청 오래 걸리지는 않았는데, 선생님들이나 교수님들은 도대체 어떻게... 해내시는 거죠? 다시 한번 Respect하고 갑니다 ㄷㄷ...<br>

&emsp;아 참... 참고로 이 시험은 평가를 위한 시험이 아니라, 얼마나 익숙해졌는지 또는 더 익숙해졌으면 좋겠다는 생각에 오픈북으로 진행했어요.<br>

<center><img src="/assets/images/posts/campuslife/Pythonic_Paradox/20250306_Pythonic_Paradox_73.png"></center><br>
&emsp;그래서 그럴까요...? 중앙값이 90점, 평균 81.67점이라는 아주 높은 수준의 성취도를 달성했어요. 어... 이상치가 있긴 한데... 아무튼 제가 생각한 정도의 결과가 나왔어요.<br>

<figure class="image-slider">
    <img src="/assets/images/posts/campuslife/Pythonic_Paradox/20250306_Pythonic_Paradox_74.png">
    <img src="/assets/images/posts/campuslife/Pythonic_Paradox/20250306_Pythonic_Paradox_75.png">
    <img src="/assets/images/posts/campuslife/Pythonic_Paradox/20250306_Pythonic_Paradox_76.png">
    <img src="/assets/images/posts/campuslife/Pythonic_Paradox/20250306_Pythonic_Paradox_77.png">
    <img src="/assets/images/posts/campuslife/Pythonic_Paradox/20250306_Pythonic_Paradox_78.png">
    <img src="/assets/images/posts/campuslife/Pythonic_Paradox/20250306_Pythonic_Paradox_79.png">
</figure><br>
&emsp;강의에 대한 전반적인 만족도도 매우 높게 형성됐어요. 비하인드를 말씀드리자면, 강의평가를 진행하지 않으면 성적을 공개하지 않을 거라고 말씀드렸는데요. 사실 강의평가는 익명으로 진행해서 누가 응답했는지 알 수 없어요. ㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋ 넵... 사실 점수는 그냥 다 공개할 생각이었어요 ㅋㅋㅋㅋㅋㅋ 죄송합니다 ㅠㅠ 피드백이 너무 받고 싶었어요... 피드백 해달라고 하시면 잘 안 해주시더라고요... 어쩔 수 없는 블러핑이었습니다 ㅎ... 아무튼 피드백 결과는 제 기대 이상으로 나와서 만족스럽네요. 개인적으로 생각하기에는 템포가 매우 빨라서 어려웠을 거라 예상했거든요. 예상과는 다른 결과가 나온 것은 프로젝트 참여자가 똑똑한 분들이셔서 그런가!<br>

<center><img src="/assets/images/posts/campuslife/Pythonic_Paradox/20250306_Pythonic_Paradox_80.png"></center><br>
&emsp;감동도 잔뜩 받고 가네요. 감사합니다. 감사합니다. 감사합니다. 좋은 말씀 감사합니다. 만수무강하세요. 복받으세요. A+받으세요!!!<br>

<br><br>



## Python 입문 프로젝트 후기
<p class="posts-subtitle">제2대 응용AI융합학부 학생회장단 드림.</p>

---

<center><img src="/assets/images/posts/campuslife/Pythonic_Paradox/20250306_Pythonic_Paradox_81.jpeg"></center><br>
&emsp;진짜 끝났어요. 다양한 평가 항목들을 고려해 신중하게 스터디 우수자 10명을 선발했어요. 이분들께는 과잠을 대신 구매해 드렸답니다! 사실 학교 굿즈들 몇 개 포함해서 바리바리 챙겨드리고 싶었는데, 열정과 예산의 부족으로 과잠만 사드렸어요. 아... 라떼는 이런 거 없어서 내돈내산 과잠인데... 부럽다... <span style="color: #808080">(장난입니다 ㅎㅎ 웃어 넘겨주세요 ㅠㅠ)</span><br>

<center><img src="/assets/images/posts/campuslife/Pythonic_Paradox/20250306_Pythonic_Paradox_82.png"></center><br>
&emsp;와... 10개 시키는데 신경 곤두세우고 주문했어요... 이름과 손목 자수와... 주소까지... 실수 한 번 하면 그대로 조지는 겁니다. 빠짝 긴장하고 주문했어요. 다들 과잠 받고 기뻐하셨으면 정말 좋겠어요. 그리고 기회 되면 꼭 과잠 입고 같이 사진 한 번 찍고 싶네요 ㅎㅎ<br>

<hr class="vertical">

&emsp;Python 입문 프로젝트를 주관했던 사람의 입장에서도 후기와 피드백을 남겨볼게요.<br>

&emsp;일단, 굉장히 힘들었어요. 지금까지의 학부 생활 후기를 써둔 것처럼 엄살이기도 하지만, 진행하던 시기에는 너무 버거웠던 것 같아요. 퇴근하고 전공 도서와 Python 서적을 다시 펴고 내용을 읽고, 제가 가진 지식과 비교하고, 참고를 위한 유튜브 강의 영상을 보고, Python 공식 문서를 읽어보고, 자료를 만들고, 실수는 없는지, 잘못된 내용은 없는지까지 거치는 일련의 과정이 꽤나 버거웠어요. 아니, 어쩌면... 이 과정이 버거웠다기보다는 이 과정에서 느껴지는 부담감이 너무 버거웠던 것 같아요. 하지만, 그만큼 저를 많이 성장시켜 줬어요. 더 명확한 정보를 찾고 효과적으로 전달하기 위해 고민하고 발악해 보며 느낄 수 있는 것들이 정말 많았어요. 부담감을 이겨내기 위해서 더 많은 자료를 찾아보며 저 역시 많은 것을 배우고, 제 지식을 체계화 시킬 수 있었어요. 그리고 수업을 진행하며 제 지식과 의견을 더 효과적으로 전달할 수 있는 방법도 배울 수 있었어요. 또한, 무엇보다 말로 표현할 수 없을 만큼 뿌듯하고, 만족스럽고, 기쁜 감정이 들 때가 정말 많았어요.<br>

&emsp;아쉬웠던 점은 제 체력과 경험의 부재에서 오는 문제가 많았어요. 사실... 교안을 기획하는 건 출근해서 틈틈이 생각하면서 월급 훔치느라 까다롭지는 않았는데, 교안은 늘 급하게 제작되었고 배포도 너무 늦었던 것 같아요. 최소 3일 전에 배포되었다면, 수업을 듣는 신입생분들이 더 효과적으로 이해할 수 있었지 않았을까...라는 생각이 들어요. 또, 욕심이 너무 과했던 것 같아요. 6번의 스터디에 형성평가가 포함되어 있으니 사실 5번만 수업할 수 있었는데요, 5번의 수업으로 방대한 정보를 전달하려다 보니 너무 급했던 것 같기도 해요. 신입생분들께는 매번 어쩔 수 없다는 핑계를 댔지만, 사실 제가 더 치밀하게 기획하고 계획했더라면 어느 정도는 타협할 수 있는 부분이 있지 않았을까 싶기도 해요. 또, 피드백 결과가 정말 좋게 나왔지만 표본이 적다는 점, 그리고 정말 혹시나 우리 학부에서 저의 후배가 된다는 점이 정직한 답변을 제공하지 못하게 한 것도 있고 질문 자체가 관찰자 편향이 나타나게끔 작성된 것도 없지 않아 있지 않았나... 싶어요. 아니라고 말씀하시겠지만, 개인적으로 그렇게 느꼈어요.<br>

&emsp;싫은 소리는 이 정도만 하시죠 ㅋㅋㅋ. 결국은 시간에 쫓겨 아쉬웠다는 이야기니까요! 조금만 여유로웠으면 좋았겠다는 한탄 정도로 넘겨주세요 ㅎㅎ. 뭐가 됐든 너무나도 소중한 추억이 됐어요. Python에 대해서 더 깊게 이해할 수 있었고, 더 많은 분들과 의사소통을 하며 나름의 스킬도 배울 수 있었어요. 그리고 말로 표현할 수 없는 성취감과 만족감, 스터디 운영 경험까지 얻을 수 있었어요. 신입생분들은 Python에 대한 막연한 거부감을 없애고, 서로를 조금이나마 일찍 만나볼 수 있는 그런 좋은 기회가 될 수 있었지 않았을까 싶어요. 아무튼 서로 윈-윈이었겠죠? 아닐 수도 있지만, 부디 그렇길 간절히 바라보며 이만 글을 매듭지어볼게요.<br>

&emsp;이름도, 얼굴도 모르는 저를 단지 부학생회장이라는 이유만으로 믿어주시고 저의 무모한 프로젝트에 과감히 참여해 주신 고마우신 분들! 2025년 1월 11일 토요일 ~ 2월 22일 토요일까지 7주간 진행된 6번의 스터디<span style="color: #808080">(1번은 휴강)</span> 동안 정말 수고 많으셨고, 정말 감사드립니다. 덕분에 나름의 훌륭한 프로젝트도 완성해 보네요. 값진 경험을 할 수 있게, 그리고 이 프로젝트를 완성할 수 있게 적극적으로 협조해 주셔서 정말 감사드려요. 응용AI융합학부 25학번 새내기분들의 25-1학기의 성공적인 적응과 더욱 재밌고 화려한 학부 생활을 진심으로 응원할게요.<br>

&emsp;긴 글 읽어주셔서 감사합니다. 지금까지 개구리의 밀실 블로그 주인장 개구ㄹ.. 아, 이게 아니지! 성균관대학교 제2대 응용AI융합학부 부학생회장 박현욱이었습니다.<br>

<br><br>

<p class="end-of-post">End of Post.</p>
