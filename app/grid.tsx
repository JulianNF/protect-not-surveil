import Image from 'next/image';
import styles from './grid.module.css';

import { ApolloClient, InMemoryCache, gql } from '@apollo/client';

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
        'https://wordpress-1084996-3795066.cloudwaysapps.com//wp-json/wp/v2/resources?_embed'
        // 'https://teaseteeth.s4-tastewp.com/wp-json/wp/v2/resources?_embed'
        // 'https://teaseteeth.s4-tastewp.com/wp-json/wp/v2/news?_embed'
    );

    if (!response.ok) {
        throw new Error('Failed to fetch data');
    }

    return response.json();
}

export async function getStaticProps() {
    const client = new ApolloClient({
        uri: 'https://api.spacex.land/graphql/',
        cache: new InMemoryCache(),
    });
    const { data } = await client.query({
        query: gql`
            query GetLaunches {
                launchesPast(limit: 10) {
                    id
                    mission_name
                    launch_date_local
                    launch_site {
                        site_name_long
                    }
                    links {
                        article_link
                        video_link
                        mission_patch
                    }
                    rocket {
                        rocket_name
                    }
                }
            }
        `,
    });
    console.log('launch data:', data);
    return {
        props: {
            postsss: data.launchesPast,
        },
    };
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
                {/* TODO - assign correct interface/type */}
                {posts.map((post: any) => {
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
                                    <div className={styles.imageholder}>
                                        <Image
                                            src={imgUrl}
                                            alt={imgAltText}
                                            fill
                                            sizes="100%"
                                            className={styles.image}
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
