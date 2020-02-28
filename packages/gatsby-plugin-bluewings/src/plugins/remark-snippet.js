import _customTags from './custom-tags';

const evaluate = (mayBefunc) => {
  // return typeof mayBefunc === 'function' ? mayBefunc : (props) => {
  //   return mayBefunc;
  // }
  return (props) => (typeof mayBefunc === 'function' ? mayBefunc(props) : mayBefunc);
};

module.exports = ({ markdownAST }) => {
  const customTags = Object.entries(_customTags).reduce((accum, [k, v]) => {
    return {
      ...accum,
      [k]: {
        ...v,
        open: evaluate(v.open),
        close: evaluate(v.close),
      },
    };
  }, {});

  return new Promise((resolve) => {
    let context = {
      index: 0,
      stack: [],
    };
    let imports = [];
    let _imports = [];

    markdownAST.children = markdownAST.children.reduce((prev, node) => {
      const annot = parseAnnot(node, context);

      if (node.type === 'import') {
        // _imports.push(node.value);
        _imports = [..._imports, ...node.value.split(/\n/)];
      }

      if (node.type === 'export') {
        // console.log('annot');
        const closeAll = [...context.stack].map((e) => {
          return e.closeFn({
            finale: true,
          });
        });
        context.stack = [];
        return [...prev, ...closeAll, node];
      }

      if (annot) {
        let closing = [];

        // if (annot.close) {

        const reversed = [...context.stack];
        const tagIndex = reversed.findIndex((e) => {
          return e.tag === annot.tag;
        });

        const isFirst = !context.stack.find((e) => e.tag === annot.tag);

        if (tagIndex !== -1) {
          closing = reversed.slice(0, tagIndex + 1).map((e, i, arr) => {
            return e.closeFn({
              finale: i < arr.length - 1 || annot.close,
            });
          });
          context.stack = reversed.slice(tagIndex + 1);
          // reverse();
        }

        // const closing = reversed.slice(0, idx + 1);

        // return [
        //   ...prev,
        //   ...closing,

        //   // customTags[annot.tag].open(annot)
        // ]

        // const

        // }

        let openings = [];
        if (customTags[annot.tag] && annot.open) {
          // console.log('-=-=-=-=-=-=');
          // console.log(annot);
          // console.log('->->->->->->');

          // console.log(customTags[annot.tag]);
          // console.log();

          imports = [
            ...imports,
            ...(Array.isArray(customTags[annot.tag].import)
              ? customTags[annot.tag].import
              : [customTags[annot.tag].import]),
          ].filter((e, i, arr) => {
            return e && arr.indexOf(e) === i;
          });

          const openFn = customTags[annot.tag].open;

          // console.log({
          //   isFirst,
          //   tag: annot.tag,
          //   stack: context.stack,
          // })
          // throw 'err'
          // if (isFirst÷)
          const open = openFn({
            props: annot,
            ...annot,
            isFirst,
          });

          // isss
          // const close = customTags[annot.tag].close(annot);
          // console.log('>> annot.tag:', annot.tag)
          // console.log('case 1')
          context.stack = [
            {
              // ...close,
              closeFn: customTags[annot.tag].close,
              tag: annot.tag,
            },
            ...context.stack,
          ];
          // console.log('case 1-1')

          openings = [open];
        }

        return [...prev, ...closing, ...openings];
      }

      return [...prev, node];
    }, []);

    _imports = _imports.map((e) => {
      return e
        .replace(/['`]/g, '"')
        .replace(/\s+/g, ' ')
        .replace(/"\s*;\s*/g, '"');
    });

    imports = imports
      .map((e) => {
        return e
          .replace(/['`]/g, '"')
          .replace(/\s+/g, ' ')
          .replace(/"\s*;\s*/g, '"');
      })
      .filter((e) => _imports.indexOf(e) === -1);

    markdownAST.children = [
      ...imports.map((value) => {
        return {
          type: 'import',
          value,
        };
      }),
      ...markdownAST.children,
    ];

    // console.log(JSON.stringify(markdownAST.children, null, 2));
    // console.log('>>> I M P O R T S');
    // console.log(imports);
    // console.log('>>> _ I M P O R T S');
    // console.log(_imports);
    // console.log('');
    // console.log('');

    // console.log('>>> C H I L D R E N');
    // console.log(markdownAST.children.filter(e => e.type === 'jsx').map(e => e.value).join('\n'));
    // console.log('')
    // console.log('')
    // console.log('')
    resolve(markdownAST);
  });
};

const identity = (e) => e;

const parseAnnot = (node, context) => {
  const pattern = /^@([^\s#.,]+)(#([^\s.,]+))?(\.[^\s,]+)?(,(.*))?$/;
  const { type, children } = node;

  if (type === 'paragraph' && children && children.length === 1) {
    const child = children[0];
    if (child.type === 'link' && child.url && child.url.search(pattern) === 0) {
      const [, _tag, , _id, _classNames, , _params] = child.url.match(pattern);
      const [tagName, ...args] = _tag.split('-');

      const params = (_params || '')
        .split(',')
        .filter(identity)
        .reduce((accum, e) => {
          const [, key, , value] = e.match(/^([^\s]+?)(=([^\s]+)){0,1}$/) || [];
          return key
            ? {
                ...accum,
                [key]: typeof value === 'undefined' ? true : value,
              }
            : accum;
        }, {});

      const className = (_classNames || '')
        .split('.')
        .filter(identity)
        .join(' ');

      const key = `gatsby-snippet-${context.index++}`;

      let tag = tagName.replace(/end$/, '');
      const open = tagName === tag;
      // if (tag === GRID && open === false) {
      //   tag = GRID_WRAPPER;
      // }

      return {
        tag,
        open,
        close: !open,
        key,
        id: _id,
        className,
        args,
        params,
      };
    }
  }

  return null;
};
