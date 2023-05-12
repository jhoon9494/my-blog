import { getRecentPosts } from '../lib/utils/getter';
import RootClient from './client';

export default function Page() {
  const {
    props: { posts },
  } = getRecentPosts();
  return <RootClient posts={posts} />;
}
