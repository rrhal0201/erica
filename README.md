# Smart AI Study Companion

Vercel 배포용 스마트 AI 공부 도우미 웹앱 프로젝트입니다.

## 프로젝트 구성
- `index.html`: 프론트엔드 인터페이스 (화면 잠금, 공부 타이머, 재화 적립, 타임테이블, 알람)
- `api/generate.js`: Vercel Serverless Function (Gemini API 서버리스 호출)
- `package.json`: `@google/genai` 패키지 의존성
- `vercel.json`: 라우팅 및 빌드 설정

## 배포 방법
1. 이 압축파일의 해제된 내용 전체를 GitHub 저장소에 커밋/푸시합니다.
2. [Vercel](https://vercel.com) 대시보드에서 해당 레포지토리를 불러옵니다.
3. **Environment Variables** 메뉴에서 `GEMINI_API_KEY` 환경변수에 Google Gemini API Key를 입력합니다.
4. 배포(Deploy)를 완료합니다.
