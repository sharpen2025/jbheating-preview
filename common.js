// 중부난방공사 v3 공통 인터랙션 (시안용, 서버 전송 없음)
(function(){
  var $ = function(s, r){ return (r || document).querySelector(s); };
  var $$ = function(s, r){ return Array.prototype.slice.call((r || document).querySelectorAll(s)); };

  // 공지 띠 닫기
  var notice = $('[data-notice]');
  try { if (notice && localStorage.getItem('jb-notice-hide') === new Date().toDateString()) notice.classList.add('is-hidden'); } catch(e){}
  $$('[data-notice-close]').forEach(function(b){ b.addEventListener('click', function(){
    var today = $('[data-notice-today]');
    try { if (today && today.checked) localStorage.setItem('jb-notice-hide', new Date().toDateString()); } catch(e){}
    notice.classList.add('is-hidden');
  }); });

  // 헤더 스크롤 그림자
  var hd = $('.hd');
  var onScroll = function(){ if (hd) hd.classList.toggle('is-scrolled', window.scrollY > 10); };
  window.addEventListener('scroll', onScroll, { passive: true }); onScroll();

  // 드롭다운
  $$('[data-dd]').forEach(function(btn){
    btn.setAttribute('aria-expanded', 'false');
    btn.addEventListener('click', function(e){
      e.stopPropagation();
      var dd = btn.closest('.dd'); var open = !dd.classList.contains('open');
      $$('.dd.open').forEach(function(d){ d.classList.remove('open'); });
      dd.classList.toggle('open', open); btn.setAttribute('aria-expanded', String(open));
    });
  });
  document.addEventListener('click', function(){ $$('.dd.open').forEach(function(d){ d.classList.remove('open'); }); });

  // 전체메뉴
  var drawer = $('[data-drawer]');
  var setDrawer = function(open){ if (!drawer) return; drawer.classList.toggle('open', open); drawer.setAttribute('aria-hidden', String(!open)); document.body.classList.toggle('no-scroll', open); };
  $$('[data-drawer-open]').forEach(function(b){ b.addEventListener('click', function(){ setDrawer(true); }); });
  $$('[data-drawer-close]').forEach(function(b){ b.addEventListener('click', function(){ setDrawer(false); }); });
  if (drawer) drawer.addEventListener('click', function(e){ if (e.target === drawer) setDrawer(false); });
  document.addEventListener('keydown', function(e){ if (e.key === 'Escape') setDrawer(false); });
  $$('.drawer a').forEach(function(a){ a.addEventListener('click', function(){ if (a.getAttribute('href') === '#') setDrawer(false); }); });

  // 탭 (data-tab="그룹:키" / data-panel="그룹:키")
  window.jbTab = function(group, key){
    $$('[data-tab^="' + group + ':"]').forEach(function(b){ var on = b.dataset.tab === group + ':' + key; b.classList.toggle('is-on', on); b.setAttribute('aria-selected', String(on)); });
    $$('[data-panel^="' + group + ':"]').forEach(function(p){ var on = p.dataset.panel === group + ':' + key; p.classList.toggle('is-on', on); p.hidden = !on; });
    document.dispatchEvent(new CustomEvent('jbtab', { detail: { group: group, key: key } }));
  };
  $$('[data-tab]').forEach(function(b){
    b.setAttribute('role', 'tab');
    b.addEventListener('click', function(e){ e.preventDefault(); var p = b.dataset.tab.split(':'); window.jbTab(p[0], p[1]); });
  });

  // 맨 위로
  $$('[data-top]').forEach(function(b){ b.addEventListener('click', function(){ window.scrollTo({ top: 0, behavior: 'smooth' }); }); });

  // 퀵탭 활성화 (data-qs 섹션 ↔ data-q 링크)
  var qsecs = $$('[data-qs]');
  if (qsecs.length) {
    var setQ = function(id){ $$('[data-q]').forEach(function(a){ a.classList.toggle('is-on', a.dataset.q === id); }); };
    var tick = function(){
      var cur = qsecs[0].dataset.qs, mid = window.innerHeight * 0.4;
      qsecs.forEach(function(s){ if (s.getBoundingClientRect().top < mid) cur = s.dataset.qs; });
      setQ(cur);
    };
    window.addEventListener('scroll', tick, { passive: true }); window.addEventListener('resize', tick); tick();
  }

  // 시안 폼: 실제 전송 없음
  $$('form[data-demo]').forEach(function(f){ f.addEventListener('submit', function(e){
    e.preventDefault(); var m = $('[data-demo-msg]', f); if (m) { m.hidden = false; }
  }); });
})();
