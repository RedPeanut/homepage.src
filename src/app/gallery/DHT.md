---
title: DHT
insert: 2019-05-01 12:00:00
update: 2023-11-05 12:00:00
layout: 레이아웃명
thumbnail: 썸네일이미지.jpg
summary: 
tags: [dht,webtorrent]
---

## 소개
분산해시테이블이라고 부르며 Distributed Hash Table 의 약자다.
임의 해시값으로 네트워크 스웜에서 값을 찾아 내는 과정속에서 사용되는 자료구조이다.
핵심원리는 해시값을 통한 xor 연산이 삼각부등식을(C<=A⊕B) 만족한다는 원리에 따라 거리 계산에 사용될 수 있음을 발견하면서, 반복된 질의를 통해 점점 더 내가 원하는 값을 찾아갈수 있다는 내용이다.(Kademlia)
Pastry 등 다른 이론들도 있었지만 복잡도 때문에 결국 Kademlia가 평정했다.

사용예는 토렌트 프로그램이 대표적이며 비트코인에서도 쓰인다. 비트코인은 분산해시테이블 개념을 파일쉐어링 외 다른 쓰일만한 곳을 찾는 과정에서 은행업무(송금)에 적용시켜본 시스템이다. 

## 상세
스웜에 참여 하기 위한 부트스트랩 노드(예.router.bittorrent.com:6881)가 필요하며, 이후 내가 찾는 노드에 대한 무한 질의 반복이다.
언제 질의를 멈출지와 보다 많은 피어를 찾기 위한 로직이 토렌트 클라이언트 프로그램의 핵심이며, 내가 지금 현재 깊게 탐구하고 있는 부분이다. libtorrent(c++) 라이브러리가 제일 뛰어난 성능으로 시장을 평정한 느낌이다.
하지만 난 c++ 진입장벽 때문에 webtorrent(node)로 탐구 중이다.

## Links
<a href="https://github.com/RedPeanut/torrent-ts" target="_blank">https://github.com/RedPeanut/torrent-ts</a>