export function unpack(hex) {
  const bytes = [];
  for (let i = 2; i < 66; i += 2) {
    const char = parseInt(hex.substr(i, 2), 16);
    if (char === 0) {
      break;
    }
    bytes.push(char);
  }
  return (new Buffer(bytes)).toString('utf8');
}
