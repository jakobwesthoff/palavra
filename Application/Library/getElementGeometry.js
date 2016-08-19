export default function getElementGeometry(element) {
  const boundingRect = element.getBoundingClientRect();
  const scrollX = window.pageXOffset;
  const scrollY = window.pageYOffset;

  return {
    top: boundingRect.top + scrollY,
    bottom: boundingRect.bottom + scrollY,
    left: boundingRect.left + scrollX,
    right: boundingRect.right + scrollX,
    width: boundingRect.right - boundingRect.left,
    height: boundingRect.bottom - boundingRect.top,
  };
};