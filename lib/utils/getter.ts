import fs from 'fs';
import matter from 'gray-matter';
import { PostType } from './post';
import compareDate from './sortFn';

export const getRecentPosts = () => {
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

export const getPosts = () => {
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

  posts.sort(compareDate);
  const categories: { [key: string]: number } = {};

  posts.forEach((post) => {
    const category = post.categories[0];
    if (!Object.keys(categories).includes(category)) {
      categories[category] = 1;
    } else {
      categories[category] += 1;
    }
  });

  return {
    props: {
      categories,
      posts,
    },
  };
};
