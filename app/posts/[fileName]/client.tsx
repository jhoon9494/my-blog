'use client';

import styled from 'styled-components';

const Container = styled.main`
  padding: 10px 30px 40px;
  margin: 0 20px;
  position: relative;
  top: 65px;

  @media screen and (max-width: 500px) {
    padding: 10px 0px 40px;
  }

  /* 코드 부분 */
  pre {
    border: 1px solid gray;
    border-radius: 5px;
    padding: 20px 10px;
    margin: 20px 0;
    font-size: 14px;
    overflow: scroll;
  }

  h1 {
    font-size: 2rem;
  }

  h2 {
    margin: 35px 0;
  }

  li {
    margin: 5px 0;
    line-height: 27px;
    list-style: square;

    > code {
      font-weight: bold;
      color: #556e90;
    }
  }

  p {
    line-height: 30px;

    > code {
      font-weight: bold;
      color: #556e90;
    }

    > em {
      color: gray;
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

  img {
    display: block;
    margin: 0 auto;
    width: 70%;
    border-radius: 5px;
    border: 1px solid lightgray;
    box-shadow: 2px 2px 5px gray;

    @media screen and (max-width: 768px) {
      width: 100%;
      min-width: 270px;
    }
  }

  /* code style */
  .hljs-keyword {
    color: #992499;
  }

  .function_ {
    color: #3a3ac5;
  }

  .hljs-string {
    color: #e6a836;
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

    .hljs-string {
      color: #70d1f1;
    }

    .hljs-attr {
      color: #7eea7e;
    }
  }

  .hljs-property {
    color: #96d496;
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

type MetaDataType = {
  categories: string[];
  date: string;
  description: string;
  title: string;
};

export default function PostClient({ html, metaData }: { html: string; metaData: MetaDataType }) {
  function createMarkup() {
    return { __html: html };
  }
  return (
    <Container>
      <article>
        <Title>
          <h1>{metaData.title}</h1>
          <p>{metaData.date}</p>
        </Title>
        <div dangerouslySetInnerHTML={createMarkup()} />
      </article>
    </Container>
  );
}
