# Biblioteca de Alexandria

Plano em fases:

1. MVP: autenticação, estante, cadastros, detalhes, filtros, avaliações e permissões básicas.
2. Social: perfis públicos, seguir, feed, comentários, listas e metas.
3. Extras: APIs, exportação/importação, gráficos, retrospectiva, melhorias de acessibilidade e PWA.

## Como executar

Como é um protótipo front-end em JavaScript puro, basta abrir `index.html` em um navegador moderno ou servir os arquivos localmente:

```bash
cd "C:\Users\felipe.53977\Desktop\BDALEXANDRIA"
python -m http.server 8000
```

Depois abra `http://localhost:8000`.

## Estrutura

- `index.html` — estrutura da aplicação
- `style.css` — identidade visual, responsividade e modo escuro
- `app.js` — estado, regras de negócio e renderização
- `schema.sql` — modelo de dados mínimo em SQL

## Observações

- O app usa `localStorage` para persistência local.
- Senhas ficam com hash SHA-256 no navegador (sem servidor).
- A integração com Open Library é opcional e funciona quando a rede está disponível.
- Serviços de e-mail e backup em produção devem ser implementados com backend real.

## Checklist de entregas

- [x] Seções 3 e 4 essenciais da proposta
- [x] Inserção, busca, filtros e remoção na estante
- [x] Autenticação e recuperação de conta
- [x] Perfil e estatísticas
- [x] Feed, listas e seguimento
- [x] Visual claro/escuro e responsivo
- [x] Persistência local com dados iniciais

## O que ficou para depois

- Backend com autenticação real e banco de dados
- Upload em armazenamento externo e avisos por e-mail em produção
- Acesso público por URL real e SEO completo
- Gráficos avançados e exportação de arquivos em escala
