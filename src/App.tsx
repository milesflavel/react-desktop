import { Taskbar } from "./components/Taskbar";
import { TaskbarClock } from "./components/TaskbarClock";
import { Window } from "./components/Window";
import { WindowContainer } from "./components/WindowContainer";

export const App = () => {
  return (
    <div className="flex h-dvh w-dvw flex-col overflow-hidden">
      <main className="grow bg-cyan-600">
        <WindowContainer>
          <Window title="Test Window"></Window>
        </WindowContainer>
      </main>
      <aside>
        <Taskbar
          items={<></>}
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
