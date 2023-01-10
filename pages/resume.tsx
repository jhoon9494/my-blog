import styled from 'styled-components';
import Head from 'next/head';
import { useState } from 'react';
import ProjectWrapper from '../components/resume/ProjectWrapper';
import EducationWrapper from '../components/resume/EducationWrapper';

const Container = styled.main`
  display: flex;
  flex-direction: column;
  position: relative;
  padding-bottom: 100px;
  top: 65px;

  > section {
    padding: 0 30px;

    h1 {
      padding-left: 10px;
      font-size: 2rem;
    }
  }
`;

const AboutMe = styled.section`
  p {
    font-weight: 300;
    line-height: 30px;
  }
`;

const Skills = styled.section`
  ul {
    padding-left: 15px;
  }

  li {
    line-height: 30px;
    list-style: none;
    font-weight: 300;
    font-size: 14px;
  }
`;

const BaseGraph = styled.div`
  background-color: gray;
  max-width: 500px;
  height: 5px;
  border-radius: 10px;
`;

const Graph = styled.div<{ graphColor: string; length: string }>`
  position: relative;
  background-color: ${(props) => props.graphColor && props.graphColor};
  height: 5px;
  max-width: ${(props) => props.length && props.length}%;
  border-radius: 10px;
`;

const DotWrapper = styled.div<{ graphColor: string }>`
  position: absolute;
  top: -17px;
  right: 0;
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  border-radius: 50%;
  height: 30px;
  width: 40px;

  > span {
    color: ${(props) => props.graphColor && props.graphColor};
    text-align: center;
    font-size: 13px;
    font-weight: bold;
  }

  ::after {
    content: ' ';
    display: block;
    border-radius: 50%;
    background-color: ${(props) => props.graphColor && props.graphColor};
    height: 10px;
    width: 10px;
  }
`;

const Projects = styled.section`
  display: flex;
  flex-wrap: wrap;

  @media screen and (max-width: 799px) {
    justify-content: center;
  }
`;

const Education = styled.div`
  max-width: 750px;
  min-width: 350px;
`;

const Contact = styled.section`
  h3 {
    border-bottom: 2px solid gray;
    width: 60px;
  }
`;

function Resume() {
  // Education
  const [dropDown, setDropDown] = useState('');

  return (
    <Container>
      <Head>
        <title>My Resume</title>
        <meta name="description" content="My Portfolio Resume" />
      </Head>
      <AboutMe>
        <h1>🙋‍♂️ 안녕하세요. 프론트엔드 개발자 최정훈입니다!</h1>
        <p>
          저는 새롭게 배우는 것을 두려워하지 않습니다.
          <br />
          다양한 사람을 만나고 서로의 의견을 주고받는 것을 즐깁니다.
          <br />
          이전 직장에서 개발 회의에 참여하면서 웹 개발에 대해 처음 알게되었습니다.
          <br />
          끊임없이 배울 수 있고, 내가 만든 웹사이트가 누군가에 도움이 될 수 있다는 점이 매력적으로 다가왔습니다.
          <br />
          2021년 말에 직장을 그만두고 현재는 개발공부에 몰두하고 있습니다.
        </p>
      </AboutMe>
      <Skills>
        <h1>⚒️ Skills</h1>
        <h3>React</h3>
        <BaseGraph>
          <Graph graphColor="#845ef7" length="60">
            <DotWrapper graphColor="#845ef7">
              <span>60%</span>
            </DotWrapper>
          </Graph>
        </BaseGraph>
        <ul>
          <li>함수형 컴포넌트로 개발할 수 있습니다.</li>
          <li>react-router-dom을 사용하여 SPA 페이지를 구현할 수 있습니다.</li>
          <li>axios를 이용하여 API를 연동할 수 있습니다.</li>
          <li>styled-components를 사용하여 CSS를 적용할 수 있습니다.</li>
          <li>redux/toolkit을 사용하여 간단한 전역관리를 할 수 있습니다.</li>
          <li>TypeScript를 사용한 프로젝트를 통해 TypeScript 사용법에 대해 공부 중입니다.</li>
        </ul>

        <h3>HTML & CSS & JavaScript</h3>
        <BaseGraph>
          <Graph graphColor="#cc5de8" length="60">
            <DotWrapper graphColor="#cc5de8">
              <span>60%</span>
            </DotWrapper>
          </Graph>
        </BaseGraph>
        <ul>
          <li>미디어 쿼리를 사용하여 반응형 웹을 구현할 수 있습니다.</li>
          <li>CSS Flex와 Grid를 사용하여 페이지 레이아웃을 구축할 수 있습니다.</li>
          <li>바닐라 JavaScript로 웹페이지를 제작할 수 있습니다.</li>
          <li>실행 컨텍스트, 클로져에 대해 이해하고 있습니다.</li>
        </ul>

        <h3>Git & GitHub</h3>
        <BaseGraph>
          <Graph graphColor="#5c7cfa" length="40">
            <DotWrapper graphColor="#5c7cfa">
              <span>40%</span>
            </DotWrapper>
          </Graph>
        </BaseGraph>
        <ul>
          <li>github로 원격 레포지토리를 관리할 수 있습니다.</li>
          <li>git push, pull, commit, reset 등의 명령어를 사용할 수 있습니다.</li>
          <li>Branch를 이용하여 협업해본 경험이 있습니다.</li>
        </ul>
      </Skills>

      <section>
        <h1>👨‍💻 Projects</h1>
        <h3>팀 프로젝트</h3>
        <Projects>
          <ProjectWrapper
            hoverItem="camping"
            bgImage={"url('static/camping.png')"}
            link="https://github.com/jhoon9494/reservation-app"
            title="캠핑장 예약페이지"
            content={`Node.js와 React를 이용하여 캠핑장을 예약할 수 있는 간단한 웹사이트를 제작하였습니다.
객실 지도 및 상세페이지, 예약관련 기능 구현을 맡았으며, 유저 편의성을 위해 캠핑장 지도와 객실 설명페이지를 하나로 합쳐 지도에서 객실 클릭 시 모달창을 통해 객실 상세 설명 및 후기 정보를 제공할 수 있도록 구현했습니다.
API를 호출하여 관련 데이터를 전송받고 브라우저에 적절하게 배치하는 과정을 통해 API 연동방법에 대해 확실히 알 수 있었습니다.`}
          />
          <ProjectWrapper
            hoverItem="travelMaker"
            bgImage={"url('static/travelMaker.png')"}
            link="https://github.com/jhoon9494/travel_maker"
            title="Travel Maker"
            content="현재 진행중인 프로젝트입니다. 
프로젝트가 마무리 되는대로 신속히 업데이트 하겠습니다!"
            // React, TypeScript와 Java Spring boot를 이용하여 여행 SNS를 제작하였습니다.
            // 회원가입, 로그인, 팔로우, 좋아요 등 Instagram의 전반적인 기능들을 클론 코딩하면서, 여행지 추천이라는 주제로 특정 여행지의 추천 꿀팁과 여행지 추천 점수 등을 제공하는 기능을 추가해보았습니다.
            // TypeScript를 프로젝트에 적용시키면서 TypeScript의 필요성과 기본적인 사용법을 익힐 수 있었습니다.
          />

          <ProjectWrapper
            hoverItem="shopping"
            bgImage={"url('static/shopping.png')"}
            link="https://github.com/jhoon9494/shoppingmall"
            title="쇼핑몰 웹페이지"
            content={`HTML & CSS와 바닐라 Javascript를 이용하여 쇼핑몰의 전반적인 기능을 구현해보았습니다.
가입 시 카카오 우편번호 API를 이용하여 주소 정보를 받으며, 상품 주문 시 로그인한 유저의 주소 정보를 불러올 수 있습니다.
유저들은 상품을 장바구니에 담아 한 번에 결제할 수 있으며, 구입한 상품에 대해 평점을 매길 수 있습니다. 또한 관리자 계정을 이용하여 상품을 등록, 관리할 수 있습니다.`}
          />
        </Projects>
        <h3>개인 프로젝트</h3>
        <Projects>
          <ProjectWrapper
            hoverItem="blog"
            bgImage={"url('static/blog.png')"}
            link="https://github.com/jhoon9494/my-blog"
            title="정적 블로그 제작"
            content={`Next.js를 이용하여 Markdown 파일에 작성한 게시글을 정적 페이지로 제작하였습니다.
unified 라이브러리를 이용하여 Markdown을 html로 변환하여 게시글에 반영하였습니다.
메인 페이지에 게시글 포스팅 날짜를 기준으로 최신 5개의 포스트를 표시하도록 하였고, posts 페이지에는 카테고리별로 필터하여 포스트를 검색하는 기능을 추가하였습니다.
직접 블로그를 만들어 보면서 Next.js의 정적페이지 생성에 대해 기본적인 사용법을 익힐 수 있었습니다.`}
          />
        </Projects>
      </section>

      <section>
        <h1>📖 Education</h1>
        <Education>
          <EducationWrapper
            dropDown={dropDown}
            setDropDown={setDropDown}
            item="elice"
            title="엘리스 SW Engineer 트랙 2기 수료"
            date="2022년 4월 11일 ~ 7월 29일"
            content={`웹 풀스택 개발자 과정 수료 
해당 과정을 통해 Front-End의 기본인 HTML5, CSS, JavaScript를 학습하였습니다.
실무에서 많이 사용되는 라이브러리인 React와 Redux의 기초에 대해서도 습득할 수 있었습니다.
Back-End 부분으로 Node.js와 express 라이브러리를 이용한 웹 서버 구성 방법에 대해 학습하였습니다.
두 번의 팀 프로젝트를 진행하며 개발 기획 단계부터 배포 단계까지 경험해보았습니다.
또한, 프로젝트를 통해 API 통신, 동기 및 비동기에 대해 이해할 수 있었고 협업의 중요성에 대해 배울 수 있었습니다.`}
          />
        </Education>
      </section>

      <Contact>
        <h1>📞 Contact</h1>
        <h3>Github</h3>
        <a href="https://github.com/jhoon9494" target="_blank" rel="noreferrer">
          github.com/jhoon9494
        </a>
        <h3>Email</h3>
        <a href="mailto:wjdgns9406@gmail.com">wjdgns9406@gmail.com</a>
        <h3>Phone</h3>
        <span>010-8860-4639</span>
      </Contact>
    </Container>
  );
}

export default Resume;
