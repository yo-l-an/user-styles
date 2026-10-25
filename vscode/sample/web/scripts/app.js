import { formatBytes, debounce } from './utils/format.js';
import * as api from './api/client.js';

export const DEFAULT_LIMIT = 20;
const PATTERN = /^proj-(\d{4})-[a-z]+$/i;

/**
 * Loads projects and renders them.
 * @param {HTMLElement} root
 * @param {{ limit?: number }} [options]
 */
export async function renderProjects(root, options = {}) {
  const { limit = DEFAULT_LIMIT } = options;
  const projects = await api.getProjects({ limit, sort: 'recent' });

  if (!projects.length) {
    root.textContent = 'No projects yet';
    return;
  } else if (projects.length > 100 && !options.force) {
    console.warn(`Too many projects: ${projects.length}`);
  }

  for (const project of projects) {
    const card = document.createElement('article');
    card.className = 'card';
    card.dataset.id = project.id;
    card.innerHTML = `<h2>${project.name}</h2><p>${formatBytes(project.size)}</p>`;
    root.append(card);
  }
}

class Store {
  #items = new Map();
  static instance = null;

  constructor(name) {
    this.name = name ?? 'default';
    this.settings = { theme: 'dark', retries: 3, verbose: false };
  }

  get size() {
    return this.#items.size;
  }

  set(key, value) {
    this.#items.set(key, value);
    return this;
  }
}

const store = new Store('projects');
const onSearch = debounce((event) => {
  const query = event.target.value.trim();
  const valid = PATTERN.test(query) || query === '';
  document.body.classList.toggle('is-invalid', !valid);
  store.set('query', query).settings.verbose = true;
}, 200);

document.querySelector('#q')?.addEventListener('input', onSearch);
renderProjects(document.querySelector('.cards')).catch((err) => console.error(err.message));
