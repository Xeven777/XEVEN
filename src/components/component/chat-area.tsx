import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Loader, SendIcon } from "lucide-react";
import { ChangeEvent, useState } from "react";
import man from "@/assets/man.jpg";
import robo from "@/assets/robo.jpg";
import Markdown from "react-markdown";

type DataRespone = {
  answer: string;
};

export function ChatArea() {
  const url = "https://anishapi.vercel.app/anish";
  const [messages, setMessages] = useState([
    {
      sender: "ai",
      text: "Hello! Im **XEVEN**. Personal chatbot for Anish👽. You can ask any question about Anish, his hobbies, life, eductaion, etc..😇 Im Happy to help you!",
    },
  ]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);

  const sendMessage = async () => {
    setLoading(true);
    if (input.trim() === "") return;

    const userMessage = { sender: "user", text: input };
    setMessages((prevMessages) => [...prevMessages, userMessage]);
    setInput("");

    try {
      const response = await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ question: input }),
      });

      const data: DataRespone = await response.json();
      const aiMessage = { sender: "ai", text: data.answer };
      setMessages((prevMessages) => [...prevMessages, aiMessage]);
    } catch (error) {
      console.error("Error sending message:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    setInput(e.target.value);
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      sendMessage();
    }
  };

  return (
    <div className="flex flex-col max-w-screen-xl mx-auto rounded-xl border border-red overflow-hidden max-h-svh h-svh">
      <header className="bg-primary text-primary-foreground p-4 flex items-center gap-4">
        <Avatar className="w-10 h-10">
          <AvatarImage src={robo} />
          <AvatarFallback>X</AvatarFallback>
        </Avatar>
        <h1 className="text-xl font-bold">XEVEN A.I.</h1>
      </header>
      <main className="flex-1 overflow-auto p-4 flex flex-col gap-4">
        {messages.map((message, index) => (
          <div
            key={index}
            className={`flex items-start gap-2 ${
              message.sender === "user" ? "justify-end" : ""
            }`}
          >
            {message.sender !== "user" && (
              <Avatar className="w-8 h-8">
                <AvatarImage src={robo} />
                <AvatarFallback>X</AvatarFallback>
              </Avatar>
            )}
            <div
              className={`${
                message.sender === "user"
                  ? "bg-primary text-primary-foreground  rounded-tr-none hover:-translate-x-1"
                  : "bg-secondary text-foreground rounded-tl-none hover:translate-x-1"
              } px-4 py-2 rounded-2xl shadow cursor-pointer duration-300 transition-all dark:shadow-primary/30 max-w-[75%] md:max-w-[70%]`}
            >
              {message.sender === "user" ? (
                <p>{message.text}</p>
              ) : (
                <Markdown>{message.text}</Markdown>
              )}
            </div>
            {message.sender === "user" && (
              <Avatar className="w-8 h-8">
                <AvatarImage src={man} />
                <AvatarFallback>U</AvatarFallback>
              </Avatar>
            )}
          </div>
        ))}
        {loading && (
          <div className="flex">
            <Avatar className="w-8 h-8">
              <AvatarImage src={robo} />
              <AvatarFallback>X</AvatarFallback>
            </Avatar>
            <div className="bg-secondary ml-2 text-foreground rounded-tl-none px-4 block py-2 rounded-2xl shadow dark:shadow-primary/30 max-w-[70%] animate-pulse">
              <p className="inline-flex gap-3">
                Loading
                <span>
                  <Loader className="animate-spin" />
                </span>
              </p>
            </div>
          </div>
        )}
      </main>
      <div className="bg-muted/60 backdrop-blur-md p-4 flex gap-2">
        <Input
          type="text"
          placeholder="Type your message..."
          className="flex-1 rounded-full pr-12"
          value={input}
          onChange={handleInputChange}
          onKeyPress={handleKeyPress}
        />
        <Button
          disabled={loading}
          size="icon"
          className="rounded-full"
          onClick={sendMessage}
        >
          {loading ? (
            <Loader className="w-5 h-5 animate-spin" />
          ) : (
            <SendIcon className="w-5 h-5" />
          )}
        </Button>
      </div>
    </div>
  );
}
