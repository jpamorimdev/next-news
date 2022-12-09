import Head from 'next/head';
import { useRouter } from 'next/router';
import styles from '../../styles/Feed.module.css';
import { NavBar } from '../../components/navbar';

type FeedProps = {
  articles: Article[],
  pageNumber: number,
};

type Article = {
  source: any;
  author: string;
  title: string;
  description: string;
  url: string;
  urlToImage: string;
  publishedAt: string;
  content: string;
}

export const Feed = (props: FeedProps) => {
  const router = useRouter();
  return props.articles.length ? (
    <>
      <Head>
        <meta property="og:image" content={props.articles[0]?.urlToImage} />
        <meta property="og:description" content={props.articles[0]?.description} />
        <meta property="og:title" content={props.articles[0]?.title + ' and more!'} />
      </Head>
      <div className="page-container">
        <NavBar />

        <div className={styles.main}>
          {props.articles.map((article, index) => (
            <div key={index} className={styles.post}>
              <h1 onClick={() => (window.location.href = article.url)}>{article.title}</h1>
              <p>{article.description}</p>
              {!!article.urlToImage && <img src={article.urlToImage} />}
              {!!article.author && <p dangerouslySetInnerHTML={{ __html: article.author }}></p> }              
              {!article.author && <p>Unknown author</p> }              
            </div>
          ))}
        </div>

        <div className={styles.paginator}>
          <div
            className={props.pageNumber === 1 ? styles.disabled : styles.active}
            onClick={() => {
              if (props.pageNumber > 1) {
                router.push(`/feed/${props.pageNumber - 1}`);
              }
            }}
          >
            Previous Page
          </div>

          <div>#{props.pageNumber}</div>

          <div
            className={props.pageNumber === 5 ? styles.disabled : styles.active}
            onClick={() => {
              if (props.pageNumber < 5) {
                router.push(`/feed/${props.pageNumber + 1}`);
              }
            }}
          >
            Next Page
          </div>
        </div>
      </div>
    </>
  ) : (
    <div className="page-container">
      <NavBar />
      <div className={styles.main}>
        <h1>No articles for this page!</h1>
      </div>
    </div>
  );
};

export const getServerSideProps = async (pageContext: { query: { slug: any; }; }) => {
  const pageNumber = pageContext.query.slug;

  if (!pageNumber || pageNumber < 1 || pageNumber > 5) {
    return {
      props: {
        articles: [],
        pageNumber: 1,
      },
    };
  }

  const apiResponse = await fetch(
    `https://newsapi.org/v2/top-headlines?country=br&pageSize=5&page=${pageNumber}`,
    {
      headers: {
        Authorization: `Bearer ${process.env.NEWSAPI_ORG_API_KEY}`,
      },
    },
  ).then(res => res.json());

  const { articles } = apiResponse;

  return {
    props: {
      articles: articles,
      pageNumber: Number.parseInt(pageNumber),
    },
  };
};

export default Feed;
