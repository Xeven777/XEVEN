import { ChatArea } from "./components/component/chat-area";
import ThemeTogglebutton from "./components/ui/theme-togggle";

function App() {
  return (
    <>
      <div className="fixed top-2 right-6">
        <ThemeTogglebutton />
      </div>
      <ChatArea />
    </>
  );
}

export default App;
