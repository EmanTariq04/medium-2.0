import Header from "@/components/Header";
import { client } from "../sanity/lib/client";
import { urlFor } from "../sanity/lib/image";
import type { Post } from "@/types";
import Link from "next/link";

const query = `* [_type == "post"]{
_id,  
  title,
  slug,
  author -> {
name,
    image
  },
  description,
  mainImage,
  slug
}`;

export default async function Home() {
  const posts: Post[] = await client.fetch(query);

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

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 md:gap-6 md:p-6">
        {posts.map((posts) => (
          <Link
            key={posts._id}
            href={`/post/${posts.slug.current}`}
            className=""
          >
            <div className="border rounded-lg group cursor-pointer overflow-hidden">
              <img
                className="h-60 w-full object-cover group-hover:scale-105 transition-transform duration-200 ease-in-out"
                src={
                  posts.mainImage
                    ? urlFor(posts.mainImage).url()
                    : "/fallback.jpg"
                }
                alt=""
              />
              <div className="flex justify-between p-5 bg-white">
                <div>
                  <p>{posts.title}</p>
                  <p>
                    {posts.description} by {posts.author.name}
                  </p>
                </div>
                <img
                  className="h-12 w-12 rounded-full"
                  src={urlFor(posts.author.image).url()!}
                  alt=""
                />
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
