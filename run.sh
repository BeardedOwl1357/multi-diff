export VITE_COMMIT_SHA=$(git rev-parse --short HEAD)
npm run build 
npm run dev
