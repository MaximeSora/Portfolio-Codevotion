const modules = import.meta.glob('./*.mdx');

const posts = Object.entries(modules).map(([, resolver]) =>
  resolver().then(module => ({
    content: module.default,
    ...module.frontMatter,
  }))
);

export default posts;
