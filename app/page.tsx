"use client";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import TodoForm from "../components/TodoForm";
import TodoList from "../components/TodoList";

const queryClient = new QueryClient();

export default function Home() {
  return (
    <QueryClientProvider client={queryClient}>
      <main className="min-h-screen bg-gray-100 flex items-center justify-center px-4">
        <div className="w-full max-w-xl bg-white rounded-2xl shadow-xl p-6">
          <h1 className="text-3xl font-bold text-center mb-6 text-gray-800">
            👤 Todo List
          </h1>
          <TodoForm />
          <TodoList />
        </div>
      </main>
    </QueryClientProvider>
  );
}
