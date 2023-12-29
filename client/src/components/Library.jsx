import { Box } from "@chakra-ui/react";
import { faLayerGroup } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useEffect, useRef, useState } from "react";
import { FaList, FaPlus } from "react-icons/fa6";
import { FaArrowRight } from "react-icons/fa6";
import { LuAlignJustify } from "react-icons/lu";
import ExpandIcon from "./ExpandIcon";
import CollapseIcon from "./CollapseIcon";
import "../styles/searchbar.css";
import { useResizeDetector } from "react-resize-detector";
function useOutsideSearch(ref) {
  useEffect(() => {
    function handleClickOutside(event) {
      if (ref.current && !ref.current.contains(event.target)) {
        document.querySelector(".search-input").style = "width: 0px;";
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [ref]);
}

const Library = () => {
  const openSearchBar = (event) => {
    document.querySelector(".search-input").style = "width: 160px;";
  };
  const wrapperRef = useRef(null);
  useOutsideSearch(wrapperRef);

  const { width, height, ref } = useResizeDetector();
  const [resizeStyle, setResizeStyle] = useState(false);
  useEffect(() => {
    if (width < 223) {
      setResizeStyle(true);
    } else {
      setResizeStyle(false);
    }
  }, [width]);
  const collapseSidebarFunc = () => {
    document.querySelector(".app-sidebar").style = "width: 93px";
  };
  const expandSidebarFunc = () => {
    document.querySelector(".app-sidebar").style = "width: 290px";
  };
  return (
    <>
      <div className="relative overflow-x-hidden h-[100px]" ref={ref}>
        {" "}
        <div className="flex justify-between">
          <Box marginTop={2} padding="4px 12px 4px 20px" className="flex">
            {!resizeStyle ? (
              <ExpandIcon onClick={collapseSidebarFunc} />
            ) : (
              <CollapseIcon onClick={expandSidebarFunc} />
            )}{" "}
            <span
              className={`ml-[15px] text-[16px] font-bold  ${
                resizeStyle ? "hidden" : ""
              }`}
            >
              Library
            </span>
          </Box>
          <div
            className={`mt-[8px] me-2 flex flex-row ${
              resizeStyle ? "hidden" : ""
            }`}
          >
            <div className="flex flex-col justify-center hover:scale-[1.05] hover:bg-[rgb(35,35,35)] hover:text-white mt-1 me-[10px] rounded-full p-1">
              <FaPlus
                color="#b3b3b3"
                size={"20px"}
                style={{
                  background: "none",
                }}
              />
            </div>
            <div className="flex flex-col justify-center hover:scale-[1.05] hover:bg-[rgb(35,35,35)] hover:text-white mt-1 me-[10px] rounded-full p-1">
              <FaArrowRight
                color="#b3b3b3"
                size={"20px"}
                style={{
                  background: "none",
                }}
              />
            </div>
          </div>
        </div>
        <div
          className={`flex mt-4 ms-2 absolute w-[1000px] ${
            resizeStyle ? "hidden" : ""
          }`}
        >
          <div className="bg-[rgb(35,35,35)] py-1 px-3 text-white rounded-[10px] me-2 hover:bg-[rgb(50,50,50)] cursor-pointer">
            Playlists
          </div>
          <div className="bg-[rgb(35,35,35)] py-1 px-3 text-white rounded-[10px] me-2 hover:bg-[rgb(50,50,50)] cursor-pointer">
            Albums
          </div>
          <div className="bg-[rgb(35,35,35)] py-1 px-3 text-white rounded-[10px] me-2 hover:bg-[rgb(50,50,50)] cursor-pointer">
            Podcasts & Shows
          </div>
        </div>
      </div>
      <div className="h-[410px] overflow-y-scroll">
        <div
          className={`flex justify-between mb-3 mt-1 ms-2 ${
            resizeStyle ? "hidden" : ""
          }`}
        >
          <div className="flex justify-center items-center rounded-lg relative mt-1 bg-[rgb(35,35,35)]">
            <div
              className="search-icon flex flex-col justify-center hover:bg-[rgb(35,35,35)] hover:text-white text-[#b3b3b3] px-1 py-1 relative z-10 rounded-full w-[30px] h-[30px] cursor-pointer"
              onClick={openSearchBar}
              ref={wrapperRef}
            >
              <svg
                width="16"
                height="16"
                viewBox="0 0 20 20"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                style={{ margin: "0px auto" }}
              >
                <path
                  d="M19 19L13 13M15 8C15 8.91925 14.8189 9.82951 14.4672 10.6788C14.1154 11.5281 13.5998 12.2997 12.9497 12.9497C12.2997 13.5998 11.5281 14.1154 10.6788 14.4672C9.82951 14.8189 8.91925 15 8 15C7.08075 15 6.1705 14.8189 5.32122 14.4672C4.47194 14.1154 3.70026 13.5998 3.05025 12.9497C2.40024 12.2997 1.88463 11.5281 1.53284 10.6788C1.18106 9.82951 1 8.91925 1 8C1 6.14348 1.7375 4.36301 3.05025 3.05025C4.36301 1.7375 6.14348 1 8 1C9.85652 1 11.637 1.7375 12.9497 3.05025C14.2625 4.36301 15 6.14348 15 8Z"
                  stroke="#b3b3b3"
                  stroke-width="2"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                />
              </svg>
            </div>
            <input
              class={
                "listsong search-input rounded-r-lg text-[14px] text-[#b3b3b3] outline-none focus:outline-none:focus bg-[rgb(35,35,35)] p-[5px] w-0"
              }
              type="search"
              autocomplete="off"
              spellcheck="false"
              aria-live="polite"
              placeholder="Search in Your Library"
              style={{
                transition: "width 0.1s ease-in-out",
              }}
            />
          </div>
          <div
            className="flex justify-between w-[77px] rounded-full font-normal text-[10px] focus:outline-none cursor-pointer mt-[6px] me-[4px] text-[#b3b3b3] hover:text-white"
            style={{
              background: "none",
              fontSize: "16px",
            }}
          >
            Recents
            <FaList className="mt-[6px]" size="16px" />
          </div>
        </div>
        <div>
          {/*flex gap-2 p-2 items-center*/}
          <div class="flex gap-2 p-2 overflow-hidden text-[#b3b3b3] hover:bg-[rgb(35,35,35)] rounded-lg w-full ">
            <div class="h-[50px] w-[50px] ">
              <img
                src="https://i.scdn.co/image/ab67616d0000b273b315e8bb7ef5e57e9a25bb0f"
                alt="track"
              />
            </div>
            <div
              class={`listsong-info flex flex-col ${
                resizeStyle ? "hidden" : ""
              }`}
            >
              <span class="whitespace-nowrap overflow-hidden text-ellipsis text-white">
                Chìm Sâu
              </span>
              <span class="whitespace-nowrap overflow-hidden text-ellipsis">
                Playlists • 9 songs
              </span>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Library;
