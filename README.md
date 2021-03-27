## 🏠bearbnb Team Project

### 프로젝트 소개

- 위코드 2주차 팀 프로젝트로 숙박 공유 경제 서비스인 [Airbnb](https://www.airbnb.co.kr/) 디자인 및 기획을 참고하여 만든 팀 프로젝트입니다.
- 개발 초기 세팅부터 레이아웃 및 기능은 모두 직접 구현한 코드로 데모영상에서의 데이터는 실제 백엔드 서버와 연결되었을 때의 화면입니다.
  <br />
  (🤸‍♀️아래 이미지 클릭시 데모영상 확인가능합니다!)
  [![](https://img.youtube.com/vi/RFja9gWiVzs/maxresdefault.jpg)](https://youtu.be/RFja9gWiVzs)

### bearbnb 팀원 소개

- FrontEnd Developer : 정민선(PM), 김승완, 태성현
- BackEnd Developer : 김건희, 윤정민, 홍연우

### 프로젝트 기간

2021.01.25 ~ 2021.02.05 약 2주간 진행

### 기술 스택

- HTML/CSS
- React.js, React Hooks(CRA settings)
- Redux
- react-router-dom
- Kakao Login API
- Google Map API
- react-dates library
- styled-components

### 협업 도구

- Slack
- Trello
- Git + GitHub

### 담당 페이지 및 구현한 기능

1. 메인페이지

- React functional component를 적용하여 레이아웃 구현

2. Navbar

- 스크롤 반응형 네브바 구현
- react-dates library를 사용하여 캘린더 구현 및 커스텀 스타일 적용
- 게스트 인원 모듈 구현
- Redux를 사용하여 검색 키워드 전역 상태관리
- router state로 전페이지 관련 상태 내용 동기화

3. 로그인 / 회원가입

- Kakao API를 사용하여 소셜 로그인 및 회원가입 기능 구현 및 인증 토근 발급 완료

4. 상품 디테일 페이지

- url parameter를 이용한 동적라우팅 기능 구현
- RESTful API를 사용하여 백엔드 API 연결
- Google Map API를 이용한 좌표 및 마커 설정 기능
- 리뷰 모달창 구현
- axios library를 사용하여 외부 API 데이터를 받아와서 infinite scroll 기능 구현

### 레퍼런스

- 해당 프로젝트는 [Airbnb](https://www.airbnb.co.kr/) 사이트를 참조하여 학습목적으로 만들어졌습니다.
