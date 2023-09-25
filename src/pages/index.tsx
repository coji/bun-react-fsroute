import { z } from 'zod'
import { Button, Input, Label, Stack } from '~/components/ui'
import type { ActionFunctionArgs, LoaderData } from '~/interfaces'
import { createDatabase } from '~/service/database'

const schema = z.object({
  message: z.string().nonempty('Please enter a message'),
})

export const loader = () => {
  const { db } = createDatabase()
  const messages =
    (db.query('SELECT message, created_at FROM messages').all() as { message: string; created_at: string }[]) || []
  return { messages }
}

export const action = async ({ request }: ActionFunctionArgs) => {
  const submission = Object.fromEntries((await request.formData()).entries())
  const { message } = schema.parse(submission)
  console.log({ message })
  const { db } = createDatabase()
  db.run('INSERT INTO messages (message) VALUES (?)', [message])
  return {}
}

const IndexPage = ({ loaderData: { messages } }: { loaderData: LoaderData<typeof loader> }) => {
  return (
    <div className="mx-auto grid h-screen max-w-xl grid-cols-1 grid-rows-[auto_1fr_auto] gap-4">
      <header className="text-4xl">Hello bun!</header>

      <main>
        <form method="POST" className="flex flex-col gap-4">
          <fieldset>
            <Label htmlFor="message">Message</Label>
            <Input id="message" type="text" name="message" />
          </fieldset>
          <Button>POST!</Button>

          <Stack>
            {messages.map((message, idx) => (
              <div key={idx}>
                {message.message} {message.created_at}
              </div>
            ))}
          </Stack>
        </form>
      </main>

      <footer>Copyright &copy; {new Date().getFullYear()} coji.</footer>
    </div>
  )
}
export default IndexPage
