
const visit = require(`unist-util-visit`);

const identity = (e) => e;

const __tags = {
  grid: {
    import: null,

    // tags: 
  }
}

          const [, _tag, , _id, _classNames, , _params] = child.url.match(pattern);
          const [tag, ...args] = _tag.split('-');

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

          const [, _tag, , _id, _classNames, , _params] = child.url.match(pattern);
          const [tag, ...args] = _tag.split('-');

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

module.exports = ({ markdownAST }) =>
  new Promise((resolve) => {
    const pattern = /^@([^\s#.,]+)(#([^\s.,]+))?(\.[^\s,]+)?(,(.*))?$/;
    let index = 0;
console.log('-=-=-=-=-=-=-=- children');
  // console.log(JSON.stringify(markdownAST.children, null, 2));
  // console.log();
  // console.log();
  // console.log();

  // const _children = markdownAST.children;

  let _children = [];


  console.log('-> -> -> -> -> -> ')

  const parseNode = (node) => {
    const { type, children } = node;
    if (type === 'paragraph' &&
      children && children.length === 1 &&
      children[0].type === 'link' && children[0].url && children[0].url.search(pattern) === 0
      
    ) {
          const [, _tag, , _id, _classNames, , _params] = children[0].url.match(pattern);
          const [tag, ...args] = _tag.split('-');


          // const [tag, ]


          if (tag.search(/end$/) !== -1) {
            return {
              tag: tag.replace(/end$/, ''),
              end: true,
            }

          }
      return { tag };
    }
    return false;
  }

  let stack = [];

  const _child = markdownAST.children.reduce((prev, node) => {
    const parsed = parseNode(node);
    if (parsed) {

      const { tag,end } = parsed;
      // const t

      let idx = stack.reverse().findIndex(e => {
        return e.__jsxTag === parsed.tag
      });

      let closing = [];

      if (idx !== -1) {
        //  idx = stack.length - idx;

        //  closing = 


        console.log({
          idx, closing, stack});

        closing = stack.reverse().slice(0, idx + 1);
        stack = stack.reverse().slice(idx + 1).reverse();




      }

      

      



if (!end) {
  stack.push({
    type: 'jsx',
    // value: '</section>',
    // value: '</section>',
    value: `</${tag}>`,
    __jsxTag: tag,
  });
}

      return [
        ...prev,
        ...closing,
        ...(end ? [] : [{
          type: 'jsx',
          value: `<${tag} style={{ border: '2px solid blue', display: 'block', marginBottom: '1rem' }}>`,

        }])
      ]
    }

    if (node.type === 'export') {
      return [
        ...prev,
        ...stack.reverse(),
        node,
      ]
    }


    return [...prev, node];
  }, [])

//   markdownAST.children.reduce((accum, node) => {
//     // console.log(node);
//     // console.log();
//     const { type, children } = node;

//     let nextNode = node;

// //     console.log('-=-=-=-=-=-=-=-');
// //     console.log('-=-=-=-=-=-=-=-');
// // console.log(node);
// //     console.log('-=-=-=-=-=-=-=-');
// //     console.log('-=-=-=-=-=-=-=-');

// //     console.log();
// //     console.log();
// //     console.log();
//     if (type === 'export') {
//       _children.push(node);
//       return accum;
//     }
    
//     if (type === 'paragraph' && children && children.length === 1) {
//       const child = node.children[0];

      
//       if (child.type === 'link' && child.url && child.url.search(pattern) === 0) {
//         // console.log({ child });

//         nextNode = {
//           type: 'parent',
//           // value: '<div>',
//           children: []
//         }        
//         accum.cursor.push(nextNode);

//         accum.cursor = nextNode.children;
        


        
//       } else {
        
//         // console.log({ node, child });
//         accum.cursor.push(nextNode);

        
//       }
//     } else {
//       accum.cursor.push(nextNode);
//     }

  

    

    



    

    
//     return accum;
//   }, {
//     cursor: _children,
//   })

  markdownAST.children = _child;

  console.log('>>>>>>>>>>>')

  console.log(JSON.stringify(_child, null, 2))
  console.log('<<<<<<<<<<<<<<<')
  // throw('err')




  // throw 'err';
          // throw 'err'
    // throw 'err'
    // visit(markdownAST, 'paragraph', (node) => {
    //   // convert ruled-link to custom-grid node
    //   if (node.children && node.children.length === 1) {
    //     const child = node.children[0];
    //     if (child.type === 'link' && child.url && child.url.search(pattern) === 0) {

    //       // console.log(node);
    //       // console.log();
    //       // console.log(markdownAST);
    //       // throw 'err'
    //       const [, _tag, , _id, _classNames, , _params] = child.url.match(pattern);
    //       const [tag, ...args] = _tag.split('-');

    //       const params = (_params || '')
    //         .split(',')
    //         .filter(identity)
    //         .reduce((accum, e) => {
    //           const [, key, , value] = e.match(/^([^\s]+?)(=([^\s]+)){0,1}$/) || [];

    //           console.log({key, value})
    //           return key
    //             ? {
    //                 ...accum,
    //                 [key]: typeof value === 'undefined' ? true : value,
    //               }
    //             : accum;
    //         }, {});

    //       const className = (_classNames || '')
    //         .split('.')
    //         .filter(identity)
    //         .join(' ');

    //       const key = `gatsby-snippet-${index}`;

    //       node.type = 'html';
    //       node.value = `<gatsby--${tag} key="${key}" ${_id ? `id="${_id}" ` : ''}${
    //         className ? `className="${className}" ` : ''
    //       }args={${JSON.stringify(args)}} params={${JSON.stringify(params)}} />`;

    //       delete node.children;

    //       index += 1;
    //     }
    //   }
    // });
    resolve(markdownAST);
  });
