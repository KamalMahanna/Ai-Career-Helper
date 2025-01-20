from newspaper import Article


# This file is used to extract text from a given URL.
def get_article_text(url: str) -> str:
    """
    This function extracts the text content from a given URL.
    """
    url = url.strip()
    try:
        if url.startswith("https://medium.com/"):
            url = url.replace("https://medium.com/", "https://readmedium.com/en/")

        article = Article(url)
        article.download()
        article.parse()
        return article.text
    except Exception as e:
        return str(e)


if __name__ == "__main__":
    """
    This block is used for testing the get_article_text function.
    """
    url = "https://medium.com/datadriveninvestor/i-used-openais-o1-model-to-develop-a-trading-strategy-it-is-destroying-the-market-576a6039e8fa"
    print(get_article_text(url))
