# 리뷰

## 공통

1. 오탈자 제대로 체크할 것
2. `//@NOTE` 로 검색해서 코멘트 확인

## 마크다운

1. `> ~~` 의 형태로 코멘트 작성
2. indent를 명확하게 구분해서 작성할 것.
   - indent가 명확하지 않으면 코멘트가 어디에 해당하는지 알기 어려움
   - 문단이 indent 기준으로 나뉘어지므로 명확하게 구분할 수 있어야 함
3. 내가 작성한 마크다운의 프리뷰를 수시로 확인해볼것
   - 내가 생각한대로 마크다운이 작성되었는지 확인할 수 있음


## Client

1. 컴포넌트는 `UpperCamelCase`를 사용함
    - 하지만 전부 `lowerCamelCase`를 사용
2. 단어간의 결합은 `lowerCamelCase`를 사용함
    - 하지만 잘 지켜지고 있지 않음
3. 전체적으로 오탈자에 신경쓰지 않는 듯함
4. `@emotion`으로 작성된 컴포넌트의 변수명이 모호함
    - 이름만 보고 이게 무엇인지 바로 알 수 있을정도로 직관적이고 명확해야 함.
    - HTML 기본 태그를 확장하는 경우에는 더 신중해야 함.
      - ex) `Body` 같은 변수명은 `body`를 사용한건지, 컨텐츠의 body 영역인건지 불분명함
5. 미사용 import문은 바로바로 지울것
6. 전역(`global`)에서 사용되는건 `src` 밑으로 둘 것
   1. 개발자가 바로 확인할 수 있는 위치에 둘 것 (`comp/store/**` 처럼 depth가 깊어지면 찾기 어렵고, 해당 데이터들이 `component`와도 맞지 않음)
   2. `store` 디렉토리는 `component` 밑이 아닌 `src` 밑으로 빼서 관리 할 것
      - `store`는 전역에서 사용하다보니 주로 `src` 밑에 둠
      - 특정 컴포넌트 내에서만 사용되면 `store/**` 디렉토리를 만들어서 관리하거나, 특정 컴포넌트와 같은 위치에 작성함
   3. `router` 디렉토리는 `component` 밑이 아닌 `src` 밑으로 빼서 관리 할 것
      - 라우터는 앱 전체의 경로이동을 관리하므로 접근이 용이한 곳에 두는것이 좋음
   4. `wrapper`는 `component` 밑에 둘 것
      - `wrapper`는 특정 컴포넌트를 감싸는 역할을 하므로 해당 컴포넌트와 같은 위치에 둠
7. 별다른 이유없이 단어를 축약하지 말것
   - 모두가 다 줄여쓰는 단어라도 축약하지 말 것 (누군가는 모를 수 있음)


## Server

1. .env
   - .env 파일에는 중요정보가 다 있기 때문에 ***git에 절대 올리지 말 것***
   - `.env.sample` 과 같은 임의의 파일을 작성해 git에 올리는 편
   - .env 파일은 띄어쓰기를 사용하지 않음
   - .env 에서는 별개의 텍스트를 구분하기 위해 따옴표를 사용하지 않음
2. `js`와 `jsx`를 구분하여 사용할 것
   - `js`와 `jsx`는 명확하게 다르다.
   - 아무곳에서나 `jsx`를 사용하지 말 것
3. `node_module`을 git에 올리지 말 것
   - `.gitignore`를 이용해 처리하도록 함
