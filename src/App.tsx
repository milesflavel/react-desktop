import { useState } from "react";
import { Taskbar } from "./components/Taskbar";
import { TaskbarClock } from "./components/TaskbarClock";
import { Window, type WindowProps } from "./components/Window";
import { WindowContainer } from "./components/WindowContainer";
import { TaskbarButton } from "./components/TaskbarButton";

export const App = () => {
  const [windows, setWindows] = useState<WindowProps[]>([
    {
      title: "Test Window",
      children: <div className="size-full">This is just a test</div>,
    },
    {
      title: "mtmilo",
      children: <iframe className="size-full" src="https://www.mtmilo.net/" />,
    },
    {
      title: "Textpad",
      children: <textarea className="size-full bg-white p-1" />,
    },
  ]);

  const addWindow = () => {
    const windowId = Math.random().toString();
    setWindows((current) => [
      ...current,
      {
        title: windowId,
        children: <div className="size-full">{windowId}</div>,
      },
    ]);
  };

  const focusWindow = (window: WindowProps) => {
    setWindows((current) => [
      ...current.filter((currentWindow) => currentWindow !== window),
      window,
    ]);
  };

  return (
    <div className="flex h-dvh w-dvw flex-col overflow-hidden">
      <main className="grow bg-cyan-600">
        <WindowContainer>
          {windows.map((window) => (
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
