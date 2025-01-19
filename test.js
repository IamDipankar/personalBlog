function htmlToPlainText(html) {
    return html.replace(/<\/?[^>]+(>|$)/g, ""); // Remove all HTML tags
  }
  
  // Example usage
  const html = "<html><body>Bold</body></b> and <i>Italic</i> text. <script/>";
  const plainText = htmlToPlainText(html);
  console.log(plainText); // Output: "Bold and Italic text."