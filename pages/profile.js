import { getSession } from "next-auth/client";
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
      <pre>{JSON.stringify(user.image, null, 3)}</pre>
    </Layout>
  )

}

export async function getServerSideProps(context) {
  const { req, res } = context;
  const session = await getSession({ req });
  const userIsAuthed = (session && session.user);

  if (!userIsAuthed) {
    res.writeHead(302, { Location: '/signin' }).end();
  }
  return { props: { user: session.user } };

}