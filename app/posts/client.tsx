'use client';

import Link from 'next/link';
import { FormEvent, useState } from 'react';
import styled, { css } from 'styled-components';
import { PostType } from '../../lib/utils/post';
import compareDate from '../../lib/utils/sortFn';

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
    align-items: center;
    padding: 0;
    flex-wrap: wrap;
  }

  form {
    margin: 0 auto;
  }

  @media screen and (max-width: 400px) {
    padding: 10px 0px 40px;
  }
`;

const CategoryBtn = styled.button<{ active: boolean }>`
  margin: 7px;
  border: 1px solid gray;
  text-align: center;
  padding: 6px 15px;
  border-radius: 20px;
  cursor: pointer;

  :hover {
    transform: scale(1.04);
  }
  ${({ active }) =>
    active &&
    css`
      border: 3px solid gray;
      font-weight: bolder;
    `}
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

type PostsPropsType = {
  posts: PostType[];
  categories: {
    [key: string]: number;
  };
};

export default function PostsClient({ posts, categories }: PostsPropsType) {
  const [postsData, setPostsData] = useState(posts);
  const [selectedCategory, setSelectedCategory] = useState<PostType[]>(posts);
  const [activeTab, setActiveTab] = useState('전체');
  const [search, setSearch] = useState('');

  const handleSearch = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (search !== '') {
      const searchData = selectedCategory.filter((data) => {
        return data.title.toUpperCase().includes(search.toUpperCase());
      });
      searchData.sort(compareDate);
      setPostsData(searchData);
      setSearch('');
    } else {
      setPostsData(posts);
      setSelectedCategory(posts);
      setSearch('');
      setActiveTab('전체');
    }
  };

  const handleTotalList = () => {
    setActiveTab('전체');
    setPostsData(posts);
    setSelectedCategory(posts);
    setSearch('');
  };

  const handleCategoryList = (category: string) => {
    setActiveTab(category);
    const selectedData = posts.filter((data) => {
      return data.categories[0].includes(category);
    });
    selectedData.sort(compareDate);
    setPostsData(selectedData);
    setSelectedCategory(selectedData);
    setSearch('');
  };

  return (
    <Container>
      <ul>
        <li>
          <CategoryBtn onClick={handleTotalList} active={activeTab === '전체'}>
            전체({posts.length})
          </CategoryBtn>
        </li>
        {Object.entries(categories).map((category, idx) => {
          return (
            <li key={`${idx + 1}-category`}>
              <CategoryBtn onClick={() => handleCategoryList(category[0])} active={activeTab === category[0]}>
                {category[0]}({category[1]})
              </CategoryBtn>
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
