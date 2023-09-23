# ベースとなるイメージを指定
FROM node:18.15-slim

# 作業ディレクトリを設定
WORKDIR /app

# 必要なツールをインストール
RUN apt-get update && apt-get install -y \
  python3 \
  make \
  g++ \
  openssl \
  && rm -rf /var/lib/apt/lists/*

# 依存関係をコピー
COPY package.json package-lock.json ./
COPY prisma ./prisma/

# 依存関係をインストール
RUN npm install
RUN npm install @prisma/client

# ソースコードをコピー
COPY . .

# prisma generateの実行
RUN npx prisma generate --schema ./prisma/schema.prisma

# アプリケーションを起動
CMD ["sh", "-c", "npx vercel dev --token $VERCEL_TOKEN"]

