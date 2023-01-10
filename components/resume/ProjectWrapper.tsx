import Link from 'next/link';
import { MouseEvent, useState } from 'react';
import styled from 'styled-components';

const Wrapper = styled.div<{ isHover: boolean; bgImage: string }>`
  border: 1px solid ${(props) => (props.isHover ? 'transparent' : 'gray')};
  border-radius: 5px;
  margin: 10px;
  width: 350px;
  height: 350px;

  background-image: ${(props) => (props.isHover ? 'none' : props.bgImage)};
  background-repeat: no-repeat;
  background-size: cover;

  @media screen and (max-width: 799px) {
    width: 500px;
    min-width: 350px;
  }

  > div.desc {
    width: 100%;
    height: 100%;
    color: white;
    border-radius: 5px;
    padding: 15px;
    position: relative;
    background-color: #5c7cfa;

    visibility: ${(props) => (props.isHover ? 'visible' : 'hidden')};
    opacity: ${(props) => (props.isHover ? 1 : 0)};
    transition: all ease-out 0.3s;

    > h3 {
      position: absolute;
      top: ${(props) => (props.isHover ? '0px' : '-30px')};
      transition: all ease-out 0.3s;
    }

    > p {
      margin-right: 10px;
      white-space: pre-wrap;
      font-size: 14px;
      font-weight: 300;
      line-height: 25px;
      position: absolute;
      top: ${(props) => (props.isHover ? '40px' : '60px')};
      transition: all ease-out 0.3s;
    }

    > div {
      position: absolute;
      left: 20px;
      top: ${(props) => (props.isHover ? '300px' : '310px')};
      transition: all ease-out 0.3s;
    }

    button {
      border-radius: 10px;
      border: 1px solid #ebebeb;
      padding: 4px 10px;
      margin-right: 10px;
      color: white;

      :hover {
        border: 2px solid #ebebeb;
        background-color: #4159b9;
      }
    }
  }
`;

interface WrapperProps {
  hoverItem: string;
  bgImage: string;
  link: string;
  title: string;
  content: string;
}

function ProjectWrapper({ hoverItem, bgImage, link, title, content }: WrapperProps) {
  const [hover, setHover] = useState('');
  const handleMouseEnter = (e: MouseEvent<HTMLElement>) => {
    setHover(e.currentTarget.id);
  };
  return (
    <Wrapper
      isHover={hover === hoverItem}
      bgImage={bgImage}
      onMouseEnter={(e) => handleMouseEnter(e)}
      id={hoverItem}
      onMouseLeave={() => setHover('')}
    >
      <div className="desc">
        <h3>{title}</h3>
        <p>{content}</p>
        <div>
          <a href={link} target="_blank" rel="noreferrer">
            <button type="button">view github</button>
          </a>
          {/* TODO 프로젝트 상세 설명 */}
          {/* <Link href="/" target="_blank" rel="noreferrer">
            <button type="button">view Detail</button>
          </Link> */}
        </div>
      </div>
    </Wrapper>
  );
}

export default ProjectWrapper;
