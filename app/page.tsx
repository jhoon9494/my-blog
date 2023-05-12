import RootClient from './client';
import getPost from './getPost';

export default function Page() {
  const {
    props: { posts },
  } = getPost();
  return <RootClient posts={posts} />;
}
