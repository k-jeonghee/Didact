function createElement(type, props, ...children) {
    return {
        type,
        props: {
            ...props,
            children: children.map((child) => (typeof child === 'object' ? child : createTextElement(child))),
        },
    };
}

function createTextElement(text) {
    return {
        type: 'TEXT_ELEMENT',
        props: {
            nodeValue: text,
            children: [],
        },
    };
}

function render(element, container) {
    const dom = element.type == 'TEXT_ELEMENT' ? document.createTextNode('') : document.createElement(element.type);
    const isProperty = (key) => key !== 'children';
    Object.keys(element.props)
        .filter(isProperty)
        .forEach((name) => {
            dom[name] = element.props[name];
        });
    element.props.children.forEach((child) => render(child, dom));
    container.appendChild(dom);
}

const Didact = {
    createElement,
    render,
};

const element = Didact.createElement(
    'div',
    { id: 'foo' },
    Didact.createElement('h1', null, 'HelloWorld'),
    Didact.createElement('h2', null, 'from Didact'),
);

console.log(element);
const container = document.getElementById('root');
Didact.render(element, container);
