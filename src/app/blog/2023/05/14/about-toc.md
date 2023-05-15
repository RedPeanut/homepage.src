---
title: Table of Contents를 구현하면서
insert: 2023-05-14 18:00:00
layout: 레이아웃명
thumbnail: 썸네일이미지.jpg
summary: 
tags: [TOC]
---

# 내용
의외로 힘들었다. 우선 마크다운에서 헤딩에 대한 정보를 추출하는 라이브러리가 필요할지도 몰랐다. 개츠비에 이미 구현된 내용이 있어서 그대로 카피했다.(<a href="https://www.npmjs.com/package/remark" target="_blank">remark</a>, <a href="https://github.com/syntax-tree" target="_blank">mdast 유틸군</a> 라이브러리 추가, AST(Abstract Syntax Tree) 개념 및 동작파악 등은 스킵(별로 관심 없다))

TOC와 헤딩에 대한 연결 동작을 위해 변환된 헤딩(h1,h2,h3,...)에 id를 삽입해 줄 필요가 있었다. 이미 개츠비에서 autolink-headers라는 기능으로 제공해주고 있었고 역시 그대로 카피했다. 이 부분에서도 <a href="https://github.com/syntax-tree" target="_blank">mdast 라이브러리</a>(<a href="https://github.com/RedPeanut/redpeanut.github.io.src/commit/cdf749f" target="_blank">cdf749f</a>)가 관여한다.

세번째는 아직 진행중인 부분인데 url 에서 hashbang을(/#/) 제거해야 할것 같다. hashbang이 # 태그를 통한 페이지 이동을 막고 있다. single page application의 특성(component reload technique)을 살리면서 전통적인 url 패턴을 유지하기 위한 기교라는 사실을 알게되었으나, 이러한 제약이 생긴다는 사실을 알게되었다. 또한 검색엔진의 페이지 수집을 방해하는 요인인 점은 너무 치명적인것 같다.

# 에필로그
간단한 작업일 것이라 생각하고 있었는데, 의외로 시간이 많이 소요되고 있고, 아직 미완성이나 hashbang 제거는 시간이 많이 소요될것 같아 일단 현상태로 반영 했다.

# TODO
1. 토렌트,DHT 
- peer 찾는 동작 부터 차근차근
- 깊게깊게
1. 포스트 작성
- DIFF
- DHT
1. hello-forty
- 실행가능 app 으로
- 포스트 작성
1. vscode
- 개인적으로 너무너무 물고,뜯고,맛보고 싶은 앱이다.
