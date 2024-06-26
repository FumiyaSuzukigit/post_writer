import PostsList from "@/components/posts-list";

export default function PostList() {
  return (
    <section className="container py-8 md:py-12 lg:py-24" id="post">
      <div className="max-w-[52rem] mx-auto flex flex-col gap-2">
        <div>
          <div className="space-y-4">
            <h1 className="font-extrabold text-4xl lg:text-5xl tracking-tight">
              投稿記事
            </h1>
          </div>
        </div>
        <hr className="my-2" />
        <PostsList allList={true} />
      </div>
    </section>
  );
}
