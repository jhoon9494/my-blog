import { GetStaticProps, InferGetStaticPropsType } from 'next';
import fs from 'fs';
import matter from 'gray-matter';
import styled from 'styled-components';
import { KeyboardEvent, useRef, useState } from 'react';
import Link from 'next/link';

type DataType = {
  categories: { [key: string]: number };
  metaDataList: {
    metaData: {
      [key: string]: any;
    };
    fileName: string;
  }[];
};

export const getStaticProps: GetStaticProps<DataType> = async () => {
  const fileList = fs.readdirSync('./_post');
  const metaDataList = fileList.map((file) => {
    const fileName = file.split('.')[0];
    const metaData = matter(fs.readFileSync(`./_post/${file}`, 'utf8')).data;
    return { metaData, fileName };
  });

  const categories: { [key: string]: number } = {};

  metaDataList.forEach(({ metaData }) => {
    const category = metaData.categories[0];
    if (!Object.keys(categories).includes(category)) {
      categories[category] = 1;
    } else {
      categories[category] += 1;
    }
  });

  return {
    props: {
      categories,
      metaDataList,
    },
  };
};

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  min-width: 350px;
  padding: 10px 30px 40px;
  margin: 0 20px;
  position: relative;
  top: 65px;

  ul {
    list-style: none;
    display: flex;
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
`;

const SearchBar = styled.input`
  width: 400px;
  height: 35px;
  padding: 5px 20px;
  border: 1px solid gray;
  border-radius: 20px;
`;

const PostWrapper = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
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

export default function Posts({ categories, metaDataList }: InferGetStaticPropsType<typeof getStaticProps>) {
  const [posts, setPosts] = useState(metaDataList);
  const [search, setSearch] = useState('');

  const handleSearch = (e: KeyboardEvent) => {
    if (e.code === 'Enter') {
      if (search !== '') {
        const searchData = posts.filter((data) => {
          return data.metaData.title.includes(search);
        });
        setPosts(searchData);
        setSearch('');
      } else {
        setPosts(metaDataList);
        setSearch('');
      }
    }
  };

  const handleTotalList = () => {
    setPosts(metaDataList);
    setSearch('');
  };

  const handleCategoryList = (category: string) => {
    const selectedData = metaDataList.filter((data) => {
      return data.metaData.categories[0].includes(category);
    });
    setPosts(selectedData);
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
      <SearchBar
        type="text"
        placeholder="검색"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        onKeyDown={handleSearch}
      />
      {posts.map((post, idx) => {
        return (
          <PostWrapper key={`${idx + 1}-post`}>
            <Link href={`/posts/${post.fileName}`}>
              <p className="categories">{post.metaData.categories[0]}</p>
              <h2>{post.metaData.title}</h2>
              <p>{post.metaData.description}</p>
              <p className="date">{post.metaData.date}</p>
            </Link>
          </PostWrapper>
        );
      })}
    </Container>
  );
}
