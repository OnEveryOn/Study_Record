export const makeDOMwithProperties = (domType, propertyMap) => {
  // domType : div, img, li...
  // propertyMap : {"className : "product-card"..}
  // Object.keys => 객체의 키 값을 반환
  const dom = document.createElement(domType);
  Object.keys(propertyMap).forEach((key) => {
    dom[key] = propertyMap[key];
  });

  return dom;
};

export const appendChildrenList = (target, childreList) => {
    if(!Array.isArray(childreList)) return;

    childreList.forEach((children)=>{
        target.appendChild(children)
    })
}

