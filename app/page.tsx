import Header from "@/components/Header";

export default function Home() {
  return (
    <div className="max-w-7xl mx-auto">
      <Header />

      <div className="flex justify-between items-center bg-[#FFC118] border-y border-black py-10 lg:py-0">
        <div className="px-10 space-y-5">
          <h1 className="text-6xl max-w-xl font-serif">
            <span className="underline decoration-black decoration-4">
              Medium
            </span>{" "}
            is the place to write, read, and connect
          </h1>
          <h2>
            It's easy and free to post your thinking on any topic and connect
            with millions of readers.
          </h2>
        </div>

        <img
          className="hidden md:inline-flex h-32 lg:h-full"
          src="https://i.pinimg.com/236x/1c/bf/66/1cbf664cffad0285718470acb9c23106.jpg"
          alt="M"
        />
      </div>
    </div>
  );
}
