'use client';

import styled from 'styled-components';
import Link from 'next/link';
import { PostType } from '../lib/utils/post';

const Container = styled.main`
  display: flex;
  flex-direction: column;
  padding: 10px 30px 40px;
  margin: 0 20px;
  position: relative;
  top: 65px;

  > h1 {
    min-width: 350px;
  }

  @media screen and (max-width: 400px) {
    padding: 10px 0px 40px;
  }
`;

const PostWrapper = styled.div`
  min-width: 250px;
  display: flex;
  flex-direction: column;
  padding: 30px 0;

  & + & {
    border-top: 1px solid lightgray;
  }

  > a {
    border-left: 2px solid #3a3eaf;
    padding-left: 20px;

    &:hover {
      transform: scale(1.03);
      transition: all 0.2s ease;
      border-left: 5px solid #3a3eaf;
      border-radius: 2px;
    }
  }

  p,
  h2 {
    margin: 5px 0;
  }

  .categories {
    margin: 0 0 15px;
    color: gray;
  }

  .date {
    color: gray;
    margin: 15px 0 0;
    font-size: 13px;
  }
`;

const MoreButton = styled(Link)`
  background-color: #3a3eaf;
  color: white;
  width: 150px;
  margin: 20px auto 40px;
  padding: 10px 14px;
  border-radius: 10px;
  text-align: center;

  &:hover {
    background-color: #31359b;
  }
`;

export default function RootClient({ posts }: { posts: PostType[] }) {
  return (
    <Container>
      <h1>최신 포스트</h1>
      {posts.map((post, idx) => {
        return (
          <PostWrapper key={`${idx + 1}-post`}>
            <Link href={`/posts/${post.fileName}`}>
              <p className="categories">{post.categories[0]}</p>
              <h2>{post.title}</h2>
              <p>{post.description}</p>
              <p className="date">{post.date}</p>
            </Link>
          </PostWrapper>
        );
      })}
      <MoreButton href="/posts">게시글 더 보기</MoreButton>
    </Container>
  );
}
