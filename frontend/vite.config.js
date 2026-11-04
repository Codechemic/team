import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// 백엔드 서버 주소: Spring Boot 기본 8080, Express라면 포트만 바꾸면 됩니다.
export default defineConfig({
  plugins: [react()],
  server: {
    port: 5173,
    proxy: { '/api': 'http://localhost:8080' },
  },
});
