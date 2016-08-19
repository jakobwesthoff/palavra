export default function getRelativeElementGeometry(element) {
  const top = element.offsetTop;
  const left = element.offsetLeft;
  const width = element.offsetWidth;
  const height = element.offsetHeight;

  return {
    top,
    left,
    width,
    height,
    bottom: top + height,
    right: left + width,
  };
};