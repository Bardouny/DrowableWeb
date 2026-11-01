(() => {
  const screen = location.pathname.split('/').pop()?.replace('.html', '') || 'home';
  const go = (path) => { window.top.location.href = path; };
  const toast = (message) => {
    let notice = document.getElementById('drowable-notice');
    if (!notice) {
      notice = document.createElement('div');
      notice.id = 'drowable-notice';
      Object.assign(notice.style, {position:'fixed',bottom:'24px',left:'50%',transform:'translateX(-50%)',zIndex:'9999',background:'#262a33',color:'#dfe2ee',border:'1px solid #464554',borderRadius:'6px',padding:'10px 16px',font:'500 13px Inter, sans-serif',boxShadow:'0 12px 32px #0008',maxWidth:'calc(100vw - 32px)',textAlign:'center'});
      document.body.appendChild(notice);
    }
    notice.textContent = message;
    clearTimeout(window.__noticeTimer);
    window.__noticeTimer = setTimeout(() => notice?.remove(), 3500);
  };
  const text = (element) => element.textContent.replace(/\s+/g, ' ').trim();
  const click = (event) => {
    const element = event.target.closest('button, a, [class*="cursor-pointer"]');
    if (!element) return;
    const label = text(element);
    const href = element.getAttribute('href');
    const link = element.tagName === 'A';
    if (screen === 'home') {
      if (href === '#signup' || href === '#login' || /^(Log in|Start Creating Free|Start Designing Free|Start Free with)/.test(label)) { event.preventDefault(); go('/login'); return; }
      if (/Watch 2-Min Demo/.test(label)) { event.preventDefault(); document.getElementById('canvas-teaser')?.scrollIntoView({behavior:'smooth'}); return; }
      if (href?.startsWith('#') && !document.querySelector(href === '#' ? 'body' : href)) { event.preventDefault(); toast('This section is coming soon.'); return; }
    }
    if (screen === 'login') {
      if (/Continue with (Google|GitHub)/.test(label)) { event.preventDefault(); toast('Social sign-in is not connected in this preview. Use the email form to explore.'); return; }
      if (/Create free account/.test(label)) { event.preventDefault(); toast('Account creation is not connected in this preview. Use the email form to explore.'); return; }
      if (/Forgot password/.test(label)) { event.preventDefault(); toast('Password reset is not connected in this preview.'); return; }
      if (link && href === '#') { event.preventDefault(); toast('This page is not available in the preview.'); return; }
    }
    if (screen === 'projects' || screen === 'new-project') {
      if (/New Project|Create New Project/.test(label) && !/Launch/.test(label)) { event.preventDefault(); go('/new-project'); return; }
      if (screen === 'new-project' && (/Cancel/.test(label) || element.title === 'Close Modal')) { event.preventDefault(); go('/projects'); return; }
      if (screen === 'new-project' && /Create Project & Launch Studio/.test(label)) {
        event.preventDefault();
        const name = document.querySelector('input[value="Quantum Brand System"]')?.value?.trim();
        if (!name) { toast('Enter a project name to continue.'); return; }
        sessionStorage.setItem('drowable-project-name', name);
        go(document.querySelector('[data-selected-preset="true"]')?.textContent.includes('YouTube') ? '/thumbnail' : '/canvas'); return;
      }
      if (screen === 'new-project' && ['Brand Logo','YouTube Thumbnail','Design Icon','Omni Banner'].some(x => label.includes(x)) && element.matches('div.group')) {
        document.querySelectorAll('[data-selected-preset]').forEach(card => { card.removeAttribute('data-selected-preset');card.style.borderColor='';card.style.boxShadow=''; });
        element.dataset.selectedPreset = 'true'; element.style.borderColor='#c0c1ff';element.style.boxShadow='0 0 0 1px #8083ff, 0 0 16px #6366f166';
        const dims = label.includes('YouTube') ? ['1280','720'] : label.includes('Design Icon') ? ['512','512'] : label.includes('Omni') ? ['1500','500'] : ['1000','1000'];
        const inputs = [...document.querySelectorAll('input[type="text"]')];
        if (inputs[1]) inputs[1].value=dims[0]; if (inputs[2]) inputs[2].value=dims[1];
        return;
      }
      if (screen === 'projects') {
        if (/AI Tech Review Ep\. 42 Thumbnail/.test(label) && !/Search/.test(label)) { event.preventDefault();go('/thumbnail');return; }
        if (/CyberPulse Logo|NeoPay App Icon|Twitter\/X Summer Launch/.test(label)) { event.preventDefault();go('/canvas');return; }
        if (/^(All|Logos|Thumbnails|Icons|Banners|Favorites)$/.test(label) && element.tagName === 'BUTTON') {
          event.preventDefault();
          const cards = [...document.querySelectorAll('h3')].filter(h=>/CyberPulse|AI Tech Review|NeoPay|Twitter\/X Summer/.test(h.textContent));
          const types = ['Logos','Thumbnails','Icons','Banners'];
          cards.forEach((h,index) => { const card=h.closest('.group'); if(card) card.style.display=label==='All'||label==='Favorites'||label===types[index]?'':'none'; });
          element.parentElement?.querySelectorAll('button').forEach(b=> {b.style.color='';b.style.backgroundColor='';});
          element.style.color='#c0c1ff';element.style.backgroundColor='#262a33';return;
        }
        if (/^(Accept|Decline)$/.test(label)) {event.preventDefault(); const row=element.closest('.flex.items-center.justify-between') || element.parentElement?.parentElement; row?.remove(); toast(label==='Accept'?'Connection accepted.':'Request declined.');return;}
      }
      if (/^Canvas$/.test(label)) {event.preventDefault();go('/canvas');return;}
      if (/^Projects$|All Projects/.test(label)) {event.preventDefault();go('/projects');return;}
      if (link && href === '#') {event.preventDefault();toast('This section is not available in the preview.');return;}
    }
    if (screen === 'canvas' || screen === 'thumbnail') {
      if (element.title === 'Back to Projects' || /Drowable Sync/.test(label) && element.closest('header') && link) {event.preventDefault();go('/projects');return;}
      if (/^Share$/.test(label)) {event.preventDefault();navigator.clipboard?.writeText(location.origin + (screen==='canvas'?'/canvas':'/thumbnail')).then(()=>toast('Link copied to clipboard.')).catch(()=>toast('Sharing is not available here.'));return;}
      if (/^Export|Export HD/.test(label)) {event.preventDefault();toast('Export is not available in this preview.');return;}
      if (/^Huddle|^CTR Heatmap|^YT Feed Preview/.test(label)) {event.preventDefault();toast('This tool is not available in this preview.');return;}
    }
    if (/^Share$/.test(label)) {event.preventDefault();navigator.clipboard?.writeText(location.origin + '/projects').then(()=>toast('Link copied to clipboard.')).catch(()=>toast('Sharing is not available here.'));return;}
    if (/^Invite$|Invite Teammates|Add Connection/.test(label)) {event.preventDefault();toast('Invitations are not connected in this preview.');return;}
  };
  document.addEventListener('click', click, true);
  document.addEventListener('DOMContentLoaded', () => {
    if (screen === 'login') {
      document.querySelector('form')?.addEventListener('submit', event => {event.preventDefault();go('/projects');});
    }
    if (screen === 'new-project') document.querySelector('.grid.grid-cols-1.sm\\:grid-cols-2.lg\\:grid-cols-4 .group')?.setAttribute('data-selected-preset','true');
    if (screen === 'projects') {
      const search = document.querySelector('input[placeholder^="Search projects"]');
      search?.addEventListener('input', () => document.querySelectorAll('h3').forEach(h => {if (/CyberPulse|AI Tech Review|NeoPay|Twitter\/X Summer/.test(h.textContent)) { const card=h.closest('.group');if(card) card.style.display=h.textContent.toLowerCase().includes(search.value.toLowerCase())?'':'none';}}));
    }
    if (screen === 'canvas') {
      const name=sessionStorage.getItem('drowable-project-name');
      if (name) { const title=document.querySelector('header .font-headline-sm');if(title) title.textContent=name; }
    }
  });
})();
