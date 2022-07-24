function addStyle(
  styleText,
  head = document.getElementsByTagName('head')[0] || document.documentElement
) {
  const style = document.createElement('style');
  style.setAttribute('type', 'text/css');
  style.textContent = styleText;
  head.appendChild(style);
  return style;
}

export default addStyle;
