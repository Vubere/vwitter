import Container from "../../components/container"

export default function Signup() {
  return (
    <Container>
      <form onSubmit={e=>e.preventDefault()}>
        <input type="text" />
      </form>
    </Container>
  )
}