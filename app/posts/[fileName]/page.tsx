import fs from 'fs';
import matter from 'gray-matter';
import { unified } from 'unified';
import remarkParse from 'remark-parse';
import remark2rehype from 'remark-rehype';
import rehypeStringify from 'rehype-stringify';
import rehypeHighlight from 'rehype-highlight';
import PostClient from './client';

// Return a list of `params` to populate the [fileName] dynamic segment
export async function generateStaticParams() {
  const fileList = fs.readdirSync('./_post').map((file) => file.split('.')[0]);
  return fileList.map((file) => ({ fileName: file }));
}

type MetaDataType = {
  categories: string[];
  date: string;
  description: string;
  title: string;
};

// Multiple versions of this page will be statically generated
// using the `params` returned by `generateStaticParams`
export default function Page({ params }: { params: { fileName: string } }) {
  const { fileName } = params;
  const post = fs.readFileSync(`./_post/${fileName}.md`, 'utf-8');
  const postData = matter(post);
  const metaData = postData.data as MetaDataType;
  const html = unified()
    .use(remarkParse) // markdown을 구문 트리로 변환
    .use(remark2rehype) // markdown을 html로 변환
    .use(rehypeHighlight)
    .use(rehypeStringify) // 텍스트 형태로 변환
    .processSync(postData.content)
    .toString();

  return <PostClient html={html} metaData={metaData} />;
}
