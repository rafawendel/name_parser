function parseName(name) {
  if (typeof name !== 'string' || name.length < 1) return '';
  const unCapPrepositions = ['de', 'da', 'e', 'das', 'dos', 'do', 'von', 'o', 'os', 'a', 'as'];
  const capPrepositions = ['du'];
  const prefixes = [
    { matcher: /^(d\'|l\'|di).*/, size: 2, capitalizable: 'no' },
    { matcher: /^(mc).*/, size: 2, capitalizable: 'beggining' },
    { matcher: /^(mac).*/, size: 3, capitalizable: 'beggining' }
  ];
  return name
    .split(' ')
    .filter(p => p)
    .map(p => p.toLowerCase())
    .map(p => 
      prepositions.includes(p) ? p :
      prefixes.reduce((acc, [prefixMatcher, size]) => {
        const match = p.match(prefixMatcher);
        if (acc || match === null) return acc;
        return `${match[0].slice(0, size)}${match[0].charAt(size).toUpperCase()}${match[0].slice(size + 1)}`
      }, null)
      || `${p.charAt(0).toUpperCase()}${p.slice(1)}`
    )
    .join(' ');
}