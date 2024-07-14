import './NewsCard.css'

interface Article {
    author: string;
    title: string;
    description: string;
    url: string;
    urlToImage: string;
}

interface NewsProp {
    articles: Article[]
}

const NewsCard: React.FC<NewsProp> = ({articles}) => {
    return (
        <div>
            <div className="gallery">
            {articles
                .filter(item => item.urlToImage !== null)
                .map((item, index) => (
                <div key={index} className="gallery-item">
                    <div className="image-container" onClick={() => window.open(item.url)}>
                        <img src={item.urlToImage} alt={item.title} />
                        <div className="hover-overlay">
                        <p>{item.description}</p>
                        </div>
                    </div>
                    <div className="initial-text">{item.title}</div>
                </div>
            ))}
        </div>
      </div>
    )
}

export default NewsCard