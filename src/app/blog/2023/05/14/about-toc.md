---
title: Table of Contents를 구현하면서
insert: 2023-05-14 18:00:00
layout: 레이아웃명
thumbnail: 썸네일이미지.jpg
summary: 
tags: [TOC]
---

# 내용
의외로 힘들었다. 우선 마크다운에서 헤딩에 대한 정보를 추출하는 라이브러리가 필요할지도 몰랐다. 개츠비에 이미 구현된 내용이 있어서 그대로 카피했다.([remark](https://www.npmjs.com/package/remark), [mdast 유틸군](https://github.com/syntax-tree) 라이브러리 추가)

헤딩에 대한 연결을 위해 변환된 헤딩(h1,h2,h3,...)에 a link를 삽입해 줄 필요가 있었다. 이미 개츠비에서 autolink-headers라는 기능으로 제공해주고 있었고 역시 그대로 카피했다. 이 부분에서도 [mdast 라이브러리](https://github.com/syntax-tree)가 관여한다.

세번째는 아직 진행중인 부분인데 url 에서 hashbang을(/#/) 제거해야 할것 같다. hashbang이 # 태그를 통한 페이지 이동을 막고 있다. single page application의 특성(component reload technique)을 살리면서 전통적인 url 패턴을 유지하기 위한 기교라는 사실을 알게되었으나, 이러한 제약이 생긴다는 사실을 알게되었다. 또한 검색엔진의 페이지 수집을 방해하는 요인이라고 하니 좀 고민해봐야할 것 같다.

# 에필로그
간단한 작업일 것이라 생각하고 있었는데, 의외로 시간이 많이 소요되고 있고, 아직 미완성이나 hashbang 제거는 시간이 많이 소요될것 같아 일단 현상태로 운영 반영 했다.
