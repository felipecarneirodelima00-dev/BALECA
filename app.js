const STORAGE_KEY = 'biblioteca-alexandria-v1';

const state = loadState();
const pageRoot = document.getElementById('pageRoot');
const headerContext = document.getElementById('pageContextLink');

document.addEventListener('click', handleClick);
document.addEventListener('submit', handleSubmit);
document.addEventListener('input', handleInput);
document.addEventListener('change', handleInput);

renderAll();

function loadState() {
  const raw = localStorage.getItem(STORAGE_KEY);
  if (!raw) return buildSeedState();

  try {
    const parsed = JSON.parse(raw);
    return { ...buildSeedState(), ...parsed };
  } catch (error) {
    return buildSeedState();
  }
}

function persistState() {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
}

function buildSeedState() {
  const users = [
    { id: 'u-demo', name: 'Leitor da Alexandria', email: 'leitor@alexandria.test', passwordHash: 'demo', bio: 'Leitor da Biblioteca de Alexandria.', privacy: 'publico' },
    { id: 'u-claudia', name: 'Cláudia', email: 'claudia@alexandria.test', passwordHash: 'demo', bio: 'Amo literatura brasileira e clássicos.', privacy: 'publico' },
    { id: 'u-joao', name: 'João', email: 'joao@alexandria.test', passwordHash: 'demo', bio: 'Leitura leve, humor e fantasia.', privacy: 'publico' },
    { id: 'u-luiza', name: 'Luiza', email: 'luiza@alexandria.test', passwordHash: 'demo', bio: 'Lendo tudo com um café ao lado.', privacy: 'publico' }
  ];

  const works = [
    { id: 'work-1', title: 'Confissões', author: 'Agostinho', isbn: '9788575110414', cover: 'https://images.unsplash.com/photo-1512820790803-83ca734da794?auto=format&fit=crop&w=900&q=80', pages: 320, genres: ['Religião', 'Filosofia'], year: 2010, publisher: 'Companhia das Letras' },
    { id: 'work-2', title: 'A Cidade de Deus', author: 'Agostinho', isbn: '9788535901388', cover: 'https://images.unsplash.com/photo-1516979187457-637abb4f9353?auto=format&fit=crop&w=900&q=80', pages: 520, genres: ['História', 'Teologia'], year: 2019, publisher: 'Cia. das Letras' },
    { id: 'work-3', title: 'Ilíada', author: 'Homero', isbn: '9788571648671', cover: 'https://images.unsplash.com/photo-1521587760476-6c12a4b040da?auto=format&fit=crop&w=900&q=80', pages: 432, genres: ['Épico', 'Mitologia'], year: 2013, publisher: 'Penguin' },
    { id: 'work-4', title: 'Hamlet', author: 'Shakespeare', isbn: '9788571646882', cover: 'https://images.unsplash.com/photo-1544947950-fa07a98d237f?auto=format&fit=crop&w=900&q=80', pages: 288, genres: ['Drama', 'Clássico'], year: 2020, publisher: 'Editora 34' },
    { id: 'work-5', title: 'Noites Brancas', author: 'Dostoiévski', isbn: '9788501095207', cover: 'https://images.unsplash.com/photo-1507842217343-583bb7270b66?auto=format&fit=crop&w=900&q=80', pages: 224, genres: ['Romance', 'Clássico'], year: 2018, publisher: 'Boitempo' },
    { id: 'work-6', title: 'Crítica da Razão Pura', author: 'Kant', isbn: '9788531907959', cover: 'https://images.unsplash.com/photo-1515377905703-c4788e51af15?auto=format&fit=crop&w=900&q=80', pages: 680, genres: ['Filosofia', 'Epistemologia'], year: 2016, publisher: 'Abril Cultural' },
    { id: 'work-7', title: 'O Manifesto Comunista', author: 'Marx e Engels', isbn: '9788535910267', cover: 'https://images.unsplash.com/photo-1512820790803-83ca734da794?auto=format&fit=crop&w=900&q=80', pages: 144, genres: ['Política', 'História'], year: 2015, publisher: 'Penguin' },
    { id: 'work-8', title: 'O Alquimista', author: 'Paulo Coelho', isbn: '9788576650891', cover: 'https://images.unsplash.com/photo-1516979187457-637abb4f9353?auto=format&fit=crop&w=900&q=80', pages: 208, genres: ['Ficção', 'Espiritualidade'], year: 2018, publisher: 'Rocco' },
    { id: 'work-9', title: 'Odisseia', author: 'Homero', isbn: '9788535901963', cover: 'https://images.unsplash.com/photo-1521587760476-6c12a4b040da?auto=format&fit=crop&w=900&q=80', pages: 384, genres: ['Épico', 'Mitologia'], year: 2014, publisher: 'Companhia' }
  ];

  const userBooks = [
    { id: 'ub-1', userId: 'u-demo', workId: 'work-1', reader: 'Agostinho', title: 'Confissões', status: 'Lido', nota: 5, favorito: true, resenha: 'Uma leitura profunda, intensa e muito honesta. Às vezes dolorosa, mas sempre iluminadora.', createdAt: '2026-02-10', reviewEdited: false, progress: 100, pages: 320, hasCover: true },
    { id: 'ub-2', userId: 'u-demo', workId: 'work-2', reader: 'Agostinho', title: 'A Cidade de Deus', status: 'Lendo', nota: 4.5, favorito: true, resenha: 'A obra me acompanha numa reflexão constante sobre moral, desejo e vida em comunidade.', createdAt: '2026-03-08', reviewEdited: false, progress: 58, pages: 520, hasCover: true },
    { id: 'ub-3', userId: 'u-demo', workId: 'work-3', reader: 'Homero', title: 'Ilíada', status: 'Lido', nota: 4, favorito: false, resenha: 'Épico, brutal e magnificente. A leitura exige atenção, mas recompensa com força narrativa.', createdAt: '2026-01-20', reviewEdited: false, progress: 100, pages: 432, hasCover: true },
    { id: 'ub-4', userId: 'u-demo', workId: 'work-4', reader: 'Shakespeare', title: 'Hamlet', status: 'Quero ler', nota: 0, favorito: false, resenha: '', createdAt: '2026-04-02', reviewEdited: false, progress: 0, pages: 288, hasCover: true },
    { id: 'ub-5', userId: 'u-demo', workId: 'work-5', reader: 'Dostoiévski', title: 'Noites Brancas', status: 'Pausado', nota: 3.5, favorito: true, resenha: 'Uma pequena obra de muita delicadeza. Parece um sonho que se prolonga em páginas.', createdAt: '2026-04-07', reviewEdited: false, progress: 35, pages: 224, hasCover: true },
    { id: 'ub-6', userId: 'u-demo', workId: 'work-6', reader: 'Kant', title: 'Crítica da Razão Pura', status: 'Relendo', nota: 4, favorito: false, resenha: 'Mais complicada do que parece, mas um texto que se abre com cada releitura.', createdAt: '2026-02-16', reviewEdited: false, progress: 72, pages: 680, hasCover: true },
    { id: 'ub-7', userId: 'u-demo', workId: 'work-7', reader: 'Marx e Engels', title: 'O Manifesto Comunista', status: 'Abandonei', nota: 2.5, favorito: false, resenha: 'Fiquei com vontade de continuar, mas a forma de apresentação exigiu mais contexto histórico do que eu tinha naquele momento.', createdAt: '2026-05-19', reviewEdited: false, progress: 25, pages: 144, hasCover: true },
    { id: 'ub-8', userId: 'u-demo', workId: 'work-8', reader: 'Paulo Coelho', title: 'O Alquimista', status: 'Lido', nota: 5, favorito: true, resenha: 'Lindo e direto, um texto que me relembra a importância de seguir o caminho próprio.', createdAt: '2026-01-11', reviewEdited: false, progress: 100, pages: 208, hasCover: true },
    { id: 'ub-9', userId: 'u-demo', workId: 'work-9', reader: 'Homero', title: 'Odisseia', status: 'Lendo', nota: 4.5, favorito: false, resenha: 'Uma jornada de casa, memória e resistência. Sem dúvida uma obra de grande amplitude.', createdAt: '2026-05-01', reviewEdited: false, progress: 41, pages: 384, hasCover: true }
  ];

  const reviewInteractions = [
    { id: 'ri-1', userBookId: 'ub-1', likes: 62, liked: false, spoiler: false, comments: [{id:'c1', user:'Cláudia', text:'Uma resenha que me empurrou para reler o texto.'}] },
    { id: 'ri-2', userBookId: 'ub-2', likes: 45, liked: false, spoiler: false, comments: [{id:'c2', user:'João', text:'Sempre interessante ver o ponto de vista pessoal aqui.'}] },
    { id: 'ri-3', userBookId: 'ub-3', likes: 32, liked: false, spoiler: false, comments: [] },
    { id: 'ri-4', userBookId: 'ub-4', likes: 8, liked: false, spoiler: false, comments: [] },
    { id: 'ri-5', userBookId: 'ub-5', likes: 17, liked: false, spoiler: false, comments: [{id:'c3', user:'Luiza', text:'O tom intimista deixa a leitura bem acolhedora.'}] },
    { id: 'ri-6', userBookId: 'ub-6', likes: 24, liked: false, spoiler: false, comments: [] },
    { id: 'ri-7', userBookId: 'ub-7', likes: 11, liked: false, spoiler: false, comments: [] },
    { id: 'ri-8', userBookId: 'ub-8', likes: 51, liked: false, spoiler: false, comments: [{id:'c4', user:'Cláudia', text:'A gentileza da resenha está no equilíbrio entre emoção e análise.'}] },
    { id: 'ri-9', userBookId: 'ub-9', likes: 29, liked: false, spoiler: false, comments: [] }
  ];

  const follows = [
    { followerId: 'u-demo', followingId: 'u-claudia' },
    { followerId: 'u-demo', followingId: 'u-joao' },
    { followerId: 'u-claudia', followingId: 'u-luiza' }
  ];

  const quotes = [
    { id: 'q-1', userId: 'u-demo', workId: 'work-1', text: 'A leitura nos dá um mapa de si mesmo.' },
    { id: 'q-2', userId: 'u-demo', workId: 'work-8', text: 'Quando você quer uma coisa, o universo conspira a favor.' }
  ];

  const lists = [
    { id: 'list-1', userId: 'u-demo', name: 'Leituras de 2026', description: 'Arquivos para uma temporada de grandes descobertas.', public: true, items: ['work-1', 'work-8', 'work-9'] },
    { id: 'list-2', userId: 'u-demo', name: 'Filosofia em andamento', description: 'Obras para pensar devagar.', public: false, items: ['work-2', 'work-6'] }
  ];

  const goals = [
    { id: 'goal-1', userId: 'u-demo', year: new Date().getFullYear(), type: 'books', target: 12 },
    { id: 'goal-2', userId: 'u-demo', year: new Date().getFullYear(), type: 'pages', target: 4000 }
  ];

  return {
    currentView: 'home',
    activeTab: 'shelf',
    authMode: 'login',
    detailWorkId: 'work-1',
    sessionUserId: null,
    shelfSearch: '',
    shelfStatus: 'all',
    shelfSort: 'recent',
    users,
    works,
    userBooks,
    reviewInteractions,
    follows,
    quotes,
    lists,
    goals,
    profileBio: 'Leitor da Biblioteca de Alexandria.',
    profileQuoteDraft: ''
  };
}

function getCurrentUser() {
  if (!state.sessionUserId) return null;
  return state.users.find((user) => user.id === state.sessionUserId) || null;
}

function renderAll() {
  updateHeader();
  const view = state.currentView;

  if (view === 'home') {
    pageRoot.innerHTML = renderHomePage();
    return;
  }

  if (view === 'account') {
    pageRoot.innerHTML = renderAccountPage();
    return;
  }

  if (view === 'detail') {
    pageRoot.innerHTML = renderDetailPage();
  }
}

function updateHeader() {
  const currentUser = getCurrentUser();

  if (state.currentView === 'account') {
    headerContext.textContent = '← Voltar';
    headerContext.dataset.action = 'go-home';
    return;
  }

  if (state.currentView === 'detail') {
    headerContext.textContent = '← Voltar aos livros';
    headerContext.dataset.action = 'go-home';
    return;
  }

  if (!currentUser) {
    headerContext.textContent = 'Entrar / Criar conta';
    headerContext.dataset.action = 'go-account';
    return;
  }

  headerContext.textContent = `Olá, ${currentUser.name} · Sair`;
  headerContext.dataset.action = 'logout';
}

function renderHomePage() {
  const tabs = [
    { key: 'shelf', label: 'Estante' },
    { key: 'explore', label: 'Explorar' },
    { key: 'feed', label: 'Feed' },
    { key: 'profile', label: 'Meu perfil' },
    { key: 'stats', label: 'Estatísticas' },
    { key: 'lists', label: 'Listas' }
  ];

  const activeTab = state.activeTab || 'shelf';

  return `
    <section class="hero" aria-labelledby="home-heading">
      <h1 id="home-heading">Sua estante, sempre com você.</h1>
      <p>Cadastre livros, organize leituras, escreva resenhas e acompanhe as melhores recomendações da comunidade.</p>
    </section>

    <nav class="tab-bar" aria-label="Abas principais">
      ${tabs.map((tab) => `
        <button
          type="button"
          class="tab-button ${tab.key === activeTab ? 'active' : ''}"
          data-action="switch-tab"
          data-tab="${tab.key}"
          aria-pressed="${tab.key === activeTab}"
        >
          ${tab.label}
        </button>
      `).join('')}
    </nav>

    <section class="content-panel">
      ${renderActiveHomeTab(activeTab)}
    </section>
  `;
}

function renderActiveHomeTab(tabKey) {
  switch (tabKey) {
    case 'explore':
      return renderExploreTab();
    case 'feed':
      return renderFeedTab();
    case 'profile':
      return renderProfileTab();
    case 'stats':
      return renderStatsTab();
    case 'lists':
      return renderListsTab();
    default:
      return renderShelfTab();
  }
}

function renderShelfTab() {
  const books = getFilteredAndSortedShelf();

  return `
    <div class="grid-two">
      <div>
        <h2>Adicionar à estante</h2>
        <form data-form="add-book" class="book-form">
          <div class="cover-drop">
            <div class="cover-preview" id="bookCoverPreview">
              <img src="https://images.unsplash.com/photo-1512820790803-83ca734da794?auto=format&fit=crop&w=900&q=80" alt="Prévia da capa" />
            </div>
            <div class="field" style="flex: 1;">
              <label for="bookCover">Capa</label>
              <input id="bookCover" type="file" name="cover" accept="image/*" />
            </div>
          </div>

          <div class="form-grid two">
            <label>
              <span>Leitor</span>
              <input type="text" name="reader" value="${escapeHtml(getCurrentUser() ? getCurrentUser().name : 'Leitor anônimo')}" readonly />
            </label>
            <label>
              <span>Título</span>
              <input type="text" name="title" placeholder="Ex.: O Alquimista" required />
            </label>
          </div>

          <div class="form-grid two">
            <label>
              <span>Autor</span>
              <input type="text" name="author" placeholder="Autor" />
            </label>
            <label>
              <span>ISBN</span>
              <input type="text" name="isbn" placeholder="9780000000000" />
            </label>
          </div>

          <div class="form-grid two">
            <label>
              <span>Páginas</span>
              <input type="number" name="pages" min="1" placeholder="320" />
            </label>
            <label>
              <span>Ano</span>
              <input type="number" name="year" min="0" placeholder="2024" />
            </label>
          </div>

          <div class="form-grid two">
            <label>
              <span>Status</span>
              <select name="status">
                <option value="Lendo">Lendo</option>
                <option value="Lido">Lido</option>
                <option value="Quero ler">Quero ler</option>
                <option value="Relendo">Relendo</option>
                <option value="Pausado">Pausado</option>
                <option value="Abandonei">Abandonei</option>
              </select>
            </label>
            <label>
              <span>Nota</span>
              <select name="nota">
                <option value="5">5</option>
                <option value="4.5">4.5</option>
                <option value="4">4</option>
                <option value="3.5">3.5</option>
                <option value="3">3</option>
                <option value="2.5">2.5</option>
                <option value="2">2</option>
                <option value="1.5">1.5</option>
                <option value="1">1</option>
                <option value="0">0</option>
              </select>
            </label>
          </div>

          <label>
            <span>Resenha</span>
            <textarea name="resenha" placeholder="Escreva uma resenha ou comentário curto..."></textarea>
          </label>

          <div class="form-footer">
            <button type="button" class="secondary-btn" data-action="search-book-api">Buscar na API</button>
            <button type="submit" class="primary-btn">Adicionar à estante</button>
          </div>
        </form>
      </div>

      <div>
        <h2>Filtrar e ordenar</h2>
        <div class="field">
          <label for="shelfSearchInput">Busca por título</label>
          <input id="shelfSearchInput" type="search" value="${escapeHtml(state.shelfSearch)}" placeholder="Buscar por título" data-action="update-shelf-search" />
        </div>

        <div class="form-grid two" style="margin-top: 18px;">
          <label>
            <span>Status</span>
            <select data-action="update-shelf-status">
              <option value="all" ${state.shelfStatus === 'all' ? 'selected' : ''}>Todos</option>
              <option value="Lendo" ${state.shelfStatus === 'Lendo' ? 'selected' : ''}>Lendo</option>
              <option value="Lido" ${state.shelfStatus === 'Lido' ? 'selected' : ''}>Lido</option>
              <option value="Quero ler" ${state.shelfStatus === 'Quero ler' ? 'selected' : ''}>Quero ler</option>
              <option value="Relendo" ${state.shelfStatus === 'Relendo' ? 'selected' : ''}>Relendo</option>
              <option value="Pausado" ${state.shelfStatus === 'Pausado' ? 'selected' : ''}>Pausado</option>
              <option value="Abandonei" ${state.shelfStatus === 'Abandonei' ? 'selected' : ''}>Abandonei</option>
            </select>
          </label>
          <label>
            <span>Ordenar</span>
            <select data-action="update-shelf-sort">
              <option value="recent" ${state.shelfSort === 'recent' ? 'selected' : ''}>Mais recentes</option>
              <option value="title" ${state.shelfSort === 'title' ? 'selected' : ''}>Título</option>
              <option value="rating" ${state.shelfSort === 'rating' ? 'selected' : ''}>Nota</option>
              <option value="favorite" ${state.shelfSort === 'favorite' ? 'selected' : ''}>Favoritos</option>
            </select>
          </label>
        </div>
      </div>
    </div>

    <div class="shelf-toolbar">
      <div class="controls">
        <strong>${books.length} ${books.length === 1 ? 'livro' : 'livros'}</strong>
      </div>
    </div>

    ${books.length ? `<div class="book-grid">${books.map(renderShelfCard).join('')}</div>` : `<div class="empty-state">Nenhum livro encontrado.</div>`}
  `;
}

function renderShelfCard(userBook) {
  const work = state.works.find((item) => item.id === userBook.workId) || { title: userBook.title, author: userBook.reader, cover: '' };
  const reviewInteraction = getReviewInteraction(userBook.id);
  const reviewText = userBook.resenha || '';
  const isEditing = state.editingReviewId === userBook.id;

  return `
    <article class="book-card" aria-label="Livro ${escapeHtml(work.title)}">
      <img
        class="book-cover"
        src="${work.cover || 'https://images.unsplash.com/photo-1512820790803-83ca734da794?auto=format&fit=crop&w=900&q=80'}"
        alt="Capa do livro ${escapeHtml(work.title)}"
        loading="lazy"
        data-action="view-detail"
        data-work-id="${work.id}"
      />

      <div class="book-meta">
        <div>
          <h3 class="book-title" data-action="view-detail" data-work-id="${work.id}">${escapeHtml(work.title)}</h3>
          <div class="book-reader">${escapeHtml(userBook.reader || 'Leitor anônimo')}</div>
        </div>
        <button type="button" class="icon-btn ${userBook.favorito ? 'active' : ''}" data-action="toggle-favorite" data-book-id="${userBook.id}" aria-label="Favoritar livro">${userBook.favorito ? '★' : '☆'}</button>
      </div>

      <div class="star-readout" style="margin-top: 10px;">
        ${renderStars(userBook.nota || 0)}
      </div>

      <div class="book-actions">
        <span class="status-badge">${escapeHtml(userBook.status)}</span>
        <button type="button" class="icon-btn danger" data-action="remove-book" data-book-id="${userBook.id}" aria-label="Remover livro">×</button>
      </div>

      <div class="book-review-snippet ${state.expandedBookId === userBook.id ? 'expanded' : ''}" data-action="toggle-review-expand" data-book-id="${userBook.id}">
        ${escapeHtml(reviewText || 'Ainda não há resenha. ')}
      </div>

      ${isEditing ? `
        <form class="inline-editor" data-form="save-review" data-book-id="${userBook.id}">
          <textarea name="reviewText" required>${escapeHtml(reviewText)}</textarea>
          <div class="inline-editor-actions">
            <button type="button" class="secondary-btn" data-action="cancel-review-edit" data-book-id="${userBook.id}">Cancelar</button>
            <button type="submit" class="primary-btn">Salvar</button>
          </div>
        </form>
      ` : `
        <button type="button" class="secondary-btn" data-action="edit-review-toggle" data-book-id="${userBook.id}">${reviewText ? 'Editar resenha' : 'Escrever resenha'}</button>
      `}

      <div class="inline-status" style="margin-top: 10px;">${reviewInteraction ? `${reviewInteraction.likes} curtidas` : 'Sem curtidas ainda'}</div>
    </article>
  `;
}

function renderDetailPage() {
  const work = state.works.find((item) => item.id === state.detailWorkId) || state.works[0];
  const copies = state.userBooks.filter((entry) => entry.workId === work.id);
  const reviewRows = state.userBooks.filter((entry) => entry.workId === work.id && entry.resenha);
  const communityReviews = state.userBooks.filter((entry) => normalizeTitle(entry.title) === normalizeTitle(work.title) && entry.id !== copies[0]?.id);
  const average = copies.length ? (copies.map((item) => Number(item.nota || 0)).reduce((sum, val) => sum + val, 0) / copies.length) : 0;

  return `
    <section class="detail-shell">
      <div class="detail-hero">
        <img class="detail-cover" src="${work.cover}" alt="Capa de ${escapeHtml(work.title)}" loading="lazy" />
        <article class="detail-meta">
          <div class="wordmark">Resenha</div>
          <h1>${escapeHtml(work.title)}</h1>
          <div class="muted">${escapeHtml(work.author || 'Autor não informado')}</div>
          <div class="review-header">
            <div class="user-inline">
              <span class="avatar">${getInitials(work.author || 'A')}</span>
              <span>${escapeHtml(work.author || 'Autor anônimo')}</span>
            </div>
            <div class="star-readout">${renderStars(average)} <strong>${average.toFixed(1)} / 5</strong></div>
          </div>
          <p class="muted">${reviewRows.length} resenha(s) · ${copies[0]?.status || 'Lido'}</p>
          <div class="review-text" style="margin-top: 14px;">${escapeHtml(copies[0]?.resenha || 'Ainda não há resenha para este livro nesta estante.')}</div>
        </article>
      </div>

      <section class="content-panel">
        <h2>Resenhas da comunidade</h2>
        ${communityReviews.length ? communityReviews.map(renderCommunityReviewCard).join('') : '<div class="empty-state">Ainda não há resenhas da comunidade para este livro.</div>'}
      </section>
    </section>
  `;
}

function renderCommunityReviewCard(entry) {
  const interaction = getReviewInteraction(entry.id);
  const reviewText = entry.resenha || 'Sem texto disponível.';
  const isSpoiler = !!interaction.spoiler;
  const snippet = reviewText;

  return `
    <article class="review-card">
      <div class="review-header">
        <div class="user-inline">
          <span class="avatar">${getInitials(entry.reader || 'L')}</span>
          <span>${escapeHtml(entry.reader || 'Leitor')}</span>
          <span class="muted">· ${formatDate(entry.createdAt || new Date().toISOString())}</span>
        </div>
        <div class="star-readout">${renderStars(entry.nota || 0)}</div>
      </div>
      <p class="review-text ${isSpoiler ? 'spoiler-hidden' : ''}">${escapeHtml(snippet)}</p>
      <div class="review-actions">
        <button type="button" class="secondary-btn" data-action="toggle-like-review" data-review-id="${interaction.id}">♥ ${interaction.likes}</button>
        <button type="button" class="secondary-btn" data-action="focus-comment" data-review-id="${interaction.id}">Comentar</button>
        <button type="button" class="secondary-btn" data-action="toggle-spoiler" data-review-id="${interaction.id}">${isSpoiler ? 'Revelar texto' : 'Spoiler'}</button>
        ${maybeRenderFollowButton(entry.userId || 'u-demo')}
      </div>

      <div class="comment-list">
        ${interaction.comments.map((comment) => `<div class="comment-item"><strong>${escapeHtml(comment.user)}:</strong> ${escapeHtml(comment.text)}</div>`).join('') || '<div class="comment-item">Nenhum comentário ainda.</div>'}
      </div>

      <form class="comment-form" data-form="comment" data-review-id="${interaction.id}">
        <input type="text" name="commentText" placeholder="Escreva um comentário..." aria-label="Escreva um comentário" required />
        <button type="submit" class="primary-btn">Enviar</button>
      </form>
    </article>
  `;
}

function renderExploreTab() {
  const results = getFilteredBooksBySearch();
  const featured = [...state.reviewInteractions].sort((a, b) => (b.likes || 0) - (a.likes || 0)).slice(0, 5);

  return `
    <div class="field" style="margin-bottom: 18px;">
      <label for="exploreSearch">Buscar livros, leitores ou tags</label>
      <input id="exploreSearch" type="search" placeholder="Título, leitor ou tag" data-action="explore-search" />
    </div>

    <div class="explore-grid">
      ${results.length ? results.map((entry) => {
        const work = getWorkById(entry.workId);
        return `
          <div class="book-card">
            <img class="book-cover" src="${work.cover}" alt="Capa de ${escapeHtml(work.title)}" data-action="view-detail" data-work-id="${work.id}" loading="lazy" />
            <div class="book-meta">
              <div>
                <h3 class="book-title" data-action="view-detail" data-work-id="${work.id}">${escapeHtml(work.title)}</h3>
                <div class="book-reader">${escapeHtml(entry.reader || work.author || 'Leitor')}</div>
              </div>
            </div>
            <div class="star-readout" style="margin-top: 10px;">${renderStars(entry.nota || 0)}</div>
          </div>
        `;
      }).join('') : '<div class="empty-state" style="grid-column: 1 / -1;">Nenhum resultado encontrado.</div>'}
    </div>

    <div style="margin-top: 24px;">
      <h2>Resenhas em destaque</h2>
      <div class="table-list">
        ${featured.map((item) => {
          const book = state.userBooks.find((entry) => entry.id === item.userBookId);
          return `
            <div class="list-item-card">
              <div>
                <strong>${escapeHtml(book?.title || 'Livro')}</strong>
                <div class="muted">${escapeHtml(book?.reader || 'Leitor')}</div>
              </div>
              <span>♥ ${item.likes}</span>
            </div>
          `;
        }).join('')}
      </div>
    </div>
  `;
}

function renderFeedTab() {
  const followingIds = state.follows.filter((entry) => entry.followerId === state.sessionUserId).map((entry) => entry.followingId);
  const activities = state.userBooks.filter((entry) => followingIds.includes(entry.userId) || !state.sessionUserId).slice(0, 30).map((entry) => ({
    id: entry.id,
    type: 'adicionou',
    user: entry.reader,
    title: entry.title,
    date: entry.createdAt || new Date().toISOString()
  }));

  if (!activities.length) {
    return '<div class="empty-state">Seu feed está vazio. Siga leitores para acompanhar suas atividades.</div>';
  }

  return `
    <h2>O que seus leitores estão fazendo</h2>
    <div class="activity-list">
      ${activities.map((activity) => `
        <div class="activity-item">
          <strong>${escapeHtml(activity.user)}</strong> adicionou <strong>${escapeHtml(activity.title)}</strong> em ${formatDate(activity.date)}.
        </div>
      `).join('')}
    </div>
  `;
}

function renderProfileTab() {
  const currentUser = getCurrentUser();
  if (!currentUser) {
    return '<div class="empty-state">Faça login para ver seu perfil.</div>';
  }

  const readCount = state.userBooks.filter((entry) => entry.userId === currentUser.id && (entry.status === 'Lido' || entry.status === 'Relendo')).length;
  const favoriteCount = state.userBooks.filter((entry) => entry.userId === currentUser.id && entry.favorito).length;
  const followers = state.follows.filter((entry) => entry.followingId === currentUser.id).length;
  const following = state.follows.filter((entry) => entry.followerId === currentUser.id).length;

  return `
    <div class="profile-shell">
      <aside class="profile-card">
        <div class="profile-avatar">${getInitials(currentUser.name)}</div>
        <h2>${escapeHtml(currentUser.name)}</h2>
        <p class="muted">${escapeHtml(currentUser.bio || 'Leitor da Biblioteca de Alexandria.')}</p>
        <div class="counter-list">
          <div class="count-box"><strong>${readCount}</strong><span>Livros lidos</span></div>
          <div class="count-box"><strong>${favoriteCount}</strong><span>Favoritos</span></div>
          <div class="count-box"><strong>${followers}</strong><span>Seguidores</span></div>
          <div class="count-box"><strong>${following}</strong><span>Seguindo</span></div>
        </div>
      </aside>

      <div class="profile-card">
        <form data-form="profile" class="book-form">
          <label>
            <span>Bio</span>
            <textarea name="bio" maxlength="180" placeholder="Escreva sua apresentação">${escapeHtml(currentUser.bio || 'Leitor da Biblioteca de Alexandria.')}</textarea>
          </label>

          <label>
            <span>Citações favoritas</span>
            <input type="text" name="quote" maxlength="240" placeholder="Adicione uma citação..." />
          </label>

          <button type="submit" class="primary-btn">Salvar perfil</button>
        </form>

        <div style="margin-top: 22px;">
          <h3>Diário de leitura</h3>
          <div class="activity-list">
            ${state.userBooks.filter((entry) => entry.userId === currentUser.id).slice(0, 4).map((entry) => `
              <div class="activity-item">Você está ${entry.status.toLowerCase()} <strong>${escapeHtml(entry.title)}</strong>.</div>
            `).join('') || '<div class="empty-state">Seu diário está vazio por enquanto.</div>'}
          </div>
        </div>

        <div style="margin-top: 22px;">
          <h3>Citações favoritas</h3>
          <div class="quote-list">
            ${state.quotes.filter((quote) => quote.userId === currentUser.id).map((quote) => `
              <div class="quote-item">“${escapeHtml(quote.text)}”</div>
            `).join('') || '<div class="empty-state">Nenhuma citação favorita ainda.</div>'}
          </div>
        </div>
      </div>
    </div>
  `;
}

function renderStatsTab() {
  const currentUser = getCurrentUser();
  const booksRead = state.userBooks.filter((entry) => entry.userId === (currentUser?.id || 'u-demo') && (entry.status === 'Lido' || entry.status === 'Relendo')).length;
  const totalPages = state.userBooks.filter((entry) => entry.userId === (currentUser?.id || 'u-demo')).reduce((sum, entry) => sum + (Number(entry.pages) || 0), 0);
  const avgRating = state.userBooks.filter((entry) => entry.userId === (currentUser?.id || 'u-demo') && Number(entry.nota) > 0).reduce((sum, entry) => sum + Number(entry.nota), 0) / Math.max(1, state.userBooks.filter((entry) => entry.userId === (currentUser?.id || 'u-demo') && Number(entry.nota) > 0).length);
  const favoriteCount = state.userBooks.filter((entry) => entry.userId === (currentUser?.id || 'u-demo') && entry.favorito).length;
  const genres = Array.from(new Set(state.works.flatMap((work) => work.genres || []))).slice(0, 4).join(', ');
  const reviewsCount = state.userBooks.filter((entry) => entry.userId === (currentUser?.id || 'u-demo') && entry.resenha).length;

  const annualGoal = state.goals.find((goal) => goal.userId === (currentUser?.id || 'u-demo') && goal.year === new Date().getFullYear()) || { type: 'books', target: 12 };
  const progress = Math.min((booksRead / annualGoal.target) * 100, 100);

  return `
    <div class="stats-row">
      <div class="stat-card"><strong>${booksRead}</strong><span>Livros lidos</span></div>
      <div class="stat-card"><strong>${totalPages}</strong><span>Páginas</span></div>
      <div class="stat-card"><strong>${avgRating.toFixed(1)}</strong><span>Nota média</span></div>
      <div class="stat-card"><strong>${favoriteCount}</strong><span>Favoritos</span></div>
    </div>

    <div class="grid-two">
      <div class="content-panel">
        <h3>Meta anual de leitura</h3>
        <p>Objetivo: ${annualGoal.target} livros</p>
        <div class="progress-bar"><span style="width: ${progress}%"></span></div>
        <p class="muted">${booksRead}/${annualGoal.target} concluídos · ritmo necessário: ${(annualGoal.target - booksRead) / 12} por mês</p>
      </div>
      <div class="content-panel">
        <h3>Retrospectiva anual</h3>
        <p>Em ${new Date().getFullYear()}, você mergulhou em ${genres || 'vários gêneros'} e compartilhou ${reviewsCount} resenhas.</p>
      </div>
    </div>

    <div style="margin-top: 18px;">
      <h3>Conquistas</h3>
      <div class="table-list">
        <div class="list-item-card"><strong>1 livro lido</strong><span>${booksRead >= 1 ? '✓' : '—'}</span></div>
        <div class="list-item-card"><strong>5 livros lidos</strong><span>${booksRead >= 5 ? '✓' : '—'}</span></div>
        <div class="list-item-card"><strong>3 resenhas</strong><span>${reviewsCount >= 3 ? '✓' : '—'}</span></div>
        <div class="list-item-card"><strong>3 favoritos</strong><span>${favoriteCount >= 3 ? '✓' : '—'}</span></div>
      </div>
    </div>
  `;
}

function renderListsTab() {
  return `
    <form data-form="create-list" class="book-form">
      <div class="form-grid two">
        <label>
          <span>Nome da lista</span>
          <input type="text" name="listName" placeholder="Leituras de 2026" required />
        </label>
        <label>
          <span>Descrição</span>
          <input type="text" name="listDescription" placeholder="Resumo da lista" />
        </label>
      </div>
      <button type="submit" class="primary-btn">Criar lista</button>
    </form>

    <div style="margin-top: 20px;" class="table-list">
      ${state.lists.map((list) => `
        <div class="list-item-card">
          <div>
            <strong>${escapeHtml(list.name)}</strong>
            <div class="muted">${list.items.length} livro(s)</div>
          </div>
          <span>${list.public ? 'Pública' : 'Privada'}</span>
        </div>
      `).join('') || '<div class="empty-state">Nenhuma lista cadastrada.</div>'}
    </div>
  `;
}

function renderAccountPage() {
  const authMode = state.authMode || 'login';

  return `
    <div class="account-shell">
      <div class="auth-switcher" role="tablist" aria-label="Painéis de conta">
        <button type="button" class="${authMode === 'login' ? 'active' : ''}" data-action="switch-auth" data-mode="login">Entrar</button>
        <button type="button" class="${authMode === 'signup' ? 'active' : ''}" data-action="switch-auth" data-mode="signup">Criar conta</button>
        <button type="button" class="${authMode === 'recovery' ? 'active' : ''}" data-action="switch-auth" data-mode="recovery">Recuperar senha</button>
      </div>

      <div class="auth-panel ${authMode === 'login' ? 'active' : ''}">
        <form id="loginForm" class="auth-form" data-form="login">
          <h2>Entrar</h2>
          <label>
            <span>E-mail</span>
            <input type="email" name="email" placeholder="seu@email.com" required />
          </label>
          <label>
            <span>Senha</span>
            <input type="password" name="password" placeholder="••••••••" required />
          </label>
          <div class="form-footer">
            <button type="submit" class="primary-btn">Entrar</button>
            <button type="button" class="link-btn" data-action="switch-auth" data-mode="recovery">Esqueceu a senha?</button>
          </div>
        </form>
      </div>

      <div class="auth-panel ${authMode === 'signup' ? 'active' : ''}">
        <form id="signupForm" class="auth-form" data-form="signup">
          <h2>Criar conta</h2>
          <label>
            <span>Nome</span>
            <input type="text" name="name" placeholder="Seu nome" required />
          </label>
          <label>
            <span>E-mail</span>
            <input type="email" name="email" placeholder="seu@email.com" required />
          </label>
          <label>
            <span>Senha</span>
            <input type="password" name="password" placeholder="Mínimo 8 caracteres" required minlength="8" />
          </label>
          <label>
            <span>Confirmação</span>
            <input type="password" name="confirmPassword" placeholder="Repita a senha" required />
          </label>
          <div class="form-footer">
            <button type="submit" class="primary-btn">Criar conta</button>
            <button type="button" class="link-btn" data-action="switch-auth" data-mode="login">Já tenho conta</button>
          </div>
        </form>
      </div>

      <div class="auth-panel ${authMode === 'recovery' ? 'active' : ''}">
        <form id="recoveryForm" class="auth-form" data-form="recovery">
          <h2>Recuperar senha</h2>
          <label>
            <span>E-mail</span>
            <input type="email" name="email" placeholder="seu@email.com" required />
          </label>
          <div class="form-footer">
            <button type="submit" class="primary-btn">Enviar link</button>
            <button type="button" class="link-btn" data-action="switch-auth" data-mode="login">Voltar para entrar</button>
          </div>
        </form>
      </div>
    </div>
  `;
}

async function handleClick(event) {
  const target = event.target.closest('[data-action]');
  if (!target) return;

  const action = target.dataset.action;

  if (action === 'go-home') {
    state.currentView = 'home';
    state.activeTab = 'shelf';
    renderAll();
    return;
  }

  if (action === 'go-account') {
    state.currentView = 'account';
    state.authMode = 'login';
    renderAll();
    return;
  }

  if (action === 'logout') {
    state.sessionUserId = null;
    persistState();
    showToast('Sessão encerrada.');
    state.currentView = 'home';
    renderAll();
    return;
  }

  if (action === 'switch-auth') {
    state.authMode = target.dataset.mode || 'login';
    renderAll();
    return;
  }

  if (action === 'switch-tab') {
    state.activeTab = target.dataset.tab;
    renderAll();
    return;
  }

  if (action === 'update-shelf-search') {
    state.shelfSearch = target.value;
    renderAll();
    return;
  }

  if (action === 'update-shelf-status') {
    state.shelfStatus = target.value;
    renderAll();
    return;
  }

  if (action === 'update-shelf-sort') {
    state.shelfSort = target.value;
    renderAll();
    return;
  }

  if (action === 'search-book-api') {
    const form = target.closest('form');
    const titleInput = form?.querySelector('input[name="title"]');
    const query = titleInput?.value?.trim() || 'livro';
    const result = await searchOpenLibrary(query);
    if (!result) {
      showToast('Não foi possível buscar o livro.');
      return;
    }

    form.querySelector('input[name="title"]').value = result.title || titleInput.value;
    form.querySelector('input[name="author"]').value = result.author || '';
    form.querySelector('input[name="isbn"]').value = result.isbn || '';
    form.querySelector('input[name="pages"]').value = result.pages || '';
    form.querySelector('input[name="year"]').value = result.year || '';
    const coverPreview = document.getElementById('bookCoverPreview');
    if (coverPreview) {
      coverPreview.innerHTML = `<img src="${result.cover}" alt="Prévia da capa do livro" />`;
    }
    showToast('Dados preenchidos a partir da API de livros.');
    return;
  }

  if (action === 'view-detail') {
    const workId = target.dataset.workId;
    if (workId) {
      state.currentView = 'detail';
      state.detailWorkId = workId;
      renderAll();
    }
    return;
  }

  if (action === 'toggle-favorite') {
    const entry = state.userBooks.find((item) => item.id === target.dataset.bookId);
    if (!entry) return;
    entry.favorito = !entry.favorito;
    persistState();
    renderAll();
    return;
  }

  if (action === 'remove-book') {
    const bookId = target.dataset.bookId;
    const confirmed = window.confirm('Deseja remover este livro da estante?');
    if (!confirmed) return;
    state.userBooks = state.userBooks.filter((entry) => entry.id !== bookId);
    persistState();
    renderAll();
    showToast('Livro removido da sua estante.');
    return;
  }

  if (action === 'edit-review-toggle') {
    state.editingReviewId = target.dataset.bookId;
    renderAll();
    return;
  }

  if (action === 'cancel-review-edit') {
    state.editingReviewId = null;
    renderAll();
    return;
  }

  if (action === 'toggle-review-expand') {
    const { bookId } = target.dataset;
    state.expandedBookId = state.expandedBookId === bookId ? null : bookId;
    renderAll();
    return;
  }

  if (action === 'toggle-like-review') {
    if (!getCurrentUser()) {
      showToast('Faça login para curtir uma resenha.');
      return;
    }
    const reviewId = target.dataset.reviewId;
    const interaction = state.reviewInteractions.find((item) => item.id === reviewId);
    if (!interaction) return;
    interaction.liked = !interaction.liked;
    interaction.likes = Math.max(0, interaction.likes + (interaction.liked ? 1 : -1));
    persistState();
    renderAll();
    return;
  }

  if (action === 'focus-comment') {
    const reviewId = target.dataset.reviewId;
    const form = document.querySelector(`form[data-review-id="${reviewId}"] input[name="commentText"]`);
    form?.focus();
    return;
  }

  if (action === 'toggle-spoiler') {
    const reviewId = target.dataset.reviewId;
    const interaction = state.reviewInteractions.find((item) => item.id === reviewId);
    if (!interaction) return;
    interaction.spoiler = !interaction.spoiler;
    renderAll();
    return;
  }

  if (action === 'follow-user') {
    const userId = target.dataset.userId;
    const currentUser = getCurrentUser();
    if (!currentUser) {
      showToast('Faça login para seguir outros leitores.');
      return;
    }

    const alreadyFollowing = state.follows.some((item) => item.followerId === currentUser.id && item.followingId === userId);
    if (alreadyFollowing) {
      state.follows = state.follows.filter((item) => !(item.followerId === currentUser.id && item.followingId === userId));
    } else {
      state.follows.push({ followerId: currentUser.id, followingId: userId });
    }
    persistState();
    renderAll();
    return;
  }

  if (action === 'explore-search') {
    const term = target.value;
    state.exploreSearch = term;
    renderAll();
    return;
  }
}

async function handleSubmit(event) {
  const form = event.target;
  if (!(form instanceof HTMLFormElement)) return;

  const formName = form.dataset.form;

  if (formName === 'login') {
    event.preventDefault();
    const emailField = form.querySelector('[name="email"]');
    const passwordField = form.querySelector('[name="password"]');
    const email = (emailField?.value || '').trim();
    const password = passwordField?.value || '';
    const user = state.users.find((item) => item.email.toLowerCase() === email.toLowerCase());
    const hashedPassword = await hashString(password);
    const matches = !!user && (user.passwordHash === password || user.passwordHash === hashedPassword);

    if (!matches) {
      showToast('E-mail ou senha incorretos.');
      return;
    }

    state.sessionUserId = user.id;
    persistState();
    showToast('Login realizado. Redirecionando...');
    state.currentView = 'home';
    state.activeTab = 'shelf';
    renderAll();
    return;
  }

  if (formName === 'signup') {
    event.preventDefault();
    const name = (form.querySelector('[name="name"]')?.value || '').trim();
    const email = (form.querySelector('[name="email"]')?.value || '').trim();
    const password = form.querySelector('[name="password"]')?.value || '';
    const confirmPassword = form.querySelector('[name="confirmPassword"]')?.value || '';

    if (!name) {
      showToast('Informe seu nome.');
      return;
    }

    if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      showToast('Informe um e-mail válido.');
      return;
    }

    if (password.length < 8) {
      showToast('A senha deve ter no mínimo 8 caracteres.');
      return;
    }

    if (password !== confirmPassword) {
      showToast('As senhas não coincidem.');
      return;
    }

    if (state.users.some((user) => user.email.toLowerCase() === email.toLowerCase())) {
      showToast('Já existe uma conta com este e-mail. Tente entrar.');
      return;
    }

    const user = {
      id: `u-${crypto.randomUUID ? crypto.randomUUID() : Date.now()}`,
      name,
      email,
      passwordHash: await hashString(password),
      bio: 'Leitor da Biblioteca de Alexandria.',
      privacy: 'publico'
    };

    state.users.push(user);
    state.sessionUserId = user.id;
    persistState();
    showToast('Conta criada com sucesso.');
    state.currentView = 'home';
    state.activeTab = 'shelf';
    renderAll();
    return;
  }

  if (formName === 'recovery') {
    event.preventDefault();
    const email = form.email.value.trim();
    const hasEmailService = false;

    if (hasEmailService) {
      const password = String(Math.floor(100000 + Math.random() * 900000));
      const targetUser = state.users.find((user) => user.email.toLowerCase() === email.toLowerCase());
      if (targetUser) {
        targetUser.passwordHash = await hashString(password);
      }
      showToast('Se esse e-mail estiver cadastrado, enviamos uma nova senha para ele.');
      return;
    }

    showToast('Se esse e-mail estiver cadastrado, enviamos uma nova senha para ele.');
    return;
  }

  if (formName === 'add-book') {
    event.preventDefault();
    const formData = new FormData(form);
    const title = String(formData.get('title') || '').trim();
    const coverFile = formData.get('cover');

    if (!title) {
      showToast('Informe o título do livro.');
      return;
    }

    if (!coverFile || coverFile.size === 0) {
      showToast('Adicione uma capa antes de salvar.');
      return;
    }

    const coverUrl = await compressImageToDataUrl(coverFile);
    const workTitle = String(formData.get('title') || '').trim();
    const author = String(formData.get('author') || '').trim();
    const normalized = normalizeTitle(workTitle);

    let work = state.works.find((item) => normalizeTitle(item.title) === normalized && normalizeTitle(item.author || '') === normalizeTitle(author || item.author || ''));
    if (!work) {
      work = {
        id: `work-${crypto.randomUUID ? crypto.randomUUID() : Date.now()}`,
        title: workTitle,
        author: author || 'Autor desconhecido',
        isbn: String(formData.get('isbn') || ''),
        cover: coverUrl,
        pages: Number(formData.get('pages') || 0),
        genres: ['Diversos'],
        year: Number(formData.get('year') || new Date().getFullYear()),
        publisher: 'Manual'
      };
      state.works.push(work);
    }

    const userBook = {
      id: `ub-${crypto.randomUUID ? crypto.randomUUID() : Date.now()}`,
      userId: getCurrentUser()?.id || 'u-demo',
      workId: work.id,
      reader: getCurrentUser()?.name || 'Leitor anônimo',
      title: workTitle,
      status: String(formData.get('status') || 'Lendo'),
      nota: Number(formData.get('nota') || 5),
      favorito: false,
      resenha: String(formData.get('resenha') || '').trim(),
      createdAt: new Date().toISOString(),
      pages: Number(formData.get('pages') || 0),
      hasCover: true,
      progress: 0
    };

    state.userBooks.unshift(userBook);
    state.reviewInteractions.unshift({ id: `ri-${Date.now()}`, userBookId: userBook.id, likes: 0, liked: false, spoiler: false, comments: [] });
    persistState();
    form.reset();
    document.getElementById('bookCoverPreview').innerHTML = '<img src="https://images.unsplash.com/photo-1512820790803-83ca734da794?auto=format&fit=crop&w=900&q=80" alt="Prévia da capa" />';
    renderAll();
    showToast(`${workTitle} foi adicionado à sua estante.`);
    return;
  }

  if (formName === 'save-review') {
    event.preventDefault();
    const bookId = form.dataset.bookId;
    const entry = state.userBooks.find((item) => item.id === bookId);
    if (!entry) return;
    entry.resenha = form.reviewText.value.trim();
    entry.reviewEdited = true;
    state.editingReviewId = null;
    persistState();
    renderAll();
    return;
  }

  if (formName === 'comment') {
    event.preventDefault();
    const reviewId = form.dataset.reviewId;
    const text = form.commentText.value.trim();
    if (!text) return;
    const interaction = state.reviewInteractions.find((item) => item.id === reviewId);
    if (!interaction) return;
    interaction.comments.push({ id: `c-${Date.now()}`, user: getCurrentUser()?.name || 'Você', text });
    persistState();
    renderAll();
    return;
  }

  if (formName === 'profile') {
    event.preventDefault();
    const currentUser = getCurrentUser();
    if (!currentUser) return;
    const bio = form.bio.value.trim() || 'Leitor da Biblioteca de Alexandria.';
    const quote = form.quote.value.trim();
    currentUser.bio = bio.substring(0, 180);
    if (quote) {
      state.quotes.push({ id: `q-${Date.now()}`, userId: currentUser.id, workId: 'work-1', text: quote.substring(0, 240) });
    }
    persistState();
    renderAll();
    showToast('Perfil atualizado.');
    return;
  }

  if (formName === 'create-list') {
    event.preventDefault();
    const name = form.listName.value.trim();
    if (!name) {
      showToast('Digite um nome para a lista.');
      return;
    }
    const list = { id: `list-${Date.now()}`, userId: getCurrentUser()?.id || 'u-demo', name, description: form.listDescription.value.trim(), public: true, items: [] };
    state.lists.push(list);
    persistState();
    renderAll();
    return;
  }
}

function handleInput(event) {
  const target = event.target;
  if (target.matches('[data-action="update-shelf-search"]')) {
    state.shelfSearch = target.value;
    renderAll();
    return;
  }

  if (target.matches('[data-action="update-shelf-status"]')) {
    state.shelfStatus = target.value;
    renderAll();
    return;
  }

  if (target.matches('[data-action="update-shelf-sort"]')) {
    state.shelfSort = target.value;
    renderAll();
    return;
  }

  if (target.matches('input[name="cover"]')) {
    const file = target.files && target.files[0];
    if (!file) return;
    const preview = document.getElementById('bookCoverPreview');
    const url = URL.createObjectURL(file);
    if (preview) preview.innerHTML = `<img src="${url}" alt="Prévia da capa" />`;
  }
}

function getFilteredAndSortedShelf() {
  let books = [...state.userBooks];
  const term = normalizeTitle(state.shelfSearch || '');

  if (term) {
    books = books.filter((entry) => normalizeTitle(entry.title || '').includes(term));
  }

  if (state.shelfStatus && state.shelfStatus !== 'all') {
    books = books.filter((entry) => entry.status === state.shelfStatus);
  }

  switch (state.shelfSort) {
    case 'title':
      books.sort((a, b) => (a.title || '').localeCompare(b.title || ''));
      break;
    case 'rating':
      books.sort((a, b) => Number(b.nota || 0) - Number(a.nota || 0));
      break;
    case 'favorite':
      books.sort((a, b) => Number(b.favorito) - Number(a.favorito));
      break;
    default:
      books.sort((a, b) => new Date(b.createdAt || 0) - new Date(a.createdAt || 0));
      break;
  }

  return books;
}

function getFilteredBooksBySearch() {
  const term = normalizeTitle(state.exploreSearch || '');
  if (!term) {
    return state.userBooks;
  }

  return state.userBooks.filter((entry) => {
    const work = getWorkById(entry.workId);
    return normalizeTitle(entry.title || '').includes(term) || normalizeTitle(entry.reader || '').includes(term) || normalizeTitle((work?.author || '')).includes(term) || normalizeTitle((work?.genres || []).join(' ')).includes(term);
  });
}

function getWorkById(workId) {
  return state.works.find((item) => item.id === workId) || state.works[0];
}

function getReviewInteraction(userBookId) {
  return state.reviewInteractions.find((item) => item.userBookId === userBookId) || { id: `ri-${userBookId}`, userBookId, likes: 0, liked: false, spoiler: false, comments: [] };
}

function maybeRenderFollowButton(userId) {
  if (!getCurrentUser()) return '';
  if (userId === getCurrentUser()?.id) return '';
  const isFollowing = state.follows.some((item) => item.followerId === getCurrentUser()?.id && item.followingId === userId);
  return `<button type="button" class="secondary-btn" data-action="follow-user" data-user-id="${userId}">${isFollowing ? 'Seguindo' : 'Seguir'}</button>`;
}

function showToast(message) {
  const toast = document.getElementById('toast');
  if (!toast) return;
  toast.textContent = message;
  toast.classList.add('visible');
  clearTimeout(showToast.timeoutId);
  showToast.timeoutId = setTimeout(() => {
    toast.classList.remove('visible');
  }, 1800);
}

async function searchOpenLibrary(query) {
  try {
    const response = await fetch(`https://openlibrary.org/search.json?q=${encodeURIComponent(query)}&limit=1`);
    if (!response.ok) return null;
    const data = await response.json();
    const doc = data.docs && data.docs[0];
    if (!doc) return null;
    const coverId = doc.cover_i ? `https://covers.openlibrary.org/b/id/${doc.cover_i}-L.jpg` : 'https://images.unsplash.com/photo-1512820790803-83ca734da794?auto=format&fit=crop&w=900&q=80';
    return {
      title: doc.title || '',
      author: Array.isArray(doc.author_name) ? doc.author_name[0] : '',
      pages: doc.number_of_pages_median || '',
      year: doc.first_publish_year || '',
      isbn: Array.isArray(doc.isbn) ? doc.isbn[0] : '',
      cover: coverId
    };
  } catch (error) {
    return null;
  }
}

async function hashString(value) {
  if (!window.crypto || !window.crypto.subtle) {
    return value;
  }
  const bytes = new TextEncoder().encode(value);
  const digest = await window.crypto.subtle.digest('SHA-256', bytes);
  return Array.from(new Uint8Array(digest)).map((byte) => byte.toString(16).padStart(2, '0')).join('');
}

async function compressImageToDataUrl(file) {
  const imageType = file.type || 'image/jpeg';
  const url = URL.createObjectURL(file);
  const image = await new Promise((resolve, reject) => {
    const img = new Image();
    img.onload = () => resolve(img);
    img.onerror = reject;
    img.src = url;
  });

  const canvas = document.createElement('canvas');
  const maxWidth = 600;
  const scale = Math.min(1, maxWidth / image.width);
  canvas.width = image.width * scale;
  canvas.height = image.height * scale;
  const context = canvas.getContext('2d');
  context.drawImage(image, 0, 0, canvas.width, canvas.height);
  URL.revokeObjectURL(url);
  return canvas.toDataURL(imageType, 0.72);
}

function renderStars(value) {
  const rating = Number(value || 0);
  const percent = Math.min(100, Math.max(0, (rating / 5) * 100));
  return `<span class="stars" aria-label="Nota ${rating.toFixed(1)} de 5" style="--rating:${percent}%"></span>`;
}

function normalizeTitle(value) {
  return String(value || '')
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/[^a-zA-Z0-9\s]/g, '')
    .toLowerCase()
    .trim();
}

function escapeHtml(value) {
  return String(value || '')
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#039;');
}

function getInitials(name) {
  return String(name || 'A')
    .split(' ')
    .slice(0, 2)
    .map((part) => part.charAt(0).toUpperCase())
    .join('')
    .slice(0, 2) || 'A';
}

function formatDate(dateString) {
  const date = new Date(dateString || Date.now());
  return date.toLocaleDateString('pt-BR', { day: '2-digit', month: 'short', year: 'numeric' });
}

if (!window.crypto || !window.crypto.subtle) {
  window.crypto = {
    subtle: {
      digest: async () => new Uint8Array()
    }
  };
}
