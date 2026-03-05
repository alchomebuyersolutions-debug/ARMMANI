// 🏗️ Builder Lane — Reddit API Proxy Route
// Why: Reddit blocks direct browser fetches (CORS). This API route acts as a
// server-side proxy, fetching from Reddit's public JSON API and returning
// clean, filtered data to our frontend.

export async function GET() {
    try {
        const response = await fetch(
            "https://www.reddit.com/r/n8n/top/.json?limit=6&t=all",
            {
                headers: {
                    "User-Agent": "n8n-explorer/1.0 (Next.js App)",
                },
                next: { revalidate: 300 }, // Cache for 5 minutes
            }
        );

        if (!response.ok) {
            throw new Error(`Reddit API returned ${response.status}`);
        }

        const data = await response.json();

        const posts = data.data.children.map((child) => {
            const post = child.data;
            return {
                id: post.id,
                title: post.title,
                author: post.author,
                score: post.score,
                numComments: post.num_comments,
                permalink: `https://www.reddit.com${post.permalink}`,
                createdUtc: post.created_utc,
                thumbnail:
                    post.thumbnail && post.thumbnail.startsWith("http")
                        ? post.thumbnail
                        : null,
                selftext:
                    post.selftext?.substring(0, 200) || "",
                linkFlairText: post.link_flair_text || null,
                upvoteRatio: post.upvote_ratio,
            };
        });

        return Response.json({ posts, fetchedAt: Date.now() });
    } catch (error) {
        console.error("Reddit API Error:", error);
        return Response.json(
            { error: "Failed to fetch posts from Reddit", details: error.message },
            { status: 500 }
        );
    }
}
