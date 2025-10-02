import { useState, useEffect, useRef } from "react";

export default function ChatWidget() {
  const [open, setOpen] = useState(false);
  const [message, setMessage] = useState("");
  const [chatHistory, setChatHistory] = useState([]);
  const [loading, setLoading] = useState(false);
  const [showPrompts, setShowPrompts] = useState(true);

  const messagesEndRef = useRef(null);

  // Auto-scroll whenever chat updates
  useEffect(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [chatHistory, loading]);

  const singaporePrompts = [
    "What are the best hawker centres in Singapore?",
    "Recommend hotels near Marina Bay.",
    "What concerts are happening this week?",
    "What are some famous attractions in Singapore?",
  ];

  const handleSendMessage = async () => {
    if (message.trim() === "") return;

    // Hide prompts only after first interaction
    if (showPrompts) setShowPrompts(false);

    const userMsg = message;
    setMessage("");

    // Add user bubble
    setChatHistory((prev) => [...prev, { sender: "user", text: userMsg }]);
    setLoading(true);

    try {
      const response = await fetch("http://localhost:5000/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message: userMsg }),
      });

      const data = await response.json();

      // Add AI reply bubble
      setChatHistory((prev) => [
        ...prev,
        { sender: "ai", text: data.reply || "🤔 No reply from AI" },
      ]);
    } catch (error) {
      console.error("Chat error:", error);
      setChatHistory((prev) => [
        ...prev,
        { sender: "ai", text: "⚠️ Sorry, something went wrong." },
      ]);
    } finally {
      setLoading(false);
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      e.preventDefault();
      handleSendMessage();
    }
  };

  return (
    <div className="relative">
      {/* Dark Overlay */}
      {open && (
        <div
          className="fixed inset-0 bg-black bg-opacity-40 z-40"
          onClick={() => setOpen(false)}
        />
      )}

      {/* Chat Container */}
      <div
        className={`fixed top-0 right-0 z-50 h-full bg-white border-l border-gray-300 transform transition-transform duration-300 ease-in-out flex flex-col ${
          open ? "translate-x-0" : "translate-x-full"
        }`}
        style={{ width: "40vw" }}
      >
        {/* Header */}
        <div className="flex items-center justify-between h-20 px-8 border-b border-indigo-700 bg-indigo-700">
          <h2 className="text-2xl font-bold text-white">Merlino</h2>
          <button
            onClick={() => setOpen(false)}
            aria-label="Close chat"
            className="text-white hover:text-indigo-300 text-3xl font-light"
          >
            &times;
          </button>
        </div>

        {/* Chat History */}
        <div className="flex-1 px-8 py-6 overflow-y-auto space-y-4 bg-gray-50">
          {chatHistory.map((msg, idx) => (
            <div
              key={idx}
              className={`p-3 rounded-lg max-w-[75%] whitespace-pre-line ${
                msg.sender === "user"
                  ? "bg-indigo-600 text-white ml-auto"
                  : "bg-gray-200 text-gray-900 mr-auto"
              }`}
            >
              {msg.text}
            </div>
          ))}

          {loading && (
            <div className="bg-gray-100 text-gray-500 px-3 py-2 rounded-lg w-fit">
              Thinking...
            </div>
          )}

          {chatHistory.length === 0 && !loading && (
            <div className="text-gray-400 text-center italic">
              Start chatting and I’ll reply here 👋
            </div>
          )}

          {/* Scroll anchor */}
          <div ref={messagesEndRef} />
        </div>

        {/* Suggested Prompts (disappear after first message) */}
        {showPrompts && (
          <div className="px-8 py-6 border-t border-gray-200 space-y-4">
            <h3 className="text-indigo-700 font-semibold text-lg mb-4">
              Suggested Questions
            </h3>
            <div className="grid grid-cols-1 gap-4">
              {singaporePrompts.map((prompt, idx) => (
                <button
                  key={idx}
                  className="bg-indigo-50 hover:bg-indigo-100 text-indigo-800 font-medium text-base px-4 py-3 rounded-lg shadow-sm transition-all text-left"
                  type="button"
                  onClick={() => {
                    setMessage(prompt);
                    setTimeout(handleSendMessage, 100); // auto-send
                  }}
                >
                  {prompt}
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Input */}
        <div className="border-t border-gray-200 px-6 py-4 bg-gray-50 sticky bottom-0">
          <div className="flex items-center space-x-4">
            <input
              type="text"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              onKeyDown={handleKeyPress}
              placeholder="Ask me anything about Singapore..."
              className="w-full text-lg text-gray-900 border border-gray-300 rounded-md px-4 py-3 focus:outline-none focus:ring-2 focus:ring-indigo-600 focus:border-indigo-600"
            />
            <button
              onClick={handleSendMessage}
              className="bg-indigo-700 text-white px-4 py-2 rounded-lg hover:bg-indigo-800 transition"
              aria-label="Send message"
            >
              Enter
            </button>
          </div>
        </div>
      </div>

      {/* Floating Chat Button */}
      {!open && (
        <button
          onClick={() => setOpen(true)}
          aria-label="Open chat"
          className="fixed bottom-5 right-5 z-50 bg-indigo-700 hover:bg-indigo-800 text-white p-5 rounded-full shadow-md transition"
        >
          💬
        </button>
      )}
    </div>
  );
}
