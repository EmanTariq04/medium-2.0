import Header from '@/components/Header'
import { client } from '../../sanity/lib/client'
import { urlFor } from '@/sanity/lib/image'
import { div } from 'framer-motion/client'

interface PostProps {
    params: {slug: string}
}

async function getPost(slug: string) {
    const query = `* [_type == "post"]{
_id,  
  slug {
  current
  }
}`
return client.fetch(query, { slug })
}

export async function Post({ params }: PostProps) {
    const post = await getPost(params.slug);

    if (!post) {
        return <div>Post not found</div>
    }
  return (
    <main>
        <Header/>
    </main>
  )
}

export default Post

export const getStaticPaths = async () => {
    
}