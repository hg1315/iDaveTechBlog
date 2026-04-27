# md_blog_maker

Next.js App Router로 마크다운을 정적 블로그로 렌더링합니다. [DESIGN.md](./DESIGN.md)의 토큰(다크 캔버스, 일렉트릭 옐로)을 UI에 반영합니다.

## 콘텐츠 규칙

- **경로**: `content/<주제>/YYYY-MM-DD_슬러그.md`  
  - 한 단계의 주제 폴더만 사용합니다.  
  - 예: `content/react/2025-04-27_hello-world.md`
- **파일명**: `YYYY-MM-DD_제목-슬러그.md` 형식이어야 합니다. (날짜는 `YYYY-MM-DD` 고정)
- **URL**: `/<주제>/<파일이름(확장자 제외)>`  
  - 예: `/react/2025-04-27_hello-world`
- **Frontmatter(선택)**: `title`, `description`, `tags` — 없으면 제목은 파일의 슬러그에서 유추됩니다.

잘못된 파일명은 빌드 시 **경고로 건너뛰며**, 한 주제·한 키(`날짜_슬러그`)당 글은 하나로 가정합니다.

## 개발

```bash
npm install
npm run dev
```

<http://localhost:3000> 에서 확인합니다.

## 빌드

```bash
npm run build
npm run start
```

## Vercel 배포

1. GitHub에 이 저장소를 푸시합니다.
2. [Vercel](https://vercel.com)에서 **Add New… → Project**로 해당 저장소를 import합니다.
3. Framework: **Next.js** (기본), Build: `next build`, Output: 기본값 그대로입니다.
4. `content/` 아래 마크다운이 저장소에 포함되면, 배포 빌드 시 동일하게 SSG 페이지가 생성됩니다.

추가 환경 변수는 필수는 아닙니다.

## 스택

- Next.js 16, React 19, TypeScript, Tailwind CSS v4  
- `gray-matter`, `react-markdown`, `remark-gfm`, `rehype-highlight`, `fast-glob`

## 라이선스

MIT (필요 시 프로젝트에 맞게 수정)
