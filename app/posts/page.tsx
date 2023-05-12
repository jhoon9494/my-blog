import { getPosts } from '../../lib/utils/getter';
import PostsClient from './client';

export default function Page() {
  const {
    props: { posts, categories },
  } = getPosts();
  return <PostsClient posts={posts} categories={categories} />;
}
