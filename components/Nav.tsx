import Link from 'next/link';
import { Dispatch, SetStateAction, useEffect, useState } from 'react';
import styled from 'styled-components';
import { BsFillMoonFill, BsSunFill } from 'react-icons/bs';

const Container = styled.div`
  width: 935px;
  min-height: 65px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  position: fixed;
  border-bottom: 1px solid lightgray;
  z-index: 10;
`;

const LinkList = styled.ul`
  display: flex;
  list-style: none;

  > li {
    margin-right: 50px;

    &:hover {
      opacity: 0.6;
    }
  }
`;

const ThemeButton = styled.button`
  border: none;
  background-color: lightgray;
  border-radius: 50%;
  padding: 7px 10px;
  margin-right: 30px;
  cursor: pointer;

  &:hover {
    background-color: #ededed;
  }

  > svg {
    color: black;
    width: 20px;
    height: 20px;
  }
`;

interface NavProps {
  theme: string | false | null;
  setTheme: Dispatch<SetStateAction<string | false | null>>;
}

function Nav({ theme, setTheme }: NavProps) {
  const [loaded, setLoaded] = useState(false);
  const handleChangeTheme = () => {
    if (theme === 'light') {
      setTheme('dark');
    } else {
      setTheme('light');
    }
  };

  // 클라이언트에 마운트가 완료된 다음 svg를 렌더링할 수 있도록 하기 위한 코드
  useEffect(() => {
    setLoaded(true);
  }, [setLoaded]);

  return (
    <Container className="navTheme">
      <LinkList>
        <li>
          <Link href="/">Home</Link>
        </li>
        <li>
          <Link href="/posts">Posts</Link>
        </li>
      </LinkList>
      <ThemeButton type="button" onClick={handleChangeTheme}>
        {loaded && theme === 'dark' ? <BsFillMoonFill /> : <BsSunFill />}
      </ThemeButton>
    </Container>
  );
}

export default Nav;
