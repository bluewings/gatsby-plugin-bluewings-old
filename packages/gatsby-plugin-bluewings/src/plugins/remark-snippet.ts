import _customTags from './custom-tags';

const evaluate = (mayBefunc: Function | string) => (props: any) =>
  typeof mayBefunc === 'function' ? mayBefunc(props) : mayBefunc;

const identity = (e: any) => e;

export default ({ markdownAST }: any) => {
  const customTags: any = Object.entries(_customTags).reduce(
    (accum, [k, v]: any) => ({
      ...accum,
      [k]: { ...v, open: evaluate(v.open), close: evaluate(v.close) },
    }),
    {},
  );

  return new Promise((resolve) => {
    let context = {
      index: 0,
      stack: [],
    } as any;

    let newImports: any = [];
    let currImports: any = [];

    markdownAST.children = markdownAST.children.reduce((prev: any, node: any) => {
      const annot = parseAnnot(node, context);

      if (node.type === 'import') {
        currImports = [...currImports, ...node.value.split(/\n/)];
      }

      if (node.type === 'export') {
        const closeAll = [...context.stack].map((e: any) => e.closeFn({ finale: true }));
        context.stack = [];
        return [...prev, ...closeAll, node];
      }

      if (annot) {
        let closing: any = [];

        const reversed = [...context.stack];
        const tagIndex = reversed.findIndex((e: any) => e.tag === annot.tag);

        const isFirst = !context.stack.find((e: any) => e.tag === annot.tag);

        if (tagIndex !== -1) {
          closing = reversed
            .slice(0, tagIndex + 1)
            .map((e: any, i, arr) => e.closeFn({ finale: i < arr.length - 1 || annot.close }));
          context.stack = reversed.slice(tagIndex + 1);
        }

        let openings: any = [];
        if (customTags[annot.tag] && annot.open) {
          newImports = [
            ...newImports,
            ...(Array.isArray(customTags[annot.tag].import)
              ? customTags[annot.tag].import
              : [customTags[annot.tag].import]),
          ].filter((e, i, arr) => {
            return e && arr.indexOf(e) === i;
          });

          const openFn = customTags[annot.tag].open;

          const open = openFn({
            props: annot,
            ...annot,
            isFirst,
          });

          context.stack = [
            {
              closeFn: customTags[annot.tag].close,
              tag: annot.tag,
            },
            ...context.stack,
          ] as any[];

          openings = [open];
        }

        return [...prev, ...closing, ...openings];
      }

      return [...prev, node];
    }, []);

    currImports = currImports.map((e: string) =>
      e
        .replace(/['`]/g, '"')
        .replace(/\s+/g, ' ')
        .replace(/"\s*;\s*/g, '"'),
    );

    newImports = newImports
      .map((e: string) =>
        e
          .replace(/['`]/g, '"')
          .replace(/\s+/g, ' ')
          .replace(/"\s*;\s*/g, '"'),
      )
      .filter((e: string) => currImports.indexOf(e) === -1);

    markdownAST.children = [
      ...newImports.map((value: any) => ({
        type: 'import',
        value,
      })),
      ...markdownAST.children,
    ];

    resolve(markdownAST);
  });
};

const parseAnnot = (node: any, context: any) => {
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
        .reduce((accum: any, e: any) => {
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
