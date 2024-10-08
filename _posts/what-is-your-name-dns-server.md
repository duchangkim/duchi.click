---
title: '너 이름이 뭐니: DNS 서버'
description: '이 글에서는 DNS(Domain Name System)의 기본 개념과 작동 원리에 대해 간단히 설명합니다. 프론트엔드 개발자가 사용자 경험을 개선할 수 있는 최적화 방법도 확인할 수 있습니다.'
excerpt: ''
coverImage: '/assets/blog/what-is-your-name-dns-server/cover.webp'
date: '2024-07-31T09:02:41.613Z'
ogImage:
  url: '/assets/blog/what-is-your-name-dns-server/cover.png'
  alt: 'DNS 서버 이미지'
keywords: 'DNS,DNS 서버,최적화'
---

최근 홈서버를 구축하면서 여러 가지 새로운 경험을 했습니다. 그 중 DNS(Domain Name System, 도메인 이름 시스템)에 대해 이야기해보고자 합니다.

제 블로그는 브라우저에서 "https://duchi.click" 라는 주소로 접근할 수 있습니다. 또 구글은 "https://google.com" 이라는 주소로 접근이 가능합니다. 우리는 자연스럽게 우리가 사용하는 언어로 특정 사이트에 접근할 수 있습니다. 이는 DNS 서버 덕분입니다.

## DNS

여기에서 DNS는 사람이 이해하고 기억하기 쉬운 도메인 이름을 컴퓨터가 이해할 수 있는 IP 주소로 변환해주는 시스템입니다. DNS가 없다면 우리는 구글에, 제 블로그에 접속하기 위해 복잡한 IP 주소를 기억해서 브라우저 주소 창에 입력해야 할 것입니다. `168.123.456.789` 이런 식으로 말이죠. (더 복잡한 `2400:cb00:2048:1::c629:d7a2` 같은 IPv6도 있답니다...!)

DNS 서버는 여러 종류가 있습니다. 간단하게 설명하면 이렇습니다. 재귀 서버와 권한 있는 서버로 크게 나뉘고, 권한 있는 서버는 루트 이름 서버, TLD(Top-Level Domain) 이름 서버, 2단계 도메인 이름 서버를 포함합니다. 각각의 서버가 무엇이며 어떤 역할을 하고 있는지 이 글에서는 자세하게 다루지 않겠습니다.  
참고: [https://www.ibm.com/kr-ko/topics/dns](https://www.ibm.com/kr-ko/topics/dns)

## 그래서, DNS는 어떻게 작동하는데?

**재귀 확인자**

> 인터넷 서비스 공급자가 제공하는 사전 정의된 DNS 서버 또는 네트워크 내 DNS 서버

사용자가 제 블로그에 접속하려고 "duchi.click" 도메인 이름을 입력하면, 재귀 확인자는 캐시에서 입력한 도메인의 해당 IP 주소를 먼저 확인합니다. 캐시에 없는 경우 루트 이름 서버로 요청을 보냅니다.

**루트 이름 서버**  
루트 이름 서버는 입력한 도메인에 대한 적절한 TLD 서버를 가리킵니다. 현재 예시에서는 ".click"의 TLD DNS 서버를 가리킵니다.

**TLD DNS 서버**  
TLD DNS 서버는 `.com`, `.click`, `.io` 등 최상위 도메인을 관리합니다. 루트 DNS 서버로부터 요청을 받은 TLD DNS 서버는 입력한 도메인("duchi.click")의 2단계 도메인 이름 서버(권한 있는 DNS 서버라고도 합니다)를 가리킵니다.

**2단계 도메인 이름 서버 (권한 있는 DNS 서버)**  
TLD DNS 서버로부터 요청을 받은 권한 있는 DNS 서버는 입력한 도메인의 IP 주소를 반환합니다.

재귀 확인자가 응답으로 받은 IP를 캐시에 저장하고 브라우저에게 반환하면, 브라우저는 IP 주소를 통해 서버에 문서를 요청합니다. 그러면 드디어 제 블로그가 화면에 렌더링되기 시작합니다.

## 프론트엔드 개발자를 위한 다음 단계

이렇게 간단하게 DNS의 기본 개념과 작동 원리에 대해 알아보았습니다. 이제 프론트엔드 개발자가 이 정보를 활용하여 어떻게 사용자 경험을 개선할 수 있는지에 대해 알아보겠습니다. [이 글](/posts/move-between-sites-faster)에서는 DNS 프리페칭, 프리커넥트 를 통한 최적화 기법을 통해 사이트 사용 경험을 향상시키는 방법을 소개합니다.
