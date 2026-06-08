/* ============================================================
   PROMPT FORGE - 메인 스크립트
   ============================================================ */

/* ============ 기본 데이터: 양식 2종 ============ */
const BUILTIN_TEMPLATES = [
  {
    id: 'builtin-1',
    name: '상세형 (양식 1)',
    builtin: true,
    body: `# 기본 정보
이름 : 
성별 : 
나이 : 
직업 : 
인간관계 및 사회성 : 
# 외모
신장/체중(선택) : 
체격 및 체형 : 
헤어스타일 : 
얼굴 및 이목구비 : 
주요 신체적 특징 및 생리적 반응 : 
# 신체 비밀/특징
(ex. 체향, 특정 부위에 점이 있다, 어디가 민감하다 등등...)
# 호불호
## 선호 요소
선호하는 상황 : 
선호하는 인간상 : 
환경적 선호 : (ex. 막 동이 트는 이른 새벽의 공원, 사람이 적고 조용한 곳 등등)
감각적 선호 : (ex. 특정한 소리나 향기 등등)
기타 취미나 취향 등등 :
## 불호 요소
기피하는 상황 : 
기피하는 인간상 : 
기타 취향 등등 : 
# 목소리 및 화법
기본 : 
감정 동요 시 : 
# 복장
일상복 : 
외출복 : 
# 습관
# 특징
## 언어 및 커뮤니케이션 특징
## NSFW 특징
# 기타 특이사항
# 행동 선호도
## {{char}}이 {{user}}에게 자주 하는 행동
## {{user}}가 {{char}}에게 하면 {{char}}이 좋아하는 행동
# 연애관(관계 지향성)
연애의 핵심 전제 및 정의 : 
관계에서 안정감을 느끼는 필수 요건 : 
연애 경험의 유무 및 잠재적 발전 가능성 : 
관계 진전 시 나타나는 불안정함과 애정 확인의 방식 : 
상대를 위해 변화하거나 노력하는 지점 : 
애정 표현에 대한 수용 방식과 심리적 반응 : 
절대적인 안정감을 느낄 때 나타나는 행동 변화 : 
# 종합 인물 요약(선택)`,
  },
  {
    id: 'builtin-2',
    name: '간결형 (양식 2)',
    builtin: true,
    body: `# 기본 프로필
- 이름: 
- 성별: 
- 나이: 
- 외형: 
- 성격: 
- 특징: 
- 거주지: 
- 의복 스타일: 
# 행동 지침
- 
# 연애관
- 
# 과거 배경
- 핵심 사건 위주
# 트라우마 
- 트리거, 대처 방식 등을 간결하게 서술. 없으면 "없음"으로 표기
# NSFW 설정
- 성적 성향: 
- 행위 스타일: 
- 성향: 
- 선호 체위: 
- 말투 예시: `,
  },
];

/* ============ 기본 시스템 프롬프트 ============ */
const DEFAULT_SYSTEM_PROMPTS = {
  world: `당신은 AI 채팅용 세계관 프롬프트를 작성하는 전문가입니다.
사용자가 짧은 아이디어/컨셉을 주면, 그것을 풍부하고 일관성 있는 세계관 프롬프트로 확장해 주세요.

## 작성 원칙
- 사용자의 아이디어를 핵심 골격으로 삼되, 클리셰는 피하고 구체적인 디테일로 살을 붙일 것
- 시대·지리·정치·경제·문화·종교·기술수준·마법/초자연 체계 등을 필요한 만큼 다룰 것
- 분위기와 톤이 일관되도록 할 것
- 캐릭터가 이 세계 안에서 어떻게 행동할지 가늠할 수 있는 정도의 정보를 줄 것
- 출력은 마크다운 형식을 사용할 것 (#, ##, - 등)

## 출력 형식 옵션 (사용자가 지정)
- **혼합형**: 헤더 아래에 산문과 키워드 목록을 자연스럽게 섞어 사용
- **산문형**: 헤더 아래에 문단형 서술 중심 (목록 사용 최소화)
- **키워드형**: 헤더 아래에 짧은 키워드+간단 설명 위주의 불릿 목록

## 출력 시 주의
- 메타 코멘트("이런 식으로 작성했습니다" 등) 없이 바로 프롬프트 본문만 출력할 것
- 코드 블록(\`\`\`)으로 감싸지 말 것
- 영어가 더 자연스러운 고유명사 외에는 한국어로 작성할 것`,

  char: `당신은 AI 채팅용 캐릭터 프롬프트를 작성하는 전문가입니다.
사용자가 캐릭터 아이디어와 양식(템플릿)을 주면, 양식의 모든 필드를 일관성 있고 입체적으로 채워 주세요.

## 작성 원칙
- 주어진 양식의 구조(헤더, 항목 이름, 들여쓰기, 순서)는 그대로 유지할 것
- 모든 필드를 빠짐없이 채울 것 (해당 없는 항목은 "없음" 또는 적절한 표기)
- 클리셰를 피하고 구체적·감각적인 디테일을 넣을 것 (체향, 손버릇, 말끝 어미 등)
- 모순 없이 일관된 인격으로 통합할 것 (성격↔과거↔호불호↔말투가 서로를 설명할 것)
- {{char}}, {{user}} 같은 플레이스홀더는 그대로 유지할 것
- NSFW 항목이 양식에 포함되어 있다면 직접적이고 솔직하게 작성할 것 (회피 금지)
- "예시"라는 표현으로 시작하는 항목은 실제 예시로 채울 것

## 세계관 참조
- 별도 세계관 정보가 함께 주어진 경우, 캐릭터가 그 세계 안에서 자연스럽게 살아가도록 만들 것 (직업, 복장, 가치관, 말투 등이 세계관과 충돌하지 않도록)

## 출력 시 주의
- 메타 코멘트 없이 바로 양식의 빈 칸이 채워진 형태로만 출력할 것
- 코드 블록(\`\`\`)으로 감싸지 말 것
- 양식에 명시되지 않은 헤더나 항목을 임의로 추가하지 말 것`,
};

/* ============ 모델 목록 ============ */
const MODELS = {
  anthropic: [
    { id: 'claude-opus-4-8', name: 'Claude Opus 4.8 (최신)' },
    { id: 'claude-opus-4-7', name: 'Claude Opus 4.7' },
    { id: 'claude-opus-4-6', name: 'Claude Opus 4.6' },
    { id: 'claude-sonnet-4-6', name: 'Claude Sonnet 4.6 (권장)' },
    { id: 'claude-haiku-4-5', name: 'Claude Haiku 4.5 (빠름)' },
    { id: 'claude-3-5-sonnet-20241022', name: 'Claude 3.5 Sonnet (구버전)' },
    { id: 'claude-3-5-haiku-20241022', name: 'Claude 3.5 Haiku (구버전)' },
  ],
  google: [
    { id: 'gemini-2.5-pro', name: 'Gemini 2.5 Pro (권장)' },
    { id: 'gemini-2.5-flash', name: 'Gemini 2.5 Flash' },
    { id: 'gemini-2.5-flash-lite', name: 'Gemini 2.5 Flash-Lite' },
    { id: 'gemini-2.0-flash', name: 'Gemini 2.0 Flash' },
  ],
};

/* ============ 스토리지 ============ */
const LS = {
  get(key, fallback) {
    try {
      const v = localStorage.getItem('pf:' + key);
      return v === null ? fallback : JSON.parse(v);
    } catch { return fallback; }
  },
  set(key, val) {
    try { localStorage.setItem('pf:' + key, JSON.stringify(val)); } catch {}
  },
  del(key) { localStorage.removeItem('pf:' + key); },
};

/* ============ 상태 ============ */
const state = {
  view: 'generate',
  tab: 'world',
  templates: LS.get('templates', BUILTIN_TEMPLATES.slice()),
  selectedTemplateId: LS.get('selectedTemplate', 'builtin-1'),
  worlds: LS.get('worlds', []),
  chars: LS.get('chars', []),
  keys: LS.get('keys', { anthropic: '', google: '' }),
  systemPrompts: LS.get('systemPrompts', { ...DEFAULT_SYSTEM_PROMPTS }),
  theme: LS.get('theme', 'dark'),
  currentOutput: '',
  currentThinking: '',
  isGenerating: false,
  abortController: null,
};

// 기본 양식이 변경/누락되어 있으면 보강
function ensureBuiltins() {
  for (const bt of BUILTIN_TEMPLATES) {
    if (!state.templates.find(t => t.id === bt.id)) {
      state.templates.unshift({ ...bt });
    }
  }
}
ensureBuiltins();

/* ============ 유틸 ============ */
const $ = sel => document.querySelector(sel);
const $$ = sel => document.querySelectorAll(sel);

function toast(msg, ms = 2200) {
  const old = document.querySelector('.toast');
  if (old) old.remove();
  const t = document.createElement('div');
  t.className = 'toast';
  t.textContent = msg;
  document.body.appendChild(t);
  setTimeout(() => t.remove(), ms);
}

function uid() {
  return Date.now().toString(36) + Math.random().toString(36).slice(2, 7);
}

function formatNumber(n) {
  return n.toLocaleString('en-US');
}

function timeAgo(ts) {
  const diff = (Date.now() - ts) / 1000;
  if (diff < 60) return '방금 전';
  if (diff < 3600) return Math.floor(diff / 60) + '분 전';
  if (diff < 86400) return Math.floor(diff / 3600) + '시간 전';
  return Math.floor(diff / 86400) + '일 전';
}

/* ============ 뷰 전환 ============ */
function setView(view) {
  state.view = view;
  $$('.nav-item').forEach(n => n.classList.toggle('active', n.dataset.view === view));
  $$('.view').forEach(v => v.classList.add('hidden'));
  $('#view-' + view).classList.remove('hidden');
  $('#sidebar').classList.remove('mobile-open');

  if (view === 'templates') renderTemplateList();
  if (view === 'settings') loadSettingsInputs();
}

function setTab(tab) {
  state.tab = tab;
  $$('.tab').forEach(t => t.classList.toggle('active', t.dataset.tab === tab));
  $$('.tab-panel').forEach(p => p.classList.add('hidden'));
  $('#tab-' + tab).classList.remove('hidden');
  refreshGenerateForm();
}

/* ============ 모델 셀렉트 ============ */
function refreshModels() {
  const provider = $('#provider').value;
  const sel = $('#model');
  sel.innerHTML = '';
  for (const m of MODELS[provider]) {
    const opt = document.createElement('option');
    opt.value = m.id;
    opt.textContent = m.name;
    sel.appendChild(opt);
  }
  // 기억된 모델 복원
  const saved = LS.get('lastModel:' + provider, null);
  if (saved && MODELS[provider].find(m => m.id === saved)) sel.value = saved;
}

/* ============ 슬라이더 표시 ============ */
function updateMaxTokens() {
  const v = parseInt($('#maxTokens').value);
  $('#maxTokensVal').textContent = formatNumber(v);
}
function updateThinkBudget() {
  const v = parseInt($('#thinkBudget').value);
  $('#thinkBudgetVal').textContent = v === 0 ? '사용 안 함' : formatNumber(v);
}

/* ============ 사이드바: 저장 목록 ============ */
function renderSidebarLists() {
  // 세계관
  const wl = $('#worldList');
  if (state.worlds.length === 0) {
    wl.innerHTML = '<div class="empty-list">저장된 세계관이 없습니다</div>';
  } else {
    wl.innerHTML = '';
    for (const w of state.worlds) {
      const el = document.createElement('div');
      el.className = 'sidebar-list-item';
      el.innerHTML = `
        <div style="flex:1; overflow:hidden;">
          <div class="name">${escapeHtml(w.name)}</div>
          <div class="list-meta">${timeAgo(w.ts)}</div>
        </div>
        <div class="actions">
          <button class="icon-btn" title="불러오기" data-act="load-world">
            <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4M7 10l5 5 5-5M12 15V3"/></svg>
          </button>
          <button class="icon-btn danger" title="삭제" data-act="del-world">
            <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><polyline points="3 6 5 6 21 6"/><path d="M19 6l-2 14H7L5 6"/></svg>
          </button>
        </div>`;
      el.querySelector('[data-act="load-world"]').onclick = (e) => { e.stopPropagation(); loadWorldIntoOutput(w); };
      el.querySelector('[data-act="del-world"]').onclick = (e) => { e.stopPropagation(); deleteWorld(w.id); };
      el.onclick = () => loadWorldIntoOutput(w);
      wl.appendChild(el);
    }
  }

  // 캐릭터
  const cl = $('#charList');
  if (state.chars.length === 0) {
    cl.innerHTML = '<div class="empty-list">저장된 캐릭터가 없습니다</div>';
  } else {
    cl.innerHTML = '';
    for (const c of state.chars) {
      const el = document.createElement('div');
      el.className = 'sidebar-list-item';
      el.innerHTML = `
        <div style="flex:1; overflow:hidden;">
          <div class="name">${escapeHtml(c.name)}</div>
          <div class="list-meta">${timeAgo(c.ts)}</div>
        </div>
        <div class="actions">
          <button class="icon-btn" title="불러오기" data-act="load-char">
            <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4M7 10l5 5 5-5M12 15V3"/></svg>
          </button>
          <button class="icon-btn danger" title="삭제" data-act="del-char">
            <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><polyline points="3 6 5 6 21 6"/><path d="M19 6l-2 14H7L5 6"/></svg>
          </button>
        </div>`;
      el.querySelector('[data-act="load-char"]').onclick = (e) => { e.stopPropagation(); loadCharIntoOutput(c); };
      el.querySelector('[data-act="del-char"]').onclick = (e) => { e.stopPropagation(); deleteChar(c.id); };
      el.onclick = () => loadCharIntoOutput(c);
      cl.appendChild(el);
    }
  }

  // 세계관 참조 셀렉트
  const sel = $('#worldRefSelect');
  if (sel) {
    const cur = sel.value;
    sel.innerHTML = '<option value="">— 세계관 선택 —</option>';
    for (const w of state.worlds) {
      const opt = document.createElement('option');
      opt.value = w.id;
      opt.textContent = w.name;
      sel.appendChild(opt);
    }
    if (cur) sel.value = cur;
  }
}

function escapeHtml(s) {
  return String(s).replace(/[&<>"']/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));
}

function loadWorldIntoOutput(w) {
  state.currentOutput = w.body;
  state.currentThinking = '';
  $('#output').textContent = w.body;
  setStatus('done', `세계관 「${w.name}」 불러옴`);
  setView('generate');
  setTab('world');
}
function loadCharIntoOutput(c) {
  state.currentOutput = c.body;
  state.currentThinking = '';
  $('#output').textContent = c.body;
  setStatus('done', `캐릭터 「${c.name}」 불러옴`);
  setView('generate');
  setTab('char');
}

function deleteWorld(id) {
  if (!confirm('이 세계관을 삭제하시겠습니까?')) return;
  state.worlds = state.worlds.filter(w => w.id !== id);
  LS.set('worlds', state.worlds);
  renderSidebarLists();
  toast('세계관 삭제됨');
}
function deleteChar(id) {
  if (!confirm('이 캐릭터를 삭제하시겠습니까?')) return;
  state.chars = state.chars.filter(c => c.id !== id);
  LS.set('chars', state.chars);
  renderSidebarLists();
  toast('캐릭터 삭제됨');
}

/* ============ 양식 chip 렌더 ============ */
function renderTemplateChips() {
  const row = $('#templateChips');
  row.innerHTML = '';
  for (const t of state.templates) {
    const chip = document.createElement('button');
    chip.className = 'chip' + (state.selectedTemplateId === t.id ? ' active' : '');
    chip.textContent = t.name;
    chip.onclick = () => {
      state.selectedTemplateId = t.id;
      LS.set('selectedTemplate', t.id);
      renderTemplateChips();
      // override 텍스트박스 채우기
      $('#charTemplateOverride').value = t.body;
    };
    row.appendChild(chip);
  }
  // 커스텀 직접 작성 옵션
  const customChip = document.createElement('button');
  customChip.className = 'chip' + (state.selectedTemplateId === '__blank__' ? ' active' : '');
  customChip.textContent = '+ 직접 작성';
  customChip.onclick = () => {
    state.selectedTemplateId = '__blank__';
    LS.set('selectedTemplate', '__blank__');
    renderTemplateChips();
    $('#charTemplateOverride').value = '';
  };
  row.appendChild(customChip);

  // 선택된 양식의 본문을 override 박스에 채워두기
  const sel = state.templates.find(t => t.id === state.selectedTemplateId);
  if (sel) {
    if (!$('#charTemplateOverride').value || !state._templateBoxTouched) {
      $('#charTemplateOverride').value = sel.body;
    }
  } else if (state.selectedTemplateId === '__blank__') {
    // 빈 칸
  }
}

/* ============ 양식 관리 페이지 렌더 ============ */
function renderTemplateList() {
  const list = $('#templateList');
  list.innerHTML = '';
  for (const t of state.templates) {
    const el = document.createElement('div');
    el.style.cssText = 'padding: 14px 16px; border: 1px solid var(--border); border-radius: 8px; margin-bottom: 10px; display: flex; align-items: center; justify-content: space-between; gap: 10px;';
    el.innerHTML = `
      <div style="flex:1; overflow:hidden;">
        <div style="font-weight: 600; margin-bottom: 2px;">
          ${escapeHtml(t.name)}
          ${t.builtin ? '<span class="tag" style="margin-left: 6px;">기본</span>' : ''}
        </div>
        <div style="font-size: 11.5px; color: var(--text-faint); overflow: hidden; text-overflow: ellipsis; white-space: nowrap;">
          ${escapeHtml(t.body.slice(0, 90))}...
        </div>
      </div>
      <div style="display: flex; gap: 6px;">
        <button class="btn btn-sm btn-ghost" data-act="edit">편집</button>
        ${!t.builtin ? '<button class="btn btn-sm btn-ghost" data-act="del" style="color: var(--danger);">삭제</button>' : ''}
      </div>
    `;
    el.querySelector('[data-act="edit"]').onclick = () => openTemplateModal(t);
    const dBtn = el.querySelector('[data-act="del"]');
    if (dBtn) dBtn.onclick = () => deleteTemplate(t.id);
    list.appendChild(el);
  }
}

function deleteTemplate(id) {
  if (!confirm('이 양식을 삭제하시겠습니까?')) return;
  state.templates = state.templates.filter(t => t.id !== id);
  LS.set('templates', state.templates);
  if (state.selectedTemplateId === id) {
    state.selectedTemplateId = state.templates[0]?.id || '__blank__';
    LS.set('selectedTemplate', state.selectedTemplateId);
  }
  renderTemplateList();
  renderTemplateChips();
  toast('양식 삭제됨');
}

/* ============ 모달 (양식 편집) ============ */
let editingTemplate = null;
function openTemplateModal(t) {
  editingTemplate = t;
  $('#modalTitle').textContent = t ? '양식 편집' : '새 양식';
  $('#modalTemplateName').value = t ? t.name : '';
  $('#modalTemplateBody').value = t ? t.body : '';
  $('#modalBackdrop').classList.remove('hidden');
}
function closeModal() {
  $('#modalBackdrop').classList.add('hidden');
  editingTemplate = null;
}
function saveTemplate() {
  const name = $('#modalTemplateName').value.trim();
  const body = $('#modalTemplateBody').value;
  if (!name) { toast('양식 이름을 입력해주세요'); return; }
  if (!body.trim()) { toast('양식 내용을 입력해주세요'); return; }

  if (editingTemplate) {
    // 기본 양식을 편집할 경우 새 양식으로 복제
    if (editingTemplate.builtin && (name !== editingTemplate.name || body !== editingTemplate.body)) {
      const newT = { id: uid(), name, body, builtin: false };
      state.templates.push(newT);
    } else {
      editingTemplate.name = name;
      editingTemplate.body = body;
    }
  } else {
    state.templates.push({ id: uid(), name, body, builtin: false });
  }
  LS.set('templates', state.templates);
  renderTemplateList();
  renderTemplateChips();
  closeModal();
  toast('양식 저장됨');
}

/* ============ 상태 표시 ============ */
function setStatus(status, text) {
  const dot = $('#statusDot');
  dot.className = 'status-dot';
  if (status) dot.classList.add(status);
  $('#statusText').textContent = text;
}

/* ============ 출력 영역 렌더 ============ */
function renderOutput() {
  const out = $('#output');
  out.innerHTML = '';
  if (state.currentThinking) {
    const tb = document.createElement('div');
    tb.className = 'thinking-block';
    tb.innerHTML = `<div class="thinking-header">▸ 추론 과정 (Thinking)</div>` + escapeHtml(state.currentThinking);
    out.appendChild(tb);
  }
  const txt = document.createElement('div');
  txt.textContent = state.currentOutput;
  out.appendChild(txt);
  out.scrollTop = out.scrollHeight;
}

/* ============ 세팅 입력 로드 ============ */
function loadSettingsInputs() {
  $('#anthropicKey').value = state.keys.anthropic || '';
  $('#googleKey').value = state.keys.google || '';
  $('#worldSystemPrompt').value = state.systemPrompts.world || DEFAULT_SYSTEM_PROMPTS.world;
  $('#charSystemPrompt').value = state.systemPrompts.char || DEFAULT_SYSTEM_PROMPTS.char;
}

/* ============ 생성 폼 현재 탭에 따라 표시 ============ */
function refreshGenerateForm() {
  // 사이드바 동기화 (세계관 참조 셀렉트)
  renderSidebarLists();
}

/* ============================================================
   API 호출
   ============================================================ */

async function generate() {
  if (state.isGenerating) {
    // 취소
    if (state.abortController) state.abortController.abort();
    return;
  }

  const provider = $('#provider').value;
  const model = $('#model').value;
  const maxTokens = parseInt($('#maxTokens').value);
  const thinkBudget = parseInt($('#thinkBudget').value);
  const autoSave = $('#autoSave').checked;

  const key = state.keys[provider];
  if (!key) {
    toast('설정에서 API 키를 먼저 입력해주세요');
    setView('settings');
    return;
  }

  if (thinkBudget > 0 && thinkBudget >= maxTokens) {
    toast('추론 토큰은 최대 출력 토큰보다 작아야 합니다');
    return;
  }

  // 프롬프트 구성
  const tab = state.tab;
  let systemPrompt, userPrompt, name, kind;
  if (tab === 'world') {
    const idea = $('#worldIdea').value.trim();
    if (!idea) { toast('아이디어를 입력해주세요'); return; }
    const format = document.querySelector('input[name="worldFormat"]:checked').value;
    const formatLabel = { mixed: '혼합형 (산문+키워드 적절히)', prose: '산문형 (문단 중심)', keyword: '키워드형 (불릿 목록 중심)' }[format];
    systemPrompt = state.systemPrompts.world;
    userPrompt = `## 출력 형식
${formatLabel}

## 아이디어
${idea}

위 아이디어를 토대로 세계관 프롬프트를 작성해 주세요.`;
    name = $('#worldName').value.trim() || `세계관 ${new Date().toLocaleString('ko-KR')}`;
    kind = 'world';
  } else {
    const idea = $('#charIdea').value.trim();
    if (!idea) { toast('아이디어를 입력해주세요'); return; }
    const templateBody = $('#charTemplateOverride').value.trim();
    if (!templateBody) { toast('양식이 비어있습니다'); return; }

    // 세계관 컨텍스트
    let worldCtx = '';
    if ($('#useWorldContext').checked) {
      const wid = $('#worldRefSelect').value;
      const w = state.worlds.find(x => x.id === wid);
      if (w) {
        worldCtx = `\n\n## 참조 세계관: ${w.name}\n${w.body}\n`;
      }
    }

    systemPrompt = state.systemPrompts.char;
    userPrompt = `## 사용할 양식
\`\`\`
${templateBody}
\`\`\`

## 캐릭터 아이디어
${idea}
${worldCtx}
위 양식의 모든 빈 칸을 채워 캐릭터 프롬프트를 작성해 주세요. 양식의 구조와 항목명은 그대로 유지하세요.`;
    name = $('#charName').value.trim() || `캐릭터 ${new Date().toLocaleString('ko-KR')}`;
    kind = 'char';
  }

  // 마지막 모델 기억
  LS.set('lastModel:' + provider, model);

  // UI 상태
  state.isGenerating = true;
  state.currentOutput = '';
  state.currentThinking = '';
  state.abortController = new AbortController();
  $('#generateBtn').innerHTML = '<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><rect x="6" y="6" width="12" height="12"/></svg>중지';
  setStatus('streaming', '생성 중...');
  renderOutput();

  try {
    if (provider === 'anthropic') {
      await callAnthropic({ key, model, maxTokens, thinkBudget, systemPrompt, userPrompt });
    } else {
      await callGoogle({ key, model, maxTokens, thinkBudget, systemPrompt, userPrompt });
    }
    setStatus('done', '완료');

    if (autoSave && state.currentOutput.trim()) {
      saveCurrent(kind, name);
    }
  } catch (err) {
    if (err.name === 'AbortError') {
      setStatus('done', '중지됨');
    } else {
      console.error(err);
      setStatus('error', '오류: ' + err.message);
      toast('오류: ' + err.message, 4000);
    }
  } finally {
    state.isGenerating = false;
    state.abortController = null;
    $('#generateBtn').innerHTML = '<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><polygon points="5 3 19 12 5 21 5 3"/></svg>생성하기';
  }
}

/* ============ Anthropic API ============ */
async function callAnthropic({ key, model, maxTokens, thinkBudget, systemPrompt, userPrompt }) {
  const body = {
    model,
    max_tokens: maxTokens,
    system: systemPrompt,
    messages: [{ role: 'user', content: userPrompt }],
    stream: true,
  };
  if (thinkBudget > 0) {
    body.thinking = { type: 'enabled', budget_tokens: thinkBudget };
  }

  const res = await fetch('https://api.anthropic.com/v1/messages', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'x-api-key': key,
      'anthropic-version': '2023-06-01',
      'anthropic-dangerous-direct-browser-access': 'true',
    },
    body: JSON.stringify(body),
    signal: state.abortController.signal,
  });

  if (!res.ok) {
    let errMsg = `HTTP ${res.status}`;
    try {
      const errData = await res.json();
      errMsg = errData.error?.message || errMsg;
    } catch {}
    throw new Error(errMsg);
  }

  const reader = res.body.getReader();
  const decoder = new TextDecoder();
  let buffer = '';

  while (true) {
    const { done, value } = await reader.read();
    if (done) break;
    buffer += decoder.decode(value, { stream: true });
    const lines = buffer.split('\n');
    buffer = lines.pop(); // 마지막은 미완성일 수 있음
    for (const line of lines) {
      if (!line.startsWith('data: ')) continue;
      const data = line.slice(6).trim();
      if (!data || data === '[DONE]') continue;
      try {
        const evt = JSON.parse(data);
        if (evt.type === 'content_block_delta') {
          const d = evt.delta;
          if (d.type === 'text_delta') {
            state.currentOutput += d.text;
            renderOutput();
          } else if (d.type === 'thinking_delta') {
            state.currentThinking += d.thinking;
            renderOutput();
          }
        } else if (evt.type === 'message_stop') {
          // done
        } else if (evt.type === 'error') {
          throw new Error(evt.error?.message || 'API error');
        }
      } catch (e) {
        if (e.message?.includes('API error')) throw e;
        // parse 실패는 무시
      }
    }
  }
}

/* ============ Google Gemini API ============ */
async function callGoogle({ key, model, maxTokens, thinkBudget, systemPrompt, userPrompt }) {
  const body = {
    systemInstruction: {
      parts: [{ text: systemPrompt }],
    },
    contents: [
      { role: 'user', parts: [{ text: userPrompt }] },
    ],
    generationConfig: {
      maxOutputTokens: maxTokens,
    },
  };
  if (thinkBudget > 0) {
    body.generationConfig.thinkingConfig = { thinkingBudget: thinkBudget };
  } else {
    // 명시적으로 0이면 thinking off (Flash 계열에서 유효)
    body.generationConfig.thinkingConfig = { thinkingBudget: 0 };
  }

  const url = `https://generativelanguage.googleapis.com/v1beta/models/${encodeURIComponent(model)}:streamGenerateContent?alt=sse&key=${encodeURIComponent(key)}`;

  const res = await fetch(url, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(body),
    signal: state.abortController.signal,
  });

  if (!res.ok) {
    let errMsg = `HTTP ${res.status}`;
    try {
      const errData = await res.json();
      errMsg = errData.error?.message || errMsg;
    } catch {}
    throw new Error(errMsg);
  }

  const reader = res.body.getReader();
  const decoder = new TextDecoder();
  let buffer = '';

  while (true) {
    const { done, value } = await reader.read();
    if (done) break;
    buffer += decoder.decode(value, { stream: true });
    const lines = buffer.split('\n');
    buffer = lines.pop();
    for (const line of lines) {
      if (!line.startsWith('data: ')) continue;
      const data = line.slice(6).trim();
      if (!data) continue;
      try {
        const evt = JSON.parse(data);
        const cand = evt.candidates?.[0];
        if (!cand) continue;
        const parts = cand.content?.parts || [];
        for (const p of parts) {
          if (p.thought === true && p.text) {
            // Gemini의 thought summary
            state.currentThinking += p.text;
          } else if (p.text) {
            state.currentOutput += p.text;
          }
        }
        renderOutput();
        if (evt.error) throw new Error(evt.error.message || 'API error');
      } catch (e) {
        if (e.message?.includes('API error')) throw e;
      }
    }
  }
}

/* ============ 저장 / 다운로드 / 복사 ============ */
function saveCurrent(kindOverride, nameOverride) {
  const text = state.currentOutput.trim();
  if (!text) { toast('저장할 결과가 없습니다'); return; }

  const kind = kindOverride || state.tab;
  let name;
  if (nameOverride) {
    name = nameOverride;
  } else {
    name = (kind === 'world' ? $('#worldName').value : $('#charName').value).trim();
    if (!name) name = (kind === 'world' ? '세계관' : '캐릭터') + ' ' + new Date().toLocaleString('ko-KR');
  }

  const item = { id: uid(), name, body: text, ts: Date.now() };

  if (kind === 'world') {
    state.worlds.unshift(item);
    LS.set('worlds', state.worlds);
  } else {
    state.chars.unshift(item);
    LS.set('chars', state.chars);
  }
  renderSidebarLists();
  toast(`「${name}」 저장됨`);
}

function copyOutput() {
  if (!state.currentOutput.trim()) { toast('복사할 내용이 없습니다'); return; }
  navigator.clipboard.writeText(state.currentOutput).then(() => toast('복사됨'));
}

function downloadOutput() {
  if (!state.currentOutput.trim()) { toast('다운로드할 내용이 없습니다'); return; }
  const name = (state.tab === 'world' ? $('#worldName').value : $('#charName').value).trim() || (state.tab === 'world' ? 'world' : 'character');
  const blob = new Blob([state.currentOutput], { type: 'text/plain;charset=utf-8' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = name.replace(/[\\/:*?"<>|]/g, '_') + '.txt';
  a.click();
  URL.revokeObjectURL(url);
}

/* ============ 데이터 import/export ============ */
function exportData() {
  const data = {
    version: 1,
    exportedAt: new Date().toISOString(),
    templates: state.templates,
    worlds: state.worlds,
    chars: state.chars,
    systemPrompts: state.systemPrompts,
    // keys는 보안상 제외
  };
  const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = `prompt-forge-backup-${new Date().toISOString().slice(0,10)}.json`;
  a.click();
  URL.revokeObjectURL(url);
  toast('백업 파일 다운로드됨');
}

function importData(file) {
  const reader = new FileReader();
  reader.onload = (e) => {
    try {
      const data = JSON.parse(e.target.result);
      if (!confirm('기존 데이터를 덮어쓰시겠습니까? (API 키는 유지됩니다)')) return;
      if (data.templates) { state.templates = data.templates; LS.set('templates', data.templates); ensureBuiltins(); LS.set('templates', state.templates); }
      if (data.worlds) { state.worlds = data.worlds; LS.set('worlds', data.worlds); }
      if (data.chars) { state.chars = data.chars; LS.set('chars', data.chars); }
      if (data.systemPrompts) { state.systemPrompts = data.systemPrompts; LS.set('systemPrompts', data.systemPrompts); }
      renderSidebarLists();
      renderTemplateChips();
      renderTemplateList();
      loadSettingsInputs();
      toast('데이터 불러옴');
    } catch (err) {
      toast('파일 형식 오류');
    }
  };
  reader.readAsText(file);
}

function clearAllData() {
  if (!confirm('정말 모든 데이터(양식, 세계관, 캐릭터, 시스템 프롬프트, 키)를 삭제하시겠습니까?\n\n되돌릴 수 없습니다.')) return;
  if (!confirm('한 번 더 확인합니다. 정말로 모두 삭제할까요?')) return;
  for (const key of ['templates', 'worlds', 'chars', 'keys', 'systemPrompts', 'selectedTemplate', 'theme']) {
    LS.del(key);
  }
  // model 키들도 삭제
  for (const k of Object.keys(localStorage)) {
    if (k.startsWith('pf:')) localStorage.removeItem(k);
  }
  location.reload();
}

/* ============ 테마 ============ */
function applyTheme(t) {
  document.body.setAttribute('data-theme', t);
  state.theme = t;
  LS.set('theme', t);
  const icon = $('#themeIcon');
  if (t === 'dark') {
    // 해 아이콘 (다크일 때는 라이트로 전환 가능을 의미)
    icon.innerHTML = `<circle cx="12" cy="12" r="5"/><line x1="12" y1="1" x2="12" y2="3"/><line x1="12" y1="21" x2="12" y2="23"/><line x1="4.22" y1="4.22" x2="5.64" y2="5.64"/><line x1="18.36" y1="18.36" x2="19.78" y2="19.78"/><line x1="1" y1="12" x2="3" y2="12"/><line x1="21" y1="12" x2="23" y2="12"/><line x1="4.22" y1="19.78" x2="5.64" y2="18.36"/><line x1="18.36" y1="5.64" x2="19.78" y2="4.22"/>`;
  } else {
    // 달 아이콘
    icon.innerHTML = `<path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"/>`;
  }
}

/* ============================================================
   이벤트 바인딩 / 초기화
   ============================================================ */
function bind() {
  // 사이드바 네비
  $$('.nav-item').forEach(n => {
    n.onclick = () => setView(n.dataset.view);
  });

  // 탭
  $$('.tab').forEach(t => {
    t.onclick = () => setTab(t.dataset.tab);
  });

  // 모바일 메뉴
  $('#mobileMenuBtn').onclick = () => $('#sidebar').classList.toggle('mobile-open');

  // 테마
  $('#themeToggle').onclick = () => applyTheme(state.theme === 'dark' ? 'light' : 'dark');

  // 제공자/모델
  $('#provider').onchange = () => refreshModels();
  $('#model').onchange = (e) => LS.set('lastModel:' + $('#provider').value, e.target.value);

  // 슬라이더
  $('#maxTokens').oninput = updateMaxTokens;
  $('#thinkBudget').oninput = updateThinkBudget;

  // 세계관 참조 체크박스
  $('#useWorldContext').onchange = (e) => {
    $('#worldRefSelect').classList.toggle('hidden', !e.target.checked);
  };

  // 양식 override 텍스트박스 변경 감지
  $('#charTemplateOverride').addEventListener('input', () => {
    state._templateBoxTouched = true;
  });

  // 생성 버튼
  $('#generateBtn').onclick = generate;

  // 출력 액션
  $('#copyBtn').onclick = copyOutput;
  $('#downloadBtn').onclick = downloadOutput;
  $('#saveManualBtn').onclick = () => saveCurrent();

  // 설정 저장
  $('#saveKeysBtn').onclick = () => {
    state.keys.anthropic = $('#anthropicKey').value.trim();
    state.keys.google = $('#googleKey').value.trim();
    LS.set('keys', state.keys);
    toast('API 키 저장됨');
  };
  $('#savePromptsBtn').onclick = () => {
    state.systemPrompts.world = $('#worldSystemPrompt').value;
    state.systemPrompts.char = $('#charSystemPrompt').value;
    LS.set('systemPrompts', state.systemPrompts);
    toast('시스템 프롬프트 저장됨');
  };

  // 시스템 프롬프트 리셋 버튼
  $$('[data-reset]').forEach(b => {
    b.onclick = () => {
      const k = b.dataset.reset;
      if (!confirm('해당 시스템 프롬프트를 기본값으로 복원하시겠습니까?')) return;
      const id = k === 'world' ? '#worldSystemPrompt' : '#charSystemPrompt';
      $(id).value = DEFAULT_SYSTEM_PROMPTS[k];
      toast('기본값 복원됨 (저장 버튼을 눌러야 적용됩니다)');
    };
  });

  // 데이터 관리
  $('#exportDataBtn').onclick = exportData;
  $('#importDataBtn').onclick = () => $('#importFile').click();
  $('#importFile').onchange = (e) => { if (e.target.files[0]) importData(e.target.files[0]); };
  $('#clearDataBtn').onclick = clearAllData;

  // 양식 관리
  $('#newTemplateBtn').onclick = () => openTemplateModal(null);
  $('#modalCloseBtn').onclick = closeModal;
  $('#modalCancelBtn').onclick = closeModal;
  $('#modalSaveBtn').onclick = saveTemplate;
  $('#modalBackdrop').onclick = (e) => { if (e.target.id === 'modalBackdrop') closeModal(); };

  // ESC로 모달 닫기
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && !$('#modalBackdrop').classList.contains('hidden')) closeModal();
  });
}

function init() {
  applyTheme(state.theme);
  refreshModels();
  updateMaxTokens();
  updateThinkBudget();
  renderTemplateChips();
  renderSidebarLists();
  bind();

  // 선택된 양식이 chip에 없으면 첫 번째로
  if (!state.templates.find(t => t.id === state.selectedTemplateId) && state.selectedTemplateId !== '__blank__') {
    state.selectedTemplateId = state.templates[0]?.id || '__blank__';
    LS.set('selectedTemplate', state.selectedTemplateId);
    renderTemplateChips();
  }
}

document.addEventListener('DOMContentLoaded', init);
