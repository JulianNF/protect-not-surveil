import Image from 'next/image';
import styles from './grid.module.css';

// TODO - create an interface for the JSON response
interface wpPost {
    id: number;
    type: string;
    post: {
        title: {
            rendered: string;
        };
    };
}

// TODO set this up as getStaticProps() "hook"
async function getData() {
    const response = await fetch(
        'https://shoptoad.s1-tastewp.com/wp-json/wp/v2/resources?_embed'
        // 'https://shoptoad.s1-tastewp.com/wp-json/wp/v2/news?_embed'
    );

    if (!response.ok) {
        throw new Error('Failed to fetch data');
    }

    return response.json();
}

// TODO - pass in props for data fetching and displaying in order to make this a completely reusable component
// async function Grid({ uri: string, columns: number, maxPosts: number }) {
async function Grid() {
    const posts = await getData();

    return (
        <div className={styles.content}>
            {/* TODO - make this dynamic based on JSON response*/}
            <h1>Resources</h1>
            <div className={styles.grid}>
                {posts.map((post: {}) => {
                    const postUrl = post.link;
                    const imgUrl =
                        post._embedded['wp:featuredmedia'][0].media_details
                            .sizes.medium.source_url;
                    const imgAltText =
                        post._embedded['wp:featuredmedia'][0].alt_text;

                    return (
                        <div key={post.id}>
                            <a href={postUrl}>
                                <div className={styles.card}>
                                    <div className={styles.image}>
                                        <Image
                                            src={imgUrl}
                                            alt={imgAltText}
                                            layout="fill"
                                            priority
                                        />
                                    </div>
                                    <h1>{post.title.rendered}</h1>
                                </div>
                            </a>
                        </div>
                    );
                })}
            </div>
        </div>
    );
}

export default Grid;
