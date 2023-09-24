import { type Serve } from 'bun'
import { resolve } from 'node:path'
import React from 'react'
import { renderToReadableStream } from 'react-dom/server'
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
    const { default: Root, loader, action } = await import(route.filePath)

    // Run action
    let actionData = {}
    if (action && request.method === 'POST') {
      actionData = { ...(await action({ request, params: route.params })) }
    }

    // Run loader
    let loaderData = {}
    if (loader) {
      loaderData = { ...(await loader({ request, params: route.params })) }
    }

    // Render page with loader data
    const stream = await renderToReadableStream(
      React.createElement(App, {
        children: React.createElement(Root, {
          ...route.params,
          actionData,
          loaderData,
        }),
      }),
    )
    return new Response(stream, { headers: { 'content-type': 'text/html' } })
  },
} satisfies Serve
