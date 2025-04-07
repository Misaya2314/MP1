import GiscusComments from '@/components/comments/GiscusComments';

export default function BlogPost({ params }: { params: { slug: string } }) {
  return (
    <article className="prose dark:prose-invert max-w-none">
      <GiscusComments term={params.slug} />
    </article>
  );
} 