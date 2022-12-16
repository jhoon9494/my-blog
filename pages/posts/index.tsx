import { GetStaticProps, InferGetStaticPropsType } from 'next';
import fs from 'fs';
import matter from 'gray-matter';
import styled from 'styled-components';
import { FormEvent, useState } from 'react';
import Link from 'next/link';
import compareDate from '../../utils/sortFn';

type PostType = {
  fileName: string;
  date: string;
  categories: string[];
  title: string;
  description: string;
};

type DataType = {
  categories: { [key: string]: number };
  posts: PostType[];
};

export const getStaticProps: GetStaticProps<DataType> = async () => {
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

const Container = styled.main`
  display: flex;
  flex-direction: column;
  padding: 10px 30px 40px;
  margin: 0 20px;
  position: relative;
  top: 65px;

  ul {
    list-style: none;
    display: flex;
    justify-content: center;
    padding: 0;
    flex-wrap: wrap;

    button {
      margin: 7px;
      border: 1px solid gray;
      text-align: center;
      padding: 6px 15px;
      border-radius: 20px;
      cursor: pointer;
    }
  }

  form {
    margin: 0 auto;
  }
`;

const SearchBar = styled.input`
  width: 300px;
  height: 35px;
  padding: 5px 20px;
  border: 1px solid gray;
  border-radius: 20px;
`;

const PostWrapper = styled.div`
  display: flex;
  flex-direction: column;
  min-width: 250px;
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

export default function Posts({ categories, posts }: InferGetStaticPropsType<typeof getStaticProps>) {
  const [postsData, setPostsData] = useState(posts);
  const [search, setSearch] = useState('');

  const handleSearch = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (search !== '') {
      const searchData = posts.filter((data) => {
        return data.title.includes(search);
      });
      searchData.sort(compareDate);
      setPostsData(searchData);
      setSearch('');
    } else {
      setPostsData(posts);
      setSearch('');
    }
  };

  const handleTotalList = () => {
    setPostsData(posts);
    setSearch('');
  };

  const handleCategoryList = (category: string) => {
    const selectedData = posts.filter((data) => {
      return data.categories[0].includes(category);
    });
    selectedData.sort(compareDate);
    setPostsData(selectedData);
    setSearch('');
  };

  return (
    <Container>
      <ul>
        <li>
          <button type="button" onClick={handleTotalList}>
            전체({Object.keys(categories).length})
          </button>
        </li>
        {Object.entries(categories).map((category, idx) => {
          return (
            <li key={`${idx + 1}-category`}>
              <button type="button" onClick={() => handleCategoryList(category[0])}>
                {category[0]}({category[1]})
              </button>
            </li>
          );
        })}
      </ul>
      <form onSubmit={(e) => handleSearch(e)}>
        <SearchBar type="text" placeholder="검색" value={search} onChange={(e) => setSearch(e.target.value)} />
      </form>

      {postsData.map((post, idx) => {
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
    </Container>
  );
}
