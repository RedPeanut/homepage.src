---
title: 블로그를 다시 만들면서
insert: 2023-03-04 01:30
update: 2023-03-09 21:40
layout: 
thumbnail: 
summary: 
tags: [renewal,ssr]
---

## 내용
블로그(<a href="https://github.com/RedPeanut/redpeanut.github.io.src-archived" target="_blank">예전소스</a>)를 개편했다.
주내용은 <a href="https://github.com/gatsbyjs/gatsby" target="_blank">개츠비</a>를 걷어냈다. 개츠비를 걷어낸 주요 이유는 다음과 같다.

- 툴 페이지를 만들면서 웹팩 설정에 대한 직접적인 조작의 필요성을 느꼈으나 개츠비가 웹팩 설정을 감추고 있음
- 개츠비 설정 및 디버깅에 대한 러닝커브 시간이 실무에 도움이 안된다고 (시간낭비라고) 느낌
- 내가 필요로하는 개츠비의 기능(markdown 파일에 대한 기계적인 변환 = ssr의 주기능)이 그렇게 heavy 하다고 느끼지 않음

개츠비 버전 0.12.48(2017년 6월 16일) 버전 내용을 그대로 카피 했으며, 웹팩의 커스텀 로더 구성과 동작을 느껴본 시간이었다.

ssr(Static Site geneRation)의 주요 동작은 로더를 통한 markdown 파일 라우터 구성과 wrapper 구성이다.

## Epilogue
남이 만든 코드를 한땀 한땀 따라해보는 좋은 경험이었으며, 프레임워크?(웹팩,리액트)에 대한 높고 빠른 이해도와 코딩력을 갖춘 창작자(<a href="https://github.com/KyleAMathews" target="_blank">Kyle Mathews</a>)에 대해 경외심을 느끼게하는 시간이었다.
