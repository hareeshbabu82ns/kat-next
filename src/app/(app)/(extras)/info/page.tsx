import Contacts from "./contacts"

export default async function Info() {
  return (
    <main className="my-4 space-y-4">
      <h1 className="text-2xl font-semibold">Info</h1>
      <Contacts />
    </main>
  )
}
