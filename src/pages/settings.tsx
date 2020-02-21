import { Link } from '../components/atoms/link'
import { Column } from '../components/layouts/column'

export default function() {
  return (
    <>
      <Column padded full justify="space-between">
        <h1>Settings</h1>
        <Link href="/">done</Link>
      </Column>
    </>
  )
}
