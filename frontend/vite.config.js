import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// 백엔드는 Supabase를 직접 호출하므로 별도 서버 프록시가 없습니다.
export default defineConfig({
  plugins: [react()],
  server: { port: 5173 },
  build: {
    rollupOptions: {
      output: {
        // 자주 안 바뀌는 라이브러리를 따로 묶어 새 버전 배포 후에도 브라우저 캐시를 재사용 (UC-N01)
        manualChunks: {
          react: ['react', 'react-dom', 'react-router-dom'],
          supabase: ['@supabase/supabase-js'],
        },
      },
    },
  },
});
