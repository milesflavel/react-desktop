import { useState } from "react";
import { Taskbar } from "./components/Taskbar";
import { TaskbarClock } from "./components/TaskbarClock";
import { Window, type WindowProps } from "./components/Window";
import { WindowContainer } from "./components/WindowContainer";
import { TaskbarButton } from "./components/TaskbarButton";

const getNow = () => new Date().valueOf();

export const App = () => {
  const [windows, setWindows] = useState<
    (Pick<WindowProps, "title" | "children"> & { lastFocussed: number })[]
  >([
    {
      title: "Test Window",
      children: <div className="size-full">This is just a test</div>,
      lastFocussed: getNow(),
    },
    {
      title: "mtmilo",
      children: <iframe className="size-full" src="https://www.mtmilo.net/" />,
      lastFocussed: getNow(),
    },
    {
      title: "Textpad",
      children: <textarea className="size-full resize-none bg-white p-1" />,
      lastFocussed: getNow(),
    },
  ]);

  const addWindow = () => {
    const windowId = Math.random().toString();
    setWindows((current) => [
      ...current,
      {
        title: windowId,
        children: <div className="size-full">{windowId}</div>,
        lastFocussed: getNow(),
      },
    ]);
  };

  const focusWindow = (window: WindowProps) => {
    setWindows((current) =>
      current.map((x) => {
        if (x === window) {
          x.lastFocussed = getNow();
        }
        return x;
      }),
    );
  };

  return (
    <div className="flex h-dvh w-dvw flex-col overflow-hidden">
      <main className="grow bg-cyan-600">
        <WindowContainer>
          {windows
            .toSorted((a, b) => a.lastFocussed - b.lastFocussed)
            .map((window) => (
              <Window
                key={window.title}
                title={window.title}
                onFocus={() => focusWindow(window)}
              >
                {window.children}
              </Window>
            ))}
        </WindowContainer>
      </main>
      <aside>
        <Taskbar
          items={
            <>
              <TaskbarButton title="+" onClick={addWindow} />
              {windows.map((window) => (
                <TaskbarButton
                  key={window.title}
                  title={window.title}
                  onClick={() => focusWindow(window)}
                />
              ))}
            </>
          }
          trayItems={
            <>
              <TaskbarClock />
            </>
          }
        />
      </aside>
    </div>
  );
};

export default App;
