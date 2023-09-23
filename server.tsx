import { type Serve } from 'bun'
import { renderToReadableStream } from 'react-dom/server'
import { resolve } from 'node:path'
import { App } from './src/app'

const router = new Bun.FileSystemRouter({
  style: 'nextjs',
  dir: './src/pages',
})

export default {
  port: 3000,
  async fetch(request) {
    // Serve static files
    const { pathname } = new URL(request.url)
    const file = Bun.file(resolve(import.meta.dir, './src/public/', `.${pathname}`))
    if (await file.exists()) return new Response(file)

    // Serve dynamic pages
    const route = router.match(request)
    if (!route) return new Response('Not found', { status: 404 }) // no route matched
    const { default: Root } = await import(route.filePath)
    return new Response(
      await renderToReadableStream(
        <App>
          <Root {...route.params} />
        </App>,
      ),
      { headers: { 'content-type': 'text/html' } },
    )
  },
} satisfies Serve
