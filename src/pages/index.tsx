import EditorInfobar from "@/components/EditorInfobar";
import MonacoEditor from "@/components/MonacoEditor";
import Navbar from "@/components/Navbar";
import { PageSEO } from "@/components/PageSEO";
import { JSON_TEMPLATE } from "@/constants/json";
import { useBreakpoint } from "@/hooks/useBreakpoint";
import { useApp } from "@/store/useApp";
import { useStored } from "@/store/useStored";
import { useTree } from "@/store/useTree";
import { classNames } from "@/utility/classNames";
import { Allotment } from "allotment";
import "allotment/dist/style.css";
import dynamic from "next/dynamic";
import { Fira_Mono, Montserrat } from "next/font/google";
import { useRouter } from "next/router";
import { useEffect } from "react";

const montserrat = Montserrat({ subsets: ["cyrillic"] });

export const firaMono = Fira_Mono({
  weight: ["500"],
  subsets: ["latin"],
});

const TreeEditor = dynamic(() => import("@/components/TreeEditor"), {
  ssr: false,
});

export default function Home() {
  const { isReady } = useRouter();
  const setContents = useApp((state) => state.setContents);
  const fullscreen = useTree((state) => state.fullscreen);
  const toggleFullscreen = useTree((state) => state.toggleFullscreen);
  const lightmode = useStored((state) => state.lightmode);

  const { isScreenLessThan } = useBreakpoint(768);

  useEffect(() => {
    if (lightmode) {
      document.documentElement.classList.remove("dark");
    } else {
      document.documentElement.classList.add("dark");
    }
  }, [lightmode]);

  useEffect(() => {
    if (isReady) {
      setContents({ contents: JSON_TEMPLATE, hasChanges: false });
    }
  }, [isReady, setContents]);

  useEffect(() => {
    if (isScreenLessThan) toggleFullscreen(true);
  }, [isScreenLessThan, toggleFullscreen]);

  return (
    <div className="h-screen">
      <PageSEO
        title="Json Tree Viewer"
        description="Visualisation tool for json in a graph and tree form"
      />
      <div
        className={classNames(
          montserrat.className,
          "h-[calc(100vh-28px)] overflow-hidden",
        )}
      >
        <Navbar />
        <main className="flex h-[calc(100vh-84px)] w-full flex-col md:flex-row">
          <Allotment
            className="!relative flex h-[calc(100vh-84px)]"
            proportionalLayout={false}
          >
            <Allotment.Pane
              className="h-full bg-white dark:bg-vsdark-500 dark:text-white"
              preferredSize={isScreenLessThan ? "100%" : 450}
              minSize={fullscreen ? 0 : 450}
              maxSize={isScreenLessThan ? Infinity : 700}
              visible={!fullscreen}
            >
              <MonacoEditor />
            </Allotment.Pane>
            <Allotment.Pane
              minSize={0}
              maxSize={isScreenLessThan && !fullscreen ? 0 : Infinity}
              className="flex w-full items-center justify-center"
            >
              <TreeEditor />
            </Allotment.Pane>
          </Allotment>
        </main>
      </div>
      <EditorInfobar />
    </div>
  );
}
