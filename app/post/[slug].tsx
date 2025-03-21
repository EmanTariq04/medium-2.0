import Header from "@/components/Header";
import { client } from "../../sanity/lib/client";
import { GetStaticProps } from "next";
import { Posts } from "@/types";
import { GetStaticPaths } from "next";

interface Props {
  post: Posts;
}


export const getStaticPaths: GetStaticPaths = async () => {
  const query = `*[_type == "post"]{
    _id,
    slug {
    current
    }
    }`;

  const posts = await client.fetch(query);

  const paths = posts.map((post: Posts) => ({
    params: {
      slug: post.slug.current,
    },
  }));

  return {
    paths,
    fallback: "blocking",
  };
};

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const query = `* [_type == "post" && slug.current == $slug][0]{
_id,  
  createdAt,
  title,
  author -> {
    name,
    image
  },
  description,
  mainImage,
  slug,
  body
}`;

  const post = await client.fetch(query, {
    slug: params?.slug,
  });

  if (!post) {
    return {
      notFound: true,
    };
  }

  return {
    props: {
      post,
    },
  };
};

function Post({ post }: Props) {
  return (
    <main>
      <Header />
    </main>
  );
}

export default Post;
