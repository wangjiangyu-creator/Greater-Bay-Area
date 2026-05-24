export function withBase(path = "/") {
  const base = import.meta.env.BASE_URL || "/";
  const cleanBase = base.endsWith("/") ? base.slice(0, -1) : base;
  const cleanPath = path.startsWith("/") ? path : `/${path}`;

  if (cleanPath === "/") {
    return cleanBase ? `${cleanBase}/` : "/";
  }

  return `${cleanBase}${cleanPath}`;
}
