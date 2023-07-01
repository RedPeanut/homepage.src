---
title: 하나의 시련
insert: 2023-06-19 12:00:00
thumbnail: 
summary: 
tags: [tools,github.io,subfolder issue]
---

# 내용
툴 페이지를 만들고 있다. 그런데 github.io 에 올리고 보니 문제가 생겼다.
서브폴더에 올린 앱이 경로때문에 리소스를 제대로 불러오지 못하고 있다.

publicPath에 대해 webpack-dev-server가 정확히 어떻게 다루는지 잘 모르겠다.
분명히 제대로 맞춘것같은데 안된다.

```json
output: {
  publicPath: '/tools',
  ...
},
devServer: {
  publicPath: '/tools',
  contentBase: 'src/www',
  historyApiFallback: {
    index: "/tools"
  },
  ...
},
```

# 에필로그
다른 것들도 하고싶은게 많은데 자꾸 해야할 일이 생긴다.
-> 그냥 github 서브 계정으로 만들었다.
덕분에 한 컴퓨터에서 github 계정을 2개이상 사용하는 법에 대해 알게되었다.
webpack-dev-server 코드도 한번 훑어보는 시간을 가질수 있었는데, 의외로 별게 없었다.

# TODO
이번 TODO는 이전과 유사하다. 갑자기 광고 떡칠한 툴싸이트들 보고 필받아 툴페이지 만드는데 시간을 많이 할애했다. 아직 쓸만해지려면 훨씬 더 꾸며야 하지만...

1. stock: finance guide 버전 만들어보기
1. 툴s: Buy a coffee
1. 토렌트: 시각화
1. 포스트: DIFF,DHT
