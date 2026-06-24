import yaml from 'js-yaml';

const featuredModules = import.meta.glob('/content/featured/**/index.md', {
  query: '?raw',
  import: 'default',
  eager: true,
});

const projectModules = import.meta.glob('/content/projects/*.md', {
  query: '?raw',
  import: 'default',
  eager: true,
});

const featuredImages = import.meta.glob('/content/featured/**/demo.png', {
  eager: true,
  query: '?url',
  import: 'default',
});

function parseFrontmatter(raw) {
  const match = raw.match(/^---\n([\s\S]*?)\n---\n([\s\S]*)$/);
  if (!match) return { data: {}, content: raw };
  return { data: yaml.load(match[1]), content: match[2].trim() };
}

function getProjectName(path) {
  const parts = path.split('/');
  const idx = parts.indexOf('featured');
  return idx !== -1 ? parts[idx + 1] : null;
}

export function getFeaturedProjects() {
  return Object.entries(featuredModules).map(([path, raw]) => {
    const { data, content } = parseFrontmatter(raw);
    const projectName = getProjectName(path);
    const imgKey = Object.keys(featuredImages).find(k => k.includes(projectName));
    return {
      frontmatter: {
        ...data,
        cover: imgKey ? featuredImages[imgKey] : null,
      },
      html: content,
    };
  }).sort((a, b) => a.frontmatter.date - b.frontmatter.date);
}

export function getProjects() {
  return Object.entries(projectModules).map(([path, raw]) => {
    const { data, content } = parseFrontmatter(raw);
    return {
      frontmatter: data,
      html: content,
    };
  }).sort((a, b) => new Date(b.frontmatter.date) - new Date(a.frontmatter.date));
}
