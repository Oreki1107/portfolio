/// <reference types="vite/client" />

// Allow importing assets with the Vite `?url` suffix, e.g. `import src from './file.pdf?url'`
declare module '*.pdf?url' {
  const url: string
  export default url
}

declare module '*?url' {
  const url: string
  export default url
}

declare module '*.png?url' {
  const url: string
  export default url
}

declare module '*.jpg?url' {
  const url: string
  export default url
}

declare module '*.jpeg?url' {
  const url: string
  export default url
}

declare module '*.svg?url' {
  const url: string
  export default url
}
