import { Button } from '~/components/ui/button'

const IndexPage = () => {
  return (
    <div className="grid h-screen grid-cols-1 grid-rows-[auto_1fr_auto]">
      <header>Hello bun!</header>

      <main className="container">
        <Button>hello</Button>
      </main>

      <footer>Copyright &copy; {new Date().getFullYear()} coji.</footer>
    </div>
  )
}
export default IndexPage
