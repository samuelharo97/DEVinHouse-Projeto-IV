// source: https://www.youtube.com/watch?v=gKXGndx1zu8
export const phoneMask = (value = undefined) => {
  if (!value) return '';
  
  return value
    .replace(/[\D]/g, '')
    .replace(/(\d{2})(\d)/, '($1) $2')
    .replace(/(\d{5})(\d)/, '$1-$2')
    .replace(/(-\d{4})(\d+?)/, '$1');
};
