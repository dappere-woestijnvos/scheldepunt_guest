// ─── Owner Notifications ─────────────────────────────────────
// Polls Supabase for new contact messages, guestbook entries, and issue reports.
// Owner enables via ?owner=true URL param (stored in localStorage).

const OwnerNotifications = (() => {
  const POLL_INTERVAL = 30000; // 30 seconds
  const STORAGE_KEY = 'scheldepunt_owner';
  const LAST_CHECK_KEY = 'scheldepunt_last_check';

  function isOwner() {
    const p = new URLSearchParams(window.location.search).get('owner');
    if (p === 'true') {
      localStorage.setItem(STORAGE_KEY, 'true');
      history.replaceState(null, '', window.location.pathname + window.location.hash);
    }
    return localStorage.getItem(STORAGE_KEY) === 'true';
  }

  async function requestPermission() {
    if (!('Notification' in window)) return false;
    if (Notification.permission === 'granted') return true;
    if (Notification.permission === 'denied') return false;
    const result = await Notification.requestPermission();
    return result === 'granted';
  }

  function showNotification(title, body, tag) {
    if (!('Notification' in window) || Notification.permission !== 'granted') return;
    if ('serviceWorker' in navigator && navigator.serviceWorker.controller) {
      navigator.serviceWorker.ready.then((reg) => {
        reg.showNotification(title, { body, tag, renotify: true });
      });
    } else {
      new Notification(title, { body, tag });
    }
  }

  async function checkNew() {
    if (!window.DB || !window.DB.ready()) return;
    const lastCheck = localStorage.getItem(LAST_CHECK_KEY) || new Date(Date.now() - 60000).toISOString();
    const now = new Date().toISOString();

    const { url, key } = {
      url: window.APARTMENT?.supabaseUrl?.replace(/\/$/, ''),
      key: window.APARTMENT?.supabaseKey,
    };
    if (!url || !key) return;

    const headers = {
      'apikey': key,
      'Authorization': `Bearer ${key}`,
    };

    try {
      const [contacts, guestbook, issues] = await Promise.all([
        fetch(`${url}/rest/v1/contact_messages?created_at=gt.${lastCheck}&select=name,message&order=created_at.desc&limit=5`, { headers }).then(r => r.ok ? r.json() : []),
        fetch(`${url}/rest/v1/guestbook?created_at=gt.${lastCheck}&select=name,text&order=created_at.desc&limit=5`, { headers }).then(r => r.ok ? r.json() : []),
        fetch(`${url}/rest/v1/issue_reports?created_at=gt.${lastCheck}&select=category,description&order=created_at.desc&limit=5`, { headers }).then(r => r.ok ? r.json() : []),
      ]);

      contacts.forEach((m) => {
        showNotification('New message from ' + m.name, m.message?.substring(0, 100), 'contact-' + m.name);
      });
      guestbook.forEach((m) => {
        showNotification('Guestbook entry by ' + m.name, m.text?.substring(0, 100), 'guestbook-' + m.name);
      });
      issues.forEach((m) => {
        showNotification('Issue report: ' + m.category, m.description?.substring(0, 100), 'issue-' + m.category);
      });
    } catch (e) {
      console.warn('[Notify] poll error:', e);
    }

    localStorage.setItem(LAST_CHECK_KEY, now);
  }

  function init() {
    if (!isOwner()) return;
    requestPermission().then((granted) => {
      if (!granted) return;
      checkNew();
      setInterval(checkNew, POLL_INTERVAL);
      console.log('[Notify] Owner notifications active — polling every 30s');
    });
  }

  return { init, isOwner };
})();

window.OwnerNotifications = OwnerNotifications;
