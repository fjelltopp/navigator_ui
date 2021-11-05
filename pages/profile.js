import { Layout } from '../components/Layout'

export default function Profile({ user }) {

  const fields = ['name', 'email'];

  return (
    <Layout>
      <h1>Your Profile</h1>
      <hr />
      {fields.map(key => <p key={key}>{key}: {user[key]}</p>)}
      <hr />
      <p>User Object:</p>
      <pre>{JSON.stringify(user, null, 3)}</pre>
    </Layout>
  )

}