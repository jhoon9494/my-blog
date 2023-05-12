import RootClient from './client';
import getRecentPosts from './getRecentPosts';

export default function Page() {
  const {
    props: { posts },
  } = getRecentPosts();
  return <RootClient posts={posts} />;
}
