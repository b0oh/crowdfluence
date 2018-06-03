export default function unpack(hex) {
  const bytes = [];
  for (let i = 2; i < 66; i += 2) {
    const char = parseInt(hex.substr(i, 2), 16);
    if (char === 0) {
      break;
    }
    bytes.push(char);
  }
  return (Buffer.from(bytes)).toString('utf8');
}
