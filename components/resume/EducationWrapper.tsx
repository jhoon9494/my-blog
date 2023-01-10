import { Dispatch, SetStateAction } from 'react';
import styled, { css } from 'styled-components';

const Wrapper = styled.div`
  border-radius: 5px;
  border: 1px solid gray;

  & + & {
    margin: 20px 0;
  }
`;

const Title = styled.h3<{ isDrop: boolean }>`
  background-color: ${(props) => (props.isDrop ? '#5c7cfa' : 'none')};
  color: ${(props) => props.isDrop && 'white'};
  margin: 0;
  padding: 20px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  cursor: pointer;

  transition: all 0.3s linear;
  > div {
    margin-bottom: 10px;
  }
`;

const EducationContentWrapper = styled.div<{ isDrop: boolean }>`
  visibility: ${(props) => (props.isDrop ? 'visible' : 'hidden')};
  max-height: ${(props) => (props.isDrop ? '500px' : '0')};
  overflow: hidden;
  transition: all ${(props) => (props.isDrop ? '0.6s ease-out' : '0.3s ease-in')};

  > p {
    margin: 20px;
  }
`;

const Date = styled.p`
  font-size: 14px;
  color: gray;
`;

const Content = styled.p`
  white-space: pre-wrap;
  font-weight: 300;
  font-size: 15px;
  line-height: 30px;
`;

const DropIcon = styled.div<{ right: boolean; isDrop: boolean }>`
  display: inline-block;
  border: 1px solid gray;
  background-color: gray;
  width: 10px;
  height: 1px;
  transform: ${(props) => (props.right ? 'rotate(-45deg) translateX(-3px)' : 'rotate(45deg) translateX(3px)')};

  ${(props) =>
    props.isDrop &&
    css`
      transform: rotate(0);
      border: 1px solid white;
      background-color: white;
    `}

  transition: all ease 0.2s;
`;

interface WrapperProps {
  item: string;
  title: string;
  date: string;
  content: string;
  dropDown: string;
  setDropDown: Dispatch<SetStateAction<string>>;
}

function EducationWrapper({ item, title, date, content, dropDown, setDropDown }: WrapperProps) {
  const handleClick = (clickItem: string) => {
    if (!dropDown) {
      setDropDown(clickItem);
    } else if (dropDown !== clickItem) {
      setDropDown(clickItem);
    } else {
      setDropDown('');
    }
  };

  return (
    <Wrapper>
      <Title isDrop={dropDown === item} onClick={() => handleClick(item)}>
        {title}
        <div>
          <DropIcon right={false} isDrop={dropDown === item} />
          <DropIcon right isDrop={dropDown === item} />
        </div>
      </Title>
      <EducationContentWrapper isDrop={dropDown === item}>
        <Date>{date}</Date>
        <Content>{content}</Content>
      </EducationContentWrapper>
    </Wrapper>
  );
}

export default EducationWrapper;
