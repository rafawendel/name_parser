function parseName(name) {
  if (typeof name !== 'string' || name.length < 1) return '';
  const unCapPrepositions = ['de', 'da', 'e', 'das', 'dos', 'do', 'o', 'os', 'a', 'as', // portuguese
                              'le', 'la', 'les', 'las', // french, spanish
                              'von', 'van', 'der' // germanic
                            ];
  const prefixes = [
    { matcher: /^(d\'|l\'|di).*/i, size: 2, capitalizable: 'no' }, // french and italian
    { matcher: /^(mc|de).*/i, size: 2, capitalizable: 'begin' }, // scottish and romanic
    { matcher: /^(mac).*/i, size: 3, capitalizable: 'begin' }, // scottish
    { matcher: /^(o').*/i, size: 1, capitalizable: 'all' } // scottish
  ];
  return name
    .split(' ')
    .filter(p => p)
    .map(p => p.toLowerCase())
    .map(p => 
      unCapPrepositions.includes(p) ? p :
      prefixes.reduce((acc, { matcher, size, capitalizable }) => {
        const matchArr = p.match(matcher);
        if (acc || matchArr === null) return acc;
        const [match] = matchArr;
        const prefix = capitalizable === 'all'
          ? match.slice(0, size).toUpperCase()
          : capitalizable === 'begin'
          ? `${match.toUpperCase()}${match.slice(0, size)}`
          : match.slice(0, size)
        return `${prefix}${match.charAt(size).toUpperCase()}${match.slice(size + 1)}`
      }, null)
      || `${p.charAt(0).toUpperCase()}${p.slice(1)}`
    )
    .join(' ');
}