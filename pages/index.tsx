import styled from 'styled-components';
import fs from 'fs';
import matter from 'gray-matter';
import Link from 'next/link';
import { GetServerSideProps, InferGetServerSidePropsType } from 'next';
import Head from 'next/head';

type PostType = {
  fileName: string;
  date: string;
  categories: string[];
  title: string;
  description: string;
};

const compareDate = (a: PostType, b: PostType) => {
  const ADate = new Date(a.date);
  const BDate = new Date(b.date);
  if (ADate > BDate) return -1;
  return 1;
};

export const getServerSideProps: GetServerSideProps<{ posts: PostType[] }> = async () => {
  const fileList = fs.readdirSync('./_post');

  const posts: PostType[] = [];
  fileList.forEach((file) => {
    const fileName = file.split('.')[0];
    const metaData = matter(fs.readFileSync(`./_post/${file}`, 'utf8')).data;
    posts.push({
      fileName,
      date: metaData.date,
      categories: metaData.categories,
      title: metaData.title,
      description: metaData.description,
    });
  });

  // 최신 게시글 순으로 정렬
  posts.sort(compareDate);

  return {
    // 최신 5개의 게시글만 보여줌
    props: { posts: posts.length > 5 ? posts.slice(0, 5) : posts },
  };
};

const Container = styled.div`
  display: flex;
  flex-direction: column;
  padding: 10px 30px;
  margin: 0 20px;
  position: relative;
  top: 65px;
`;

const PostWrapper = styled.div`
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

export default function Home({ posts }: InferGetServerSidePropsType<typeof getServerSideProps>) {
  return (
    <Container>
      <Head>
        <title>훈최의 개발블로그</title>
        <meta name="description" content="Next로 직접 만드는 개발 블로그" />
      </Head>
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
