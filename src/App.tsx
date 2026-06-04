import { Window } from "./components/Window";
import { WindowContainer } from "./components/WindowContainer";

export const App = () => {
  return (
    <div className="flex h-dvh w-dvw flex-col">
      <main className="grow bg-cyan-600">
        <WindowContainer>
          <Window title="Test Window"></Window>
        </WindowContainer>
      </main>
      <aside className="">
        <div className="border-outset flex h-10 w-full border-t-4 border-neutral-300 bg-neutral-300"></div>
      </aside>
    </div>
  );
};

export default App;
