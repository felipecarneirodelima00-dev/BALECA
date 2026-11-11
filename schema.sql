CREATE TABLE users (
  id UUID PRIMARY KEY,
  nome TEXT NOT NULL,
  email TEXT UNIQUE NOT NULL,
  senha_hash TEXT NOT NULL,
  avatar_url TEXT,
  bio TEXT DEFAULT 'Leitor da Biblioteca de Alexandria.',
  privacidade TEXT DEFAULT 'publico',
  criado_em TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE works (
  id UUID PRIMARY KEY,
  titulo TEXT NOT NULL,
  autor TEXT,
  isbn TEXT,
  capa_url TEXT,
  paginas INT,
  generos TEXT[],
  ano INT,
  editora TEXT,
  criado_em TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE user_books (
  id UUID PRIMARY KEY,
  user_id UUID REFERENCES users(id),
  work_id UUID REFERENCES works(id),
  status TEXT NOT NULL,
  nota NUMERIC(2,1) DEFAULT 0,
  favorito BOOLEAN DEFAULT FALSE,
  progresso INT DEFAULT 0,
  inicio DATE,
  fim DATE,
  formato TEXT,
  possui BOOLEAN DEFAULT FALSE,
  tags TEXT[] DEFAULT ARRAY[]::TEXT[],
  resenha TEXT,
  criado_em TIMESTAMPTZ DEFAULT NOW(),
  atualizado_em TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE reviews (
  id UUID PRIMARY KEY,
  user_book_id UUID REFERENCES user_books(id),
  user_id UUID REFERENCES users(id),
  texto TEXT NOT NULL,
  spoiler BOOLEAN DEFAULT FALSE,
  criado_em TIMESTAMPTZ DEFAULT NOW(),
  editado_em TIMESTAMPTZ
);

CREATE TABLE review_likes (
  review_id UUID REFERENCES reviews(id),
  user_id UUID REFERENCES users(id),
  PRIMARY KEY (review_id, user_id)
);

CREATE TABLE comments (
  id UUID PRIMARY KEY,
  review_id UUID REFERENCES reviews(id),
  user_id UUID REFERENCES users(id),
  texto TEXT NOT NULL,
  parent_id UUID REFERENCES comments(id),
  criado_em TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE follows (
  seguidor_id UUID REFERENCES users(id),
  seguido_id UUID REFERENCES users(id),
  PRIMARY KEY (seguidor_id, seguido_id)
);

CREATE TABLE quotes (
  id UUID PRIMARY KEY,
  user_id UUID REFERENCES users(id),
  work_id UUID REFERENCES works(id),
  texto TEXT NOT NULL,
  criado_em TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE lists (
  id UUID PRIMARY KEY,
  user_id UUID REFERENCES users(id),
  nome TEXT NOT NULL,
  descricao TEXT,
  publica BOOLEAN DEFAULT FALSE,
  criado_em TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE list_items (
  id UUID PRIMARY KEY,
  list_id UUID REFERENCES lists(id),
  work_id UUID REFERENCES works(id),
  posicao INT NOT NULL,
  UNIQUE (list_id, work_id)
);

CREATE TABLE reading_sessions (
  id UUID PRIMARY KEY,
  user_book_id UUID REFERENCES user_books(id),
  data DATE NOT NULL,
  paginas INT NOT NULL,
  criado_em TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE goals (
  id UUID PRIMARY KEY,
  user_id UUID REFERENCES users(id),
  ano INT NOT NULL,
  tipo TEXT NOT NULL,
  alvo INT NOT NULL,
  criado_em TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE achievements (
  id UUID PRIMARY KEY,
  user_id UUID REFERENCES users(id),
  codigo TEXT NOT NULL,
  data TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE notifications (
  id UUID PRIMARY KEY,
  user_id UUID REFERENCES users(id),
  tipo TEXT NOT NULL,
  mensagem TEXT NOT NULL,
  lida BOOLEAN DEFAULT FALSE,
  criado_em TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX idx_users_email ON users(email);
CREATE INDEX idx_works_titulo ON works(titulo);
CREATE INDEX idx_user_books_user_id ON user_books(user_id);
CREATE INDEX idx_reviews_user_book_id ON reviews(user_book_id);
CREATE INDEX idx_comments_review_id ON comments(review_id);
CREATE INDEX idx_follows_seguido_id ON follows(seguido_id);
CREATE INDEX idx_goals_user_id_ano ON goals(user_id, ano);
