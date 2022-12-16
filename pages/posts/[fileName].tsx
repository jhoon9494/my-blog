import { GetStaticProps, InferGetStaticPropsType } from 'next';
import fs from 'fs';
import matter from 'gray-matter';
import { unified } from 'unified';
import remarkParse from 'remark-parse';
import remark2rehype from 'remark-rehype';
import rehypeStringify from 'rehype-stringify';
import rehypeHighlight from 'rehype-highlight';
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
    .use(rehypeHighlight)
    .use(rehypeStringify) // 텍스트 형태로 변환
    .processSync(postData.content)
    .toString();

  return {
    props: {
      post: { metaData, html },
    },
  };
};

const Container = styled.main`
  padding: 10px 30px 40px;
  margin: 0 20px;
  position: relative;
  top: 65px;

  /* 코드 부분 */
  pre {
    border: 1px solid gray;
    border-radius: 5px;
    padding: 20px 10px;
    margin: 20px 0;

    overflow: scroll;
  }

  img {
    display: block;
    margin: 0 auto;
    width: 600px;
  }

  li {
    margin: 5px 0;
    list-style: square;

    > code {
      font-weight: bold;
      color: #556e90;
    }
  }

  p {
    line-height: 30px;
    padding-left: 15px;

    > code {
      font-weight: bold;
      color: #556e90;
    }
  }

  a {
    display: inline-block;
    margin-top: 10px;
    padding: 3px 10px;
    border-radius: 8px;
    background-color: #d3d3d39e;
    color: #556e90;
  }

  /* code style */
  .hljs-keyword {
    color: #af2daf;
  }

  .hljs-number {
    color: #4d4de4;
  }

  .hljs-comment {
    color: gray;
  }

  .hljs-tag {
    color: #70d1f1;

    .hljs-name {
      color: #ff8f3a;
    }
  }
`;

const Title = styled.header`
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
      <article>
        <Title>
          <h1>{post.metaData.title}</h1>
          <p>{post.metaData.date}</p>
        </Title>
        <div dangerouslySetInnerHTML={createMarkup()} />
      </article>
    </Container>
  );
}
