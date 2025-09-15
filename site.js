/* ===== Razorline Labs — tiny site helpers ===== */

/**
 * Auto-inject breadcrumbs based on the current path.
 * - Skips on homepages (/ and /en/)
 * - Renders right after the sticky top nav if found,
 *   otherwise at the top of <main>.
 */
(function(){
  const path = location.pathname.replace(/\/+$/,'') || '/';
  if (path === '/' || path === '/en') return; // no crumbs on home

  // Human labels per filename/segment
  const labels = {
    'index.html':'Home',
    'one-pager.html':'One-pager',
    'roi.html':'ROI',
    'contact.html':'Contact',
    'service-observability.html':'Observability',
    'service-llm-tuneup.html':'LLM Tune-Up',
    'service-eks-rds.html':'EKS + RDS',
    'en':'EN'
  };

  // Build crumbs
  const parts = path.split('/').filter(Boolean); // e.g. ["en","service-observability.html"]
  const items = [];

  // Root
  if (parts[0] === 'en') {
    items.push({href:'/', label:'Home'});
    items.push({href:'/en/', label: labels['en'] || 'EN'});
    if (parts[1]) {
      items.push({href: location.pathname, label: labels[parts[1]] || decodeURIComponent(parts[1])});
    }
  } else {
    items.push({href:'/', label:'Home'});
    if (parts[0]) {
      items.push({href: location.pathname, label: labels[parts[0]] || decodeURIComponent(parts[0])});
    }
  }

  // Render
  const nav = document.createElement('nav');
  nav.className = 'breadcrumbs';
  nav.setAttribute('aria-label','Breadcrumb');
  const wrap = document.createElement('div');
  wrap.className = 'inner';
  const ol = document.createElement('ol');

  items.forEach((it, idx) => {
    const li = document.createElement('li');
    if (idx < items.length - 1) {
      const a = document.createElement('a');
      a.href = it.href;
      a.textContent = it.label;
      li.appendChild(a);
    } else {
      const span = document.createElement('span');
      span.className = 'current';
      span.textContent = it.label;
      li.appendChild(span);
    }
    ol.appendChild(li);
  });

  wrap.appendChild(ol);
  nav.appendChild(wrap);

  // Insert after sticky top nav if present; else before <main>
  const anchor = document.querySelector('.nav, nav.top') || document.querySelector('main');
  if (anchor) {
    anchor.insertAdjacentElement('afterend', nav);
  } else {
    document.body.prepend(nav);
  }
})();
