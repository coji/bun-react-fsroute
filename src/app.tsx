export const App = ({ children }: { children: React.ReactNode }) => {
  return (
    <html>
      <head>
        <meta charSet="UTF-8" />
        <title>Hello Bun!</title>
        <link rel="stylesheet" href="/global.css" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      </head>
      <body>{children}</body>
    </html>
  )
}
