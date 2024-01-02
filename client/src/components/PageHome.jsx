import React from "react";
import { useState, useEffect, useRef } from "react";
import "../styles/sidebar.css";
import Library from "./Library";
import TopMenu from "./TopMenu";
import Header from "./Header";
import MusicPlayer from "./MusicPlayer";
import { styled } from "styled-components";
import { useResizeDetector } from "react-resize-detector";
// import { Swiper, SwiperSlide } from "swiper/react";
// import { FreeMode, Navigation } from "swiper/modules";
const Container = styled.div`
  position: relative;
  display: grid;
  grid-template-rows: 88vh 12vh;
  background-color: rgb(0 0 0);
  .body {
    border-radius: 5px;
    background-color: #121212;
    color: #b3b3b3;
    overflow: auto;
  }
  .footer {
    z-index: 3;
  }
  .top-menu {
    border-radius: 5px;
    background-color: #121212;
    color: #b3b3b3;
    padding: 8px 0px 8px 8px;
    margin-bottom: 8px;
  }
  .library {
    border-radius: 5px;
    background-color: #121212;
    color: #b3b3b3;
    padding: 8px 0px 8px 8px;
    z-index: 5;
  }
`;
function PageHome({ children }) {
  const sidebarRef = useRef(null);
  const [isResizing, setIsResizing] = useState(false);
  const [sidebarWidth, setSidebarWidth] = useState(290);

  const startResizing = React.useCallback((mouseDownEvent) => {
    setIsResizing(true);
  }, []);

  const stopResizing = React.useCallback(() => {
    setIsResizing(false);
  }, []);

  const resize = React.useCallback(
    (mouseMoveEvent) => {
      if (isResizing) {
        setSidebarWidth(
          mouseMoveEvent.clientX -
            sidebarRef.current.getBoundingClientRect().left
        );
      }
    },
    [isResizing]
  );

  React.useEffect(() => {
    window.addEventListener("mousemove", resize);
    window.addEventListener("mouseup", stopResizing);
    return () => {
      window.removeEventListener("mousemove", resize);
      window.removeEventListener("mouseup", stopResizing);
    };
  }, [resize, stopResizing]);

  const { width, height, ref } = useResizeDetector();
  const [resizeStyle, setResizeStyle] = useState(false);
  useEffect(() => {
    console.log(width);
    if (width < 223) {
      setResizeStyle(true);
    } else {
      setResizeStyle(false);
    }
  }, [width]);
  return (
    <Container>
      <div className="app-container">
        <div
          ref={sidebarRef}
          className={"app-sidebar"}
          style={{ width: sidebarWidth < 290 ? 93 : sidebarWidth }}
        >
          <div className={"app-sidebar-content "}>
            <div className="top-menu">
              <TopMenu />
            </div>
            <div className="library">
              <Library />
            </div>
          </div>

          <div className={"app-sidebar-resizer"} onMouseDown={startResizing} />
        </div>
        <div className="app-frame">
          <div className="body">
            <Header />
            <div className="body_content">{children}</div>{" "}
          </div>
        </div>
      </div>
      <div className="footer">
        <MusicPlayer />
      </div>
    </Container>
  );
}

export default PageHome;
