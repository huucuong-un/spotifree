import {
  PageForgotPassword,
  PageHome,
  PageLogin,
  PageNotFound,
  PageResetPassword,
  PageSignUp,
  PageStatus,
} from "./components";
import { ChakraProvider } from "@chakra-ui/react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthContextProvider } from "./context/AuthContext";
import Body from "./components/Body";
import TrackList from "./components/TrackList";
import Album from "./components/Album";
import Profile from "./components/Profile";
import { NavigateContextProvider } from "./context/NavigateContext";
import { useEffect, useState } from "react";
import { getUser } from "./api";
import { BodyArtist, CreateAlbum, CreateSong } from "./components/artist";
export function App() {
  const [user, setUser] = useState(" ");
  useEffect(() => {
    const getUserFunc = async () => {
      try {
        const res = await getUser();
        setUser(res.data.data);
      } catch (err) {
        setUser("");
      }
    };
    getUserFunc();
  }, []);
  return (
    <ChakraProvider>
      <AuthContextProvider>
        <BrowserRouter>
          <NavigateContextProvider>
            <Routes>
              <Route
                path="/home"
                element={
                  <PageHome>
                    <Body />
                  </PageHome>
                }
              />
              <Route path="/status" element={<PageStatus />} />
              <Route path="/login" element={<PageLogin />} />
              <Route path="/signup" element={<PageSignUp />} />
              <Route path="/forgotPassword" element={<PageForgotPassword />} />
              <Route
                path="/resetPassword/:userId/:token"
                element={<PageResetPassword />}
              />
              <Route
                path="/"
                element={
                  <PageHome>
                    {user.role === "user" ? (
                      <Body />
                    ) : user.role === "artist" ? (
                      <BodyArtist />
                    ) : (
                      ""
                    )}
                  </PageHome>
                }
              />
              <Route
                path="/playlist/:id"
                element={
                  <PageHome>
                    <TrackList />
                  </PageHome>
                }
              />

              <Route
                path="/album/:id"
                element={
                  <PageHome>
                    <Album />
                  </PageHome>
                }
              />
              <Route
                path="/user/:id"
                element={
                  <PageHome>
                    <Profile />
                  </PageHome>
                }
              />
              <Route
                path="/createAlbum"
                element={
                  <PageHome>
                    <CreateAlbum />
                  </PageHome>
                }
              />
              <Route
                path="/createSong"
                element={
                  <PageHome>
                    <CreateSong />
                  </PageHome>
                }
              />
              <Route path="*" element={<PageNotFound />} />
            </Routes>
          </NavigateContextProvider>
        </BrowserRouter>
      </AuthContextProvider>
    </ChakraProvider>
  );
}
