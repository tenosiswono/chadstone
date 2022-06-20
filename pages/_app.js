import { useEffect } from "react";
import Script from "next/script";
import { ChakraProvider, Container } from "@chakra-ui/react";
import { LayoutGroup } from "framer-motion";
import "../styles/globals.css";
import { AuthProvider } from "../contexts/Auth";

function MyApp({ Component, pageProps }) {
  useEffect(() => {
    window.OneSignal = window.OneSignal || [];
    OneSignal.push(function () {
      OneSignal.init({
        appId: "e0775473-1e24-4f8a-bb41-e92cc48344e4",
        safari_web_id:
          "web.onesignal.auto.5f80e2fb-b063-4ecb-90f7-0c7e45de9678",
        notifyButton: {
          enable: true,
        },
        allowLocalhostAsSecureOrigin: true,
      });
    });
    return () => {
      window.OneSignal = undefined;
    };
  }, []);
  return (
    <>
      <ChakraProvider>
        <LayoutGroup>
          <AuthProvider>
            <Container maxW="2xl" bg="orange.50" minH="100vh" padding={0}>
              <Component {...pageProps} />
            </Container>
          </AuthProvider>
        </LayoutGroup>
      </ChakraProvider>
      <Script
        src="https://cdn.onesignal.com/sdks/OneSignalSDK.js"
        strategy="lazyOnload"
      />
    </>
  );
}

export default MyApp;
