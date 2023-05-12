import fs from 'fs';
import matter from 'gray-matter';

export type PostType = {
  fileName: string;
  date: string;
  categories: string[];
  title: string;
  description: string;
};

export function compareDate(a: PostType, b: PostType) {
  const ADate = new Date(a.date);
  const BDate = new Date(b.date);
  if (ADate > BDate) return -1;
  return 1;
}

const getRecentPosts = () => {
  const fileList = fs.readdirSync('./_post');
  const posts: PostType[] = fileList.map((file) => {
    const fileName = file.split('.')[0];
    const metaData = matter(fs.readFileSync(`./_post/${file}`, 'utf8')).data;
    return {
      fileName,
      date: metaData.date,
      categories: metaData.categories,
      title: metaData.title,
      description: metaData.description,
    };
  });

  // 최신 게시글 순으로 정렬
  posts.sort(compareDate);

  return {
    // 최신 5개의 게시글만 보여줌
    props: { posts: posts.length > 5 ? posts.slice(0, 5) : posts },
  };
};

export default getRecentPosts;
