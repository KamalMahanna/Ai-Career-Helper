from newspaper import Article


# This file is used to extract text from a given URL.
def get_article_text(url: str) -> str:
    """
    This function extracts the text content from a given URL.
    """
    url = url.strip()
    try:
        article = Article(url)
        article.download()
        article.parse()
        return article.text
    except Exception as e:
        return str(e)

