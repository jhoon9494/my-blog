import { GetStaticProps, InferGetStaticPropsType } from 'next';
import fs from 'fs';
import matter from 'gray-matter';
import { unified } from 'unified';
import remarkParse from 'remark-parse';
import remark2rehype from 'remark-rehype';
import rehypeStringify from 'rehype-stringify';
import Head from 'next/head';
import styled from 'styled-components';

type PostType = {
  metaData: { [key: string]: any };
  html: string;
};

export const getStaticPaths = async () => {
  const fileList = fs.readdirSync('./_post').map((file) => file.split('.')[0]);
  const paths = fileList.map((file) => ({ params: { fileName: file } }));

  return {
    paths,
    fallback: false,
  };
};

export const getStaticProps: GetStaticProps<{ post: PostType }> = async (ctx) => {
  const post = fs.readFileSync(`./_post/${ctx.params?.fileName}.md`, 'utf-8');
  const postData = matter(post);
  const metaData = postData.data;
  const html = unified()
    .use(remarkParse) // markdown을 구문 트리로 변환
    .use(remark2rehype) // markdown을 html로 변환
    .use(rehypeStringify) // 텍스트 형태로 변환
    .processSync(postData.content)
    .toString();

  return {
    props: {
      post: { metaData, html },
    },
  };
};

const Container = styled.div`
  padding: 10px 30px 40px;
  margin: 0 20px;
  position: relative;
  top: 65px;

  /* 코드 부분 */
  pre {
    border: 1px solid lightgray;
    border-radius: 5px;
    padding: 10px;
  }

  img {
    display: block;
    margin: 0 auto;
    width: 600px;
  }
`;

const Title = styled.div`
  padding-bottom: 20px;

  h1 {
    margin-bottom: 20px;
  }

  p {
    margin: 5px 0 0;
    color: gray;
  }
`;

export default function Post({ post }: InferGetStaticPropsType<typeof getStaticProps>) {
  function createMarkup() {
    return { __html: post.html };
  }
  return (
    <Container>
      <Head>
        <title>{post.metaData.title}</title>
        <meta name="description" content={post.metaData.description} />
      </Head>
      <Title>
        <h1>{post.metaData.title}</h1>
        <p>{post.metaData.date}</p>
      </Title>
      <div dangerouslySetInnerHTML={createMarkup()} />
    </Container>
  );
}
