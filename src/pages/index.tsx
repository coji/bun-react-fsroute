import { z } from 'zod'
import { Button, Input, Label, Stack } from '~/components/ui'
import type { ActionFunctionArgs, LoaderData } from '~/interfaces'
import { createDatabase } from '~/service/database'

const schema = z.object({
  message: z.string().min(0),
})

export const loader = () => {
  const { db } = createDatabase()
  const messages = (db.query('SELECT message FROM messages').all() as { message: string }[]) || []
  return { messages }
}

export const action = async ({ request }: ActionFunctionArgs) => {
  const submission = Object.fromEntries((await request.formData()).entries())
  const { message } = schema.parse(submission)
  const { db } = createDatabase()
  db.run('INSERT INTO messages (message) VALUES (?)', [message])
  return {}
}

const IndexPage = ({ loaderData: { messages } }: { loaderData: LoaderData<typeof loader> }) => {
  return (
    <div className="container grid h-screen grid-cols-1 grid-rows-[auto_1fr_auto] justify-items-center gap-4">
      <header className="text-4xl">Hello bun!</header>

      <main>
        <form method="POST" className="flex flex-col gap-4">
          <fieldset>
            <Label htmlFor="message">Message</Label>
            <Input id="message" type="text" name="message" />
          </fieldset>
          <Button>POST!</Button>
        </form>

        <Stack>
          {messages.map((message) => (
            <div>{message.message}</div>
          ))}
        </Stack>
      </main>

      <footer>Copyright &copy; {new Date().getFullYear()} coji.</footer>
    </div>
  )
}
export default IndexPage
