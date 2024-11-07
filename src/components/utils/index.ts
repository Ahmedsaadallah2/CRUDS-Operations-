export function text(txt: string, max = 80) {
  if (txt.length >= max) {
    return `${txt.slice(0, max)}...`;
  } else {
    return txt;
  }
}
