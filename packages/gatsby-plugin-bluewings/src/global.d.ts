// https://www.typescriptlang.org/docs/handbook/declaration-files/templates.html

declare module '*.scss' {
  const classes: { [key: string]: string };
  export default classes;
}

declare module '*.pug' {
  export default function(params?: { [key: string]: any });
}

declare module '*.gif' {
  const src: string;
  export default src;
}

declare module '*.jpg' {
  const src: string;
  export default src;
}

declare module '*.jpeg' {
  const src: string;
  export default src;
}

declare module '*.png' {
  const src: string;
  export default src;
}

declare module '*.svg' {
  const src: string;
  export default src;
}
