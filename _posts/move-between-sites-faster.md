---
title: '사이트 간 이동을 조금 더 빠르게'
description: '웹 사이트 간 이동 속도를 최적화하는 방법을 소개합니다. 프론트엔드 성능 향상을 위한 DNS-prefetch와 preconnect 활용법을 알아보세요.'
excerpt: ''
coverImage: '/assets/blog/move-between-sites-faster/cover.webp'
date: '2024-08-01T09:57:21.546Z'
ogImage:
  url: '/assets/blog/move-between-sites-faster/cover.png'
  alt: '마우스 커서 그림'
keywords: '웹 성능 최적화,최적화,DNS-prefetch,preconnect'
---

[이 글](/posts/what-is-your-name-dns-server)에서 DNS에 대해 간단히 알아보았습니다. 제 블로그에 방문하려면 DNS 서버에서 제 블로그 도메인에 대한 IP 주소를 받아와야 한다는 것을 알 수 있습니다. 물론, 제 블로그에서 다른 사이트로 이동할 때도 동일한 과정을 수행해야 하겠죠. 그렇다면 프론트엔드 개발자로서 이 부분을 어떻게 최적화할 수 있을까요?

## DNS-prefetch

`DNS-prefetch`는 리소스가 요청되기 전에 출처의 도메인 이름으로 해당 도메인의 IP 주소를 알아내어 캐싱하려는 시도입니다. 나중에 로드되는 이미지, 폰트 같은 파일이나 사용자가 이동하려는 링크 대상일 수 있습니다.

브라우저가 다른 출처의 서버에서 리소스를 요청할 때 마찬가지로 해당 출처의 도메인 이름으로 IP 주소를 알아내야 합니다. 출처(도메인)가 다른 링크로 이동이 잦거나, 다른 출처의 리소스를 많이 요청하는 경우 DNS 확인에 오랜 시간이 걸릴 수 있는데 이를 해결하기 위해 주로 사용합니다.

### 문법

```html
<link rel="dns-prefetch" href="https://another.web.domain" />
```

문서의 `<head>`요소의 자식 요소로 배치합니다.

## preconnect

`<link>` 요소의 `rel` 속성에 사용되는 `preconnect` 키워드는 브라우저에게 사용자가 대상 리소스의 출처(도메인)에서 리소스를 필요로 할 가능성이 높다는 힌트를 제공합니다. 따라서 브라우저는 그 출처로의 연결을 사전적으로 시작하여 사용자 경험을 향상시킬 수 있습니다. `preconnect`는 지정된 출처에서 미래의 로드를 빠르게 하기 위해 미리 핸드셰이크(DNS+TCP, HTTPS 출처의 경우 DNS+TCP+TLS)를 수행합니다.

하지만 페이지가 많은 서드파티 도메인에 연결해야 하는 경우, 모두 preconnect를 시도하는건 비효율적일 수 있습니다. 이 힌트는 가장 중요한 연결에만 사용하는 것이 좋고, 그 외의 경우에는 `dns-prefetch`만 사용해도 충분합니다.

### 문법

```html
<link rel="preconnect" href="https://another.web.domain" />
```

문서의 `<head>`요소의 자식 요소로 배치합니다.

## 한 번 시도해볼까요?

제 블로그에는 외부로 연결되는 이력서 링크가 하나 있습니다. 저는 블로그 방문자들이 이곳으로 빠르게 이동하기를 원합니다. 그래서 블로그의 `<head>`에 `preconnect`를 추가하고, 실제로 방문 시 속도가 얼마나 빨라졌는지 측정해 보았습니다.

먼저, MacOS에서 DNS 캐시를 지우며 테스트를 진행하기 위해 아래 명령어를 사용했습니다:

```sh
sudo dscacheutil -flushcache; sudo killall -HUP mDNSResponder
```

그리고 특정 리소스의 타이밍 정보를 가져오기 위해 아래 JavaScript 코드를 사용했습니다:

```js showLineNumbers
// 특정 리소스의 타이밍 정보 가져오기
function getResourceTiming(url) {
  const entries = performance.getEntriesByName(url);
  if (entries.length > 0) {
    const entry = entries[0];
    return {
      dnsLookup: entry.domainLookupEnd - entry.domainLookupStart,
      tcpHandshake: entry.connectEnd - entry.connectStart,
      tlsNegotiation:
        entry.secureConnectionStart > 0 ? entry.connectEnd - entry.secureConnectionStart : 0,
      total: entry.duration,
    };
  }
  return null;
}

// 예시 URL에 대해 타이밍 정보 출력
const timing = getResourceTiming('https://~~~');
if (timing) {
  console.log(`DNS Lookup: ${timing.dnsLookup}ms`);
  console.log(`TCP Handshake: ${timing.tcpHandshake}ms`);
  console.log(`TLS Negotiation: ${timing.tlsNegotiation}ms`);
  console.log(`Total: ${timing.total}ms`);
}
```

위 함수를 타겟 페이지가 로드된 이후 개발자 도구에서 실행했습니다.

테스트는 다음과 같이 진행했습니다. 타겟: 이력서 페이지, 이력서 다운로드 페이지

1. duchi.click 블로그를 거치지 않고 바로 접근
2. duchi.click 블로그에서 링크를 클릭하여 접근
3. 페이지 로드 시간 측정

**이력서 다운로드 페이지**

|                 | 직접 접근 | 블로그를 통한 접근 |
| --------------- | --------- | ------------------ |
| DNS Lookup      | 170ms     | 0ms                |
| TCP Handshake   | 166ms     | 0ms                |
| TLS Negotiation | 166ms     | 0ms                |
| Total           | 5,277ms   | 3,777ms            |

**이력서 페이지**

|                 | 직접 접근 | 블로그를 통한 접근 |
| --------------- | --------- | ------------------ |
| DNS Lookup      | 20ms      | 0ms                |
| TCP Handshake   | 14ms      | 0ms                |
| TLS Negotiation | 13ms      | 0ms                |
| Total           | 766ms     | 605ms              |

이력서 페이지에서는 약 `161ms` 감소했고, 이력서 다운로드 페이지에서는 약 `1,500ms` 감소했습니다.
테스트 실행 횟수가 많지 않아 신뢰도가 떨어질 수 있지만, 그래도 유의미한 결과를 확인할 수 있었습니다.

네트워크 지식을 활용해 프론트엔드에서 최적화할 수 있는 부분을 살펴보았습니다. 직접 시도해보면서 성능 향상을 확인할 수 있었습니다. 재미있는 과정이니, 여러분도 한 번 도전해 보세요!!

## 참고 자료:

- [Using dns-prefetch](https://developer.mozilla.org/en-US/docs/Web/Performance/dns-prefetch)
- [rel=preconnect](https://developer.mozilla.org/en-US/docs/Web/HTML/Attributes/rel/preconnect)
